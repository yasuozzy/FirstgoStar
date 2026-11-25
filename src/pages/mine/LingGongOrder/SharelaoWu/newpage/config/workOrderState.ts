export interface WorkOrderItem {
  repair_id?: string;
  repairList?: string;
  repairUserId?: string;
  repair_industry?: string;
  tache?: number;
  repair_time?: string;
  visit_time?: string;
  user_name?: string;
  typeName?: string;
  pause_count?: number;
  maintain_type?: number;
  repair_state?: number;
  score?: number;
  backhander_count?: number;
  user_id?: string;
  phone?: string;
  id?: string;
  repair_people?: string;
  total_money?: number | string;
  state?: number;
  worker_type?: number;
  is_show_peo?: number;
  end_content?: string;
}

const toNumber = (value: unknown, fallback = 0) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

export const normalizeWorkOrderItem = (item: WorkOrderItem): WorkOrderItem => ({
  ...item,
  tache: toNumber(item.tache),
  state: toNumber(item.state),
  maintain_type: toNumber(item.maintain_type),
  repair_state: toNumber(item.repair_state),
  worker_type: toNumber(item.worker_type),
  is_show_peo: toNumber(item.is_show_peo),
  pause_count: toNumber(item.pause_count),
  backhander_count: toNumber(item.backhander_count),
  score: toNumber(item.score),
});

export type WorkOrderAction =
  | 'grab'
  | 'rollback'
  | 'refuse'
  | 'accept'
  | 'stop'
  | 'pause'
  | 'continue'
  | 'quote'
  | 'requote'
  | 'complete';

export type WorkOrderDialogType = 'quote' | 'requote' | 'pause' | 'stop' | '';

export interface WorkOrderRow {
  label: string;
  value: string;
  visible?: boolean;
}

