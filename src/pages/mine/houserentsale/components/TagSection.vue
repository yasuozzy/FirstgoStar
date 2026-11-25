<template>
  <view class="form-section tag-section">
    <text class="section-title">{{ title }}</text>
    <view class="tag-wrap">
      <up-tag
        v-for="item in items"
        :key="item.childValue"
        :text="item.childValue"
        type="primary"
        :plain="!selected.includes(item.childValue)"
        @click="$emit('toggle', item.childValue)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
interface DictItem {
  childValue: string;
}

defineProps<{
  title: string;
  items: DictItem[];
  selected: string[];
}>();

defineEmits<{
  toggle: [value: string];
}>();
</script>

<style lang="scss" scoped>
.form-section { margin-top: 10px; padding: 0 15px; background: #fff; }
.section-title { display: block; padding: 15px 0 10px; color: #333; font-size: 14px; }
.tag-wrap { display: flex; flex-wrap: wrap; gap: 10px; padding-bottom: 15px; }
</style>
