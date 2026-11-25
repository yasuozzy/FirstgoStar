<template>
    <view class="main">
        <u-navbar
          title="积分商城"
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
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<view class="hotHeader">
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="hotImage"
			  width="20px"
			  height="20px"
			></u-image>
			<view class="textView">爆款排名</view>
		</view>
		<view class="hotView">
			<view class="hotview_item" v-for="(item,index) in hotList" :key="index">
				<u-image style="border-radius: 4px;"
				  :src="item.image"
				  width="80px"
				  height="80px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;text-align: center;">{{item.title}}</view>
				<view style="font-size: 12px;margin-top: 10px;color: dimgray;text-align: center;">{{item.charge}}</view>
				<view style="justify-content: center;margin-top: 10px;background-color: red;border-radius: 8px;color: white;font-size: 12px;width: 60%;height: 20px;text-align: center;" @click="exchangeClick">立即兑换</view>
			</view>
		</view>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">生态美食</view>
				<view v-else style="color: black;font-size: 13px;">生态美食</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">活动专区</view>
				<view v-else style="color: black;font-size: 13px;">活动专区</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">海鲜水产</view>
				<view v-else style="color: black;font-size: 13px;">海鲜水产</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;" @click="segment4Click">
				<view v-if="type === '4'" style="color: #2A9595;font-size: 13px;">新鲜蔬菜</view>
				<view v-else style="color: black;font-size: 13px;">新鲜蔬菜</view>
				<view class="whiteLine" v-if="type === '4'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;" @click="segment5Click">
				<view v-if="type === '5'" style="color: #2A9595;font-size: 13px;">精选商品</view>
				<view v-else style="color: black;font-size: 13px;">精选商品</view>
				<view class="whiteLine" v-if="type === '5'"></view>
			</view>
		</view>
		<view style="background-color: lightgray;width: 100%;height: 1px;"></view>
		<view class="goodsView">
			<view class="goods_item" v-for="(item,index) in goodsList" :key="index">
				<u-image style="border-radius: 4px;margin-top: 10px;margin-left: 15px;"
				  :src="item.image"
				  width="100px"
				  height="90px"
				></u-image>
				<view style="display: flex;flex-direction: column;width: 100%;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 5px;">{{item.title}}</view>
					<view style="font-size: 12px;color: red;margin-top: 5px;margin-left: 5px;">{{item.integral}}</view>
					<view class="buttonView" @click="exchangeClick">立即兑换</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bgColor = ref("#2A9595");
const hotImage = ref("/static/home/homestay.png");
const swiperList = ref([
	"/static/home/swiper.png",
	"/static/home/swiper.png",
	"/static/home/swiper.png",
	"/static/home/swiper.png",
	"/static/home/swiper.png",
]);
const hotList = ref([
	{ image: "/static/home/swiper.png", title: "九龙山门票", charge: "已有10人兑换" },
	{ image: "/static/home/swiper.png", title: "九龙山门票", charge: "已有10人兑换" },
	{ image: "/static/home/swiper.png", title: "九龙山门票", charge: "已有10人兑换" },
]);
const goodsList = ref([
	{ image: "/static/home/swiper.png", title: "预制菜 五香肉一份", integral: "积分300.00" },
	{ image: "/static/home/swiper.png", title: "九龙山门票", integral: "积分300.00" },
]);
const type = ref("1");

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const segment1Click = () => {
	type.value = "1";
};

const segment2Click = () => {
	type.value = "2";
};

const segment3Click = () => {
	type.value = "3";
};

const segment4Click = () => {
	type.value = "4";
};

const segment5Click = () => {
	type.value = "5";
};

const exchangeClick = () => {
	uni.navigateTo({
		url: "/pages/Integral/confirmOrder"
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
	 .hotHeader{
	 		  display: flex;
	 		  flex-direction: row;
	 		  width: 100%;
	 		  background-color: white;
	 		  height: 50px;
	 }
	 .textView{
	 		  margin-left: 10px;
	 		  margin-top: 10px;
	 		  color: firebrick;
			  font-size: 13px;
	 }
	 .hotView{
	 		  margin-top: 5px;
	 		  display: flex;
	 		  flex-direction: row;
	 		  width: 100%;
	 		  .hotview_item{
	 			  display: flex;
	 			  flex-direction: column;
	 			  width: 33.33%;
	 			  align-items: center;
	 		  }
	 }
	 .specsView{
	 		 width: 100%;
	 		 height: 30px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 background-color: white;
	 		 margin-top: 20px;
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .goodsView{
	 		  display: flex;
	 		  flex-direction: column;
	 		  width: 100%;
	 		  margin-top: 10px;
	 }
	 .goods_item{
	 		  display: flex;
	 		  flex-direction: row;
	 		  margin-top: 10px;
	 }
	 .buttonView{
	 		margin-top: 10px;
	 		background-color: red;
	 		border-radius: 8px;
	 		color: white;
	 		font-size: 12px;
	 		margin-left: 5px; 
	 		display: flex;
	 		justify-content: center;
	 		align-items: center;
	 		height: 30px;
	 		width: 80%;
	 }
    }
</style>