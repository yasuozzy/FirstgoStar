<template>
  <view v-if="estimate" class="evaluate-info">
    <view class="divider" />
    <view class="evaluate-row">
      <text>综合评价：</text>
      <text class="stars">{{ starsText }}</text>
    </view>
    <EmergencyDetailRow label="评价内容：" :value="estimate.commentsDetails" />
    <EmergencyDetailMediaGrid title="图片评价：" :images="estimate.commentsPicImgs || []" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { EmergencyEstimate } from '../config/emergencyDetailState';
import { toStars } from '../config/emergencyDetailState';
import EmergencyDetailMediaGrid from './EmergencyDetailMediaGrid.vue';
import EmergencyDetailRow from './EmergencyDetailRow.vue';

const props = defineProps<{
  estimate?: EmergencyEstimate | null;
}>();

const starsText = computed(() => {
  const count = toStars(props.estimate?.score);
  return `${'★'.repeat(count)}${'☆'.repeat(5 - count)}`;
});
</script>

<style lang="scss" scoped>
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
  font-size: 15px;
  letter-spacing: 0;
}
</style>
