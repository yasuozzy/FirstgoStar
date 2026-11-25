<template>
  <view>
    <u-navbar
      title="详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
	<template #left>
      <view slot="left" @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
	</template>
    </u-navbar>
    <view
      style="
        border-bottom: 10px solid #f5f5f5;
        display: flex;

        flex-direction: row;
        align-items: center;
        padding: 5px 15px;
      "
    >
      <view style="flex: 1; margin-left: 15px">
        <view>{{ detaildata.userName }} {{ detaildata.mobile }}</view>
        <view style="font-size: 13px">{{ detaildata.address }}</view>
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
      <view>{{ detaildata.shopName }}></view>
      <view style="font-size: 14px">{{ detaildata.statusName }}</view>
    </view>
    <view
      v-for="(item, index) in detaildata.orderDetailAry"
      :key="index"
      style="padding: 1px 15px"
    >
      <view
        style="
          height: 100px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: beige;
        "
      >
        <image
          src="@/static/logo.png"
          style="width: 80px; height: 80px"
        ></image>
        <view style="flex: 1; padding: 0px 10px">
          <view style="font-size: 14px; text-align: left">{{ item.name }}</view>
          <view style="font-size: 14px; text-align: right"
            >¥{{ item.score }}</view
          >
          <view style="font-size: 14px; text-align: right"
            >x{{ item.num }}</view
          >
          <view style="font-size: 14px; text-align: left">{{
            item.specs
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
      <view>店铺优惠券></view>
      <view style="font-size: 14px">{{ detaildata.discountAmount }}</view>
    </view>
    <u-line color="#999"></u-line>
    <view style="text-align: right; padding: 10px 15px; font-size: 14px"
      >合计:<text style="color: red">{{ detaildata.score }}</text></view
    >
    <u-gap bgColor="#f5f5f5" height="10"></u-gap>
    <view style="padding: 10px 15px; font-size: 14px">订单信息</view>
    <u-line color="#f5f5f5"></u-line>
    <view style="padding: 4px 15px; font-size: 13px"
      >订单编号：{{ detaildata.orderNo }}</view
    >
    <view style="padding: 4px 15px; font-size: 13px"
      >下单时间：{{ detaildata.create_time }}</view
    >
    <view style="padding: 4px 15px; font-size: 13px"
      >支付方式：{{ detaildata.paymentType }}</view
    >
    <u-line color="#f5f5f5" style="margin-top: 5px"></u-line>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 5px;
      "
    >
      <u-icon name="phone" size="20" color="#2a9598"></u-icon>
      联系卖家
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
    const bgColor = ref("#0080ff");
    const list = ref([1, 2]);
    const orderId = ref('');
    const detaildata = ref({});
    
	  onLoad((options:any) => {
		orderId.value = decodeURIComponent(options.orderId);
		init();
	  });
 
     const init = async() => {
		let data = {
			orderId: orderId.value,
		};
		const res = await GongFenZhangdanDetail(data);
		this.detaildata = res.result;
        console.log(res);
      
    };

    const gotopay = async() => {
      let data = {
        orderId: orderId.value,
        osName: "android",
        hostNo: getStorage(storageKeys.hostNo,''),
       
      };
      const res = await GongFenZhangdanPay(data);
      console.log(res);
      
    };

    const cancelorder = async() => {
      let data = {
        orderId: orderId.value,
      };
      const res = await GongFenZhangdanCancel(data);
      console.log(res);
      
    };
    const urgeorder  = async() => {
      let data = {
        orderId: orderId.value,
      };
      const res = await GongFenZhangdanUrge(data);
      console.log(res);
      
    };
    const useorder = async() => {
      let data = {
        orderId: orderId.value,
      };
      const res = await GongFenZhangdanconfirmUse(data);
	  console.log(res);
      
    };
    const goBack = () => {
      uni.navigateBack();
    };
  
</script>

<style></style>
