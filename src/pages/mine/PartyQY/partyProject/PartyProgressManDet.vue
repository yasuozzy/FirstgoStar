<template>
	<view class="main">
	       <u-navbar
	         title="进展详情"
	         
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
		   <view v-if="status == 2" style="margin-top: 10px;margin-left: 15px;font-size: 15px;">未通过原因：{{reason}}</view>
		   <view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">标题：{{title}}</view>
		   <view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">完成日期：{{done_date}}</view>
		   <view v-if="faqiString == 1" style="margin-top: 10px;margin-left: 15px;font-size: 15px;">发起人：{{user_name}}</view>
		   <textarea class="searchlocation" disabled='true' :value="summary"></textarea>
		   <view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		   <view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">图片描述</view>
		   <view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
		   	<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in pictrueArr"  @click="open(index)">
		   		<u-image
		   		  :src="item"
		   		  width="60px"
		   		  height="80px"
		   		></u-image>
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
		   <view v-if="faqiString == 1 & status == 0" class="footer-container">
		   	<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
		   		 <view class="pass-button" @click="passClick(refuseItem)">通过</view>
		   		 <view class="refuse-button" @click="refuseClick(refuseItem)">拒绝</view>
		   	 </view>
		   </view>
		   <u-modal :show="show" @confirm="confirmClick" confirm-color="red" @cancel="cancelClick" show-cancel-button="true" :title="refusetitle" style="display: flex;flex-direction: column;">
		   	<view style="width: 100%;display: flex;flex-direction: column;">
		   		<textarea class="searchlocation" v-model="reason" placeholder="请输入拒绝原因"></textarea>
		   	</view>
		   </u-modal>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { PartyBuildProgressAudiShenHeDetail,PartyBuildProgressAudiShenHeInfo } from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#FF0000");
	const rec_id = ref('');
	const status = ref<string | number>('1');
	const project_id = ref('');
	const reason = ref('');
	const title = ref('');
	const done_date = ref('');
	const user_name = ref('');
	const summary = ref('');
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const shenheType = ref<number>(1);
	const show = ref(false);
	const refusetitle = ref('确认审核');
	const refusereason = ref('');
	const refuseItem = ref({});
	const faqiString = ref<number>(1);
	
 	onLoad((options:any) => {
		rec_id.value = options.rec_id;
		faqiString.value = options.faqiString;
		console.log(rec_id.value);
	});
	onMounted(() => {
		
		getDetail();
	});
	const slideStyle = computed(() => {
	  return {
	    transform: `translateX(-${current.value * 100}%)`
	  };
	});
	const getDetail = async() =>{
		
		let param = {
			rec_id:rec_id.value
		};
		try {
			
			const res = await PartyBuildProgressAudiShenHeDetail(param);
			console.log(res);
			refuseItem.value = res.result;
			title.value = res.result.title;
			user_name.value = res.result.user_name;
			reason.value = res.result.reason;
			summary.value = res.result.summary;
			pictrueArr.value.push(res.result.picture);
			status.value = res.result.status;
			project_id.value = res.result.project_id;
			done_date.value = res.result.done_date;
			
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
		
	};
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
	const passClick = (item:any) => {
		
		shenheType.value = 1;
		uni.showModal({
		                            
			cancelText:'取消',
			confirmText:'确定',
			confirmColor:'#2A9595',
			title:'确认审核',
			content:'',
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确定');
					sureShenHe(item);
				}else
				{
					console.log('取消')
				}
			}
		});
	};
	//拒绝
	const refuseClick = (item:any) => {
		
		show.value = true;
		shenheType.value = 2;
		
	};
	const confirmClick = (refuseItem:any) => {
		
		if (refusereason.value.length == 0) {
			
			uni.showToast({
				title:'请输入拒绝原因',
				icon:'none',
			})
			return;
		}else
		{
			show.value = false;
			sureShenHe(refuseItem.value);
		}
		
	};
	const cancelClick = () => {
		show.value = false;
	};
	const sureShenHe = async(item:any) => {
		
		try {
			
			let param = {
				project_id:item.project_id,
				user_id:getStorage(storageKeys.userId,''),
				rec_id:item.rec_id,
				type:shenheType.value,
				reason:refusereason.value?refusereason.value:''
			};
			const res = await PartyBuildProgressAudiShenHeInfo(param);
			console.log(res);
			uni.showToast({
				title:'提交申请成功',
				icon:'none'
			});
			
			getDetail();
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
	};
	const goBack = () =>{
		
		uni.navigateBack()
	};
	
</script>

<style>
	.main {
		 height: 100%;
		 background: white;  
	}
	.searchlocation{
		margin-top: 15px;
		margin-left: 4%;
		width: 92%;
		height: 100px;
		border: black 1px solid;
		font-size: 15px;
				  
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
		 .pass-button {
		              
		     display: flex;
		     justify-content: center; /* 水平居中 */
		     align-items: center;     /* 垂直居中 */
		     height: 35px;           /* 需要设置高度 */
		     width: 35%;
		     font-size: 13px;
		     color: white;
		     background-color: red;
		     border-radius: 6px;
		     margin-left: 10%;
		     margin-top: 15px;
		 }
		 .refuse-button {
		              
		     display: flex;
		     justify-content: center; /* 水平居中 */
		     align-items: center;     /* 垂直居中 */
		     height: 35px;           /* 需要设置高度 */
		     width: 35%;
		     font-size: 13px;
		     color: white;
		     background-color: red;
		     border-radius: 6px;
		     margin-left: 10%;
		     margin-top: 15px;
		 }
</style>