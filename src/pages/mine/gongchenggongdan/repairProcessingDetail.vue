<template>
  <view class="page">
    <u-navbar
      title="报修记录"
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

    <scroll-view scroll-y class="scroll">
      <view v-if="loading && !workOrder" class="state-box">加载中...</view>
      <view v-else-if="errorText" class="state-box" @click="loadDetail">{{ errorText }}</view>
      <template v-else-if="workOrder && baseConfig">
        <RepairDetailBase :config="baseConfig" @call="callWorker" />
        <RepairDetailMediaGrid :images="images" />
        <RepairVoiceList ref="voiceRef" :voices="voices" :durations="durations" />
        <RepairAppealInfo
          v-if="showAppealInfo"
          :appeal="workordersale"
        />
      </template>
      <view v-else class="state-box">暂无详情</view>
    </scroll-view>

    <RepairActions :buttons="buttons" @action="runAction" />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onHide, onLoad, onUnload } from '@dcloudio/uni-app';
import RepairActions from './components/RepairActions.vue';
import RepairAppealInfo from './components/RepairAppealInfo.vue';
import RepairDetailBase from './components/RepairDetailBase.vue';
import RepairDetailMediaGrid from './components/RepairDetailMediaGrid.vue';
import RepairVoiceList from './components/RepairVoiceList.vue';
import {
  getBaseConfig,
  getProcessingButtons,
  getProcessingStatusText,
  getState,
  getTache,
  normalizeStringArray,
} from './config/repairState';
import { useRepairActions } from './composables/useRepairActions';
import { useRepairDetail } from './composables/useRepairDetail';

const {
  repairList,
  loading,
  errorText,
  workOrder,
  workordersale,
  initDetail,
  loadDetail,
} = useRepairDetail();

const actions = useRepairActions(
  () => workOrder.value,
  () => repairList.value,
  loadDetail,
);

const voiceRef = ref<InstanceType<typeof RepairVoiceList> | null>(null);
const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseConfig(
    workOrder.value,
    'processing',
    getProcessingStatusText(workOrder.value),
  );
});
const buttons = computed(() => (workOrder.value ? getProcessingButtons(workOrder.value) : []));
const images = computed(() => normalizeStringArray(workOrder.value?.picimgs));
const voices = computed(() => normalizeStringArray(workOrder.value?.voices));
const durations = computed(() => normalizeStringArray(workOrder.value?.voiceDurations as any));
const showAppealInfo = computed(
  () =>
    Boolean(workOrder.value) &&
    getTache(workOrder.value) === 3 &&
    getState(workOrder.value) === 2 &&
    Boolean(workordersale.value),
);

const runAction = (key: Parameters<typeof actions.runAction>[0]) => {
  actions.runAction(key);
};

const callWorker = () => {
  actions.callWorker(workOrder.value?.workerPhone);
};

const goBack = () => {
  uni.navigateBack();
};

const stopVoice = () => {
  voiceRef.value?.stopVoice();
};

onLoad((query: any) => {
  initDetail(query);
});

onHide(stopVoice);
onUnload(stopVoice);
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

.nav-left {
  display: flex;
  align-items: center;
  padding-left: 4px;
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
