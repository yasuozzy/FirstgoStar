<template>
    <view>
        <u-navbar title="法律援助" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view >
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
</template>
            <template #right>
<view ></view>
</template>
        </u-navbar>
        <view class="Order-list">
            <view class="order-item" v-for="(item, index) in ordersList" :key="index" @click="lawyerClickf(index)">
                <u-image :src="item.image" width="35px" height="35px"></u-image>
                <text style="font-size: 14px;">{{ item.text }}</text>
            </view>
        </view>
        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
            <view
                style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
            </view>
            <view> 法律援助</view>
        </view>
        <view class="Order-list">
            <view class="order-item" v-for="(item, index) in yuanzhuList" :key="index" @click="lawyerClicks(index)">
                <u-image :src="item.image" width="35px" height="35px"></u-image>
                <text style="font-size: 14px;">{{ item.text }}</text>
            </view>
        </view>
        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px; width: 100%;">
            <view @click="applypersonhelp"
                style="margin-left: 12px;margin-right: 5px; background-color: #2a9598;color: white;flex: 1; text-align: center;padding: 6px 0px;border-radius: 4px;">
                个人申请援助
            </view>
            <view @click="applycomhelp"
                style="margin-left: 12px;margin-right: 5px; background-color: #2a9598;color: white;flex: 1; text-align: center;padding: 6px 0px;border-radius: 4px;">
                企业委托服务
            </view>
        </view>
        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
            <view
                style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
            </view>
            <view> 推荐律师</view>
        </view>

        <view v-for="(value, index) in lawyerlist" :key="index"
            style="display: flex;flex-direction: column; padding-left: 10px;padding-right: 10px;">
            <view style="display: flex;flex-direction: row;margin-top: 5px;">
                <u-image :src="value.avatar" width="70px" height="120px" style="background-color: bisque;"></u-image>
                <view style="display: flex;flex-direction: column;justify-content: space-between;padding: 5px 10px;">
                    <view>律师姓名： {{ value.name }}</view>
                    <view>执业证号： {{ value.paper_card }}</view>
                    <view>业务专长： {{ value.specialty }}</view>
                </view>

            </view>
            <view
                style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 5px;margin-bottom: 5px;">
                <view style="display: flex;flex-direction: row;align-items: center;" @click="fufeizixun(value)">
                    <u-image src="/static/service/fufeizixun-image.png" width="20px" height="20px"
                        style="margin-right: 5px;margin-left: 5px;"></u-image> 付费咨询
                </view>
                <view style="display: flex;flex-direction: row;align-items: center;" @click="liuyan(value)"> <u-image
                        src="/static/service/messagetopersonal-image.png" width="20px" height="20px"
                        style="margin-right: 5px;margin-left: 5px;"></u-image> 给我留言</view>
                <view style="display: flex;flex-direction: row;align-items: center;" @click="lvshixiangqing(value)">
                    <u-image src="/static/service/lawyerdetail-image.png" width="20px" height="20px"
                        style="margin-right: 5px;margin-left: 5px;"></u-image>律师详情
                </view>
            </view>
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>


        </view>
    </view>


</template>

<script setup lang="ts">
import { dayjobLawyerList } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

const type = ref("1");

const bgColor = ref("#2a9598");

const ordersList = ref([{ image: '/static/service/lawmyshenqing-image.png', text: '我的申请' }, { image: '/static/service/lawmyxieyi-image.png', text: '我的协议' }, { image: '/static/service/lawmyzixun-image.png', text: '我的咨询' }, { image: '/static/service/lawmyliuyan-image.png', text: '我的留言' }]);

const yuanzhuList = ref([{ image: '/static/service/lawshiwusuo-image.png', text: '律师事务所' }, { image: '/static/service/gongyijigou-image.png', text: '公益机构' }]);

const lawyerlist = ref([1, 2, 3, 4, 5,]);

const loadData = () => {
  dayjobLawyerList({
      id: "",
      page: 1,
      size: 50
    }).then(res => {
      console.log(res);
      if (res.resultCode === 200) {
        lawyerlist.value = res.result;
      }
    });
};

const goBack = () => {
  uni.navigateBack();
};

const lawyerClickf = (index) => {
  if (index === 0) {
      uni.navigateTo({
        url: "/pages/service/work/laymyapplylist"
      });
    } else if (index === 1) {
      uni.navigateTo({
        url: "/pages/service/work/lawmyagreement?type=1"
      });
    } else if (index === 2) {
      uni.navigateTo({
        url: "/pages/service/work/lawmyzixun?type=1"
      });
    } else if (index === 3) {
      uni.navigateTo({
        url: "/pages/service/work/lawmyliuyan?type=0"
      });
    }
};

const applypersonhelp = () => {
  uni.navigateTo({
      url: "/pages/service/work/personapplyhelp"
    });
};

const applycomhelp = () => {
  uni.navigateTo({
      url: "/pages/service/work/companyapplyhelp"
    });
};

const lawyerClicks = (index) => {
  if (index === 0) {
      uni.navigateTo({
        url: "/pages/service/work/lawshiwusuo"
      });
    } else if (index === 1) {
      uni.navigateTo({
        url: "/pages/service/work/lawgongyijigou"
      });
    }
};

const fufeizixun = (item) => {
  uni.navigateTo({
      url: "/pages/service/work/fufeizixun?Officeid=" + item.office_id + "&lawyer_user_id=" + item.lawyer_user_id + "&id=" + item.id + "&type=3"
    });
};

const liuyan = (item) => {
  uni.navigateTo({
      url: "/pages/service/work/liuyan?lawyer_user_id=" + item.lawyer_user_id
    });
};

const lvshixiangqing = (item) => {
  uni.navigateTo({
      url: "/pages/service/work/lawshixiangqing?id=" + item.id + "&name=" + item.name + "&paper_card=" + item.paper_card + "&specialty=" + item.specialty + "&avatar=" + item.avatar
    });
};

onMounted(() => {
  loadData();
});
</script>

<style>
.Order-list {
    display: flex;
    flex-direction: row;
}

.order-item {
    width: 23%;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>