<template>
  <view v-if="appeal" class="appeal-info">
    <EmergencyDetailRow label="申诉时间：" :value="appeal.createDate" />
    <EmergencyDetailRow label="申诉内容：" :value="appeal.content" />
    <EmergencyDetailMediaGrid title="申诉图片：" :images="appeal.pictures || []" />
  </view>
</template>

<script setup lang="ts">
import type { EmergencyAppeal } from '../config/emergencyDetailState';
import EmergencyDetailMediaGrid from './EmergencyDetailMediaGrid.vue';
import EmergencyDetailRow from './EmergencyDetailRow.vue';

defineProps<{
  appeal?: EmergencyAppeal | null;
}>();
</script>

<style lang="scss" scoped>
.appeal-info {
  padding-top: 14px;
}
</style>
