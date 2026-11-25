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
          <text class="value">{{ detail.auditStatusName || '--' }}</text>
        </view>
        <view v-if="detail.auditStatus === '2'" class="row">
          <text class="label">原因</text>
          <text class="value reason">{{ detail.auditReason || '--' }}</text>
        </view>
      </view>

      <view class="section">
        <view class="row">
          <text class="label">房屋编号</text>
          <text class="value">{{ detail.houseNum || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">标题</text>
          <text class="value">{{ detail.rentalTitle || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">小区名称</text>
          <text class="value">{{ detail.communityName || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">建筑面积</text>
          <text class="value">{{ detail.builtArea || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">房屋户型</text>
          <text class="value">{{ detail.householdType || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">房屋类型</text>
          <text class="value">{{ detail.houseType || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">房屋楼层</text>
          <text class="value">{{ detail.houseFloor || '--' }}</text>
        </view>
        <view class="row">
          <text class="label">电梯</text>
          <view class="switch-group">
            <text :class="['switch-tag', detail.elevator === '1' ? 'switch-tag-active' : '']">是</text>
            <text :class="['switch-tag', detail.elevator !== '1' ? 'switch-tag-active' : '']">否</text>
          </view>
        </view>
        <view class="row">
          <text class="label">售价</text>
          <text class="value">{{ detail.price || '--' }}</text>
        </view>
      </view>

      <view class="section">
        <view class="row">
          <text class="label">装修情况</text>
          <view class="chip-wrap">
            <view v-for="item in decorationLabels" :key="item" class="chip">
              <text class="chip-text">{{ item }}</text>
            </view>
          </view>
        </view>

        <view class="row column">
          <text class="label">详细介绍</text>
          <text class="paragraph">{{ detail.detailed || '--' }}</text>
        </view>
      </view>

      <view v-if="idcardImages.length" class="section">
        <view class="section-title">身份证照片</view>
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

      <view v-if="certificateImages.length" class="section">
        <view class="section-title">房产证</view>
        <view class="image-grid">
          <view
            v-for="(item, index) in certificateImages"
            :key="`${item}-${index}`"
            class="image-item"
            @click="openCertificate(index)"
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
          v-if="showCancel"
          class="action-btn"
          text="撤回"
          type="primary"
          color="#2A9595"
          @click="openActionDialog('cancel')"
        />
        <template v-else-if="showReedit">
          <u-button
            class="action-btn half"
            text="重新编辑"
            type="primary"
            color="#2A9595"
            @click="reedit"
          />
          <u-button
            class="action-btn half danger"
            text="删除"
            type="primary"
            color="#e54d42"
            @click="openActionDialog('delete')"
          />
        </template>
        <u-button
          v-else-if="showDelete"
          class="action-btn"
          text="删除"
          type="primary"
          color="#e54d42"
          @click="openActionDialog('delete')"
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
        <text class="modal-text">{{ actionText }}</text>
      </view>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
  cancelHouseSaleReleaseMessage,
  delHouseSaleReleaseMessage,
  GetAgreemente,
  queryHouseSaleReleaseView,
} from '@/api/mine';
import { storage } from '@/utils/storage';
import { normalizeCode, previewImages, resolveImage, splitImages, splitLabels } from './detailShared';

interface HouseSaleDetailResult {
  id?: string;
  cancel?: string;
  auditStatus?: string;
  auditStatusName?: string;
  auditReason?: string;
  releaseType?: string;
  rentalTitle?: string;
  communityName?: string;
  builtArea?: string;
  houseType?: string;
  householdType?: string;
  houseNum?: string;
  houseFloor?: string;
  elevator?: string;
  price?: string;
  decoration?: string;
  detailed?: string;
  answerTime?: string;
  housePicImgs?: string[] | string;
  idcardPicImgs?: string[] | string;
  houseCertificatePicImgs?: string[] | string;
  idcardPicture?: string;
  houseCertificatePicture?: string;
  housePicture?: string;
}

const bgColor = ref('#2A9595');
const loading = ref(true);
const errorText = ref('');
const id = ref('');
const detail = ref<HouseSaleDetailResult>({});
const actionVisible = ref(false);
const actionType = ref<'cancel' | 'delete'>('cancel');
const agreementName = ref('用户协议');

const decorationLabels = computed(() => splitLabels(detail.value.decoration));
const houseImages = computed(() => {
  const source = Array.isArray(detail.value.housePicImgs) && detail.value.housePicImgs.length
    ? detail.value.housePicImgs
    : detail.value.housePicture;
  return splitImages(source).map((item) => resolveImage(item));
});
const idcardImages = computed(() => {
  const source = Array.isArray(detail.value.idcardPicImgs) && detail.value.idcardPicImgs.length
    ? detail.value.idcardPicImgs
    : detail.value.idcardPicture;
  return splitImages(source).map((item) => resolveImage(item));
});
const certificateImages = computed(() => {
  const source = Array.isArray(detail.value.houseCertificatePicImgs) && detail.value.houseCertificatePicImgs.length
    ? detail.value.houseCertificatePicImgs
    : detail.value.houseCertificatePicture;
  return splitImages(source).map((item) => resolveImage(item));
});
const showCancel = computed(() => normalizeCode(detail.value.cancel) === '0' && normalizeCode(detail.value.auditStatus) === '1');
const showReedit = computed(() => normalizeCode(detail.value.cancel) === '0' && normalizeCode(detail.value.auditStatus) === '2');
const showDelete = computed(() => normalizeCode(detail.value.cancel) === '1' || showReedit.value);
const actionText = computed(() => (actionType.value === 'cancel' ? '是否确认撤回' : '是否确认删除'));

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
    const res = await queryHouseSaleReleaseView({
      userId: storage.getUserId(),
      id: id.value,
    });
    detail.value = (res?.result || {}) as HouseSaleDetailResult;
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
    const res = (await GetAgreemente({ type: '11' })) as AgreementResult;
    agreementName.value = res?.result?.agreement_name || '用户协议';
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '协议加载失败，请稍后重试', icon: 'none' });
  }
}

function openIdcard(index: number) {
  previewImages(idcardImages.value, index);
}

function openCertificate(index: number) {
  previewImages(certificateImages.value, index);
}

function openHouse(index: number) {
  previewImages(houseImages.value, index);
}

function openAgreement() {
  uni.navigateTo({
    url: '/pages/service/HouseInformation/ProtocalDetail?type=11',
  });
}

function openActionDialog(type: 'cancel' | 'delete') {
  actionType.value = type;
  actionVisible.value = true;
}

async function confirmAction() {
  actionVisible.value = false;
  if (!id.value) {
    return;
  }

  try {
    const api = actionType.value === 'cancel' ? cancelHouseSaleReleaseMessage : delHouseSaleReleaseMessage;
    await api({
      userId: storage.getUserId(),
      id: id.value,
    });
    uni.showToast({
      title: '操作成功',
      icon: 'none',
    });
    uni.$emit('DELCANCEL_HOUSE');
    uni.navigateBack();
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '操作失败，请稍后重试', icon: 'none' });
  }
}

function reedit() {
  uni.showToast({
    title: '重新编辑页面暂未迁移',
    icon: 'none',
  });
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
  width: 88px;
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

.reason {
  color: #d14343;
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

.half {
  flex: 1;
}

.danger {
  flex: 1;
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
