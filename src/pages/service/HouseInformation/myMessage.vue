<template>
    <view class="main">
        <u-navbar
          title="我的消息"
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
			<view class="data-item" v-for="(item,index) in dataList" :key="index" @click="detailClick">
				<view style="width: 100%;height: 20px;margin-top: 10px;font-size: 12px;color: dimgray;text-align: center;">{{item.time}}</view>
				<view style="margin-top: 5px;margin-left: 4%;width: 92%;height: 120px;background-color: white;border-radius: 5px;display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
						<view style="display: flex;flex-direction: column;height: 50px;width: 80%;">
							<view style="font-size: 14px;margin-left: 10px;margin-top: 15px;">{{item.status}}</view>
							<view style="font-size: 13px;margin-left: 10px;margin-top: 10px;color: gray;">去缴纳押金</view>
						</view>
						<u-image style="margin-left: 10px;margin-top: 15px;border-radius: 5px;"
						  :src="item.img"
						  width="50px"
						  height="50px"
						></u-image>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 20px;"></view>
					<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;">查看详情 ></view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([
		{status:'审核已通过',time:'2025-10-20 12:30:11',img:'/static/home/homestay.png'},
		{status:'审核已通过',time:'2025-10-20 12:30:11',img:'/static/home/homestay.png'},
		{status:'审核已通过',time:'2025-10-20 12:30:11',img:'/static/home/homestay.png'},
	]);

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	//详情
	const detailClick = () => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/housedetailMessage'
		});
	};
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
	 .data-item{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 150px;
		 background-color: aliceblue;
	 }
    }
</style>