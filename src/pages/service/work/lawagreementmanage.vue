<template>
	<view class="main">
		<u-navbar title="协议管理" :safeAreaInsetTop="true" :placeholder="true" :fixed="true"
			:border="false" :bgColor="bgColor" titleStyle="color: #fff;">
			<template #left>
<view class="u-nav-slot" >
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
				
			</view>
</template>
			<template #right>
<view class="u-nav-slot" >
				<view class="flex">
					<u-icon name="account" size="20" color="#fff" @click="tolist"></u-icon>
				</view>
				
			</view>
</template>
		</u-navbar>
		<view class="oamanageView">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: royalblue;">
				</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">协议管理</view>
			</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view class="situation_item" v-for="(item, index) in toolsList" :key="index"
					@click="financialClick(index)">
					<u-image :src="item.image" width="30px" height="30px"></u-image>
					<view class="item_text">{{ item.title }}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const toolsList = ref([
				{ image: '/static/mine/image.png', title: '免费援助协议' },
				{ image: '/static/mine/ll11.png', title: '委托服务协议' },

			]);

const message = ref('/static/service/message.png');

const minelaw = ref<any>();

const init = () => {

};

const tolist = () => {
  uni.navigateTo({
      url: '/pages/service/work/lawmyagreement?type=0'
    });
};

const financialClick = (index) => {
  if (index === 0) {
      uni.navigateTo({
        url: '/pages/service/work/lawfreeagreement?isfree=1'
      });
    } else if (index === 1) {
      uni.navigateTo({
        url: '/pages/service/work/lawfreeagreement?isfree=0'
      });
    }
};

const mesasgeClick = () => {
  uni.navigateTo({
      url: '/pages/mine/LingGongOrder/linggongMessage'
    });
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((options) => {
  minelaw.value = JSON.parse(options.minelaw);
    console.log(minelaw.value);
});

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.main {
	height: 100%;
	background: white;

	.flex {
		display: flex;
	}

	.homestayView {
		width: 100px;
		height: 30px;
		color: white;
		margin-right: 10px;
		margin-top: 11px;
		text-align: right;
		font-size: 13px;
	}

	.oamanageView {
		display: flex;

		flex-direction: column;
		margin-left: 4%;
		width: 92%;
		margin-top: 10px;
		background-color: white;
		border-radius: 8px;

		.itemview {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/* 允许换行 */
			margin-bottom: 10px;

			.situation_item {
				width: 25%;
				font-size: 12px;
				color: #000;
				margin-top: 15px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 65upx;
				margin-bottom: 30px;

				.item_text {
					margin-top: 8px;
				}
			}
		}
	}
}
</style>