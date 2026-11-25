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
		<view style="width: 100%;height: 40px;background-color: red;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: white;">{{status}}</view>
			<u-image style="margin-top: 10px;margin-left: 250px;"
			  :src="hotImage"
			  width="25px"
			  height="25px"
			></u-image>
		</view>
		<view class="addressView">
			<u-image style="border-radius: 15px;margin-top: 12px;margin-left: 15px;"
			  :src="hotImage"
			  width="30px"
			  height="30px"
			></u-image>
			<view style="display: flex;flex-direction: column;width: 75%;margin-left: 10px;margin-top: 10px;">
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 13px;">{{name}}</view>
					<view style="font-size: 13px;margin-left: 30px;">{{phone}}</view>
				</view>
				<view style="font-size: 13px;">{{address}}</view>
			</view>
			
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{hoteName}}</view>
		<!-- <view style="background-color: aliceblue;width: 100%;height: 5px;margin-top: 20px;"></view> -->
		<view class="goodsView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;background-color: aliceblue;">
				<u-image style="margin-top: 10px;margin-left: 15px;"
				  :src="icon"
				  width="80px"
				  height="80px"
				></u-image>
				<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;">
					<view style="display: flex;flex-direction: row;">
						<view style="font-size: 13px;width: 70%;">{{houseName}}</view>
						<view style="font-size: 13px;text-align: right;width: 25%;">￥{{price}}</view>
					</view>
					<view style="font-size: 13px;margin-left: 10px;width: 90%;text-align: right;text-decoration: line-through;color: gray;">￥{{discount}}</view>
					<view style="display: flex;flex-direction: row;margin-top: 10px;">
						<view style="font-size: 13px;">{{specs}}</view>
						<view style="font-size: 13px;margin-left: 100px;text-align: right;width: 100px;">x{{num}}</view>
					</view>
					
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;font-size: 12px;margin-left: 15px;">订单编号:{{ordernum}}</view>
		<view style="margin-top: 10px;font-size: 12px;margin-left: 15px;">下单时间:{{ordertime}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;font-size: 12px;margin-left: 15px;">支付方式:{{paystyle}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;font-size: 12px;margin-left: 15px;">配送方式:{{poststyle}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;font-size: 12px;margin-left: 15px;">发票类型:{{ticketstyle}}</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;font-size: 12px;margin-left: 15px;">买家留言:{{message}}</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;width: 100%;height: 20px;display: flex;flex-direction: row;">
			<view style="font-size: 12px;margin-left: 15px;width: 45%;">商品总额:</view>
			<view style="font-size: 12px;margin-left: 15px;width: 42%;text-align: right;">￥{{total}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 20px;display: flex;flex-direction: row;">
			<view style="font-size: 12px;margin-left: 15px;width: 45%;">运费:</view>
			<view style="font-size: 12px;margin-left: 15px;width: 42%;text-align: right;">￥{{postfee}}</view>
		</view>
		<view style="width: 100%;height: 40px;background-color: aliceblue;margin-top: 10px;">
			<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
			<view style="width: 95%;height: 30px ;text-align: right;font-size: 14px;color: red;">实付款:{{realpay}}</view>
		</view>
		<view class="footer-container">
			<view class="footer-content">
				
				<view class="order-button">删除订单</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const hotImage = ref("/static/home/homestay.png");
	const hoteName = ref('刘霞活鱼');
	const name = ref("收货人:李强");
	const phone = ref("15689288001");
	const address = ref("山西省 晋中市 和顺县1230号");
	
	const status = ref('已取消');
	const icon = ref('/static/home/homestay.png');
	const houseName = ref('创意结婚礼物浪漫新婚礼品个性情侣摆件');
	const price = ref('32.00');
	const deadline = ref('2025.01.19-2025.01.20');
	const num = ref('2');
	const specs = ref('30x20cm');
	const goodsnum = ref('2');
	const total = ref('36.00');
	const discount = ref('36.00');
	const ordernum = ref('202515478545123');
	const ordertime = ref('2025-3-17 12:01:12');
	const paystyle = ref('在线支付');
	const poststyle = ref('快递');
	const ticketstyle = ref('普票');
	const message = ref('');
	const postfee = ref('4.00');
	const realpay = ref('36.00');

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
	 .goodsView{
	 			  display: flex;
	 			  flex-direction: row;
	 			  margin-top: 10px;
	 			  background-color: white;
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
	 .order-button {
	 			 
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center;     /* 垂直居中 */
		height: 20px;           /* 需要设置高度 */
		width: 60px;
		margin-top: 15px;
		margin-left: 300px;
		margin-right: 15px;
	 	font-size: 12px;
	 	color: white;
		border-radius: 5px;
	 	background-color: red;
	 }
    }
</style>