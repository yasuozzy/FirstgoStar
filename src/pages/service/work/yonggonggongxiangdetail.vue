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
                <view style="margin-left: 12px;margin-right: 25px;">用工单位</view>
                <view> {{ detail.company }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">用工地点</view>
                <view> {{ detail.work_location }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">用工工种</view>
                <view> {{ detail.work_type }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">所需人数</view>
                <view> {{ detail.work_num }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">所需时间</view>
                <view> {{ detail.work_time }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">薪资情况</view>
                <view> {{ detail.salary }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">联系人</view>
                <view> {{ detail.name }}</view>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view style="margin-left: 12px;margin-right: 25px;">联系电话</view>
                <view> {{ detail.mobile }}</view>
            </view>
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>
            <view style="display: flex;flex-direction: row;padding-top: 10px;padding-bottom: 10px;">
                <view
                    style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
                </view>
                <view> 岗位要求</view>
            </view>
            <view style="border: 1px solid #d9d9d9; margin: 10px;height: 80px;">{{ detail.work_request }}</view>
        </view>
        <view
            style="margin-left: 30px;margin-right: 30px; background-color: #2a9598; color: #fff; padding: 10px; border-radius: 5px; text-align: center;"
            @click="handleLogin"> 洽 谈</view>
    </view>
</template>

<script setup lang="ts">
import { getYongGongGongXiangDetail } from "@/api/work.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const id = ref('');

const detail = ref({});

const getdetail = (id) => {
  getYongGongGongXiangDetail({
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
	    url: `/pages/scenes/chat/chat/index?show=true&type=4&conversationID=${encodeURIComponent(conversationID)}`
	});
  // uni.navigateTo({
  //     url: '/pages/service/work/ChatAgreement4'
  //   });
};

onLoad((options) => {
  id.value = options.jobId;
    getdetail(id.value);
});
</script>

<style></style>