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
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款申请人</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.user_name}}</view>
		</view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">房号</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.house_name}}</view>
		</view>
		
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款事由</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.refund_reason}}</view>
		</view>
		
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款类型</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.refund_type}}</view>
		</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款备注</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.remarks}}</view>
		</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view  class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款金额</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.amount}}元</view>
		</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">状态</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;color: gray;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view  style="font-size: 14px;margin-top: 15px;margin-left: 15px;">签字</view>
		<view  style="margin-top: 10px;margin-left: 15px;">
			<u-image
			  :src="dataDict.sign_pic"
			  mode="scaleToFill"
			  width="345px"
			  height="100px"
			></u-image>
		</view>
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
		<view v-if="dataDict.statusFlag === '待审核'" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="pass-button" @click="tongguoClick()">通过</view>
				<view class="cancel-button" @click="jujueClick()">拒绝</view>
			 </view>
		</view>
		<u-modal :show="shenshow" @confirm="bohuiconfirm" confirmText="确认" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="reason" placeholder="请输入审核意见" type="text" />
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
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkDetail,GetAgreemente,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSetUpData} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
	import {MineServiceCancelJieSuanDetail,
	MineFinancialServiceCancelMoneyAuditShenHe} from '@/api/mine';
	import eventBus from '@/utils/eventBus';
	import { onLoad } from '@dcloudio/uni-app';
    
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
	const ItemData = ref({});
	const extras = ref({});
	const shenshow = ref(false);
	const title = ref('审核操作');
	const reason = ref('');
	const signPic = ref('');
	const type = ref(1);
           
	onLoad((options:any)  => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse(ItemData.value.extras);
		console.log(ItemData.value);
		console.log(extras.value);
		init();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
			  
	  eventBus.off("sign_netimg", handleUpdateData);
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
	const init = async() => {
				
		try {
			
			let param = {
				push_id:extras.value.push_id,
			};
			const res = await MineServiceCancelJieSuanDetail(param);
				
			console.log(res);
			dataDict.value = res.result;
			// auditInfo = res.result.auditInfo;
			if (res.result.pic_path.length > 0) {
				
				imageList.value = res.result.pic_path.split(',');
			}
				
				
		} catch (error) {
			console.log(error)
		}
		
	};
			
	//通过
	const tongguoClick = () => {
		
		type.value = 1;
		uni.navigateTo({
		  url: "/pages/mine/SignPage/SignPage",
		});
	};
	//拒绝
	const jujueClick = () => {
		
		type.value = 2;
		uni.navigateTo({
		  url: "/pages/mine/SignPage/SignPage",
		});
	};
	const cancelClick = () => {
		
		shenshow.value = false;
	};
	const bohuiconfirm = async() =>{
		
		if (reason.value.length == 0) {
			
			uni.showToast({
				title:'请输入审核意见',
				icon:'none'
			})
			return;
		}
		
		try {
			let param = {
				
				push_id:extras.value.push_id,
				type:type.value,
				reason:reason.value,
				sign_pic:signPic.value,
			};
			const res = await MineFinancialServiceCancelMoneyAuditShenHe(param);
				
			console.log(res);
			init();
			shenshow.value = false;
			
		} catch (error) {
			console.log(error)
		} 
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signPic.value = data[0];
		dataDict.value.sign_pic = BaseImgURL + signPic.value;
		console.log( signPic.value);
	  };
	  shenshow.value = true;
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
	.pass-button{
		
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center;     /* 垂直居中 */
		height: 35px;           /* 需要设置高度 */
		width: 35%;
		
		font-size: 13px;
		color: white;
		background-color: #2A9595;
		border-radius: 6px;
		margin-left: 10%;
		margin-top: 15px;
	}
	 .cancel-button {
				  
		 display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
		 height: 35px;           /* 需要设置高度 */
		 width: 35%;
		 
		 font-size: 13px;
		 color: white;
		 background-color: #2A9595;
		 border-radius: 6px;
		 margin-left: 10%;
		 margin-top: 15px;
	 }
	 .searchlocation{
	 	 margin-left: 4%;
	 	 width: 92%;
	 	 height: 35px;
	 	 margin-top: 10px;
	 	 border: 1px lightgray solid;
	 	 border-radius: 5px;
	 	 font-size: 13px;
	  }
}
</style>