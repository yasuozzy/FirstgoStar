<template>
    <view class="main">
        <u-navbar
          title="服务工单"
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
		<view class="specsView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind === 1" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine1" v-if="kind === 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === 2" style="color: #2A9595;font-size: 13px;">服务中</view>
				<view v-else style="color: black;font-size: 13px;">服务中</view>
				<view class="whiteLine1" v-if="kind === 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind === 3" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine1" v-if="kind === 3"></view>
			</view>
		</view>
		<view v-if="kind === 1">
			<view class="listView">
				<view class="list_item" v-for="(item,index) in orderList" :key="index">
					<view style="margin-left: 10px;display: flex;flex-direction: column;width: 98%;">
						<view style="font-size: 13px;margin-top: 10px;">{{item.village_name}}服务工单</view>
						<view style="font-size: 13px;margin-top: 10px;">服务对象：{{item.old_name}}</view>
						<view style="font-size: 13px;margin-top: 10px;">地址：{{item.address}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 5px;"></view>
					<view style="margin-left: 10px;display: flex;flex-direction: row;margin-top: 10px;">
						<view class="buttonView" @click="jiedanClick(item)">接单</view>
						<view class="buttonView1" @click="detailClick(item)">查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="kind === 2">
			<view class="listView">
				<view class="list_item" v-for="(item,index) in orderList" :key="index">
					<view style="margin-left: 10px;display: flex;flex-direction: column;width: 98%;">
						<view style="font-size: 13px;margin-top: 10px;">{{item.village_name}}服务工单</view>
						<view style="font-size: 13px;margin-top: 10px;">服务对象：{{item.old_name}}</view>
						<view style="font-size: 13px;margin-top: 10px;">地址：{{item.address}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 5px;"></view>
					<view style="margin-left: 10px;display: flex;flex-direction: row;margin-top: 10px;">
						<view class="buttonView" @click="signClick(item)">去签到</view>
						<view class="buttonView1" @click="detailClick(item)">查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="kind === 3">
			<view class="listView">
				<view class="list_item" v-for="(item,index) in orderList" :key="index">
					<view style="margin-left: 10px;display: flex;flex-direction: column;width: 98%;">
						<view style="font-size: 13px;margin-top: 10px;">{{item.village_name}}服务工单</view>
						<view style="font-size: 13px;margin-top: 10px;">服务对象：{{item.old_name}}</view>
						<view style="font-size: 13px;margin-top: 10px;">地址：{{item.address}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 5px;"></view>
					<view style="margin-left: 10px;display: flex;flex-direction: row;margin-top: 10px;">
						<view class="buttonView2" @click="detailClick(item)">查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" :title="title" >
			<view style="width: 100%;text-align: center;">
				<view style="font-size: 14px;">{{content}}</view>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceSmartServiceOrderList, serviceSmartFeedGetSignInfo, serviceSmartServiceOrdertoOrder } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const kind = ref(1);
const orderList = ref<any[]>([]);
const title = ref('提示');
const content = ref('接单成功');
const show = ref(false);
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);
const page = ref(1);
const keyword = ref('');

onMounted(() => {
	loadData();
});

onPullDownRefresh(() => {
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
});

onReachBottom(() => {
	if (loading.value || !hasMore.value) {
		return;
	}
	page.value += 1;
	loadData();
});

const loadData = () => {
	try {
		let param = {
			page: page.value,
			size: 20,
			index: keyword.value,
			type: kind.value - 1,
			service_user_id: storage.getUserId(),
		};
		serviceSmartServiceOrderList(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				orderList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					orderList.value.push(item);
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

const kind1Click = () => {
	kind.value = 1;
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const kind2Click = () => {
	kind.value = 2;
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const kind3Click = () => {
	kind.value = 3;
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const detailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/smartFeedOlder/orderListDetail?id=' + item.id
	});
};

const jiedanClick = (item: any) => {
	try {
		let param = { id: item.id };
		serviceSmartServiceOrdertoOrder(param).then((res: any) => {
			console.log(res);
			show.value = true;
		});
	} catch (error) {
		console.log(error);
	}
};

const confirm = () => {
	show.value = false;
	kind.value = 2;
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const signClick = (item: any) => {
	getSignInfo(item.id);
};

const getSignInfo = (idstring: string) => {
	try {
		let param = { id: idstring };
		serviceSmartFeedGetSignInfo(param).then((res: any) => {
			console.log(res);
			uni.navigateTo({
				url: '/pages/service/smartFeedOlder/gotoSign?result=' + JSON.stringify(res.result) + '&order_id=' + idstring
			});
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
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 40px;
	 }
	 .whiteLine1{
	 	 margin-left: 20%;
	 	 margin-top: 5px;
	 	 width: 60%;
	 	 height: 2px;
	 	 background-color: #2A9595;
	 }
	 .listView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
	 }
	 .list_item{
		 border: 1px lightgray solid;
		 margin-left: 4%;
		 width: 92%;
		 border-radius: 5px;
		 margin-top: 10px;
		 height: 140px;
		 display: flex;
		 flex-direction: column;
	 }
	 .buttonView{
		 font-size: 13px;
		 width: 70px;
		 height: 25px;
		 border-radius: 3px;
		 color: white;
		 background-color: #2A9595;
		 display: flex;
		 justify-content: center;
		 align-items: center;
	 }
	 .buttonView1{
	 		 font-size: 13px;
	 		 width: 70px;
	 		 height: 25px;
	 		 border-radius: 3px;
	 		 color: white;
	 		 background-color: gray;
	 		 display: flex;
	 		 justify-content: center;
	 		 align-items: center;
			 margin-left: 20px;
	 }
	 .buttonView2{
	 		 font-size: 13px;
	 		 width: 70px;
	 		 height: 25px;
	 		 border-radius: 3px;
	 		 color: white;
	 		 background-color: gray;
	 		 display: flex;
	 		 justify-content: center;
	 		 align-items: center;
	 }
    }
</style>