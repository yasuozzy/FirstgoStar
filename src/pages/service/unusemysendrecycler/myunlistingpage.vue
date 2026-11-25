<template>
  <view style="background-color: #fff">
    <u-navbar title="已下架" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
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
              <view style="color: #333"> {{ item.recycleTitle }} </view>
              <view style="color: #333">¥{{ item.recyclePrice }} </view>
            </view>
          </view>
          <u-line style="margin: 5px 0"></u-line>
          <view style="display: flex; flex-direction: row; justify-content: space-between;">
            <view v-if="item.state === 3">
              <view style="color: #333">公益回收结束,获得{{ item.recycleIntegral }}回收积分</view>
            </view>
            <view v-if="item.state === 4">
              <!-- <view style="color: #333">已售完</view> -->
              <view style="color: #333; white-space: nowrap;">已售完</view>
            </view>

            <view style="
              display: flex;
              width: 100%;
              flex-direction: row;
              justify-content: flex-end;
              margin-bottom: 5px;
            ">
              <view v-if="item.state === 0 || item.state === 1" style="
                border-radius: 8px;
                justify-content: flex-end;
                color: #2a9598;
                border: solid 1px #2a9598;
                padding: 2px 15px;
                text-align: right;
                font-size: 12px;
                margin-right: 10px;
              " @click.stop="DeleteRecycle(item.id)">删除</view>
              <view v-if="item.state === 0 || item.state === 1" style="
                border-radius: 8px;
                justify-content: flex-end;
                color: #2a9598;
                border: solid 1px #2a9598;
                padding: 2px 15px;
                text-align: right;
                margin-right: 10px;
                font-size: 12px;
              " @click.stop="editp(item.id)">编辑</view>
              <view v-if="item.state === 0 || item.state === 1" style="
                border-radius: 8px;
                justify-content: flex-end;
                color: #2a9598;
                border: solid 1px #2a9598;
                padding: 2px 15px;
                text-align: right;
                margin-right: 10px;
                font-size: 12px;
              " @click.stop="UpperRecycle(item.id)">上架</view>
              <view v-if="item.state === 2 && item.benefitreState !== 2" style="
                border-radius: 8px;
                justify-content: flex-end;
                color: #2a9598;
                border: solid 1px #2a9598;
                padding: 2px 15px;
                text-align: right;
                margin-right: 10px;
                font-size: 12px;
              " @click.stop="agree(item)">同意</view>
              <view v-if="item.state === 2 && item.benefitreState !== 2" style="
                border-radius: 8px;
                justify-content: flex-end;
                color: #2a9598;
                border: solid 1px #2a9598;
                padding: 2px 15px;
                text-align: right;
                margin-right: 10px;
                font-size: 12px;
              " @click.stop="refuse(item)">拒绝</view>
            </view>
          </view>
          <u-gap height="10" bg-color="#f5f5f5"></u-gap>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {
  recycleacceptOrRefuse,
  recycleDelete,
  recycleUp,
  recycleUpDownList,
} from "@/api/service";
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
    state: "0",
  };
  recycleUpDownList(data).then((res) => {
    console.log(res);
    loaddata.value = res.result;
    refreshing.value = false;
  }).catch(() => {
    refreshing.value = false;
  });
};

const UpperRecycle = (id: any) => {
  const data = {
    recycleId: id,
  };
  recycleUp(data).then((res) => {
    console.log(res);
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

const editp = (id: any) => {
  uni.navigateTo({
    url: "/pages/service/unused/sendrecyclerpage?id=" + id,
  });
};

const DeleteRecycle = (id: any) => {
  const data = {
    recycleId: id,
  };
  recycleDelete(data).then((res) => {
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

const agree = (item: any) => {
  const data = {
    recycleId: item.benefitrecycleEntity.recycleId,
    id: item.benefitrecycleEntity.id,
    userId: storage.getUserId(),
    isConsent: 2,
  };
  recycleacceptOrRefuse(data).then((res) => {
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

const refuse = (item: any) => {
  const data = {
    recycleId: item.benefitrecycleEntity.recycleId,
    id: item.benefitrecycleEntity.id,
    userId: storage.getUserId(),
    isConsent: 3,
  };
  recycleacceptOrRefuse(data).then((res) => {
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

const recycleacceptOrRefuseMethod = (id: any) => {
  /* 
    map.put("recycleId", resultBean.benefitrecycleEntity.recycleId);
    map.put("id", resultBean.benefitrecycleEntity.id);
    map.put("userId", App.getUid());
    map.put("isConsent", s);
  */

  const data = {
    recycleId: id,
  };
  recycleDelete(data).then((res) => {
    console.log(res);
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss"></style>
