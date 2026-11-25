<template>
    <view class="main">
        <u-navbar
          title="待结算订单"
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
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工单位</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.company}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工地点</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_location}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">兼职人员</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工  期</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_time}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工  种</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_type}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">结算方式</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_method}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">结算金额</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.salary_pay}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="protocalView">
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">我已阅读并同意</view>
				<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
			</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;margin-left: 95px;" @click="SecondAgreementClick()">《{{anotheragreement}}》</view>
		</view>
		
		<view class="buttonView" @click="jiesuanClick()">去结算</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSalaryPay,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkDetail} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const agreement_name = ref('');
	const agreement_content = ref('');
	const extras = ref({});
	const idstring = ref('');
	const userType = ref('');
	const anotheragreement = ref('');
				
            
	onLoad((options:any) => {
		idstring.value = options.id;
		userType.value = options.userType;
		console.log(idstring.value,userType.value);
	});
	onMounted(() => {
		loadData();
		getAgreement();
		getAnoterAgreement();
	});
       
	const loadData = async() => {
		
		try {
			let param = {
				id:idstring.value,
				userType:userType.value,
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkDetail(param).then((res) =>{
				
				console.log(res);
				dataDict.value = res.result;
				
			});
		} catch (error) {
			console.log(error)
		} 
	};
	
	const getAgreement = async() => {
			  
		
		try {
			let param = {
				type:'18',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	//另一个协议
	const getAnoterAgreement = async() => {
		
		try {
			let param = {
				type:'24',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				anotheragreement.value = res.result.agreement_name;
				
			});
		} catch (error) {
			console.log(error)
		} 
	};
	const agreementClick = () => {
					
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${18}`
		})
		
	};
	const SecondAgreementClick = () => {
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${24}`
		})
	};
	//去结算
	const jiesuanClick = () => {
		
		try {
			let param = {
				 id:dataDict.id,
				 userName:storage.getRealName(),
				 mobile:storage.getPhone(),
				 osName:"ios",
				 hostNo:storage.getHostNo(),
				 salary:dataDict.salary_pay
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSalaryPay(param).then((res) =>{
				
				console.log(res);
				uni.navigateTo({
					url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			});
		} catch (error) {
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
	 .protocalView{
	          display: flex;
	          flex-direction: column;
	          width: 100%;
			  align-items: center;
			  text-align: center;
			 
	      }
	      .buttonView{
	               
	              margin-top: 30px;
	              background-color: #2A9595;
	              border-radius: 5px;
	              color: white;
	              font-size: 14px;
	              margin-left: 5%; 
	              display: flex;
	              justify-content: center; /* 水平居中 */
	              align-items: center;     /* 垂直居中 */
	              height: 40px;           /* 需要设置高度 */
	              width: 90%;             /* 需要设置宽度 */
	     }
    }
</style>