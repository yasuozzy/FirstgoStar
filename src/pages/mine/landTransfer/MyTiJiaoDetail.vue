<template>
    <view class="main">
        <u-navbar
          title="土地流转"
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
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">状态</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;color: #2A9595;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">提交时间</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.createTime}}</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">联系人姓名</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.name}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.mobile}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">身份证号</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.idCard}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">土地位置</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.location}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">土地面积</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.area}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">议价费用</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.rent}}</view>
		</view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">备注</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 48%;text-align: right;">{{dataDict.remarks}}</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;">证件图片</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
		   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in pictrueArr"  @click="open(index)">
			   <u-image
				 :src="item"
				 width="60px"
				 height="80px"
			   ></u-image>
		   </view>
	    </view>
		<view class="protocalView">
			  <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">已阅读并同意</view>
			  <view style="font-size: 12px;color: royalblue;margin-top: 13px;"  @click="agreementClick">《{{agreement_name}}》</view>
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
    import {MineLandrentGetLandWaitListNotesTiJiaoDetail,GetAgreemente} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const linkId = ref();
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const agreement_name = ref('');
	const agreement_content = ref('');
	
	onLoad((options:any) => {
		linkId.value = options.linkId;
	});
	onMounted(() => {
		getAgreement();
		loadRentDetail();
	});
	const getAgreement = async() => {
			  
		
		try {
			let param = {
				type:'12',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const agreementClick = () => {
		
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${12}`
		})
		
	};
	const loadRentDetail = async() => {
		
		try {
			
			let param = {
				
				id:linkId.value,
				
			};
			const res = await MineLandrentGetLandWaitListNotesTiJiaoDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			pictrueArr.value = res.result.pictures;
			
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
		   .protocalView{
		     display: flex;
		     flex-direction: row;
		     width: 100%;
		    }
}
</style>