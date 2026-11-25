<template>
    <view class="main">
        <u-navbar
          title="物流信息"
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
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 14px;">订单编号：{{order_no}}</view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 14px;">收件人：{{dataDict.receiver_name}}{{dataDict.receiver_tel}}</view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 14px;">{{dataDict.receiver_address}}</view>
</view>
</template>


<script setup lang="ts">
	import {serviceReceiveMyGetInDetail} from '@/api/service';
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	
	const bgColor = ref("#2A9595");
	const order_no = ref();
	const waybill_no = ref();
	const shipperCode = ref();
	const dataDict = ref({});
	
	onLoad((options:any) => {
		
		order_no.value = options.order_no;
		waybill_no.value = options.waybill_no;
		shipperCode.value = options.shipperCode;
	});
	onMounted(() => {
	   loadData();
	});
       
   const loadData = async() => {
	
		try {
			
			let param = {
				
				OrderCode:order_no.value,
				LogisticCode:waybill_no.value,
				ShipperCode:shipperCode.value,
				
			};
			serviceReceiveMyGetInDetail(param).then((res) =>{
							
				console.log(res);
				dataDict.value = res.result.receiverInfo;
				
				
			});
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
    }
</style>