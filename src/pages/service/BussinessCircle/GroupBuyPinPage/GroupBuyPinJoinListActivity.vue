<template>
  <view class="page">
    <u-navbar
      title="正在拼单"
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
      @refresherrefresh="onRefresh"
      :lower-threshold="80"
      @scrolltolower="loadMore"
    >
      <view v-if="loading && list.length === 0" class="state-tip">加载中...</view>
      <view v-else-if="list.length === 0" class="state-tip">暂无拼团数据</view>

      <view v-else class="list-wrap">
        <view
          v-for="(item, index) in list"
          :key="item._key || item.flowNo || item.name || index"
          class="list-item"
        >
          <image class="avatar" :src="resolveImage(item.headImg)" mode="aspectFill"></image>

          <view class="item-main">
            <text class="item-name">{{ item.name || "" }}</text>
            <text class="item-count">还差{{ formatInt(item.numss) }}人拼成</text>
            <text class="item-time">剩余 {{ countdownText(item) }}</text>
          </view>

          <view class="item-action" @click="handleJoin(item)">
            去拼团
          </view>
        </view>
      </view>

      <view v-if="list.length > 0" class="load-tip">
        <text v-if="loading">加载中...</text>
        <text v-else-if="hasMore">上拉加载更多</text>
        <text v-else>没有更多了</text>
      </view>
    </scroll-view>

    <u-popup :show="showSpecPopup" mode="bottom" :round="12" @close="closeSpecPopup">
      <view class="spec-popup">
        <view class="spec-head">
          <image class="spec-image" :src="popupImage" mode="aspectFill"></image>

          <view class="spec-head-info">
            <view class="spec-price">￥{{ formatMoney(popupPrice) }}</view>
            <view class="spec-stock">库存：{{ popupStockText }}</view>
            <view class="spec-selected">已选：{{ popupSpecText }}</view>
          </view>

          <view class="spec-close" @click="closeSpecPopup">
            <u-icon name="close" size="18" color="#999"></u-icon>
          </view>
        </view>

        <view class="qty-row">
          <text class="qty-label">购买数量</text>
          <u-number-box v-model="buyCount" :min="1" :max="MAX_PRODUCT_SIZE"></u-number-box>
        </view>

        <view class="spec-actions">
          <view class="spec-action primary" @click="submitJoin">立即参团</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { addCart, getGoodsRindInfo, qpeellGroups, queryJoinGroupList } from "@/api/service";
import { BaseImgURL, storage } from "@/utils/storage";
import eventBus from "@/utils/eventBus.js";

interface JoinListItem {
  numss?: number | string;
  headImg?: string;
  hour?: number;
  minute?: number;
  second?: number;
  name?: string;
  flowNo?: string;
  remainingSeconds?: number;
  _key?: string;
}

interface SpecAttr {
  id?: string;
  pId?: string;
  value?: string;
  showName?: string;
  name?: string;
}

interface SpecGroup {
  id?: string;
  name?: string;
  attr?: SpecAttr[];
}

interface ProductBean {
  sku?: string;
  goodsRel?: string;
  kindCode?: string;
  providerCode?: string;
  nums?: number | string;
  price?: number | string;
  imgAry?: Array<{ goodImg?: string }>;
  param?: SpecGroup[];
  specs?: Array<{ showName?: string; value?: string }>;
  shopId?: string;
  realManageId?: string;
}

interface JoinGroupResult {
  joinList?: JoinListItem[];
}

interface StartGroupResult {
  batchNo?: string;
  flowNo?: string;
}

interface AddCartResult {
  shopCode?: string;
  img?: string;
  cartId?: string;
  shopName?: string;
  buyNums?: number;
  price?: number;
  name?: string;
  flowNo?: string;
  sku?: string;
  sellAmount?: number;
}

