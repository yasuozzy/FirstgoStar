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
    <WorkOrderPerformanceDialog
      :visible="showPerformance"
      :order="workOrder"
      :status-text="baseConfig?.stateText"
      @close="showPerformance = false"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import WorkOrderDetailActions from './components/WorkOrderDetailActions.vue';
import WorkOrderDetailBase from './components/WorkOrderDetailBase.vue';
import WorkOrderMediaGrid from './components/WorkOrderMediaGrid.vue';
import WorkOrderPerformanceDialog from './components/WorkOrderPerformanceDialog.vue';
import WorkOrderVoiceList from './components/WorkOrderVoiceList.vue';
import { useWorkerOrderDetail } from './composables/useWorkerOrderDetail';
import { useWorkerOrderDetailActions } from './composables/useWorkerOrderDetailActions';
import { getBaseDetailConfig, getWaitButtons, type DetailActionKey } from './config/workerOrderDetailState';

const bgColor = '#2A9595';
const showPerformance = ref(false);
const { repairId, extras, workOrder, initDetail } = useWorkerOrderDetail();
const actions = useWorkerOrderDetailActions(() => repairId.value, () => extras.value);

const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseDetailConfig(workOrder.value, extras.value, {
    page: 'wait',
    statusText: '待处理',
  });
});

const buttons = computed(() => (workOrder.value ? getWaitButtons(workOrder.value, extras.value) : []));

onLoad((options: any) => {
  initDetail(options);
});

const goBack = () => {
  uni.navigateBack();
};

const callPhone = () => {
  actions.callPhone(workOrder.value?.phone);
};

const handleAction = async (key: DetailActionKey) => {
  if (!workOrder.value) return;
  if (key === 'grab') await actions.grabOrder(workOrder.value);
  if (key === 'accept') await actions.acceptOrRefuse(workOrder.value, '2');
  if (key === 'refuse') await actions.acceptOrRefuse(workOrder.value, '3');
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
