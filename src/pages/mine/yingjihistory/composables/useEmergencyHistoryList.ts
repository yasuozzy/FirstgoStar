import { computed, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { MinePartyWangGeEventsGenZong } from '@/api/mine';
import { storage } from '@/utils/storage';
import { PAGE_SIZE, type EmergencyHistoryItem } from '../config/historyState';

const toList = (res: any): EmergencyHistoryItem[] => {
  if (Array.isArray(res?.result)) return res.result as EmergencyHistoryItem[];
  return [];
};

export const useEmergencyHistoryList = () => {
  const items = ref<EmergencyHistoryItem[]>([]);
  const page = ref(1);
  const hasMore = ref(true);
  const loading = ref(false);
  const requesting = ref(false);
  const errorText = ref('');

  const isEmpty = computed(() => !loading.value && !errorText.value && items.value.length === 0);

  const resetPaging = () => {
    page.value = 1;
    hasMore.value = true;
    errorText.value = '';
  };

  const loadData = async (reset = false) => {
    if (requesting.value) return;

    if (reset) {
      resetPaging();
    }

    requesting.value = true;
    loading.value = page.value === 1;
    errorText.value = '';

    try {
      const res = await MinePartyWangGeEventsGenZong({
        repairUId: storage.getUserId(),
        page: page.value,
        size: PAGE_SIZE,
      });

      const list = toList(res);
      if (res?.resultCode !== 200) {
        if (page.value === 1) {
          items.value = [];
        }
        hasMore.value = false;
        return;
      }

      if (page.value === 1) {
        items.value = list;
      } else {
        items.value = items.value.concat(list);
      }

      hasMore.value = list.length >= PAGE_SIZE;
    } catch (error: any) {
      console.log(error);
      if (page.value === 1) {
        errorText.value = error?.resultMessage || error?.message || '加载失败';
      }
      if (page.value > 1) {
        page.value -= 1;
      }
    } finally {
      loading.value = false;
      requesting.value = false;
      uni.stopPullDownRefresh();
    }
  };

  const reload = async () => {
    await loadData(true);
  };

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
