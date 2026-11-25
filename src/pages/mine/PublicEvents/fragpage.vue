<template>
  <view class="frag-page">
    <!-- <text>{{ message }}</text> -->
    <!-- <text>{{ postid }}</text> -->
    <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
    <scroll-view class="list-scroll" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
      :refresher-threshold="50" refresher-background="white" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
      @refresherrestore="onRestore" @refresherabort="onAbort">
      <view v-if="loaddata.length === 0" class="empty-wrap">
        <view class="empty-text">暂无数据</view>
      </view>
      <view v-for="(item, index) in loaddata" :key="getItemId(item) || index" class="card" @click="todetail(item)">
        <view class="card-main">
          <image :src="getAvatar(item)" class="avatar" mode="aspectFill"></image>
          <view class="card-body">
            <view class="card-head">
              <view class="name">{{ getDisplayName(item) }}</view>
              <view class="time">{{ getDisplayTime(item) }}</view>
            </view>
            <view class="card-line">文件标题：{{ getContent(item) }}</view>
            <view class="card-line">文件详情：{{ getDetails(item) }}</view>
          </view>
        </view>
        <view class="card-footer">
          <view v-if="showTransferButton(item)" class="action-btn action-btn-primary" @click.stop="transfer(item)">转发
          </view>
          <view v-if="showPrintButton(item)"
            :class="['action-btn', isPrintApplied(item) ? 'action-btn-disabled' : 'action-btn-secondary']"
            @click.stop="applyPrint(item)">{{ isPrintApplied(item) ? '已打印' : '申请打印' }}</view>
          <view v-if="showConfirmButton(item)" class="confirm-btn" @click.stop="approve(item)">确认</view>
        </view>
      </view>
    </scroll-view>
    <u-modal :show="showSignDialog" content="需前往审批页面签字" :show-cancel-button="true" cancel-text="取消" confirm-text="去签字"
      confirm-color="#2A9595" @confirm="goToSign" @cancel="cancelSign"></u-modal>
  </view>
</template>

<script setup lang="ts">
import { approvereceivefile, receivefilelist, receiverTransmitFile } from "@/api/service";

import { storage } from "@/utils/storage";

import { eventBus } from "@/utiles/eventBus.js";

import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps({
    message: {
      type: [String, Number],
      default: "0",
    },
    postid: {
      type: [String, Number],
      default: "",
    },
    keyword: {
      type: String,
      default: "",
    },
    refreshKey: {
      type: [String, Number],
      default: 0,
    },
  });

const emit = defineEmits(["loaded", "updated", "message"]);

const loaddata = ref([]);

const urls = ref([]);

const loading = ref(false);

const triggered = ref(false);

const currentApproveId = ref("");

const signaturepic = ref("");

const currentPrintId = ref("");

const currentPrintSignature = ref("");

const showSignDialog = ref(false);

const printApplyMap = ref({});

const transid = ref("");

const fileId = ref("");

const receivers = ref<any>();

const chaoSongContact = ref<any>();

const _freshing = ref<any>();

const getPersonList = (data) => {
  if (!transid.value) {
      return;
    }
    ;
    console.log('接收到回传的数据:', data);
    const list = Array.isArray(data) ? data : [];
    receivers.value = list;
    chaoSongContact.value = list;
    receiverTransmitFile({
      id: transid.value,
      receivers: JSON.stringify(list),
      fileId: fileId.value,
      applyUserId: storage.getPlatId()
    }).then(res => {
      console.log(res);
      init();
    }).catch(error => {
      console.log(error);
    });
};

const getItemId = (item) => {
  return item && (item.id || item.documentId || item.documentMessageId || item.messageId || item.approvalId || "");
};

const getApproveId = (item) => {
  return item && (item.id || item.approvalId || item.receiveId || item.receiverId || item.messageId || item.documentId || "");
};

const getDetailId = (item) => {
  return item && (item.documentId || item.documentMessageId || item.messageId || item.bizId || item.id || "");
};

const getDetailCacheKey = (item) => {
  return "public_events_detail_" + String(getApproveId(item) || getDetailId(item) || "");
};


const getPrintStorageKey = () => {
  return `public_events_print_apply_${storage.getPlatId() || ""}`;
};

const loadPrintApplyMap = () => {
  const cachedMap = uni.getStorageSync(getPrintStorageKey());
    printApplyMap.value = cachedMap && typeof cachedMap === "object" ? cachedMap : {};
};

const savePrintApplyMap = () => {
  uni.setStorageSync(getPrintStorageKey(), printApplyMap.value);
};

