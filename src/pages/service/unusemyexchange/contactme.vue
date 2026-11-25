<template>
  <view style="background-color: #fff">
    <u-navbar
      title="联系过我"
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
    </u-navbar>
    <view
      style="display: flex; flex-direction: column"
      v-for="(item, index) in loaddata"
      :key="index"
    >
      <view
        style="
          display: flex;
          flex-direction: row;
          padding-left: 15px;
          padding-right: 15px;
          margin: 5px 0;
        "
      >
        <image
          style="width: 30px; height: 30px; background-color: antiquewhite"
          :src="item.img"
        ></image>
        <view
          style="
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 1em;
            margin-left: 10px;
            max-height: 3em;
            font-size: 14px;
            margin-top: 8px;
          "
          >{{ item.title }}
        </view>
      </view>
      <view v-for="(childitem, childindex) in item.crowds" :key="childindex">
        <view
          style="
            gap: 20rpx;
            padding-left: 30px;
            padding-right: 10px;
            margin: 5px 0;
          "
        >
          <view style="display: flex; flex-direction: row; align-items: center">
            <image
              style="width: 40px; height: 40px; background-color: antiquewhite"
              :src="childitem.sponsorpicture"
            ></image>
            <view style="color: #333; margin-left: 10px">
              {{ childitem.receptionName }}
            </view>
            <view style="color: #333; margin-left: 10px">
              {{ childitem.sponsorPhone }}
            </view>
            <u-icon
              name="phone"
              color="#2a9598"
              style="margin-left: 10px"
              size="20"
              @click="callPhone(childitem.sponsorPhone)"
            ></u-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getConnectMe } from "@/api/service";
import { storage } from "@/utils/storage";
import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");
const loaddata = ref<any[]>([
  "https://uviewui.com/album/1.jpg",
  "https://uviewui.com/album/2.jpg",
  "https://uviewui.com/album/3.jpg",
  "https://uviewui.com/album/4.jpg",
  "https://uviewui.com/album/5.jpg",
  "https://uviewui.com/album/6.jpg",
  "https://uviewui.com/album/7.jpg",
  "https://uviewui.com/album/8.jpg",
  "https://uviewui.com/album/9.jpg",
  "https://uviewui.com/album/10.jpg",
  "https://uviewui.com/album/11.jpg",
  "https://uviewui.com/album/12.jpg",
  "https://uviewui.com/album/13.jpg",
  "https://uviewui.com/album/14.jpg",
  "https://uviewui.com/album/15.jpg",
  "https://uviewui.com/album/16.jpg",
  "https://uviewui.com/album/17.jpg",
  "https://uviewui.com/album/18.jpg",
  "https://uviewui.com/album/19.jpg",
]);

const goBack = () => {
  uni.navigateBack();
};

const init = () => {
  const data = {
    userId: storage.getUserId(),
    page: 1,
    size: 50,
  };
  getConnectMe(data).then((res) => {
    console.log(res);
    loaddata.value = res.result;
  });
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
