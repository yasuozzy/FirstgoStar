<template>
  <view v-if="visibleButtons.length" class="action-bar">
    <button
      v-for="button in visibleButtons"
      :key="button.key"
      class="action-button"
      :class="{
        primary: button.primary,
        disabled: button.disabled,
        selected: button.selected,
      }"
      :disabled="button.disabled"
      @click="emit('action', button.key)"
    >
      {{ button.text }}
    </button>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RepairActionKey, RepairButton } from '../config/repairState';

const props = defineProps<{
  buttons: RepairButton[];
}>();

const emit = defineEmits<{
  (event: 'action', key: RepairActionKey): void;
}>();

const visibleButtons = computed(() => props.buttons.filter((button) => button.visible));
</script>

<style lang="scss" scoped>
.action-bar {
  display: flex;
  gap: 10px;
  padding: 5px 14px 10px;
  background: #fff;
}

.action-button {
  flex: 1;
  min-width: 0;
  height: 40px;
  margin: 0;
  overflow: hidden;
  color: #2a9595;
  font-size: 14px;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #2a9595;
  border-radius: 5px;
}

.action-button::after {
  border: none;
}

.action-button.primary {
  color: #fff;
  background: #2a9595;
}

.action-button.disabled {
  color: #999;
  border-color: #999;
  background: #fff;
}
</style>
