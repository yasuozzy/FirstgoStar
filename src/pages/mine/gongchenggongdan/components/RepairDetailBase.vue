<template>
  <view class="base">
    <view class="type-head">
      <image v-if="config.showUrgent" class="urgent" :src="urgentIcon" mode="widthFix" />
      <image class="type-icon" :src="config.typeIcon" mode="aspectFit" />
      <text class="type-text">{{ config.typeText }}</text>
      <text class="price-text">{{ config.priceText }}</text>
    </view>

    <view class="divider" />
    <RepairDetailRow label="当前状态：" :value="config.stateText" />

    <RepairDetailRow v-if="config.showWorker" label="维修人员：" :value="config.workerText">
      <text class="call" @click.stop="emit('call')">呼叫</text>
    </RepairDetailRow>

    <RepairDetailRow :label="config.ownerNameLabel" :value="config.ownerNameValue" />
    <RepairDetailRow :label="config.ownerHouseLabel" :value="config.ownerHouseValue" />
    <RepairDetailRow
      v-if="config.showPropertyPhone"
      label="物业电话："
      :value="config.propertyPhone"
    />
    <RepairDetailRow v-if="config.showVisitTime" label="上门时间：" :value="config.visitTime" />
    <RepairDetailRow :label="config.repairTypeLabel" :value="config.repairTypeValue" />
    <RepairDetailRow label="具体描述：" :value="config.repairContent" />
  </view>
</template>

<script setup lang="ts">
import { REPAIR_ASSETS, type RepairBaseConfig } from '../config/repairState';
import RepairDetailRow from './RepairDetailRow.vue';

defineProps<{
  config: RepairBaseConfig;
}>();

const emit = defineEmits<{
  (event: 'call'): void;
}>();

const urgentIcon = REPAIR_ASSETS.urgent;
</script>

<style lang="scss" scoped>
.base {
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
  font-size: 13px;
}

.price-text {
  min-height: 24px;
  margin-top: 14px;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.divider {
  height: 1px;
  margin: 24px 19px 0;
  background: #f0f0f0;
}

.call {
  flex-shrink: 0;
  margin-left: 10px;
  color: #4c86e5;
}
</style>
