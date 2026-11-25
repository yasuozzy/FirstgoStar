<template>
    <view class="main">
        <u-navbar
          title="共享用工"
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
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">共享用工</view>
			</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in shareUseWorklist"
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
	import {MineGetEmergencyOrderIsWOrker} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const shareUseWorklist = ref([
		{name:'派工登记',icon:'/static/mine/mydaifuImg.png'},
		{name:'派遣工单',icon:'/static/mine/newpaiqianImg.png'},
		{name:'洽谈工单',icon:'/static/mine/companyIn.png'},
		{name:'员工管理',icon:'/static/mine/employerManage.png'},
		{name:'协议记录',icon:'/static/mine/protocalNotes.png'},
	]);
	const message = ref('/static/service/message.png');
            
	const financialClick = (name:any) => {
		
		if (name === '派工登记') {
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/SharePingTai/sendworkDengJi'
			})
			
		}else if(name === '派遣工单'){
			
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/SharePingTai/PingTaiShareUseSendOrderList?userType=${1}&type=${1}&navTitle=${encodeURIComponent('派遣工单')}`
			})
			
		}else if(name === '洽谈工单'){
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/SharePingTai/PingTaiShareUseSendOrderList?userType=${1}&type=${0}&navTitle=${encodeURIComponent('洽谈工单')}`
			})
			
			
		}else if(name === '员工管理'){
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/SharePingTai/AddNewMember'
			})
			
			
		}else if(name === '协议记录'){
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/SharePingTai/useWorkProtocal?userType=${1}`
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