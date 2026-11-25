import { storage } from '@/utils/storage';
import {
  AppConsentBackhanderMoney,
  AppConsentWordOrderPrice,
  AppCuiruOrder,
  BeginWorkOrder,
  CancelWorkordersale,
  finishedSignOrder,
  MinePartyWangGeEventsCancelSetUp,
  MinePartyWangGeEventsSetUpEvents,
} from '@/api/mine';
import {
  getState,
  getTache,
  type RepairActionKey,
  type RepairWorkOrder,
} from '../config/repairState';

const toast = (title: string) => uni.showToast({ title, icon: 'none' });

const getErrorMessage = (error: any) =>
  error?.message || error?.resultMessage || error?.errMsg || '操作失败';

const emitHistoryRefreshAndBack = () => {
  uni.$emit('EMERGENCYHISTERY');
  uni.navigateBack();
};

const showConfirm = (content: string, title = '提示') =>
  new Promise<boolean>((resolve) => {
    uni.showModal({
      title,
      content,
      cancelText: '取消',
      confirmText: '确认',
      success: (result) => resolve(Boolean(result.confirm)),
      fail: () => resolve(false),
    });
  });

const serializeList = (value?: string[] | string) => {
  if (Array.isArray(value)) return value.filter(Boolean).join(',');
  return value || '';
};

export const useRepairActions = (
  getOrder: () => RepairWorkOrder | null,
  getRepairList: () => string,
  refreshDetail: () => Promise<void> | void,
) => {
  const callWorker = (phone?: string) => {
    if (!phone) {
      toast('拨打电话号码为空');
      return;
    }
    uni.makePhoneCall({ phoneNumber: phone });
  };

  const urgeOrder = async () => {
    await AppCuiruOrder({
      repairList: getRepairList(),
      repairUId: storage.getUserId(),
    });
    toast('催单成功');
  };

  const cancelRepair = async () => {
    if (!(await showConfirm('确认取消维修工单？'))) return;
    await MinePartyWangGeEventsCancelSetUp({
      authorToken: storage.getToken() || '',
      repairList: getRepairList(),
      repairUId: storage.getUserId(),
    });
    emitHistoryRefreshAndBack();
  };

  const reissueOrder = async () => {
    const order = getOrder();
    if (!order) return;

    await BeginWorkOrder({
      repairList: getRepairList(),
      repairUId: storage.getUserId(),
    });

    await MinePartyWangGeEventsSetUpEvents({
      platformOrder: '1',
      repairList: null,
      houseId: null,
      managerId: order.managerId,
      repairNo: order.repairNo,
      repairIndustry: order.repairIndustry,
      repairContent: order.repairContent,
      reparirTypeId: order.reparirTypeId,
      maintainType: String(order.maintainType ?? ''),
      repairUId: storage.getUserId(),
      isUrgent: String(order.isUrgent ?? ''),
      phone: storage.getPhone(),
      repairPeople: storage.getRealName() || storage.getNickName(),
      pic: serializeList(order.picimgs),
      voice: serializeList(order.voices),
      voiceDuration: order.voiceDuration,
      visitTime: order.visitTime,
    });

    uni.$emit('REPAIR_RECEND');
    uni.navigateBack();
  };

  const showAppealNotice = () => toast('申诉页面暂未迁移');

  const showEvaluateNotice = () => toast('评价页面暂未迁移');

  const finishOrder = async (finishedSign: '0' | '1') => {
    const order = getOrder();
    if (!order) return;

    await finishedSignOrder({
      authorToken: storage.getToken() || '',
      temperyId: order.workId,
      repairUId: order.repairUId,
      finishedSign,
      repairList: getRepairList(),
    });
    await refreshDetail();
    uni.$emit('PLATFORM_REPAIR');
  };

  const rejectPrice = async () => {
    const order = getOrder();
    if (!order) return;
    if (!(await showConfirm('如拒绝，维修工单将失败', '确认拒绝报价？'))) return;

    const data = {
      repairUId: storage.getUserId(),
      isConsent: '2',
      repairList: getRepairList(),
    };

    if (getState(order) === 6 || getState(order) === 7) {
      await AppConsentBackhanderMoney(data);
    } else {
      await AppConsentWordOrderPrice(data);
    }
    emitHistoryRefreshAndBack();
  };

  const confirmPrice = async () => {
    const order = getOrder();
    if (!order) return;

    const data = {
      repairUId: storage.getUserId(),
      isConsent: '1',
      repairList: getRepairList(),
    };

    if (getState(order) === 6 || getState(order) === 7) {
      await AppConsentBackhanderMoney(data);
    } else {
      await AppConsentWordOrderPrice(data);
    }
    emitHistoryRefreshAndBack();
  };

  const cancelAppeal = async () => {
    await CancelWorkordersale({
      authorToken: storage.getToken() || '',
      repairId: getRepairList(),
      userId: storage.getUserId(),
    });
    toast('撤销申诉成功');
    emitHistoryRefreshAndBack();
  };

  const runAction = async (key: RepairActionKey) => {
    try {
      if (key === 'urge') await urgeOrder();
      if (key === 'cancel') await cancelRepair();
      if (key === 'reissue') await reissueOrder();
      if (key === 'appeal') showAppealNotice();
      if (key === 'reject_price') await rejectPrice();
      if (key === 'confirm_price') await confirmPrice();
      if (key === 'finish_yes') await finishOrder('1');
      if (key === 'finish_no') await finishOrder('0');
      if (key === 'evaluate') showEvaluateNotice();
      if (key === 'cancel_appeal') await cancelAppeal();
    } catch (error) {
      console.log(error);
      toast(getErrorMessage(error));
    }
  };

  return {
    callWorker,
    runAction,
    urgeOrder,
    cancelRepair,
    reissueOrder,
    rejectPrice,
    confirmPrice,
    finishOrder,
    cancelAppeal,
  };
};

export const isProcessingPriceAction = (order: RepairWorkOrder) =>
  getTache(order) === 2 && (getState(order) === 2 || getState(order) === 6);
