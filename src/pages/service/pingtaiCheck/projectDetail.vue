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
		<view style="margin-left: 30%;margin-top: 20px;width: 40%;">
			<u-image style="align-items: center;"
			  :src="picture"
			  width="60px"
			  height="60px"
			></u-image>
		</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;text-align: center;font-size: 13px;">公共设施</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;text-align: center;font-size: 13px;">0</view>
		<view style="margin-top: 10px;margin-left: 3%;height: 1px;width: 94%;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">当前状态:{{status}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">维修人员:{{person}}{{phone}}</view>
		<view style="margin-top: 10px;margin-left: 3%;height: 1px;width: 94%;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">所在管理处:{{management}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">报修人电话:{{baophone}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">物业电话:{{wuyephone}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">上门时间:{{time}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">公共设施:{{sheshi}}</view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">具体描述:{{specs}}</view>
		<view style="margin-top: 10px;margin-left: 3%;height: 1px;width: 94%;background-color: lightgray;"></view>
		<view style="width: 100%;height: 30px;margin-top: 10px;margin-left: 15px;font-size: 13px;">具体描述</view>
		<u-image style="margin-top: 10px;margin-left: 20px;"
		  :src="picture"
		  width="60px"
		  height="60px"
		></u-image>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bgColor = ref("#2A9595");
const picture = ref('/static/home/swiper.png');
const status = ref('待支付');
const person = ref('陈校义');
const phone = ref('15689288001');
const management = ref('华海贸易广场');
const baophone = ref('15689288010');
const wuyephone = ref('15689283666');
const time = ref('2020-12-09 14:23');
const sheshi = ref('其他故障');
const specs = ref('9号楼冷冻产品一整面停电');

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
    }
</style>