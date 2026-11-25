<template>
    <view>
        <u-navbar :title="kindname" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>

        <!-- 搜索区域 -->
        <view class="searchView">
            <view class="searchInView">
                <u-icon name="search" size="20" color="#999"></u-icon>
                <input class="search-input" v-model="searchValue" type="text" placeholder="搜索区域/工种/地点"
                    placeholder-class="placeholder-style" />
            </view>
        </view>
        <u-line height="1" bgColor="#E5E5E5"></u-line>
        <!-- 筛选区域 -->
        <!-- <view class="chooseViews"> -->
        <!-- <view class="filter-item areaView" @tap="showAreaPicker">
                <picker v-if="areaArr.length > 0" class="areaPicker" mode="selector" @change="areaClick"
                    :value="areaIndex" :range="areaArr">
                    <view class="picker-text">{{ areatitle || '选择区域' }}</view>
                </picker>
                <image class="filter-arrow" src="/static/images/arrow_down.png" mode="aspectFit" />
            </view>

            <view class="filter-item worktypeView" @tap="showWorktypePicker">
                <picker v-if="gongzhongArr.length > 0" class="gongzhongPicker" mode="selector" @change="worktypeClick"
                    :value="worktypeIndex" :range="gongzhongArr">
                    <view class="picker-text">{{ gongzhongtitle || '选择工种' }}</view>
                </picker>
                <image class="filter-arrow" src="/static/images/arrow_down.png" mode="aspectFit" />
            </view> -->
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
        <!-- </view> -->

        <!-- 间隔 -->
        <u-line height="1" bgColor="#E5E5E5"></u-line>

        <!-- 工作列表 -->
        <view style="margin: 10px 10px;">
            <view v-for="(item, index) in dataList" :key="index" class="job-item" @tap="detailClick(item)">
                <!-- 工种和时间 -->
                <view style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                    <text class="work-type"> {{ item.name }} </text>
                    <text class="create-time"> {{ item.create_time }}</text>
                </view>

                <!-- 薪资和操作 -->
                <view
                    style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                    <view class="salary-left">
                        <text class="salary-text"> 想找 </text>
                        <text class="salary-text"> {{ item.work }}</text>
                        <text class="salary-unit">{{ item.salary }}</text>
                    </view>
                    <view style="color: white;background-color: red;border-radius: 5px;padding: 5px; font-size: 13px;"
                        @tap.stop="negotiateJob(item)">洽谈用工</view>
                </view>

                <!-- 分隔线 -->
                <u-line height="1" bgColor="#E5E5E5"></u-line>

                <!-- 公司信息 -->
                <view class="company-info">
                    <text class="company-name"> {{ item.place }} </text>
                </view>

                <!-- 工作地点 -->
                <view class="work-location">
                    <text class="location-text"> {{ item.address }}</text>
                </view>

                <!-- 底部间隔 -->
                <u-gap height="10" bgColor="#f5f5f5"></u-gap>
            </view>

            <!-- 空状态 -->
            <view v-if="dataList.length === 0" class="empty-state">
                <!-- <image class="empty-icon" src="/static/images/empty.png" mode="aspectFit"></image> -->
               <text style="width: 100%; text-align: center;">暂无工作信息</text>
            </view>
        </view>
    </view>


</template>

<script setup lang="ts">
import { dayjobWorkTypeList, dayjobWorkerList as dayjobWorkerListApi } from '@/api/work.ts';

import {
    useCallState
} from '@/uni_modules/tuikit-atomic-x/state/CallState'


import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const type = ref("");

const bgColor = ref("#007AFF");

const dataList = ref(['11', '22', '33', '44', '55', '66', '77', '88', '99']);

const searchValue = ref("");

const index1 = ref(0);

const index2 = ref(0);

const index3 = ref(0);

const array3 = ref(['不限', '有证书', '无证书']);

const array1 = ref(['全潍坊', '奎文', '潍城', '高新区', '寿光', '坊子', '昌乐', '安丘', '诸城', '昌邑', '寒亭', '经开区', '临朐']);

const array2 = ref(['不限']);

const is_paperwork = ref("");

const kindname = ref<any>();

const getworktype = () => {
  dayjobWorkTypeList({
      type: type.value,
      kindName: kindname.value
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
    dayjobWorkerListApi({
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
      dataList.value = res.result;
    });
};

const loadData = () => {

};

const startVideoCall = async(item: any)=>{
	const peerUserID = item.workerId;
    if(!peerUserID){
        uni.showToast({
            title:'无效用户',
            icon:'none'
        })
        return;
    }
    const callState = useCallState();
    await callState.inviteUser({
        userID: peerUserID,
        mediaType:'video'
    });
}

const negotiateJob = (item: any) => {
    const targetUserId = item.workerId;
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
        url: `/pages/scenes/chat/chat/index?conversationID=${encodeURIComponent(conversationID)}`
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

const goBack = () => {
  uni.navigateBack();
};

onMounted(() => {
  loadData();
});

onLoad((options) => {
  kindname.value = options.kindname;
    type.value = options.type;
    dayjobWorkerList();
    getworktype();
});
</script>

<style>
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
