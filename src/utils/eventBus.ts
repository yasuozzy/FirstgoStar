// src/utils/eventBus.ts
import mitt from 'mitt';

// 1. 定义一个类型，描述所有可能的事件名称及其对应的参数类型
type Events = {
  // 事件名: 传递的参数类型
  'update-user': { id: number; name: string };
  'refresh-address':{};
  'Addaddress':{};
  'chooseType':{};
  'refresh-XuanMin':[];
  'oaperson1':[];
  'oaperson2':[];
  'person1':[];
  'person2':[];
  'sign_netimg':[];
  'selecPerson':[];
  'refreshPerson-data':[];
  'chosework-data':{};
  'LoanCom':{};
  'toggle-sidebar': boolean;
  'refresh-data': void; 
  // 你可以继续在这里添加其他事件...
};

// 2. 创建 eventBus 实例，并传入定义好的 Events 类型
const eventBus = mitt<Events>();

// 3. 导出实例
export default eventBus;
