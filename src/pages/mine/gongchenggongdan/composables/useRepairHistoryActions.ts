import { MineGetEmergencyOrderDetail } from '@/api/mine';
import { storage } from '@/utils/storage';
import {
  getHistoryDetailRoute,
  type RepairHistoryItem,
} from '../config/repairState';

const getRepairList = (item: RepairHistoryItem) => item.repairList || '';

export const useRepairHistoryActions = () => {
  const openDetail = async (item: RepairHistoryItem) => {
    const repairList = getRepairList(item);
    if (!repairList) {
      uni.showToast({ title: '未找到工单编号', icon: 'none' });
      return;
    }

    uni.showLoading({ title: '加载中...', mask: true });
    try {
      const response = await MineGetEmergencyOrderDetail({
        authorToken: storage.getToken() || '',
        repairList,
      });
      const workOrder = response?.result?.workOrder;
      const route = getHistoryDetailRoute({
        ...item,
        tache: workOrder?.tache ?? item.tache,
      });

      if (!route) return;
      uni.navigateTo({
        url: `${route}?repair_id=${encodeURIComponent(repairList)}`,
      });
    } catch (error) {
      console.log(error);
      uni.showToast({ title: '加载详情失败', icon: 'none' });
    } finally {
      uni.hideLoading();
    }
  };

  return {
    openDetail,
  };
};
