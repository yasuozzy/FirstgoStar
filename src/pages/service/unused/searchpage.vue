<template>
  <view class="all">
    <view></view>
    <view class="search">
      <u-icon style="margin-top: 5px;" @click="goBack" name="arrow-left" size="20" color="#fff"></u-icon>
      <input class="weui-input" style="
          border: 2rpx solid #2a9595;
          border-radius: 8rpx;
          margin-left: 15rpx;
          margin-right: 15rpx;
          margin-top: 25rpx;
          padding-left: 10rpx;
          padding-right: 10rpx;
        " auto-focus placeholder="搜索店铺" v-model="searchinfo" />
      <view style="margin-top: 10px;" @click="tosearch">搜索</view>
    </view>
    <view style="margin-left: 15px;margin-top: 10px;">大家都在搜</view>
    <view class="u-demo-block__content">
      <view class="u-page__tag-item" v-for="(item, index) in radios" :key="index">
        <u-tag :text="item" :plain="!item.checked" type="warning" :name="index" @click="radioClick(item)">
        </u-tag>
      </view>
    </view>
    <view style="display: flex; flex-direction: row; justify-content: space-between;margin-left: 15px;margin-right: 15px;">
      <view>历史</view><u-icon name="trash" color="#999" size="28"></u-icon>
    </view>
    <view class="u-demo-block__content">
      <view class="u-page__tag-item" v-for="(item, index) in radios1" :key="index">
        <u-tag :text="item" :plain="!item.checked" type="warning" :name="index" @click="radioClick(item)">
        </u-tag>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getSearchWord } from "@/api/service";

import { storage } from "@/utils/auth";

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const radios = ref([]);

const radios1 = ref([]);

const searchinfo = ref("");

const type = ref("");

const init = (type) => {
  let data1 = {
      searchType: type
    };
    getSearchWord(data1).then(res => {
      console.log(res);
      radios.value = res.result;
    });
};

const goBack = () => {
  uni.navigateBack();
};

const radioClick = (item) => {
  console.log(item);
    uni.navigateTo({
      url: "/pages/service/unused/searchresultpage?searchinfo=" + item + "&type=" + type.value
    });
};

const tosearch = () => {
  if (searchinfo.value == "") {
      uni.showToast({
        title: "请输入搜索内容",
        icon: "none"
      });
      return;
    }
    uni.navigateTo({
      url: "/pages/service/unused/searchresultpage?searchinfo=" + searchinfo.value + "&type=" + type.value
    });
};

onMounted(() => {

});

onLoad((option) => {
  type.value = option.type;
    init(option.type);
});
</script>

<style>
.all {
  display: flex;
  flex-direction: column;
}

.search {
  background-color: #2a9598;
  display: flex;
  flex-direction: row;
  padding-top: 25px;
  padding-bottom: 10px;
}

.car {
  width: 40rpx;
  height: 40rpx;
  margin-top: 18rpx;
  margin-right: 15rpx;
}

.search .weui-input {
  width: 75%;
  background-color: white;
}

.u-demo-block__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 15px;margin-top: 10px;
}

.u-page__tag-item {
  margin-right: 20px;
}
</style>
