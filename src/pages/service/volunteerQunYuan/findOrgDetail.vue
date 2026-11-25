<template>
    <view class="main">
        <u-navbar
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
		<view class="headerV">
			<u-avatar style="margin-left: 45%;"
			  :src="dataDict.head_img"
			  number="50px"
			></u-avatar>
			<view style="width: 100%;height: 20px;font-size: 13px;margin-top: 10px;text-align: center;color: white;">{{dataDict.address}}</view>
			<view style="width: 100%;height: 20px;font-size: 16px;margin-top: 5px;text-align: center;color: white;">{{dataDict.name}}</view>
			<view style="width: 100%;height: 20px;font-size: 16px;margin-top: 5px;text-align: center;color: white;">{{dataDict.purpose}}</view>
		</view>
		<view style="display: flex;flex-direction: row;background-color: white;margin-bottom: 20px;margin-top: 10px;">
			<view style="display: flex;flex-direction: column;align-items: center;width: 33.3%;height: 40px;">
				<view style="font-size: 12px;color: red;margin-top: 3px;">{{dataDict.actNum}}</view>
				<view style="font-size: 12px;">公益次数</view>
			</view>
			<view style="width: 1px;height: 40px;background-color: gray;"></view>
			<view style="display: flex;flex-direction: column;align-items: center;width: 33.3%;height: 40px;">
				<view style="font-size: 12px;color: red;margin-top: 3px;">{{dataDict.volNum}}</view>
				<view style="font-size: 12px;">组织人数</view>
			</view>
			<view style="width: 1px;height: 40px;background-color: gray;"></view>
			<view style="display: flex;flex-direction: column;align-items: center;width: 33.3%;height: 40px;">
				<view style="font-size: 12px;color: red;margin-top: 3px;">{{dataDict.rank}}</view>
				<view style="font-size: 12px;">组织排名</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 15px;color: red;">组织介绍</view>
		<view style="margin-left: 15px; width: 94%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="font-size: 12px;margin-top: 10px;margin-left: 4%;width: 92%;">{{dataDict.description}}</view>
		<view style="margin-left: 15px; width: 94%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="border: 1px darkorange solid;border-radius: 5px;width: 50px;height: 25px;font-size: 12px;margin-top: 10px;margin-left: 15px;display: flex;justify-content: center;align-items: center;color: darkorange;">{{dataDict.type_name}}</view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 15px;color: red;">发布的活动</view>
		<view class="activityListView">
			<view class="list_item" v-for="(item,index) in activityList" :key="index" @click="detailClick(item)">
				<u-image  :src="item.pic"
							 width="375px" 
							height="100px">
				</u-image>
				<view style="display: flex;flex-direction: row;width: 100%;height: 20px;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">{{item.title}}</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: #2A9595;width: 40%;text-align: right;">{{item.actTime}}</view>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
					<u-image style="margin-top: 12px;margin-left: 15px;" :src="locationAddress"
								  width="12px"
								  height="15px"></u-image>
					<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.distance}}</view>
					<u-image style="margin-top: 12px;margin-left: 15px;" :src="stbuilding"
								  width="15px"
								  height="15px"></u-image>
					<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.street_name}}</view>
					<u-image style="margin-top: 12px;margin-left: 15px;" :src="ifgroup"
								  width="15px"
								  height="15px"></u-image>
					<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.max_num}}人</view>
					<view v-if="item.actStatusFlag === '活动进行中'" style="background-color: #2A9595;" class="buttonView" >
						<u-image style="margin-top: 3px;margin-left: 15px;" :src="arcoDesign"
									  width="15px"
									  height="15px"></u-image>
						<view style="color: white;font-size: 13px;">活动报名中</view>
					</view>
					<view v-if="item.actStatusFlag === '报名已截止' || item.actStatusFlag === '活动已结束'" style="background-color: lightgray" class="buttonView" >
						<u-image style="margin-top: 3px;margin-left: 15px;" :src="arcoDesign"
									  width="15px"
									  height="15px"></u-image>
						<view style="color: white;font-size: 13px;">活动已结束</view>
					</view>
				</view>			  
				<view style="margin-top: 30px;width: 100%;height: 10px;background-color: aliceblue;"></view>			 
			</view>
		</view>
		<view style="width: 100%;height: 50px;background-color: white;"></view>
		<view v-if="status === '-1'" class="footer-container" @click="joinClick()">加入组织</view>
		<view v-if="status === '1'" class="footer-container" @click="exitClick()">退出组织</view>
		<u-modal :show="show" @confirm="confirm" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view style="font-size: 13px;">再次申请需要审核</view>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
	serviceFindActivityOrgDetail,
	serviceFindActivityList,
	serviceFindActivityOrgDetailJoinParty,
	serviceFindActivityUserYnVolAndInfo,
	serviceFindOrganizationExitOrg
} from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#ff0000");
const hotImage = ref("/static/home/downImage.png");
const normalImg = ref('/static/home/homestay.png');
const activityList = ref<any[]>([]);
const org_id = ref('');
const dataDict = ref<any>({});
const latitude = ref<any>('');
const longitude = ref<any>('');
const locationAddress = ref('/static/integral/locationAddress.png');
const stbuilding = ref('/static/mine/stbuilding.png');
const ifgroup = ref('/static/mine/ifgroup.png');
const arcoDesign = ref('/static/mine/arcoDesign.png');
const page = ref(1);
const type = ref('');
const type_id = ref('');
const street_id = ref('');
const index = ref('');
const status = ref('');
const show = ref(false);
const title = ref('已退出');

