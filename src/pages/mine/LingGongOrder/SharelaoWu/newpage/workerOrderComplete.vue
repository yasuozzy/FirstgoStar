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

      <view v-if="showEvaluate" class="evaluate">
        <view class="divider" />
        <view class="evaluate-row">
          <text>综合评价：</text>
          <text class="stars">{{ stars }}</text>
        </view>
        <DetailRow label="评价内容：" :value="workOrderEstimate?.commentsDetails" />
      </view>

      <WorkOrderMediaGrid :title="imageTitle" :images="detailImages" />
      <WorkOrderVoiceList v-if="showVoice" :voices="workOrder?.voices || []" :durations="workOrder?.voiceDurations || []" />

      <view v-if="workordersale" class="appeal">
        <DetailRow label="申诉时间：" :value="workordersale.createDate" />
        <DetailRow label="申诉内容：" :value="workordersale.content" />
        <WorkOrderMediaGrid title="申诉图片：" :images="workordersale.pictures || []" />
      </view>

      <text v-if="extras.show" class="jixiao-link" @click="showPerformance = true">《绩效事前事中事后管理制度》</text>
      <text v-if="extras.show && Number(workOrder?.is_eva) === 1" class="jixiao-link" @click="showPerformanceResult = true">《绩效考核结果通知书》</text>
    </scroll-view>

    <WorkOrderDetailActions :buttons="buttons" @action="handleAction" />
    <WorkOrderPerformanceDialog
      :visible="showPerformance"
      :order="workOrder"
      :status-text="baseConfig?.stateText"
      @close="showPerformance = false"
    />
    <WorkOrderPerformanceResultDialog
      :visible="showPerformanceResult"
      :order="workOrder"
      :estimate="workOrderEstimate"
      @close="showPerformanceResult = false"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import DetailRow from './components/WorkOrderDetailRow.vue';
import WorkOrderDetailActions from './components/WorkOrderDetailActions.vue';
import WorkOrderDetailBase from './components/WorkOrderDetailBase.vue';
import WorkOrderMediaGrid from './components/WorkOrderMediaGrid.vue';
import WorkOrderPerformanceDialog from './components/WorkOrderPerformanceDialog.vue';
import WorkOrderPerformanceResultDialog from './components/WorkOrderPerformanceResultDialog.vue';
import WorkOrderVoiceList from './components/WorkOrderVoiceList.vue';
import { useWorkerOrderDetail } from './composables/useWorkerOrderDetail';
import { useWorkerOrderDetailActions } from './composables/useWorkerOrderDetailActions';
import {
  getBaseDetailConfig,
  getCompleteButtons,
  getCompleteStatus,
  getCompleteTime,
  toStars,
  type DetailActionKey,
} from './config/workerOrderDetailState';

const bgColor = '#2A9595';
const showPerformance = ref(false);
const showPerformanceResult = ref(false);
const { repairId, extras, workOrder, workOrderEstimate, workordersale, initDetail } = useWorkerOrderDetail();
const actions = useWorkerOrderDetailActions(() => repairId.value, () => extras.value);

const completeTime = computed(() => (workOrder.value ? getCompleteTime(workOrder.value) : { label: '', value: '' }));
const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseDetailConfig(workOrder.value, extras.value, {
    page: 'complete',
    statusText: getCompleteStatus(workOrder.value),
    timeLabel: completeTime.value.label,
    timeValue: completeTime.value.value,
  });
});

const showEvaluate = computed(() => workOrder.value?.tache === 4 && workOrder.value?.maintainType !== 3 && Boolean(workOrderEstimate.value));
const imageTitle = computed(() => {
  if (workOrder.value?.tache === 4 && workOrder.value?.maintainType !== 3) return '图片评价：';
  return '图片描述：';
});
const detailImages = computed(() => {
  if (showEvaluate.value) return workOrderEstimate.value?.commentsPicImgs || [];
  return workOrder.value?.picimgs || [];
});
const showVoice = computed(() => workOrder.value?.tache !== 4 || workOrder.value?.maintainType === 3);
const stars = computed(() => toStars(workOrderEstimate.value?.score));
const buttons = computed(() => (workOrder.value ? getCompleteButtons(workOrder.value, extras.value) : []));

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
  if (key === 'rollback') await actions.rollbackOrder(workOrder.value);
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

.divider {
  height: 1px;
  margin: 29px 19px 0;
  background: #f0f8ff;
}

.evaluate-row {
  display: flex;
  align-items: center;
  margin: 24px 19px 0;
  color: #333;
  font-size: 13px;
}

.stars {
  margin-left: 10px;
  color: #f5a623;
}

.appeal {
  padding-top: 14px;
}

.jixiao-link {
  display: block;
  margin: 5px 20px 10px;
  color: #2196f3;
  font-size: 12px;
}
</style>
