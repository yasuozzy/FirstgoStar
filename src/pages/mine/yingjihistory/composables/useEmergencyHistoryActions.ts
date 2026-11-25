import { MineGetEmergencyOrderDetail } from '@/api/mine';
import type { EmergencyHistoryItem } from '../config/historyState';
import { getHistoryDetailRoute, getRepairListId } from '../config/historyState';

export const useEmergencyHistoryActions = () => {
  const openDetail = async (item: EmergencyHistoryItem) => {
    const repairList = getRepairListId(item);
    if (!repairList) {
      uni.showToast({ title: '未找到工单编号', icon: 'none' });
      return;
    }

    const route = getHistoryDetailRoute(item);
    uni.navigateTo({
      url: `${route}?repairList=${encodeURIComponent(repairList)}`,
    });
  };

  return {
    openDetail,
  };
};
