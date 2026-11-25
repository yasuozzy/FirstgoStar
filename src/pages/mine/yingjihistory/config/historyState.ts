export interface EmergencyHistoryItem {
  id?: string;
  repairList?: string;
  repair_id?: string;
  repairId?: string;
  repairUId?: string;
  maintainType?: number;
  maintain_type?: number;
  tache?: number;
  state?: number;
  isUrgent?: number;
  is_urgent?: number;
  createTime?: string;
  create_time?: string;
  repairTime?: string;
  repair_time?: string;
  repairIndustry?: string;
  repair_industry?: string;
  repairPeople?: string;
  repair_people?: string;
  phone?: string;
  typeName?: string;
  repairType?: string;
  finishedSign?: string;
  pauseCount?: number;
  pause_count?: number;
  backhanderCount?: number;
  backhander_count?: number;
  workerType?: number;
  worker_type?: number;
  isShowPeo?: number;
  is_show_peo?: number;
  totalMoney?: number | string;
  total_money?: number | string;
  maintainMoney?: number | string;
  maintain_money?: number | string;
  endContent?: string;
  end_content?: string;
}

export interface EmergencyHistoryDisplay {
  typeText: string;
  showUrgent: boolean;
  timeText: string;
  statusText: string;
}

export const PAGE_SIZE = 20;

export const HISTORY_REFRESH_EVENTS = [
  'EMERGENCYHISTERY',
  'FROMEMERGENCY',
  'EMERGENCY_REPAIR',
] as const;

const toNumber = (value?: number | string | null) => Number(value ?? 0);

export const getRepairListId = (item: EmergencyHistoryItem) =>
  item.repairList || item.repair_id || item.repairId || '';

export const getMaintainType = (item: EmergencyHistoryItem) =>
  toNumber(item.maintainType ?? item.maintain_type);

export const getTache = (item: EmergencyHistoryItem) => toNumber(item.tache);

export const getState = (item: EmergencyHistoryItem) => toNumber(item.state);

export const getIsUrgent = (item: EmergencyHistoryItem) =>
  toNumber(item.isUrgent ?? item.is_urgent);

export const getHistoryTypeText = (item: EmergencyHistoryItem) => {
  const maintainType = getMaintainType(item);
  if (maintainType === 1) return '应急';
  if (maintainType === 2) return '室内报修';
  if (maintainType === 3) return '公共设施';
  return '';
};

export const getHistoryStatusText = (item: EmergencyHistoryItem) => {
  const tache = getTache(item);
  const state = getState(item);
  const finishedSign = item.finishedSign ?? '';

  if (tache === 1) {
    if (state === 1) return '待处理';
    if (state === 2) return '已分派';
  }

  if (tache === 2) {
    if (state === 2 || state === 6) return '已报价';
    if (state === 3 || state === 7) return '待支付';
    if (state === 4) return '处理中';
    if (state === 5) return '已暂停';
    return '已接单';
  }

  if (tache === 3) {
    if (state === 1) {
      if (!finishedSign) return '待确认完成';
      if (finishedSign === '0') return '未完成';
      if (finishedSign === '1') return '待评价';
    }
    if (state === 2) return '申诉中';
  }

  if (tache === 4) return '已完成';
  if (tache === 5) return '已取消';
  if (tache === 6) return '工单失败';
  return '';
};

export const getHistoryDisplay = (item: EmergencyHistoryItem): EmergencyHistoryDisplay => ({
  typeText: getHistoryTypeText(item),
  showUrgent: getIsUrgent(item) === 2,
  timeText: item.createTime || item.create_time || item.repairTime || item.repair_time || '',
  statusText: getHistoryStatusText(item),
});

export const getHistoryDetailRoute = (item: EmergencyHistoryItem) => {
  const tache = getTache(item);

  if (tache === 1 || tache === 5 || tache === 6) {
    return '/pages/mine/yingjihistory/emergencyPendingDetail';
  }

  if (tache === 2 || tache === 3) {
    return '/pages/mine/yingjihistory/emergencyProcessingDetail';
  }

  if (tache === 4) {
    return '/pages/mine/yingjihistory/emergencyCompleteDetail';
  }

  return '/pages/mine/yingjihistory/emergencyPendingDetail';
};
