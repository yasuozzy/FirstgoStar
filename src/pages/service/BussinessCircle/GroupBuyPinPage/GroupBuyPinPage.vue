<template>
  <view class="page">
    <u-navbar
      title="团购拼"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
        <view class="nav-left" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>

    <scroll-view
      class="content"
      scroll-y
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      :lower-threshold="80"
      @scrolltolower="loadMore"
    >
      <view class="banner-wrap">
        <image class="banner-img" :src="bannerImage" mode="aspectFill"></image>
      </view>

      <view v-if="loading && list.length === 0" class="state-tip">加载中...</view>
      <view v-else-if="list.length === 0" class="state-tip">暂无数据</view>

      <view v-else class="goods-list">
        <view
          v-for="item in list"
          :key="item.sku || item.activityId || item.aggGoodsName"
          class="goods-item"
          @click="goDetail(item)"
        >
          <image class="goods-image" :src="resolveImage(item.img)" mode="aspectFill"></image>
          <view class="goods-main">
            <text class="goods-title">{{ item.aggGoodsName || "" }}</text>
            <view class="goods-bottom">
              <text class="goods-price">￥{{ formatPrice(item.aggPrice) }}</text>
              <text class="goods-old-price">￥{{ formatPrice(item.goodsPrice) }}</text>
            </view>
          </view>
          <view class="goods-action" @click.stop="goDetail(item)">
            <text class="goods-action-text">去拼团</text>
          </view>
        </view>
      </view>

      <view v-if="list.length > 0" class="load-tip">
        <text v-if="loading">加载中...</text>
        <text v-else-if="hasMore">上拉加载更多</text>
        <text v-else>没有更多了</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { queryGroupBuyPinList } from "@/api/service";
import { BaseImgURL, storage } from "@/utils/storage";

interface GroupBuyPinItem {
  aggdescribe?: string | null;
  activityId?: string;
  img?: string;
  goodsPrice?: number | string;
  aggPrice?: number | string;
  aggGroup?: string;
  sku?: string;
  goodsRel?: string;
  aggGoodsName?: string;
}

interface GroupBuyPinResult {
  imagePath?: string;
  resultList?: GroupBuyPinItem[];
}

const PAGE_SIZE = 10;
const bgColor = ref("#2a9598");
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const refreshing = ref(false);
const fromPlat = ref(false);
const bannerImage = ref("/static/service/placeholder.png");
const list = ref<GroupBuyPinItem[]>([]);

function goBack() {
  uni.navigateBack();
}

function resolveImage(img?: string) {
  if (!img) return "/static/service/placeholder.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatPrice(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0.00";
  return Number.isInteger(num) ? `${num}.00` : num.toFixed(2);
}

function normalizeResult(result?: GroupBuyPinResult | null) {
  bannerImage.value = result?.imagePath ? resolveImage(result.imagePath) : "/static/service/placeholder.png";
  const nextList = Array.isArray(result?.resultList) ? result!.resultList! : [];
  if (page.value === 1) {
    list.value = nextList;
  } else {
    list.value = list.value.concat(nextList);
  }
  hasMore.value = nextList.length >= PAGE_SIZE;
}

async function fetchData(currentPage: number) {
  if (loading.value) return;
  loading.value = true;
  try {
    const res: any = await queryGroupBuyPinList({
      manageId: storage.getManid(),
      pageNum: String(currentPage),
      typeDif: "1",
      pageSize: String(PAGE_SIZE),
    });

    if (res?.resultCode === 200 || res?.resultCode === "200") {
      const result = (res.result || {}) as GroupBuyPinResult;
      normalizeResult(result);
      return;
    }

    if (currentPage === 1) {
      list.value = [];
      bannerImage.value = "/static/service/placeholder.png";
    }
    hasMore.value = false;
  } catch (error: any) {
    if (currentPage === 1) {
      list.value = [];
      bannerImage.value = "/static/service/placeholder.png";
      uni.showToast({
        title: error?.message || "加载失败",
        icon: "none",
      });
    }
  } finally {
    loading.value = false;
    refreshing.value = false;
    uni.stopPullDownRefresh();
  }
}

function onRefresh() {
  refreshing.value = true;
  page.value = 1;
  hasMore.value = true;
  fetchData(1);
}

function loadMore() {
  if (loading.value || refreshing.value || !hasMore.value) return;
  page.value += 1;
  fetchData(page.value);
}

function goDetail(item: GroupBuyPinItem) {
  if (!item.sku) return;
  uni.navigateTo({
    url:
      `/pages/service/BussinessCircle/GroupBuyPinPage/PinBussinessProductDetailPage` +
      `?ispin=true` +
      `&goods_price=${encodeURIComponent(String(item.goodsPrice ?? ""))}` +
      `&sku_id=${encodeURIComponent(String(item.sku))}` +
      `&sku=${encodeURIComponent(String(item.sku))}` +
      `&sku_type=7` +
      `&goods_rel=${encodeURIComponent(String(item.goodsRel ?? ""))}` +
      `&fromPlat=${fromPlat.value ? "true" : "false"}`,
  });
}

onLoad((options: any) => {
  fromPlat.value = options?.fromPlat === true || options?.fromPlat === "true" || options?.fromPlat === "1";
  page.value = 1;
  hasMore.value = true;
  fetchData(1);
});
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f3f4f8;
}

.nav-left {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
}

.banner-wrap {
  width: 100%;
  height: 375rpx;
  background: #f5f5f5;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.goods-list {
  background: #fff;
}

.goods-item {
  min-height: 98px;
  display: flex;
  align-items: center;
  padding: 14px 14px 10px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
}

.goods-image {
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  border-radius: 6px;
  background: #f5f5f5;
}

.goods-main {
  min-width: 0;
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
}

.goods-title {
  display: block;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods-bottom {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.goods-price {
  color: #e32222;
  font-size: 12px;
  line-height: 18px;
}

.goods-old-price {
  margin-left: 14px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
  text-decoration: line-through;
}

.goods-action {
  flex: 0 0 auto;
  align-self: flex-end;
  margin-left: 10px;
  margin-bottom: 4px;
  padding: 4px 13px;
  border: 1px solid #e32222;
  border-radius: 2px;
  box-sizing: border-box;
}

.goods-action-text {
  color: #e32222;
  font-size: 12px;
  line-height: 18px;
}

.state-tip,
.load-tip {
  padding: 18px 0;
  color: #999;
  font-size: 13px;
  text-align: center;
}
</style>
