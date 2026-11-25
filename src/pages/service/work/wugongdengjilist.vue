<template>
	<view style="background-color: aliceblue;">
		<u-navbar title="劳务登记" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
<view  @click="goBack">
				<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
			</view>
</template>
		</u-navbar>
		<u-line height="1" bgColor="#E5E5E5"></u-line>
		<view>
			<view v-for="(item, index) in dataList" :key="index" class="job-item" @tap="detailClick(item)"
				style="padding: 10px 10px; background: white;border-radius: 5px;margin-top: 5px;">
				<!-- 工种和时间 -->
				<view style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
					<text class="work-type"> {{ item.work }}</text>
					<text class="create-time" style="color: red;"> {{ item.salary }}</text>
				</view>

				<!-- 薪资和操作 -->
				<view style="display: flex; flex-direction: row;  align-items: center; margin-bottom: 2px;">
					<view class="salary-left">
						<text class="salary-text"> {{ item.name }}</text>
					</view>
				</view>

				<!-- 分隔线 -->
				<u-line height="1" bgColor="#E5E5E5"></u-line>
				<view style="display: flex;flex-direction: row;justify-content: flex-end;padding: 5px 0px;">
					<view @click.stop="edit(item)" v-if="item.status === 0"
						style="display: flex; border: 1px solid #2a9598; border-radius: 4px;padding: 2px 5px;margin-right: 15px;color: #2a9598;">
						编辑 </view>
					<view @click.stop="kaiqi(item)" v-if="item.status === 1 && item.is_open == 0"
						style="display: flex; border: 1px solid #2a9598; border-radius: 4px;padding: 2px 5px;margin-right: 15px;color: #2a9598;">
						开启 </view>
					<view @click.stop="guanbi(item)" v-if="item.status === 1 && item.is_open == 1"
						style="display: flex; border: 1px solid #2a9598; border-radius: 4px;padding: 2px 5px;margin-right: 15px;color: #2a9598;">
						关闭 </view>
					<view @click.stop="shanchu(item)" v-if="item.status === 2||item.status === 1"
						style="display: flex; border: 1px solid #2a9598; border-radius: 4px;padding: 2px 5px;margin-right: 15px;color: #2a9598;">
						删除 </view>
				</view>

			</view>

			<!-- 空状态 -->
			<view v-if="dataList.length === 0" class="empty-state">
				<!-- <image class="empty-icon" src="/static/images/empty.png" mode="aspectFit"></image> -->
				<text style="width: 100%; text-align: center;justify-content: center;">暂无工作信息</text>
			</view>
		</view>
	</view>


</template>

<script setup lang="ts">
import { wugongdengjiList, closeWorkerInfo, openeWorkerInfo, deleteWorkerInfo } from '@/api/work.ts';

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const kindname = ref("");

const type = ref(1);

const bgColor = ref("#2A9598");

const dataList = ref([]);

const searchValue = ref("");

const index1 = ref(0);

const index2 = ref(0);

const kaiqi = (item) => {
  openeWorkerInfo({
      id: item.id
    }).then(res => {
      console.log(res);
      getworklist();
    });
};

const guanbi = (item) => {
  closeWorkerInfo({
      id: item.id
    }).then(res => {
      console.log(res);
      getworklist();
    });
};

const shanchu = (item) => {

		uni.showModal({									
			cancelText:'取消',
			confirmText:'确定',
			confirmColor:'#2A9595',
			title:'提示',
			content:'确定要删除吗？',
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确定');
					deleteWorkerInfo({
						id: item.id
					}).then(res => {
					console.log(res);
					getworklist();
					});
				}else
				{
					console.log('取消')
				}
			}
		});


  
};

const getworklist = () => {
  wugongdengjiList({
      userId: storage.getUserId(),
      size: "50",
      page: 1
    }).then(res => {
      console.log(res);
      dataList.value = res.result;
    });
};

const detailClick = (item) => {
  uni.navigateTo({
      // url: '/pages/service/work/twotablistdetail?mMessageId=' + item.id
    });
};

const edit = (item) => {
  uni.navigateTo({
      url: '/pages/service/work/wugongdengji?id=' + item.id
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