<template>
	<view class="container">
		
		<view class="custom-navbar">
		  <view class="navbar-content">
		    <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		    <view class="segment-container">
		      
			  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
			  	<view style="color: white;font-size: 15px;">通知</view>
			  	
			  	<view class="whiteLine" v-if="type === '1'"></view>
			  </view>
			  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
			  	<view  style="color: white;font-size: 15px;">公告</view>
			  	
			  	<view class="whiteLine" v-if="type === '2'"></view>
			  </view>
			  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
			  	<view  style="color: white;font-size: 15px;">官网</view>
			  	
			  	<view class="whiteLine" v-if="type === '3'"></view>
			  </view>
		    </view>
		  </view>
		</view>
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in contentList" :key="index" @click="detailClick(item)">
				<view style="text-align: center;font-size: 13px;margin-top: 5px;">{{item.create_time}}</view>
					<view class="bottomView">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.content}}</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;">查看详情 ></view>
				</view>
				
			</view>
		</view>
		

	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceNotice } from '@/api/service';
import { storage } from '@/utils/storage';

const type = ref("1");
const contentList = ref<any[]>([]);
const page = ref(1);
const DataParam = ref({
	page: 0,
	userId: "",
	type: '1',
	size: 10,
});
const flowid = ref('');
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);

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
		DataParam.value.userId = storage.getUserId();
		DataParam.value.type = type.value;
		DataParam.value.page = page.value;
		serviceNotice(DataParam.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				contentList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					contentList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({
					title: '没有更多数据',
					icon: 'none'
				});
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

const segment1Click = () => {
	type.value = "1";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const segment2Click = () => {
	type.value = "2";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const segment3Click = () => {
	type.value = "3";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const detailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/noticeDetail?flowid=' + item.id
	});
};
</script>

<style lang="scss" scoped>
	.container {
		background-color: aliceblue;
		min-height: 100vh;
		width: 100%;
		.flex{
			display: flex;
		}
		.custom-navbar {
		  height: calc(var(--status-bar-height) + 44px);
		  position: relative;
		  width: 100%;
		  background-color: #2A9595;
		}
		
		.navbar-content {
		  display: flex;
		  align-items: center;
		  height: 100%;
		  padding: 0 15px;
		}
		
		.back-icon {
		  margin-right: 10px;
		}
		
		.segment-container{
			display: flex;
			flex-direction: row;
			background-color: #2A9595;
			margin-left: 4%;
			width: 92%;
			height: 40px;
			margin-top: calc(var(--status-bar-height));
		}
		.whiteLine{
				 margin-left: 30%;
				 margin-top: 5px;
				 width: 40%;
				 height: 2px;
				 background-color: white;
		}
		.contentListView{
			display: flex;
			flex-direction:column;
			width: 100%;
			background-color: aliceblue;
		}
		.content_item{
			display: flex;
			flex-direction: column;
			margin-left: 3%;
			width: 94%;
			background-color: aliceblue;
			margin-top: 10px;
		}
		.bottomView{
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 5px;
			background-color: white;
			border-radius: 4px;
		}
	}
</style>