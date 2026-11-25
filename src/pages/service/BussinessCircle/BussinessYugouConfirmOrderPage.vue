<template>
  <view class="page">
    <u-navbar
      title="确认订单"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>

    <scroll-view class="content" scroll-y>
      <view class="address-card" @click="selectAddress">
        <view class="address-icon">
          <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
        </view>
        <view class="address-main">
          <view v-if="address.id" class="address-name">
            {{ address.acceptName }} {{ address.mobile }}
          </view>
          <view v-else class="address-empty">请选择收货信息</view>
          <view v-if="address.id" class="address-detail">
            {{ addressText }}
          </view>
        </view>
        <u-icon name="arrow-right" size="18" color="#999999"></u-icon>
      </view>

      <u-gap height="10" bgColor="#f5f5f5"></u-gap>

      <view class="shop-list">
        <view v-for="(shopItem, shopIndex) in orderCompleteParamList" :key="shopIndex" class="shop-block">
          <view class="shop-title">
            {{ shopItem.shopName || "" }}
            <u-icon name="arrow-right" size="14" color="#333333"></u-icon>
          </view>

          <view v-for="(item, index) in shopItem.productArray" :key="item.cartId || index" class="product-item">
            <image class="product-img" :src="resolveImage(item.img)" mode="aspectFill"></image>
            <view class="product-main">
              <view class="product-name">{{ item.name || "" }}</view>
              <view v-if="item.specs" class="product-specs">{{ item.specs }}</view>
              <view class="product-bottom">
                <text class="product-price">¥{{ formatMoney(item.price) }}</text>
                <text class="product-count">x{{ item.nums || 0 }}</text>
              </view>
            </view>
          </view>

          <view v-if="Number(shopItem.cutdown || 0) > 0" class="shop-discount">
            本单优惠：¥{{ formatMoney(shopItem.cutdown) }}
          </view>
        </view>
      </view>

      <u-gap height="10" bgColor="#f5f5f5"></u-gap>

      <view class="section-card">
        <view class="section-head">配送方式</view>
        <view class="choice-row">
          <view class="choice-item" :class="{ active: sendType === 0 }" @click="setSendType(0)">
            自提
          </view>
          <view class="choice-item" :class="{ active: sendType === 1 }" @click="setSendType(1)">
            配送
          </view>
        </view>
        <view v-if="sendType === 1 && deliveryFee > 0" class="sub-text">
          运费：¥{{ deliveryFeeText }}
        </view>
      </view>

      <view class="summary-card">
        <text v-if="favourableAmount > 0" class="summary-line">优惠：¥{{ favourableText }}</text>
        <text v-if="sendType === 1 && deliveryFee > 0" class="summary-line">运费：¥{{ deliveryFeeText }}</text>
        <text class="summary-total">合计：¥{{ displayAmountText }}</text>
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view class="bottom-price">
        <text class="bottom-label">合计：</text>
        <text class="bottom-value">¥{{ displayAmountText }}</text>
      </view>
      <view class="submit-btn" :class="{ disabled: isSubmitting }" @click="handleSubmit">
        提交订单
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  getDefaultAddress,
  getDeliveryFee,
  getDiscountCouponsAndAmount,
  orderSubmitOrdPre,
} from "@/api/service";
import eventBus from "@/utils/eventBus";
import { BaseImgURL, storage } from "@/utils/storage";

type SendType = 0 | 1;

interface ProductItem {
  cartId?: string;
  img?: string;
  name?: string;
  nums?: number | string;
  price?: number | string;
  specs?: string;
}

interface ShopOrderItem {
  shopCode?: string;
  shopName?: string;
  shopCoupon?: number | string;
  cutdown?: number | string;
  productArray?: ProductItem[];
  submitActiveBeanAry?: any[];
}

interface AddressItem {
  id?: string;
  acceptName?: string;
  mobile?: string;
  address?: string;
}

const bgColor = ref("#2a9598");
const orderCompleteParamList = ref<ShopOrderItem[]>([]);
const address = ref<AddressItem>({});
const totalAmount = ref(0);
const giftMoney = ref(0);
const discountAmount = ref(0);
const discountBean = ref<Record<string, any> | null>(null);
const deliveryFee = ref(0);
const sendType = ref<SendType>(0);
const isSubmitting = ref(false);

