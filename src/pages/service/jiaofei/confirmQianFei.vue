<template>
    <view class="main">
        <u-navbar
          title="确认订单"
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
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in costList" :key="index">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">缴费项目:{{item.charge_name}}</view>
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">应交金额:</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;color:#2A9595;">￥{{item.amount_received}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">其中{{item.charge_name}}￥{{item.actual_payment}}滞纳金¥{{item.overdue_fine}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;margin-bottom: 20px;">优惠金额￥{{item.discount_amount}}预收款抵扣¥{{item.amount_deducted}}</view>
			</view>
			
		</view>
		<view class="footer-container">
			<view class="footer-content">
				<view style="font-size: 14px;margin-left: 15px;width: 20%;margin-top: 15px;">费用合计:</view>
				<view style="font-size: 14px;color: #2A9595;text-align: left;width: 50%;margin-top: 15px;">￥{{dataDict.costSum}}</view>
				<view style="width: 30%;" class="order-button" @click="getOrderClick">去付款</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceQianFeiJiaoNaConfirm, serviceInnnerPay } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const idstring = ref('');
const chargeCode = ref('');
const dataDict = ref<any>({});
const costList = ref<any[]>([]);

onLoad((options: any) => {
	idstring.value = options.id || '';
	chargeCode.value = options.chargeCode || '';
});

onMounted(() => {
	init();
});

const init = () => {
	try {
		let param = {
			house_id: storage.getHseid(),
			id: idstring.value,
			chargeCode: chargeCode.value,
		};
		serviceQianFeiJiaoNaConfirm(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			costList.value = res.result.costList;
		});
	} catch (error) {
		console.log(error);
	}
};

const getOrderClick = () => {
	try {
		let param = {
			id: idstring.value,
			use_id: storage.getUserId(),
			hostNo: storage.getHostNo(),
			cstType: "P",
			mobile: storage.getPhone(),
			flag: "0",
		};
		serviceInnnerPay(param).then((res: any) => {
			console.log(res);
			if (res.result.cost === 0) {
				uni.navigateBack();
			}
			if (res.result.payUrl) {
				uni.navigateTo({
					url: '/pages/Integral/orderPayHtml?url=' + encodeURIComponent(res.result.payUrl)
				});
			}
			uni.showToast({ title: res.message, icon: 'none' });
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
         min-height: 100vh;
         width: 100%;
         background-color: aliceblue;
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
	 .listItem{
		 display: flex;
		 flex-direction: column;
		 background-color: white;
		 width: 100%;
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
	   flex-direction: row;
	   height: 100%;
	 }
	 .order-button {
	   display: flex;
	   justify-content: center;
	   align-items: center;
	   height: 50px;
		 margin-right: 0;
		 font-size: 14px;
		 color: white;
		background-color: #2A9595;
	 }
    }
</style>