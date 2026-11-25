<template>
    <view>
        <u-navbar title="留言窗口" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
        <u-textarea v-model="value1" placeholder="请输入内容" autoHeight></u-textarea>

        <view
            style="position: fixed;bottom: 30px;left: 0; right: 0; margin: 20px 20px; background-color: #2a9598; color: white; text-align: center; padding: 6px 0; border-radius: 4px; z-index: 1000;"
            @click="queren">
            确认
        </view>
    </view>
</template>

<script setup lang="ts">
import { sendMessage } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const value1 = ref('');

const lawyer_user_id = ref("");

const id = ref<any>();

const goBack = () => {
  uni.navigateBack();
};

const queren = () => {
  // 这里可以添加提交留言的逻辑，例如发送请求到服务器
    console.log('留言内容:', value1.value);
    // 提交后清空输入框
    sendMessage({
      type: 0,
      content: value1.value,
      lawyer_user_id: id.value,
      user_id: storage.getUserId()
    }).then(res => {
      console.log(res);
      uni.showToast({
        title: '留言已提交',
        icon: 'success'
      });
      value1.value = '';
      uni.navigateBack();
    });
};

onLoad((e) => {
  id.value = e.lawyer_user_id;
});
</script>

<style></style>