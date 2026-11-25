<template>
  <view class="work-order-card" @click="emit('detail', item)">
    <view class="card-head">
      <text class="card-title">{{ item.repair_industry || '' }}</text>
      <text class="card-state" :class="{ muted: config.statusMuted }">{{ config.statusText }}</text>
    </view>

    <view v-if="config.showOwner" class="info-row">
      <text class="info-label">{{ config.ownerLabel }}</text>
      <text class="info-value">{{ config.ownerValue || '暂无' }}</text>
    </view>

    <view v-for="row in visibleRows" :key="row.label" class="info-row">
      <text class="info-label">{{ row.label }}</text>
      <text class="info-value">{{ row.value || '暂无' }}</text>
    </view>

    <view v-if="config.showRating" class="rating-row">
      <text class="info-label">综合评价：</text>
      <text class="stars">{{ ratingText }}</text>
    </view>

    <view v-if="config.showButtons && visibleButtons.length" class="button-wrap" @click.stop>
      <button
        v-for="button in visibleButtons"
        :key="button.key"
        class="card-button"
        :class="{ disabled: button.disabled, selected: button.selected }"
        :disabled="button.disabled"
        @click="emit('action', button.key, item)"
      >
        {{ button.text }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WorkOrderAction, WorkOrderCardConfig, WorkOrderItem } from '../config/workOrderState';

const props = defineProps<{
  item: WorkOrderItem;
  config: WorkOrderCardConfig;
}>();

const emit = defineEmits<{
  (event: 'detail', item: WorkOrderItem): void;
  (event: 'action', action: WorkOrderAction, item: WorkOrderItem): void;
}>();

const visibleRows = computed(() => props.config.rows.filter((row) => row.visible !== false));
const visibleButtons = computed(() => props.config.buttons.filter((button) => button.visible));
const ratingText = computed(() => {
  const count = Math.max(0, Math.min(5, Math.round(props.config.ratingValue || 0)));
  return `${'★'.repeat(count)}${'☆'.repeat(5 - count)}`;
});
</script>

<style lang="scss" scoped>
.work-order-card {
  width: 92%;
  margin: 10px 4% 0;
  padding: 14px 14px 0;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  flex: 1;
  min-width: 0;
  padding-right: 12px;
  color: #333;
  font-size: 14px;
}

.card-state {
  color: #2a9595;
  font-size: 13px;
  white-space: nowrap;

  &.muted {
    color: #333;
  }
}

.info-row,
.rating-row {
  display: flex;
  margin-top: 10px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}

.info-label {
  flex-shrink: 0;
}

.info-value {
  flex: 1;
  min-width: 0;
  word-break: break-all;
}

.stars {
  color: #f5a623;
  letter-spacing: 0;
}

.button-wrap {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
  padding: 14px 0;
  border-top: 1px solid #f0f8ff;
}

.card-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 55px;
  height: 24px;
  margin: 0;
  padding: 0 12px;
  color: #2a9595;
  font-size: 12px;
  line-height: 24px;
  background: #fff;
  border: 1px solid #2a9595;
  border-radius: 5px;

  &::after {
    border: none;
  }

  &.disabled,
  &.selected {
    color: #999;
    border-color: #999;
  }
}
</style>

