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
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
      <template #right>
        <view @click="deleteAdd">
          <u-icon name="trash" size="20" color="#fff"></u-icon>
        </view>
      </template>
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
        v-model="username"
        style="margin-left: 10px"
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
    <view
      style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      "
    >
      详细地址
      <view style="flex: 1; margin-left: 20px">{{
        addressText
      }}</view>
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
      设为默认地址
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

    <u-popup
      :safeAreaInsetBottom="true"
      :safeAreaInsetTop="true"
      mode="bottom"
      :show="showModal"
      :round="10"
      :overlay="true"
      :closeable="true"
      :closeOnClickOverlay="true"
      :customStyle="{ height: '50vh' }"
      @close="close"
      @open="open"
    >
      <view style="height: 50vh; padding-bottom: 10px">
        <scroll-view class="scroll-content" scroll-y="true">
          <view
            style="
              height: 30px;
              line-height: 30px;
              font-size: 17px;
              padding-left: 30px;
            "
            v-for="(item, index) in items"
            :key="index"
            @click="getAddressInfo(item)"
            >{{ item.area }}</view
          >
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { scoreGetAddress, bussinesssaveAddress } from "@/api/service";

import { storage } from "@/utils/storage";

import eventBus from "@/utils/eventBus";

import { computed, ref } from "vue";

const bgColor = ref("#0080ff");

const showModal = ref(false);

const value = ref(true);

const pid = ref("");

const items = ref([]);

const username = ref("");

const phone = ref("");

const detailAddress = ref("");

const sheng = ref("");

const shengid = ref("");

const shi = ref("");

const shiid = ref("");

const qu = ref("");

const quid = ref("");

const zhen = ref("");

const zhenid = ref("");

const clicknums = ref(1);

const isdefault = ref(true);
const addressText = computed(() => {
	return `${storage.getManname()}${storage.getBldgname()}${storage.getHsenum()}`;
  // 如果没有选择任何地区，显示"选择"
    // if (!sheng.value) {
    //   return "选择";
    // }
    // console.log(shengid.value + "=" + shiid.value + "=" + quid.value + "=" + zhenid.value);
    // // 否则显示已选择的地区拼接
    // return `${sheng.value}${shi.value}${qu.value}${zhen.value}`;
});

const getAddressInfo = (item) => {
  if (!item) {
      clicknums.value = 1;
    } else {
      clicknums.value++;
    }
    console.log(clicknums.value);
    if (clicknums.value == 2) {
      sheng.value = item.area;
      shengid.value = item.areaid;
      console.log(item.area);
    } else if (clicknums.value == 3) {
      shi.value = item.area;
      shiid.value = item.areaid;
      console.log(item.area);
    } else if (clicknums.value == 4) {
      qu.value = item.area;
      quid.value = item.areaid;
      console.log(item.area);
    } else if (clicknums.value == 5) {
      zhen.value = item.area;
      zhenid.value = item.areaid;
      console.log(item.area);
    }
    scoreGetAddress({
      pId: item ? item.areaid : ""
    }).then(res => {
      if (res.success && res.resultCode == 200) {
        console.log(res);
        items.value = res.result;
        showModal.value = true;
      } else {
        showModal.value = false;
      }
    });
};

const addAddress = () => {
  if (username.value.length == 0 || phone.value.length == 0 || detailAddress.value.length == 0 || sheng.value.length == 0) {
      uni.showToast({
        title: "请输入完整信息",
        icon: none
      });
      return;
    }
    let param = {
      userId: storage.getUserId(),
      acceptName: username.value,
      mobile: phone.value,
      isDefault: isdefault.value
    };
    bussinesssaveAddress(param).then(res => {
      console.log(res);
      if (res.success && res.resultCode == 200) {
        eventBus.emit("addaddress", param);
        uni.navigateBack();
      } else {
        uni.showToast({
          title: res.message || "保存失败",
          icon: "none"
        });
      }
    }).catch(err => {
      console.error("保存地址失败:", err);
      uni.showToast({
        title: "保存失败",
        icon: "none"
      });
    });
};

const goBack = () => {
  uni.navigateBack();
};

const change = (e) => {
  console.log("change", e);
    isdefault.value = e;
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

const close = () => {
	showModal.value = false;
};

const open = () => {

};
</script>

<style>
.scroll-content {
  height: 100%; /* 填满modal-content的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}
</style>
