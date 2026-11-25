<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="社群"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
			<template #left>
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			</template>
			<template #right></template>
		</u-navbar>
		
		<scroll-view scroll-x="true" class="tab-scroll">
			<div class="tab-list">
				<div 
				    v-for="tab in tabs" 
				    :key="tab.typeId"
				    :class="['tab', activeTab === tab.typeId ? 'active' : '']"
				    @click="handleTabClick(tab)"
				>
					{{ tab.typeName }}
					<div class="line" v-if="activeTab === tab.typeId"></div>
				</div>
			</div>
		</scroll-view>
		<view style="margin-top: 5px;width: 100%;height: 5px;background-color: aliceblue;width: 100%;"></view>
		<view class="approval_list">
			<view v-if="title === '网格'"
			  class="jingdianView_item"
			  v-for="(item, index) in wanggeList"
			  :key="index" @click="wanggedetail(item)"
			>
			  <view class="topView">
				  <u-image
				    :src="item.gridImg"
				    width="60px"
				    height="60px"
				  ></u-image>
				  <view class="specsView">
				  			  <view style="font-size: 15px;font-weight: bold;">{{item.gridName}}</view>
				  			  <view style="font-size: 13px;">{{item.description}}</view>
				  			  <view style="font-size: 13px;">{{item.num}}人</view>
				  			  
				  </view>
				  
			  </view>
			  <view class="lineV"></view>
			</view>
			<view v-if="title === '已关注'"
			  class="jingdianView_item"
			  v-for="(item, index) in watchList"
			  :key="index" @click="viewdetailClick(item.id)"
			>
			  <view class="topView">
				  <u-image
				    :src="item.chatgroup_avater"
				    width="60px"
				    height="60px"
				  ></u-image>
				  <view class="specsView">
				  			  <view style="font-size: 15px;font-weight: bold;">{{item.chatgroup_name}}</view>
				  			  <view style="font-size: 13px;">{{item.chatgroup_description}}</view>
				  			  <view style="font-size: 13px;">{{item.num}}人</view>
				  			  
				  </view>
				  
			  </view>
			  <view class="lineV"></view>
			</view>
			<view v-if="title !== '已关注' && title !== '网格'"
			  class="jingdianView_item"
			  v-for="(item, index) in otherList"
			  :key="index" @click="ortherdetailClick(item)"
			>
			  <view class="topView">
				  
				  <u-image 
				    :src="item.chatgroup_avater"
				    width="60px"
				    height="60px"
					
				  ></u-image>
				  <view class="specsView">
				  			  <view style="font-size: 15px;font-weight: bold;">{{item.chatgroup_name}}</view>
							  <view style="display: flex;flex-direction: row;width: 100%;">
								  <view style="font-size: 13px;width: 70%;">{{item.chatgroup_description}}</view>
								  <view style="font-size: 13px;color: #2A9595;border: #2A9595 1px solid;border-radius: 4px;width: 60px;height: 25px;display: flex;justify-content: center;align-items: center;margin-left: 10px;" @click.stop="addClick(item)">+关注</view>
							  </view>
				  			  <view style="font-size: 13px;">{{item.num}}人</view>
				  			  
				  </view>
				  
			  </view>
			  <view class="lineV"></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import {
	serviceGetSheQunGrid,
	serviceGetWangGeList,
	serviceWatchList,
	serviceSheQunOtherList,
	serviceAddAttention
} from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const type = ref("1");
const dataParam = ref({
	manageId: '',
});

const activeTab = ref<any>(1);
const tabs = ref<any[]>([
	{ "typeName": "网格", "typeId": "69e2714c-35fd-47f6-b95c-6ea1ee3dferd" },
	{ "typeName": "已关注", "typeId": "69e2714c-35fd-47f6-b95c-6ea1ee6fdehe" },
]);
const page = ref(1);
const wanggeParam = ref({
	deptCode: "",
	page: 0,
	size: 10,
});
const wanggeList = ref<any[]>([]);
const title = ref('');
const watchParam = ref({
	isFollow: "1",
	userId: '',
	page: 0,
	size: 10,
});
const watchList = ref<any[]>([]);
const otherParam = ref({
	typeId: "",
	userId: '',
	page: 0,
	size: 10,
	chatgroupManager: "",
});
const otherList = ref<any[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);

