<template>
  <view>
    <u-navbar
      title="选择店铺"
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
    <u-search
      style="margin: 10px 10px"
      v-model="searchValue"
      @custom="cusSearch"
    ></u-search>
    <view
      v-for="(item, index) in loaddata"
      :key="index"
      style="margin: 15px 15px; display: flex; justify-content: space-between"
      @click="selectShop(item)"
    >
      <view style="display: flex; flex-direction: row; align-items: center">
        <image
          style="height: 40px; width: 40px"
          :src="item.cover_img"
          mode=""
        ></image>
        <view style="margin-left: 10px">{{ item.shop_name }}</view>
      </view>
      <view style="display: flex; flex-direction: row; align-items: center">
        <u-icon name="map-fill" size="20" color="#007AFF"></u-icon>
        <view style="margin-left: 10px">{{ item.distance }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getRechargeShopList } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const loaddata = ref([]);

const searchValue = ref("");

const getlocation = () => {
  uni.getLocation({
      type: "gcj02",
      success: function (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 然后打开地图
        // uni.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 18, // 缩放比例，可选
        //   name: "我的位置", // 位置名，可选
        //   address: "这里是地址详情", // 地址的详细说明，可选
        // });

        let data = {
          index: "",
          longitude: "119.207081",
          latitude: "36.709459",
          page: 1,
          size: 50
        };
        getRechargeShopList(data).then(res => {
          loaddata.value = res.result;
          console.log(res);
        });
      }
    });
};

const goBack = () => {
  uni.navigateBack();
};

const cusSearch = () => {
  console.log("Searching for:", searchValue.value);
};

const selectShop = (e) => {
  console.log("Searching for:", e);
    // this.$emit('chargeShop', e);
    // uni.navigateBack();
    // const pages = getCurrentPages();
    // const prevPage = pages[pages.length - 2]; // 上一页实例

    // if (prevPage) {
    //   // 直接调用上一页的方法更新数据
    //   prevPage.$vm.updateData(e);
    // }
	uni.$emit("updateShop", e);

    uni.navigateBack({
      delta: 1
    });
};

onMounted(() => {
  getlocation();
});
</script>

<style></style>
