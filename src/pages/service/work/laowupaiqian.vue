<template>
    <view>
          <u-navbar title="劳务派遣" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar> 
         <view style="padding:10px 10px;" @click="todetail">
            <view style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                <text class="work-type"> 群苑劳务服务公司 </text>
                <text class="create-time"> 2021-11-22 </text>
            </view>

            <view
                style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <view class="salary-left">
                    <text class="salary-text"> 公司介绍：群苑劳务公司“一链办，快捷办”的服务。。。 </text>
                </view>
                <view style="color: white;background-color: red;border-radius: 5px;padding: 5px; font-size: 13px; max-lines: 1;white-space: nowrap"
                    @tap.stop="negotiateJob(item)">查看详情</view>
            </view>
            <u-line height="1" bgColor="#E5E5E5" style="margin-top: 5px;margin-bottom: 5px;"></u-line>
            <view style="display: flex; width: 100%;">
                <text style="margin-left: auto;"> 永春路 </text>
            </view>
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        </view> 
        


    </view>


</template>

<script setup lang="ts">
import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

const type = ref("1");

const bgColor = ref("#007AFF");

const loadData = () => {

};

const goBack = () => {
  uni.navigateBack();
};

const todetail = () => {
  uni.showToast({
      title: '正在更新中。。',
      icon: 'none'
    });
};

onMounted(() => {
  loadData();
});
</script>

<style></style>