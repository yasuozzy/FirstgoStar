<template>
  <view>
    <u-navbar
      title="提现记录"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
    </u-navbar>
    <view style="margin: 20px; color: #666; display: flex; flex-direction: row">
      <text style="width: 30vh; text-align: center">日期</text>
      <text style="width: 30vh; text-align: center">金额</text>
      <text style="width: 30vh; text-align: center">状态</text>
    </view>
    <view
      v-for="(item, index) in list"
      :key="index"
      style="color: #333; display: flex; flex-direction: row; margin: 5px 20px"
    >
      <text style="width: 30vh; text-align: center">{{
        item.create_time
      }}</text>
      <text style="width: 30vh; text-align: center; color: #007aff">{{
        item.amount
      }}</text>
      <text style="width: 30vh; text-align: center; color: 2a9598">{{
        item.statusFlag
      }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { WithdraHistoryList as WithdraHistoryListApi } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const list = ref([]);

const type = ref("");

const id = ref<any>();

const ntype = ref<any>();

const WithdraHistoryList = () => {
  let data = {
      type: ntype.value,
      userId: storage.getUserId(),
      page: 1,
      size: 50
    };
    WithdraHistoryListApi(data).then(res => {
      list.value = res.result;
      console.log(res);
    });
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e) => {
  id.value = e.id;
    type.value = e.type;
    ntype.value = e.ntype;
    // if (this.type) {
    WithdraHistoryList();
    // } else {
    // this.WithdraHistoryList();
    // }
});
</script>

<style></style>
