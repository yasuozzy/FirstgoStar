<template>
    <view class="main">
        <u-navbar
          title="店铺授权"
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
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">用户名称</view>
			<input class="searchlocation" v-model="grant_user_name" placeholder="请输入用户姓名" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-left: 4%;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">联系电话</view>
			<input class="searchlocation" v-model="grant_user_mobile" placeholder="请输入联系电话" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-left: 4%;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="getIdentify">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">授权身份:</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 240px;height: 25px;border: 1px solid black;display: flex;flex-direction: row;">
				<view style="margin-left: 5px;font-size: 14px;width: 200px;height: 25px;">{{grant_user_role}}</view>
				<image style="margin-top: 8px;margin-left: 10px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
			</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-left: 4%;margin-top: 15px;"></view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="getAuth">授权</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentStoreInfoGrantShopManage} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const grant_user_name = ref();
	const grant_user_mobile = ref();
	const grant_user_role = ref('请选择');
	const itemList = ref(['店小二']);
	
	const getIdentify = () => {
		
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				grant_user_role.value = itemList.value[res.tapIndex]
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//授权
	const getAuth = async() => {
		
		if (grant_user_name.value.length === 0) {
			
			uni.showToast({
				title:'请输入用户名称',
				icon:'none'
			});
			return;
		}
		if (grant_user_mobile.value.length === 0) {
			
			uni.showToast({
				title:'请输入联系电话',
				icon:'none'
			});
			return;
		}
		if (grant_user_role.value === '请选择') {
			
			uni.showToast({
				title:'请选择授权身份',
				icon:'none'
			});
			return;
		}
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				grant_user_mobile:grant_user_mobile.value,
				grant_user_name:grant_user_name.value,
				grant_user_role:grant_user_role.value
			};
			const res = await MineShangquanManageMentStoreInfoGrantShopManage(param);
							
			console.log(res);
			uni.navigateBack();
			
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
		  .searchlocation{
			   margin-left: 10px;
			   width: 250px;
			   height: 30px;
			   margin-top: 10px;
			   font-size: 14px;
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