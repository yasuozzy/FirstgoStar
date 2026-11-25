<template>
  <view>
    <u-navbar
      :title="title"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#000"></u-icon>
        </view>
      </template>
    </u-navbar>
    <view v-if="loading" style="text-align: center; padding: 20px">
      <u-loading-icon mode="circle"></u-loading-icon>
      <text>页面加载中...</text>
    </view>

    <web-view
      ref="webview"
      v-show="!loading"
      style="margin-top: 45px"
      :webview-styles="webviewStyles"
      :src="weburl"
      @message="onMessage"
      @load="onLoadSuccess"
      @error="onLoadError"
      @onPostMessage="onPostMessage"
    ></web-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { onLoad, onReady, onBackPress } from '@dcloudio/uni-app';
import { getMyaccount, getMyWalletUrl } from "@/api/mine";
import { storage } from "@/utils/storage";

const title = ref("");
const bgColor = ref("#007AFF");
const type = ref("");
const weburl = ref("");
const loading = ref(true);
const webviewStyles = ref({
  progress: {
    color: "#007AFF",
  },
});
const canGoBack = ref(false);
const webViewHistory = ref<any[]>([]);
const webview = ref();

onLoad((e: any) => {
  type.value = e.type || "";
  if (type.value === "wallet") {
    title.value = "我的钱包";
    getWallet();
  } else if (type.value === "myaccount") {
    title.value = "监管账户";
    getAccount();
  } else if (type.value === "") {
    weburl.value = "https://uniapp.dcloud.io/static/web-view.html";
  } else if (type.value === "filePreview") {
    title.value = "文件预览";
    const filePath = e.filePath;
    handleFilePreview(filePath);
  }
});

onReady(() => {
  window.addEventListener("message", messageHandler, false);
});

const messageHandler = (e: any) => {};

onBackPress(() => {
  if (canGoBack.value) {
    webViewGoBack();
    return true;
  } else {
    uni.navigateBack();
    return true;
  }
});

const goBack = () => {
  if (canGoBack.value) {
    webViewGoBack();
  } else {
    uni.navigateBack();
  }
};

const webViewGoBack = () => {
  if (webview.value) {
    uni.postMessage({
      data: {
        action: "goBack",
      },
    });
  }
};

const getWallet = () => {
  let params = {
    authorToken: storage.getToken(),
    userType: storage.getCstType(),
    mobile: storage.getPhone(),
    formExt: "H5",
    hostNo: storage.getHostNo(),
  };
  console.log(params);
  getMyWalletUrl(params).then((res: any) => {
    console.log(res);
    if (res.result) {
      weburl.value = res.result;
    } else {
      uni.showToast({
        title: "无法加载页面",
        icon: "none",
      });
    }
  });
};

const getAccount = () => {
  let params = {
    mobile: storage.getPhone(),
    hostNo: storage.getHostNo(),
  };
  console.log(params);
  getMyaccount(params).then((res: any) => {
    console.log(res);
    if (res.result && res.result.walletUrl) {
      weburl.value = res.result.walletUrl;
    }
  });
};

const handleFilePreview = (folepath: string) => {
  weburl.value = folepath;
};

const onLoadSuccess = (e: any) => {
  console.log("WebView加载成功:", e);
  loading.value = false;
  const injectScript = `
    !function(){
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mui@latest/dist/mui.min.js';
      document.head.appendChild(script);
    }()
  `;
  if (webview.value && webview.value.evalJS) {
    webview.value.evalJS(injectScript);
  }
};

const onLoadError = (e: any) => {
  console.error("WebView加载失败:", e);
  loading.value = false;
  uni.showToast({
    title: "页面加载失败",
    icon: "none",
  });
  uni.showModal({
    title: "加载失败",
    content: "页面加载失败，是否重新加载？",
    success: (res: any) => {
      if (res.confirm) {
        reloadWebView();
      }
    },
  });
};

const reloadWebView = () => {
  loading.value = true;
  const tempUrl = weburl.value;
  weburl.value = "";
  nextTick(() => {
    weburl.value = tempUrl;
  });
};

const onMessage = (event: any) => {
  console.log("收到WebView消息:", event);
  if (event.detail && event.detail.data) {
    try {
      let data;
      if (typeof event.detail.data === "string") {
        data = JSON.parse(event.detail.data);
      } else {
        data = event.detail.data;
      }

      if (data.action === "close") {
        uni.navigateBack();
      } else if (data.action === "error") {
        console.log("WebView页面错误:", data.message);
      }
    } catch (e) {
      console.log("消息解析失败:", event.detail.data);
    }
  }
};

const onPostMessage = (e: any) => {
  console.log("WebView postMessage:", e);
};
</script>

<style lang="scss" scoped></style>
