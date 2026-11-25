<template>
  <view>
    <u-navbar
      title="选择商品"
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
<view  @click="selectProduct">
        <view style="color: white">确定</view>
      </view>
</template>
    </u-navbar>
    <u-search
      style="margin: 10px 10px"
      v-model="searchValue"
      @custom="cusSearch"
    ></u-search>
    <view
      v-for="(item, index) in list"
      :key="index"
      style="margin: 15px 15px; display: flex; justify-content: space-between"
    >
      <view style="display: flex; flex-direction: row; align-items: center">
        <image
          v-if="!item.selected"
          @click="toggleSelect(index)"
          style="width: 20px; height: 20px"
          :src="choose_default"
        ></image>
        <image
          v-else
          @click="toggleSelect(index)"
          style="width: 20px; height: 20px"
          :src="choose_selected"
        ></image>
        <image
          style="height: 40px; width: 40px; margin-left: 10px"
          src="@/static/logo.png"
          mode=""
        ></image>
        <view style="margin-left: 10px">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getRechargeProductList } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const list = ref([]);

const searchValue = ref("");

const shopid = ref("");

const choose_default = ref('/static/login/choose_unselect.png');

const choose_selected = ref('/static/login/choose_select.png');

const getlist = () => {
  let data = {
      shop_id: shopid.value,
      index: "",
      page: 1,
      size: 50
    };
    getRechargeProductList(data).then(res => {
      console.log(res);
      const listWithSelected = res.result.map(item => ({
        ...item,
        selected: false
      }));
      list.value = listWithSelected;
    });
};

const goBack = () => {
  uni.navigateBack();
};

const cusSearch = () => {
  console.log("Searching for:", searchValue.value);
};

const selectProduct = () => {
  let selectlist = [];
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].selected) {
        selectlist.push(list.value[i]);
      }
    }
	console.log(selectlist)
	uni.$emit("getgood",selectlist);
    uni.navigateBack({
      delta: 1
    });
};

const toggleSelect = (index) => {
  console.log(index);
    console.log(list.value[index]);
    list.value[index].selected = !list.value[index].selected;
    // this.$set(this.list[index], "selected", !this.list[index].selected);
    console.log(list.value[index]);
};

onLoad((e) => {
  shopid.value = e.shopid;
    getlist();
});
</script>

<style></style>
