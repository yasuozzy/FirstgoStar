<template>
    <view>
        <u-navbar title="技能培训" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
        <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        <view style="font-size: 14px;">
            <view style="display: flex;flex-direction: row;padding-top: 5px;padding-bottom: 5px; ">
                <view style="margin-left: 12px;margin-right: 25px;">姓名</view>
                <u-input placeholder="请输入内容" border="none" v-model="xingming" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">身份证号</view>
                 <u-input placeholder="请输入内容" border="none" v-model="shenfenzhenghao" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">联系电话</view>
                 <u-input placeholder="请输入内容" border="none" v-model="lianxidianhua" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">家庭住址</view>
                 <u-input placeholder="请输入内容" border="none" v-model="jiatingzhuzhi" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">培训类型</view>
                 <u-input placeholder="请输入内容" border="none" v-model="peixunleixing" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">培训对象类型</view>
                 <u-input placeholder="请输入内容" border="none" v-model="peixunduixiangleixing" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">培训地点</view>
                 <u-input placeholder="请输入内容" border="none" v-model="peixundidian" ></u-input>
            </view>
            <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">培训时间</view>
                 <u-input placeholder="请输入内容" border="none" v-model="peixunshijian" ></u-input>
            </view>
             <u-line color="#d9d9d9" height="1"></u-line>
            <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
                <view style="margin-left: 12px;margin-right: 25px;">培训人数</view>
                 <u-input placeholder="请输入内容" border="none" v-model="peixunrenshu" ></u-input>
            </view>
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        </view>
        <view
            style="margin-left: 30px;margin-right: 30px;margin-top: 30px; background-color: #2a9598; color: #fff; padding: 10px; border-radius: 5px; text-align: center;"
            @click="handleLogin"> 提交</view>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bgColor = ref('#007AFF');

const goBack = () => {
  uni.navigateBack();
};

const handleLogin = () => {
  uni.navigateBack();
};
</script>

<style></style>