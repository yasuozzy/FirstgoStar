<template>
  <view class="chat-container">
    <u-navbar title="我的留言" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
    </u-navbar>
    <!-- 聊天消息列表 -->
    <scroll-view :style="{ height: swiperHeight + 'px' }" scroll-y="true" refresher-enabled="true"
      :refresher-triggered="triggered" :refresher-threshold="50" refresher-background="white"
      @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
      @refresherabort="onAbort">
      <view v-for="(item, index) in messageList" :key="index" :id="'msg-' + index"
        :class="['message-item', item.type === 0 ? 'message-right' : 'message-left']">
        <view v-if="item.type === 0" class="message-row">
          <image class="avatar" src="/static/service/my_selected.png"  mode="aspectFill" />
          <view class="message-content">
            <view class="sender-name">{{item.userName }}</view>
            <view class="bubble">{{ item.content }}</view>
            <view class="message-time">{{ item.create_time }}</view>
          </view>
        </view>

        <view v-else class="message-row reverse">
           <image class="avatar" :src="item.userHead" mode="aspectFill" />
          <view class="message-content">
            <view class="sender-name">{{item.lawyerName }}</view>
            <view class="bubble">{{ item.content }}</view>
            <view class="message-time">{{ item.create_time }}</view>
          </view>
         
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-area">
      <input class="message-input" v-model="inputContent" placeholder="请输入消息..." placeholder-class="placeholder"
        confirm-type="send" @confirm="sendMessage" />
      <button class="send-btn" @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getUserLawyerMessageInfo, sendMessage as sendMessageApi } from '@/api/work.ts';

import { nextTick, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const messageList = ref([]);

const inputContent = ref('');

const bgColor = ref('#2A9598');

const currentMsgId = ref(0);

const userId = ref('');

const lawyerUserId = ref('');

const type = ref("");

const swiperHeight = ref<any>();

const loaddata = ref<any>();

const _freshing = ref<any>();

const triggered = ref<any>();

const goBack = () => {
  uni.navigateBack();
};

const loadMessages = () => {
  // 模拟接口返回的数据
    let data = {
      user_id: userId.value,
      lawyer_user_id: lawyerUserId.value
    };
    getUserLawyerMessageInfo(data).then(res => {
      console.log(res);
      messageList.value = res.result;
    });

    // const mockData = {
    //   "result": [
    //     { "userHead": "http://36.138.20.61/estate/123/20251028/e107596d-58b2-4369-b689-ab7abb3ba4ec.jpg", "lawyerName": "高晓梅律师", "lawyer_user_id": "897939079437472e94c7e5b9383a3881", "create_time": "2022-03-09 09:43", "user_id": "a09ce1a089784782947303987cbdc871", "userName": "刘镇溪", "type": 1, "lawyerHead": "", "content": "。？！" },
    //     { "userHead": "http://36.138.20.61/estate/123/20251028/e107596d-58b2-4369-b689-ab7abb3ba4ec.jpg", "lawyerName": "高晓梅律师", "lawyer_user_id": "897939079437472e94c7e5b9383a3881", "create_time": "2022-03-05 10:11", "user_id": "a09ce1a089784782947303987cbdc871", "userName": "刘镇溪", "type": 0, "lawyerHead": "", "content": "你好" }
    //   ],
    //   "success": true,
    //   "message": "",
    //   "resultCode": 200
    // }

    // if (mockData.success) {
    //   this.messageList = mockData.result
    //   this.currentMsgId = this.messageList.length
    // }
};

const sendMessage = () => {
  sendMessageApi({
      user_id: userId.value,
      lawyer_user_id: lawyerUserId.value,
      content: inputContent.value,
      type: type.value
    }).then(res => {
      console.log(res);
      if (res.resultCode === 200) {
        // 消息发送成功，更新消息列表
        loadMessages();
      }
    });

    // 滚动到底部
    nextTick(() => {
      uni.pageScrollTo({
        scrollTop: 99999,
        duration: 300
      });
    });

    // TODO: 调用实际发送接口
    // this.sendToServer(newMessage)
};

const scrolltolower = () => {
  console.log("scrolltolower");
    loadmore();
};

const loadmore = () => {
  for (let i = 0; i < 10; i++) {
      loaddata.value.push("https://uviewui.com/album/" + i + ".jpg");
    }
};

const onPulling = (e) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  if (_freshing.value) return;
    _freshing.value = true;
    setTimeout(() => {
      triggered.value = false;
      _freshing.value = false;
    }, 1000);
};

const onRestore = () => {
  triggered.value = "restore"; // 需要重置
    console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
};

const formatTime = (date) => {
  const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
};

onLoad((e) => {
  userId.value = e.user_id;
    lawyerUserId.value = e.lawyer_user_id;
    type.value = e.type;
    uni.getSystemInfo({
      success: res => {
        swiperHeight.value = res.windowHeight - 104;
        console.log("height", swiperHeight.value);
      }
    });
    loadMessages();
});
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.message-list {
  flex: 1;
  padding: 20rpx;
  overflow-y: auto;
}

.message-item {
  margin-bottom: 30rpx;
}

.message-row {
  display: flex;
  align-items: flex-start;

  &.reverse {
    flex-direction: row-reverse;
  }
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #ddd;
  flex-shrink: 0;
}

.message-content {
  max-width: 500rpx;
  margin: 0 20rpx;

  .sender-name {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 10rpx;
  }

  .bubble {
    padding: 20rpx;
    border-radius: 10rpx;
    font-size: 28rpx;
    line-height: 1.5;
    word-break: break-all;
  }

  .message-time {
    font-size: 22rpx;
    color: #999;
    margin-top: 10rpx;
  }
}

.message-left .bubble {
  background-color: #ffffff;
  border: 1rpx solid #e0e0e0;
}

.message-right .bubble {
  background-color: #007aff;
  color: #ffffff;
}

.input-area {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #e0e0e0;

  .message-input {
    flex: 1;
    height: 70rpx;
    padding: 0 20rpx;
    background-color: #f5f5f5;
    border-radius: 35rpx;
    font-size: 28rpx;
  }

  .placeholder {
    color: #999;
  }

  .send-btn {
    margin-left: 20rpx;
    width: 120rpx;
    height: 70rpx;
    line-height: 70rpx;
    background-color: #007aff;
    color: #ffffff;
    font-size: 28rpx;
    border-radius: 35rpx;
    padding: 0;
  }
}
</style>
