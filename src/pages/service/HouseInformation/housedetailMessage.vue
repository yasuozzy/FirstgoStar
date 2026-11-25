<template>
    <view class="main">
        <u-navbar
          title="我的租房"
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
			<view class="list-item" v-for="(item,index) in shopList" :key="index">
				<view style="width: 96%;height: 20px;margin-top: 10px;text-align: right;font-size: 13px;color: #2A9595;">{{item.statusFlag}}</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="width: 100%;display: flex;flex-direction: row;">
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
							  margin-top: 10px;">
							
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;">{{item.houseType}}</view>
							<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;">{{item.shopType}}</view>
						</view>
						
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.title}}</view>
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{item.locationName}}</view>
						<view style="font-size: 13px;margin-top: 5px;margin-left: 10px;">{{item.createTime}}</view>
					</view>
				</view>
				<view v-if="item.is_deposit == 0 && item.is_lock == 1 && item.deposit != ''"  style="width: 100%;height: 30px;display: flex;flex-direction: row;">
					<view class="buttonView" @click="jiaonaClick(item)">去缴纳</view>
					
				</view>
				<view v-if="(item.is_deposit == 1 && item.is_refund_deposit) || item.is_refund_deposit === ''" style="width: 100%;height: 30px;display: flex;flex-direction: row;" >
					<view class="detailView" @click="checkdetaiVCClick(item)">查看</view>
					<view class="cancelView" @click="cancelmoneyClick(item)">退押金</view>
				</view>
				
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceBuyShopMineRentHouse, serviceBuyShopMineRentHouseCancelMoney, serviceBuyShopMineRentHouseJiaoNa } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const shopList = ref<any[]>([]);
	const loading = ref(false);   // 是否正在加载
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);    // 是否没有更多数据了
	const page = ref(1);

	const loadData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				page: page.value,
				size: 10,
			};
			serviceBuyShopMineRentHouse(param).then((res: any) => {
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

	//去缴纳
	const jiaonaClick = (item: any) => {
		try {
			let param = {
				applyId: item.applyId,
				userName: storage.getRealName(),
				mobile: storage.getPhone(),
				osName: "ios",
				hostNo: storage.getHostNo(),
			};
			serviceBuyShopMineRentHouseJiaoNa(param).then((res: any) => {
				console.log(res);
				uni.navigateTo({
					url: '/pages/Integral/orderPayHtml?url=' + encodeURIComponent(res.result.payUrl)
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	//查看
	const checkdetaiVCClick = (item: any) => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/hmeaageDetail?applyId=' + item.applyId
		});
	};

	//确认退押金
	const surecancelMoney = (applyId: string) => {
		try {
			let param = {
				applyId: applyId,
			};
			serviceBuyShopMineRentHouseCancelMoney(param).then((res: any) => {
				console.log(res);
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				loading.value = false;
				shopList.value = [];
				loadData();
			});
		} catch (error) {
			console.log(error);
		}
	};

	//退押金
	const cancelmoneyClick = (item: any) => {
		uni.showModal({
			cancelText: '取消',
			confirmText: '确定',
			confirmColor: '#2A9595',
			title: '提示',
			content: '确认提交退押金申请?',
			success: (e) => {
				console.log(e);
				if (e.confirm === true) {
					console.log('确定');
					surecancelMoney(item.applyId);
				} else {
					console.log('取消');
				}
			}
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
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
	 .list-item{
	 	display: flex;
	 	flex-direction: column;
	 	margin-left: 4%;
	 	width: 92%;
	 	height: 190px;
	 	border-radius: 5px;
	 	background-color: white;
	 	margin-top: 10px;
	 }
	  .buttonView{
	               
	              margin-top: 10px;
	              background-color: #2A9595;
	              border-radius: 5px;
	              color: white;
	              font-size: 14px;
	              margin-left: 235px; 
	              display: flex;
	              justify-content: center; /* 水平居中 */
	              align-items: center;     /* 垂直居中 */
	              height: 25px;           /* 需要设置高度 */
	              width: 80px;             /* 需要设置宽度 */
	     }
		 .detailView{
			 
			 margin-top: 10px;
			 background-color: #2A9595;
			 border-radius: 5px;
			 color: white;
			 font-size: 14px;
			 margin-left: 145px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 80px;   
		 }
		 .cancelView{
			 
			 margin-top: 10px;
			 background-color: #2A9595;
			 border-radius: 5px;
			 color: white;
			 font-size: 14px;
			 margin-left: 10px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 80px;             /* 需要设置宽度 */
		 }
    }
</style>