export type EmergencyDetailPageType = 'pending' | 'processing' | 'complete';

export type EmergencyDetailActionKey =
  | 'urge'
  | 'cancel'
  | 'reissue'
  | 'appeal'
  | 'reject_price'
  | 'pay'
  | 'finish_yes'
  | 'finish_no'
  | 'evaluate'
  | 'cancel_appeal';

export interface EmergencyWorkOrder {
  id?: string;
  workId?: string;
  repairList?: string;
  repairUId?: string;
  repairPeople?: string;
  phone?: string;
  repairIndustry?: string;
  repairType?: string;
  repairContent?: string;
  maintainType?: number;
  tache?: number;
  state?: number;
  finishedSign?: string;
  isUrgent?: number;
  visitTime?: string;
  finishTime?: string;
  placeTime?: string;
  cancelTime?: string;
  endTime?: string;
  totalMoney?: number | string;
  maintainMoney?: number | string;
  backhanderMoney?: number | string;
  backhanderCount?: number;
  userId?: string;
  userName?: string;
  workerPhone?: string;
  orderRecordId?: string;
  picimgs?: string[];
  voices?: string[];
  voiceDurations?: Array<string | number>;
}

export interface EmergencyEstimate {
  score?: number;
  commentsDetails?: string;
  commentsPicImgs?: string[];
}

export interface EmergencyAppeal {
  createDate?: string;
  content?: string;
  pictures?: string[];
}

export interface EmergencyDetailResult {
  workOrder?: EmergencyWorkOrder;
  workOrderEstimate?: EmergencyEstimate;
  workordersale?: EmergencyAppeal;
}

export interface EmergencyDetailResponse {
  result?: EmergencyDetailResult;
  resultCode?: number;
  success?: boolean;
  message?: string;
  resultMessage?: string;
}

export interface EmergencyDetailOptions {
  fromGongdanJiesuan?: boolean;
}

export interface EmergencyBaseConfig {
  typeText: string;
  typeIcon: string;
  showUrgent: boolean;
  priceText: string;
  stateText: string;
  showWorker: boolean;
  workerText: string;
  ownerName: string;
  ownerHouseLabel: string;
  ownerHouseValue: string;
  showVisitTime: boolean;
  visitTime?: string;
  repairTypeLabel: string;
  repairTypeValue: string;
  repairContent: string;
}

export interface EmergencyDetailButton {
  key: EmergencyDetailActionKey;
  text: string;
  visible: boolean;
  disabled?: boolean;
  primary?: boolean;
}

export const DETAIL_ASSETS = {
  urgent: '/static/urgent.png',
  emergency: '/static/home/emergency.png',
  indoor: '/static/indoor.png',
  outdoor: '/static/outdoor.png',
  voice: '/static/adj.png',
};

const button = (
  key: EmergencyDetailActionKey,
  text: string,
  primary = false,
  disabled = false,
): EmergencyDetailButton => ({
  key,
  text,
  visible: true,
  primary,
  disabled,
});

const toNumber = (value?: string | number | null) => Number(value ?? 0);

export const getMaintainType = (order?: EmergencyWorkOrder | null) => toNumber(order?.maintainType);

export const getTache = (order?: EmergencyWorkOrder | null) => toNumber(order?.tache);

export const getState = (order?: EmergencyWorkOrder | null) => toNumber(order?.state);

export const getRepairList = (order?: EmergencyWorkOrder | null) => order?.repairList || '';

export const getMaintainTypeText = (maintainType?: number) => {
  if (maintainType === 1) return '应急';
  if (maintainType === 2) return '室内报修';
  return '公共设施';
};

export const getMaintainTypeAsset = (maintainType?: number) => {
  if (maintainType === 1) return DETAIL_ASSETS.emergency;
  if (maintainType === 2) return DETAIL_ASSETS.indoor;
  return DETAIL_ASSETS.outdoor;
};

export const getRepairTypeLabel = (maintainType?: number) => {
  if (maintainType === 1) return '应急类型：';
  return '报修类型：';
};

export const getOwnerHouseLabel = (maintainType?: number) => {
  if (maintainType === 2) return '报修房产：';
  return '所在房产：';
};

export const formatMoney = (value?: string | number) => {
  if (value === undefined || value === null || value === '') return '';
  const numberValue = Number(value);
  if (Number.isFinite(numberValue)) return numberValue.toFixed(2);
  return String(value);
};

export const isZeroMoney = (value?: string | number) => {
  if (value === undefined || value === null || value === '') return false;
  return Number(value) === 0 || String(value) === '0';
};

