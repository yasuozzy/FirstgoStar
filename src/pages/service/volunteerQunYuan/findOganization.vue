<template>
    <view class="main">
        <u-navbar
          title="组织"
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
            <view @click="searchClick">
                <u-image
                  :src="normalImg"
                  width="20px"
                  height="20px"
                ></u-image>
            </view>
          </template>
        </u-navbar>
		<view class="segmentView">
			<view class="disdance" @click="open('1')">
				<view style="margin-top: 10px;margin-left: 10px;">{{street_name}}</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="hotImage"
							  width="12px"
							  height="7px"></u-image>
			</view>
			<view class="disdance" @click="open('2')">
				<view style="margin-top: 10px;margin-left: 10px;">{{serviceName}}</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="hotImage"
							  width="12px"
							  height="7px"></u-image>
			</view>
			<view class="disdance" @click="open('3')">
				<view style="margin-top: 10px;margin-left: 10px;">{{smartName}}</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="hotImage"
							  width="12px"
							  height="7px"></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view class="orgList">
			<view class="org_item" v-for="(item,index) in organizationList" :key="index" @click="detailClick(item)">
				<view class="iconView">
					<u-avatar style="margin-left: 15px;margin-top: 10px;"
					  :src="item.head_img"
					  size="25px"
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
		<uni-popup ref="popup" >
			<view v-if="searchType === '1'"  style="background-color: white;margin-top: 110px;margin-left: 5px;width: 120px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in locationList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;margin-bottom: 10px;" @click="locationClick(index)">{{item}}</view>
				</view>		
			</view>
			<view v-if="searchType === '2'"  style="background-color: white;margin-top: 95px;margin-left: 130px;width: 120px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in servicetitleArr" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;margin-bottom: 10px;" @click="serviceClick(index)">{{item}}</view>
				</view>		
			</view>
			<view v-if="searchType === '3'"  style="background-color: white;margin-top: 95px;margin-left: 250px;width: 120px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in smartList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;margin-bottom: 10px;" @click="smartClick(index)">{{item}}</view>
				</view>		
			</view>
		</uni-popup>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { serviceFindOrganizationList, serviceFindActivitygetStreetList, serviceFindActivitygetServiceList } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const hotImage = ref("/static/home/downImage.png");
const normalImg = ref('/static/mine/searchImage.png');
const organizationList = ref<any[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const noMore = ref(false);
const page = ref(1);
const sortType = ref('');
const type = ref('');
const type_id = ref('');
const street_id = ref('');
const index = ref('');
const streetList = ref<any[]>([]);
const searchType = ref('');
const locationList = ref<any[]>([]);
const street_name = ref('全市');
const serviceList = ref<any[]>([]);
const servicetitleArr = ref<any[]>([]);
const serviceName = ref('服务类型');
const smartList = ref(['人数最多', '次数最多']);
const smartName = ref('智能筛选');
const popup = ref<any>(null);

onMounted(() => {
	loadData();
	getStreetList();
	getServiceList();
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
			type_id: type_id.value,
			street_id: street_id.value,
			index: index.value,
			sortType: sortType.value,
		};
		serviceFindOrganizationList(param).then((res: any) => {
			console.log(res);
			if (page.value === 1) {
				organizationList.value = res.result;
			} else {
				res.result.forEach((item: any) => {
					organizationList.value.push(item);
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

const getStreetList = () => {
	try {
		let param = {};
		serviceFindActivitygetStreetList(param).then((res: any) => {
			console.log(res.result);
			streetList.value = res.result;
			locationList.value = res.result.map((item: any) => item.street_name);
		});
	} catch (error) {
		console.log(error);
	}
};

const getServiceList = () => {
	try {
		let param = {};
		serviceFindActivitygetServiceList(param).then((res: any) => {
			console.log(res.result);
			serviceList.value = res.result;
			servicetitleArr.value = res.result.map((item: any) => item.name);
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const searchClick = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/searchActAndOrg?type=2'
	});
};

const open = (typeStr: string) => {
	searchType.value = typeStr;
	if (popup.value) popup.value.open('top');
};

const locationClick = (idx: number) => {
	if (popup.value) popup.value.close();
	street_name.value = locationList.value[idx];
	street_id.value = streetList.value[idx].street_id;
	page.value = 1;
	loadData();
};

const serviceClick = (idx: number) => {
	if (popup.value) popup.value.close();
	serviceName.value = servicetitleArr.value[idx];
	type_id.value = serviceList.value[idx].id;
	page.value = 1;
	loadData();
};

const smartClick = (idx: number) => {
	if (popup.value) popup.value.close();
	smartName.value = smartList.value[idx];
	sortType.value = (idx + 1).toString();
	page.value = 1;
	loadData();
};

const detailClick = (item: any) => {
	uni.navigateTo({
		url: `/pages/service/volunteerQunYuan/findOrgDetail?id=${item.id}`
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
	 .segmentView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 45px;
	 }
	 .disdance{
		 margin-top: 10px;
		 margin-left: 10px;
		 height: 25px;
		 font-size: 13px;
		 width: 110px;
		 border-radius: 4px;
		 border: 1px lightgray solid;
		 display: flex;
		 flex-direction: row;
	 }
	 .orgList{
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