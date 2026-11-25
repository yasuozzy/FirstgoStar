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
          <view v-else class="address-empty">请选择收货地址</view>
          <view v-if="address.id" class="address-detail">
            {{ addressinfo }}
          </view>
        </view>
        <u-icon name="arrow-right" size="18" color="#999999"></u-icon>
      </view>

      <u-gap height="10" bgColor="#f5f5f5"></u-gap>

      <view class="shop-list">
        <view v-for="(shopItem, shopIndex) in orderCompleteParamList" :key="shopIndex" class="shop-block">
          <view class="shop-title">
            {{ shopItem.shopName }}
            <u-icon name="arrow-right" size="14" color="#333333"></u-icon>
          </view>
          <view v-for="(item, index) in shopItem.productArray" :key="item.cartId || index" class="product-item">
            <image class="product-img" :src="resolveImage(item.img)" mode="aspectFill"></image>
            <view class="product-main">
              <view class="product-name">{{ item.name }}</view>
              <view class="product-specs">{{ item.specs }}</view>
              <view class="product-bottom">
                <text class="product-price">¥{{ formatMoney(item.price) }}</text>
                <text class="product-count">x{{ item.nums }}</text>
              </view>
            </view>
          </view>
          <view v-if="shopItem.cutdown > 0" class="shop-discount">
            本单优惠：¥{{ formatMoney(shopItem.cutdown) }}
          </view>
          <view v-else class="coupon-row" @click="selectCoupon(shopItem)">
            <text class="coupon-label">优惠券</text>
            <view class="coupon-value">
              <text>{{ getCouponText(shopItem) }}</text>
              <u-icon name="arrow-right" size="14" color="#666666"></u-icon>
            </view>
          </view>
        </view>
      </view>

      <u-gap height="10" bgColor="#f5f5f5"></u-gap>

      <view class="section-card">
        <view class="section-label">备注：</view>
        <input
          v-model="remark"
          class="remark-input"
          placeholder="请输入备注"
          placeholder-style="color: #999"
        />
      </view>

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
        <view v-if="sendType === 1 && deliveryFeeText" class="sub-text">
          运费：¥{{ deliveryFeeText }}
        </view>
      </view>

      <view class="section-card">
        <view class="section-head">支付方式</view>
        <view class="choice-row">
          <view class="choice-item" :class="{ active: payType === 0 }" @click="setPayType(0)">
            自购
          </view>
          <view class="choice-item" :class="{ active: payType === 1 }" @click="setPayType(1)">
            代付
          </view>
        </view>
      </view>

      <view class="summary-card">
        <text v-if="discountText" class="summary-line">优惠：¥{{ discountText }}</text>
        <text v-if="deliveryFeeText" class="summary-line">运费：¥{{ deliveryFeeText }}</text>
        <text class="summary-total">合计：¥{{ totalMoneyText }}</text>
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view class="bottom-price">
        <text class="bottom-label">合计：</text>
        <text class="bottom-value">¥{{ totalMoneyText }}</text>
      </view>
      <view class="submit-btn" @click="handleSubmit">提交订单</view>
    </view>

    <u-popup :show="showDaifuPopup" mode="center" :round="10" @close="closeDaifuPopup">
      <view class="popup-panel">
        <view class="popup-title">代付信息</view>
        <view class="popup-field">
          <text class="popup-field-label">姓名</text>
          <input v-model="behalfName" class="popup-input" placeholder="请输入姓名" />
        </view>
        <view class="popup-field">
          <text class="popup-field-label">手机</text>
          <input v-model="behalfMobile" class="popup-input" placeholder="请输入手机号" />
        </view>
        <view class="popup-actions">
          <view class="popup-btn plain" @click="closeDaifuPopup">取消</view>
          <view class="popup-btn primary" @click="confirmDaifu">确认</view>
        </view>
      </view>
    </u-popup>

    <u-popup :show="showGongcaiPopup" mode="center" :round="10" @close="closeGongcaiPopup">
      <view class="popup-panel">
        <view class="popup-title">公采</view>
        <view class="popup-field selectable" @click="showCompanyPicker = true">
          <text class="popup-field-label">公司</text>
          <text class="popup-field-value">{{ selectedCompanyName || "请选择公司" }}</text>
        </view>
        <view class="popup-field selectable" @click="showAccountPicker = true">
          <text class="popup-field-label">账户</text>
          <text class="popup-field-value">{{ selectedAccountMobile || "请选择账户" }}</text>
        </view>
        <view v-if="accountBalanceText" class="sub-text">账户可用余额：{{ accountBalanceText }}</view>
        <view class="popup-actions">
          <view class="popup-btn plain" @click="closeGongcaiPopup">取消</view>
          <view class="popup-btn primary" @click="confirmGongcai">确认</view>
        </view>
      </view>
    </u-popup>

    <u-popup :show="showCompanyPicker" mode="bottom" :round="10" @close="showCompanyPicker = false">
      <view class="list-popup">
        <view class="list-popup-head">选择公司</view>
        <scroll-view class="list-popup-scroll" scroll-y>
          <view
            v-for="item in companyList"
            :key="item.com_id"
            class="list-popup-item"
            @click="chooseCompany(item)"
          >
            {{ item.com_name }}
          </view>
        </scroll-view>
      </view>
    </u-popup>

    <u-popup :show="showAccountPicker" mode="bottom" :round="10" @close="showAccountPicker = false">
      <view class="list-popup">
        <view class="list-popup-head">选择账户</view>
        <scroll-view class="list-popup-scroll" scroll-y>
          <view
            v-for="item in companyAccountList"
            :key="item.act_user_id"
            class="list-popup-item"
            @click="chooseAccount(item)"
          >
            {{ item.act_mobile }}
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  getActBalance,
  getAuthComPurList,
  getComActList,
  getDefaultAddress,
  getDeliveryFee,
  getDiscountCouponsAndAmount,
  orderNosPay,
  orderSubmit,
} from "@/api/service";
import eventBus from "@/utils/eventBus";
import { BaseImgURL, storage } from "@/utils/storage";

