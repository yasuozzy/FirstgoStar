<template>
  <view>
    <u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>

    <view style="
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      ">
      <view>
        <u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
      </view>
      <view style="flex: 1; margin-left: 15px">
        <view>{{ loaddata.buyer_name }} {{ loaddata.received_mobile }}</view>
        <view style="margin-top: 8px">{{ loaddata.regionAddress }}</view>
      </view>
      <view>
        <u-icon name="arrow-right" size="28"></u-icon>
      </view>
    </view>
    <u-gap height="5" bgColor="#f5f5f5"></u-gap>
    <view style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
      ">
      <view style="margin-left: 8px">{{ loaddata.seller_name }}</view>
      <u-icon name="phone" size="20" color="#2a9598"></u-icon>

    </view>
    <u-gap height="1" bgColor="#f5f5f5"></u-gap>
   
    <view style="display: flex;flex-direction: row;align-items: center; padding: 10px 0;">
      <image :src="loaddata.recycle_content_imgs" style="width: 50px; height: 50px;margin-left: 10px;" mode="aspectFill"></image>
      <view style="
          padding: 15px 10px;
          color: #333;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
        ">
        <view> {{ loaddata.goods_name }} </view>
        <view> {{ loaddata.order_price }}元 </view>
      </view>
     
    </view>
      <u-gap height="1" bgColor="#f5f5f5"></u-gap>
    <view style="
            font-size: 13px;
            margin-top: 8px;
            margin-bottom: 8px;
            margin-left: 10px;
            text-align: left;
            color: #333;
          ">
      商品总价：{{ loaddata.order_price }}元
    </view>
    <view style="
            font-size: 13px;
            margin-top: 8px;
            margin-bottom: 8px;
            text-align: left;
             margin-left: 10px;
            color: #333;
          ">
      运费：{{ loaddata.freightPrice }}元
    </view>
    <view style="
            font-size: 13px;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: left;
             margin-left: 10px;
            color: #333;
          ">
      实付款：{{ loaddata.totalPrice }}元
    </view>
     <u-gap height="1" bgColor="#f5f5f5"></u-gap>
    <view style="
            font-size: 13px;
            margin-top: 8px;
            margin-bottom: 8px;
            text-align: left;
             margin-left: 10px;
            color: #333;
          ">
      订单编号：{{ loaddata.order_no }}
    </view>
    <view style="
            font-size: 13px;
            margin-top: 8px;
            margin-bottom: 8px;
            text-align: left;
             margin-left: 10px;
            color: #333;
          ">
      下单时间：{{ loaddata.create_time }}
    </view>
      
    <!-- <view style="
        position: absolute;
        display: flex;
        flex-direction: row;
        bottom: 0;
        left: 0;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #f5f5f5;
        width: 100%;
        justify-content: space-between;
      ">
      <view style="display: flex; flex-direction: row">
        实付款：{{ allprice }}元

      </view>

      <view @click="commit" style="
          background-color: #2a9598;
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          margin-right: 10px;
        ">付款</view>
    </view> -->
  </view>

</template>

<script setup lang="ts">
import {
  recOrderDetail,
} from "@/api/service";
import {
  storage
} from "@/utils/storage";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#0080ff");
const id = ref("");
const loaddata = ref<any>({});
const commantlist = ref<any[]>([]);
const allprice = ref(0);

const goBack = () => {
  uni.navigateBack();
};

const getdetail = () => {
  const data1 = {
    orderId: id.value,
    userId: storage.getUserId(),
  };
  recOrderDetail(data1).then((res) => {
    console.log(res);
    loaddata.value = res.result;
    allprice.value = loaddata.value.recyclePrice + loaddata.value.freightPrice;
  });

};

const commit = () => {

};

onLoad((e: any) => {
  id.value = e.id;
  getdetail();
});
</script>

<style></style>
