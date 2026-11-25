<template>
  <view class="page">
    <u-navbar
      title="我的优惠券"
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

    <view class="tab-wrap">
      <u-tabs
        :list="tabUiList"
        :current="currentIndex"
        :scrollable="false"
        lineColor="#2a9598"
        activeStyle="color: #2a9598; font-weight: 500;"
        inactiveStyle="color: #333333;"
        @click="handleTabClick"
      ></u-tabs>
    </view>

    <swiper class="coupon-swiper" :current="currentIndex" @change="handleSwiperChange">
      <swiper-item v-for="tab in tabMeta" :key="tab.type">
        <scroll-view
          class="coupon-scroll"
          scroll-y
          refresher-enabled
          :refresher-triggered="getPane(tab.type).refreshing"
          :lower-threshold="80"
          @refresherrefresh="refreshPane(tab.type)"
          @scrolltolower="loadMore(tab.type)"
        >
          <view class="coupon-content">
            <view v-if="getPane(tab.type).loading && getPane(tab.type).list.length === 0" class="state-box">
              <text class="state-text">加载中...</text>
            </view>

            <view
              v-else-if="getPane(tab.type).error && getPane(tab.type).list.length === 0"
              class="state-box state-box--error"
              @click="refreshPane(tab.type)"
            >
              <text class="state-text">加载失败，点击重试</text>
            </view>

            <view v-else-if="getPane(tab.type).list.length === 0" class="state-box">
              <text class="state-text">暂无优惠券</text>
            </view>

            <template v-else>
              <view
                v-for="item in getPane(tab.type).list"
                :key="item.couponId || `${item.couponName}-${item.endTime}`"
                class="coupon-card"
                :class="`coupon-card--${tab.type}`"
              >
                <image class="coupon-card-bg" :src="getCouponBg(tab.type)" mode="aspectFill"></image>
                <view class="coupon-left">
                  <view class="coupon-money-row">
                    <text class="coupon-currency">￥</text>
                    <text class="coupon-money">{{ formatMoney(item.couponMoney) }}</text>
                  </view>
                  <text class="coupon-condition">【满{{ formatMoney(item.fullMoneyIsUse) }}可用】</text>
                </view>

                <view class="coupon-right">
                  <view class="coupon-top">
                    <view class="coupon-info">
                      <text class="coupon-title">{{ item.couponName || "" }}</text>
                      <text class="coupon-time">有效期至：{{ item.endTime || "" }}</text>
                    </view>

                    <view v-if="isAvailable(tab.type)" class="coupon-action" @click="handleUseCoupon(item)">
                      立即使用
                    </view>
                  </view>

                  <text class="coupon-desc">{{ item.useExplain || "" }}</text>
                </view>
              </view>

              <view v-if="getPane(tab.type).loading && getPane(tab.type).list.length > 0" class="load-tip">
                加载中...
              </view>
              <view v-else-if="getPane(tab.type).list.length > 0 && !getPane(tab.type).hasMore" class="load-tip">
                没有更多了
              </view>
            </template>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onLoad, onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { getDeductionCouponNumAndList } from "@/api/service";
import { storage } from "@/utils/storage";

const bgColor = ref("#2a9598");
const PAGE_SIZE = 10;
const hasShownOnce = ref(false);

type CouponType = "1" | "2" | "3";

interface CouponItem {
  couponId?: string;
  couponName?: string;
  couponMoney?: number | string;
  fullMoneyIsUse?: number | string;
  endTime?: string;
  useExplain?: string;
  couponSource?: string;
  constraintName?: string;
  startTime?: string;
  validateTime?: string;
  realManageId?: string;
  sku?: string;
  goodsName?: string;
  useType?: number;
}

interface CouponListResult {
  couponAry?: CouponItem[];
  usedNum?: number | string;
  isUseNum?: number | string;
  unUseNum?: number | string;
}

interface CouponListResponse {
  resultCode?: number;
  message?: string;
  result?: CouponListResult;
}

interface TabMeta {
  type: CouponType;
  label: string;
}

interface TabViewItem extends TabMeta {
  name: string;
}

interface PaneState {
  page: number;
  list: CouponItem[];
  hasMore: boolean;
  loading: boolean;
  refreshing: boolean;
  error: boolean;
}

const tabMeta: TabMeta[] = [
  { type: "1", label: "可用" },
  { type: "2", label: "已用" },
  { type: "3", label: "已过期" },
];

const couponBgMap: Record<CouponType, string> = {
  "1": "/static/mine/PartyImage/coupon_unused.png",
  "2": "/static/mine/PartyImage/business_coupon_isused.png",
  "3": "/static/mine/PartyImage/business_coupon_outoftime.png",
};

const currentIndex = ref(0);
const countsLoaded = ref(false);
const counts = ref<Record<CouponType, number>>({
  "1": 0,
  "2": 0,
  "3": 0,
});
const panes = ref<Partial<Record<CouponType, PaneState>>>({});

const currentType = computed<CouponType>(() => tabMeta[currentIndex.value]?.type || "1");
const tabUiList = computed<TabViewItem[]>(() =>
  tabMeta.map((item) => ({
    ...item,
    name: countsLoaded.value ? `${item.label}（${counts.value[item.type] || 0}）` : item.label,
  }))
);

function createPane(): PaneState {
  return {
    page: 1,
    list: [],
    hasMore: true,
    loading: false,
    refreshing: false,
    error: false,
  };
}

function getPane(type: CouponType) {
  if (!panes.value[type]) {
    panes.value[type] = createPane();
  }
  return panes.value[type] as PaneState;
}

function goBack() {
  uni.navigateBack();
}

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function showRouteToast(name: string) {
  showToast(`${name}页面待迁移`);
}

