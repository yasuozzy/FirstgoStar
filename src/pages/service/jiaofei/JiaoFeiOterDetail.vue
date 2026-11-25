<template>
    <view class="main">
        <u-navbar
          title="详情"
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
        </u-navbar>
		<view class="topView">
			<u-image style="margin-top: 20px;"
			  :src="avatar"
			  width="60px"
			  height="60px"
			></u-image>
			<view style="font-size: 13px;margin-top: 10px;">{{dataDict.name}}</view>
			<view style="font-size: 20px;margin-top: 10px;">￥{{dataDict.actualpayment}}</view>
		</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="titleView">当前状态：{{dataDict.status}}</view>
		<view class="titleView">缴费明细：{{dataDict.chargename}}元</view>
		<!-- <view class="titleView">项目明细：{{dataDict.itemdetails}}</view> -->
		<view class="titleView">支付方式：{{dataDict.paytype}}</view>
		<view class="titleView">支付时间：{{dataDict.paymenttime}}</view>
		<view class="titleView">交易单号：{{dataDict.orderno}}</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view style="display: flex;flex-direction: column;width: 100%;background-color: aliceblue;min-height: 100vh;">
			<view v-for="(item,index) in detail_list" :key="index">
				<view style="height: 40px;width: 100%;display: flex;flex-direction: row;background-color: white;">
					<view style="margin-top: 5px;margin-left: 15px;width: 10px;height: 30px;background-color: #2A9595;"></view>
					<view style="margin-left: 10px;font-size: 13px;color: black;margin-top: 10px;">{{item.charge_name}}</view>
				</view>
				<view class="chargeItem" v-for="(chargeItem,cindex) in item.charge_list" :key="cindex">
					<view style="background-color: white;margin-top: 10px;margin-left: 4%;width: 92%;border-radius: 5px;margin-bottom: 5px;">
						<view style="display: flex;flex-direction: row;margin-top: 10px;">
							<view style="margin-left: 15px;width: 30%;font-size: 13px;">缴费金额：</view>
							<view style="font-size: 13px;color: #2A9595;width: 62%;text-align: right;">￥{{chargeItem.pay_amount}}</view>
						</view>
						<view style="margin-top: 5px;margin-left: 15px;font-size: 13px;margin-bottom: 10px;">计费日期：{{chargeItem.starte_date}}至{{chargeItem.endate_date}}</view>
					</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { servicePayOtherDataDetail } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const avatar = ref('');
const hotImage = ref("/static/service/volletImg.png");
const orderno = ref('');
const DataParam = ref({
	orderno: ''
});
const dataDict = ref<any>({});
const detail_list = ref([]);

onLoad((options: any) => {
	console.log(options);
	avatar.value = storage.getAvatar();
	orderno.value = options.orderno || options.id || '';
	init();
});

const init = () => {
	try {
		DataParam.value.orderno = orderno.value;
		servicePayOtherDataDetail(DataParam.value).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			detail_list.value = res.result.detail_list;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
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
	 .topView{
		 display: flex;
		 flex-direction: column;
		 align-items: center;
	 }
	 .titleView{
		 display: flex;
		 padding: 15px;
		 font-size: 13px;
	 }
	 .chargeItem{
		 width: 100%;
		 
		 background-color: aliceblue;
		 display: flex;
		 flex-direction: column;
	 }
    }
</style>