const init = () => {
  loading.value = true;
    let data1 = {
      status: String(props.message),
      page: 1,
      size: 50,
      content: props.keyword || "",
      userId: storage.getPlatId()
    };
    receivefilelist(data1).then(res => {
      console.log(res);
      loaddata.value = Array.isArray(res.result) ? res.result : [];
      loading.value = false;
      triggered.value = false;
      emit("loaded", {
        status: String(props.message),
        count: loaddata.value.length
      });
    }).catch(error => {
      console.log(error);
      loaddata.value = [];
      loading.value = false;
      triggered.value = false;
      emit("loaded", {
        status: String(props.message),
        count: 0
      });
    });
};

const getAvatar = (item) => {
  return item.headImage || item.applyHeadImage || item.senderHeadImage || "/static/service/lawmyshenqing-image.png";
};

const getDisplayName = (item) => {
  return item.applyUserName || item.username || item.senderName || item.receiverUsername || "暂无姓名";
};

const getDisplayTime = (item) => {
  return item.submissionTime || item.createTime || item.approvalTime || "";
};

const getContent = (item) => {
  return item.content || item.title || "";
};

const getDetails = (item) => {
  return item.details || item.reason || item.description || "";
};

const getStatusValue = (item) => {
  if (item && item.status !== undefined && item.status !== null && item.status !== "") {
      return String(item.status);
    }
    if (item && item.statusFlag !== undefined && item.statusFlag !== null && item.statusFlag !== "") {
      return String(item.statusFlag);
    }
    return "";
};

const showConfirmButton = (item) => {
  return String(props.message) === "0";
};

const showTransferButton = (item) => {
  return String(props.message) === "1";
};

const showPrintButton = (item) => {
  return String(props.message) === "1";
};

const isPrintedFieldValue = (value) => {
  if (value === true) {
      return true;
    }
    if (value === false || value === null || value === undefined || value === "") {
      return false;
    }
    const normalizedValue = String(value).trim();
    return normalizedValue === "1" || normalizedValue === "2" || normalizedValue.toLowerCase() === "true" || normalizedValue.indexOf("已打") !== -1 || normalizedValue.indexOf("已申请") !== -1 || normalizedValue.indexOf("打印完成") !== -1;
};

const hasServerPrintApplied = (item) => {
  if (!item || typeof item !== "object") {
      return false;
    }
    const booleanKeys = ["printed", "isPrinted", "hasPrinted", "printApplied", "isPrintApplied"];
    if (booleanKeys.some(key => isPrintedFieldValue(item[key]))) {
      return true;
    }
    const statusKeys = ["printStatus", "printState", "printingStatus", "filePrintStatus", "printFlag"];
    return statusKeys.some(key => isPrintedFieldValue(item[key]));
};

const isPrintApplied = (item) => {
  if (item && item._localPrintApplied) {
      return true;
    }
    if (hasServerPrintApplied(item)) {
      return true;
    }
    const itemId = String(getItemId(item) || "");
    const cachedValue = itemId ? printApplyMap.value[itemId] : "";
    return !!(cachedValue && (cachedValue === true || cachedValue.applied));
};

const towuliu = (item) => {
  // order_no; waybill_no; shipNo;
};

const transfer = (item) => {
  const detailId = getDetailId(item);
    if (!detailId) {
      return;
    }
    transid.value = item.id || "";
    fileId.value = item.fileId || "";
    uni.navigateTo({
      url: "/pages/mine/PublicEvents/fileselectperson?detailId=" + detailId
    });
};

const applyPrint = (item) => {
  const itemId = String(getItemId(item) || "");
    if (!itemId || isPrintApplied(item)) {
      return;
    }
    currentPrintId.value = itemId;
    currentApproveId.value = "";
    currentPrintSignature.value = "";
    showSignDialog.value = true;
};

const submitPrintApply = () => {
  if (!currentPrintId.value || !currentPrintSignature.value) {
      return;
    }
    const currentItem = loaddata.value.find(item => String(getItemId(item) || "") === currentPrintId.value);
    printApplyMap.value[currentPrintId.value] = {
      applied: true,
      signaturepic: currentPrintSignature.value,
      applyTime: new Date().toISOString(),
      id: currentPrintId.value,
      detailId: getDetailId(currentItem),
      content: getContent(currentItem),
      details: getDetails(currentItem),
      submissionTime: getDisplayTime(currentItem),
      statusName: "已打印"
    };
    if (currentItem) {
      currentItem["_localPrintApplied"] = true;
    }
    savePrintApplyMap();
    currentPrintId.value = "";
    currentPrintSignature.value = "";
    uni.showToast({
      title: "申请成功",
      icon: "none"
    });
};

const cancelSign = () => {
  showSignDialog.value = false;
    currentApproveId.value = "";
    signaturepic.value = "";
    currentPrintId.value = "";
    currentPrintSignature.value = "";
};

