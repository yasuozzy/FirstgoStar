<template>
	<view class="main">
	        <u-navbar
	          title="党员项目"
	          
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
			<view style="display: flex;flex-direction: row;width: 100%;height: 40px;background-color: aliceblue;">
				<view style="margin-left: 15px;width: 10px;height: 20px;background-color: red;margin-top: 10px;"></view>
				<view style="font-size: 14px;margin-left: 10px;margin-top: 10px;width: 70%;">我发起的项目</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 10px;color: gray;" @click="faqiMore">更多 ></view>
			</view>
			<view v-if="dataArray.length == 0" class="faqiBlankView">
				<u-image
				 
				  src="/static/mine/blankParty.jpg"
				  width="25px"
				  height="25px"
				></u-image>
				<view style="font-size: 13px;margin-left: 10px;color: gray;">您还未发起任何项目</view>
			</view>
			<view v-if="dataArray.length > 0" style="display: flex;flex-direction: column;width: 100%;">
				<view class="goods_item" v-for="(item, index) in dataArray" :key="index" @click="setUpClick(item)">
				  <view style="display: flex; flex-direction: row">
				    <u-image
				      style="border-radius: 4px; margin-top: 10px; margin-left: 15px"
				      :src="item.picture"
				      width="120px"
				      height="80px"
				    ></u-image>
				    <view style="display: flex; flex-direction: column; width: 60%">
						<view style="display: flex;flex-direction: row;">
							<view class="goods-name">{{ item.title }}</view>
							<view v-if="item.is_good == 1" class="youtitle">优</view>
						</view>
						<view style="text-align: right;font-size: 14px;color: lawngreen;width: 95%;margin-top: 10px;">{{item.statusFlag}}</view>
					    <view style="font-size: 12px; color: gray; margin-top: 10px; margin-left: 5px">
						{{ item.user_name }}{{item.create_time}}
					    </view>
				    </view>
				  </view>
				  <view class="goods-divider"></view>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 40px;background-color: aliceblue;">
				<view style="margin-left: 15px;width: 10px;height: 20px;background-color: red;margin-top: 10px;"></view>
				<view style="font-size: 14px;margin-left: 10px;margin-top: 10px;width: 70%;">我参与的项目</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 10px;color: gray;" @click="joinMore">更多 ></view>
			</view>
			<view v-if="JoinArray.length == 0" class="faqiBlankView">
				<u-image
				 
				  src="/static/mine/blankParty.jpg"
				  width="25px"
				  height="25px"
				></u-image>
				<view style="font-size: 13px;margin-left: 10px;color: gray;">您还未参与任何项目</view>
			</view>
			<view v-if="JoinArray.length > 0" style="display: flex;flex-direction: column;width: 100%;">
				<view class="goods_item" v-for="(item, index) in JoinArray" :key="index" @click="joinClick(item)">
				  <view style="display: flex; flex-direction: row">
				    <u-image
				      style="border-radius: 4px; margin-top: 10px; margin-left: 15px"
				      :src="item.picture"
				      width="120px"
				      height="80px"
				    ></u-image>
				    <view style="display: flex; flex-direction: column; width: 60%">
						<view style="display: flex;flex-direction: row;">
							<view class="goods-name">{{ item.title }}</view>
							<view v-if="item.is_good == 1" class="youtitle">优</view>
						</view>
						<view style="text-align: right;font-size: 14px;color: lawngreen;width: 95%;margin-top: 10px;">{{item.statusFlag}}</view>
					    <view style="font-size: 12px; color: gray; margin-top: 10px; margin-left: 5px">
						{{ item.user_name }}{{item.create_time}}
					    </view>
				    </view>
				  </view>
				  <view class="goods-divider"></view>
				</view>
			</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { PartyBuildMyIniPartyProject,PartyBuildMyJoinPartyProject } from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#FF0000");
	const dataArray = ref([]);
	const JoinArray = ref([]);
	onMounted(() => {
		
		getMyIniProjectList();
		getMyJoinProjectList();
		
	});
	const getMyIniProjectList = async() =>{
		
		
		try {
			let param = {
				size:10,
				page:1,
				user_id:getStorage(storageKeys.userId,''),
				status:1
			};
			const res = await PartyBuildMyIniPartyProject(param);
			console.log(res);
			
			if (res.result.length < 3) {
				
				dataArray.value = res.result;
				
			}else
			{
				dataArray.value = res.result.slice(0,3);
			}
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
		
	};
	const getMyJoinProjectList = async() =>{
		
		
		try {
			let param = {
				size:10,
				page:1,
				user_id:getStorage(storageKeys.userId,''),
				status:1
			};
			const res = await PartyBuildMyJoinPartyProject(param);
			console.log(res);
			
			if (res.result.length < 3) {
				
				JoinArray.value = res.result;
				
			}else
			{
				JoinArray.value = res.result.slice(0,3);
			}
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
		
	};
	const setUpClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/MySetUpPartyDetail?project_id=${item.project_id}`
		})
	};
	const joinClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/MyJoinPartyDetail?project_id=${item.project_id}&rec_id=${item.rec_id}`
		})
	};
	const faqiMore = () => {
		
		uni.navigateTo({
			url:'/pages/mine/PartyQY/partyProject/SetUpMoreProjectList'
		})
	};
	const joinMore = () => {
		
		uni.navigateTo({
			url:'/pages/mine/PartyQY/partyProject/JoinMoreProjectList'
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
			   margin-top: 10px;
			   
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
			 .faqiBlankView
			 {
				display: flex;
				flex-direction: row; 
				width: 100%;
				height: 50px;
				align-items: center;
				justify-content: center;
				text-align: center;
			 }
	   }
</style>