<template>
  <view class="page">
    <up-navbar
      :title="isSale ? '出售发布' : '出租发布'"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <template #left>
        <view class="nav-left" @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff" />
        </view>
      </template>
    </up-navbar>

    <scroll-view scroll-y class="content">
      <view class="form-section">
        <view class="field-row column">
          <text class="field-label">房屋亮点</text>
          <textarea v-model="detail" class="detail-input" maxlength="300" placeholder="请输入房屋亮点" />
        </view>
        <view class="field-row">
          <text class="field-label">接听时段</text>
          <text class="field-value">00:00-24:00</text>
        </view>
      </view>

      <ImageSection title="身份证正面" :files="files.idcardPositive" @select="(e) => selectpic('idcardPositive', e)" />
      <ImageSection title="身份证反面" :files="files.idcardNegative" @select="(e) => selectpic('idcardNegative', e)" />
      <ImageSection title="手持身份证" :files="files.idcardHand" @select="(e) => selectpic('idcardHand', e)" />
      <ImageSection title="房产证图片" :files="files.propertyPicture" :limit="9" @select="(e) => selectpic('propertyPicture', e)" />
      <ImageSection title="房屋图片（至少上传1张）" :files="files.picture" :limit="9" @select="(e) => selectpic('picture', e)" />

      <view class="agreement-row">
        <checkbox :checked="agreed" color="#2A9595" @click="agreed = !agreed" />
        <text>已阅读并同意《出租协议》</text>
      </view>

      <view class="form-footer">
        <u-button text="去签字" type="primary" plain color="#2A9595" @click="openSign" />
        <u-button text="提交" type="primary" color="#2A9595" :loading="submitting" @click="submit" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { landLoadSubmitShopRent, landLoadSubmitShopSale } from '@/api/mine';
import { storage, uploadMultipleFiles } from '@/utils/storage';
import eventBus from '@/utils/eventBus';
import ImageSection from './ImageSection.vue';

const bgColor = ref('#2A9595');
const draft = ref<any>({});
const detail = ref('');
const agreed = ref(false);
const submitting = ref(false);
const signaturePic = ref('');
const files = ref<Record<string, string[]>>({
  idcardPositive: [], idcardNegative: [], idcardHand: [], propertyPicture: [], picture: [],
});
const isSale = computed(() => draft.value?.type === 'sale');

onLoad((options: any) => {
  const key = String(options?.draftKey || '');
  draft.value = key ? uni.getStorageSync(key) || {} : {};
  detail.value = draft.value.detailed || '';
});

onMounted(() => {
  eventBus.on('sign_netimg', handleUpdateData);
});

onUnmounted(() => {
  eventBus.off('sign_netimg', handleUpdateData);
});

function selectpic(field: string, e: any) {
  console.log('选择文件：', e);
  const tempFilePaths = e.tempFilePaths;
  uploadMultipleFiles([], tempFilePaths, storage.getToken())
    .then((results) => {
      console.log('所有文件上传成功:', results);
      const netimgs: string[] = [];
      results.forEach((item) => netimgs.push(item.data));
      files.value[field] = [...files.value[field], ...netimgs];
    })
    .catch((error) => {
      console.error('文件上传失败:', error);
      uni.showToast({ title: '图片上传失败，请重试', icon: 'none' });
    });
}

function openSign() {
  uni.navigateTo({
    url: '/pages/mine/SignPage/SignPage',
  });
}

const handleUpdateData = (data: any) => {
  console.log('接收到回传的数据:', data);
  if (Array.isArray(data) && data.length) {
    signaturePic.value = data[0];
    console.log(signaturePic.value);
  }
};

function join(values: string[]) {
  return values.length ? `${values.join(',')},` : '';
}

async function submit() {
  if (!draft.value.houseId) {
    uni.showToast({ title: '请选择房产', icon: 'none' });
    return;
  }
  if (!agreed.value) {
    uni.showToast({ title: '请阅读并同意出租协议', icon: 'none' });
    return;
  }
  if (!draft.value.allocation?.length || !detail.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  if (!files.value.idcardPositive.length || !files.value.idcardNegative.length || !files.value.idcardHand.length) {
    uni.showToast({ title: '请选择身份证图片', icon: 'none' });
    return;
  }
  if (!files.value.propertyPicture.length || !files.value.picture.length) {
    uni.showToast({ title: '请选择房屋图片', icon: 'none' });
    return;
  }
  if (!signaturePic.value) {
    uni.showToast({ title: '请先完成签名', icon: 'none' });
    return;
  }

  submitting.value = true;
  try {
    const payload = {
      ...draft.value,
      title: draft.value.title,
      houseId: draft.value.houseId,
      houseCompleteName: draft.value.houseCompleteName,
      houserNum: draft.value.houserNum,
      locationName: draft.value.locationName,
      longitude: draft.value.longitude,
      latitude: draft.value.latitude,
      shopType: draft.value.shopType,
      houseFloor: draft.value.houseFloor,
      builtArea: draft.value.builtArea,
      operatingStatus: draft.value.operatingStatus,
      operatingIndustry: draft.value.operatingIndustry,
      isFrontage: draft.value.isFrontage,
      rentType: draft.value.rentType,
      spec: `面宽${draft.value.width}米,进深:${draft.value.depth} 米,层高:${draft.value.height}米`,
      allocation: join(draft.value.allocation),
      detailed: detail.value,
      idcardPositive: join(files.value.idcardPositive),
      idcardNegative: join(files.value.idcardNegative),
      idcardHand: join(files.value.idcardHand),
      propertyPicture: join(files.value.propertyPicture),
      picture: join(files.value.picture),
      userId: storage.getUserId(),
      signPic: signaturePic.value,
      ...(isSale.value ? { sellingPrice: draft.value.amount } : { monthlyRent: draft.value.amount, leaseTerm: draft.value.leaseTerm }),
    };
    if (isSale.value) {
      await landLoadSubmitShopSale(payload);
    } else {
      await landLoadSubmitShopRent(payload);
    }
    uni.showToast({ title: '提交成功', icon: 'none' });
    uni.$emit('SEND_BUSSINESS_HOUSE');
    const delta = Math.min(3, getCurrentPages().length - 1);
    if (delta > 0) {
      setTimeout(() => uni.navigateBack({ delta }), 200);
    }
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '提交失败，请稍后重试', icon: 'none' });
  } finally {
    submitting.value = false;
  }
}

function goBack() { uni.navigateBack(); }
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background: #f6f7fb; }
.nav-left { display: flex; padding: 0 8px; }
.content { height: calc(100vh - 44px); }
.form-section { margin-top: 10px; padding: 0 15px; background: #fff; }
.field-row { display: flex; align-items: center; min-height: 50px; border-bottom: 1px solid #ededed; }
.field-row.column { display: block; padding: 15px 0; }
.field-label { color: #333; font-size: 14px; }
.field-value { flex: 1; color: #666; font-size: 14px; text-align: right; }
.detail-input { width: 100%; height: 120px; box-sizing: border-box; margin-top: 10px; padding: 10px; background: #f7f8fa; font-size: 14px; }
.upload-section { padding-bottom: 15px; }
.section-title { display: block; padding: 15px 0 10px; color: #2A9595; font-size: 14px; }
.agreement-row { display: flex; align-items: center; padding: 15px; color: #666; font-size: 13px; }
.form-footer { display: flex; gap: 12px; padding: 20px 24px; }
.form-footer :deep(button) { flex: 1; }
</style>
