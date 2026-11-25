<template>
    <view>
        <u-navbar title="我的申请" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
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
                <lawmyapply :message="types[0]" :postid="types[0]" @message="receiveMessage"></lawmyapply>
            </swiper-item>
            <swiper-item>
                <lawmyapply :message="types[1]" :postid="types[1]" @message="receiveMessage"></lawmyapply>
            </swiper-item>

        </swiper>

    </view>
</template>

<script setup lang="ts">
import lawmyapply from "./LayMyApplyListFrag.vue";

import { ref } from "vue";

const bgColor = ref('#007AFF');

const tabList = ref([
                { name: "免费援助" },
                { name: "委托服务" },
            ]);

const types = ref(["1", "0",]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const goBack = () => {
  uni.navigateBack();
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const clickTab = (item) => {
  currentTab.value = item.index;
};
</script>

<style></style>