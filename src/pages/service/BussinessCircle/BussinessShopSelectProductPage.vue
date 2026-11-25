<template>
  <view class="page">
    <view class="top-bar">
      <view class="status-space"></view>
      <view class="top-row">
        <view class="nav-icon" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
        <view class="search-box">
          <u-icon name="search" size="16" color="#999999"></u-icon>
          <input
            class="search-input"
            v-model="keyword"
            :focus="inputFocus"
            confirm-type="search"
            placeholder="搜索商品"
            @confirm="handleSearch"
          />
          <view v-if="keyword" class="clear-btn" @click="clearKeyword">
            <u-icon name="close" size="12" color="#999999"></u-icon>
          </view>
        </view>
        <view class="search-btn" @click="handleSearch">搜索</view>
      </view>
    </view>

    <scroll-view
      class="content"
      scroll-y
      :lower-threshold="80"
      @scrolltolower="loadMore"
    >
      <view v-if="searchHistory.length > 0 && !hasSearched" class="history-wrap">
        <view class="section-head">
          <text class="section-title">搜索历史</text>
          <text class="clear-history" @click="clearHistory">清空</text>
        </view>
        <view class="history-list">
          <view
            v-for="item in searchHistory"
            :key="item"
            class="history-item"
            @click="chooseHistory(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>

      <view v-if="hasSearched" class="result-wrap">
        <view v-if="goodsList.length > 0" class="result-list">
          <view
            v-for="item in goodsList"
            :key="item.sku"
            class="result-item"
            @click="goDetail(item)"
          >
            <image class="goods-img" :src="resolveImage(item.goodImg)" mode="aspectFill"></image>
            <view class="goods-main">
              <text class="goods-name">{{ item.goodName }}</text>
              <view class="goods-bottom">
                <text class="goods-price">￥{{ formatMoney(item.goodPrice) }}</text>
                <view class="go-detail">
                  <text>查看详情</text>
                  <u-icon name="arrow-right" size="12" color="#999999"></u-icon>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else class="empty-text">
          <text v-if="loading">加载中...</text>
          <text v-else>暂无搜索结果</text>
        </view>
        <view v-if="goodsList.length > 0" class="load-tip">
          <text v-if="loading">加载中...</text>
          <text v-else-if="hasMore">上拉加载更多</text>
          <text v-else>没有更多了</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getGoodsListByIndex } from "@/api/service";
import { BaseImgURL, getToken } from "@/utils/storage";

interface SearchGoodsItem {
  goodImg?: string;
  goodName?: string;
  sku?: string;
  goodPrice?: number | string;
}

const PAGE_SIZE = 50;
const HISTORY_KEY = "business_goods_search_history";

const shopId = ref("");
const keyword = ref("");
const inputFocus = ref(true);
const loading = ref(false);
const hasMore = ref(true);
const hasSearched = ref(false);
const page = ref(1);
const goodsList = ref<SearchGoodsItem[]>([]);
const searchHistory = ref<string[]>([]);

function resolveImage(img?: string) {
  if (!img) return "/static/default-image.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatMoney(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0";
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

function loadHistory() {
  searchHistory.value = uni.getStorageSync(HISTORY_KEY) || [];
}

function saveHistory(value: string) {
  const next = [value, ...searchHistory.value.filter(item => item !== value)].slice(0, 8);
  searchHistory.value = next;
  uni.setStorageSync(HISTORY_KEY, next);
}

function clearHistory() {
  searchHistory.value = [];
  uni.removeStorageSync(HISTORY_KEY);
}

function clearKeyword() {
  keyword.value = "";
  inputFocus.value = true;
}

function goBack() {
  uni.navigateBack();
}

function validateKeyword() {
  const text = keyword.value.trim();
  if (!text) {
    uni.showToast({ title: "搜索关键词不能为空", icon: "none" });
    return "";
  }
  return text;
}

async function handleSearch() {
  const text = validateKeyword();
  if (!text || loading.value) return;

  hasSearched.value = true;
  page.value = 1;
  hasMore.value = true;
  goodsList.value = [];
  saveHistory(text);
  inputFocus.value = false;

  try {
    loading.value = true;
    const res: any = await getGoodsListByIndex({
      authorToken: getToken() || "",
      index: text,
      shopId: shopId.value,
      page: "1",
      size: String(PAGE_SIZE),
    });
	console.log(res);
    const list = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
    goodsList.value = list;
    hasMore.value = list.length >= PAGE_SIZE;
    if (res?.resultCode === 201) {
      goodsList.value = [];
      hasMore.value = false;
    }
  } catch (error: any) {
    uni.showToast({ title: error?.message || "搜索失败", icon: "none" });
    goodsList.value = [];
    hasMore.value = false;
  } finally {
    loading.value = false;
    uni.hideKeyboard();
  }
}

async function loadMore() {
  if (!hasSearched.value || loading.value || !hasMore.value) return;
  const text = keyword.value.trim();
  if (!text) return;

  page.value += 1;
  loading.value = true;
  try {
    const res: any = await getGoodsListByIndex({
      authorToken: getToken() || "",
      index: text,
      shopId: shopId.value,
      page: String(page.value),
      size: String(PAGE_SIZE),
    });
    const list = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
    goodsList.value = goodsList.value.concat(list);
    hasMore.value = list.length >= PAGE_SIZE;
    if (res?.resultCode === 201 || list.length === 0) {
      hasMore.value = false;
    }
  } catch {
    hasMore.value = false;
  } finally {
    loading.value = false;
  }
}

function chooseHistory(text: string) {
  keyword.value = text;
  handleSearch();
}

function goDetail(item: SearchGoodsItem) {
  if (!item.sku) return;
  uni.navigateTo({
    url: `/pages/service/BussinessCircle/BussinessShopProductDetailPage?sku=${item.sku}`,
  });
}

onLoad((options: any) => {
  shopId.value = options.shopId || "";
  keyword.value = options.keyword || options.index || "";
  loadHistory();
  if (keyword.value.trim()) {
    handleSearch();
  }
});
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f3f4f8;
}

.top-bar {
  flex: 0 0 auto;
  background: #2a9595;
}

.status-space {
  height: var(--status-bar-height);
}

.top-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px 10px;
}

.nav-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 34px;
}

.search-box {
  flex: 1;
  min-width: 0;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 16px;
  background: #fff;
  box-sizing: border-box;
}

.search-input {
  flex: 1;
  min-width: 0;
  margin-left: 6px;
  font-size: 13px;
}

.clear-btn {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn {
  width: 54px;
  height: 32px;
  border-radius: 16px;
  background: #ff8900;
  color: #fff;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
}

.content {
  flex: 1;
  min-height: 0;
  padding: 10px 15px 16px;
  box-sizing: border-box;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.clear-history {
  color: #2a9595;
  font-size: 12px;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.history-item {
  padding: 6px 12px;
  border-radius: 14px;
  background: #fff;
  color: #666;
  font-size: 12px;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
}

.goods-img {
  width: 86px;
  height: 86px;
  flex: 0 0 86px;
  border-radius: 6px;
  background: #f5f5f5;
}

.goods-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-name {
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

.goods-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.goods-price {
  color: #e93b3d;
  font-size: 16px;
  font-weight: 600;
}

.go-detail {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 12px;
}

.empty-text,
.load-tip {
  padding: 28px 0;
  color: #999;
  font-size: 13px;
  text-align: center;
}
</style>
