<template>
  <view class="page">
    <view class="header">
      <view class="status-space"></view>
      <view class="nav-row">
        <view class="back-btn" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
        <view class="title">我的商圈</view>
        <view class="back-btn"></view>
      </view>

      <view class="stat-row">
        <view
          v-for="item in headerStats"
          :key="item.key"
          class="stat-item"
          @click="handleHeaderStat(item)"
        >
          <view class="stat-num">{{ item.value }}</view>
          <view class="stat-label">{{ item.label }}</view>
        </view>
      </view>
    </view>

    <view class="tab-row">
      <view
        v-for="(tab, index) in orderTabs"
        :key="tab.status"
        class="tab-item"
        :class="{ active: currentIndex === index }"
        @click="switchTab(index)"
      >
        <text>{{ tab.name }}</text>
        <text v-if="getTabBadge(tab.status) > 0" class="tab-badge">
          {{ getTabBadge(tab.status) }}
        </text>
      </view>
      <view class="after-sale" @click="toaftersale">
        <text>退款/售后</text>
        <text v-if="orderNums.returnNum > 0" class="tab-badge">
          {{ orderNums.returnNum }}
        </text>
      </view>
    </view>

    <scroll-view
      class="list-scroll"
      scroll-y
      enable-back-to-top
      :scroll-top="scrollTop"
      refresher-enabled
      :refresher-triggered="activePane.refreshing"
      :lower-threshold="80"
      @refresherrefresh="onRefresh"
      @scrolltolower="loadMore"
      @scroll="onScroll"
    >
      <view class="list-content">
        <view v-for="item in activePane.list" :key="item.orderId || item.orderNo" class="order-card">
          <view class="order-head" @click="showOrderDetail(item)">
            <view class="shop-name">
              <text>{{ item.shopName }}</text>
              <u-icon name="arrow-right" size="13" color="#333333"></u-icon>
            </view>
            <text class="status-name">{{ item.statusName }}</text>
          </view>

          <view class="goods-list">
            <view
              v-for="(goods, goodsIndex) in item.orderDetailAry || []"
              :key="goods.childId || goods.sku || goodsIndex"
              class="goods-item"
              @click="showOrderDetail(item)"
            >
              <image class="goods-img" :src="resolveImage(goods.img)" mode="aspectFill"></image>
              <view class="goods-main">
                <text class="goods-name">{{ goods.name }}</text>
                <text class="goods-price">{{ formatGoodsPrice(goods) }}</text>
                <text class="goods-num">x{{ goods.nums }}</text>
                <text class="goods-specs">{{ goods.specs }}</text>
              </view>
            </view>
          </view>

          <view class="order-summary">
            <text>共{{ getGoodsTotal(item) }}件商品</text>
            <text v-if="Number(item.discountAmount || 0) > 0" class="summary-extra">
              已优惠{{ formatPrice(item.discountAmount) }}
            </text>
            <text v-if="Number(item.deliveryFee || 0) > 0" class="summary-extra">
              配送费：{{ formatPrice(item.deliveryFee) }}
            </text>
            <text class="summary-money">合计：{{ formatOrderMoney(item) }}</text>
          </view>

          <view v-if="getBehalfInfo(item)" class="behalf-row">
            <text class="behalf-info">{{ getBehalfInfo(item) }}</text>
            <template v-if="item.status === 2">
              <view class="action-btn" @click="confirmCancelOrder(item)">取消订单</view>
              <view class="action-btn" @click="confirmDaifuUrge(item)">催一催</view>
            </template>
          </view>

          <view v-else-if="getNormalActions(item).length > 0" class="action-row">
            <view
              v-for="action in getNormalActions(item)"
              :key="action.type"
              class="action-btn"
              @click="handleAction(action.type, item)"
            >
              {{ action.text }}
            </view>
          </view>
        </view>

        <view v-if="activePane.list.length === 0 && !activePane.loading" class="empty-text">
          暂无订单
        </view>
        <view v-if="activePane.loading" class="load-tip">加载中...</view>
        <view v-else-if="activePane.list.length > 0 && !activePane.hasMore" class="load-tip">
          没有更多了
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import {
  behalfRemindPay,
  BussinessOrderNosPay,
  confirmUse,
  customerCancelOrder,
  getCoupAndCollCount,
  getCustomerOrderList,
  getOrderClassNumS,
  urgeOrder,
} from "@/api/service";
import eventBus from "@/utils/eventBus";
import { BaseImgURL, storage } from "@/utils/storage";

