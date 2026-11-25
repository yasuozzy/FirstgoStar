<template>
    <view class="main">
        <u-navbar
          title="详情"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
          
        </u-navbar>
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;">{{dataDict.title}}</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="width: 33.33%;" v-for="(item,index) in dataList" :key="index">
				<view style="font-size: 14px;text-align: center;">{{item}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 5px;">
			<view style="width: 33.33%;" v-for="(item,index) in infoList" :key="index">
				<view style="font-size: 12px;text-align: center;color: gray;">{{item}}</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;margin-top: 10px;" @click="locationClick">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">位置</view>
			<view style="font-size: 13px;margin-left: 20px;width: 72%;">{{dataDict.location_name}}</view>
			<u-image style="margin-left: 10px;margin-top: 5px;"
			  :src="locationImg"
			  width="12px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;font-size: 13px;color: gray;margin-top: 10px;">房屋配置</view>
		<view style="display: flex;flex-direction: row;flex-wrap: wrap;margin-top: 10px;">
			<view style="width: 25%;margin-top: 10px;" v-for="(item,index) in toolsList" :key="index">
				<view style="font-size: 12px;text-align: center;color: black;">{{item}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;font-size: 13px;color: gray;margin-top: 10px;">房屋亮点</view>
		<view style="margin-left: 15px;font-size: 12px;color: gray;margin-top: 10px;">{{dataDict.detailed}}</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="buttonView" @click="rentClick">去租房</view>
		<uni-popup ref="popup" >
			<view class="protocalView">
				<scroll-view 
				      scroll-y 
				      class="agreement-scroll"
				      :style="{ height: scrollHeight + 'px' }"
				    >
				      <view style="font-size: 13px; padding: 20rpx;" v-html="agreement_content"></view>
				</scroll-view>
				<view class="buttonView1" @click="knowClick">本人已阅读并知悉相关内容</view>
			</view>     
		</uni-popup>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceHouseInfoShopDetail } from '@/api/service';
import { GetAgreemente } from '@/api/mine';
import { storage } from '@/utils/storage';

const bgColor = ref('#2A9595');
const swiperList = ref<any[]>([]);
const title = ref('旺铺花海贸易广场3-12号');
const dataList = ref<any[]>([]);
const infoList = ref<any[]>([]);
const locationImg = ref('/static/integral/locationAddress.png');
const tagList = ref<any[]>(['店铺']);
const toolsList = ref<any[]>([]);
const housepoint = ref('房屋设备、空调齐全，地理位置好，客源多');
const rentId = ref('');
const dataDict = ref<any>({});
const longitude = ref('');
const latitude = ref('');
const agreement_name = ref('');
const agreement_content = ref('');
const scrollHeight = ref(600);
const popup = ref();

onLoad((options: any) => {
	rentId.value = options.rentId || '';
});

onMounted(() => {
	init();
	getAgreement();
});

const init = () => {
	try {
		let param = {
			rentId: rentId.value,
		};
		serviceHouseInfoShopDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			if (res.result && res.result.picture) {
				swiperList.value = res.result.picture.split(',');
			}
			const newrentplat = res.result.monthly_rent_plat + '元/月';
			dataList.value.push(newrentplat);
			const newdayrent = res.result.dayRent + '元/m²/天';
			dataList.value.push(newdayrent);
			const newarea = res.result.built_area + 'm²';
			dataList.value.push(newarea);
			tagList.value.push(res.result.shop_type);
			if (res.result.rent_type === 0) {
				infoList.value.push('月付');
			} else {
				infoList.value.push('年付');
			}
			infoList.value.push('日租金');
			infoList.value.push('面积');
			latitude.value = res.result.latitude;
			longitude.value = res.result.longitude;
			const allocation = res.result.allocation;
			if (allocation) {
				toolsList.value = allocation.split(',');
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const getAgreement = () => {
	try {
		let param = {
			type: '15',
		};
		GetAgreemente(param).then((res: any) => {
			console.log(res);
			agreement_name.value = res.result.agreement_name;
			agreement_content.value = res.result.agreement_content;
		});
	} catch (error) {
		console.log(error);
	}
};

const locationClick = () => {
	uni.navigateTo({
		url: '/pages/service/HouseInformation/rentHouseLocation?longitude=' + longitude.value + '&latitude=' + latitude.value
	});
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const rentClick = () => {
	popup.value.open('top');
};

const knowClick = () => {
	popup.value.close();
	console.log(storage.getRealType());
	const realtype = storage.getRealType();
	if (realtype === '1') {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/sentHouseInfo?rentId=' + rentId.value
		});
	} else {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/idConfirm'
		});
	}
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
	 .financial_situation {
	     width: 100%;
	     background: #fff;
	     
	     margin-top: 10px;
	     box-sizing: border-box;
	     .situation_top {
	       display: flex;
	       flex-direction: row;
	       align-items: center;
	       justify-content: space-between;
	       .situation_title {
	         color: #333;
	       }
	       .situation_date {
	         ::v-deep .uni-select {
	           border-bottom: 1px solid #ccc;
	         }
	       }
	     }
	     .situation_contect {
	       display: flex;
	       flex-direction: row;
	       flex-wrap: wrap;
	       align-items: center;
	       align-items: center;
	 	  
	       justify-content: space-evenly;
	       .situation_item {
	         width: 20%;
	         font-size: 12px;
	 		
	         color: #000;
	         box-sizing: border-box;
	         display: flex;
	         flex-direction: column;
	         align-items: center;
	         height: 65upx;
	 		margin-bottom: 50upx;
	 		.item_text{
	 			margin-top: 4upx;
	 		}
	       }
	     }
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
			margin-bottom: 20px;
	    }
		.protocalView{
			background-color: white;
			margin-top: 95px;
			margin-left: 4%;
			width: 92%;
			height: 670px;
			display: flex;
			flex-direction: column;
			border-radius: 4px;
		}
		.agreement-scroll {
		  /* 设置合适的高度，可以动态计算 */
		  padding: 5px;
		}
		.buttonView1{
			
			margin-top: 10px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 14px;
			margin-left: 20%; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 35px;           /* 需要设置高度 */
			width: 60%;             /* 需要设置宽度 */
			
		}
    }
</style>