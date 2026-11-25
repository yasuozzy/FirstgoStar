export const PAGE_SIZE = 10;

export type RepairPageType = 'pending' | 'processing' | 'complete';

export type RepairActionKey =
  | 'urge'
  | 'cancel'
  | 'reissue'
  | 'appeal'
  | 'reject_price'
  | 'confirm_price'
  | 'finish_yes'
  | 'finish_no'
  | 'evaluate'
  | 'cancel_appeal';

export interface RepairHistoryItem {
  id?: string;
  repairList?: string;
  repairUId?: string;
  maintainType?: number | string;
  tache?: number | string;
  state?: number | string;
  isUrgent?: number | string;
  finishedSign?: string;
  createTime?: string;
  repairTime?: string;
}

export interface RepairWorkOrder {
  id?: string;
  workId?: string;
  repairList?: string;
  repairUId?: string;
  managerId?: string;
  repairNo?: string;
  repairPeople?: string;
  phone?: string;
  repairIndustry?: string;
  repairType?: string;
  reparirTypeId?: string;
  repairContent?: string;
  maintainType?: number | string;
  tache?: number | string;
  state?: number | string;
  finishedSign?: string;
  isUrgent?: number | string;
  visitTime?: string;
  totalMoney?: number | string;
  maintainMoney?: number | string;
  backhanderCount?: number | string;
  backhanderMoney?: number | string;
  voiceDuration?: string;
  userId?: string;
  userName?: string;
  workerPhone?: string;
  estmobile?: string;
  picimgs?: string[] | string;
  voices?: string[] | string;
  voiceDurations?: Array<string | number> | string;
}

export interface RepairEstimate {
  score?: number | string;
  commentsDetails?: string;
  commentsPicImgs?: string[] | string;
}

export interface RepairAppeal {
  createDate?: string;
  content?: string;
  pictures?: string[] | string;
}

export interface RepairDetailResult {
  workOrder?: RepairWorkOrder;
  workOrderEstimate?: RepairEstimate;
  workordersale?: RepairAppeal;
}

export interface RepairDetailResponse {
  result?: RepairDetailResult;
  resultCode?: number;
  success?: boolean;
  message?: string;
  resultMessage?: string;
}

export interface RepairButton {
  key: RepairActionKey;
  text: string;
  visible: boolean;
  disabled: boolean;
  primary: boolean;
  selected: boolean;
}

export interface RepairBaseConfig {
  typeText: string;
  typeIcon: string;
  showUrgent: boolean;
  priceText: string;
  stateText: string;
  showWorker: boolean;
  workerText: string;
  ownerNameLabel: string;
  ownerNameValue: string;
  ownerHouseLabel: string;
  ownerHouseValue: string;
  showPropertyPhone: boolean;
  propertyPhone: string;
  showVisitTime: boolean;
  visitTime: string;
  repairTypeLabel: string;
  repairTypeValue: string;
  repairContent: string;
}

export const REPAIR_ASSETS = {
  urgent: '/static/urgent.png',
  emergency: '/static/home/emergency.png',
  indoor: '/static/indoor.png',
  outdoor: '/static/outdoor.png',
  voice: '/static/adj.png',
};

const toNumber = (value: unknown) => Number(value ?? 0);

const toText = (value: unknown) => (value === undefined || value === null ? '' : String(value));

export const getMaintainType = (value?: RepairHistoryItem | RepairWorkOrder | null) =>
  toNumber(value?.maintainType);

export const getTache = (value?: RepairHistoryItem | RepairWorkOrder | null) =>
  toNumber(value?.tache);

export const getState = (value?: RepairHistoryItem | RepairWorkOrder | null) =>
  toNumber(value?.state);

export const getFinishedSign = (value?: RepairHistoryItem | RepairWorkOrder | null) =>
  toText(value?.finishedSign);

export const getRepairList = (
  value?: RepairHistoryItem | RepairWorkOrder | null,
) => value?.repairList || '';

