<template>
    <view class="main">
        <u-navbar
          title="活动详情"
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
		<u-image  :src="dataDict.pic"
					 width="375px" 
					height="180px">
		</u-image>
		<view style="display: flex;flex-direction: row;width: 100%;height: 20px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 18px;">{{dataDict.title}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="locationAddress"
					  width="12px"
					  height="15px"></u-image>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{dataDict.distance}}</view>
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="stbuilding"
					  width="15px"
					  height="15px"></u-image>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{dataDict.street_name}}</view>
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="ifgroup"
					  width="15px"
					  height="15px"></u-image>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{dataDict.max_num}}人</view>
		</view>
		<view style="margin-top: 20px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="riFillhearts"
					  width="20px"
					  height="20px"></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 80%;" @click="xiehuidetail">{{dataDict.org_name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="myarrow"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="ifusers"
					  width="20px"
					  height="20px"></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 80%;">{{dataDict.charge_man}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="mdphone"
					  width="20px"
					  height="20px"></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 80%;">{{dataDict.charge_mobile}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="zelocation"
					  width="20px"
					  height="20px"></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 80%;">{{dataDict.address}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="arcoDesignRed"
					  width="20px"
					  height="20px"></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 80%;">{{dataDict.actTime}}{{dataDict.dtime}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;" :src="fatags"
					  width="20px"
					  height="20px"></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 80%;">{{dataDict.type_name}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 80%;color: #2A9595;">活动详情</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 93%;">{{dataDict.description}}</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;" @click="baomingList">
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 75%;color: #2A9595;">已报名志愿者</view>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 40px;color: #2A9595;text-align: right;">{{baomimngNum}}</view>
			<u-image style="margin-top: 14px;margin-left: 10px;" :src="greenArrow"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view class="specsView">
			<view class="specs_item" v-for="(item,index) in specsList" :key="index">
				<u-avatar 
				  :src="item.head_img"
				  size="15"
				></u-avatar>
			</view>
		</view>
		<view style="margin-top: 50px;width: 100%;height: 30px;"></view>
		<view class="footer-container">
			<view v-if="actStatus === '0'" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view v-if="joinStatus === '-1'"  class="doubleButton">
					<view style="margin-left: 15px;width: 165px;height: 35px; margin-top: 10px;font-size: 14px;background-color: yellow;" @click="leaveMessage()">留言咨询</view>
					<view style="margin-left: 15px;width: 165px;height: 35px; margin-top: 10px;font-size: 14px;background-color: darkgray;" @click="baoMingClick()">我要报名</view>
				</view>
				<view v-if="joinStatus === '0'"  class="doubleButton">
					<view style="margin-left: 15px;width: 165px;height: 35px; margin-top: 10px;font-size: 14px;background-color: yellow;" @click="leaveMessage()">留言咨询</view>
					<view style="margin-left: 15px;width: 165px;height: 35px; margin-top: 10px;font-size: 14px;background-color: darkgray;" @click="cancelBaoMing()">取消报名</view>
				</view>
				<view v-if="joinStatus !== '0' && joinStatus !== '-1'"  class="doubleButton">
					<view style="background-color: yellow;"  class="order-button" @click="leaveMessage()">留言咨询</view>
				</view>
			</view>
			<view v-if="actStatus === '1'" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view style="background-color: lightgray;"  class="order-button">报名已截止</view>
			</view>
			<view v-if="actStatus === '2'" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view v-if="joinStatus === '1' && is_sign === '0'"  class="doubleButton">
					<view style="margin-left: 15px;width: 165px;height: 35px; margin-top: 10px;font-size: 14px;background-color: yellow;" @click="leaveMessage">留言咨询</view>
					<view style="margin-left: 15px;width: 165px;height: 35px; margin-top: 10px;font-size: 14px;background-color: red;" @click="qiandaoClick()">去签到</view>
				</view>
				<view v-if="joinStatus !== '1' && is_sign !== '0'"  class="doubleButton">
					<view  style="background-color: yellow;" class="order-button" @click="leaveMessage">留言咨询</view>
				</view>
			</view>
			<view v-if="actStatus === '3'" style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view  style="background-color: yellow;" class="order-button" @click="leaveMessage">留言咨询</view>
			</view>
		 </view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
	serviceFindActivityDetail,
	serviceFindActivityDetailVolunteer,
	serviceFindActivityUserYnVolAndInfo,
	serviceFindActivityConfirmJoinAct,
	serviceFindActivityCancelJoinAct
} from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const normalImg = ref('/static/home/homestay.png');
const headerimage = ref('/static/home/swiper.png');
const baomimngNum = ref(0);
const specsList = ref<any[]>([]);
const idstring = ref('');
const longitude = ref('');
const latitude = ref('');
const dataDict = ref<any>({});
const locationAddress = ref('/static/integral/locationAddress.png');
const searchImage = ref('/static/mine/searchImage.png');
const stbuilding = ref('/static/mine/stbuilding.png');
const ifgroup = ref('/static/mine/ifgroup.png');
const riFillhearts = ref('/static/service/riFillhearts.png');
const myarrow = ref('/static/service/my_arrow.png');
const ifusers = ref('/static/service/ifusers.png');
const mdphone = ref('/static/service/mdphone.png');
const zelocation = ref('/static/service/zelocation.png');
const arcoDesignRed = ref('/static/service/arcoDesignRed.png');
const fatags = ref('/static/mine/fatags.png');
const greenArrow = ref('/static/service/greenArrow.jpg');
const actStatus = ref('');
const joinStatus = ref('');
const is_sign = ref('');
const status = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
	latitude.value = options.latitude || '';
	longitude.value = options.longitude || '';
});

