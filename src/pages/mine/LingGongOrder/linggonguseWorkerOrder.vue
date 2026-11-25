<template>
    <view class="main">
        <u-navbar
          title="用工工单"
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
		<view class="oamanageView">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: royalblue;"></view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">用工工单</view>
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
    import {} from '@/api/mine';
     import {} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const useworkerList = ref([
		{name:'洽谈工单',icon:'/static/mine/newqiatanImg.png'},
		{name:'派遣工单',icon:'/static/mine/newpaiqianImg.png'},
		{name:'网签协议',icon:'/static/mine/newwangqianImg.png'},
	]);
           
			
	const useworkerClick = (name:any) => {
		
		if (name === '洽谈工单') {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/linggongTalkOrderList?type=${0}&userType=${0}`
			})
			
		}else if (name === '派遣工单') {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/linggongTalkOrderList?type=${1}&userType=${0}`
			})
			
		}if (name === '网签协议') {
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/webProtocal'
			})
			
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