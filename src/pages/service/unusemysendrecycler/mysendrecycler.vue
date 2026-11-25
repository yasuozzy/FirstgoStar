<template>
  <view class="content">
    <!-- uView Tabs 组件 -->
    <u-navbar
      title="我发布的回收"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
        <view @click="goBack">
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
          :message="types[index]"
          :postid="types[index]"
          @message="receiveMessage"
        ></FragPage>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import FragPage from "./fragpage.vue";

const bgColor = ref("#007AFF");
const parentData = ref("Hello from Parent");
const id = ref("11111111");
const tabList = ref([{ name: "全部" }, { name: "待发货" }, { name: "已完成" }]); // u-tabs 需要数组对象
const types = ref(["", "3", "5"]);
const currentTab = ref(0);
const swiperHeight = ref(500);

const changeTab = (index: number) => {
  currentTab.value = index;
};

const clickTab = (item: any) => {
  console.log("item", item);
  currentTab.value = item.index;
};

const onSwiperChange = (e: any) => {
  currentTab.value = e.detail.current;
};

const receiveMessage = (message: string) => {
  console.log("Received message:", message);
  parentData.value = message;
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e: any) => {
  currentTab.value = Number(e.index || 0);
  uni.getSystemInfo({
    success: (res) => {
      swiperHeight.value = res.windowHeight - 104; // 减去 Tabs 高度
      console.log("height", swiperHeight.value);
    },
  });
});
// ...其他代码
</script>

<style scoped></style>
