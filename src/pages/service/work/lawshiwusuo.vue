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
        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
            <view
                style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
            </view>
            <view> 事务所名称：山东恒明律师事务所</view>
        </view>

        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
            <view
                style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
            </view>
            <view> 法律援助</view>
        </view>

        <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px; width: 100%;">
            <view
                style="margin-left: 12px;margin-right: 5px; flex: 1; padding: 6px 0px; display: flex;flex-direction: column;">
                <view style="display: flex;flex-direction: row;align-items: center;">
                    <u-image src="/static/service/lawjudgement-image.png" width="20px" height="20px"
                        style="margin-right: 5px;margin-left: 5px;"></u-image> 法律咨询
                </view>
                <view>法律问答 公司顾问</view>

            </view>
            <view>
                <view
                    style="margin-left: 12px;margin-right: 5px; flex: 1; padding: 6px 0px;display: flex;flex-direction: column;">
                    <view style="display: flex;flex-direction: row;align-items: center;">
                        <u-image src="/static/service/lawjudgement-image.png" width="20px" height="20px"
                            style="margin-right: 5px;margin-left: 5px;"></u-image> 文书服务
                    </view>
                    <view>合同拟定 合同审查</view>
                </view>
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
                <u-image :src="value.avatar" width="60px" height="120px" style="background-color: bisque;"></u-image>
                <view style="display: flex;flex-direction: column;justify-content: space-between;padding: 5px 10px;">
                    <view>律师姓名： {{ value.name }}</view>
                    <view>执业证号： {{ value.paper_card }}</view>
                    <view>业务专长： {{ value.specialty }}</view>
                </view>

            </view>
            <view
                style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 5px;margin-bottom: 5px;">
                <view style="display: flex;flex-direction: row;align-items: center;" @click="fufeizixun(value)"> <u-image
                        src="/static/service/fufeizixun-image.png" width="20px" height="20px"
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

import { onMounted, ref } from "vue";

const bgColor = ref('#007AFF');

const lawyerlist = ref([]);

const type = ref<any>();

const loadData = () => {
  dayjobLawyerList({
      id: "",
      page: 1,
      size: 50,
      type: type.value
    }).then(res => {
      if (res.resultCode === 200) {
        console.log(res);
        lawyerlist.value = res.result;
      }
    });
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
  console.log(item);
    uni.navigateTo({
      url: "/pages/service/work/lawshixiangqing?id=" + item.lawyer_user_id + "&name=" + item.name + "&paper_card=" + item.paper_card + "&specialty=" + item.specialty + "&avatar=" + item.avatar
    });
};

const goBack = () => {
  uni.navigateBack();
};

onMounted(() => {
  loadData();
});
</script>

<style></style>