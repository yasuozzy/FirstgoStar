<template>
  <view class="page">
    <u-navbar
      title="评价"
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
      class="list-scroll"
      scroll-y
      enable-back-to-top
      refresher-enabled
      :refresher-triggered="refreshing"
      :lower-threshold="80"
      @refresherrefresh="handleRefresh"
      @scrolltolower="loadMore"
    >
      <view class="list-content">
        <view v-if="loading && evaluationList.length === 0" class="state-box">
          <text class="state-text">加载中...</text>
        </view>

        <view
          v-else-if="error && evaluationList.length === 0"
          class="state-box state-box--error"
          @click="reload"
        >
          <text class="state-text">未获取数据，点击重试</text>
        </view>

        <view v-else-if="evaluationList.length === 0" class="state-box">
          <text class="state-text">暂无评价</text>
        </view>

        <template v-else>
          <view
            v-for="item in evaluationList"
            :key="item.commentId || `${item.orderId || item.orderNo}-${item.commenttime}`"
            class="evaluation-card"
          >
            <view class="user-row">
              <image class="avatar" :src="resolveImage(item.avatar, avatarFallback)" mode="aspectFill"></image>
              <view class="user-info">
                <text class="username">{{ item.acceptName || "" }}</text>
                <text class="evaluation-time">{{ item.commenttime || "" }}</text>
              </view>
              <u-rate
                :value="getRating(item.point)"
                :count="5"
                :size="14"
                activeColor="#f7b500"
                inactiveColor="#d8d8d8"
                readonly
              ></u-rate>
            </view>

            <text class="evaluation-content">{{ item.contents || "" }}</text>

            <view v-if="getEvaluationImages(item).length > 0" class="image-grid">
              <image
                v-for="(image, imageIndex) in getEvaluationImages(item)"
                :key="`${image}-${imageIndex}`"
                class="evaluation-image"
                :src="image"
                mode="aspectFill"
                @click="previewImages(getEvaluationImages(item), image)"
              ></image>
            </view>

            <view class="order-row" @click="handleOrderClick(item)">
              <text class="order-no">订单编号{{ item.orderNo || "" }}</text>
              <u-icon name="arrow-right" size="14" color="#999"></u-icon>
            </view>

            <view v-if="hasReply(item)" class="reply-box">
              <text class="reply-title">商家回复</text>
              <text class="reply-content">{{ item.replyContents }}</text>
            </view>

            <view class="shop-row" @click="handleShopClick(item)">
              <image class="shop-image" :src="resolveImage(item.shopImg, shopFallback)" mode="aspectFill"></image>
              <text class="shop-name">{{ item.shopName || "" }}</text>
              <u-icon name="arrow-right" size="14" color="#999"></u-icon>
            </view>

            <view class="card-divider"></view>
          </view>

          <view v-if="loading" class="load-tip">加载中...</view>
          <view v-else-if="!hasMore" class="load-tip">没有更多了</view>
        </template>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { queryPersonalEvaluation } from "@/api/service";
import { BaseImgURL, storage } from "@/utils/storage";

const bgColor = ref("#2a9598");
const PAGE_SIZE = 10;
const avatarFallback = "/static/service/headerDefaltImg.png";
const shopFallback = "/static/service/headerDefaltImg.png";

interface EvaluationItem {
  commentId?: string;
  orderNo?: string;
  orderId?: string;
  goodsName?: string;
  acceptName?: string;
  avatar?: string;
  contents?: string;
  IMG1?: string;
  IMG2?: string;
  IMG3?: string;
  IMG4?: string;
  IMG5?: string;
  replyContents?: string;
  point?: string | number;
  commenttime?: string;
  shopName?: string;
  shopId?: string;
  shopImg?: string;
}

interface EvaluationResponse {
  success?: boolean;
  message?: string;
  resultCode?: number;
  result?: EvaluationItem[];
}

