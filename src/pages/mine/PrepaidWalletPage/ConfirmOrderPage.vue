<template>
  <view>
    <u-navbar
      title="确认订单"
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
    <view
      v-if="!address.id"
      @click="selectAddress"
      style="
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      "
    >
      <view>
        <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
      </view>
      <view style="display: flex; flex-direction: row; align-items: center">
        请选择位置
      </view>
    </view>
    <view
      v-else
      style="
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      "
      @click="selectAddress"
    >
      <view>
        <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
      </view>
      <view style="flex: 1; margin-left: 15px">
        <view>{{ address.acceptName }} {{ address.mobile }}</view>
        <view style="margin-top: 8px">{{ address.address }}</view>
      </view>
      <view>
        <u-icon name="arrow-right" size="28"></u-icon>
      </view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view style="padding: 10px;font-size: 13px;"
      >{{ orderCompleteParamList[0].shopName }} ></view
    >
    <view
      v-for="(item, index) in productlist"
      :key="index"
      style="padding: 1px 10px"
    >
      <view
        style="
          height: 100px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: aliceblue;
        "
      >
        <image
          :src="item.img"
          style="width: 80px; height: 80px"
        ></image>
        <view style="flex: 1; padding: 0px 10px">
          <view style="font-size: 14px; text-align: left">{{ item.name }}</view>
          <view style="font-size: 14px; text-align: right"
            >¥{{ item.price }}</view
          >
          <view style="font-size: 14px; text-align: right"
            >x{{ item.nums }}</view
          >
          <view style="font-size: 14px; text-align: left">{{
            item.specs
          }}</view>
        </view>
      </view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view style="display: flex; flex-direction: row; padding: 10px">
      <view style="font-size: 14px; text-align: left">备注：</view>
      <input
        style="flex: 1; text-align: left"
        placeholder="请输入"
        v-model="remark"
        placeholder-style="color: #999"
      />
    </view>
    <view style="font-size: 14px; text-align: right"
      ><text v-if="this.giftMoney > 0" style="color: red; padding-right: 15px"
        >优惠：¥{{ giftMoney }}</text
      >合计：<text style="color: red; padding-right: 15px"
        >¥{{ allprice }}</text
      ></view
    >
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>

    <view
      style="
        position: fixed;
        display: flex;
        flex-direction: row;
        bottom: 0;
        left: 0;
        justify-content: end;
        align-items: center;
        padding-left: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #f5f5f5;
        justify-content: space-between;
        width: 100%;
      "
    >
      <text style="color: red; padding-right: 15px">合计：¥{{ allprice }}</text>
      <view
        style="
          background-color: #2a9598;
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          margin-right: 10px;
		 
        "
        @click="commit"
        >提交订单</view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { PreOrderCommit, getDiscountCouponsAndAmount } from "@/api/mine.ts";

import { storage, BaseImgURL } from "@/utils/storage";

import { eventBus } from "@/utiles/eventBus.js";

import { onBeforeUnmount, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#0080ff");

const orderCompleteParamList = ref([]);

const productlist = ref([]);

const remark = ref("");

const totalAmount = ref(0);

const giftMoney = ref(0);

const totalMoney = ref(0);

const address = ref({});

const cost = ref<any>();

const allprice = ref<any>();

const goBack = () => {
  uni.navigateBack();
};

const selectAddress = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/SelectAddressPage"
    });
};

const handleUpdateData = (data) => {
  console.log("接收到回传的数据:", data);
    address.value = data;
};

const commit = () => {
  let orderSubmitParams = {};
    orderSubmitParams.addressId = address.value.id;
    orderSubmitParams.shopBeanAry = orderCompleteParamList.value;
    let amountBean = {};
    amountBean.paymentAmount = totalMoney.value;
    amountBean.totalAmount = totalAmount.value;
    amountBean.discountAmount = giftMoney.value;
    amountBean.freight = cost.value;
    orderSubmitParams.amountBean = amountBean;
    let ids = "";
    orderCompleteParamList.value.forEach(item => {
      item.productArray.forEach(item1 => {
        ids = ids + item1.cartId + ",";
      });
    });
    orderSubmitParams.cartIdStr = ids;
    let param = {
      address: address.value.address,
      addressId: address.value.id,
      amountBean: JSON.stringify(amountBean),
      // if (discountCouponsBean) {
      //     discountBean:discountCouponsBean,
      // } else {
      discountBean: "",
      // },
      cartIdStr: ids,
      shopBeanAry: orderCompleteParamList.value,
      userId: storage.getUserId(),
      deliveryType: 0,
      remarks: remark.value,
      deliveryFee: ""
    };
    PreOrderCommit(param).then(res => {
      console.log(res);
    });
};

const getallprice = () => {
  allprice.value = 0;
    giftMoney.value = 0;
    orderCompleteParamList.value.forEach(item => {
      item.productArray.forEach(item => {
        allprice.value = allprice.value + item.price * item.nums;
      });
      giftMoney.value = giftMoney.value + item.shopCoupon;
    });
    totalAmount.value = allprice.value;
    totalMoney.value = allprice.value - giftMoney.value + cost.value;
};

onLoad((option) => {
  orderCompleteParamList.value = uni.getStorageSync("prepaycarlist");
    console.log(orderCompleteParamList.value);
    productlist.value = orderCompleteParamList.value[0].productArray.map(item => ({
      ...item,
      img: item.img ? `${BaseImgURL}/${item.img.replace(/^\//, '')}` : '/default.jpg'
    }));
    getallprice();
});

onMounted(() => {
  eventBus.$on("preselectaddress", handleUpdateData);
});

onBeforeUnmount(() => {
  eventBus.$off("preselectaddress", handleUpdateData);
});
</script>

<style></style>
