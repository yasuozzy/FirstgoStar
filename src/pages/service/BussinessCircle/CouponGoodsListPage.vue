<template>
	<view class="page">
		<u-navbar title="使用优惠券" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view class="nav-left" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>

		<scroll-view class="content" scroll-y refresher-enabled :refresher-triggered="refreshing" :lower-threshold="80"
			@refresherrefresh="refreshList" @scrolltolower="loadMore">
			<view class="list-wrap">
				<view v-if="loading && goodsList.length === 0" class="state-box">
					<text class="state-text">加载中...</text>
				</view>

				<view v-else-if="error && goodsList.length === 0" class="state-box state-box--error"
					@click="refreshList">
					<text class="state-text">加载失败，点击重试</text>
				</view>

				<view v-else-if="goodsList.length === 0" class="state-box">
					<text class="state-text">暂无可用商品</text>
				</view>

				<template v-else>
					<view v-for="item in goodsList" :key="item.sku" class="goods-item" @click="goDetail(item)">
						<image class="goods-img" :src="resolveImage(item.goodImg)" mode="aspectFill"></image>
						<view class="goods-main">
							<text class="goods-name">{{ item.goodName || "" }}</text>
							<view class="goods-bottom">
								<text class="goods-price">￥{{ formatMoney(item.goodPrice) }}</text>
								<view class="go-detail">
									<text>查看详情</text>
									<u-icon name="arrow-right" size="12" color="#999999"></u-icon>
								</view>
							</view>
						</view>
					</view>

					<view class="load-tip">
						<text v-if="loading">加载中...</text>
						<text v-else-if="hasMore">上拉加载更多</text>
						<text v-else>没有更多了</text>
					</view>
				</template>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
	import { ref } from "vue";
	import { getCouponGoodsList } from "@/api/service";
	import { BaseImgURL } from "@/utils/storage";

	interface CouponGoodsItem {
		goodImg ?: string;
		goodName ?: string;
		sku ?: string;
		goodPrice ?: number | string;
		marPrice ?: number | string;
		storeNum ?: number | string;
		comPrice ?: number | string;
	}

	interface CouponGoodsResponse {
		resultCode ?: number;
		message ?: string;
		result ?: CouponGoodsItem[];
	}

	const PAGE_SIZE = 50;
	const bgColor = ref("#2a9598");
	const couponId = ref("");
	const page = ref(1);
	const goodsList = ref<CouponGoodsItem[]>([]);
	const loading = ref(false);
	const refreshing = ref(false);
	const hasMore = ref(true);
	const error = ref(false);

	function goBack() {
		uni.navigateBack();
	}

	function resolveImage(img ?: string) {
		if (!img) return "/static/default-image.png";
		if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
		return `${BaseImgURL}${img.replace(/^\//, "")}`;
	}

	function formatMoney(value ?: number | string) {
		const num = Number(value || 0);
		if (Number.isNaN(num)) return "0";
		return Number.isInteger(num) ? String(num) : num.toFixed(2);
	}

	async function fetchGoods(targetPage : number, replace = true) {
		console.log("aaaa");
		if (loading.value) return;
		if (!couponId.value) {
			goodsList.value = [];
			hasMore.value = false;
			return;
		}
		console.log(couponId.value);
		loading.value = true;
		if (replace) {
			error.value = false;
			hasMore.value = true;
		}
		console.log("qqq");
		try {
			const res : CouponGoodsResponse = await getCouponGoodsList({
				couponId: couponId.value,
				page: String(targetPage),
				size: String(PAGE_SIZE),
			});
			console.log(res.result)
			const list = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
			goodsList.value = replace ? list : goodsList.value.concat(list);
			page.value = targetPage;
			hasMore.value = list.length >= PAGE_SIZE;
			error.value = false;

			if (res?.resultCode !== 200 && replace) {
				goodsList.value = [];
				hasMore.value = false;
			}
		} catch (err : any) {
			if (replace) {
				goodsList.value = [];
				error.value = true;
			}
			hasMore.value = false;
			uni.showToast({ title: err?.message || "加载失败", icon: "none" });
		} finally {
			loading.value = false;
		}
	}

	function refreshList() {
		refreshing.value = true;
		page.value = 1;
		fetchGoods(1, true).finally(() => {
			refreshing.value = false;
			uni.stopPullDownRefresh();
		});
	}

	async function loadMore() {
		if (loading.value || !hasMore.value) return;
		await fetchGoods(page.value + 1, false);
	}

	function goDetail(item : CouponGoodsItem) {
		if (!item.sku) return;
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopProductDetailPage?sku=${item.sku}`,
		});
	}

	onLoad((options : any) => {
		couponId.value = options?.couponId || "";
		console.log(couponId.value)
		fetchGoods(1, true);
	});

	onPullDownRefresh(() => {
		refreshList();
	});
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f3f4f8;
	}

	.nav-left {
		width: 34px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		flex: 1;
		min-height: 0;
	}

	.list-wrap {
		padding: 20rpx 24rpx 28rpx;
		box-sizing: border-box;
	}

	.goods-item {
		display: flex;
		gap: 20rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 8rpx;
		background: #fff;
		box-sizing: border-box;
	}

	.goods-img {
		width: 172rpx;
		height: 172rpx;
		flex: 0 0 172rpx;
		border-radius: 8rpx;
		background: #f5f5f5;
	}

	.goods-main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods-name {
		color: #333;
		font-size: 28rpx;
		line-height: 40rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.goods-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
		margin-top: 20rpx;
	}

	.goods-price {
		min-width: 0;
		color: #e93b3d;
		font-size: 34rpx;
		font-weight: 600;
	}

	.go-detail {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		color: #999;
		font-size: 24rpx;
	}

	.state-box {
		min-height: 420rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.state-box--error {
		cursor: pointer;
	}

	.state-text,
	.load-tip {
		color: #999;
		font-size: 26rpx;
		text-align: center;
	}

	.load-tip {
		padding: 16rpx 0 8rpx;
	}
</style>