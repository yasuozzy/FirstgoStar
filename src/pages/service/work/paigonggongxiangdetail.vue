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
                <view style="margin-left: 12px;margin-right: 25px;">派工单位</view>
                <view> {{detail.company}}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">派工人数</view>
                <view> {{detail.send_num}}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">派工人员</view>
                <view> {{detail.send_names}}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px ;">
                <view style="margin-left: 12px;margin-right: 25px;">联系电话</view>
                <view> {{detail.mobile}}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">工种</view>
                <view> {{detail.work_type}}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">工作时段</view>
                <view> {{detail.work_time}}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">薪资情况</view>
                <view> {{detail.salary}}</view>
            </view>
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>

        </view>
        <view
            style="margin-left: 30px;margin-right: 30px; background-color: #2a9598; color: #fff; padding: 10px; border-radius: 5px; text-align: center;"
            @click="handleLogin"> 洽 谈</view>
    </view>
</template>

<script setup lang="ts">
import { getYongPaiGongXiangDetail } from "@/api/work.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const id = ref('');

const detail = ref({});

const getdetail = (id) => {
  getYongPaiGongXiangDetail({
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
	    url: `/pages/scenes/chat/chat/index?show=true&type=5&conversationID=${encodeURIComponent(conversationID)}`
	});
	
  // uni.navigateTo({
	 // url: '/pages/scenes/chat/chat/index?conversationID=${encodeURIComponent(conversationID)}'
  //     // url: '/pages/service/work/ChatAgreement5'
  //   });
};

onLoad((options) => {
  id.value = options.jobId;
    getdetail(id.value);
});
</script>

<style></style>