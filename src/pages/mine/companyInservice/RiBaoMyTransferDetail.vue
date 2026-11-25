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
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 50%;">接收人</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 35%;color: gray;text-align: right;">{{dataDict.forwardTime}}</view>
		</view>
		<view style="width: 100%;margin-top: 10px;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view v-for="(item,index) in userList" :key="index">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImg?item.headImg:normalIcon"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.userName}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 11px;width: 40%;color: darkgray;text-align: right;">{{item.updateTime}}</view>
						</view>
						<view v-if="item.status == 1" style="margin-top: 5px;margin-left: 10px;font-size: 11px;color: #2A9595;">已读</view>
						<view v-if="item.status == 0" style="margin-top: 5px;margin-left: 10px;font-size: 11px;color: #2A9595;">未读</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">回复详情:{{item.replyContent}}</view>
					</view>
					
				</view>
				
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 50%;">{{dataDict.forwardContent}}</view>
		<view v-if="dataDict.forwardContent" style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
			  :src="dataDict.headImg?dataDict.headImg:normalIcon"
			  width="35px"
			  height="35px"
			></u-image>
			<view style="display: flex;flex-direction: column;width: 60%;">
				<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.userName}}的日报</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{dataDict.createTime}}</view>
			</view>
			<view v-if="type == 2" class="transferButton" @click="transferClick">转发</view>
		</view>
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
			<view class="fileView" v-for="(item,index) in fileList" :key="index" @click="checkFileClick(item)">
				<u-image style="margin-top: 10px;margin-left: 15px;"
				  :src="wenjian"
				  width="30px"
				  height="30px"
				></u-image>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.fileName}}</view>
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
	import {MineComInsideDailyReportMyTransferDetail} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const normalIcon = ref('/static/service/normalIcon.png');
	const dataDict = ref({});
	const reportId = ref('');
	const forwardId = ref('');
	const userList = ref([]);
	const imageList = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const wenjian = ref('/static/mine/wenjian.png');
	const fileList = ref([]);
	const readedList = ref([]);
	const replyList = ref([]);
           
	onLoad((options:any) => {
		reportId.value = decodeURIComponent(options.reportId);
		forwardId.value = decodeURIComponent(options.forwardId);
	});
	onMounted(() => {
	  loadData();
	});
        
   const loadData = async() => {
	
		try {
			
			let param = {
				
				reportId:reportId.value,
				forwardId:forwardId.value,
				
			};
			const res = await MineComInsideDailyReportMyTransferDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			userList.value = res.result.userList;
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
	const checkFileClick = (item:any) => {
           
          
	   uni.downloadFile({
		 url: item.filePath,
		 success: function (res) {
		   var filePath = res.tempFilePath;
		   uni.openDocument({
			 filePath: filePath,
			 showMenu: true,
			 success: function (res) {
			   console.log('打开文档成功');
			 }
		   });
		 }
	   });
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
	 .fileView{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 height: 50px;
	 }
    }
</style>