<template>
	<view class="page">
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
			titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>

		<scroll-view class="content" scroll-y>
			<u-swiper v-if="swiperList.length > 0" :list="swiperList" indicator indicatorMode="line" circular
				height="320"></u-swiper>

			<view class="goods-card">
				<view class="goods-title">{{ goodsInfo.goodsName || "商品详情" }}</view>
				<view class="price-row">
					<view class="price-text">￥{{ formatMoney(goodsInfo.price) }}</view>
					<text v-if="Number(goodsInfo.is_pre) === 1" class="pre-tag">预购</text>
				</view>
				<view class="sale-row">
					<text>库存：{{ goodsInfo.nums ?? 0 }}</text>
					<text>销量：{{ goodsInfo.saleNum ?? goodsInfo.salesNum ?? 0 }}</text>
				</view>
			</view>

			<view class="section-gap"></view>

			<view class="spec-row" @click="openSpec('buy')">
				<text class="section-title">规格</text>
				<text class="spec-text">{{ selectedSpecText || "请选择规格" }}</text>
				<u-icon name="arrow-right" size="14" color="#999"></u-icon>
			</view>

			<view class="section-gap"></view>

			<view class="comment-card">
				<view class="section-head">
					<text class="section-title">评价</text>
					<text class="comment-summary">
						好评 {{ commentSummary.goodNum || 0 }}/{{ commentSummary.allNum || 0 }}
					</text>
				</view>

				<view v-if="commentList.length > 0" class="comment-list">
					<view v-for="(item, index) in commentList" :key="item.commentId || index" class="comment-item">
						<view class="comment-top">
							<text class="comment-name">{{ item.userName || item.acceptName || "用户" }}</text>
							<u-rate :count="5" :value="Number(item.point || item.score || 0)" size="12"
								active-color="#FFC600" readonly></u-rate>
						</view>
						<text class="comment-content">{{ item.contents || item.content || "" }}</text>
						<view v-if="normalizeImages(item.imgAry).length > 0" class="comment-imgs">
							<image v-for="img in normalizeImages(item.imgAry)" :key="img" class="comment-img"
								:src="resolveImage(img)" mode="aspectFill"
								@click="previewImages(normalizeImages(item.imgAry), img)"></image>
						</view>
					</view>
				</view>
				<view v-else class="empty-text">暂无评价</view>
			</view>

			<view class="section-gap"></view>

			<view class="detail-card">
				<view class="section-title detail-title">详情</view>
				<u-parse :content="goodsInfo.details || goodsInfo.content || ''"></u-parse>
			</view>
		</scroll-view>

		<view class="bottom-bar">
			<view class="bottom-item" @click="goBack">
				<u-icon name="home" size="18" color="#666"></u-icon>
				<text>店铺</text>
			</view>
			<view class="bottom-item" @click="tocart">
				<view class="cart-icon-box">
					<u-icon name="shopping-cart" size="18" color="#666"></u-icon>
					<text v-if="cartBadgeNum > 0" class="badge">{{ cartBadgeNum }}</text>
				</view>
				<text>购物车</text>
			</view>
			<view class="bottom-btn plain" @click="handleAction('cart')">加入购物车</view>
			<view class="bottom-btn primary" @click="handleAction('buy')">立即购买</view>
		</view>

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
				<view class="pre-actions">
					<view class="pre-btn cancel" @click="showPreConfirmPopup = false">取消</view>
					<view class="pre-btn confirm" @click="confirmPreOrder">确认</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import {
		addGoodsCart,
		addGoodsCartOrdPre,
		getGoodsCarList,
		getGoodsCarListOrdPre,
		getGoodsComment,
		getGoodsInfo,
		getGoodsInfoBySkuSpec,
		getGoodsRindInfo,
	} from "@/api/service";
	import { BaseImgURL, storage } from "@/utils/storage";

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

	interface CommentItem {
		commentId ?: string;
		userName ?: string;
		acceptName ?: string;
		point ?: number | string;
		score ?: number | string;
		contents ?: string;
		content ?: string;
		imgAry ?: string[];
	}

	const bgColor = ref("#2a9595");
	const sku = ref("");
	const showSpecPopup = ref(false);
	const showPreConfirmPopup = ref(false);
	const buyCount = ref(1);
	const goodsInfo = ref<GoodsInfo>({
		imgAry: [],
		param: [],
		specs: [],
	});
	const currentSkuInfo = ref<GoodsInfo>({});
	const commentList = ref<CommentItem[]>([]);
	const commentSummary = ref<{ goodNum ?: number; allNum ?: number }>({});
	const cartBadgeNum = ref(0);
	const selectedSpecIds = ref<string[]>([]);
	const selectedSpecText = ref("");
	const selectedSpecValues = ref<string[]>([]);

	const swiperList = computed(() => {
		const list = normalizeImages(goodsInfo.value.imgAry);
		if (list.length > 0) return list.map(item => resolveImage(item));
		if (goodsInfo.value.goodImg) return [resolveImage(goodsInfo.value.goodImg)];
		return [];
	});
	const productList = ref([]);
	
	const shopinfo = ref({});
		
	const contactList = ref();

	const specGroups = computed(() => goodsInfo.value.param || []);
	const maxBuyCount = computed(() => {
		const stock = Number(currentSkuInfo.value.nums ?? goodsInfo.value.nums ?? 0);
		return Math.max(stock > 0 ? stock : 9999, 1);
	});

	function getUserId() {
		return storage.getUserId() || "";
	}

	function getManageId() {
		return storage.getManid() || "";
	}

	function resolveImage(img ?: string) {
		if (!img) return "/static/logo.png";
		if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
		return `${BaseImgURL}${img.replace(/^\//, "")}`;
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

	function formatMoney(value ?: number | string) {
		const num = Number(value || 0);
		if (Number.isNaN(num)) return "0";
		return Number.isInteger(num) ? String(num) : num.toFixed(2);
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

	async function loadGoodsDetail() {
		const res : any = await getGoodsInfo({
			userId: getUserId(),
			sku: sku.value,
			manageId: getManageId(),
		});
		if (res?.result) {
			syncSpecViewFromGoods(res.result);
			const defaultGroups = goodsInfo.value.param || [];
			if (defaultGroups.length > 0) {
				selectedSpecIds.value = defaultGroups.map(() => "");
				selectedSpecValues.value = defaultGroups.map(() => "");
			}
		}
	}

	async function loadComments() {
		const res : any = await getGoodsComment({
			userId: getUserId(),
			sku: sku.value,
			page: 1,
			size: 20,
			manageId: getManageId(),
		});
		const result = res?.result || {};
		commentSummary.value = {
			goodNum: Number(result.goodNum || 0),
			allNum: Number(result.allNum || 0),
		};
		commentList.value = Array.isArray(result.goodsCommentAry) ? result.goodsCommentAry : [];
	}

	async function loadCartCount() {
		const api = Number(goodsInfo.value.is_pre) === 1 ? getGoodsCarListOrdPre : getGoodsCarList;
		const res : any = await api({
			userId: getUserId(),
			manageId: getManageId(),
			providerCode: goodsInfo.value.providerCode || "",
		});
		console.log(res);
		const dataList = res?.result?.dataList || [];
		let total = 0;
		dataList.forEach((group : any) => {
			(group.groupValues || []).forEach((item : any) => {
				total += Number(item.buyNums || 0);
			});
		});
		cartBadgeNum.value = total;
	}

	function buildSelectedSpecText() {
		return selectedSpecValues.value.filter(Boolean).join("；");
	}

	function buildSpecRequest() {
		const specAry = selectedSpecIds.value.filter(Boolean);
		return {
			goodsPublicId: goodsInfo.value.goodsPublicId,
			specAry,
			userId: getUserId(),
			manageId: getManageId(),
			sku: sku.value,
		};
	}

	async function syncSkuBySpec() {
		const specAry = selectedSpecIds.value.filter(Boolean);
		const groups = specGroups.value || [];
		if (groups.length === 0 || specAry.length !== groups.length) return;

		const res : any = await getGoodsInfoBySkuSpec(buildSpecRequest());
		if (res?.result) {
			syncSpecViewFromGoods(res.result);
			selectedSpecText.value = buildSelectedSpecText();
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

	function goBack() {
		uni.navigateBack();
	}

	function tocart() {
		// console.log(providerCode.value)
		uni.navigateTo({
			url: `/pages/service/BussinessCircle/BussinessShopCartPage?providerCode=${goodsInfo.value.providerCode}`,
		});
	}

	function openSpec() {
		showSpecPopup.value = true;
	}

	function closeSpec() {
		showSpecPopup.value = false;
	}

	function judgeNeedPreOrder(action : ActionType) {
		const stock = Number(currentSkuInfo.value.nums ?? goodsInfo.value.nums ?? 0);
		const allowPre = Number(goodsInfo.value.is_ord_pre) === 1;
		return action === "buy" && stock < buyCount.value && allowPre;
	}

	async function confirmPreOrder() {
		showPreConfirmPopup.value = false;
		await submitAction("buy", true);
	}

	async function handleAction(action : ActionType) {
		openSpec();
	}

	async function submitFromPopup(action : ActionType) {
		await submitAction(action);
	}

	async function submitAction(action : ActionType, forcePre = false) {
		const hasSpec = (specGroups.value || []).length > 0;
		const selectedCount = selectedSpecIds.value.filter(Boolean).length;
		if (hasSpec && selectedCount !== specGroups.value.length) {
			uni.showToast({ title: "请选择完整规格", icon: "none" });
			return;
		}

		if (!sku.value) {
			uni.showToast({ title: "商品信息缺失", icon: "none" });
			return;
		}

		if (!forcePre && judgeNeedPreOrder(action)) {
			const res : any = await getGoodsRindInfo({
				userId: getUserId(),
				manageId: getManageId(),
				sku: sku.value,
				goodsPublicId: goodsInfo.value.goodsPublicId,
				nums: buyCount.value,
			});
			if (res?.message) {
				uni.showToast({ title: res.message, icon: "none" });
			}
			showPreConfirmPopup.value = true;
			return;
		}

		const payload = {
			userId: getUserId(),
			manageId: getManageId(),
			sku: sku.value,
			nums: String(buyCount.value),
			type: action === "buy" ? "1" : "0",
			goodsPublicId: goodsInfo.value.goodsPublicId,
			specAry: selectedSpecIds.value.filter(Boolean),
			specs: selectedSpecValues.value.filter(Boolean),
		};

		const api = forcePre || Number(goodsInfo.value.is_pre) === 1
			? addGoodsCartOrdPre
			: addGoodsCart;

		const res : any = await api(payload);
		if (res?.success === false) {
			uni.showToast({ title: res?.message || "操作失败", icon: "none" });
			return;
		}
		uni.showToast({
			title: action === "buy" ? "已加入购买流程" : "已加入购物车",
			icon: "none",
		});
		closeSpec();
		if(action==="buy"){
			if(!forcePre){
				getcartlist();	
			}else{
				getPreCartlist();
			}
			
		}else{
			await loadCartCount();
		}
	
	}

	function getcartlist() {
		let param = {
			userId: storage.getUserId(),
			providerCode: goodsInfo.value.providerCode,
			manageId: storage.getManid()
		};
		console.log(param);
		getGoodsCarList(param).then(res => {
			console.log(res);
			contactList.value = res.result;
			productList.value = res.result.dataList[0].groupValues || [];
			shopinfo.value = res.result.dataList[0].groupName || {};
			shopinfo.value.checked = res.result.dataList[0].groupName.checked;
			productList.value.forEach(item => {
				item["checked"] = true;
			});
			console.log(contactList.value);
			submitOrder();
		});
	}

	function submitOrder() {
		let orderCompleteParamList = [];
		let products = [];
		let allnums = 0;
		let totalmoney = 0;
		let orderCompleteParam = {};
		let selectedItems = productList.value.filter(item => item.checked);
		selectedItems.forEach(childitem => {
			let product = {};
			product.cartId = childitem.cartId;
			product.giftGoodsFlag = childitem.giftGoodsFlag;
			product.sku = childitem.sku;
			product.name = childitem.name;
			product.price = childitem.price;
			product.img = childitem.img;
			product.nums = childitem.buyNums;
			product.specs = childitem.specs;
			product.sums = childitem.buyNums * childitem.price;
			allnums = allnums + childitem.buyNums;
			if (childitem.skuActiveId) {
				totalmoney = totalmoney + product.sums;
			}
			products.push(product);
		});
		orderCompleteParam.productArray = products;
		orderCompleteParam.shopCode = shopinfo.value.shopCode;
		orderCompleteParam.shopName = shopinfo.value.shopName;
		orderCompleteParam.nums = allnums;
		orderCompleteParamList.push(orderCompleteParam);
		console.log(orderCompleteParamList);
		uni.setStorageSync("BussinessShopCarList", orderCompleteParamList);
		uni.navigateTo({
			url: "/pages/service/BussinessCircle/BussinessShopConfirmOrderPage"
		});
	};

	function getPreCartlist() { 
		let param = {
			userId: storage.getUserId(),
			providerCode: goodsInfo.value.providerCode,
			manageId: storage.getManid()
		};
		console.log(param);
		getGoodsCarListOrdPre(param).then(res => {
			console.log(res);
			contactList.value = res.result;
			productList.value = res.result.dataList[0].groupValues || [];
			shopinfo.value = res.result.dataList[0].groupName || {};
			shopinfo.value.checked = res.result.dataList[0].groupName.checked;
			productList.value.forEach(item => {
				item["checked"] = true;
			});
			console.log(contactList.value);
			submitPreOrder();
		});
	}

	function submitPreOrder() {
		let orderCompleteParamList = [];
		let products = [];
		let allnums = 0;
		let totalmoney = 0;
		let orderCompleteParam = {};
		let selectedItems = productList.value.filter(item => item.checked);
		selectedItems.forEach(childitem => {
			let product = {};
			product.cartId = childitem.cartId;
			product.giftGoodsFlag = childitem.giftGoodsFlag;
			product.sku = childitem.sku;
			product.name = childitem.name;
			product.price = childitem.price;
			product.img = childitem.img;
			product.nums = childitem.buyNums;
			product.specs = childitem.specs;
			product.sums = childitem.buyNums * childitem.price;
			allnums = allnums + childitem.buyNums;
			if (childitem.skuActiveId) {
				totalmoney = totalmoney + product.sums;
			}
			products.push(product);
		});
		orderCompleteParam.productArray = products;
		orderCompleteParam.shopCode = shopinfo.value.shopCode;
		orderCompleteParam.shopName = shopinfo.value.shopName;
		orderCompleteParam.nums = allnums;
		orderCompleteParamList.push(orderCompleteParam);
		console.log(orderCompleteParamList);
		uni.setStorageSync("BussinessShopCarList", orderCompleteParamList);
		uni.navigateTo({
			url: "/pages/service/BussinessCircle/BussinessYugouConfirmOrderPage"
		});
	};

	function previewImages(images : string[], current : string) {
		if (!images || images.length === 0) return;
		uni.previewImage({
			urls: images.map(item => resolveImage(item)),
			current: resolveImage(current),
		});
	}

	async function initPage() {
		if (!sku.value) {
			uni.showToast({ title: "缺少商品标识", icon: "none" });
			return;
		}
		try {
			await loadGoodsDetail();
			await Promise.all([loadComments(), loadCartCount()]);
		} catch (error : any) {
			uni.showToast({ title: error?.message || "加载失败", icon: "none" });
		}
	}

	onLoad((options : any) => {
		sku.value = options.sku || options.id || "";
		initPage();
	});

	onShow(() => {
		if (sku.value) {
			loadCartCount();
		}
	});
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f3f4f8;
	}

	.content {
		height: calc(100vh - 54px);
		padding-bottom: 54px;
	}

	.goods-card,
	.comment-card,
	.detail-card {
		background: #fff;
		padding: 15px;
	}

	.goods-title {
		font-size: 16px;
		color: #333;
		line-height: 22px;
	}

	.price-row {
		display: flex;
		align-items: center;
		margin-top: 8px;
	}

	.price-text {
		color: #e93b3d;
		font-size: 18px;
		font-weight: 700;
	}

	.pre-tag {
		margin-left: 8px;
		padding: 2px 6px;
		border-radius: 4px;
		background: #ff8900;
		color: #fff;
		font-size: 10px;
	}

	.sale-row {
		display: flex;
		justify-content: space-between;
		margin-top: 8px;
		color: #999;
		font-size: 12px;
	}

	.section-gap {
		height: 10px;
		background: #f3f4f8;
	}

	.spec-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 15px;
		background: #fff;
	}

	.section-title {
		color: #333;
		font-size: 14px;
		font-weight: 600;
	}

	.spec-text {
		flex: 1;
		min-width: 0;
		color: #666;
		font-size: 13px;
		text-align: right;
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.comment-summary {
		color: #999;
		font-size: 12px;
	}

	.comment-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.comment-item {
		padding: 10px 0;
		border-top: 1px solid #f5f5f5;
	}

	.comment-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.comment-name {
		color: #333;
		font-size: 13px;
	}

	.comment-content {
		display: block;
		margin-top: 8px;
		color: #444;
		font-size: 13px;
		line-height: 20px;
	}

	.comment-imgs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.comment-img {
		width: 72px;
		height: 72px;
		border-radius: 6px;
		background: #f5f5f5;
	}

	.empty-text {
		color: #999;
		font-size: 13px;
		text-align: center;
	}

	.detail-title {
		margin-bottom: 10px;
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 20;
		height: 54px;
		display: flex;
		align-items: center;
		background: #fff;
		border-top: 1px solid #f0f0f0;
	}

	.bottom-item {
		width: 72px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #666;
		font-size: 11px;
	}

	.cart-icon-box {
		position: relative;
	}

	.badge {
		position: absolute;
		top: -5px;
		right: -8px;
		min-width: 15px;
		height: 15px;
		padding: 0 4px;
		border-radius: 8px;
		background: #ff4d4f;
		color: #fff;
		font-size: 9px;
		line-height: 15px;
		text-align: center;
	}

	.bottom-btn {
		flex: 1;
		height: 40px;
		margin-right: 10px;
		border-radius: 20px;
		color: #fff;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
	}

	.bottom-btn.plain {
		background: #2a9595;
	}

	.bottom-btn.primary {
		background: #ff8900;
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

