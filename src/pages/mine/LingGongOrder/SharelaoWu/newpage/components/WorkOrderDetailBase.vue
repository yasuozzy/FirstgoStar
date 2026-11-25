<template>
  <view class="detail-base">
    <view class="type-head">
      <image v-if="config.showUrgent" class="urgent" :src="urgentIcon" mode="widthFix" />
      <image class="type-icon" :src="config.typeIcon" mode="aspectFit" />
      <text class="type-text">{{ config.typeText }}</text>
      <text v-if="config.priceText" class="price-text">{{ config.priceText }}</text>
    </view>

    <view class="divider" />
    <DetailRow label="当前状态：" :value="config.stateText" />
    <DetailRow v-if="config.timeLabel" :label="config.timeLabel" :value="config.timeValue" />
    <DetailRow :label="config.ownerHouseLabel" :value="config.ownerHouseValue" />
    <DetailRow v-if="config.showOwner" :label="config.ownerLabel" :value="config.ownerValue">
      <text class="call" @click.stop="emit('call')">呼叫</text>
    </DetailRow>
    <DetailRow v-if="config.showVisitTime" label="上门时间：" :value="config.visitTime" />
    <DetailRow :label="config.repairTypeLabel" :value="config.repairTypeValue" />
    <DetailRow label="具体描述：" :value="config.repairContent" />
  </view>
</template>

<script setup lang="ts">
import { DETAIL_ASSETS } from '../config/workerOrderDetailAssets';
import type { DetailBaseConfig } from '../config/workerOrderDetailState';
import DetailRow from './WorkOrderDetailRow.vue';

defineProps<{
  config: DetailBaseConfig;
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
  padding: 29px 16px 0;
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
  margin-top: 19px;
  color: #333;
  font-size: 12px;
}

.price-text {
  margin-top: 14px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.divider {
  height: 1px;
  margin: 24px 19px 0;
  background: #f0f8ff;
}

.call {
  flex-shrink: 0;
  padding-left: 10px;
  color: #4c86e5;
  font-size: 13px;
}
</style>

