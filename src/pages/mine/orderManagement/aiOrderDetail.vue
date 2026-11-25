<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px;">订单编号：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.orderNumber}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">支付状态：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.status}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">入住时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.intime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">离开时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.outtime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">房型：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.housetype}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">数量(间)：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.num}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">早餐：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.breakfirst}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系人信息</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系人：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.lianxiperson}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系电话：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.lianxiphone}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">订单信息</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">订单编号：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.orderNumber}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">下单时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.orderTime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">订单总额：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.ordertotal}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">优惠抵折扣：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.discount}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">实付金额：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.actualpay}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const detailinfo = ref({
		orderNumber:'202578954125632',
		status:'已取消',
		paystatus:'未支付',
		intime:'2025-07-26',
		outtime:'2025-07-30',
		housetype:'大床房',
		num:'1',
		price:'85',
		breakfirst:'有',
		lianxiperson:'王明',
		lianxiphone:'15689288056',
		orderTime:'2025-07-26 09:00',
		ordertotal:'138',
		discount:'53',
		actualpay:'85',
		});

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
	 .formView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 55px;
	 }
    }
</style>