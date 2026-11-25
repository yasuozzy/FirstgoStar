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
                    <view class="job-item" style="padding: 5px;" @tap="detailClick(item)">
                        <!-- 工种和时间 -->
                        <view
                            style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                            <text class="work-type"> {{ item.work_type }} {{ item.work_num }}</text>
                            <text class="create-time"> {{ item.create_time }} </text>
                        </view>

                        <!-- 薪资和操作 -->
                        <view
                            style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                            <view class="salary-left">
                                <text class="salary-text" style="color: red;"> {{ item.salary }} </text>
                            </view>
                            <view
                                style="color: white;background-color: #2a9598;border-radius: 5px;padding: 5px; font-size: 13px;"
                                @click.stop="negotiateJob(item)">查看信息</view>
                        </view>

                        <!-- 分隔线 -->
                        <u-line height="1" bgColor="#E5E5E5"></u-line>

                        <!-- 公司信息 -->
                        <view class="company-info">
                            <text class="company-name">{{ item.company }}</text>
                        </view>

                        <!-- 工作地点 -->
                        <view class="work-location">
                            <text class="location-text"> {{ item.work_location }} </text>
                        </view>

                        <!-- 底部间隔 -->
                        <u-gap height="10" bgColor="#f5f5f5"></u-gap>
                    </view>
                </u-list-item>
            </u-list>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { getQiYeYongGongList } from "@/api/work.ts";

import { storage } from "@/utils/storage";

import { onActivated, onDeactivated, onMounted, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const emit = defineEmits();

const loaddata = ref(['11', '22', '33', '44', '55', '66', '77', '88', '99']);

const searchValue = ref("");

const index1 = ref(0);

const index2 = ref(0);

const index3 = ref(0);

const array3 = ref(['不限', '有证书', '无证书']);

const array1 = ref(['区域', '类型A', '类型B']);

const array2 = ref(['工种', '状态1', '状态2']);

const swiperHeight = ref(500);

const isRefreshing = ref(false);

const triggered = ref(false);

const page = ref(1);

const hasMore = ref(true);

const _freshing = ref<any>();

const getworktype = (page) => {
  getQiYeYongGongList({
      page: page,
      size: 10,
      userId: storage.getUserId()
    }).then(res => {
      console.log(res);
      if (page === 1) {
        loaddata.value = res.result;
      } else {
        loaddata.value = loaddata.value.concat(res.result);
      }
      if (res.result && res.result.length == 10) {
        hasMore.value = true;
      } else {
        hasMore.value = false;
      }
      // res.result.forEach((item) => {
      //     this.array2.push(item.name);
      // });
    });
};

const negotiateJob = (item) => {
  console.log("查看信息", item);
    uni.navigateTo({
      url: "/pages/service/work/qiyeyonggongdetail?jobId=" + item.id
    });
};

const sendDataToParent = () => {
  emit("message", "Hello from Child");
};

const scrolltolower = () => {
  console.log("scrolltolower");
    loadmore();
};

const loadmore = () => {
  if (!hasMore.value) return;
    page.value++;
    getworktype(page.value);
    // for (let i = 0; i < 10; i++) {
    //     this.loaddata.push("https://uviewui.com/album/" + i + ".jpg");
    // }
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
    page.value = 1;
    getworktype(page.value);
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
    getworktype(page.value);
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
