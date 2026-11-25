<template>
  <view class="page">
    <u-navbar
      title="我的工单"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="nav-slot">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack" />
        </view>
      </template>
      <template #right>
        <u-image :src="workerIcon" width="20px" height="20px" @click="openWorkerInfo" />
      </template>
    </u-navbar>

    <view class="take-order-row">
      <text class="take-order-label">接单状态</text>
      <u-switch v-model="takeOrderEnabled" activeColor="#2A9595" @change="handleTakeOrderChange" />
    </view>

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: currentTabId === tab.id }"
        @click="changeTab(tab.id)"
      >
        <text>{{ tab.title }}</text>
        <view v-if="currentTabId === tab.id" class="tab-line" />
      </view>
    </view>

    <view class="content">
      <view v-if="loading" class="state-box">加载中...</view>
      <view v-else-if="errorText" class="state-box" @click="reload">{{ errorText }}</view>
      <view v-else-if="isEmpty" class="state-box">暂无数据</view>

      <WorkOrderCard
        v-for="item in orders"
        :key="`${item.id || ''}-${item.repair_id || item.repairList || ''}`"
        :item="item"
        :config="getWorkOrderCardConfig(item)"
        @detail="openDetail"
        @action="handleAction"
      />

      <view v-if="orders.length && !hasMore" class="load-end">没有更多数据</view>
    </view>

    <WorkOrderDialog
      :visible="dialog.visible"
      :type="dialog.type"
      :item="dialog.item"
      @close="closeDialog"
      @confirm="confirmDialog"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';
import WorkOrderCard from './components/WorkOrderCard.vue';
import WorkOrderDialog from './components/WorkOrderDialog.vue';
import { useWorkOrderActions } from './composables/useWorkOrderActions';
import { useWorkOrderList } from './composables/useWorkOrderList';
import {
  getWorkOrderCardConfig,
  type WorkOrderAction,
  type WorkOrderDialogType,
  type WorkOrderItem,
} from './config/workOrderState';

const bgColor = '#2A9595';
const workerIcon = '/static/worker_icon.png';

const {
  tabs,
  currentTabId,
  orders,
  hasMore,
  loading,
  errorText,
  isEmpty,
  takeOrderEnabled,
  changeTab,
  loadData,
  reload,
  updateTakeOrder,
} = useWorkOrderList();

const dialog = reactive<{
  visible: boolean;
  type: WorkOrderDialogType;
  item: WorkOrderItem | null;
}>({
  visible: false,
  type: '',
  item: null,
});

const actions = useWorkOrderActions(reload);

const goBack = () => {
  uni.navigateBack();
};

const openWorkerInfo = () => {
  uni.navigateTo({
    url: '/pages/mine/LingGongOrder/SharelaoWu/thirdJianZhiMessage',
  });
};

const handleTakeOrderChange = async (value: boolean) => {
  const previousValue = !value;
  const success = await actions.changeTakeOrder(value);
  if (!success) {
    takeOrderEnabled.value = previousValue;
  }
};

const openDialog = (type: WorkOrderDialogType, item: WorkOrderItem) => {
  dialog.type = type;
  dialog.item = item;
  dialog.visible = true;
};

const closeDialog = () => {
  dialog.visible = false;
  dialog.type = '';
  dialog.item = null;
};

const confirmDialog = async (value: string) => {
  if (!dialog.item) return;
  if (dialog.type === 'quote' || dialog.type === 'requote') {
    await actions.quoteOrder({
      item: dialog.item,
      value,
      isReQuote: dialog.type === 'requote',
    });
  } else if (dialog.type === 'pause') {
    await actions.pauseOrder({ item: dialog.item, value });
  } else if (dialog.type === 'stop') {
    await actions.stopOrder({ item: dialog.item, value });
  }
  closeDialog();
};

const handleAction = async (action: WorkOrderAction, item: WorkOrderItem) => {
  if (action === 'quote' || action === 'requote' || action === 'pause' || action === 'stop') {
    openDialog(action, item);
    return;
  }
  await actions.runAction(action, item);
};

const openDetail = (item: WorkOrderItem) => {
  actions.openDetail(item, currentTabId.value);
};

const refreshAgree = () => {
  updateTakeOrder(true);
};

const refreshRefuse = () => {
  updateTakeOrder(false);
};

const refreshCurrentTab = (tabId: number) => {
  if (currentTabId.value === tabId) {
    reload();
  }
};

const refreshAll = () => {
  refreshCurrentTab(1);
};

const refreshWait = () => {
  refreshCurrentTab(2);
};

const refreshDoing = () => {
  refreshCurrentTab(3);
};

const refreshComplete = () => {
  refreshCurrentTab(4);
};

const refreshRestart = () => {
  refreshCurrentTab(5);
};

onMounted(() => {
  uni.$on('refresh-worker-agree', refreshAgree);
  uni.$on('refresh-worker-refuse', refreshRefuse);
  uni.$on('refresh-worker-all', refreshAll);
  uni.$on('refresh-worker-wait', refreshWait);
  uni.$on('refresh-worker-doing', refreshDoing);
  uni.$on('refresh-worker-complete', refreshComplete);
  uni.$on('refresh-worker-restart', refreshRestart);
  loadData(true);
});

onUnmounted(() => {
  uni.$off('refresh-worker-agree', refreshAgree);
  uni.$off('refresh-worker-refuse', refreshRefuse);
  uni.$off('refresh-worker-all', refreshAll);
  uni.$off('refresh-worker-wait', refreshWait);
  uni.$off('refresh-worker-doing', refreshDoing);
  uni.$off('refresh-worker-complete', refreshComplete);
  uni.$off('refresh-worker-restart', refreshRestart);
});
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f0f8ff;
}

.nav-slot {
  display: flex;
  align-items: center;
}

.take-order-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
  padding: 0 14px;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}

.take-order-label {
  color: #333;
  font-size: 14px;
}

.tabs {
  display: flex;
  height: 40px;
  background: #fff;
}

.tab-item {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 13px;

  &.active {
    color: #2a9595;
  }
}

.tab-line {
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 2px;
  background: #2a9595;
}

.content {
  padding-bottom: 16px;
}

.state-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  color: #666;
  font-size: 14px;
}

.load-end {
  padding: 16px 0;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
