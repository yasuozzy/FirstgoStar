<template>
	<view class="shop-home-page">
		<view class="top-bar">
			<view class="status-space"></view>
			<view class="top-row">
				<view class="top-icon" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
				<view class="search-box" @click="searchproduct">
					<u-icon name="search" size="16" color="#999999"></u-icon>
					<text class="search-text">搜索商品</text>
				</view>
				<view class="top-icon cart-icon" @click="tocart">
					<image class="cart-img" src="/static/mine/shopCartImage.png" mode="aspectFit"></image>
					<text v-if="cartBadgeNum > 0" class="badge">{{ cartBadgeNum }}</text>
				</view>
				<view class="top-icon" @click="showMoreMenu = !showMoreMenu">
					<u-icon name="more-dot-fill" size="22" color="#fff"></u-icon>
				</view>
			</view>
		</view>

		<view class="shop-home-content" :class="{ 'has-cart': showBottomCart }">
			<view class="shop-info">
				<image class="shop-cover" :src="shopCover" mode="aspectFill"></image>
				<view class="shop-main">
					<view class="shop-title-row">
						<view class="shop-title" @click="toshopinfo">
							<text class="shop-title-text">{{ shopNameText }}</text>
							<u-icon name="arrow-right" size="14" color="#fff"></u-icon>
						</view>
						<view v-if="!isPreMode" class="collect-btn" :class="{ selected: attentionFlag }"
							@click.stop="toggleCollection">
							{{ attentionFlag ? "已收藏" : "收藏" }}
						</view>
						<view v-else class="prepay-btn" @click.stop="handlePrepay">预付充值</view>
					</view>
					<view v-if="!isPreMode" class="score-row">
						<u-rate :count="5" :value="shopScore" size="13" active-color="#FFC600" readonly></u-rate>
						<text class="score-text">{{ shopScoreText }}</text>
						<text v-if="isClosed" class="closed-tag">休息中</text>
					</view>
					<view v-else class="pre-status-row">
						<text v-if="isClosed" class="closed-tag">休息中</text>
					</view>
				</view>
			</view>

			<view v-if="noticeVisible" class="notice-row">
				<u-icon name="volume" size="16" color="#ff8900"></u-icon>
				<text class="notice-text">{{ noticeText }}</text>
			</view>

			<scroll-view v-if="couponList.length > 0" class="coupon-scroll" scroll-x :show-scrollbar="false">
				<view class="coupon-list">
					<view v-for="coupon in couponList" :key="coupon.couponId" class="coupon-card"
						:class="{ received: coupon.receiveStatus !== '2' }" @click="receiveCouponItem(coupon)">
						<view class="coupon-body">
							<text class="coupon-money">{{ formatMoney(coupon.couponMoney) }}</text>
							<text class="coupon-limit">满{{ formatMoney(coupon.fullMoneyIsUse) }}元可用</text>
							<text class="coupon-time">有效期至{{ coupon.endTime || "" }}</text>
						</view>
						<view v-if="coupon.receiveStatus === '2'" class="coupon-action">
							<text>领</text>
							<text>取</text>
						</view>
					</view>
				</view>
			</scroll-view>

			<view v-if="categoryList.length > 0" class="goods-area">
				<scroll-view class="category-scroll" scroll-y>
					<view v-for="(item, index) in categoryList" :key="item.catId || index" class="category-item"
						:class="{ active: currentCategoryIndex === index }" @click="switchCategory(index)">
						<text class="category-marker"></text>
						<text class="category-name">{{ item.catName }}</text>
					</view>
				</scroll-view>

				<view class="goods-panel">
					<view class="sort-row">
						<view class="sort-item" :class="{ active: activePane.sortType === null }" @click="setAllSort">
							综合
						</view>
						<view class="sort-item" :class="{ active: activePane.sortType !== null }"
							@click="togglePriceSort">
							价格
							<text class="price-sort-icon">{{ priceSortText }}</text>
						</view>
						<view class="layout-btn" @click="toggleLayout">
							<u-icon :name="activePane.layout === 'grid' ? 'list' : 'grid'" size="18"
								color="#2a9598"></u-icon>
						</view>
					</view>

					<scroll-view class="goods-scroll" scroll-y @scrolltolower="loadMoreGoods">
						<view v-if="activeGoodsList.length > 0" class="goods-list"
							:class="{ grid: activePane.layout === 'grid' }">
							<view v-for="item in activeGoodsList" :key="item.sku" class="goods-card"
								:class="{ row: activePane.layout === 'row' }" @click="goGoodsDetail(item)">
								<view class="goods-img-box">
									<image class="goods-img" :src="resolveImage(item.goodImg)" mode="aspectFill">
									</image>
									<text v-if="item.is_pre === 1" class="pre-tag">预购</text>
								</view>
								<view class="goods-info">
									<text class="goods-title">{{ item.goodName }}</text>
									<view class="goods-bottom">
										<text class="goods-price">¥{{ formatMoney(item.goodPrice) }}</text>
										<view class="goods-actions">
											<view v-if="getGoodsNum(item) < 1" class="add-cart-btn"
												@click.stop="loadGoodsDetail(item)">


												<!-- openSpec -->
												<!--  addGoodsByCard(item) -->
												加购
											</view>
											<template v-else>
												<view class="qty-btn plain" @click.stop="decreaseGoods(item)">-</view>
												<text class="qty-text">{{ getGoodsNum(item) }}</text>
												<view class="qty-btn" @click.stop="increaseGoods(item)">+</view>
											</template>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view v-else class="local-empty">暂无商品</view>
						<view v-if="activePane.loading" class="load-tip">加载中...</view>
						<view v-else-if="activeGoodsList.length > 0 && !activePane.hasMore" class="load-tip">
							没有更多了
						</view>
					</scroll-view>
				</view>
			</view>
			<view v-else class="local-empty category-empty">暂无商品分类</view>
		</view>

		<view v-if="showBottomCart" class="bottom-cart">
			<view class="cart-summary" @click="toggleCartPopup">
				<view class="bottom-cart-icon">
					<image class="bottom-cart-img" src="/static/mine/shopCartImage.png" mode="aspectFit"></image>
					<text v-if="cartBadgeNum > 0" class="badge bottom">{{ cartBadgeNum }}</text>
				</view>
				<view class="cart-price-box">
					<view class="cart-price">¥{{ cartTotalPriceText }}</view>
					<view v-if="deliveryFeeText" class="delivery-fee">{{ deliveryFeeText }}</view>
				</view>
			</view>
			<view class="checkout-btn" @click="submitOrder">去结算</view>
		</view>

		<u-popup :show="showCartPopup" :zIndex="900" :round="10" mode="bottom" @close="closeCartPopup">
			<view class="cart-popup">
				<view class="cart-popup-head">
					<text class="cart-popup-title">购物车</text>
					<view class="cart-close" @click="closeCartPopup">
						<u-icon name="close" size="18" color="#333333"></u-icon>
					</view>
				</view>
				<scroll-view class="cart-popup-scroll" scroll-y>
					<view v-for="(group, groupIndex) in cartGroups" :key="groupIndex" class="cart-group">
						<view v-for="item in group.groupValues" :key="item.cartId" class="cart-item">
							<image class="cart-item-img" :src="resolveImage(item.img)" mode="aspectFill"></image>
							<view class="cart-item-main">
								<text class="cart-item-title">{{ item.name }}</text>
								<text class="cart-item-spec">{{ item.specs }}</text>
								<text class="cart-item-price">¥{{ formatMoney(item.price) }}</text>
							</view>
							<view class="cart-item-action">
								<view class="qty-btn plain" @click.stop="decreaseCartItem(item)">-</view>
								<text class="qty-text">{{ item.buyNums }}</text>
								<view class="qty-btn" @click.stop="increaseCartItem(item)">+</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>

		<u-popup :show="showSpecPopup" mode="bottom" :round="12" @close="closeSpec">
			<view class="popup">
				<view class="popup-head">
					<image class="popup-img" :src="resolveImage(goodsInfo.imgAry?.[0] || goodsInfo.goodImg || '')"
						mode="aspectFill"></image>
					<view class="popup-head-info">
						<view class="popup-price">￥{{ formatMoney(currentSkuInfo.price || goodsInfo.price) }}</view>
						<view class="popup-stock">库存：{{ currentSkuInfo.nums ?? goodsInfo.nums ?? 0 }}</view>
						<view class="popup-selected">已选：{{ selectedSpecText || "未选择" }}</view>
					</view>
				</view>

				<scroll-view class="popup-scroll" scroll-y>
					<view v-for="(group, groupIndex) in specGroups" :key="group.id || groupIndex" class="spec-group">
						<view class="spec-name">{{ group.name }}</view>
						<view class="spec-tags">
							<view v-for="(attr, attrIndex) in group.attr" :key="attr.id || attrIndex" class="spec-tag"
								:class="{ active: selectedSpecIds[groupIndex] === (attr.id || attr.value || '') }"
								@click="selectSpec(groupIndex, attrIndex)">
								{{ attr.value || attr.showName || attr.name }}
							</view>
						</view>
					</view>

					<view class="count-row">
						<text>购买数量</text>
						<u-number-box v-model="buyCount" :min="1" :max="maxBuyCount"></u-number-box>
					</view>
				</scroll-view>

				<view class="popup-actions">
					<view class="popup-btn plain" @click="submitFromPopup('cart')">加入购物车</view>
					<view class="popup-btn primary" @click="submitFromPopup('buy')">立即购买</view>
				</view>
			</view>
		</u-popup>

		<u-popup :show="showPreConfirmPopup" mode="center" :round="10" @close="showPreConfirmPopup = false">
			<view class="pre-popup">
				<view class="pre-title">库存不足，是否预购？</view>
				<view class="pre-text">当前库存不足，且该商品支持预购。</view>
				<input v-model="preOrderCount" class="pre-input" type="number" placeholder="请输入预购数量"
					placeholder-style="color: #999" />
				<view class="pre-actions">
					<view class="pre-btn cancel" @click="showPreConfirmPopup = false">取消</view>
					<view class="pre-btn confirm" @click="confirmPreOrder">确认</view>
				</view>
			</view>
		</u-popup>

		<view v-if="showMoreMenu" class="more-mask" @click="showMoreMenu = false">
			<view class="more-menu" @click.stop>
				<view class="more-arrow"></view>
				<view class="more-card">
					<view class="more-item" @click="handleShare">
						<u-icon name="share" size="18" color="#333333"></u-icon>
						<text>分享商家</text>
					</view>
					<view class="more-line"></view>
					<view class="more-item" @click="handleComplain">
						<u-icon name="warning" size="18" color="#333333"></u-icon>
						<text>举报商家</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";
	import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
	import { http } from "@/utils/request";
	import { BaseImgURL, storage } from "@/utils/storage";

	type SortType = null | "1" | "2";
	type LayoutType = "grid" | "row";

	interface ShopInfo {
		address ?: string;
		coverImg ?: string;
		linkMobile ?: string;
		shopName ?: string;
		providerCode ?: string;
		cartGoodsNum ?: number;
		openStatus ?: number;
		flowContent ?: string;
		showTime ?: number;
		collNum ?: number;
		paperPath ?: string;
		shopScore ?: number;
		shopImg ?: string;
		shopId ?: string;
		opStartTime ?: string;
		opEndTime ?: string;
		adShopId ?: string;
		asShopName ?: string;
		asCoverImg ?: string;
		attentionFlag ?: boolean;
		couponList ?: CouponItem[];
	}

	interface CouponItem {
		couponName ?: string;
		couponMoney ?: number | string;
		fullMoneyIsUse ?: number | string;
		startTime ?: string;
		endTime ?: string;
		receiveStatus ?: string;
		couponId ?: string;
	}

	interface CategoryItem {
		catId ?: string;
		catName ?: string;
	}

	interface GoodsItem {
		goodImg ?: string;
		goodName ?: string;
		cartId ?: string;
		nums ?: number;
		num ?: number;
		sku ?: string;
		goodPrice ?: number | string;
		is_pre ?: number;
	}

	interface ActiveInfo {
		priceTwo ?: number | string;
	}

	interface CartGroupName {
		shopCode ?: string;
		shopName ?: string;
		currentActiveBean ?: ActiveInfo;
	}

	interface CartItem {
		img ?: string;
		skuActiveId ?: string;
		cartId ?: string;
		buyNums : number;
		nums ?: number;
		num ?: number;
		specs ?: string;
		giftGoodsFlag ?: boolean;
		isGiftGoodsFlag ?: boolean;
		price ?: number | string;
		goodPrice ?: number | string;
		goodsPrice ?: number | string;
		salePrice ?: number | string;
		comPrice ?: number | string;
		name ?: string;
		checked ?: boolean;
		isChecked ?: boolean;
		sku ?: string;
	}

	interface CartGroup {
		groupName ?: CartGroupName;
		groupValues ?: CartItem[];
	}

	interface OrderCompleteProduct {
		cartId ?: string;
		giftGoodsFlag ?: boolean;
		sku ?: string;
		name ?: string;
		price ?: number | string;
		img ?: string;
		nums ?: number;
		specs ?: string;
		sums ?: number;
		flowNo ?: string;
	}

	interface OrderCompleteParams {
		shopCode ?: string;
		shopName ?: string;
		nums ?: number;
		productArray ?: OrderCompleteProduct[];
		cutdown ?: number | string;
	}

	interface CategoryPane {

		goodsList : GoodsItem[];
		page : number;
		hasMore : boolean;
		loading : boolean;
		loaded : boolean;
		sortType : SortType;
		layout : LayoutType;
	}

	type ActionType = "cart" | "buy";

	interface SpecAttr {
		id ?: string;
		pId ?: string;
		value ?: string;
		showName ?: string;
		checked ?: boolean;
		name ?: string;
	}

	interface SpecGroup {
		id ?: string;
		name ?: string;
		attr ?: SpecAttr[];
	}

	interface GoodsInfo {
		goodsName ?: string;
		price ?: number | string;
		nums ?: number | string;
		saleNum ?: number | string;
		salesNum ?: number | string;
		details ?: string;
		content ?: string;
		imgAry ?: string[];
		goodImg ?: string;
		param ?: SpecGroup[];
		specs ?: any[];
		goodsPublicId ?: string;
		sku ?: string;
		is_pre ?: number | string;
		is_ord_pre ?: number | string;
		providerCode ?: string;
	}

	const PAGE_SIZE = 50;
	const defaultShopImage = "/static/default-image.png";

	const shopId = ref("");
	const providerCode = ref("");
	const routeShopName = ref("");
	const isPreMode = ref(false);
	const shopInfo = ref<ShopInfo>({});
	const attentionFlag = ref(false);
	const noticeVisible = ref(false);
	const categoryList = ref<CategoryItem[]>([]);
	const currentCategoryIndex = ref(0);
	const categoryPanes = ref<Record<string, CategoryPane>>({});
	const cartInfo = ref<any>({});
	const cartGroups = ref<CartGroup[]>([]);
	const showCartPopup = ref(false);
	const showMoreMenu = ref(false);
	const loadedOnce = ref(false);
	const firstShowHandled = ref(false);
	let noticeTimer : ReturnType<typeof setTimeout> | null = null;
	const showSpecPopup = ref(false);
	const showPreConfirmPopup = ref(false);
	const popupSku = ref("");
	const buyCount = ref(1);
	const preOrderCount = ref("");
	const goodsInfo = ref<GoodsInfo>({
		imgAry: [],
		param: [],
		specs: [],
	});
	const currentSkuInfo = ref<GoodsInfo>({});
	const selectedSpecIds = ref<string[]>([]);
	const selectedSpecText = ref("");
	const selectedSpecValues = ref<string[]>([]);

	const shopHomeApis = {
		detail: (data ?: any) => http.post("mall/shop/getShopDetailInfo", data),
		productdetail: (data ?: any) => http.post("mall/goods/getGoodsInfo", data),
		skuBySpec: (data ?: any) => http.post("mall/goods/getGoodsInfoBySkuSpec", data),
		rindInfo: (data ?: any) => http.post("mall/goods/getGoodsRindInfo", data),
		category: (data ?: any) => http.post("mall/shop/getShopClassCatGoods", data),
		goods: (data ?: any) => http.post("mall/shop/getGoodsListByCatId", data),
		cart: (data ?: any) => http.post("mall/goodsCart/getGoodsCarList", data),
		updateCart: (data ?: any) => http.post("mall/goodsCart/updateGoodsCarNum", data),
		addCart: (data ?: any) => http.post("mall/goodsCart/addGoodsCart", data),
		addCartOrdPre: (data ?: any) => http.post("mall/goodsCart/addGoodsCartOrdPre", data),
		preCart: (data ?: any) => http.post("mall/goodsCart/getGoodsCarListOrdPre", data),
		collection: (data ?: any) => http.post("mall/shop/addOrCancleShopCollection", data),
		coupon: (data ?: any) => http.post("mall/shop/receiveCoupon", data),
	};

	const shopNameText = computed(() => shopInfo.value.shopName || routeShopName.value || "店铺");
	const shopScore = computed(() => Number(shopInfo.value.shopScore || 0));
	const shopScoreText = computed(() => Number(shopScore.value || 0).toFixed(1));
	const isClosed = computed(() => Number(shopInfo.value.openStatus) === 0);
	const noticeText = computed(() => shopInfo.value.flowContent || "");
	const couponList = computed(() => shopInfo.value.couponList || []);

	const shopCover = computed(() => {
		// if (shopInfo.value.coverImg) return resolveImage(shopInfo.value.coverImg);
		// if (bannerImages.value.length > 0) return bannerImages.value[0];
		if (shopInfo.value.coverImg) {
			return resolveImage(shopInfo.value.coverImg);
		}
		return defaultShopImage;
	});

	// const bannerImages = computed(() => {
	//   const imgs: string[] = [];
	//   const append = (value?: string) => {
	//     if (!value) return;
	//     value.split(",").forEach(item => {
	//       const img = item.trim();
	//       if (img) imgs.push(resolveImage(img));
	//     });
	//   };
	//   append(shopInfo.value.shopImg);
	//   append(shopInfo.value.paperPath);
	//   if (imgs.length === 0 && shopInfo.value.coverImg) {
	//     imgs.push(resolveImage(shopInfo.value.coverImg));
	//   }
	//   return Array.from(new Set(imgs));
	// });

	const activeCategory = computed(() => categoryList.value[currentCategoryIndex.value] || {});
	const activePane = computed(() => getPane(activeCategory.value.catId || String(currentCategoryIndex.value)));
	const activeGoodsList = computed(() => activePane.value.goodsList);
	const specGroups = computed(() => goodsInfo.value.param || []);
	const maxBuyCount = computed(() => {
		const stock = Number(currentSkuInfo.value.nums ?? goodsInfo.value.nums ?? 0);
		if (Number(goodsInfo.value.is_ord_pre) === 1) return 9999;
		return Math.max(stock > 0 ? stock : 9999, 1);
	});
	const priceSortText = computed(() => {
		if (activePane.value.sortType === "1") return "↑";
		if (activePane.value.sortType === "2") return "↓";
		return "";
	});

	async function loadGoodsDetail(item : GoodsItem) {
		if (!item.sku) {
			uni.showToast({ title: "商品信息缺失", icon: "none" });
			return;
		}

		resetSpecPopup(item.sku);

		try {
			const res : any = await shopHomeApis.productdetail({
				userId: getUserId(),
				sku: item.sku,
				manageId: getManageId(),
			});
			if (res?.resultCode === 200 && res.result) {
				syncSpecViewFromGoods(res.result);
				initSpecSelection();
				openSpec();
				return;
			}
			uni.showToast({ title: res?.message || "商品详情加载失败", icon: "none" });
		} catch (error : any) {
			uni.showToast({ title: error?.message || "商品详情加载失败", icon: "none" });
		}
	}


	const cartBadgeNum = computed(() => {
		return cartGroups.value.reduce((sum, group) => sum + (group.groupValues?.length || 0), 0);
	});

	const showBottomCart = computed(() => cartBadgeNum.value > 0);

	const cartTotalPrice = computed(() => {
		return cartGroups.value.reduce((total, group) => {
			const goodsTotal = (group.groupValues || []).reduce((sum, item) => {
				if (!isCartItemSelected(item)) return sum;
				return sum + getCartItemPrice(item) * getCartItemCount(item);
			}, 0);
			const activeDiscount = Number(group.groupName?.currentActiveBean?.priceTwo || 0);
			return total + goodsTotal - activeDiscount;
		}, 0);
	});

	const cartTotalPriceText = computed(() => formatMoney(Math.max(cartTotalPrice.value, 0)));
	const deliveryFeeText = computed(() => {
		const fee = Number(cartInfo.value?.dFee || 0);
		return fee === 0 ? "" : `配送费${formatMoney(fee)}元,可自提`;
	});

	function createPane() : CategoryPane {
		return {
			goodsList: [],
			page: 1,
			hasMore: true,
			loading: false,
			loaded: false,
			sortType: null,
			layout: "grid",
		};
	}

	function getPane(key : string) : CategoryPane {
		if (!categoryPanes.value[key]) {
			categoryPanes.value[key] = createPane();
		}
		return categoryPanes.value[key];
	}

	function getUserId() {
		return storage.getUserId() || "";
	}

	function getManageId() {
		return storage.getManid() || "";
	}

	function resolveImage(img ?: string) {
		if (!img) return defaultShopImage;
		if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
		return `${BaseImgURL}${img.replace(/^\//, "")}`;
	}

	function formatMoney(value ?: number | string) {
		const num = Number(value || 0);
		if (Number.isNaN(num)) return "0";
		return Number.isInteger(num) ? String(num) : num.toFixed(2);
	}

	function normalizeImages(images ?: any) {
		if (!images) return [];
		if (Array.isArray(images)) {
			return images
				.map(item => {
					if (typeof item === "string") return item;
					return item?.goodImg || item?.img || item?.url || "";
				})
				.filter(Boolean);
		}
		if (typeof images === "string") {
			return images
				.split(",")
				.map(item => item.trim())
				.filter(Boolean);
		}
		return [];
	}

	function normalizeGoodsNum(item : GoodsItem) {
		return Number(item.num ?? item.nums ?? 0);
	}

	function getGoodsNum(item : GoodsItem) {
		return normalizeGoodsNum(item);
	}

	function setGoodsNum(item : GoodsItem, value : number) {
		item.num = value;
		item.nums = value;
	}

	function getCartItemCount(item : CartItem) {
		return Number(item.buyNums ?? item.nums ?? item.num ?? 0);
	}

	function getCartItemPrice(item : CartItem) {
		const price = Number(item.price ?? item.goodPrice ?? item.goodsPrice ?? item.salePrice ?? item.comPrice ?? 0);
		return Number.isNaN(price) ? 0 : price;
	}

	function isCartGiftItem(item : CartItem) {
		return !!(item.giftGoodsFlag || item.isGiftGoodsFlag);
	}

	function isCartItemSelected(item : CartItem) {
		return item.checked !== false || isCartGiftItem(item);
	}

	function normalizeCartGroups(dataList : CartGroup[]) {
		return (dataList || []).map(group => {
			const groupValues = (group.groupValues || []).map(item => ({
				...item,
				buyNums: getCartItemCount(item),
				price: getCartItemPrice(item),
				giftGoodsFlag: isCartGiftItem(item),
				checked: true,
			}));
			return {
				...group,
				groupName: {
					...(group.groupName || {}),
					checked: groupValues.length > 0,
				},
				groupValues,
			};
		});
	}

	function openSpec() {
		showSpecPopup.value = true;
	}

	function closeSpec() {
		showSpecPopup.value = false;
	}

	function resetSpecPopup(sku : string) {
		popupSku.value = sku;
		buyCount.value = 1;
		preOrderCount.value = "";
		goodsInfo.value = {
			imgAry: [],
			param: [],
			specs: [],
		};
		currentSkuInfo.value = {};
		selectedSpecIds.value = [];
		selectedSpecValues.value = [];
		selectedSpecText.value = "";
		showPreConfirmPopup.value = false;
	}

	function initSpecSelection() {
		const defaultGroups = goodsInfo.value.param || [];
		selectedSpecIds.value = defaultGroups.map(() => "");
		selectedSpecValues.value = defaultGroups.map(() => "");
		selectedSpecText.value = "";
	}

	function buildSelectedSpecText() {
		return selectedSpecValues.value.filter(Boolean).join("；");
	}

	function buildSpecRequest() {
		return {
			goodsPublicId: goodsInfo.value.goodsPublicId,
			specAry: selectedSpecIds.value.filter(Boolean),
			userId: getUserId(),
			manageId: getManageId(),
			sku: popupSku.value,
		};
	}

	function judgeNeedPreOrder(action : ActionType) {
		const stock = Number(currentSkuInfo.value.nums ?? goodsInfo.value.nums ?? 0);
		const allowPre = Number(goodsInfo.value.is_ord_pre) === 1;
		return action === "buy" && stock < buyCount.value && allowPre;
	}

	async function confirmPreOrder() {
		const count = Number(preOrderCount.value || 0);
		if (!preOrderCount.value || Number.isNaN(count) || count <= 0) {
			uni.showToast({ title: "请输入预购数量", icon: "none" });
			return;
		}
		if (count > 9999) {
			uni.showToast({ title: "选在产品数量超出可选范围", icon: "none" });
			return;
		}
		buyCount.value = count;
		showPreConfirmPopup.value = false;
		await submitAction("buy", true);
	}

	async function submitFromPopup(action : ActionType) {
		await submitAction(action);
	}

	async function submitAction(action : ActionType, forcePre = false) {
		const hasSpec = specGroups.value.length > 0;
		const selectedCount = selectedSpecIds.value.filter(Boolean).length;
		if (hasSpec && selectedCount !== specGroups.value.length) {
			uni.showToast({ title: "请选择完整规格", icon: "none" });
			return;
		}

		if (!popupSku.value) {
			uni.showToast({ title: "商品信息缺失", icon: "none" });
			return;
		}
		console.log("aaaaaaaaa")
		if (!forcePre && judgeNeedPreOrder(action)) {
			try {
				const res : any = await shopHomeApis.rindInfo({
					userId: getUserId(),
					manageId: getManageId(),
					sku: popupSku.value,
					goodsPublicId: goodsInfo.value.goodsPublicId,
					nums: buyCount.value,
				});
				if (res?.message) {
					uni.showToast({ title: res.message, icon: "none" });
				}
			} catch (error : any) {
				uni.showToast({ title: error?.message || "获取预购信息失败", icon: "none" });
			}
			preOrderCount.value = String(buyCount.value || "");
			showPreConfirmPopup.value = true;
			return;
		}
		console.log("bbbbbbbbbbbb")
		try {
			const payload = {
				userId: getUserId(),
				manageId: getManageId(),
				sku: popupSku.value,
				nums: String(buyCount.value),
				type: action === "buy" ? "1" : "0",
				goodsPublicId: goodsInfo.value.goodsPublicId,
				specAry: selectedSpecIds.value.filter(Boolean),
				specs: selectedSpecValues.value.filter(Boolean),
			};
			const api = forcePre || Number(goodsInfo.value.is_pre) === 1
				? shopHomeApis.addCartOrdPre
				: shopHomeApis.addCart;
			const res : any = await api(payload);
			if (res?.resultCode !== 200 && res?.resultCode !== "200" && res?.success !== true) {
				uni.showToast({ title: res?.message || "操作失败", icon: "none" });
				return;
			}
			if (forcePre || (action === "buy" && Number(goodsInfo.value.is_pre) === 1)) {
				await openYugouConfirmOrderPage();
				closeSpec();
				return;
			}
			console.log("ssssssssssssssssss")
			uni.showToast({
				title: action === "buy" ? "已加入购买流程" : "已加入购物车",
				icon: "none",
			});
			closeSpec();
			// await refreshAfterCartChange();
			// if (action === "buy") {
			// 	submitOrder()
			// }
			await refreshAfterCartChange(() => {
				if (action === "buy") {
					submitOrder();
				}
			});
		} catch (error : any) {
			console.log("操作失败")
			uni.showToast({ title: error?.message || "操作失败", icon: "none" });
		}
	}
	function showRouteToast(name : string) {
		uni.showToast({
			title: `${name}暂未迁移`,
			icon: "none",
		});
	}

	function toshopinfo() {
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopInfoPage?shopId=${shopId.value}`,
		});
	}

	function tocart() {
		console.log(providerCode.value)
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopCartPage?providerCode=${providerCode.value}`,
		});
	}

	function goBack() {
		uni.navigateBack();
	}
	function searchproduct() {
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopSelectProductPage?shopId=${shopId.value}`,
		});
	}

	async function initPage() {
		if (!shopId.value) {
			uni.showToast({ title: "缺少店铺ID", icon: "none" });
			return;
		}

		await loadShopInfo();
		await Promise.all([loadCategoryList(), loadCartList()]);
		loadedOnce.value = true;
	}

	async function refreshCurrentPage() {
		if (!loadedOnce.value || !shopId.value) return;
		await loadShopInfo();
		await Promise.all([loadCartList(), loadGoodsForCurrentCategory(true)]);
	}

	async function loadShopInfo() {
		const params = {
			shopId: shopId.value,
			shortInfo: "1",
			manageId: getManageId(),
			userId: getUserId(),
		};

		try {
			const res : any = await shopHomeApis.detail(params);
			if (res?.resultCode === 200 && res.result) {
				shopInfo.value = res.result;
				providerCode.value = res.result.providerCode || providerCode.value;
				attentionFlag.value = !!res.result.attentionFlag;
				resetNoticeTimer();
				if (!isPreMode.value && res.result.flowContent) {
					noticeVisible.value = true;
					const showTime = Number(res.result.showTime || 0);
					if (showTime > 0) {
						noticeTimer = setTimeout(() => {
							noticeVisible.value = false;
						}, showTime * 1000);
					}
				} else {
					noticeVisible.value = false;
				}
			}
		} catch (error : any) {
			uni.showToast({ title: error?.message || "店铺信息加载失败", icon: "none" });
		}
	}

	async function loadCategoryList() {
		try {
			const res : any = await shopHomeApis.category({
				shopId: shopId.value,
				userId: getUserId(),
			});

			if (res?.resultCode === 200 && Array.isArray(res.result)) {
				categoryList.value = res.result;
				currentCategoryIndex.value = 0;
				if (categoryList.value.length > 0) {
					await loadGoodsForCurrentCategory(true);
				}
			} else {
				categoryList.value = [];
			}
		} catch (error : any) {
			categoryList.value = [];
			uni.showToast({ title: error?.message || "商品分类加载失败", icon: "none" });
		}
	}

	async function loadGoodsForCurrentCategory(refresh = false) {
		const category = activeCategory.value;
		if (!category.catId) return;

		const pane = activePane.value;
		if (pane.loading) return;

		if (refresh) {
			pane.page = 1;
			pane.hasMore = true;
			pane.goodsList = [];
		}

		pane.loading = true;
		try {
			const res : any = await shopHomeApis.goods({
				catId: category.catId,
				page: String(pane.page),
				sort: pane.sortType,
				userId: getUserId(),
				size: String(PAGE_SIZE),
			});
			console.log(res);
			const list : GoodsItem[] = res?.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
			pane.goodsList = refresh ? list : pane.goodsList.concat(list);
			pane.hasMore = list.length >= PAGE_SIZE;
			pane.loaded = true;
		} catch (error : any) {
			pane.hasMore = false;
			uni.showToast({ title: error?.message || "商品加载失败", icon: "none" });
		} finally {
			pane.loading = false;
		}
	}

	async function loadMoreGoods() {
		const pane = activePane.value;
		if (pane.loading || !pane.hasMore) return;
		pane.page += 1;
		await loadGoodsForCurrentCategory(false);
	}

	async function loadCartList() {
		if (!providerCode.value) return;

		try {
			const res : any = await shopHomeApis.cart({
				userId: getUserId(),
				manageId: getManageId(),
				providerCode: providerCode.value,
			});
			if (res?.resultCode === 200 && res.result) {
				cartInfo.value = res.result;
				cartGroups.value = Array.isArray(res.result.dataList) ? normalizeCartGroups(res.result.dataList) : [];
				if (cartGroups.value.length === 0) {
					showCartPopup.value = false;
				}
			} else {
				cartInfo.value = {};
				cartGroups.value = [];
				showCartPopup.value = false;
			}
		} catch {
			cartInfo.value = {};
			cartGroups.value = [];
		}
	}

	// async function refreshAfterCartChange() {
	// 	await loadCartList();
	// 	await loadGoodsForCurrentCategory(true);
	// }
	async function refreshAfterCartChange(afterCartLoaded?: () => void) {
		await loadCartList();
		afterCartLoaded?.();
		await loadGoodsForCurrentCategory(true);
	}

	async function updateCartNum(cartId : string | undefined, buyNums : number) {
		if (!cartId) return;
		try {
			const res : any = await shopHomeApis.updateCart({
				cartId,
				buyNums: String(Math.max(buyNums, 0)),
				userId: getUserId(),
			});
			if (res?.resultCode !== 200 && res?.message) {
				uni.showToast({ title: res.message, icon: "none" });
			}
			await refreshAfterCartChange();
		} catch (error : any) {
			uni.showToast({ title: error?.message || "购物车更新失败", icon: "none" });
		}
	}

	async function addCartBySku(sku : string | undefined, nums = 1) {
		if (!sku) return;
		try {
			const res : any = await shopHomeApis.addCart({
				nums: String(nums),
				sku,
				type: "0",
				userId: getUserId(),
			});
			console.log(res);
			if (res?.resultCode === 200 || res?.success !== false) {
				uni.showToast({ title: "加入购物车成功", icon: "none" });
			}
			await refreshAfterCartChange();
		} catch (error : any) {
			uni.showToast({ title: error?.message || "加入购物车失败", icon: "none" });
		}
	}

	async function addGoodsByCard(item : GoodsItem) {
		await addCartBySku(item.sku, 1);
	}

	async function increaseGoods(item : GoodsItem) {
		const nextNum = getGoodsNum(item) + 1;
		if (nextNum === 1 || !item.cartId) {
			await addCartBySku(item.sku, nextNum);
			return;
		}
		setGoodsNum(item, nextNum);
		await updateCartNum(item.cartId, nextNum);
	}

	async function decreaseGoods(item : GoodsItem) {
		const currentNum = getGoodsNum(item);
		if (currentNum <= 0) return;
		const nextNum = currentNum - 1;
		setGoodsNum(item, nextNum);
		await updateCartNum(item.cartId, nextNum);
	}

	async function increaseCartItem(item : CartItem) {
		item.buyNums = Number(item.buyNums || 0) + 1;
		await updateCartNum(item.cartId, item.buyNums);
	}

	async function decreaseCartItem(item : CartItem) {
		const nextNum = Math.max(Number(item.buyNums || 0) - 1, 0);
		item.buyNums = nextNum;
		await updateCartNum(item.cartId, nextNum);
	}

	async function toggleCollection() {
		if (!shopId.value) return;
		const isAttention = attentionFlag.value;
		try {
			await shopHomeApis.collection({
				shopId: shopId.value,
				userId: getUserId(),
				operateType: isAttention ? "0" : "1",
			});
			attentionFlag.value = !isAttention;
			shopInfo.value.attentionFlag = !isAttention;
			uni.showToast({
				title: isAttention ? "已取消收藏" : "收藏成功",
				icon: "none",
			});
		} catch (error : any) {
			uni.showToast({ title: error?.message || "操作失败", icon: "none" });
		}
	}

	async function receiveCouponItem(coupon : CouponItem) {
		if (coupon.receiveStatus !== "2") return;
		try {
			await shopHomeApis.coupon({
				couponId: coupon.couponId,
				userId: getUserId(),
			});
			coupon.receiveStatus = "1";
			uni.showToast({ title: "领取成功", icon: "none" });
		} catch (error : any) {
			uni.showToast({ title: error?.message || "领取失败", icon: "none" });
		}
	}

	async function switchCategory(index : number) {
		if (currentCategoryIndex.value === index) return;
		currentCategoryIndex.value = index;
		if (!activePane.value.loaded) {
			await loadGoodsForCurrentCategory(true);
		}
	}

	async function setAllSort() {
		const pane = activePane.value;
		if (pane.sortType === null) return;
		pane.sortType = null;
		await loadGoodsForCurrentCategory(true);
	}

	async function togglePriceSort() {
		const pane = activePane.value;
		pane.sortType = pane.sortType === "2" ? "1" : "2";
		await loadGoodsForCurrentCategory(true);
	}

	function toggleLayout() {
		activePane.value.layout = activePane.value.layout === "grid" ? "row" : "grid";
	}

	function toggleCartPopup() {
		if (!showBottomCart.value) return;
		showCartPopup.value = !showCartPopup.value;
	}

	function closeCartPopup() {
		showCartPopup.value = false;
	}
  
	function goGoodsDetail(item : GoodsItem) {
		if (!item.sku) return;
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopProductDetailPage?sku=${item.sku}`,
		});
	}

	function buildPreOrderParams(dataList : any[]) {
		const orderCompleteParamList : OrderCompleteParams[] = [];

		(dataList || []).forEach((dataListBean) => {
			const orderCompleteParams : OrderCompleteParams = {};
			const products : OrderCompleteProduct[] = [];
			let allNums = 0;

			(dataListBean?.groupValues || []).forEach((groupValuesBean : any) => {
				const checked = groupValuesBean?.checked !== false && groupValuesBean?.isChecked !== false;
				const giftGoodsFlag = isCartGiftItem(groupValuesBean);
				const price = getCartItemPrice(groupValuesBean);
				const buyNums = getCartItemCount(groupValuesBean);
				if (checked || giftGoodsFlag) {
					products.push({
						cartId: groupValuesBean.cartId,
						giftGoodsFlag,
						sku: groupValuesBean.sku,
						name: groupValuesBean.name,
						price,
						img: groupValuesBean.img,
						nums: buyNums,
						specs: groupValuesBean.specs,
						sums: price * buyNums,
						flowNo: groupValuesBean.flowNo || "",
					});
					allNums += buyNums;
				}
			});

			if (products.length > 0) {
				orderCompleteParams.productArray = products;
				orderCompleteParams.shopCode = dataListBean?.groupName?.shopCode || "";
				orderCompleteParams.shopName = dataListBean?.groupName?.shopName || "";
				orderCompleteParams.nums = allNums;
				orderCompleteParamList.push(orderCompleteParams);
			}
		});

		return orderCompleteParamList;
	}

	async function openYugouConfirmOrderPage() {
		const currentProviderCode = goodsInfo.value.providerCode || providerCode.value;
		if (!currentProviderCode) {
			uni.showToast({ title: "店铺信息缺失", icon: "none" });
			return;
		}

		try {
			const res : any = await shopHomeApis.preCart({
				userId: getUserId(),
				manageId: getManageId(),
				providerCode: currentProviderCode,
			});

			if (res?.resultCode === 200 && res.result) {
				const orderCompleteParamList = buildPreOrderParams(res.result.dataList || []);
				if (orderCompleteParamList.length > 0) {
					uni.setStorageSync("BussinessShopCarList", orderCompleteParamList);
					uni.navigateTo({
						url: "/pages/service/BussinessCircle/BussinessYugouConfirmOrderPage",
					});
					return;
				}
			}

			uni.showToast({ title: "预购数据获取失败", icon: "none" });
		} catch (error : any) {
			uni.showToast({ title: error?.message || "预购数据获取失败", icon: "none" });
		}
	}

	function buildOrderParams() {
		return cartGroups.value
			.map(group => {
				const products = (group.groupValues || [])
					.filter(item => isCartItemSelected(item))
					.map(item => ({
						cartId: item.cartId,
						giftGoodsFlag: isCartGiftItem(item),
						sku: item.sku,
						name: item.name,
						price: getCartItemPrice(item),
						img: item.img,
						nums: getCartItemCount(item),
						specs: item.specs,
						sums: getCartItemPrice(item) * getCartItemCount(item),
					}));

				if (products.length === 0) return null;

				return {
					productArray: products,
					shopCode: group.groupName?.shopCode,
					shopName: group.groupName?.shopName,
					nums: products.reduce((sum, item) => sum + Number(item.nums || 0), 0),
				};
			})
			.filter(Boolean) as Array<Record<string, any>>;
	}

	function submitOrder() {
		console.log("submit1")
		const orderCompleteParamList = buildOrderParams();
		if (orderCompleteParamList.length === 0) {
			uni.showToast({ title: "请至少选择一个产品", icon: "none" });
			return;
		}
		console.log("submit2")
		showCartPopup.value = false;
		uni.setStorageSync("BussinessShopCarList", orderCompleteParamList);
		console.log("submit3")
		uni.navigateTo({
			url: "/pages/service/BussinessCircle/BussinessShopConfirmOrderPage"
		});
	}

	function handlePrepay() {
		// showRouteToast("预付充值");
		uni.navigateTo({
			url: "/pages/mine/PrepaidWalletPage/prepayRechargePage"
		});
	}

	function handleShare() {
		showMoreMenu.value = false;
		showRouteToast("分享商家");
	}

	function handleComplain() {
		showMoreMenu.value = false;
		showRouteToast("举报商家");
	}

	function resetNoticeTimer() {
		if (noticeTimer) {
			clearTimeout(noticeTimer);
			noticeTimer = null;
		}
	}

	function selectSpec(groupIndex : number, attrIndex : number) {
		const group = specGroups.value[groupIndex];
		if (!group || !Array.isArray(group.attr)) return;
		const attr = group.attr[attrIndex];
		if (!attr) return;

		const key = attr.id || attr.value || attr.showName || "";
		selectedSpecIds.value[groupIndex] = key;
		selectedSpecValues.value[groupIndex] = attr.showName || attr.value || attr.name || "";
		group.attr.forEach((item, index) => {
			item.checked = index === attrIndex;
		});

		selectedSpecText.value = buildSelectedSpecText();
		if (selectedSpecIds.value.filter(Boolean).length === specGroups.value.length) {
			syncSkuBySpec();
		}
	}

	async function syncSkuBySpec() {
		const specAry = selectedSpecIds.value.filter(Boolean);
		const groups = specGroups.value || [];
		if (groups.length === 0 || specAry.length !== groups.length) return;

		try {
			const res : any = await shopHomeApis.skuBySpec(buildSpecRequest());
			if (res?.result) {
				syncSpecViewFromGoods(res.result);
				selectedSpecText.value = buildSelectedSpecText();
			}
		} catch (error : any) {
			uni.showToast({ title: error?.message || "规格加载失败", icon: "none" });
		}
	}

	function syncSpecViewFromGoods(data : GoodsInfo) {
		goodsInfo.value = {
			...goodsInfo.value,
			...data,
			imgAry: normalizeImages(data.imgAry),
			param: Array.isArray(data.param) ? data.param : goodsInfo.value.param || [],
			specs: Array.isArray(data.specs) ? data.specs : goodsInfo.value.specs || [],
		};
		currentSkuInfo.value = {
			...currentSkuInfo.value,
			...data,
			imgAry: normalizeImages(data.imgAry),
		};
		if (!selectedSpecText.value) {
			selectedSpecText.value = buildSelectedSpecText();
		}
	}


	onLoad((options : any) => {
		shopId.value = options.shopId || options.shopid || "";
		routeShopName.value = options.name || "";
		providerCode.value = options.providerCode || options.pcode || "";
		isPreMode.value = options.pre === true || options.pre === "true" || options.pre === "1";
		initPage();
	});

	onShow(() => {
		if (!firstShowHandled.value) {
			firstShowHandled.value = true;
			return;
		}
		refreshCurrentPage();
	});

	onUnload(() => {
		resetNoticeTimer();
	});
