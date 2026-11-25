<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="消息"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
		<template #left>
		  <view class="u-nav-slot" slot="left">
			<view class="flex">
				<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
			</view>
		  </view>
		</template>
		</u-navbar>
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">未读</view>
				<view v-else style="color: black;font-size: 15px;">未读</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">已读</view>
				<view  v-else style="color: black;font-size: 15px;">已读</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			
		</view>
		<view class="contentView">
			<view style="width: 94%;margin-left: 3%; display: flex;flex-direction: row;margin-top: 10px;">
				<u-search style="border-width: 1px;border-radius: 5px;width:60%;"
				  placeholder="搜索" 
				  v-model="keyword" 
				  :show-action="false"
				  shape="square"
				  bg-color="#f5f5f5"
				  border-color="#2A9595"
				  
				></u-search>
				<view style="font-size: 13px;text-align: center;align-items: center; display: flex;justify-content: center;">搜索</view>
			</view>
			<view class="contentListView">
				<view class="content_item" v-for="(item,index) in contentList" :key="index" @click="detailClick(item)">
					<view style="text-align: center;font-size: 12px;margin-top: 5px;color: dimgray;">{{item.createtime}}</view>
					<view class="bottomView">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.content}}</view>
						<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;">查看详情 ></view>
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

 <script setup lang="ts">
	import { ref, reactive , onMounted} from 'vue';
	import {homeGetMessage} from '@/api/home';
	import {serviceGetPingTaiHistoryDataDetail} from '@/api/service';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref("1");
	const dataType = ref('0');
	const contentList = ref([]);
	const keyword = ref('');
	const hasMore = ref(true);   // 是否还有更多数据
	const noMore = ref(false);         // 是否没有更多数据了
	const page = ref(1);
	const dataParam = ref({
		
		userId:'',
		type:'',
		page:0,
		size:10,
		searchIndex:'',
	});

	//下拉刷新
	onPullDownRefresh(() => {
				
		// 重置状态
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
	});
	//上拉刷新
	onReachBottom(() => {
				
		if ( ! hasMore.value) {
					
			return
		}
		 page.value += 1;
		 loadData();
	});

	onMounted(() => {
		
		 loadData()
	});
		
	const loadData = async() => {
				
		try {
				
				let param = {
					userId:storage.getUserId(),
					type:dataType.value,
					page:page.value
				};
				
				const res = await homeGetMessage( param);
								
				console.log(res);
				if (page.value === 1) {
											
					contentList.value = res.result;
				}else
				{
					// 正确的数组合并方式
					contentList.value.push(...res.result);
				}
				if (res.result.length === 0) {
					// 没有更多数据了
					hasMore.value = false
					noMore.value = true
					uni.showToast({
						title:'没有更多数据',
						icon:'none'
					})
					return
				}
				 // 如果返回的数据少于每页数量，说明是最后一页
				if (res.result.length < 10) {
					hasMore.value = false
					noMore.value = true
				}
							 
				
			} catch (error) {
				console.log(error)
			}finally {
				uni.stopPullDownRefresh()
			}
		
	};
	const goBack= () => {
			        
		uni.navigateBack()
	};
	//切换segment
	const segment1Click = () => {
				
		type.value = "1";
		dataType.value = '0';
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		 
		loadData();
		
	};
	const segment2Click = () => {
		
		 type.value = "2";
		 dataType.value = '1';
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 
		 loadData();
		
	};
	const detailClick = async(item:any) => {
		//相关文旅详情，先别删除，注释等以后对接口
		// uni.navigateTo({
		// 	url:'/pages/home/messageDetail'
		// })
		const extras = JSON.parse(item.extras);
		console.log(item.code,extras);
		if (item.code == 'BATCH_REFUND_CONFIRM_PAY' ) {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/piliangJieSuanTuiKuan?item=${JSON.stringify(item)}&type=${encodeURIComponent('1')}`
			})
			
		}else if (item.code == 'BATCH_REFUND_NOTICE_WITHAUDIT') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/piliangJieSuanTuiKuan?item=${JSON.stringify(item)}&type=${encodeURIComponent('2')}`
			})
			
		}else if (item.code === 'DAY_JOB_ORDER_PAY_AUDIT_CONFIRM') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/linggongSHDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'DAY_JOB_ORDER_COMPANY_PAY_AUDIT_CONFIRM') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/PaigongSHDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'USER_REFUND_APPLY_WAITPAY_AUDIT') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/CancelMoneyShenDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'TRAN_ACCOUNT_WAIT_AUDIT_CONFIRM') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/TransMoneyShenDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'BATCH_REFUND_WAIT_AUDIT_CONFIRM') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/piliangJieSuanSH?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_PAY_AUDIT_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/partTimeJieSuanSHDet?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'DAY_JOB_ORDER_PAY_CONFIRM_WITHAUDIT') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'DAY_JOB_ORDER_PAY_CONFIRM') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayNoShenDetail?item=${JSON.stringify(item)}`
			})
		}
		else if (item.code === 'DAY_JOB_ORDER_COMPANY_PAY_CONFIRM_WITHAUDIT'  ) {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayPaiDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'DAY_JOB_ORDER_COMPANY_PAY_CONFIRM') {
			
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayPaiDetail?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_PAY_CONFIRM_WITHAUDIT')
		{
			uni.navigateTo({
				url:`/pages/mine/financialService/PartTimeSieSuan?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'PART_TIME_ORD_BATCH_PAY_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/PartTimePiLiangJieSuan?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_PAY_CONFIRM')
		{
			uni.navigateTo({
				url:`/pages/mine/financialService/DayJobPartTimeOrder?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'GENERAN_APPROVAL_FIN_AUDITPASS' || item.code === 'GENERAL_APPROVAL_AUDIT_AUTHPUSH'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/qingkuanBXDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'WORKORDER_ALLOT_ORDER' || item.code === 'WORKORDER_ORDER_RESULT' || item.code === 'WORKORDER_ORDER_RECEIVE' || item.code === 'WORKORDER_ORDER_OVER' || item.code === 'COM_AUTH_WORK_ORDER_WAITPAY') {
			
			
			try {
				
				let param = {
					repairList:extras.repairList,
				};
				const res = await serviceGetPingTaiHistoryDataDetail(param);
					
				console.log(res);
				const result = res.result;
				if(result.workOrder.tache == 1 || result.workOrder.tache == 2){
					
					//1.待处理2.已接单
					uni.navigateTo({
						url:`/pages/home/messagePush/workOrderPushDetail?workOrder=${JSON.stringify(result.workOrder)}` 
					})
					
				}else
				{
					
				}
					
				
			} catch (error) {
				console.log(error)
			}
			
		}else if(item.code === 'DAY_JOB_ORDER_COMPANY_SALARYPAY' || item.code === 'DAY_JOB_ORDER_COMPANY_COMCOMPLETE' || item.code
		 === 'DAY_JOB_ORDER_COMPANY_USERCOMPLETE' || item.code === 'DAY_JOB_ORDER_COMPANY_COMSTOP' || item.code === 
		 'DAY_JOB_ORDER_COMPANY_PAYREMIND' || item.code === 'DAY_JOB_ORDER_COMPANY_COMCOMPLETE' || item.code === 
		 'DAY_JOB_ORDER_COMPANY_USERSTOP' || item.code === 'DAY_JOB_ORDER_COMPANY_USERPAUSE' || item.code === 'DAY_JOB_ORDER_COMPANY_COMPAUSE'
		 || item.code === 'DAY_JOB_ORDER_COMPANY_SALARYPAY' || item.code === 'DAY_JOB_ORDER_COMPANY_COMPANYTOUSER'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/CompanyOrderSalaryPay?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_SHARED_COMPANYTOUSER'){
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/SharePingTai/PingTaiShareUseSendOrderDetail?id=' + extras.id + '&userType=' + extras.userType
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_SEND_COMPANY_SALARYPAY_WORKER'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/SendWorkerJieSuanDone?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'MALL_NEW_ORDBEHALF_PUSH' || item.code === 'MALL_BEHALFORD_REMINDPAY'){
			
			uni.navigateTo({
				url:'/pages/mine/circleOrder/circleDaiFuOrderDetail?orderId=' + extras.orderId 
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_USERCOMPLETE' || item.code === 'DAY_JOB_ORDER_PARTTIME_COMSTOP' || item.code === 
		'DAY_JOB_ORDER_PARTTIME_PAYREMIND' || item.code === 'DAY_JOB_ORDER_PARTTIME_COMCOMPLETE' || item.code === 'DAY_JOB_ORDER_PARTTIME_USERSTOP' || 
		item.code === 'DAY_JOB_ORDER_PARTTIME_USERPAUSE' || item.code === 'DAY_JOB_ORDER_PARTTIME_COMPAUSE' || item.code === 'DAY_JOB_ORDER_PARTTIME_PLATTOUSER'
		|| item.code === 'DAY_JOB_ORDER_PARTTIME_PLATSEND' || item.code === 'DAY_JOB_ORDER_PARTTIME_SALARYPAY' || item.code === 'DAY_JOB_ORDER_PARTTIME_COMPANYTOUSER'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/SendPartTimeOrder?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'MALL_NEW_ORDCOMPUR_PUSH' || item.code === 'MALL_COMPURORD_REMINDPAY'){
			
			uni.navigateTo({
				url:`/pages/mine/circleOrder/circleGongCaiOrderDetail?orderId=${encodeURIComponent(extras.orderId)}` 
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_CUTSALARYPAY'){
				
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeLaoWuOaiQian?userType=${encodeURIComponent(extras.userType)}&type=${encodeURIComponent(extras.type)}`
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_COMCOMPLETE' || item.code === 'DAY_JOB_ORDER_COMPANYTOUSER' || item.code === 'DAY_JOB_ORDER_PLATTOUSER' ||
		item.code === 'DAY_JOB_ORDER_COMPAUSE' || item.code === 'DAY_JOB_ORDER_USERPAUSE' || item.code === 'DAY_JOB_ORDER_COMSTOP' || item.code === 
		'DAY_JOB_ORDER_USERSTOP' || item.code === 'DAY_JOB_ORDER_USERCOMPLETE' || item.code === 'DAY_JOB_ORDER_SALARYPAY' || item.code === 
		'DAY_JOB_ORDER_PAYREMIND' || item.code === 'DAY_JOB_ORDER_PLATSEND'){
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/secondSignOrder?id=${encodeURIComponent(extras.id)}&userType=${encodeURIComponent(extras.userType)}` 
			})
			
		}else if(item.code === 'ADV_ORDER_AFTER_SALE_SERVICE'){
			
			uni.navigateTo({
				url:'/pages/mine/circleOrder/yufuSalebehind'
			})
			
		}else if(item.code === 'SHOP_SALE_AUDIT_NOTICE'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/ShopSaleOutInfo?saleId=${encodeURIComponent(extras.saleId)}`
			})
			
		}else if(item.code === 'DAY_JOB_ORDER_SIGN_SCORE_REC'){
			
			uni.navigateTo({
				url:'/pages/mine/myIntegral/IntegralWorkPointsPage'
			})
			
		}else if(item.code === 'ADV_ORD_OUT_WAIT_AUDIT' || item.code === 'ADV_ORD_OUT_AUDIT_PASS'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/YuFuPayShenHeDet?push_id=${encodeURIComponent(extras.push_id)}`
			})
			
		}else if(item.code === 'WORK_ORDER_PAY_TO_WORKERS_AUDIT_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/PingTaiEmerGencyJieSuan?push_id=${encodeURIComponent(extras.push_id)}`
			})
			
		}else if(item.code === 'WORK_ORDER_PAY_TO_WORKERS_PAY_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/PingTaiEmerGencyWorker?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'WORK_ORD_BATCH_PAY_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/wuyeEmergencyPiLiangSH?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'WORK_ORD_BATCH_PAY_AUDIT_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/wuyeEmergencyPiLiangConfirmSH?push_id=${extras.push_id}`
			})
			
		}else if(item.code === 'PARTY_PROJECT_USER_APPLY' || item.code === 'PARTY_PROJECT_PROGRESS_ADD' || item.code === 'PARTY_PROJECT_AUDIT_RESULT'){
			
			uni.navigateTo({
				url:`/pages/mine/PartyQY/partyProject/MySetUpPartyDetail?project_id=${extras.project_id}`
			})
			
		}else if(item.code === 'PARTY_PROJECT_APPLY_AUDIT'){
			
			uni.navigateTo({
				url:`/pages/mine/PartyQY/partyProject/PartyActivityDetail?project_id=${extras.project_id}`
			})
			
		}else if(item.code === 'PARTY_PROJECT_PROGRESS_AUDIT'){
			
			uni.navigateTo({
				url:`/pages/mine/PartyQY/partyProject/MyJoinPartyDetail?project_id=${extras.project_id}&rec_id=${extras.rec_id}`
			})
			
		}		
			
		
	};
			
		
</script>

<style lang="scss" scoped>
.container {
		height: 100%;
		background-color: aliceblue;
		
		min-height: 100vh;
		width: 100%;
		.flex{
			display: flex;
		}
		.greenHeaderView{
			display: flex;
			flex-direction: row;
			background-color: white;
			width: 100%;
			height: 50px;
			
		}
		.whiteLine{
				 margin-left: 40%;
				 margin-top: 5px;
				 width: 20%;
				 height: 2px;
				 background-color: #2A9595;
		}
		.contentView{
			display: flex;
			flex-direction: column;
			background-color: aliceblue;
			width: 100%;
			
		}
		.contentListView{
			display: flex;
			flex-direction:column;
			width: 100%;
			background-color: aliceblue;
		}
		.content_item{
			display: flex;
			flex-direction: column;
			margin-left: 3%;
			width: 94%;
			border-radius: 5px;
			background-color: aliceblue;
			margin-top: 10px;
		}
		.bottomView{
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 5px;
			background-color: white;
			border-radius: 5px;
		}
}
#app {
  min-height: 100vh;
}
</style>