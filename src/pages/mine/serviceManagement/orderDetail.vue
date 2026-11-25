<template>
  <view class="main">
    <!-- ================= 1. 顶部导航栏 ================= -->
    <u-navbar
      :title="orderStatus"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #fff; font-size: 16px; font-weight: 500;"
    >
      <!-- 左侧返回箭头 -->
      <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>
    <!-- ================= 2. 页面主体内容 ================= -->
    <view class="detail-container">
      
      <!-- 头部：灰色圆形图标 + 服务标题 + 价格 -->
      <view class="header-section">
        <view class="icon-circle">
          <!-- <u-icon :src size="34" color="#cfd4d8"></u-icon> -->
		  <image :src="dataDict.goodImg" style="width: 30px;height: 30px;margin-top: 20px;"></image>
        </view>
        <text class="service-title">{{dataDict.goodName}}</text>
        <text class="service-price">¥{{dataDict.price}}</text>
      </view>
      <!-- 中间贯穿灰色细分割线 -->
      <view class="divider-line"></view>
      <!-- 下半部分：详细信息清单 -->
      <view class="info-list">
        <!-- 1. 当前状态 -->
        <view class="info-item">
          <text class="item-label">当前状态：</text>
          <text class="item-value">{{ dataDict.orderStatus }}</text>
        </view>
        <!-- 2. 购买人员 -->
        <view class="info-item">
          <text class="item-label">购买人员：</text>
          <text class="item-value">{{dataDict.userName}}</text>
        </view>
        <!-- 3. 联系方式（右侧带有蓝色呼叫按钮） -->
        <view class="info-item flex-between">
          <view class="item-left">
            <text class="item-label">电话号码：</text>
            <text class="item-value">{{dataDict.userMobile}}</text>
          </view>
          <text class="call-btn">呼叫</text>
        </view>
        <!-- 4. 联系地址 -->
        <view class="info-item">
          <text class="item-label">联系地址：</text>
          <text class="item-value">{{dataDict.regionAdress}}</text>
        </view>
        <!-- 5. 下单时间 -->
        <view class="info-item">
          <text class="item-label">下单时间：</text>
          <text class="item-value">{{dataDict.createTime}}</text>
        </view>
           

		<view v-if="dataDict.orderCode == '4'" class="info-item">
		  <text class="item-label">接单时间：</text>
		  <text class="item-value">{{dataDict.receiveTime}}</text>
		</view>
		<view v-if="dataDict.orderCode == '5'" style="display: flex;flex-direction: column;">
			<view  class="info-item">
			  <text class="item-label">接单时间：</text>
			  <text class="item-value">{{dataDict.receiveTime}}</text>
			</view>
			<view class="info-item" >
			    <text class="item-label">完成时间：</text>
			    <text class="item-value">{{dataDict.finishTime}}</text>
			</view>
		</view>
      </view>

      <!-- 2. 动态显示 -->
      <view class="info-list" v-if="dataDict.orderCode == '5' && dataDict.afterSales == '1'">
        <view class="info-item">
          <text class="item-label">退款时间：</text>
          <text class="item-value">{{dataDict.ApplyInfo.applyTime}}</text>
        </view>
		<view class="info-item">
		  <text class="item-label">退款原因：</text>
		  <text class="item-value">{{dataDict.ApplyInfo.applyReason}}</text>
		</view>
      </view>
      

       <!-- ================= 评价区域（仅已完成显示） ================= -->
      <template v-if="dataDict.orderCode == '5' && dataDict.isComment == '1'">
        <!-- 分割线 -->
        <view class="divider-line"></view>
        
        <view class="info-list">
          <view class="info-item">
            <text class="item-label">评价时间：</text>
            <text class="item-value">{{dataDict.commentInfo.commTime}}</text>
          </view>
          
          <!--星星组件-->
          <view class="info-item">
            <text class="item-label">综合评价：</text>
            <view class="item-value" style="display: flex; align-items: center; margin-top: 1px;">
              <u-rate :count="5" v-model="rateValue" size="16" activeColor="#FFC107" readonly="true"></u-rate>
            </view>
          </view>
          
          <view class="info-item">
            <text class="item-label">评价内容：</text>
            <text class="item-value">{{dataDict.commentInfo.contents}}</text>
          </view>
          
          <view class="divider-line"></view>
          
          <view class="info-item">
            <text class="item-label">图片描述：</text>
            <!-- 假设目前没有图片，我们可以先放个占位 -->
            <!-- <text class="item-value" style="color: #999;">
              <image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill" class="desc-img"></image>
            </text> -->
			 <view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in pictrueArr"  @click="open(index)">
				   <u-image
					 :src="item"
					 width="60px"
					 height="80px"
				   ></u-image>
			   </view>
			</view>
          </view>
        </view>
      </template>

      <!-- 底部墨绿色大按钮 -->
      <!-- <view class="bottom-btn" v-if="orderStatus === '进行中'">确认完成</view>
      <view class="bottom-btn" v-if="orderStatus === '待付款'">报价</view> -->
	  
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
	<view v-if="dataDict.orderCode == '0'" class="footer-container">
		<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
			<view class="singleButton" @click="jiedanClick(dataDict)">接单</view>
		</view>
	</view>
	<view v-if="dataDict.orderCode == '2'" class="footer-container">
		<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
			<view class="singleButton" @click="baojiaClick(dataDict)">报价</view>
		</view>
	</view>
	<view v-if="dataDict.orderCode == '4'" class="footer-container">
		<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
			<view class="singleButton"  @click="sureClick(dataDict)">确认完成</view>
		</view>
	</view>
	<view v-if="dataDict.orderCode == '5' && dataDict.applyStatus == '1' && dataDict.afterSales == '1' && dataDict.isRefund == '0'" class="footer-container">
		<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
			<view class="singleButton" @click="tuikuanClick(dataDict)">同意退款</view>
		</view>
	</view>
	<u-modal :show="modelshow" @confirm="confirmClick" :title="title" confirm-text="重新报价" showCancelButton="true" @cancel="cancelReBaoJia" cancel-text="不用"  style="display: flex;flex-direction: column;">
		<view style="margin-top: 20px;width: 100%;text-align: center;font-size: 13px;">是否需要重新报价</view>
	</u-modal>
	<u-modal :show="rebaojiashow" @confirm="handleReason" :title="title" confirm-text="提交" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 30px;">￥</view>
			<input class="searchlocation" v-model="rebaojiacontent" placeholder="请输入报价" type="text" />
		</view>
	</u-modal>
	<u-modal :show="backmoneyshow" @confirm="handleBackMoneyReason" title="退款" confirm-text="提交" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: column;">
			<textarea class="textAreaView" v-model="backmoneycontent" placeholder="填写退款原因"></textarea>
		</view>
	</u-modal>
  </view>
