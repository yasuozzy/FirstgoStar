<template>
    <view class="main">
        <u-navbar
          title="审批详情"
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属公司</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;;">{{dataDict.eastName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属部门</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.deptName}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批类型</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 62%;">{{dataDict.applyTypeName}}</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 15%;color: #2A9595;">{{dataDict.statusName}}</view>
		</view>
		
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批内容</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.content}}</view>
		</view>
		
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批详情</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.details}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view v-if="extras.applyType == '2'" style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请款科目</view>
			<view v-if="extras.applyType == '3'" style="margin-left: 15px;margin-top: 10px;font-size: 12px;">报销科目</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.total}}元</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view v-if="extras.applyType == '2'" style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请款金额</view>
			<view v-if="extras.applyType == '3'" style="margin-left: 15px;margin-top: 10px;font-size: 12px;">报销金额</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{subjectValue}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 35px;font-size: 12px;color: dimgray;">图片</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 70%;display: flex;flex-direction: row;">
				<view class="picViewItem" v-for="(item,index) in picImgs" :key="index">
					<u-image style="margin-top: 10px;"
					  :src="item"
					  width="40px"
					  height="40px"
					></u-image>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="width: 100%;height: 120px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u-image style="margin-top: 10px;margin-left: 13px;"
				  :src="dataDict.headImage"
				  width="20px"
				  height="20px"
				></u-image>
				<view style="margin-left: 20px;width: 1px;height: 100px;background-color: lightgray;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 40%;">发起申请</view>
					<view style="margin-left: 30px;margin-top: 5px;font-size: 13px;text-align: right;width: 50%;color: darkgray;">{{dataDict.submissionTime}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{faqiName}}</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-top: 10px;margin-left: 10px;">签名:</view>
						<u-image style="margin-top: 5px;margin-left: 10px;"
						  :src="dataDict.signaturepic"
						  mode="scaleToFill"
						  width="150px"
						  height="50px"
						></u-image>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in leaderList" :key="index" style="width: 100%;height: 120px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u-image style="margin-top: 10px;margin-left: 13px;"
				  :src="item.headImage"
				  width="20px"
				  height="20px"
				></u-image>
				<view style="margin-left: 20px;width: 1px;height: 100px;background-color: lightgray;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view v-if="item.status == 0" style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 40%;">{{item.username}}(待审核)</view>
					<view v-if="item.status == 1" style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 40%;">{{item.username}}(同意)</view>
					<view v-if="item.status == 2" style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 40%;">{{item.username}}(拒绝)</view>
					<view style="margin-left: 30px;margin-top: 5px;font-size: 13px;text-align: right;width: 50%;">{{item.approvalTime}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{item.reasons}}</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-top: 10px;margin-left: 10px;">签名</view>
					<u-image style="margin-top: 5px;margin-left: 10px;"
					  :src="item.signaturepic"
					  mode="scaleToFill"
					  width="150px"
					  height="50px"
					></u-image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u-image style="margin-top: 10px;margin-left: 13px;"
				  :src="tongzhiImage"
				  mode="scaleToFill"
				  width="15px"
				  height="15px"
				></u-image>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view v-if="senderList.length > 0" style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 60%;">已抄送{{senderList.length}}人</view>
					<view v-if="senderList.length == 0" style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 60%;">未抄送</view>
				</view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(item, index) in senderList"
					  :key="index"
					>
					  <u-image
						:src="item.headImage"
						width="20px"
						height="20px"
					  ></u-image>
					  <view class="item_text">{{ item.username }}</view>
					</view>
				</view>
				
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 20px;"></view>
		<view v-if="auditMap != null">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">财务审核</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
				<view style="margin-left: 15px;font-size: 13px;">审核金额</view>
				<view style="margin-left: 15px;font-size: 13px;">{{auditMap.audit_amount}}</view>
			</view>
			<view style="width: 100%;height: 0.5px;background-color: lightgray;margin-top: 20px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
				<view style="margin-left: 15px;font-size: 13px;">审核时间</view>
				<view style="margin-left: 15px;font-size: 13px;">{{auditMap.audit_time}}</view>
			</view>
			<view style="width: 100%;height: 0.5px;background-color: lightgray;margin-top: 20px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
				<view style="margin-left: 15px;font-size: 13px;">审核意见</view>
				<view style="margin-left: 15px;font-size: 13px;">{{auditMap.audit_reason}}</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 20px;"></view>
		</view>
		<view v-if="recheckMap != null">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">财务复核</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
				<view style="margin-left: 15px;font-size: 13px;">复核时间</view>
				<view style="margin-left: 15px;font-size: 13px;">{{recheckMap.recheck_time}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 20px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
				<view style="margin-left: 15px;font-size: 13px;">审核意见</view>
				<view style="margin-left: 15px;font-size: 13px;">{{recheckMap.recheck_reason}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 20px;"></view>
			<view style="width: 100%;height: 100px;margin-top: 10px;margin-bottom: 20px;">
				<image style="margin-left: 10px;width: 340px;height: 80px;" :src="recheckMap.recheck_sign_pic"></image>
			</view>
			<view style="width: 100%;height: 50px;background-color: white;"></view>
		</view>
		<view v-if="dataDict.auditStatus == 2" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="controllClick()">拨款</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineServiceQingKuanDetail,MineServiceBaoXiaoDetail,MineServiceBaoXiaoControllMoney} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const icon = ref('/static/home/homestay.png');
	const subjectValue = ref('');
	const picImgs = ref([]);
	const image = ref('/static/home/homestay.png');
	const ItemData = ref({});
	const extras = ref({});
	const dataDict = ref({});
	const faqiName = ref('');
	const leaderList = ref([]);
	const auditMap = ref({});
	const recheckMap = ref({});
	const tongzhiImage = ref('/static/mine/tongzhiImage.png');
	const senderList = ref([]);
            
	onLoad((options:any) => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse(ItemData.value.extras);
		console.log(ItemData.value);
		console.log(extras.value);
		faqiName.value = storage.getRealName();
		console.log(extras.value.applyType);
		if (ItemData.value.code === 'GENERAN_APPROVAL_FIN_AUDITPASS') {
			
			loadQingKuanData();
					
		}else if (ItemData.value.code === 'GENERAL_APPROVAL_AUDIT_AUTHPUSH') {
			
			loadBaoXiaoData();
		}
	});
            
