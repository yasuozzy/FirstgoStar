<template>
    <view class="main">
        <u-navbar
          title="去选举"
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
          <template #right>
            <view @click="mycollection">
              <view class="homestayView">我的选举</view>
            </view>
          </template>
        </u-navbar>
		<view class="opinionListView">
			<view class="opinion_item" v-for="(item,index) in opinionList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view class="headerView">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.title}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: dimgray;">起止日期:{{item.start_date}}--{{item.end_date}}</view>
					</view>
					<view style="margin-top: 15px;margin-left: 20px;font-size: 13px;color: white;background-color: #2A9595;height: 30px;display: flex; justify-content: center;border-radius: 4px;width: 80px; align-items: center;">查看详情</view>
				</view>
				<view style="background-color: aliceblue;margin-top: 10px;width: 100%;height: 1px;"></view>

			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceGoToElectList } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const opinionList = ref<any[]>([]);
	const loading = ref(false);   // 是否正在加载
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);    // 是否没有更多数据了
	const page = ref(1);

	const loadData = () => {
		try {
			let param = {
				man_id: storage.getManid(),
				page: page.value,
				size: 20,
			};
			serviceGoToElectList(param).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					opinionList.value = res.result;
				} else {
					// 正确的数组合并方式
					res.result.forEach((item: any) => {
						opinionList.value.push(item);
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

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	//我的选举
	const mycollection = () => {
		uni.navigateTo({
			url: '/pages/service/gotoElect/myelection'
		});
	};

	const detailClick = (item: any) => {
		uni.navigateTo({
			url: '/pages/service/gotoElect/gotoelectDetail?id=' + item.id
		});
	};

	//下拉刷新
	onPullDownRefresh(() => {
		// 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loading.value = false;
		loadData();
	});

	//上拉刷新
	onReachBottom(() => {
		if (loading.value || !hasMore.value) {
			return;
		}
		page.value += 1;
		loadData();
	});

	onLoad(() => {
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
