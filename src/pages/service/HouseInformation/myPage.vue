<template>
    <view class="main">
        <u-navbar
          title="我的"
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
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="item-list" v-for="(item,index) in dataList" :key="index" @click="itemClick(index)">
				<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
					<u-image style="margin-left: 15px;margin-top: 10px;"
					  :src="item.icon"
					  width="20px"
					  height="20px"
					></u-image>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 20px;width: 75%;">{{item.title}}</view>
					<u-image style="margin-left: 15px;margin-top: 10px;"
					  :src="arrowImg"
					  width="8px"
					  height="15px"
					></u-image>
				</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
		
</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([
		{icon:'/static/service/comments.png',title:'我浏览的',},
		{icon:'/static/service/collect_default.png',title:'我收藏的',},
		{icon:'/static/service/report.png',title:'我举报的',},
		{icon:'/static/service/initiate.png',title:'我的租房',},
	]);
	const arrowImg = ref('/static/service/my_arrow.png');
	const type = ref<any>('');
	const styleType = ref<any>('');

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	const itemClick = (index: number) => {
		if (index === 0) {
			uni.navigateTo({
				url: '/pages/service/HouseInformation/myPageReview?styleType=' + styleType.value + '&type=' + type.value + '&fixType=' + 1
			});
		} else if (index === 1) {
			uni.navigateTo({
				url: '/pages/service/HouseInformation/myPageReview?styleType=' + styleType.value + '&type=' + type.value + '&fixType=' + 2
			});
		} else if (index === 2) {
			uni.navigateTo({
				url: '/pages/service/HouseInformation/myPageReview?styleType=' + styleType.value + '&type=' + type.value + '&fixType=' + 3
			});
		} else if (index === 3) {
			uni.navigateTo({
				url: '/pages/service/HouseInformation/housedetailMessage'
			});
		}
	};

	onLoad((options: any) => {
		type.value = options.type;
		styleType.value = options.styleType;
		console.log(type.value, styleType.value);
	});
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
	 .item-list{
		 width: 100%;
		 height: 50px;
		 display: flex;
		 flex-direction: column;
	 }
    }
</style>