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
        <EmergencyDetailMediaGrid :images="picimgs" />
        <EmergencyDetailVoiceList :voices="voices" :durations="workOrder.voiceDurations || []" />
        <EmergencyAppealInfo v-if="showAppealInfo" :appeal="workordersale" />
      </template>
      <view v-else class="state-box">暂无详情</view>
    </scroll-view>

    <EmergencyDetailActions :buttons="buttons" @action="runAction" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import EmergencyAppealInfo from './components/EmergencyAppealInfo.vue';
import EmergencyDetailActions from './components/EmergencyDetailActions.vue';
import EmergencyDetailBase from './components/EmergencyDetailBase.vue';
import EmergencyDetailMediaGrid from './components/EmergencyDetailMediaGrid.vue';
import EmergencyDetailVoiceList from './components/EmergencyDetailVoiceList.vue';
import { useEmergencyDetail, normalizeStringArray } from './composables/useEmergencyDetail';
import { useEmergencyDetailActions } from './composables/useEmergencyDetailActions';
import {
  getBaseConfig,
  getProcessingButtons,
  getProcessingStatusText,
  getState,
  getTache,
} from './config/emergencyDetailState';

const {
  repairList,
  options,
  loading,
  errorText,
  workOrder,
  workordersale,
  initDetail,
  loadDetail,
} = useEmergencyDetail();
const actions = useEmergencyDetailActions(() => workOrder.value, () => repairList.value, loadDetail);

const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseConfig(workOrder.value, 'processing', getProcessingStatusText(workOrder.value));
});
const buttons = computed(() => (workOrder.value ? getProcessingButtons(workOrder.value, options.value) : []));
const picimgs = computed(() => normalizeStringArray(workOrder.value?.picimgs));
const voices = computed(() => normalizeStringArray(workOrder.value?.voices));
const showAppealInfo = computed(() => {
  if (!workOrder.value) return false;
  return getTache(workOrder.value) === 3 && getState(workOrder.value) === 2 && Boolean(workordersale.value);
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

const runAction = (key: Parameters<typeof actions.runAction>[0]) => {
  actions.runAction(key);
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
