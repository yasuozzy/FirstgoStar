<template>
    <view class="main">
         <u-navbar
		  title="我的征集"
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;font-weight: 700;">{{dataDict.title}}</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;margin-right: 15px;">{{dataDict.content}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="specsView">征集范围  {{dataDict.man_name}}</view>
		<view class="specsView">征集来源  {{dataDict.source}}</view>
		<view v-if="dataDict.type === 0 && dataDict.mode === '0'" class="specsView">征集模式  每户一票</view>
		<view v-if="dataDict.type === 0 && dataDict.mode === '1'" class="specsView">征集模式  每人一票</view>
		<view class="specsView">起止日期  {{dataDict.start_date}}-{{dataDict.end_date}}</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		
		<view v-if="dataDict.type === 0 && dataDict.chooseMap" style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的选择  {{dataDict.chooseMap.option_name}}</view>
		<view v-if="dataDict.type === 1" style="display: flex;flex-direction: column;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的建议</view>
			<view v-if="dataDict.fillMap" style="margin-top: 10px;margin-left: 15px;font-size: 14px;">建议人 {{dataDict.fillMap.user_name}}</view>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 20px;background-color: aliceblue;"></view>
		<view v-if="dataDict.type === 0" style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的意见</view>
		<view v-if="dataDict.type === 1" style="margin-top: 10px;margin-left: 15px;font-size: 14px;">提出意见</view>
		<textarea v-if="dataDict.type === 0 && dataDict.chooseMap" style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" :value="dataDict.chooseMap.content" disabled="true">
		</textarea>
		<textarea v-if="dataDict.type === 1 && dataDict.fillMap" style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" :value="dataDict.fillMap.content" disabled="true">
		</textarea>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceMyOpinionCollectDetail } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const idstring = ref('');
const dataDict = ref<any>({});

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	loadData();
});

const loadData = () => {
	try {
		let param = {
			user_id: storage.getUserId(),
			id: idstring.value,
		};
		serviceMyOpinionCollectDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
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
	.specsView{
		display: flex;
		margin-left: 15px;
		font-size: 12px;
		margin-top: 5px;
	}
}
</style>