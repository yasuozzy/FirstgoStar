<template>
  <view class="history-item" @click="handleClick">
    <view class="top-row">
      <view class="left-row">
        <text class="type-text">{{ display.typeText }}</text>
        <view v-if="display.showUrgent" class="urgent-tag">
          <text class="urgent-text">加急</text>
        </view>
      </view>

      <view class="status-row">
        <text class="status-text">{{ display.statusText }}</text>
        <u-icon name="arrow-right" size="14" color="#999" />
      </view>
    </view>

    <text class="time-text">{{ display.timeText }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { EmergencyHistoryItem } from '../config/historyState';
import { getHistoryDisplay } from '../config/historyState';

const props = defineProps<{
  item: EmergencyHistoryItem;
}>();

const emit = defineEmits<{
  (event: 'click', item: EmergencyHistoryItem): void;
}>();

const display = computed(() => getHistoryDisplay(props.item));

const handleClick = () => {
  emit('click', props.item);
};
</script>

<style lang="scss" scoped>
.history-item {
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

.left-row {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
}

.type-text {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
}

.urgent-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  padding: 0 8px;
  border: 1px solid #ff6a6a;
  border-radius: 9px;
}

.urgent-text {
  color: #ff6a6a;
  font-size: 11px;
  line-height: 16px;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  min-width: 0;
}

.status-text {
  color: #2a9595;
  font-size: 13px;
  line-height: 18px;
  white-space: nowrap;
}

.time-text {
  display: block;
  margin-top: 8px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}
</style>
