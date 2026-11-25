<template>
  <view class="detail-row">
    <text class="detail-label">{{ label }}</text>
    <text class="detail-value">{{ value || '暂无' }}</text>
    <slot />
  </view>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value?: string | number;
}>();
</script>

<style lang="scss" scoped>
.detail-row {
  display: flex;
  align-items: flex-start;
  padding: 12px 15px 0;
  color: #333;
  font-size: 13px;
  line-height: 20px;
}

.detail-label {
  flex-shrink: 0;
}

.detail-value {
  flex: 1;
  min-width: 0;
  color: #333;
  word-break: break-all;
}
</style>
