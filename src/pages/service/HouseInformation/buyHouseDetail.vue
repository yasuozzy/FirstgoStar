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
		<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;">{{dataDict.rentalTitle}}</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="width: 25%;" v-for="(item,index) in dataList" :key="index">
				<view style="font-size: 14px;text-align: center;">{{item}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 5px;">
			<view style="width: 25%;" v-for="(item,index) in infoList" :key="index">
				<view style="font-size: 12px;text-align: center;color: gray;">{{item}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="width: 25%;" v-for="(item,index) in dataList1" :key="index">
				<view style="font-size: 14px;text-align: center;">{{item}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 5px;">
			<view style="width: 25%;" v-for="(item,index) in infoList1" :key="index">
				<view style="font-size: 12px;text-align: center;color: gray;">{{item}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="width: 25%;" v-for="(item,index) in dataList2" :key="index">
				<view style="font-size: 14px;text-align: center;">{{item}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 5px;">
			<view style="width: 25%;" v-for="(item,index) in infoList2" :key="index">
				<view style="font-size: 12px;text-align: center;color: gray;">{{item}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;margin-top: 10px;" @click="locationClick">
			<u-image style="margin-left: 15px;margin-top: 5px;"
			  :src="locationImg"
			  width="10px"
			  height="15px"
			></u-image>
			<view style="font-size: 13px;margin-left: 10px;margin-top: 3px;width: 80%;">{{dataDict.communityName}}</view>
			<u-image style="margin-left: 10px;margin-top: 5px;"
			  :src="downImg"
			  width="12px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 5px;"></view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">房屋介绍</view>
		<view style="font-size: 12px;margin-top: 3px;margin-left: 15px;color: gray;">{{dataDict.detailed}}</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 5px;"></view>
		<view style="width: 100%;height: 50px;background-color: white;margin-top: 5px;"></view>
		<view class="footer-container">
		    <view style="display: flex;flex-direction: row;">
				<view style="display: flex;flex-direction: column;margin-top: 2px;margin-left: 15px;width: 30px;height: 30px;" @click="collectClick(dataDict.collectionId)">
					
					<u-image v-if="dataDict.collectionId"
					  :src="starCollected"
					  width="25px"
					  height="25px"
					></u-image>
					<u-image v-if="!dataDict.collectionId"
					  :src="starCollectdefault"
					  width="25px"
					  height="25px"
					></u-image>
					<view style="font-size: 10px;width: 20px;height: 15px;color: black;margin-left: 2px;">收藏</view>
				</view>
				<view style="display: flex;flex-direction: column;margin-top: 2px;margin-left: 20px;width: 30px;height: 30px;" @click="jubaoClick">
					<u-image 
					  :src="reportImg"
					  width="25px"
					  height="25px"
					></u-image>
					<view style="font-size: 10px;width: 20px;height: 15px;color: black;margin-left: 2px;">举报</view>
				</view>
		        <view class="talk-button" @click="chatClick">在线聊</view>
		        <view class="order-button" @click="phoneCall">打电话</view>
		    </view>
		            
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceHouseInfoBuyHouseDetail, serviceHouseInfoBuyHouseAddColletion } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const locationImg = ref('/static/integral/locationAddress.png');
	// 轮播图列表
	const swiperList = ref<any[]>([]);
	const title = ref('金都时代新城小区');
	const dataList = ref<any[]>([]);
	const infoList = ref(['售价(万)','装修情况']);
	const dataList1 = ref<any[]>([]);
	const infoList1 = ref(['房屋户型','建筑面积','房屋楼层','是否有电梯']);
	const dataList2 = ref<any[]>([]);
	const infoList2 = ref(['房屋类型','房屋编号']);
	
	const downImg = ref('/static/home/downImage.png');
	const yaoqiu = ref('只限女生');
	const specs = ref('房屋干净整洁，配套齐全');
	const roomtool = ref<any[]>([]);
	const publictool = ref<any[]>([]);
	const idstring = ref('');
	const dataDict = ref<any>({});
	const userMobile = ref('');
	const latitude = ref('');
	const longitude = ref('');
	const starCollected = ref('/static/service/collect_selected.png');
	const starCollectdefault = ref('/static/service/collect_default.png');
	const reportImg = ref('/static/service/report.png');

	const init = () => {
		try {
			let param = {
				id: idstring.value,
				userId: storage.getUserId(),
			};
			serviceHouseInfoBuyHouseDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
				swiperList.value = res.result.housePicImgs;
				
				dataList.value = [];
				dataList.value.push(res.result.price);
				dataList.value.push(res.result.decoration);
				
				dataList1.value = [];
				dataList1.value.push(res.result.householdType);
				dataList1.value.push(res.result.builtArea);
				dataList1.value.push(res.result.houseFloor);
				
				dataList2.value = [];
				dataList2.value.push(res.result.houseType);
				dataList2.value.push(res.result.houseNum);
				
				const elevator = res.result.elevator;
				if (elevator === '1') {
					dataList1.value.push('有电梯');
				} else {
					dataList1.value.push('无');
				}
				
				const allocation = res.result.allocation;
				if (allocation) {
					roomtool.value = allocation.split(',');
				} else {
					roomtool.value = ['空调'];
				}
				const publicFacilities = res.result.publicFacilities;
				if (publicFacilities) {
					publictool.value = publicFacilities.split(',');
				} else {
					publictool.value = ['燃气灶'];
				}
				
				userMobile.value = res.result.userMobile;
				latitude.value = res.result.latitude;
				longitude.value = res.result.longitude;
			});
		} catch (error) {
			console.log(error);
		}
	};

	//房产位置地图
	const locationClick = () => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/rentHouseLocation?longitude=' + longitude.value + '&latitude=' + latitude.value
		});
	};

	//在线聊
	const chatClick = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
	};

	//打电话
	const phoneCall = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		uni.makePhoneCall({
			phoneNumber: userMobile.value,
			success: () => {
				console.log('拨打电话成功');
			},
			fail: (error: any) => {
				console.error('拨打电话失败:', error);
				uni.showToast({
					title: '拨打电话失败，请重试',
					icon: 'none'
				});
			}
		});
	};

	const collectClick = (collectionId: any) => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		if (collectionId) {
			uni.showModal({
				cancelText: '否',
				confirmText: '是',
				confirmColor: '#2A9595',
				title: '提示',
				content: '是否取消收藏？',
				success: (e) => {
					console.log(e);
					if (e.confirm === true) {
						console.log('是');
						//取消收藏
						cancelCollet();
					} else {
						console.log('否');
					}
				}
			});
		} else {
			//收藏
			try {
				let param = {
					rentalId: idstring.value,
					userId: storage.getUserId(),
					saleId: idstring.value,
					operateType: "1"
				};
				serviceHouseInfoBuyHouseAddColletion(param).then((res: any) => {
					console.log(res);
					init();
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const cancelCollet = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		try {
			let param = {
				rentalId: idstring.value,
				userId: storage.getUserId(),
				saleId: idstring.value,
				operateType: "0"
			};
			serviceHouseInfoBuyHouseAddColletion(param).then((res: any) => {
				console.log(res);
				init();
			});
		} catch (error) {
			console.log(error);
		}
	};

	//举报
	const jubaoClick = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		uni.navigateTo({
			url: '/pages/service/HouseInformation/jubaoHouse?dataDict=' + JSON.stringify(dataDict.value) + '&type=' + 1
		});
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		idstring.value = options.id || '';
		init();
	});
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
	 .footer-container {
	       position: fixed;
	       bottom: 0;
	       left: 0;
	       right: 0;
	       height: 50px;
	       background-color: white;
	       box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	       z-index: 100;
	       color: white;
	       display: flex;
	       justify-content: center; /* 水平居中 */
	       align-items: center;     /* 垂直居中 */
	       
	     }
		 .talk-button{
		 			 
		 			 display: flex;
		 			 justify-content: center; /* 水平居中 */
		 			 align-items: center;     /* 垂直居中 */
		 			 height: 35px;           /* 需要设置高度 */
		 			 width: 80px;
		 			 margin-right: 10px;
		 			 font-size: 13px;
		 			 color: white;
		 			 background-color: #2A9595;
		 			 border-radius: 5px;
		 			 margin-left: 80px;
		 			 margin-top: 5px;
		 }
		 .order-button {
		              
		     display: flex;
		     justify-content: center; /* 水平居中 */
		     align-items: center;     /* 垂直居中 */
		     height: 35px;           /* 需要设置高度 */
		     width: 80px;
		     margin-right: 10px;
		     font-size: 13px;
		     color: white;
		     background-color: #2A9595;
		     border-radius: 5px;
		     margin-left: 10px;
		     margin-top: 5px;
		 }
    }
</style>