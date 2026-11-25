<template>
  <view>
    <u-navbar
      title="明细列表"
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
      <text style="color: #333; width: 20%; text-align: center">日期</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 20%; text-align: center">金额</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 20%; text-align: center">明细</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 40%; text-align: center">操作</text>
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
        style="color: #333; width: 20%; text-align: center; font-size: 13px"
        >{{ item.create_time }}</text
      >
      <text
        style="color: #007aff; width: 20%; text-align: center; font-size: 13px"
        >{{ item.amount }}</text
      >
      <text
        style="color: #333; width: 20%; text-align: center; font-size: 13px"
        >{{ getTextByType(item.type) }}</text
      >

      <view
        style="color: #333; width: 40%; text-align: center; font-size: 13px"
      >
        <text
          @click="toUseDetail(item)"
          style="color: #007aff; text-align: center; font-size: 13px"
          >查看详情</text
        >
        <text
          v-if="item.type == 0 && item.leftAmount > 0"
          @click="applyShouHou(item)"
          style="
            margin-left: 15px;
            color: #007aff;
            text-align: center;
            font-size: 13px;
          "
          >申请退款</text
        >
      </view>
    </view>
    <u-popup
      :show="show"
      @close="close"
      @open="open"
      mode="center"
      :round="10"
      :closeOnClickOverlay="false"
    >
      <view style="width: 40vh">
        <view
          style="
            padding: 5px 10px;
            text-align: center;
            font-size: 14px;
            color: #333;
          "
        >
          退款申请
        </view>
        <view style="padding: 5px 10px; font-size: 13px; color: #666">
          日期：{{ currenttime }}
        </view>
        <view style="padding: 5px 10px; font-size: 14px; color: #333">
          退款事由:
        </view>
        <u-textarea
          style="border: 1px solid #e4e7ed; margin: 0px 10px; font-size: 14px"
          v-model="value1"
          placeholder="请输入内容"
          @input="change"
          border="surround"
        ></u-textarea>

        <view style="padding: 5px 10px; font-size: 13px; color: #28a3c5">
          所属店铺：{{ backitem.shop_name }}
        </view>
        <view style="padding: 5px 10px; font-size: 13px; color: #28a3c5">
          当前余额：{{backitem.amount}}元
        </view>
        <view
          style="
            padding: 5px 10px;
            font-size: 13px;
            display: flex;
            flex-direction: row;
            align-items: center;
          "
        >
          退款金额:
          <u-input
            style="border: 1px solid #e4e7ed; height: 20px"
            placeholder="请输入内容"
            border="surround"
            v-model="value"
            @change="change1"
          ></u-input>
        </view>
        <view
          style="
            padding: 5px 10px;
            font-size: 13px;
            display: flex;
            flex-direction: row;
          "
        >
          收款账号：{{ receivephone }}
        </view>
        <view
          style="
            height: 1px;
            width: 100%;
            background-color: #999;
            margin: 8px 0px;
          "
        ></view>
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-bottom: 8px;
          "
        >
          <view
            style="
              font-size: 14px;
              width: 90px;
              border-radius: 5px;
              text-align: center;
              border: 1px solid #999;
            "
            @click="close"
            >取消</view
          >
          <view
            @click="commit"
            style="
              font-size: 14px;
              width: 90px;
              border: 1px solid #f5f5f5;
              background-color: #007aff;
              color: white;
              border-radius: 5px;
              text-align: center;
            "
            >提交申请</view
          >
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { RechargeHistory, RechargeBackMoney } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { getFormattedDate } from "@/utils/common.ts";

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const list = ref([]);

const show = ref(false);

const value = ref("");

const value1 = ref("");

const type = ref(0);

const backitem = ref({});

const receivephone = ref("");

const currenttime = ref("");

const gettime = () => {
  return new Date().toLocaleString();
};

const getTextByType = (type) => {
  switch (type) {
      case "0":
        return "用户充值";
      case "1":
        return "政充";
      case "2":
        return "平充";
      case "3":
        return "购物消费";
      case "4":
        return "活动充值";
      default:
        return "未知类型";
    }
};

const getlist = () => {
  RechargeHistory({
      userId: storage.getUserId(),
      type: type.value,
      size: 50,
      page: 1
    }).then(res => {
      console.log(res);
      list.value = res.result;
    });
};

const postBack = (rec_id, amount, reason) => {
  RechargeBackMoney({
      userId: storage.getUserId(),
      user_mobile: storage.getPhone(),
      rec_id: rec_id,
      amount: amount,
      apply_reason: reason
    }).then(res => {
      console.log(res);
      show.value = false;
    });
};

const commit = () => {
  if (value.value == "") {
      uni.showToast({
        title: "请输入退款金额",
        icon: "none"
      });
      return;
    } else if (value1.value == "") {
      uni.showToast({
        title: "请输入退款事由",
        icon: "none"
      });
      return;
    }
    postBack(backitem.value.rec_id, value.value, value1.value);
};

const goBack = () => {
  uni.navigateBack();
};

const toUseDetail = (item) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayUseDetailPage?type=" + item.type + "&id=" + item.rec_id
    });
};

const applyShouHou = (item) => {
  backitem.value = item;
    receivephone.value = storage.getPhone();
    value.value = "";
    value1.value = "";
    show.value = true;
};

const open = () => {
  // console.log('open');
};

const close = () => {
  show.value = false;
    // console.log('close');
};

const change = (e) => {
  console.log("e", e);
};

const change1 = (e) => {
  console.log("e", e);
};

onMounted(() => {
  currenttime.value = getFormattedDate();
});

onLoad((e) => {
  // this.type = e.type;
    // if (this.type == 1) {
    getlist();
    // }
});
</script>

<style></style>
