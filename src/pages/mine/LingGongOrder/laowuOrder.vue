<template>
    <view class="main">
        <u-navbar
          title="劳务工单"
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
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 80%;">接单状态</view>
			<switch color="#2A9595" :checked="jiedanStatus" style="transform:scale(0.8);align-items: right;margin-top: 10px;" @change="switchChange" />
		</view>
		<view class="oamanageView">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: royalblue;"></view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">劳务工单</view>
			</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in useworkerList"
				  :key="index" @click="useworkerClick(item.name)"
				>
				  <u-image
				    :src="item.icon"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.name }}</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunYuanLaoWuOrderIfAccept,MineJiuYeQunYuanLaoWuOrderChangeSwitch} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const useworkerList = ref([
		{name:'洽谈工单',icon:'/static/mine/newqiatanImg.png'},
		{name:'派遣工单',icon:'/static/mine/newpaiqianImg.png'},
		{name:'协议记录',icon:'/static/mine/protocalNotes.png'},
	]);
	const jiedanStatus = ref(false);
	const status = ref(0);
            
	onMounted(() => {
	  init();
	});
        
	const init = async() => {
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				type:1,
			};
			MineJiuYeQunYuanLaoWuOrderIfAccept(param).then((res) =>{
							
				console.log(res);
				if (res.result === '1') {
					
					jiedanStatus.value = true;
					
				}else
				{
					jiedanStatus.value = false;
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	
	const useworkerClick = (name:any) => {
		
		if (name === '洽谈工单') {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/laowuTalkOrderList?type=${0}&userType=${1}`
			})
			
		}else if (name === '派遣工单') {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/laowuTalkOrderList?type=${1}&userType=${1}`
			})
			
		}if (name === '协议记录') {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/myProtocal?userType=${1}`
			})
			
		}
	};
	const switchChange = (e:any) => {
		console.log(e.detail.value);
		
		if (e.detail.value == false) {
			
			status.value = 0;
		}else
		{
			status.value = 1;
		}
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				type:status.value,
			};
			MineJiuYeQunYuanLaoWuOrderChangeSwitch(param).then((res) =>{
							
				console.log(res);
				if (status.value == 1) {
					
					uni.showToast({
						title:'接单中',
						icon:'none'
					})
					
				}else
				{
					uni.showToast({
						title:'停止接单',
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
          .oamanageView{
          	  display: flex;
          	  
          	  flex-direction: column;
          	  margin-left: 4%;
          	  width: 92%;
          	  margin-top: 10px;
          	  background-color: white;
          	  border-radius: 8px;
          	  .itemview{
          	  	display: flex;
          	  	flex-direction: row;
          	  	flex-wrap: wrap; /* 允许换行 */
          	  	margin-bottom: 10px;
          	  	.situation_item {
          	  	  width: 25%;
          	  	  font-size: 12px;
          	  	  color: #000;
          	  	  margin-top: 15px;
          	  	  box-sizing: border-box;
          	  	  display: flex;
          	  	  flex-direction: column;
          	  	  align-items: center;
          	  	  height: 65upx;
          	  			margin-bottom: 30px;
          	  			.item_text{
          	  				margin-top: 8px;
          	  			}
          	  	}
          	  }
          } 
    }
</style>