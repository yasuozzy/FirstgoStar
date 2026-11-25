import { getMaintainTypeAsset } from './workerOrderDetailAssets';

export interface WorkerOrderDetail {
  id?: string;
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
  isUrgent?: number;
  visitTime?: string;
  takeTime?: string;
  finishTime?: string;
  placeTime?: string;
  cancelTime?: string;
  endTime?: string;
  totalMoney?: number | string;
  maintainTypeMoney?: string;
  backhanderCount?: number;
  pauseCount?: number;
  orderRecordId?: string;
  userId?: string;
  userName?: string;
  workerPhone?: string;
  worker_type?: number;
  is_eva?: number;
  cut_amt?: string;
  cut_content?: string;
  picimgs?: string[];
  voices?: string[];
  voiceDurations?: Array<string | number>;
}

export interface WorkerOrderEstimate {
  score?: number;
  commentsDetails?: string;
  commentsPicImgs?: string[];
}

export interface WorkerOrderSale {
  createDate?: string;
  content?: string;
  pictures?: string[];
}

export interface WorkerOrderExtras {
  show?: boolean;
  frommine?: boolean;
  fromAll?: boolean;
  fromWait?: boolean;
  fromDoing?: boolean;
  fromCom?: boolean;
  is_show_peo?: number;
}

export type DetailActionKey =
  | 'grab'
  | 'accept'
  | 'refuse'
  | 'complete'
  | 'stop'
  | 'pause'
  | 'continue'
  | 'quote'
  | 'requote'
  | 'rollback';

export interface DetailButton {
  key: DetailActionKey;
  text: string;
  visible: boolean;
  disabled?: boolean;
  primary?: boolean;
}

export interface DetailBaseConfig {
  typeText: string;
  typeIcon: string;
  showUrgent: boolean;
  priceText: string;
  stateText: string;
  timeLabel?: string;
  timeValue?: string;
  ownerHouseLabel: string;
  ownerHouseValue: string;
  showOwner: boolean;
  ownerLabel: string;
  ownerValue: string;
  showVisitTime: boolean;
  visitTime?: string;
  repairTypeLabel: string;
  repairTypeValue: string;
  repairContent: string;
}

export const getMaintainTypeText = (maintainType?: number) => {
  if (maintainType === 1) return '应急';
  if (maintainType === 2) return '室内报修';
  return '公共设施';
};

export const getRepairTypeLabel = (maintainType?: number, completePage = false) => {
  if (maintainType === 1) return '应急类型：';
  if (maintainType === 3 && completePage) return '公共设施：';
  return '报修类型：';
};

export const getOwnerHouseLabel = (maintainType?: number) => {
  if (maintainType === 2) return '报修房产：';
  if (maintainType === 4) return '所在管理处：';
  return '所在房产：';
};

export const getBaseDetailConfig = (
  order: WorkerOrderDetail,
  extras: WorkerOrderExtras,
  options: { page: 'wait' | 'doing' | 'complete'; statusText?: string; timeLabel?: string; timeValue?: string },
): DetailBaseConfig => {
  const maintainType = Number(order.maintainType || 0);
  const isDoingPage = options.page === 'doing';
  const isCompletePage = options.page === 'complete';
  const state = Number(order.state || 0);
  let priceText = '';

  if (isDoingPage) {
    priceText = state < 4 ? '' : String(order.totalMoney ?? '');
  } else if (isCompletePage) {
    priceText = maintainType === 3 ? '' : String(order.totalMoney ?? '');
  }

  return {
    typeText: getMaintainTypeText(maintainType),
    typeIcon: getMaintainTypeAsset(maintainType),
    showUrgent: order.isUrgent === 2,
    priceText,
    stateText: options.statusText || '',
    timeLabel: options.timeLabel,
    timeValue: options.timeValue,
    ownerHouseLabel: getOwnerHouseLabel(maintainType),
    ownerHouseValue: order.repairIndustry || '',
    showOwner: options.page !== 'wait' && !(isDoingPage && state === 1 && extras.is_show_peo === 0),
    ownerLabel: maintainType === 4 ? '报修人：' : '报修业主：',
    ownerValue: `${order.repairPeople || ''}${order.phone || ''}`,
    showVisitTime: maintainType === 2,
    visitTime: order.visitTime,
    repairTypeLabel: getRepairTypeLabel(maintainType, isCompletePage),
    repairTypeValue: order.repairType || '',
    repairContent: order.repairContent || '',
  };
};

const button = (key: DetailActionKey, text: string, primary = false, disabled = false): DetailButton => ({
  key,
  text,
  visible: true,
  primary,
  disabled,
});

export const getWaitButtons = (order: WorkerOrderDetail, extras: WorkerOrderExtras): DetailButton[] => {
  if (extras.frommine && order.worker_type === 1) return [];
  if (order.state === 1) return [button('grab', '抢单', true)];
  return [button('accept', '接单', true), button('refuse', '拒绝')];
};

export const getDoingStatusText = () => '工作中';

export const getDoingButtons = (order: WorkerOrderDetail, extras: WorkerOrderExtras): DetailButton[] => {
  if (extras.frommine && order.worker_type === 1) return [];
  const state = Number(order.state || 0);
  const maintainType = Number(order.maintainType || 0);
  const backhanderCount = Number(order.backhanderCount || 0);
  const pauseCount = Number(order.pauseCount || 0);

  if (state === 1) {
    return [
      button('complete', '完成'),
      button('stop', '停止'),
      button('pause', '暂停', false, true),
      button('quote', '报价', true),
    ];
  }
  if (state === 4) {
    const buttons: DetailButton[] = [];
    if (maintainType !== 3) buttons.push(button('requote', '追加', false, backhanderCount !== 0));
    buttons.push(button('stop', '停止'));
    buttons.push(button('pause', '暂停', false, pauseCount !== 0));
    buttons.push(button('complete', '完成', true));
    return buttons;
  }
  if (state === 5) {
    return [button('stop', '停止'), button('continue', '继续'), button('complete', '完成', true, true)];
  }
  return [button('stop', '停止', false, true), button('pause', '暂停', false, true), button('complete', '完成', true, true)];
};

export const getCompleteStatus = (order: WorkerOrderDetail) => {
  if (order.tache === 3) return order.state === 2 ? '申诉中' : '待评价';
  if (order.tache === 4) return '已完成';
  if (order.tache === 5) return '已取消';
  if (order.tache === 6) return '工单失败';
  return '';
};

export const getCompleteTime = (order: WorkerOrderDetail) => {
  if (order.tache === 3) {
    return {
      label: '完成时间：',
      value: order.maintainType === 3 ? order.placeTime : order.finishTime,
    };
  }
  if (order.tache === 4) {
    return {
      label: '完成时间：',
      value: order.maintainType === 3 ? order.placeTime : order.finishTime,
    };
  }
  if (order.tache === 5) return { label: '取消时间：', value: order.cancelTime };
  if (order.tache === 6) return { label: '失败时间：', value: order.endTime };
  return { label: '', value: '' };
};

export const getCompleteButtons = (order: WorkerOrderDetail, extras: WorkerOrderExtras): DetailButton[] => {
  if (extras.frommine && order.worker_type === 1) return [];
  if (order.tache === 6 && order.state === 6) return [button('rollback', '重新发起', true)];
  return [];
};

export const toStars = (score?: number) => {
  const value = Math.max(0, Math.min(5, Math.round(Number(score || 0))));
  return `${'★'.repeat(value)}${'☆'.repeat(5 - value)}`;
};

