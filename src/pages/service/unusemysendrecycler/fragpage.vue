<template>
  <view>
    <!-- <text>{{ message }}</text> -->
    <!-- <text>{{ postid }}</text> -->
    <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
    <scroll-view :style="{ height: swiperHeight + 'px' }" scroll-y="true" refresher-enabled="true"
      :refresher-triggered="triggered" :refresher-threshold="50" refresher-background="white"
      @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
      @refresherabort="onAbort">
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(item, index) in loaddata" :key="index">
          <view style="display: flex;flex-direction: column;" @click="todetail(item.id)">
            <view style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 15px;
        border-bottom: 1px solid #e0e0e0;">
              <view style="font-size: 15px">{{ item.received_name }} </view>
              <view v-if="item.status === 3" style="font-size: 15px">待发货</view>
              <view v-else-if="item.status === 4" style="font-size: 15px">已发货</view>
              <view v-else-if="item.status === 5" style="font-size: 15px">已完成</view>
            </view>

            <view style="
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;">
              <image :src="item.recycle_content_imgs" style="width: 65px; height: 65px" mode="aspectFill"></image>
              <view style="
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 10px;
        ">
                <view style="font-size: 15px">{{ item.goods_name }} </view>
                <view style="font-size: 15px;color: #2a9598;">{{ item.order_price }} </view>
              </view>
            </view>

            <view style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 15px;
        border-bottom: 5px solid #f5f5f5;">
              <view v-if="item.status === 4 || item.status === 5" @click.stop="towuliu(item)"
                style="font-size: 15px ;border: 1px solid #e0e0e0;border-radius: 3px;">查看物流 </view>
              <view v-if="item.status === 3 && item.sendStatus === 1" @click.stop="addwuliu(item)"
                style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">填写物流</view>
              <view v-if="item.status === 3 && item.sendStatus === 0" @click.stop="fahuo(item)"
                style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">发货</view>
            </view>
          </view>
        </u-list-item>
      </u-list>
    </scroll-view>

    <u-modal :show="showLogisticsModal" title="填写物流信息" :showCancelButton="true" @confirm="confirmLogistics"
      @cancel="showLogisticsModal = false">
      <view style="padding: 10px;">
        <u-input v-model="logisticsInputNo" placeholder="请输入物流单号" border="surround"></u-input>
      </view>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import {
  recycleOrderList,
} from "@/api/service";
import {
  updateWaybillInfo,
} from "@/api/work";
import {
  storage
} from "@/utils/storage";
import { onActivated, onDeactivated, onMounted, ref } from "vue";

const props = defineProps<{
  message: string
  postid: string
}>();

const emit = defineEmits<{
  (e: "message", value: string): void
}>();

const loaddata = ref<any[]>([]);
const urls = ref<any[]>([]);
const swiperHeight = ref(500);
const isRefreshing = ref(false);
const triggered = ref(false);
const showLogisticsModal = ref(false); // 控制弹窗显示
const logisticsInputNo = ref(''); // 物流单号输入值
const currentOrderItem = ref<any>(null);
let _freshing = false;

const init = () => {
  const data1 = {
    status: props.message,
    page: 1,
    size: 50,
    serveType: 2,
    userId: storage.getUserId(),
  };
  recycleOrderList(data1).then((res) => {
    console.log(res);
    loaddata.value = res.result;
    console.log((globalThis as any).tablist);
    console.log((globalThis as any).ids);
  });
};

const towuliu = (item: any) => {
  // order_no; waybill_no; shipNo;
  uni.navigateTo({
    url: '/pages/service/unusemysendrecycler/wuliuDetailinfo?order_no=' + item.order_no + "&waybill_no=" + item.LogisticCode + "&shipNo=" + item.shipperCode + "&received_name=" + item.received_name + "&received_adress=" + item.received_adress
  });
};

const addwuliu = (item: any) => {
  currentOrderItem.value = item; // 保存当前订单信息
  logisticsInputNo.value = ''; // 清空输入框
  showLogisticsModal.value = true; // 显示弹窗
};

const confirmLogistics = () => {
  if (!logisticsInputNo.value || !logisticsInputNo.value.trim()) {
    uni.showToast({
      title: '请输入物流单号',
      icon: 'none'
    });
    return;
  }
  updateWaybillInfo({
    LogisticCode: logisticsInputNo.value.trim(),
    orderNo: currentOrderItem.value.order_no,
    reveicerId: currentOrderItem.value.buyer_id,
    sendmenId: currentOrderItem.value.seller_id,
  }).then(res => {
    console.log('物流信息更新成功:', res);
    uni.showToast({
      title: '物流已更新',
      icon: 'success'
    });
    showLogisticsModal.value = false;
    init(); // 刷新列表以更新状态
  }).catch(err => {
    console.error('物流信息更新失败:', err);
    uni.showToast({
      title: '物流更新失败',
      icon: 'none'
    });
  });
};

const todetail = (id: any) => {
  uni.navigateTo({
    url: '/pages/service/unusemysendrecycler/recyclerMySendorderinfo?id=' + id
  });
};

const fahuo = (item: any) => {
  const infoStr = encodeURIComponent(JSON.stringify(item));
  uni.navigateTo({
    url: '/pages/service/unusemysendrecycler/fahuo?info=' + infoStr
  });
};

// 这里存放方法
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

const onPulling = (e: any) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  isRefreshing.value = true;
  if (_freshing) return;
  _freshing = true;
  setTimeout(() => {
    triggered.value = false;
    _freshing = false;
    isRefreshing.value = false;
    init();
  }, 1000);
};

const onRestore = () => {
  triggered.value = "restore" as any; // 需要重置
  console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
};

onMounted(() => {
  init();
  console.log("首页组件被创建了");
  loaddata.value = urls.value;
  uni.getSystemInfo({
    success: (res) => {
      swiperHeight.value = res.windowHeight - 104;
      console.log("height", swiperHeight.value);
    },
  });
  _freshing = false;
  setTimeout(() => {
    triggered.value = true;
  }, 100);
  // 这里可以发起网络请求初始化数据
});

// 可以使用 keep-alive 相关的生命周期
onActivated(() => {
  console.log("首页组件被激活了");
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped></style>
