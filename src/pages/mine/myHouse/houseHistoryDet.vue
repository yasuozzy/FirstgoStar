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
         	<view slot="left" >
         		<view class="flex">
         			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
         		</view>
         	</view>
         </template>
        </u-navbar>
		<view v-if="type != '社区'">
			<view style="width: 100%;display: flex;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">营业执照</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 25px;font-size: 14px;color: gray;">营业执照编号</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{normaldata.business_no}}</view> 
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 20px;"></view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 25px;font-size: 14px;color: gray;">截止日期</view>
				<view class="dedlineView">{{normaldata.deadline}}</view> 
			</view>
			<view style="display: flex;width: 100%;height: 200px;justify-content: center;align-items: center;margin-top: 10px;">
				<u-image
				  :src="business_pic"
				  width="180px"
				  height="200px"
				></u-image>
			</view>
			
		</view>
		<view style="width: 100%;display: flex;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">房屋租赁合同</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="display: flex;width: 100%;height: 200px;">
			<view class="imageView" v-for="(item,index) in picArr" :key="index" @click="open(index)">
				<u-image 
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
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
			  <img v-for="img in picArr" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ picArr.length }}</div>
		</div>

</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted,computed } from 'vue';
	import {MineHouseTreasureHouseMessageDet} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const hseid = ref('');
	const normaldata = ref({});
	const picArr = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const type = ref('');
	const business_pic = ref('');
          
	onLoad((options:any)  => {
		hseid.value = decodeURIComponent(options.hseid);
		type.value = decodeURIComponent(options.type);
		init();
	});
	
    const init = async() => {
		try {
			
			let param = {
				
				id:hseid.value,
			};
			const res = await MineHouseTreasureHouseMessageDet(param);
							
			console.log(res);
			normaldata.value = res.result;
			business_pic.value = res.result.business_pic;
			const pic = res.result.pic;
			picArr.value = pic.split(',');
			console.log(picArr.value);
			
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
			if (diff > 0 && current.value < picArr.value.length - 1) {
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
	 .dedlineView{
		 margin-top: 10px;
		 margin-left: 15px;
		 font-size: 14px;
		 width: 80px;
		 height: 25px;
		 display: flex;
		 background-color: aliceblue;
		 justify-content: center;
		 align-items: center;
	 }
	 .imageView{
		 width: 60px;
		 height: 80px;
		 margin-top: 20px;
		 margin-left: 25px;
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