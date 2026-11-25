<template>
  <view>
    <u-navbar
      title="预付钱包"
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
<view  @click="activityWithdra">
        <view style="color: white">活动提现</view>
      </view>
</template>
    </u-navbar>
    <view
      style="
        background-color: #007aff;
        height: 100px;
        width: 90%;
        border-radius: 10px;
        margin-left: 5%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
      "
    >
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white">已充值(元)</text>
        <text style="color: white" @click="toUse">去消费></text>
      </view>
      <view
        style="color: white; flex: 1; text-align: center; align-items: center"
      >
        {{ numInfo.userRechargeAmount }}
      </view>
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white" @click="toRechargeDetail">查看明细></text>
        <text style="color: white" @click="toRecharge">去充值></text>
      </view>
    </view>
    <view
      style="
        background-color: #007aff;
        height: 100px;
        width: 90%;
        border-radius: 10px;
        margin-left: 5%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
      "
    >
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white">已消费(元)</text>
        <text style="color: white" @click="toUseDetailTitle()"
          >查看明细></text
        >
      </view>
      <view
        style="color: white; flex: 1; text-align: center; align-items: center"
      >
        {{ numInfo.userUsedAmount }}
      </view>
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white">余额：{{ numInfo.userLeftAmount }}</text>
        <text @click="myOrder" style="color: white">我的预约></text>
      </view>
    </view>
    <view
      v-if="numInfo.isShowSHop === '1'"
      style="
        background-color: #007aff;
        height: 100px;
        width: 90%;
        border-radius: 10px;
        margin-left: 5%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
      "
    >
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white">可提现金额(元)</text>
        <text
          style="color: white"
          @click="toWithdra(0, numInfo.shopExtractAmount)"
          >去提现></text
        >
      </view>
      <view style="color: white; flex: 1; padding-left: 15px">
        {{ numInfo.shopExtractAmount }}
      </view>
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white"
          >充值余额：{{ numInfo.shopRechargeAmount }}</text
        >
        <text style="color: white"
          >可提现金额{{ numInfo.shopExtractAmount }}</text
        >
      </view>
    </view>
    <view
      v-if="numInfo.isShowDisSHop === '1'"
      style="
        background-color: #007aff;
        height: 100px;
        width: 90%;
        border-radius: 10px;
        margin-left: 5%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
      "
    >
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white">折扣可提现金额(元)</text>
        <text
          style="color: white"
          @click="toWithdra(1, numInfo.disShopDisExtractAmount)"
          >去提现></text
        >
      </view>
      <view style="color: white; flex: 1; padding-left: 15px">
        {{ numInfo.disShopDisExtractAmount }}
      </view>
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: 13px;
        "
      >
        <text style="color: white"
          >已消费金额：{{ numInfo.disShopRechargeAmount }}</text
        >
        <text style="color: white"
          >折后可提现金额：{{ numInfo.disShopDisExtractAmount }}</text
        >
      </view>
    </view>
    <u-line color="#999" style="margin-top: 10px"></u-line>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px 25px;
      "
    >
      <text style="color: #999">日期</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #999">金额</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #999">明细</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #999">详情</text>
    </view>
    <u-line color="#999" style="margin-top: 10px"></u-line>
    <view
      v-for="(item, index) in useRecord"
      :key="index"
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 25px;
      "
    >
      <text style="color: #666; font-size: 13px">{{ item.create_time }}</text>
      <text style="color: #666; font-size: 13px; color: #007aff">{{
        item.amount
      }}</text>
      <text style="color: #666; font-size: 13px" v-if="item.type === '0'"
        >用户充值</text
      >
      <text style="color: #666; font-size: 13px" v-else-if="item.type === '1'"
        >政充</text
      >
      <text style="color: #666; font-size: 13px" v-else-if="item.type === '2'"
        >平充</text
      >
      <text style="color: #666; font-size: 13px" v-else-if="item.type === '3'"
        >购物消费</text
      >
      <text style="color: #666; font-size: 13px" v-else-if="item.type === '4'"
        >活动充值</text
      >

      <text style="color: #007aff; font-size: 13px" @click="toUseDetail(item)"
        >查看详情</text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { PrepayHome, prePayUseList } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const list = ref([1, 2, 3, 4, 5, 6]);

const numInfo = ref({});

const useRecord = ref([]);

const getInfo = () => {
  console.log(storage.getUserId());
    PrepayHome({
      userId: storage.getUserId()
    }).then(res => {
      numInfo.value = res.result;
      console.log(numInfo.value);
    });
};

const getUseList = () => {
  prePayUseList({
      userId: storage.getUserId(),
      size: 20,
      page: 1,
      type: 3
    }).then(res => {
      useRecord.value = res.result;
      console.log(useRecord.value);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const toUse = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayShopList"
    });
};

const toRechargeDetail = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/rechargeDetailTitlePage"
    });
};

const toRecharge = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayRechargePage"
    });
};

const myOrder = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/myPrePayOrderPage"
    });
};

const toUseDetailTitle = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayDetailTitlePage"
    });
};

const toWithdra = (type, amount) => {
  uni.navigateTo({
      // url: "/pages/finance-mine/prepayWithdraPage/prepayWithdraPage",
      url: "/pages/mine/PrepaidWalletPage/NormalWithdraPage?type=" + type + "&amount=" + amount
    });
};

const toUseDetail = (e) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayUseDetailPage?type=" + e.type + "&id=" + e.rec_id
    });
};

const activityWithdra = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/activityWithdraPage"
    });
};

onMounted(() => {
  getInfo();
    getUseList();
});
</script>

<style></style>
