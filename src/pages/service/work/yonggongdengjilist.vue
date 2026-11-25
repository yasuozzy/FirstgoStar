<template>
    <view>
        <u-navbar title="用工登记" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
        <scroll-view class="list-container" scroll-y refresher-enabled :refresher-triggered="isRefreshing"
            @refresherrefresh="onRefresh" @scrolltolower="onLoadMore" :lower-threshold="50">
            <u-gap height="10" bgColor="#f5f5f5"></u-gap>
            <view style="padding: 10px; background-color: white;border-radius: 5px;margin: 7px;"
                v-for="(value, index) in registerList" :key="index">
                <view style="font-size: 13px;">
                    <view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                        <view>{{ value.work_type }}</view>
                        <view style="color: red;">{{ value.salary }}</view>
                    </view>
                    <view style="margin-bottom: 5px;"> <text style="margin-right:10px ;">{{ value.company }}</text><text
                            style="margin-right:10px ;">{{
                                value.work_time
                            }}</text><text style="margin-right:10px ;">{{ value.work_num }}</text></view>
                    <u-line color="#e5e5e5"></u-line>
                    <view
                        style="display: flex;flex-direction: row;justify-content: flex-end;align-items: center;margin-top: 10px;">
                        <view @click="onSignContract(value)"
                            style="color: #2a9598; border: 1px solid #2a9598; border-radius: 4px; padding: 4px 8px;margin-right: 10px;">
                            网签协议
                        </view>
                        <view v-if="value.status === 1 && value.is_plat === 0" @click="onApplyRecruit(value)"
                            style="color: #2a9598; border: 1px solid #2a9598; border-radius: 4px; padding: 4px 8px;margin-right: 10px;">
                            申请代招
                        </view>
                        <view v-if="value.status === 1 && value.is_open === 0" @click="onOpen(value)"
                            style="color: #2a9598; border: 1px solid #2a9598; border-radius: 4px; padding: 4px 8px;margin-right: 10px;">
                            打开
                        </view>
                        <view v-if="value.status === 1 && value.is_open === 1" @click="onClose(value)"
                            style="color: #2a9598; border: 1px solid #2a9598; border-radius: 4px; padding: 4px 8px;margin-right: 10px;">
                            关闭
                        </view>
                        <view v-if="value.status === 0" @click="onEdit(value)"
                            style="color: #2a9598; border: 1px solid #2a9598; border-radius: 4px; padding: 4px 8px;margin-right: 10px;">
                            编辑
                        </view>
                        <view v-if="value.status === 2" @click="onDelete(value)"
                            style="color: #2a9598; border: 1px solid #2a9598; border-radius: 4px; padding: 4px 8px;margin-right: 10px;">
                            删除
                        </view>
                    </view>
                </view>
            </view>
            <!-- 加载状态提示 -->
            <!-- <view class="loading-tip" v-if="registerList.length > 0">
                <text v-if="isLoading">加载中...</text>
                <text v-else-if="isNoMore">没有更多了</text>
            </view> -->

            <!-- 空状态 -->
            <!-- <view class="empty-state" v-if="registerList.length === 0 && !isLoading">
                <u-empty mode="list" text="暂无用工登记"></u-empty>
            </view> -->
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage';

import { getMyCompanyDayJobList, deleteInfo, closeInfo, openInfo, applyPlatInfo } from '@/api/work.ts';

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const registerList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const currentPage = ref(1);

const pageSize = ref(10);

const total = ref(0);

const isRefreshing = ref(false);

const isLoading = ref(false);

const isNoMore = ref(false);

