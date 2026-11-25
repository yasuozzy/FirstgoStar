<template>
	<view class="main">
		<u-navbar
		  title="我浏览的"
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
		<view style="width: 100%;display: flex;flex-direction: column;margin-top: 10px;">
			<view class="list-item" v-for="(item,index) in dataList" :key="index" @click="zhuzhaiDetail(item)">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<u-image v-if="styleType == 1" style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
					  :src="item.picture"
					  width="110px"
					  height="100px"
					></u-image>
					<u-image v-if="styleType == 2 && type == 1" style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
					  :src="item.housePicture"
					  width="110px"
					  height="100px"
					></u-image>
					<u-image v-if="styleType == 2 && type == 2" style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
					  :src="item.picture"
					  width="110px"
					  height="100px"
					></u-image>
					<view style="width: 70%;height: 100px;display: flex;flex-direction: column;margin-bottom: 15px;">
						<view v-if="styleType == 1" style="width: 100%;
							  margin-left: 10px;
							  display: flex;
							  flex-direction: row;
							  margin-top: 3px;margin-top: 10px;">
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.releaseType}}</view>
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.rentalType}}</view>
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.decoration}}</view>
						</view>
						<view v-if="styleType == 2 && type == 1" style="width: 100%;
							  margin-left: 10px;
							  display: flex;
							  flex-direction: row;
							  margin-top: 3px;margin-top: 10px;">
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.releaseType}}</view>
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.decoration}}</view>
						</view>
						<view v-if="styleType == 2 && type == 2" style="width: 100%;
							  margin-left: 10px;
							  display: flex;
							  flex-direction: row;
							  margin-top: 3px;margin-top: 10px;">
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.houseType}}</view>
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{item.shopType}}</view>
						</view>
						<view v-if="styleType == 1" style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.rentalTitle}}</view>
						<view v-if="styleType == 2 && type == 1" style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.rentalTitle}}</view>
						<view v-if="styleType == 2 && type == 2" style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.title}}</view>
						<view v-if="styleType == 1" style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.communityName}}</view>
						<view v-if="styleType == 2 && type == 1" style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.communityName}}</view>
						<view v-if="styleType == 2 && type == 2" style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.locationName}}</view>
						<view v-if="styleType == 1" style="font-size: 13px;margin-top: 5px;margin-left: 10px;color: red;">{{item.monthlyRent}}</view>
						<view v-if="styleType == 2 && type == 1" style="display: flex;flex-direction: row;">
							<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;color: red;">{{item.price}}</view>
							<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.builtArea}}</view>
						</view>
						<view v-if="styleType == 2 && type == 2" style="font-size: 13px;margin-top: 5px;margin-left: 10px;color: red;">{{item.selling_price}}万</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		serviceHouseMineReview,
		serviceHouseMineCollections,
		serviceHouseMineReported,
		serviceBuyHouseMineReview,
		serviceBuyHouseMineCollections,
		serviceBuyHouseMineReported,
		serviceBuyShopMineReview,
		serviceBuyShopMineCollections,
		serviceBuyShopMineReported
	} from '@/api/service';
	
	import { storage } from '@/utils/storage';
	import { ref, reactive } from 'vue';
	import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const loading = ref(false);      // 是否正在加载
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const dataList = ref<any[]>([]);
	const type = ref<any>('');
	const styleType = ref<any>('');
	const fixType = ref<any>('');
	const params = reactive<any>({});

	const loadRentReviewData = () => {
		try {
			serviceHouseMineReview(params).then((res: any) => {
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

	const loadRentCollectionData = () => {
		try {
			serviceHouseMineCollections(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadRentReportedData = () => {
		try {
			serviceHouseMineReported(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadBuyHouseReviewData = () => {
		try {
			serviceBuyHouseMineReview(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadBuyHouseCollectionData = () => {
		try {
			serviceBuyHouseMineCollections(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadBuyHouseReportedData = () => {
		try {
			serviceBuyHouseMineReported(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadBuyShopReviewData = () => {
		try {
			serviceBuyShopMineReview(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadBuyShopCollectionData = () => {
		try {
			serviceBuyShopMineCollections(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const loadBuyShopReportedData = () => {
		try {
			serviceBuyShopMineReported(params).then((res: any) => {
				console.log(res);
				if (page.value === 1) {
					dataList.value = res.result;
				} else {
					res.result.forEach((item: any) => {
						dataList.value.push(item);
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

	const zhuzhaiDetail = (item: any) => {
		if (styleType.value == 1) {
			uni.navigateTo({
				url: '/pages/service/HouseInformation/zhuazhaiDetail?id=' + item.id
			});
		} else if (styleType.value == 2) {
			if (type.value == 1) {
				uni.navigateTo({
					url: '/pages/service/HouseInformation/buyHouseDetail?id=' + item.id
				});
			} else if (type.value == 2) {
				uni.navigateTo({
					url: '/pages/service/HouseInformation/buyShopDetail?saleId=' + item.saleId
				});
			}
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	const initData = () => {
		if (styleType.value == 1) {
			if (type.value == 1) {
				if (fixType.value == 1) {
					loadRentReviewData();
				} else if (fixType.value == 2) {
					loadRentCollectionData();
				} else if (fixType.value == 3) {
					loadRentReportedData();
				}
			}
		} else if (styleType.value == 2) {
			if (type.value == 1) {
				if (fixType.value == 1) {
					loadBuyHouseReviewData();
				} else if (fixType.value == 2) {
					loadBuyHouseCollectionData();
				} else if (fixType.value == 3) {
					loadBuyHouseReportedData();
				}
			} else if (type.value == 2) {
				if (fixType.value == 1) {
					loadBuyShopReviewData();
				} else if (fixType.value == 2) {
					loadBuyShopCollectionData();
				} else if (fixType.value == 3) {
					loadBuyShopReportedData();
				}
			}
		}
	};

	//下拉刷新
	onPullDownRefresh(() => {
		// 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loading.value = false;
		params.page = page.value;
		initData();
	});

	//上拉刷新
	onReachBottom(() => {
		if (loading.value || !hasMore.value) {
			return;
		}
		page.value += 1;
		params.page = page.value;
		initData();
	});

	onLoad((options: any) => {
		type.value = options.type;
		styleType.value = options.styleType;
		fixType.value = options.fixType;
		console.log(styleType.value, type.value, fixType.value);
		
		Object.assign(params, {
			userId: storage.getUserId(),
			page: page.value,
			size: 10,
		});
		
		initData();
	});
</script>

<style lang="scss" scoped>
	.main {
		  min-height: 100vh;
		       width: 100%;
		       background-color: aliceblue;
		  .list-item{
		  	display: flex;
		  	flex-direction: column;
		  	margin-left: 4%;
		  	width: 92%;
		  	height: 130px;
		  	border-radius: 5px;
		  	background-color: white;
		  	margin-top: 10px;
		  }
	}
</style>