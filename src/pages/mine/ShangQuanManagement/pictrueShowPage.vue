<template>
    <view class="main">
        <u-navbar
          :title="navTitle"
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
		 <view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
		   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in pictrueArr"  @click="open(index)">
			   <u-image
				 :src="item"
				 width="60px"
				 height="80px"
			   ></u-image>
		   </view>
		</view>
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
    import {} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const navTitle = ref();
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	
	onLoad((options:any) => {
		navTitle.value = options.navTitle;
		pictrueArr.value = JSON.parse(options.pictrueArr);
	});
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