onMounted(() => {
	loadData();
	getbaoMingData();
});

const loadData = () => {
	try {
		let param = {
			userId: storage.getUserId(),
			act_id: idstring.value,
			longitude: longitude.value,
			latitude: latitude.value,
		};
		serviceFindActivityDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			actStatus.value = res.result.actStatus;
			joinStatus.value = res.result.joinStatus;
			is_sign.value = res.result.is_sign;
		});
	} catch (error) {
		console.log(error);
	}
};

const getbaoMingData = () => {
	try {
		let param = { act_id: idstring.value };
		serviceFindActivityDetailVolunteer(param).then((res: any) => {
			console.log(res);
			specsList.value = res.result;
			baomimngNum.value = specsList.value.length;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const baoMingClick = () => {
	try {
		let param = { userId: storage.getUserId() };
		serviceFindActivityUserYnVolAndInfo(param).then((res: any) => {
			console.log(res);
			status.value = res.result.status;
			const mes = res.result.mes;
			if (status.value === '-1') {
				uni.showModal({
					title: '提示',
					content: '您还不是志愿者？',
					cancelText: '取消',
					confirmText: '去申请',
					success: (res: any) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/service/volunteerQunYuan/applyVolunteer'
							});
						}
					}
				});
			} else if (status.value === '0') {
				uni.showToast({ title: '志愿者审核中', icon: 'none' });
			} else if (status.value === '1') {
				uni.showModal({
					title: mes,
					content: '',
					cancelText: '取消',
					confirmText: '去完善资料',
					success: (res: any) => {
						if (res.confirm) {
							personalClick();
						}
					}
				});
			} else if (status.value === '2') {
				uni.showModal({
					title: '确认报名？',
					content: '',
					cancelText: '取消',
					confirmText: '确定',
					success: (res: any) => {
						if (res.confirm) {
							joinActivity();
						}
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const leaveMessage = () => {
	uni.navigateTo({
		url: `/pages/service/volunteerQunYuan/leaveMessage?id=${idstring.value}`
	});
};

const baomingList = () => {
	uni.navigateTo({
		url: `/pages/service/volunteerQunYuan/baomingList?id=${idstring.value}`
	});
};

const xiehuidetail = () => {
	uni.navigateTo({
		url: `/pages/service/volunteerQunYuan/findOrgDetail?id=${dataDict.value.org_id}` 
	});
};

const personalClick = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/personalFiles'
	});
};

const qiandaoClick = () => {
	uni.navigateTo({
		url: `/pages/service/volunteerQunYuan/activitySign?act_id=${idstring.value}`
	});
};

const joinActivity = () => {
	try {
		let param = {
			act_id: idstring.value,
			userId: storage.getUserId(),
		};
		serviceFindActivityConfirmJoinAct(param).then((res: any) => {
			console.log(res);
			specsList.value = [];
			loadData();
			getbaoMingData();
		});
	} catch (error) {
		console.log(error);
	}
};

const cancelBaoMing = () => {
	uni.showModal({
		title: '确定要取消报名？',
		content: '',
		cancelText: '取消',
		confirmText: '确定',
		success: (res: any) => {
			if (res.confirm) {
				sureCancelBaoMing();
			}
		}
	});
};

const sureCancelBaoMing = () => {
	try {
		let param = {
			act_id: idstring.value,
			userId: storage.getUserId(),
		};
		serviceFindActivityCancelJoinAct(param).then((res: any) => {
			console.log(res);
			specsList.value = [];
			loadData();
			getbaoMingData();
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .specsView{
	 	width: 100%;
	 	height: 50px;
	 	display: flex;
	 	margin-top: 10px;
	 	flex-direction: row;
	 	align-items: center;
	 	.specs_item{
	 		align-items: center;
	 		display: flex;
	 		margin-left: 2%;
	 		flex-direction: column;
	 		width: 14.66%;
	 		height: 50px;
	 	}
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
	   justify-content: center;
	   align-items: center;
	 }
	 .order-button {
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 height: 35px;
		 width: 92%;
		 margin-right: 10px;
		 font-size: 14px;
		 color: black;
		 border-radius: 6px;
		 margin-left: 4%;
		 margin-top: 15px;
	 }
	 .doubleButton{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 70px;
	 }
    }
</style>