const bgColor = "#2a9598";
const PAGE_SIZE = 50;

type ActionType = "cancel" | "pay" | "confirm" | "evaluate" | "urge";

interface GoodsItem {
  childId?: string;
  sku?: string;
  img?: string;
  name?: string;
  specs?: string;
  nums?: number;
  type?: number;
  score?: number;
  price?: number;
}

interface OrderItem {
  orderId?: string;
  orderNo?: string;
  shopName?: string;
  statusName?: string;
  status?: number;
  orderType?: number;
  overtimeStatus?: number;
  realPrice?: number;
  score?: number;
  discountAmount?: number;
  deliveryFee?: string | number;
  userName?: string;
  mobile?: string;
  behalf_type?: number;
  behalf_user_name?: string;
  behalf_user_mobile?: string;
  act_mobile?: string;
  orderDetailAry?: GoodsItem[];
}

interface PaneState {
  page: number;
  list: OrderItem[];
  hasMore: boolean;
  loading: boolean;
  refreshing: boolean;
}

const orderTabs = [
  { name: "全部", status: 9 },
  { name: "待付款", status: 2 },
  { name: "待使用", status: 4 },
  { name: "待评价", status: 5 },
];

const panes = ref<Record<number, PaneState>>({});
const currentIndex = ref(0);
const scrollTop = ref(0);
const scrollOld = ref(0);

function onScroll(e: any) {
  scrollOld.value = e.detail?.scrollTop ?? 0;
}
const counts = ref({
  couponNum: "0",
  deductionCouponNum: "0",
  collectionNum: "0",
  evaluationNum: "0",
});
const orderNums = ref({
  noPayNum: 0,
  waitingUseNum: 0,
  evaluatedtNum: 0,
  returnNum: 0,
});

const currentStatus = computed(() => orderTabs[currentIndex.value].status);
const activePane = computed(() => getPane(currentStatus.value));
const headerStats = computed(() => [
  { key: "coupon", label: "我的优惠券", value: counts.value.couponNum },
  { key: "deduction", label: "折扣优惠券", value: counts.value.deductionCouponNum },
  { key: "collection", label: "我的收藏", value: counts.value.collectionNum },
  { key: "evaluation", label: "评价", value: counts.value.evaluationNum },
]);

function createPane(): PaneState {
  return {
    page: 1,
    list: [],
    hasMore: true,
    loading: false,
    refreshing: false,
  };
}

function getPane(status: number) {
  if (!panes.value[status]) {
    panes.value[status] = createPane();
  }
  return panes.value[status];
}

