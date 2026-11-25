<template>
  <view class="page">
    <u-navbar
      :title="pageTitle"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="nav-left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>

      <template #right>
        <view class="nav-right" @click="openSelectType">
          <u-image :src="menuIcon" width="24px" height="24px"></u-image>
        </view>
        <view class="nav-right" @click="noop">
          <u-image :src="messageIcon" width="24px" height="24px"></u-image>
        </view>
      </template>
    </u-navbar>

    <view class="tab-bar">
      <view class="tab-item" @click="activeTab = 'house'">
        <text :class="['tab-text', activeTab === 'house' ? 'tab-text-active' : '']">住宅</text>
        <view v-if="activeTab === 'house'" class="tab-line"></view>
      </view>
      <view class="tab-item" @click="activeTab = 'shop'">
        <text :class="['tab-text', activeTab === 'shop' ? 'tab-text-active' : '']">商铺</text>
        <view v-if="activeTab === 'shop'" class="tab-line"></view>
      </view>
    </view>

    <view v-if="activeTab === 'house'" class="list-panel">
      <view v-if="houseLoading && !houseList.length" class="state-box">
        <text class="state-text">加载中...</text>
      </view>
      <view v-else-if="houseError && !houseList.length" class="state-box">
        <text class="state-text">加载失败</text>
      </view>
      <view v-else-if="!houseList.length" class="state-box">
        <text class="state-text">暂无数据</text>
      </view>
      <view v-else>
        <view
          v-for="item in houseList"
          :key="item.id || item.rentalTitle || item.createTime"
          class="card"
          @click="handleHouseItemClick(item)"
        >
          <view class="card-top">
            <view class="label-row">
              <up-tag
                v-for="label in getHouseLabels(item)"
                :key="label"
                :text="label"
                type="primary"
                plain
                size="mini"
              />
            </view>
            <text class="state-text-right">{{ item.auditStatusName || '--' }}</text>
          </view>

          <view class="divider"></view>

          <view class="card-body">
            <u-image
              class="cover"
              :src="getHouseImage(item)"
              width="95px"
              height="80px"
              mode="aspectFill"
            ></u-image>

            <view class="body-right">
              <text class="title-text">{{ item.rentalTitle || '--' }}</text>
              <text class="subtitle-text">{{ item.communityName || '--' }}</text>

              <view v-if="mode === 'sale'" class="price-row">
                <text class="price-text">{{ item.price || '--' }}</text>
                <text class="area-text">{{ item.builtArea || '--' }}</text>
              </view>

              <view v-else class="price-row">
                <text class="price-text">{{ item.monthlyRent || '--' }}</text>
              </view>

              <view class="bottom-row">
                <text class="time-text">{{ item.createTime || '--' }}</text>
                <view class="view-chip">
                  <text class="view-chip-text">查看</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view v-if="houseLoading && houseList.length" class="footer-box">
          <text class="state-text">加载中...</text>
        </view>
        <view v-else-if="!houseHasMore" class="footer-box">
          <text class="state-text">没有更多数据</text>
        </view>
      </view>
    </view>

    <view v-else class="list-panel">
      <view v-if="shopLoading && !shopList.length" class="state-box">
        <text class="state-text">加载中...</text>
      </view>
      <view v-else-if="shopError && !shopList.length" class="state-box">
        <text class="state-text">加载失败</text>
      </view>
      <view v-else-if="!shopList.length" class="state-box">
        <text class="state-text">暂无数据</text>
      </view>
      <view v-else>
        <view
          v-for="item in shopList"
          :key="item.rentId || item.saleId || item.title || item.createTime"
          class="card"
          @click="handleShopItemClick(item)"
        >
          <view class="card-top">
            <view class="label-row">
              <up-tag
                v-for="label in getShopLabels(item)"
                :key="label"
                :text="label"
                type="primary"
                plain
                size="mini"
              />
            </view>
            <text class="state-text-right">{{ item.statusFlag || '--' }}</text>
          </view>

          <view class="divider"></view>

          <view class="card-body">
            <u-image
              class="cover"
              :src="getShopImage(item)"
              width="95px"
              height="80px"
              mode="aspectFill"
            ></u-image>

            <view class="body-right">
              <text class="title-text">{{ item.title || '--' }}</text>
              <text class="subtitle-text">{{ item.locationName || '--' }}</text>

              <view class="bottom-row shop-bottom-row">
                <text class="time-text">{{ item.createTime || '--' }}</text>
                <view
                  v-if="canCancelShop(item)"
                  class="cancel-chip"
                  @click.stop="openCancelDialog(item)"
                >
                  <text class="cancel-chip-text">撤销</text>
                </view>
                <view class="view-chip">
                  <text class="view-chip-text">查看</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view v-if="shopLoading && shopList.length" class="footer-box">
          <text class="state-text">加载中...</text>
        </view>
        <view v-else-if="!shopHasMore" class="footer-box">
          <text class="state-text">没有更多数据</text>
        </view>
      </view>
    </view>

    <u-modal
      :show="cancelVisible"
      :title="'提示'"
      :showCancelButton="true"
      cancelText="取消"
      confirmText="确认"
      @cancel="cancelVisible = false"
      @confirm="confirmCancel"
    >
      <view class="modal-body">
        <text class="modal-text">确认撤销吗</text>
      </view>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import {
  cancleShopRent,
  cancleShopSale,
  getMyShopRentList,
  getMyShopSaleList,
  queryHouseRentalReleaseList,
  queryHouseSaleReleaseList,
} from '@/api/mine';
import { BaseImgURL, storage } from '@/utils/storage';
import { normalizeCode } from './detailShared';

