<template>
  <view class="detail-base">
    <view class="type-head">
      <image v-if="config.showUrgent" class="urgent" :src="urgentIcon" mode="widthFix" />
      <image class="type-icon" :src="config.typeIcon" mode="aspectFit" />
      <text class="type-text">{{ config.typeText }}</text>
      <text v-if="config.priceText" class="price-text">{{ config.priceText }}</text>
    </view>

    <view class="divider" />
    <EmergencyDetailRow label="当前状态：" :value="config.stateText" />
    <EmergencyDetailRow v-if="config.showWorker" label="维修人员：" :value="config.workerText">
      <text class="call" @click.stop="emit('call')">呼叫</text>
    </EmergencyDetailRow>
    <EmergencyDetailRow label="报修业主：" :value="config.ownerName" />
    <EmergencyDetailRow :label="config.ownerHouseLabel" :value="config.ownerHouseValue" />
    <EmergencyDetailRow v-if="config.showVisitTime" label="上门时间：" :value="config.visitTime" />
    <EmergencyDetailRow :label="config.repairTypeLabel" :value="config.repairTypeValue" />
    <EmergencyDetailRow label="具体描述：" :value="config.repairContent" />
  </view>
</template>

<script setup lang="ts">
import { DETAIL_ASSETS, type EmergencyBaseConfig } from '../config/emergencyDetailState';
import EmergencyDetailRow from './EmergencyDetailRow.vue';

defineProps<{
  config: EmergencyBaseConfig;
}>();

const emit = defineEmits<{
  (event: 'call'): void;
}>();

const urgentIcon = DETAIL_ASSETS.urgent;
</script>

<style lang="scss" scoped>
.detail-base {
  background: #fff;
}

.type-head {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px 0;
}

.urgent {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 42px;
}

.type-icon {
  width: 60px;
  height: 60px;
}

.type-text {
  margin-top: 10px;
  color: #333;
  font-size: 13px;
}

.price-text {
  margin-top: 10px;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.divider {
  height: 1px;
  margin: 14px 15px 0;
  background: #f0f0f0;
}

.call {
  flex-shrink: 0;
  margin-left: 10px;
  color: #2a9595;
  font-size: 13px;
}
</style>
