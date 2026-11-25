<template>
    <view class="main">
        <u-navbar
          title="活动签到"
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
		<view class="choseView" @click="choseActivity()">
			<view style="width: 90%;font-size: 14px;text-align: left;">{{title}}</view>
			<u-image style="margin-top: 15px;margin-left: 10px;" :src="hotImage"
						  width="12px"
						  height="7px"></u-image>
		</view>
		<view class="headerView">
			<view style="display: flex;flex-direction: column;">
				<u-image style="margin-top: 10px;margin-left: 90px;" :src="riFillhearts"
						  width="20px"
						  height="20px"></u-image>
				<view style="margin-left: 100px;width: 1px;height: 100px;background-color: red;"></view>
				<u-image style="margin-left: 90px;" :src="riFillhearts"
						  width="20px"
						  height="20px"></u-image>
			</view>
			<view style="display: flex;flex-direction: column;">
				<view style="margin-top: 10px;margin-left: 5px;font-size: 14px;">活动开始时间：{{dataDict.stime}}</view>
				<view style="display: flex;flex-direction: row;margin-top: 30px;">
					<image style="margin-left:10px;width: 20px;height: 20px;" :src="zelocation"></image>
					<view style="font-size: 13px;margin-left: 10px;">{{dataDict.address}}</view>
				</view>
				<view style="margin-top: 20px;margin-left: 5px;font-size: 14px;">活动结束时间：{{dataDict.etime}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 150px;display: flex;justify-content: center;align-items: center;">
			<view v-if="canDaka == 0" class="buttonView" style="background-color: gray;">{{signStatusFlag}}</view>
			<view v-if="canDaka == 1" class="buttonView" @click="qiandaoClick()">{{signStatusFlag}}</view>
		</view>
		<view v-if="is_sign != 1" style="display: flex;flex-direction: row;width: 100%;">
			<view v-if="canDaka == 1" style="display: flex;flex-direction: row;">
				<u-image style="margin-top: 13px;margin-left: 15px;"
				  :src="choose_select"
				  mode="aspectFill"
				  width="15px"
				  height="15px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">已进入爱心范围:{{sign_address}}</view>
			</view>
			<view v-if="canDaka == 0" style="display: flex;flex-direction: row;">
				<u-image style="margin-top: 13px;margin-left: 15px;"
				  :src="del_red"
				  mode="aspectFill"
				  width="15px"
				  height="15px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">未进入爱心社区:{{sign_address}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: #2A9595;" @click="relocation()">去重新定位</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
	serviceFindActivityDetail,
	serviceActivitySign,
	ServiceSheChuangActivityGotoSign
} from '@/api/service';
import { storage } from '@/utils/storage';
import { calculateDistance, formatDistance } from '@/utils/distance';
import { isDateInRange } from '@/utils/dateUtils';

const bgColor = ref("#2A9595");
const act_id = ref('');
const activityList = ref<any[]>([]);
const normalImg = ref('/static/home/homestay.png');
const hotImage = ref("/static/home/downImage.png");
const riFillhearts = ref('/static/service/riFillhearts.png');
const ifusers = ref('/static/service/ifusers.png');
const zelocation = ref('/static/service/zelocation.png');
const startTime = ref('10:00');
const signTime = ref('9:45');
const location = ref('都昌街道影戏社区');
const endTime = ref('18:00');
const normalLocation = ref('未进入爱心范围：都昌街道影戏社区');
const longitude = ref<any>('');
const latitude = ref<any>('');
const dataDict = ref<any>({});
const is_sign = ref<any>('');
const title = ref('');
const sign_address = ref('');
const itemList = ref<any[]>([]);
const canDaka = ref(0);
const choose_select = ref('/static/login/choose_select.png');
const del_red = ref('/static/login/del_red.png');
const currentPosition = ref<any>({ longitude: null, latitude: null });
const targetPosition = ref<any>({ longitude: null, latitude: null });
const signStatusFlag = ref('签到');
const meters = ref<number | null>(null);

const formattedDistance = computed(() => {
	if (meters.value === null) return '未知';
	return formatDistance(meters.value);
});

onLoad((options: any) => {
	act_id.value = options.act_id || '';
	if (act_id.value.length > 0) {
		getSignActivity();
	} else {
		uni.getLocation({
			success: (res: any) => {
				console.log(res);
				latitude.value = res.latitude;
				longitude.value = res.longitude;
				currentPosition.value = {
					longitude: longitude.value,
					latitude: latitude.value
				};
				loadData();
			}
		});
	}
});

const loadData = () => {
	try {
		let param = {
			userId: storage.getUserId(),
			act_id: act_id.value,
			longitude: longitude.value,
			latitude: latitude.value,
		};
		serviceFindActivityDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			is_sign.value = res.result.is_sign;
			targetPosition.value = {
				longitude: dataDict.value.longitude,
				latitude: dataDict.value.latitude
			};
			sign_address.value = dataDict.value.address;
			if (is_sign.value == 1) {
				signStatusFlag.value = '已签到';
			} else {
				if (!currentPosition.value.longitude || !currentPosition.value.latitude) {
					return;
				}
				meters.value = calculateDistance(currentPosition.value, targetPosition.value);
				console.log(meters.value);
				const resInRange = isDateInRange(dataDict.value.stime, dataDict.value.etime);
				if (meters.value <= dataDict.value.sign_range && resInRange.isInRange === true) {
					canDaka.value = 1;
				} else {
					canDaka.value = 0;
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const getSignActivity = () => {
	try {
		let param = { userId: storage.getUserId() };
		serviceActivitySign(param).then((res: any) => {
			console.log(res);
			if (act_id.value.length === 0) {
				act_id.value = res.result.act_id;
				title.value = res.result.title;
				uni.getLocation({
					success: (resLoc: any) => {
						latitude.value = resLoc.latitude;
						longitude.value = resLoc.longitude;
						currentPosition.value = {
							longitude: longitude.value,
							latitude: latitude.value
						};
						loadData();
					}
				});
			} else {
				const resultData = res.result;
				itemList.value = resultData.map((item: any) => item.title);
				activityList.value = resultData;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const qiandaoClick = () => {
	try {
		let param = {
			userId: storage.getUserId(),
			act_id: dataDict.value.id,
			sign_address: sign_address.value,
		};
		ServiceSheChuangActivityGotoSign(param).then((res: any) => {
			console.log(res);
			uni.showToast({ title: '签到成功', icon: 'none' });
			uni.navigateBack();
		});
	} catch (error) {
		console.log(error);
	}
};

const choseActivity = () => {
	uni.showActionSheet({
		itemList: itemList.value,
		success: (res: any) => {
			title.value = itemList.value[res.tapIndex];
			act_id.value = activityList.value[res.tapIndex].act_id;
			loadData();
		},
		fail: (res: any) => {
			console.log(res.errMsg);
		}
	});
};

const relocation = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/actRelocation?order_id=' + act_id.value + '&dataDict=' + JSON.stringify(dataDict.value)
	});
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
	 .choseView{
		 width: 92%;
		 margin-left: 4%;
		 height: 30px;
		 display: flex;
		 flex-direction: row;
		 border-bottom: 1px lightgray solid;
		 margin-top: 10px;
	 }
	 .headerView{
		 margin-top: 10px;
		 width: 100%;
		 display: flex;
		 flex-direction: row;
	 }
	 .buttonView{
		 margin-top: 30px;
		 width: 130px;
		 height: 130px;
		 border-radius: 75px;
		 color: white;
		 background-color: #2A9595;
		 font-size: 20px;
		 text-align: center;
		 display: flex;
		 justify-content: center;
		 align-items: center;
	 }
    }
</style>