<template>
  <view class="result-row">
    <text v-if="required" class="required">*</text>
    <text class="label">{{ label }}</text>
    <text class="value">{{ value || '暂无' }}</text>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value?: string | number;
  required?: boolean;
}>();
</script>

<style lang="scss" scoped>
.result-row {
  display: flex;
  align-items: flex-start;
  padding: 8px 15px;
  color: #999;
  font-size: 13px;
  line-height: 20px;
}

.required {
  color: #f00;
}

.label {
  flex-shrink: 0;
  min-width: 70px;
}

.value {
  flex: 1;
  min-width: 0;
  color: #333;
  word-break: break-all;
}
</style>

