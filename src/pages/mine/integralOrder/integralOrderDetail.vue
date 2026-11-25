<template>
    <view class="main">
        <u-navbar
          title="订单详情"
          @rightClick="rightClick"
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
		<view style="display: flex;width: 100%;height: 60px;background-color: aliceblue;">
			<view style="display: flex;padding: 20px;font-size: 16px;color: #2A9595;">{{dataDict.orderStatus}}</view>
		</view>
		<view class="addressView">
			<view style="margin-top: 10px;margin-left: 30px;font-size: 13px;">{{dataDict.acceptName}}{{dataDict.mobile}}</view>
			<view style="margin-top: 10px;margin-left: 30px;font-size: 13px;">{{dataDict.regionAddress}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="approval_list">
			<view class="hotel_item">
				<view style="width: 100%;height: 20px;display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-left: 10px;width: 50%;">{{dataDict.shopName}}</view>
					
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<u-image
					:src="orderDict.img"
					width="70px"
					height="70px"
					></u-image>
					<view class="allSpecsView">
			  			<view class="detailsView">
							<view style="display: flex;flex-direction: row;">
								<view style="font-size: 13px;font-weight: bold;width: 50%;">{{orderDict.name}}</view>
								<view style="font-size: 12px;width: 45%;text-align: right;">x{{orderDict.nums}}</view>
							</view>
			  				
			  				<view style="font-size: 13px;margin-top: 5px;">{{orderDict.specs}}</view>
							<view style="display: flex;flex-direction: row;margin-top: 5px;">
								<view v-if="dataDict.goodType == 0 || dataDict.goodType == 1" style="font-size: 13px;">兑换积分:{{orderDict.price}}</view>
								<view v-if="dataDict.goodType == 2" style="font-size: 13px;">充值积分+现金:{{orderDict.price}}</view>
								<view v-if="dataDict.goodType == 3" style="font-size: 13px;">普通积分+现金:{{orderDict.price}}</view>
							</view> 	 
			  			</view>
			  			
			  		</view>
				  
				</view>
			</view>	
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 50px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">订单编号:{{dataDict.orderNo}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">下单时间:{{dataDict.createTime}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">商品总额</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 40%;text-align: right;">{{orderDict.price}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;text-align: right;width: 100%;height: 40px;">
			<view v-if="dataDict.goodType == 0 || dataDict.goodType == 1" class="finalView">实付积分:{{dataDict.realPrice}}</view>
			<view v-if="dataDict.goodType == 2" class="finalView">实付充值积分+现金:{{dataDict.realPrice}}</view>
			<view v-if="dataDict.goodType == 3" class="finalView">实付普通积分+现金:{{dataDict.realPrice}}</view>
		</view>
		<view class="footer-container">
		     <view class="buttonView">
		     	<view v-if="dataDict.orderStatus === '待付款'" style="width: 100%;display: flex;flex-direction: row;">
		     		<view class="firstButton" @click="cancelOrder(dataDict)">取消订单</view>
		     		<view class="secondButton" @click="payMoneyClick(dataDict)">付款</view>
		     	</view>
		     	<view v-if="dataDict.orderStatus === '待发货'" style="width: 100%;display: flex;flex-direction: row;">
		     		<view class="oneButton" @click="remindClick(dataDict)">提醒发货</view>
		     	</view>
		     	<view v-if="dataDict.orderStatus === '已发货'" style="width: 100%;display: flex;flex-direction: row;">
		     		<view class="oneButton" @click="sureOrderClick(dataDict)">确认收货</view>
		     	</view>
		     </view>   
				
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineIntegralOrderDetail,
	MineIntegralOrderRemindSend,
	MineIntegralOrderSureOrder,
	MineIntegralOrderCancelOrder,} from '@/api/mine';
	import {integralGetPayURL} from '@/api/integral';
	import { onLoad} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const orderId = ref('');
	const dataDict = ref({});
	const orderDict = ref({});
            
			
	onLoad((options:any) => {
		orderId.value = options.orderId;
	});
	onMounted(() => {
	  init();
	});
       
    const init = async() => {
				
		try {
			
			let param = {
				
				orderId:orderId.value,
				
			};
			const res = await MineIntegralOrderDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			orderDict.value = res.result.orderDetailAry[0];
			
		}catch (error) {
			console.log(error)
		}
	};
	//付款
	const payMoneyClick = async(item:any) => {
				
		try {
			
			let param = {
				
				orderNos:item.orderNo,
				formExt:"H5",
				payType:"2",
				pageUrl:"",
				userName:storage.getRealName(),
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
				
			};
			const res = await integralGetPayURL(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
			
		}catch (error) {
			console.log(error)
		}
	};
	const remindClick = async(item:any) => {
				
		try {
			
			let param = {
				
				id:item.id,
				
			};
			const res = await MineIntegralOrderRemindSend(param);
							
				console.log(res);
				init();
			
		}catch (error) {
			console.log(error)
		}
	};
			
	const sureOrderClick = async(item:any) => {
				
		try {
			const orderDetailDic = item.orderDetailAry[0];
			let dicts = {
				id:orderDetailDic.id,
				sku:orderDetailDic.sku,
				nums:orderDetailDic.nums,
			};
			const goodsAry = [];
			goodsAry.push(dicts);
			let param = {
				
				orderId:item.orderNo,
				goodsAry:JSON.stringify(goodsAry),
				
			};
			const res = await MineIntegralOrderSureOrder(param);
							
			console.log(res);
			init();
			
		}catch (error) {
			console.log(error)
		}
	};
	//取消订单
	const cancelOrder = async(item:any) => {
				
				
			try {
				
				let param = {
					
					orderId:item.id,
					
				};
				const res = await MineIntegralOrderCancelOrder(param);
								
				console.log(res);
				init();
				
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
		 flex-direction: column;
		 width: 100%;
		 height: 80px;
	 }
	 .approval_list {
	    // background-color: aliceblue;
	    margin-left: 3%;
	    width: 94%;
	    box-sizing: border-box;
	    .hotel_item{
	  	width: 100%;
	  	display: flex;
	  	flex-direction: column;
	  	margin-top: 10px;
	  	background: white;
	  	padding: 10px;
	  	box-sizing: border-box;
	  	margin-bottom: 10px;
	  	border-radius: 10px;
	  	.allSpecsView{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 85%;
	 		 .detailsView{
	 			  margin-left: 10px;
	 			  width: 100%;
	 		 }
	 		 .tagsView{
	 			  width: 100%;
	 			  margin-left: 10px;
	 			  display: flex;
	 			  flex-direction: row;
	 			  margin-top: 3px;
	 			  .roomtag_item{
	 				  
	 				  text-align: center;
	 				  font-size: 12px;
	 			  }
	 		 }
	 		 .ticketsView{
	 			  margin-left: 3%;
	 			  width: 94%;
	 			  .hejiView{
	 				font-size: 12px;
	 				text-align: right;
	 				margin-right: 10px;
	 				margin-top: 5px;
	 				color: #2A9595;
	 			  }	  
	 		 }
			}
		}
	 }
	 .finalView{
		 font-size: 16px;
		 color: #2A9595;
		 
		 align-items: right;
		 display: flex;
		 justify-content: right;
		 width: 95%;
		 height: 40px;
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
	 .buttonView{
		display: flex;
		width: 100%;
		flex-direction: row;
		width: 100%;
		height: 70px;
		.firstButton{
			  margin-top: 20px;
			  background-color: #2A9595;
			  border-radius: 15px;
			  border: #2A9595 1px solid;
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
			margin-top: 20px;
			background-color: #2A9595;
			border: #2A9595 1px solid;
			border-radius: 15px;
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
				 
			 margin-top: 20px;
			 background-color: #2A9595;
			 border: #2A9595 1px solid;
			 border-radius: 15px;
			 color: white;
			 font-size: 14px;
			 margin-left: 270px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 30px;           /* 需要设置高度 */
			 width: 80px;             /* 需要设置宽度 */ 
		}
	 }
    }
</style>