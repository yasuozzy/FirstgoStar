<template>
	<view class="page">
		<u-navbar title="商品详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view class="nav-left" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>

		<scroll-view class="content" scroll-y :lower-threshold="80" refresher-enabled :refresher-triggered="refreshing"
			@refresherrefresh="onRefresh" @scrolltolower="loadMoreComments">
			<u-swiper v-if="bannerList.length > 0" :list="bannerList" keyName="image" height="286" :autoplay="true"
				:interval="3000" :indicator="true" radius="0" imgMode="aspectFill"></u-swiper>

			<view class="goods-card">
				<text class="goods-title">{{ goodsInfo.goodsName || "" }}</text>
				<view v-if="!ispin" class="price-row">
					<text class="price-text">￥{{ formatMoney(goodsInfo.price) }}</text>
				</view>
			</view>

			<view v-if="!ispin && couponList.length > 0" class="coupon-card" @click="openCouponPopup">
				<view class="coupon-tag">优惠券</view>
				<text class="coupon-text">领券至少可减 ￥{{ formatMoney(couponList[0]?.couponMoney) }}</text>
				<u-icon name="arrow-right" size="14" color="#999"></u-icon>
			</view>

			<view v-if="ispin && joinList.length > 0" class="group-card">
				<view class="group-head">
					<text class="group-count">{{ joinListSize || joinList.length }}</text>
					<text class="group-head-text">人正在参加拼团，可直接参与</text>
					<view class="group-more" @click="handleMoreGroup">
						<text>查看更多</text>
						<u-icon name="arrow-right" size="14" color="#666"></u-icon>
					</view>
				</view>
				<view class="group-line"></view>
				<view v-for="item in displayJoinList" :key="item.flowNo || item.name || item.headImg"
					class="group-item">
					<image class="group-avatar" :src="resolveImage(item.headImg)" mode="aspectFill"></image>
					<text class="group-name">{{ item.name || "" }}</text>
					<view class="group-info">
						<text class="group-info-top">还差{{ formatInt(item.numss) }}人拼成</text>
						<text class="group-info-bottom">剩余 {{ countdownText(item) }}</text>
					</view>
					<view class="group-action" @click="handleJoinGroup(item)">去拼团</view>
				</view>
			</view>

			<view v-if="ispin" class="pin-summary">
				<view class="pin-row">
					<text class="pin-label">规格</text>
					<text class="pin-value">{{ selectedSpecText || "请选择规格" }}</text>
				</view>
				<view class="pin-row">
					<text class="pin-label">拼团价</text>
					<text class="pin-money">￥{{ formatMoney(groupDetail.goodsDetails?.aggPrice) }}</text>
				</view>
				<view class="pin-row">
					<text class="pin-label">原价</text>
					<text class="pin-money line">￥{{ formatMoney(groupDetail.goodsDetails?.marketPrice) }}</text>
				</view>
			</view>

			<view v-if="goodsInfo.details" class="detail-card">
				<view class="section-title">详情</view>
				<u-parse :content="goodsInfo.details"></u-parse>
			</view>

			<view class="comment-card">
				<view class="comment-head">
					<text class="section-title">{{ commentTitle }}</text>
					<view class="comment-summary">
						<text>好评 </text>
						<text class="comment-summary-value">{{ commentSummary.goodNum || 0 }}%</text>
					</view>
				</view>

				<view v-if="commentList.length > 0" class="comment-list">
					<view v-for="(item, index) in commentList" :key="item.id || index" class="comment-item">
						<view class="comment-top">
							<text class="comment-name">{{ item.userName || "用户" }}</text>
							<u-rate :value="Number(item.point || 0)" :count="5" size="12" readonly
								activeColor="#FFC600"></u-rate>
						</view>
						<text class="comment-content">{{ item.content || "" }}</text>
						<view v-if="normalizeCommentImages(item).length > 0" class="comment-images">
							<image v-for="img in normalizeCommentImages(item)" :key="img" class="comment-image"
								:src="img" mode="aspectFill" @click="previewImages(normalizeCommentImages(item), img)">
							</image>
						</view>
					</view>
				</view>
				<view v-else class="empty-text">暂无评价</view>
			</view>
		</scroll-view>

		<view class="bottom-bar">
			<view v-if="ispin" class="pin-bar">
				<view class="pin-btn buy" @click="openSpecByPin(1)">
					<text class="pin-btn-price">￥{{ formatMoney(goodsInfo.price) }}</text>
					<text class="pin-btn-text">立即购买</text>
				</view>
				<view class="pin-btn group" @click="openSpecByPin(2)">
					<text class="pin-btn-price">￥{{ formatMoney(groupDetail.goodsDetails?.aggPrice) }}</text>
					<text class="pin-btn-text">发起拼团</text>
				</view>
			</view>
			<view v-else class="normal-bar">
				<view class="normal-btn plain" @click="showToast('当前仅展示拼团商品详情')">加入购物车</view>
				<view class="normal-btn primary" @click="showToast('当前仅展示拼团商品详情')">立即购买</view>
			</view>
		</view>

		<u-popup :show="showSpecPopup" mode="bottom" :round="12" @close="closeSpecPopup">
			<view class="spec-popup">
				<view class="spec-head">
					<image class="spec-image" :src="popupImage" mode="aspectFill"></image>
					<view class="spec-head-info">
						<view class="spec-price">￥{{ popupPriceText }}</view>
						<view class="spec-stock">库存：{{ popupStockText }}</view>
						<view class="spec-selected">已选：{{ selectedSpecText || "未选择" }}</view>
					</view>
				</view>

				<scroll-view class="spec-scroll" scroll-y>
					<view v-for="(group, groupIndex) in specGroups" :key="group.id || groupIndex" class="spec-group">
						<view class="spec-group-title">{{ group.name }}</view>
						<view class="spec-tags">
							<view v-for="(attr, attrIndex) in group.attr" :key="attr.id || attrIndex" class="spec-tag"
								:class="{ active: selectedSpecIds[groupIndex] === (attr.id || attr.value || '') }"
								@click="selectSpec(groupIndex, attrIndex)">
								{{ attr.value || attr.showName || attr.name }}
							</view>
						</view>
					</view>

					<view class="qty-row">
						<text>购买数量</text>
						<u-number-box v-model="buyCount" :min="1" :max="9999"></u-number-box>
					</view>
				</scroll-view>

				<view class="spec-actions">
					<view v-if="popupActionType !== 'buyOnly'" class="spec-action plain"
						@click="submitFromPopup('cart')">加入购物车</view>
					<view v-if="popupActionType !== 'cartOnly'" class="spec-action primary"
						@click="submitFromPopup('buy')">{{ popupActionText }}</view>
				</view>
			</view>
		</u-popup>

		<u-popup :show="showCouponPopup" mode="bottom" :round="12" @close="showCouponPopup = false">
			<view class="coupon-popup">
				<view class="popup-title">优惠券</view>
				<scroll-view class="coupon-scroll" scroll-y>
					<view v-for="item in couponList" :key="item.couponId" class="coupon-item">
						<view class="coupon-money">￥{{ formatMoney(item.couponMoney) }}</view>
						<view class="coupon-info">
							<text class="coupon-name">{{ item.couponName || "" }}</text>
							<text class="coupon-desc">【满{{ formatMoney(item.fullMoneyIsUse) }}可用】</text>
							<text class="coupon-time">有效期至：{{ item.endTime || "" }}</text>
						</view>
						<view v-if="item.receiveStatus === '2'" class="coupon-action" @click="receiveCoupon(item)">领取
						</view>
						<view v-else class="coupon-got">已领取</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, ref } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import {
		addCart,
		addGoodsCart,
		addGoodsCartOrdPre,
		getGoodsComment,
		getGoodsInfo,
		getGoodsRindInfo,
		queryGroupDetails,
		qpeellGroups,
		receiveShopCoupon,
	} from "@/api/service";
	import { BaseImgURL, storage } from "@/utils/storage";

	interface SpecAttr { id ?: string; pId ?: string; value ?: string; showName ?: string; name ?: string }
	interface SpecGroup { id ?: string; name ?: string; attr ?: SpecAttr[] }
	interface GoodsCommentImage { imgSrc ?: string }
	interface GoodsCommentItem { id ?: string; userName ?: string; point ?: number | string; content ?: string; commentImgAry ?: GoodsCommentImage[] }
	interface CouponItem { couponId ?: string; couponName ?: string; couponMoney ?: number | string; fullMoneyIsUse ?: number | string; endTime ?: string; receiveStatus ?: string }
	interface GoodsInfo {
		goodsName ?: string; price ?: number | string; nums ?: number | string; details ?: string; imgAry ?: Array<{ goodImg ?: string }>;
		goodImg ?: string; param ?: SpecGroup[]; specs ?: Array<{ id ?: string; pId ?: string; value ?: string; showName ?: string }>;
		goodsPublicId ?: string; sku ?: string; providerCode ?: string; kindCode ?: string; realManageId ?: string; shopId ?: string; is_pre ?: number | string;
	}
	interface GroupJoinItem { numss ?: number | string; headImg ?: string; hour ?: number; minute ?: number; second ?: number; name ?: string; flowNo ?: string }
	interface GroupGoodsDetails { img ?: string; marketPrice ?: number | string; name ?: string; aggPrice ?: number | string; groupCount ?: number | string; sku ?: string; goodsRel ?: string }
	interface GroupDetailResult { joinListSize ?: string; goodsDetails ?: GroupGoodsDetails; joinList ?: GroupJoinItem[] }

	const bgColor = ref("#2a9598");
	const sku = ref("");
	const goodsRel = ref("");
	const ispin = ref(true);
	const pinType = ref<1 | 2 | 3>(1);
	const checkflowNo = ref("");
	const goodsInfo = ref<GoodsInfo>({ imgAry: [], param: [], specs: [] });
	const groupDetail = ref<GroupDetailResult>({});
	const couponList = ref<CouponItem[]>([]);
	const commentList = ref<GoodsCommentItem[]>([]);
	const commentSummary = ref<{ goodNum ?: number; allNum ?: number }>({});
	const selectedSpecIds = ref<string[]>([]);
	const selectedSpecValues = ref<string[]>([]);
	const selectedSpecText = ref("");
	const buyCount = ref(1);
	const showSpecPopup = ref(false);
	const showCouponPopup = ref(false);
	const popupActionType = ref<"all" | "cartOnly" | "buyOnly">("buyOnly");
	const refreshing = ref(false);
	const loading = ref(false);
	const timers : number[] = [];
	const countdownState = ref<Record<string, string>>({});

	const bannerList = computed(() => normalizeImages(goodsInfo.value.imgAry).map((image) => ({ image })));
	const specGroups = computed(() => goodsInfo.value.param || []);
	const joinListSize = computed(() => groupDetail.value.joinListSize || "");
	const joinList = computed(() => {
		const list = Array.isArray(groupDetail.value.joinList) ? groupDetail.value.joinList : [];
		return list.length > 2 ? list.slice(0, 1) : list;
	});
	const displayJoinList = computed(() => joinList.value);
	const popupImage = computed(() => {
		if (pinType.value === 1) return resolveImage(goodsInfo.value.imgAry?.[0]?.goodImg || goodsInfo.value.goodImg || "");
		if (groupDetail.value.goodsDetails?.img) return resolveImage(groupDetail.value.goodsDetails.img);
		return resolveImage(goodsInfo.value.imgAry?.[0]?.goodImg || goodsInfo.value.goodImg || "");
	});
	const popupPriceText = computed(() => (pinType.value === 1 ? formatMoney(goodsInfo.value.price) : formatMoney(groupDetail.value.goodsDetails?.aggPrice)));
	const popupStockText = computed(() => (pinType.value === 1 ? formatMoney(goodsInfo.value.nums) : formatMoney(groupDetail.value.goodsDetails?.groupCount)));
	const popupActionText = computed(() => (pinType.value === 2 ? "发起拼团" : pinType.value === 3 ? "立即参团" : "立即购买"));
	const commentTitle = computed(() => `评价（${commentSummary.value.allNum || 0}）`);

	function goBack() {
		uni.navigateBack();
		 }
	function showToast(title : string) {
		uni.showToast({ title, icon: "none" });
		 }
	function resolveImage(img ?: string) {
		if (!img) return "/static/service/placeholder.png"; 
		if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img; 
		return `${BaseImgURL}${img.replace(/^\//, "")}`; 
		}
	function normalizeImages(images ?: Array<{ goodImg ?: string }> | string[]) {
		if (!Array.isArray(images)) return []; return images.map((item) => (typeof item === "string" ? item : item.goodImg || "")).filter(Boolean).map((item) => resolveImage(item)); }
	function normalizeCommentImages(item : GoodsCommentItem) { return (item.commentImgAry || []).map((img) => img.imgSrc || "").filter(Boolean).map((img) => resolveImage(img)); }
	function formatMoney(value ?: number | string) { const num = Number(value || 0); if (Number.isNaN(num)) return "0.00"; return Number.isInteger(num) ? `${num}.00` : num.toFixed(2); }
	function formatInt(value ?: number | string) { const num = Number(value || 0); if (Number.isNaN(num)) return "0"; return String(Math.max(0, Math.floor(num))); }
	function countdownText(item : GroupJoinItem) { const key = item.flowNo || item.name || ""; return countdownState.value[key] || "00:00:00"; }
	function clearTimers() { while (timers.length > 0) { const timer = timers.pop(); if (timer) clearInterval(timer); } countdownState.value = {}; }
	function startTimers() { clearTimers(); displayJoinList.value.forEach((item) => { const key = item.flowNo || item.name || ""; const totalSeconds = Number(item.hour || 0) * 3600 + Number(item.minute || 0) * 60 + Number(item.second || 0); countdownState.value[key] = formatDuration(totalSeconds * 1000); const interval = window.setInterval(() => { countdownState.value[key] = formatDuration(totalSeconds * 1000); }, 1000); timers.push(interval); }); }
	function formatDuration(ms : number) { let seconds = Math.max(0, Math.floor(ms / 1000)); const hours = Math.floor(seconds / 3600); seconds -= hours * 3600; const minutes = Math.floor(seconds / 60); seconds -= minutes * 60; const pad = (num : number) => String(num).padStart(2, "0"); return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`; }
	function buildDefaultSpecText() { const specs = goodsInfo.value.specs || []; if (specs.length === 0) return ""; return specs.map((item) => item.showName || item.value || "").filter(Boolean).join("，"); }
	function initSelectedSpecState() { const groups = specGroups.value || []; if (groups.length === 0) { selectedSpecIds.value = []; selectedSpecValues.value = []; return; } const specList = goodsInfo.value.specs || []; selectedSpecIds.value = groups.map(() => ""); selectedSpecValues.value = groups.map(() => ""); groups.forEach((group, groupIndex) => { const matched = (group.attr || []).find((attr) => specList.some((spec) => spec.id === attr.id)); if (matched) { selectedSpecIds.value[groupIndex] = matched.id || matched.value || ""; selectedSpecValues.value[groupIndex] = matched.showName || matched.value || matched.name || ""; } }); selectedSpecText.value = selectedSpecValues.value.filter(Boolean).join("，") || buildDefaultSpecText(); }
	function selectSpec(groupIndex : number, attrIndex : number) { const group = specGroups.value[groupIndex]; const attr = group?.attr?.[attrIndex]; if (!group || !attr) return; selectedSpecIds.value[groupIndex] = attr.id || attr.value || ""; selectedSpecValues.value[groupIndex] = attr.showName || attr.value || attr.name || ""; selectedSpecText.value = selectedSpecValues.value.filter(Boolean).join("，"); }
	async function loadGoodsInfo() { if (!sku.value) return; const res : any = await getGoodsInfo({ sku: sku.value, userId: storage.getUserId(), manageId: storage.getManid() }); if (res?.resultCode === 200 && res.result) { goodsInfo.value = { ...goodsInfo.value, ...res.result, imgAry: Array.isArray(res.result.imgAry) ? res.result.imgAry : [], param: Array.isArray(res.result.param) ? res.result.param : [], specs: Array.isArray(res.result.specs) ? res.result.specs : [] }; couponList.value = Array.isArray(res.result.couponList) ? res.result.couponList : []; initSelectedSpecState(); } }
	async function loadGroupDetail() { if (!sku.value || !goodsRel.value) return; const res : any = await queryGroupDetails({ sku: sku.value, flowNo: "", goodsRel: goodsRel.value }); if (res?.resultCode === 200 && res.result) { groupDetail.value = res.result; startTimers(); } }
	async function loadComments() { if (!sku.value) return; const res : any = await getGoodsComment({ commentType: String(buyCount.value), sku: sku.value, page: "1", size: "1" }); if (res?.resultCode === 200 && res.result) { commentSummary.value = { goodNum: Number(res.result.goodNum || 0), allNum: Number(res.result.allNum || 0) }; commentList.value = Array.isArray(res.result.goodsCommentAry) ? res.result.goodsCommentAry : []; } else { commentSummary.value = {}; commentList.value = []; } }
	async function reloadAll() { if (!sku.value || loading.value) return; loading.value = true; try { await loadGoodsInfo(); await loadGroupDetail(); await loadComments(); } catch (error : any) { showToast(error?.message || "加载失败"); } finally { loading.value = false; refreshing.value = false; uni.stopPullDownRefresh(); } }
	function openCouponPopup() { showCouponPopup.value = true; }
	async function receiveCoupon(item : CouponItem) { if (!item.couponId) return; try { const res : any = await receiveShopCoupon({ couponId: item.couponId, userId: storage.getUserId() }); if (res?.resultCode === 200 || res?.success !== false) { item.receiveStatus = "1"; showToast("领取成功"); } else { showToast(res?.message || "领取失败"); } } catch (error : any) { showToast(error?.message || "领取失败"); } }
	function openSpecByPin(type : 1 | 2) { pinType.value = type; checkRestrictionAndOpenSpec(); }
	async function handleJoinGroup(item : GroupJoinItem) { if (storage.getLoginType && storage.getLoginType() === "company") { showToast("企业用户无法参加当前活动"); return; } pinType.value = 3; checkflowNo.value = item.flowNo || ""; checkRestrictionAndOpenSpec(); }
	function handleMoreGroup() { showToast("暂无拼团列表页面"); }
	async function checkRestrictionAndOpenSpec() { try { const res : any = await getGoodsRindInfo({ providerCode: goodsInfo.value.providerCode, kindCode: goodsInfo.value.kindCode }); if (res?.resultCode === 200) { if (res.result) { uni.showModal({ title: "提示", content: String(res.result), confirmText: "确认", cancelText: "取消", success: (modalRes) => { if (modalRes.confirm) { openSpecPopup("buyOnly"); } } }); return; } openSpecPopup("buyOnly"); } } catch { openSpecPopup("buyOnly"); } }
	function openSpecPopup(type : "all" | "cartOnly" | "buyOnly" = "buyOnly") { popupActionType.value = type; if (!selectedSpecText.value) { selectedSpecText.value = buildDefaultSpecText(); } showSpecPopup.value = true; }
	function closeSpecPopup() { showSpecPopup.value = false; }
	function getPopupStock() { if (pinType.value === 1) return Number(goodsInfo.value.nums || 0); return Number(groupDetail.value.goodsDetails?.groupCount || 0); }
	async function submitFromPopup(action : "cart" | "buy") { if (goodsInfo.value.specs && goodsInfo.value.specs.length > 0 && !selectedSpecText.value) { showToast("请选择规格"); return; } if (buyCount.value < 1 || buyCount.value > 9999) { showToast("选在产品数量超出可选范围"); return; } const stock = getPopupStock(); if (buyCount.value > stock) { showToast("购买数量不能大于库存"); return; } if (goodsInfo.value.realManageId && goodsInfo.value.realManageId !== storage.getManid()) { showToast("此商品超出购买范围"); } try { if (!ispin.value) { await handleNormalSubmit(action); return; } if (pinType.value === 1) { await handleDirectBuy(); } else if (pinType.value === 2) { await handleCreateGroup(); } else if (pinType.value === 3) { await handleJoinGroupSubmit(); } } catch (error : any) { showToast(error?.message || "提交失败"); } }
	async function handleNormalSubmit(action : "cart" | "buy") { const api = Number(goodsInfo.value.is_pre) === 1 ? addGoodsCartOrdPre : addGoodsCart; const res : any = await api({ nums: String(buyCount.value), sku: sku.value, type: action === "buy" ? "1" : "0", userId: storage.getUserId() }); if (res?.resultCode === 200 || res?.success !== false) { showToast(action === "buy" ? "已加入购买流程" : "加入购物车成功"); closeSpecPopup(); return; } showToast(res?.message || "操作失败"); }
	async function handleDirectBuy() { const res : any = await addGoodsCart({ nums: String(buyCount.value), sku: sku.value, type: "1", userId: storage.getUserId() }); if (res?.resultCode !== 200 && res?.success === false) { showToast(res?.message || "提交失败"); return; } const orderList = buildConfirmOrderList(res?.result || {}, goodsInfo.value.price, buyCount.value, selectedSpecText.value); openConfirmPage(orderList); }
	async function handleCreateGroup() { const res : any = await qpeellGroups({ userId: storage.getUserId(), goodsRel: goodsRel.value, type: "00", price: String(groupDetail.value.goodsDetails?.aggPrice || 0), num: String(buyCount.value) }); if (res?.resultCode !== 200 && res?.success === false) { showToast(res?.message || "提交失败"); return; } const startRes = res?.result || {}; const addRes : any = await addCart({ userId: storage.getUserId(), goodsRel: goodsRel.value, batchNo: startRes.batchNo || "", type: "01", sku: sku.value, flowNo: startRes.flowNo || "", num: String(buyCount.value) }); const orderList = buildConfirmOrderList(addRes?.result || {}, groupDetail.value.goodsDetails?.aggPrice, buyCount.value, selectedSpecText.value); openConfirmPage(orderList); }
	async function handleJoinGroupSubmit() { const res : any = await qpeellGroups({ userId: storage.getUserId(), flowNo: checkflowNo.value, type: "01", price: String(groupDetail.value.goodsDetails?.aggPrice || 0), num: String(buyCount.value) }); if (res?.resultCode !== 200 && res?.success === false) { showToast(res?.message || "提交失败"); return; } const startRes = res?.result || {}; const addRes : any = await addCart({ userId: storage.getUserId(), goodsRel: goodsRel.value, batchNo: startRes.batchNo || "", type: "01", sku: sku.value, flowNo: startRes.flowNo || checkflowNo.value, num: String(buyCount.value) }); const orderList = buildConfirmOrderList(addRes?.result || {}, groupDetail.value.goodsDetails?.aggPrice, buyCount.value, selectedSpecText.value); openConfirmPage(orderList); }
	function buildConfirmOrderList(result : Record<string, any>, price : number | string | undefined, nums : number, specs : string) { return [{ shopCode: result.shopCode || goodsInfo.value.providerCode || goodsInfo.value.shopId || "", shopName: result.shopName || "", cutdown: 0, productArray: [{ cartId: result.cartId || result.id || "", img: result.img || popupImage.value, name: result.name || goodsInfo.value.goodsName || "", price: result.price || price || 0, nums, specs, flowNo: result.flowNo || checkflowNo.value || "" }] }]; }
	function openConfirmPage(orderList : any[]) { uni.setStorageSync("BussinessShopCarList", orderList); uni.navigateTo({ url: "/pages/service/BussinessCircle/BussinessShopConfirmOrderPage" }); closeSpecPopup(); }
	function previewImages(images : string[], current : string) { if (!images || images.length === 0) return; uni.previewImage({ urls: images, current }); }
	function onRefresh() { refreshing.value = true; reloadAll(); }
	function loadMoreComments() { if (!sku.value || loading.value) return; loadComments(); }
	onLoad((options : any) => { sku.value = options?.sku || options?.id || ""; goodsRel.value = options?.goods_rel || options?.goodsRel || ""; ispin.value = options?.ispin === true || options?.ispin === "true" || options?.ispin === "1"; buyCount.value = 1; reloadAll(); });
	onShow(() => { if (!sku.value) return; if (refreshing.value) return; if (loading.value) return; reloadAll(); });
	onBeforeUnmount(() => { clearTimers(); });
</script>

<style scoped lang="scss">
	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f5f5f5;
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
		padding-bottom: 68px;
		box-sizing: border-box;
	}

	.goods-card,
	.coupon-card,
	.group-card,
	.pin-summary,
	.detail-card,
	.comment-card {
		background: #fff;
	}

	.goods-card {
		padding: 14px 15px 10px;
	}

	.goods-title {
		display: block;
		color: #333;
		font-size: 15px;
		line-height: 22px;
	}

	.price-row {
		margin-top: 10px;
	}

	.price-text {
		color: #e32222;
		font-size: 18px;
		font-weight: 600;
	}

	.coupon-card {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 14px 15px;
		border-top: 10px solid #f5f5f5;
	}

	.coupon-tag {
		padding: 2px 6px;
		border: 1px solid #e32222;
		border-radius: 4px;
		color: #e32222;
		font-size: 12px;
	}

	.coupon-text {
		flex: 1;
		min-width: 0;
		color: #333;
		font-size: 13px;
	}

	.group-card {
		padding: 0 15px 6px;
		border-top: 10px solid #f5f5f5;
	}

	.group-head {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 10px 0;
	}

	.group-count {
		color: #e32222;
		font-size: 14px;
	}

	.group-head-text {
		color: #333;
		font-size: 14px;
	}

	.group-more {
		margin-left: auto;
		display: flex;
		align-items: center;
		color: #666;
		font-size: 13px;
	}

	.group-line {
		height: 1px;
		background: #f1f1f1;
	}

	.group-item {
		min-height: 54px;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 0;
		box-sizing: border-box;
	}

	.group-avatar {
		width: 33px;
		height: 33px;
		border-radius: 50%;
		background: #f5f5f5;
	}

	.group-name {
		color: #333;
		font-size: 14px;
	}

	.group-info {
		margin-left: auto;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: #666;
		font-size: 12px;
		line-height: 18px;
	}

	.group-info-top {
		color: #e32222;
	}

	.group-action {
		margin-left: 10px;
		padding: 6px 12px;
		border: 1px solid #e32222;
		border-radius: 14px;
		color: #e32222;
		font-size: 12px;
	}

	.pin-summary {
		margin-top: 10px;
		padding: 12px 15px;
	}

	.pin-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 0;
	}

	.pin-label {
		color: #999;
		font-size: 12px;
	}

	.pin-value {
		flex: 1;
		margin-left: 12px;
		color: #333;
		font-size: 12px;
		text-align: right;
	}

	.pin-money {
		color: #e32222;
		font-size: 12px;
	}

	.pin-money.line {
		text-decoration: line-through;
		color: #666;
	}

	.detail-card,
	.comment-card {
		margin-top: 10px;
		padding: 15px;
	}

	.section-title {
		color: #333;
		font-size: 14px;
		font-weight: 600;
	}

	.comment-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.comment-summary {
		color: #999;
		font-size: 12px;
	}

	.comment-summary-value {
		color: #2a9598;
	}

	.comment-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.comment-item {
		padding-top: 10px;
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

	.comment-images {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.comment-image {
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

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 20;
		background: #fff;
		border-top: 1px solid #f0f0f0;
	}

	.pin-bar {
		display: flex;
		height: 54px;
	}

	.pin-btn {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.pin-btn.buy {
		background: #fb8c03;
	}

	.pin-btn.group {
		background: #e32222;
	}

	.pin-btn-price {
		font-size: 15px;
		line-height: 18px;
	}

	.pin-btn-text {
		font-size: 12px;
		line-height: 18px;
	}

	.normal-bar {
		display: flex;
		gap: 10px;
		padding: 7px 10px;
		box-sizing: border-box;
	}

	.normal-btn {
		flex: 1;
		height: 40px;
		border-radius: 20px;
		color: #fff;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
	}

	.normal-btn.plain {
		background: #2a9598;
	}

	.normal-btn.primary {
		background: #ff8900;
	}

	.spec-popup {
		padding: 16px;
		background: #fff;
	}

	.spec-head {
		display: flex;
		gap: 12px;
	}

	.spec-image {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		background: #f5f5f5;
	}

	.spec-head-info {
		flex: 1;
		min-width: 0;
	}

	.spec-price {
		color: #e32222;
		font-size: 18px;
		font-weight: 600;
	}

	.spec-stock,
	.spec-selected {
		margin-top: 6px;
		color: #666;
		font-size: 12px;
		line-height: 18px;
	}

	.spec-scroll {
		max-height: 44vh;
		margin-top: 14px;
	}

	.spec-group {
		margin-bottom: 14px;
	}

	.spec-group-title {
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
		box-sizing: border-box;
	}

	.spec-tag.active {
		border-color: #2a9598;
		color: #2a9598;
		background: #eef8f8;
	}

	.qty-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 12px;
		color: #333;
		font-size: 13px;
	}

	.spec-actions {
		display: flex;
		gap: 10px;
		margin-top: 16px;
	}

	.spec-action {
		flex: 1;
		height: 40px;
		border-radius: 20px;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
	}

	.spec-action.plain {
		border: 1px solid #d9d9d9;
		color: #333;
	}

	.spec-action.primary {
		background: #2a9598;
		color: #fff;
	}

	.coupon-popup {
		padding: 16px;
		background: #fff;
	}

	.popup-title {
		margin-bottom: 12px;
		color: #333;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
	}

	.coupon-scroll {
		max-height: 55vh;
	}

	.coupon-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.coupon-money {
		color: #e32222;
		font-size: 18px;
		font-weight: 600;
	}

	.coupon-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.coupon-name {
		color: #333;
		font-size: 13px;
	}

	.coupon-desc,
	.coupon-time {
		color: #666;
		font-size: 12px;
	}

	.coupon-action {
		padding: 6px 12px;
		border: 1px solid #e32222;
		border-radius: 14px;
		color: #e32222;
		font-size: 12px;
	}

	.coupon-got {
		color: #999;
		font-size: 12px;
	}
</style>