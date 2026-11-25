<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 16px;">退款信息</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">退款公司</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{dataDict.com_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">退款金额</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{dataDict.amount}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">退款类型</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{dataDict.refund_type}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">退款事由</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{dataDict.refund_reason}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">操作员</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{dataDict.opt_user}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">状态</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view v-if="dataDict.status != 0" style="display: flex;flex-direction: column;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 16px;">审核信息</view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">审核状态</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{auditInfo.statusFlag}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">审核金额</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{auditInfo.amount}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">审核意见</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;color: dimgray;">{{auditInfo.reason}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: column;width: 100%;margin-top: 10px;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">审核签名</view>
				<u-image style="margin-top: 10px;margin-left: 15px;"
				  :src="auditInfo.audit_sign_pic"
				  mode="scaleToFill"
				  width="340px"
				  height="130px"
				></u-image>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 16px;margin-bottom: 15px;">退款明细</view>
		<view style="width: 100%;display: flex;flex-direction: column;background-color: aliceblue;">
			<view class="itemView" v-for="(item,index) in dataDict.batUserList" :key="index">
				<view style="display: flex;flex-direction: column;width: 80%;">
					<view style="display: flex;margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.hse_name}}</view>
					<view style="display: flex;margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">{{item.user_mobile}}{{item.user_name}}</view>
				</view>
				<view style="display: flex;margin-top: 25px;font-size: 14px;width: 20%;text-align: right;">￥{{item.amount}}</view>
			</view>
		</view>
		<view v-if="dataDict.status == 0" style="width: 100%;height: 80px;background-color: aliceblue;"></view>
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
    import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineFinancialPiLiangShenHe,MineFinancialPiLiangShenHeSetReason} from '@/api/mine';
	
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const ItemData = ref({});
	const extras = ref({});
	const dataDict = ref({});
	const auditInfo = ref({});
	const modelshow = ref(false);
	const title = ref('审核操作');
	const content = ref('');
	const type = ref('');
	const signPic = ref('');
           
	onLoad((options:any) => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse(ItemData.value.extras);
		console.log(ItemData.value);
		console.log(extras.value);
		init();
	});
	onMounted(() => {
	 
	  eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
	  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
      
    const init = async() => {
				
		try {
			
			let param = {
				push_id:extras.value.push_id,
				
			};
			const res = await MineFinancialPiLiangShenHe(param);
				
			console.log(res);
			dataDict.value = res.result;
			auditInfo.value = res.result.auditInfo;
			
				
		} catch (error) {
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
	const handleUpdateData = (data:any) => {
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
				
				push_id:extras.value.push_id,
				type:type.value,
				reason:content.value,
				sign_pic:signPic.value
				
			};
			const res = await MineFinancialPiLiangShenHeSetReason(param);
							   
			console.log(res);
			uni.showToast({
				title:'操作成功'
			});
			init();
				
			
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
	 .itemView{
		 
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 80px;
		 border-radius: 6px;
		 background-color: white;
		 display: flex;
		 flex-direction: row;
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
			 .textAreaView{
			 	 margin-top: 10px;
			 	 margin-left: 4%;
			 	 width: 92%;
			 	 height: 100px;
			 	 border: lightgray 1px solid;
			 	 font-size: 13px;
			 }
    }
</style>