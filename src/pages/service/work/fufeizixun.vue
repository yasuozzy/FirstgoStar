<template>
    <view>
        <u-navbar title="咨询类型" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
        <view class="searchView">
            <view class="searchInView">
                <u-icon name="search" size="20" color="#999"></u-icon>
                <input class="search-input" v-model="searchValue" type="text" placeholder="搜索区域/工种/地点"
                    placeholder-class="placeholder-style" />
            </view>
        </view>
        <u-line height="1" bgColor="#E5E5E5"></u-line>

        <view v-for="(value, index) in asktype" :key="index">
            <view style="display: flex;flex-direction: row;padding: 5px 15px;justify-content: space-between;">
                <view>{{ value.name }}</view>
                <view @click="fufeizixun(value)"
                    style="background-color: #2a9598;color: white;border-radius: 4px;padding: 2px 5px;font-size: 13px;">
                    咨询</view>
            </view>
            <u-line height="1" bgColor="#E5E5E5"></u-line>
        </view>

    </view>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage';

import { dayjobProfessionList, payAskFee } from '@/api/work.ts';

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const asktype = ref([]);

const Officeid = ref("");

const id = ref('');

const lawyer_user_id = ref('');

const init = () => {
  dayjobProfessionList({
      office_id: Officeid.value,
      id: id.value
    }).then(res => {
      console.log(res);
      asktype.value = res.result;
    });
};

const fufeizixun = (value) => {
  payAskFee({
      userName: storage.getNickName(),
      mobile: storage.getPhone(),
      osName: "android",
      hostNo: storage.getHostNo(),
      profession: value.name,
      userId: storage.getUserId(),
      accept_user_id: lawyer_user_id.value,
      lawyerId: id.value
    }).then(res => {
      console.log(res);
      if (res.success) {
        const encodedUrl = encodeURIComponent(res.result.payUrl);
        uni.navigateTo({
          url: `/pages/mine/WebViewPage/WebPayPage?title=付款&url=${encodedUrl}`
        });
      }
    });
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e) => {
  Officeid.value = e.Officeid;
    id.value = e.id;
    lawyer_user_id.value = e.lawyer_user_id;
    init();
});
</script>

<style>
.searchView {
    width: 100%;
    padding: 2px 10px;
}

.searchInView {
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 93%;
    height: 35px;
    border: 1px solid #EAEBF0;
    background-color: #EAEBF0;
    border-radius: 15px;
    line-height: 40px;
    box-sizing: border-box;
    padding-top: 2px;
}

.searchInView image {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.searchInView input {
    text-align: left;
    width: 240px;
    margin-top: 2px;
}
</style>