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
			  :src="hotImage"
			  width="60px"
			  height="60px"
			></u-image>
			<view style="font-size: 13px;margin-top: 10px;">充值</view>
			<view style="font-size: 20px;margin-top: 10px;">￥{{dataDict.amount}}</view>
		</view>
		<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
		<view class="titleView">当前状态：支付成功</view>
		<view class="titleView">充值明细：充值{{dataDict.amount}}元</view>
		<view class="titleView">支付方式：线上</view>
		<view class="titleView">支付时间：{{dataDict.create_time}}</view>
		<view class="titleView">交易单号：{{dataDict.order_no}}</view>
		<view class="titleView">缴费房屋：{{dataDict.hse_name}}</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceYJChongZhiDet } from '@/api/service';

const bgColor = ref("#2A9595");
const hotImage = ref("/static/service/volletImg.png");
const DataParam = ref({ id: '' });
const dataDict = ref<any>({});

onLoad((options: any) => {
	DataParam.value.id = options.id || '';
	init();
});

const init = () => {
	try {
		serviceYJChongZhiDet(DataParam.value).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
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
    }
</style>