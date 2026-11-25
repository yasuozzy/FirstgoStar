<template>
    <view class="main">
        <u-navbar
          title="授权管理"
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
		<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{shopName}}</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<image style="width: 40px;height: 40px;margin-left: 15px;margin-top: 10px;" :src="coverimg"></image>
			<view style="display: flex;flex-direction: column;">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{userName}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: #2A9595;border: 1px #2A9595 solid;display: flex;justify-content: center;align-items: center;border-radius: 4px;width: 60px;">{{actor}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataArray" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<image style="width: 40px;height: 40px;margin-left: 15px;margin-top: 10px;" :src="item.grant_user_headimg"></image>
					<view style="display: flex;flex-direction: column;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.grant_user_name}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: #2A9595;border: 1px #2A9595 solid;display: flex;justify-content: center;align-items: center;border-radius: 4px;width: 60px;">{{item.grant_user_role}}</view>
						</view>
						<view style="display: flex;flex-direction: row;width: 300px;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: gray;width: 220px;">{{item.grant_user_mobile}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: #2A9595;border: 1px #2A9595 solid;display: flex;justify-content: center;align-items: center;border-radius: 4px;width: 70px;" @click="freeAuth(item)">解除授权</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="addAuth">添加授权</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentStoreInfoGetMyGrantShopList,
	MineShangquanManageMentStoreInfoRemoveGrantShopManage} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataArray = ref([]);
	const shopName = ref();
	const coverimg = ref();
	const actor = ref();
	const userName = ref();
	
	onLoad((options:any) => {
		shopName.value = options.shopName;
		coverimg.value = options.coverimg;
		actor.value = options.actor;
		userName.value = storage.getRealName() ? storage.getRealName() : storage.getNickName();
	});
	onShow(() => {
		loadData();
	});
	const loadData = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId()
				
			};
			const res = await MineShangquanManageMentStoreInfoGetMyGrantShopList(param);
							
			console.log(res);
			dataArray.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//解除授权
	const freeAuth = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				grant_user_id:item.grant_user_id
			};
			const res = await MineShangquanManageMentStoreInfoRemoveGrantShopManage(param);
							
			console.log(res);
			uni.showToast({
				title:res.result,
				icon:'none'
			});
			loadData();	
			
		}catch (error) {
			console.log(error)
		}
	};
	const addAuth = async() => {
		
		
		uni.navigateTo({
			url:'/pages/mine/ShangQuanManagement/storeGetAuth'
		})
	};
    const goBack= () => {
        
        uni.navigateBack();
    };
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
		  }
		  .footer-container {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 70px;
			background-color: white;
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
			z-index: 100;
			color: white;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			
		  }
		  .order-button {
					   
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 40px;           /* 需要设置高度 */
			  width: 92%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
}
</style>