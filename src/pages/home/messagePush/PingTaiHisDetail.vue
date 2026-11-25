<template>
    <view class="main">
        <u-navbar
          title="历史记录"
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
		<view class="topView">
			<image v-if="dataDict.maintainType == 1"  style="margin-top: 20px;width: 60px;height: 60px;" :src="emergencyOrder"></image>
			<image v-if="dataDict.maintainType == 2"  style="margin-top: 20px;width: 60px;height: 60px;" :src="baoxiuImage"></image>
			<image v-if="dataDict.maintainType == 3 | dataDict.maintainType == 4 | dataDict.maintainType == 5"  style="margin-top: 20px;width: 60px;height: 60px;" :src="publicImage"></image>
			<view v-if="dataDict.maintainType == 1" style="font-size: 13px;margin-top: 10px;">应急</view>
			<view v-if="dataDict.maintainType == 2" style="font-size: 13px;margin-top: 10px;">室内报修</view>
			<view v-if="dataDict.maintainType == 3 | dataDict.maintainType == 4 | dataDict.maintainType == 5" style="font-size: 13px;margin-top: 10px;">公共设施</view>
			<view style="font-size: 20px;margin-top: 10px;">{{dataDict.totalMoney}}</view>
		</view>
		<view style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view class="titleView">当前状态：已完成</view>
		<view class="titleView">维修人员：{{dataDict.userName}}{{dataDict.workerPhone}}</view>
		<view v-if="workOrderEstimate" style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: black;font-size: 13px;">综合评价：</view>
			<view style="margin-top: 10px;margin-left: 15px;">
				<u-rate :value="value" size="22" :active-color="starColor" readonly="true"></u-rate>
			</view>
		</view>
		<view class="titleView">评价内容：{{commentsDetails}}</view>
		<view v-if="imageList.length > 0" class="titleView">图片描述</view>
		<view v-if="imageList.length > 0" style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view v-if="imageList.length > 0" style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view v-if="dataDict.maintainType == 1" style="width: 100%;display: flex;flex-direction: column;" >
			<view class="titleView">所在房产：{{dataDict.repairIndustry}}</view>
			<view class="titleView">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
			<view class="titleView">应急类型：{{dataDict.repairType}}</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;" v-if="dataDict.maintainType == 2">
			<view class="titleView">报修房产：{{dataDict.repairIndustry}}</view>
			<view class="titleView">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
			<view class="titleView">上门时间：{{dataDict.visitTime}}</view>
			<view class="titleView">报修类型：{{dataDict.repairType}}</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;" v-if="dataDict.maintainType == 3 | dataDict.maintainType == 4 | dataDict.maintainType == 5">
			<view class="titleView">所在房产：{{dataDict.repairIndustry}}</view>
			<view class="titleView">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
			<view class="titleView">公共设施：{{dataDict.repairType}}</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
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
	import { ref, reactive, onMounted,computed  } from 'vue';
	import {MineGetEmergencyOrderDetail} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const repair_id = ref('');
	const dataDict = ref({});
	const workOrderEstimate = ref({});
	const emergencyOrder = ref('/static/mine/emergencyOrder.png');
	const baoxiuImage = ref('/static/mine/indoorRepair.png');
	const publicImage = ref('/static/mine/publicImage.png');
	const show = ref(false);
	const imageList = ref([]);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const count = ref(5);
	const value = ref(5);
	const starColor = ref('#FFFF00');
	const commentsDetails = ref('');
				
           
	onLoad((options:any) => {
		
		repair_id.value = decodeURIComponent(options.repair_id);
	});
	onMounted(() => {
		loadData();
	});
		
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				repairList:repair_id.value,
				
			};
			const res = await MineGetEmergencyOrderDetail(param);
							
				console.log(res);
				dataDict.value = res.result.workOrder;
				const OrderEstimate = res.result.workOrderEstimate;
				console.log(OrderEstimate);
				if (OrderEstimate) {
					
					workOrderEstimate.value = OrderEstimate;
					value.value = workOrderEstimate.value.score;
					commentsDetails.value = workOrderEstimate.value.commentsDetails;
					console.log(commentsDetails);
					if(workOrderEstimate.value.commentsPicImgs.length > 0){
						
						imageList.value = workOrderEstimate.commentsPicImgs;
					}
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
	 .topView{
	 		 display: flex;
	 		 flex-direction: column;
	 		 align-items: center;
	 }
	 .titleView{
	 		 display: flex;
	 		 padding: 15px;
	 		 font-size: 13px;
	 }
	 .overlay {
	        position: fixed;
	        top: 0;
	        left: 0;
	        width: 100%;
	        height: 100%;
	        background: black;
	        z-index: 9999;
	      }
	      
	      .swipe-container {
	        width: 100%;
	        height: 100%;
	        overflow: hidden;
	      }
	      
	      .slides {
	        display: flex;
	        width: 100%;
	        height: 100%;
	        transition: transform 0.3s ease;
	      }
	      
	      .slide {
	        width: 100%;
	        height: 100%;
	        object-fit: contain;
	        flex-shrink: 0;
	      }
	      
	      .counter {
	        position: absolute;
	        bottom: 50rpx;
	        left: 50%;
	        transform: translateX(-50%);
	        color: white;
	      }
    }
</style>