export const getPendingStatusText = (order: EmergencyWorkOrder) => {
  const tache = getTache(order);
  const state = getState(order);
  if (tache === 1 && state === 1) return '待处理';
  if (tache === 1 && state === 2) return '已派单';
  if (tache === 5) return '已取消';
  if (tache === 6) return '工单失败';
  return '';
};

export const getProcessingStatusText = (order: EmergencyWorkOrder) => {
  const tache = getTache(order);
  const state = getState(order);
  if (tache === 2) {
    if (state === 2 || state === 6) return '已报价';
    if (state === 3 || state === 7) return '待支付';
    if (state === 1) return '已接单';
    if (state === 4) return '维修中';
    if (state === 5) return '已暂停';
  }
  if (tache === 3 && state === 1) {
    if (!order.finishedSign) return '待确认完成';
    if (order.finishedSign === '0') return '未完成';
    return '待评价';
  }
  if (tache === 3 && state === 2) return '申诉中';
  return '';
};

export const getCompleteStatusText = () => '已完成';

export const getPriceText = (order: EmergencyWorkOrder, page: EmergencyDetailPageType) => {
  const maintainType = getMaintainType(order);
  const tache = getTache(order);
  const state = getState(order);
  if (maintainType === 3) return '';
  if (page === 'pending' && tache === 1) return '';
  if (page === 'processing' && tache === 2 && state < 4) return '';
  return formatMoney(order.totalMoney);
};

export const getBaseConfig = (
  order: EmergencyWorkOrder,
  page: EmergencyDetailPageType,
  stateText: string,
): EmergencyBaseConfig => {
  const maintainType = getMaintainType(order);
  return {
    typeText: getMaintainTypeText(maintainType),
    typeIcon: getMaintainTypeAsset(maintainType),
    showUrgent: order.isUrgent === 2,
    priceText: getPriceText(order, page),
    stateText,
    showWorker: page !== 'pending',
    workerText: `${order.userName || ''}${order.workerPhone || ''}`,
    ownerName: `${order.repairPeople || ''}${order.phone || ''}`,
    ownerHouseLabel: getOwnerHouseLabel(maintainType),
    ownerHouseValue: order.repairIndustry || '',
    showVisitTime: maintainType === 2,
    visitTime: order.visitTime,
    repairTypeLabel: getRepairTypeLabel(maintainType),
    repairTypeValue: order.repairType || '',
    repairContent: order.repairContent || '',
  };
};

export const getPendingButtons = (order: EmergencyWorkOrder, options: EmergencyDetailOptions): EmergencyDetailButton[] => {
  if (options.fromGongdanJiesuan || getMaintainType(order) === 3) return [];
  const tache = getTache(order);
  const state = getState(order);

  if (tache === 1 && state === 1) {
    return [button('urge', '催一催', true), button('cancel', '取消维修')];
  }
  if (tache === 5) return [button('reissue', '重新发起', true)];
  if (tache === 6) {
    const buttons = [button('reissue', '重新发起', true)];
    if (state === 3 || state === 4 || state === 6) buttons.push(button('appeal', '申诉'));
    return buttons;
  }
  return [];
};

export const getProcessingButtons = (order: EmergencyWorkOrder, options: EmergencyDetailOptions): EmergencyDetailButton[] => {
  if (options.fromGongdanJiesuan) return [];
  const tache = getTache(order);
  const state = getState(order);

  if (tache === 2 && (state === 2 || state === 3 || state === 6 || state === 7)) {
    return [button('reject_price', '拒绝报价'), button('pay', `支付（¥${getPayMoneyText(order)}）`, true)];
  }

  if (tache === 3 && state === 1) {
    if (!order.finishedSign) return [button('finish_yes', '已完成', true), button('finish_no', '未完成')];
    if (order.finishedSign === '0') return [button('finish_yes', '已完成', true), button('finish_no', '未完成', false, true)];
    return [button('evaluate', '评价', true), button('appeal', '申诉')];
  }

  if (tache === 3 && state === 2) return [button('cancel_appeal', '撤销申诉', true)];
  return [];
};

export const getPayMoney = (order: EmergencyWorkOrder) => {
  const state = getState(order);
  if (state === 6 || state === 7) return order.backhanderMoney;
  return order.maintainMoney;
};

export const getPayMoneyText = (order: EmergencyWorkOrder) => formatMoney(getPayMoney(order)) || '0.00';

export const isBackhanderPayState = (order: EmergencyWorkOrder) => {
  const state = getState(order);
  return state === 6 || state === 7;
};

export const toStars = (score?: number) => {
  const value = Math.max(0, Math.min(5, Math.round(Number(score || 0))));
  return value;
};
