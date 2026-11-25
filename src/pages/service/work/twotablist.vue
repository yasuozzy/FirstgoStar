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
            <picker style="display: flex;flex-direction: row;align-items: center;" @change="bindPickerChange1"
                :value="index1" :range="array1">
                <view class="picker-item">
                    {{ array1[index1] }}
                </view>
                <u-icon name="arrow-down" size="20" color="#999"></u-icon>
            </picker>

            <!-- 第二个选择器 -->
            <picker style="display: flex;flex-direction: row;align-items: center;" @change="bindPickerChange2"
                :value="index2" :range="array2">
                <view class="picker-item">
                    {{ array2[index2] }}
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
                    <text class="work-type"> {{ item.work_type }}</text>
                    <text class="create-time"> {{ item.create_time }}</text>
                </view>

                <!-- 薪资和操作 -->
                <view
                    style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;
					 margin-bottom: 2px;">
                    <view class="salary-left">
                        <text class="salary-text"> {{ item.salary }}</text>
                        <text class="salary-unit" v-if="item.salary">元/月</text>
                    </view>
                    <view style="color: white;background-color: red;border-radius: 5px;padding: 5px; font-size: 13px;"
                        @tap.stop="negotiateJob(item)">洽谈用工</view>
                </view>

                <!-- 分隔线 -->
                <u-line height="1" bgColor="#E5E5E5" style="margin-top: 7px;margin-bottom: 7px;"></u-line>

                <!-- 公司信息 -->
                <view class="company-info">
                    <text class="company-name"> {{ item.company }}</text>
                </view>

                <!-- 工作地点 -->
                <view style="margin-top: 7px;">
                    <text class="location-text"> {{ item.work_location }}</text>
                </view>

                <!-- 底部间隔 -->
                <u-gap height="10" bgColor="#f5f5f5"></u-gap>
            </view>

            <!-- 空状态 -->
            <view v-if="dataList.length === 0"
                style=" display: flex;flex-direction: column;justify-content: center;align-items: center;min-height: 50vh; width: 100%;">
                <!-- <image class="empty-icon" src="/static/images/empty.png" mode="aspectFit"></image> -->
                <text style=" text-align: center;color: #999;font-size: 14px;">暂无工作信息</text>
            </view>
        </view>
    </view>


</template>

<script setup lang="ts">
import { dayjobCompanyList, dayjobWorkTypeList } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const kindname = ref("");

const type = ref(1);

const bgColor = ref("#007AFF");

const dataList = ref([]);

const searchValue = ref("");

const index1 = ref(0);

const index2 = ref(0);

const array1 = ref(['全潍坊', '奎文', '潍城', '高新区', '寿光', '坊子', '昌乐', '安丘', '诸城', '昌邑', '寒亭', '经开区', '临朐']);

const array2 = ref(['不限']);

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

const getworklist = () => {
  dayjobCompanyList({
      userId: storage.getUserId(),
      region: array1.value[index1.value] === '全潍坊' ? '' : array1.value[index1.value],
      work_type: array2.value[index2.value] === '不限' ? '' : array2.value[index2.value],
      index: searchValue.value,
      size: "50",
      work_kind: kindname.value,
      page: 1
    }).then(res => {
      console.log(res);
      dataList.value = res.result;
    });
};

const detailClick = (item) => {
  // uni.navigateTo({
  //     // url: '/pages/service/work/twotablistdetail?mMessageId=' + item.id
  //   });
};

const negotiateJob = (item: any) => {
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
        url: `/pages/scenes/chat/chat/index?conversationID=${encodeURIComponent(conversationID)}`
    });
};


const bindPickerChange1 = (e) => {
  index1.value = e.detail.value;
    getworklist();
};

const bindPickerChange2 = (e) => {
  index2.value = e.detail.value;
    getworklist();
};

const goBack = () => {
  uni.navigateBack();
};

onMounted(() => {

});

onLoad((options) => {
  kindname.value = options.kindname;
    type.value = options.type;
	console.log(kindname.value+"="+type.value);
    getworktype();
    getworklist();
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