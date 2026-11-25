<template>
  <view class="page">
    <u-navbar
      title="争议订单"
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
      <view class="goods-card">
        <image class="goods-img" :src="resolveImage(goodsInfo.img)" mode="aspectFill"></image>
        <view class="goods-main">
          <text class="goods-name">{{ goodsInfo.name || "" }}</text>
          <text class="goods-specs">{{ goodsInfo.specs || "" }}</text>
        </view>
        <view class="goods-side">
          <text class="goods-price">价格：{{ formatPrice(goodsInfo.price) }}</text>
          <text class="goods-num">x{{ goodsInfo.nums || 0 }}</text>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <text class="section-title">介入原因</text>
        <text class="section-text">{{ reason || "" }}</text>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <text class="section-title">凭证图片</text>
        <view v-if="evidenceImages.length > 0" class="image-grid">
          <image
            v-for="(img, index) in evidenceImages"
            :key="`${img}-${index}`"
            class="grid-image"
            :src="img"
            mode="aspectFill"
            @click="previewImages(evidenceImages, img)"
          ></image>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="section-card timeline-card">
        <text class="section-title">平台处理跟踪</text>
        <view v-if="timelineList.length > 0" class="timeline-list">
          <view
            v-for="(item, index) in timelineList"
            :key="item.id || `${item.managetime}-${index}`"
            class="timeline-item"
          >
            <text class="timeline-message">{{ item.managemessage || "" }}</text>
            <text class="timeline-time">{{ item.managetime || "" }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getApplyOrderDetail } from "@/api/service";
import { BaseImgURL } from "@/utils/storage";

interface GoodsDetailItem {
  img?: string;
  name?: string;
  specs?: string;
  price?: number | string;
  nums?: number | string;
}

interface PlatMessageItem {
  id?: string;
  managemessage?: string;
  managetime?: string;
}

interface ApplyPicItem {
  path?: string;
}

interface OrderInterveShowResult {
  reason?: string;
  goodsdetail?: GoodsDetailItem[];
  applypicList?: ApplyPicItem[];
  platMessage?: PlatMessageItem[];
}

const bgColor = ref("#2a9598");
const applyId = ref("");
const reason = ref("");
const goodsInfo = ref<GoodsDetailItem>({});
const evidenceImages = ref<string[]>([]);
const timelineList = ref<PlatMessageItem[]>([]);

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

async function loadDetail() {
  if (!applyId.value) {
    showToast("数据错误");
    setTimeout(() => {
      uni.navigateBack();
    }, 500);
    return;
  }

  try {
    const res: any = await getApplyOrderDetail({ applyId: applyId.value });
    if (res?.resultCode === 200 && res.result) {
      const result: OrderInterveShowResult = res.result;
      reason.value = result.reason || "";
      goodsInfo.value = result.goodsdetail?.[0] || {};
      evidenceImages.value = (result.applypicList || [])
        .map((item) => item.path || "")
        .filter(Boolean)
        .map((item) => resolveImage(item));
      timelineList.value = Array.isArray(result.platMessage) ? result.platMessage : [];
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

.goods-card,
.section-card {
  background: #fff;
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
  flex: 0 0 auto;
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

.timeline-card {
  padding-bottom: 8px;
}

.timeline-list {
  margin-top: 6px;
}

.timeline-item {
  min-height: 34px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 0 0;
  box-sizing: border-box;
}

.timeline-message {
  flex: 1;
  min-width: 0;
  color: #666;
  font-size: 12px;
  line-height: 18px;
  word-break: break-all;
}

.timeline-time {
  flex: 0 0 auto;
  color: #666;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
}
</style>
