<template>
  <view v-if="visible" class="dialog-mask" @click="emit('close')">
    <view class="dialog-panel" @click.stop>
      <text class="dialog-title" @click="expanded = true">绩效目标确认单</text>

      <view v-if="expanded" class="dialog-content">
        <DetailRow label="报修类型：" :value="order?.repairType" />
        <DetailRow label="报修房产：" :value="order?.repairIndustry" />
        <DetailRow v-if="order?.visitTime" label="报修时间：" :value="order?.visitTime" />
        <DetailRow v-if="statusText" label="当前状态：" :value="statusText" />
        <DetailRow label="具体描述：" :value="order?.repairContent" />
        <WorkOrderMediaGrid v-if="order?.picimgs?.length" title="图片描述：" :images="order.picimgs" />
      </view>

      <button class="back-button" @click="emit('close')">返回</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { WorkerOrderDetail } from '../config/workerOrderDetailState';
import DetailRow from './WorkOrderDetailRow.vue';
import WorkOrderMediaGrid from './WorkOrderMediaGrid.vue';

const props = defineProps<{
  visible: boolean;
  order: WorkerOrderDetail | null;
  statusText?: string;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const expanded = ref(false);

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
  padding: 20px 0;
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
  padding-bottom: 10px;
}

.back-button {
  width: auto;
  height: 30px;
  margin: 10px auto;
  padding: 0 30px;
  color: #0080ff;
  font-size: 14px;
  line-height: 30px;
  background: #fff;
  border: 1px solid #0080ff;
  border-radius: 4px;

  &::after {
    border: none;
  }
}
</style>
