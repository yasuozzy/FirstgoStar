<template>
  <view class="detail-row">
    <text class="label">{{ label }}</text>
    <text class="value">{{ value || '暂无' }}</text>
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
  margin: 28px 19px 0;
  color: #333;
  font-size: 13px;
  line-height: 20px;
}

.label {
  flex-shrink: 0;
}

.value {
  flex: 1;
  min-width: 0;
  margin-left: 10px;
  word-break: break-all;
}
</style>

