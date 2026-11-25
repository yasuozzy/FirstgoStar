<template>
  <view class="page">
    <u-navbar
      title="店铺详情"
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
      enable-back-to-top
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
    >
      <view class="shop-head">
        <image class="shop-image" :src="resolveImage(shopInfo.coverImg)" mode="aspectFill"></image>
        <view class="shop-main">
          <text class="shop-name">{{ shopInfo.shopName || "店铺" }}</text>
          <text class="follow-num">{{ shopInfo.collNum || 0 }}人收藏</text>
        </view>
      </view>

      <scroll-view
        v-if="couponList.length > 0"
        class="coupon-scroll"
        scroll-x
        :show-scrollbar="false"
      >
        <view class="coupon-list">
          <view
            v-for="coupon in couponList"
            :key="coupon.couponId"
            class="coupon-item"
            :class="{ received: coupon.receiveStatus !== '2' }"
            @click="receiveCoupon(coupon)"
          >
            <view class="coupon-content">
              <text class="coupon-money">{{ formatMoney(coupon.couponMoney) }}</text>
              <text class="coupon-limit">满{{ formatMoney(coupon.fullMoneyIsUse) }}元可用</text>
              <text class="coupon-time">有效期至{{ coupon.endTime || "" }}</text>
            </view>
            <text v-if="coupon.receiveStatus === '2'" class="coupon-action">领\n取</text>
          </view>
        </view>
      </scroll-view>

      <view class="divider"></view>

      <view class="info-row address-row">
        <u-icon name="map" size="18" color="#999"></u-icon>
        <text class="info-text">{{ shopInfo.address || "" }}</text>
        <u-icon
          class="call-icon"
          name="phone-fill"
          size="19"
          color="#666"
          @click="callShop"
        ></u-icon>
      </view>

      <view class="divider"></view>

      <view class="info-row">
        <u-icon name="clock" size="18" color="#999"></u-icon>
        <text class="info-text">{{ openingTimeText }}</text>
      </view>

      <view class="section-gap"></view>

      <view class="image-section">
        <text class="section-title">商家环境</text>
        <view v-if="environmentImages.length > 0" class="image-grid">
          <image
            v-for="(image, index) in environmentImages"
            :key="`environment-${image}-${index}`"
            class="detail-image"
            :src="image"
            mode="aspectFill"
            @click="previewImages(environmentImages, image)"
          ></image>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="image-section">
        <text class="section-title">商家资质信息公示</text>
        <view v-if="licenseImages.length > 0" class="image-grid">
          <image
            v-for="(image, index) in licenseImages"
            :key="`license-${image}-${index}`"
            class="detail-image"
            :src="image"
            mode="aspectFill"
            @click="previewImages(licenseImages, image)"
          ></image>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getShopDetailInfo, receiveShopCoupon } from "@/api/service";
import { BaseImgURL, storage } from "@/utils/storage";

interface CouponItem {
  couponMoney?: number | string;
  fullMoneyIsUse?: number | string;
  endTime?: string;
  receiveStatus?: string;
  couponId?: string;
}

interface ShopInfo {
  address?: string;
  coverImg?: string;
  linkMobile?: string;
  shopName?: string;
  collNum?: number | string;
  paperPath?: string;
  shopImg?: string;
  opStartTime?: string;
  opEndTime?: string;
  couponList?: CouponItem[];
}

const bgColor = ref("#2a9598");
const shopId = ref("");
const shopInfo = ref<ShopInfo>({});
const refreshing = ref(false);

const couponList = computed(() => shopInfo.value.couponList || []);

const openingTimeText = computed(() => {
  const start = shopInfo.value.opStartTime || "";
  const end = shopInfo.value.opEndTime || "";
  if (!start && !end) return "暂无";
  if (start && !end) return start;
  if (!start && end) return end;
  return `${start}-${end}`;
});

const environmentImages = computed(() => splitImages(shopInfo.value.shopImg));
const licenseImages = computed(() => splitImages(shopInfo.value.paperPath));

function goBack() {
  uni.navigateBack();
}

