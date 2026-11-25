<template>
  <view>
    <!-- <text>{{ message }}</text> -->
    <!-- <text>{{ postid }}</text> -->
    <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
    <scroll-view
      :style="{ height: swiperHeight + 'px' }"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="50"
      refresher-background="white"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(item, index) in loaddata" :key="index">
          <view
            style="border-bottom: 5px solid #f5f5f5"
            @click="toOrderDetail(item)"
          >
            <view
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 5px 15px;
              "
            >
              <view>{{ item.shopName }}></view>
              <view style="font-size: 14px">{{ item.statusName }}</view>
            </view>
            <view
              v-for="(citem, index) in item.goodsList"
              :key="index"
              style="padding: 1px 15px"
            >
              <view
                style="
                  height: 100px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                "
              >
                <image
                  :src="citem.img"
                  style="width: 80px; height: 80px"
                ></image>
                <view style="flex: 1; padding: 0px 10px">
                  <view style="font-size: 14px; text-align: left">{{
                    citem.name
                  }}</view>
                  <view style="font-size: 14px; text-align: right"
                    >¥{{ citem.price }}</view
                  >
                  <view style="font-size: 14px; text-align: right"
                    >x{{ citem.nums }}</view
                  >
                  <view style="font-size: 14px; text-align: left">{{
                    citem.specs
                  }}</view>
                </view>
              </view>
            </view>
            <view
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 5px 15px;
              "
            >
              <view style="font-size: 14px"
                >共 {{ item.totalNums }} 件商品 合计{{
                  item.orderPrice
                }}元</view
              >
              <view
                v-if="item.status == 3"
                @click.stop="use(item)"
                style="
                  background-color: #2a9598;
                  color: white;
                  font-size: 14px;
                  padding: 3px 10px;
                  border-radius: 15px;
                "
                >使用</view
              >
              <view
                v-if="postid === 0"
                @click.stop="cancel(item)"
                style="
                  background-color: #2a9598;
                  color: white;
                  font-size: 14px;
                  padding: 3px 10px;
                  border-radius: 15px;
                "
                >取消订单</view
              >
            </view>
          </view>
        </u-list-item>
      </u-list>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { prePayMyOrderList, prePayMakeOrder, prePayCancelOrder } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onActivated, onDeactivated, onMounted, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const emit = defineEmits(["message"]);

const loaddata = ref([]);

const list = ref([1, 2]);

const swiperHeight = ref(500);

const isRefreshing = ref(false);

const triggered = ref(false);

const _freshing = ref<any>();

const sendDataToParent = () => {
  emit("message", "Hello from Child");
};

const toOrderDetail = (item) => {
  uni.navigateTo({
      url: "/pages/finance-mine/PrePayOrderDetailPage/PrePayOrderDetailPage?id=" + item.orderId + "&type=" + props.postid
    });
};

const getlist = () => {
  let param = {
      status: props.postid,
      userType: "1",
      pCode: "",
      userId: storage.getUserId(),
      page: "1",
      size: "50"
    };
    console.log(param);
    prePayMyOrderList(param).then(res => {
      console.log(res);
      triggered.value = false;
      _freshing.value = false;
      if (res.success && res.resultCode == 200) {
        loaddata.value = res.result;
      } else {
        uni.showToast({
          title: res.message,
          icon: "none"
        });
      }
    });
};

const cancel = (item) => {
  let param = {
      order_id: item.orderId,
      user_id: storage.getUserId()
    };
    console.log(param);
    prePayCancelOrder(param).then(res => {
      console.log(res);
    });
};

const use = (item) => {
  let param = {
      orderId: item.orderId
    };
    console.log(param);
    prePayMakeOrder(param).then(res => {
      console.log(res);
      getlist();
    });
};

const scrolltolower = () => {
  console.log("scrolltolower");
    loadmore();
};

const loadmore = () => {
  for (let i = 0; i < 10; i++) {
      loaddata.value.push("https://uviewui.com/album/" + i + ".jpg");
    }
};

const onPulling = (e) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  if (_freshing.value) return;
    _freshing.value = true;
    setTimeout(() => {
      getlist();
      triggered.value = false;
      _freshing.value = false;
    }, 1000);
};

const onRestore = () => {
  triggered.value = "restore"; // 需要重置
    console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
};

onMounted(() => {
  console.log("首页组件被创建了");
    getlist();
    uni.getSystemInfo({
      success: res => {
        swiperHeight.value = res.windowHeight - 104;
        console.log("height", swiperHeight.value);
      }
    });
    _freshing.value = false;
    setTimeout(() => {
      triggered.value = true;
    }, 100);
    // 这里可以发起网络请求初始化数据
});

onActivated(() => {
  console.log("首页组件被激活了");
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped></style>
