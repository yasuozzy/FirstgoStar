<template>
    <view class="main">
        <u-navbar
          title="明细"
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
		<view class="segment-container">
		  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
		  	<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">缴费</view>
		  	<view v-else style="color: black;font-size: 15px;">缴费</view>
		  	<view class="whiteLine" v-if="type === '1'"></view>
		  </view>
		  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
		  	<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">预缴</view>
		  	<view v-else style="color: black;font-size: 15px;">预缴</view>
		  	<view class="whiteLine" v-if="type === '2'"></view>
		  </view>
		  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
		  	<view  v-if="type === '3'" style="color: #2A9595;font-size: 15px;">退款</view>
		  	<view v-else style="color: black;font-size: 15px;">退款</view>
		  	<view class="whiteLine" v-if="type === '3'"></view>
		  </view>
		</view>
		<view v-if="type === '1'">
			<view class="yujiaoListView">
				<view class="yujiao_item" v-for="(item,index) in hisData" :key="index">
					<view class="headerView">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 44%;">{{item.chargename}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 44%;text-align: right;">{{item.actualpayment}}</view>
					</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;"></view>
					<view style="margin-top: 10px;background-color: aliceblue;width: 100%;height: 1px;"></view>
				</view>
			</view>
			<view class="yujiaoListView">
				<view class="yujiao_item" v-for="(item,index) in normalData" :key="index" @click="jiaofeiDetClick(item)">
					<view class="headerView">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 44%;">{{item.name}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 44%;text-align: right;">{{item.actualpayment}}</view>
					</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;">{{item.paymenttime}}</view>
					<view style="margin-top: 10px;background-color: aliceblue;width: 100%;height: 1px;"></view>
				</view>
			</view>
		</view>
		<view v-if="type === '2'">
			<view class="segment-container">
			  <view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="kind1Click">
			  	<view v-if="kind === '1'" style="color: #2A9595;font-size: 15px;">充值</view>
			  	<view v-else style="color: black;font-size: 15px;">充值</view>
			  	<view class="whiteLine1" v-if="kind === '1'"></view>
			  </view>
			  <view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="kind2Click">
			  	<view  v-if="kind === '2'" style="color: #2A9595;font-size: 15px;">扣款</view>
			  	<view v-else style="color: black;font-size: 15px;">扣款</view>
			  	<view class="whiteLine1" v-if="kind === '2'"></view>
			  </view>
			</view>
			<view class="yujiaoListView">
				<view class="yujiao_item" v-for="(item,index) in yujiaoList" :key="index" @click="yuchongDetailClick(item)">
					<view class="headerView">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">{{item.hse_name}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 24%;text-align: right;color: #2A9595;">￥{{item.amount}}</view>
					</view>
					<view v-if="kind === '2'" style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;">{{item.meter}}</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;">{{item.create_time}}</view>
					<view style="margin-top: 10px;background-color: aliceblue;width: 100%;height: 1px;"></view>
				</view>
			</view>
		</view>
		<view v-if="type === '3'">
			<view class="yujiaoListView">
				<view class="yujiao_item" v-for="(item,index) in cancelList" :key="index" @click="tuikuanClick(item)">
					<view class="headerView">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">{{item.house_name}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 24%;text-align: right;color: #2A9595;">{{item.statusFlag}}</view>
					</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;">{{item.create_time}}</view>
					<view style="margin-top: 10px;background-color: aliceblue;width: 100%;height: 1px;"></view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import {
	servicePayHistoryData,
	servicePayOtherData,
	serviceyuJiaoChongZhi,
	serviceyuJiaoKouKuan,
	serviceCancelMoney
} from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const type = ref('1');
const yujiaoList = ref<any[]>([]);
const cancelList = ref<any[]>([]);
const kind = ref('1');
const hisParam = ref({
	house_id: '',
});
const hisData = ref<any[]>([]);
const normalParam = ref({
	house_id: '',
	page: 0,
	pageSize: 10,
	mobile: '',
});
const normalData = ref<any[]>([]);
const yujiaoChongZhi = ref({
	userId: '',
	size: 10,
	page: 0,
});
const yujiaoKouKuan = ref({
	hseId: '',
	size: 10,
	page: 0,
});
const cancelParam = ref({
	userId: '',
	size: 20,
	page: 0,
});
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);
const page = ref(1);

onMounted(() => {
	initHistory();
	normalPayMentData();
});

onPullDownRefresh(() => {
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	if (type.value === '1') {
		initHistory();
		normalPayMentData();
	} else if (type.value === '2') {
		if (kind.value === '1') {
			yujiaoChongZhiData();
		} else if (kind.value === '2') {
			yujiaoKouKuanData();
		}
	} else if (type.value === '3') {
		cancelMoneyData();
	}
});

