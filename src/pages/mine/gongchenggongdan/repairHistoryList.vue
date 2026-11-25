<template>
  <view class="page">
    <u-navbar
      title="工程工单"
      :safe-area-inset-top="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bg-color="#2A9595"
      title-style="color: #fff;"
    >
      <template #left>
        <view class="nav-left" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff" />
        </view>
      </template>
    </u-navbar>

    <view class="content">
      <view v-if="loading && !items.length" class="state-box">加载中...</view>
      <view v-else-if="errorText" class="state-box" @click="reload">{{ errorText }}</view>
      <view v-else-if="isEmpty" class="state-box">暂无数据</view>

      <RepairHistoryItem
        v-for="item in items"
        :key="getItemKey(item)"
        :item="item"
        @click="openDetail"
      />

      <view v-if="requesting && items.length" class="load-state">加载中...</view>
      <view v-if="items.length && !hasMore" class="load-state">没有更多数据</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onUnload } from '@dcloudio/uni-app';
import RepairHistoryItem from './components/RepairHistoryItem.vue';
import {
  getRepairList,
  type RepairHistoryItem as RepairHistoryRecord,
} from './config/repairState';
import { useRepairHistoryActions } from './composables/useRepairHistoryActions';
import { useRepairHistoryList } from './composables/useRepairHistoryList';

const {
  items,
  hasMore,
  loading,
  requesting,
  errorText,
  isEmpty,
  loadData,
  reload,
} = useRepairHistoryList();

const { openDetail } = useRepairHistoryActions();

const refreshEvents = [
  'EMERGENCYHISTERY',
  'FROMEMERGENCY',
  'REPAIR_RECEND',
  'REPAIR_APPEAL',
  'PLATFORM_REPAIR',
];

const handleRefresh = () => {
  reload();
};

const getItemKey = (item: RepairHistoryRecord) =>
  getRepairList(item) || `${item.id || ''}-${item.createTime || ''}`;

const goBack = () => {
  uni.navigateBack();
};

onLoad(() => {
  refreshEvents.forEach((eventName) => uni.$on(eventName, handleRefresh));
  loadData(true);
});

onUnload(() => {
  refreshEvents.forEach((eventName) => uni.$off(eventName, handleRefresh));
});
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f5f7fa;
}

.nav-left {
  display: flex;
  align-items: center;
  padding-left: 4px;
}

.content {
  min-height: calc(100vh - 44px);
  padding-bottom: 12px;
}

.state-box,
.load-state {
  padding: 24px 16px;
  color: #666;
  font-size: 13px;
  text-align: center;
}

.load-state {
  padding: 12px 16px 20px;
  color: #999;
  font-size: 12px;
}
</style>
