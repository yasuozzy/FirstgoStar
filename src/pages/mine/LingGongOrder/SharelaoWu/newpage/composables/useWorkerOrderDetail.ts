import { computed, ref } from 'vue';
import type {
  WorkerOrderDetail,
  WorkerOrderEstimate,
  WorkerOrderExtras,
  WorkerOrderSale,
} from '../config/workerOrderDetailState';

export const useWorkerOrderDetail = () => {
  const repairId = ref('');
  const detailKey = ref('');
  const detail = ref<any>(null);
  const extras = ref<WorkerOrderExtras>({});

  const workOrder = computed<WorkerOrderDetail | null>(() => detail.value?.result?.workOrder || null);
  const workOrderEstimate = computed<WorkerOrderEstimate | null>(() => detail.value?.result?.workOrderEstimate || null);
  const workordersale = computed<WorkerOrderSale | null>(() => detail.value?.result?.workordersale || null);

  const initDetail = (options: any) => {
    repairId.value = decodeURIComponent(options.repairId || '');
    detailKey.value = decodeURIComponent(options.detailKey || '');
    extras.value = {
      show: options.show === 'true',
      frommine: options.frommine === 'true',
      fromAll: options.fromAll === 'true',
      fromWait: options.fromWait === 'true',
      fromDoing: options.fromDoing === 'true',
      fromCom: options.fromCom === 'true',
      is_show_peo: Number(options.is_show_peo || 0),
    };
    if (detailKey.value) {
      detail.value = uni.getStorageSync(detailKey.value);
    }
  };

  return {
    repairId,
    detailKey,
    detail,
    extras,
    workOrder,
    workOrderEstimate,
    workordersale,
    initDetail,
  };
};

