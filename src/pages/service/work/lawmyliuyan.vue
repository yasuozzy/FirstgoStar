<template>
    <view>
        <u-navbar title="我的留言" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>

        <view v-for="(value, index) in source" :key="index" @click="todetail(value)"
            style="width: 100%; padding: 10px 15px;display: flex;flex-direction: row;">

            <u-image :src="value.avatar" width="40px" height="40px" style="margin-right: 10px;"></u-image>
            <view style="display: flex;flex-direction: column;justify-content: space-between; flex: 1;">
                <view style="font-size: 14px;"><text v-if="type == 0">{{ value.lawyerName }}</text> <text v-else>{{
                    value.userName }}</text></view>
                <view style="font-size: 14px;"> {{ value.content }}</view>

            </view>
            <view style="font-size: 12px;"> {{ value.create_time }}</view>


        </view>


    </view>
</template>

<script setup lang="ts">
import { LawLawyerMessageList, LawUserMessageList } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const source = ref([]);

const type = ref(0);

const todetail = (value) => {
  if (type.value == 0) {
      uni.navigateTo({
        url: "/pages/service/work/liuyandetail?type=" + type.value + "&user_id=" + value.user_id + "&lawyer_user_id=" + value.lawyer_user_id
      });
    } else {
      uni.navigateTo({
        url: "/pages/service/work/liuyandetaillaw?type=" + type.value + "&user_id=" + value.user_id + "&lawyer_user_id=" + value.lawyer_user_id
      });
    }
};

const getlist = () => {
  let data = {
      userId: storage.getUserId()
    };
    if (type.value == 0) {
      LawUserMessageList(data).then(res => {
        console.log(res);
        source.value = res.result;
      });
    } else {
      LawLawyerMessageList(data).then(res => {
        console.log(res);
        source.value = res.result;
      });
    }
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e) => {
  type.value = e.type;
    console.log(type.value);
    getlist();
});
</script>

<style></style>