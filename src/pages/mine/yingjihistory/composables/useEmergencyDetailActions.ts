import { storage } from '@/utils/storage';
import {
  AppConsentBackhanderMoney,
  AppConsentWordOrderPrice,
  AppCuiruOrder,
  AppOwnerPayBackhanderMoney,
  AppOwnerPayPrice,
  BeginWorkOrder,
  CancelWorkordersale,
  MinePartyWangGeEventsCancelSetUp,
  finishedSignOrder,
} from '@/api/mine';
import {
  getPayMoney,
  isBackhanderPayState,
  isZeroMoney,
  type EmergencyDetailActionKey,
  type EmergencyWorkOrder,
} from '../config/emergencyDetailState';

const toast = (title: string) => {
  uni.showToast({ title, icon: 'none' });
};

const getErrorMessage = (error: any) => error?.message || error?.resultMessage || error?.errMsg || '操作失败';

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
      success: (res) => resolve(Boolean(res.confirm)),
      fail: () => resolve(false),
    });
  });

export const useEmergencyDetailActions = (
  getOrder: () => EmergencyWorkOrder | null,
  getRepairList: () => string,
  refreshDetail: () => Promise<void> | void,
) => {
  const callPhone = (phone?: string) => {
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
    const confirmed = await showConfirm('确认取消维修工单？');
    if (!confirmed) return;
    await MinePartyWangGeEventsCancelSetUp({
      repairList: getRepairList(),
      repairUId: storage.getUserId(),
    });
    emitHistoryRefreshAndBack();
  };

  const reissueOrder = async () => {
    await BeginWorkOrder({
      repairList: getRepairList(),
      repairUId: storage.getUserId(),
    });
    toast('重新发起页面暂未迁移');
  };

  const showAppealMissing = () => {
    uni.navigateTo({
      url:
        `/pages/mine/LingGongOrder/SharelaoWu/yingjihistory/AppealWorkOrder?id=${getRepairList()}`
         
    });
  };

  const showEvaluateMissing = () => {
    uni.navigateTo({
      url:
        `/pages/mine/LingGongOrder/SharelaoWu/yingjihistory/EmergencyEvaluate?id=${getRepairList()}`
         
    });
  };

  const finishOrder = async (finishedSign: '0' | '1') => {
    const order = getOrder();
    if (!order) return;

    await finishedSignOrder({
      temperyId: order.workId,
      repairUId: order.repairUId,
      finishedSign,
      repairList: getRepairList(),
    });
    await refreshDetail();
    uni.$emit('EMERGENCY_REPAIR');
  };

  const rejectPrice = async () => {
    const order = getOrder();
    if (!order) return;
    const confirmed = await showConfirm('如拒绝，维修工单将失败', '确认拒绝报价？');
    if (!confirmed) return;

    const data = {
      repairUId: storage.getUserId(),
      isConsent: '2',
      repairList: getRepairList(),
    };
    if (isBackhanderPayState(order)) {
      await AppConsentBackhanderMoney(data);
    } else {
      await AppConsentWordOrderPrice(data);
    }
    emitHistoryRefreshAndBack();
  };

  const payOrder = async () => {
    const order = getOrder();
    if (!order) return;

    const data = {
      repairUId: storage.getUserId(),
      cstType: storage.getCstType(),
      hostNo: storage.getHostNo(),
      mobile: storage.getPhone(),
      workerId: order.userId,
      repairList: getRepairList(),
    };

    const res = isBackhanderPayState(order)
      ? await AppOwnerPayBackhanderMoney(data)
      : await AppOwnerPayPrice(data);
    const result = res?.result || {};
    const money = isBackhanderPayState(order) ? result.backhanderMoney ?? getPayMoney(order) : result.maintainMoney ?? getPayMoney(order);

    if (isZeroMoney(money)) {
      emitHistoryRefreshAndBack();
      return;
    }

    if (result.payUrl) {
      uni.navigateTo({
        url: `/pages/Integral/orderPayHtml?url=${encodeURIComponent(result.payUrl)}`,
      });
    }
  };

  const cancelAppeal = async () => {
    await CancelWorkordersale({
      repairId: getRepairList(),
      userId: storage.getUserId(),
    });
    toast('撤销申诉成功');
    emitHistoryRefreshAndBack();
  };

  const runAction = async (key: EmergencyDetailActionKey) => {
    try {
      if (key === 'urge') await urgeOrder();
      if (key === 'cancel') await cancelRepair();
      if (key === 'reissue') await reissueOrder();
      if (key === 'appeal') showAppealMissing();
      if (key === 'reject_price') await rejectPrice();
      if (key === 'pay') await payOrder();
      if (key === 'finish_yes') await finishOrder('1');
      if (key === 'finish_no') await finishOrder('0');
      if (key === 'evaluate') showEvaluateMissing();
      if (key === 'cancel_appeal') await cancelAppeal();
    } catch (error) {
      console.log(error);
      toast(getErrorMessage(error));
    }
  };

  return {
    callPhone,
    runAction,
    urgeOrder,
    cancelRepair,
    reissueOrder,
    rejectPrice,
    payOrder,
    finishOrder,
    cancelAppeal,
    showAppealMissing,
    showEvaluateMissing,
  };
};
