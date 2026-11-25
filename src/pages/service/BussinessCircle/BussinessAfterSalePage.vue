<template>
	<view class="page">
		<u-navbar title="申请售后" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view class="nav-left" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>

		<view class="tab-wrap">
			<u-tabs :list="tabList" :current="currentIndex" :scrollable="false" lineColor="#2a9598"
				activeStyle="color: #2a9598; font-weight: 500;" inactiveStyle="color: #333333;"
				@click="handleTabClick"></u-tabs>
		</view>

		<swiper class="pane-swiper" :current="currentIndex" @change="handleSwiperChange">
			<swiper-item v-for="(tab, tabIndex) in tabList" :key="tab.orderType">
				<scroll-view class="pane-scroll" scroll-y refresher-enabled
					:refresher-triggered="getPane(tab.orderType).refreshing" :lower-threshold="80"
					@refresherrefresh="handleRefresh(tab.orderType)" @scrolltolower="loadMore(tab.orderType)">
					<view class="pane-content">
						<view v-for="item in getPane(tab.orderType).list"
							:key="item.orderId || item.orderNo || item.applyId" class="card">
							<template v-if="tab.orderType === 10">
								<view class="order-head" @click="orderdetail(item)">
									<text class="order-no">订单编号：{{ item.orderNo || "" }}</text>
									<text class="order-time">{{ item.create_time || item.createTime || "" }}</text>
								</view>

								<view v-for="(goods, goodsIndex) in item.orderDetailAry || []"
									:key="goods.childId || goods.sku || goodsIndex" class="goods-item">
									<image class="goods-img" :src="resolveImage(goods.img)" mode="aspectFill"></image>
									<view class="goods-main">
										<text class="goods-name">{{ goods.name || "" }}</text>
										<text class="goods-num">数量：{{ goods.nums || 0 }}</text>
										<view class="goods-footer">
											<view class="action-btn" :class="{ disabled: !canApplyAfs(goods) }"
												@click="handleApplyAfs(item, goods)">
												{{ goodsButtonText(goods) }}
											</view>
										</view>
									</view>
								</view>
							</template>

							<template v-else>
								<view class="apply-head" @click="todetail(item)">
									<text class="apply-no">服务单号：{{ item.applyNo || "" }}</text>
									<text class="apply-state">{{ item.serviceType || "" }}</text>
								</view>

								<view class="apply-body" @click="todetail(item)">
									<image class="apply-img" :src="resolveImage(getApplyGoods(item).img)"
										mode="aspectFill"></image>
									<view class="apply-main">
										<text class="apply-name">{{ getApplyGoods(item).name || "" }}</text>
										<text class="apply-specs">{{ getApplyGoods(item).specs || "" }}</text>
									</view>
								</view>

								<view class="apply-footer">
									<text class="apply-status">{{ item.applyStatus || "" }}</text>
									<text class="apply-flow"
										v-if="Number(getApplyGoods(item).platFollow || item.platflow || 0) > 0">
										{{ getApplyFlowText(item) }}
									</text>
									<view v-if="getApplyRightVisible(item)" class="action-btn"
										@click="handleApplyRecordAction(item)">
										{{ getApplyRightText(item) }}
									</view>
								</view>
							</template>
						</view>

						<view v-if="getPane(tab.orderType).list.length === 0 && !getPane(tab.orderType).loading"
							class="empty-text">
							暂无数据
						</view>
						<view v-if="getPane(tab.orderType).loading" class="load-tip">加载中...</view>
						<view v-else-if="getPane(tab.orderType).list.length > 0 && !getPane(tab.orderType).hasMore"
							class="load-tip">
							没有更多了
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
	import { computed, onMounted, ref } from "vue";
	import { onLoad, onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
	import { getCustomerOrderList, getSelfSaleOrderList, ynCanApplyAfs, ynCanApplyPlat } from "@/api/service";
	import { BaseImgURL, storage } from "@/utils/storage";
	const app = getApp();

	const bgColor = ref("#2a9598");
	const PAGE_SIZE = 50;

	interface GoodsItem {
		childId ?: string;
		sku ?: string;
		img ?: string;
		name ?: string;
		specs ?: string;
		nums ?: number;
		backStatus ?: number;
		orderNo ?: string;
		serviceStatus ?: string;
		price ?: number;
		score ?: number;
		type ?: number;
		platFollow ?: number;
	}

	interface OrderItem {
		orderId ?: string;
		orderNo ?: string;
		create_time ?: string;
		createTime ?: string;
		shopCode ?: string;
		shopName ?: string;
		orderDetailAry ?: GoodsItem[];
	}

	interface ApplyGoodsItem {
		img ?: string;
		name ?: string;
		specs ?: string;
		platFollow ?: number;
		applyStatus ?: number;
	}

	interface ApplyItem {
		serviceType ?: string;
		platflow ?: number;
		questionDesc ?: string;
		orderNo ?: string;
		orderId ?: string;
		applyId ?: string;
		applyNo ?: string;
		applyStatus ?: string;
		applyStatusValue ?: number;
		createTime ?: string;
		applyTime ?: string;
		providerName ?: string;
		pic ?: string;
		picList ?: Array<{ path ?: string }>;
		applyDetailAry ?: ApplyGoodsItem[];
	}

	interface PaneState<T> {
		page : number;
		list : T[];
		hasMore : boolean;
		loading : boolean;
		refreshing : boolean;
	}

	const tabList = [
		{ name: "售后申请", orderType: 10 },
		{ name: "申请记录", orderType: 1 },
	];

	const currentIndex = ref(0);
	const panes = ref<Record<number, PaneState<OrderItem | ApplyItem>>>({});

	const currentOrderType = computed(() => tabList[currentIndex.value]?.orderType || 10);

	function createPane<T>() : PaneState<T> {
		return {
			page: 1,
			list: [],
			hasMore: true,
			loading: false,
			refreshing: false,
		};
	}

	function getPane(orderType : number) {
		if (!panes.value[orderType]) {
			panes.value[orderType] = createPane();
		}
		return panes.value[orderType];
	}

	function resolveImage(img ?: string) {
		if (!img) return "/static/default-image.png";
		if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
		return `${BaseImgURL}${img.replace(/^\//, "")}`;
	}

	function showToast(title : string) {
		uni.showToast({ title, icon: "none" });
	}

	function showRouteToast(name : string) {
		showToast(`${name}页面待迁移`);
	}
	function orderdetail(item) {
		const orderId = item.orderId
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopOrderDetailPage?orderId=${encodeURIComponent(orderId)}`,
		});
	}
	function goBack() {
		uni.navigateBack();
	}

	async function fetchList(orderType : number, page : number) {
		const param = {
			orderStatus: String(orderType),
			userType: "1",
			pCode: "",
			userId: storage.getUserId(),
			page: String(page),
			pageSize: String(PAGE_SIZE),
		};
		if (orderType === 10) {
			return getCustomerOrderList(param);
		}
		return getSelfSaleOrderList({
			userType: "1",
			pCode: "",
			userId: storage.getUserId(),
			page: String(page),
			pageSize: String(PAGE_SIZE),
		});
	}

	async function refreshList(orderType : number) {
		const pane = getPane(orderType);
		pane.page = 1;
		pane.loading = true;
		try {
			const res : any = await fetchList(orderType, 1);
			console.log(res);
			if (res?.resultCode === 200 && Array.isArray(res.result)) {
				pane.list = res.result;
				pane.hasMore = res.result.length >= PAGE_SIZE;
			} else {
				pane.list = [];
				pane.hasMore = false;
			}
		} catch {
			pane.list = [];
			pane.hasMore = false;
		} finally {
			pane.loading = false;
			pane.refreshing = false;
			uni.stopPullDownRefresh();
		}
	}

	async function loadMore(orderType : number) {
		const pane = getPane(orderType);
		if (pane.loading || !pane.hasMore) return;
		pane.loading = true;
		const nextPage = pane.page + 1;
		try {
			const res : any = await fetchList(orderType, nextPage);
			if (res?.resultCode === 200 && Array.isArray(res.result)) {
				pane.list = pane.list.concat(res.result);
				pane.page = nextPage;
				pane.hasMore = res.result.length >= PAGE_SIZE;
			} else {
				pane.hasMore = false;
			}
		} finally {
			pane.loading = false;
		}
	}

	function handleTabClick(item : any) {
		const nextIndex = tabList.findIndex((tab) => tab.orderType === item.orderType || tab.name === item.name);
		if (nextIndex >= 0) {
			currentIndex.value = nextIndex;
			const orderType = tabList[nextIndex].orderType;
			if (getPane(orderType).list.length === 0) {
				refreshList(orderType);
			}
		}
	}

	function handleSwiperChange(event : any) {
		const nextIndex = Number(event?.detail?.current || 0);
		currentIndex.value = nextIndex;
		const orderType = tabList[nextIndex]?.orderType;
		if (orderType !== undefined && getPane(orderType).list.length === 0) {
			refreshList(orderType);
		}
	}

	function handleRefresh(orderType : number) {
		getPane(orderType).refreshing = true;
		refreshList(orderType);
	}

	function currentPaneList(orderType : number) {
		return getPane(orderType).list;
	}

	function getApplyGoods(item : ApplyItem) {
		return item.applyDetailAry?.[0] || {};
	}

	function getApplyFlowText(item : ApplyItem) {
		const flow = Number(item.platflow || getApplyGoods(item).platFollow || 0);
		if (flow === 1) return "已申请";
		if (flow === 2) return "处理中";
		if (flow === 3) return "已完成";
		return "";
	}

	function getApplyRightVisible(item : ApplyItem) {
		const flow = Number(item.platflow || getApplyGoods(item).platFollow || 0);
		if (flow > 0) return true;
		const value = Number(item.applyStatusValue || 0);
		return value === 0 || value === 3;
	}

	function getApplyRightText(item : ApplyItem) {
		const flow = Number(item.platflow || getApplyGoods(item).platFollow || 0);
		if (flow > 0) return "查看平台介入";
		return "申请平台介入";
	}

	function todetail(item) {
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/OrderInterveShowPage?applyId=${item.applyId}`,
		});
	}

	function handleApplyRecordAction(item : ApplyItem) {
		const flow = Number(item.platflow || getApplyGoods(item).platFollow || 0);
		if (flow > 0) {
			uni.navigateTo({
				url: `/pages/service/BussinessCircle/OrderInterveShowPage?applyId=${res.result.applyId}`,
			});
			return;
		}
		ynCanApplyPlat({ applyId: item.applyId }).then((res : any) => {
			if (res?.resultCode === 200 && res.result) {
				if (Number(res.result.ynApplyPlat || 0) === 1) {
					uni.navigateTo({
						url: `/pages/service/BussinessCircle/ApplyJieruPage`,
					});
				} else {
					showToast(res.result.message || "暂不可申请平台介入");
				}
				return;
			}
			showToast(res?.message || "获取状态失败");
		}).catch((err : any) => {
			showToast(err?.message || "获取状态失败");
		});
	}

	function canApplyAfs(goods : GoodsItem) {
		if (Number(goods.backStatus || 0) !== 0) return false;
		return true;
	}

	function goodsButtonText(goods : GoodsItem) {
		const backStatus = Number(goods.backStatus || 0);
		if (backStatus === 1) return "已申请";
		if (backStatus === 0) return "申请售后";
		return "已完成";
	}

	function handleApplyAfs(item : OrderItem, goods : GoodsItem) {
		if (!canApplyAfs(goods)) return;
		ynCanApplyAfs({
			orderNo: goods.orderNo || item.orderNo,
			sku: goods.sku,
		})
			.then((res : any) => {
				if (res?.resultCode === 200 && res.result) {
					if (Number(res.result.ynApplyAfs || 0) === 1) {
						console.log(JSON.stringify(item))
						app.globalData.currentshouhouItem = item;
						app.globalData.currentshouhougoodsItem = goods;
						uni.navigateTo({
							url:`/pages/service/BussinessCircle/applyshouhou`
						});
					} else { 
						showToast(res.result.message || "暂不可申请售后");
					}
					return;
				}
				showToast(res?.message || "获取状态失败");
			})
			.catch((err : any) => {
				showToast(err?.message || "获取状态失败");
			});
	}

	function handleItemClick(tabOrderType : number) {
		if (tabOrderType === 10) {
			showRouteToast("订单详情");
		} else {
			showRouteToast("售后详情");
		}
	}

	function initPage() {
		refreshList(tabList[currentIndex.value].orderType);
	}

	onLoad((options : any) => {
		const position = Number(options?.position || 0);
		currentIndex.value = Number.isNaN(position) ? 0 : Math.min(Math.max(position, 0), tabList.length - 1);
		initPage();
	});

	onShow(() => {
		const orderType = currentOrderType.value;
		if (getPane(orderType).list.length > 0) {
			refreshList(orderType);
		}
	});

	onMounted(() => {
		// 占位，保留和项目其他页面一致的生命周期结构
	});

	onPullDownRefresh(() => {
		refreshList(currentOrderType.value);
	});

	onReachBottom(() => {
		loadMore(currentOrderType.value);
	});