onReachBottom(() => {
	if (loading.value || !hasMore.value) {
		return;
	}
	page.value += 1;
	if (type.value === '1') {
		initHistory();
		normalPayMentData();
	} else if (type.value === '2') {
		if (kind.value === '1') {
			yujiaoChongZhiData();
		} else if (kind.value === '2') {
			yujiaoKouKuanData();
		}
	} else if (type.value === '3') {
		cancelMoneyData();
	}
});

const initHistory = () => {
	try {
		hisParam.value.house_id = storage.getHseid() ? storage.getHseid() : '11111111111111fsdfdsfdafdsf';
		servicePayHistoryData(hisParam.value).then((res: any) => {
			console.log(res);
			hisData.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const normalPayMentData = () => {
	try {
		normalParam.value.house_id = storage.getHseid() ? storage.getHseid() : '11111111111111fsdfdsfdafdsf';
		normalParam.value.mobile = storage.getPhone();
		normalParam.value.page = page.value;
		servicePayOtherData(normalParam.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				normalData.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					normalData.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({ title: '没有更多数据', icon: 'none' });
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		uni.stopPullDownRefresh();
	}
};

const yujiaoChongZhiData = () => {
	try {
		yujiaoChongZhi.value.userId = storage.getUserId();
		yujiaoChongZhi.value.page = page.value;
		serviceyuJiaoChongZhi(yujiaoChongZhi.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				yujiaoList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					yujiaoList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({ title: '没有更多数据', icon: 'none' });
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		uni.stopPullDownRefresh();
	}
};

const yujiaoKouKuanData = () => {
	try {
		yujiaoKouKuan.value.hseId = storage.getHseid();
		yujiaoKouKuan.value.page = page.value;
		serviceyuJiaoKouKuan(yujiaoKouKuan.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				yujiaoList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					yujiaoList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({ title: '没有更多数据', icon: 'none' });
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		uni.stopPullDownRefresh();
	}
};

const cancelMoneyData = () => {
	try {
		cancelParam.value.userId = storage.getUserId();
		cancelParam.value.page = page.value;
		serviceCancelMoney(cancelParam.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				cancelList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					cancelList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({ title: '没有更多数据', icon: 'none' });
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		uni.stopPullDownRefresh();
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const segment1Click = () => {
	type.value = "1";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	initHistory();
	normalPayMentData();
};

const segment2Click = () => {
	type.value = "2";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	if (kind.value === '1') {
		yujiaoChongZhiData();
	} else {
		yujiaoKouKuanData();
	}
};

const segment3Click = () => {
	type.value = "3";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	cancelMoneyData();
};

const kind1Click = () => {
	kind.value = "1";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	yujiaoChongZhiData();
};

const kind2Click = () => {
	kind.value = "2";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	yujiaoKouKuanData();
};

const jiaofeiDetClick = (item: any) => {
	uni.navigateTo({
		url: `/pages/service/jiaofei/JiaoFeiOterDetail?id=${item.orderno}`
	});
};

const yuchongDetailClick = (item: any) => {
	if (kind.value === '1') {
		uni.navigateTo({
			url: `/pages/service/jiaofei/yuchongDetail?id=${item.id}`
		});
	} else {
		uni.navigateTo({
			url: `/pages/service/jiaofei/yuchongKouKuanDet?id=${item.id}`
		});
	}
};

const tuikuanClick = (item: any) => {
	uni.navigateTo({
		url: `/pages/service/jiaofei/tuikuanDetail?id=${item.id}`
	});
};
</script>

<style lang="scss" scoped>
    .main {
         min-height: 100vh;
         width: 100%;
         background-color: aliceblue;
          .flex{
              display: flex;
          }
	 .segment-container{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 40px;
	 }
	 .whiteLine{
		 margin-left: 20%;
		 margin-top: 5px;
		 width: 60%;
		 height: 2px;
		 background-color: #2A9595;
	 }
	 .whiteLine1{
	 		 margin-left: 30%;
	 		 margin-top: 5px;
	 		 width: 40%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .yujiaoListView{
	 	display: flex;
	 	flex-direction: column;
	 	width: 100%;
	 	background-color: aliceblue;
	 }
	 .yujiao_item{
	 	display: flex;
	 	flex-direction: column;
	 	width: 100%;
	 	background-color: white;
	 }
	 .headerView{
	 	display: flex;
	 	flex-direction: row;
	 }
    }
</style>