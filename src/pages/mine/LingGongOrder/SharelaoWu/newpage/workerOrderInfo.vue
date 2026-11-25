<template>
  <view class="page">
    <u-navbar
      title="工单详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <u-icon name="arrow-left" size="20" color="#fff" @click="goBack" />
      </template>
    </u-navbar>

    <scroll-view scroll-y class="scroll">
      <WorkOrderDetailBase v-if="baseConfig" :config="baseConfig" @call="callPhone" />
      <WorkOrderMediaGrid :images="workOrder?.picimgs || []" />
      <WorkOrderVoiceList :voices="workOrder?.voices || []" :durations="workOrder?.voiceDurations || []" />

      <text v-if="extras.show" class="jixiao-link" @click="showPerformance = true">《绩效事前事中事后管理制度》</text>
    </scroll-view>

    <WorkOrderDetailActions :buttons="buttons" @action="handleAction" />
    <WorkOrderDialog :visible="dialog.visible" :type="dialog.type" :item="dialogItem" @close="closeDialog" @confirm="confirmDialog" />
    <WorkOrderPerformanceDialog
      :visible="showPerformance"
      :order="workOrder"
      :status-text="baseConfig?.stateText"
      @close="showPerformance = false"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import WorkOrderDetailActions from './components/WorkOrderDetailActions.vue';
import WorkOrderDetailBase from './components/WorkOrderDetailBase.vue';
import WorkOrderDialog from './components/WorkOrderDialog.vue';
import WorkOrderMediaGrid from './components/WorkOrderMediaGrid.vue';
import WorkOrderPerformanceDialog from './components/WorkOrderPerformanceDialog.vue';
import WorkOrderVoiceList from './components/WorkOrderVoiceList.vue';
import { useWorkerOrderDetail } from './composables/useWorkerOrderDetail';
import { useWorkerOrderDetailActions } from './composables/useWorkerOrderDetailActions';
import {
  getBaseDetailConfig,
  getDoingButtons,
  getDoingStatusText,
  type DetailActionKey,
} from './config/workerOrderDetailState';
import type { WorkOrderDialogType, WorkOrderItem } from './config/workOrderState';

const bgColor = '#2A9595';
const showPerformance = ref(false);
const { repairId, extras, workOrder, initDetail } = useWorkerOrderDetail();
const actions = useWorkerOrderDetailActions(() => repairId.value, () => extras.value);

const dialog = reactive<{
  visible: boolean;
  type: WorkOrderDialogType;
}>({
  visible: false,
  type: '',
});

const dialogItem = computed<WorkOrderItem | null>(() => {
  if (!workOrder.value) return null;
  return {
    maintain_type: workOrder.value.maintainType,
  };
});

const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseDetailConfig(workOrder.value, extras.value, {
    page: 'doing',
    statusText: getDoingStatusText(),
    timeLabel: '接单时间：',
    timeValue: workOrder.value.takeTime,
  });
});

const buttons = computed(() => (workOrder.value ? getDoingButtons(workOrder.value, extras.value) : []));

onLoad((options: any) => {
  initDetail(options);
});

const goBack = () => {
  uni.navigateBack();
};

const callPhone = () => {
  actions.callPhone(workOrder.value?.phone);
};

const openDialog = (type: WorkOrderDialogType) => {
  dialog.type = type;
  dialog.visible = true;
};

const closeDialog = () => {
  dialog.visible = false;
  dialog.type = '';
};

const confirmDialog = async (value: string) => {
  if (!workOrder.value) return;
  if (dialog.type === 'quote') await actions.quoteOrder(workOrder.value, value, false);
  if (dialog.type === 'requote') await actions.quoteOrder(workOrder.value, value, true);
  if (dialog.type === 'pause') await actions.pauseOrder(workOrder.value, value);
  if (dialog.type === 'stop') await actions.stopOrder(workOrder.value, value);
  closeDialog();
};

const handleAction = async (key: DetailActionKey) => {
  if (!workOrder.value) return;
  if (key === 'complete') await actions.completeOrder(workOrder.value);
  if (key === 'continue') await actions.continueOrder();
  if (key === 'quote' || key === 'requote' || key === 'pause' || key === 'stop') openDialog(key);
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

.scroll {
  flex: 1;
  min-height: 0;
}

.jixiao-link {
  display: block;
  margin: 5px 20px 20px;
  color: #2196f3;
  font-size: 12px;
}
</style>
