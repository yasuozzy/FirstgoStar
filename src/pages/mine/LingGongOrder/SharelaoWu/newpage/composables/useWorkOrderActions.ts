import { storage } from '@/utils/storage';
import {
  AppGetWorkOrderByWorker,
  MineGetEmergencyEndWorkOrder,
  MineGetEmergencyGoGrabOrder,
  MineGetEmergencyPassWorkOrder,
  MineGetEmergencyPauseWorkOrder,
  MineJiuYeQunShareYuanLaoWuOrderChangeSwitch,
  MineShareLaoWuOrderDetailAcceptOrRefuseOrder,
  MineShareLaoWuOrderDetailContinueOrder,
  MineShareLaoWuOrderDetailFirstAddPriceOrder,
  MineShareLaoWuOrderDetailRebuildOrder,
  MineShareLaoWuOrderDetailZhuiAddPriceOrder,
} from '@/api/mine';
import type { WorkOrderAction, WorkOrderItem } from '../config/workOrderState';

export interface DialogPayload {
  item: WorkOrderItem;
  value: string;
  isReQuote?: boolean;
  isPause?: boolean;
}

const toast = (title: string) => {
  uni.showToast({ title, icon: 'none' });
};

export const useWorkOrderActions = (refreshData: () => Promise<void> | void) => {
  const changeTakeOrder = async (checked: boolean) => {
    if (storage.getTemporayAuditStatus() === '0') {
      toast('您的维修工解绑申请正在审核中，无法进行此操作');
      return false;
    }

    await MineJiuYeQunShareYuanLaoWuOrderChangeSwitch({
      id: storage.getTemporayId(),
      userId: storage.getUserId(),
      takeOrder: checked ? '1' : '2',
    });

    storage.saveTemporayTakeOrder(checked);
    uni.$emit(checked ? 'refresh-worker-agree' : 'refresh-worker-refuse');
    return true;
  };

  const buildDetailQuery = (item: WorkOrderItem, currentTabId: number, detailKey: string) => {
    const params: Record<string, string> = {
      detailKey,
      repairId: item.repair_id || '',
      show: 'true',
      frommine: 'true',
    };

    if (currentTabId === 1) params.fromAll = 'true';
    if (currentTabId === 2) params.fromWait = 'true';
    if (currentTabId === 3) params.fromDoing = 'true';
    if (currentTabId === 4) params.fromCom = 'true';
    if (item.is_show_peo !== undefined) params.is_show_peo = String(item.is_show_peo);

    return Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  };

  const openDetail = async (item: WorkOrderItem, currentTabId: number) => {
    try {
      const res = await AppGetWorkOrderByWorker({
        repairList: item.repair_id,
        temperyId: storage.getTemporayId(),
      });
      if (res?.resultCode !== 200) return;

      const tache = Number(res?.result?.workOrder?.tache || 0);
      const detailKey = `share-laowu-worker-order-detail:${item.repair_id || item.id || Date.now()}`;
      uni.setStorageSync(detailKey, res);

      let path = '/pages/mine/LingGongOrder/SharelaoWu/newpage/workerOrderComplete';
      if (tache === 1) {
        path = '/pages/mine/LingGongOrder/SharelaoWu/newpage/workerOrderWaitInfo';
      } else if (tache === 2) {
        path = '/pages/mine/LingGongOrder/SharelaoWu/newpage/workerOrderInfo';
      }

      uni.navigateTo({
        url: `${path}?${buildDetailQuery(item, currentTabId, detailKey)}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const grabOrder = async (item: WorkOrderItem) => {
    await MineGetEmergencyGoGrabOrder({
      userId: storage.getUserId(),
      id: storage.getTemporayId(),
      repairUserId: item.repairUserId,
      userName: storage.getRealName(),
      phone: storage.getPhone(),
      repairList: item.repairList,
    });
    toast('抢单成功');
    await refreshData();
  };

  const rollbackOrder = async (item: WorkOrderItem) => {
    await MineShareLaoWuOrderDetailRebuildOrder({
      userId: storage.getUserId(),
      id: item.id,
      temperyId: item.user_id,
      repairList: item.repair_id,
      userName: item.user_name,
    });
    toast('重新发起成功');
    await refreshData();
  };

  const acceptOrRefuseOrder = async (item: WorkOrderItem, accept: '2' | '3') => {
    await MineShareLaoWuOrderDetailAcceptOrRefuseOrder({
      id: item.id,
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairId: item.repair_id,
      repairState: accept,
    });
    await refreshData();
  };

  const completeOrder = async (item: WorkOrderItem) => {
    await MineGetEmergencyPassWorkOrder({
      id: item.id,
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: item.repair_id,
    });
    await refreshData();
  };

  const stopOrder = async ({ item, value }: DialogPayload) => {
    await MineGetEmergencyEndWorkOrder({
      id: item.id,
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: item.repair_id,
      endContent: value,
    });
    await refreshData();
  };

  const pauseOrder = async ({ item, value }: DialogPayload) => {
    await MineGetEmergencyPauseWorkOrder({
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: item.repair_id,
      pauseContent: value,
    });
    await refreshData();
  };

  const continueOrder = async (item: WorkOrderItem) => {
    await MineShareLaoWuOrderDetailContinueOrder({
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: item.repair_id,
    });
    await refreshData();
  };

  const quoteOrder = async ({ item, value, isReQuote }: DialogPayload) => {
    const data = isReQuote
      ? {
          maintainType: String(item.maintain_type),
          userId: storage.getTemporayId(),
          userName: storage.getTemporayName(),
          repairList: item.repair_id,
          backhanderMoney: value,
          backhanderContent: '',
        }
      : {
          maintainType: String(item.maintain_type),
          userId: storage.getTemporayId(),
          userName: storage.getTemporayName(),
          repairList: item.repair_id,
          maintainMoney: value,
        };

    if (isReQuote) {
      await MineShareLaoWuOrderDetailZhuiAddPriceOrder(data);
    } else {
      await MineShareLaoWuOrderDetailFirstAddPriceOrder(data);
    }
    await refreshData();
  };

  const runAction = async (action: WorkOrderAction, item: WorkOrderItem) => {
    if (action === 'grab') return grabOrder(item);
    if (action === 'rollback') return rollbackOrder(item);
    if (action === 'refuse') return acceptOrRefuseOrder(item, '3');
    if (action === 'accept') return acceptOrRefuseOrder(item, '2');
    if (action === 'continue') return continueOrder(item);
    if (action === 'complete') return completeOrder(item);
    return undefined;
  };

  return {
    changeTakeOrder,
    openDetail,
    runAction,
    quoteOrder,
    pauseOrder,
    stopOrder,
  };
};
