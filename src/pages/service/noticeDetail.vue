<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="通知详情"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
			<template #left>
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			</template>
			<template #right></template>
		</u-navbar>
		<!-- <web-view src="https://www.baidu.com"></web-view> -->
		<view style="margin-top: 10px;width: 100%;font-size: 16px;text-align: center;">{{datadict.title}}</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 4%;width: 92%;">
			<view style="font-size: 12px;color: darkgray;">{{datadict.sendmen}}</view>
			<view style="font-size: 12px;color: darkgray;margin-left: 15px;">{{datadict.sendtime}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;margin-top: 10px;">
			<div v-html="datadict.content"></div>
		</view>
		<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 200px;"></view>
		<view style="margin-left: 15px;color: darkgray; font-size: 13px;margin-top: 10px;">评论</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="replyView" v-for="(item,index) in commentArr" :key="index">
				<view v-if="item.type == 0" style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.avatar"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.user_name}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 11px;width: 40%;color: darkgray;text-align: right;">{{item.time}}</view>
						</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;width: 300px;">{{item.content}}</view>
					</view>
				</view>
				<view v-if="item.type == 1" style="display: flex;flex-direction: row;">
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.user_name}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 11px;width: 40%;color: darkgray;text-align: right;">{{item.time}}</view>
						</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;width: 300px;">{{item.content}}</view>
					</view>
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.avatar"
					  width="35px"
					  height="35px"
					></u-image>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceNoticeDetail, serviceNoticeDetailCommentList } from '@/api/service';

const bgColor = ref("#2A9595");
const flowid = ref('');
const DataParam = ref({
	flowid: "",
});
const datadict = ref<any>({});
const commentArr = ref<any[]>([]);
const page = ref(1);

onLoad((options: any) => {
	flowid.value = options.flowid || '';
	console.log(flowid.value);
	init();
	loadCommentData();
});

const init = () => {
	try {
		DataParam.value.flowid = flowid.value;
		serviceNoticeDetail(DataParam.value).then((res: any) => {
			console.log(res);
			datadict.value = res.result;
			console.log(datadict.value);
		});
	} catch (error) {
		console.log(error);
	}
};

const loadCommentData = () => {
	try {
		let param = {
			flowid: flowid.value,
			page: page.value,
			size: 30,
		};
		serviceNoticeDetailCommentList(param).then((res: any) => {
			console.log(res);
			commentArr.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #ffffff;
		.flex{
			display: flex;
		}
		.replyView{
			display: flex;
			flex-direction: row;
			width: 100%;
		}
	}
</style>