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
            <view class="u-nav-slot">
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
			<view v-if="dataDict.tache != 1 | dataDict.tache != 2" style="font-size: 20px;margin-top: 10px;">{{dataDict.totalMoney}}</view>
			<view v-if="dataDict.tache == 2 & dataDict.state > 3 & (dataDict.maintainType == 1 | dataDict.maintainType == 2 | dataDict.maintainType == 3)" style="font-size: 20px;margin-top: 10px;">{{dataDict.totalMoney}}</view>
			<view v-if="dataDict.tache == 2 & dataDict.state > 3 & (dataDict.maintainType == 4 | dataDict.maintainType == 5 )" style="font-size: 20px;margin-top: 10px;">{{dataDict.maintainMoney}}</view>
			<view v-if="dataDict.tache == 2 & dataDict.state > 3 & (dataDict.maintainType == 6 | dataDict.maintainType == 7 )" style="font-size: 20px;margin-top: 10px;">{{dataDict.backhanderCount}}</view>
		</view>
		<view style="margin-top: 10px;margin-left: 3%;height: 1px;width: 94%;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">当前状态：已完成</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">维修人员：{{dataDict.userName}}{{dataDict.workerPhone}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;display: flex;flex-direction: row;">
			<view style="height: 30px;font-size: 13px;">综合评价：</view>
			<u-rate style="margin-left: 10px;margin-top: -5px;" :count="count" v-model="score" size="20" active-color="#FFFF00" readonly="true"></u-rate>
		</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">评价内容：{{workOrderEstimate.commentsDetails}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">图片描述</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
		   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in pictrueArr"  @click="open(index)">
			   <u-image
				 :src="item"
				 width="60px"
				 height="80px"
			   ></u-image>
		   </view>
		</view>
		<view style="margin-top: 10px;margin-left: 3%;height: 1px;width: 94%;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">所在房产：{{dataDict.repairIndustry}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">应急类型：{{dataDict.repairType}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">具体描述：{{dataDict.repairContent}}</view>
		
		<div v-if="imageshow" class="overlay" @click="close">
			 <div 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			 >
			<div class="slides" :style="slideStyle">
			  <img v-for="img in pictrueArr" :key="img" :src="img" class="slide">
			</div>
			 </div>
			 <div class="counter">{{ current + 1 }} / {{ pictrueArr.length }}</div>
		</div>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import {MineGetEmergencyOrderDetail} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
	const bgColor = ref("#2A9595");
	const emergencyOrder = ref('/static/mine/emergencyOrder.png');
	const baoxiuImage = ref('/static/mine/indoorRepair.png');
	const publicImage = ref('/static/mine/publicImage.png');
	const repair_list = ref('');
	const dataDict = ref({});
	const workOrderEstimate = ref({});
	const count = ref(5);
	const score = ref();
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	
	onLoad((options:any) => {
		repair_list.value = options.repair_list;
	});
	onMounted(() => {
		
		loadData();
		
	});
	   
	const loadData = async() => {
	        	
		try {
			
			let param = {
				
				repairList:repair_list.value,
				
				
			};
			const res = await MineGetEmergencyOrderDetail(param);
							
			console.log(res);
			dataDict.value = res.result.workOrder;
			workOrderEstimate.value = res.result.workOrderEstimate;
			score.value = workOrderEstimate.value.score;
			pictrueArr.value = workOrderEstimate.value.commentsPicImgs;
			
			
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
		imageshow.value = true;
	};
	const close = () => {
		imageshow.value = false;
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
			if (diff > 0 && current.value < pictrueArr.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
			}
		}
	};
	const goBack = () => {
		uni.navigateBack();
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