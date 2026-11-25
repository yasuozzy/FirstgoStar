<template>
  <view style="background-color: #f3f3f3">
    <u-navbar title="售后" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <u-list @scrolltolower="scrolltolower" :border="false" col="2">
      <u-list-item v-for="(item, index) in loaddata" :key="index">
        <view style="display: flex;flex-direction: column;" @click="todetail(item.id)">
          <view style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 15px;
        border-bottom: 1px solid #e0e0e0;">
            <view style="font-size: 15px">{{ item.seller_name }} </view>
            <view v-if="item.status === 3" style="font-size: 15px">待发货</view>
            <view v-else-if="item.status === 4" style="font-size: 15px">已发货</view>
            <view v-else-if="item.status === 5" style="font-size: 15px">已完成</view>
            <view v-else-if="item.status === 0" style="font-size: 15px">已取消</view>

          </view>
          <u-line></u-line>
          <view style="
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;">
            <image :src="item.recycle_content_imgs" style="width: 65px; height: 65px" mode="aspectFill"></image>
            <view style="
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 10px;
        ">
              <view style="font-size: 15px">{{ item.goods_name }} </view>
              <view style="font-size: 15px;color: #2a9598;">{{ item.order_price }} </view>
            </view>
          </view>
          <u-line></u-line>
          <view style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 15px;
        border-bottom: 1px solid #e0e0e0;">
            <view v-if="item.status === 4 || item.status === 5" @click="towuliu"
              style="font-size: 15px ;border: 1px solid #e0e0e0;border-radius: 3px;">查看物流 </view>
            <view v-if="item.status === 3 || item.sendStatus === 1" @click="addwuliu"
              style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">填写物流</view>
            <view v-if="item.status === 3 || item.sendStatus === 0" @click="fahuo"
              style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">发货</view>
          </view>
        </view>

      </u-list-item>
    </u-list>
  </view>
</template>

<script setup lang="ts">
import {
  RecycleAfsOrderList,
} from "@/api/service";
import {
  storage
} from "@/utils/storage";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");
const loaddata = ref<any[]>([
  "", ""
]);
const id = ref("");

const getdetail = () => {
  const data1 = {
    orderId: id.value,
    page: 1,
    size: 50,
    serveType: 2,
    userId: storage.getUserId(),
  };
  RecycleAfsOrderList(data1).then((res) => {
    console.log(res);
    loaddata.value = res.result;

  });

};

const goBack = () => {
  uni.navigateBack();
};

const scrolltolower = () => {
  
};

const todetail = (detailId: any) => {
  console.log(detailId);
};

const towuliu = () => {
  console.log("查看物流");
};

const addwuliu = () => {
  console.log("填写物流");
};

const fahuo = () => {
  console.log("发货");
};

onLoad((e: any) => {
  id.value = e.id;
  getdetail();
});
</script>

<style scoped lang="scss"></style>