function resolveImage(image?: string) {
  if (!image) return "/static/default-image.png";
  if (/^https?:\/\//.test(image) || image.startsWith("/static")) return image;
  return `${BaseImgURL}${image.replace(/^\//, "")}`;
}

function splitImages(images?: string) {
  if (!images) return [];
  return images
    .split(",")
    .map((image) => image.trim())
    .filter(Boolean)
    .map((image) => resolveImage(image));
}

function formatMoney(value?: number | string) {
  const numberValue = Number(value || 0);
  if (Number.isNaN(numberValue)) return "0";
  return Number.isInteger(numberValue) ? String(numberValue) : numberValue.toFixed(2);
}

function previewImages(images: string[], current: string) {
  if (images.length === 0) return;
  uni.previewImage({
    urls: images,
    current,
  });
}

async function loadShopInfo() {
  if (!shopId.value) {
    uni.showToast({ title: "缺少店铺ID", icon: "none" });
    refreshing.value = false;
    return;
  }

  try {
    const res: any = await getShopDetailInfo({
      shopId: shopId.value,
      shortInfo: "1",
      manageId: storage.getManid(),
      userId: storage.getUserId(),
    });

    if (res?.resultCode === 200 && res.result) {
      shopInfo.value = res.result;
    } else {
      uni.showToast({ title: res?.message || "店铺信息加载失败", icon: "none" });
    }
  } catch (error: any) {
    uni.showToast({ title: error?.message || "店铺信息加载失败", icon: "none" });
  } finally {
    refreshing.value = false;
    uni.stopPullDownRefresh();
  }
}

async function receiveCoupon(coupon: CouponItem) {
  if (coupon.receiveStatus !== "2" || !coupon.couponId) return;

  try {
    const res: any = await receiveShopCoupon({
      couponId: coupon.couponId,
      userId: storage.getUserId(),
    });
    if (res?.resultCode === 200 || res?.success !== false) {
      coupon.receiveStatus = "1";
      uni.showToast({ title: "领取成功", icon: "none" });
      return;
    }
    uni.showToast({ title: res?.message || "领取失败", icon: "none" });
  } catch (error: any) {
    uni.showToast({ title: error?.message || "领取失败", icon: "none" });
  }
}

function callShop() {
  const phoneNumber = shopInfo.value.linkMobile || "";
  if (!phoneNumber) {
    uni.showToast({ title: "拨打电话号码为空", icon: "none" });
    return;
  }
  uni.makePhoneCall({
    phoneNumber,
    fail: () => {
      uni.showToast({ title: "拨打电话失败", icon: "none" });
    },
  });
}

function handleRefresh() {
  refreshing.value = true;
  loadShopInfo();
}

onLoad((options: any) => {
  shopId.value = options?.shopId || options?.shopid || "";
  loadShopInfo();
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
  background: #f3f4f8;
}

.shop-head,
.info-row,
.image-section {
  background: #fff;
}

.shop-head {
  min-height: 70px;
  display: flex;
  align-items: center;
  padding: 15px 18px 14px 15px;
  box-sizing: border-box;
}

.shop-image {
  width: 51px;
  height: 51px;
  flex: 0 0 51px;
  border-radius: 50%;
  background: #f5f5f5;
}

.shop-main {
  min-width: 0;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
}

.shop-name {
  color: #333;
  font-size: 17px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.follow-num {
  color: #989898;
  font-size: 12px;
  line-height: 18px;
}

.coupon-scroll {
  width: 100%;
  min-height: 112px;
  background: #fff;
  white-space: nowrap;
}

.coupon-list {
  display: inline-flex;
  padding: 10px 15px;
  box-sizing: border-box;
}

.coupon-item {
  width: 210px;
  height: 92px;
  flex: 0 0 210px;
  display: flex;
  margin-right: 13px;
  border: 1px solid #ffd59f;
  border-radius: 4px;
  overflow: hidden;
  background: #fff4df;
  box-sizing: border-box;
}

.coupon-item.received {
  border-color: #dedede;
  background: #f5f5f5;
}

.coupon-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.coupon-money {
  color: #333;
  font-size: 25px;
  line-height: 28px;
}

.coupon-limit {
  margin-top: 5px;
  color: #333;
  font-size: 11px;
  line-height: 16px;
}

.coupon-time {
  margin-top: 6px;
  color: #333;
  font-size: 9px;
  line-height: 14px;
}

.coupon-action {
  width: 40px;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ec7f47;
  font-size: 15px;
  line-height: 20px;
  white-space: pre-line;
}

.divider {
  height: 1px;
  background: #d9d9d9;
}

.info-row {
  min-height: 52px;
  display: flex;
  align-items: center;
  padding: 12px 18px 11px 15px;
  box-sizing: border-box;
}

.info-text {
  flex: 1;
  min-width: 0;
  margin-left: 10px;
  color: #333;
  font-size: 13px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.call-icon {
  flex: 0 0 auto;
  margin-left: 10px;
  padding-left: 10px;
}

.section-gap {
  height: 10px;
  background: #f3f4f8;
}

.image-section {
  padding: 15px 13px 20px;
  box-sizing: border-box;
}

.section-title {
  display: block;
  margin-left: 4px;
  margin-bottom: 10px;
  color: #333;
  font-size: 15px;
  line-height: 21px;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background: #f5f5f5;
}
</style>
