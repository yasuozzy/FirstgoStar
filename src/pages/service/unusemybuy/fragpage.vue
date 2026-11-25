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
        ">
              <view style="font-size: 15px">{{ item.seller_name }} </view>
              <view v-if="item.status === 3" style="font-size: 15px">待发货</view>
              <view v-else-if="item.status === 4" style="font-size: 15px">待收货</view>
              <view v-else-if="item.status === 5" style="font-size: 15px">已完成</view>
              <view v-else-if="item.status === 0" style="font-size: 15px">已取消</view>
              <view v-else-if="item.status === 2" style="font-size: 15px">未付款</view>
            </view>
            <u-line></u-line>
            <view style="
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
        ">
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
            <u-line></u-line>
            <view style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 15px;
        border-bottom: 5px solid #e0e0e0;">
              <view v-if="item.status === 2" @click.stop="quxiao(item)"
                style="font-size: 15px ;border: 1px solid #e0e0e0;border-radius: 3px;">取消订单 </view>
              <view v-if="item.status === 2" @click.stop="fukuan(item)"
                style="font-size: 15px ;border: 1px solid #e0e0e0;border-radius: 3px;">付款 </view>
              <view v-if="item.status === 3" @click.stop="fahuo(item)"
                style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">提醒发货</view>
              <view v-if="item.status === 4 || item.status === 5" @click.stop="kanwuliu(item)"
                style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">查看物流</view>
              <view v-if="item.status === 4" @click.stop="shouhuo(item)"
                style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">确认收货</view>
            </view>
          </view>

        </u-list-item>
      </u-list>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {
  recycleOrderList, remindOrder, payOrder, changeOrder
} from "@/api/service";
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
const urls = ref<any[]>([

]);
const swiperHeight = ref(500);
const isRefreshing = ref(false);
const triggered = ref(false);
let _freshing = false;

// quxiao(item) {
//   let data = { orderId: item.id, authorToken: storage.getToken(), status: 0 }
//   changeOrder(data).then((res) => {
//     this.init();
//   });
// },


const quxiao = (item: any) => {
  // 1. 添加确认弹窗
  uni.showModal({
    title: "提示",
    content: "确定要取消该订单吗？",
    success: (res) => {
      if (res.confirm) {
        const data = {
          orderId: item.id,
          authorToken: storage.getToken(),
          status: 0
        };

        // 2. 调用接口
        changeOrder(data).then((res) => {
          // 3. 根据接口返回结果提示
          if (res.success || res.resultCode === 200) {
            uni.showToast({
              title: "取消成功",
              icon: "success"
            });
            init(); // 刷新列表
          } else {
            uni.showToast({
              title: res.message || "取消失败",
              icon: "none"
            });
          }
        }).catch(() => {
          uni.showToast({
            title: "网络异常",
            icon: "none"
          });
        });
      } else if (res.cancel) {
        console.log("用户点击取消");
      }
    }
  });
};


const fukuan = (item: any) => {
  const data = { orderNo: item.id, authorToken: storage.getToken(), userId: storage.getUserId() };
  payOrder(data).then((res) => {
    console.log(res);
    if (res.success) {
      const encodedUrl = encodeURIComponent(res.result.payUrl);
      uni.navigateTo({
        url: `/pages/mine/WebViewPage/WebPayPage?title=${encodeURIComponent("付款")}&url=${encodedUrl}`,
      });
    }

  });
};

const fahuo = (item: any) => {
  console.log("提醒发货");
  const data = { orderId: item.id, authorToken: storage.getToken(), userId: storage.getUserId() };
  remindOrder(data).then((res) => {
    uni.showToast({
      title: "已提醒卖家发货",
    });
    init();
  });
};

const kanwuliu = (item: any) => {
  console.log("查看物流");
};

const shouhuo = (item: any) => {
  const data = { orderId: item.id, authorToken: storage.getToken(), status: 5, userId: storage.getUserId() };
  changeOrder(data).then((res) => {
    init();
  });
};

const init = () => {
  const data1 = {
    status: props.message,
    page: 1,
    size: 50,
    serveType: 1,
    userId: storage.getUserId(),
  };
  recycleOrderList(data1).then((res) => {
    console.log(res);
    loaddata.value = res.result;
  });
};

const todetail = (id: any) => {
  console.log(id);
  uni.navigateTo({
    url: "/pages/service/unusemybuy/recyclerbuyorderinfo?id=" + id
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
  //   this.loaddata.push("https://uviewui.com/album/"+i+".jpg");
  // }
};

const onPulling = (e: any) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  if (_freshing) return;
  _freshing = true;
  setTimeout(() => {
    init();
    triggered.value = false;
    _freshing = false;
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
