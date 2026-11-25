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
			<image v-if="dataDict.maintainType == 3 || dataDict.maintainType == 4 || dataDict.maintainType == 5"  style="margin-top: 20px;width: 60px;height: 60px;" :src="publicImage"></image>
			<view v-if="dataDict.maintainType == 1" style="font-size: 13px;margin-top: 10px;">应急</view>
			<view v-if="dataDict.maintainType == 2" style="font-size: 13px;margin-top: 10px;">室内报修</view>
			<view v-if="dataDict.maintainType == 3 || dataDict.maintainType == 4 || dataDict.maintainType == 5" style="font-size: 13px;margin-top: 10px;">公共设施</view>
			<view style="font-size: 20px; margin-top: 10px;">
			    {{ displayMoney }}
			</view>
		</view>
		<view style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view v-if="dataDict.tache == 1" class="titleView">当前状态：待处理</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 1" class="titleView">当前状态：已接单</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 2" class="titleView">当前状态：已报价</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 3" class="titleView">当前状态：待支付</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 4" class="titleView">当前状态：维修中</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 5" class="titleView">当前状态：已暂停</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 6" class="titleView">当前状态：已追价</view>
		<view v-if="dataDict.tache == 2 && dataDict.state == 7" class="titleView">当前状态：待支付</view>
		<view v-if="dataDict.tache == 3 && dataDict.state == 1" class="titleView">当前状态：待评价</view>
		<view v-if="dataDict.tache == 3 && dataDict.state == 2" class="titleView">当前状态：已申诉</view>
		<view v-if="dataDict.tache == 4" class="titleView">当前状态：已完成</view>
		<view v-if="dataDict.tache == 5" class="titleView">当前状态：已取消</view>
		<view v-if="dataDict.tache == 6" class="titleView">当前状态：工单失败</view>
		<view  style="width: 100%;display: flex;flex-direction: column;" >
			<view class="titleView">所在管理处：{{dataDict.managerName}}</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 5px;margin-left: 15px;width: 80%;">报修人电话：{{dataDict.phone}}</view>
				<view style="font-size: 13px;margin-top: 5px;margin-left: 15px;color: #2A9595;" @click="phoneCall(dataDict.phone)">呼叫</view>
			</view>
			<view class="titleView">具体描述：{{dataDict.repairContent}}</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 5px;margin-left: 15px;width: 80%;">维修人员：{{dataDict.userName}}{{dataDict.workerPhone}}</view>
				<view style="font-size: 13px;margin-top: 5px;margin-left: 15px;color: #2A9595;" @click="phoneCall(dataDict.workerPhone)">呼叫</view>
			</view>
			<view class="titleView">接单时间：{{dataDict.takeTime}}</view>
		</view>
		<view v-if="workOrderEstimate && workOrderEstimate.score !== undefined" style="background-color: lightgray;margin-top: 10px;width: 92%;height: 1px;margin-left: 4%;"></view>
		<view v-if="workOrderEstimate && workOrderEstimate.score !== undefined" style="display: flex;width: 100%;flex-direction: column;">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">综合评价:</view>
				<view style="margin-top: 15px;margin-left: 15px;">
					<u-rate :count="count" v-model="workOrderEstimate.score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
				</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">评价内容:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{workOrderEstimate.commentsDetails}}</view>
			</view>
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
		<view style="font-size: 12px;color: royalblue;margin-top: 13px;margin-top: 10px;margin-left: 15px;" @click="jixiaoClick()">《{{jixiaoname}}》</view>
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
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="payClick(dataDict)">去付款(￥{{displayMoney}})</view>
			</view>
		</view>
		<uni-popup ref="popupRef" type="center">
			<view class="popView">
				<view style="margin-top: 10px;width: 100%;color: blue;font-size: 18px;text-align: center;" @click="jixiaoShowClick()">《绩效目标确认单》</view>
				<view class="scroll-view" v-if="viewhidden == 1" >
					<view style="font-size: 13px;margin-top: 5px;margin-left: 15px;width: 80%;">报修房产：{{dataDict.managerName}}</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 80%;">上门时间：{{dataDict.repairTime}}</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 80%;">报修类型：{{dataDict.repairType}}</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 80%;">具体描述：{{dataDict.repairContent}}</view>
					<view style="background-color: lightgray;margin-top: 15px;width: 92%;height: 1px;margin-left: 4%;"></view>
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
				</view>
				<view class="backButton" @click="backClick()">返回</view>
			</view>   
		</uni-popup>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineGetEmergencyOrderDetail,MineWuYeOrderBaoXiuOrderPayTypeOne,
	MineWuYeOrderBaoXiuOrderPayTypeTwo} from '@/api/mine';
	 import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const repair_id = ref('');
	const dataDict = ref({});
	const baoxiuImage = ref('/static/mine/indoorRepair.png');
	const publicImage = ref('/static/mine/publicImage.png');
	const show = ref(false);
	const imageList = ref([]);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
    const workOrderEstimate = ref(null);       
	const count = ref(5);
	const viewhidden = ref(0);
	const popupRef = ref(null); 
	const jixiaoname = ref('绩效事前事中事后管理制度');
			
	onLoad((options:any) => {
				
		const resultData = JSON.parse(options.dataDict);
		dataDict.value = resultData.workOrder;
				
		if(dataDict.value.maintainType !== 3 && dataDict.value.tache === 4){
			
			if(resultData.workOrderEstimate.commentsPicImgs && resultData.workOrderEstimate.commentsPicImgs !== undefined){
				
				imageList.value = resultData.workOrderEstimate.commentsPicImgs;
			}
		}else
		{
			imageList.value = resultData.workOrder.picimgs;
		}
		
		if(resultData.workOrderEstimate && resultData.workOrderEstimate.score !== undefined){
			workOrderEstimate.value =  resultData.workOrderEstimate;
		}	
	});
	// 计算属性：完整复刻 iOS 逻辑
	const displayMoney = computed(() => {
		
	  const dict = dataDict.value;
	 // 防御性处理：如果数据未加载，返回空字符串
	  if (!dict || !dict.tache) return '';
	  const { tache, state, maintainType, totalMoney, backhanderMoney } = dict;
	  let money = '';
	
	  if (tache === 1) {
	    money = '';          // 等价于 iOS 的 @""
	  } else if (tache === 2) {
	    // 1. 基础赋值（根据 state）
	    if (state < 4) {
	      money = '';
	    } else {
	      money = totalMoney;
	    }
	
	    // 2. maintainType 覆盖（即使 state < 4 也会被覆盖）
	    if (maintainType === 4 || maintainType === 5) {
	      money = totalMoney;
	    }
	
	    // 3. state 6/7 最高优先级覆盖
	    if (state === 6 || state === 7) {
	      money = backhanderMoney;
	    }
	  } else {
	    // tache >= 3
	    money = totalMoney;
	  }
	  // 格式化：保留两位小数（仅当 money 是有效数字）
	  if (money !== '' && !isNaN(Number(money))) {
	    return Number(money).toFixed(2);
	  }
	  return money;
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
            
    
	const phoneCall = (number:any) => {
	        
		uni.makePhoneCall({
			phoneNumber:number,
			success: () => {
				
				console.log('拨打电话成功');
				
			  },
			  fail: (error) => {
				  
				console.error('拨打电话失败:', error);
				uni.showToast({
				  title: "拨打电话失败",
				  icon: "none",
				});
			  }
		})
	};	
	//付款
	const payClick = async(item:any) => {
		
		if(item.payType === 1){
			
			try {
				
				let param = {
					hostNo:storage.getHostNo(),
					cstType:storage.getCstType(),
					userId:storage.getUserId(),
					mobile:item.phone,
					repairList:item.repairList,
					id:item.id
					
				};
				const res = await MineWuYeOrderBaoXiuOrderPayTypeOne(param);
								
				console.log(res);
				uni.navigateTo({
				       url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			}catch (error) {
				console.log(error)
			}
			
		}else if(item.payType === 2){
			
			try {
				
				let param = {
					hostNo:storage.getHostNo(),
					cstType:storage.getCstType(),
					userId:storage.getUserId(),
					mobile:item.phone,
					repairList:item.repairList,
					id:item.id
					
				};
				const res = await MineWuYeOrderBaoXiuOrderPayTypeTwo(param);
								
				console.log(res);
				uni.navigateTo({
				       url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			}catch (error) {
				console.log(error)
			}
			
		}
	};
	const jixiaoClick = () => {
		
		// $refs.popup.open('center');
		popupRef.value?.open();
	};
	const jixiaoShowClick = () => {
		
		viewhidden.value = 1;
	};
	const backClick = () => {
		
		// $refs.popup.close();
		popupRef.value?.close();
		viewhidden.value = 0;
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
		  .order-button {
					   
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
		  .popView{
		  			 
		  	width: calc(100vw - 60px);
		  			max-height: calc(100vh - 200px);
		  			background-color: #fff;
		  			border-radius: 16px;
		  			overflow: hidden;
		  			margin: 0 30px;
		  			 
		  }
		  .scroll-view {
		  			 
		    width: 100%;
		     max-height: calc(100vh - 230px);
		     overflow-y: auto;  /* 关键：允许垂直滚动 */
		     -webkit-overflow-scrolling: touch;  /* iOS平滑滚动 */
		     padding: 30rpx;
		     box-sizing: border-box;
		  }
		  .backButton{
		  			 
		  			margin-left: 6%;
		  			margin-bottom: 10px;
		  			margin-top: 10px;
		  			width: 88%;
		  			height: 30px;
		  			color: blue;
		  			font-size: 18px;
		  			border: blue solid 1px;
		  			border-radius: 5px;
		  			display: flex;
		  			justify-content: center;
		  			text-align: center;
		  			align-items: center;
		  }
    }
</style>