<template>
  <view>
    <u-navbar
      title="活动提现"
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

    <view v-for="(item, index) in list" :key="index">
      <view style="margin-top: 10px">
        <view>
          <view
            style="
              display: flex;
              flex-direction: row;
              margin: 1px 15px;
              justify-content: space-between;
            "
          >
            <view style="font-size: 16px; color: #333"
              >活动名称：{{ item.act_name }}</view
            >
            <view style="font-size: 14px; color: #0080ff"></view>
          </view>
          <view style="font-size: 13px; color: #666; margin: 5px 15px"
            >活动时间:{{ item.start_time }}---{{ item.end_time }}</view
          >
          <view style="font-size: 13px; color: #666; margin: 5px 15px"
            >返赠比例：{{ item.rebate_ratio }}</view
          >
          <view style="font-size: 13px; color: #666; margin: 5px 15px"
            >充值总额：{{ item.rel_chartol_amt }}</view
          >
          <view style="font-size: 13px; color: #666; margin: 5px 15px"
            >赠送总额：{{ item.pretol_amt }}</view
          >
          <view style="font-size: 13px; color: #666; margin: 5px 15px"
            >已消费金额：{{ item.used_amount }}</view
          >
          <!-- <view style="font-size: 13px; color: #666; margin: 5px 15px"
            >可提现金额：2025-06-08</view
          > -->
        </view>
      </view>
      <u-line color="#f5f5f5" style="margin-top: 5px"></u-line>
      <view
        style="
          display: flex;
          flex-direction: row;
          justify-content: right;
          margin: 5px 15px;
        "
      >
        <view
          style="flex: auto; font-size: 14px; padding: 1px 5px; color: #ce6714"
        >
          可提现金额：{{ item.can_out }}</view
        ><view
          style="
            border: 1px solid #0080ff;
            border-radius: 5px;
            padding: 1px 15px;
            color: #0080ff;
            margin-right: 15px;
          "
          @click="toWithdra(item)"
        >
          去提现</view
        >
        <view
          style="
            border: 1px solid #0080ff;
            border-radius: 5px;
            padding: 1px 15px;
            color: #0080ff;
          "
          @click="toHistory(item)"
        >
          提现明细</view
        >
      </view>

      <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    </view>
  </view>
</template>

<script setup lang="ts">
import { activeWithdraList } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const list = ref([1, 2, 3, 4, 5, 6, 7]);

const withdralist = (searindex) => {
  activeWithdraList({
      userId: storage.getUserId(),
      index: searindex,
      page: 1,
      size: 50
    }).then(res => {
      list.value = res.result;
      console.log(res);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const toWithdra = (bean) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayWithdraPage?id=" + bean.act_id + "&amount=" + bean.can_out + "&shopId=" + bean.shop_id
    });
};

const toHistory = (bean) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayWithdraHistoryPage?type=true&id=" + bean.act_id
    });
};

onMounted(() => {
  withdralist("");
});
</script>

<style></style>
