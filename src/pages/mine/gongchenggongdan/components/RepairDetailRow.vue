<template>
  <view class="row">
    <text class="label">{{ label }}</text>
    <view class="value-wrap">
      <text class="value">{{ value || '' }}</text>
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value?: string;
}>();
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: flex-start;
  margin: 24px 19px 0;
  color: #333;
  font-size: 13px;
  line-height: 20px;
}

.label {
  flex-shrink: 0;
}

.value-wrap {
  display: flex;
  flex: 1;
  min-width: 0;
  margin-left: 10px;
}

.value {
  flex: 1;
  min-width: 0;
  word-break: break-all;
}
</style>
