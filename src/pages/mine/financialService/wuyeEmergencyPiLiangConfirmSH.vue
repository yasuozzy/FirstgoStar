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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">审核信息</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核状态</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">付款手机号</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核总金额</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.amount}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">应急类型</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.typeFlag}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">维修工</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.rec_user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核意见</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.reason}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核明细</view>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;min-height: 100vh;background-color: aliceblue;">
			<view class="listItem" v-for="(item,index) in dataDict.detail_list" :key="index" @click="detailClick(item)">
				<view style="background-color: white;margin-top: 10px;margin-left: 4%;width: 92%;border-radius: 5px;">
					
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.repair_industry}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: gray;">报修业主：{{item.repair_people}}{{item.repair_phone}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: gray;">报修时间：{{item.repair_time}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: gray;">工单报价：￥{{item.total_amount}}</view>
					<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="margin-top: 10px;font-size: 12px;color: gray;text-align: right;margin-bottom: 10px;width: 95%;">结算金额：￥{{item.amount}}</view>
				</view>
			</view>
		</view>
		<view v-if="dataDict.status == 0" class="footer-container">
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
	import {FinancialServiceWuYeEmergencyPiLiangJieSuanFonfirm,
	FinancialServiceWuYeEmergencyPiLiangJieSuanFonfirmRefusePass,
	MineGetEmergencyOrderDetail} from '@/api/mine';
	import eventBus from '@/utils/eventBus';
	import { onLoad} from '@dcloudio/uni-app';
     // 背景颜色
    const bgColor = ref("#2A9595");
	const push_id = ref('');
	const dataDict = ref({});
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
				
				push_id: push_id.value,
				
			};
			const res = await FinancialServiceWuYeEmergencyPiLiangJieSuanFonfirm(param);
							
			console.log(res);
			dataDict.value = res.result;
				//  auditInfo = res.result.auditInfo;
			
		}catch (error) {
			console.log(error)
		}
	};
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
		if ( signPic.value === '') {
			
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
		    console.log(signPic.value);
		 };
		  modelshow.value = true;
	};
	const handleReason = async() => {
		   	
		if ( content.value.length == 0) {
							
			uni.showToast({
				title:'请输入审核意见',
				icon:'none'
			})
			return;
		}
		modelshow.value = false;
		try {
						   
			let param = {
				
				push_id: push_id.value,
				type: type.value,
				reason: content.value,
				sign_pic: signPic.value
				
			};
			const res = await FinancialServiceWuYeEmergencyPiLiangJieSuanFonfirmRefusePass(param);
						   
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
	//编号，#因为应急详情页面逻辑无法搞清，没有实现详情展示#
	const codeClick = async() => {
			   
		   try {
			   
			let param = {
				
				repairList: dataDict.value.repair_list,
				
			};
			const res = await MineGetEmergencyOrderDetail(param);
							   
			console.log(res);
			uni.navigateTo({
				url:`/pages/home/messagePush/PingTaiHisDetail?repair_id=${encodeURIComponent(dataDict.value.repair_list)}`
			})
				
			  
		   }catch (error) {
			   console.log(error)
		   }
			   
	};
	//审核明细详情
	const detailClick = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/financialService/wuyeEmerGencyPiLiangConfirmDet?repair_list=${item.repair_list}`
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
			}
			.listItem
			{
				display: flex;
				width: 100%;
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