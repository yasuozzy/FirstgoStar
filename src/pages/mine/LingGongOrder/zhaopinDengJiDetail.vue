<template>
    <view class="main">
        <u-navbar
          title="招聘登记"
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司名称</view>
			<input class="searchlocation" :disabled="true" v-model="com_name" placeholder="请填写公司全名" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司法人姓名</view>
			<input class="searchlocation" :disabled="true" v-model="legal_persion" placeholder="请填写公司法人姓名" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司法人手机号</view>
			<input class="searchlocation" :disabled="true" v-model="legal_person_mobile" placeholder="请填写公司法人手机号" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司法人身份证号</view>
			<input class="searchlocation" :disabled="true" v-model="legal_person_card" placeholder="请填写公司法人身份证号" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">办公地点</view>
			<input class="searchlocation" :disabled="true" v-model="office_address" placeholder="请填写办公地点" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司简介</view>
		<textarea class="textArea" :disabled="true" v-model="introduction" placeholder="请填写公司简介"></textarea>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">招聘意向</view>
		<textarea class="textArea" :disabled="true" v-model="intention" placeholder="请填写公司招聘意向"></textarea>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">上传营业执照</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">营业执照编号</view>
			<input class="searchlocation" :disabled="true" v-model="business_num" placeholder="请填写营业执照编号" type="text" />
		</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">上传公司法人身份证</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<image style="margin-top: 20px;margin-left: 20%;width: 60%;height: 120px;" :src="idcard_positive" ></image>
			<image style="margin-top: 20px;margin-left: 20%;width: 60%;height: 120px;" :src="idcard_negative" ></image>
			<image style="margin-top: 20px;margin-left: 20%;width: 60%;height: 120px;" :src="idcard_hand" ></image>
		</view>
		<view class="protocalView">
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
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
    import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineJiuYeQunYuanLaoWuOrderZhaoPinUpLoad,MineJiuYeQunYuanLaoWuOrderZhaoPinDetail} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const com_name = ref('');
	const legal_persion = ref('');
	const legal_person_mobile = ref('');
	const legal_person_card = ref('');
	const office_address = ref('');
	const introduction = ref('');
	const intention = ref('');
	const business_num = ref('');
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan = ref('/static/service/licenseFan.png');
	const licenseHand = ref('/static/service/licenseHand.png');
	const selected = ref(false);
	const agreement_name = ref('');
	const agreement_content = ref('');
	const imageList = ref([]);
	const business_pic = ref('');
	const oth_pics = ref('');
	const idcard_positive = ref('');
	const idcard_negative = ref('');
	const idcard_hand = ref('');
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);

		
	onMounted(() => {
		getDetail();
		getAgreement();
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
            
	const getDetail = async() => {
		
		try {
			let param = {
				userId:storage.getUserId(),
			};
			MineJiuYeQunYuanLaoWuOrderZhaoPinDetail(param).then((res) =>{
				
				console.log(res);
				com_name.value = res.result.com_name;
				legal_persion.value = res.result.legal_persion;
				legal_person_mobile.value = res.result.legal_person_mobile;
				legal_person_card.value = res.result.legal_person_card;
				office_address.value = res.result.office_address;
				introduction.value = res.result.introduction;
				intention.value = res.result.intention;
				business_num.value = res.result.business_num;
				idcard_positive.value = res.result.idcard_positive;
				idcard_negative.value = res.result.idcard_negative;
				idcard_hand.value = res.result.idcard_hand;
				imageList.value.push(res.result.business_pic);
				imageList.value.push(res.result.oth_pics);
				
			});
		} catch (error) {
			console.log(error)
		} 
	};
	const getAgreement = async() => {
		  
	
		try {
			let param = {
				type:'28',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error)
		} 
		  
	};
	const agreementClick = () => {
					  
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${28}`
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
		  .searchlocation{
		   margin-left: 10px;
		   width: 250px;
		   height: 25px;
		   margin-top: 12px;
		   border-radius: 5px;
		   font-size: 13px;
		}
		.textArea{
			margin-top: 10px;
			margin-left: 4%;
			width: 92%;
			height: 100px;
			border: lightgray 1px solid;
			font-size: 13px;
		}
		.protocalView{
			display: flex;
			flex-direction: row;
			width: 100%;
		}
     .buttonView{
              
             margin-top: 30px;
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
	.imagechooseView{
	 	margin-top: 20px;
	 	margin-left: 5%;
	 	width: 90%;
	 	height: 100px;
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
           
    }
</style>