function resolveImage(img?: string) {
  if (!img) return "/static/default-image.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatPoint(value?: number) {
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

function formatOrderMoney(item: OrderItem) {
  const realPrice = Number(item.realPrice || 0);
  const delivery = Number(item.deliveryFee || 0);
  const score = Number(item.score || 0);
  const money = realPrice + delivery;
  if (money > 0 && score > 0) return `${formatPoint(score)}分+${formatPrice(money)}`;
  if (money > 0) return formatPrice(money);
  if (score > 0) return `${formatPoint(score)}分`;
  return formatPrice(0);
}

function getGoodsTotal(item: OrderItem) {
  return (item.orderDetailAry || []).reduce((sum, goods) => sum + Number(goods.nums || 0), 0);
}

function getTabBadge(status: number) {
  if (status === 2) return orderNums.value.noPayNum;
  if (status === 4) return orderNums.value.waitingUseNum;
  if (status === 5) return orderNums.value.evaluatedtNum;
  return 0;
}

function getBehalfInfo(item: OrderItem) {
  if (item.behalf_type === 1) {
    return `代付人：${item.behalf_user_name || ""}  ${item.behalf_user_mobile || ""}`;
  }
  if (item.behalf_type === 2) {
    return `付款账户：${item.act_mobile || ""}`;
  }
  return "";
}

function getNormalActions(item: OrderItem) {
  const status = Number(item.status);
  if (status === 2) {
    return [
      { type: "cancel" as ActionType, text: "取消订单" },
      { type: "pay" as ActionType, text: "确认支付" },
    ];
  }
  if (status === 4) {
    return [{ type: "confirm" as ActionType, text: "确认完成" }];
  }
  if (status === 5) {
    if (item.orderType === 1 || item.statusName === "已评价" || item.overtimeStatus === 1) return [];
    return [{ type: "evaluate" as ActionType, text: "评价" }];
  }
  if (status === 6) {
    return [{ type: "urge" as ActionType, text: "催一催" }];
  }
  return [];
}

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function showRouteToast(name: string) {
  showToast(`${name}页面待迁移`);
}

function toaftersale(){
	uni.navigateTo({
	  url: `/pages/service/BussinessCircle/BussinessAfterSalePage`,
	});
}

function goBack() {
  uni.navigateBack();
}

function handleHeaderStat(item: { key: string; label: string }) {
  if(item.key=="coupon"){
	  uni.navigateTo({
	    url: `/pages/service/BussinessCircle/BussinessCouponPage`,
	  });
  }else if(item.key=="deduction"){
	  uni.navigateTo({
	    url: `/pages/service/BussinessCircle/BussinessDiscountCouponPage`,
	  });
  }else if(item.key=="collection"){
	  uni.navigateTo({
	    url: `/pages/service/BussinessCircle/BussinessCollectShoptPage`,
	  });
  }else if(item.key=="evaluation"){
	  uni.navigateTo({
	    url: `/pages/service/BussinessCircle/BussinessEvaPage`,
	  });
  }
}

function showOrderDetail(item: OrderItem) {
  const orderId = item.orderId || item.orderNo;
  if (!orderId) {
    showToast("订单信息缺失");
    return;
  }
  uni.navigateTo({
    url: `/pages/service/BussinessCircle/BussinessShopOrderDetailPage?orderId=${encodeURIComponent(orderId)}`,
  });
}

function switchTab(index: number) {
  if (currentIndex.value === index) return;
  currentIndex.value = index;
  scrollTop.value = scrollOld.value;
  nextTick(() => {
    scrollTop.value = 0;
  });
  const pane = activePane.value;
  if (pane.list.length === 0) {
    refreshList();
  }
}

async function loadHeaderCounts() {
  const res = await getCoupAndCollCount({ userId: storage.getUserId() });
  if (res?.resultCode === 200 && res.result) {
    counts.value = {
      couponNum: res.result.couponNum || "0",
      deductionCouponNum: res.result.deductionCouponNum || "0",
      collectionNum: res.result.collectionNum || "0",
      evaluationNum: res.result.evaluationNum || "0",
    };
    return;
  }
  counts.value = {
    couponNum: "0",
    deductionCouponNum: "0",
    collectionNum: "0",
    evaluationNum: "0",
  };
}

async function loadOrderNums() {
  const res = await getOrderClassNumS({
    userId: storage.getUserId(),
    userType: "1",
  });
  if (res?.resultCode === 200 && res.result) {
    orderNums.value = {
      noPayNum: Number(res.result.noPayNum || 0),
      waitingUseNum: Number(res.result.waitingUseNum || 0),
      evaluatedtNum: Number(res.result.evaluatedtNum || 0),
      returnNum: Number(res.result.returnNum || 0),
    };
  }
}

async function fetchOrders(status: number, page: number) {
  return getCustomerOrderList({
    orderStatus: String(status),
    userType: "1",
    pCode: "",
    userId: storage.getUserId(),
    page: String(page),
    pageSize: String(PAGE_SIZE),
  });
}

async function refreshList(status = currentStatus.value) {
  const pane = getPane(status);
  pane.page = 1;
  pane.loading = true;
  try {
    const res = await fetchOrders(status, 1);
    if (res?.resultCode === 200 && Array.isArray(res.result)) {
      pane.list = res.result;
      pane.hasMore = res.result.length >= PAGE_SIZE;
    } else {
      pane.list = [];
      pane.hasMore = false;
    }
  } catch {
    pane.list = [];
    pane.hasMore = false;
  } finally {
    pane.loading = false;
    pane.refreshing = false;
  }
}

async function loadMore() {
  const pane = activePane.value;
  if (pane.loading || !pane.hasMore) return;
  pane.loading = true;
  const nextPage = pane.page + 1;
  try {
    const res = await fetchOrders(currentStatus.value, nextPage);
    if (res?.resultCode === 200 && Array.isArray(res.result)) {
      pane.list = pane.list.concat(res.result);
      pane.page = nextPage;
      pane.hasMore = res.result.length >= PAGE_SIZE;
    } else {
      pane.hasMore = false;
    }
  } finally {
    pane.loading = false;
  }
}

function onRefresh() {
  activePane.value.refreshing = true;
  refreshList();
  loadHeaderCounts();
  loadOrderNums();
}

function refreshAllLoadedPanes() {
  Object.keys(panes.value).forEach((key) => {
    const status = Number(key);
    if (panes.value[status].list.length > 0 || status === currentStatus.value) {
      refreshList(status);
    }
  });
  loadOrderNums();
  loadHeaderCounts();
}

function confirmCancelOrder(item: OrderItem) {
  if (item.status !== 2) return;
  uni.showModal({
    title: "提示",
    content: "确定取消订单？",
    success: (res) => {
      if (res.confirm) cancelOrder(item);
    },
  });
}

function confirmDaifuUrge(item: OrderItem) {
  if (item.status !== 2) return;
  uni.showModal({
    title: "提示",
    content: "确定催一催？",
    success: (res) => {
      if (res.confirm) daifuUrgeOrder(item);
    },
  });
}

async function cancelOrder(item: OrderItem) {
  try {
    await customerCancelOrder({
      orderId: item.orderId,
      userId: storage.getUserId(),
      userName: item.userName,
    });
    refreshAllLoadedPanes();
  } catch (err: any) {
    showToast(err?.message || "取消订单失败");
  }
}

async function daifuUrgeOrder(item: OrderItem) {
  try {
    await behalfRemindPay({
      orderId: item.orderId,
      userId: storage.getUserId(),
    });
    refreshAllLoadedPanes();
  } catch (err: any) {
    showToast(err?.message || "催付失败");
  }
}

async function handleConfirmUse(item: OrderItem) {
  const goodsAry = (item.orderDetailAry || []).map((goods) => ({
    id: goods.childId,
    nums: goods.nums,
    sku: goods.sku,
  }));

  try {
    await confirmUse({
      orderId: item.orderId,
      goodsAry: JSON.stringify(goodsAry),
    });
    refreshAllLoadedPanes();
  } catch (err: any) {
    showToast(err?.message || "确认完成失败");
  }
}

async function handleUrge(item: OrderItem) {
  try {
    const res = await urgeOrder({
      orderId: item.orderNo,
    });
    if (res?.result) {
      showToast(res.result);
    }
  } catch (err: any) {
    showToast(err?.message || "催单失败");
  }
}

async function gotoPay(item: OrderItem) {
  try {
    const res = await BussinessOrderNosPay({
      osName: "android",
      orderNo: item.orderNo,
      userName: item.userName,
      mobile: item.mobile,
      hostNo: storage.getHostNo(),
    });
    if (res?.resultCode === 200 && res.result?.payUrl) {
      if (!res.result?.payUrl) {
        showToast("支付地址获取失败");
        return;
      }
      uni.navigateTo({
        url: `/pages/service/WebViewPage/WebPayPage?title=${encodeURIComponent("付款")}&url=${encodeURIComponent(res.result?.payUrl)}`,
      });
      return;
    }
  } catch (err: any) {
    showToast(err?.message || "获取支付信息失败");
  }
}

function handleAction(type: ActionType, item: OrderItem) {
  if (type === "cancel") {
    confirmCancelOrder(item);
  } else if (type === "pay") {
    gotoPay(item);
  } else if (type === "confirm") {
    handleConfirmUse(item);
  } else if (type === "evaluate") {
    showRouteToast("评价");
  } else if (type === "urge") {
    handleUrge(item);
  }
}

function handleRefreshEvent() {
  refreshAllLoadedPanes();
}

onLoad((options: any) => {
  const position = Number(options?.position || 0);
  currentIndex.value = Number.isNaN(position) ? 0 : Math.min(Math.max(position, 0), orderTabs.length - 1);
  refreshList();
  loadHeaderCounts();
  loadOrderNums();
});

onShow(() => {
  loadHeaderCounts();
});

onMounted(() => {
  eventBus.on("refresh-order-list", handleRefreshEvent);
  eventBus.on("refresh-order-num", loadOrderNums);
});

onBeforeUnmount(() => {
  eventBus.off("refresh-order-list", handleRefreshEvent);
  eventBus.off("refresh-order-num", loadOrderNums);
});
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f3f4f8;
}

