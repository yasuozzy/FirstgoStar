<template>
    <view class="main">
        <u-navbar
          title="历史记录"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="list-item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="margin-top: 10px;margin-left: 15px;display: flex;flex-direction: row;">
					<view style="display: flex;flex-direction: column;width: 200px;height: 60px;">
						<view v-if="item.maintainType == 1" style="font-size: 13px;">应急</view>
						<view v-if="item.maintainType == 2" style="font-size: 13px;">室内报修</view>
						<view v-if="item.maintainType == 3" style="font-size: 13px;">公共设施</view>
						<view v-if="item.maintainType == 4" style="font-size: 13px;">平台报修</view>
						<view style="font-size: 12px;margin-top: 10px;">{{item.repairTime}}</view>
					</view>
					<view style="display: flex;flex-direction: row;width: 150px;height: 60px;align-items: right;">
						<view v-if="item.tache == 1 && item.state == 1" class="statusView">待处理</view>
						<view v-if="item.tache == 1 && item.state == 2" class="statusView">已分派</view>
						<view v-if="item.tache == 2 && item.state == 1" class="statusView">已接单</view>
						<view v-if="(item.tache == 2 && item.state == 2) || item.state == 6" class="statusView">已报价</view>
						<view v-if="(item.tache == 2 && item.state == 3) || item.state == 7" class="statusView">待支付</view>
						<view v-if="item.tache == 2 && item.state == 4" class="statusView">维修中</view>
						<view v-if="item.tache == 2 && item.state == 5" class="statusView">已暂停</view>
						<view v-if="item.tache == 3 && item.state == 1 && item.finishedSign === ''" class="statusView">待确认完成</view>
						<view v-if="item.tache == 3 && item.state == 1 && item.finishedSign == 0" class="statusView">未完成</view>
						<view v-if="item.tache == 3 && item.state == 1 && item.finishedSign == 1" class="statusView">待评价</view>
						<view v-if="item.tache == 3 && item.state == 2" class="statusView">申诉中</view>
						<view v-if="item.tache == 4" class="statusView">已完成</view>
						<view v-if="item.tache == 5" class="statusView">已取消</view>
						<view v-if="item.tache == 6" class="statusView">工单失败</view>
						<u-image style="margin-top: 22px;margin-left: 10px;width: 10px;"
						  :src="myArrow"
						  width="8px"
						  height="12px"
						></u-image>
					</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceGetPingTaiHistoryData, serviceGetPingTaiHistoryDataDetail } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const dataList = ref<any[]>([]);
const myArrow = ref('/static/service/my_arrow.png');
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);
const page = ref(1);

onMounted(() => {
	loadData();
});

onPullDownRefresh(() => {
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

const loadData = () => {
	try {
		let param = {
			repairUId: storage.getUserId(),
			page: page.value,
			size: 10,
			maintainType: "",
		};
		serviceGetPingTaiHistoryData(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				dataList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					dataList.value.push(item);
				});
			}

			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({ title: '没有更多数据', icon: 'none' });
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		uni.stopPullDownRefresh();
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const detailClick = (item: any) => {
	try {
		let param = {
			repairList: item.repairList ? item.repairList : '',
		};
		serviceGetPingTaiHistoryDataDetail(param).then((res: any) => {
			console.log(res);
		});
	} catch (error) {
		console.log(error);
	}
	uni.navigateTo({
		url: '/pages/service/pingtaiCheck/projectDetail'
	});
};
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .list-item{
		 width: 100%;
		 height: 90px;
		 display: flex;
		 flex-direction: column;
	 }
	 .statusView{
		 margin-top: 20px;
		 font-size: 12px;
		 width: 130px;
		 text-align: right;
	 }
    }
</style>