<template>
  <view class="page">
   <u-navbar title="我的收藏" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
     titleStyle="color: #fff;" leftIconColor="#fff">
     <template #left>
       <view @click="goBack">
         <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
       </view>
     </template>
   </u-navbar>

    <scroll-view
      class="content"
      scroll-y
      :lower-threshold="80"
      @scrolltolower="loadMore"
    >
        <view v-if="goodsList.length > 0" class="result-list">
		  <view
		    v-for="shop in goodsList"
		    :key="shop.shopId"
		    class="shop-item"
		    @click="goDetail(shop)"
		  >
		    <image
		      class="shop-cover"
		      :src="shop.coverImg || defaultShopImage"
		      mode="aspectFill"
		    ></image>
		    <view class="shop-main">
		      <view class="shop-title">{{ shop.shopName }}</view>
		      <view class="score-row">
		        <text
		          v-for="star in starIndexes"
		          :key="star"
		          class="star"
		          :class="{ active: isStarActive(shop.shopScore, star) }"
		        >★</text>
		        <text v-if="shop.shopScore" class="score-text">{{ shop.shopScore }}</text>
		      </view>
		      <view class="coupon-row">
		        <text
		          v-for="coupon in getCouponTexts(shop.couponList)"
		          :key="coupon"
		          class="coupon-text"
		        >
		          {{ coupon }}
		        </text>
		      </view>
		    </view>
		    <view class="distance-text">{{ shop.distance }}</view>
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
      <!-- </view> -->
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getMyCollectionList } from "@/api/service";
import { BaseImgURL, getToken ,storage} from "@/utils/storage";

interface SearchGoodsItem {
  goodImg?: string;
  goodName?: string;
  shopId?:string;
  sku?: string;
  goodPrice?: number | string;
}

const PAGE_SIZE = 50;
const HISTORY_KEY = "business_shop_search_history";
const bgColor = ref("#2a9598");
const shopId = ref("");
const keyword = ref("");
const inputFocus = ref(true);
const loading = ref(false);
const hasMore = ref(true);
const hasSearched = ref(false);
const page = ref(1);
const goodsList = ref<SearchGoodsItem[]>([]);
const searchHistory = ref<string[]>([]);
const starIndexes = [1, 2, 3, 4, 5];

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

const getCouponTexts = (couponList?: CouponItem[]) => {
  if (!couponList || couponList.length === 0) {
    return ["暂无优惠券"];
  }

  return couponList.slice(0, 3).map(item => `${item.couponMoney}元券`);
};


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

const isStarActive = (score: string | number | undefined, star: number) => {
  const value = Number(score || 0);
  return value >= star;
};

function validateKeyword() {
  const text = keyword.value.trim();
  if (!text) {
    uni.showToast({ title: "搜索关键词不能为空", icon: "none" });
    return "";
  }
  return text;
}

async function handleSearch() {
  page.value = 1;
  hasMore.value = true;
  goodsList.value = [];
  try {
    loading.value = true;
    const res: any = await getMyCollectionList({
      manageId: storage.getManid(),
	  userId:storage.getUserId(),
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
    uni.showToast({ title: error?.message, icon: "none" });
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
    const res: any = await getSearchShopList({
      authorToken: getToken() || "",
      index: text,
      manageId: storage.getManid(),
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

function goDetail(item: SearchGoodsItem) {
  if (!item.shopId) return;
  uni.navigateTo({
    url: `/pages/service/BussinessCircle/BussinessShopHomePage?shopId=${item.shopId}`,
  });
}

onLoad((options: any) => {
	handleSearch();
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


.sort-row {
  height: 42px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}

.sort-item {
  flex: 1;
  text-align: center;
  color: #666666;
  font-size: 14px;

  &.active {
    color: #2a9598;
  }
}

.shop-list {
  background-color: #ffffff;
}

.shop-item {
  min-height: 90px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
}

.shop-cover {
  width: 85px;
  height: 60px;
  flex: 0 0 85px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.shop-main {
  min-width: 0;
  flex: 1;
  height: 60px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shop-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
  font-size: 15px;
}

.score-row {
  display: flex;
  align-items: center;
}

.star {
  margin-right: 3px;
  color: #dddddd;
  font-size: 12px;

  &.active {
    color: #ffc600;
  }
}

.score-text {
  margin-left: 12px;
  color: #ffc600;
  font-size: 12px;
}

.coupon-row {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.coupon-text {
  margin-right: 5px;
  color: #2a9598;
  font-size: 11px;
  white-space: nowrap;
}

.distance-text {
  max-width: 70px;
  margin-left: 8px;
  color: #666666;
  font-size: 12px;
}
</style>
