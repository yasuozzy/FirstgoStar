import { computed, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { MinePartyWangGeEventsGenZong } from '@/api/mine';
import { storage } from '@/utils/storage';
import { PAGE_SIZE, type RepairHistoryItem } from '../config/repairState';

const parseList = (response: any): RepairHistoryItem[] =>
  Array.isArray(response?.result) ? (response.result as RepairHistoryItem[]) : [];

export const useRepairHistoryList = () => {
  const items = ref<RepairHistoryItem[]>([]);
  const page = ref(1);
  const hasMore = ref(true);
  const loading = ref(false);
  const requesting = ref(false);
  const errorText = ref('');

  const isEmpty = computed(() => !loading.value && !errorText.value && items.value.length === 0);

  const reset = () => {
    page.value = 1;
    hasMore.value = true;
    errorText.value = '';
  };

  const loadData = async (resetPage = false) => {
    if (requesting.value) return;
    if (resetPage) reset();

    requesting.value = true;
    loading.value = page.value === 1;
    errorText.value = '';

    try {
      const response = await MinePartyWangGeEventsGenZong({
        repairUId: storage.getUserId(),
        maintainType: 4,
        page: page.value,
        size: PAGE_SIZE,
      });

      const list = parseList(response);
      if (response?.resultCode !== 200) {
        if (page.value === 1) items.value = [];
        hasMore.value = false;
        return;
      }

      items.value = page.value === 1 ? list : items.value.concat(list);
      hasMore.value = list.length >= PAGE_SIZE;
    } catch (error: any) {
      console.log(error);
      if (page.value === 1) {
        errorText.value = error?.resultMessage || error?.message || '加载失败';
      }
      if (page.value > 1) page.value -= 1;
    } finally {
      loading.value = false;
      requesting.value = false;
      uni.stopPullDownRefresh();
    }
  };

  const reload = () => loadData(true);

  onPullDownRefresh(() => {
    loadData(true);
  });

  onReachBottom(() => {
    if (!hasMore.value || requesting.value) return;
    page.value += 1;
    loadData();
  });

  return {
    items,
    hasMore,
    loading,
    requesting,
    errorText,
    isEmpty,
    loadData,
    reload,
  };
};
