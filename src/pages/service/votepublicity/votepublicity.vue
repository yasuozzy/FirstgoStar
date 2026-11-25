<template>
    <view class="main">
        <u-navbar
          title="投票公示"
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
		<view class="opinionListView">
			<view class="opinion_item" v-for="(item,index) in opinionList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view class="headerView">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.title}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;">公示日期:{{item.pub_date}}</view>
					</view>
					<view style="margin-top: 15px;margin-left: 20px;font-size: 13px;color: white;background-color: #2A9595;height: 30px;display: flex; justify-content: center;border-radius: 4px;width: 80px; align-items: center;">查看详情</view>
				</view>
				<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceVoteGongShiList } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const opinionList = ref<any[]>([]);
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
			man_id: storage.getManid(),
			page: page.value,
			size: 20,
		};
		serviceVoteGongShiList(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				opinionList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					opinionList.value.push(item);
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
	uni.navigateTo({
		url: '/pages/service/votepublicity/votepublicityDetail?id=' + item.id
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
		.opinionListView{
				 display: flex;
				 flex-direction: column;
				 .opinion_item{
				 	display: flex;
				 	flex-direction: column;
				 	.headerView{
				 		display: flex;
				 		flex-direction: column;
						width: 70%;
				 	}
				 }
		}
    }
</style>