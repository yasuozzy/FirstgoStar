<template>
    <view class="main">
        <u-navbar
          title="评价"
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
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;font-size: 13px;" disabled="true" :value="eva_content"></textarea>
		<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">图片描述</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in eva_picArr"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">满意程度</view>
			<view style="margin-top: 15px;margin-left: 15px;">
				<u-rate :count="count" v-model="satisfy_score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">技术水平</view>
			<view style="margin-top: 15px;margin-left: 15px;">
				<u-rate :count="count" v-model="skill_score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
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
			  <img v-for="img in eva_picArr" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ eva_picArr.length }}</div>
		</div>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCheckJiXiaoBook} from '@/api/mine';
   
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const recId = ref('');
	const eva_content = ref('');
	const satisfy_score = ref('');
	const skill_score = ref('');
	const eva_picArr = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
            
	onLoad((options:any) => {
		
		recId.value = options.id;
	});
	onMounted(() => {
	   init();
	});
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
			if (diff > 0 && current.value < eva_picArr.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
			}
		}
	};
            
	const init = async() => {
		
		try {
			
			let param = {
				
				id:recId.value
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCheckJiXiaoBook(param).then((res) =>{
							
				console.log(res);
				eva_content.value = res.result.eva_content;
				satisfy_score.value = res.result.satisfy_score;
				skill_score.value = res.result.skill_score;
				const pics = res.result.eva_pic;
				eva_picArr.value = pics.split(',');
				
			});
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