type Mode = 'rent' | 'sale';
type TabKey = 'house' | 'shop';

interface HouseReleaseItem {
  id?: string;
  auditStatusName?: string;
  releaseType?: string;
  rentalType?: string;
  rentalTitle?: string;
  communityName?: string;
  builtArea?: string;
  monthlyRent?: string;
  price?: string;
  housePicture?: string;
  picture?: string;
  decoration?: string;
  createTime?: string;
}

interface ShopReleaseItem {
  rentId?: string;
  saleId?: string;
  title?: string;
  locationName?: string;
  houseType?: string;
  shopType?: string;
  picture?: string;
  statusFlag?: string;
  status?: string;
  createTime?: string;
}

const PAGE_SIZE = 10;
const bgColor = ref('#2A9595');
const menuIcon = ref('/static/pay_nenu.png');
const messageIcon = ref('/static/message.png');
const mode = ref<Mode>('sale');
const activeTab = ref<TabKey>('house');

const houseList = ref<HouseReleaseItem[]>([]);
const shopList = ref<ShopReleaseItem[]>([]);
const housePage = ref(1);
const shopPage = ref(1);
const houseHasMore = ref(true);
const shopHasMore = ref(true);
const houseLoading = ref(false);
const shopLoading = ref(false);
const houseError = ref('');
const shopError = ref('');
const cancelVisible = ref(false);
const cancelId = ref('');

const modeConfig = {
  rent: {
    title: '出租发布',
    houseApi: queryHouseRentalReleaseList,
    shopApi: getMyShopRentList,
    cancelApi: cancleShopRent,
  },
  sale: {
    title: '出售发布',
    houseApi: queryHouseSaleReleaseList,
    shopApi: getMyShopSaleList,
    cancelApi: cancleShopSale,
  },
} as const;

const pageTitle = computed(() => modeConfig[mode.value].title);

onLoad((options: any) => {
  mode.value = options?.type === 'rent' ? 'rent' : 'sale';
});

onMounted(() => {
  loadInitialData();
  uni.$on('COMMIT_HOUSE', handleHouseRefresh);
  uni.$on('DELCANCEL_HOUSE', handleHouseRefresh);
  uni.$on('DELCANCEL_SHOP', handleShopRefresh);
  uni.$on('SEND_BUSSINESS_HOUSE', handleShopRefresh);
});

