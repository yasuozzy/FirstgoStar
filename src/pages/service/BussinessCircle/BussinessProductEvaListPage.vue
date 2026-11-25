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

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.type"
        class="tab-item"
        :class="{ active: activeType === tab.type }"
        @click="selectTab(tab.type)"
      >
        <text class="tab-title">{{ tab.title }}</text>
        <text class="tab-number">{{ tab.number }}</text>
      </view>
    </view>

    <view class="section-gap"></view>

    <scroll-view
      class="content"
      scroll-y
      refresher-enabled
      :refresher-triggered="refreshing"
      :lower-threshold="80"
      @refresherrefresh="onRefresh"
      @scrolltolower="loadMore"
    >
      <view v-if="activeState.loading && activeState.items.length === 0" class="state-text">
        加载中...
      </view>

      <view v-else-if="activeState.items.length === 0" class="state-text">
        暂无评价
      </view>

      <view v-else class="evaluation-list">
        <view
          v-for="(item, index) in activeState.items"
          :key="item.id || `${activeType}-${index}`"
          class="evaluation-item"
        >
          <view class="evaluation-head">
            <image class="avatar" :src="resolveImage(item.photo)" mode="aspectFill"></image>
            <text class="user-name">{{ item.userName || "" }}</text>
            <u-rate
              class="rating"
              :value="Number(item.point || 0)"
              :count="5"
              size="12"
              readonly
              activeColor="#FFC600"
            ></u-rate>
          </view>

          <text class="content-text">{{ item.content || "" }}</text>

          <view v-if="normalizeImages(item).length > 0" class="image-grid">
            <image
              v-for="(image, imageIndex) in normalizeImages(item)"
              :key="`${item.id || index}-${imageIndex}`"
              class="comment-image"
              :src="image"
              mode="aspectFill"
              @click="previewImages(normalizeImages(item), image)"
            ></image>
          </view>
        </view>
      </view>

      <view v-if="activeState.items.length > 0" class="load-tip">
        <text v-if="activeState.loading">加载中...</text>
        <text v-else-if="activeState.hasMore">上拉加载更多</text>
        <text v-else>没有更多了</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getGoodsComment } from "@/api/service";
import { BaseImgURL } from "@/utils/storage";

interface CommentImage {
  imgSrc?: string;
}

interface EvaluationItem {
  photo?: string;
  goodsSku?: string;
  id?: string;
  userName?: string;
  userId?: string;
  point?: number | string;
  content?: string;
  commentImgAry?: CommentImage[];
}

interface EvaluationResult {
  badNum?: number | string;
  allPageNum?: number;
  midNum?: number | string;
  currentPage?: number;
  allNum?: number | string;
  goodNum?: number | string;
  goodsCommentAry?: EvaluationItem[];
}

interface EvaluationTab {
  type: number;
  title: string;
  number: string;
}

interface TabState {
  page: number;
  hasMore: boolean;
  loading: boolean;
  items: EvaluationItem[];
}

const PAGE_SIZE = 10;
const bgColor = ref("#2a9598");
const sku = ref("");
const activeType = ref(1);
const refreshing = ref(false);
const summary = ref<EvaluationResult>({});
const tabStates = reactive<Record<number, TabState>>({
  1: { page: 1, hasMore: true, loading: false, items: [] },
  2: { page: 1, hasMore: true, loading: false, items: [] },
  3: { page: 1, hasMore: true, loading: false, items: [] },
  4: { page: 1, hasMore: true, loading: false, items: [] },
});
const refreshEventName = "RERESH_COMMON_TITLE";

const tabs = computed<EvaluationTab[]>(() => [
  {
    type: 1,
    title: "全部",
    number: formatInt(summary.value.allNum),
  },
  {
    type: 2,
    title: "好评",
    number: `${formatNumber(summary.value.goodNum)}%`,
  },
  {
    type: 3,
    title: "中评",
    number: `${formatNumber(summary.value.midNum)}%`,
  },
  {
    type: 4,
    title: "差评",
    number: `${formatNumber(summary.value.badNum)}%`,
  },
]);

const activeState = computed(() => tabStates[activeType.value]);

function goBack() {
  uni.navigateBack();
}

function showToast(title: string) {
  uni.showToast({ title, icon: "none" });
}

function formatInt(value?: number | string) {
  const numberValue = Number(value || 0);
  if (Number.isNaN(numberValue)) return "0";
  return String(Math.floor(numberValue));
}

function formatNumber(value?: number | string) {
  const numberValue = Number(value || 0);
  if (Number.isNaN(numberValue)) return "0";
  return Number.isInteger(numberValue) ? String(numberValue) : numberValue.toFixed(2);
}

