<template>
    <view class="main">
        <u-navbar
          title="订单信息"
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
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 15px;">
			<view style="margin-left: 15px;font-size: 14px;">{{dataDict.taxitypeName}}</view>
			<view style="font-size: 14px;color: #2A9595;width: 70%;">({{dataDict.ridingtypeName}})</view>
			<view style="font-size: 14px;color: #2A9595;text-align: right;">{{dataDict.statusName}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 15px;">
			<image style="margin-top: 15px;margin-left: 15px;width: 30px;height: 30px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="dataDict.imageurl?dataDict.imageurl:my_default"></image>
			<view style="display: flex;flex-direction: column;width: 75%;margin-top: 15px;">
				<view style="margin-left: 15px;font-size: 14px;background-color: yellow;border-radius: 5px;">{{dataDict.carno}}</view>
				<view style="margin-left: 15px;font-size: 12px;margin-top: 10px;color: gray;">{{item.taxiUserName}}</view>
			</view>
			<u-image style="margin-top: 15px;"
				:src="phone"
				width="25px"
				height="25px"
				@click="callClick(dataDict.mobile)"
			></u-image>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 15px;width: 20px;height: 50px;display: flex;flex-direction: column;">
				<view style="width: 10px;height: 10px;background-color: blue;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
				<view style="margin-left: 8.5px;width: 1px;height: 50px;background-color: gray;"></view>
				<view style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 73%;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{dataDict.departure}}</view>
				<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{dataDict.departureRemark}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{dataDict.destination}}</view>
				<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{dataDict.destinationRemark}}</view>
			</view>
		</view>
		<view v-if="dataDict.status == 1 && dataDict.paymentStatus !== 1">
			<view class="buttonView" @click="pingtaiPayClick(dataDict)">平台支付</view>
			<view class="cancelView" @click="xianxiaPayClick(dataDict)">线下支付</view>
		</view>
		<u-modal :show="payshow" @confirm="confirmPay" title="待支付金额" confirm-text="确认" showCancelButton="true" @cancel="cancelPayClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="receive" placeholder="请输入待支付金额" type="text" />
			</view>
		</u-modal>
		<u-modal :show="xianxiashow" @confirm="xianxiaconfirm" title="您确定线下支付？" confirm-text="确认" showCancelButton="true" @cancel="cancelxianxiaPayClick"  style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarGetTaxiWorker,
	ServiceShunFengYueCarInnnerPayTaxiOrder,
	ServiceShunFengYueCarOfflinePayment} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const my_default = ref('/static/service/my_default.png');
	const phone = ref('/static/service/phone.png');
	const orderNo = ref();
	const dataDict = ref({});
	const payshow = ref(false);
	const receive = ref('');
	const xianxiashow = ref(false);
	
	onLoad((options:any) => {
		
		// strtime.value = options.strtime;
		orderNo.value = options.orderNo;
	});
	onMounted(() => {
		getstate();
	});
	const getstate = async() => {
		
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: orderNo.value
			};
			ServiceShunFengYueCarGetTaxiWorker(param).then((res: any) => {
				
				console.log(res);
				dataDict.value = res.result;
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const pingtaiPayClick = () => {
		payshow.value = true;
	};
	const confirmPay = async() => {
		
		if(receive.value.length == 0){
			
			uni.showToast({
				title:'请输入金额！',
				icon:'none'
			})
			return
		}
		payshow.value = false;
		try {
			let param = {
				hostNo:storage.getHostNo(),
				payAccName:storage.getRealName(),
				mobile:storage.getPhone(),
				userId: storage.getUserId(),
				orderNo: orderNo.value,
				receive:receive.value
			};
			ServiceShunFengYueCarInnnerPayTaxiOrder(param).then((res: any) => {
				
				console.log(res);
				if(res.success == true){
					
					uni.navigateTo({
						url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
					})
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const cancelPayClick = () => {
		
		payshow.value = false;
	};
	const xianxiaPayClick = () => {
		
		xianxiashow.value = true;
	};
	const xianxiaconfirm = async() => {
		
		xianxiashow.value = false;
		try {
			let param = {
				
				userId: storage.getUserId(),
				orderNo: orderNo.value
				
			};
			ServiceShunFengYueCarOfflinePayment(param).then((res: any) => {
				
				console.log(res);
				if(res.success == true){
					
					getstate();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const cancelxianxiaPayClick = () => {
		
		xianxiashow.value = false;
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
		  .buttonView{
		                  
		  	   margin-top: 50px;
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
		  .cancelView{
		  	
		  	margin-top: 30px;
		  	background-color: white;
		  	border-radius: 5px;
		  	color: gray;
		  	border: gray 1px solid;
		  	font-size: 14px;
		  	margin-left: 5%; 
		  	display: flex;
		  	justify-content: center; /* 水平居中 */
		  	align-items: center;     /* 垂直居中 */
		  	height: 40px;           /* 需要设置高度 */
		  	width: 90%;             /* 需要设置宽度 */
		  }
		  .searchlocation{
			   margin-left: 4%;
			   width: 92%;
			   height: 35px;
			   margin-top: 15px;
			   border: 1px lightgray solid;
			   border-radius: 5px;
			   font-size: 13px;
		   }
}
</style>