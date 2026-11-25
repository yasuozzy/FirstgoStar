<template>
    <view class="main">
        <u-navbar
          title="捐赠积分"
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
		<view class="whiteHeader">
			<u-image style="margin-left: 80px;border-radius: 4px;margin-top: 20px;"
			  :src="icon"
			  width="30px"
			  height="30px"
			></u-image>
			<view style="margin-top: 20px;margin-left: 10px;">当前积分:</view>
			<view style="margin-top: 25px;font-size: 14px;color: red;">{{dangqian}}</view>
		</view>
		<view class="inputView">
			<view style="margin-top: 15px;margin-left: 50px;">捐赠的积分数:</view>
			<input class="searchlocation" v-model="donateScore" placeholder="请输积分数" type="text" />
		</view>
		<view class="buttonView" @click="donateClick">我要捐赠</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bgColor = ref("#2A9595");
const icon = ref('/static/home/swiper.png');
const dangqian = ref('30');
const donateScore = ref('');

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const donateClick = () => {};
</script>

<style lang="scss" scoped>
    .main {
          background-color: aliceblue;
          min-height: 100vh;
          width: 100%;
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
	 .whiteHeader{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 80px;
		 background-color: white;
	 }
	 .inputView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
	 }
	 .searchlocation{
         margin-left: 10px;
         width: 150px;
         height: 30px;
         margin-top: 10px;
         border: 1px lightgray solid;
         border-radius: 5px;
         font-size: 13px;
		 background-color: white;
     }
	  .buttonView{
	              margin-top: 50px;
	              background-color: #2A9595;
	              border-radius: 10px;
	              color: white;
	              font-size: 14px;
	              margin-left: 20%; 
	              display: flex;
	              justify-content: center;
	              align-items: center;
	              height: 40px;
	              width: 60%;
	     }
    }
</style>