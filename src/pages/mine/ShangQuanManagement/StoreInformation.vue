<template>
    <view class="main">
        <u-navbar
          title="门店信息"
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
              <view slot="right" @click="authClick()">
                  <view style="font-size: 14px;color: white;">授权管理</view>
              </view>
            </template>
        </u-navbar>
		<view style="background-color: white;width: 100%;height: 50px;display: flex;flex-direction: row;" @click="chooseOpenStatus">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 40%;">营业状态</view>
			<view style="text-align: right;margin-top: 15px;margin-left: 15px;font-size: 14px;width: 42%;">{{openStatus}}</view>
			<image style="width: 8px;height: 12px;margin-left: 10px;margin-top: 18px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="background-color: white;width: 100%;height: 100px;display: flex;flex-direction: column;margin-top: 20px;" >
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80%;">订单消息提醒</view>
				 <switch color="#00FF00" :checked="accept_order_news" style="transform:scale(0.8);align-items: right;margin-top: 8px;" @change="switchChange" />
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80%;">自动接单/打印</view>
				 <switch color="#00FF00" :checked="autoAcceptOrder" style="transform:scale(0.8);align-items: right;margin-top: 8px;" @change="autoOrderChange" />
			</view>
		</view>
		<view style="background-color: white;width: 100%;height: 280px;display: flex;flex-direction: column;margin-top: 20px;" >
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 14px;width: 5px;height: 15px;background-color: #2A9595;"></view>
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;color: #2A9595;">店铺信息</view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;" @click="storeClick">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 75%;">店铺封面</view>
				<image style="width: 30px;height: 30px;margin-left: 10px;margin-top: 8px;" :src="dataDict.cover_img"></image>
				<image style="width: 8px;height: 12px;margin-left: 10px;margin-top: 18px;" src="/src/static/service/my_arrow.png"></image>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 40%;">联系电话</view>
				<view style="text-align: right;margin-top: 15px;margin-left: 15px;font-size: 14px;width: 45%;">{{dataDict.mobile}}</view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 40%;">固定电话</view>
				<view style="text-align: right;margin-top: 15px;margin-left: 15px;font-size: 14px;width: 45%;">{{dataDict.tel}}</view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 20%;">店铺地址</view>
				<view style="text-align: right;margin-top: 15px;font-size: 14px;width: 70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{dataDict.address}}</view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 40%;">营业时间</view>
				<view style="text-align: right;margin-top: 15px;margin-left: 15px;font-size: 14px;width: 45%;">{{dataDict.open_start_time}}-{{dataDict.open_end_time}}</view>
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;background-color: white;height: 50px;" @click="zixhiClick">
			<view style="margin-top: 18px;margin-left: 15px;font-size: 14px;width: 5px;height: 15px;background-color: #2A9595;"></view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;color: #2A9595;width: 80%;">营业资质</view>
			<image style="width: 8px;height: 12px;margin-left: 10px;margin-top: 18px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;background-color: white;height: 50px;" @click="agreementClick">
			<view style="margin-top: 18px;margin-left: 15px;font-size: 14px;width: 5px;height: 15px;background-color: #2A9595;"></view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;color: #2A9595;width: 80%;">商家协议</view>
			<image style="width: 8px;height: 12px;margin-left: 10px;margin-top: 18px;" src="/src/static/service/my_arrow.png"></image>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentGetSelfShopInfo,
	MineShangquanManageMentStoreInfoUpdateStoreStatus} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const itemList = ref(['营业中', '歇业']);
	const openStatus = ref();
	const dataDict = ref({});
	const autoAcceptOrder = ref(true);
	const accept_order_news = ref(true);
	const pictrueArr = ref([]);
	
	
	onMounted(() => {
		loadData();
	});
	const loadData = async() => {
		try {
			
			let param = {
				
				providerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId()
				
			};
			const res = await MineShangquanManageMentGetSelfShopInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			if (res.result.open_status === '1') {
				openStatus.value = '营业中';
			}else
			{
				openStatus.value = '歇业';
			}
			if(res.result.accept_order_news === 1){
				
				accept_order_news.value = true;
				
			}else
			{
				accept_order_news.value = false;
			}
			if(res.result.autoAcceptOrder === 1){
				
				autoAcceptOrder.value = true;
				
			}else
			{
				autoAcceptOrder.value = false;
			}
			
		}catch (error) {
			console.log(error)
		}
	};
	const chooseOpenStatus = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				
				openStatus.value = itemList.value[res.tapIndex]
				if(openStatus.value === '营业中'){
					
					updateOpenStatus(1);
					
				}else if (openStatus.value === '歇业'){
					
					updateOpenStatus(0);
				}
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	const updateOpenStatus = async(status:any) => {
		
		try {
			
			let param = {
				
				providerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				flag:1,
				openStatus:status
				
			};
			const res = await MineShangquanManageMentStoreInfoUpdateStoreStatus(param);			
			console.log(res);
			uni.showToast({
				title:'营业状态修改成功',
				icon:'none'
			})
			loadData();
			
		}catch (error) {
			console.log(error)
		}
	};
	const switchChange = (e:any) => {
	        
		console.log(e);
	   accept_order_news.value = e.detail.value;
	   if(accept_order_news.value === true){
	   	
	   	updateNews(1);
	   	
	   }else if (accept_order_news.value === false){
	   	
	   	updateNews(0);
	   }
	};
	const updateNews = async(status:any) => {
		try {
			
			let param = {
				
				providerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				flag:2,
				acceptNews:status
				
			};
			const res = await MineShangquanManageMentStoreInfoUpdateStoreStatus(param);			
			console.log(res);
			if(status === 1){
				uni.showToast({
					title:'接受订单提醒',
					icon:'none'
				})
			}else
			{
				uni.showToast({
					title:'不接受订单提醒',
					icon:'none'
				})
			}
			
			loadData();
			
		}catch (error) {
			console.log(error)
		}
	};
	const autoOrderChange = (e:any) => {
		console.log(e);
		autoAcceptOrder.value = e.detail.value;
		if(autoAcceptOrder.value === true){
			
			updateAutoOrder(1);
			
		}else if (autoAcceptOrder.value === false){
			
			updateAutoOrder(0);
		}
	};
	const updateAutoOrder = async(status:any) => {
		
		try {
			
			let param = {
				
				providerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				flag:3,
				autoAcceptOrder:status
				
			};
			const res = await MineShangquanManageMentStoreInfoUpdateStoreStatus(param);			
			console.log(res);
			if(status === 1){
				uni.showToast({
					title:'自动接单已开启',
					icon:'none'
				})
			}else
			{
				uni.showToast({
					title:'自动接单已关闭',
					icon:'none'
				})
			}
			
			loadData();
			
		}catch (error) {
			console.log(error)
		}
	};
	const authClick = () => {
		
		
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/authManageMent?shopName=${dataDict.value.name}&coverimg=${dataDict.value.cover_img}&actor=${'店主'}`
		})
		
	};
	const storeClick = () => {
		
		pictrueArr.value = [];
		pictrueArr.value.push(dataDict.value.cover_img);
		console.log(pictrueArr.value);
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/pictrueShowPage?navTitle=${'店铺封面'}&pictrueArr=${JSON.stringify(pictrueArr.value)}`
		})
	};
	const zixhiClick = () => {
		pictrueArr.value = [];
		const photo_path = dataDict.value.photo_path.split(',');
		pictrueArr.value = photo_path;
		console.log(pictrueArr.value);
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/pictrueShowPage?navTitle=${'营业资质'}&pictrueArr=${JSON.stringify(pictrueArr.value)}`
		})
	};
	const agreementClick = () => {
	                
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/storeProtocal?content=${encodeURIComponent(dataDict.value.agreement_content)}` 
		})
		
	};

    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          height: auto;
          background: aliceblue;
          min-height: 100vh;
          width: 100%;
          .flex{
              display: flex;
          }
}
</style>