const addressText = computed(() => {
  return `${storage.getManname()} ${storage.getBldgname()} ${storage.getHsenum()}`.trim();
});

const productPayAmount = computed(() => {
  return Math.max(0, totalAmount.value - giftMoney.value - discountAmount.value);
});

const displayAmount = computed(() => {
  return productPayAmount.value + deliveryFee.value;
});

const favourableAmount = computed(() => {
  return giftMoney.value + discountAmount.value;
});

const displayAmountText = computed(() => formatMoney(displayAmount.value));
const favourableText = computed(() => formatMoney(favourableAmount.value));
const deliveryFeeText = computed(() => formatMoney(deliveryFee.value));

function resolveImage(img?: string) {
  if (!img) return "/static/default-image.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatMoney(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0.00";
  return num.toFixed(2);
}

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function goBack() {
  uni.navigateBack();
}

function selectAddress() {
  uni.navigateTo({
    url: "/pages/service/bussinessaddress/BussinessSelectAddressPage",
  });
}

function handleUpdateData(data: AddressItem) {
  address.value = data || {};
}

function buildCartIdStr() {
  return orderCompleteParamList.value
    .flatMap((shopItem) => shopItem.productArray || [])
    .map((item) => item.cartId)
    .filter(Boolean)
    .join(",");
}

function recalcAmount() {
  let amount = 0;
  let couponMoney = 0;

  orderCompleteParamList.value.forEach((shopItem) => {
    (shopItem.productArray || []).forEach((productItem) => {
      amount += Number(productItem.price || 0) * Number(productItem.nums || 0);
    });
    couponMoney += Number(shopItem.shopCoupon || 0);
  });

  totalAmount.value = amount;
  giftMoney.value = couponMoney;
}

async function loadDefaultAddress() {
  try {
    const res: any = await getDefaultAddress({ userId: storage.getUserId() });
    if (res?.resultCode === 200 && res.result) {
      address.value = res.result;
      return;
    }
    address.value = {};
  } catch {
    address.value = {};
  }
}

async function loadDiscountCouponsAndAmount() {
  const cartIdStr = buildCartIdStr();
  if (!cartIdStr) return;

  try {
    const res: any = await getDiscountCouponsAndAmount({
      cartIdStr,
      userId: storage.getUserId(),
    });

    if (res?.resultCode === 200 && res.result) {
      const nextDiscount = Number(res.result.discounAmount || 0);
      discountAmount.value = Number.isNaN(nextDiscount) ? 0 : nextDiscount;
      discountBean.value = res.result;

      if (orderCompleteParamList.value.length > 0) {
        orderCompleteParamList.value[0].cutdown = discountAmount.value;
      }
    }
  } catch {
    discountAmount.value = 0;
    discountBean.value = null;
  }
}

async function loadDeliveryFee() {
  if (sendType.value !== 1) {
    deliveryFee.value = 0;
    return;
  }

  const cartIdStr = buildCartIdStr();
  if (!cartIdStr) return;

  try {
    const res: any = await getDeliveryFee({ cartIdStr });
    if (res?.resultCode === 200 || res?.success !== false) {
      const nextFee = Number(res?.result || 0);
      deliveryFee.value = Number.isNaN(nextFee) ? 0 : nextFee;
    }
  } catch {
    deliveryFee.value = 0;
  }
}

function setSendType(type: SendType) {
  sendType.value = type;
  loadDeliveryFee();
}

function buildSubmitShopList() {
  return orderCompleteParamList.value.map((shopItem) => ({
    ...shopItem,
    submitActiveBeanAry: [],
    productArray: shopItem.productArray || [],
  }));
}

function buildSubmitParam() {
  const amountBean = {
    paymentAmount: Number(productPayAmount.value.toFixed(2)),
    totalAmount: Number(totalAmount.value.toFixed(2)),
    discountAmount: Number(giftMoney.value.toFixed(2)),
    freight: 0,
  };

  return {
    address: addressText.value,
    addressId: address.value.id || "",
    amountBean: JSON.stringify(amountBean),
    discountBean: discountBean.value ? JSON.stringify(discountBean.value) : "",
    cartIdStr: buildCartIdStr(),
    shopBeanAry: JSON.stringify(buildSubmitShopList()),
    userId: storage.getUserId(),
    deliveryType: String(sendType.value),
    deliveryFee: sendType.value === 1 ? String(deliveryFee.value) : "",
  };
}

