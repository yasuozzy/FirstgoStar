<template>
    <view class="main">
        <u-navbar
          title="房租缴纳"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
          <template #right>
            <view @click="historyClick">
                <view class="homestayView">历史记录</view>
            </view>
          </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">所属管理处</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{dataDict.manageName}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">房屋编号</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{dataDict.houseNum}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">缴费方式</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{dataDict.chargeType}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">收费周期</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{dataDict.chargeCycle}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;" v-if="dataDict.chargeType == '月缴'">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">房租金额</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{dataDict.rent}}</view>
		</view>
		<view style="display: flex;flex-direction: row;" v-if="dataDict.chargeType == '年缴'">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">总金额</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{dataDict.totalAmount}}</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
		<view class="buttonView" @click="payClick">在线缴纳</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceRentMoneyPay, serviceRentMoneyPayOnline } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const id = ref('');
const rentParam = ref({
	id: '',
});
const dataDict = ref<any>({});
const payParam = ref({
	hostNo: '',
	payAccName: '',
	mobile: '',
	use_id: '',
	id: '',
	totalAmount: '',
});
const PayUrl = ref('');

onLoad((options: any) => {
	id.value = options.id || '';
	init();
});

const init = () => {
	try {
		rentParam.value.id = id.value;
		serviceRentMoneyPay(rentParam.value).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const payClick = () => {
	try {
		payParam.value.id = id.value;
		payParam.value.hostNo = storage.getHostNo();
		payParam.value.payAccName = storage.getRealName();
		payParam.value.mobile = storage.getPhone();
		payParam.value.use_id = storage.getUserId();
		payParam.value.totalAmount = dataDict.value.totalAmount;
		serviceRentMoneyPayOnline(payParam.value).then((res: any) => {
			console.log(res);
			PayUrl.value = encodeURIComponent(res.result.payUrl);
			console.log(PayUrl.value);
			if (PayUrl.value.length > 0) {
				uni.navigateTo({
					url: '/pages/service/jiaofei/houseRentPay?url=' + PayUrl.value
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const historyClick = () => {
	uni.navigateTo({
		url: '/pages/service/jiaofei/houseRentPayHis?house_id=' + dataDict.value.houseId
	});
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
	 .buttonView{
	     margin-top: 100px;
	     background-color: #2A9595;
	     border-radius: 8px;
	     color: white;
	     font-size: 15px;
	     margin-left: 5%; 
	     display: flex;
	     justify-content: center;
	     align-items: center;
	     height: 40px;
	     width: 90%;
	 }
    }
</style>