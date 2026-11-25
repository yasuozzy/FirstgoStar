<template>
    <view class="main">
        <u-navbar
          title="详情"
          @rightClick="rightClick"
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
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">房号</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.house_name}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款事由</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" :value="dataDict.reason" disabled="true">
		</textarea>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">状态</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: #2A9595;">{{dataDict.statusFlag}}</view>
		</view>
		<view v-if="dataDict.statusFlag === '待支付'" class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款金额</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.amount}}元</view>
		</view>
		<view v-if="dataDict.statusFlag === '待支付'" style="font-size: 14px;margin-top: 15px;margin-left: 15px;">签字</view>
		<view v-if="dataDict.statusFlag === '待支付'" style="margin-top: 10px;margin-left: 15px;">
			<u-image
			  :src="dataDict.sign_pic"
			  width="330px"
			  height="100px"
			></u-image>
		</view>
		
		<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">图片</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList" :key="index" @click="open(index)">
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
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceCancelMoneyDet } from '@/api/service';

const bgColor = ref("#2A9595");
const DataParam = ref({ id: '' });
const dataDict = ref<any>({});
const imageList = ref<any[]>([]);
const show = ref(false);
const current = ref(0);
const startX = ref(0);
const moveX = ref(0);

const slideStyle = computed(() => {
	return {
		transform: `translateX(-${current.value * 100}%)`
	};
});

onLoad((options: any) => {
	DataParam.value.id = options.id || '';
	init();
});

const init = () => {
	try {
		serviceCancelMoneyDet(DataParam.value).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			if (res.result && res.result.pic_path) {
				imageList.value = res.result.pic_path.split(',');
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const open = (index: number) => {
	current.value = index;
	show.value = true;
};

const close = () => {
	show.value = false;
};

const touchStart = (e: any) => {
	startX.value = e.touches[0].clientX;
};

const touchMove = (e: any) => {
	moveX.value = e.touches[0].clientX;
};

const touchEnd = () => {
	const diff = startX.value - moveX.value;
	if (Math.abs(diff) > 50) {
		if (diff > 0 && current.value < imageList.value.length - 1) {
			current.value++;
		} else if (diff < 0 && current.value > 0) {
			current.value--;
		}
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
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
 .formView{
 	display: flex;
 	flex-direction: row;
 	width: 100%;
 	height: 40px;
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