<template>
    <view class="main">
        <u-navbar
          title="第三方兼职信息"
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
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">姓名</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">{{username}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 20%;">技能标签</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;display: flex;flex-wrap: wrap;">
				<view class="labelView" v-for="(item,index) in dataArr">{{item.tallyName}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">技能描述</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">{{dataDict.skillsDescribe}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">服务网点</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">{{dataDict.managerName}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">证件照(身份证正反面以及本人手持身份证各一张)</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">资质证书</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in zizhiList">
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
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareYuanLaoWuOrderThirdDetail,
	MineJiuYeQunShareYuanLaoWuOrderSkilllabels} from '@/api/mine'
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const username = ref('');
	const dataArr = ref([]);
	const imageList = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const zizhiList = ref([]);
            
	onMounted(() => {
		
		username.value = storage.getRealName();
		init();
		getskilllabel();
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
            
	const init = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				Id:storage.getTemporayId(),
				
			};
			MineJiuYeQunShareYuanLaoWuOrderThirdDetail(param).then((res) =>{
							
				console.log(res);
				dataDict.value = res.result;
				imageList.value = res.result.idCardPicImgs;
				zizhiList.value = res.result.certificatePicImgs;
			});
		}catch (error) {
			console.log(error)
		}
	};
	const getskilllabel = async() => {
		
		try {
			
			let param = {};
			MineJiuYeQunShareYuanLaoWuOrderSkilllabels(param).then((res) =>{
							
				console.log(res);
				dataArr.value = res.result;
				
				
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .labelView{
		 border: 1px solid #2A9595;
		 border-radius: 3px;
		 font-size: 12px;
		 color: #2A9595;
		 margin-top: 10px;
		 margin-left: 10px;
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