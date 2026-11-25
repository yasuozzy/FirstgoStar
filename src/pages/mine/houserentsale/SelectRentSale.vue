<template>
  <view class="main">
    <u-navbar
      title="租售发布"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="flex">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>

    <view class="tipBar">
      <image class="tipIcon" src="/static/zs_lingdang.png"></image>
      <text class="tipText">温馨提示：请正确选择发布信息的分类,分类错误会导致信息违规下架</text>
    </view>

    <view class="rentItem" @click="openRent">
      <view class="itemLeft">
        <image class="itemIcon" src="/static/fabuchuzu.png"></image>
        <text class="itemText">出租发布</text>
      </view>
      <image class="arrowIcon" src="/static/arrow.png"></image>
    </view>

    <view class="divider"></view>

    <view class="saleItem" @click="openSale">
      <view class="itemLeft">
        <image class="itemIcon" src="/static/fabuchushou.png"></image>
        <text class="itemText">出售发布</text>
      </view>
      <image class="arrowIcon" src="/static/arrow.png"></image>
    </view>

    <view class="divider"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bgColor = ref('#2A9595');

const goBack = () => {
  uni.navigateBack();
};


const openRent = () => {
  // uni.showToast({
  //   title: '出租发布',
  //   icon: 'none'
  // });
  uni.navigateTo({
    url: "/pages/mine/houserentsale/SendSaleHistory?type=rent",
  });	
};

const openSale = () => {
  // uni.showToast({
  //   title: '出售发布',
  //   icon: 'none'
  // });
  uni.navigateTo({
    url: "/pages/mine/houserentsale/SendSaleHistory?type=sale",
  });	
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background: #fff;

  .flex {
    display: flex;
  }
}

.tipBar {
  display: flex;
  align-items: center;
  background: #fdfbec;
  padding: 12px 15px;
}

.tipIcon {
  width: 25px;
  height: 25px;
  flex-shrink: 0;
}

.tipText {
  margin-left: 10px;
  color: #e77a43;
  font-size: 13px;
  line-height: 20px;
}

.rentItem,
.saleItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 15px;
  background: #fff;
}

.itemLeft {
  display: flex;
  align-items: center;
}

.itemIcon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  flex-shrink: 0;
}

.itemText {
  font-size: 14px;
  color: #333;
}

.arrowIcon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.divider {
  width: calc(100% - 20px);
  height: 1px;
  margin: 0 10px;
  background: #e5e5e5;
}
</style>
