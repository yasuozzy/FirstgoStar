<template>
    <view class="main">
        <u-navbar
          title="事件详情"
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
		<view style="display: flex;flex-direction: row;margin-top: 15px;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">当前状态:</view>
			<view v-if="dataDict.tache == 1" style="margin-top: 10px;font-size: 13px;margin-left: 15px;">待处理</view>
			<view v-if="dataDict.tache == 2" style="margin-top: 10px;font-size: 13px;margin-left: 15px;">处理中</view>
			<view v-if="dataDict.tache == 3" style="margin-top: 10px;font-size: 13px;margin-left: 15px;">已完成</view>
			<view v-if="dataDict.tache == 4" style="margin-top: 10px;font-size: 13px;margin-left: 15px;">已完成</view>
			<view v-if="dataDict.tache == 5" style="margin-top: 10px;font-size: 13px;margin-left: 15px;">已取消</view>
			<view v-if="dataDict.tache == 6" style="margin-top: 10px;font-size: 13px;margin-left: 15px;">已退办</view>
		</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">责任单位:</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.dept}}</view>
		</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">网格提交:</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.managerName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">网格位置:</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.repairIndustry}}</view>
		</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">事件类型:</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.repairType}}</view>
		</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">事件位置:</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.location}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">具体描述</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.repairContent}}</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">图片描述</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">语音描述</view>
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
		<view class="footer-container">
			<view v-if="dataDict.tache == 1 || dataDict.tache == 2" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="liandong-button" @click="liandongClick()">联动督办</view>
				<view class="cancel-button" @click="cancelClick()">取消上报</view>
			</view>
			<view v-if="dataDict.tache == 3 || dataDict.tache == 4" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="print-button" @click="printClick()">下载打印</view>
			</view>
			<view v-if="dataDict.tache == 5 || dataDict.tache == 6" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="liandong-button" @click="resetClick()">重新提报</view>
				<view class="cancel-button" @click="deleteClick()">删除</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import {MineGetEmergencyOrderDetail,MinePartyWangGeEventsCancelSetUp,MinePartyWangGeEventsDeleteEvent} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const repairList = ref('');
	const dataDict = ref({});
	const imageList = ref([]);
	const show = ref(false);
	const current  = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
           
	onLoad((options:any) => {
		
		repairList.value = options.repairList;
	});
	onMounted(() => {
	  loadData();
	});
	const slideStyle = computed(() => {
	  return {
	    transform: `translateX(-${current.value * 100}%)`
	  };
	});
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				repairList:repairList.value,
				
			};
			const res = await MineGetEmergencyOrderDetail(param);
							
				console.log(res);
				dataDict.value = res.result.workOrder;
				imageList.value = dataDict.picimgs;
			
		}catch (error) {
			console.log(error)
		}
	};
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
			//联动督办
	const liandongClick = () => {
				
		uni.showToast({
			title:'联动督办成功',
			icon:'none'
		});
	};
			//取消上报
	const cancelClick = () => {
				
				
		uni.showModal({
									
			cancelText:'取消',
			confirmText:'确定',
			confirmColor:'#2A9595',
			title:'提示',
			content:'确定取消上报吗？',
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确定');
					CancelShangBao();
				}else
				{
					console.log('取消')
				}
			}
		});
	};
	const CancelShangBao = async() => {
				
		try {
			
			let param = {
				
				repairList:repairList.value,
				repairUId:storage.getUserId(),
			};
			const res = await MinePartyWangGeEventsCancelSetUp(param);
							
				console.log(res);
				uni.showToast({
					title:'取消成功',
					icon:'none'
				});
				uni.navigateBack();
			
		}catch (error) {
			console.log(error)
		}
	};
	//重新上报
	const resetClick = () => {
		
	};
	//删除
	const deleteClick = () => {
				
		uni.showModal({
									
			cancelText:'取消',
			confirmText:'确定',
			confirmColor:'#2A9595',
			title:'提示',
			content:'确定要删除吗？',
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确定');
					deleteData();
				}else
				{
					console.log('取消')
				}
			}
		});
	};
	const deleteData = async() => {
				
		try {
			
			let param = {
				
				repairList:this.repairList,
				
			};
			const res = await MinePartyWangGeEventsDeleteEvent(param);
							
				console.log(res);
				uni.showToast({
					title:'取消成功',
					icon:'none'
				});
				uni.navigateBack();
			
		}catch (error) {
			console.log(error)
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
	        background: lightgray;
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
		  .print-button {
					   
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 35px;           /* 需要设置高度 */
			  width: 92%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
		  .liandong-button{
			  
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 35px;           /* 需要设置高度 */
			  width: 44%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
		  .cancel-button{
		  			  
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 35px;           /* 需要设置高度 */
			  width: 44%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
		  
    }
</style>