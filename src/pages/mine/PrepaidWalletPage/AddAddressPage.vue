<template>
  <view>
    <u-navbar
      title="新建收货信息"
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
      <!-- <view slot="right" @click="deleteAdd">
        <u-icon name="trash" size="20" color="#fff"></u-icon>
      </view> -->
    </u-navbar>
    <view
      style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      "
    >
      收货人员
      <input
        style="margin-left: 10px"
        v-model="name"
        placeholder="请输入收货人姓名"
        placeholder-style="color: #999"
      />
    </view>
    <view
      style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      "
    >
      手机号码
      <input
        v-model="phone"
        style="margin-left: 10px"
        placeholder="请输入手机号"
        placeholder-style="color: #999"
      />
    </view>
    <view style="padding: 10px 10px; display: flex; flex-direction: row">
      详细地址
      <input
        v-model="address"
        style="margin-left: 10px"
        placeholder="请输入详细地址"
        placeholder-style="color: #999"
      />
    </view>
    <u-gap bgColor="#f5f5f5" height="10"></u-gap>
    <view
      style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      "
    >
      详细地址
      <u-switch v-model="value" @change="change"></u-switch>
    </view>
    <u-gap bgColor="#f5f5f5" height="10"></u-gap>
    <view
      @click="addAddress"
      style="
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        background-color: #2a9598;
        color: white;
        text-align: center;
        width: 80%;
        margin-top: 100px;
        border-radius: 5px;
        margin-left: 10%;
      "
    >
      保存
    </view>
  </view>
</template>

<script setup lang="ts">
import { preAddAddress } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { eventBus } from "@/utiles/eventBus.js";

import { ref } from "vue";

const bgColor = ref("#0080ff");

const value = ref(true);

const name = ref("");

const phone = ref("");

const address = ref("");

const goBack = () => {
  uni.navigateBack();
};

const change = (e) => {
  console.log("change", e);
    value.value = e;
};

const deleteAdd = () => {
  uni.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: function (res) {
        if (res.confirm) {
          uni.showToast({
            title: "删除成功",
            icon: "success"
          });
        }
      }
    });
};

const addAddress = () => {
  let data = {
      acceptName: name.value,
      mobile: phone.value,
      address: address.value,
      isDefault: value.value,
      userId: storage.getUserId()
    };
    console.log(data);
    preAddAddress(data).then(res => {
      if (res.success && res.resultCode == 200) {
        console.log(res);
        eventBus.$emit("addaddress", Addaddress);
        uni.showToast({
          title: "添加成功",
          icon: "success"
        });
        uni.navigateBack();
      } else {
        uni.showToast({
          title: res.message,
          icon: "success"
        });
      }
    });
};
</script>

<style></style>
