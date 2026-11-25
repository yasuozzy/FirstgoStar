# yingjihistory 迁移说明

## 1. 这组页面做了什么

这一组页面是把 Android 的应急工单历史与详情能力迁移到 uni-app Vue3：

- `emergencyHistoryList.vue`：历史列表页
- `emergencyPendingDetail.vue`：待处理/待发起类详情
- `emergencyProcessingDetail.vue`：处理中/待支付/申诉中详情
- `emergencyCompleteDetail.vue`：已完成详情

迁移目标是保留 Android 业务规则，不逐行翻译 Java，而是用现有 uni-app 技术栈做配置化重构。

## 2. 文件职责

### 页面文件

- `emergencyHistoryList.vue`
  - 历史列表入口
  - 监听刷新事件
  - 点击条目后先拉详情，再按 `tache` 跳转到对应详情页

- `emergencyPendingDetail.vue`
  - 展示待处理、已取消、工单失败等状态
  - 提供催单、取消维修、重新发起、申诉等动作

- `emergencyProcessingDetail.vue`
  - 展示已接单、已报价、待支付、维修中、已暂停、待确认完成、申诉中等状态
  - 提供拒绝报价、支付、完成确认、评价、申诉、撤销申诉等动作

- `emergencyCompleteDetail.vue`
  - 展示已完成详情
  - 展示评价信息与申诉信息

### `components/`

- `EmergencyDetailBase.vue`
  - 详情头部基础信息
  - 工单类型、状态、维修人、业主、房产、报修类型、描述

- `EmergencyDetailRow.vue`
  - 单行图文展示

- `EmergencyDetailMediaGrid.vue`
  - 图片网格
  - 点击图片调用 `uni.previewImage`

- `EmergencyDetailVoiceList.vue`
  - 语音列表
  - 使用 `uni.createInnerAudioContext` 播放

- `EmergencyDetailActions.vue`
  - 底部按钮栏

- `EmergencyAppealInfo.vue`
  - 申诉信息展示

- `EmergencyEvaluateInfo.vue`
  - 评价信息展示

- `EmergencyHistoryItem.vue`
  - 历史列表单条展示

### `composables/`

- `useEmergencyDetail.ts`
  - 解析页面参数
  - 请求详情接口
  - 统一输出 `workOrder / workOrderEstimate / workordersale`

- `useEmergencyDetailActions.ts`
  - 集中处理按钮行为
  - 封装接口调用、弹窗、跳转、toast

- `useEmergencyHistoryList.ts`
  - 历史列表加载

- `useEmergencyHistoryActions.ts`
  - 历史列表点击跳转前的详情预取

### `config/`

- `emergencyDetailState.ts`
  - 详情状态机与配置
  - 状态文案、按钮显示、价格显示、基础展示配置

- `historyState.ts`
  - 历史列表状态文案与详情页路由映射

## 3. 怎么使用

### 历史列表

入口页是历史列表。点击一条记录后会：

1. 先按 `repairList` 请求详情
2. 读取返回里的 `tache`
3. 自动进入对应详情页

### 详情页参数

详情页统一接收这些参数：

- `repair_id`
- `repairList`
- `repairId`
- `fromGongdanJiesuan`

最常用的是 `repair_id`。只要能定位到 `repairList` 就能拉详情。

### 外部页面缺失时

目前未迁移的外部页面不再跳转：

- 申诉页
- 评价页
- 重新发起后的后续页

统一改为 `uni.showToast` 提示。

## 4. 状态和配置怎么改

核心在 `config/emergencyDetailState.ts`。

### 如果要改状态文案

改这些函数：

- `getPendingStatusText`
- `getProcessingStatusText`
- `getCompleteStatusText`

### 如果要改按钮显示规则

改这些函数：

- `getPendingButtons`
- `getProcessingButtons`

### 如果要改头部展示规则

改这些函数：

- `getBaseConfig`
- `getRepairTypeLabel`
- `getOwnerHouseLabel`
- `getPriceText`

### 如果要改支付逻辑

改 `useEmergencyDetailActions.ts`：

- `rejectPrice`
- `payOrder`

### 如果要改刷新事件

当前历史刷新事件仍沿用：

- `EMERGENCYHISTERY`
- `FROMEMERGENCY`
- `EMERGENCY_REPAIR`

如果新增或修改事件名，要同步列表页监听。

## 5. 当前实现依赖

只使用了项目里已有能力：

- Vue3 `script setup`
- uni-app 页面与生命周期
- uview-plus 的 `u-navbar`、`u-icon`
- 项目现有 `@/api/mine`
- 项目现有 `@/utils/storage`
- `uni.showToast`、`uni.showModal`、`uni.previewImage`、`uni.makePhoneCall`

没有新增 npm 依赖，也没有引入新的状态管理框架。

## 6. 后续如果继续扩展，建议怎么改

### 新增一种工单状态

优先顺序：

1. 先在 `emergencyDetailState.ts` 增加状态文案
2. 再补按钮配置
3. 最后调整页面是否需要新的区域组件

### 新增一个按钮行为

优先做法：

1. 在 `EmergencyDetailActionKey` 增加 key
2. 在 `getPendingButtons` 或 `getProcessingButtons` 中配置显示条件
3. 在 `useEmergencyDetailActions.ts` 中实现行为

### 新增一个展示模块

比如新增“附件”“处理记录”“备注”等模块：

1. 新建独立组件
2. 由页面按状态决定是否挂载
3. 尽量不要把复杂判断塞进模板里

### 如果要把某个 toast 页面补齐

当前做法是先提示，不制造假页面。
后续可以在对应位置替换为真实页面跳转，不需要改动状态机。

## 7. 维护注意点

- Android 侧的业务判断已经尽量抽成配置和函数
- 页面里尽量只保留“取数据 + 组合组件 + 绑定动作”
- 如果接口字段名变化，优先改 `EmergencyWorkOrder` 类型和 `useEmergencyDetail.ts`
- 如果状态规则变化，优先改 `config/emergencyDetailState.ts`
- 如果按钮文案或顺序变化，优先改配置函数，不要直接在模板里硬写

## 8. 备注

本次迁移保留了 Android 的核心业务行为：

- 状态分流
- 按钮控制
- 弹窗确认
- 接口调用
- 刷新事件

未迁移的外部页面统一以 toast 代替。
