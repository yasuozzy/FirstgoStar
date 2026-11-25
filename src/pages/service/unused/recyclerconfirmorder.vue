<template>
  <view>
    <u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>

    <view style="padding: 15px; display: flex; flex-direction: row;"
      v-if="loaddata && loaddata.imgs && loaddata.imgs.length > 0">
      <image :src="loaddata.imgs[0]" style="width: 50px; height: 50px" mode="aspectFill"></image>
      <view style="
		  display: flex;
		  flex-direction: column;
      margin: 0 10px;
        justify-content: center; /* 垂直居中 */
      color: #333; /* 修改为深色，确保可见 */
      font-size: 14px; /* 保持字体大小一致 */
		  
		">
        <view> {{ loaddata.recycleTitle }} </view>
        <view> {{ loaddata.recyclePrice }}元 </view>
      </view>

    </view>
    <view v-else style="text-align: center; padding: 20px;">
      加载中...
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view v-if="!address.id" @click="selectAddress" style="
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      ">
      <view>
        <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
      </view>
      <view style="display: flex; flex-direction: row; align-items: center">
        请选择位置
      </view>
    </view>
    <view @click="selectAddress" v-else style="
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      ">
      <view>
        <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
      </view>
      <view style="flex: 1; margin-left: 15px">
        <view>{{ address.acceptName }} {{ address.mobile }}</view>
        <view style="margin-top: 8px">{{ address.regionAddress }}</view>
      </view>
      <view>
        <u-icon name="arrow-right" size="28"></u-icon>
      </view>
    </view>
    <u-gap height="1" bg-color="#f5f5f5"></u-gap>
    <view style="
    display: flex;flex-direction: row;justify-content: space-between;
    padding: 0 20px;
            font-size: 13px;
            margin-top: 8px;
            text-align: left;
            color: #2a9598;
          ">
      运费：<text>{{ loaddata.freightPrice }}元</text>
    </view>
    <view style="
        position: absolute;
        display: flex;
        flex-direction: row;
        bottom: 0;
        left: 0;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #f5f5f5;
        width: 100%;
        justify-content: space-between;
      ">
      <view style="display: flex; flex-direction: row;margin-left: 20px;">
        实付款：<text style="color: red; font-size: 16px;">{{ allprice }}元</text>

      </view>

      <view @click="commit" style="
          background-color: #2a9598;
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          margin-right: 10px;
        ">付款</view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { RecycleAProductDetail, RecycleCreatOrder, Recyclepayorder } from "@/api/service";

import { storage } from "@/utils/storage";

import eventBus from "@/utils/eventBus";

// import WebPayPage from "../WebViewPage/WebPayPage.vue";

import { onBeforeUnmount, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#0080ff");

const id = ref("");

const loaddata = ref({});

const commantlist = ref([]);

const allprice = ref(0);

const address = ref({});

const goBack = () => {
  uni.navigateBack();
};

const handlePayFinish = (data) => {
  console.log("支付完成");
    uni.navigateBack();
};

const handleUpdateData = (data) => {
  console.log("接收到回传的数据:", data);
    address.value = data;
};

const getdetail = () => {
  let data1 = {
      RecycleId: id.value,
      userId: storage.getUserId()
    };
    RecycleAProductDetail(data1).then(res => {
      console.log(res);
      loaddata.value = res.result.RecycleEntity;
      allprice.value = loaddata.value.recyclePrice + loaddata.value.freightPrice;
    });
};

const selectAddress = () => {
  uni.navigateTo({
      url: "/pages/service/unused/IntegralSelectAddressPage"
    });
};

const commit = () => {
  if (!address.value.id) {
      uni.showToast({
        title: "请选择收货地址",
        icon: "none"
      });
      return;
    }
    let data1 = {
      buyer_id: storage.getUserId(),
      buyer_name: storage.getRealName(),
      goods_id: loaddata.value.id,
      seller_id: loaddata.value.userId,
      seller_name: loaddata.value.username,
      note: "",
      received_adress: address.value.address,
      received_area: address.value.areaName,
      received_city: address.value.cityName,
      received_mobile: address.value.mobile,
      received_name: address.value.acceptName,
      received_province: address.value.provinceName
    };
    RecycleCreatOrder(data1).then(res => {
      console.log(res);
      pay(res.result.orderNo);
      uni.navigateBack();
    });
};

const pay = (id) => {
  if (!loaddata.value.id) {
      uni.showToast({
        title: "订单信息异常",
        icon: "none"
      });
      return;
    }
    let data = {
      orderNo: id,
      userId: storage.getUserId()
    };
    Recyclepayorder(data).then(res => {
      console.log(res);
      if (res.success) {
        const encodedUrl = encodeURIComponent(res.result.payUrl);
        uni.navigateTo({
          url: `/pages/service/WebViewPage/WebPayPage?title=付款&url=${encodedUrl}`
        });
      }
    });
};

onLoad((e) => {
  id.value = e.id;
    getdetail(id.value);
    uni.$on('payfinish', data => {
      console.log('收到支付完成通知', data);
      handlePayFinish();
    });
});

onMounted(() => {
  checkChangeInfo();
    // eventBus.$on("sAddress", this.handleUpdateData);
    uni.$on("sAddress", handleUpdateData);
});

onBeforeUnmount(() => {
  // eventBus.$off("sAddress", this.handleUpdateData);
    uni.$off("sAddress", handleUpdateData);
    uni.$off('payfinish');
});
</script>

<style></style>