function formatMoney(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0";
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

function getCouponBg(type: CouponType) {
  return couponBgMap[type] || couponBgMap["1"];
}

function isAvailable(type: CouponType) {
  return type === "1";
}

function syncCounts(result?: CouponListResult) {
  if (!result) return;
  counts.value = {
    "1": Number(result.isUseNum || 0),
    "2": Number(result.usedNum || 0),
    "3": Number(result.unUseNum || 0),
  };
  countsLoaded.value = true;
}

async function fetchCouponList(type: CouponType, page: number) {
  const res: CouponListResponse = await getDeductionCouponNumAndList({
    couponType: type,
    page: String(page),
    size: String(PAGE_SIZE),
    userId: storage.getUserId(),
  });
  return res;
}

async function loadPane(type: CouponType, page = 1, replace = true) {
  const pane = getPane(type);
  if (pane.loading) return;

  pane.loading = true;
  if (replace) {
    pane.error = false;
    pane.hasMore = true;
  }

  try {
    const res = await fetchCouponList(type, page);
    if (res?.resultCode === 200) {
      syncCounts(res.result);
      const couponAry = Array.isArray(res.result?.couponAry) ? res.result?.couponAry || [] : [];
      if (replace) {
        pane.list = couponAry;
      } else {
        pane.list = pane.list.concat(couponAry);
      }
      pane.page = page;
      pane.hasMore = couponAry.length >= PAGE_SIZE;
      pane.error = false;
    } else if (replace) {
      pane.list = [];
      pane.hasMore = false;
      pane.error = false;
    }
  } catch {
    if (replace) {
      pane.list = [];
      pane.error = true;
    }
    pane.hasMore = false;
  } finally {
    pane.loading = false;
  }
}

function refreshPane(type: CouponType) {
  const pane = getPane(type);
  pane.refreshing = true;
  pane.page = 1;
  loadPane(type, 1, true).finally(() => {
    pane.refreshing = false;
    uni.stopPullDownRefresh();
  });
}

async function loadMore(type: CouponType) {
  const pane = getPane(type);
  if (pane.loading || !pane.hasMore) return;
  const nextPage = pane.page + 1;
  await loadPane(type, nextPage, false);
}

function handleTabClick(item: Partial<TabViewItem>) {
  const nextIndex = tabMeta.findIndex((tab) => tab.type === item.type || tab.label === item.name);
  if (nextIndex < 0 || nextIndex === currentIndex.value) return;
  currentIndex.value = nextIndex;
  const pane = getPane(tabMeta[nextIndex].type);
  if (pane.list.length === 0 && !pane.loading) {
    loadPane(tabMeta[nextIndex].type, 1, true);
  }
}

function handleSwiperChange(event: any) {
  const nextIndex = Number(event?.detail?.current || 0);
  if (Number.isNaN(nextIndex) || nextIndex === currentIndex.value) return;
  currentIndex.value = nextIndex;
  const type = tabMeta[nextIndex]?.type;
  if (!type) return;
  const pane = getPane(type);
  if (pane.list.length === 0 && !pane.loading) {
    loadPane(type, 1, true);
  }
}

function handleUseCoupon(item: CouponItem) {
  uni.navigateTo({
    url: `/pages/service/BussinessCircle/BussinessShopProductDetailPage?sku=${item.sku}`,
  });
}

onLoad((options: any) => {
  const position = Number(options?.position || 0);
  currentIndex.value = Number.isNaN(position) ? 0 : Math.min(Math.max(position, 0), tabMeta.length - 1);
  loadPane(currentType.value, 1, true);
});

onShow(() => {
  if (!hasShownOnce.value) {
    hasShownOnce.value = true;
    return;
  }
  const pane = getPane(currentType.value);
  if (pane.list.length > 0 && !pane.loading) {
    loadPane(currentType.value, 1, true);
  }
});

onPullDownRefresh(() => {
  refreshPane(currentType.value);
});
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
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

.tab-wrap {
  flex: 0 0 auto;
  background: #fff;
}

.coupon-swiper {
  flex: 1;
  min-height: 0;
}

.coupon-scroll {
  height: 100%;
}

.coupon-content {
  padding-bottom: 16px;
}

.state-box {
  min-height: 240rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state-box--error {
  cursor: pointer;
}

.state-text {
  color: #999;
  font-size: 26rpx;
}

.coupon-card {
  margin: 20rpx 20rpx 0;
  min-height: 200rpx;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 10rpx;
  background: transparent;
}

.coupon-card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.coupon-left {
  width: 170rpx;
  flex: 0 0 170rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-sizing: border-box;
  padding: 24rpx 16rpx;
  position: relative;
  z-index: 1;
}

.coupon-left::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.02);
}

.coupon-money-row {
  display: flex;
  align-items: baseline;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.coupon-currency {
  font-size: 24rpx;
  margin-right: 4rpx;
}

.coupon-money {
  font-size: 58rpx;
  font-weight: 600;
}

.coupon-condition {
  margin-top: 14rpx;
  font-size: 22rpx;
  text-align: center;
  position: relative;
  z-index: 1;
}

.coupon-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22rpx 20rpx 20rpx 18rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
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

.coupon-action {
  flex: 0 0 auto;
  min-width: 128rpx;
  height: 56rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 28rpx;
  background: #2a9598;
  border: 1rpx solid #2a9598;
  color: #fff;
  font-size: 24rpx;
  box-sizing: border-box;
}

.coupon-desc {
  margin-top: 18rpx;
  color: #666;
  font-size: 22rpx;
  line-height: 30rpx;
}

.load-tip {
  padding: 18rpx 0 8rpx;
  color: #999;
  font-size: 24rpx;
  text-align: center;
}
</style>
