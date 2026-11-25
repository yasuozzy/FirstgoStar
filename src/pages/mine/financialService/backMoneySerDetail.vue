<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">房号</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.house_name}}</view>
		</view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">姓名</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.user_name}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款事由</view>
			
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" :value="dataDict.reason" disabled="true">
		</textarea>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">状态</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: #2A9595;">{{dataDict.statusFlag}}</view>
		</view>
		<view v-if="dataDict.statusFlag === '待支付'" class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款金额</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.amount}}元</view>
		</view>
		<view v-if="dataDict.statusFlag === '待支付'" style="font-size: 14px;margin-top: 15px;margin-left: 15px;">签字</view>
		<view v-if="dataDict.statusFlag === '待支付'" style="margin-top: 10px;margin-left: 15px;">
			<u-image
			  :src="dataDict.sign_pic"
			  mode="scaleToFill"
			  width="345px"
			  height="100px"
			></u-image>
		</view>
		<view v-if="auditInfo.statusFlag" class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">审核状态</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{auditInfo.statusFlag}}</view>
		</view>
		<view v-if="auditInfo.amount" class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">审核金额</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{auditInfo.amount}}</view>
		</view>
		<view v-if="auditInfo.reason" class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">审核意见</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{auditInfo.reason}}</view>
		</view>
		<view v-if="auditInfo.audit_sign_pic" class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">审核签名</view>
		</view>
		<u-image v-if="auditInfo.audit_sign_pic"
		  :src="auditInfo.audit_sign_pic"
		  mode="scaleToFill"
		  width="345px"
		  height="100px"
		></u-image>
		<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">图片</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 60px;"></view>
		<view v-if="dataDict.statusFlag === '待支付'" class="footer-container">
		        <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
		                 <view class="order-button" @click="payClick()">去支付</view>
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
	
	import {MineServiceCancelMoneyServiceDet,
	MineServiceCancelMoneyServicePay} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const DataParam = ref({
		id:'',
	});
	const dataDict = ref({});
	const imageList = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const applyId = ref('');
	const auditInfo = ref({});
          
	onLoad((options:any) => {
		
		applyId.value = decodeURIComponent(options.applyId);
		init();
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
	const init =  async() => {
		
		try {
			
			let param = {
				id:applyId.value,
			};
			const res = await MineServiceCancelMoneyServiceDet(param);
				
			console.log(res);
			dataDict.value = res.result;
			if(res.result.auditInfo != null){
				
				auditInfo.value = res.result.auditInfo;
				
			}
			
			if (res.result.pic_path.length > 0) {
				
				imageList.value = res.result.pic_path.split(',');
			}
				
				
			
		} catch (error) {
			console.log(error)
		}
		
	};
	const payClick = async() => {
				
				
		try {
			
			let param = {
				applyId:applyId.value,
			};
			const res = await MineServiceCancelMoneyServicePay(param);
				
				console.log(res);
				uni.navigateTo({
					url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			
		} catch (error) {
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
	 .formView{
	 	display: flex;
	 	flex-direction: row;
	 	width: 100%;
	 	height: 40px;
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
}
</style>