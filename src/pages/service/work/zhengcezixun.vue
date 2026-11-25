<template>
    <view class="page-container"> <!-- 添加一个包裹容器 -->
        <u-navbar title="政策咨询" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>

        <view class="contentListView">
            <view class="content_item" v-for="(item, index) in contentList" :key="index" @click="detailClick(index)">
                <view style="text-align: center;font-size: 13px;margin-top: 5px;">{{ item.time }}</view>
                <view class="bottomView">
                    <view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{ item.title }}</view>
                    <view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{ item.content }}</view>
                    <view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
                    <view style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;">查看详情 ></view>
                </view>
            </view>
        </view>
    </view>


</template>

<script setup lang="ts">
import { dayjobPolicyList } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

const type = ref("1");

const bgColor = ref("#007AFF");

const contentList = ref([
              
            ]);

const loadData = () => {
  try {
      dayjobPolicyList({
        userId: storage.getUserId(),
        type: "3",
        page: 1,
        size: "50"
      }).then(res => {
        console.log(res);
        contentList.value = res.result;
      });
    } catch (error) {
      console.log(error);
    }
};

const detailClick = (index) => {
  uni.navigateTo({
      url: '/pages/service/work/zhengcezixundetail?mMessageId=' + contentList.value[index].id
    });
};

const goBack = () => {
  uni.navigateBack();
};

onMounted(() => {
  loadData();
});
</script>

<style>
/* 页面容器样式 */
.page-container {
    min-height: 100vh;
    /* 占满整个视口高度 */
    background-color: #f3f4f8;
    /* 统一背景色 */
}

.contentListView {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: transparent;
    /* 移除局部背景色 */
}

.content_item {
    display: flex;
    flex-direction: column;
    margin-left: 3%;
    width: 94%;
    border-radius: 5px;
    background-color: transparent;
    margin-top: 10px;
}

.bottomView {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 5px;
    background-color: white;
    border-radius: 5px;
}
</style>