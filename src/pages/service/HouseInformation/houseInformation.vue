<template>
    <view class="main">
        <u-navbar
          title="房源信息"
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
          <template #right>
            <view @click="homestayClick">
              <u-image 
                :src="mesImage"
                width="20px"
                height="20px"
              ></u-image>
            </view>
          </template>
		 
        </u-navbar>
		<view style="width: 100%;height: 50px;background-color: lightgoldenrodyellow;display: flex;flex-direction: row;">
			<u-image style="margin-left: 15px;margin-top: 15px;"
			  :src="warningImg"
			  width="20px"
			  height="20px"
			></u-image>
			<view style="margin-left: 10px;color: orange;font-size: 12px;margin-top: 10px;">{{warningInfo}}</view>
		</view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="rentClick">
			<u-image style="margin-left: 15px;margin-top: 15px;"
			  :src="renthouseImg"
			  width="30px"
			  height="30px"
			></u-image>
			<view style="margin-left: 10px;font-size: 14px;margin-top: 20px;width: 70%;">租房</view>
			<u-image style="margin-left: 30px;margin-top: 18px;"
			  :src="arrowImage"
			  width="10px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="buyClick">
			<u-image style="margin-left: 15px;margin-top: 15px;"
			  :src="buyhouseImg"
			  width="30px"
			  height="30px"
			></u-image>
			<view style="margin-left: 10px;font-size: 14px;margin-top: 20px;width: 70%;">买房</view>
			<u-image style="margin-left: 30px;margin-top: 18px;"
			  :src="arrowImage"
			  width="10px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const mesImage = ref("/static/service/message.png");
	const warningInfo = ref('温馨提示：请正确选择发布信息的分类，分类错误会导致信息违规下架');
	const arrowImage = ref('/static/service/my_arrow.png');
	const renthouseImg = ref('/static/service/totalrentImg.png');
	const buyhouseImg = ref('/static/service/rentreleaseImg.png');
	const warningImg = ref('/static/service/lingdang.png');

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	const homestayClick = () => {};

	const rentClick = () => {
		//1代表租房
		uni.navigateTo({
			url: '/pages/service/HouseInformation/rentHouse?styleType=1'
		});
	};

	const buyClick = () => {
		//2代表买房
		uni.navigateTo({
			url: '/pages/service/HouseInformation/buyHouse?styleType=2'
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
    }
</style>