const goToSign = () => {
  showSignDialog.value = false;
    uni.navigateTo({
      url: "/pages/mine/SignPage/SignPage"
    });
};

const todetail = (item) => {
  const detailId = getDetailId(item);
    if (!detailId) {
      return;
    }
    uni.navigateTo({
      url: "/pages/mine/PublicEvents/receivefiledetail?id=" + item.id 
    });
};

const addwuliu = () => {

};

const fahuo = () => {

};

const handleSignResult = (data) => {
  if (currentPrintId.value) {
      currentPrintSignature.value = Array.isArray(data) ? data.join(",") : data || "";
      submitPrintApply();
      return;
    }
    if (!currentApproveId.value) {
      return;
    }
    signaturepic.value = Array.isArray(data) ? data.join(",") : data || "";
    confirmApprove();
};

const approve = (item) => {
  const itemId = getApproveId(item);
    if (!itemId) {
      return;
    }
    currentApproveId.value = itemId;
    currentPrintId.value = "";
    currentPrintSignature.value = "";
    showSignDialog.value = true;
};

const confirmApprove = () => {
  let data = {
      id: currentApproveId.value,
      reason: "",
      signaturepic: signaturepic.value,
      userId: storage.getPlatId()
    };
    approvereceivefile(data).then(res => {
      console.log(res);
      const isSuccess = res && (res.FAPStatus === 0 || res.success === true || res.resultCode === 200 || res.code === 200);
      if (!isSuccess) {
        currentApproveId.value = "";
        signaturepic.value = "";
        const errorTitle = res && (res.FAPErrorMessage || res.message) || "确认失败";
        uni.showToast({
          title: errorTitle,
          icon: "none"
        });
        return;
      }
      currentApproveId.value = "";
      signaturepic.value = "";
      showSignDialog.value = false;
      uni.showToast({
        title: "确认成功",
        icon: "none"
      });
      init();
      emit("updated");
    }).catch(error => {
      console.log(error);
      currentApproveId.value = "";
      signaturepic.value = "";
      showSignDialog.value = false;
      uni.showToast({
        title: "确认失败",
        icon: "none"
      });
    });
};

const sendDataToParent = () => {
  emit("message", "Hello from Child");
};

const scrolltolower = () => {
  console.log("scrolltolower");
    loadmore();
};

const loadmore = () => {
  // for (let i = 0; i < 10; i++) {
    // this.loaddata.push("https://uviewui.com/album/"+i+".jpg");
    // }
};

const onPulling = (e) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  if (loading.value) {
      triggered.value = false;
      return;
    }
    triggered.value = true;
    init();
};

const onRestore = () => {
  triggered.value = "restore"; // 需要重置
    console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
};

watch(() => props.keyword, () => {
  init();
});

watch(() => props.refreshKey, () => {
  init();
});

watch(() => props.message, () => {
  init();
});

onMounted(() => {
  loadPrintApplyMap();
    eventBus.$on("sign_netimg", handleSignResult);
    eventBus.$on('selecPerson', getPersonList);
});

onBeforeUnmount(() => {
  eventBus.$off("sign_netimg", handleSignResult);
    eventBus.$off('selecPerson', getPersonList);
});

onMounted(() => {
  init();
    console.log("首页组件被创建了");
    _freshing.value = false;
    // 这里可以发起网络请求初始化数据
});

onActivated(() => {
  console.log("首页组件被激活了");
    init();
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped>
.frag-page {
  height: 100%;
}

.list-scroll {
  height: 100%;
  background-color: #f5f5f5;
}

.empty-wrap {
  padding-top: 80px;
  display: flex;
  justify-content: center;
}

.empty-text {
  color: #999;
  font-size: 14px;
}

.card {
  margin-bottom: 10px;
  background-color: #fff;
}

.card-main {
  display: flex;
  flex-direction: row;
  padding: 16px 14px 12px;
  border-bottom: 1px solid #efefef;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: #e5e5e5;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
  margin-left: 14px;
  overflow: hidden;
}

.card-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.name {
  flex: 1;
  font-size: 16px;
  color: #333;
  padding-right: 12px;
}

.time {
  font-size: 12px;
  color: #b0b0b0;
  white-space: nowrap;
}

.card-line {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  word-break: break-all;
}

.card-footer {
  min-height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 14px;
}

.action-btn {
  min-width: 92px;
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  margin-left: 12px;
}

.action-btn-primary {
  background-color: #2A9595;
  color: #fff;
}

.action-btn-secondary {
  background-color: #2A9595;
  color: #fff;
}

.action-btn-disabled {
  background-color: #c8c8c8;
  color: #fff;
}

.confirm-btn {
  min-width: 92px;
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  background-color: #2A9595;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  margin-left: 12px;
}
</style>
