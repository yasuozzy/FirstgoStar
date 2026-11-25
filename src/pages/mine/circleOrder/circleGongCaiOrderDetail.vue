<template>
    <view class="main">
        <u-navbar
          title="订单详情"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot" slot="left">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template> 
        </u-navbar>
		<view class="addressView" >
			<u-image style="margin-top: 12px;margin-left: 15px;"
			  :src="addressImage"
			  width="20px"
			  height="25px"
			></u-image>
			<view style="display: flex;flex-direction: column;width: 75%;margin-left: 10px;margin-top: 10px;">
				<view style="display: flex;flex-direction: row;">
					<view  style="font-size: 13px;">{{dataDict.userName}}</view>
					<view style="font-size: 13px;margin-left: 30px;color: #2A9595;">{{dataDict.mobile}}</view>
				</view>
				<view style="font-size: 13px;">{{dataDict.address}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 67%;">{{dataDict.shopName}} ></view>
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;color: #2A9595;width: 20%;text-align: right;">{{dataDict.statusName}}</view>
		</view>
		<view class="goodsItem" v-for="(goodItem,goodIndex) in dataDict.orderDetailAry" :key="goodIndex">
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="goodItem.img"
			  width="80px"
			  height="80px"
			></u-image>
			<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
				<view style="font-size: 13px;">{{goodItem.name}}</view>
					
				<view v-if="goodItem.type == 1" style="font-size: 13px;text-align: right;width: 100%;">{{goodItem.score}}分</view>
				<view v-if="goodItem.type == 2" style="font-size: 13px;text-align: right;width: 100%;">{{goodItem.score}}分+{{goodItem.price}}元</view>
				<view v-if="goodItem.type == 3" style="font-size: 13px;text-align: right;width: 100%;">{{goodItem.price}}元</view>
				<view style="font-size: 13px;text-align: right;width: 100%;">x{{goodItem.nums}}</view>
				
				<view style="font-size: 13px;margin-top: 5px;margin-bottom: 10px;">{{goodItem.specs}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;font-size: 13px;color: dimgray;width: 45%;">店铺优惠券</view>
			<view style="margin-left: 15px;font-size: 13px;color: dimgray;width: 42%;text-align: right;">￥{{toFixed2(dataDict.discountAmount)}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;font-size: 13px;color: dimgray;width: 45%;">运费</view>
			<view style="margin-left: 15px;font-size: 13px;color: dimgray;width: 42%;text-align: right;">￥{{toFixed2(dataDict.deliveryFee)}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;font-size: 13px;color: black;width: 45%;">合计</view>
			<view style="margin-left: 15px;font-size: 14px;color: red;width: 42%;text-align: right;">￥{{toFixed2(dataDict.realPrice + dataDict.deliveryFee)}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;font-size: 13px;color: black;margin-top: 10px;">公采订单信息</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;margin-top: 10px;">
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">公采：{{dataDict.order_user_name}}{{dataDict.order_user_mobile}}</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">订单编号：{{dataDict.orderNo}}</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">下单时间：{{dataDict.create_time}}</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">支付方式：{{dataDict.paymentType}}</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">用户留言：{{dataDict.remarks}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;margin-top: 10px;display: flex;flex-direction: row;align-items: center;justify-content: center;">
			
			<image style="height: 25px;width: 25px;" :src="circlecall"></image>
			<view style="color: #2A9595;font-size: 15px;margin-left: 10px;">联系卖家</view>
		</view>
		<view v-if="dataDict.status == 2" class="footer-container">
		    <view  class="bottomView">
		    	<view class="oneButton" @click="payClick()">确认支付</view>
		    </view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineCircleOrderDaiFuOrderDetail,
	MineCircleOrderCancelOrders,
	MineCircleOrderDaiFuUrgent,
	MineCircleOrderPayOrderImmeditly,
	MineCircleOrderNormalUrgent,
	MineCircleOrderConfirmOrderDone} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const addressImage = ref("/static/integral/locationAddress.png");
	const circlecall = ref('/static/mine/circlecall.png');
	const orderId = ref('');
	const dataDict = ref({});
           
	onLoad((options:any) => {
		orderId.value = decodeURIComponent(options.orderId);
	});
	onMounted(() => {
	  loadData();
	});

    const loadData = async() => {
            	
		try {
			
			let param = {
				
				orderId:orderId.value,
				behalf_type:2,
			};
			const res = await MineCircleOrderDaiFuOrderDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const toFixed2 = (value:any) => {
		  if (value === null || value === undefined) return '0.00'
		  return Number(value).toFixed(2)
	};
			
	//立即支付
	const payClick = async() => {
				
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				orderId:orderId.value,
				hostNo:storage.getHostNo(),
				mobile:storage.getPhone(),
				userName:storage.getNickName(),
				osName:'ios',
				
			};
			const res = await MineCircleOrderPayOrderImmeditly(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
			
    const goBack= () => {
            
        uni.navigateBack()
    };
	
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
	 .addressView{
	 			  display: flex;
	 			  flex-direction: row;
	 			  margin-top: 10px;
	 			  background-color: white;
	 			  height: 60px;
	 }
	 .goodsItem{
	 		 display: flex;
	 		 flex-direction: row;
	 		 margin-top: 10px;
	 		 background-color: aliceblue;
	 }
	 .footer-container {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   right: 0;
	   height: 70px;
	   background-color: white;
	   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	   z-index: 100;
	   color: white;
	   display: flex;
	   justify-content: center; /* 水平居中 */
	   align-items: center;     /* 垂直居中 */
	   
	 }
	 .bottomView{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 margin-top: 10px;
	 }
	 .firstButton{
	 		  margin-top: 10px;
	 		  background-color: #2A9595;
	 		  border-radius: 5px;
	 		  color: white;
	 		  font-size: 14px;
	 		  margin-left: 190px; 
	 		  display: flex;
	 		  justify-content: center; /* 水平居中 */
	 		  align-items: center;     /* 垂直居中 */
	 		  height: 30px;           /* 需要设置高度 */
	 		  width: 80px;             /* 需要设置宽度 */
	 }
	 .secondButton{
	 		margin-top: 10px;
	 		background-color: #2A9595;
	 		border-radius: 5px;
	 		color: white;
	 		font-size: 14px;
	 		margin-left: 20px; 
	 		display: flex;
	 		justify-content: center; /* 水平居中 */
	 		align-items: center;     /* 垂直居中 */
	 		height: 30px;           /* 需要设置高度 */
	 		width: 80px;             /* 需要设置宽度 */ 
	 }
	 .oneButton{
	 		 
	 		 margin-top: 10px;
	 		 background-color: #2A9595;
	 		 border-radius: 5px;
	 		 color: white;
	 		 font-size: 14px;
	 		 margin-left: 290px; 
	 		 display: flex;
	 		 justify-content: center; /* 水平居中 */
	 		 align-items: center;     /* 垂直居中 */
	 		 height: 30px;           /* 需要设置高度 */
	 		 width: 80px;             /* 需要设置宽度 */ 
	 }
    }
</style>