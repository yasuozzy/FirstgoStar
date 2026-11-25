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
		
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">今日完成情况</view>
		<div class="multiline-text">{{ dataDict.todayWork }}</div>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">今日未完成情况</view>
		<div class="multiline-text">{{ dataDict.todayWorkNfinish }}</div>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">明日工作计划</view>
		<div class="multiline-text">{{ dataDict.tomorrowWork }}</div>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">需协调工作</view>
		<div class="multiline-text">{{ dataDict.needCoordinateWork }}</div>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">备注</view>
		<div class="multiline-text">{{ dataDict.remarks }}</div>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">图片</view>
		<view v-if="imageList.length > 0" style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">附件</view>
		<view v-if="fileList.length > 0" style="display: flex;flex-direction: column;width: 100%;">
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
				<view class="order-button" @click="TransferClick()">转发</view>
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
			  <img v-for="img in imageList" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ imageList.length }}</div>
		</div>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideDailyReportMySetUpDetail,
			MineComInsideDailyReportSetUpTransfer} from '@/api/mine';
	
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
		reportId.value = decodeURIComponent(options.reportId);
		type.value = decodeURIComponent(options.type);
	});
            
	const loadData = async() => {
		
		try {
			
			let param = {
				
				reportId:reportId.value,
				type:type.value,
				userId:storage.getUserId(),
			};
			const res = await MineComInsideDailyReportMySetUpDetail(param);
							
				console.log(res);
				dataDict.value = res.result;
				if (res.result.picImgs) {
					imageList.value = res.result.picImgs;
				}
				if (res.result.filesList) {
					fileList.value = res.result.filesList;
				}
			
		}catch (error) {
			console.log(error)
		}
	};
	const selectpersonClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/companyInservice/selectPerson'
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
			if (diff > 0 && current.value < imageList.value.length - 1) {
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
				
				reportId:reportId.value,
				userId:storage.getUserId(),
				forwardReceivers: forwardReceivers.value,
				forwardContent:forwardContent.value,
			};
			const res = await MineComInsideDailyReportSetUpTransfer(param);
							
				console.log(res);
				dataDict.value = res.result;
				if (res.result.picImgs) {
					imageList.value = res.result.picImgs;
				}
				if (res.result.filesList) {
					fileList.value = res.result.filesList;
				}
						
		}catch (error) {
			console.log(error)
		}
		
	};
	const handleRefresh = (data:any) => {
	  console.log('收到刷新事件:', data);
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