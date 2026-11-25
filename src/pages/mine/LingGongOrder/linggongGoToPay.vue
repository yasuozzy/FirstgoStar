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
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">用工单位:</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.company}}</view>
		</view>
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">用工地点:</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.work_location}}</view>
		</view>
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">工    期:</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.work_time}}</view>
		</view>
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">工    种:</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.work_type}}</view>
		</view>
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">结算方式:</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.pay_method}}</view>
		</view>
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">结算金额:</view>
			<input class="searchlocation" v-model="salary" placeholder="请填写" type="text" />
		</view>
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view class="protocalView">
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 20px;">我已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view class="buttonView" @click="payClick()">去结算</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineServicePayJieSuanSetUp} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const agreement_name = ref('');
	const agreement_content = ref('');
	const salary = ref('');
            
	onLoad((options:any) => {
		
		dataDict.value = JSON.parse(options.dataDict);
		console.log(dataDict.value);
	});
	onMounted(() => {
	  init();
	});
        
	const init = async() => {
		
		
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
	const agreementClick = () => {
					
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${18}`
		})
		
	};
	const payClick = async() => {
		
		if (salary.value.length == 0) {
			
			uni.showToast({
				title:'请填写结算金额',
				icon:'none'
			});
			return;
		}else
		{
			try {
				let param = {
					
					id:dataDict.value.id,
					userName:storage.getRealName(),
					mobile:storage.getPhone(),
					osName:"ios",
					hostNo:storage.getHostNo(),
					salary:salary.value,
				};
				MineServicePayJieSuanSetUp(param).then((res) =>{
					
					console.log(res);
					uni.navigateTo({
						   url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
					})
				});
			} catch (error) {
				console.log(error)
			} 
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
         .searchlocation{
			  margin-left: 15px;
			  width: 250px%;
			  height: 30px;
			  margin-top: 10px;
			  font-size: 13px;
		  }
		  .protocalView{
			   display: flex;
			   flex-direction: row;
			   width: 100%;
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