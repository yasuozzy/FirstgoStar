<template>
  <view>
    <u-navbar
      title="明细"
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
    <view style="padding: 10px; background-color: #fff">
      <view>日期：{{ detail.create_time }}</view>
      <view>充值金额：{{ detail.amount }}</view>
      <view>
        <text v-if="this.type == 2" style="color: #007aff"
          >消费方式:预付交易</text
        >
        <text v-else style="color: #007aff">{{
          gettinfo(detail.recharge_way)
        }}</text></view
      >
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view>
      <view v-if="this.type == 2">
        <view style="margin-left: 15px">用途</view>
        <view
          style="
            display: flex;
            margin: 20px 0px;
            flex-direction: row;
            align-items: center;
          "
        >
          <view style="margin-left: 15px; margin-right: 40px">店铺</view>
          <image
            :src="detail.cover_img"
            mode=""
            style="width: 40px; height: 40px"
          ></image>
          <view style="margin-left: 15px">{{ detail.shop_name }}</view>
        </view>
        <u-line color="#999"></u-line>
      </view>
      <view v-else>
        <template v-if="detail.shopList && detail.shopList.length > 0">
          <view style="margin-left: 15px">用途</view>
          <view
            style="
              display: flex;
              margin: 20px 0px;
              flex-direction: row;
              align-items: center;
            "
          >
            <view style="margin-left: 15px; margin-right: 40px">店铺</view>
            <image
              :src="detail.shopList[0].cover_img"
              mode=""
              style="width: 40px; height: 40px"
            ></image>
            <view style="margin-left: 15px">{{ detail.shop_name }}</view>
          </view>
          <u-line color="#999"></u-line>
        </template>
      </view>

      <template v-if="detail.goodsList && detail.goodsList.length > 0">
        <view style="display: flex; margin: 20px 0px; flex-direction: row">
          <view style="margin-left: 15px; margin-right: 40px">商品</view>
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
      </template>
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
          日期：{{ detail.create_time }}
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
          所属店铺：{{ detail.shop_name }}
        </view>
        <view style="padding: 5px 10px; font-size: 13px; color: #28a3c5">
          当前余额：100元
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
          收款账号：{{ detail.user_account }}
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
import { getRechargeDetail, getPrePayUseDetail, ApplyShouHou } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bagColor = ref("#007AFF");

const list = ref([1, 2, 3]);

const type = ref(1);

const recid = ref("");

const detail = ref({});

const show = ref(false);

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

const open = () => {
  // console.log('open');
};

const close = () => {
  show.value = false;
    // console.log('close');
};

onLoad((e) => {
  type.value = e.type;
    recid.value = e.id;
    console.log(type.value);
    if (type.value == 2) {
      getPrePayUseDetail({
        rec_id: recid.value,
        userId: storage.getUserId()
      }).then(res => {
        detail.value = res.result;
        console.log(res);
      });
    } else {
      getRechargeDetail({
        rec_id: recid.value,
        userId: storage.getUserId()
      }).then(res => {
        detail.value = res.result;
        console.log(res);
      });
    }
});
</script>

<style></style>
