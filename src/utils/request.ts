// ================= 环境配置 =================
// 正式环境
// const SERVER_URL = "http://wuye.qyp2c.com/app/";
// const OA_SERVER_URL = "http://wuye.qyp2c.com:9006/app/";

// 测试环境
const SERVER_URL = "http://127.0.0.1:9004/app/";
const OA_SERVER_URL = "http://127.0.0.1:9006/app/";

// ================= 类型定义 =================
export type RequestMethod = NonNullable<UniApp.RequestOptions["method"]>;

export interface RequestConfig<T = unknown> extends Omit<UniApp.RequestOptions, "url" | "method" | "data" | "header" | "success" | "fail" | "complete"> {
  url: string;
  method?: RequestMethod;
  data?: T;
  header?: Record<string, string>;
  /** 是否请求 OA 服务器 (替代原代码的 type.includes("OA")) */
  isOA?: boolean;
  /** 是否显示全局 Loading，默认 true */
  loading?: boolean;
  /** 是否自动弹出错误提示，默认 true */
  showError?: boolean;
}

/** 后端 FAP 标准返回结构 */
export interface FapResponse<T = unknown> {
  FAPStatus: number;
  FAPErrorMessage?: string;
  [key: string]: any; // 允许其他业务字段
}

// ================= 辅助工具函数 =================

/** 全局 Loading 并发控制计数器 */
let ajaxTimes = 0;

function showGlobalLoading() {
  ajaxTimes++;
  if (ajaxTimes === 1) {
    uni.showLoading({ title: "加载中", mask: true });
  }
}

function hideGlobalLoading() {
  ajaxTimes--;
  if (ajaxTimes <= 0) {
    ajaxTimes = 0;
    uni.hideLoading();
  }
}

/** 将对象序列化为 application/x-www-form-urlencoded 格式 */
function serializeFormData(data: Record<string, any>): string {
  if (!data) return "";
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? "")}`)
    .join("&");
}

// ================= 核心请求函数 =================

export function request<T = any>(config: RequestConfig): Promise<T> {
  const {
    url,
    method = "GET",
    data,
    header = {},
    isOA = false,
    loading = true,
    showError = true,
    ...rest
  } = config;

  // 1. 获取 Token
  const token = uni.getStorageSync("App-Token") || "";

  // 2. 处理 URL (利用 UniApp 条件编译)
  let finalUrl = url;

  // #ifdef H5
  // H5 环境下，通常走 Vite 代理，直接使用传入的 url (或根据业务需要拼接)
  // 如果 H5 也需要拼接完整地址，请取消下方注释
  finalUrl = (isOA ? OA_SERVER_URL : SERVER_URL) + url;
  // #endif

  // #ifndef H5
  // 非 H5 环境 (App/小程序)，必须拼接完整服务器地址
  const baseUrl = isOA ? OA_SERVER_URL : SERVER_URL;
  finalUrl = baseUrl + url;
  // #endif
  console.log(finalUrl);
  // 3. 处理 Header
  const finalHeader: Record<string, string> = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    ...header,
  };
  if (token) {
    finalHeader["Authorization"] = token;
  }

  // 4. 处理 Data
  let finalData: Record<string, any> = data ? { ...(data as Record<string, any>) } : {};

  // #ifndef H5
  // 非 H5 环境，老代码要求把 token 塞进 data 里
  if (token) {
    finalData.authorToken = token;
  }
  // #endif

  // 5. 数据格式化 (GET 拼接 URL，POST/PUT 序列化为表单字符串)
  if (method.toUpperCase() === "GET") {
    const queryStr = serializeFormData(finalData);
    if (queryStr) {
      finalUrl += (finalUrl.includes("?") ? "&" : "?") + queryStr;
    }
    finalData = {}; // GET 请求清空 data，避免 uni.request 重复拼接
  } else {
    // POST/PUT 等请求，手动序列化为 x-www-form-urlencoded 字符串
    finalData = serializeFormData(finalData) as any;
    console.log(finalData);
  }

  // 6. 显示 Loading
  if (loading) {
    showGlobalLoading();
  }

  // 7. 发起请求
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...rest,
      url: finalUrl,
      method: method,
      data: finalData,
      header: finalHeader,
      timeout: 10000,
      success: (res) => {
        const resData = res.data as FapResponse<T>;

        if (res.statusCode === 200) {
          // 【核心修复】：判断后端是否返回了 FAPStatus 字段
          if (resData.FAPStatus !== undefined && resData.FAPStatus !== null) {
            // 情况 A：后端返回了 FAPStatus，严格按照它的值判断
            if (resData.FAPStatus === 0) {
              resolve(resData as unknown as T);
            } else if (resData.FAPStatus === 2) {
              if (showError) {
                uni.showToast({ title: "登录超时,3秒后返回到登录页!", icon: "none" });
              }
              setTimeout(() => {
                uni.removeStorageSync("fap_context_itemId");
                uni.removeStorageSync("App-Token");
                uni.redirectTo({ url: "/pages/login/index" });
              }, 3000);
              reject(resData);
            } else {
              if (showError) {
                uni.showToast({ title: resData.FAPErrorMessage || "请求失败", icon: "none" });
              }
              reject(resData);
            }
          } else {
            // 情况 B：后端没有返回 FAPStatus（如积分商城接口），只要 HTTP 200 就视为成功！
            resolve(resData as unknown as T);
          }
        } else {
          if (showError) {
            uni.showToast({ title: "请求失败!", icon: "none" });
          }
          reject(resData);
        }
      },

      fail: (err) => {
        if (showError) {
          const title = err.errMsg?.includes("timeout") ? "请求超时!" : "请求失败!";
          uni.showToast({ title, icon: "none" });
        }
        reject(err);
      },
      complete: () => {
        if (loading) {
          hideGlobalLoading();
        }
      },
    });
  });
}

// ================= 导出快捷方法 =================

export const http = {
  get<T = any>(url: string, data?: any, config: Omit<RequestConfig, "url" | "method" | "data"> = {}) {
    return request<T>({ ...config, url, data, method: "GET" });
  },
  post<T = any>(url: string, data?: any, config: Omit<RequestConfig, "url" | "method" | "data"> = {}) {
    return request<T>({ ...config, url, data, method: "POST" });
  },
  put<T = any>(url: string, data?: any, config: Omit<RequestConfig, "url" | "method" | "data"> = {}) {
    return request<T>({ ...config, url, data, method: "PUT" });
  },
  delete<T = any>(url: string, data?: any, config: Omit<RequestConfig, "url" | "method" | "data"> = {}) {
    return request<T>({ ...config, url, data, method: "DELETE" });
  },
};
