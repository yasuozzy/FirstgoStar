<template>
	<view>
		<u-navbar :title="title" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
<view  @click="goBack">
				<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
			</view>
</template>
		</u-navbar>
		<view style="">
			<u-tabs style="
          position: fixed;
          top: 64px;
          z-index: 1000;
          height: 40px;
          width: 100%;
        " :list="tabList" :current="currentTab" @click="clickTab" :scrollable="false" active-color="#007aff"
				inactive-color="#606266"></u-tabs>
		</view>
		<swiper style="margin-top: 40px" :current="currentTab" @change="onSwiperChange"
			:style="{ height: swiperHeight + 'px' }">
			<swiper-item v-for="(item, index) in tabList" :key="index">
				<LawServiceOrderFrag :message="is_free" :postid="types[index]" @message="receiveMessage">
				</LawServiceOrderFrag>
			</swiper-item>
		</swiper>

	</view>
</template>

<script setup lang="ts">
import LawServiceOrderFrag from "./LawServiceOrderFrag.vue";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const title = ref("我的咨询");

const tabList = ref([
				{ name: "待处理" },
				{ name: "工作中" },
				{ name: "已完成" },
				{ name: "已停止" },
			]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const types = ref(["1", "2", "4", "5"]);

const is_free = ref("0");

const type = ref(1);

const parentData = ref("");

const goBack = () => {
  uni.navigateBack();
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const clickTab = (item) => {
  currentTab.value = item.index;
};

const receiveMessage = (message) => {
  console.log("Received message:", message);
    parentData.value = message;
};

onLoad((e) => {
  type.value = e.type;
    if (e.type === "free") {
      title.value = "免费援助";
      is_free.value = "1";
    } else {
      title.value = "委托服务";
      is_free.value = "0";
    }
});
</script>

<style></style>