onLoad((options: any) => {
	org_id.value = options.id || '';
});

onMounted(() => {
	init();
	uni.getLocation({
		success: (res: any) => {
			console.log(res);
			latitude.value = res.latitude;
			longitude.value = res.longitude;
			loadData();
		}
	});
});

const init = () => {
	try {
		let param = {
			org_id: org_id.value,
			userId: storage.getUserId(),
		};
		serviceFindActivityOrgDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			status.value = res.result.status;
		});
	} catch (error) {
		console.log(error);
	}
};

const loadData = () => {
	try {
		let param = {
			page: page.value,
			size: 20,
			latitude: latitude.value,
			longitude: longitude.value,
			type: type.value,
			type_id: type_id.value,
			street_id: street_id.value,
			index: index.value,
			org_id: org_id.value,
		};
		serviceFindActivityList(param).then((res: any) => {
			console.log(res);
			activityList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const joinClick = () => {
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
					title: '确认加入？',
					content: '',
					cancelText: '取消',
					confirmText: '确定',
					success: (res: any) => {
						if (res.confirm) {
							sureJoin();
						}
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const sureJoin = () => {
	try {
		let param = {
			org_id: org_id.value,
			userId: storage.getUserId(),
		};
		serviceFindActivityOrgDetailJoinParty(param).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const exitClick = () => {
	try {
		let param = {
			org_id: org_id.value,
			userId: storage.getUserId(),
		};
		serviceFindOrganizationExitOrg(param).then((res: any) => {
			console.log(res);
			show.value = true;
		});
	} catch (error) {
		console.log(error);
	}
};

const confirm = () => {
	show.value = false;
	init();
};

const personalClick = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/personalFiles'
	});
};

const detailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/activityDetail?id=' + item.id + '&longitude=' + longitude.value + '&latitude=' + latitude.value
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .headerV{
		 background-color: #ff0000;
		 width: 100%;
		 height: 180px;
		 display: flex;
		 flex-direction: column;
	 }
	 .activityListView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 .list_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 height: 220px;
		 }
	 }
	 .buttonView{
		 display: flex;
		 flex-direction: row;
		 margin-top: 10px;
		 margin-left: 60px;
		 border-radius: 4px;
		 width: 100px;
		 height: 20px;
	 }
	 .footer-container {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   right: 0;
	   height: 50px;
	   background-color: red;
	   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	   z-index: 100;
	   color: white;
	   display: flex;
	   justify-content: center;
	   align-items: center;
	   font-size: 15px;
	 }
    }
</style>