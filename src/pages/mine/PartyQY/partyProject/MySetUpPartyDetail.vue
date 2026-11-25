<template>
	<view class="main">
	        <u-navbar
	          title="项目信息"
	          :safeAreaInsetTop="true"
	          :placeholder="true"
	          :fixed="true"
	          :border="false"
	          :bgColor="bgColor"
	          titleStyle="color: #fff;"
	        >
				<template #left>
				  <view class="u-nav-slot" slot="left">
					<view class="flex">
						<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
					</view>
				  </view>
				</template>
	        </u-navbar>
			<image style="width: 100%;height: 210px;" :src="picture" mode="aspectFill"></image>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="margin-left: 15px;width: 70%;font-size: 14px;">{{title}}</view>
				<view style="margin-left: 15px;font-size: 13px;color: gray;">{{user_name}}</view>
				<view style="margin-left: 15px;font-size: 13px;color: red;">{{mem_num}}</view>
			</view>
			<view style="width: 100%;margin-top: 15px;margin-left: 4%;width: 92%;font-size: 14px;">{{summary}}</view>
			<view v-if="button_status == 0" class="choseBtn" >审核中</view>
			<view v-if="button_status == 1" class="ButtonView" >
				<view class="shenheBtn" @click="personClick">人员管理</view>
				<view class="shenheBtn" @click="addProsess">添加进展</view>
				<view class="shenheBtn" @click="prosessShenHe">进展审批</view>
			</view>
			<view v-if="button_status == 2" class="choseBtn" >未通过</view>
			<view v-if="button_status == 3" class="choseBtn" >已终止</view>
			<view v-if="button_status == 4" class="choseBtn" >已完成</view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;height: 40px;background-color: aliceblue;">
				<view style="margin-left: 15px;width: 10px;height: 20px;background-color: red;margin-top: 10px;"></view>
				<view style="font-size: 14px;margin-left: 10px;margin-top: 10px;width: 80%;">项目进展</view>
				<image style="width: 15px;height: 15px;margin-top: 10px;" src="/static/service/my_arrow.png" mode="aspectFit"></image>
			</view>
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view class="goods_item" v-for="(item, index) in progressList" :key="index" >
				  <view style="display: flex; flex-direction: row">
						<view style="display: flex;flex-direction: column;">
						  <view style="margin-left: 15px;font-size: 13px;margin-top: 10px;">{{item.done_date}}</view>
						  <u-image
						    style="border-radius: 4px; margin-top: 10px; margin-left: 15px"
						    :src="item.picture"
						    width="80px"
						    height="80px"
						  ></u-image>
						</view>
						<view style="display: flex;flex-direction: column;">
							<view v-if="index == 0" style="width: 20px;height: 20px;border-radius: 50%;background-color: red;margin-left: 15px;flex-shrink: 0;"></view>
							<view style="width: 1px;height: 100%;background-color: red;margin-left: 24px;"></view>
							<view style="width: 20px;height: 20px;border-radius: 50%;background-color: red;margin-left: 15px;flex-shrink: 0;"></view>
						</view>
						<view style="display: flex; flex-direction: column; width: 60%;margin-left: 15px;">
							<view class="goods-name">{{ item.title }}</view>	
							<view style="font-size: 12px; margin-top: 20px; margin-left: 5px">{{ item.summary }}</view>
							<view style="display: flex;flex-direction: row;margin-top: 20px;">
								<image style="width: 15px;height: 15px;" src="/static/mine/locations.png" mode="aspectFit"></image>
								<view style="font-size: 12px; color: gray;  margin-left: 5px">{{ item.address }}</view>
							</view>
							<view class="goods-divider"></view>
						</view>
				  </view>
				</view>
			</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { PartyBuildGetMySetUpPartyInfo} from '@/api/mine';

	// 背景颜色
	const bgColor = ref("#FF0000");
	const project_id = ref('');
	const picture = ref('');
	const title = ref('');
	const user_name = ref('');
	const mem_num = ref('');
	const summary = ref('');
	const progressList = ref([]);
	const button_status = ref('');
	const pro_user_id = ref('');
	
	onLoad((options:any) => {
		project_id.value = options.project_id;
		console.log(project_id.value);
	});
	onMounted(() => {
		
		getDetail();
	});
	const getDetail = async() =>{
		
		let param = {
			project_id:project_id.value,
			user_id:getStorage(storageKeys.userId,'')
		};
		try {
			const res = await PartyBuildGetMySetUpPartyInfo(param);
			console.log(res);
			picture.value = res.result.picture;
			title.value = res.result.title;
			user_name.value = res.result.user_name;
			mem_num.value = res.result.mem_num;
			summary.value = res.result.summary;
			progressList.value = res.result.progressList;
			button_status.value = res.result.status;
			pro_user_id.value = res.result.pro_user_id;
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
		
	};
	
	const personClick = () => {
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/PartyMemberManage?project_id=${project_id.value}`
		})
	};
	const addProsess = () => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/PartyAddProgress?project_id=${project_id.value}`
		})
	};
	const prosessShenHe = () => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/PartyProgressManage?project_id=${project_id.value}`
		})
	};
	const goBack = () =>{
		
		uni.navigateBack()
	};
	
</script>

<style>
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
		.goods_item {
		  display: flex;
		  flex-direction: column;
		  
		  .goods-name {
		    font-size: 14px;
		    margin-top: 10px;
		    margin-left: 5px;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    width: 80%;
		  }
		  .goods-divider {
		    margin-top: 15px;
		    margin-left: 3%;
		    width: 94%;
		    height: 1px;
		    background-color: lightgray;
		  }
		}
		.youtitle
		{
			 background-color: red;
			 color: white;
			 border-radius: 3px;
			 width: 20px;
			 height: 20px;
			 margin-top: 10px;
			 text-align: center;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 font-size: 12px;
		}
		.choseBtn
		{
			width: 100px;
			height: 40px;
			background-color: red;
			color: white;
			border-radius: 5px;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			text-align: center;
			font-size: 13px;
			margin-left: 265px;
		}
		.ButtonView
		{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 60px;
			margin-top: 10px;
			align-items: center;
		}
		.shenheBtn{
			
			margin-top: 10px;
			margin-left: 15px;
			width: 105px;
			height: 40px;
			background-color: red;
			color: white;
			border-radius: 5px;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			text-align: center;
			font-size: 13px;
		}
	}
</style>