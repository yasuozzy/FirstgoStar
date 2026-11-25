<template>
    <view class="main">
        <u-navbar
          title="打卡定位"
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
		<view class="page-section page-section-gap">
			<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">我的位置</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: red;">{{location}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">签到位置</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.location}}</view>
		</view>
		<view class="buttonView" @click="dakaClick()">打    卡</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { calculateDistance } from '@/utils/distance';
import { isDateInRange } from '@/utils/dateUtils';
import { ServiceHomeCareGotoSignToRecord } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const clock_in_time = ref('');
const latitude = ref<any>('');
const longitude = ref<any>('');
const location = ref('');
const dataDict = ref<any>({});
const order_id = ref('');
const realType = ref('');
const canDaka = ref(0);
const type = ref('');
const service_img_path = ref('');
const old_name = ref('');
const content_id = ref('');
const content_name = ref('');
const currentPosition = ref<any>({ longitude: null, latitude: null });
const targetPosition = ref<any>({ longitude: null, latitude: null });
const covers = ref<any[]>([]);
const meters = ref<number>(0);
const currentDateTime = ref('');

onLoad((options: any) => {
	if (options.dataDict) {
		dataDict.value = JSON.parse(options.dataDict);
		old_name.value = dataDict.value.old_name || '';
		targetPosition.value = {
			longitude: dataDict.value.longitude,
			latitude: dataDict.value.latitude
		};
	}
	order_id.value = options.order_id || '';
	clock_in_time.value = options.clock_in_time || '';
	type.value = options.type || '';
	service_img_path.value = options.service_img_path || '';
	content_id.value = options.content_id || '';
	content_name.value = options.content_name || '';
	console.log(dataDict.value);
});

onMounted(() => {
	getCurrentDateTime();
	choseLocation();
});

const getCurrentDateTime = () => {
	const now = new Date();
	currentDateTime.value = now.toString();
	clock_in_time.value = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const choseLocation = () => {
	uni.getLocation({
		type: 'gcj02',
		geocode: true,
		success: (res: any) => {
			console.log(res);
			latitude.value = res.latitude;
			longitude.value = res.longitude;
			location.value = res.address ? res.address.poiName : '';
			currentPosition.value = {
				longitude: longitude.value,
				latitude: latitude.value
			};
			nengfouQianDao();
		}
	});
};

const nengfouQianDao = () => {
	if (!currentPosition.value.longitude || !currentPosition.value.latitude) {
		return;
	}
	meters.value = calculateDistance(currentPosition.value, targetPosition.value);
	console.log(meters.value);
	const result = isDateInRange(dataDict.value.service_start_time, dataDict.value.service_end_time);
	console.log(result);
	if (meters.value <= dataDict.value.distance && result.isInRange === true) {
		canDaka.value = 1;
	} else {
		canDaka.value = 0;
	}
};

const dakaClick = () => {
	if (canDaka.value === 1) {
		gotoDaKa();
	} else {
		uni.showToast({ title: '不在打卡范围内，请重新定位', icon: 'none' });
	}
};

const gotoDaKa = () => {
	let param = {
		service_user_id: storage.getUserId(),
		order_id: order_id.value,
		clock_in_time: clock_in_time.value,
		type: type.value,
		service_img_path: service_img_path.value,
		service_old_name: old_name.value,
		location: location.value,
		longitude: longitude.value,
		latitude: latitude.value,
		content_id: content_id.value,
		content_name: content_name.value,
	};
	ServiceHomeCareGotoSignToRecord(param).then((res: any) => {
		console.log(res);
		uni.navigateBack();
	});
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
	  .buttonView{
	              margin-top: 30px;
	              background-color: #2A9595;
	              border-radius: 5px;
	              color: white;
	              font-size: 14px;
	              margin-left: 5%; 
	              display: flex;
	              justify-content: center;
	              align-items: center;
	              height: 40px;
	              width: 90%;
	     }
    }
</style>