export interface WorkOrderButton {
  key: WorkOrderAction;
  text: string;
  visible: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface WorkOrderCardConfig {
  statusText: string;
  statusMuted?: boolean;
  showOwner: boolean;
  ownerLabel: string;
  ownerValue: string;
  rows: WorkOrderRow[];
  showRating: boolean;
  ratingValue: number;
  showButtons: boolean;
  buttons: WorkOrderButton[];
}

const emptyButton = (key: WorkOrderAction, text: string): WorkOrderButton => ({
  key,
  text,
  visible: false,
  disabled: false,
  selected: false,
});

const disabled = (button: WorkOrderButton): WorkOrderButton => ({
  ...button,
  disabled: true,
  selected: true,
});

export const getMaintainTypeLabel = (maintainType?: number) => {
  if (maintainType === 1) return '应急类型：';
  if (maintainType === 2) return '报修项目：';
  if (maintainType === 3) return '公共设施：';
  if (maintainType === 4) return '公共设施：';
  return '报修项目：';
};

const baseConfig = (item: WorkOrderItem): WorkOrderCardConfig => ({
  statusText: '',
  showOwner: true,
  ownerLabel: item.maintain_type === 4 ? '报修人：' : '报修业主：',
  ownerValue: `${item.repair_people || ''}${item.phone || ''}`,
  rows: [
    {
      label: item.maintain_type === 2 ? '上门时间：' : '创建时间：',
      value: item.maintain_type === 2 ? item.visit_time || '' : item.repair_time || '',
    },
    { label: getMaintainTypeLabel(item.maintain_type), value: item.typeName || '' },
  ],
  showRating: false,
  ratingValue: Number(item.score || 0),
  showButtons: true,
  buttons: [],
});

const applyWorkerType = (item: WorkOrderItem, config: WorkOrderCardConfig) => {
  if (toNumber(item.worker_type) === 1) {
    return {
      ...config,
      showButtons: false,
      buttons: [],
    };
  }
  return config;
};

export const getWorkOrderCardConfig = (item: WorkOrderItem): WorkOrderCardConfig => {
  const config = baseConfig(item);
  const tache = Number(item.tache || 0);
  const state = Number(item.state || 0);
  const maintainType = Number(item.maintain_type || 0);
  const pauseCount = Number(item.pause_count || 0);
  const backhanderCount = Number(item.backhander_count || 0);

  if (tache === 1) {
    config.showOwner = false;
    if (state === 1) {
      config.statusText = '';
      config.ownerLabel = '报修人电话';
      config.ownerValue = item.phone || '';
      config.rows = [
        { label: '报修时间', value: item.repair_time || '' },
        { label: '报修项目', value: item.typeName || '' },
      ];
      config.buttons = [{ ...emptyButton('grab', '抢单'), visible: true }];
    }
    if (state === 2) {
      config.statusText = '待处理';
      if (maintainType === 4) {
        config.showOwner = true;
      }
      config.rows = [
        { label: '创建时间：', value: item.repair_time || '' },
        { label: getMaintainTypeLabel(maintainType), value: item.typeName || '' },
      ];
      config.buttons = [
        { ...emptyButton('refuse', '拒绝'), visible: true },
        { ...emptyButton('accept', '接单'), visible: true },
      ];
    }
    return applyWorkerType(item, config);
  }

  if (tache === 2) {
    config.rows = [
      { label: '创建时间：', value: item.repair_time || '' },
      { label: '报修价格：', value: `¥${item.total_money ?? 0}` },
    ];
    const stop = { ...emptyButton('stop', '停止'), visible: true };
    const pause = { ...emptyButton('pause', '暂停'), visible: true };
    const complete = { ...emptyButton('complete', '完成'), visible: true };

    if (state > 3) {
      const requote = {
        ...emptyButton('requote', '追加'),
        visible: maintainType !== 3,
        disabled: backhanderCount !== 0,
        selected: backhanderCount !== 0,
      };
      const pauseButton = {
        ...pause,
        disabled: pauseCount !== 0,
        selected: pauseCount !== 0,
      };
      config.buttons = [requote, stop, pauseButton, complete];
    }

    if (state === 1) {
      config.statusText = '已接单';
      config.showOwner = item.is_show_peo !== 0;
      config.buttons = [
        { ...emptyButton('complete', '完成'), visible: true },
        stop,
        disabled({ ...pause, visible: true }),
        { ...emptyButton('quote', '报价'), visible: true },
      ];
    } else if (state === 2) {
      config.statusText = '已报价';
      config.buttons = [disabled(stop), disabled(pause), disabled(complete)];
    } else if (state === 3) {
      config.statusText = '待支付';
      config.buttons = [disabled(stop), disabled(pause), disabled(complete)];
    } else if (state === 4) {
      config.statusText = '维修中';
    } else if (state === 5) {
      config.statusText = '已暂停';
      config.buttons = [
        stop,
        { ...emptyButton('continue', '继续'), visible: true },
        disabled(complete),
      ];
    } else if (state === 6) {
      config.statusText = '已追价';
      config.buttons = [disabled(stop), disabled(pause), disabled(complete)];
    } else if (state === 7) {
      config.statusText = '待支付';
      config.buttons = [disabled(stop), disabled(pause), disabled(complete)];
    }
    return applyWorkerType(item, config);
  }

  if (tache === 3) {
    config.statusText = state === 2 ? '申诉中' : '待评价';
    config.rows = [
      { label: '创建时间：', value: item.repair_time || '' },
      { label: '业主评价：', value: '暂无' },
    ];
    config.showButtons = false;
    return applyWorkerType(item, config);
  }

  if (tache === 4) {
    config.statusText = '已完成';
    config.statusMuted = true;
    config.rows = [{ label: '创建时间：', value: item.repair_time || '' }];
    if (maintainType === 3) {
      config.rows.push({ label: '综合评价：', value: '暂无' });
    } else {
      config.showRating = true;
    }
    config.showButtons = false;
    return applyWorkerType(item, config);
  }

  if (tache === 5) {
    config.statusText = '已取消';
    config.rows = [
      { label: getMaintainTypeLabel(maintainType), value: item.typeName || '' },
      { label: '取消原因：', value: '暂无' },
    ];
    config.showButtons = false;
    return applyWorkerType(item, config);
  }

  if (tache === 6) {
    config.statusText = '工单失败';
    config.rows = [
      { label: getMaintainTypeLabel(maintainType), value: item.typeName || '' },
      { label: '失败原因：', value: item.end_content || '暂无' },
    ];
    config.showButtons = state === 6;
    config.buttons = state === 6 ? [{ ...emptyButton('rollback', '重新发起'), visible: true }] : [];
    return applyWorkerType(item, config);
  }

  return applyWorkerType(item, config);
};
