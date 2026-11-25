<template>
    <view class="main">
        <u-navbar
          title="签到"
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
          <template #right>
            <view @click="notesClick">
                <view class="homestayView">签到记录</view>
            </view>
          </template>
        </u-navbar>
		<view style="width: 100%;height: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">服务时间</view>
		<view class="timeView">{{clock_in_time}}</view>
		<view class="signView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">服务签到</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="qiandaoClick">
				<view v-if="type === '1'" style="background-color: #2A9595;height: 30px;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 40px;color: white;" >签到</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 40px;height: 30px; color: white;">签到</view>
			</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="qiantuiClick">
				<view v-if="type === '2'" style="background-color: #2A9595;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 40px;height: 30px; color: white;">签退</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 40px;height: 30px; color: white;">签退</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">服务地点</view>
		<view class="timeView">{{location}}</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">服务对象</view>
		<view class="timeView">
			<input style="font-size: 13px;" v-model="old_name" placeholder="请填写服务对象" />
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">服务内容</view>
		<view class="timeView" @click="choseServiceClick()">
			<view style="width: 70%;">{{content_name}}</view>
			<u-image style="margin-left: 200px;"
			  :src="downImage"
			  width="12px"
			  height="8px"
			></u-image>
		</view>
		
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">上传服务照片</view>
		<view class="imagechooseView">
		            <uni-file-picker 
		            v-model="imageValue"  
		            file-mediatype="image"
		            mode="grid"
		            file-extname="png,jpg"
		            :image-styles="imageStyles"
		            @progress="progress" 
		            @success="success" 
		            @fail="fail" 
		            @select="select" 
		            limit="9" >
						<view class="custom-upload-btn">
						  <image :src="selectphoto" ></image>
						</view>
					</uni-file-picker>
		</view>
		<view style="display: flex;width: 100%;height: 200px;align-items: center;justify-content: center;">
			<view v-if="canDaka == 0" class="dakaButton" style="background-color: darkgray;">打卡</view>
			<view v-if="canDaka == 1" class="dakaButton" style="background-color: #2A9595;" @click="gotoDaKa()">打卡</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view v-if="canDaka == 1" style="display: flex;flex-direction: row;">
				<u-image style="margin-top: 13px;margin-left: 15px;"
				  :src="choose_select"
				  mode="aspectFill"
				  width="15px"
				  height="15px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">已进入打卡范围:{{location}}</view>
			</view>
			<view v-if="canDaka == 0" style="display: flex;flex-direction: row;">
				<u-image style="margin-top: 13px;margin-left: 15px;"
				  :src="del_red"
				  mode="aspectFill"
				  width="15px"
				  height="15px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">未进入打卡范围:{{location}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: #2A9595;" @click="relocation()">去重新定位</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getFormattedDate } from '@/utils/common';
import { ServiceHomeCareGotoSignGetServiceList, ServiceHomeCareGotoSignToRecord } from '@/api/service';
import { isDateInRange } from '@/utils/dateUtils';
import { calculateDistance, formatDistance } from '@/utils/distance';
import { storage, BaseURL } from '@/utils/storage';

const bgColor = ref("#2A9595");
const selectphoto = ref('/static/mine/selectphoto.png');
const type = ref('1');
const downImage = ref('/static/home/downImage.png');
const choose_select = ref('/static/login/choose_select.png');
const del_red = ref('/static/login/del_red.png');
const imageStyles = ref({
	width: 80,
	height: 80,
	border: {
		color: "lightgray",
		width: 1,
		style: 'dashed',
		radius: '2px'
	}
});
const result = ref<any>({});
const longitude = ref<any>('');
const latitude = ref<any>('');
const clock_in_time = ref('');
const location = ref('都昌华苑锦绣小区');
const old_name = ref('');
const content_name = ref('');
const content_id = ref('');
const order_id = ref('');
const choseService = ref(false);
const serviceArr = ref<any[]>([]);
const servicetitleArr = ref<any[]>([]);
const canDaka = ref(0);
const meters = ref<number | null>(null);
const currentPosition = ref<any>({ longitude: null, latitude: null });
const targetPosition = ref<any>({ longitude: null, latitude: null });
const tempFilePaths = ref<any[]>([]);
const service_img_path = ref('');
const uploadedCount = ref(0);
const imageValue = ref<any[]>([]);

const formattedDistance = computed(() => {
	if (meters.value === null) return '未知';
	return formatDistance(meters.value);
});

onLoad((options: any) => {
	if (options.result) {
		result.value = JSON.parse(options.result);
		old_name.value = result.value.old_name || '';
		content_name.value = result.value.content_name || '';
		if (content_name.value.length > 0) {
			choseService.value = false;
		} else {
			choseService.value = true;
		}
		content_id.value = result.value.content_id || '';
		targetPosition.value = {
			longitude: result.value.longitude,
			latitude: result.value.latitude
		};
	}
	order_id.value = options.order_id || '';
	clock_in_time.value = getFormattedDate();
});

onMounted(() => {
	init();
	currentLocation();
});

const init = () => {
	try {
		let param = {};
		ServiceHomeCareGotoSignGetServiceList(param).then((res: any) => {
			console.log(res);
			serviceArr.value = res.result;
			servicetitleArr.value = res.result.map((item: any) => item.content_name);
		});
	} catch (error) {
		console.log(error);
	}
};

const currentLocation = () => {
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

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const qiandaoClick = () => {
	type.value = '1';
};

const qiantuiClick = () => {
	type.value = '2';
};

const choseServiceClick = () => {
	uni.showActionSheet({
		itemList: servicetitleArr.value,
		success: (res: any) => {
			content_name.value = servicetitleArr.value[res.tapIndex];
			content_id.value = serviceArr.value[res.tapIndex].content_id;
		},
		fail: (res: any) => {
			console.log(res.errMsg);
		}
	});
};

const nengfouQianDao = () => {
	if (!currentPosition.value.longitude || !currentPosition.value.latitude) {
		return;
	}
	meters.value = calculateDistance(currentPosition.value, targetPosition.value);
	console.log(meters.value);
	const resInRange = isDateInRange(result.value.service_start_time, result.value.service_end_time);
	if (meters.value <= result.value.distance && resInRange.isInRange === true) {
		canDaka.value = 1;
	} else {
		canDaka.value = 0;
	}
};

const select = (e: any) => {
	console.log('选择文件：', e);
	tempFilePaths.value = e.tempFilePaths;
	getImageUrl();
};

const getImageUrl = () => {
	tempFilePaths.value.forEach((filePath, index) => {
		uni.uploadFile({
			url: BaseURL + 'AppWorkOrder/addUploadIms',
			filePath: filePath,
			name: 'multipartFile',
			formData: { type: "jpg" },
			success: (uploadFileRes) => {
				uploadedCount.value++;
				const responseData = JSON.parse(uploadFileRes.data);
				appendToImgValue(responseData.data, index);
			}
		});
	});
};

const appendToImgValue = (imageUrl: string, currentIndex: number) => {
	if (service_img_path.value === '') {
		service_img_path.value = imageUrl;
	} else {
		service_img_path.value += ',' + imageUrl;
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
		uni.navigateTo({
			url: '/pages/service/smartFeedOlder/signNotes?order_id=' + order_id.value
		});
	});
};

const notesClick = () => {
	uni.navigateTo({
		url: '/pages/service/smartFeedOlder/signNotes?order_id=' + order_id.value
	});
};

const relocation = () => {
	uni.navigateTo({
		url: '/pages/service/smartFeedOlder/Relocation?order_id=' + order_id.value + '&dataDict=' + JSON.stringify(result.value) + '&clock_in_time=' + clock_in_time.value + '&type=' + type.value + '&service_img_path=' + service_img_path.value + '&content_name=' + content_name.value + '&content_id=' + content_id.value
	});
};

const progress = (e: any) => {};
const success = (e: any) => {};
const fail = (e: any) => {};
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
	 .timeView{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 30px;
		 border: 1px lightgray solid;
		 border-radius: 5px;
		 font-size: 14px;
		 display: flex;
		 align-items: center; 
		}
		.signView{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 40px;
		}
		.imagechooseView{
        margin-top: 10px;
        margin-left: 5%;
        width: 90%;
        height: 100px;
    }
	.buttonView{
	    background-color: #2A9595;
	    border-radius: 60px;
	    color: white;
	    font-size: 20px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    height: 120px;
	    width: 120px;
	}
	.custom-upload-btn {
	  width: 64px;
	  height: 64px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.custom-upload-btn image {
	  width: 100%;
	  height: 100%;
	}
	.dakaButton{
			 margin-top: 30px;
			 width: 130px;
			 height: 130px;
			 border-radius: 75px;
			 color: white;
			 font-size: 20px;
			 text-align: center;
			 display: flex;
			 justify-content: center;
			 align-items: center;
	}
}
</style>