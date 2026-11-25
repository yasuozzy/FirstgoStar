<template>
  <view class="page">
    <u-navbar
      title="历史记录"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="nav-slot">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack" />
        </view>
      </template>
    </u-navbar>

    <view class="content">
      <view v-if="loading && !items.length" class="state-box">加载中...</view>
      <view v-else-if="errorText" class="state-box" @click="reload">{{ errorText }}</view>
      <view v-else-if="isEmpty" class="state-box">暂无数据</view>

      <EmergencyHistoryItem
        v-for="item in items"
        :key="getItemKey(item)"
        :item="item"
        @click="openDetail"
      />

      <view v-if="requesting && items.length" class="load-end">加载中...</view>
      <view v-if="items.length && !hasMore" class="load-end">没有更多数据</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import EmergencyHistoryItem from './components/EmergencyHistoryItem.vue';
import { HISTORY_REFRESH_EVENTS, getRepairListId, type EmergencyHistoryItem as EmergencyHistoryRecord } from './config/historyState';
import { useEmergencyHistoryActions } from './composables/useEmergencyHistoryActions';
import { useEmergencyHistoryList } from './composables/useEmergencyHistoryList';

const {
  items,
  hasMore,
  loading,
  requesting,
  errorText,
  isEmpty,
  loadData,
  reload,
} = useEmergencyHistoryList();

const { openDetail } = useEmergencyHistoryActions();

const goBack = () => {
  uni.navigateBack();
};

const getItemKey = (item: EmergencyHistoryRecord) => getRepairListId(item) || `${item.id || ''}-${item.createTime || ''}`;

const handleRefresh = () => {
  reload();
};

onMounted(() => {
  HISTORY_REFRESH_EVENTS.forEach((eventName) => {
    uni.$on(eventName, handleRefresh);
  });
  loadData(true);
});

onUnmounted(() => {
  HISTORY_REFRESH_EVENTS.forEach((eventName) => {
    uni.$off(eventName, handleRefresh);
  });
});
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f5f7fa;
}

.nav-slot {
  display: flex;
  align-items: center;
}

.content {
  min-height: calc(100vh - 44px);
  padding-bottom: 12px;
}

.state-box {
  padding: 24px 16px;
  color: #666;
  font-size: 13px;
  text-align: center;
}

.load-end {
  padding: 12px 16px 20px;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
