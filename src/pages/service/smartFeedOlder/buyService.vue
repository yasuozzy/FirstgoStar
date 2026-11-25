<template>
    <view class="main">
        <u-navbar
          title="购买服务"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<view class="listView" >
			<view style="width: 100%;height: 99px;display: flex;flex-direction: row;">
				<u-image style="margin-top: 10px;margin-left: 15px;"
				  :src="goodsUrl"
				  width="80px"
				  height="80px"
				></u-image>
				<view style="width: 170px;height: 90px;display: flex;flex-direction: column;margin-left: 10px;">
					<view style="margin-top: 10px;font-size: 13px;width: 200px;">{{dataDict.servicename}}</view>
					<view style="margin-top: 30px;font-size: 12px;width: 200px;">￥{{dataDict.price}}</view>
				</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view class="addressView" @click="chooseAddress">
			<view style="display: flex;flex-direction: column;width: 85%;margin-left: 15px;margin-top: 10px;">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view v-if="addressDict.acceptName" style="font-size: 13px;">收货人:{{addressDict.acceptName}}</view>
					<view v-if="!addressDict.acceptName" style="font-size: 13px;">请选择收货地址</view>
					<view style="font-size: 13px;margin-left: 30px;">{{addressDict.mobile}}</view>
				</view>
				<view style="font-size: 13px;">{{addressDict.regionAddress}}</view>
			</view>
			<u-image style="border-radius: 4px;margin-top: 25px;margin-left: 15px;"
			  :src="arrowImage"
			  width="12px"
			  height="20px"
			></u-image>
		</view>
		<view class="footer-container">
			<view class="footer-content">
				<view style="font-size: 14px;margin-left: 15px;margin-top: 15px;">实付款:</view>
				<view style="font-size: 14px;margin-left: 10px;color: red;margin-top: 15px;width: 60%;">￥{{dataDict.price}}</view>
				<view class="order-button" @click="getOrderClick">下单</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
	serviceSmartFeedOlderMedicalConfirmOrder,
	serviceSmartFeedOlderMedicalSureOrder,
	serviceSmartFeedOlderMedicalGetOrderPay
} from '@/api/service';
import { storage } from '@/utils/storage';
import eventBus from '@/utils/eventBus';

const bgColor = ref("#2A9595");
const idstring = ref('');
const dataDict = ref<any>({});
const goodsUrl = ref('');
const addressDict = ref<any>({});
const arrowImage = ref('/static/service/my_arrow.png');
const payurlData = ref<any>({});

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	init();
	eventBus.on('refresh-address', handleRefresh);
});

onUnmounted(() => {
	eventBus.off('refresh-address', handleRefresh);
});

const handleRefresh = (data: any) => {
	console.log('收到刷新事件:', data);
	addressDict.value = data && data.data ? data.data : data;
};

const init = () => {
	try {
		let param = { goodId: idstring.value };
		serviceSmartFeedOlderMedicalConfirmOrder(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			const imgurl = res.result.imgurl;
			if (imgurl) {
				const arr = imgurl.split(",");
				goodsUrl.value = arr[0];
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const chooseAddress = () => {
	uni.navigateTo({
		url: '/pages/mine/addressManagement/addressManageMent?type=integral'
	});
};

const getOrderClick = () => {
	if (!addressDict.value.acceptName) {
		uni.showToast({ title: '请选择地址', icon: 'none' });
		return;
	}
	try {
		let param = {
			addressId: addressDict.value.id,
			goodId: idstring.value,
			goodName: dataDict.value.servicename,
			mobile: storage.getPhone(),
			price: dataDict.value.price,
			userId: storage.getUserId(),
			userName: storage.getRealName(),
		};
		serviceSmartFeedOlderMedicalSureOrder(param).then((res: any) => {
			console.log(res);
			const orderno = res.result;
			getPayURL(orderno);
		});
	} catch (error) {
		console.log(error);
	}
};

const getPayURL = (orderno: string) => {
	try {
		let param = {
			orderNo: orderno,
			userName: storage.getRealName(),
			mobile: storage.getPhone(),
			osName: "ios",
			hostNo: storage.getHostNo(),
		};
		serviceSmartFeedOlderMedicalGetOrderPay(param).then((res: any) => {
			console.log(res);
			payurlData.value = res.result;
			uni.navigateTo({
				url: '/pages/Integral/orderPayHtml?url=' + encodeURIComponent(payurlData.value.payUrl)
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .listView{
		display: flex;
		flex-direction: column;
		width: 100%;
	 }
	 .addressView{
		  display: flex;
		  flex-direction: row;
		  margin-top: 10px;
		  background-color: white;
		  height: 60px;
	 }
	 .footer-container {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   right: 0;
	   height: 50px;
	   background-color: #fff;
	   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	   z-index: 100;
	 }
	 .footer-content {
	   display: flex;
	   height: 100%;
	 }
	 .order-button {
	 	margin-top: 5px;
	 	margin-left: 5%;
	 	width: 80px;
	 	background-color: #2A9595;
	 	color: #ffffff;
	 	border: none;
	 	border-radius: 4px;
	 	padding: 8px 16px;
	 	font-size: 13px;
	 	display: flex;
	 	justify-content: center;
	 	align-items: center;
	 	height: 30px;
	 }
    }
</style>