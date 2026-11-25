<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="公共决议"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
		<template #left>
			<view slot="left" >
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			</view>
		</template>
		</u-navbar>
		<view class="associationView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">投诉建议</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in gridList"
				  :key="index" @click="jumpTo(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
		<view class="associationView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">意见征集</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in opinionList"
				  :key="index" @click="opinionClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
		<view class="associationView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">选举</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in electionList"
				  :key="index" @click="associationClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
		<view class="associationView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">投票</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in voteList"
				  :key="index" @click="voteClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys} from '@/utils/storage';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const gridList = ref([{image:'/static/mine/tousujianyi.png',title:'投诉建议'}]);
	const opinionList = ref([
		{image:'/static/service/yijianImage.png',title:'意见征集'},
		{image:'/static/service/yijianGSImage.png',title:'意见公示'},
	]);
	const electionList = ref([
		{image:'/static/service/xuanminDJImage.png',title:'选民登记'},
		{image:'/static/service/xuanminGSImage.png',title:'选民公示'},
		{image:'/static/service/gotoVoteImage.png',title:'发起选举'},
		{image:'/static/service/xuanjuGSImage.png',title:'选举公示'},
	]);
	const voteList = ref([
		{image:'/static/service/votingImage.png',title:'投票表决'},
		{image:'/static/service/voteGSImage.png',title:'投票公示'},
	]);
	
	const goBack = () => {
		uni.navigateBack()
	};
	const jumpTo = () => {
		
		console.log(storage.getRealType());
		if(storage.getRealType() == 0){
			
			//认证
			
		}else if(storage.getRealType() == 1){
			
			if(storage.getBldgid()){
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/tousuJianYi'
				})
				
			}else
			{
				uni.showToast({
					title:'暂无房产，无法使用此功能',
					icon:'none'
				})
			}
			
		}
	};
	//意见征集
	const opinionClick = (type:any) => {
		if (type === '意见征集') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/yijianZhengJi'
			})
			
		} else{
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/yijianGongShi'
			})
		}
	};
	//选举
	const associationClick = (type:any) => {
		
		if (type === '选民登记') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/xuanminDengJi'
			})
			
		} else if(type === '选民公示'){
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/xuanminGongShi'
			})
			
		}else if(type === '发起选举'){
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/faqiXuanJu'
			})
			
		}else if(type === '选举公示'){
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/xuanjuGongShi'
			})
		}
	};
	//选举
	const voteClick = (type:any) => {
		
		if (type === '投票表决') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/gotoVote'
			})
			
		} else{
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/publicJustice/voteGongShi'
			})
			
		}
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
		.associationView{
			display: flex;
			flex-direction: column;
			margin-left: 4%;
			width: 92%;
			margin-top: 10px;
			background-color: white;
			border-radius: 5px;
			.itemview{
				display: flex;
				flex-direction: row;
				.situation_item {
				  width: 25%;
				  font-size: 12px;
				  color: #000;
				  margin-top: 20px;
				  box-sizing: border-box;
				  display: flex;
				  flex-direction: column;
				  align-items: center;
				  height: 65upx;
						margin-bottom: 64upx;
						.item_text{
							margin-top: 8upx;
						}
				}
			}
			
		}
	}
</style>