<template>
  <view>
    <u-navbar title="地址列表" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <scroll-view style="height: calc(100vh - 44px)" enable-back-to-top scroll-y refresher-enabled
      :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
         <view style="padding-bottom: 60px">
        <view style="border-bottom: 4px solid #e0e0e0; padding: 5px 10px" v-for="(item, index) in list" :key="index">
          <view @click="selectAddress(item)" style="cursor: pointer;">
            <view style="
              display: flex;
              font-size: 17px;
              flex-direction: row;
              justify-content: space-between;
            ">{{ item.acceptName }} {{ item.mobile }}</view>
            <view style="
              width: 100%;
              font-size: 14px;
              margin-top: 5px;
              margin-bottom: 5px;
              color: #666;
            ">
              {{ item.regionAddress }}
            </view>
          </view>
          <u-line color="#e0e0e0"></u-line>
          <view style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-top: 3px;
            padding-bottom: 3px;
          ">
            <view style="display: flex; color: #999; flex-direction: row; align-items: center;" @click.stop="checkstatus(item)">
              <image style="width: 25px; height: 25px; margin-right: 5px;" v-if="item.isDefault"
                src="../../../static/service/choose_selected.png"></image>
              <image v-else style="width: 25px; height: 25px; margin-right: 5px;" 
                src="../../../static/service/choose_default.png"></image>
              <text>设为默认</text>
            </view>

            <u-icon @click="deleteAddress(item.id)" name="trash" color="red" size="20"></u-icon>
          </view>
        </view>
      </view>
    </scroll-view>

    <view @click="addAddress" style="
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
      ">
      新建收货信息
    </view>
  </view>
</template>

<script setup lang="ts">
import { scoreDelAddress, scoreAddressList, editDefaultAddress } from "@/api/service";

import { storage } from "@/utils/storage";

import eventBus from "@/utils/eventBus";

import { onBeforeUnmount, onMounted, ref } from "vue";

const bgColor = ref("#0080ff");

const list = ref([]);

const refreshing = ref(false);

const handleUpdateData = (data) => {
  console.log("收到新增地址数据:", data);
    checkChangeInfo();
};

const checkChangeInfo = () => {
  scoreAddressList({
      userId: storage.getUserId()
    }).then(res => {
      if (res.success && res.resultCode == 200) {
        list.value = res.result;
        console.log(res);
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

const onRefresh = () => {
  refreshing.value = true;
    checkChangeInfo();
};

const goBack = () => {
  uni.navigateBack();
};

const selectAddress = (item) => {
  const pages = getCurrentPages();
    if (pages.length > 1) {
      const prevPage = pages[pages.length - 2]; // 获取上一页实例
      // 直接调用上一页的方法或修改数据
      if (prevPage.$vm) {
        // uni-app 中可能需要访问 $vm
        prevPage.$vm.handleUpdateData(item);
      } else if (prevPage.handleUpdateData) {
        prevPage.handleUpdateData(item);
      }
    }
    uni.navigateBack();
};

const addAddress = () => {
  uni.navigateTo({
      url: "/pages/service/unused/IntegralAddAddressPage"
    });
};

const editAdd = () => {
  // uni.navigateTo({
    //   url: "/pages/finance-mine/AddAddressPage/AddAddressPage",
    // });
};

const deleteAddress = (id) => {
  uni.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: res => {
        if (res.confirm) {
          scoreDelAddress({
            id: id
          }).then(res => {
            uni.showToast({
              title: "删除成功",
              icon: "success"
            });
            checkChangeInfo();
          });
        }
      }
    });
};

const checkstatus = (item) => {
  editDefaultAddress({
      id: item.id,
      userId: storage.getUserId(),
      isDefault: true
    }).then(res => {
      if (res.success && res.resultCode == 200) {
        checkChangeInfo();
        uni.showToast({
          title: "设置成功",
          icon: "success"
        });
      } else {
        uni.showToast({});
      }
    });
};

onMounted(() => {
  checkChangeInfo();
    eventBus.on("addaddress", handleUpdateData);
});

onBeforeUnmount(() => {
  eventBus.off("addaddress", handleUpdateData);
});
</script>

<style></style>