onUnmounted(() => {
  uni.$off('COMMIT_HOUSE', handleHouseRefresh);
  uni.$off('DELCANCEL_HOUSE', handleHouseRefresh);
  uni.$off('DELCANCEL_SHOP', handleShopRefresh);
  uni.$off('SEND_BUSSINESS_HOUSE', handleShopRefresh);
});

onPullDownRefresh(() => {
  if (activeTab.value === 'house') {
    loadHouseList(true, true);
  } else {
    loadShopList(true, true);
  }
});

onReachBottom(() => {
  if (activeTab.value === 'house') {
    loadHouseList(false);
  } else {
    loadShopList(false);
  }
});

async function loadInitialData() {
  loadHouseList(true);
  loadShopList(true);
}

async function loadHouseList(reset = false, stopRefresh = false) {
  if (!reset && !houseHasMore.value) {
    if (stopRefresh) {
      uni.stopPullDownRefresh();
    }
    return;
  }

  const nextPage = reset ? 1 : housePage.value + 1;
  houseLoading.value = true;
  houseError.value = '';

  try {
    const res = await modeConfig[mode.value].houseApi({
      userId: storage.getUserId(),
      page: nextPage,
      size: PAGE_SIZE,
    });

    const list = Array.isArray(res?.result) ? res.result : [];
    houseList.value = reset ? list : [...houseList.value, ...list];
    housePage.value = nextPage;
    houseHasMore.value = list.length >= PAGE_SIZE;
  } catch (error) {
    console.log(error);
    houseError.value = '加载失败';
    uni.showToast({ title: '住宅列表加载失败', icon: 'none' });
  } finally {
    houseLoading.value = false;
    if (stopRefresh) {
      uni.stopPullDownRefresh();
    }
  }
}

async function loadShopList(reset = false, stopRefresh = false) {
  if (!reset && !shopHasMore.value) {
    if (stopRefresh) {
      uni.stopPullDownRefresh();
    }
    return;
  }

  const nextPage = reset ? 1 : shopPage.value + 1;
  shopLoading.value = true;
  shopError.value = '';

  try {
    const res = await modeConfig[mode.value].shopApi({
      userId: storage.getUserId(),
      page: nextPage,
      size: PAGE_SIZE,
    });

    const list = Array.isArray(res?.result) ? res.result : [];
    shopList.value = reset ? list : [...shopList.value, ...list];
    shopPage.value = nextPage;
    shopHasMore.value = list.length >= PAGE_SIZE;
  } catch (error) {
    console.log(error);
    shopError.value = '加载失败';
    uni.showToast({ title: '商铺列表加载失败', icon: 'none' });
  } finally {
    shopLoading.value = false;
    if (stopRefresh) {
      uni.stopPullDownRefresh();
    }
  }
}

function handleHouseRefresh() {
  loadHouseList(true);
}

function handleShopRefresh() {
  loadShopList(true);
}

function getHouseLabels(item: HouseReleaseItem) {
  const labels =
    mode.value === 'rent'
      ? [item.releaseType, item.rentalType]
      : [item.decoration, item.releaseType];

  return labels
    .filter((label) => !!label)
    .map((label) => String(label).replace(/,/g, ''));
}

function getShopLabels(item: ShopReleaseItem) {
  return [item.houseType, item.shopType]
    .filter((label) => !!label)
    .map((label) => String(label).replace(/,/g, ''));
}

function getHouseImage(item: HouseReleaseItem) {
  const raw =
    mode.value === 'rent'
      ? item.picture || item.housePicture
      : item.housePicture || item.picture;
  return resolveImage(raw);
}

function getShopImage(item: ShopReleaseItem) {
  const raw = item.picture?.split(',')?.[0] || '';
  return resolveImage(raw);
}

