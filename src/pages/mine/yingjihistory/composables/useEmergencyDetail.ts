import { computed, ref } from 'vue';
import { MineGetEmergencyOrderDetail } from '@/api/mine';
import type {
  EmergencyAppeal,
  EmergencyDetailOptions,
  EmergencyDetailResponse,
  EmergencyEstimate,
  EmergencyWorkOrder,
} from '../config/emergencyDetailState';

const truthy = (value: unknown) => value === true || value === 'true' || value === '1';

const firstValue = (value: unknown) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export const normalizeStringArray = (value?: string[] | string | null): string[] => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const useEmergencyDetail = () => {
  const repairList = ref('');
  const options = ref<EmergencyDetailOptions>({});
  const loading = ref(false);
  const errorText = ref('');
  const detail = ref<EmergencyDetailResponse['result'] | null>(null);

  const workOrder = computed<EmergencyWorkOrder | null>(() => detail.value?.workOrder || null);
  const workOrderEstimate = computed<EmergencyEstimate | null>(() => detail.value?.workOrderEstimate || null);
  const workordersale = computed<EmergencyAppeal | null>(() => detail.value?.workordersale || null);

  const loadDetail = async () => {
    if (!repairList.value) {
      errorText.value = '未找到工单编号';
      return;
    }

    loading.value = true;
    errorText.value = '';
    try {
      const res = await MineGetEmergencyOrderDetail({ repairList: repairList.value });
      detail.value = res?.result || null;
      if (!detail.value?.workOrder) errorText.value = res?.message || res?.resultMessage || '暂无详情';
    } catch (error) {
      console.log(error);
      errorText.value = '加载详情失败';
    } finally {
      loading.value = false;
    }
  };

  const initDetail = (query: Record<string, unknown> = {}) => {
    const id = firstValue(query.repair_id ?? query.repairList ?? query.repairId);
    repairList.value = id ? decodeURIComponent(String(id)) : '';
    options.value = {
      fromGongdanJiesuan: truthy(firstValue(query.fromGongdanJiesuan)),
    };
    loadDetail();
  };

  return {
    repairList,
    options,
    loading,
    errorText,
    detail,
    workOrder,
    workOrderEstimate,
    workordersale,
    initDetail,
    loadDetail,
    normalizeStringArray,
  };
};