type PayType = 0 | 1 | 2;
type SendType = 0 | 1;

interface ProductItem {
  cartId?: string;
  img?: string;
  name?: string;
  nums?: number;
  price?: number | string;
  specs?: string;
}

interface ShopOrderItem {
  shopCode?: string;
  shopName?: string;
  shopCoupon?: number | string;
  cutdown?: number | string;
  couponId?: string;
  couponType?: string;
  productArray: ProductItem[];
}

interface OrderCouponItem {
  couponId?: string;
  couponName?: string;
  couponMoney?: number | string;
  fullMoneyIsUse?: number | string;
  endTime?: string;
  useExplain?: string;
  useType?: string;
  COUPON_USE_TYPE?: number;
}

interface SelectedCouponItem {
  shopCode?: string;
  resultBean: OrderCouponItem;
}

interface CouponIdItem {
  shopCode?: string;
  couponId?: string;
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
const remark = ref("");
const totalAmount = ref(0);
const giftMoney = ref(0);
const extraDiscountMoney = ref(0);
const deliveryFee = ref(0);
const sendType = ref<SendType>(0);
const payType = ref<PayType>(0);
const isSubmitting = ref(false);
const showDaifuPopup = ref(false);
const showGongcaiPopup = ref(false);
const showCompanyPicker = ref(false);
const showAccountPicker = ref(false);
const behalfName = ref("");
const addressinfo = storage.getManname() + storage.getBldgname() + storage.getHsenum();
const behalfMobile = ref("");
const companyList = ref<any[]>([]);
const companyAccountList = ref<any[]>([]);
const selectedCompany = ref<any>(null);
const selectedAccount = ref<any>(null);
const accountBalance = ref("");
const selectedCoupons = ref<SelectedCouponItem[]>([]);
const couponIds = ref<CouponIdItem[]>([]);
const submittedOrderNo = ref("");

const totalMoney = computed(() => {
  return totalAmount.value - giftMoney.value - extraDiscountMoney.value + deliveryFee.value;
});

const totalMoneyText = computed(() => formatMoney(totalMoney.value));
const discountText = computed(() => formatMoney(giftMoney.value + extraDiscountMoney.value));
const deliveryFeeText = computed(() => formatMoney(deliveryFee.value));
const selectedCompanyName = computed(() => selectedCompany.value?.com_name || "");
const selectedAccountMobile = computed(() => selectedAccount.value?.act_mobile || "");
const accountBalanceText = computed(() => accountBalance.value);

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

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function goBack() {
  uni.navigateBack();
}

function selectAddress() {
	uni.navigateTo({
	    url: "/pages/service/bussinessaddress/BussinessSelectAddressPage"
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
  const res = await getDefaultAddress({ userId: storage.getUserId() });
  if (res?.resultCode === 200 && res.result) {
    address.value = res.result;
  }
}

async function loadDiscountCouponsAndAmount() {
  const cartIdStr = buildCartIdStr();
  if (!cartIdStr) return;
  const res = await getDiscountCouponsAndAmount({
    cartIdStr,
    userId: storage.getUserId(),
  });
  if (res?.resultCode === 200 && res.result) {
    const discounAmount = Number(res.result.discounAmount || 0);
    extraDiscountMoney.value = Number.isNaN(discounAmount) ? 0 : discounAmount;
    if (orderCompleteParamList.value.length > 0) {
      orderCompleteParamList.value[0].cutdown = extraDiscountMoney.value;
    }
  }
}

async function loadDeliveryFee() {
  if (sendType.value !== 1) {
    deliveryFee.value = 0;
    return;
  }
  const cartIdStr = buildCartIdStr();
  if (!cartIdStr) return;
  const res = await getDeliveryFee({ cartIdStr });
  if (res?.resultCode === 200 || res?.success !== false) {
    deliveryFee.value = Number(res?.result || 0);
  }
}

async function loadCompanyList() {
  const res = await getAuthComPurList({ userId: storage.getUserId() });
  companyList.value = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
}

async function loadCompanyAccounts(comId: string) {
  const res = await getComActList({
    userId: storage.getUserId(),
    comId,
  });
  companyAccountList.value = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
}

async function loadAccountBalance(actUserId: string) {
  const res = await getActBalance({ act_user_id: actUserId });
  if (res?.resultCode === 200) {
    accountBalance.value = String(res?.result ?? "");
  } else {
    accountBalance.value = "";
  }
}

function setSendType(type: SendType) {
  sendType.value = type;
  loadDeliveryFee();
}

function setPayType(type: PayType) {
  payType.value = type;
  if (type === 1) {
    showDaifuPopup.value = true;
  } else if (type === 2) {
    showGongcaiPopup.value = true;
    if (companyList.value.length === 0) {
      loadCompanyList();
    }
  }
}

function getCouponText(shopItem: ShopOrderItem) {
  const selected = selectedCoupons.value.find((item) => item.shopCode === shopItem.shopCode);
  if (selected?.resultBean) {
    return `${formatMoney(selected.resultBean.couponMoney)}元优惠券`;
  }
  if (Number(shopItem.shopCoupon || 0) > 0) {
    return `${formatMoney(shopItem.shopCoupon)}元优惠券`;
  }
  return "请选择优惠券";
}

function selectCoupon(shopItem: ShopOrderItem) {
  if (!shopItem.shopCode || !Array.isArray(shopItem.productArray)) {
    showToast("数据错误");
    return;
  }
  uni.navigateTo({
    url:
      `/pages/service/BussinessCircle/BussinessOrderSelectCouponPage` +
      `?shopCode=${encodeURIComponent(shopItem.shopCode)}` +
      `&data=${encodeURIComponent(JSON.stringify(shopItem.productArray))}` +
      `&ids=${encodeURIComponent(JSON.stringify(couponIds.value))}`,
  });
}

function handleCouponSelected(payload: { shopCode?: string; data?: OrderCouponItem }) {
  const shopCode = payload?.shopCode;
  const data = payload?.data;
  if (!shopCode || !data?.couponId) return;

  selectedCoupons.value = selectedCoupons.value.filter((item) => item.shopCode !== shopCode);
  couponIds.value = couponIds.value.filter((item) => item.shopCode !== shopCode);
  selectedCoupons.value.push({ shopCode, resultBean: data });
  couponIds.value.push({ shopCode, couponId: data.couponId });

  orderCompleteParamList.value.forEach((shopItem) => {
    if (shopItem.shopCode === shopCode) {
      shopItem.couponId = data.couponId;
      shopItem.couponType = data.useType;
      shopItem.shopCoupon = data.couponMoney || 0;
    }
  });
  recalcAmount();
}

function closeDaifuPopup() {
  showDaifuPopup.value = false;
}

function closeGongcaiPopup() {
  showGongcaiPopup.value = false;
}

function chooseCompany(item: any) {
  selectedCompany.value = item;
  selectedAccount.value = null;
  accountBalance.value = "";
  showCompanyPicker.value = false;
  loadCompanyAccounts(item.com_id);
}

function chooseAccount(item: any) {
  selectedAccount.value = item;
  showAccountPicker.value = false;
  loadAccountBalance(item.act_user_id);
}

function confirmDaifu() {
  if (!behalfName.value.trim() || !behalfMobile.value.trim()) {
    showToast("请输入完整信息");
    return;
  }
  showDaifuPopup.value = false;
  submitOrder(1);
}

function confirmGongcai() {
  if (!selectedCompany.value?.com_id || !selectedAccount.value?.act_user_id) {
    showToast("请输入完整信息");
    return;
  }
  showGongcaiPopup.value = false;
  submitOrder(2);
}

function getOrderSubmitBase() {
  const cartIdStr = buildCartIdStr();
  const amountBean = {
    paymentAmount: Number(totalMoney.value.toFixed(2)),
    totalAmount: Number(totalAmount.value.toFixed(2)),
    discountAmount: Number((giftMoney.value + extraDiscountMoney.value).toFixed(2)),
    freight: Number(deliveryFee.value.toFixed(2)),
  };

  return {
    address: address.value.address || "",
    addressId: address.value.id || "",
    amountBean: JSON.stringify(amountBean).replace(/\\/g, ""),
    discountBean:
      extraDiscountMoney.value > 0
        ? JSON.stringify({ discounAmount: extraDiscountMoney.value }).replace(/\\/g, "")
        : "",
    cartIdStr,
    shopBeanAry: JSON.stringify(orderCompleteParamList.value).replace(/\\/g, ""),
    userId: storage.getUserId(),
    deliveryType: String(sendType.value),
    deliveryFee: String(deliveryFee.value),
    remarks: remark.value,
  };
}

async function submitOrder(behavior: 0 | 1 | 2) {
  if (!address.value.id) {
    showToast("请选择收货地址");
    return;
  }

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  const param: Record<string, any> = getOrderSubmitBase();

  if (behavior === 1) {
    param.behalfType = "1";
    param.behalfNname = behalfName.value;
    param.behalfMobile = behalfMobile.value;
  }

  if (behavior === 2) {
    param.behalfType = "2";
    param.est_com_id = selectedCompany.value?.com_id || "";
    param.est_com_name = selectedCompany.value?.com_name || "";
    param.act_user_id = selectedAccount.value?.act_user_id || "";
    param.act_mobile = selectedAccount.value?.act_mobile || "";
  }

  try {
    const res = await orderSubmit(param);
	console.log(res);
    if (res?.resultCode === 200 || res?.success !== false) {
      if (behavior > 0) {
        uni.$emit("refresh-cart");
        showToast("下单成功");
        uni.navigateBack();
        return;
      }
      const orderNos = res?.result?.orderNos || res?.result?.orderNo || res?.orderNos || "";
      if (!orderNos) {
        showToast("订单信息异常");
        return;
      }
      submittedOrderNo.value = orderNos;
      uni.$emit("refresh-cart");
      eventBus.emit("refresh-order-list");
      eventBus.emit("refresh-order-num");
      await gotoPay(orderNos);
      return;
    }
    showToast(res?.message || res?.FAPErrorMessage || "提交失败");
  } catch (err: any) {
    showToast(err?.message || "提交失败");
  } finally {
    isSubmitting.value = false;
  }
}

async function gotoPay(orderNos: string) {
  try {
    const res = await orderNosPay({
      hostNo: storage.getHostNo(),
      mobile: storage.getPhone(),
      orderNo: orderNos,
      osName: "android",
      userName: storage.getNickName(),
    });
    console.log(res);
    if (res?.resultCode === 200 || res?.success !== false) {
      const payUrl = res?.result?.payUrl || res?.payUrl || "";
      if (!payUrl) {
        showToast("支付地址获取失败");
        return false;
      }
      uni.navigateTo({
        url: `/pages/service/WebViewPage/WebPayPage?title=${encodeURIComponent("付款")}&url=${encodeURIComponent(payUrl)}`,
      });
      return true;
    }
    showToast(res?.message || res?.FAPErrorMessage || "获取支付信息失败");
    return false;
  } catch (err: any) {
    showToast(err?.message || "获取支付信息失败");
    return false;
  }
}

function handleSubmit() {
  if (submittedOrderNo.value) {
    gotoPay(submittedOrderNo.value);
    return;
  }
  if (payType.value === 1) {
    showDaifuPopup.value = true;
    return;
  }
  if (payType.value === 2) {
    showGongcaiPopup.value = true;
    if (companyList.value.length === 0) {
      loadCompanyList();
    }
    return;
  }
  submitOrder(0);
}

// function handlePayFinish() {
  
// }

function initPage() {
  submittedOrderNo.value = "";
  orderCompleteParamList.value = (uni.getStorageSync("BussinessShopCarList") || []) as ShopOrderItem[];
  if (!Array.isArray(orderCompleteParamList.value)) {
    orderCompleteParamList.value = [];
  }
  recalcAmount();
  loadDefaultAddress();
  loadDiscountCouponsAndAmount();
  if (sendType.value === 1) {
    loadDeliveryFee();
  }
}

onLoad(() => {
  initPage();
  uni.$on("payfinish", handlePayFinish);
  uni.$on("order-coupon-selected", handleCouponSelected);
});

onMounted(() => {
  eventBus.on("preselectaddress", handleUpdateData);
});

onUnmounted(() => {
  eventBus.off("preselectaddress", handleUpdateData);
  uni.$off("payfinish", handlePayFinish);
  uni.$off("order-coupon-selected", handleCouponSelected);
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

.address-name {
  color: #333;
  font-size: 14px;
}

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

.coupon-row {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-top: 1px solid #f0f0f0;
  box-sizing: border-box;
  background: #fff;
}

.coupon-label,
.coupon-value {
  color: #666;
  font-size: 12px;
}

.coupon-value {
  display: flex;
  align-items: center;
  gap: 4px;
}

.section-card,
.summary-card {
  margin-top: 10px;
  padding: 12px;
  box-sizing: border-box;
}

.section-label,
.section-head {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.section-head {
  margin-bottom: 10px;
}

.remark-input {
  flex: 1;
  min-width: 0;
  margin-left: 8px;
  font-size: 14px;
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

.popup-panel {
  width: 84vw;
  padding: 16px;
  background: #fff;
  box-sizing: border-box;
}

.popup-title {
  margin-bottom: 12px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.popup-field {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 6px;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.popup-field.selectable {
  justify-content: space-between;
}

.popup-field-label {
  color: #333;
  font-size: 13px;
}

.popup-field-value {
  color: #666;
  font-size: 13px;
}

.popup-input {
  flex: 1;
  min-width: 0;
  text-align: right;
  font-size: 13px;
}

.popup-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.popup-btn {
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 14px;
}

.popup-btn.plain {
  border: 1px solid #d9d9d9;
  color: #333;
}

.popup-btn.primary {
  background: #2a9598;
  color: #fff;
}

.list-popup {
  max-height: 60vh;
  background: #fff;
}

.list-popup-head {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  font-size: 15px;
  font-weight: 600;
}

.list-popup-scroll {
  max-height: calc(60vh - 44px);
}

.list-popup-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
  color: #333;
  font-size: 13px;
}
</style>
