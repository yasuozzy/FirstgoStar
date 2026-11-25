<template>
  <view class="page">
    <u-navbar
      title="售后申请单"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
        <view class="nav-left" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>

    <scroll-view class="content" scroll-y>
      <view class="info-card">
        <view class="info-row">
          <text class="info-label">订单编号</text>
          <text class="info-value">{{ orderInfo.orderNo || "--" }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">店铺名称</text>
          <text class="info-value">{{ orderInfo.shopName || goodsItem.shopName || "--" }}</text>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="goods-card">
        <image class="goods-img" :src="resolveImage(goodsImage)" mode="aspectFill"></image>
        <view class="goods-main">
          <text class="goods-name">{{ goodsItem.name || goodsItem.goodName || "--" }}</text>
          <text class="goods-specs">{{ goodsItem.specs || goodsItem.spec || "--" }}</text>
          <view class="goods-bottom">
            <text class="goods-price">￥{{ formatMoney(goodsPrice) }}</text>
            <text class="goods-num">x{{ goodsNumText }}</text>
          </view>
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <view class="section-title">售后类型</view>
        <view class="tag-row">
          <up-tag
            v-for="item in serviceTypeOptions"
            :key="item.value"
            :text="item.label"
            type="primary"
            :plain="serviceType !== item.value"
            @click="selectServiceType(item.value)"
          />
        </view>
      </view>

      <view v-if="serviceType === '10'" class="section-gap"></view>

      <view v-if="serviceType === '10'" class="section-card">
        <view class="section-title">退款方式</view>
        <view class="tag-row">
          <up-tag
            v-for="item in refundTypeOptions"
            :key="item.value"
            :text="item.label"
            type="primary"
            :plain="refundType !== item.value"
            @click="refundType = item.value"
          />
        </view>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <view class="section-title">问题描述</view>
        <textarea
          class="desc-textarea"
          v-model="questionDesc"
          placeholder="请填写问题描述"
        ></textarea>
      </view>

      <view class="section-gap"></view>

      <view class="section-card">
        <view class="section-title">上传凭证</view>
        <view class="upload-tip">最多上传{{ MAX_IMAGE_COUNT }}张</view>
        <view class="image-grid">
          <view
            v-for="(img, index) in imageList"
            :key="`${img}-${index}`"
            class="image-item"
          >
            <image class="image-view" :src="img" mode="aspectFill"></image>
          </view>
          <view
            v-if="imageList.length < MAX_IMAGE_COUNT"
            class="image-item add-item"
            @click="selectFile"
          >
            <u-icon name="plus" size="24" color="#999"></u-icon>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view class="submit-btn" :class="{ disabled: submitting || uploading }" @click="submitForm">
        {{ submitting ? "提交中..." : "提交" }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { addSelfAppAfsApply, getCustomerOrderInfoView } from "@/api/service";
import eventBus from "@/utils/eventBus";
import { BaseImgURL, getStorage, storage, storageKeys, uploadMultipleFiles } from "@/utils/storage";
const app = getApp();

interface OrderGoodsItem {
  childId?: string;
  id?: string;
  orderChildId?: string;
  sku?: string;
  img?: string;
  goodImg?: string;
  name?: string;
  goodName?: string;
  specs?: string;
  spec?: string;
  nums?: number | string;
  price?: number | string;
  goodPrice?: number | string;
  shopName?: string;
  orderNo?: string;
  orderId?: string;
  userName?: string;
  mobile?: string;
}

interface OrderInfo extends OrderGoodsItem {
  orderDetailAry?: OrderGoodsItem[];
  pCode?: string;
  shopCode?: string;
  userId?: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const bgColor = ref("#2a9595");
const MAX_IMAGE_COUNT = 5;

const routeOrderId = ref("");
const routeShopCode = ref("");
const orderInfo = ref<OrderInfo>({});
const goodsItem = ref<OrderGoodsItem>({});
const serviceType = ref("10");
const refundType = ref("1");
const questionDesc = ref("");
const imageList = ref<string[]>([]);
const imageServerList = ref<string[]>([]);
const submitting = ref(false);
const uploading = ref(false);

const serviceTypeOptions: SelectOption[] = [
  { label: "退货", value: "10" },
  { label: "换货", value: "20" },
  { label: "维修", value: "30" },
];

const refundTypeOptions: SelectOption[] = [
  { label: "原路退回", value: "1" },
  { label: "退回余额", value: "2" },
];

const goodsImage = computed(() => {
  return goodsItem.value.goodImg || goodsItem.value.img || "";
});

const goodsPrice = computed(() => {
  return goodsItem.value.goodPrice ?? goodsItem.value.price ?? 0;
});

const goodsNumText = computed(() => {
  return goodsItem.value.nums ?? 1;
});

function goBack() {
  uni.navigateBack();
}

function showToast(title: string) {
  uni.showToast({
    title,
    icon: "none",
  });
}

function safeDecode(value?: string) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function tryParseJson(value: string) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function resolveImage(img?: string) {
  if (!img) return "/static/default-image.png";
  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

function formatMoney(value?: number | string) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0.00";
  return Number.isInteger(num) ? `${num}.00` : num.toFixed(2);
}

function getUserId() {
  return storage.getUserId() || "";
}

function getUserName() {
  return storage.getRealName() || storage.getNickName() || orderInfo.value.userName || "";
}

function getMobile() {
  return storage.getPhone() || orderInfo.value.mobile || "";
}

function getSelectedGoods(list: OrderGoodsItem[]) {
  if (!Array.isArray(list) || list.length === 0) return {};
  const targetKey = String(
    goodsItem.value.childId ||
      goodsItem.value.id ||
      goodsItem.value.orderChildId ||
      goodsItem.value.sku ||
      ""
  );
  const matched = list.find((item) => {
    const currentKey = String(item.childId || item.id || item.orderChildId || item.sku || "");
    return targetKey !== "" && currentKey === targetKey;
  });
  return matched || list[0] || {};
}

function selectServiceType(value: string) {
  serviceType.value = value;
}

async function selectFile() {
  if (uploading.value) return;
  const remainCount = MAX_IMAGE_COUNT - imageList.value.length;
  if (remainCount <= 0) {
    showToast(`最多上传${MAX_IMAGE_COUNT}张`);
    return;
  }
  uni.chooseImage({
    count: remainCount,
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: async (res) => {
      const tempFiles = res.tempFilePaths || [];
      if (tempFiles.length === 0) return;
      imageList.value = imageList.value.concat(tempFiles);
      uploading.value = true;
      try {
        const result = await uploadMultipleFiles({}, tempFiles, getStorage(storageKeys.token, ""));
        const uploadUrls = result
          .map((item: any) => item?.data || item?.url || item?.result || "")
          .filter(Boolean);
        imageServerList.value = imageServerList.value.concat(uploadUrls);
      } catch (error: any) {
        showToast(error?.message || "图片上传失败");
      } finally {
        uploading.value = false;
      }
    },
  });
}

function validateForm() {
  if (!serviceType.value) {
    showToast("请选择售后类型");
    return false;
  }
  if (!questionDesc.value.trim()) {
    showToast("请填写问题描述");
    return false;
  }
  if (imageServerList.value.length === 0) {
    showToast("请上传凭证图片");
    return false;
  }
  return true;
}

function buildSubmitPayload() {
  const currentGoods = goodsItem.value || {};
  const price = Number(currentGoods.goodPrice ?? currentGoods.price ?? 0);
  const returnNum = Number(currentGoods.nums ?? 1);
  return {
    orderId: orderInfo.value.orderId || routeOrderId.value,
    userName: orderInfo.value.userName || currentGoods.userName || getUserName(),
    mobile: orderInfo.value.mobile || currentGoods.mobile || getMobile(),
    pCode: routeShopCode.value || orderInfo.value.shopCode || orderInfo.value.pCode || "",
    orderChildId: currentGoods.childId || currentGoods.id || currentGoods.orderChildId || "",
    sku: currentGoods.sku || "",
    price,
    returnNum,
    customerExpect: serviceType.value,
    questionPic: imageServerList.value.join(","),
    questionDesc: questionDesc.value.trim(),
    sumPrice: price * returnNum,
    orderNo: orderInfo.value.orderNo || currentGoods.orderNo || "",
    userId: getUserId(),
  };
}

async function submitForm() {
  if (submitting.value || uploading.value) return;
  if (!validateForm()) return;
  submitting.value = true;
  try {
    const res: any = await addSelfAppAfsApply(buildSubmitPayload());
	console.log(res);
    if (res?.resultCode === 200 || res?.success !== false) {
      showToast("申请售后成功");
      eventBus.emit("refresh-order-list");
      eventBus.emit("refresh-order-num");
      setTimeout(() => {
        uni.navigateBack();
      }, 300);
      return;
    }
    showToast(res?.message || "提交失败");
  } catch (error: any) {
    showToast(error?.message || "提交失败");
  } finally {
    submitting.value = false;
  }
}

onLoad((options: any) => {
	orderInfo.value = app.globalData.currentshouhouItem || {};
	goodsItem.value =app.globalData.currentshouhougoodsItem ||{};
	console.log(orderInfo.value)
  // routeOrderId.value = safeDecode(options?.orderId || options?.orderNo || "");
  // routeShopCode.value = safeDecode(options?.shopCode || options?.pCode || "");

  // const rawData = safeDecode(options?.data || options?.item || "");
  // const parsed = tryParseJson(rawData);
  // if (parsed && typeof parsed === "object") {
  //   orderInfo.value = parsed;
  //   if (Array.isArray(parsed.orderDetailAry) && parsed.orderDetailAry.length > 0) {
  //     goodsItem.value = getSelectedGoods(parsed.orderDetailAry);
  //   } else {
  //     goodsItem.value = parsed;
  //   }
  //   if (!routeOrderId.value) {
  //     routeOrderId.value = parsed.orderId || parsed.orderNo || "";
  //   }
  //   if (!routeShopCode.value) {
  //     routeShopCode.value = parsed.shopCode || parsed.pCode || "";
  //   }
  //   syncGoodsFromOrder();
  //   return;
  // }

  // if (routeOrderId.value) {
  //   loadOrderDetail();
  //   return;
  // }

  showToast("数据缺失");
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

.content {
  flex: 1;
  min-height: 0;
  padding-bottom: 82px;
  box-sizing: border-box;
}

.info-card,
.section-card,
.goods-card {
  background: #fff;
}

.info-card,
.section-card {
  padding: 14px 15px;
  box-sizing: border-box;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  gap: 12px;
}

.info-row + .info-row {
  margin-top: 6px;
}

.info-label {
  color: #666;
  font-size: 13px;
}

.info-value {
  flex: 1;
  min-width: 0;
  text-align: right;
  color: #333;
  font-size: 13px;
}

.section-gap {
  height: 10px;
  background: #f3f4f8;
}

.goods-card {
  display: flex;
  padding: 14px 15px;
  box-sizing: border-box;
}

.goods-img {
  width: 84px;
  height: 84px;
  flex: 0 0 84px;
  border-radius: 6px;
  background: #f5f5f5;
}

.goods-main {
  flex: 1;
  min-width: 0;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-name {
  color: #333;
  font-size: 13px;
  line-height: 18px;
}

.goods-specs {
  margin-top: 8px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}

.goods-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.goods-price {
  color: #e93b3d;
  font-size: 14px;
  font-weight: 600;
}

.goods-num {
  color: #666;
  font-size: 12px;
}

.section-title {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.desc-textarea {
  width: 100%;
  min-height: 108px;
  margin-top: 12px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fafafa;
  color: #333;
  font-size: 13px;
  line-height: 20px;
}

.upload-tip {
  margin-top: 8px;
  color: #999;
  font-size: 12px;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.image-item {
  width: 82px;
  height: 82px;
  flex: 0 0 82px;
  border-radius: 6px;
  overflow: hidden;
  background: #f5f5f5;
}

.image-view {
  width: 100%;
  height: 100%;
}

.add-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cfcfcf;
  background: #fff;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  padding: 12px 15px calc(12px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.06);
}

.submit-btn {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background: #2a9595;
  color: #fff;
  font-size: 15px;
}

.submit-btn.disabled {
  background: #b9b9b9;
}
</style>
