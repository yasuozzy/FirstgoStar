<template>
	<view class="main">
		<u-navbar
		  title="确认订单"
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
		<view class="addressView" @click="chooseAddress">
			<u-image style="margin-top: 12px;margin-left: 15px;"
			  :src="addressImage"
			  width="20px"
			  height="25px"
			></u-image>
			<view style="display: flex;flex-direction: column;width: 75%;margin-left: 10px;margin-top: 10px;">
				<view style="display: flex;flex-direction: row;">
					<view v-if="addressData.length > 0" style="font-size: 13px;">收货人:{{addressDict.acceptName}}</view>
					<view v-if="addressData.length == 0" style="font-size: 13px;">请选择收货地址</view>
					<view style="font-size: 13px;margin-left: 30px;">{{addressDict.mobile}}</view>
				</view>
				<view style="font-size: 13px;">{{addressDict.regionAddress}}</view>
			</view>
			<u-image style="border-radius: 4px;margin-top: 20px;margin-left: 15px;"
			  :src="arrowImage"
			  width="6px"
			  height="10px"
			></u-image>
		</view>
		<view class="goodsView">
			<u-image style="border-radius: 15px;margin-top: 12px;margin-left: 15px;margin-bottom: 15px;"
			  :src="detailData.img"
			  width="80px"
			  height="80px"
			></u-image>
			<view style="margin-top: 10px;margin-left: 10px;display: flex;flex-direction: column;width: 63%;">
				<view style="font-size: 14px;">{{detailData.name}}</view>
				<view style="font-size: 13px;color: dimgray;margin-top: 10px;">数量{{detailData.buyNums}}</view>
				<view v-if="detailData.goodType < 2" style="font-size: 14px;color: #2A9595;margin-top: 10px;">兑换积分:{{detailData.integral}}</view>
				<view v-if="detailData.goodType == 2" style="font-size: 14px;color: #2A9595;margin-top: 10px;">充值积分:{{detailData.integral}}</view>
				<view v-if="detailData.goodType == 3" style="font-size: 14px;color: #2A9595;margin-top: 10px;">普通积分:{{detailData.integral}}</view>
			</view>
			
		</view>
		<view class="footer-container">
			<view class="footer-content">
				<view v-if="detailData.goodType < 2" style="font-size: 14px;margin-left: 15px;">积分:{{detailData.integralSum}}</view>
				<view v-if="detailData.goodType == 2" style="font-size: 14px;margin-left: 15px;">充值积分:{{detailData.integralSum}}</view>
				<view v-if="detailData.goodType == 3" style="font-size: 14px;margin-left: 15px;">普通积分:{{detailData.integralSum}}</view>
				<view class="order-button" @click="getOrderClick">去下单</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {integralExchangeGoods,integralLoadAddress,integralGetOrders,integralGetPayURL} from '@/api/integral'
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const addressImage = ref("/static/integral/locationAddress.png");
	const arrowImage = ref('/static/service/my_arrow.png');
	const name = ref("收货人:李强");
	const phone = ref("15689288001");
	const address = ref("山西省 晋中市 和顺县1230号");
	const sku = ref('');
	const detailParam = ref({
		sku:"",
		nums:'1',
		userId:'',
	});
	const detailData = ref({});
	const addressParam = ref({userId:''});
	const addressData = ref([]);
	const addressDict = ref({});
	const getOrDerParam = ref({
		addressId:'',
		sku:"",
		nums:"",
		contents:"",
		paymentIntegral:'',
		userId:'',
		userName:'',
	});
	const orderno = ref('');
	const payurlParam = ref({
		orderNos:'',
		formExt:"H5",
		payType:"2",
		pageUrl:"",
		userName:'',
		mobile:'',
		hostNo:'',
	});
	const payurlData = ref({});
			
	onLoad((options:any)  => {
		
		sku.value = decodeURIComponent(options.sku);
		init();
		loadAddressData();
	});
	onMounted(() => {
	  // 监听事件
	  eventBus.on('refresh-address', handleRefresh);
	});
	onUnmounted(() => {
	  // 组件卸载时，务必移除监听！
	  eventBus.off('refresh-address', handleRefresh);
	});
	
	const init = async() => {
			
		try {
					
				detailParam.value.sku = sku.value;
				detailParam.value.userId = storage.getUserId();
				const res = await integralExchangeGoods(detailParam.value);
								
				console.log(res);						
				detailData.value = res.result;
				
				
			} catch (error) {
				console.log(error)
		}
	};
	const loadAddressData = async() => {
		
		try {
				addressParam.value.userId = storage.getUserId();
				const res = await integralLoadAddress(addressParam.value);
								
				console.log(res);
				const result = res.result;
				addressData.value = result.slice(0,1);
				addressDict.value = addressData.value[0];
				
			} catch (error) {
				console.log(error)
		}
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
			//选择地址
	const chooseAddress = () => {
				
		uni.navigateTo({
			url:`/pages/mine/addressManagement/addressManageMent?type=${encodeURIComponent('integral')}` 
		})
	};
	const handleRefresh = (data:{}) => {
			    
		console.log('收到刷新事件:', data);
		
		addressDict.value = data;
			    
	};
	//去下单
	const getOrderClick = async() => {
				
		if (!addressDict.value.acceptName) {
			
			uni.showToast({
				title:'请选择地址'
			})
			return;
		}
		try {
				getOrDerParam.value.userId = storage.getUserId();
				getOrDerParam.value.addressId = addressDict.value.id;
				getOrDerParam.value.sku = sku.value;
				getOrDerParam.value.nums = detailData.value.buyNums;
				getOrDerParam.value.paymentIntegral = detailData.value.integralSum; 
				getOrDerParam.value.userName = storage.getRealName();
				const res = await integralGetOrders(getOrDerParam.value);
								
				console.log(res);
				orderno.value = res.result;
				if(orderno.value){
					getPayURL(orderno.value);
				}
				
				
			} catch (error) {
				console.log(error)
		}
		
	};
	//获取支付链接
	const getPayURL = async(orderno:any) => {
				
		try {
					
				payurlParam.value.orderNos = orderno;
				payurlParam.value.userName = storage.getRealName();
				payurlParam.value.mobile = storage.getPhone();
				payurlParam.value.hostNo = storage.getHostNo();
				const res = await integralGetPayURL(payurlParam.value);
								
				console.log(res);						
				payurlData.value = res.result;
				uni.navigateTo({
					url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(payurlData.value.payUrl)}`
				})
				
			   
			} catch (error) {
				console.log(error)
		}
		
	};
		
</script>

<style lang="scss" scoped>
	.main {
		  height: 100%;
		  background: aliceblue;
		  .flex{
			  display: flex;
		  }
		  .addressView{
			  display: flex;
			  flex-direction: row;
			  margin-top: 10px;
			  background-color: white;
			  height: 60px;
		  }
		  .goodsView{
			  display: flex;
			  flex-direction: row;
			  margin-top: 10px;
			  background-color: white;
		  }
		  .footer-container {
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    height: 50px;
		    background-color: #fff;
		    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		    z-index: 100;
		  }
		  .footer-content {
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    height: 100%;
		    
		    // max-width: 1200px; /* 可选，限制最大宽度 */
		   
		  }
		  .order-button {
			 
		    display: flex;
		    justify-content: center; /* 水平居中 */
		    align-items: center;     /* 垂直居中 */
		    height: 50px;           /* 需要设置高度 */
		    width: 80px;
			 margin-right: 0;
			 font-size: 14px;
			 color: white;
			background-color: #2A9595;
		  }
	}
</style>