const evaluationList = ref<EvaluationItem[]>([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const refreshing = ref(false);
const error = ref(false);

function resolveImage(path?: string, fallback = "/static/logo.png") {
  if (!path) return fallback;
  if (/^https?:\/\//.test(path) || path.startsWith("/static")) return path;
  return `${BaseImgURL}${path.replace(/^\//, "")}`;
}

function getRating(point?: string | number) {
  const rating = Number(point || 0);
  if (Number.isNaN(rating)) return 0;
  return Math.min(Math.max(rating, 0), 5);
}

function getEvaluationImages(item: EvaluationItem) {
  return [item.IMG1, item.IMG2, item.IMG3, item.IMG4, item.IMG5]
    .filter((image): image is string => Boolean(image))
    .map((image) => resolveImage(image));
}

function hasReply(item: EvaluationItem) {
  return Boolean(item.replyContents && item.replyContents.trim());
}

function showToast(title: string) {
  uni.showToast({
    title,
    icon: "none",
  });
}

function goBack() {
  uni.navigateBack();
}

function handleShopClick(item: EvaluationItem) {
  if (!item.shopId) {
    showToast("店铺信息缺失");
    return;
  }
  uni.navigateTo({
    url: "/pages/service/BussinessCircle/BussinessShopHomePage?shopId="+item.shopId ,
  });
  
}

function handleOrderClick(item: EvaluationItem) {
	const orderId = item.orderId
  if (!orderId) {
    showToast("订单信息缺失");
    return;
  }
  uni.navigateTo({
    url: `/pages/service/BussinessCircle/BussinessShopOrderDetailPage?orderId=${encodeURIComponent(orderId)}`,
  });
}

function previewImages(images: string[], current: string) {
  uni.previewImage({
    current,
    urls: images,
  });
}

async function fetchEvaluations(targetPage: number) {
  const response: EvaluationResponse = await queryPersonalEvaluation({
    userId: storage.getUserId(),
    pageSize: String(PAGE_SIZE),
    page: String(targetPage),
  });
	console.log(response)
  if (response?.success === false || response?.resultCode !== 200) {
    throw new Error(response?.message || "获取评价失败");
  }

  return Array.isArray(response.result) ? response.result : [];
}

async function loadData(targetPage = 1, replace = true) {
  if (loading.value) return;

  loading.value = true;
  if (replace) {
    error.value = false;
    hasMore.value = true;
  }

  try {
    const result = await fetchEvaluations(targetPage);
    evaluationList.value = replace ? result : evaluationList.value.concat(result);
    page.value = targetPage;
    hasMore.value = result.length >= PAGE_SIZE;
    error.value = false;
  } catch (requestError: any) {
    if (replace) {
      evaluationList.value = [];
      hasMore.value = false;
      error.value = true;
    }
    if (!replace) {
      showToast(requestError?.message || "加载更多失败");
    }
  } finally {
    loading.value = false;
    refreshing.value = false;
    uni.stopPullDownRefresh();
  }
}

function reload() {
  page.value = 1;
  loadData(1, true);
}

function handleRefresh() {
  refreshing.value = true;
  reload();
}

function loadMore() {
  if (loading.value || !hasMore.value) return;
  loadData(page.value + 1, false);
}

onLoad(() => {
  loadData(1, true);
});

onPullDownRefresh(() => {
  handleRefresh();
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

.list-scroll {
  flex: 1;
  min-height: 0;
}

.list-content {
  padding-bottom: 16px;
}

.state-box {
  min-height: 260rpx;
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

.evaluation-card {
  margin-top: 10px;
  padding: 10px 15px 0;
  background: #fff;
  box-sizing: border-box;
}

.user-row {
  min-height: 42px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  border-radius: 5px;
  background: #f6f6f6;
}

.user-info {
  min-width: 0;
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.username {
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.evaluation-time {
  margin-top: 5px;
  color: #999;
  font-size: 12px;
  line-height: 18px;
}

.evaluation-content {
  display: block;
  margin: 15px 0 0 35px;
  color: #333;
  font-size: 12px;
  line-height: 21px;
  white-space: pre-wrap;
  word-break: break-all;
}

.image-grid {
  margin: 10px 0 7px 35px;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
}

.evaluation-image {
  width: 100px;
  height: 100px;
  background: #f6f6f6;
}

.order-row,
.shop-row {
  display: flex;
  align-items: center;
  min-height: 45px;
  box-sizing: border-box;
}

.order-row {
  padding: 10px 0 0 35px;
}

.order-no {
  flex: 1;
  min-width: 0;
  color: #999;
  font-size: 10px;
}

.reply-box,
.shop-row {
  margin-left: 35px;
  margin-right: 0;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
}

.reply-box {
  margin-top: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.reply-title {
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.reply-content {
  margin-top: 10px;
  margin-bottom: 5px;
  color: #333;
  font-size: 12px;
  line-height: 18px;
  white-space: pre-wrap;
  word-break: break-all;
}

.shop-row {
  margin-top: 8px;
  padding: 10px 15px 10px 8px;
}

.shop-image {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  background: #f6f6f6;
}

.shop-name {
  flex: 1;
  min-width: 0;
  margin-left: 10px;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-divider {
  height: 1px;
  margin-top: 14px;
  background: #eaeaea;
}

.load-tip {
  padding: 14px 0;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
