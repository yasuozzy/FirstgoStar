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
    <view>
      <view style="display: flex; flex-direction: row">
        <image :src="loaddata.userpicture" style="width: 40px; height: 40px; margin: 12px" mode="aspectFill"></image>
        <view style="
            padding: 15px 10px;
            color: #333;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
          ">
          <view> {{ loaddata.username }} </view>
          <view> {{ loaddata.userphone }} </view>
        </view>
      </view>
      <u-gap height="1" bgColor="#f5f5f5"></u-gap>
      <view style="
          padding: 15px 10px;
          color: 333;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
        ">
        <view> {{ loaddata.itemTitle }} </view>
        <view> {{ loaddata.itemDescrption }} </view>
        <view v-for="(item, index) in loaddata.imgs" :key="index">
          <image :src="item" style="width: 100%" mode="aspectFill"></image>
        </view>
        <u-gap height="1" bgColor="#f5f5f5"></u-gap>
        <view style="margin: 8px"> 留言 </view>
        <u-gap height="1" bgColor="#f5f5f5"></u-gap>
        <view style="padding: 10px" v-for="(item, index) in commantlist" :key="index">
          <view style="display: flex; flex-direction: row">
            <image :src="item.sendUserPicture" style="width: 20px; height: 20px; margin-right: 10px" mode="aspectFill">
            </image>
            <view style="flex: 1"> {{ item.sendUserName }} </view>
            <view> {{ item.replyTime }} </view>
          </view>
          <view style="display: flex; flex-direction: row">
            <view style="flex: 1; margin-left: 35px">
              {{ item.replyContent }}
            </view>
            <!-- <view>回复</view> -->
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <view class="bottom-item" @click="liuyan">
        <u-icon name="chat" size="20" color="#999"></u-icon>
        <text style="margin-top: 4px; font-size: 12px">留言</text>
      </view>
      <view class="bottom-item" @click="toggleCollect">
        <u-icon :name="loaddata.collect ? 'star-fill' : 'star'" size="20"
          :color="loaddata.collect ? '#FF6347' : '#999'"></u-icon>
        <text style="margin-top: 4px; font-size: 12px">收藏</text>
      </view>
      <view class="bottom-btn" @click="call(loaddata.userphone)">
        <text style="color: #fff; font-size: 14px">拨打电话</text>
      </view>
    </view>
    <u-popup :show="show" @close="close" @open="open" mode="center">
      <view style="padding: 8px;">
        <textarea style="border: 1px solid #333;border-radius: 5px;margin: 5px;" placeholder="请输入内容" v-model="textarea"
          class="textarea"></textarea>
        <view style="display: flex; flex-direction: row;width: 100%;justify-content: space-around;">
          <text class="text" @click="close">取消</text>
          <text class="text" @click="send">发送</text>
        </view>

      </view>
    </u-popup>
  </view>

</template>
<script setup lang="ts">
import { ExchangeProductCancelCollect, ExchangeProductCollect, ExchangeProductCommentList, ExchangeProductDetail, addReplyExChangeReply, addExChangeReply } from "@/api/service";

import { storage } from "@/utils/storage";

import { computed, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#0080ff");

const id = ref("");

const loaddata = ref({});

const commantlist = ref([]);

const textarea = ref("");

const show = ref(false);

const sheng = ref<any>();

const shi = ref<any>();

const qu = ref<any>();

const zhen = ref<any>();

const addressText = computed(() => {
  // 如果没有选择任何地区，显示"选择"
    if (!sheng.value) {
      return "选择";
    }

    // 否则显示已选择的地区拼接
    return `${sheng.value}${shi.value}${qu.value}${zhen.value}`;
});

const liuyan = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

const send = () => {
  show.value = false;
    let data1 = {
      sendUserId: storage.getUserId(),
      exchangeId: id.value,
      replyContent: textarea.value
    };
    addExChangeReply(data1).then(res => {
      console.log(res);
      getdetail();
      textarea.value = "";
    });
};

const goBack = () => {
  uni.navigateBack();
};

const getdetail = () => {
  let data1 = {
      exChangeId: id.value,
      userId: storage.getUserId()
    };
    ExchangeProductDetail(data1).then(res => {
      console.log(res);
      loaddata.value = res.result;
    });
    ExchangeProductCommentList(data1).then(res => {
      console.log(res);
      commantlist.value = res.result;
    });
};

const call = (phoneNumber) => {
  if (!phoneNumber) {
      uni.showToast({
        title: "电话号码不能为空",
        icon: "none"
      });
      return;
    }
    uni.makePhoneCall({
      phoneNumber: phoneNumber,
      success: () => {
        console.log("拨打电话成功");
      },
      fail: () => {
        console.log("拨打电话失败");
        uni.showToast({
          title: "拨打电话失败",
          icon: "none"
        });
      }
    });
};

const toggleCollect = () => {
  if (!loaddata.value.id) return;
    const collectAction = loaddata.value.collect ? ExchangeProductCancelCollect : ExchangeProductCollect;
    const data = {
      exchangeId: id.value,
      userId: storage.getUserId()
    };
    collectAction(data).then(res => {
      console.log("收藏操作结果:", res);
      if (res.resultCode === 200 && res.success) {
        getdetail();
        uni.showToast({
          title: loaddata.value.collect ? "取消收藏" : "收藏成功",
          icon: "none"
        });
      } else {
        uni.showToast({
          title: res.message || "操作失败",
          icon: "none"
        });
      }
    }).catch(err => {
      console.error("收藏操作失败:", err);
      uni.showToast({
        title: "操作失败",
        icon: "none"
      });
    });
};

onLoad((e) => {
  id.value = e.id;
    getdetail(id.value);
});
</script>

<style>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 0 20rpx;
  box-sizing: border-box;
  z-index: 999;
}

.bottom-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}

.bottom-btn {
  flex: 2;
  height: 70rpx;
  background-color: #0080ff;
  border-radius: 35rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
  cursor: pointer;
}
</style>
