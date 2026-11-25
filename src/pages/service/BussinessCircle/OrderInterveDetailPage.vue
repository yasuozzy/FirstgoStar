<template>
  <view class="page">
    <u-navbar
      title="服务单详情"
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

    <scroll-view class="content" scroll-y>
      <view class="head-card">
        <text class="head-no">服务单号：{{ resultInfo.applyNo || "" }}</text>
        <text class="head-time">{{ resultInfo.applyTime || "" }}</text>
      </view>

      <view class="goods-card">
        <image class="goods-img" :src="resolveImage(goodsInfo.img)" mode="aspectFill"></image>
        <view class="goods-main">
          <text class="goods-name">{{ goodsInfo.name || "" }}</text>
          <text class="goods-specs">{{ goodsInfo.specs || "" }}</text>
        </view>
        <view class="goods-side">
          <text class="goods-price">{{ formatPrice(goodsInfo.price) }}</text>
          <text class="goods-num">x{{ goodsInfo.nums || 0 }}</text>
        </view>
      </view>

      <view class="status-card">
        <text class="status-text">{{ statusText }}</text>
        <text v-if="showRefundMoney" class="refund-text">退款金额：{{ formatPrice(goodsInfo.refundprice) }}</text>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <text class="section-title">审核留言</text>
        <text class="section-text">{{ reasonText }}</text>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <text class="section-title">问题描述</text>
        <text class="section-text">{{ resultInfo.questionDesc || "" }}</text>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <text class="section-title">商品问题图片</text>
        <view v-if="imageList.length > 0" class="image-grid">
          <image
            v-for="(img, index) in imageList"
            :key="`${img}-${index}`"
            class="grid-image"
            :src="img"
            mode="aspectFill"
            @click="previewImages(imageList, img)"
          ></image>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getAfterSaleDetail } from "@/api/service";
import { BaseImgURL } from "@/utils/storage";

interface ApplyDetailItem {
  img?: string;
  name?: string;
  specs?: string;
  price?: number | string;
  nums?: number | string;
  refundprice?: number | string;
}

interface PicItem {
  path?: string;
}

interface OrderInterveDetailResult {
  applyNo?: string;
  applyTime?: string;
  serviceType?: string;
  applyStatusValue?: number;
  advice?: string;
  questionDesc?: string;
  applyDetailAry?: ApplyDetailItem[];
  picList?: PicItem[];
}

const bgColor = ref("#2a9598");
const applyId = ref("");
const resultInfo = ref<OrderInterveDetailResult>({});
const goodsInfo = ref<ApplyDetailItem>({});
const imageList = ref<string[]>([]);
const reasonText = ref("尚无留言");
const showRefundMoney = ref(false);
const statusText = ref("");

function goBack() {
  uni.navigateBack();
}

function showToast(title: string) {
  uni.showToast({
    title,
    icon: "none",
  });
}

function resolveImage(img?: string) {
  if (!img) return "/static/default-image.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatPrice(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0.00";
  return Number.isInteger(num) ? `${num}.00` : num.toFixed(2);
}

function previewImages(images: string[], current: string) {
  if (!images || images.length === 0) return;
  uni.previewImage({
    urls: images,
    current,
  });
}

function refreshDerivedState() {
  const serviceType = resultInfo.value.serviceType || "";
  const statusValue = Number(resultInfo.value.applyStatusValue || 0);
  showRefundMoney.value = serviceType === "退货";

  if (statusValue === 0) {
    statusText.value = `${serviceType}审核中，请耐心等待`;
  } else if (statusValue === 1) {
    statusText.value = `${serviceType}审核已取消`;
  } else if (statusValue === 2) {
    statusText.value = serviceType === "退货" ? `${serviceType}审核通过，已退款` : `${serviceType}审核通过`;
  } else if (statusValue === 3) {
    statusText.value = `${serviceType}审核未通过`;
  } else {
    statusText.value = "";
  }

  reasonText.value = resultInfo.value.advice && resultInfo.value.advice.trim() ? resultInfo.value.advice : "尚无留言";

  goodsInfo.value = resultInfo.value.applyDetailAry?.[0] || {};

  imageList.value = (resultInfo.value.picList || [])
    .map((item) => item.path || "")
    .filter(Boolean)
    .map((item) => resolveImage(item));
}

async function loadDetail() {
  if (!applyId.value) {
    showToast("数据错误");
    setTimeout(() => {
      uni.navigateBack();
    }, 500);
    return;
  }

  try {
    const res: any = await getAfterSaleDetail({ applyId: applyId.value });
    if (res?.resultCode === 200 && res.result) {
      resultInfo.value = res.result;
      refreshDerivedState();
      return;
    }
    showToast(res?.message || "加载失败");
  } catch (error: any) {
    showToast(error?.message || "加载失败");
  }
}

onLoad((options: any) => {
  applyId.value = decodeURIComponent(options?.applyId || "");
  loadDetail();
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

.content {
  flex: 1;
  min-height: 0;
  padding-bottom: 16px;
  box-sizing: border-box;
}

.head-card,
.goods-card,
.status-card,
.section-card {
  background: #fff;
}

.head-card {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px 10px;
  box-sizing: border-box;
}

.head-no,
.head-time {
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.goods-card {
  min-height: 97px;
  display: flex;
  padding: 15px 14px;
  box-sizing: border-box;
}

.goods-img {
  width: 67px;
  height: 67px;
  flex: 0 0 67px;
  border-radius: 5px;
  background: #f5f5f5;
}

.goods-main {
  flex: 1;
  min-width: 0;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.goods-name {
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.goods-specs {
  margin-top: 12px;
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.goods-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: 10px;
}

.goods-price {
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.goods-num {
  margin-top: 12px;
  color: #999;
  font-size: 12px;
  line-height: 18px;
}

.status-card {
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 9px 15px;
  box-sizing: border-box;
}

.status-text {
  flex: 1;
  min-width: 0;
  color: #2a9598;
  font-size: 13px;
  line-height: 18px;
}

.refund-text {
  flex: 0 0 auto;
  margin-left: 10px;
  color: #2a9598;
  font-size: 13px;
  line-height: 18px;
}

.section-gap {
  height: 10px;
  background: #f3f4f8;
}

.section-card {
  padding: 15px 15px 14px;
  box-sizing: border-box;
}

.section-title {
  display: block;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

.section-text {
  display: block;
  margin-top: 14px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
  white-space: pre-wrap;
  word-break: break-all;
}

.image-grid {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.grid-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background: #f5f5f5;
}
</style>
