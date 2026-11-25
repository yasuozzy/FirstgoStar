<template>
  <view class="form-section upload-section">
    <text class="section-title">{{ title }}</text>
    <uni-file-picker
      :value="files"
      fileMediatype="image"
      mode="grid"
      :limit="limit"
      @select="$emit('select', $event)"
    />
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  files?: string[];
  limit?: number;
}>();

defineEmits<{
  select: [event: any];
}>();
</script>

<style lang="scss" scoped>
.form-section { margin-top: 10px; padding: 0 15px; background: #fff; }
.upload-section { padding-bottom: 15px; }
.section-title { display: block; padding: 15px 0 10px; color: #2A9595; font-size: 14px; }
</style>
