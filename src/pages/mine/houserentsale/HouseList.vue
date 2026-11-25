<template>
  <view class="page">
    <up-navbar
      title="选择房产"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="nav-left" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff" />
        </view>
      </template>
    </up-navbar>

    <scroll-view
      scroll-y
      class="content"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="refresh"
    >
      <view v-if="loading" class="state-box">
        <u-loading-icon mode="circle" />
        <text class="state-text">加载中...</text>
      </view>

      <view v-else-if="errorText" class="state-box">
        <text class="state-text">{{ errorText }}</text>
        <u-button text="重新加载" type="primary" color="#2A9595" @click="loadList" />
      </view>

      <view v-else-if="!houseList.length" class="state-box">
        <text class="state-text">暂无可选择房产</text>
      </view>

      <view v-else class="list">
        <view
          v-for="item in houseList"
          :key="item.hseId || item.house_id || item.houseId || item.id || item.completeName"
          class="house-item"
          @click="selectHouse(item)"
        >
          <text class="house-name">
            {{ item.completeName || item.complete_name || item.houseCompleteName || '--' }}
          </text>
          <u-icon name="arrow-right" size="18" color="#999" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { shopSalegetHouseList, shoprentgetHouseList } from '@/api/mine';
import eventBus from '@/utils/eventBus';
import { storage } from '@/utils/storage';

const bgColor = ref('#2A9595');
const mode = ref<'rent' | 'sale'>('rent');
const houseList = ref<Record<string, any>[]>([]);
const loading = ref(false);
const refreshing = ref(false);
const errorText = ref('');

onLoad((options: any) => {
  mode.value = options?.type === 'sale' ? 'sale' : 'rent';
  loadList();
});

async function loadList() {
  loading.value = true;
  errorText.value = '';
  try {
    const api = mode.value === 'rent' ? shoprentgetHouseList : shopSalegetHouseList;
    const res = await api({ userId: storage.getUserId() });
    houseList.value = Array.isArray(res?.result) ? res.result : [];
  } catch (error) {
    console.log(error);
    errorText.value = '加载失败';
    uni.showToast({ title: '房产列表加载失败', icon: 'none' });
  } finally {
    loading.value = false;
    refreshing.value = false;
  }
}

function refresh() {
  refreshing.value = true;
  loadList();
}

function selectHouse(item: Record<string, any>) {
  eventBus.emit('SELECT_SHOP_HOUSE', item);
  uni.navigateBack();
}

function goBack() {
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f6f7fb;
}

.nav-left {
  display: flex;
  padding: 0 8px;
}

.content {
  height: calc(100vh - 44px);
}

.list {
  background: #fff;
}

.house-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  padding: 0 15px;
  border-bottom: 1px solid #ededed;
}

.house-name {
  flex: 1;
  min-width: 0;
  color: #333;
  font-size: 14px;
  line-height: 22px;
}

.state-box {
  display: flex;
  min-height: 180px;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.state-text {
  color: #999;
  font-size: 14px;
}
</style>
