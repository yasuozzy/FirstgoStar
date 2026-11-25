<template>
    <view class="main">
        <u-navbar
          :title="title"
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="font-size: 13px;margin-top: 10px;">用工单位：</view>
			<view style="font-size: 13px;margin-top: 10px;">{{dataDict.workCom}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="font-size: 13px;margin-top: 10px;">用工地点：</view>
			<view style="font-size: 13px;margin-top: 10px;">{{dataDict.location}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="font-size: 13px;margin-top: 10px;">工   期：</view>
			<view style="font-size: 13px;margin-top: 10px;">{{dataDict.time}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="font-size: 13px;margin-top: 10px;">工   种：</view>
			<view style="font-size: 13px;margin-top: 10px;">{{gongzhongStr}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="font-size: 13px;margin-top: 10px;">结算方式：</view>
			<view style="font-size: 13px;margin-top: 10px;">{{dataDict.payType}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view v-if="type == 0" style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
				<view style="font-size: 13px;margin-top: 10px;">村居物业提点：</view>
				<view style="font-size: 13px;margin-top: 10px;">{{dataDict.commission}}</view>
			</view>
			<view v-else style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 15px;margin-top: 10px;color: red;width: 100%;text-align: center;" @click="agreementClick()">《{{agreement_name}}》</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view v-if="type == 0"  style="display: flex;flex-direction: row;width: 100%;">
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view v-if="type == 0" style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view v-if="type == 0 || type == 1" class="footer-container">
			 <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view v-if="type == 0" class="order-button" @click="sureJieDanOrder()">确认接单</view>
				<view v-if="type == 1" class="order-button" @click="sureClick()">完成确认</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderJieDan,
	MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderConfirm} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const title = ref('');
	const dataDict = ref({});
	const type = ref(0);
	const professionlist = ref([]);
	const gongzhongdict = ref({});
	const gongzhongStr = ref('');
	const agreement_name = ref('');
	const selected = ref(false);
				
           
	onLoad((options:any) => {
		
		dataDict.value = JSON.parse(options.dataDict);
		type.value = options.type;
		professionlist.value = dataDict.value.professionlist;
		gongzhongdict.value = professionlist.value[0];
		gongzhongStr.value = gongzhongdict.value.proName + gongzhongdict.value.needNums + gongzhongdict.value.singlePay;
		if (options.type == 1) {
			
			title.value = '待接订单';
		
		}else if (options.type == 2) {
			
			title.value = '待处理订单';
		}
		else if (options.type == 3) {
			
			title.value= '待结算订单';
		}
		else if (options.type == 4) {
			
			title.value = '已完成订单';
		}
	});
	onMounted(() => {
	  getAgreement();
	});
       
	//获取协议
	const getAgreement = () => {
						  
					
		try {
			let param = {
				type:'9',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				// agreement_content = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const sureJieDanOrder = () => {
		
		
		if (selected.value == false) {
			
			uni.showToast({
				title:'请先同意协议！',
				icon:'none'
			})
			return;
		}
		uni.showModal({
									
			cancelText:'取消',
			confirmText:'确认',
			confirmColor:'#2A9595',
			title:'提示',
			content:'是否确认接单？' ,
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确认');
					jiedan();
				}else
				{
					console.log('取消')
				}
			}
		});
	};
	const jiedan = async() => {
		
		try {
			let param = {
				
				id: dataDict.value.id,
				user_id:storage.getUserId(),
			};
			MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderJieDan(param).then((res) =>{
				
				console.log(res);
				if (res.result.confirm == true) {
					
					uni.navigateBack();
					
				}else
				{
					
				}
				
			});
		}  catch (error) {
			console.log(error)
		} 
	};
	const sureClick = async() => {
		
		try {
			let param = {
				
				id: dataDict.value.id,
				user_id:storage.getUserId(),
			};
			MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderConfirm(param).then((res) =>{
				
				console.log(res);
					
				uni.navigateBack();
				
				
			});
		}  catch (error) {
			console.log(error)
		} 
	};
	const chooseselect = () => {
		selected.value = !selected.value;
	};
	const agreementClick = () => {
					
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${9}`
		})
		
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
	 .order-button {
				  
		 display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
		 height: 35px;           /* 需要设置高度 */
		 width: 92%;
		 margin-right: 10px;
		 font-size: 13px;
		 color: white;
		 background-color: #2A9595;
		 border-radius: 6px;
		 margin-left: 4%;
		 margin-top: 15px;
	 }
    }
</style>