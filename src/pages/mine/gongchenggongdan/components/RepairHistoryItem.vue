<template>
  <view class="item" @click="emit('click', item)">
    <view class="top-row">
      <view class="left-row">
        <text class="type">{{ typeText }}</text>
        <view v-if="showUrgent" class="urgent">
          <text>加急</text>
        </view>
      </view>

      <view class="status-row">
        <text class="status">{{ statusText }}</text>
        <u-icon name="arrow-right" size="14" color="#999" />
      </view>
    </view>
    <text class="time">{{ timeText }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  getHistoryStatusText,
  getHistoryTimeText,
  getHistoryTypeText,
  type RepairHistoryItem as RepairHistoryRecord,
} from '../config/repairState';

const props = defineProps<{
  item: RepairHistoryRecord;
}>();

const emit = defineEmits<{
  (event: 'click', item: RepairHistoryRecord): void;
}>();

const typeText = computed(() => getHistoryTypeText(props.item));
const statusText = computed(() => getHistoryStatusText(props.item));
const timeText = computed(() => getHistoryTimeText(props.item));
const showUrgent = computed(() => Number(props.item.isUrgent ?? 0) === 2);
</script>

<style lang="scss" scoped>
.item {
  padding: 18px 14px 14px;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}

.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.left-row,
.status-row {
  display: flex;
  align-items: center;
  min-width: 0;
}

.left-row {
  gap: 10px;
}

.status-row {
  flex-shrink: 0;
  gap: 4px;
}

.type {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
}

.urgent {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border: 1px solid #ff6a6a;
  border-radius: 9px;
  color: #ff6a6a;
  font-size: 11px;
  line-height: 16px;
}

.status {
  color: #333;
  font-size: 13px;
  line-height: 18px;
  white-space: nowrap;
}

.time {
  display: block;
  margin-top: 8px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}
</style>
