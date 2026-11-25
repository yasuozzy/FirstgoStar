<template>
  <view>
    <u-navbar
      title="闲置"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
      style="z-index: 9001"
    >
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
      <template #right>
        <view style="display: flex; flex-direction: row">
          <u-icon
            name="search"
            size="20"
            color="#fff"
            @click="search"
            style="margin-right: 15px"
          ></u-icon>

          <view class="situation_date">
            <rudon-rowMenuDotDotDot
              :localdata="options"
              @change="menuAction($event, '10086')"
              style="z-index: 9001"
            >
              <u-icon name="plus" size="20" color="#fff"></u-icon>
            </rudon-rowMenuDotDotDot>
          </view>
        </view>
      </template>
    </u-navbar>
    <view>
      <u-tabs
        style="position: fixed; top: 64px; height: 40px; width: 100%"
        :list="tabList"
        :current="currentTab"
        @click="clickTab"
        :scrollable="true"
        active-color="#007aff"
        inactive-color="#f00"
      ></u-tabs>
    </view>
    <swiper
      style="margin-top: 40px"
      :current="currentTab"
      @change="onSwiperChange"
      :style="{ height: swiperHeight + 'px' }"
    >
      <swiper-item v-for="(item, index) in ids" :key="index">
        <recyclerfrag
          :message="item.id"
          :postid="item.id"
          @message="receiveMessage"
        ></recyclerfrag>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { getRecyclerExchangeTab } from "@/api/service";

import { storage } from "@/utils/auth";

import recyclerfrag from "./recyclerfragpage.vue";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const parentData = ref("Hello from Parent");

const id = ref("11111111");

const message = ref("");

const tabList = ref([]);

const ids = ref([]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const value = ref(1);

const options = ref([
        { value: "recycler", text: "发布回收" },
        { value: "exchange", text: "发布置换" },
      ]);

const tablist = ref<any>();

const clickTab = (item) => {
  console.log("item", item);
    currentTab.value = item.index;
};

const init = () => {
  let data1 = {};
    getRecyclerExchangeTab(data1).then(res => {
      console.log(res);
      tabList.value = res.result.map(item => ({
        name: item.idle_item_type_name
      }));
      ids.value = res.result.map(item => ({
        id: item.id
      }));
      console.log(tablist.value);
      console.log(ids.value);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const search = () => {
  uni.navigateTo({
      url: "/pages/service/unused/searchpage?type=2"
    });
};

const add = () => {

};

const menuAction = (action, rowId) => {
  if (action === "") {
      return;
    }
    if (action === "recycler") {
      uni.navigateTo({
        url: "/pages/service/unused/sendrecyclerpage"
      });
    } else if (action === "exchange") {
      uni.navigateTo({
        url: "/pages/service/unused/sendexchangepage"
      });
    }
};

const receiveMessage = (message) => {
  console.log("Received message:", message);
    parentData.value = message;
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.situation_date {
  position: relative;
  z-index: 10001;
}

.situation_date ::v-deep .uni-select__selector {
  z-index: 10002 !important;
  min-width: 120px;
  right: -8px;
}

.situation_date ::v-deep .uni-select__selector-item text {
  display: block;
  opacity: 1 !important;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
