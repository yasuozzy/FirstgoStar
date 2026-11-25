<template>
    <view class="main">
        <u-navbar
          title="出库审核"
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">审核信息</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核状态</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{auditInfo.statusFlag}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">出库内容</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{auditInfo.out_content}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核意见</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{auditInfo.reason}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">审核签名</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="auditInfo.sign_pic"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view class="addressView" >
			<u-image style="margin-top: 12px;margin-left: 15px;"
			  :src="addressImage"
			  width="20px"
			  height="25px"
			></u-image>
			<view style="display: flex;flex-direction: column;width: 75%;margin-left: 10px;margin-top: 10px;">
				<view style="display: flex;flex-direction: row;">
					<view  style="font-size: 13px;">{{dataDict.userName}}</view>
					<view style="font-size: 13px;margin-left: 30px;">{{dataDict.mobile}}</view>
				</view>
				<view style="font-size: 13px;">{{dataDict.address}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.shopName}} ></view>
		<view class="goodsItem" v-for="(goodItem,goodIndex) in dataDict.orderDetailAry" :key="goodIndex">
			<u-image style="margin-top: 10px;margin-left: 15px;margin-bottom: 10px;"
			  :src="goodItem.img"
			  width="80px"
			  height="80px"
			></u-image>
			<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
				<view style="font-size: 13px;">{{goodItem.name}}</view>	
				<view style="font-size: 13px;text-align: right;width: 100%;">￥{{goodItem.price}}</view>
				<view style="font-size: 13px;text-align: right;width: 100%;">x{{goodItem.nums}}</view>
			</view>
		</view>
		
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;font-size: 13px;color: black;width: 45%;">合计</view>
			<view style="margin-left: 15px;font-size: 14px;width: 42%;text-align: right;">￥{{dataDict.orderPrice}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;font-size: 13px;color: black;margin-top: 10px;">订单信息</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;margin-top: 10px;" >
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">订单编号:{{dataDict.orderNo}}</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">下单时间:{{dataDict.create_time}}</view>
			<view v-if="dataDict.pre_time" style="font-size: 13px;margin-left: 15px;margin-top: 10px;">预约时间:{{dataDict.pre_time}}</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;">支付方式:{{dataDict.paymentType}}</view>
			<view v-if="dataDict.backnote" style="font-size: 13px;margin-left: 15px;margin-top: 10px;">取消原因:{{dataDict.backnote}}</view>
		</view>
		<view v-if="auditInfo.status == 0" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				 <view class="pass-button" @click="tongyiClick">通过</view>
				 <view class="refuse-button" @click="rejectClick">拒绝</view>
			 </view>
		</view>
		<u-modal :show="modelshow" @confirm="handleReason" showCancelButton="true" @cancel="cancel" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="content" placeholder="请输入审核意见"></textarea>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onLoad} from '@dcloudio/uni-app';
	import {MessageListYuFuOrderOutKuShenHeInfo,MessageListYuFuOrderOutKuShenHeRefusePass} from '@/api/mine';
	import eventBus from '@/utils/eventBus';
    
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const addressImage = ref("/static/integral/locationAddress.png");
	const circlecall = ref('/static/mine/circlecall.png');
	const push_id = ref('');
	const dataDict = ref({});
	const auditInfo = ref({});
	const modelshow = ref(false);
	const title = ref('审核操作');
	const content = ref('');
	const type = ref('');
	const signPic = ref('');
           
	onLoad((options:any) => {
		push_id.value = decodeURIComponent(options.push_id);
	});
	onMounted(() => {
	  loadData();
	  eventBus.on('sign_netimg', handleUserUpdate);
	});
	onUnmounted(() => {
	  
	  eventBus.off('sign_netimg', handleUserUpdate);
	});
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				push_id:push_id.value,
				
			};
			const res = await MessageListYuFuOrderOutKuShenHeInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			auditInfo.value = res.result.auditInfo;
			
		}catch (error) {
			console.log(error)
		}
	};
			// toFixed2(value) {
			//       if (value === null || value === undefined) return '0.00'
			//       return Number(value).toFixed(2)
			// },
	//同意
	const tongyiClick = () => {
				
		type.value  = '1';
		if (signPic.value === '') {
			
			uni.showToast({
				title:'请签字',
				icon:'none'
			});
			uni.navigateTo({
			  url: "/pages/mine/SignPage/SignPage",
			});
		
		}else{
			modelshow.value = true;
		}
		
		
	};
	//拒绝
	const rejectClick = () => {
				
				
		type.value  = '2';
		if (signPic.value === '') {
			
			uni.showToast({
				title:'请签字',
				icon:'none'
			});
			uni.navigateTo({
			  url: "/pages/mine/SignPage/SignPage",
			});
		
		}else{
			modelshow.value = true;
		}
	};
	const handleUserUpdate = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signPic.value = data[0];
		console.log( signPic.value);
	  };
	  modelshow.value = true;
	};
	const handleReason = async() => {
				
		if (content.value.length == 0) {
							
			uni.showToast({
				title:'请输入审核意见',
				icon:'none'
			})
			return;
		}
		modelshow.value = false;
		try {
						   
			let param = {
				
				push_id:push_id.value,
				type:type.value,
				reason:content.value,
				sign_pic:signPic.value
				
			};
			const res = await MessageListYuFuOrderOutKuShenHeRefusePass(param);
						   
			console.log(res);
			uni.showToast({
				title:'操作成功'
			});
			loadData();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	const cancel = () => {
		modelshow.value = false;
	};
    const goBack= () => {
                    
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
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
	         .pass-button {
	                      
	             display: flex;
	             justify-content: center; /* 水平居中 */
	             align-items: center;     /* 垂直居中 */
	             height: 35px;           /* 需要设置高度 */
	             width: 35%;
	             font-size: 13px;
	             color: white;
	             background-color: #2A9595;
	             border-radius: 6px;
	             margin-left: 10%;
	             margin-top: 15px;
	         }
	 			 .refuse-button {
	 			              
	 			     display: flex;
	 			     justify-content: center; /* 水平居中 */
	 			     align-items: center;     /* 垂直居中 */
	 			     height: 35px;           /* 需要设置高度 */
	 			     width: 35%;
	 			     font-size: 13px;
	 			     color: white;
	 			     background-color: #2A9595;
	 			     border-radius: 6px;
	 			     margin-left: 10%;
	 			     margin-top: 15px;
	 			 }
    }
</style>