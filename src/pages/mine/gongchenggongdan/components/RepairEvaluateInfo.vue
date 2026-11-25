<template>
  <view v-if="estimate" class="evaluate">
    <view class="divider" />
    <view class="evaluate-row">
      <text>综合评价：</text>
      <text class="stars">{{ starsText }}</text>
    </view>
    <RepairDetailRow label="评价详情：" :value="estimate.commentsDetails" />
    <RepairDetailMediaGrid title="图片评价：" :images="images" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  normalizeStringArray,
  type RepairEstimate,
} from '../config/repairState';
import RepairDetailMediaGrid from './RepairDetailMediaGrid.vue';
import RepairDetailRow from './RepairDetailRow.vue';

const props = defineProps<{
  estimate?: RepairEstimate | null;
}>();

const images = computed(() => normalizeStringArray(props.estimate?.commentsPicImgs));
const starsText = computed(() => {
  const score = Math.max(0, Math.min(5, Math.round(Number(props.estimate?.score || 0))));
  return `${'★'.repeat(score)}${'☆'.repeat(5 - score)}`;
});
</script>

<style lang="scss" scoped>
.divider {
  height: 1px;
  margin: 29px 19px 0;
  background: #f0f0f0;
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
  font-size: 15px;
  letter-spacing: 0;
}
</style>
