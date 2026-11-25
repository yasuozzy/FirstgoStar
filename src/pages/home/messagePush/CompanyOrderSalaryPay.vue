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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">单位名称</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.company}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工时间</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_time}}</view>
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">派工单位</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">派工单位</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.com_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">派工人员</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.com_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工作时段</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.working_time}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">派遣人员</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;color: gray;width: 70%;" @click="checkPerson()">查看</view>
			<u-image style="margin-top: 15px;"
			  :src="downImage"
			  width="15px"
			  height="10px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<textarea class="textView" disabled="true" :value="nameTitle"></textarea>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 120px;">
			<u-image
			  :src="dataDict.sign_pic_com"
			  mode="scaleToFill"
			  width="340px"
			  height="100px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">派工单位签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 120px;">
			<u-image
			  :src="dataDict.sign_pic_user"
			  mode="scaleToFill"
			  width="340px"
			  height="100px"
			></u-image>
		</view>
		<view class="protocalView">
		    <view style="display: flex;flex-direction: row;width: 100%;">
		    	<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">我已阅读并同意</view>
		    	<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		    </view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;margin-top: 10px;margin-left: 95px;" @click="jixiaoClick()">《{{jixiaoname}}》</view>
		</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 0" class="buttonView" @click="signClick()">{{buttonTitle}}</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 5" class="buttonView" @click="jiesuanClick()">结算</view>
		<view v-if="dataDict.userType == 1 & dataDict.sign_pic_com === '' &dataDict.sign_pic_user === ''" class="buttonView" @click="signClick()">{{buttonTitle}}</view>
		<u-popup :show="kuangshow" @close="close" mode="center" >
		    <view class="popView">
		        <view style="margin-top: 10px;width: 100%;color: blue;font-size: 18px;align-items: center;text-align: center;justify-content: center;" @click="jixiaoShowClick()">《绩效目标确认单》</view>
		        <scroll-view 
					  class="scroll-view" 
					  v-if="viewhidden == 1"
					  scroll-y 
					  :style="{ height: scrollHeight + 'px' }"
					>
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
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">派工单位</view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">派工单位</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.com_name}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">派工人员</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_name}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.com_mobile}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工作时段</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.working_time}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view v-if="nameTitle.length > 0" style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">派遣人员</view>
						<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;color: gray;width: 50%;" @click="checkPerson()">查看</view>
						<u-image style="margin-top: 15px;"
						  :src="downImage"
						  width="15px"
						  height="10px"
						></u-image>
					</view>
					<view v-if="nameTitle.length > 0" style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<textarea v-if="nameTitle.length > 0" class="textView" disabled="true" :value="nameTitle"></textarea>
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
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">派工单位签字</view>
					<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 120px;">
						<u-image
						  :src="dataDict.sign_pic_user"
						  mode="scaleToFill"
						  width="280px"
						  height="100px"
						></u-image>
					</view>
				</scroll-view>
				<view class="backButton" @click="backClick()">返回</view>
			</view>   
		</u-popup>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	import {MineServicePayJieSuanPaiDetail,GetAgreemente,MineJiuYeQunYuanUseWorkerSecondSign} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
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
	const buttonTitle = ref('去签字');
	const signPic = ref('');
	const jixiaoname = ref('绩效事前事中事后管理制度');
	const viewhidden = ref(0);
    const userListArr = ref([]);   
	const kuangshow = ref(false);
	const scrollHeight = ref(0);	
		
		
	
	onLoad((options:any) => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse( ItemData.extras);
		console.log( ItemData.value);
		console.log( extras.value);
		
	});
	onMounted(() => {
		// 获取弹窗可视高度，减去标题和按钮高度
		const sysInfo = uni.getSystemInfoSync();
		scrollHeight.value = sysInfo.windowHeight - 300; // 根据实际调整
		loadData();
		getAgreement();
	});
       
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				id: extras.value.id,
				userType: extras.value.userType,
				
			};
			const res = await MineServicePayJieSuanPaiDetail(param);
							
				console.log(res);
				 dataDict.value = res.result;
				 auditInfo.value = res.result.auditInfo;
				const result = res.result.user_list;
				 userListArr.value = result;                      
				 nameList.value = result.map(item => item.worker_name);
				 nameTitle.value =  nameList.splice(',');
		   
		}catch (error) {
			console.log(error)
		}
	};
	//查看派遣人员
	const checkPerson = () => {
				
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/yuangongList?userListArr=${JSON.stringify( userListArr)}`
		})
	};
	const getAgreement = async() => {
					  
		//我的钱包
		try {
			let param = {
				type:'18',
			};
			const res = await GetAgreemente(param);
				
			console.log(res);
			agreement_name.value = res.result.agreement_name;
			agreement_content.value = res.result.agreement_content;
			
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const agreementClick = () => {
			                
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${18}`
		})
		
	};
	//签字
	const signClick = async() => {
				
		if (buttonTitle.value === '去签字') {
			
			uni.navigateTo({
			  url: "/pages/mine/SignPage/SignPage",
			});
			
		}else if (buttonTitle.value === '提交') {
			
			try {
				let param = {
					
					id: extras.value.id,
					userType: extras.value.userType,
					sign_pic: signPic,
				};
				const res = await MineJiuYeQunYuanUseWorkerSecondSign(param);
					
				console.log(res);
				uni.navigateBack();
				
			} catch (error) {
				console.log(error)
			} 
			
		}
		
	};
	const jixiaoClick = () => {
	                
		// $refs.popup.open('center');
		kuangshow.value = true;
				
	};
	const jixiaoShowClick = () => {
		
		viewhidden.value = 1;
	};
	const backClick = () => {
		
		// $refs.popup.close();
		viewhidden.value = 0;
		close();
	};
	const close = () => {
		  kuangshow.value = false;
	  // console.log('close');
	};

	//结算
	const jiesuanClick = () => {
		uni.navigateTo({
			url:`/pages/mine/financialService/salaryPayPaiWaitJieSuan?extras=${JSON.stringify(extras)}`
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
		 .textView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 height: 80px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		 }
		 .popView{
		                       
		 width: calc(100vw - 60px);
		 max-height: calc(100vh - 100px);
		 background-color: #fff;
		 border-radius: 16px;
		 overflow: hidden;
		 margin-left:30px;
		 align-items: center;
				   
	  }
	  .scroll-view {
		  flex: 1;                     /* 关键：占据剩余高度 */        
		 min-height: 0;        /* 关键：允许收缩 */
		 overflow-y: auto;  /* 关键：允许垂直滚动 */
		 -webkit-overflow-scrolling: touch;  /* iOS平滑滚动 */
		 
		 box-sizing: border-box;
	  }
	  .backButton{
			  
		 flex-shrink: 0;     
		 // margin-left: 6%;
		 margin-bottom: 10px;
		 margin-top: 10px;
		 width: 90%;
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