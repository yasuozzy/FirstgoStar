import { storage } from '@/utils/storage';
import {
  MineGetEmergencyEndWorkOrder,
  MineGetEmergencyGoGrabOrder,
  MineGetEmergencyPassWorkOrder,
  MineGetEmergencyPauseWorkOrder,
  MineShareLaoWuOrderDetailAcceptOrRefuseOrder,
  MineShareLaoWuOrderDetailContinueOrder,
  MineShareLaoWuOrderDetailFirstAddPriceOrder,
  MineShareLaoWuOrderDetailRebuildOrder,
  MineShareLaoWuOrderDetailZhuiAddPriceOrder,
} from '@/api/mine';
import type { WorkerOrderDetail, WorkerOrderExtras } from '../config/workerOrderDetailState';

const toast = (title: string) => {
  uni.showToast({ title, icon: 'none' });
};

export const emitSourceRefresh = (extras: WorkerOrderExtras) => {
  if (extras.fromAll) uni.$emit('refresh-worker-all');
  if (extras.fromWait) uni.$emit('refresh-worker-wait');
  if (extras.fromDoing) uni.$emit('refresh-worker-doing');
  if (extras.fromCom) uni.$emit('refresh-worker-complete');
};

const finishPage = () => {
  uni.navigateBack();
};

export const useWorkerOrderDetailActions = (repairId: () => string, extras: () => WorkerOrderExtras) => {
  const callPhone = (phone?: string) => {
    if (!phone) {
      toast('拨打电话号码为空');
      return;
    }
    uni.makePhoneCall({
      phoneNumber: phone,
      fail: () => toast('拨打电话失败，请重试'),
    });
  };

  const grabOrder = async (order: WorkerOrderDetail) => {
    await MineGetEmergencyGoGrabOrder({
      userId: storage.getUserId(),
      id: storage.getTemporayId(),
      repairUserId: order.repairUId,
      userName: storage.getRealName(),
      phone: storage.getPhone(),
      repairList: order.repairList,
    });
    toast('抢单成功');
    uni.$emit('refresh-worker-all');
    finishPage();
  };

  const acceptOrRefuse = async (order: WorkerOrderDetail, repairState: '2' | '3') => {
    await MineShareLaoWuOrderDetailAcceptOrRefuseOrder({
      id: order.orderRecordId,
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairId: order.repairList,
      repairState,
    });
    emitSourceRefresh(extras());
    finishPage();
  };

  const completeOrder = async (order: WorkerOrderDetail) => {
    await MineGetEmergencyPassWorkOrder({
      id: order.orderRecordId,
      userId: storage.getTemporayId(),
      userName: storage.getRealName(),
      repairList: repairId(),
    });
    emitSourceRefresh(extras());
    finishPage();
  };

  const stopOrder = async (order: WorkerOrderDetail, endContent: string) => {
    await MineGetEmergencyEndWorkOrder({
      id: order.orderRecordId,
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: repairId(),
      endContent,
    });
    emitSourceRefresh(extras());
    finishPage();
  };

  const pauseOrder = async (order: WorkerOrderDetail, pauseContent: string) => {
    await MineGetEmergencyPauseWorkOrder({
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: repairId(),
      pauseContent,
    });
    emitSourceRefresh(extras());
    finishPage();
  };

  const continueOrder = async () => {
    await MineShareLaoWuOrderDetailContinueOrder({
      userId: storage.getTemporayId(),
      userName: storage.getTemporayName(),
      repairList: repairId(),
    });
    emitSourceRefresh(extras());
    finishPage();
  };

  const quoteOrder = async (order: WorkerOrderDetail, money: string, isReQuote: boolean) => {
    const data = isReQuote
      ? {
          maintainType: String(order.maintainType),
          userId: storage.getTemporayId(),
          userName: storage.getTemporayName(),
          repairList: repairId(),
          backhanderMoney: money,
          backhanderContent: '',
        }
      : {
          maintainType: String(order.maintainType),
          userId: storage.getTemporayId(),
          userName: storage.getTemporayName(),
          repairList: repairId(),
          maintainMoney: money,
        };

    if (isReQuote) {
      await MineShareLaoWuOrderDetailZhuiAddPriceOrder(data);
    } else {
      await MineShareLaoWuOrderDetailFirstAddPriceOrder(data);
    }
    emitSourceRefresh(extras());
    finishPage();
  };

  const rollbackOrder = async (order: WorkerOrderDetail) => {
    await MineShareLaoWuOrderDetailRebuildOrder({
      userId: storage.getUserId(),
      id: order.id,
      temperyId: order.userId,
      repairList: order.repairList,
      userName: order.userName,
    });
    toast('重新发起成功');
    uni.$emit('refresh-worker-restart');
    finishPage();
  };

  return {
    callPhone,
    grabOrder,
    acceptOrRefuse,
    completeOrder,
    stopOrder,
    pauseOrder,
    continueOrder,
    quoteOrder,
    rollbackOrder,
  };
};

