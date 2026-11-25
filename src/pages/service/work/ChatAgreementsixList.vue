<template>
    <view class="main">
        <u-navbar
          title="我的协议"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
<view class="u-nav-slot" >
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
</template>
        </u-navbar>
		<input class="searchlocation" v-model="index" placeholder="搜索" type="text" />
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工工种</view>
							<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.work_type}}</view>
						</view>
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">签订时间</view>
							<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.create_time}}</view>
						</view>
					</view>
					<u-image style="margin-top: 20px;margin-left: 15px;"
					  :src="myArrow"
					  width="20px"
					  height="20px"
					></u-image>
				</view>
				<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { MineJiuYeQunYuanUseWorkerMyProtocalList } from '@/api/mine.ts';

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const userType = ref('');

const orderList = ref([]);

const loading = ref(false);

const hasMore = ref(true);

const noMore = ref(false);

const page = ref(1);

const myArrow = ref('/static/service/my_arrow.png');

const index = ref('');

const loadData = () => {
  try {
      let param = {
        userId: storage.getUserId(),
        page: page.value,
        size: 20,
        index: index.value,
        userType: 0
      };
      MineJiuYeQunYuanUseWorkerMyProtocalList(param).then(res => {
        console.log(res);
        if (page.value === 1) {
          orderList.value = res.result;
        } else {
          // 正确的数组合并方式
          res.result.forEach(item => {
            orderList.value.push(item);
          });
        }
        if (res.result.length === 0) {
          // 没有更多数据了
          hasMore.value = false;
          noMore.value = true;
          uni.showToast({
            title: '没有更多数据',
            icon: 'none'
          });
          return;
        }
        // 如果返回的数据少于每页数量，说明是最后一页
        if (result.data.length < 10) {
          hasMore.value = false;
          noMore.value = true;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      wx.stopPullDownRefresh();
    }
};

const detailClick = (item) => {
  uni.navigateTo({
      url: '/pages/mine/LingGongOrder/myProtocalDetail?id=' + item.id + '&userType=' + userType.value
    });
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((options) => {
  userType.value = options.userType;
});

onMounted(() => {
  loadData();
});

onPullDownRefresh(() => {
  // 重置状态
    page.value = 1;
    hasMore.value = true;
    noMore.value = false;
    loading.value = false;
    loadData();
});

onReachBottom(() => {
  if (loading.value || !hasMore.value) {
      return;
    }
    page.value += 1;
    loadData();
});
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
           .searchlocation{
				margin-left: 4%;
				width: 92%;
				height: 30px;
				margin-top: 10px;
				border: 1px lightgray solid;
				border-radius: 5px;
				font-size: 13px;
			}
			.listItem{
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 80px;
			}
    }
</style>