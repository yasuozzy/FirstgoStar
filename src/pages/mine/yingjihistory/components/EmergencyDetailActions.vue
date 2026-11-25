<template>
  <view v-if="visibleButtons.length" class="action-bar">
    <button
      v-for="button in visibleButtons"
      :key="button.key"
      class="action-button"
      :class="{ primary: button.primary, disabled: button.disabled }"
      :disabled="button.disabled"
      @click="emit('action', button.key)"
    >
      {{ button.text }}
    </button>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { EmergencyDetailActionKey, EmergencyDetailButton } from '../config/emergencyDetailState';

const props = defineProps<{
  buttons: EmergencyDetailButton[];
}>();

const emit = defineEmits<{
  (event: 'action', key: EmergencyDetailActionKey): void;
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
  height: 40px;
  margin: 0;
  color: #2a9595;
  font-size: 14px;
  line-height: 40px;
  background: #fff;
  border: 1px solid #2a9595;
  border-radius: 5px;

  &::after {
    border: none;
  }

  &.primary {
    color: #fff;
    background: #2a9595;
  }

  &.disabled {
    color: #999;
    border-color: #999;
    background: #fff;
  }
}
</style>
