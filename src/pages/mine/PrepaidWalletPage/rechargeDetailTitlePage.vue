<template>
  <view>
    <u-navbar
      title="充值明细"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
    </u-navbar>
    <view class="toolRow">
      <view class="tool_item" @click="RechargeDetails">
        <image
          class="tool_icon"
          :src="fzichanguanli"
        >
        </image>
        <view class="tool_title"> 充值明细 </view>
      </view>
      <view class="tool_item" @click="ApplyBackRecords">
        <image class="tool_icon" :src="frukudan">
        </image>
        <view class="tool_title"> 申请记录 </view>
      </view>
      <!-- <view class="tool_item" >
        <image class="tool_icon" src="../../../component/fuwutubiao/frukudan.png">
        </image>
        <view class="tool_title"> 备案商户 </view>
      </view>
      <view class="tool_item" >
        <image class="tool_icon" src="../../../component/fuwutubiao/frukudan.png">
        </image>
        <view class="tool_title"> 异常商户 </view>
      </view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bgColor = ref("#007AFF");

const fzichanguanli = ref('/static/mine/fzichanguanli.png');

const frukudan = ref('/static/mine/frukudan.png');

const goBack = () => {
  uni.navigateBack();
};

const RechargeDetails = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/rechargeDetailPage?type=0"
    });
};

const ApplyBackRecords = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/rechargeApplyBackPage"
    });
};
</script>

<style lang="scss" scoped>
.toolRow {
  margin-top: 15px;
  display: flex;
  align-items: center;
  .tool_item {
    width: 25%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tool_icon {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tool_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
}
</style>
