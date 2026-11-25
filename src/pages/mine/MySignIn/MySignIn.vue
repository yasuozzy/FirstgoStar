<template>
    <view class="main">
        <u-navbar
          title="网格"
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
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: royalblue;"></view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的登记</view>
			</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in oamanageList"
				  :key="index" @click="financialClick(item.title)"
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
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineWanggeEventsGetYnSubmitHouse} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const oamanageList = ref([
    	{image:'/static/mine/mysignin.png',title:'我的登记'},
    	{image:'/static/mine/wanggedengji.png',title:'网格登记'},
    	
    ]);
            
       
    const goBack= () => {
    		
    	uni.navigateBack()
    };
    const financialClick = async(title:any) => {
    	
    	if (title === '我的登记') {
    		
    		uni.navigateTo({
    			url:'/pages/mine/MySignIn/myDengJi'
    		})
    	}else if(title === '网格登记'){
    		
    		let param = {
    			userId:getStorage(storageKeys.userId,'')
    		};
    		try {
    			
    			const res = await MineWanggeEventsGetYnSubmitHouse(param);
    			console.log(res);
    			const resultData = res.result;
    			if(resultData === true){
    				
    				uni.navigateTo({
    					url:'/pages/mine/MySignIn/messageRegistList'
    				})
    			}else
    			{
    				uni.navigateTo({
    					url:'/pages/mine/MySignIn/messageRegister'
    				})
    			}
    			
    		} catch (error) {
    			//TODO handle the exception
    			console.log(error);
    		}
    	}
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