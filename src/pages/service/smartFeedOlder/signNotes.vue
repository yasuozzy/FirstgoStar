<template>
    <view class="main">
        <u-navbar
          title="签到记录"
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
		<view class="listView">
			<view class="list_item" v-for="(item,index) in orderList" :key="index">
				<view style="margin-left: 10px;display: flex;flex-direction: row;width: 98%;">
					<view style="font-size: 13px;width: 60%;margin-top: 10px;">{{item.service_user_name}}{{item.clock_in_date}}</view>
					<view v-if="item.statusFlag === '签到成功'" style="font-size: 13px;color:#2A9595;width: 30%;text-align: right;margin-top: 10px;margin-left: 10px;">{{item.statusFlag}}</view>
					<view v-if="item.statusFlag === '签到缺失'" style="font-size: 13px;color:red;width: 30%;text-align: right;margin-top: 10px;margin-left: 10px;">{{item.statusFlag}}</view>
				</view>
				<view style="margin-left: 10px;display: flex;flex-direction: row;margin-top: 10px;margin-bottom: 10px;">
					<view style="font-size: 13px;margin-top: 10px;">服务签到</view>
					<view class="gridView">
						<view :class="getButtonClass(1, item.recordList)"  @click="detailClick(1, item.recordList)">签到</view>
						<view :class="getButtonClass(2, item.recordList)"  @click="detailClick(2, item.recordList)">签退</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view style="font-size: 13px;">打卡时间：{{clock_in_time}}</view>
				<view style="font-size: 13px;">打卡地点：{{location}}</view>
				<view style="font-size: 13px;">打卡类型：{{typeFlag}}</view>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { ServiceHomeCareGotoSignRecordList, ServiceHomeCareGotoSignRecordDetail } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const orderList = ref<any[]>([]);
const show = ref(false);
const title = ref('签到记录');
const signTime = ref('2025-07-2 09:25:33');
const signLocatiom = ref('都昌街道花园小区');
const signStatus = ref('已签到');
const order_id = ref('');
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);
const page = ref(1);
const clock_in_time = ref('');
const location = ref('');
const typeFlag = ref('');

onLoad((options: any) => {
	order_id.value = options.order_id || '';
});

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
			page: page.value,
			size: 20,
			order_id: order_id.value,
			service_user_id: storage.getUserId(),
		};
		ServiceHomeCareGotoSignRecordList(param).then((res: any) => {
			console.log(res);
			const resultData = res.result || [];
			for (let index = 0; index < resultData.length; index++) {
				const element = resultData[index];
				const completeArray = [
					...(element.recordList || []),
					...Array(2 - (element.recordList ? element.recordList.length : 0)).fill({ recordId: 'c1ae55fc395e40e881916fcdcf9faaa0', type: 0 })
				];
				element.recordList = completeArray;
			}
			if (page.value === 1) {
				orderList.value = resultData;
			} else {
				resultData.forEach((item: any) => {
					orderList.value.push(item);
				});
			}

			if (resultData.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({ title: '没有更多数据', icon: 'none' });
				return;
			}
			if (resultData.length < 10) {
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

const getButtonClass = (typeNum: number, recordList: any[]) => {
	if (!recordList) return 'buttonView';
	const record = recordList.find((item: any) => item.type === typeNum);
	return record ? 'blueView' : 'buttonView';
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const detailClick = (typeNum: number, recordList: any[]) => {
	if (!recordList) return;
	const record = recordList.find((item: any) => item.type === typeNum);
	if (record) {
		try {
			let param = { id: record.recordId };
			ServiceHomeCareGotoSignRecordDetail(param).then((res: any) => {
				console.log(res);
				clock_in_time.value = res.result.clock_in_time;
				location.value = res.result.location;
				typeFlag.value = res.result.typeFlag;
				show.value = true;
			});
		} catch (error) {
			console.log(error);
		}
	}
};

const confirm = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped>
    .main {
        min-height: 100vh;
        width: 100%;
		background-color: aliceblue;
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
	 .listView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 .list_item{
			 display: flex;
			 flex-direction: column;
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 background-color: white;
			 border-radius: 5px;
		 }
	 }
	 .gridView{
		 display: flex;
		 flex-direction: row;
		 margin-left: 10px;
	 }
	 .blueView{
		 width: 45px;
		 height: 30px;
		 background-color: #2A9595;
		 border-radius: 4px;
		 color: white;
		 font-size: 13px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 margin-left: 10px;
	 }
	 .buttonView{
		 width: 45px;
		 height: 30px;
		 background-color: lightgray;
		 border-radius: 4px;
		 color: white;
		 font-size: 13px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 margin-left: 10px;
	 }
}
</style>