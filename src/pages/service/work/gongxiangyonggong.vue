<template>
    <view>
        <u-navbar title="共享用工" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
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
                <qiyeyonggong :message="types[0]" :postid="types[0]" @message="receiveMessage"></qiyeyonggong>
            </swiper-item>
            <swiper-item>
                <qiyepaigong :message="types[1]" :postid="types[1]" @message="receiveMessage"></qiyepaigong>
            </swiper-item>
            <swiper-item>
                <laowujianzhi :message="types[2]" :postid="types[2]" @message="receiveMessage"></laowujianzhi>
            </swiper-item>
            <swiper-item>
                <pingtaigongxiang :message="types[3]" :postid="types[3]" @message="receiveMessage"></pingtaigongxiang>
            </swiper-item>
        </swiper>

    </view>


</template>

<script setup lang="ts">
import qiyeyonggong from "./QiYeYongGongFrag.vue";

import qiyepaigong from "./QiYePaiGongFrag.vue";

import laowujianzhi from "./LaoWuJianZhiFrag.vue";

import pingtaigongxiang from "./PingTaiGongXiangFrag.vue";

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

const type = ref("1");

const bgColor = ref("#007AFF");

const parentData = ref("Hello from Parent");

const id = ref("11111111");

const receiveMessage = ref("");

const tabList = ref([
                { name: "企业用工" },
                { name: "企业派工" },
                { name: "劳务兼职" },
                { name: "平台共享" },
            ]);

const types = ref(["0","1", "2", "3", "4"]);

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