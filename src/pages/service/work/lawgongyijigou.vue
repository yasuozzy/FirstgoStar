<template>
    <view>
        <u-navbar title="技能培训" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>


    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bgColor = ref('#007AFF');

const goBack = () => {
  uni.navigateBack();
};
</script>

<style></style>