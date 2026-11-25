<template>
    <view class="main">
        <u-navbar
          title="选民详情"
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
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">姓名</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">性别</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.sex}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">身份证号</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.id_card}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">电话号码</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.user_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">住址</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.home_address}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">简介</view>
		</view>
		<textarea class="textView" :value="dataDict.introduction" disabled="true" ></textarea>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;font-size: 15px;width: 100px;margin-left: 15px;">证件照</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
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
			  <img v-for="img in imageList" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ imageList.length }}</div>
		</div>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
    import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const imageList = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);

          
	onLoad((options:any) => {
		
		dataDict.value = JSON.parse(options.dataDict);
		console.log( dataDict.value);
		imageList.value =  imageList.value.concat( dataDict.value.photo_path);
		console.log( imageList);
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
            .textView{
            	margin-top: 10px;
            	margin-left: 4%;
            	width: 92%;
            	height: 100px;
            	border: lightgray 1px solid;
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