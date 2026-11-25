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
		<view v-if="dataDict.applyStatusValue !== 0" style="display: flex;flex-direction: column;background-color: white;height: 110px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">审核信息</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">审核时间:{{dataDict.checkTime}}</view>
			<view v-if="dataDict.applyStatusValue == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">审核结果:已同意</view>
			<view v-if="dataDict.applyStatusValue == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">审核结果:已拒绝</view>
		</view>
		<view style="width: 100%;height: 40px;background-color: white;display: flex;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">售后服务编号:{{dataDict.applyNo}}{{dataDict.applyTime}}</view>
		</view>
		<view v-if="orderList.length > 0" class="listView">
				<view class="goodsItem" v-for="(goodItem,goodIndex) in orderList" :key="goodIndex">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="goodItem.img ? goodItem.img :'/static/service/headerDefaltImg.png'"
					  width="80px"
					  height="80px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
						<view style="font-size: 13px;">{{goodItem.name}}</view>
							
						<view style="font-size: 13px;text-align: right;width: 100%;">￥{{goodItem.price}}</view>
						
						<view style="font-size: 13px;text-align: right;width: 100%;">x{{goodItem.nums}}</view>
						
						<view style="font-size: 13px;margin-top: 5px;margin-bottom: 10px;">{{goodItem.specs}}</view>
					</view>
				</view>
		</view>
		<view style="display: flex;flex-direction: column;background-color: white;height: 140px;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">订单信息</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">订单编号:{{dataDict.orderNo}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">下单时间:{{dataDict.createTime}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">支付方式:在线支付</view>
		</view>
		<view style="display: flex;flex-direction: column;background-color: white;height: 110px;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">售后信息</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">售后类型:{{dataDict.serviceType}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: gray;">售后描述:{{dataDict.questionDesc}}</view>
		</view>
		<view style="display: flex;flex-direction: column;background-color: white;height: 160px;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">商品问题描述</view>
			<view style="margin-top: 10px;background-color: lightgray;height: 1px;width: 100%;"></view>
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
		<view class="footer-container">
			<view  v-if="dataDict.applyStatusValue == 0" class="bottomView">
				<view class="firstButton" @click="digreeOrder(dataDict)">同意</view>
				<view class="secondButton" @click="disdigreepayClick(dataDict)">拒绝</view>
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
	   <u-modal :show="aftershow" @confirm="afterhandleReason" :title="title" confirm-text="确定" showCancelButton="true" @cancel="aftercancelClick" style="display: flex;flex-direction: column;">
	   	<view style="width: 100%;display: flex;flex-direction: column;">
	   		<textarea class="textAreaView" v-model="aftercontent" placeholder="请填写拒绝原因"></textarea>
	   	</view>
	   </u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import {MineShangquanManageMentGetAfterSaleDetail,
	MineShangquanManageMentMerchantRefund} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const applyId = ref();
	const dataDict = ref({});
	const orderList = ref([]);
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const aftershow = ref(false);
	const aftercontent = ref('');
	const afterItem = ref({});
	
	onLoad((options:any) => {
		applyId.value = options.applyId;
	});
	onMounted(() => {
	  loadData();
	});
	
	const loadData = async() => {
	        	
		try {
			
			let param = {
				
				applyId:applyId.value,
				
			};
			const res = await MineShangquanManageMentGetAfterSaleDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			orderList.value = res.result.applyDetailAry;
			const picList = res.result.picList;
			// 正确的数组合并方式
			picList.forEach(item => {
				pictrueArr.value.push(item.path)
			});
			console.log(pictrueArr);
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
	//同意
	const digreeOrder = async(item:any) => {
		
		try {
			
			let param = {
				
				status:2,
				applyId:item.applyId,
				orderNo:item.orderNo,
				advice:'',
				
			};
			const res = await MineShangquanManageMentMerchantRefund(param);
							
			console.log(res);
			uni.navigateTo({
				   url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
				
			
		}catch (error) {
			console.log(error)
		}
	};
	
	//拒绝
	const disdigreepayClick = async(item:any) => {
		
		aftershow.value = true;
		afterItem.value = item;
	};
	const afterhandleReason = async() => {
		
		if(aftercontent.value.length === 0){
			uni.showToast({
				title:'请输入拒绝原因',
				icon:'none'
			})
			return;
		}
		
		aftershow.value = false;
		try {
			
			let param = {
				
				status:3,
				applyId:afterItem.applyId,
				orderNo:afterItem.orderNo,
				advice:aftercontent.value,
				
			};
			const res = await MineShangquanManageMentMerchantRefund(param);
							
			console.log(res);
			uni.showToast({
				title:res.result.message,
				icon:'none'
			})
			loadData();
				
			
		}catch (error) {
			console.log(error)
		}
	};
     const aftercancelClick = () => {
		 aftershow.value = false;
	 };
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
         height: auto;
         background: aliceblue;
         min-height: 100vh;
         width: 100%;
          .flex{
              display: flex;
          }
		  .listView{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 background-color: white;
		  }
		  .goodsItem{
			 display: flex;
			 flex-direction: row;
			 margin-top: 10px;
			 background-color: aliceblue;
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
		   .bottomView{
		   		 display: flex;
		   		 flex-direction: row;
		   		 width: 100%;
		   		 margin-top: 10px;
		   }
		   .firstButton{
			  margin-top: 10px;
			  background-color: #2A9595;
			  border-radius: 5px;
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
		   		margin-top: 10px;
		   		background-color: #2A9595;
		   		border-radius: 5px;
		   		color: white;
		   		font-size: 14px;
		   		margin-left: 20px; 
		   		display: flex;
		   		justify-content: center; /* 水平居中 */
		   		align-items: center;     /* 垂直居中 */
		   		height: 30px;           /* 需要设置高度 */
		   		width: 80px;             /* 需要设置宽度 */ 
		   }
}
</style>