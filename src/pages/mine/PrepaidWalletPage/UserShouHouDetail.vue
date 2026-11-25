<template>
  <view>
    <u-navbar
      title="订单详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bagColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
    </u-navbar>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view>
      <view>
        <view
          style="
            display: flex;
            margin: 20px 15px;
            flex-direction: row;
            align-items: center;
          "
        >
          <image
            :src="detail.cover_img"
            mode=""
            style="width: 40px; height: 40px"
          ></image>
          <view style="margin-left: 15px; flex: 1">{{ detail.shop_name }}</view>
          <view style="color: aqua">{{ detail.statusFalg }}</view>
        </view>
        <u-line color="#999"></u-line>
      </view>

      <template v-if="detail.goodsList && detail.goodsList.length > 0">
        <view style="display: flex; margin: 20px 0px; flex-direction: row">
          <view style="margin-left: 15px; margin-right: 40px">商品:</view>
          <view>
            <view
              v-for="(item, index) in detail.goodsList"
              :key="index"
              style="
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 10px;
              "
            >
              <image
                :src="item.img"
                mode=""
                style="width: 40px; height: 40px"
              ></image>
              <view style="margin-left: 15px">{{ item.goods_name }}</view>
            </view>
          </view>
        </view>

        <u-line color="#999"></u-line>
      </template>
      <view
        style="
          font-size: 16px;
          color: red;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          margin-right: 20px;
        "
      >
        合计:{{ detail.amount }}</view
      >
      <view style="font-size: 16px; margin-left: 15px"> 订单信息:</view>
      <view style="font-size: 13px; margin-left: 15px">
        订单编号：{{ detail.order_no }}</view
      >
      <view style="font-size: 13px; margin-left: 15px">
        下单时间：{{ detail.deal_time }}</view
      >
      <view style="font-size: 16px; margin-left: 15px"> 售后信息：</view>
      <view style="font-size: 13px; margin-left: 15px">
        申请时间：{{ detail.create_time }}</view
      >
      <view style="font-size: 13px; margin-left: 15px">
        申请类型：<text v-if="detail.type == 1">退款退货</text
        ><text v-if="detail.type == 2">退货</text
        ><text v-if="detail.type == 3">维修</text></view
      >
      <view style="font-size: 13px; margin-left: 15px">
        申请原因：{{ detail.reason }}</view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { UserShouHouDetail } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bagColor = ref("#007AFF");

const list = ref([1, 2, 3]);

const type = ref(1);

const recid = ref("");

const detail = ref({});

const useRecord = ref<any>();

const gettinfo = (type2) => {
  if (type.value != 3) {
      switch (type2) {
        case "0":
          return "充值方式：充值";
        case "1":
          return "充值方式：政充";
        case "2":
          return "充值方式：平充";
        case "3":
          return "充值方式：购物消费";
        case "4":
          return "充值方式：活动充值";
        default:
          return "充值方式：未知类型";
      }
    } else {
      return "消费方式：预付交易";
    }
};

const goBack = () => {
  uni.navigateBack();
};

const postApplyShouHou = (rec_id, type, reason) => {
  ApplyShouHou({
      userId: storage.getUserId(),
      order_id: rec_id,
      type: type,
      reason: reason
    }).then(res => {
      list.value = res.result;
      console.log(useRecord.value);
    });
};

onLoad((e) => {
  type.value = e.type;
    recid.value = e.id;
    console.log(type.value);
    UserShouHouDetail({
      apply_id: recid.value,
      userId: storage.getUserId()
    }).then(res => {
      detail.value = res.result;
      console.log(res);
    });
});
</script>

<style></style>