.header {
  height: 160px;
  flex: 0 0 160px;
  background: #2a9598;
  color: #fff;
  box-sizing: border-box;
}

.status-space {
  height: var(--status-bar-height);
}

.nav-row {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}

.back-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 34px;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 17px;
}

.stat-row {
  height: calc(160px - var(--status-bar-height) - 40px);
  display: flex;
  align-items: flex-end;
  padding-bottom: 16px;
  box-sizing: border-box;
}

.stat-item {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.stat-num {
  font-size: 20px;
  line-height: 24px;
}

.stat-label {
  margin-top: 12px;
  font-size: 12px;
  line-height: 16px;
}

.tab-row {
  height: 43px;
  flex: 0 0 43px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
}

.tab-item,
.after-sale {
  position: relative;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 13px;
  box-sizing: border-box;
}

.tab-item {
  flex: 1;
}

.after-sale {
  flex: 0 0 78px;
  padding: 0 10px;
  font-size: 12px;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 28px;
  height: 2px;
  transform: translateX(-50%);
  background: #2a9598;
}

.tab-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #2a9598;
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  box-sizing: border-box;
}

.list-scroll {
  flex: 1;
  min-height: 0;
  height: 0;
}

.list-content {
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}

.order-card {
  margin-top: 10px;
  background: #fff;
}

