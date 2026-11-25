<template>
    <view class="main">
		<view class="custom-navbar">
		  <view class="navbar-content">
		    <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		    <view class="search-container">
		      <u-search 
		        placeholder="输入查询内容" 
		        v-model="keyword" 
		        :show-action="false"
		        shape="square"
		        bg-color="#f5f5f5"
		      ></u-search>
		    </view>
			<view style="color: white;font-size: 14px;margin-left: 10px;margin-bottom: -22px;" @click="searchClick">搜索</view>
		  </view>
		</view>
        <view v-if="statusType === '1'" class="activityListView">
        	<view class="list_item" v-for="(item,index) in DataList" :key="index" @click="detailClick(item)">
        		<u-image  :src="item.pic"
        					 width="375px" 
        					height="100px">
        		</u-image>
        		<view style="display: flex;flex-direction: row;width: 100%;height: 20px;">
        			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">{{item.title}}</view>
        			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: #2A9595;width: 40%;text-align: right;">{{item.actTime}}</view>
        		</view>
        		<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
        			<u-image style="margin-top: 12px;margin-left: 15px;" :src="locationAddress"
        						  width="12px"
        						  height="15px"></u-image>
        			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.distance}}</view>
        			<u-image style="margin-top: 12px;margin-left: 15px;" :src="stbuilding"
        						  width="15px"
        						  height="15px"></u-image>
        			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.street_name}}</view>
        			<u-image style="margin-top: 12px;margin-left: 15px;" :src="ifgroup"
        						  width="15px"
        						  height="15px"></u-image>
        			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.max_num}}人</view>
        			<view v-if="item.actStatusFlag === '活动进行中'" style="background-color: #2A9595;" class="buttonView" >
        				<u-image style="margin-top: 3px;margin-left: 15px;" :src="arcoDesign"
        							  width="15px"
        							  height="15px"></u-image>
        				<view style="color: white;font-size: 13px;">活动报名中</view>
        			</view>
        			<view v-if="item.actStatusFlag === '报名已截止' || item.actStatusFlag === '活动已结束'" style="background-color: lightgray" class="buttonView" >
        				<u-image style="margin-top: 3px;margin-left: 15px;" :src="arcoDesign"
        							  width="15px"
        							  height="15px"></u-image>
        				<view style="color: white;font-size: 13px;">活动已结束</view>
        			</view>
        		</view>			  
        		<view style="margin-top: 30px;width: 100%;height: 10px;background-color: aliceblue;"></view>			 
        	</view>
        </view>
		<view v-if="statusType === '2'" class="orgList">
			<view class="org_item" v-for="(item,index) in DataList" :key="index" @click="detailClick(item)">
				<view class="iconView">
					<u-avatar style="margin-left: 15px;margin-top: 10px;"
					  :src="item.head_img"
					  number="25px"
					></u-avatar>
					<view style="display: flex;flex-direction: column;margin-left: 10px;">
						<view style="margin-top: 10px;font-size: 14px;">{{item.name}}</view>
						<view style="margin-top: 5px;font-size: 12px;">{{item.address}}</view>
					</view>
				</view>
				<view style="display: flex;flex-direction: row;background-color: lightgray;margin-top: 10px;">
					<view style="display: flex;flex-direction: column;align-items: center;width: 50%;height: 40px;">
						<view style="font-size: 12px;color: #2A9595;margin-top: 3px;">{{item.actNum}}</view>
						<view style="font-size: 12px;">公益次数</view>
					</view>
					<view style="width: 1px;height: 40px;background-color: gray;"></view>
					<view style="display: flex;flex-direction: column;align-items: center;width: 50%;height: 40px;">
						<view style="font-size: 12px;color: #2A9595;margin-top: 3px;">{{item.volNum}}</view>
						<view style="font-size: 12px;">组织人数</view>
					</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: dimgray;"></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceFindActivityList, serviceFindOrganizationList } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const DataList = ref<any[]>([]);
const statusType = ref('');
const type = ref('');
const longitude = ref<any>('');
const latitude = ref<any>('');
const type_id = ref('');
const street_id = ref('');
const keyword = ref('');
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);
const page = ref(1);
const sortType = ref('');
const locationAddress = ref('/static/integral/locationAddress.png');
const searchImage = ref('/static/mine/searchImage.png');
const stbuilding = ref('/static/mine/stbuilding.png');
const ifgroup = ref('/static/mine/ifgroup.png');
const arcoDesign = ref('/static/mine/arcoDesign.png');

onLoad((options: any) => {
	statusType.value = options.type || '';
	if (statusType.value === '1') {
		uni.getLocation({
			success: (res: any) => {
				console.log(res);
				latitude.value = res.latitude;
				longitude.value = res.longitude;
			}
		});
	}
});

onPullDownRefresh(() => {
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	if (statusType.value === '1') {
		loadActData();
	} else if (statusType.value === '2') {
		loadOrgData();
	}
});

onReachBottom(() => {
	if (loading.value || !hasMore.value) {
		return;
	}
	page.value += 1;
	if (statusType.value === '1') {
		loadActData();
	} else if (statusType.value === '2') {
		loadOrgData();
	}
});

const loadActData = () => {
	try {
		let param = {
			page: page.value,
			size: 20,
			latitude: latitude.value,
			longitude: longitude.value,
			type: type.value,
			type_id: type_id.value,
			street_id: street_id.value,
			index: keyword.value,
		};
		serviceFindActivityList(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				DataList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					DataList.value.push(item);
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
			type: type.value,
			type_id: type_id.value,
			street_id: street_id.value,
			index: keyword.value,
			sortType: sortType.value,
		};
		serviceFindOrganizationList(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				DataList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					DataList.value.push(item);
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

const searchClick = () => {
	page.value = 1;
	hasMore.value = true;
	noMore.value = false;
	loading.value = false;
	if (statusType.value === '1') {
		loadActData();
	} else if (statusType.value === '2') {
		loadOrgData();
	}
};

const goBack = () => {
	uni.navigateBack();
};

const detailClick = (item: any) => {
	if (statusType.value === '1') {
		uni.navigateTo({
			url: '/pages/service/volunteerQunYuan/activityDetail?id=' + item.id + '&longitude=' + longitude.value + '&latitude=' + latitude.value
		});
	} else if (statusType.value === '2') {
		uni.navigateTo({
			url: '/pages/service/volunteerQunYuan/findOrgDetail?id=' + item.id
		});
	}
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
	 .custom-navbar {
	   position: fixed;
	   top: 0;
	   left: 0;
	   right: 0;
	   z-index: 999;
	   background-color: #2A9595;
	   box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	 }
	 .navbar-content {
	   display: flex;
	   align-items: center;
	   padding: 0 20rpx;
	   height: 88rpx;
	 }
	 .search-container {
	   flex: 1;
	   margin-left: 20rpx;
	   margin-top: 20px;
	 }
	 .activityListView{
		 margin-top: 50px;
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 .list_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 height: 220px;
		 }
	 }
	 .buttonView{
		 display: flex;
		 flex-direction: row;
		 margin-top: 10px;
		 margin-left: 60px;
		 border-radius: 4px;
		 width: 100px;
		 height: 20px;
	 }
	 .orgList{
		 margin-top: 50px;
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 .org_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 height: 120px;
		 }
	 }
	 .iconView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 50px;
	 }
    }
</style>