<template>
  <view>
    <u-navbar
      title="充值"
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
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 10px;
      "
    >
      充值金额
      <u-input
        v-model="numValue"
        type="number"
        placeholder="请输入充值金额"
        style="
          border: 1px solid #999;
          border-radius: 5px;
          padding: 5px;
          margin-left: 15px;
        "
      ></u-input>
    </view>
    <u-line
      style="margin: 10px 10px"
      :showLine="true"
      :lineStyle="{ backgroundColor: '#ccc' }"
    ></u-line>
	<view class="signView">
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;">充值类型</view>
		<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="qiandaoClick">
			<view v-if="type === '0'" style="background-color: #2A9595;height: 30px;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 80px;color: white;" >商品充值</view>
			<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 80px;height: 30px; color: white;">商品充值</view>
		</view>
		<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="qiantuiClick">
			<view v-if="type === '1'" style="background-color: #2A9595;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 80px;height: 30px; color: white;">店铺充值</view>
			<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 80px;height: 30px; color: white;">店铺充值</view>
		</view>
	</view>
    <u-line
      style="margin: 10px 10px"
      :showLine="true"
      :lineStyle="{ backgroundColor: '#ccc' }"
    ></u-line>
    <view style="margin: 10px">充值用途</view>

    <view style="margin: 10px; display: flex; justify-content: space-between">
      <view style="margin: 10px">选择店铺</view>
      <view style="margin: 10px; color: #007aff" @click="selectShop">选择</view>
    </view>
    <view
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 15px;
      "
    >
      <image
        style="height: 40px; width: 40px"
        :src="shopinfo.cover_img"
        mode=""
      ></image>
      <view style="margin-left: 10px">{{ shopinfo.shop_name }}</view>
    </view>
    <view v-if="type === '0'" style="margin: 10px; display: flex; justify-content: space-between">
      <view style="margin: 10px">选择商品</view>
      <view style="margin: 10px; color: #007aff" @click="selectProduct">选择</view
      >
    </view>
    <view v-if="type === '0'"
      v-for="(item, index) in goods"
      :key="index"
      style="margin: 15px 15px; display: flex; justify-content: space-between"
    >
      <view style="display: flex; flex-direction: row; align-items: center">
        <image
          style="height: 40px; width: 40px; margin-left: 10px"
          src="@/static/logo.png"
          mode=""
        ></image>
        <view style="margin-left: 10px">{{ item.name }}</view>
      </view>
    </view>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;
      "
    >
      <u-button type="primary" @click="toRecharge" style="margin: 10px 20px"
        >下一步</u-button
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { goRecharge } from "@/api/mine.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad, onUnload } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const numValue = ref("");

const shopid = ref("");

const shopinfo = ref({});

const goods = ref([]);

const loaddata = ref([]);

const type = ref('0');

const goBack = () => {
  uni.navigateBack();
};

const updateData = (newData) => {
  console.log(newData);
    shopinfo.value = {
      ...shopinfo.value,
      ...newData
    };
    uni.showToast({
      title: "数据更新成功",
      icon: "success"
    });
};

const qiandaoClick = () => {
	type.value = '0';
};

const qiantuiClick = () => {
	type.value = '1';
};

const getgood = (newData) => {
  console.log(newData);
    goods.value = Array.isArray(newData) ? newData : [newData];
    uni.showToast({
      title: "数据更新成功",
      icon: "success"
    });
};

const selectShop = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayRechargeSelectShopPage"
    });
};

const selectProduct = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prepayRechargeSelectProductPage?shopid=" + shopinfo.value.id
    });
};

const toRecharge = () => {
  let infos = "";
    for (let i = 0; i < goods.value.length; i++) {
      infos += goods.value[i].sku + "," + goods.value[i].name + ";";
    }
	console.log(infos)
    let data = {
      hostNo: storage.getHostNo(),
      userName: storage.getRealName(),
      mobile: storage.getPhone(),
      userId: storage.getUserId(),
      shop_id: shopinfo.value.id,
      shop_name: shopinfo.value.shop_name,
      goods_infos: infos,
      recharge_amount: numValue.value,
	  rechargeType:type.value
    };
	console.log(data)
    goRecharge(data).then(res => {
      loaddata.value = res.result;
	  
	  if (res.success && res.resultCode == 200) {
	    const encodedUrl = encodeURIComponent(res.result.payUrl);
	    uni.navigateTo({
	      url: `/pages/service/WebViewPage/WebPayPage?title=充值&url=${encodedUrl}`
	    });
	  } else {
	    uni.showToast({
	      title: res.message,
	      icon: "error"
	    });
	  }
      console.log(res);
    });
};


onLoad((option) => {
	uni.$on("updateShop", updateData);
	uni.$on("getgood", getgood);
	
});

onUnload(() => {
  uni.$off("updateShop", updateData);
    uni.$off("getgood", getgood);
});
</script>

<style>
	.signView{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 40px;
	}
</style>
