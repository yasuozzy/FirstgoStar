<template>
  <view>
    <u-navbar
      title="去消费"
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
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view
      style="
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      "
      v-for="(item, index) in evenSortItems"
      :key="index"
    >
      <image
        :src="item.cover_img"
        style="width: 100px; height: 65px"
        mode="aspectFill"
      ></image>
      <view
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 10px;
        "
      >
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <view style="font-size: 15px">{{ item.shop_name }} </view>
          <view style="font-size: 15px;color: #2a9598;">余额{{ item.amount }} </view>
        </view>
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <view style="font-size: 15px;color: #2a9598;">{{ item.shop_class_name }} </view>
          <view class="table_btn" @click="shopHome(item)">去消费 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { preShopList } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const evenSortItems = ref([]);

const getShopList = () => {
  preShopList({
      userId: storage.getUserId(),
      page: "1",
      size: "30"
    }).then(res => {
      evenSortItems.value = res.result;
      console.log(evenSortItems.value);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const shopHome = (item) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prePayShopHomePage?shopid=" + item.shop_id + "&amount=" + item.amount + "&name=" + item.shop_name + "&pcode=" + item.providerCode
    });
};

onMounted(() => {
  getShopList();
});
</script>

<style scoped lang="scss">
$uni-color-tabbar-g: #2a9598 !default;

.table_btn {
  background-color: $uni-color-tabbar-g;
  color: #fff;
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 5px;
}
</style>
