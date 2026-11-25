import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import uviewPlus from "uview-plus";
import App from "./App.vue";


export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  app.use(uviewPlus);

  return {
    app,
  };
}

// 定义允许访问的本地白名单前缀
const LOCAL_WHITELIST = [
  "http://127.0.0.1",
  "http://localhost",
  "https://127.0.0.1",
  "https://localhost",
  "ws://127.0.0.1",
  "ws://localhost",
];

// 把三种常见的网络请求（普通请求、上传、下载）全部装上安检门
(["request", "uploadFile", "downloadFile"] as const).forEach((apiName) => {
  uni.addInterceptor(apiName, {
    invoke(args) {
      const url = String(args?.url || "");
      // 1. 判断是不是完整网络协议地址（http/https/ws/wss 开头）
      const isRemoteUrl = /^(https?|wss?):\/\//i.test(url);
      if (!isRemoteUrl) {
        // 相对路径（如 /static/...）不会发到外网，直接放行
        return true;
      }

      // 2. 如果是完整地址，必须在白名单里才允许通过
      const isAllowed = LOCAL_WHITELIST.some((prefix) => url.startsWith(prefix));
      if (!isAllowed) {
        console.error(`[安全拦截] 已阻止外网请求 (${apiName}):`, url);
        return false; // 返回 false = 当场掐断，不会发出请求
      }

      return true;
    },
  });
});