const PAGE_SIZE = 10;
const MAX_PRODUCT_SIZE = 9999;
const bgColor = ref("#2a9598");
const list = ref<JoinListItem[]>([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const refreshing = ref(false);
const showSpecPopup = ref(false);
const buyCount = ref(1);
const goodsRel = ref("");
const sku = ref("");
const flowNo = ref("");
const aggPrice = ref(0);
const groupCount = ref("");
const fromPlat = ref(false);
const productBean = ref<ProductBean>({});
const providerCode = ref("");
const kindCode = ref("");
const firstShowHandled = ref(false);
const countdownTimer = ref<ReturnType<typeof setInterval> | null>(null);
const refreshEventName = "REFRESH_SHOP_ORDER_PINPAYCOMPLETE";
const popupJoinItem = ref<JoinListItem | null>(null);

const popupImage = computed(() => resolveImage(productBean.value.imgAry?.[0]?.goodImg));
const popupPrice = computed(() => Number(aggPrice.value || productBean.value.price || 0));
const popupStockText = computed(() => formatInt(groupCount.value || productBean.value.nums));
const popupSpecText = computed(() => buildPopupSpecText());
const goodsStockCount = computed(() => Number(productBean.value.nums || 0));

function goBack() {
  uni.navigateBack();
}

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function resolveImage(img?: string) {
  if (!img) return "/static/service/myIconImage.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatMoney(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0.00";
  return Number.isInteger(num) ? `${num}.00` : num.toFixed(2);
}

function formatInt(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0";
  return String(Math.max(0, Math.floor(num)));
}

function formatDuration(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  const hour = Math.floor(total / 3600);
  const minute = Math.floor((total % 3600) / 60);
  const second = total % 60;
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

function countdownText(item: JoinListItem) {
  return formatDuration(Number(item.remainingSeconds || 0));
}

function clearCountdownTimer() {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value);
    countdownTimer.value = null;
  }
}

function startCountdownTimer() {
  clearCountdownTimer();
  if (list.value.length === 0) return;
  countdownTimer.value = setInterval(() => {
    list.value.forEach((item) => {
      const current = Number(item.remainingSeconds || 0);
      if (current > 0) {
        item.remainingSeconds = current - 1;
      }
    });
  }, 1000);
}

function normalizeJoinList(joinList?: JoinListItem[]) {
  const nextList = Array.isArray(joinList)
    ? joinList.map((item, index) => {
        const remainingSeconds = Number(item.hour || 0) * 3600 + Number(item.minute || 0) * 60 + Number(item.second || 0);
        return {
          ...item,
          _key: item.flowNo || item.name || `${index}`,
          remainingSeconds,
        };
      })
    : [];
  if (page.value === 1) {
    list.value = nextList;
  } else {
    list.value = list.value.concat(nextList);
  }
  hasMore.value = nextList.length >= PAGE_SIZE;
  startCountdownTimer();
}

function buildPopupSpecText() {
  const groups = productBean.value.param || [];
  const firstGroup = groups[0];
  const firstAttr = firstGroup?.attr?.[0];
  if (firstGroup && firstAttr) {
    const label = firstGroup.name || "规格";
    const value = firstAttr.value || firstAttr.showName || firstAttr.name || "";
    return value ? `${label}：${value}，${buyCount.value}件` : `${label}，${buyCount.value}件`;
  }

  const firstSpec = productBean.value.specs?.[0];
  const specText = firstSpec?.showName || firstSpec?.value || "";
  if (specText) {
    return `${specText}，${buyCount.value}件`;
  }

  return `购买数量${buyCount.value}件`;
}

function normalizeProductBean(data: ProductBean | Record<string, any> | undefined) {
  const next = (data || {}) as ProductBean;
  productBean.value = {
    ...next,
    imgAry: Array.isArray(next.imgAry) ? next.imgAry : [],
    param: Array.isArray(next.param) ? next.param : [],
    specs: Array.isArray(next.specs) ? next.specs : [],
  };
  providerCode.value = String(productBean.value.providerCode || providerCode.value || "");
  kindCode.value = String(productBean.value.kindCode || kindCode.value || "");
  sku.value = String(productBean.value.sku || sku.value || "");
  goodsRel.value = String(productBean.value.goodsRel || goodsRel.value || "");
}

function parseProductBean(value?: string) {
  if (!value) return {};
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return {};
  }
}

