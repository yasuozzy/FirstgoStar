<template>
    <view class="main">
        <u-navbar
          title=""
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
        <template #right>
              <view slot="right" @click="yuecarClick()">
				  <view style="font-size: 14px;color: white;">我要约车</view>
              </view>
            </template>
        </u-navbar>
		<view style="margin-top: 40px;font-size: 18px;width: 100%;text-align: center;">等待倒计时</view>
		<view style="margin-top: 40px;font-size: 22px;width: 100%;text-align: center;">{{waitingTime}}</view>
		<view v-if="hidenstatus == 1" style="display: flex;flex-direction: column;width: 100%;">
			<view v-if="strtime > 0" class="buttonView" @click="checkDetail">查看详情</view>
			<view v-if="strtime == 0" class="buttonView" @click="continueWaiting">继续等待</view>
			<view class="buttonView" style="background-color: lightgray;color: black;" @click="cancelCar">取消用车</view>
		</view>
		<view v-if="hidenstatus == 2" style="display: flex;flex-direction: column;width: 100%;">
			<view class="buttonView" @click="checkDetail">查看详情</view>
		</view>
		<u-modal :show="show" @confirm="yuecarconfirm" confirmText="确定" title="您确定是否取消当前用车？" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarCancelsTaxiOrder,
	ServiceShunFengYueCarGetTaxiWorker,
	ServiceShunFengYueCarExtendWaitingTime} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const waitingTime = ref('00:00:00');
	const strtime = ref(0);
	const orderNo = ref();
	const second = ref(0);
	const show = ref(false);
	const hidenstatus = ref(1);
	const orderState = ref('');           // getState 返回的状态
	const waitingTimeList = ref(['3分钟','5分钟','10分钟','20分钟','30分钟']);
	
	let countdownTimer = null;              // 倒计时定时器（1 秒）
	let pollTimer = null;                   // 轮询定时器（3 秒）
	let remainSeconds = 0;                 // 剩余秒数
	
	onLoad((options:any) => {
		
		strtime.value = options.strtime;
		orderNo.value = options.orderNo;
	});
	onMounted(() => {
		
		if(strtime.value*60 === 0){
			
			waitingTime.value = '00:00:00';
			
		}else{
			
			start();
		}
	});
	const formatTime = (totalSeconds) => {
	  const h = Math.floor(totalSeconds / 3600)
	  const m = Math.floor((totalSeconds % 3600) / 60)
	  const s = totalSeconds % 60
	  const pad = (n) => String(n).padStart(2, '0')
	  return `${pad(h)}:${pad(m)}:${pad(s)}`
	}
	
	// ---- 开始倒计时 + 轮询 ----
	const start = () => {
	  stopAll()                                  // 防重复启动
	  remainSeconds = strtime.value * 60
	  waitingTime.value = formatTime(remainSeconds)
	
	  // 1. 倒计时：每秒减 1
	  countdownTimer = setInterval(() => {
	    remainSeconds--
	    if (remainSeconds <= 0) {
	      remainSeconds = 0
	      waitingTime.value = formatTime(0)
	      stopAll()                              // 到点停掉轮询
	      return
	    }
	    waitingTime.value = formatTime(remainSeconds)
	  }, 1000)
	
	  // 2. 轮询：每 3 秒请求一次
	  // getstate()                               // 立刻先请求一次（可选）
	  pollTimer = setInterval(getstate, 3000)
	}
	
	// ---- 停止一切 ----
	const stopAll = () => {
	  clearInterval(countdownTimer); 
	  countdownTimer = null;
	  clearInterval(pollTimer);      
	  pollTimer = null;
	};
	
	onUnmounted(() => {
	  stopAll()                                  // 页面销毁必须清理
	});
	const getstate = async() => {
		
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: orderNo.value
			};
			ServiceShunFengYueCarGetTaxiWorker(param).then((res: any) => {
				
				console.log(res);
				if(res.success == true){
					
					if(res.result.status == 2){
						
						clearInterval(pollTimer);
						pollTimer = null;
						waitingTime.value = '00:00:00';
						uni.showToast({
							title:'订单已取消！',
							icon:'none',
						})
						hidenstatus.value = 0;
						
					}else if(res.result.status == 1){
					
						clearInterval(pollTimer);
						pollTimer = null;
						waitingTime.value = '00:00:00';
						uni.showToast({
							title:'司机已接单！',
							icon:'none',
						})
						hidenstatus.value = 2;
						
					}
					
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none',
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const checkDetail = () => {
		
		
		uni.navigateTo({
		  url: `/pages/service/shunfengCar/carStatusDetail?orderNo=${orderNo.value}`
		});
	};
	const yuecarClick = () => {
		
		uni.navigateTo({
		  url: "/pages/service/shunfengCar/goyueCar"
		});
	};
	const continueWaiting = () => {
		
		uni.showActionSheet({
			itemList: waitingTimeList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				// waitingtime.value = waitingTimeList.value[res.tapIndex];
				if(res.tapIndex == 0){
					
					strtime.value = 3;
					
				}else if(res.tapIndex == 1){
					
					strtime.value = 5;
				}else if(res.tapIndex == 2){
					
					strtime.value = 10;
				}else if(res.tapIndex == 3){
					
					strtime.value = 20;
				}else if(res.tapIndex == 4){
					
					strtime.value = 30;
				}
				yanchangtime();
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const yanchangtime = async() => {
		
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: orderNo.value
			};
			ServiceShunFengYueCarExtendWaitingTime(param).then((res: any) => {
				
				console.log(res);
				if(res.success == true){
					
					uni.showToast({
						title:'用户延长等待时间成功！',
						icon:'none',
					})
					start();
					
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none',
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const cancelCar = () => {
		
		show.value = true;
	};
	
	const cancelClick = () => {
		show.value = false;
	};
	const yuecarconfirm = async() => {
		
		show.value = false;
		//
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: orderNo.value
			};
			ServiceShunFengYueCarCancelsTaxiOrder(param).then((res: any) => {
				
				console.log(res);
				if(res.success == true){
					
					uni.showToast({
						title:'已取消！',
						icon:'none',
					})
					uni.navigateBack()
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none',
					})
				}
				
			});
		} catch (error) {
			console.log(error);
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
	  .buttonView{
	                
	   margin-top: 40px;
	   background-color: #2A9595;
	   border-radius: 5px;
	   color: white;
	   font-size: 14px;
	   margin-left: 5%; 
	   display: flex;
	   justify-content: center; /* 水平居中 */
	   align-items: center;     /* 垂直居中 */
	   height: 40px;           /* 需要设置高度 */
	   width: 90%;             /* 需要设置宽度 */
	  }
}
</style>