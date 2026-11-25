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
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;color: gray;width: 70%;">查看</view>
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">派工人员签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 120px;">
			<u-image
			  :src="dataDict.sign_pic_user"
			  mode="scaleToFill"
			  width="340px"
			  height="100px"
			></u-image>
		</view>
		<view class="protocalView">
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 0" class="buttonView" @click="signClick()">{{buttonTitle}}</view>
		<view v-if="dataDict.userType == 0 & dataDict.status == 5" class="buttonView" @click="jiesuanClick()">结算</view>
		<view v-if="dataDict.userType == 1 & dataDict.sign_pic_com === '' &dataDict.sign_pic_user === ''" class="buttonView" @click="signClick()">{{buttonTitle}}</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineServicePayJieSuanPaiDetail,GetAgreemente,MineJiuYeQunYuanUseWorkerSecondSign} from '@/api/mine';
	
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
	
            
	onLoad((options:any) => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse(ItemData.value.extras);
		console.log(ItemData.value);
		console.log(extras.value);
		
	});
	onMounted(() => {
		loadData();
		getAgreement();
	});
            
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				id:extras.value.id,
				userType:extras.value.userType,
				
			};
			const res = await MineServicePayJieSuanPaiDetail(param);
							
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
					
					id:extras.value.id,
					userType:extras.value.userType,
					sign_pic:signPic.value,
				};
				const res = await MineJiuYeQunYuanUseWorkerSecondSign(param);
					
					console.log(res);
					uni.navigateBack();
				
			} catch (error) {
				console.log(error)
			} 
			
		}
		
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
		 .textView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 height: 80px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		 }
    }
</style>