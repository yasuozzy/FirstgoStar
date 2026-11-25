<template>
    <view class="main">
        <u-navbar
          title="志愿者申请"
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
		<view v-if="status === '0'" style="width: 100%;margin-top: 80px;font-size: 17px;text-align: center;">您已申请志愿者</view>
		<view v-if="status === '1'" style="width: 100%;margin-top: 80px;font-size: 17px;text-align: center;">您已经是志愿者</view>
		<view v-if="status === '0'" style="width: 100%;margin-top: 10px;font-size: 17px;text-align: center;">等待审核中</view>
		<view class="sureButton" @click="sureClick">确认</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const bgColor = ref("#2A9595");
const status = ref('');

onLoad((options: any) => {
	status.value = options.status || '';
});

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const sureClick = () => {
	uni.navigateBack();
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
	 .sureButton{
		 display: flex;
		 margin-top: 200px;
		 margin-left: 4%;
		 width: 92%;
		 height: 35px;
		 background-color: #2A9595;
		 color: white;
		 border-radius: 6px;
		 justify-content: center;
		 align-items: center;
		 font-size: 15px;
	 }
    }
</style>