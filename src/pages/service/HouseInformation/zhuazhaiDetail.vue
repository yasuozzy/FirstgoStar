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
			<view style="width: 33.33%;" v-for="(item,index) in dataList" :key="index">
				<view style="font-size: 14px;text-align: center;">{{item}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 5px;">
			<view style="width: 33.33%;" v-for="(item,index) in infoList" :key="index">
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
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">房屋亮点</view>
		<view style="width: 100%;
			  margin-left: 15px;
			  display: flex;
			  flex-direction: row;">
			<view style="border: 1px solid blue;margin-top: 5px ;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;">{{dataDict.highlights}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;margin-top: 10px;" @click="locationClick">
			<u-image style="margin-left: 15px;margin-top: 5px;"
			  :src="locationImg"
			  width="12px"
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
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">出租要求</view>
		<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: gray;">{{dataDict.requirements}}</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 5px;"></view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">房屋设施</view>
		<view v-if="dataDict.rentalType === '合租'" style="width: 100%;height: 100px;display: flex;flex-direction: column;">
			<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
				<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 15px;width: 30px;height: 30px;">
					<u-image 
					  :src="dianshiImg"
					  width="15px"
					  height="15px"
					></u-image>
					<view style="font-size: 10px;width: 20px;height: 15px;color: black;margin-top: 2px;">卧室设施</view>
				</view>
				<view v-for="(item,index) in roomtool" :key="index" style="display: flex;flex-direction: row;">
					<view style="margin-top: 20px;margin-left: 10px;font-size: 10px;">√{{item}}</view>
				</view>
				
			</view>
			<view style="width: 100%;height: 40px;display: flex;flex-direction: row;margin-top: 10px;">
				<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 15px;width: 30px;height: 30px;">
					<u-image 
					  :src="xiyijiImg"
					  width="15px"
					  height="15px"
					></u-image>
					<view style="font-size: 10px;width: 20px;height: 15px;color: black;margin-top: 2px;">公共设施</view>
				</view>
				
				<view v-for="(item,index) in publictool" :key="index" style="display: flex;flex-direction: row;">
					<view style="margin-top: 20px;margin-left: 10px;font-size: 10px;">√{{item}}</view>
				</view>
			</view>
		</view>
		<view v-if="dataDict.rentalType === '整租'">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 4%;width: 92%;">
				<view v-for="(item,index) in roomtool" :key="index" style="display: flex;flex-direction: row;">
					<view style="margin-top: 20px;margin-left: 10px;font-size: 10px;">√{{item}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">房屋介绍</view>
		<view style="font-size: 12px;margin-top: 3px;margin-left: 15px;color: gray;margin-bottom: 30px;">{{dataDict.detailed}}</view>
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
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceHouseInfoHouseDetail, serviceHouseInfoHouseAddColletion } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const swiperList = ref<any[]>([]);
const title = ref('金都时代新城小区');
const dataList = ref<any[]>([]);
const infoList = ref(['月租金', '押金方式', '装修情况']);
const dataList1 = ref<any[]>([]);
const infoList1 = ref(['房屋户型', '建筑面积', '房屋楼层', '是否有电梯']);
const locationImg = ref('/static/integral/locationAddress.png');
const xiyijiImg = ref('/static/service/xiyiji.png');
const downImg = ref('/static/home/downImage.png');
const dianshiImg = ref('/static/service/dianshi.png');
const roomtool = ref<any[]>([]);
const publictool = ref<any[]>([]);
const idstring = ref('');
const dataDict = ref<any>({});
const starCollected = ref('/static/service/collect_selected.png');
const starCollectdefault = ref('/static/service/collect_default.png');
const reportImg = ref('/static/service/report.png');
const userMobile = ref('');
const latitude = ref('');
const longitude = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	init();
});

const init = () => {
	try {
		let param = {
			id: idstring.value,
			userId: storage.getUserId(),
		};
		serviceHouseInfoHouseDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			swiperList.value = res.result.picImgs;
			dataList.value.push(res.result.monthlyRent);
			dataList.value.push(res.result.rentMethod);
			dataList.value.push(res.result.decoration);
			dataList1.value.push(res.result.houseType);
			dataList1.value.push(res.result.builtArea);
			dataList1.value.push(res.result.houseFloor);
			const elevator = res.result.elevator;
			if (elevator === '1') {
				dataList1.value.push('有电梯');
			} else {
				dataList1.value.push('无');
			}
			const allocation = res.result.allocation;
			if (allocation) {
				roomtool.value = allocation.split(',');
			}
			const publicFacilities = res.result.publicFacilities;
			if (publicFacilities) {
				publictool.value = publicFacilities.split(',');
			}
			userMobile.value = res.result.userMobile;
			latitude.value = res.result.latitude;
			longitude.value = res.result.longitude;
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

const chatClick = () => {
	if (dataDict.value.userId === storage.getUserId()) {
		uni.showToast({
			title: '这是你发布的~',
			icon: 'none',
		});
		return;
	}
};

const phoneCall = () => {
	if (dataDict.value.userId === storage.getUserId()) {
		uni.showToast({
			title: '这是你发布的~',
			icon: 'none',
		});
		return;
	}
	uni.makePhoneCall({
		phoneNumber: userMobile.value
	});
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const jubaoClick = () => {
	uni.navigateTo({
		url: '/pages/service/HouseInformation/jubaoHouse?id=' + idstring.value
	});
};

const collectClick = (collectionId: any) => {
	try {
		let param = {
			userId: storage.getUserId(),
			housingRentalId: idstring.value,
			type: '1'
		};
		serviceHouseInfoHouseAddColletion(param).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
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
	.swiper{
		margin-top: 10px;
	}
	.footer-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: #ffffff;
		border-top: 1px solid #e0e0e0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		box-sizing: border-box;
		z-index: 99;
	}
	.talk-button {
		margin-left: 20%;
		background-color: #f0f0f0;
		color: #333333;
		border: 1px solid #cccccc;
		border-radius: 20px;
		padding: 8px 16px;
		font-size: 12px;
	}
	.order-button {
		margin-left: 10px;
		background-color: #2A9595;
		color: #ffffff;
		border: none;
		border-radius: 20px;
		padding: 8px 16px;
		font-size: 12px;
	}
}
</style>