function readOption(options: Record<string, any>, keys: string[]) {
  for (const key of keys) {
    const value = options?.[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return "";
}

async function fetchJoinList(currentPage: number) {
  if (loading.value) return;
  if (!goodsRel.value) {
    showToast("商品数据缺失");
    return;
  }
  loading.value = true;
  try {
    const res: any = await queryJoinGroupList({
      pageNum: String(currentPage),
      goodsRel: goodsRel.value,
      pageSize: String(PAGE_SIZE),
    });

    if (res?.resultCode === 200 || res?.resultCode === "200") {
      const result = (res.result || {}) as JoinGroupResult;
      normalizeJoinList(result.joinList || []);
      return;
    }

    if (currentPage === 1) {
      list.value = [];
    }
    hasMore.value = false;
  } catch (error: any) {
    if (currentPage === 1) {
      list.value = [];
      showToast(error?.message || "加载失败");
    } else {
      showToast(error?.message || "加载失败");
      hasMore.value = false;
    }
  } finally {
    loading.value = false;
    refreshing.value = false;
    uni.stopPullDownRefresh();
  }
}

function reloadList() {
  page.value = 1;
  hasMore.value = true;
  clearCountdownTimer();
  fetchJoinList(1);
}

function onRefresh() {
  refreshing.value = true;
  reloadList();
}

function loadMore() {
  if (loading.value || refreshing.value || !hasMore.value) return;
  page.value += 1;
  fetchJoinList(page.value);
}

async function checkGoodsRestriction() {
  if (!providerCode.value || !kindCode.value) {
    return true;
  }
  try {
    const res: any = await getGoodsRindInfo({
      providerCode: providerCode.value,
      kindCode: kindCode.value,
    });
    if (res?.resultCode === 200 && res.result) {
      const content = String(res.result || "");
      if (content) {
        const modalRes = await new Promise<{ confirm: boolean }>((resolve) => {
          uni.showModal({
            title: "提示",
            content,
            confirmText: "确认",
            cancelText: "取消",
            success: (result) => resolve({ confirm: !!result.confirm }),
            fail: () => resolve({ confirm: false }),
          });
        });
        return modalRes.confirm;
      }
    }
  } catch {
    return true;
  }
  return true;
}

async function handleJoin(item: JoinListItem) {
  if (storage.getLoginType && storage.getLoginType() === "company") {
    showToast("企业用户无法参加当前活动");
    return;
  }
  popupJoinItem.value = item;
  const canOpen = await checkGoodsRestriction();
  if (!canOpen) return;
  openSpecPopup(item);
}

function openSpecPopup(item: JoinListItem) {
  popupJoinItem.value = item;
  if (!productBean.value || (!productBean.value.imgAry && !productBean.value.param && !productBean.value.specs)) {
    showToast("数据加载失败");
    return;
  }
  showSpecPopup.value = true;
}

function closeSpecPopup() {
  showSpecPopup.value = false;
}

function buildOrderSpecsText() {
  const specs = productBean.value.specs || [];
  const text = specs
    .map((item) => item.showName || item.value || "")
    .filter(Boolean)
    .join(";");
  if (text) return `${text};`;
  return popupSpecText.value.replace(/，\d+件$/, ";");
}

function buildConfirmOrderList(cartResult: AddCartResult, price: number | string | undefined, nums: number, specs: string) {
  return [
    {
      cutdown: 0,
      shopCode: cartResult.shopCode || productBean.value.providerCode || productBean.value.shopId || "",
      shopName: cartResult.shopName || "",
      productArray: [
        {
          cartId: cartResult.cartId || "",
          giftGoodsFlag: false,
          sku: cartResult.sku || sku.value || "",
          name: cartResult.name || "",
          price: cartResult.price || price || 0,
          img: cartResult.img || resolveImage(productBean.value.imgAry?.[0]?.goodImg),
          flowNo: cartResult.flowNo || flowNo.value || "",
          nums: cartResult.buyNums || nums,
          specs,
          sums: Number(cartResult.price || price || 0) * (cartResult.buyNums || nums),
        },
      ],
    },
  ];
}

function openConfirmPage(orderList: any[]) {
  uni.setStorageSync("BussinessShopCarList", orderList);
  uni.navigateTo({
    url: "/pages/service/BussinessCircle/BussinessShopConfirmOrderPage",
  });
  closeSpecPopup();
}

async function submitJoin() {
  if (!popupJoinItem.value) return;
  if (buyCount.value < 1 || buyCount.value > MAX_PRODUCT_SIZE) {
    showToast("选在产品数量超出可选范围");
    return;
  }
  if (buyCount.value > goodsStockCount.value) {
    showToast("购买数量不能大于库存");
    return;
  }
  try {
    const startRes: any = await qpeellGroups({
      userId: storage.getUserId(),
      flowNo: popupJoinItem.value.flowNo || "",
      type: "01",
      price: String(popupPrice.value),
      num: String(buyCount.value),
    });
    if (startRes?.resultCode !== 200 && startRes?.resultCode !== "200" && startRes?.success === false) {
      showToast(startRes?.message || "提交失败");
      return;
    }
    const startData = (startRes?.result || {}) as StartGroupResult;
    const addRes: any = await addCart({
      userId: storage.getUserId(),
      goodsRel: goodsRel.value,
      batchNo: startData.batchNo || "",
      type: "01",
      sku: sku.value,
      flowNo: startData.flowNo || popupJoinItem.value.flowNo || "",
      num: String(buyCount.value),
    });
    if (addRes?.resultCode !== 200 && addRes?.resultCode !== "200" && addRes?.success === false) {
      showToast(addRes?.message || "提交失败");
      return;
    }
    const orderList = buildConfirmOrderList(addRes?.result || {}, popupPrice.value, buyCount.value, buildOrderSpecsText());
    closeSpecPopup();
    openConfirmPage(orderList);
  } catch (error: any) {
    showToast(error?.message || "提交失败");
  }
}

function syncRouteOptions(options: Record<string, any>) {
  goodsRel.value = String(readOption(options, ["goodsRel", "goods_rel"]) || goodsRel.value || "");
  flowNo.value = String(readOption(options, ["flowNo", "flow_no"]) || flowNo.value || "");
  sku.value = String(readOption(options, ["sku", "sku_id"]) || sku.value || "");
  const nextPrice = readOption(options, ["aggPrice", "agg_price", "goods_price"]);
  if (nextPrice !== "") aggPrice.value = Number(nextPrice || 0);
  groupCount.value = String(readOption(options, ["groupCount", "group_count"]) || groupCount.value || "");
  const plat = String(readOption(options, ["fromPlat", "from_plat"]));
  fromPlat.value = plat === "true" || plat === "1";
  providerCode.value = String(readOption(options, ["providerCode", "provider_code"]) || providerCode.value || "");
  kindCode.value = String(readOption(options, ["kindCode", "kind_code"]) || kindCode.value || "");

  const nextProductBean = parseProductBean(String(readOption(options, ["productBean", "product_bean"])));
  if (nextProductBean && Object.keys(nextProductBean).length > 0) {
    normalizeProductBean(nextProductBean);
  }
}

function handleRefreshEvent() {
  reloadList();
}

onLoad((options: Record<string, any>) => {
  syncRouteOptions(options || {});
  if (productBean.value.nums !== undefined && groupCount.value === "") {
    groupCount.value = formatInt(productBean.value.nums);
  }
  if (productBean.value.price !== undefined && aggPrice.value === 0) {
    aggPrice.value = Number(productBean.value.price || 0);
  }
  page.value = 1;
  hasMore.value = true;
  fetchJoinList(1);
});

onShow(() => {
  if (!firstShowHandled.value) {
    firstShowHandled.value = true;
    return;
  }
  reloadList();
});

onMounted(() => {
  eventBus.$on(refreshEventName, handleRefreshEvent);
});

onBeforeUnmount(() => {
  clearCountdownTimer();
  eventBus.$off(refreshEventName, handleRefreshEvent);
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
  padding: 12px 12px calc(16px + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.state-tip {
  padding: 40px 0;
  color: #999;
  font-size: 14px;
  text-align: center;
}

.list-wrap {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.list-item {
  min-height: 84px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
}

.avatar {
  width: 33px;
  height: 33px;
  flex: 0 0 33px;
  border-radius: 50%;
  background: #f5f5f5;
}

.item-main {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

.item-count {
  color: #e32222;
  font-size: 13px;
  line-height: 18px;
}

.item-time {
  color: #666;
  font-size: 12px;
  line-height: 18px;
}

.item-action {
  min-width: 64px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid #e32222;
  border-radius: 14px;
  color: #e32222;
  font-size: 12px;
  line-height: 26px;
  text-align: center;
  box-sizing: border-box;
}

.load-tip {
  padding: 12px 0 4px;
  color: #999;
  font-size: 12px;
  text-align: center;
}

.spec-popup {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
  background: #fff;
}

.spec-head {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.spec-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: #f5f5f5;
  flex: 0 0 80px;
}

.spec-head-info {
  flex: 1;
  min-width: 0;
  padding-top: 2px;
}

.spec-price {
  color: #e32222;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

.spec-stock,
.spec-selected {
  margin-top: 6px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}

.spec-close {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  color: #333;
  font-size: 13px;
}

.qty-label {
  color: #333;
  font-size: 14px;
}

.spec-actions {
  margin-top: 18px;
}

.spec-action {
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
}

.spec-action.primary {
  background: #2a9598;
  color: #fff;
}
</style>