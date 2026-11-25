// ================= 1. 环境与全局常量 =================

//正式地址
// export const BaseURL = 'http://wuye.qyp2c.com/app/'
// export const BaseImgURL  = 'http://www.qyp2c.com/estate/'
// 测试地址 (正式地址请自行切换)
export const BaseURL = 'http://127.0.0.1:9004/app/';
export const BaseImgURL = 'http://127.0.0.1:9004/estate/';
export const uploadimg = 'http://127.0.0.1:9004/app/Announce/addUploadIms';

export const SDKAppID = 1600138376; // 腾讯云 SDKAppID
export const usersig = "eJwtjc0KgkAYRd9l1qHj-H0zQhsDEZIgMwhxM*lkk1iiEkL07pm6vOfcy-2gND45b9MhHxEHo82cbWmeg73ZGUsFiioMilFgQIxiBRh*VVRSTaX01k1f1rptbYl8T2DsTRbEYszY2s5MnHNOMMYLHWzzZwACOBFi7fa2mi6TjATxflfgA9e5m9YVf-S9HsMo47kbBfe0OarXJWCJjMLzFn1-2sc2vA__";


// ================= 2. Storage Keys 字典 =================

const STORAGE_PREFIX = "uniapp-vue3-uview";

export const storageKeys = {
  token: `${STORAGE_PREFIX}:token`,
  loginType: `${STORAGE_PREFIX}:loginType`,
  userId: `${STORAGE_PREFIX}:userId`,
  realType: `${STORAGE_PREFIX}:realType`,
  platId: `${STORAGE_PREFIX}:platId`,
  hostNo: `${STORAGE_PREFIX}:hostNo`,
  cstType: `${STORAGE_PREFIX}:cstType`,
  avatar: `${STORAGE_PREFIX}:avatar`,
  nickName: `${STORAGE_PREFIX}:nickName`,
  realName: `${STORAGE_PREFIX}:realName`,
  phone: `${STORAGE_PREFIX}:phone`,
  sex: `${STORAGE_PREFIX}:sex`,
  birthday: `${STORAGE_PREFIX}:birthday`,
  finLoginName: `${STORAGE_PREFIX}:finLoginName`,
  finSysSessionId: `${STORAGE_PREFIX}:finSysSessionId`,
  bookId: `${STORAGE_PREFIX}:bookId`,
  financialCompanyName: `${STORAGE_PREFIX}:financialCompanyName`,
  usersig: `${STORAGE_PREFIX}:usersig`,
  deliveryId: `${STORAGE_PREFIX}:deliveryId`,
  deliveryName: `${STORAGE_PREFIX}:deliveryName`,
  isWhetherDelivery: `${STORAGE_PREFIX}:isWhetherDelivery`,
  deliveryManagerId: `${STORAGE_PREFIX}:deliveryManagerId`,
  deliveryTakeOrder: `${STORAGE_PREFIX}:deliveryTakeOrder`,
  deliveryAuditStatus: `${STORAGE_PREFIX}:deliveryAuditStatus`,
  temporayId: `${STORAGE_PREFIX}:temporayId`,
  temporayName: `${STORAGE_PREFIX}:temporayName`,
  isWhetherTemporay: `${STORAGE_PREFIX}:isWhetherTemporay`,
  temporayManagerId: `${STORAGE_PREFIX}:temporayManagerId`,
  temporayTakeOrder: `${STORAGE_PREFIX}:temporayTakeOrder`,
  temporayAuditStatus: `${STORAGE_PREFIX}:temporayAuditStatus`,
  shopOwnerId: `${STORAGE_PREFIX}:shopOwnerId`,
  address: `${STORAGE_PREFIX}:address`,
  bldgid: `${STORAGE_PREFIX}:bldgid`,
  bldgname: `${STORAGE_PREFIX}:bldgname`,
  hcpid: `${STORAGE_PREFIX}:hcpid`,
  hseid: `${STORAGE_PREFIX}:hseid`,
  hsename: `${STORAGE_PREFIX}:hsename`,
  hsenum: `${STORAGE_PREFIX}:hsenum`,
  mainhouse: `${STORAGE_PREFIX}:mainhouse`,
  manid: `${STORAGE_PREFIX}:manid`,
  manname: `${STORAGE_PREFIX}:manname`,
  type: `${STORAGE_PREFIX}:type`,
  companyName: `${STORAGE_PREFIX}:companyName`,
  companyImage: `${STORAGE_PREFIX}:companyImage`,
  estId: `${STORAGE_PREFIX}:estId`,
  deptName: `${STORAGE_PREFIX}:deptName`,
  deptId: `${STORAGE_PREFIX}:deptId`,
  sendList: `${STORAGE_PREFIX}:sendList`,
  identityList: `${STORAGE_PREFIX}:identityList`,
  userName: `${STORAGE_PREFIX}:userName`,
  balance: `${STORAGE_PREFIX}:balance`,
  totalScore: `${STORAGE_PREFIX}:totalScore`,
  memberScore: `${STORAGE_PREFIX}:memberScore`,
  carid: `${STORAGE_PREFIX}:carid`,
} as const;


