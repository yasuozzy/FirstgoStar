<template>
    <view class="main">
        <u-navbar
          title="协议详情"
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">单位名称</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.company}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工时间</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.working_time}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工地点</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_location}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工工种</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_type}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工人数</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_num}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工天数</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_time}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工资薪酬</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.salary}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">结算方式</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_method}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.mobile}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">劳务人员</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">姓名</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">性别</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_sex}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工作时段</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.period}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic_com"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">劳务人员签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic_user"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view class="protocalView">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">我已阅读并同意</view>
				<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
			</view>
			<view v-if="type == 1" style="display: flex;flex-direction: column;">
				<view  style="font-size: 12px;color: royalblue;margin-top: 13px;margin-left: 95px;" @click="SecondAgreementClick()">《{{anotheragreement}}》</view>
				<view  style="font-size: 12px;color: royalblue;margin-top: 13px;margin-left: 95px;" @click="jixiaoClick()">《{{jixiaoagreement}}》</view>
			</view>
			<view v-if="type == 0" style="font-size: 12px;color: royalblue;margin-top: 13px;margin-left: 95px;" @click="jixiaoClick()">《{{jixiaoagreement}}》</view>
		</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 0" class="buttonView" @click="signClick()">去签字</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 4" class="buttonView" @click="completeOrder()">确认完成</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 5" class="buttonView" @click="jiesuanClick()">去结算</view>
		<view v-if="dataDict.userType == 1 & dataDict.status == 1" class="buttonView" @click="signClick()">去签字</view>
		<view v-if="dataDict.userType == 1 & dataDict.status == 2" class="buttonView" @click="completeOrder()">提交完成</view>
		<uni-popup ref="popupRef" type="center">
			<view class="popView">
				<view style="margin-top: 10px;width: 100%;color: blue;font-size: 18px;text-align: center;" @click="jixiaoShowClick()">《绩效目标确认单》</view>
				<view class="scroll-view" v-if="viewhidden == 1" >
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位</view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">单位名称</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.company}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工时间</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.working_time}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工地点</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_location}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工工种</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_type}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工人数</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_num}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工天数</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_time}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工资薪酬</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.salary}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">结算方式</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_method}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.mobile}}</view>
					</view>
					<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">劳务人员</view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">姓名</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_name}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">性别</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_sex}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_mobile}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工作时段</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.period}}</view>
					</view>
					<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位签字</view>
					<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 120px;">
						<u-image
						  :src="dataDict.sign_pic_com"
						  mode="scaleToFill"
						  width="280px"
						  height="100px"
						></u-image>
					</view>
					<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">劳务人员签字</view>
					<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
						<u-image
						  :src="dataDict.sign_pic_user"
						  mode="scaleToFill"
						  width="280px"
						  height="100px"
						></u-image>
					</view>
					<view class="backButton" @click="backClick()">返回</view>
				</view>
				<view class="backButton" @click="backClick()">返回</view>
			</view>   
		</uni-popup>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkDetail,
	GetAgreemente,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSetUpData,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder} from '@/api/mine';
	
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const ItemData = ref({});
	const extras = ref({});
	const dataDict = ref({});
	const auditInfo = ref({});
	const agreement_name = ref('');
	const agreement_content = ref('');
	const idstring = ref('');
	const userType = ref('');
	const type = ref();
	const buttonTitle = ref('去签字');
	const signPic = ref('');
	const anotheragreement = ref('');
	const jixiaoagreement = ref('绩效事前事中事后管理制度');
	const viewhidden = ref(0);
	const popupRef = ref(null);			
           
	onLoad((options:any) => {
		
		idstring.value = options.id;
		userType.value = options.userType;
		type.value = options.type;
		if (type.value == 1) {
			
			getAnoterAgreement();
		}
	});
	onMounted(() => {
		loadData();
		getAgreement();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
	  
	  eventBus.off("sign_netimg", handleUpdateData);
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
				auditInfo.value = res.result.auditInfo;
				
			});
		}catch (error) {
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
	//签字
	const signClick = () => {
			
		uni.navigateTo({
			url: "/pages/mine/SignPage/SignPage",
		});
		
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signPic.value = data[0];
		console.log( signPic.value);
	  };
	  //获取完签字，直接提交数据
	  confirmData();
	};
	const confirmData = () => {
		
		try {
			let param = {
				
				id:idstring.value,
				userType:userType.value,
				sign_pic:signPic.value,
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSetUpData(param).then((res) =>{
				
				console.log(res);
				uni.navigateBack();
			});
		} catch (error) {
			console.log(error)
		} 
	};
	//结算
	const jiesuanClick = () => {
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeJieSuanOrder?id=${idstring.value}&userType=${userType.value}`
		})
	};
	//确认完成
	const completeOrder = () => {
		
		try {
			let param = {
				
				id:idstring.value,
				userType:userType.value,
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder(param).then((res) =>{
				
				console.log(res);
				loadData();
			});
		} catch (error) {
			console.log(error)
		} 
	};
	const jixiaoClick = () => {
		
		// $refs.popup.open('center');
		popupRef.value?.open();
		
	};
	const jixiaoShowClick = () => {
		
		viewhidden.value = 1;
	};
	const backClick = () => {
		
		// $refs.popup.close();
		popupRef.value?.close();
		viewhidden.value = 0;
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
		 .popView{
		 			 
			width: calc(100vw - 60px);
			max-height: calc(100vh - 200px);
			background-color: #fff;
			border-radius: 16px;
			overflow: hidden;
			margin: 0 30px;
		 			 
		 }
		 .scroll-view {
		 			 
		   width: 100%;
		    max-height: calc(100vh - 230px);
		    overflow-y: auto;  /* 关键：允许垂直滚动 */
		    -webkit-overflow-scrolling: touch;  /* iOS平滑滚动 */
		    padding: 30rpx;
		    box-sizing: border-box;
		 }
		 .backButton{
		 			 
		 			margin-left: 6%;
		 			margin-bottom: 10px;
		 			margin-top: 10px;
		 			width: 88%;
		 			height: 30px;
		 			color: blue;
		 			font-size: 18px;
		 			border: blue solid 1px;
		 			border-radius: 5px;
		 			display: flex;
		 			justify-content: center;
		 			text-align: center;
		 			align-items: center;
		 }
    }
</style>