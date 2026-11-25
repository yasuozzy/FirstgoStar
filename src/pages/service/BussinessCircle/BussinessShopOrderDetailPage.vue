<template>
  <view class="page">
    <u-navbar
      title="订单详情"
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
      <view class="address-card">
        <view class="address-icon">
          <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
        </view>
        <view class="address-main">
          <view class="user-line">
            <text class="user-name">{{ orderInfo.userName || "" }}</text>
            <text class="user-mobile">{{ orderInfo.mobile || "" }}</text>
          </view>
          <view class="address-text">{{ orderInfo.address || "" }}</view>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="shop-card">
        <view class="shop-head">
          <view class="shop-name" @click="showRouteToast('店铺首页')">
            <text>{{ orderInfo.shopName || "" }}</text>
            <u-icon name="arrow-right" size="13" color="#333333"></u-icon>
          </view>
          <text class="status-name">{{ orderInfo.statusName || "" }}</text>
        </view>

        <view
          v-for="(goods, index) in goodsList"
          :key="goods.childId || goods.sku || index"
          class="goods-item"
          @click="showRouteToast('商品详情')"
        >
          <image class="goods-img" :src="resolveImage(goods.img)" mode="aspectFill"></image>
          <view class="goods-main">
            <text class="goods-name">{{ goods.name || "" }}</text>
            <text class="goods-price">{{ formatGoodsPrice(goods) }}</text>
            <text class="goods-num">x{{ goods.nums || 0 }}</text>
            <text class="goods-specs">{{ goods.specs || "" }}</text>
          </view>
        </view>
      </view>

      <view class="amount-card">
        <view class="amount-row">
          <text>店铺优惠券</text>
          <text>{{ formatPrice(orderInfo.discountAmount) }}</text>
        </view>
        <view v-if="showDeliveryFee" class="amount-row">
          <text>配送费</text>
          <text>{{ formatPrice(orderInfo.deliveryFee) }}</text>
        </view>
        <view class="amount-row total">
          <text>合计</text>
          <text>{{ totalAmountText }}</text>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="info-card">
        <view class="info-title">{{ infoTitle }}</view>
        <view v-if="behalfText" class="info-row">{{ behalfText }}</view>
        <view class="info-row">订单编号：{{ orderInfo.orderNo || "" }}</view>
        <view class="info-row">下单时间：{{ orderInfo.create_time || "" }}</view>
        <view class="info-row">支付方式：{{ orderInfo.paymentType || "" }}</view>
        <view v-if="orderInfo.remarks" class="info-row remark-row">
          <text>用户留言：</text>
          <text class="remark-text">{{ orderInfo.remarks }}</text>
        </view>
        <view v-if="showCancelReason" class="info-row">
          取消原因：{{ orderInfo.auditContents || "" }}
        </view>
      </view>

      <view class="contact-row" @click="callShop">
        <u-icon name="phone-fill" color="#2a9598" size="18"></u-icon>
        <text>联系卖家</text>
      </view>
    </scroll-view>

    <view v-if="actionButtons.length > 0" class="bottom-bar">
      <view
        v-for="button in actionButtons"
        :key="button.key"
        class="action-btn"
        @click="handleAction(button.key)"
      >
        {{ button.text }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import {
  behalfRemindPay,
  BussinessOrderNosPay,
  confirmUse,
  customerCancelOrder,
  getCustomerOrderInfoView,
  urgeOrder,
} from "@/api/service";
import eventBus from "@/utils/eventBus";
import { BaseImgURL, storage } from "@/utils/storage";

type ActionKey = "cancel" | "pay" | "confirm" | "evaluate" | "urge";

interface GoodsItem {
  childId?: string;
  img?: string;
  name?: string;
  nums?: number;
  price?: number | string;
  score?: number | string;
  sku?: string;
  specs?: string;
  type?: number;
}

interface OrderDetail {
  act_mobile?: string;
  address?: string;
  auditContents?: string;
  behalf_type?: number;
  behalf_user_mobile?: string;
  behalf_user_name?: string;
  create_time?: string;
  deliveryFee?: number | string;
  deliveryType?: string;
  discountAmount?: number | string;
  est_com_name?: string;
  mobile?: string;
  orderDetailAry?: GoodsItem[];
  orderId?: string;
  orderNo?: string;
  orderType?: number;
  order_user_mobile?: string;
  order_user_name?: string;
  overtimeStatus?: number;
  paymentType?: string;
  realPrice?: number | string;
  remarks?: string;
  score?: number | string;
  shopId?: string;
  shopMobile?: string;
  shopName?: string;
  status?: number;
  statusName?: string;
  userName?: string;
}

const bgColor = ref("#2a9598");
const orderId = ref("");
const orderInfo = ref<OrderDetail>({});
const loading = ref(false);

const goodsList = computed(() => {
  return Array.isArray(orderInfo.value.orderDetailAry) ? orderInfo.value.orderDetailAry : [];
});

const showDeliveryFee = computed(() => {
  return orderInfo.value.deliveryType !== "0";
});

const totalAmountText = computed(() => {
  const realPrice = Number(orderInfo.value.realPrice || 0);
  const deliveryFee = showDeliveryFee.value ? Number(orderInfo.value.deliveryFee || 0) : 0;
  const score = Number(orderInfo.value.score || 0);
  const money = realPrice + deliveryFee;
  if (money > 0 && score > 0) return `${formatPoint(score)}分 + ${formatPrice(money)}`;
  if (money > 0) return formatPrice(money);
  if (score > 0) return `${formatPoint(score)}分`;
  return formatPrice(0);
});

const infoTitle = computed(() => {
  if (orderInfo.value.behalf_type === 1) return "代付订单信息";
  if (orderInfo.value.behalf_type === 2) return "公采订单信息";
  return "订单信息";
});

const behalfText = computed(() => {
  if (orderInfo.value.behalf_type === 1) {
    return `代付人：${orderInfo.value.behalf_user_name || ""}--${orderInfo.value.behalf_user_mobile || ""}`;
  }
  if (orderInfo.value.behalf_type === 2) {
    return `公采单位：${orderInfo.value.est_com_name || ""}`;
  }
  return "";
});

const showCancelReason = computed(() => {
  return (orderInfo.value.statusName || "").includes("商户已取消");
});

const actionButtons = computed(() => {
  const status = Number(orderInfo.value.status);
  const behalfType = Number(orderInfo.value.behalf_type || 0);
  if (status === 0 || status === 1 || status === 3) return [];
  if (status === 2) {
    return [
      { key: "cancel" as ActionKey, text: "取消订单" },
      { key: (behalfType === 0 ? "pay" : "urge") as ActionKey, text: behalfType === 0 ? "确认支付" : "催一催" },
    ];
  }
  if (status === 4) return [{ key: "confirm" as ActionKey, text: "确认完成" }];
  if (status === 5) {
    if (orderInfo.value.statusName === "已评价" || Number(orderInfo.value.overtimeStatus) === 1) return [];
    return [{ key: "evaluate" as ActionKey, text: "评价" }];
  }
  if (status === 6) return [{ key: "urge" as ActionKey, text: "催一催" }];
  return [];
});

function resolveImage(img?: string) {
  if (!img) return "/static/default-image.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatPoint(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0";
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

function formatPrice(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "¥0";
  return `¥${Number.isInteger(num) ? num : num.toFixed(2)}`;
}

function formatGoodsPrice(goods: GoodsItem) {
  const type = Number(goods.type || 0);
  if (type === 1) return `${formatPoint(goods.score)}分`;
  if (type === 2) return `${formatPoint(goods.score)}分+${formatPrice(goods.price)}`;
  return formatPrice(goods.price);
}

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function showRouteToast(name: string) {
  showToast(`${name}页面待迁移`);
}

function goBack() {
  uni.navigateBack();
}

function emitOrderRefresh() {
  eventBus.emit("refresh-order-list");
  eventBus.emit("refresh-order-num");
}

async function loadData() {
  if (!orderId.value || loading.value) return;
  loading.value = true;
  try {
    const res: any = await getCustomerOrderInfoView({ orderId: orderId.value });
    if (res?.resultCode === 200 && res.result) {
      orderInfo.value = res.result;
      return;
    }
    showToast(res?.message || res?.FAPErrorMessage || "加载失败");
  } catch (error: any) {
    showToast(error?.message || "加载失败");
    setTimeout(() => {
      uni.navigateBack();
    }, 500);
  } finally {
    loading.value = false;
  }
}

function confirmCancelOrder() {
  if (Number(orderInfo.value.status) !== 2) return;
  uni.showModal({
    title: "提示",
    content: "确定取消订单？",
    success: (res) => {
      if (res.confirm) cancelOrder();
    },
  });
}

async function cancelOrder() {
  try {
    await customerCancelOrder({
      orderId: orderInfo.value.orderId || orderId.value,
      userId: storage.getUserId(),
      userName: orderInfo.value.userName,
    });
    emitOrderRefresh();
    loadData();
  } catch (error: any) {
    showToast(error?.message || "取消订单失败");
  }
}

function confirmDaifuUrge() {
  if (Number(orderInfo.value.status) !== 2) return;
  uni.showModal({
    title: "提示",
    content: "确定催一催？",
    success: (res) => {
      if (res.confirm) daifuUrgeOrder();
    },
  });
}

async function daifuUrgeOrder() {
  try {
    await behalfRemindPay({
      orderId: orderInfo.value.orderId || orderId.value,
      userId: storage.getUserId(),
    });
    emitOrderRefresh();
  } catch (error: any) {
    showToast(error?.message || "催付失败");
  }
}

async function confirmOrderDone() {
  const goodsAry = goodsList.value.map((goods) => ({
    id: goods.childId,
    nums: goods.nums,
    sku: goods.sku,
  }));

  try {
    await confirmUse({
      orderId: orderInfo.value.orderId || orderId.value,
      goodsAry: JSON.stringify(goodsAry),
    });
    emitOrderRefresh();
    loadData();
  } catch (error: any) {
    showToast(error?.message || "确认完成失败");
  }
}

async function normalUrgeOrder() {
  try {
    const res: any = await urgeOrder({
      orderId: orderInfo.value.orderNo,
    });
    if (res?.result) {
      showToast(res.result);
    }
  } catch (error: any) {
    showToast(error?.message || "催单失败");
  }
}

async function payOrder() {
  try {
    const res: any = await BussinessOrderNosPay({
      osName: "android",
      orderNo: orderInfo.value.orderNo,
      userName: orderInfo.value.userName,
      mobile: orderInfo.value.mobile,
      hostNo: storage.getHostNo(),
    });
    if (res?.resultCode === 200 || res?.success !== false) {
      const payUrl = res?.result?.payUrl || "";
      if (!payUrl) {
        showToast("支付地址获取失败");
        return;
      }
      uni.navigateTo({
        url: `/pages/service/WebViewPage/WebPayPage?title=${encodeURIComponent("付款")}&url=${encodeURIComponent(payUrl)}`,
      });
      return;
    }
    showToast(res?.message || res?.FAPErrorMessage || "支付失败");
  } catch (error: any) {
    showToast(error?.message || "获取支付信息失败");
  }
}

function callShop() {
  const phoneNumber = orderInfo.value.shopMobile || "";
  if (!phoneNumber) {
    showToast("拨打电话号码为空");
    return;
  }
  uni.makePhoneCall({
    phoneNumber,
    fail: () => showToast("拨打失败"),
  });
}

function handleAction(key: ActionKey) {
  if (key === "cancel") {
    confirmCancelOrder();
  } else if (key === "pay") {
    payOrder();
  } else if (key === "confirm") {
    confirmOrderDone();
  } else if (key === "evaluate") {
    showRouteToast("评价");
  } else if (key === "urge") {
    if (Number(orderInfo.value.status) === 2 && Number(orderInfo.value.behalf_type) !== 0) {
      confirmDaifuUrge();
    } else {
      normalUrgeOrder();
    }
  }
}

function handleRefreshDetail() {
  loadData();
}

function handlePayFinish() {
  emitOrderRefresh();
  loadData();
}

onLoad((options: any) => {
  orderId.value = decodeURIComponent(options?.orderId || options?.id || "");
  if (!orderId.value) {
    showToast("缺少订单标识");
    return;
  }
  loadData();
  eventBus.on("refresh-order-detail", handleRefreshDetail);
  eventBus.on("refresh-order-num", handleRefreshDetail);
  uni.$on("payfinish", handlePayFinish);
});

onShow(() => {
  if (orderId.value) {
    loadData();
  }
});

onBeforeUnmount(() => {
  eventBus.off("refresh-order-detail", handleRefreshDetail);
  eventBus.off("refresh-order-num", handleRefreshDetail);
  uni.$off("payfinish", handlePayFinish);
});
</script>

<style scoped lang="scss">
$base-color: #2a9598;
$page-bg: #f3f4f8;
$price-color: #e32222;

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $page-bg;
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
  padding-bottom: calc(70px + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.address-card,
.shop-card,
.amount-card,
.info-card,
.contact-row {
  background: #ffffff;
}

.address-card {
  min-height: 72px;
  display: flex;
  align-items: center;
  padding: 13px 14px;
  box-sizing: border-box;
}

.address-icon {
  flex: 0 0 auto;
}

.address-main {
  flex: 1;
  min-width: 0;
  margin-left: 12px;
}

.user-line {
  display: flex;
  align-items: center;
  min-width: 0;
}

.user-name {
  max-width: 45%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
  font-size: 15px;
}

.user-mobile {
  margin-left: 14px;
  color: $base-color;
  font-size: 15px;
}

.address-text {
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #666666;
  font-size: 12px;
}

.section-gap {
  height: 10px;
  background: $page-bg;
}

.shop-head {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 7px;
  box-sizing: border-box;
}

.shop-name {
  min-width: 0;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 12px;
}

.shop-name text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.status-name {
  flex: 0 0 auto;
  margin-left: 10px;
  color: $base-color;
  font-size: 12px;
}

.goods-item {
  min-height: 97px;
  display: flex;
  padding: 15px;
  background: $page-bg;
  box-sizing: border-box;
}

.goods-item + .goods-item {
  margin-top: 5px;
}

.goods-img {
  width: 67px;
  height: 67px;
  flex: 0 0 67px;
  background: #f5f5f5;
}

.goods-main {
  flex: 1;
  min-width: 0;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
}

.goods-name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #333333;
  font-size: 12px;
  line-height: 18px;
}

.goods-price,
.goods-num {
  margin-top: 2px;
  padding-right: 20px;
  color: #333333;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
}

.goods-num,
.goods-specs {
  color: #666666;
}

.goods-specs {
  margin-top: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
}

.amount-card {
  color: #333333;
  font-size: 13px;
}

.amount-row {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 1px solid $page-bg;
  box-sizing: border-box;
}

.amount-row.total {
  min-height: 48px;
  border-bottom: 0;
  font-size: 14px;
}

.amount-row.total text:last-child {
  color: $price-color;
  font-size: 17px;
}

.info-card {
  color: #666666;
  font-size: 13px;
}

.info-title {
  min-height: 42px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid $page-bg;
  color: #333333;
  font-size: 14px;
  box-sizing: border-box;
}

.info-row {
  display: flex;
  min-height: 28px;
  padding: 8px 15px 0;
  box-sizing: border-box;
}

.info-row:last-child {
  padding-bottom: 15px;
}

.remark-row {
  align-items: flex-start;
}

.remark-text {
  flex: 1;
  min-width: 0;
  line-height: 18px;
}

.contact-row {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-top: 1px solid $page-bg;
  color: #666666;
  font-size: 13px;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  min-height: 50px;
  padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  background: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.action-btn {
  min-width: 80px;
  height: 30px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: $base-color;
  color: #ffffff;
  font-size: 13px;
  box-sizing: border-box;
}
</style>
