<template>
    <view class="all">
        <view></view>
        <view class="search">
            <u-icon style="margin-top: 5px;" @click="goBack" name="arrow-left" size="20" color="#fff"></u-icon>
            <input class="weui-input" style="
          border: 2rpx solid #2a9595;
          border-radius: 8rpx;
          margin-left: 15rpx;
          margin-right: 15rpx;
          margin-top: 25rpx;
          padding-left: 10rpx;
          padding-right: 10rpx;
        " auto-focus placeholder="搜索" v-model="searchinfo" />
            <view style="margin-top: 10px;" @click="tosearch">搜索</view>
        </view>

        <u-list @scrolltolower="scrolltolower">
            <u-list-item v-for="(item, index) in loaddata" :key="index">
                <view style="display: flex;flex-direction: column;" @click="todetail(item.id)">

                    <view style="
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;">
                        <image :src="item.recycle_content_imgs" style="width: 65px; height: 65px" mode="aspectFill">
                        </image>
                        <view style="
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 10px;
        ">
                            <view style="display: flex;flex-direction: row;justify-content: space-between;">
                                <view style="font-size: 15px">{{ item.goods_name }} </view>
                                <view style="font-size: 15px">{{ item.goods_name }} </view>
                            </view>

                            <view style="font-size: 15px;color: #2a9598;">{{ item.order_price }} </view>
                            <view style="font-size: 15px;color: #2a9598;">{{ item.order_price }} </view>
                        </view>
                    </view>

                    <view style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px 15px;
        border-bottom: 5px solid #f5f5f5;">
                        <view v-if="item.status === 4 || item.status === 5" @click.stop="towuliu(item)"
                            style="font-size: 15px ;border: 1px solid #e0e0e0;border-radius: 3px;">查看物流 </view>
                        <view v-if="item.status === 3 || item.sendStatus === 1" @click.stop="addwuliu"
                            style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">填写物流</view>
                        <view v-if="item.status === 3 || item.sendStatus === 0" @click.stop="fahuo"
                            style="font-size: 15px;border: 1px solid #e0e0e0;border-radius: 3px;">发货</view>
                    </view>
                </view>

            </u-list-item>
        </u-list>

    </view>
</template>

<script setup lang="ts">
import { getSearchWord } from "@/api/service";

import { storage } from "@/utils/auth";

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const radios = ref([]);

const radios1 = ref([]);

const searchinfo = ref("");

const type = ref("");

const init = (type) => {
  let data1 = {
      searchType: type
    };
    getSearchWord(data1).then(res => {
      console.log(res);
      radios.value = res.result;
    });
};

const goBack = () => {
  uni.navigateBack();
};

const tosearch = () => {
  if (searchinfo.value == "") {
      uni.showToast({
        title: "请输入搜索内容",
        icon: "none"
      });
      return;
    }
    uni.navigateTo({
      url: "/pages/service/unused/searchresultpage?searchinfo=" + searchinfo.value + "&type=" + type.value
    });
};

onMounted(() => {

});

onLoad((option) => {
  type.value = option.type;
    init(option.type);
});
</script>

<style>
.all {
    display: flex;
    flex-direction: column;
}

.search {
    background-color: #2a9598;
    display: flex;
    flex-direction: row;
    padding-top: 25px;
}

.car {
    width: 40rpx;
    height: 40rpx;
    margin-top: 18rpx;
    margin-right: 15rpx;
}

.search .weui-input {
    width: 75%;
    background-color: white;
}

.u-demo-block__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.u-page__tag-item {
    margin-right: 20px;
}
</style>
