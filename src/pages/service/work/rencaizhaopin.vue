<template>
    <view class="content">
        <!-- uView Tabs 组件 -->
        <u-navbar title="人才招聘" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
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
            <swiper-item>
                <zhaopin :message="types[0]" :postid="types[0]" @message="receiveMessage"></zhaopin>
            </swiper-item>
            <swiper-item>
                <qiuzhi :message="types[1]" :postid="types[1]" @message="receiveMessage"></qiuzhi>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import zhaopin from "./ZhaoPinXinXiFrag.vue";

import qiuzhi from "./QiuZhiXinXiFrag.vue";

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

const type = ref("1");

const bgColor = ref("#007AFF");

const parentData = ref("Hello from Parent");

const id = ref("11111111");

const receiveMessage = ref("aaaaaaa");

const types = ref(["", "2"]);

const tabList = ref([
                { name: "招聘信息" },
                { name: "求职信息" },
            ]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const loadData = () => {

};

const goBack = () => {
  uni.navigateBack();
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const clickTab = (item) => {
  currentTab.value = item.index;
};

onMounted(() => {
  loadData();
});
</script>

<style></style>