// ================= 3. 基础 Storage 泛型封装 =================

export function getStorage<T>(key: string, fallback: T): T {
  try {
    const value = uni.getStorageSync(key);
    return value === "" || value === undefined || value === null ? fallback : (value as T);
  } catch {
    return fallback;
  }
}

export function setStorage(key: string, value: unknown) {
  uni.setStorageSync(key, value);
}

export function removeStorage(key: string) {
  uni.removeStorageSync(key);
}


// ================= 4. Token 快捷方法 =================

export function getToken(): string | null {
  return getStorage<string | null>(storageKeys.token, null);
}

export function setToken(token: string) {
  setStorage(storageKeys.token, token);
}

export function removeToken() {
  removeStorage(storageKeys.token); // 修复了原代码中写死 "token" 的 Bug
}


// ================= 5. 兼容老代码的 storage 对象 (核心黑科技) =================

// 1. 定义默认回退值 (处理原代码中 avatar 和 list 的特殊默认值)
const fallbackMap: Record<string, any> = {
  avatar: '/static/service/myIconImage.png',
  sendList: [],
  identityList: [],
};

// 2. 利用 TS 模板字面量类型，自动推导 saveXxx, getXxx, removeXxx 的类型
type Capitalize<S extends string> = S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S;
type StorageMethods = {
  [K in keyof typeof storageKeys as `save${Capitalize<K>}`]: (data: any) => void;
} & {
  [K in keyof typeof storageKeys as `get${Capitalize<K>}`]: () => any;
} & {
  [K in keyof typeof storageKeys as `remove${Capitalize<K>}`]: () => void;
} & {
  // 兼容原代码中不规则的命名
  getUserName: () => string | null;
  setUserName: (data: string) => void;
};

// 3. 使用 Proxy 动态拦截，避免手写 800 行重复代码
export const storage = new Proxy({} as StorageMethods, {
  get(_target, prop: string) {
    // 处理不规则命名
    if (prop === 'getUserName') return () => getStorage(storageKeys.userName, null);
    if (prop === 'setUserName') return (data: string) => setStorage(storageKeys.userName, data);

    // 解析方法名：saveToken -> ['save', 'token']
    const match = prop.match(/^(save|get|remove)([A-Z].*)$/);
    if (!match) return undefined;

    const [, action, upperKey] = match;
    const key = (upperKey.charAt(0).toLowerCase() + upperKey.slice(1)) as keyof typeof storageKeys;
    const storageKey = storageKeys[key];

    if (!storageKey) return undefined;

    // 动态返回对应的方法
    if (action === 'save') return (data: any) => setStorage(storageKey, data);
    if (action === 'get') return () => getStorage(storageKey, fallbackMap[key] ?? null);
    if (action === 'remove') return () => removeStorage(storageKey);

    return undefined;
  }
});


// ================= 6. 文件上传方法 =================

interface UploadParameter {
  [key: string]: any;
}

/**
 * 批量上传文件
 * @param parameter 额外表单参数
 * @param signpics 文件路径数组
 * @param authorToken 用户Token (可选，不传则自动获取本地Token)
 */
export function uploadMultipleFiles(
  parameter: UploadParameter,
  signpics: string[],
  authorToken?: string
): Promise<any[]> {
  // 修复了原代码中 App.getToken() 未定义的 Bug
  const token = authorToken || getToken();

  const uploadPromises = signpics.map((filePath) => {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: uploadimg,
        filePath: filePath,
        name: "multipartFile",
        formData: {
          ...parameter,
          authorToken: token
        },
        success: (res) => {
          if (res.statusCode === 200) {
            try {
              resolve(JSON.parse(res.data));
            } catch (e) {
              reject(new Error('返回数据 JSON 解析失败'));
            }
          } else {
            reject(new Error('上传失败，状态码: ' + res.statusCode));
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  });

  return Promise.all(uploadPromises);
}
