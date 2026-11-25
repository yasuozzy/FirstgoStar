export type WorkOrderSource = 'grab' | 'normal';

export interface WorkOrderTab {
  id: number;
  title: string;
  repairState: string;
  source: WorkOrderSource;
}

export const WORK_ORDER_TABS: WorkOrderTab[] = [
  { id: 1, title: '待接单', repairState: '', source: 'grab' },
  { id: 2, title: '待处理', repairState: '1', source: 'normal' },
  { id: 3, title: '工作中', repairState: '2', source: 'normal' },
  { id: 4, title: '已完成', repairState: '4', source: 'normal' },
  { id: 5, title: '已停止', repairState: '5', source: 'normal' },
];

