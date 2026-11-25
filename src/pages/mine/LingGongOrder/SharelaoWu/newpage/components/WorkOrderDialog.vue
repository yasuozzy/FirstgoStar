<template>
  <view v-if="visible" class="dialog-mask" @click="close">
    <view class="dialog-panel" @click.stop>
      <text class="dialog-title">{{ title }}</text>

      <view v-if="isMoneyDialog" class="money-row">
        <text class="money-symbol">¥</text>
        <input v-model="inputValue" class="money-input" type="digit" placeholder="填写报价" />
      </view>

      <textarea
        v-else
        v-model="inputValue"
        class="reason-input"
        maxlength="50"
        :placeholder="placeholder"
      ></textarea>

      <button class="submit-button" @click="submit">提交</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import type { WorkOrderDialogType, WorkOrderItem } from '../config/workOrderState';

const props = defineProps<{
  visible: boolean;
  type: WorkOrderDialogType;
  item: WorkOrderItem | null;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'confirm', value: string): void;
}>();

const inputValue = ref('');
const isMoneyDialog = computed(() => props.type === 'quote' || props.type === 'requote');
const title = computed(() => {
  if (props.type === 'requote') return '追加报价';
  if (props.type === 'quote') return '报价';
  if (props.type === 'stop') return '停止';
  return '暂停';
});
const placeholder = computed(() => (props.type === 'stop' ? '填写停止原因' : '填写暂停原因'));

watch(
  () => props.visible,
  (visible) => {
    if (visible) inputValue.value = '';
  },
);

const close = () => {
  emit('close');
};

const submit = () => {
  const value = inputValue.value.trim();
  if (!value) {
    uni.showToast({ title: isMoneyDialog.value ? '报价不能为空' : '原因不能为空', icon: 'none' });
    return;
  }

  if (isMoneyDialog.value) {
    const money = Number(value);
    if (Number.isNaN(money)) {
      uni.showToast({ title: '报价格式不正确', icon: 'none' });
      return;
    }
    if (props.item?.maintain_type === 1 && money <= 0) {
      uni.showToast({ title: '应急类型工单，报价必须大于0元', icon: 'none' });
      return;
    }
    if (props.item?.maintain_type === 2 && money < 0) {
      uni.showToast({ title: '室内维修工单，报价必须大于等于0元', icon: 'none' });
      return;
    }
  }

  emit('confirm', value);
};
</script>

<style lang="scss" scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
}

.dialog-panel {
  width: 73%;
  padding: 24px 19px 19px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;
}

.dialog-title {
  display: block;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.money-row {
  display: flex;
  align-items: center;
  margin-top: 58px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
}

.money-symbol {
  font-size: 19px;
  font-weight: bold;
}

.money-input {
  flex: 1;
  height: 32px;
  margin-left: 10px;
  font-size: 14px;
}

.reason-input {
  width: 100%;
  min-height: 96px;
  margin-top: 24px;
  padding: 14px;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}

.submit-button {
  height: 43px;
  margin-top: 19px;
  color: #fff;
  font-size: 14px;
  line-height: 43px;
  background: #2a9595;
  border-radius: 5px;

  &::after {
    border: none;
  }
}
</style>
