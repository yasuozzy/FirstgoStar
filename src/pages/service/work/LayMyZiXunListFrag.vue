<template>
    <view>
        <!-- <text>{{ message }}</text> -->
        <!-- <text>{{ postid }}</text> -->
        <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
        <scroll-view :style="{ height: swiperHeight + 'px' }" scroll-y="true" refresher-enabled="true"
            :refresher-triggered="triggered" :refresher-threshold="50" refresher-background="white"
            @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
            @refresherabort="onAbort">


            <u-list @scrolltolower="scrolltolower">
                <u-list-item v-for="(item, index) in loaddata" :key="index">
                    <view class="job-item" style="padding: 5px;font-size: 13px;" @tap="detailClick(item)">
                        <!-- 工种和时间 -->
                        <view style="display: flex;flex-direction: row;">
                            <u-image :src="item.officeLogo" width="30px" height="30px"
                                style="margin-right: 5px;margin-left: 5px;"></u-image>

                            <view style="display: flex; flex-direction: column;flex: 1;">
                                <view class="work-type">{{ item.officeName }} <text>{{ item.create_time }}</text></view>
                                <text class="create-time"> {{ item.profession }} </text>
                            </view>

                            <!-- <text class="salary-text"> 签订时间 </text> -->
                        </view>

                        <view style="display: flex; flex-direction: row; justify-content:flex-end;">
                            <text
                                style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                继续咨询 </text>
                            <text
                                style="color: white;background-color: gray;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                继续咨询 </text>
                        </view>


                        <u-gap height="10" bgColor="#f5f5f5"></u-gap>
                    </view>
                </u-list-item>
            </u-list>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { LawMyPayedAskList, LawMyFreeAskList } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onActivated, onDeactivated, onMounted, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const emit = defineEmits();

const loaddata = ref([]);

const searchValue = ref("");

const _freshing = ref<any>();

const triggered = ref<any>();

const swiperHeight = ref<any>();

const getList = () => {
  if (props.postid === "0") {
      LawMyFreeAskList({
        page: 1,
        size: 50,
        type: props.message,
        userId: storage.getUserId()
      }).then(res => {
        console.log("获取列表成功", res);
        loaddata.value = res.result;
      }).catch(err => {});
    } else if (props.postid === "1") {
      LawMyPayedAskList({
        page: 1,
        size: 50,
        type: props.message,
        userId: storage.getUserId()
      }).then(res => {
        console.log("获取列表成功", res);
        loaddata.value = res.result;
      }).catch(err => {});
    }
};

const negotiateJob = (item) => {
  console.log("查看信息", item);
    uni.navigateTo({
      url: "/pages/service/work/laowujianzhidetail?jobId=" + item.id
    });
    // 这里可以添加跳转到详情页的逻辑
};

const sendDataToParent = () => {
  emit("message", "Hello from Child");
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
      getList();
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

onMounted(() => {
  console.log("首页组件被创建了");
    // this.loaddata = this.urls;
    uni.getSystemInfo({
      success: res => {
        swiperHeight.value = res.windowHeight - 104;
        console.log("height", swiperHeight.value);
      }
    });
    _freshing.value = false;
    setTimeout(() => {
      triggered.value = true;
    }, 100);
    getList();
    // 这里可以发起网络请求初始化数据
});

onActivated(() => {
  console.log("首页组件被激活了");
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped>
.searchView {
    width: 100%;
    padding: 2px 10px;
}

.searchInView {
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 93%;
    height: 35px;
    border: 1px solid #EAEBF0;
    background-color: #EAEBF0;
    border-radius: 15px;
    line-height: 40px;
    box-sizing: border-box;
    padding-top: 2px;
}

.searchInView image {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.searchInView input {
    text-align: left;
    width: 240px;
    margin-top: 2px;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 3px 0px;
    width: 100%;
}

.picker-item {
    width: 80%;
    border-radius: 10rpx;
    padding: 0 20rpx;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
