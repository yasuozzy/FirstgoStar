<template>
    <view class="main">
        <u-navbar
          title="爱心榜"
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
            <view @click="pointsClick">
                <view class="homestayView">积分捐赠</view>
            </view>
          </template>
        </u-navbar>
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">个人</view>
				<view v-else style="color: black;font-size: 15px;">个人</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">组织</view>
				<view  v-else style="color: black;font-size: 15px;">组织</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
		</view>
		<view v-if="type ==='1'" class="headerV">
			<view style="margin-left: 5%;width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">名次</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">姓名</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">分数</view>
		</view>
		<view v-if="type ==='2'" class="headerV">
			<view style="margin-left: 5%;width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">名次</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">组织名称</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">完成次数</view>
		</view>
		<view v-if="type ==='1'" class="contentView">
			<view class="content_item" v-for="(item,index) in personnalList" :key="index">
				<view style="margin-left: 5%;width: 29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">
					<view v-if="index ===0 ||index === 1 || index === 2" style="height: 20px;width: 20px;background-color: red;border-radius: 10px;align-items: center;display: flex; justify-content: center;color: white;">{{index+1}}</view>
					<view v-else style="height: 20px;width: 20px;align-items: center;display: flex; justify-content: center;">{{index+1}}</view>
				</view>
				<view style="width: 29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">{{item.user_name}}</view>
				<view style="width:29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: red;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;" >{{item.sumScore}}</view>
			</view>
		</view>
		<view v-if="type ==='2'" class="contentView">
			<view class="content_item" v-for="(item,index) in orgnizationList" :key="index">
				<view style="margin-left: 5%;width: 29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">
					<view v-if="index ===0 ||index === 1 || index === 2" style="height: 20px;width: 20px;background-color: red;border-radius: 10px;align-items: center;display: flex; justify-content: center;color: white;">{{index+1}}</view>
					<view v-else style="height: 20px;width: 20px;align-items: center;display: flex; justify-content: center;">{{index+1}}</view>
				</view>
				<view style="width: 29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">{{item.org_name}}</view>
				<view style="width:29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: red;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;" >{{item.num}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceLoveBangPersonal, serviceLoveBangOrganization } from '@/api/service';

const bgColor = ref("#2A9595");
const type = ref("1");
const personnalList = ref<any[]>([]);
const orgnizationList = ref<any[]>([]);
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
	if (type.value === '1') {
		loadData();
	} else if (type.value === '2') {
		loadOrgData();
	}
});

onReachBottom(() => {
	if (loading.value || !hasMore.value) {
		return;
	}
	page.value += 1;
	if (type.value === '1') {
		loadData();
	} else if (type.value === '2') {
		loadOrgData();
	}
});

const loadData = () => {
	try {
		let param = {
			page: page.value,
			size: 20,
		};
		serviceLoveBangPersonal(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				personnalList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					personnalList.value.push(item);
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

const loadOrgData = () => {
	try {
		let param = {
			page: page.value,
			size: 20,
		};
		serviceLoveBangOrganization(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				orgnizationList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					orgnizationList.value.push(item);
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

const segment1Click = () => {
	type.value = "1";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadData();
};

const segment2Click = () => {
	type.value = "2";
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	loadOrgData();
};

const pointsClick = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/donatePoints'
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 50px;
	 }
	 .whiteLine{
	 		 margin-left: 40%;
	 		 margin-top: 5px;
	 		 width: 20%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .headerV{
		 width: 100%;
		 display: flex;
		 flex-direction: row;
		 margin-top: 10px;
	 }
	 .contentView{
		 width: 100%;
		 display: flex;
		 flex-direction: column;
		 .content_item{
			 width: 100%;
			 display: flex;
			 flex-direction: row;
		 }
	 }
    }
</style>