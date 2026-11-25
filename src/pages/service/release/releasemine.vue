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
		<view class="mineListView">
			<view class="mine_item" v-for="(item,index) in mineList" :key="index" @click="listClick(item)">
				<view class="headerView">
					<u-image style="margin-left: 15px;margin-top: 11px;"
					  :src="item.icon"
					  width="25px"
					  height="25px"
					></u-image>
					<view style="margin-left: 10px;font-size: 14px;width: 75%;margin-top: 13px;">{{item.name}}</view>
					<u-image style="margin-left: 15px;margin-top: 13px;"
					  :src="item.arrow"
					  width="12px"
					  height="15px"
					></u-image>
				</view>
				<view style="margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bgColor = ref("#2A9595");
const mineList = ref([
	{ icon: '/static/service/initiate.png', name: '我发起的', arrow: '/static/service/my_arrow.png' },
	{ icon: '/static/service/commentblack.png', name: '我评论的', arrow: '/static/service/my_arrow.png' },
	{ icon: '/static/service/collection.png', name: '我收藏的', arrow: '/static/service/my_arrow.png' },
	{ icon: '/static/service/report.png', name: '我举报的', arrow: '/static/service/my_arrow.png' },
	{ icon: '/static/service/shield.png', name: '我屏蔽的', arrow: '/static/service/my_arrow.png' },
]);

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const listClick = (item: any) => {};
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
	 .mineListView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
	 }
	 .mine_item{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 60px;
	 }
	 .headerView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
	 }
    }
</style>