</script>

<style lang="scss" scoped>
	$base-color: #2a9598;
	$price-color: #e93b3d;

	.shop-home-page {
		min-height: 100vh;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #f3f4f8;
	}

	.top-bar {
		flex: 0 0 auto;
		background-color: $base-color;
	}

	.status-space {
		height: var(--status-bar-height);
	}

	.top-row {
		height: 44px;
		display: flex;
		align-items: center;
		padding: 0 8px;
		box-sizing: border-box;
	}

	.top-icon {
		position: relative;
		width: 34px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 34px;
	}

	.search-box {
		flex: 1;
		min-width: 0;
		height: 30px;
		margin: 0 8px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		border-radius: 15px;
		background-color: #ffffff;
		box-sizing: border-box;
	}

	.search-text {
		margin-left: 6px;
		color: #999999;
		font-size: 12px;
	}

	.cart-img {
		width: 24px;
		height: 24px;
	}

	.badge {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		border-radius: 8px;
		background-color: #ff4d4f;
		color: #ffffff;
		font-size: 10px;
		line-height: 16px;
		text-align: center;
		box-sizing: border-box;

		&.bottom {
			top: -4px;
			right: -8px;
		}
	}

	.shop-home-content {

		height: 90%;
		display: flex;
		flex-direction: column;



		&.has-cart {
			padding-bottom: calc(72px + env(safe-area-inset-bottom));
		}
	}

	.shop-info {
		flex: 0 0 auto;
		min-height: 70px;
		display: flex;
		align-items: center;
		padding: 14px 15px;
		background-color: $base-color;
		box-sizing: border-box;
	}

	.shop-cover {
		width: 44px;
		height: 44px;
		border-radius: 6px;
		background-color: #f5f5f5;
	}

	.shop-main {
		flex: 1;
		min-width: 0;
		margin-left: 10px;
	}

	.shop-title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.shop-title {
		min-width: 0;
		display: flex;
		align-items: center;
		color: #ffffff;
		font-size: 17px;
	}

	.shop-title-text {
		max-width: 170px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.collect-btn,
	.prepay-btn {
		min-width: 57px;
		height: 28px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ffffff;
		border-radius: 14px;
		color: #ffffff;
		font-size: 12px;
		box-sizing: border-box;
	}

	.collect-btn.selected {
		background-color: #ffffff;
		color: $base-color;
	}

	.prepay-btn {
		border-color: #ff4d4f;
		background-color: #ff4d4f;
	}

	.score-row,
	.pre-status-row {
		height: 24px;
		display: flex;
		align-items: center;
		margin-top: 4px;
	}

	.score-text {
		margin-left: 10px;
		color: #ffc600;
		font-size: 12px;
	}

	.closed-tag,
	.pre-tag {
		margin-left: 8px;
		padding: 2px 5px;
		border-radius: 4px;
		background-color: #ff8900;
		color: #ffffff;
		font-size: 10px;
	}

	.notice-row {
		flex: 0 0 40px;
		height: 40px;
		display: flex;
		align-items: center;
		padding: 0 15px;
		background-color: #f1f1f1;
		box-sizing: border-box;
	}

	.notice-text {
		min-width: 0;
		margin-left: 8px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #ff8900;
		font-size: 13px;
	}

	.coupon-scroll {
		flex: 0 0 112px;
		height: 112px;
		background-color: #ffffff;
		white-space: nowrap;
	}

	.coupon-list {
		display: inline-flex;
		padding: 10px 15px;
		box-sizing: border-box;
	}

	.coupon-card {
		height: 92px;
		min-width: 190px;
		display: flex;
		margin-right: 13px;
		border-radius: 8px;
		overflow: hidden;
		background-color: #fff4e6;
		border: 1px solid #ffd9a8;
		box-sizing: border-box;

		&.received {
			background-color: #f5f5f5;
			border-color: #e5e5e5;
			opacity: 0.75;
		}
	}

	.coupon-body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.coupon-money {
		color: #333333;
		font-size: 25px;
		line-height: 28px;
	}

	.coupon-limit {
		margin-top: 4px;
		color: #333333;
		font-size: 11px;
	}

	.coupon-time {
		margin-top: 5px;
		color: #333333;
		font-size: 9px;
	}

	.coupon-action {
		width: 36px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #ec7f47;
		font-size: 15px;
		line-height: 20px;
	}

	.goods-area {
		flex: 1;
		min-height: 0;
		display: flex;
		overflow: hidden;
		background-color: #ffffff;
		box-sizing: border-box;
	}

	.category-scroll {
		width: 22%;
		flex: 0 0 22%;
		min-height: 0;
		height: 100%;
		overflow-y: auto;
		background-color: #e5e5e5;
		box-sizing: border-box;
	}


	.category-item {
		position: relative;
		min-height: 55px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 6px;
		background-color: #ffffff;
		color: #333333;
		font-size: 13px;
		text-align: center;
		box-sizing: border-box;

		&.active {
			color: $base-color;
			font-weight: 500;
		}

		&.active .category-marker {
			display: block;
		}
	}

	.category-marker {
		display: none;
		position: absolute;
		left: 0;
		top: 12px;
		bottom: 12px;
		width: 3px;
		border-radius: 2px;
		background-color: $base-color;
	}

	.category-name {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.goods-panel {
		flex: 1;
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-sizing: border-box;
	}

	.sort-row {
		flex: 0 0 44px;
		height: 44px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eeeeee;
	}

	.sort-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666666;
		font-size: 14px;

		&.active {
			color: $base-color;
		}
	}

	.price-sort-icon {
		width: 16px;
		margin-left: 3px;
		font-size: 13px;
	}

	.layout-btn {
		width: 52px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goods-scroll {
		flex: 1;
		min-height: 0;
		height: 100%;
		overflow-y: auto;
		padding-bottom: 20px;
		box-sizing: border-box;
	}

	.goods-list {
		padding: 8px;
		box-sizing: border-box;

		&.grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 10px;
		}
	}

	.goods-card {
		min-width: 0;
		overflow: hidden;
		border-radius: 8px;
		background-color: #ffffff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

		&.row {
			display: flex;
			min-height: 108px;
			margin-bottom: 10px;
		}
	}

	.goods-img-box {
		position: relative;
		width: 100%;
		height: 120px;
		background-color: #f5f5f5;

		.row & {
			width: 110px;
			height: 108px;
			flex: 0 0 110px;
		}
	}

	.goods-img {
		width: 100%;
		height: 100%;
	}

	.pre-tag {
		position: absolute;
		top: 6px;
		left: 6px;
		margin-left: 0;
	}

	.goods-info {
		min-width: 0;
		padding: 8px;
	}

	.goods-title {
		height: 38px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		color: #333333;
		font-size: 13px;
		line-height: 19px;

		.row & {
			height: 42px;
			font-size: 14px;
			line-height: 21px;
		}
	}

	.goods-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 7px;
	}

	.goods-price {
		color: $price-color;
		font-size: 13px;
		font-weight: 600;
	}

	.goods-actions,
	.cart-item-action {
		display: flex;
		align-items: center;
	}

	.add-cart-btn {
		min-width: 42px;
		height: 24px;
		padding: 0 8px;
		border-radius: 12px;
		background-color: $base-color;
		color: #ffffff;
		font-size: 12px;
		line-height: 24px;
		text-align: center;
		box-sizing: border-box;
	}

	.qty-btn {
		width: 20px;
		height: 20px;
		border-radius: 5px;
		background-color: $base-color;
		border: 1px solid $base-color;
		color: #ffffff;
		font-size: 16px;
		line-height: 18px;
		text-align: center;
		box-sizing: border-box;

		&.plain {
			background-color: #ffffff;
			border-color: #666666;
			color: #666666;
		}
	}

	.qty-text {
		min-width: 24px;
		color: #333333;
		font-size: 13px;
		text-align: center;
	}

	.local-empty {
		padding: 36px 0;
		color: #999999;
		font-size: 13px;
		text-align: center;
	}

	.category-empty {
		flex: 1;
	}

	.load-tip {
		padding: 12px 0;
		color: #999999;
		font-size: 12px;
		text-align: center;
	}

	.bottom-cart {
		position: fixed;
		left: 5%;
		right: 5%;
		bottom: calc(8px + env(safe-area-inset-bottom));
		z-index: 999;

		height: 50px;
		display: flex;

		border-radius: 25px;
		overflow: hidden;
		background-color: $base-color;
		box-sizing: border-box;
	}

	.cart-summary {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
	}

	.bottom-cart-icon {
		position: relative;
		width: 48px;
		height: 50px;
		margin-left: 28px;
		display: flex;
		align-items: center;
	}

	.bottom-cart-img {
		width: 30px;
		height: 30px;
	}

	.cart-price-box {
		min-width: 0;
		margin-left: 12px;
	}

	.cart-price {
		color: #ffffff;
		font-size: 18px;
		line-height: 23px;
	}

	.delivery-fee {
		max-width: 160px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #ffffff;
		font-size: 11px;
	}

	.checkout-btn {
		width: 96px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ff8900;
		color: #ffffff;
		font-size: 15px;
	}


	/* =========================
 * 购物车 Popup
 * ========================= */
	.cart-popup {
		max-height: 70vh;
		padding-bottom: 65px;
		background-color: #ffffff;
		box-sizing: border-box;
	}

	.cart-popup-head {
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
		border-bottom: 1px solid #f0f0f0;
		box-sizing: border-box;
	}

	.cart-popup-title {
		color: #333333;
		font-size: 15px;
		font-weight: 500;
	}

	.cart-close {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cart-popup-scroll {
		max-height: calc(70vh - 109px);
	}

	.cart-group {
		padding: 0 15px;
	}

	.cart-item {
		display: flex;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.cart-item-img {
		width: 60px;
		height: 60px;
		flex: 0 0 60px;
		border-radius: 6px;
		background-color: #f5f5f5;
	}

	.cart-item-main {
		flex: 1;
		min-width: 0;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
	}

	.cart-item-title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #333333;
		font-size: 15px;
	}

	.cart-item-spec {
		margin-top: 5px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #666666;
		font-size: 12px;
	}

	.cart-item-price {
		margin-top: 5px;
		color: $base-color;
		font-size: 14px;
	}

	.more-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.04);
	}

	.more-menu {
		position: absolute;
		top: calc(var(--status-bar-height) + 40px);
		right: 15px;
	}

	.more-arrow {
		width: 0;
		height: 0;
		margin-left: auto;
		margin-right: 18px;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-bottom: 8px solid #ffffff;
	}

	.more-card {
		overflow: hidden;
		border-radius: 6px;
		background-color: #ffffff;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
	}

	.more-item {
		height: 56px;
		min-width: 126px;
		display: flex;
		align-items: center;
		padding: 0 14px;
		color: #333333;
		font-size: 14px;
		box-sizing: border-box;

		text {
			margin-left: 12px;
		}
	}

	.more-line {
		height: 1px;
		margin: 0 18px;
		background-color: #eeeeee;
	}


	.popup {
		padding: 15px;
		background: #fff;
	}

	.popup-head {
		display: flex;
		gap: 12px;
	}

	.popup-img {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		background: #f5f5f5;
	}

	.popup-head-info {
		flex: 1;
		min-width: 0;
	}

	.popup-price {
		color: #e93b3d;
		font-size: 18px;
		font-weight: 700;
	}

	.popup-stock,
	.popup-selected {
		margin-top: 6px;
		color: #666;
		font-size: 12px;
	}

	.popup-scroll {
		max-height: 45vh;
		margin-top: 14px;
	}

	.spec-group {
		margin-bottom: 14px;
	}

	.spec-name {
		margin-bottom: 8px;
		color: #333;
		font-size: 13px;
		font-weight: 600;
	}

	.spec-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.spec-tag {
		min-height: 30px;
		padding: 0 12px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #d9d9d9;
		border-radius: 15px;
		color: #333;
		font-size: 12px;
		background: #fff;
	}

	.spec-tag.active {
		border-color: #2a9595;
		color: #2a9595;
		background: #eef9f9;
	}

	.count-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 12px;
		color: #333;
		font-size: 13px;
	}

	.popup-actions {
		display: flex;
		gap: 10px;
		margin-top: 15px;
	}

	.popup-btn {
		flex: 1;
		height: 40px;
		border-radius: 20px;
		color: #fff;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
	}

	.popup-btn.plain {
		background: #2a9595;
	}

	.popup-btn.primary {
		background: #ff8900;
	}

	.pre-popup {
		width: 280px;
		padding: 20px 18px 16px;
		background: #fff;
		border-radius: 10px;
	}

	.pre-title {
		color: #333;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
	}

	.pre-text {
		margin-top: 10px;
		color: #666;
		font-size: 13px;
		line-height: 20px;
		text-align: center;
	}

	.pre-actions {
		display: flex;
		gap: 12px;
		margin-top: 18px;
	}

	.pre-btn {
		flex: 1;
		height: 36px;
		border-radius: 18px;
		color: #fff;
		font-size: 13px;
		line-height: 36px;
		text-align: center;
	}

	.pre-btn.cancel {
		background: #999;
	}

	.pre-btn.confirm {
		background: #2a9595;
	}
</style>
