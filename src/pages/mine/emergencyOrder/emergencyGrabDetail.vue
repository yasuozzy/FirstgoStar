<template>
    <view class="main">
        <u-navbar
          title="工单详情"
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
		<view class="topView">
			<image v-if="dataDict.maintainType == 1"  style="margin-top: 20px;width: 60px;height: 60px;" :src="emergencyOrder"></image>
			<image v-if="dataDict.maintainType == 2"  style="margin-top: 20px;width: 60px;height: 60px;" :src="baoxiuImage"></image>
			<image v-if="dataDict.maintainType == 3 | dataDict.maintainType == 4 | dataDict.maintainType == 5"  style="margin-top: 20px;width: 60px;height: 60px;" :src="publicImage"></image>
			<view v-if="dataDict.maintainType == 1" style="font-size: 13px;margin-top: 10px;">应急</view>
			<view v-if="dataDict.maintainType == 2" style="font-size: 13px;margin-top: 10px;">室内报修</view>
			<view v-if="dataDict.maintainType == 3 | dataDict.maintainType == 4 | dataDict.maintainType == 5" style="font-size: 13px;margin-top: 10px;">公共设施</view>
			<view v-if="dataDict.tache != 1 | dataDict.tache != 2" style="font-size: 20px;margin-top: 10px;">{{dataDict.totalMoney}}</view>
			<view v-if="dataDict.tache == 2 & dataDict.state > 3 & (dataDict.maintainType == 1 | dataDict.maintainType == 2 | dataDict.maintainType == 3)" style="font-size: 20px;margin-top: 10px;">{{dataDict.totalMoney}}</view>
			<view v-if="dataDict.tache == 2 & dataDict.state > 3 & (dataDict.maintainType == 4 | dataDict.maintainType == 5 )" style="font-size: 20px;margin-top: 10px;">{{dataDict.maintainMoney}}</view>
			<view v-if="dataDict.tache == 2 & dataDict.state > 3 & (dataDict.maintainType == 6 | dataDict.maintainType == 7 )" style="font-size: 20px;margin-top: 10px;">{{dataDict.backhanderCount}}</view>
		</view>
		<view style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view v-if="dataDict.tache == 1" class="titleView">当前状态：待处理</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 1" class="titleView">当前状态：已接单</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 2" class="titleView">当前状态：已报价</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 3" class="titleView">当前状态：待支付</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 4" class="titleView">当前状态：维修中</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 5" class="titleView">当前状态：已暂停</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 6" class="titleView">当前状态：已追价</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 7" class="titleView">当前状态：待支付</view>
		<view v-if="dataDict.tache == 3 & dataDict.state == 1" class="titleView">当前状态：待评价</view>
		<view v-if="dataDict.tache == 3 & dataDict.state == 2" class="titleView">当前状态：已申诉</view>
		<view v-if="dataDict.tache == 4" class="titleView">当前状态：已完成</view>
		<view v-if="dataDict.tache == 5" class="titleView">当前状态：已取消</view>
		<view v-if="dataDict.tache == 6" class="titleView">当前状态：工单失败</view>
		<view v-if="dataDict.maintainType == 1" style="width: 100%;display: flex;flex-direction: column;" >
			<view class="titleView">所在房产：{{dataDict.repairIndustry}}</view>
			<view class="titleView">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
			<view class="titleView">应急类型：{{dataDict.repairType}}</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
		</view>
		<view v-if="dataDict.maintainType == 2" style="width: 100%;display: flex;flex-direction: column;" >
			<view class="titleView">报修房产：{{dataDict.repairIndustry}}</view>
			<view class="titleView">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
			<view class="titleView">上门时间：{{dataDict.visitTime}}</view>
			<view class="titleView">报修类型：{{dataDict.repairType}}</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
		</view>
		<view  v-if="dataDict.maintainType == 3 | dataDict.maintainType == 4 | dataDict.maintainType == 5" style="width: 100%;display: flex;flex-direction: column;">
			<view class="titleView">所在房产：{{dataDict.repairIndustry}}</view>
			<view class="titleView">报修业主：{{dataDict.repairPeople}}{{dataDict.phone}}</view>
			<view class="titleView">公共设施：{{dataDict.repairType}}</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
		</view>
		<view style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view class="titleView">图片描述</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view class="titleView">语音描述</view>
		<view v-if="dataDict.tache == 1 & dataDict.state == 1" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="single-button" @click="grabOrder(dataDict)">抢单</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 1 & dataDict.state == 2" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="baojia-button" @click="jiedanClick(dataDict)">接单</view>
				<view class="stop-button" @click="refuseClick(dataDict)">拒绝</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 6 & dataDict.state == 6" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="single-button" @click="refaqi(dataDict)">重新发起</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 1" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="baojia-button" @click="baojiaClick(dataDict)">报价</view>
				<view class="stop-button" @click="stopClick(dataDict)">停止</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 2 | dataDict.state == 3" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="baojia-button" >报价</view>
				<view class="stop-button" @click="stopClick(dataDict)">停止</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 4" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="end-button" @click="endClick(dataDict)">完成</view>
				<view class="pause-button" @click="pauseClick(dataDict)">暂停</view>
				<view class="newstop-button" @click="stopClick(dataDict)">停止</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 4 & dataDict.backhanderCount == 0 & dataDict.maintainType != 3" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="zhuijia-button" @click="zhuijia(dataDict)">完成</view>
				<view class="secondend-button" @click="endClick(dataDict)">完成</view>
				<view class="secondpause-button" @click="pauseClick(dataDict)">暂停</view>
				<view class="secondstop-button" @click="stopClick(dataDict)">停止</view>
			</view>
		</view>
		
		<view v-if="dataDict.tache == 2 & dataDict.state == 5" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="end-button" @click="endClick(dataDict)">完成</view>
				<view class="pause-button" @click="continueClick(dataDict)">继续</view>
				<view class="newstop-button" @click="stopClick(dataDict)">停止</view>
			</view>
		</view>
		<view v-if="dataDict.tache == 2 & dataDict.state == 6 | dataDict.state == 7" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="end-button" @click="endClick(dataDict)">完成</view>
				<view class="pause-button" @click="pauseClick(dataDict)">暂停</view>
				<view class="newstop-button" @click="stopClick(dataDict)">停止</view>
			</view>
		</view>
		<u-modal :show="secondshow" @confirm="confirm" :title="title" confirm-text="提 交" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="explainlocation" v-model="explain"  type="text" />
			</view>
		</u-modal>
		<u-modal :show="thirdshow" @confirm="moneyconfirm" :title="title" confirm-text="提 交" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 18px;">￥</view>
				<input class="explainlocation" v-model="money"  type="text" />
			</view>
		</u-modal>
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
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineGetEmergencyOrderDetail,
	MineGetEmergencyGoGrabOrder,
	MineShareLaoWuOrderDetailAcceptOrRefuseOrder,
	MineShareLaoWuOrderDetailRebuildOrder,
	MineGetEmergencyPauseWorkOrder,
	MineGetEmergencyEndWorkOrder,
	MineGetEmergencyPassWorkOrder,
	MineShareLaoWuOrderDetailContinueOrder,
	MineShareLaoWuOrderDetailFirstAddPriceOrder,
	MineShareLaoWuOrderDetailZhuiAddPriceOrder
	} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const repair_id = ref('');
	const dataDict = ref({});
	const emergencyOrder = ref('/static/mine/emergencyOrder.png');
	const baoxiuImage = ref('/static/mine/indoorRepair.png');
	const publicImage = ref('/static/mine/publicImage.png');
	const show = ref(false);
	const imageList = ref([]);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const secondshow = ref(false);
	const title = ref('');
	const explain = ref('');
	const thirdshow = ref(false);
	const moneytitle = ref('');
	const money = ref('');
           
	onLoad((options:any) => {
		
		repair_id.value = decodeURIComponent(options.repair_id);
	});
	onMounted(() => {
	   loadData();
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
		
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				repairList:repair_id.value,
				
			};
			const res = await MineGetEmergencyOrderDetail(param);
							
			console.log(res);
			dataDict.value = res.result.workOrder;
			imageList.value = res.result.workOrder.picimgs;
				
		   
		}catch (error) {
			console.log(error)
		}
	};
	//抢单
	const grabOrder = async(item:any) => {
				
		try {
			
			let param = {
				
			
				id:storage.getTemporayId(),
				userId:storage.getUserId(),
				repairUserId:item.repairUserId,
				userName:storage.getTemporayName(),
				phone:storage.getPhone(),
				repairList:item.repairList
				
			};
			const res = await MineGetEmergencyGoGrabOrder(param);
							
			console.log(res);
			uni.showToast({
				title:'抢单成功',
				icon:'none'
			});
			loadData();
		
		}catch (error) {
			console.log(error)
		}
	};
	//重新发起
	const refaqi = async(item:any) => {
				
		try {
			
			let param = {
				
			
				id:item.orderRecordId,
				temperyId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairList:item.repairList
				
			};
			const res = await MineShareLaoWuOrderDetailRebuildOrder(param);
							
			console.log(res);
			uni.showToast({
				title:'重新发起成功',
				icon:'none'
			});
			uni.navigateBack();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
			
	//停止
	const stopClick = async(item:any) => {
				
		secondshow.value = true;
		title.value = '停止';
		
	};
	//完成
	const endClick = async(item:any) => {
				
		try {
			
			let param = {
				
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairList:item.repair_id,
				id:item.id,
				
			};
			const res = await MineGetEmergencyPassWorkOrder(param);
							
			console.log(res);
			uni.showToast({
				title:'工单已完成',
				icon:'none'
			});
			uni.navigateBack();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//暂停
	const pauseClick = (item:any) => {
				
		secondshow.value = true;
		title.value = '暂停';
		
		
	};
	const confirm = async() => {
				
		if(explain.value.length == 0){
			
			uni.showToast({
				title:'原因不能为空',
				icon:'none'
			})
			return;
		}
		if(title.value === '暂停'){
			
			try {
				
				let param = {
					
					userId:storage.getTemporayId(),
					userName:storage.getTemporayName(),
					repairList:dataDict.value.repair_id,
					pauseContent:explain.value
					
				};
				const res = await MineGetEmergencyPauseWorkOrder(param);
								
				console.log(res);
				uni.showToast({
					title:'暂停成功',
					icon:'none'
				});
				secondshow.value = false;
				explain.value = '';
				title.value = '';
				uni.navigateBack();
					
				
			}catch (error) {
				console.log(error)
			}
		}else
		{
			try {
				
				let param = {
					
					userId:storage.getTemporayId(),
					userName:storage.getTemporayName(),
					repairList:dataDict.value.repair_id,
					endContent:explain.value,
					id:dataDict.value.id,                
					
				};
				const res = await MineGetEmergencyEndWorkOrder(param);
								
					console.log(res);
					uni.showToast({
						title:'停止成功',
						icon:'none'
					});
					secondshow.value = false;
					explain.value = '';
					title.value = '';
					uni.navigateBack();
					
				
			}catch (error) {
				console.log(error)
			}
		}
		
	};
	//继续
	const continueClick = async(item:any) => {
				// /
		try {
			
			let param = {
				
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairList:item.repairList,
				
			};
			const res = await MineShareLaoWuOrderDetailContinueOrder(param);
							
			console.log(res);
			uni.showToast({
				title:'工单已继续',
				icon:'none'
			});
			loadData();
		   
		}catch (error) {
			console.log(error)
		}
	};
	//接单
	const jiedanClick = async(item:any) => {
				
		try {
			
			let param = {
				
			
				id:item.orderRecordId,
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairId:item.repairList,
				repairState:2,
				
			};
			const res = await MineShareLaoWuOrderDetailAcceptOrRefuseOrder(param);
							
			console.log(res);
			uni.showToast({
				title:'重新发起成功',
				icon:'none'
			});
			uni.navigateBack();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//拒绝
	const refuseClick = async(item:any) => {
				
		try {
			
			let param = {
				
			
				id:item.orderRecordId,
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairId:item.repairList,
				repairState:3,
				
			};
			const res = await MineShareLaoWuOrderDetailAcceptOrRefuseOrder(param);
							
			console.log(res);
			uni.showToast({
				title:'重新发起成功',
				icon:'none'
			});
			uni.navigateBack();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//报价
	const baojiaClick = (item:any) => {
		
		thirdshow.value = true;
		moneytitle.value = '报价';
	};
	//追加
	const zhuijia = (item:any) => {
		
		thirdshow.value = true;
		moneytitle.value = '追加';
	};
	const moneyconfirm = async() => {
				
		if(moneytitle.value === '报价'){
			
			try {
				
				let param = {
					
					userId:storage.getTemporayId(),
					userName:storage.getTemporayName(),
					repairList:dataDict.value.repairList,
					maintainMoney:moneytitle.value,
					maintainType:dataDict.value.maintainType,
					
				};
				const res = await MineShareLaoWuOrderDetailFirstAddPriceOrder(param);
								
				console.log(res);
				uni.showToast({
					title:'报价成功，等待业主同意',
					icon:'none'
				});
				thirdshow.value = false;
				money.value = '';
				moneytitle.value = '';
				uni.navigateBack();
					
				
			}catch (error) {
				console.log(error)
			}
			
		}else
		{
			try {
				
				let param = {
					
					userId:storage.getTemporayId(),
					userName:storage.getTemporayName(),
					repairList:dataDict.value.repairList,
					backhanderMoney:moneytitle.value,
					maintainType:dataDict.value.maintainType,
					backhanderContent:'',
					
				};
				const res = await MineShareLaoWuOrderDetailZhuiAddPriceOrder(param);
								
				console.log(res);
				uni.showToast({
					title:'追加报价成功，等待业主同意',
					icon:'none'
				});
				thirdshow.value = false;
				money.value = '';
				moneytitle.value = '';
				uni.navigateBack();
					
				
			}catch (error) {
				console.log(error)
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
	 .topView{
	 		 display: flex;
	 		 flex-direction: column;
	 		 align-items: center;
	 }
	 .titleView{
	 		 display: flex;
	 		 padding: 15px;
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
		  .single-button {
					   
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
		  .baojia-button{
			  
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
		  .stop-button{
		  			  
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
			  margin-left: 2%;
			  margin-top: 15px;
		  }
		  .end-button{
			  
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 35px;           /* 需要设置高度 */
			  width: 29.33%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
		  .pause-button{
		  			  
		  			  display: flex;
		  			  justify-content: center; /* 水平居中 */
		  			  align-items: center;     /* 垂直居中 */
		  			  height: 35px;           /* 需要设置高度 */
		  			  width: 29.33%;
		  			  margin-right: 10px;
		  			  font-size: 13px;
		  			  color: white;
		  			  background-color: #2A9595;
		  			  border-radius: 6px;
		  			  margin-left: 2%;
		  			  margin-top: 15px;
		  }
		  .newstop-button{
		  			  
		  			  display: flex;
		  			  justify-content: center; /* 水平居中 */
		  			  align-items: center;     /* 垂直居中 */
		  			  height: 35px;           /* 需要设置高度 */
		  			  width: 29.33%;
		  			  margin-right: 10px;
		  			  font-size: 13px;
		  			  color: white;
		  			  background-color: #2A9595;
		  			  border-radius: 6px;
		  			  margin-left: 2%;
		  			  margin-top: 15px;
		  }
		  .explainlocation{
		  		margin-left: 15px;
		  		width: 250px;
		  		height: 30px;
		  		font-size: 13px;
		  		margin-top: 11px;
		  		color: black;
				border-color: lightgray;
				border-left: 1px;
		  		border-radius: 5px;
		  }
		  .zhuijia-button{
			  
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 35px;           /* 需要设置高度 */
			  width: 21.5%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
		  .secondend-button{
		  			  
		  			  display: flex;
		  			  justify-content: center; /* 水平居中 */
		  			  align-items: center;     /* 垂直居中 */
		  			  height: 35px;           /* 需要设置高度 */
		  			  width: 21.5%;
		  			  margin-right: 10px;
		  			  font-size: 13px;
		  			  color: white;
		  			  background-color: #2A9595;
		  			  border-radius: 6px;
		  			  margin-left: 2%;
		  			  margin-top: 15px;
		  }
		  .secondpause-button{
		  			  
		  			  display: flex;
		  			  justify-content: center; /* 水平居中 */
		  			  align-items: center;     /* 垂直居中 */
		  			  height: 35px;           /* 需要设置高度 */
		  			  width: 21.5%;
		  			  margin-right: 10px;
		  			  font-size: 13px;
		  			  color: white;
		  			  background-color: #2A9595;
		  			  border-radius: 6px;
		  			  margin-left: 2%;
		  			  margin-top: 15px;
		  }
		  .secondstop-button{
		  			  
		  			  display: flex;
		  			  justify-content: center; /* 水平居中 */
		  			  align-items: center;     /* 垂直居中 */
		  			  height: 35px;           /* 需要设置高度 */
		  			  width: 21.5%;
		  			  margin-right: 10px;
		  			  font-size: 13px;
		  			  color: white;
		  			  background-color: #2A9595;
		  			  border-radius: 6px;
		  			  margin-left: 2%;
		  			  margin-top: 15px;
		  }
    }
</style>