export const normalizeStringArray = (value?: string[] | string | null): string[] => {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getHistoryTypeText = (item: RepairHistoryItem) => {
  switch (getMaintainType(item)) {
    case 1:
      return '应急';
    case 2:
      return '室内报修';
    case 3:
      return '公共设施';
    case 4:
      return '平台报修';
    default:
      return '';
  }
};

export const getHistoryStatusText = (item: RepairHistoryItem) => {
  const tache = getTache(item);
  const state = getState(item);
  const finishedSign = getFinishedSign(item);

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

export const getHistoryTimeText = (item: RepairHistoryItem) =>
  item.createTime || item.repairTime || '';

export const getHistoryDetailRoute = (item: RepairHistoryItem) => {
  const tache = getTache(item);

  if (tache === 1 || tache === 5 || tache === 6) {
    return '/pages/mine/gongchenggongdan/repairPendingDetail';
  }
  if (tache === 2 || tache === 3) {
    return '/pages/mine/gongchenggongdan/repairProcessingDetail';
  }
  if (tache === 4) {
    return '/pages/mine/gongchenggongdan/repairCompleteDetail';
  }
  return '';
};

export const getRepairTypeText = (maintainType: number) => {
  if (maintainType === 1) return '应急';
  if (maintainType === 2) return '室内报修';
  return '公共设施';
};

export const getRepairTypeIcon = (maintainType: number) => {
  if (maintainType === 1) return REPAIR_ASSETS.emergency;
  if (maintainType === 2) return REPAIR_ASSETS.indoor;
  return REPAIR_ASSETS.outdoor;
};

export const formatMoney = (value?: number | string) => {
  if (value === undefined || value === null || value === '') return '';
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue.toFixed(2) : String(value);
};

export const getPendingStatusText = (order: RepairWorkOrder) => {
  const tache = getTache(order);
  const state = getState(order);
  if (tache === 1 && state === 1) return '待处理';
  if (tache === 1 && state === 2) return '已派单';
  if (tache === 5) return '已取消';
  if (tache === 6) return '工单失败';
  return '';
};

export const getProcessingStatusText = (order: RepairWorkOrder) => {
  const tache = getTache(order);
  const state = getState(order);
  const finishedSign = getFinishedSign(order);

  if (tache === 2) {
    if (state === 2 || state === 6) return '已报价';
    if (state === 3 || state === 7) return '待支付';
    if (state === 1) return '已接单';
    if (state === 4) return '维修中';
    if (state === 5) return '已暂停';
  }

  if (tache === 3 && state === 1) {
    if (!finishedSign) return '待确认完成';
    if (finishedSign === '0') return '未完成';
    if (finishedSign === '1') return '待评价';
  }

  if (tache === 3 && state === 2) return '申诉中';
  return '';
};

export const getPriceText = (order: RepairWorkOrder, page: RepairPageType) => {
  const maintainType = getMaintainType(order);
  const tache = getTache(order);
  const state = getState(order);

  if (page === 'pending') {
    if (maintainType === 3 || maintainType === 4 || tache === 1) return '';
    return formatMoney(order.totalMoney);
  }

  if (page === 'processing' && tache === 2) {
    return formatMoney(Number(order.backhanderCount || 0) < 1 ? order.maintainMoney : order.backhanderMoney);
  }

  if (page === 'complete' || (page === 'processing' && tache === 3)) {
    return formatMoney(order.totalMoney);
  }

  return state ? formatMoney(order.totalMoney) : '';
};

const createButton = (
  key: RepairActionKey,
  text: string,
  options: Partial<Omit<RepairButton, 'key' | 'text' | 'visible'>> = {},
): RepairButton => ({
  key,
  text,
  visible: true,
  disabled: false,
  primary: false,
  selected: false,
  ...options,
});

export const getPendingButtons = (order: RepairWorkOrder): RepairButton[] => {
  const maintainType = getMaintainType(order);
  const tache = getTache(order);
  const state = getState(order);

  // Android only makes the bottom action container visible for emergency and indoor repair.
  if (maintainType !== 1 && maintainType !== 2) return [];

  if (tache === 1 && state === 1) {
    return [
      createButton('urge', '催一催', { primary: true }),
      createButton('cancel', '取消维修'),
    ];
  }

  if (tache === 5) {
    return [createButton('reissue', '重新发起', { primary: true })];
  }

  if (tache === 6) {
    const buttons = [createButton('reissue', '重新发起', { primary: true })];
    if (state === 3 || state === 4 || state === 6) {
      buttons.push(createButton('appeal', '申诉'));
    }
    return buttons;
  }

  return [];
};

export const getProcessingButtons = (order: RepairWorkOrder): RepairButton[] => {
  const tache = getTache(order);
  const state = getState(order);
  const finishedSign = getFinishedSign(order);

  if (tache === 2 && (state === 2 || state === 6)) {
    return [
      createButton('reject_price', '拒绝报价'),
      createButton('confirm_price', '确认报价', { primary: true }),
    ];
  }

  if (tache === 3 && state === 1) {
    if (!finishedSign) {
      return [
        createButton('finish_yes', '已完成', { primary: true }),
        createButton('finish_no', '未完成', { primary: true }),
      ];
    }

    if (finishedSign === '0') {
      return [
        createButton('finish_yes', '已完成', { primary: true }),
        createButton('finish_no', '未完成', { disabled: true }),
      ];
    }

    return [
      createButton('evaluate', '评价', { primary: true }),
      createButton('appeal', '申诉', { primary: true }),
    ];
  }

  if (tache === 3 && state === 2) {
    return [createButton('cancel_appeal', '撤销申诉', { primary: true })];
  }

  // Android hides bottomIndoor for tache=2,state=3/7, so no payment buttons are rendered there.
  return [];
};

export const getBaseConfig = (
  order: RepairWorkOrder,
  page: RepairPageType,
  stateText: string,
): RepairBaseConfig => {
  const maintainType = getMaintainType(order);
  const base: RepairBaseConfig = {
    typeText: getRepairTypeText(maintainType),
    typeIcon: getRepairTypeIcon(maintainType),
    showUrgent: toNumber(order.isUrgent) === 2,
    priceText: getPriceText(order, page),
    stateText,
    showWorker: page !== 'pending',
    workerText: `${order.userName || ''}${order.workerPhone || ''}`,
    ownerNameLabel: '报修人电话：',
    ownerNameValue: order.phone || '',
    ownerHouseLabel: '所在管理处：',
    ownerHouseValue: order.repairIndustry || '',
    showPropertyPhone: true,
    propertyPhone: order.estmobile || '',
    showVisitTime: true,
    visitTime: order.visitTime || '',
    repairTypeLabel: '公共设施:',
    repairTypeValue: order.repairType || '',
    repairContent: order.repairContent || '',
  };

  if (page === 'pending') {
    base.showWorker = false;
    base.showPropertyPhone = maintainType !== 4;
    base.showVisitTime = maintainType === 2 || maintainType === 4;
    base.repairTypeLabel =
      maintainType === 1
        ? '应急类型：'
        : maintainType === 2 || maintainType === 3
          ? '报修类型：'
          : '公共设施:';
    base.ownerHouseLabel = maintainType === 2 ? '报修房产：' : '所在房产：';
  }

  if (page === 'processing') {
    // Android keeps this page's default public-facility presentation and only
    // hides the property phone for maintainType=4.
    base.typeText = '公共设施';
    base.typeIcon = REPAIR_ASSETS.outdoor;
    base.ownerNameLabel = '所在管理处：';
    base.ownerNameValue = order.repairIndustry || '';
    base.ownerHouseLabel = '报修人电话：';
    base.ownerHouseValue = order.phone || '';
    base.showPropertyPhone = maintainType !== 4;
  }

  if (page === 'complete') {
    // The maintainType-specific block in Android is commented out on this page.
    base.typeText = '公共设施';
    base.typeIcon = REPAIR_ASSETS.outdoor;
    base.ownerNameLabel = '所在管理处：';
    base.ownerNameValue = order.repairIndustry || '';
    base.ownerHouseLabel = '报修人电话：';
    base.ownerHouseValue = order.phone || '';
    base.showPropertyPhone = maintainType !== 4;
    base.repairTypeLabel = '公共设施：';
  }

  return base;
};
