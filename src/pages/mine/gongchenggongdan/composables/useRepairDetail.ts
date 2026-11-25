import { computed, ref } from 'vue';
import { MineGetEmergencyOrderDetail } from '@/api/mine';
import { storage } from '@/utils/storage';
import type {
  RepairAppeal,
  RepairDetailResponse,
  RepairEstimate,
  RepairWorkOrder,
} from '../config/repairState';

const firstValue = (value: unknown) => (Array.isArray(value) ? value[0] : value);

export const useRepairDetail = () => {
  const repairList = ref('');
  const loading = ref(false);
  const errorText = ref('');
  const detail = ref<RepairDetailResponse['result'] | null>(null);

  const workOrder = computed<RepairWorkOrder | null>(() => detail.value?.workOrder || null);
  const workOrderEstimate = computed<RepairEstimate | null>(
    () => detail.value?.workOrderEstimate || null,
  );
  const workordersale = computed<RepairAppeal | null>(() => detail.value?.workordersale || null);

  const loadDetail = async () => {
    if (!repairList.value) {
      errorText.value = '未找到工单编号';
      return;
    }

    loading.value = true;
    errorText.value = '';

    try {
      const response = await MineGetEmergencyOrderDetail({
        authorToken: storage.getToken() || '',
        repairList: repairList.value,
      });
      detail.value = response?.result || null;
      if (!detail.value?.workOrder) {
        errorText.value = response?.message || response?.resultMessage || '暂无详情';
      }
    } catch (error) {
      console.log(error);
      errorText.value = '加载详情失败';
    } finally {
      loading.value = false;
    }
  };

  const initDetail = (query: Record<string, unknown> = {}) => {
    const value = firstValue(query.repair_id ?? query.repairList ?? query.repairId);
    repairList.value = value ? decodeURIComponent(String(value)) : '';
    loadDetail();
  };

  return {
    repairList,
    loading,
    errorText,
    detail,
    workOrder,
    workOrderEstimate,
    workordersale,
    initDetail,
    loadDetail,
  };
};
