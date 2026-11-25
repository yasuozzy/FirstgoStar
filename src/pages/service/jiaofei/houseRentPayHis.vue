<template>
    <view class="main">
        <u-navbar
          title="历史记录"
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
		<view style="display: flex;margin-left: 4%;width: 92%;background-color: aliceblue;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index" @click="detailClick">
				<view style="margin-left: 10px;font-size: 13px;">房屋编号:{{item.houseNum}}</view>
				<view style="margin-left: 10px;font-size: 13px;margin-top: 5px;">所属管理处:{{item.manageName}}</view>
				<view v-if="item.chargeType === '月缴'" style="margin-left: 10px;font-size: 13px;margin-top: 5px;">房租金额:{{item.rent}}</view>
				<view style="margin-left: 10px;font-size: 13px;margin-top: 5px;">缴费方式:{{item.chargeType}}</view>
				<view style="margin-left: 10px;font-size: 13px;margin-top: 5px;">收费周期:{{item.chargeCycle}}</view>
				<view style="margin-left: 10px;font-size: 13px;margin-top: 5px;">总金额:{{item.totalAmount}}</view>
				<view style="margin-left: 10px;font-size: 13px;margin-top: 5px;margin-bottom: 10px;">缴纳时间:{{item.createTime}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceRentMoneyPayHistory } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const hisParam = ref({
	house_id: '',
	mobile: "",
	page: 1,
	size: 10,
});
const dataList = ref<any[]>([]);

onLoad((options: any) => {
	hisParam.value.house_id = options.house_id || '';
	init();
});

const init = () => {
	try {
		hisParam.value.mobile = storage.getPhone();
		serviceRentMoneyPayHistory(hisParam.value).then((res: any) => {
			console.log(res);
			dataList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const detailClick = () => {};
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
		 width: 100%;
		 display: flex;
		 flex-direction: column;
		 background-color: white;
		 border-radius: 6px;
		 margin-top: 10px;
	 }
    }
</style>