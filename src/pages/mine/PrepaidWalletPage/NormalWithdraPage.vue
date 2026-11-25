<template>
  <view>
    <u-navbar
      title="提现"
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
      <template #right>
<view >
        <view style="color: white" @click="toHistory">记录</view>
      </view>
</template>
    </u-navbar>
    <view
      style="
        border: 1px solid #999;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        margin: 40px 15px 10px 15px;
        align-items: center;
      "
    >
      <view style="color: black; margin-left: 5px; font-size: 25px">¥</view>
      <input
        type="number"
        v-model="invalue"
        placeholder="请输入提现金额"
        style="width: 85%; margin: 5px auto"
      />
    </view>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 15px;
      "
    >
      <view style="color: #999">可提现余额：{{ amount }}</view>
      <view style="color: #007aff" @click="allWithdra">全部提现</view>
    </view>
    <button
      style="margin: 10px auto; width: 90%"
      type="primary"
      @click="toWithdra"
    >
      提现
    </button>
  </view>
</template>

<script setup lang="ts">
import { NormalWithdra } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const invalue = ref(0);

const type = ref("");

const amount = ref("");

const goBack = () => {
  uni.navigateBack();
};

const toHistory = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayWithdraHistoryPage?ntype=" + type.value
    });
};

const allWithdra = () => {
  invalue.value = amount.value;
};

const toWithdra = () => {
  let data = {
      userId: storage.getUserId(),
      type: type.value,
      amount: invalue.value
    };
    NormalWithdra(data).then(res => {
      console.log(res);
      if (res.success) {
        uni.navigateBack();
      } else {
        uni.showToast({
          title: res.message,
          icon: "none"
        });
      }
    });
};

onLoad((e) => {
  type.value = e.type;
    amount.value = e.amount;
    console.log(e + ":" + type.value + ":" + amount.value);
});
</script>

<style></style>
