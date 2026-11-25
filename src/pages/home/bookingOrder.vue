<template>
    <view class="main">
        <u-navbar
          title="预订单"
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
		<view class="locationView" @click="mapClick">
				  <u-image style="margin-top: 6px;margin-left: 6px;" :src="locimage"
					  width="20px"
					  height="20px"></u-image>
				  <view style="color: blue;font-size: 13px;margin-top: 6px;margin-left: 10px;">目的地</view>
				  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">{{locationString}}</view>
		</view>
		<view class="chooseTimeView">
			<view class="startView" >{{startTime}}	
			</view>
			<view style="width: 20px;margin-top: 15px;margin-right: 5px;">---</view>
			<view class="endView">{{endTime}}	
			</view>
			<view class="alldayView">共{{totalnights}}晚</view>			
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80px;">房型</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{housetype}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80px;">酒店市场价格</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{price}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80px;">出价(元)</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{callprice}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80px;">数量(间)</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{housenum}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80px;">早餐</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{breakfirst}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="protocalView">
		            <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		            <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		            <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">我已阅读并同意</view>
		            <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="protocalClick">《文旅群苑酒店民宿入住协议》</view>
		            
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 13px;margin-left: 15px;margin-top: 15px;color: black;width: 60px;">在线支付:</view>
				<view style="color: blue;font-size: 15px;margin-top: 15px;width: 80px;">￥{{allmoney}}</view>
				<view class="order-button" @click="payClick">立即支付</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const locimage = ref("/static/home/homestay.png");
	const downimage = ref('/static/home/downImage.png');
	const locationString = ref("湖北铜山，九宫山附近");
	const currentlocation = ref("湖北铜山");
	const detailLocation = ref("九宫山");
	const startTime = ref("1月19日");
	const endTime = ref("1月20日");
	const totalnights = ref("1");
	const housetype = ref('大床房');
	const price = ref('100-150');
	const callprice = ref('85');
	const housenum = ref('1');
	const breakfirst = ref('有');
	const allmoney = ref('228');
           
       
	const goBack= () => {
			
		uni.navigateBack()
	};
	//去付钱
	const payClick = () => {
				
		uni.navigateTo({
			url:'/pages/home/payBookingHouse'
		})
		
	};
	//协议
	const protocalClick = () => {
		uni.navigateTo({
			url:'/pages/home/hotelProtocal'
		})
	};
	//地图
	const mapClick = () => {
		uni.navigateTo({
			url:'/pages/home/mapLocation'
		})
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
	 .locationView{
	 		 margin-left: 6%;
	 		 margin-top: 10px;
	 		 width: 88%;
	 		 height: 30px;
	 		 background-color: lightblue;
	 		 border-radius: 5px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 }
	 .leftLocView{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 height: 40px;
	 		 margin-top: 10px;
	 		 
	 }
	 .lineView{
	 		 width: 94%;
	 		 height: 1px;
	 		 background-color: gray;
	 		 margin-left: 3%;
	 		 margin-top: 15px;
	 }
	 .chooseTimeView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 }
	 .startView{
	 		 margin-left: 15px;
	 		 margin-top: 15px;
	 		 width: 70px;
	 		 font-size: 14px;
	 }
	 .endView{
	 		 
	 		 margin-top: 15px;
	 		 width: 70px;
	 			 font-size: 14px;
	 }
	 .alldayView{
	 		 width: 100px;
	 		 margin-top: 15px;
	 		 margin-right: 15px;
	 		 margin-left: 60px;
	 		 font-size: 14px;
	 		 text-align: right;
	 			 
	 }
	 .protocalView{
	          display: flex;
	          flex-direction: row;
	          width: 100%;
	 		 height: 50px;
			 margin-top: 20px;
	 }
	 .footer-container {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   right: 0;
	   height: 50px;
	   background-color: white;
	   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	   z-index: 100;
	   color: white;
	   display: flex;
	   justify-content: center; /* 水平居中 */
	   align-items: center;     /* 垂直居中 */
	   
	 }
	 .order-button {
	 			 
	 	display: flex;
	 	justify-content: center; /* 水平居中 */
	 	align-items: center;     /* 垂直居中 */
	 	height: 25px;           /* 需要设置高度 */
	 	width: 80px;
	 	margin-right: 10px;
	 	font-size: 13px;
	 	color: white;
	 	background-color: blue;
	 	border-radius: 6px;
	 	margin-left: 120px;
	 	margin-top: 10px;
	 }
    }
</style>