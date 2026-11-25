<template>
  <view>
    <u-navbar
      title="申请记录"
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
    <view style="display: flex; flex-direction: row; margin: 5px 3px">
      <text style="color: #333; width: 7%; text-align: center; font-size: 12px"
        >序号</text
      >
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 25%; text-align: center; font-size: 12px"
        >申请时间</text
      >
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 48%; text-align: center; font-size: 12px"
        >订单编号</text
      >
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 10%; text-align: center; font-size: 12px"
        >状态</text
      >
      <u-line direction="col" color="#999" length="25"></u-line>
      <text style="color: #333; width: 10%; text-align: center; font-size: 12px"
        >操作</text
      >
    </view>
    <u-line color="#999" style="margin-top: 10px"></u-line>
    <view
      v-for="(item, index) in list"
      :key="index"
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 15px;
      "
      @click="ToDetail(item.apply_id)"
    >
      <text
        style="color: #333; width: 5%; text-align: center; font-size: 13px"
        >{{ index + 1 }}</text
      >
      <text
        style="color: #007aff; width: 25%; text-align: center; font-size: 13px"
        >{{ item.create_time }}</text
      >
      <text
        style="color: #333; width: 48%; text-align: center; font-size: 12px"
        >{{ item.order_no }}</text
      >
      <text
        style="color: #007aff; width: 12%; text-align: center; font-size: 12px"
        >{{ item.statusFalg }}</text
      >
      <view
        style="color: #007aff; width: 10%; text-align: center; font-size: 12px"
      >
        <text
          style="font-size: 12px"
          @click.stop="postCancelShouHou(item.apply_id)"
          v-if="item.status === 0"
          >取消</text
        >
        <text
          style="font-size: 12px"
          @click.stop="applyjieru(item)"
          v-else-if="item.status === 2 && item.is_plat === 0"
          >申请介入</text
        >
        <text
          style="font-size: 12px"
          @click.stop="seejieru(item)"
          v-else-if="item.status === 2 && item.is_plat === 1"
          >查看介入</text
        ><text v-else></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ShouHouRecord, CancelShouHou } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { onMounted, ref } from "vue";

const bgColor = ref("#007AFF");

const list = ref([1, 2, 3, 4, 5, 6]);

const getShouHouList = () => {
  let data = {
      userId: storage.getUserId(),
      type: "0",
      size: 50,
      page: 1
    };
    ShouHouRecord(data).then(res => {
      list.value = res.result;
      console.log(res);
    });
};

const postCancelShouHou = (apply_id) => {
  let data = {
      apply_id: apply_id
    };
    CancelShouHou(data).then(res => {
      console.log(res);
      getShouHouList();
    });
};

const applyjieru = (item) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/ApplyJieRuPage?applyId=" + item.apply_id + "&applyNo=" + item.apply_no + "&orderNo=" + item.order_no + "&orderId=" + item.order_id
    });
};

const seejieru = (item) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/JieRuDetail?applyId=" + item.apply_id
    });
};

const goBack = () => {
  uni.navigateBack();
};

const ToDetail = (recid) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/UserShouHouDetail?id=" + recid
    });
};

onMounted(() => {
  getShouHouList();
});
</script>

<style></style>