const loadQingKuanData = async() => {
		
		try {
			
			let param = {
				
				id:extras.value.id,
				
				
			};
			const res = await MineServiceQingKuanDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			const subjectList = res.result.subjectList;
			
			for (var index = 0; index < subjectList.length; index++) {
				var element = subjectList[index];
				const amount = element.amount + '元';
				subjectValue.value = subjectValue + element.subject + amount;
			}
			picImgs.value = res.result.picImgs;
			leaderList.value = res.result.leaderList;
			auditMap.value = res.result.auditMap;
			recheckMap.value = res.result.recheckMap;
			console.log(recheckMap);
			senderList.value = res.result.senderList;
			
		}catch (error) {
			console.log(error)
		}
	};
	const loadBaoXiaoData = async() => {
		
		try {
			
			let param = {
				
				id:extras.value.id,
				
			};
			const res = await MineServiceBaoXiaoDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			const subjectList = res.result.subjectList;
			
			for (var index = 0; index < subjectList.length; index++) {
				var element = subjectList[index];
				const amount = element.amount + '元';
				subjectValue.value = subjectValue + element.subject + amount;
			}
			picImgs.value = res.result.picImgs;
			leaderList.value = res.result.leaderList;
			auditMap.value = res.result.auditMap;
			recheckMap.value = res.result.recheckMap;
			senderList.value = res.result.senderList;
			
		}catch (error) {
			console.log(error)
		}
	};
	const controllClick = async() => {
		
		try {
			
			let param = {
				
				rec_id:extras.value.id,
				
				
			};
			const res = await MineServiceBaoXiaoControllMoney(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
				
		   
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
	 .picViewItem{
		 display: flex;
		 flex-direction: row;
	 }
	 .itemview{
	 	display: flex;
	 	flex-direction: row;
	 	flex-wrap: wrap; /* 允许换行 */
	 	margin-bottom: 10px;
	 	.situation_item {
	 	  width: 25%;
	 	  font-size: 12px;
	 	  color: #000;
	 	  margin-top: 15px;
	 	  box-sizing: border-box;
	 	  display: flex;
	 	  flex-direction: column;
	 	  align-items: center;
	 	  height: 65upx;
	 			margin-bottom: 30px;
	 			.item_text{
	 				margin-top: 8px;
					font-size: 11px;
					color: gray;
	 			}
	 	}
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