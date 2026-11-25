<template>
    <view class="main">
        <u-navbar
          title="零工工单"
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
		  <template #right>
			  <view slot="right" @click="mesasgeClick()">
				  <u-image
					:src="message"
					width="25px"
					height="25px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view class="oamanageView">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: red;"></view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">零工工单</view>
			</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in linggongList"
				  :key="index" @click="financialClick(item.name)"
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
	import {MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const linggongList = ref([
	]);
	const message = ref('/static/service/message.png');
            
	onLoad((options:any) => {
		
		linggongList.value = JSON.parse(options.linggongList);
	});
       
	const financialClick = async(type:any) => {
		
		if (type === '用工工单') {
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/linggonguseWorkerOrder'
			})
		}else if(type === '劳务工单'){
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/laowuOrder'
			})
			
		}else if(type === '招聘登记'){
			
			
			try {
				let param = {
					userId:storage.getUserId(),
				};
				const res = await MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo(param);
					
				console.log(res);
				if (res.result === '1') {
					
					//已通过
					uni.navigateTo({
						url:'/pages/mine/LingGongOrder/zhaopinPass'
					})
					
				}else if (res.result === '-1') {
					
					//未通过，去提交审核
					uni.navigateTo({
						url:'/pages/mine/LingGongOrder/zhaopinDengJi'
					})
				}
					
				
			} catch (error) {
				console.log(error)
			} 
			
		}
	};
	const mesasgeClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/LingGongOrder/linggongMessage'
		})
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
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