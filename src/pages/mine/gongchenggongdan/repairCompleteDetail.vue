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
        <RepairEvaluateInfo v-if="workOrderEstimate" :estimate="workOrderEstimate" />
        <RepairAppealInfo v-if="workordersale" :appeal="workordersale" />
      </template>
      <view v-else class="state-box">暂无详情</view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import RepairAppealInfo from './components/RepairAppealInfo.vue';
import RepairDetailBase from './components/RepairDetailBase.vue';
import RepairEvaluateInfo from './components/RepairEvaluateInfo.vue';
import { getBaseConfig } from './config/repairState';
import { useRepairActions } from './composables/useRepairActions';
import { useRepairDetail } from './composables/useRepairDetail';

const {
  repairList,
  loading,
  errorText,
  workOrder,
  workOrderEstimate,
  workordersale,
  initDetail,
  loadDetail,
} = useRepairDetail();

const actions = useRepairActions(
  () => workOrder.value,
  () => repairList.value,
  loadDetail,
);

const baseConfig = computed(() => {
  if (!workOrder.value) return null;
  return getBaseConfig(workOrder.value, 'complete', '已完成');
});

const callWorker = () => {
  actions.callWorker(workOrder.value?.workerPhone);
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((query: any) => {
  initDetail(query);
});
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
