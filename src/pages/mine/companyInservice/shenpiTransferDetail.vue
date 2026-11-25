<template>
    <view class="main">
        <u-navbar
          title="转发"
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
		<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;" @click="selectpersonClick()">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">接收人</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{fordringNames}}</view>
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="my_arrow"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view style="width: 100%;height: 110px;display: flex;flex-direction: column;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">转发内容</view>
			<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;font-size: 13px;" v-model="forwardContent" placeholder="请输入转发内容">
			</textarea>
		</view>
		<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
			  :src="dataDict.headImage"
			  width="35px"
			  height="35px"
			></u-image>
			<view style="display: flex;flex-direction: column;">
				<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.applyUserName}}</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;color: #2A9595;">{{dataDict.statusName}}</view>
			</view>
			
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属公司</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;;">{{dataDict.eastName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属部门</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.deptName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批类型</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;">{{dataDict.applyTypeName}}</view>
		</view>
		<view v-if="dataDict.applyType == 4 || dataDict.applyType === '4'">
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假类型</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 63%;">{{dataDict.leaveTypeName}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">开始时间</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.startTime}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">结束时间</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.endTime}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假天数</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.dayNum}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假事由</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.content}}</view>
			</view>
		</view>
		<view v-else>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批内容</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 63%;">{{dataDict.content}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批详情</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.details}}</view>
			</view>
		</view>
		
		<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;">图片</view>
		<view  style="width: 100%;margin-top: 15px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;" v-for="(item,index) in picImgs"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;">附件</view>
		<view  style="display: flex;flex-direction: column;width: 100%;">
			<view class="fileView" v-for="(item,index) in fileList" :key="index">
				<u-image style="margin-top: 10px;margin-left: 15px;"
				  :src="wenjian"
				  width="30px"
				  height="30px"
				></u-image>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.fileName}}</view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="TransferClick()">发送</view>
			</view>
		</view>
		<!-- 查看器 -->
		<div v-if="show" class="overlay" @click="close">
		  <div 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		  >
			<div class="slides" :style="slideStyle">
			  <img v-for="img in picImgs" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ picImgs.length }}</div>
		</div>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {WorkQunYuanCompanyInserviceShenPiNormalDetail,
			CompanyInserviceNormalShenPiTransferUpdate} from '@/api/mine';

	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const reportId = ref('');
	const type = ref<string|number>(0);
	const dataDict = ref({});
	const imageList = ref([]);
	const fileList = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const wenjian = ref('/static/mine/wenjian.png');
	const fordringNames = ref('');
	const my_arrow = ref('/static/service/my_arrow.png');
	const forwardReceivers = ref('');
	const forwardContent = ref('');
	
	const subjectValue = ref('');
	const picImgs = ref([]);
	const faqiName = ref('');
	const leaderList = ref([]);
	const auditMap = ref({});
	const recheckMap = ref({});
	const tongzhiImage = ref('/static/mine/tongzhiImage.png');
	const fileImage = ref('/static/mine/wenjian.png');
	const senderList = ref([]);
	const idstring = ref('');
	const recordId = ref('');
	const userIds = ref('');
	const personList = ref([]);
            
	onMounted(() => {
		loadData();
		// 监听刷新事件
		eventBus.on('refreshPerson-data', handleRefresh)
	});
	  onUnmounted(() => {
		// 清除事件监听
		eventBus.off('refreshPerson-data', handleRefresh)
	});
		
	onLoad((options:any) => {
		idstring.value = options.id;
		recordId.value = options.recordId;
	});
    const loadData = async() => {
    	
    	try {
    		
    		let param = {
    			
    			id:idstring.value,
    			userId:storage.getUserId(),
    			recordId:recordId.value
    		};
    		const res = await WorkQunYuanCompanyInserviceShenPiNormalDetail(param);
    						
    		console.log(res);
    		dataDict.value = res.result;
    		const fullName = dataDict.value.applyUserName;
    		faqiName.value = fullName.replace(/提交的审批$/, '').trim();
    		const subjectList = res.result.subjectList;
    		
    		for (var index = 0; index < subjectList.length; index++) {
    			var element = subjectList[index];
    			const amount = element.amount + '元';
    			subjectValue.value = subjectValue.value + element.subject + amount;
    		}
    		picImgs.value = res.result.picImgs;
    		leaderList.value = res.result.leaderList;
    		auditMap.value = res.result.auditMap;
			fileList.value = res.result.enclosureList;
    		recheckMap.value = res.result.recheckMap;
    		senderList.value = res.result.senderList;
    	   
    	}catch (error) {
    		console.log(error)
    	}
    };        
	
	const selectpersonClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/shenpiChosePerson?applyType=${dataDict.value.applyType}&estId=${dataDict.value.estId}`
		})
		
	};
	const slideStyle = computed(() => {
		  return {
			transform: `translateX(-${current.value * 100}%)`
		  };
		});
	
	const open = (index:any) => {
			current.value = index;
			show.value = true;
	};
	const close = () => {
		show.value = false;
	};    
	const touchStart = (e:any) => {
		startX.value = e.touches[0].clientX;
	};
		
	const touchMove = (e:any) => {
		moveX.value = e.touches[0].clientX;
	};
		
	const touchEnd = () => {
		
		const diff = startX.value - moveX.value
		  
		if (Math.abs(diff) > 50) { // 滑动距离阈值
			if (diff > 0 && current.value < picImgs.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
			}
		}
	};
	//转发
	const TransferClick = async() => {
		
		try {
			
			let param = {
				
				id:idstring.value,
				recordId:dataDict.value.recordId,
				applyUserId:dataDict.value.applyUserId,
				problem:forwardContent.value,
				userId:storage.getUserId(),
				sender: JSON.stringify(personList.value),
				creatorConpanyId:dataDict.value.creatorConpanyId,
				estId:dataDict.value.estId,
				deptId:dataDict.value.deptId
				
			};
			const res = await CompanyInserviceNormalShenPiTransferUpdate(param);
							
				console.log(res);
				uni.showToast({
					title:'转发成功',
					icon:'none'
				})
				uni.navigateBack();
						
		}catch (error) {
			console.log(error)
		}
		
	};
	const handleRefresh = (data:any) => {
	  console.log('收到刷新事件:', data);
	  personList.value = data;
	  // loadData();
	  if (data.length == 1) {
		
		for (var i = 0; i < data.length; i++) {
			var element = data[i];
			fordringNames.value =  element.username;
			forwardReceivers.value = element.leaderUserId;
		}
	  }else
	  {
		  const namelist = [];
		  const idlist = [];
		for (var i = 0; i < data.length; i++) {
			var element = data[i];
			namelist.push(element.username);
			fordringNames.value = namelist.join(',');
			idlist.push(element.leaderUserId);
			forwardReceivers.value = idlist.join(',');
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .multiline-text {
	 		 margin-left: 5%;
	 		 margin-top: 10px;
	 		 width: 90%;
	 		 font-size: 13px;
	 		 color: black;
	   white-space: pre-line; /* 保留换行符，合并空格 */
	   /* 或者使用 white-space: pre-wrap; 保留所有空格和换行 */
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