<template>
    <view class="main">
        <u-navbar
          title="创建子账号"
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
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">用户名称</view>
			<input style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 200px;" v-model="username" placeholder="填写姓名" />
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{dataDict.phone}}</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">设置密码</view>
			<input style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 200px;" v-model="password" placeholder="填写姓名" />
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">确认密码</view>
			<input style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 200px;" v-model="pwd" placeholder="填写姓名" />
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;" @click="chooseAuth">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">授权身份</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 70%;">{{title}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view class="protocalView">
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">我已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;">《用户协议》</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="shouquanClick">授权</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineHouseInfomationAuthNewAcountPersonhorize} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const dataDict = ref({});
	const title = ref('选择');
	const itemList = ref(['家属', '租户']);
	const hcptype = ref(2);
	const username = ref();
	const password = ref();
	const pwd = ref();
	const selected = ref(false);
	
	onLoad((options:any) => {
		
		dataDict.value = JSON.parse(options.dataDict);
	});
	const chooseAuth = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				title.value = itemList.value[res.tapIndex];
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	
	};
	//授权
	const shouquanClick = async() => {
		
		if(username.value.length === 0){
			uni.showToast({
				title:'请填写用户名称',
				icon:'none',
			})
			return
		}
		if(password.value.length === 0){
			uni.showToast({
				title:'请填写密码',
				icon:'none',
			})
			return
		}
		if(pwd.value.length === 0){
			uni.showToast({
				title:'请再次填写密码',
				icon:'none',
			})
			return
		}
		if(title.value === '选择'){
			uni.showToast({
				title:'请选择授权身份',
				icon:'none',
			})
			return
		}
		
		try {
			
			let param = {
				
				mobile:dataDict.value.phone,
				userid:storage.getUserId(),
				username:username.value,
				password:password.value,
				pwd:pwd.value,
				hcptype:hcptype.value,
				houseid:dataDict.value.houseid
			};
			const res = await MineHouseInfomationAuthNewAcountPersonhorize(param);
							
			console.log(res);
			
			uni.showToast({
				title:'授权成功',
				icon:'none',
			})
			uni.navigateBack()
		  
		}catch (error) {
			console.log(error)
		}
	};
	const chooseselect = () => {
		
	   selected.value = !selected.value
	   
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
		  .protocalView{
			   display: flex;
			   flex-direction: row;
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