<template>
    <view class="main">
        <u-navbar
          title="订单详情"
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
			<image  style="margin-top: 20px;width: 60px;height: 60px;border-radius: 30px;" :src="dataDict.goodImg"></image>
			<view style="font-size: 13px;margin-top: 10px;">{{dataDict.goodName}}</view>
			<view style="font-size: 13px;margin-top: 10px;">￥{{dataDict.price}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view v-if="dataDict.orderCode === 5 && dataDict.isComment == 1 " style="display: flex;flex-direction: column;margin-bottom: 70px;">
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">当前状态:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.orderStatus}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">服务人员:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;width: 60%;">{{dataDict.serPerson}}{{dataDict.proMobile}}</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;color: #2A9595;" @click="phoneCall(dataDict.proMobile)">呼叫</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">综合评价:</view>
				<view style="margin-top: 15px;margin-left: 15px;">
					<u-rate :count="count" v-model="commentInfo.point" size="22" active-color="#FFFF00" readonly="true"></u-rate>
				</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">评价内容:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{commentInfo.contents}}</view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">图片评价</view>
			<view v-if="commentInfo.commentImg.length === 0" style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in commentInfo.commentImg"  @click="open(index)">
				   <u-image
					 :src="item"
					 width="60px"
					 height="80px"
				   ></u-image>
			   </view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">订单编号:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.orderNo}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">店铺名称:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.shopName}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">上门时间:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.visitTime}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">买家信息:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.userName}}{{dataDict.userMobile}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">服务地址:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.regionAdress}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">接单时间:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.receiveTime}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">完成时间:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.finishTime}}</view>
			</view>
			<view v-if="dataDict.isPlat === 1" style="display: flex;">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">申请平台介入时间:</view>
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{platInfo.platTime}}</view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">申请原因:</view>
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{platInfo.reason}}</view>
				</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">申请平台介入图片</view>
				<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
				   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in platInfo.platImg">
					   <u-image
						 :src="item"
						 width="60px"
						 height="80px"
					   ></u-image>
				   </view>
				</view>
			</view>
		</view>
		<view style="margin-bottom: 70px;" v-else>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">当前状态:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.orderStatus}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">订单编号:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.orderNo}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">服务人员:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;width: 60%;">{{dataDict.serPerson}}{{dataDict.proMobile}}</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;color: #2A9595;" @click="phoneCall(dataDict.proMobile)">呼叫</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">店铺名称:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.shopName}}</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">买家信息:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.userName}}{{dataDict.userMobile}}</view>
			</view>
			<view v-if="dataDict.orderCode > 3" style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">服务地址:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.regionAdress}}</view>
			</view>
			<view v-if="dataDict.orderCode === 5 && (dataDict.isComment === 0 || dataDict.afterSales === 0)" style="width: 100%;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">完成时间:</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{dataDict.finishTime}}</view>
			</view>
			<view style="margin-top: 20px;width: 100%;height: 10px;background-color: aliceblue;"></view>
			<view v-if="dataDict.isPlat === 1" style="display: flex;">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">申请平台介入时间:</view>
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{platInfo.platTime}}</view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">申请原因:</view>
					<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">{{platInfo.reason}}</view>
				</view>
				<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">申请平台介入图片</view>
				<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
				   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in platInfo.platImg">
					   <u-image
						 :src="item"
						 width="60px"
						 height="80px"
					   ></u-image>
				   </view>
				</view>
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
			  <img v-for="img in dataDict.commentImg" :key="img" :src="img" class="slide">
			</div>
			 </div>
			 <div class="counter">{{ current + 1 }} / {{ dataDict.commentImg.length }}</div>
	   </div>
	   <view class="footer-container">
			<view v-if="dataDict.orderCode === 0" style="width: 100%;display: flex;flex-direction: row;">
				<view class="bohuibutton" @click="cancelOrder(dataDict)">取消订单</view>
				<view class="buttonView" @click="cuiyicuiClick(dataDict)">催一催</view>
			</view>
			<view v-if="dataDict.orderCode === 3" style="width: 100%;display: flex;flex-direction: row;">
				<view class="bohuibutton" @click="cancelOrder(dataDict)">取消订单</view>
				<view class="buttonView" @click="payMoneyClick(dataDict)">付款</view>
			</view>
			<view v-if="dataDict.orderCode === 5 && dataDict.applyStatus === 2 && dataDict.isPlat === 0" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="jieruClick(dataDict)">平台介入</view>
		    </view>
			<view v-if="dataDict.orderCode === 5 && dataDict.isComment === 1" style="width: 100%;display: flex;flex-direction: row;">
				<view class="order-button" @click="shouhouClick(dataDict)">售后</view>
			</view>
			<view v-if="dataDict.orderCode === 5 && dataDict.isComment === 0" style="width: 100%;display: flex;flex-direction: row;">
				<view class="order-button" @click="pingjiaOrder(dataDict)">发表评价</view>
			</view>
	   </view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import {MineServiceOrderListDetail,MineServiceOrderListCancleOrder,
	MineServiceOrderListRemindOrder,MineServiceOrderListOrderPay} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const orderId = ref('');
	const orderno = ref('');
	const dataDict = ref({});
	const count = ref(5);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const platInfo = ref({});
	const commentInfo = ref({});
	
	onLoad((options:any) => {
		
		orderId.value = options.orderId;
		orderno.value = options.orderno;
	});
	onMounted(() => {
		
		loadData();
	});
	
	const loadData = async() => {
				
		try {
			
			let param = {
				
				orderId:orderId.value,
				orderNo:orderno.value
			};
			const res = await MineServiceOrderListDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			if (dataDict.value.commentInfo) {
				commentInfo.value = dataDict.value.commentInfo;
			}
			if(dataDict.value.isPlat === 1){
				
				platInfo.value = dataDict.platInfo;
				
			}
			
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
			if (diff > 0 && current.value < dataDict.value.commentImg.length - 1) {
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
	const cancelOrder = async(item:any) => {
		
		try {
			let param = {
				orderId:item.orderId
			};
			const res = await MineServiceOrderListCancleOrder(param);
			console.log(res);
			uni.showToast({
				title:'已取消',
				icon:'none'
			})
			
			loadData();
			
		} catch (error) {
			console.log(error)
		}
	};
	const cuiyicuiClick = async(item:any) => {
		
		try {
			let param = {
				orderId:item.orderId,
				orderNo:item.orderNo,
				providerCode:item.shopCode,
				userId:storage.getUserId(),
			};
			const res = await MineServiceOrderListRemindOrder(param);
			console.log(res);
			uni.showToast({
				title:'已提醒',
				icon:'none'
			})
			
			loadData();
			
		} catch (error) {
			console.log(error)
		}
	};
	const payMoneyClick = async(item:any) => {
		
		try {
			let param = {
				orderId:item.orderId,
				userName:storage.getRealName()?storage.getRealName():'',
				mobile:storage.getPhone(),
				osName:'ios',
				hostNo:storage.getHostNo()
			};
			const res = await MineServiceOrderListOrderPay(param);
			console.log(res);
			uni.navigateTo({
			       url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
			
		} catch (error) {
			console.log(error)
		}
	};
	//评价
	const pingjiaOrder = async(item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderPingJia?item=${JSON.stringify(item)}`
		})
	};
	//售后
	const shouhouClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderShouHou?item=${JSON.stringify(item)}`
		})
	};
	const jieruClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderJieRu?item=${JSON.stringify(item)}`
		})
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
	  .topView{
		 display: flex;
		 flex-direction: column;
		 align-items: center;
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
	   .firstButton{
			  margin-top: 20px;
			  background-color: #2A9595;
			  border-radius: 15px;
			  border: #2A9595 1px solid;
			  color: white;
			  font-size: 14px;
			  margin-left: 190px; 
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 80px;             /* 需要设置宽度 */
	   }
	   .secondButton{
			margin-top: 20px;
			background-color: #2A9595;
			border: #2A9595 1px solid;
			border-radius: 15px;
			color: white;
			font-size: 14px;
			margin-left: 20px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 30px;           /* 需要设置高度 */
			width: 80px;             /* 需要设置宽度 */ 
	   }
	   .bohuibutton {
	                
	       display: flex;
	       justify-content: center; /* 水平居中 */
	       align-items: center;     /* 垂直居中 */
	       height: 35px;           /* 需要设置高度 */
	       width: 42%;
	       
	       font-size: 14px;
	       color: white;
	       background-color: #2A9595;
	       border-radius: 6px;
	       margin-left: 4%;
	       margin-top: 15px;
	   }
	   .buttonView{
	             
		  margin-top: 15px;
		  background-color: #2A9595;
		  border-radius: 5px;
		  color: white;
		  font-size: 14px;
		  margin-left: 8%; 
		  display: flex;
		  justify-content: center; /* 水平居中 */
		  align-items: center;     /* 垂直居中 */
		  height: 35px;           /* 需要设置高度 */
		  width: 42%;             /* 需要设置宽度 */
	   }
}
</style>