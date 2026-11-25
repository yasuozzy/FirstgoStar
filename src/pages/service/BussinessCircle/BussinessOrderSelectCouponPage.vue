<template>
  <view class="page">
    <u-navbar
      title="优惠券"
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
      :lower-threshold="80"
      @refresherrefresh="refreshList"
      @scrolltolower="loadMore"
    >
      <view class="coupon-content">
        <view v-if="loading && couponList.length === 0" class="state-box">
          <text class="state-text">加载中...</text>
        </view>

        <view
          v-else-if="error && couponList.length === 0"
          class="state-box state-box--error"
          @click="refreshList"
        >
          <text class="state-text">加载失败，点击重试</text>
        </view>

        <view v-else-if="couponList.length === 0" class="state-box">
          <text class="state-text">暂无优惠券</text>
        </view>

        <template v-else>
          <view
            v-for="item in couponList"
            :key="item.couponId || `${item.couponName}-${item.endTime}`"
            class="coupon-card"
            :class="{ disabled: isCouponSelected(item) }"
            @click="selectCoupon(item)"
          >
            <view class="coupon-left">
              <view class="money-row">
                <text class="currency">￥</text>
                <text class="money">{{ formatMoney(item.couponMoney) }}</text>
              </view>
              <text class="condition">【满{{ formatMoney(item.fullMoneyIsUse) }}可用】</text>
            </view>
            <view class="coupon-right">
              <view class="coupon-top">
                <view class="coupon-info">
                  <text class="coupon-title">{{ item.couponName || "" }}</text>
                  <text class="coupon-time">有效期至：{{ item.endTime || "" }}</text>
                </view>
                <view v-if="isCouponSelected(item)" class="selected-mark">已选择</view>
              </view>
              <text class="coupon-desc">{{ item.useExplain || "" }}</text>
            </view>
          </view>

          <view class="load-tip">
            <text v-if="loading">加载中...</text>
            <text v-else-if="hasMore">上拉加载更多</text>
            <text v-else>没有更多了</text>
          </view>
        </template>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getOrderCouponListByApp } from "@/api/service";
import { storage } from "@/utils/storage";

interface ProductItem {
  cartId?: string;
  img?: string;
  name?: string;
  nums?: number;
  price?: number | string;
  specs?: string;
  sku?: string;
}

interface CouponIdItem {
  shopCode?: string;
  couponId?: string;
}

interface OrderCouponItem {
  couponName?: string;
  useExplain?: string;
  couponMoney?: number | string;
  fullMoneyIsUse?: number | string;
  startTime?: string;
  useTypeKey?: string;
  endTime?: string;
  couponId?: string;
  useType?: string;
  COUPON_USE_TYPE?: number;
}

interface CouponResponse {
  resultCode?: number;
  message?: string;
  result?: OrderCouponItem[];
}

const PAGE_SIZE = 50;
const bgColor = ref("#2a9598");
const shopCode = ref("");
const productList = ref<ProductItem[]>([]);
const couponIds = ref<CouponIdItem[]>([]);
const couponList = ref<OrderCouponItem[]>([]);
const page = ref(1);
const loading = ref(false);
const refreshing = ref(false);
const hasMore = ref(true);
const error = ref(false);

function goBack() {
  uni.navigateBack();
}

function formatMoney(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0";
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

function parseJsonArray<T>(value?: string): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Some runtimes leave route params encoded, so fall back to decoding once.
  }
  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isCouponSelected(item: OrderCouponItem) {
  return couponIds.value.some((coupon) => coupon.couponId === item.couponId);
}

async function fetchCoupons(targetPage: number, replace = true) {
  if (loading.value || !shopCode.value) return;

  loading.value = true;
  if (replace) {
    error.value = false;
    hasMore.value = true;
  }

  try {
    const res: CouponResponse = await getOrderCouponListByApp({
      goodsSkuAry: JSON.stringify(productList.value),
      shopCode: shopCode.value,
      page: String(targetPage),
      size: String(PAGE_SIZE),
      userId: storage.getUserId(),
    });
    const list = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
    couponList.value = replace ? list : couponList.value.concat(list);
    page.value = targetPage;
    hasMore.value = list.length >= PAGE_SIZE;
    error.value = false;

    if (res?.resultCode !== 200 && replace) {
      couponList.value = [];
      hasMore.value = false;
    }
  } catch (err: any) {
    if (replace) {
      couponList.value = [];
      error.value = true;
    }
    hasMore.value = false;
    uni.showToast({ title: err?.message || "加载失败", icon: "none" });
  } finally {
    loading.value = false;
  }
}

function refreshList() {
  refreshing.value = true;
  page.value = 1;
  fetchCoupons(1, true).finally(() => {
    refreshing.value = false;
    uni.stopPullDownRefresh();
  });
}

async function loadMore() {
  if (loading.value || !hasMore.value) return;
  await fetchCoupons(page.value + 1, false);
}

function selectCoupon(item: OrderCouponItem) {
  if (isCouponSelected(item)) {
    uni.showToast({ title: "已选择此优惠券", icon: "none" });
    return;
  }
  uni.$emit("order-coupon-selected", {
    shopCode: shopCode.value,
    data: item,
  });
  uni.navigateBack();
}

onLoad((options: any) => {
  shopCode.value = options?.shopCode ? decodeURIComponent(options.shopCode) : "";
  productList.value = parseJsonArray<ProductItem>(options?.data);
  couponIds.value = parseJsonArray<CouponIdItem>(options?.ids);
  if (!shopCode.value || productList.value.length === 0) {
    uni.showToast({ title: "数据错误", icon: "none" });
    return;
  }
  fetchCoupons(1, true);
});

onPullDownRefresh(() => {
  refreshList();
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
}

.coupon-content {
  padding: 20rpx 20rpx 28rpx;
  box-sizing: border-box;
}

.coupon-card {
  min-height: 200rpx;
  display: flex;
  margin-bottom: 20rpx;
  overflow: hidden;
  border-radius: 10rpx;
  background: #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.coupon-card.disabled {
  opacity: 0.55;
}

.coupon-left {
  width: 180rpx;
  flex: 0 0 180rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24rpx 12rpx;
  background: #2a9598;
  color: #fff;
  box-sizing: border-box;
}

.money-row {
  display: flex;
  align-items: baseline;
  line-height: 1;
}

.currency {
  margin-right: 4rpx;
  font-size: 24rpx;
}

.money {
  font-size: 58rpx;
  font-weight: 600;
}

.condition {
  margin-top: 14rpx;
  font-size: 22rpx;
  text-align: center;
}

.coupon-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22rpx 20rpx;
  box-sizing: border-box;
}

.coupon-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.coupon-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.coupon-title {
  color: #333;
  font-size: 28rpx;
  line-height: 38rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.coupon-time {
  margin-top: 8rpx;
  color: #333;
  font-size: 24rpx;
  line-height: 32rpx;
}

.selected-mark {
  flex: 0 0 auto;
  min-width: 104rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
  background: #f0f0f0;
  color: #999;
  font-size: 22rpx;
}

.coupon-desc {
  margin-top: 18rpx;
  color: #666;
  font-size: 22rpx;
  line-height: 30rpx;
}

.state-box {
  min-height: 420rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state-box--error {
  cursor: pointer;
}

.state-text,
.load-tip {
  color: #999;
  font-size: 26rpx;
  text-align: center;
}

.load-tip {
  padding: 16rpx 0 8rpx;
}
</style>