async function submitOrder() {
  if (!address.value.id) {
    showToast("请选择收货人信息");
    return;
  }

  const cartIdStr = buildCartIdStr();
  if (!cartIdStr) {
    showToast("数据错误");
    return;
  }

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const res: any = await orderSubmitOrdPre(buildSubmitParam());
    if (res?.resultCode === 200 || res?.success !== false) {
      uni.$emit("refresh-cart");
      showToast("提交成功");
      uni.navigateBack();
      return;
    }
    showToast(res?.message || res?.FAPErrorMessage || "提交失败");
  } catch (err: any) {
    showToast(err?.message || "提交失败");
  } finally {
    isSubmitting.value = false;
  }
}

function handleSubmit() {
  submitOrder();
}

function initPage() {
  const storedList = uni.getStorageSync("BussinessShopCarList");
  orderCompleteParamList.value = Array.isArray(storedList) ? storedList : [];

  if (orderCompleteParamList.value.length === 0) {
    showToast("数据错误");
    uni.navigateBack();
    return;
  }

  recalcAmount();
  loadDefaultAddress();
  loadDiscountCouponsAndAmount();
}

onLoad(() => {
  initPage();
});

onMounted(() => {
  eventBus.on("preselectaddress", handleUpdateData);
});

onUnmounted(() => {
  eventBus.off("preselectaddress", handleUpdateData);
});
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.content {
  flex: 1;
  min-height: 0;
  padding-bottom: calc(72px + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.address-card,
.section-card,
.summary-card,
.shop-block {
  background: #fff;
}

.address-card {
  min-height: 80px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.address-icon {
  flex: 0 0 auto;
}

.address-main {
  flex: 1;
  min-width: 0;
  margin: 0 12px;
}

.address-name,
.address-empty {
  color: #333;
  font-size: 14px;
}

.address-detail {
  margin-top: 6px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}

.shop-list {
  background: #fff;
}

.shop-block {
  padding: 10px 12px 0;
  box-sizing: border-box;
}

.shop-title {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 8px;
  color: #333;
  font-size: 13px;
  font-weight: 600;
}

.product-item {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.product-img {
  width: 80px;
  height: 80px;
  flex: 0 0 80px;
  border-radius: 6px;
  background: #f5f5f5;
}

.product-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

.product-specs {
  color: #999;
  font-size: 12px;
  line-height: 18px;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: #e93b3d;
  font-size: 14px;
}

.product-count {
  color: #666;
  font-size: 13px;
}

.shop-discount {
  padding: 0 0 10px;
  color: #ff8900;
  font-size: 12px;
}

.section-card,
.summary-card {
  margin-top: 10px;
  padding: 12px;
  box-sizing: border-box;
}

.section-head {
  margin-bottom: 10px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.choice-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.choice-item {
  min-width: 78px;
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  color: #666;
  font-size: 13px;
  box-sizing: border-box;
}

.choice-item.active {
  border-color: #2a9598;
  color: #2a9598;
  background: #eef8f8;
}

.sub-text {
  margin-top: 8px;
  color: #666;
  font-size: 12px;
}

.summary-card {
  color: #333;
  font-size: 13px;
}

.summary-line {
  display: block;
  margin-bottom: 4px;
}

.summary-total {
  display: block;
  margin-top: 4px;
  color: #e93b3d;
  font-size: 15px;
  font-weight: 600;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 56px;
  padding: 0 12px calc(env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  box-sizing: border-box;
}

.bottom-price {
  min-width: 0;
  display: flex;
  align-items: center;
  color: #e93b3d;
}

.bottom-label {
  font-size: 13px;
}

.bottom-value {
  font-size: 16px;
  font-weight: 600;
}

.submit-btn {
  min-width: 96px;
  height: 38px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 19px;
  background: #2a9598;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box;
}

.submit-btn.disabled {
  opacity: 0.6;
}
</style>

