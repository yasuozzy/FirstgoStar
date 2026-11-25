<template>
  <view class="page">
    <u-navbar
      title="详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="nav-left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>

    <view v-if="loading" class="state-box">
      <u-loading-icon mode="circle"></u-loading-icon>
      <text class="state-text">加载中...</text>
    </view>

    <view v-else-if="errorText" class="state-box">
      <text class="state-text">{{ errorText }}</text>
      <u-button
        class="retry-btn"
        text="重新加载"
        type="primary"
        color="#2A9595"
        @click="loadDetail"
      />
    </view>

    <scroll-view v-else scroll-y class="content">
      <view class="section">
        <view class="row">
          <text class="label">状态</text>
          <text class="value">{{ detail.statusFlag || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">选择房产</text>
          <text class="value">{{ detail.house_complete_name || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">房屋编号</text>
          <text class="value">{{ detail.houser_num || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">标题</text>
          <text class="value">{{ detail.title || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">商铺位置</text>
          <text class="value">{{ detail.location_name || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">房屋类型</text>
          <text class="value">{{ detail.shop_type || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">房屋楼层</text>
          <text class="value">{{ detail.house_floor || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">建筑面积</text>
          <text class="value">{{ detail.built_area || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">面宽/进深/层高</text>
          <text class="value">{{ detail.spec || '--' }}</text>
        </view>
      </view>

      <view class="section">
        <view class="row">
          <text class="label">经营行业</text>
          <text class="value">{{ detail.operating_industry || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">经营状态</text>
          <text class="value">{{ detail.operating_status || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">是否临街</text>
          <view class="switch-group">
            <text :class="['switch-tag', Number(detail.is_frontage) === 1 ? 'switch-tag-active' : '']">是</text>
            <text :class="['switch-tag', Number(detail.is_frontage) !== 1 ? 'switch-tag-active' : '']">否</text>
          </view>
        </view>
        <view class="row">
          <text class="label">月租金</text>
          <text class="value">{{ detail.monthly_rent || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">返租方式</text>
          <view class="switch-group">
            <text :class="['switch-tag', Number(detail.rent_type) === 0 ? 'switch-tag-active' : '']">月返</text>
            <text :class="['switch-tag', Number(detail.rent_type) === 1 ? 'switch-tag-active' : '']">年返</text>
          </view>
        </view>
        <view class="row">
          <text class="label">租期</text>
          <text class="value">{{ detail.lease_term || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">配套设施</text>
          <view class="chip-wrap">
            <view v-for="item in allocationLabels" :key="item" class="chip">
              <text class="chip-text">{{ item }}</text>
            </view>
          </view>
        </view>
        <view class="row column">
          <text class="label">房屋亮点</text>
          <text class="paragraph">{{ detail.detailed || '--' }}</text>
        </view>
      </view>

      <view v-if="idcardImages.length" class="section">
        <view class="section-title">身份认证</view>
        <view class="image-grid">
          <view
            v-for="(item, index) in idcardImages"
            :key="`${item}-${index}`"
            class="image-item"
            @click="openIdcard(index)"
          >
            <u-image :src="item" width="100%" height="100%" mode="aspectFill"></u-image>
          </view>
        </view>
      </view>

      <view v-if="propertyImages.length" class="section">
        <view class="section-title">房产证</view>
        <view class="image-grid">
          <view
            v-for="(item, index) in propertyImages"
            :key="`${item}-${index}`"
            class="image-item"
            @click="openProperty(index)"
          >
            <u-image :src="item" width="100%" height="100%" mode="aspectFill"></u-image>
          </view>
        </view>
      </view>

      <view v-if="houseImages.length" class="section">
        <view class="section-title">房屋实景</view>
        <view class="image-grid">
          <view
            v-for="(item, index) in houseImages"
            :key="`${item}-${index}`"
            class="image-item"
            @click="openHouse(index)"
          >
            <u-image :src="item" width="100%" height="100%" mode="aspectFill"></u-image>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="agreement-row">
          <text class="agreement-prefix">已阅读并同意</text>
          <text class="agreement-link" @click="openAgreement">《{{ agreementName }}》</text>
        </view>
      </view>

      <view class="footer">
        <u-button
          v-if="canCallback"
          class="action-btn"
          text="撤销"
          type="primary"
          color="#2A9595"
          @click="openCancelDialog"
        />
      </view>
    </scroll-view>

    <u-modal
      :show="actionVisible"
      title="提示"
      showCancelButton
      cancelText="取消"
      confirmText="确认"
      @cancel="actionVisible = false"
      @confirm="confirmAction"
    >
      <view class="modal-body">
        <text class="modal-text">确认撤销吗</text>
      </view>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { cancleShopRent, GetAgreemente, getShopRentInfo } from '@/api/mine';
import { normalizeCode, previewImages, resolveImage, splitImages, splitLabels } from './detailShared';

interface ShopRentDetailResult {
  title?: string;
  spec?: string;
  idcard_positive?: string;
  built_area?: string;
  operating_status?: string;
  id?: string;
  house_floor?: string;
  longitude?: string;
  idcard_hand?: string;
  rent_type?: number | string;
  house_id?: string;
  allocation?: string;
  property_picture?: string | string[];
  picture?: string | string[];
  location_name?: string;
  user_id?: string;
  lease_term?: string;
  detailed?: string;
  house_complete_name?: string;
  is_frontage?: number | string;
  shop_type?: string;
  idcard_negative?: string;
  houser_num?: string;
  operating_industry?: string;
  status?: number | string;
  statusFlag?: string;
  monthly_rent?: string;
}

const bgColor = ref('#2A9595');
const loading = ref(true);
const errorText = ref('');
const id = ref('');
const detail = ref<ShopRentDetailResult>({});
const actionVisible = ref(false);
const agreementName = ref('用户协议');

const allocationLabels = computed(() => splitLabels(detail.value.allocation));
const idcardImages = computed(() =>
  [detail.value.idcard_positive, detail.value.idcard_negative, detail.value.idcard_hand]
    .filter((item) => !!item)
    .flatMap((item) => splitImages(item))
    .map((item) => resolveImage(item)),
);
const propertyImages = computed(() => splitImages(detail.value.property_picture).map((item) => resolveImage(item)));
const houseImages = computed(() => splitImages(detail.value.picture).map((item) => resolveImage(item)));
const canCallback = computed(() => normalizeCode(detail.value.status) === '0');

interface AgreementResult {
  result?: {
    agreement_name?: string;
  };
}

onLoad((options: any) => {
  id.value = String(options?.id || '');
  if (!id.value) {
    errorText.value = '缺少详情参数';
    loading.value = false;
    return;
  }
  loadAgreement();
  loadDetail();
});

async function loadDetail() {
  loading.value = true;
  errorText.value = '';
  try {
    const res = await getShopRentInfo({
      rentId: id.value,
    });
    detail.value = (res?.result || {}) as ShopRentDetailResult;
  } catch (error) {
    console.log(error);
    errorText.value = '加载失败';
    uni.showToast({ title: '详情加载失败，请稍后重试', icon: 'none' });
  } finally {
    loading.value = false;
  }
}

async function loadAgreement() {
  try {
    const res = (await GetAgreemente({ type: '14' })) as AgreementResult;
    agreementName.value = res?.result?.agreement_name || '用户协议';
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '协议加载失败，请稍后重试', icon: 'none' });
  }
}

function openIdcard(index: number) {
  previewImages(idcardImages.value, index);
}

function openProperty(index: number) {
  previewImages(propertyImages.value, index);
}

function openHouse(index: number) {
  previewImages(houseImages.value, index);
}

function openAgreement() {
  uni.navigateTo({
    url: '/pages/service/HouseInformation/ProtocalDetail?type=14',
  });
}

function openCancelDialog() {
  actionVisible.value = true;
}

async function confirmAction() {
  actionVisible.value = false;
  if (!id.value) {
    return;
  }

  try {
    await cancleShopRent({
      rentId: id.value,
    });
    uni.showToast({
      title: '操作成功',
      icon: 'none',
    });
    uni.$emit('DELCANCEL_SHOP');
    await loadDetail();
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '撤销失败，请稍后重试', icon: 'none' });
  }
}

function goBack() {
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f6f7fb;
}

.nav-left {
  display: flex;
}

.state-box {
  min-height: calc(100vh - 45px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #666;
}

.state-text {
  font-size: 14px;
}

.retry-btn {
  width: 180px;
}

.content {
  height: calc(100vh - 44px);
}

.section {
  margin-top: 12px;
  padding: 12px 16px;
  background: #fff;
}

.row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.row:last-child {
  border-bottom: 0;
}

.column {
  flex-direction: column;
}

.label {
  width: 108px;
  flex-shrink: 0;
  font-size: 14px;
  color: #666;
  line-height: 22px;
}

.value {
  flex: 1;
  font-size: 14px;
  color: #222;
  line-height: 22px;
  word-break: break-all;
}

.chip-wrap {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(42, 149, 149, 0.1);
}

.chip-text {
  font-size: 12px;
  color: #2a9595;
}

.paragraph {
  font-size: 14px;
  color: #222;
  line-height: 22px;
  white-space: pre-wrap;
}

.section-title {
  font-size: 15px;
  color: #222;
  font-weight: 600;
  margin-bottom: 12px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.image-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  background: #f5f5f5;
}

.agreement-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.agreement-prefix {
  font-size: 13px;
  color: #666;
}

.agreement-link {
  font-size: 13px;
  color: #2a9595;
}

.footer {
  padding: 16px;
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
}

.switch-group {
  display: flex;
  gap: 10px;
}

.switch-tag {
  min-width: 42px;
  padding: 4px 10px;
  border-radius: 4px;
  background: #f2f2f2;
  color: #666;
  font-size: 13px;
  text-align: center;
}

.switch-tag-active {
  background: rgba(42, 149, 149, 0.12);
  color: #2a9595;
}

.modal-body {
  padding: 18px 0 8px;
  display: flex;
  justify-content: center;
}

.modal-text {
  font-size: 15px;
  color: #222;
}
</style>
