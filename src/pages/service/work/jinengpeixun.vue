<template>
    <view>
        <u-navbar title="技能培训" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view >
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
</template>
            <template #right>
<view ></view>
</template>
        </u-navbar>


        <view style="width: 100%;display: flex;justify-content: space-between;padding: 10px 0;">

            <view @click="compaixun" class="text">用工单位</view>
            <view @click="perpeixun" class="text">个人</view>
        </view>

    </view>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const type = ref("1");

const loadData = () => {

};

const goBack = () => {
  uni.navigateBack();
};

const compaixun = () => {
  uni.navigateTo({
      url: "/pages/service/work/compaixun"
    });
};

const perpeixun = () => {
  uni.navigateTo({
      url: "/pages/service/work/perpeixun"
    });
};

onMounted(() => {
  loadData();
});
</script>

<style>
.text {
    font-size: 16px;
    color: white;
    background-color: #2a9598;
    flex: 1;
    text-align: center;
    margin: 12px;
    padding: 10px 0;
    border-radius: 5px;
}
</style>