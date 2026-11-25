<template>
  <view style="background-color: #f3f3f3">
    <u-navbar title="我联系的" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <scroll-view scroll-y refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh"
      style="height: calc(100vh - 44px);">
      <view v-for="(item, index) in loaddata" :key="index">
        <view style="
          display: flex;
          flex-direction: column;
          background-color: white;
          border-radius: 10px;
          margin: 5px 13px;
        ">
          <view style="display: flex; flex-direction: row; padding: 10px 0">
            <view style="color: #333; margin-right: 15px">
              {{ item.sponsorName }} </view>
            <view style="color: #333"> {{ item.sponsorPhone }} </view>
          </view>
          <u-line style="margin: 5px 0"></u-line>
          <view style="display: flex; flex-direction: row">
            <image style="
              width: 60px;
              height: 60px;
              background-color: bisque;
              margin: 10px;
            " @error="handleImageError(index)" :src="item.imgError ? '/static/service/placeholder.png' : item.img">
            </image>
            <view style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 10px 0;
            ">
              <view style="color: #333"> {{ item.title }} </view>
              <view style="color: #333"> </view>
            </view>
          </view>
          <u-line style="margin: 5px 0"></u-line>
          <view style="
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-bottom: 5px;
          ">
            <view style="
              border-radius: 8px;
              justify-content: flex-end;
              color: #2a9598;
              border: solid 1px #2a9598;
              padding: 2px 15px;
              text-align: right;
              margin-right: 10px;
              font-size: 12px;
            " @click="callPhone(item.sponsorPhone)">拨打电话</view>
          </view>
          <u-gap height="10" bg-color="#f5f5f5"></u-gap>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script setup lang="ts">
import { getRecyclerMyConnect } from "@/api/service";
import { storage } from "@/utils/storage";
import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");
const loaddata = ref<any[]>([]);
const refreshing = ref(false);

const goBack = () => {
  uni.navigateBack();
};

const onRefresh = () => {
  refreshing.value = true;
  init();
};

const init = () => {
  const data = {
    userId: storage.getUserId(),
    page: 1,
    size: 50,
  };
  getRecyclerMyConnect(data).then((res) => {
    console.log(res);
    loaddata.value = res.result.map((item: any) => ({
      ...item,
      imgError: false

    }));
    refreshing.value = false;
  }).catch((err) => {
    refreshing.value = false;

  });
};

const handleImageError = (index: number) => {
  const target = loaddata.value[index];
  if (target) {
    target.imgError = true;
  }
};

const callPhone = (phoneNumber: string) => {
  if (!phoneNumber) {
    uni.showToast({
      title: "电话号码不能为空",
      icon: "none",
    });
    return;
  }

  uni.makePhoneCall({
    phoneNumber: phoneNumber,
    success: () => {
      console.log("拨打电话成功");
    },
    fail: () => {
      console.log("拨打电话失败");
      uni.showToast({
        title: "拨打电话失败",
        icon: "none",
      });
    },
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss"></style>
