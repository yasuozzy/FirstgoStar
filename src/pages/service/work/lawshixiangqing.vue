<template>
    <view style="padding-left: 15px;padding-right: 15px;">
        <u-navbar title="律师详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
            <view
                style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
            </view>
            <view> 律师简介</view>
        </view>

        <view style="display: flex;flex-direction: row;margin-top: 5px;">
            <u-image :src="avatar" width="70px" height="120px" style="background-color: bisque;"></u-image>
            <view style="display: flex;flex-direction: column;justify-content: space-between;padding: 5px 10px;">
                 <view>律师姓名： {{ name }}</view>
                    <view>执业证号： {{ paper_card }}</view>
                    <view>业务专长： {{ specialty }}</view>
            </view>

        </view>

        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
            <view
                style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
            </view>
            <view> 业务专长</view>
        </view>
        <view v-for="(value, index) in asktype" :key="index">
            <u-line height="1" bgColor="#E5E5E5"></u-line>
            <view style="display: flex;flex-direction: row;padding: 5px 15px;justify-content: space-between;">
                <view>劳动纠纷</view>
                <view style="color: #2a9598;font-size: 13px;">
                    200元/次</view>
            </view>
            <view style="display: flex;flex-direction: row;padding: 5px 15px;justify-content: space-between;"> 劳动争议，工伤补偿</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage';

import { dayjobProfessionList } from '@/api/work.ts';

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const asktype = ref([1, 2]);

const id = ref('');

const name = ref('');

const paper_card = ref('');

const specialty = ref('');

const avatar = ref('');

const init = () => {
  try {
      dayjobProfessionList({
        office_id: id.value,
        id: id.value
      }).then(res => {
        console.log(res);
        asktype.value = res.result;
      });
    } catch (error) {
      console.log(error);
    }
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e) => {
  console.log(e);
    id.value = e.id;
    name.value = e.name;
    paper_card.value = e.paper_card;
    specialty.value = e.specialty;
    avatar.value = e.avatar;
    // this.init();
});
</script>

<style></style>