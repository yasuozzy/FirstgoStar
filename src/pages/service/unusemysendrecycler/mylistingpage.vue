<template>
  <view style="background-color: #ffffff">
    <u-navbar title="已上架" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <scroll-view 
      scroll-y 
      refresher-enabled 
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      style="flex: 1; margin-top: 44px;"
    >
      <view v-for="(item, index) in loaddata" :key="index">
        <view style="
          display: flex;
          flex-direction: column;
          background-color: white;
          border-radius: 10px;
          margin: 5px 13px;
        ">
          <view style="display: flex; flex-direction: row">
            <image style="
              width: 60px;
              height: 60px;
              margin: 10px;
            " :src="item.imgs[0]"></image>
            <view style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 10px 0;
            ">
              <view style="color: #666"> {{ item.recycleTitle }} </view>
              <view style="color: red"> {{ item.recyclePrice }} </view>
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
            " @click="torecycleDown(item.id)">下架</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { recycleDown, recycleUpDownList } from "@/api/service";
import { storage } from "@/utils/storage";
import { onMounted, ref } from "vue";

const refreshing = ref(false);
const bgColor = ref("#007AFF");
const loaddata = ref<any[]>([]);

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
    state: "1",
  };
  recycleUpDownList(data).then((res) => {
    console.log(res);
    loaddata.value = res.result;
    refreshing.value = false;
  }).catch(() => {
    refreshing.value = false;
  });
};

const torecycleDown = (id: any) => {
  const data = {
    recycleId: id,
  };
  recycleDown(data).then((res) => {
    // console.log(res);
    //  this.init();
    if (res.success) {
      init();
      uni.showToast({
        title: "上架成功",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: res.message,
        icon: "none",
      });
    }
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss"></style>
