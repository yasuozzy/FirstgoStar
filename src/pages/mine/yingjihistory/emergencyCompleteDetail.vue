<template>
  <view class="page">
    <u-navbar
      title="报修记录"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #fff;"
    >
      <template #left>
        <u-icon name="arrow-left" size="20" color="#fff" @click="goBack" />
      </template>
    </u-navbar>

    <scroll-view scroll-y class="scroll">
      <view v-if="loading && !workOrder" class="state-box">加载中...</view>
      <view v-else-if="errorText" class="state-box" @click="loadDetail">{{ errorText }}</view>
      <template v-else-if="workOrder && baseConfig">
        <EmergencyDetailBase :config="baseConfig" @call="callWorker" />
        <EmergencyEvaluateInfo v-if="showEvaluate" :estimate="workOrderEstimate" />
        <EmergencyAppealInfo v-if="workordersale" :appeal="workordersale" />
      </template>
      <view v-else class="state-box">暂无详情</view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import EmergencyAppealInfo from './components/EmergencyAppealInfo.vue';
import EmergencyDetailBase from './components/EmergencyDetailBase.vue';
import EmergencyEvaluateInfo from './components/EmergencyEvaluateInfo.vue';
import { useEmergencyDetail } from './composables/useEmergencyDetail';
import { useEmergencyDetailActions } from './composables/useEmergencyDetailActions';
import {
  getBaseConfig,
  getCompleteStatusText,
  getMaintainType,
} from './config/emergencyDetailState';

const {
  repairList,
  loading,
  errorText,
  workOrder,
  workOrderEstimate,
  workordersale,
  initDetail,
  loadDetail,
} = useEmergencyDetail();
const actions = useEmergencyDetailActions(() => workOrder.value, () => repairList.value, loadDetail);

const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseConfig(workOrder.value, 'complete', getCompleteStatusText());
});
const showEvaluate = computed(() => {
  if (!workOrder.value) return false;
  return getMaintainType(workOrder.value) !== 3 && Boolean(workOrderEstimate.value);
});

onLoad((query: any) => {
  initDetail(query);
});

const goBack = () => {
  uni.navigateBack();
};

const callWorker = () => {
  actions.callPhone(workOrder.value?.workerPhone);
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

.state-box {
  padding: 24px 16px;
  color: #666;
  font-size: 13px;
  text-align: center;
}
</style>
