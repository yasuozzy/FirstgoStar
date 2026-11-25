<template>
  <view v-if="buttons.length" class="action-bar">
    <button
      v-for="button in buttons"
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
import type { DetailActionKey, DetailButton } from '../config/workerOrderDetailState';

defineProps<{
  buttons: DetailButton[];
}>();

const emit = defineEmits<{
  (event: 'action', key: DetailActionKey): void;
}>();
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

