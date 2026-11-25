<template>
    <view>
        <!-- <text>{{ message }}</text> -->
        <!-- <text>{{ postid }}</text> -->
        <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
        <view class="searchView">
            <view class="searchInView">
                <u-icon name="search" size="20" color="#999"></u-icon>
                <input class="search-input" v-model="searchValue" type="text" placeholder="搜索区域/工种/地点"
                    placeholder-class="placeholder-style" />
            </view>
        </view>
        <view class="row">
            <!-- 第一个选择器 -->
            <picker style="display: flex;flex-direction: row;align-items: center; " @change="bindPickerChange1"
                :value="index1" :range="array1">
                <view class="picker-item">
                    {{ array1[index1] }}
                </view>
                <u-icon name="arrow-down" size="20" color="#999"></u-icon>
            </picker>

            <!-- 第二个选择器 -->
            <picker style="display: flex;flex-direction: row;align-items: center; " @change="bindPickerChange2"
                :value="index2" :range="array2">
                <view class="picker-item">
                    {{ array2[index2] }}
                </view>
                <u-icon name="arrow-down" size="20" color="#999"></u-icon>
            </picker>
            <!-- 第二个选择器 -->
            <picker style="display: flex;flex-direction: row;align-items: center; " @change="bindPickerChange3"
                :value="index3" :range="array3">
                <view class="picker-item">
                    {{ array3[index3] }}
                </view>
                <u-icon name="arrow-down" size="20" color="#999"></u-icon>
            </picker>
        </view>
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
                            <text class="work-type"> {{ item.work_type }} </text>
                            <text class="create-time"> {{ item.create_time }} </text>
                        </view>

                        <!-- 薪资和操作 -->
                        <view
                            style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                            <view class="salary-left">
                                <text class="salary-text"> {{ item.salary }} </text>

                            </view>
                            <view
                                style="color: white;background-color: red;border-radius: 5px;padding: 5px; font-size: 13px;"
                                @tap.stop="negotiateJob(item)">洽谈用工</view>
                        </view>

                        <!-- 分隔线 -->
                        <u-line height="1" bgColor="#E5E5E5"></u-line>

                        <!-- 公司信息 -->
                        <view class="company-info">
                            <text class="company-name"> {{ item.company }} </text>
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
        <u-modal :content="content" :show="show3" showCancelButton closeOnClickOverlay @confirm="confirm"
            @cancel="() => show3 = false"></u-modal>
    </view>
</template>

<script setup lang="ts">
import { dayjobWorkTypeList, getQiuZhiJobList, getYnSubmitWorkerInfo } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onActivated, onDeactivated, onMounted, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const emit = defineEmits();

const loaddata = ref([]);

const searchValue = ref("");

const index1 = ref(0);

const index2 = ref(0);

const index3 = ref(0);

const array3 = ref(['不限', '有证书', '无证书']);

const array1 = ref(['全潍坊', '奎文', '潍城', '高新区', '寿光', '坊子', '昌乐', '安丘', '诸城', '昌邑', '寒亭', '经开区', '临朐']);

const array2 = ref(['不限']);

const is_paperwork = ref("");

const swiperHeight = ref(500);

const isRefreshing = ref(false);

const triggered = ref(false);

const content = ref("填写您的求职信息，开始求职，此信息将被展示给招聘者");

const show3 = ref(false);

const kindname = ref<any>();

const _freshing = ref<any>();

const negotiateJob = (item) => {
	
  getYnSubmitWorkerInfo({
      userId: storage.getUserId()
    }).then(res => {
      console.log(res);
      if (res.result) {
		  
		  const targetUserId = item.comId;
		  if (!targetUserId) {
		      uni.showToast({
		          title: '无法获取用工方用户ID',
		          icon: 'none'
		      });
		      return;
		  }
		  // C2C 单聊会话 ID
		  const conversationID = `c2c_${targetUserId}`;
		  console.log('洽谈用工:', {
		      targetUserId,
		      conversationID
		  });
		  uni.navigateTo({
		      url: `/pages/scenes/chat/chat/index?show=true&type=6&conversationID=${encodeURIComponent(conversationID)}`
		  });
		  
        // uni.navigateTo({
        //   url: "/pages/service/work/ChatAgreement6"
        // });
      } else {
        show3.value = true;
        this.$toast.fail("请先发布求职信息");
        uni.navigateTo({
			url: "/pages/service/work/fabuqiuzhi",
        });
      }
    });
};

const confirm = () => {
  show3.value = false;
    uni.navigateTo({
      url: "/pages/service/work/fabuqiuzhi"
    });
};

const getworktype = () => {
  dayjobWorkTypeList({
      // type: "",
      // kindName: "",
    }).then(res => {
      console.log(res);
      res.result.forEach(item => {
        array2.value.push(item.name);
      });
    });
};

const dayjobWorkerList = () => {
  if (index3.value == 0) {
      is_paperwork.value = "";
    } else if (index3.value == 1) {
      is_paperwork.value = "1";
    } else if (index3.value == 2) {
      is_paperwork.value = "0";
    }
    getQiuZhiJobList({
      userId: storage.getUserId(),
      page: 1,
      size: "50",
      region: array1.value[index1.value] === '全潍坊' ? '' : array1.value[index1.value],
      work_type: array2.value[index2.value] === '不限' ? '' : array2.value[index2.value],
      index: searchValue.value,
      is_paperwork: is_paperwork.value,
      work_kind: kindname.value
    }).then(res => {
      console.log(res);
      loaddata.value = res.result;
    });
};

const bindPickerChange1 = (e) => {
  index1.value = e.detail.value;
    dayjobWorkerList();
};

const bindPickerChange2 = (e) => {
  index2.value = e.detail.value;
    dayjobWorkerList();
};

const bindPickerChange3 = (e) => {
  index3.value = e.detail.value;
    dayjobWorkerList();
};

const sendDataToParent = () => {
  emit("message", "Hello from Child");
};

const scrolltolower = () => {
  console.log("scrolltolower");
    // this.loadmore();
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
      dayjobWorkerList();
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
    dayjobWorkerList();
    getworktype();
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
