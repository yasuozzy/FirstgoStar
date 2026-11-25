<template>
    <view>
        <!-- <text>{{ message }}</text> -->
        <!-- <text>{{ postid }}</text> -->
        <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
        <scroll-view :style="{ height: swiperHeight + 'px' }" scroll-y="true" refresher-enabled="true"
            :refresher-triggered="triggered" :refresher-threshold="50" refresher-background="white"
            @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
            @refresherabort="onAbort" style="background-color: #F5F6F8">


            <u-list @scrolltolower="scrolltolower">
                <u-list-item v-for="(item, index) in loaddata" :key="index"
                    style="padding: 5px;margin: 5px; background-color: white;border-radius: 5px;">
                    <view class="job-item" style="padding: 5px;font-size: 13px;" @tap="detailClick(item)">
                        <!-- 工种和时间 -->
                        <view style="display: flex;flex-direction: row;justify-content: space-between;">
                            <view class="work-type"><text v-if="type === 1">个人申请免费援助</text><text v-else>个人申请委托服务</text>
                            </view>
                            <text class="create-time"> {{ item.statusFlag }} </text>

                        </view>
                        <view class="work-type">姓名:{{ item.name }}</view>
                        <view class="work-type">联系电话：{{ item.mobile }}</view>
                        <view class="work-type"><text v-if="item.status === 1 || item.status == 0">申请理由：{{ item.ask_type
                                }}</text><text v-else>服务事项：{{ item.ask_type }}</text></view>
                        <view class="work-type"><text v-if="item.status === 1 || item.status == 0">期望援助结果:{{
                            item.expect }}</text><text v-else>处理结果:{{ item.expect }}</text></view>

                        <view style="display: flex;flex-direction: row;justify-content: space-between;">
                            <view class="work-type" v-if="message === 0 && item.status === 5">{{ item.stop_reason }}
                            </view>
                            <view style="display: flex; flex-direction: row; justify-content:flex-end; flex: 1;">
                                <!-- <text
                                    style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                    去处理{{ message }}{{ item.status }} </text> -->
                                <text @click.stop="deal(item.id)" v-if="item.status === 1"
                                    style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                    去处理 </text>
                                <text @click.stop="showd(item.id, '暂停')" v-if="item.status === 2"
                                    style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                    暂停 </text>
                                <text @click.stop="deal(item.id)" v-if="item.status === 3"
                                    style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                    开启 </text>
                                <text @click.stop="showd(item.id, '停止')" v-if="item.status === 2"
                                    style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                    停止 </text>
                                <text @click.stop="fankui(item.id, item.ask_type)" v-if="item.status === 2"
                                    style="color: white;background-color: #2a9598;border-radius: 4px;padding: 2px 5px;margin: 2px 5px;">
                                    反馈结果 </text>
                            </view>

                        </view>


                        <u-gap height="10" bgColor="#f5f5f5"></u-gap>
                    </view>
                </u-list-item>
            </u-list>
        </scroll-view>
        <u-popup :show="show" @close="closePopup" mode="center" border-radius="10">
            <view style="width: 85%; padding: 20px; background-color: #fff; border-radius: 10px;">
                <!-- 标题 -->
                <view style="font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 15px;">
                    {{ dialogtitle }}
                </view>

                <!-- 输入框 -->
                <textarea v-model="detailAddress" placeholder="请填写原因"
                    style="width: 100%; height: 100px; font-size: 14px; padding: 10px; box-sizing: border-box; border: 1px solid #eee; border-radius: 5px; background-color: #f9f9f9;"></textarea>

                <!-- 按钮组 -->
                <view style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <!-- 取消按钮 -->
                    <view @click="closePopup"
                        style="flex: 1; height: 40px;padding-left: 20px;padding-right: 20px; line-height: 40px; text-align: center; background-color: #f5f5f5; color: #666; border-radius: 5px; margin-right: 30px;margin-left: 20px;">
                        取消
                    </view>
                    <!-- 提交按钮 -->
                    <view @click="submitClick"
                        style="flex: 1; height: 40px;padding-left: 20px;padding-right: 20px; line-height: 40px; text-align: center; background-color: #2a9598; color: white; border-radius: 5px; margin-left: 30px;margin-right: 20px;">
                        提交
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { getPlatSendApplyList, dealWithApply, stopApply, pauseApply } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onActivated, onDeactivated, onMounted, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const emit = defineEmits();

const loaddata = ref([]);

const searchValue = ref("");

const swiperHeight = ref(500);

const isRefreshing = ref(false);

const triggered = ref(false);

const dialogtitle = ref("");

const thiscurrentItemid = ref("");

const detailAddress = ref("");

const show = ref(false);

const _freshing = ref<any>();

const getList = () => {
  getPlatSendApplyList({
      page: 1,
      size: 50,
      status: props.postid,
      is_free: props.message,
      userId: storage.getUserId()
    }).then(res => {
      console.log("获取列表成功", res);
      loaddata.value = res.result;
    }).catch(err => {});
};

const showd = (id, title) => {
  dialogtitle.value = title;
    thiscurrentItemid.value = id;
    show.value = true;
};

const fankui = (id, ask_type) => {
  uni.navigateTo({
      url: "/pages/service/work/lawservicefeedback?id=" + id + "&isPay=" + props.message + "&type=" + ask_type
    });
};

const closePopup = () => {
  show.value = false;
    detailAddress.value = ""; // 清空输入内容
    thiscurrentItemid.value = "";
};

const deal = (id) => {
  dealWithApply({
      id: id
    }).then(res => {
      console.log("处理成功", res);
      getList();
    }).catch(err => {});
};

const submitClick = () => {
  if (!detailAddress.value || detailAddress.value.trim() === "") {
      uni.showToast({
        title: '请填写原因',
        icon: 'none'
      });
      return;
    }
    if (dialogtitle.value === "暂停") {
      pauseApply({
        id: thiscurrentItemid.value,
        reason: detailAddress.value,
        userType: props.message
      }).then(res => {
        console.log("暂停成功", res);
        getList();
        closePopup();
        show.value = true;
      }).catch(err => {});
    } else if (dialogtitle.value === "停止") {
      stopApply({
        id: thiscurrentItemid.value,
        reason: detailAddress.value
      }).then(res => {
        console.log("停止成功", res);
        getList();
        closePopup();
        show.value = true;
      }).catch(err => {});
    }
};

const detailClick = (item) => {
  uni.navigateTo({
      url: "/pages/service/work/companyapplydetail?id=" + item.id + "&type=" + item.type + "&isUser=false"
    });
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
