<template>
    <view class="main">
        <u-navbar
          title="我要发件"
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
		<view class="headerView">
			<view style="display: flex;flex-direction: column;">
				<view style="margin-left: 15px;margin-top: 10px;width: 5px;height: 5px;border-radius: 2px;background-color: royalblue;"></view>
				<view style="margin-left: 17px;width: 1px;height: 100px;background-color: red;"></view>
				<view style="margin-left: 15px;width: 5px;height: 5px;border-radius: 2px;background-color: orangered;"></view>
			</view>
			<view class="rightView">
				<view style="display: flex;flex-direction: row;width: 70%;height: 55px;" @click="chooseAddress('sender')">
					<view v-if="chooseAddressTrue === false" style="font-size: 14px;color: dimgray;width: 80%;">请填写发件人信息</view>
					<view v-if="chooseAddressTrue === true" style="font-size: 14px;color: dimgray;width: 80%;">
						<view style="font-size: 14px;">{{chooseAddressData.acceptName}}{{chooseAddressData.mobile}}</view>
						<view style="font-size: 13px;color: gray;">{{chooseAddressData.regionAddress}}</view>
					</view>
					<u-image  style="margin-top: 5px;"
					  :src="locationImage"
					  width="12px"
					  height="15px"
					></u-image>
					<view style="color:#2A9595;font-size: 13px;margin-left: 5px;margin-top: 2px;">选择</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="display: flex;flex-direction: row;width: 70%;margin-top: 10px;height: 55px;" @click="chooseAddress('receiver')">
					<view v-if="chooseReceiverTrue === false"style="font-size: 14px;color: dimgray;width: 80%;">请填写收件人信息</view>
					<view v-if="chooseReceiverTrue === true"style="font-size: 14px;color: dimgray;width: 80%;">
						<view style="font-size: 14px;">{{chooseReceiverData.acceptName}}{{chooseReceiverData.mobile}}</view>
						<view style="font-size: 13px;color: gray;">{{chooseReceiverData.regionAddress}}</view>
					</view>
					<u-image style="margin-top: 5px;"
					  :src="locationImage"
					  width="12px"
					  height="15px"
					></u-image>
					<view style="color:#2A9595;font-size: 13px;margin-left: 5px;margin-top: 2px;">选择</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;margin-top: 5px;background-color: aliceblue;"></view>
		<view class="specsView" @click="chooseGoodsType">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">物品类型</view>
			<view style="font-size: 14px;color: gray;width: 50%;margin-top: 15px;margin-left: 15px;">{{goodsType}}</view>
			<u-image style="margin-top: 18px;margin-left: 50px;"
			  :src="downImage"
			  width="12px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="specsView" >
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">物品重量</view>
			<!-- <view style="font-size: 14px;color: gray;width: 50%;margin-top: 15px;margin-left: 15px;">填写物品重量(kg)</view> -->
			<input class="searchlocation" v-model="Goodsweight" placeholder="填写物品重量(kg)" type="text" />
		</view>
		<view style="width: 100%;height: 10px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="specsView" @click="chooseSentType">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">发货方式</view>
			<view style="font-size: 14px;color: gray;width: 50%;margin-top: 15px;margin-left: 15px;">{{sentType}}</view>
			<u-image style="margin-top: 18px;margin-left: 50px;"
			  :src="downImage"
			  width="12px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="specsView" @click="choosePayType">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">支付方式</view>
			<view style="font-size: 14px;color: gray;width: 50%;margin-top: 15px;margin-left: 15px;">{{payType}}</view>
			<u-image style="margin-top: 18px;margin-left: 50px;"
			  :src="downImage"
			  width="12px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="specsView" @click="chooseShipperType">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">快递公司</view>
			<view style="font-size: 14px;color: gray;width: 50%;margin-top: 15px;margin-left: 15px;">{{shipperType}}</view>
			<u-image style="margin-top: 18px;margin-left: 50px;"
			  :src="downImage"
			  width="12px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="buttonView" @click="sentOrderClick">下单</view>
		
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {serviceReceiveShipperCode,serviceReceiveSentOrders} from '@/api/service';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const locationImage = ref('/static/integral/locationAddress.png');
	const downImage = ref('/static/home/downImage.png');
	const chooseAddressTrue = ref(false);
	const chooseAddressData = ref({});
	const chooseReceiverTrue = ref(false);
	const chooseReceiverData = ref({});
	const chooseType = ref('');
	const typeList = ref( ['文件', '数码产品', '生活用品', '服饰', '食品', '其他']);
	const goodsType = ref('选择物品类型');
	const Goodsweight = ref('');
	const sentTypeList = ref(['标准快递',]);
	const sentType = ref('选择');
	const sentTypeCode = ref('');
	const payTypeList = ref(['现付', '到付', '月结',]);
	const payType = ref('选择支付方式');
	const payTypeCode = ref(1);
	const shipperList = ref([]);
	const shipperTitleArr = ref([]);
	const shipperType = ref('选择快递公司');
	const ShipperCode = ref('');
	const goodsArr = ref([]);
            
	onMounted(() => {
		init();
		// 监听刷新事件
		eventBus.on('refresh-address', handleRefresh)
	});
	onUnmounted(() => {
		// 清除事件监听
		eventBus.off('refresh-address', handleRefresh)
	});
		
	const init = async() => {
		
		try {
						
			serviceReceiveShipperCode({}).then((res) =>{
							
				console.log(res);
				shipperList.value = res.result;
				
				const result = res.result;
										
				shipperTitleArr.value = result.map(item => item.ShipperName);			
			});
		} catch (error) {
			console.log(error)
		}
	};
	const chooseAddress = (type:any) => {
		
		chooseType.value = type;
		uni.navigateTo({
			url:`/pages/mine/addressManagement/addressManageMent?type=${'integral'}`
		});
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
	const handleRefresh = (data:any) => {
		
		console.log('收到刷新事件:', data);
		if (chooseType.value === 'sender') {
			
			chooseAddressData.value = data;
			chooseAddressTrue.value = true;
			
		}else if (chooseType.value === 'receiver') {
			
			chooseReceiverData.value = data;
			chooseReceiverTrue.value = true;
		}
		
	};
	const chooseGoodsType = () => {
		uni.showActionSheet({
			itemList: typeList.value,
			success: (res) => {
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				console.log(typeList.value[res.tapIndex]);
				// eatNumber = itemList[res.tapIndex]
				goodsType.value = typeList.value[res.tapIndex];
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const chooseSentType = () => {
		
		uni.showActionSheet({
			itemList: sentTypeList.value,
			success: (res) => {
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				console.log(sentTypeList.value[res.tapIndex]);
				// eatNumber = itemList[res.tapIndex]
				sentType.value = sentTypeList.value[res.tapIndex];
				sentTypeCode.value = res.tapIndex + 1;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const choosePayType = () => {
		
		uni.showActionSheet({
			itemList: payTypeList.value,
			success: (res) => {
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				console.log(payTypeList.value[res.tapIndex]);
				// eatNumber = itemList[res.tapIndex]
				payType.value = payTypeList.value[res.tapIndex];
				payTypeCode.value = res.tapIndex + 1;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const chooseShipperType = () => {
		
		uni.showActionSheet({
			itemList: shipperTitleArr.value,
			success: (res) => {
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				console.log(shipperTitleArr.value[res.tapIndex]);
				shipperType.value = shipperTitleArr.value[res.tapIndex]
				const shipperDict = shipperList.value[res.tapIndex];
				ShipperCode.value = shipperDict.ShipperCode;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//下单
	const sentOrderClick = () => {
		
		if (chooseAddressTrue.value === false) {
			
			uni.showToast({
				title:'请选择发件人信息',
				icon:'none',
			})
			return;
		}
		if (chooseReceiverTrue.value === false) {
			
			uni.showToast({
				title:'请选择收件人信息',
				icon:'none',
			})
			return;
		}
		if (goodsType.value === '选择物品类型') {
			
			uni.showToast({
				title:'请选择物品类型',
				icon:'none',
			})
			return;
		}
		if (Goodsweight.value.length === 0) {
			
			uni.showToast({
				title:'请输入物品重量',
				icon:'none',
			})
			return;
		}
		if (sentType.value === '选择') {
			
			uni.showToast({
				title:'请选择发货方式',
				icon:'none',
			})
			return;
		}
		if (payType.value === '选择支付方式') {
			
			uni.showToast({
				title:'请选择支付方式',
				icon:'none',
			})
			return;
		}
		if (shipperType.value === '选择快递公司') {
			
			uni.showToast({
				title:'请选择快递公司',
				icon:'none',
			})
			return;
		}
		
		try {
			
			const sendAdd = {
				
				Name:chooseAddressData.value.acceptName,
				Mobile:chooseAddressData.value.mobile,
				ProvinceName:chooseAddressData.value.provinceName,
				CityName:chooseAddressData.value.cityName,
				ExpAreaName:chooseAddressData.value.areaName,
				userId:storage.getUserId(),
				Addres:chooseAddressData.value.address
			};
			const sender = JSON.stringify(sendAdd);
			const receiveAdd = {
				
				Name:chooseReceiverData.value.acceptName,
				Mobile:chooseReceiverData.value.mobile,
				ProvinceName:chooseReceiverData.value.provinceName,
				CityName:chooseReceiverData.value.cityName,
				ExpAreaName:chooseReceiverData.value.areaName,
				userId:'',
				Addres:chooseReceiverData.value.address
			};
			
			const receiver = JSON.stringify(receiveAdd);
			const goodsDcit = {
				GoodsName:goodsType.value,
			};
			goodsArr.value.push(goodsDcit);
			const commodity = JSON.stringify(goodsArr.value);
			let param = {
				OrderCode:'',
				ShipperCode:ShipperCode.value,
				PayType:payTypeCode.value,
				ExpType:sentTypeCode.value,
				Sender:sender,
				Receiver:receiver,
				Commodity:commodity,
				Quantity:'1',
				Weight:Goodsweight.value,
				
			};	   
			serviceReceiveSentOrders(param).then((res) =>{
							
				console.log(res);
				if(res.success === true){
					
					uni.navigateBack();		
				}
				uni.showToast({
					title:res.message,
					icon:'none',
				})
				
			});
		} catch (error) {
			console.log(error)
		}
		
	}
        
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
	 .headerView{
		 display: flex;
		 flex-direction: row;
		 width: 130%;
		 height: 130px;
	 }
	 .rightView{
		 display: flex;
		 flex-direction: column;
		 margin-top: 10px;
		 margin-left: 15px;
		 height: 120px;
		 width: 100%;
	 }
	 .specsView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
	 }
	 .buttonView{
	               
	              margin-top: 100px;
	              background-color: #2A9595;
	              border-radius: 5px;
	              color: white;
	              font-size: 14px;
	              margin-left: 5%; 
	              display: flex;
	              justify-content: center; /* 水平居中 */
	              align-items: center;     /* 垂直居中 */
	              height: 40px;           /* 需要设置高度 */
	              width: 90%;             /* 需要设置宽度 */
	}
	.searchlocation{
	         margin-left: 10px;
	         width: 300px;
	         height: 35px;
	         margin-top: 8px;
	         font-size: 13px;
	     }
    }
</style>