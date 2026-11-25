<template>
  <view>
    <u-navbar
      title="选择收货信息"
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
    <scroll-view
      style="height: calc(100vh - 44px)"
      enable-back-to-top
      scroll-y
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view style="padding-bottom: 60px" @click="selectAddress">
        <view
          style="
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #e0e0e0;
            padding: 8px 10px;
          "
          v-for="(item, index) in list"
          :key="index"
          @click="selectAddress(item)"
        >
          <view style="flex: 1">
            <view>{{ item.acceptName }} {{ item.mobile }}</view>
            <view> {{ item.address }}</view>
          </view>
          <u-icon
            @click.stop.prevent="editAdd(item)"
            name="trash"
            color="#f00"
            size="20"
          ></u-icon>
        </view>
      </view>
    </scroll-view>
    <view
      @click="addAddress"
      style="
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        background-color: #2a9598;
        color: white;
        text-align: center;
        position: fixed;
        width: 80%;
        bottom: 0;
        border-radius: 5px;
        margin-left: 10%;
      "
    >
      新建收货信息
    </view>
  </view>
</template>

<script setup lang="ts">
import { preGetAddress, preDelAddress } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { eventBus } from "@/utiles/eventBus.js";

import { onBeforeUnmount, onMounted, ref } from "vue";

const bgColor = ref("#0080ff");

const list = ref([]);

const refreshing = ref(false);

const goBack = () => {
  uni.navigateBack();
};

const handleUpdateData = (data) => {
  getaddress();
};

const selectAddress = (item) => {
  eventBus.$emit("preselectaddress", item);
    uni.navigateBack();
};

const onRefresh = () => {
  refreshing.value = true;
    getaddress();
};

const getaddress = () => {
  preGetAddress({
      userId: storage.getUserId()
    }).then(res => {
      if (res.success && res.resultCode == 200) {
        list.value = res.result;
        refreshing.value = false;
      } else {
        refreshing.value = false;
        uni.showToast({
          title: res.message,
          icon: "error"
        });
      }
    });
};

const addAddress = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/AddAddressPage"
    });
};

const editAdd = (item) => {
  uni.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: function (res) {
        if (res.confirm) {
          preDelAddress({
            id: item.id
          }).then(res => {
            getaddress();
          });
        }
      }
    });

    // uni.navigateTo({
    //   url: "/pages/finance-mine/AddAddressPage/AddAddressPage",
    // });
};

onMounted(() => {
  getaddress();
    eventBus.$on("addaddress", handleUpdateData);
});

onBeforeUnmount(() => {
  eventBus.$off("addaddress", handleUpdateData);
});
</script>

<style></style>
