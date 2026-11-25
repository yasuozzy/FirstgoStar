<template>
  <view v-if="appeal" class="appeal">
    <RepairDetailRow label="申诉时间：" :value="appeal.createDate" />
    <RepairDetailRow label="申诉内容：" :value="appeal.content" />
    <RepairDetailMediaGrid title="申诉图片：" :images="images" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { normalizeStringArray, type RepairAppeal } from '../config/repairState';
import RepairDetailMediaGrid from './RepairDetailMediaGrid.vue';
import RepairDetailRow from './RepairDetailRow.vue';

const props = defineProps<{
  appeal?: RepairAppeal | null;
}>();

const images = computed(() => normalizeStringArray(props.appeal?.pictures));
</script>

<style lang="scss" scoped>
.appeal {
  padding-top: 14px;
}
</style>