function resolveImage(path = '') {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//.test(path) || path.startsWith('data:') || path.startsWith('/static/')) {
    return path;
  }
  return `${BaseImgURL}${path}`;
}

function canCancelShop(item: ShopReleaseItem) {
  return normalizeCode(item.status) === '0';
}

function handleHouseItemClick(_item: HouseReleaseItem) {
  const id = String(_item.id || '');
  if (!id) {
    return;
  }

  const url =
    mode.value === 'rent'
      ? '/pages/mine/houserentsale/HouseRentDetail'
      : '/pages/mine/houserentsale/HouseSaleDetail';
  uni.navigateTo({
    url: `${url}?id=${encodeURIComponent(id)}`,
  });
}

function handleShopItemClick(_item: ShopReleaseItem) {
  const id = String(mode.value === 'rent' ? _item.rentId || '' : _item.saleId || '');
  if (!id) {
    return;
  }

  const url =
    mode.value === 'rent'
      ? '/pages/mine/houserentsale/SendBussinessHouseDetail'
      : '/pages/mine/houserentsale/SendSaleBussinessHouseDetail';
  uni.navigateTo({
    url: `${url}?id=${encodeURIComponent(id)}`,
  });
}

function openCancelDialog(item: ShopReleaseItem) {
  cancelId.value = String(mode.value === 'rent' ? item.rentId || '' : item.saleId || '');
  cancelVisible.value = true;
}

async function confirmCancel() {
  if (!cancelId.value) {
    cancelVisible.value = false;
    return;
  }

  try {
    const payload = mode.value === 'rent'
      ? { rentId: cancelId.value }
      : { saleId: cancelId.value };
    await modeConfig[mode.value].cancelApi(payload);
    cancelVisible.value = false;
    uni.showToast({ title: '撤销成功', icon: 'none' });
    loadShopList(true);
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '撤销失败，请稍后重试', icon: 'none' });
  }
}

function openSelectType() {
  uni.navigateTo({
    url: `/pages/mine/houserentsale/SendHouseType?type=${encodeURIComponent(mode.value)}`,
  });
}

function goBack() {
  uni.navigateBack();
}

function noop() {}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.nav-left {
  display: flex;
}

.nav-right {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tab-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #fff;
}

.tab-item {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-text {
  font-size: 14px;
  color: #333;
}

.tab-text-active {
  color: #2a9595;
}

.tab-line {
  width: 24px;
  height: 2px;
  margin-top: 6px;
  background: #2a9595;
  border-radius: 2px;
}

.list-panel {
  padding-bottom: 20px;
}

.state-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
}

.state-text {
  font-size: 13px;
  color: #999;
}

.state-text-right {
  font-size: 12px;
  color: #2a9595;
}

.card {
  margin: 8px 15px 0;
  padding: 14px 14px 12px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 8px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.label-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.divider {
  height: 1px;
  margin: 10px 0 12px;
  background: #f0f0f0;
}

.card-body {
  display: flex;
  align-items: flex-start;
}

.cover {
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
}

.body-right {
  flex: 1;
  min-width: 0;
  padding-left: 10px;
}

.title-text {
  display: block;
  font-size: 13px;
  color: #333;
  line-height: 18px;
}

.subtitle-text {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
  line-height: 18px;
}

.price-row {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.price-text {
  font-size: 12px;
  color: #e53935;
}

.area-text {
  margin-left: 10px;
  font-size: 12px;
  color: #666;
}

.bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.shop-bottom-row {
  justify-content: flex-start;
  gap: 10px;
}

.time-text {
  font-size: 12px;
  color: #666;
}

.view-chip,
.cancel-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  background: #2a9595;
}

.cancel-chip {
  background: #e53935;
}

.view-chip-text,
.cancel-chip-text {
  font-size: 12px;
  color: #fff;
}

.footer-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 0 4px;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px;
}

.modal-text {
  font-size: 14px;
  color: #333;
}
</style>