</script>

<style scoped lang="scss">
	.page {
		min-height: 100vh;
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

	.tab-wrap {
		flex: 0 0 auto;
		background: #fff;
	}

	.pane-swiper {
		flex: 1;
		min-height: 0;
	}

	.pane-scroll {
		height: 100%;
	}

	.pane-content {
		padding-bottom: 16px;
	}

	.card {
		margin-top: 10px;
		background: #fff;
	}

	.order-head,
	.apply-head {
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px 8px;
		box-sizing: border-box;
	}

	.order-no,
	.apply-no {
		min-width: 0;
		color: #333;
		font-size: 12px;
	}

	.order-time {
		margin-left: 12px;
		color: #333;
		font-size: 12px;
	}

	.apply-state {
		margin-left: 12px;
		color: #333;
		font-size: 12px;
	}

	.goods-item,
	.apply-body {
		display: flex;
		gap: 12px;
		padding: 14px;
		border-top: 1px solid #f0f0f0;
		box-sizing: border-box;
	}

	.goods-img,
	.apply-img {
		width: 85px;
		height: 85px;
		flex: 0 0 85px;
		border-radius: 5px;
		background: #f5f5f5;
	}

	.goods-main,
	.apply-main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods-name,
	.apply-name {
		color: #333;
		font-size: 12px;
		line-height: 18px;
	}

	.goods-num,
	.apply-specs {
		color: #666;
		font-size: 12px;
		line-height: 18px;
	}

	.goods-footer,
	.apply-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		padding: 10px 14px 14px;
		box-sizing: border-box;
	}

	.apply-status,
	.apply-flow {
		color: #333;
		font-size: 13px;
	}

	.apply-flow {
		color: #2a9598;
		flex: 1;
	}

	.action-btn {
		min-width: 72px;
		height: 28px;
		padding: 0 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 14px;
		background: #2a9598;
		color: #fff;
		font-size: 13px;
		box-sizing: border-box;
	}

	.action-btn.disabled {
		background: #c9c9c9;
	}

	.empty-text,
	.load-tip {
		padding: 32px 0;
		color: #999;
		font-size: 13px;
		text-align: center;
	}

	.load-tip {
		padding: 12px 0;
		font-size: 12px;
	}
</style>