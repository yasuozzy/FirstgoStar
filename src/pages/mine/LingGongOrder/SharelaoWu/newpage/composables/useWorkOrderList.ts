import { computed, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { storage } from '@/utils/storage';
import { MineGetEmergencyGrabOrderList, MineGetEmergencyOrderList } from '@/api/mine';
import { WORK_ORDER_TABS } from '../config/workOrderTabs';
import { normalizeWorkOrderItem, type WorkOrderItem } from '../config/workOrderState';

const PAGE_SIZE = 10;

const getStoredTakeOrder = () => {
  const value = storage.getTemporayTakeOrder();
  return value === true || value === '1' || value === 1;
};

export const useWorkOrderList = () => {
  const currentTabId = ref(1);
  const orders = ref<WorkOrderItem[]>([]);
  const page = ref(1);
  const hasMore = ref(true);
  const loading = ref(false);
  const errorText = ref('');
  const takeOrderEnabled = ref(getStoredTakeOrder());

  const currentTab = computed(() => WORK_ORDER_TABS.find((item) => item.id === currentTabId.value) || WORK_ORDER_TABS[0]);
  const isEmpty = computed(() => !loading.value && !errorText.value && orders.value.length === 0);

  const resetPaging = () => {
    page.value = 1;
    hasMore.value = true;
    errorText.value = '';
  };

  const shouldBlockByTakeOrder = () => !takeOrderEnabled.value && (currentTabId.value === 1 || currentTabId.value === 2);

  const loadData = async (reset = false) => {
    if (reset) {
      resetPaging();
    }

    if (shouldBlockByTakeOrder()) {
      orders.value = [];
      hasMore.value = false;
      return;
    }

    loading.value = page.value === 1;
    errorText.value = '';
    try {
      const params =
        currentTab.value.source === 'grab'
          ? {
              userId: storage.getUserId(),
              id: storage.getTemporayId(),
              page: page.value,
              size: PAGE_SIZE,
            }
          : {
              userId: storage.getTemporayId(),
              repairState: currentTab.value.repairState,
              page: page.value,
              size: PAGE_SIZE,
            };

      const res =
        currentTab.value.source === 'grab'
          ? await MineGetEmergencyGrabOrderList(params)
          : await MineGetEmergencyOrderList(params);
      const list = Array.isArray(res?.result) ? res.result.map(normalizeWorkOrderItem) : [];

      if (page.value === 1) {
        orders.value = list;
      } else {
        orders.value = orders.value.concat(list);
      }
      hasMore.value = list.length >= PAGE_SIZE;
    } catch (error: any) {
      console.log(error);
      errorText.value = error?.resultMessage || error?.message || '加载失败';
    } finally {
      loading.value = false;
      uni.stopPullDownRefresh();
    }
  };

  const changeTab = async (tabId: number) => {
    if (currentTabId.value === tabId) return;
    currentTabId.value = tabId;
    await loadData(true);
  };

  const reload = async () => {
    await loadData(true);
  };

  const updateTakeOrder = async (enabled: boolean) => {
    takeOrderEnabled.value = enabled;
    if (!enabled && (currentTabId.value === 1 || currentTabId.value === 2)) {
      orders.value = [];
      hasMore.value = false;
      return;
    }
    await loadData(true);
  };

  onPullDownRefresh(() => {
    loadData(true);
  });

  onReachBottom(() => {
    if (!hasMore.value || loading.value) return;
    page.value += 1;
    loadData();
  });

  return {
    tabs: WORK_ORDER_TABS,
    currentTabId,
    currentTab,
    orders,
    hasMore,
    loading,
    errorText,
    isEmpty,
    takeOrderEnabled,
    changeTab,
    loadData,
    reload,
    updateTakeOrder,
  };
};
