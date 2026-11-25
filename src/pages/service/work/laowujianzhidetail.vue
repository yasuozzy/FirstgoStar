<template>
    <view>
        <u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
        <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        <view style="font-size: 14px;">
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px; ">
                <view style="margin-left: 12px;margin-right: 25px;">姓名</view>
                <view> {{ detail.name }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">性别</view>
                <view> {{ detail.sex }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">联系电话</view>
                <view> {{ detail.mobile }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">家庭住址</view>
                <view> {{ detail.address }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">详细地址</view>
                <view> {{ detail.region_address }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">选择工种</view>
                <view> {{ detail.work }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">期待薪资</view>
                <view> {{ detail.salary }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">期待工作地</view>
                <view> {{ detail.place }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">工作时段</view>
                <view> {{ detail.work_time }}</view>
            </view>
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>

        </view>
        <view
            style="margin-left: 30px;margin-right: 30px; background-color: #2a9598; color: #fff; padding: 10px; border-radius: 5px; text-align: center;"
            @click="handleLogin"> 洽 谈</view>
    </view>
</template>

<script setup lang="ts">
import { getLaoWuJianZhiDetail } from "@/api/work.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const id = ref('');

const detail = ref({});

const getdetail = (id) => {
  getLaoWuJianZhiDetail({
      id: id
    }).then(res => {
      console.log(res);
      detail.value = res.result;
    });
};

const goBack = () => {
  uni.navigateBack();
};

const handleLogin = () => {
	const targetUserId = detail.value.user_id;
	if (!targetUserId) {
	    uni.showToast({
	        title: '无法获取用工方用户ID',
	        icon: 'none'
	    });
	    return;
	}
	const conversationID = `c2c_${targetUserId}`;
	uni.navigateTo({
	    url: `/pages/scenes/chat/chat/index?show=true&type=3&conversationID=${encodeURIComponent(conversationID)}`
	});
  // uni.navigateTo({
  //     url: '/pages/service/work/ChatAgreement3'
  //   });
};

onLoad((options) => {
  id.value = options.jobId;
    getdetail(id.value);
});
</script>

<style></style>