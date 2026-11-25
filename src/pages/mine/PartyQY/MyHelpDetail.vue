<template>
    <view class="main">
        <u-navbar
          title="点单详情"
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
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">点单类型</view>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.type}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">姓名</view>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.name}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">手机号</view>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.mobile}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">联系地址</view>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.address}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">点单描述</view>
		</view>
		<view style="margin-top: 10px;margin-left: 3%;font-size: 13px;width: 94%;height: 50px;border: 1px dimgray solid;">{{dataDict.content}}</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">图片描述</view>
		</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">语音描述</view>
		</view>
		<!-- <view v-if="dataDict.evaluate_content" style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 13px;font-size: 15px;">评价</view>
		</view>
		<textarea v-if="dataDict.evaluate_content" class="textView" :value="dataDict.evaluate_content">
		</textarea> -->

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
		<!-- <view v-if="!dataDict.evaluate_content" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<input class="searchlocation" v-model="content" placeholder="输入评价内容..." type="text" />
				<view class="order-button" @click="pingjiaClick()">评价</view>
			</view>
		</view> -->
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MinePartyWangGeEventsHelpEachOtherDetail,MinePartyWangGeEventsHelpEachOtherEvaluate} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const idString = ref('');
	const dataDict = ref({});
	const imageList = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const content = ref(''); //评论内容
            
	
	onLoad((options:any) => {
		
		 idString.value = decodeURIComponent(options.id);
	});
	onMounted(() => {
	   loadDetailData();
	});
       
            
    const loadDetailData = async(item:any) => {
            	
		try {
			
			let param = {
				
				
				id: idString.value,
				
			};
			const res = await MinePartyWangGeEventsHelpEachOtherDetail(param);
							
				console.log(res);
				dataDict.value = res.result;
				const pic = res.result.pic;
				if (pic.length > 0) {
					
					 imageList.value = pic.split(',');
					
				}
			
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//评价
	const pingjiaClick = async() => {
				
		if( content.value.length == 0){
			
			uni.showToast({
				title:'请输入评论内容',
				icon:'none'
			})
			return;
		}
		try {
			
			let param = {
				
				content: content.value,
				id: idString.value,
				
			};
			const res = await MinePartyWangGeEventsHelpEachOtherEvaluate(param);
							
			console.log(res);
			uni.navigateBack();
			
			
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

	const goBack = () => {
		
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
		  .searchlocation{
			   margin-left: 15px;
			   width: 280px;
			   height: 30px;
			   margin-top: 15px;
			   font-size: 13px;
		  }
		  .order-button {
					   
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 50px;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 15px;
			  margin-top: 15px;
		  }
		  .textView{
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  height: 100px;
			  border: lightgray 1px solid;
			  font-size: 13px;
		  }
    }
</style>