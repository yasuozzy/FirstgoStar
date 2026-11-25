<template>
  <view>
    <u-navbar
      title="消费明细"
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
      <text style="color: #333; width: 20%; text-align: center">详情</text>
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 20%; text-align: center">申请售后</text>
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
        style="color: red; width: 20%; text-align: center; font-size: 13px"
        >{{ item.amount }}</text
      >
      <text
        style="color: #333; width: 20%; text-align: center; font-size: 13px"
        >{{ getTextByType(item.type) }}</text
      >
      <text
        @click="toUseDetail(item.rec_id)"
        style="color: #007aff; width: 20%; text-align: center; font-size: 13px"
        >查看详情</text
      >
      <text
        v-if="item.is_apply == 0"
        @click="getUseDetail(item.rec_id)"
        style="color: #007aff; width: 20%; text-align: center; font-size: 13px"
        >申请</text
      >
      <text
        v-else
        style="color: #007aff; width: 20%; text-align: center; font-size: 13px"
      ></text>
    </view>
    <u-popup
      :show="show"
      @close="close"
      @open="open"
      mode="center"
      :round="10"
      :closeOnClickOverlay="false"
    >
      <scroll-view scroll-y="true" style="max-height: 70vh; overflow-y: auto">
        <view style="width: 40vh">
          <view
            style="
              padding: 5px 10px;
              text-align: center;
              font-size: 14px;
              color: #333;
            "
          >
            售后申请
          </view>
          <view style="padding: 5px 10px; font-size: 13px; color: #666">
            日期：{{ detail.create_time }}
          </view>
          <view style="padding: 5px 10px; font-size: 13px; color: #666">
            消费金额：{{ detail.amount }}
          </view>
          <view style="padding: 5px 10px; font-size: 13px; color: #666">
            消费方式：预付交易
          </view>
          <view
            style="
              display: flex;
              margin: 20px 0px;
              flex-direction: row;
              align-items: center;
            "
          >
            <view style="margin-left: 15px">店铺</view>
            <image
              :src="detail.cover_img"
              mode=""
              style="width: 40px; height: 40px"
            ></image>
            <view style="margin-left: 15px">{{ detail.shop_name }}</view>
          </view>
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
          <view
            style="
              display: flex;
              flex-direction: row;
              padding: 5px 10px;
              font-size: 14px;
              color: #333;
            "
          >
            申请事由:
            <view
              @click="showpicker = true"
              style="width: 150px; height: 20px; border: 1px solid #666"
              >{{ shouhoutype }}</view
            >
          </view>
          <view style="padding: 5px 10px; font-size: 14px; color: #333">
            退款事由:
          </view>
          <u-textarea
            style="border: 1px solid #e4e7ed; margin: 0px 10px; font-size: 14px"
            v-model="value1"
            placeholder="请输入内容"
            border="surround"
          ></u-textarea>

          <view
            style="
              padding: 5px 10px;
              font-size: 13px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            联系商家
            <u-icon
              @click="callphone"
              name="phone-fill"
              color="#2a9598"
            ></u-icon>
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
              padding-bottom: 20px;
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
      </scroll-view>
    </u-popup>
    <u-picker
      :show="showpicker"
      @confirm="confirm"
      :columns="columns"
    ></u-picker>
  </view>
</template>

<script setup lang="ts">
import { prePayUseList, ApplyShouHou, getPrePayUseDetail } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { getFormattedDate } from "@/utils/common.ts";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const list = ref([1, 2, 3, 4, 5, 6]);

const detail = ref({});

const show = ref(false);

const showpicker = ref(false);

const columns = ref([["退款退货", "退货", "维修"]]);

const currenttime = ref("");

const shouhoutype = ref("");

const value1 = ref("");

const shouhoutypeindex = ref("");

const getUseList = () => {
  prePayUseList({
      userId: storage.getUserId(),
      size: 20,
      page: 1,
      type: 1
    }).then(res => {
      list.value = res.result;
      console.log(list.value);
    });
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

const getUseDetail = (rec_id) => {
  getPrePayUseDetail({
      userId: storage.getUserId(),
      rec_id: rec_id
    }).then(res => {
      console.log(res);
      showapplyShouHou();
      detail.value = res.result;
    });
};

const postApplyShouHou = (rec_id) => {
  ApplyShouHou({
      userId: storage.getUserId(),
      order_id: rec_id,
      type: shouhoutypeindex.value,
      reason: value1.value
    }).then(res => {
      console.log(res);
      show.value = false;
      getUseList();
    });
};

const goBack = () => {
  uni.navigateBack();
};

const toUseDetail = (recid) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayUseDetailPage?type=2&id=" + recid
    });
};

const showapplyShouHou = () => {
  show.value = true;
};

const open = () => {
  // console.log('open');
};

const close = () => {
  show.value = false;
    // console.log('close');
};

const confirm = (e) => {
  console.log("confirm", e);
    shouhoutype.value = e.value[0];
    shouhoutypeindex.value = e.indexs[0] + 1;
    showpicker.value = false;
};

const callphone = () => {
  uni.makePhoneCall({
      phoneNumber: detail.value.shopMobile,
      success: () => {
        console.log("成功拨打客服电话");
      },
      fail: err => {
        console.error("拨打失败", err);
        uni.showToast({
          title: "拨打失败，请稍后重试",
          icon: "none"
        });
      }
    });
};

const commit = () => {
  postApplyShouHou(detail.value.order_id);
};

onMounted(() => {
  currenttime.value = getFormattedDate();
    getUseList();
});
</script>

<style></style>