onMounted(() => {
	getGridList();
});

onPullDownRefresh(() => {
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	if (title.value === '网格') {
		getWangGeData();
	} else if (title.value === '已关注') {
		getWatchData();
	} else {
		getOtherData(activeTab.value);
	}
});

onReachBottom(() => {
	if (loading.value || !hasMore.value) {
		return;
	}
	page.value += 1;
	if (title.value === '网格') {
		getWangGeData();
	} else if (title.value === '已关注') {
		getWatchData();
	} else {
		getOtherData(activeTab.value);
	}
});

const getGridList = () => {
	try {
		dataParam.value.manageId = storage.getManid();
		serviceGetSheQunGrid(dataParam.value).then((res: any) => {
			console.log(res);
			res.result.forEach((item: any) => {
				tabs.value.push(item);
			});
			activeTab.value = tabs.value[0].typeId;
			title.value = tabs.value[0].typeName;
			getWangGeData();
		});
	} catch (error) {
		console.log(error);
	}
};

const getWangGeData = () => {
	try {
		wanggeParam.value.deptCode = storage.getManid();
		wanggeParam.value.page = page.value;
		serviceGetWangGeList(wanggeParam.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				wanggeList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					wanggeList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({
					title: '没有更多数据',
					icon: 'none'
				});
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const wanggedetail = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/associateDetail/wangGeDetail?gridNo=' + item.gridNo
	});
};

const getWatchData = () => {
	try {
		watchParam.value.userId = storage.getUserId();
		watchParam.value.page = page.value;
		serviceWatchList(watchParam.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				watchList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					watchList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({
					title: '没有更多数据',
					icon: 'none'
				});
				return;
			}
			if (res.result.length < 10) {
				hasMore.value = false;
				noMore.value = true;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const getOtherData = (typeId: any) => {
	try {
		otherParam.value.userId = storage.getUserId();
		otherParam.value.page = page.value;
		otherParam.value.typeId = typeId;
		otherParam.value.chatgroupManager = storage.getManid();
		serviceSheQunOtherList(otherParam.value).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				otherList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					otherList.value.push(item);
				});
			}
			if (res.result.length === 0) {
				hasMore.value = false;
				noMore.value = true;
				uni.showToast({
					title: '没有更多数据',
					icon: 'none'
				});
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

const handleTabClick = (tab: any) => {
	console.log(tab);
	activeTab.value = tab.typeId;
	title.value = tab.typeName;
	page.value = 1;
	if (title.value === '网格') {
		getWangGeData();
	} else if (title.value === '已关注') {
		getWatchData();
	} else {
		getOtherData(tab.typeId);
	}
};

const viewdetailClick = (id: any) => {
	uni.navigateTo({
		url: '/pages/service/associateDetail/gotoVote?id=' + id
	});
};

const ortherdetailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/associateDetail/othersSheQunDetail?id=' + item.id
	});
};

const addClick = (item: any) => {
	try {
		let param = {
			userId: storage.getUserId(),
			chatgroupId: item.id
		};
		serviceAddAttention(param).then((res: any) => {
			console.log(res);
			uni.showToast({ title: '关注成功', icon: 'none' });
			getOtherData(activeTab.value);
		});
	} catch (error) {
		console.log(error);
	}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  .tab-scroll {
    white-space: nowrap;
    width: 100%;
    
    .tab-list {
      display: inline-flex;
      padding: 0 10rpx;
      
      .tab {
        position: relative;
        padding: 20rpx 30rpx;
        font-size: 28rpx;
        color: #666;
        cursor: pointer;
        
        &.active {
          color: #2A9595;
          font-weight: bold;
        }
        
        .line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background-color: #2A9595;
          border-radius: 2rpx;
        }
      }
    }
  }

  .approval_list {
    .jingdianView_item {
      padding: 15px;
      
      .topView {
        display: flex;
        flex-direction: row;
        
        .specsView {
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
      
      .lineV {
        margin-top: 15px;
        width: 100%;
        height: 1px;
        background-color: #e0e0e0;
      }
    }
  }
}
</style>