const loadData = (isRefresh = false) => {
  if (isRefresh) {
      currentPage.value = 1;
      isNoMore.value = false;
    }
    if (isNoMore.value && !isRefresh) {
      return;
    }
    isLoading.value = true;
    let param = {
      userId: storage.getUserId(),
      page: currentPage.value,
      size: pageSize.value
    };
    getMyCompanyDayJobList(param).then(res => {
      console.log('获取列表成功', res);
      if (res.success || res.resultCode === 200) {
        const newList = res.result || res.data || [];
        total.value = res.total || 0;
        if (isRefresh) {
          registerList.value = newList;
        } else {
          registerList.value = [...registerList.value, ...newList];
        }

        // 判断是否还有更多数据
        if (registerList.value.length >= total.value || newList.length < pageSize.value) {
          isNoMore.value = true;
        }
      }
    }).catch(err => {
      console.error('获取列表失败', err);
      uni.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }).finally(() => {
      isLoading.value = false;
      isRefreshing.value = false;
    });
};

const onRefresh = () => {
  isRefreshing.value = true;
    loadData(true);
};

const onLoadMore = () => {
  if (isLoading.value || isNoMore.value) {
      return;
    }
    currentPage.value++;
    loadData(false);
};

const onDelete = (item) => {
  uni.showModal({
      title: '提示',
      content: '确定要删除这条记录吗？',
      success: res => {
        if (res.confirm) {
          deleteInfo({
            userId: storage.getUserId(),
            id: item.id
          }).then(res => {
            if (res.success || res.resultCode === 200) {
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              });
              loadData(true);
            }
          }).catch(err => {
            uni.showToast({
              title: '删除失败',
              icon: 'none'
            });
          });
        }
      }
    });
    // deleteInfo({
    //     userId: storage.getUserId(),
    //     id: 1
    // }).then(res => {
    //     console.log(res)
    // })
};

const onClose = (item) => {
  closeInfo({
      userId: storage.getUserId(),
      id: item.id
    }).then(res => {
      if (res.success || res.resultCode === 200) {
        uni.showToast({
          title: '关闭成功',
          icon: 'success'
        });
        loadData(true);
      }
    }).catch(err => {
      uni.showToast({
        title: '操作失败',
        icon: 'none'
      });
    });
    // closeInfo({
    //     userId: storage.getUserId(),
    //     id: 1
    // }).then(res => {
    //     console.log(res)
    // })
};

const onOpen = (item) => {
  openInfo({
      userId: storage.getUserId(),
      id: item.id
    }).then(res => {
      if (res.success || res.resultCode === 200) {
        uni.showToast({
          title: '开启成功',
          icon: 'success'
        });
        loadData(true);
      }
    }).catch(err => {
      uni.showToast({
        title: '操作失败',
        icon: 'none'
      });
    });
    // openInfo({
    //     userId: storage.getUserId(),
    //     id: 1
    // }).then(res => {
    //     console.log(res)
    // })
};

const onApplyRecruit = (item) => {
  applyPlatInfo({
      userId: storage.getUserId(),
      id: item.id
    }).then(res => {
      if (res.success || res.resultCode === 200) {
        uni.showToast({
          title: '申请成功',
          icon: 'success'
        });
      }
    }).catch(err => {
      uni.showToast({
        title: '申请失败',
        icon: 'none'
      });
    });
};

const onSignContract = (item) => {
  const itemStr = encodeURIComponent(JSON.stringify(item));
    uni.navigateTo({
      url: '/pages/service/work/yonggongdengjiwangqianxieyi?item=' + itemStr
    });
    // uni.showToast({
    // title: '网签协议功能开发中',
    // icon: 'none'
    // });
};

const onEdit = (item) => {
  uni.navigateTo({
      url: '/pages/service/work/registupdateworker?id=' + item.id
    });
    // uni.showToast({
    //     title: '编辑功能开发中',
    //     icon: 'none'
    // });
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e) => {
  loadData(true);
});
</script>

<style scoped>
.list-container {
    height: calc(100vh - 44px);
    background-color: #F5F6F8;
}

.loading-tip {
    text-align: center;
    padding: 20rpx;
    color: #999;
    font-size: 26rpx;
}

.empty-state {
    padding: 100rpx 0;
}
</style>