.order-head {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 7px;
  box-sizing: border-box;
}

.shop-name {
  min-width: 0;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 12px;
}

.status-name {
  flex: 0 0 auto;
  margin-left: 10px;
  color: #2a9598;
  font-size: 12px;
}

.goods-list {
  background: #fff;
}

.goods-item {
  min-height: 97px;
  display: flex;
  padding: 15px;
  background: #f3f4f8;
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
  color: #333;
  font-size: 12px;
  line-height: 18px;
}

.goods-price,
.goods-num {
  margin-top: 2px;
  padding-right: 20px;
  color: #333;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
}

.goods-num,
.goods-specs {
  color: #666;
}

.goods-specs {
  margin-top: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
}

.order-summary {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 6px 10px;
  min-height: 40px;
  padding: 10px 14px;
  color: #666;
  font-size: 12px;
  box-sizing: border-box;
}

.summary-money {
  color: #333;
}

.behalf-row,
.action-row {
  min-height: 43px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 14px;
  border-top: 1px solid #d9d9d9;
  box-sizing: border-box;
}

.behalf-info {
  flex: 1;
  min-width: 0;
  color: #333;
  font-size: 13px;
}

.action-btn {
  min-width: 72px;
  height: 28px;
  margin-left: 14px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #2a9598;
  color: #fff;
  font-size: 13px;
  box-sizing: border-box;
}

.empty-text,
.load-tip {
  padding: 32px 0;
  color: #999;
  font-size: 13px;
  text-align: center;
}

.load-tip {
  padding: 12px 0;
  font-size: 12px;
}
</style>