function resolveImage(image?: string) {
  if (!image) return "/static/service/myIconImage.png";
  if (/^https?:\/\//.test(image) || image.startsWith("/static")) return image;
  return `${BaseImgURL}${image.replace(/^\//, "")}`;
}

function normalizeImages(item: EvaluationItem) {
  return (Array.isArray(item.commentImgAry) ? item.commentImgAry : [])
    .map((image) => image?.imgSrc || "")
    .filter(Boolean)
    .map((image) => resolveImage(image));
}

function previewImages(images: string[], current: string) {
  if (images.length === 0) return;
  uni.previewImage({
    urls: images,
    current,
  });
}

function selectTab(type: number) {
  activeType.value = type;
  if (tabStates[type].items.length === 0 && !tabStates[type].loading) {
    loadTabData(type, 1);
  }
}

function resetTabStates() {
  Object.values(tabStates).forEach((state) => {
    state.page = 1;
    state.hasMore = true;
    state.loading = false;
    state.items = [];
  });
}

async function loadSummary() {
  if (!sku.value) return;
  try {
    const response: any = await getGoodsComment({
      sku: sku.value,
      page: "1",
      size: String(PAGE_SIZE),
      commentType: "1",
    });
    if (response?.resultCode === 200 || response?.resultCode === "200") {
      summary.value = response.result || {};
      return;
    }
    summary.value = {};
    showToast(response?.message || "评价加载失败");
  } catch (error: any) {
    summary.value = {};
    showToast(error?.message || "评价加载失败");
  }
}

async function loadTabData(type: number, page: number) {
  const state = tabStates[type];
  if (!state || state.loading || !sku.value) return;

  state.loading = true;
  try {
    const response: any = await getGoodsComment({
      commentType: String(type),
      sku: sku.value,
      page: String(page),
      size: String(PAGE_SIZE),
    });

    if (response?.resultCode === 200 || response?.resultCode === "200") {
      const result = (response.result || {}) as EvaluationResult;
      const nextItems = Array.isArray(result.goodsCommentAry) ? result.goodsCommentAry : [];
      state.page = page;
      state.hasMore = nextItems.length >= PAGE_SIZE;
      state.items = page === 1 ? nextItems : state.items.concat(nextItems);
      return;
    }

    if (page === 1) {
      state.items = [];
    }
    state.hasMore = false;
  } catch (error: any) {
    if (page === 1) {
      state.items = [];
      showToast(error?.message || "评价加载失败");
    }
    state.hasMore = false;
  } finally {
    state.loading = false;
  }
}

async function loadAllData() {
  if (!sku.value) {
    showToast("商品信息缺失");
    return;
  }
  resetTabStates();
  await loadSummary();
  await Promise.all([1, 2, 3, 4].map((type) => loadTabData(type, 1)));
}

function onRefresh() {
  refreshing.value = true;
  loadAllData().finally(() => {
    refreshing.value = false;
    uni.stopPullDownRefresh();
  });
}

function loadMore() {
  const state = tabStates[activeType.value];
  if (!state || state.loading || !state.hasMore) return;
  loadTabData(activeType.value, state.page + 1);
}

function handleRefreshEvent() {
  loadAllData();
}

onLoad((options: Record<string, any>) => {
  sku.value = String(options?.sku || options?.sku_id || "");
  loadAllData();
});

onMounted(() => {
  uni.$on(refreshEventName, handleRefreshEvent);
});

onBeforeUnmount(() => {
  uni.$off(refreshEventName, handleRefreshEvent);
});
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
}

.nav-left {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabs {
  display: flex;
  flex: 0 0 auto;
  background: #fff;
}

.tab-item {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 11px 0 10px;
  color: #666;
  font-size: 13px;
  box-sizing: border-box;
}

.tab-item.active {
  color: #2a9598;
}

.tab-title,
.tab-number {
  line-height: 18px;
}

.tab-number {
  margin-top: 3px;
}

.section-gap {
  height: 10px;
  flex: 0 0 10px;
  background: #f1f1f1;
}

.content {
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
}

.state-text {
  padding: 40px 0;
  color: #999;
  font-size: 13px;
  text-align: center;
}

.evaluation-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evaluation-item {
  padding: 15px;
  background: #fff;
  box-sizing: border-box;
}

.evaluation-head {
  display: flex;
  align-items: center;
  min-height: 25px;
}

.avatar {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  border-radius: 50%;
  background: #f5f5f5;
}

.user-name {
  max-width: 45%;
  margin-left: 10px;
  overflow: hidden;
  color: #333;
  font-size: 12px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rating {
  margin-left: auto;
}

.content-text {
  display: block;
  margin: 10px 0 0 35px;
  color: #333;
  font-size: 12px;
  line-height: 20px;
  word-break: break-all;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0 0 35px;
}

.comment-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background: #f5f5f5;
}

.load-tip {
  padding: 12px 0 16px;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
