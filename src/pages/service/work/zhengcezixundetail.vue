<template>
    <view class="container">
        <!-- ============ 区域一 ============ -->
        <u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view >
                <view class="flex">
                    <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
                </view>
            </view>
</template>
            <template #right>
<view ></view>
</template>
        </u-navbar>
        <view style="margin: 15px;">
            <view style="align-items: center;font-size: 15px;color: black;width: 100%;">{{ detail.title }}</view>
            <view style="height: 50px;font-size: 12px;color: #666;"><text>{{ detail.sendmen }}</text><text
                    style="margin-left: 10px;">{{ detail.sendtime }}</text></view>
            <div class="webpage-container">
                <rich-text :nodes="detail.content"></rich-text>
            </div>
        </view>
    </view>
</template>

<script setup lang="ts">
import { dayjobPolicyDetail } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const mMessageId = ref('');

const detail = ref({});

const title = ref('');

const goBack = () => {
  uni.navigateBack();
};

const getdetail = () => {
  try {
      dayjobPolicyDetail({
        flowid: mMessageId.value
      }).then(res => {
        console.log(res);
        detail.value = res.result;
        title.value = res.result.title;
      });
    } catch (error) {
      console.error('Error fetching policy detail:', error);
    }
};

onLoad((options) => {
  mMessageId.value = options.mMessageId;
    console.log(mMessageId.value);
    getdetail();
});
</script>

<style lang="scss" scoped>
.container {
    height: 120%;

    background: #ffffff;

    .flex {
        display: flex;
    }

    .webpage-container {
        width: 100%;
        height: 100vh;

    }

    .web-frame {
        width: 100%;
        height: 100%;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
    }

    .iframe-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

}
</style>