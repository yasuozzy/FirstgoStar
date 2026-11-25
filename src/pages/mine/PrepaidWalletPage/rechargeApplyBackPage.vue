<template>
  <view>
    <u-navbar
      title="申请记录"
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
    <view style="display: flex; flex-direction: row; margin: 5px 10px">
      <text style="color: #333; width: 10%; text-align: center">序号</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 45%; text-align: center">申请时间</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 20%; text-align: center">退款金额</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 25%; text-align: center">状态</text>
      
    </view>
    <u-line color="#999" style="margin-top: 10px"></u-line>
    <view
      v-for="(item, index) in list"
      :key="index"
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 15px;
      "
    >
      <text
        style="color: #333; width: 10%; text-align: center; font-size: 13px"
        >{{ index + 1 }}</text
      >
      <text
        style="color: #333; width: 45%; text-align: center; font-size: 13px"
        >{{ item.create_time }}</text
      >
      <text style="color: #333; width: 20%; text-align: center; font-size: 13px"
        >{{ item.amount }}元</text
      >
      <text
        @click="toUseDetail"
        style="color: #333; width: 25%; text-align: center; font-size: 13px"
        >{{ item.statusFlag }}</text
      >
      
    </view>
  </view>
</template>

<script setup lang="ts">
import { RechargeBackMoneyRecord } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const list = ref([1, 2, 3, 4, 5, 6]);

const getlist = () => {
  RechargeBackMoneyRecord({
      userId: storage.getUserId(),
      size: 50,
      page: 1
    }).then(res => {
      list.value = res.result;
      console.log(res);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const toUseDetail = () => {
  // uni.navigateTo({
    //   url: "/pages/finance-mine/prepayUseDetailPage/prepayUseDetailPage",
    // });
};

const applyShouHou = () => {

};

onMounted(() => {
  getlist();
});
</script>

<style></style>
