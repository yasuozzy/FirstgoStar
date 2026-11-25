<template>
    <view class="main">
        <u-navbar
          title="新增人员"
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
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">姓名</view>
			<input class="searchlocation"  v-model="name"  placeholder="填写姓名"  type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">联系电话</view>
			<input class="searchlocation"  v-model="mobile"  placeholder="填写联系电话"  type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">身份证号</view>
			<input class="searchlocation"  v-model="userCard"  placeholder="填写身份证号" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">家庭住址</view>
			<input class="searchlocation"  v-model="homeAddress"  placeholder="填写家庭住址" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">单位名称</view>
			<input class="searchlocation"  v-model="shopName"  placeholder="填写单位名称" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">单位地址</view>
			<input class="searchlocation"  v-model="shopAddress"  placeholder="填写单位地址" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="saveClick">保存</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsMySignInAddOtherUserInfo} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const name = ref();
	const mobile = ref();
	const userCard = ref();
	const homeAddress = ref();
	const shopName = ref();
	const shopAddress = ref();
	
	onLoad((options:any) => {
		dataDict.value = JSON.parse(options.dataDict);
		console.log(dataDict.value);
		name.value = dataDict.value.name;
		mobile.value = dataDict.value.mobile;
		userCard.value = dataDict.value.userCard;
		homeAddress.value = dataDict.value.homeAddress;
		shopName.value = dataDict.value.shopName;
		shopAddress.value = dataDict.value.shopAddress;
		
	});
	const saveClick = async() => {
		
		if(name.value.length === 0){
			uni.showToast({
				title:'请填写姓名',
				icon:'none',
			})
			return;
		}
		if(mobile.value.length === 0){
			uni.showToast({
				title:'请填写联系方式',
				icon:'none',
			})
			return;
		}
		if(userCard.value.length === 0){
			uni.showToast({
				title:'请填写身份证号',
				icon:'none',
			})
			return;
		}
		if(homeAddress.value.length === 0){
			uni.showToast({
				title:'请填写家庭住址',
				icon:'none',
			})
			return;
		}
		if(shopName.value.length === 0){
			uni.showToast({
				title:'请填单位名称',
				icon:'none',
			})
			return;
		}
		if(shopAddress.value.length === 0){
			uni.showToast({
				title:'请填单位地址',
				icon:'none',
			})
			return;
		}
		
		try {
			
			let param = {
				
				
				userId:storage.getUserId(),
				name:name.value,
				mobile:mobile.value,
				cardNum:userCard.value,
				homeAddress:homeAddress.value,
				shopName:shopName.value,
				shopAddress:shopAddress.value
			};
			const res = await MineNeedToolsMySignInAddOtherUserInfo(param);
							
			console.log(res);
			uni.showToast({
				title:'新增人员成功',
				icon:'none',
			})
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
			   width: 50%;
			   height: 25px;
			   margin-top: 10px;
			   font-size: 13px;
			   text-align: right;
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
			  height: 35px;           /* 需要设置高度 */
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