</template>
<script setup lang="ts">
	import { ref,onMounted,computed } from 'vue'
	import {MineServiceOrderListDetail,
	MineLifeServiceManageMentMyOrderListCompleteOrder,
	MineLifeServiceManageMentMyOrderListAcceptOrder,
	MineLifeServiceManageMentMyOrderListBargainPrice,
	MineLifeServiceManageMentMyOrderListRefundMoney} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	const orderid = ref();
	const orderno = ref();
	const dataDict = ref({});
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	//代表评价
	const  rateValue = ref(5);
	const modelshow = ref(false);
	const myOrderItem = ref({});
	const rebaojiashow = ref(false);
	const rebaojiacontent = ref();	
	const backmoneyshow = ref(false);
	const backmoneycontent = ref();
	const backMoneyItem = ref({});
	
	onLoad((options:any) => {
		
		orderid.value = options.orderid;
		orderno.value = options.orderno;
	});
	onMounted(() => {
		
		loadData();
	});
	
	const loadData = async() => {
				
		try {
			
			let param = {
				
				orderId:orderid.value,
				orderNo:orderno.value
			};
			const res = await MineServiceOrderListDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			rateValue.value = res.result.commentInfo.point;
			pictrueArr.value = res.result.commentInfo.commentImg;
			
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
	const jiedanClick = async(item:any) => {
		   
		   try {
		   	
		   	let param = {
		   		
		   		orderId:item.orderId
		   	};
		   	const res = await MineLifeServiceManageMentMyOrderListAcceptOrder(param);
		   					
		   	console.log(res);
		   	uni.showToast({
		   		title:'已接单',
		   		icon:'none'
		   	})
		   	loadData();
		   	
		   }catch (error) {
		   	console.log(error)
		   }
	};
	//报价
	const baojiaClick = (item:any) => {
		   
		   modelshow.value = true;
		   myOrderItem.value = item;
	};
	//确认重新报价
	const confirmClick = () => {
		   
		   modelshow.value = false;
		   rebaojiashow.value = true;
		   
	};
	const handleReason = async() => {
		   
		   if(rebaojiacontent.value.length == 0){
			   
			   uni.showToast({
			   	title:'请输入金额',
			   	icon:'none'
			   })
			   return
		   }
		   try {
		   	
		   	let param = {
		   		
		   		orderId:myOrderItem.value.orderId,
		   		barginPrice:rebaojiacontent.value,
		   		barginFlag:2,
		   	};
		   	const res = await MineLifeServiceManageMentMyOrderListBargainPrice(param);
		   					
		   	console.log(res);
		   	uni.showToast({
		   		title:'已报价',
		   		icon:'none'
		   	})
		   	loadData();
			rebaojiashow.value = false;
		   	
		   }catch (error) {
		   	console.log(error)
		   }
	};
	//不用重新报价，直接报价
	const cancelReBaoJia = async() => {
		   
		   try {
		   	
		   	let param = {
		   		
		   		orderId:myOrderItem.value.orderId,
				barginPrice:myOrderItem.value.price,
				barginFlag:1,
		   	};
		   	const res = await MineLifeServiceManageMentMyOrderListBargainPrice(param);
		   					
		   	console.log(res);
		   	uni.showToast({
		   		title:'已报价',
		   		icon:'none'
		   	})
		   	loadData();
		   	
		   }catch (error) {
		   	console.log(error)
		   }
	};
	const tuikuanClick = (item:any) => {
		   backmoneyshow.value = true;
		   backMoneyItem.value = item;
	};
	const handleBackMoneyReason = async() => {
		   
		   if(backmoneycontent.value.length == 0){
		   		   
			   uni.showToast({
				title:'请填写退款原因',
				icon:'none'
			   })
			   return
		   }
		   try {
		   	
		   	let param = {
		   		
		   		orderNo:backMoneyItem.value.orderNo,
				hostNo:storage.getHostNo(),
		   			mobile:storage.getPhone(),
		   			reason:backmoneycontent.value
		   	};
		   	const res = await MineLifeServiceManageMentMyOrderListRefundMoney(param);
		   					
		   	console.log(res);
		   	uni.navigateTo({
		   	    url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result)}`
		   	})
			
		   	
		   }catch (error) {
		   	console.log(error)
		   }
		   backmoneyshow.value = false
	};
	//确认完成
	const sureClick = async(item:any) => {
		   
		   try {
		   	
		   	let param = {
		   		
		   		orderId:item.orderId
		   	};
		   	const res = await MineLifeServiceManageMentMyOrderListCompleteOrder(param);
		   					
		   	console.log(res);
		   	uni.showToast({
		   		title:'已完成订单',
		   		icon:'none'
		   	})
		   	loadData();
		   	
		   }catch (error) {
		   	console.log(error)
		   }
	};
	// 仅保留一个最基本的返回上一页
	const goBack = () => {
	  uni.navigateBack({delta:1})
	}

	// 当前页面的状态
	const orderStatus =ref('')

	onLoad((options)=>{
		if(options && options.status){
			orderStatus.value=options.status
		}
	})

	
</script>
<style scoped lang="scss">
/* 页面纯白背景 */
.main {
  min-height: 100vh;
  background-color: #ffffff;
}
/* 主体容器内边距 */
.detail-container {
  padding: 24px 16px 40px 16px;
}
/* 头部服务信息 */
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 浅灰正圆形图标框 */
  .icon-circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #f1f3f5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }
  .service-title {
    font-size: 15px;
    color: #333333;
    margin-bottom: 10px;
  }
  .service-price {
    font-size: 16px;
    color: #333333;
  }
}
/* 贯穿细分割线 */
.divider-line {
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
  margin: 22px 0 24px 0;
}
/* 信息清单列表 */
.info-list {
  .info-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 14px; /* 整体字号调大到 14px */
    color: #333333;
    margin-bottom: 22px; /* 行间距 */
    line-height: 1.45;
    .item-label {
      color: #565656; /* 标签颜色修改 */
      flex-shrink: 0;
    }
    .item-value {
      color: #333333;
    }
    /* 左右两端撑开（用于联系方式与呼叫按钮） */
    &.flex-between {
      justify-content: space-between;
      align-items: center;
      .item-left {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      /* 蓝色呼叫文字 */
      .call-btn {
        color: #3b7cf6;
        font-size: 14px; /* 呼叫按钮字号同步调大 */
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
}
/* 底部墨绿色操作按钮 */
.bottom-btn {
 

  position: fixed;
  bottom: 40px;
  left: 16px;
  right: 16px;
  z-index: 10;
  height: 46px;
  background-color: #2A9595;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:active {
    opacity: 0.85;
  }
}

/* 评价区域的图片样式 */
.image-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
}
.desc-img {
  width: 76px;
  height: 76px;
  border-radius: 6px; 
  background-color: #f5f5f5; 
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
 .singleButton {
			  
	 display: flex;
	 justify-content: center; /* 水平居中 */
	 align-items: center;     /* 垂直居中 */
	 height: 40px;           /* 需要设置高度 */
	 width: 92%;
	 margin-right: 10px;
	 font-size: 13px;
	 color: white;
	 background-color: #2A9595;
	 border-radius: 6px;
	 margin-left: 4%;
	 margin-top: 15px;
 }
 .agreeCancelButton
 {
 	margin-top: 10px;
 	margin-left: 4%;
 	width: 25.33%;
 	height: 40px;
 	background-color: #2A9595;
 	font-size: 13px;
 	border-radius: 4px;
 	color: white;
 	display: flex;
 	justify-content: center;
 	align-items: center;
 }
 .agreeButton{
 	margin-top: 10px;
 	margin-left: 8%;
 	width: 25.33%;
 	height: 40px;
 	background-color: #2A9595;
 	font-size: 13px;
 	border-radius: 4px;
 	color: white;
 	display: flex;
 	justify-content: center;
 	align-items: center;
 }
 .refuseButton{
 	
 	margin-top: 10px;
 	margin-left: 8%;
 	width: 25.33%;
 	height: 40px;
 	background-color: #2A9595;
 	font-size: 13px;
 	border-radius: 4px;
 	color: white;
 	display: flex;
 	justify-content: center;
 	align-items: center;
 	
 }

</style>
