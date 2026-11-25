<template>
    <view class="main">
        <u-navbar
          title="租房"
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
            <view @click="homestayClick">
              <view style="display: flex;flex-direction: row;">
				  <u-image style="margin-right: 10px;"
				    :src="mesImage"
				    width="20px"
				    height="20px"
					@click="mymessageClcik"
				  ></u-image>
				  <u-image style="margin-right: 10px;"
				    :src="myiconImg"
				    width="20px"
				    height="20px"
					@click="mypageClick"
				  ></u-image>
			  </view>
            </view>
          </template>
        </u-navbar>
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">住宅</view>
				<view v-else style="color: black;font-size: 15px;">住宅</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">商铺</view>
				<view  v-else style="color: black;font-size: 15px;">商铺</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			
		</view>
		<input class="searchlocation" v-model="keyword" @confirm="gosearch" placeholder="🔍搜索" type="text" />
		<view v-if="type === '1'" style="width: 100%;display: flex;flex-direction: column;margin-top: 10px;">
			<view class="list-item" v-for="(item,index) in dataList" :key="index" @click="zhuzhaiDetail(item)">
				<u-image style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
				  :src="item.picture"
				  width="110px"
				  height="90px"
				></u-image>
				<view style="width: 70%;height: 100px;display: flex;flex-direction: column;">
					<view style="width: 100%;
			 			  margin-left: 10px;
			 			  display: flex;
			 			  flex-direction: row;
						  margin-top: 3px;margin-top: 10px;">
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.releaseType}}</view>
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.rentalType}}</view>
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.decoration}}</view>
					</view>
					
					<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.rentalTitle}}</view>
					<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.communityName}}</view>
					<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;color: red;">{{item.monthlyRent}}</view>
				</view>
			</view>
		</view>
		<view v-if="type === '2'" style="width: 100%;display: flex;flex-direction: column;margin-top: 10px;">
			<view class="list-item" v-for="(item,index) in shopList" :key="index" @click="detailClick(item)">
				<u-image style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
				  :src="item.picture"
				  width="110px"
				  height="90px"
				></u-image>
				<view style="width: 70%;height: 100px;display: flex;flex-direction: column;">
					<view style="width: 100%;
			 			  margin-left: 10px;
			 			  display: flex;
			 			  flex-direction: row;
						  margin-top: 3px;margin-top: 10px;">
						
						<view style="border: 1px solid blue;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.houseType}}</view>
						<view style="border: 1px solid blue;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.shopType}}</view>
					</view>
					
					<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.title}}</view>
					<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.locationName}}</view>
					<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;color: red;">{{item.monthRent}}元/月</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceHouseInfoHouseList, serviceHouseInfoShopList } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const mesImage = ref("/static/service/message.png");
	const myiconImg = ref('/static/service/myIconImage.png');
	const type = ref("1");
	const dataList = ref<any[]>([]);
	const shopList = ref<any[]>([]);
	const loading = ref(false);      // 是否正在加载
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const keyword = ref('');
	const styleType = ref<any>('');

	const loadData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				content: keyword.value,
				page: page.value,
				size: 10,
			};
			serviceHouseInfoHouseList(param).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					// 正确的数组合并方式
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadShopData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				content: keyword.value,
				page: page.value,
				size: 10,
			};
			serviceHouseInfoShopList(param).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					shopList.value = res.result;
				} else {
					// 正确的数组合并方式
					res.result.forEach((item: any) => {
						shopList.value.push(item);
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

	const homestayClick = () => {};

	//切换segment
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
		loadShopData();
	};

	//住宅详情
	const zhuzhaiDetail = (item: any) => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/zhuazhaiDetail?id=' + item.id
		});
	};

	//店铺详情
	const detailClick = (item: any) => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/rentshopDetail?rentId=' + item.rentId
		});
	};

	//我的消息
	const mymessageClcik = () => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/myMessage'
		});
	};

	const mypageClick = () => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/myPage?styleType=' + styleType.value + '&type=' + type.value
		});
	};

	const gosearch = (e: any) => {
		console.log(e.detail);
		console.log(keyword.value);
		if (keyword.value === '') {
			uni.showToast({
				title: '请输入搜索内容',
				icon: 'none',
			});
			return;
		}
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loading.value = false;
		dataList.value = [];
		if (type.value === '1') {
			loadData();
		} else if (type.value === '2') {
			loadShopData();
		}
	};

	//下拉刷新
	onPullDownRefresh(() => {
		// 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loading.value = false;
		if (type.value === '1') {
			loadData();
		} else if (type.value === '2') {
			loadShopData();
		}
	});

	//上拉刷新
	onReachBottom(() => {
		if (loading.value || !hasMore.value) {
			return;
		}
		page.value += 1;
		if (type.value === '1') {
			loadData();
		} else if (type.value === '2') {
			loadShopData();
		}
	});

	onLoad((options: any) => {
		styleType.value = options.styleType;
		console.log(styleType.value);
		loadData();
	});
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
		  width: 100%;
          background-color: aliceblue;
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
	 .searchlocation{
	          margin-left: 4%;
	          width: 92%;
	          height: 35px;
	          margin-top: 10px;
	          border: 1px darkgray solid;
	          border-radius: 10px;
	          font-size: 13px;
			  background-color: white;
	}
	.list-item{
		display: flex;
		flex-direction: row;
		margin-left: 4%;
		width: 92%;
		height: 120px;
		border-radius: 5px;
		background-color: white;
		margin-top: 10px;
	}
    }
</style>