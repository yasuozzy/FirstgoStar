<template>
  <view v-if="visible" class="dialog-mask" @click="emit('close')">
    <view class="dialog-panel" @click.stop>
      <text class="dialog-title" @click="expanded = true">绩效考核结果通知书</text>

      <view v-if="expanded" class="dialog-content">
        <ResultRow label="维修人员：" :value="`${order?.userName || ''}  ${order?.workerPhone || ''}`" />
        <ResultRow label="综合评价：" :value="stars" />
        <ResultRow label="评价详情：" :value="estimate?.commentsDetails" />
        <WorkOrderMediaGrid title="图片评价：" :images="estimate?.commentsPicImgs || []" />
        <ResultRow label="已结算金额" :value="order?.totalMoney" required />
        <ResultRow v-if="order?.cut_amt" label="扣款金额" :value="order?.cut_amt" required />
        <ResultRow v-if="order?.cut_content" label="扣款说明" :value="order?.cut_content" required />
      </view>

      <button class="back-button" @click="emit('close')">返回</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { WorkerOrderDetail, WorkerOrderEstimate } from '../config/workerOrderDetailState';
import { toStars } from '../config/workerOrderDetailState';
import WorkOrderMediaGrid from './WorkOrderMediaGrid.vue';
import ResultRow from './WorkOrderResultRow.vue';

const props = defineProps<{
  visible: boolean;
  order: WorkerOrderDetail | null;
  estimate: WorkerOrderEstimate | null;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const expanded = ref(false);
const stars = computed(() => toStars(props.estimate?.score));

watch(
  () => props.visible,
  (visible) => {
    if (visible) expanded.value = false;
  },
);
</script>

<style lang="scss" scoped>
.dialog-mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
}

.dialog-panel {
  width: 85%;
  max-height: 75vh;
  padding: 20px 10px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fff;
  border-radius: 5px;
}

.dialog-title {
  display: block;
  padding: 10px 40px;
  color: #0080ff;
  font-size: 16px;
  text-align: center;
}

.dialog-content {
  padding-top: 4px;
}

.back-button {
  width: auto;
  margin: 20px auto 15px;
  padding: 7px 30px;
  color: #0080ff;
  font-size: 14px;
  line-height: 1.2;
  background: #fff;
  border: 1px solid #0080ff;
  border-radius: 4px;

  &::after {
    border: none;
  }
}
</style>

