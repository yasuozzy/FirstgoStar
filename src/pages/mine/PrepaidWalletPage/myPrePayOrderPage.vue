<template>
  <view class="content">
    <!-- uView Tabs 组件 -->
    <u-navbar
      title="我的预约"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
    </u-navbar>
    <view style="">
      <u-tabs
        style="
          position: fixed;
          top: 64px;
          z-index: 1000;
          height: 40px;
          width: 100%;
        "
        :list="tabList"
        :current="currentTab"
        @click="clickTab"
        :scrollable="false"
        active-color="#007aff"
        inactive-color="#606266"
      ></u-tabs>
    </view>
    <swiper
      style="margin-top: 40px;"
      :current="currentTab"
      @change="onSwiperChange"
       :style="{ height: swiperHeight + 'px' }"
    >
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <FragPage
          :message="parentData"
          :postid="index"
          @message="receiveMessage"
        ></FragPage>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import FragPage from "@/pages/mine/PrepaidWalletPage/fragpage.vue";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const parentData = ref("Hello from Parent");

const id = ref("11111111");

const tabList = ref([{ name: "待确认" }, { name: "待使用" }, { name: "已使用" }, { name: "已取消" }]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const changeTab = (index) => {
  currentTab.value = index;
};

const clickTab = (item) => {
  console.log("item", item);
    currentTab.value = item.index;
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const receiveMessage = (message) => {
  console.log("Received message:", message);
    parentData.value = message;
};

const goBack = () => {
  uni.navigateBack();
};

onLoad(() => {
  uni.getSystemInfo({
      success: res => {
        swiperHeight.value = res.windowHeight - 104; // 减去 Tabs 高度
        console.log("height", swiperHeight.value);
      }
    });
});
</script>

<style scoped></style>
