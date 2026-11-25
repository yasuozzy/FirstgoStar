<template>
  <view style="background-color: #f3f3f3">
    <u-navbar title="闲置" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <view style="background-color: white; border-radius: 15px; margin: 3px 10px">
      <view style="
          display: flex;
          padding: 10px 15px;
          flex-direction: row;
          justify-content: space-between;
          font-size: 10px;
          color: #666;
        ">
        <view>我购买的回收</view>
        <view @click="tomybuy(0)">全部订单 ></view>
      </view>
      <u-line></u-line>
      <view class="dis_3">
        <view class="areaTop_item" @click="tomybuy(1)">
          <image src="/static/service/unused_payment.png" style="width: 35px; height: 35px;"></image>

          <view class="areaTop_title"> 待付款 </view>
        </view>
        <view class="areaTop_item" @click="tomybuy(2)">
          <image src="/static/service/delivery.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 待发货 </view>
        </view>
        <view class="areaTop_item" @click="tomybuy(3)">
          <image src="/static/service/unused_receipt.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 待收货 </view>
        </view>
        <view class="areaTop_item" @click="tomybuyafter">
          <image src="/static/service/after_sale.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 售后 </view>
        </view>
      </view>
    </view>
    <view style="background-color: white; border-radius: 15px; margin: 3px 10px">
      <view style="
          display: flex;
          padding: 10px 15px;
          flex-direction: row;
          justify-content: space-between;
          font-size: 10px;
          color: #666;
        ">
        <view>我发布的回收</view>
        <view @click="myrecycler(0)">全部订单 ></view>
      </view>
      <u-line></u-line>
      <view class="dis_3">
        <view class="areaTop_item" @click="myrecycler(1)">
          <image src="/static/service/unused_receipt.png" style="width: 35px; height: 35px;"></image>

          <view class="areaTop_title"> 待发货 </view>
        </view>
        <view class="areaTop_item" @click="myrecyclerafter">
          <image src="/static/service/after_sale.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 售后 </view>
        </view>
        <view class="areaTop_item" @click="myrecyclerlist">
          <image src="/static/service/unused_upper.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 已上架 </view>
        </view>
        <view class="areaTop_item" @click="myrecyclerunlist">
          <image src="/static/service/unused_lower.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 已下架 </view>
        </view>
      </view>
    </view>
    <view style="background-color: white; border-radius: 15px; margin: 3px 10px">
      <view style="
          display: flex;
          padding: 10px 15px;
          flex-direction: row;
          justify-content: space-between;
          font-size: 10px;
          color: #666;
        ">
        <view>我的置换</view>
      </view>
      <u-line></u-line>
      <view class="dis_3">
        <view class="areaTop_item" @click="wolianxide">
          <image src="/static/service/unused_me_call.png" style="width: 35px; height: 35px;"></image>

          <view class="areaTop_title"> 我联系的 </view>
        </view>
        <view class="areaTop_item" @click="lianxiwode">
          <image src="/static/service/unused_call_me.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 联系过我 </view>
        </view>
        <view class="areaTop_item" @click="yishangjia">
          <image src="/static/service/unused_upper.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 已上架 </view>
        </view>
        <view class="areaTop_item" @click="yixiajia">
          <image src="/static/service/unused_lower.png" style="width: 35px; height: 35px;"></image>
          <view class="areaTop_title"> 已下架 </view>
        </view>
      </view>
    </view>
    <view style="display: flex; flex-direction: row; background-color: white; border-radius: 15px; margin: 3px 10px;padding: 12px 8px;" @click="mycollection">
      <image src="/static/service/unused_collection.png" style="width: 25px; height: 25px;"></image>
      <text style="flex: 1; margin-left: 10px">我的收藏</text>
      <u-icon name="arrow-right" size="20"></u-icon>
    </view>
    <view style="display: flex; flex-direction: row; background-color: white; border-radius: 15px; margin: 3px 10px;padding: 12px 8px;" @click="toweb">
      <image src="/static/service/welfare.png" style="width: 25px; height: 25px;"></image>
      <text style="flex: 1; margin-left: 10px">公益回收规则</text>
      <u-icon name="arrow-right" size="20"></u-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bgColor = ref("#007AFF");

const goBack = () => {
  uni.navigateBack();
};

const tomybuy = (index) => {
  uni.navigateTo({
      url: "/pages/service/unusemybuy/mybuyorder?index=" + index
    });
};

const tomybuyafter = () => {
  uni.navigateTo({
      url: "/pages/service/unusemybuy/aftersalepage"
    });
};

const myrecycler = (index) => {
  uni.navigateTo({
      url: "/pages/service/unusemysendrecycler/mysendrecycler?index=" + index
    });
};

const myrecyclerafter = () => {
  uni.navigateTo({
      url: "/pages/service/unusemysendrecycler/aftersalepage"
    });
};

const myrecyclerlist = () => {
  uni.navigateTo({
      url: "/pages/service/unusemysendrecycler/mylistingpage"
    });
};

const myrecyclerunlist = () => {
  uni.navigateTo({
      url: "/pages/service/unusemysendrecycler/myunlistingpage"
    });
};

const wolianxide = () => {
  uni.navigateTo({
      url: "/pages/service/unusemyexchange/mycontacts"
    });
};

const lianxiwode = () => {
  uni.navigateTo({
      url: "/pages/service/unusemyexchange/contactme"
    });
};

const yishangjia = () => {
  uni.navigateTo({
      url: "/pages/service/unusemyexchange/exchangelistingpage"
    });
};

const yixiajia = () => {
  uni.navigateTo({
      url: "/pages/service/unusemyexchange/exchangeunlistingpage"
    });
};

const mycollection = () => {
  uni.navigateTo({
      url: "/pages/service/unusemycollect/mycollection"
    });
};

const toweb = () => {
  uni.navigateTo({
      url: "/pages/service/HouseInformation/ProtocalDetail?type=4"
    });
};
</script>

<style scoped lang="scss">
.dis_3 {
  display: flex;
  flex-direction: row;
  padding: 10px 0;

  .areaTop_item {
    width: 25%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .areaTop_icon {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .areaTop_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 10px;
    }
  }
}
</style>
