<template>
    <view class="main">
        <u-navbar
          title="工单结算"
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
		<view v-if="dataDict.pay_status == 2" style="color: #2A9595;margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.pay_flag}}</view>
		<view v-if="dataDict.pay_status == 3" style="color: #2A9595;margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.pay_flag}}  事由：{{dataDict.pay_audit_opinion}}</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">结算信息</view>
		<view v-if="auditInfo">
			<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核状态</view>
				<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{auditInfo.statusFlag}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">付款手机号</view>
				<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_mobile}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核总金额</view>
				<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{auditInfo.amount}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核意见</view>
				<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{auditInfo.reason}}</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">审核签字</view>
			<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
				<u-image
				  :src="auditInfo.audit_sign_pic"
				  mode="scaleToFill"
				  width="340px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view v-if="auditInfo == null">
			<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">付款手机号</view>
				<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_mobile}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">结算金额</view>
				<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.total_amt}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;margin-bottom: 15px;">审核明细</view>
		<view style="display: flex;flex-direction: column;width: 100%;min-height: 100vh;background-color: aliceblue;">
			<view class="listItem" v-for="(item,index) in dataDict.detail_list" :key="index" >
				<view style="background-color: white;margin-top: 10px;margin-left: 4%;width: 92%;border-radius: 5px;">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 70%;">{{item.user_name}}</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 20%;text-align: right;">￥{{item.total_amt}}</view>
					</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;margin-bottom: 10px;color: gray;">{{item.user_mobile}}</view>
				</view>
			</view>
		</view>
		<view v-if="dataDict.pay_status == 1" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="bohuibutton" @click="bohuiClick()">驳回</view>
				<view class="buttonView" @click="jiesuanClick()">结算</view>
			</view>
		</view>
		<u-modal :show="show" @confirm="bohuiconfirm" confirmText="确认" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="reason" placeholder="请输入驳回意见" type="text" />
			</view>
		</u-modal>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MessageListPingTaiEmergencyOrderWorkerInfo,
	GetAgreemente,
	MessageListPingTaiEmergencyOrderWorkerRefuse,
	MessageListPingTaiEmergencyOrderWorkerPayMoney} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const ItemData = ref({});
	const extras = ref({});
	const dataDict = ref({});
	const auditInfo = ref({});
	const agreement_name = ref('');
	const agreement_content = ref('');
	const downImage = ref('/static/home/downImage.png');
	const nameList = ref([]);
	const nameTitle = ref('');
	const show = ref(false);
	const title = ref('驳回');
	const reason = ref('');
            
			
	onLoad((options) => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse(ItemData.value.extras);
		console.log(ItemData.value);
		console.log(extras.value);
		
	});
	onMounted(() => {
		loadData();
		
	});
       
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				service_id:extras.value.service_id,
				
				
			};
			const res = await MessageListPingTaiEmergencyOrderWorkerInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			auditInfo.value = res.result.auditInfo;
			const result = res.result.user_list;
										
			nameList.value = result.map(item => item.worker_name);
			nameTitle.value = nameList.value.splice(',');
			
		}catch (error) {
			console.log(error)
		}
	};
			
	//驳回
	const bohuiClick = () => {
				
		show.value = true;
	};
	const cancelClick = () => {
				
		show.value = false;
	};
	const bohuiconfirm = async() => {
				
		if (reason.value.length == 0) {
			
			uni.showToast({
				title:'请输入驳回意见',
				icon:'none'
			})
			return;
		}
		
		try {
			let param = {
				service_id:extras.value.service_id,
				reason:reason.value,
			};
			const res = await MessageListPingTaiEmergencyOrderWorkerRefuse(param);
				
			console.log(res);
			loadData();
			show.value = false;
			
		} catch (error) {
			console.log(error)
		} 
	};
	//结算
	const jiesuanClick = async() => {
				
		try {
			let param = {
				service_id:extras.value.service_id,
				userName:storage.getRealName(),
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
			};
			const res = await MessageListPingTaiEmergencyOrderWorkerPayMoney(param);
				
			console.log(res);
			uni.navigateTo({
				url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}` 
			})
			
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
        .listItem
		{
			display: flex;
			width: 100%;
			background-color: aliceblue;
		}
	    .protocalView{
	          display: flex;
	          flex-direction: row;
	          width: 100%;
	      }
	     
		 .textView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 height: 80px;
			 border: lightgray 1px solid;
			 font-size: 13px;
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
		         .bohuibutton {
		                      
		             display: flex;
		             justify-content: center; /* 水平居中 */
		             align-items: center;     /* 垂直居中 */
		             height: 35px;           /* 需要设置高度 */
		             width: 42%;
		             
		             font-size: 14px;
		             color: white;
		             background-color: #2A9595;
		             border-radius: 6px;
		             margin-left: 4%;
		             margin-top: 15px;
		         }
				 .buttonView{
				           
					  margin-top: 15px;
					  background-color: #2A9595;
					  border-radius: 5px;
					  color: white;
					  font-size: 14px;
					  margin-left: 8%; 
					  display: flex;
					  justify-content: center; /* 水平居中 */
					  align-items: center;     /* 垂直居中 */
					  height: 35px;           /* 需要设置高度 */
					  width: 42%;             /* 需要设置宽度 */
				 }
				 .searchlocation{
				 	 margin-left: 4%;
				 	 width: 92%;
				 	 height: 35px;
				 	 margin-top: 10px;
				 	 border: 1px lightgray solid;
				 	 border-radius: 5px;
				 	 font-size: 13px;
				  }
    }
</style>