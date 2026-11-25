<template>
    <view class="main">
        <u-navbar
          title="积分捐赠"
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
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in donationList" :key="index" @click="donateClick">
				<view style="margin-left: 3%;width: 94%;align-items: center;display: flex;flex-direction: row;background-color: white;height: 80px;align-items: center;">
					<u-image style="margin-left: 30px;border-radius: 4px;"
					  :src="item.head_img"
					  width="30px"
					  height="30px"
					></u-image>
					<view style="margin-left: 5px;font-size: 14px;">{{item.donated_name}}</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceLoveBangDonateList } from '@/api/service';

const bgColor = ref("#2A9595");
const donationList = ref<any[]>([]);
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
			page: page.value,
			size: 20,
		};
		serviceLoveBangDonateList(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				donationList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					donationList.value.push(item);
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

const donateClick = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/gotoDonate'
	});
};
</script>

<style lang="scss" scoped>
    .main {
         background-color: aliceblue;
         min-height: 100vh;
         width: 100%;
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
	 .contentListView{
		 width: 100%;
		 display: flex;
		 flex-wrap: wrap;
		 .content_item{
			 border-radius: 5px;
			 box-sizing: border-box;
			 width: 50%;
			 height: 80px;
			 margin-top: 10px;
		 }
	 }
    }
</style>