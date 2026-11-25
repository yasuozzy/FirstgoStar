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
        <view v-if="isSale" class="field-row">
          <text class="field-label">售价（万）</text>
          <input v-model="price" class="field-input" type="digit" placeholder="请填写" />
        </view>
        <view class="field-row column">
          <view class="field-heading">
            <text class="field-label">详细介绍</text>
            <text class="counter">{{ detail.length }}/300</text>
          </view>
          <textarea v-model="detail" class="detail-input" maxlength="300" placeholder="请填写" />
        </view>
      </view>

      <template v-if="isSale">
        <TagSection title="装修情况" :items="decorationOptions" :selected="decoration" @toggle="toggleDecoration" />
      </template>
      <template v-else>
        <TagSection title="装修情况" :items="decorationOptions" :selected="decoration" @toggle="toggleDecoration" />
        <TagSection v-if="isRenthe" title="公共设施" :items="publicFacilityOptions" :selected="publicFacilities" @toggle="togglePublicFacilities" />
        <TagSection v-if="isRenthe" title="房间设施" :items="roomFacilityOptions" :selected="allocation" @toggle="toggleAllocation" />
        <TagSection v-else title="房屋配置" :items="houseFacilityOptions" :selected="allocation" @toggle="toggleAllocation" />
        <TagSection title="房屋亮点" :items="highlightOptions" :selected="highlights" @toggle="toggleHighlights" />
        <TagSection title="出租要求" :items="requirementOptions" :selected="requirements" @toggle="toggleRequirements" />
      </template>

      <view class="form-section">
        <view class="field-row" @click="chooseAnswerTime">
          <text class="field-label">接听时段</text>
          <text class="field-value">{{ answerTime }}</text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
      </view>

      <template v-if="isSale">
        <ImageSection title="房产证图片" :files="saleFiles.certificate" :limit="9" @select="(e) => selectSalePic('certificate', e)" />
        <ImageSection title="身份证正面" :files="saleFiles.idcardPositive" @select="(e) => selectSalePic('idcardPositive', e)" />
        <ImageSection title="身份证反面" :files="saleFiles.idcardNegative" @select="(e) => selectSalePic('idcardNegative', e)" />
        <ImageSection title="手持身份证" :files="saleFiles.idcardHand" @select="(e) => selectSalePic('idcardHand', e)" />
        <ImageSection title="房屋图片（至少上传3张）" :files="saleFiles.house" :limit="9" @select="(e) => selectSalePic('house', e)" />
      </template>
      <view v-else class="form-section upload-section">
        <text class="section-title">上传图片（至少上传3张）</text>
        <uni-file-picker
          v-model="imgvalue"
          fileMediatype="image"
          mode="grid"
          limit="9"
          title="最多选择9张图片"
          @select="selectpic"
        />
      </view>

      <view class="agreement-row">
        <checkbox :checked="agreed" color="#2A9595" @click="agreed = !agreed" />
        <text>已阅读并同意《平台委托协议》</text>
      </view>

      <view class="form-footer">
        <u-button text="提交" type="primary" color="#2A9595" :loading="submitting" @click="submit" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { addHouseRentalReleaseMessage, addHouseSaleReleaseMessage, queryDictAllList } from '@/api/mine';
import { storage, uploadMultipleFiles } from '@/utils/storage';
import ImageSection from './ImageSection.vue';
import TagSection from './TagSection.vue';

interface DictItem {
  childValue: string;
}

const bgColor = ref('#2A9595');
const draftKey = ref('');
const draft = ref<any>({});
const submitting = ref(false);
const agreed = ref(false);
const price = ref('');
const detail = ref('');
const answerTime = ref('00:00-24:00');
const imgvalue = ref<string[]>([]);
const decoration = ref<string[]>([]);
const allocation = ref<string[]>([]);
const highlights = ref<string[]>([]);
const requirements = ref<string[]>([]);
const publicFacilities = ref<string[]>([]);
const saleFiles = ref<Record<string, string[]>>({
  certificate: [],
  idcardPositive: [],
  idcardNegative: [],
  idcardHand: [],
  house: [],
});
const isSale = computed(() => draft.value?.type === 'sale');
const isRenthe = computed(() => draft.value?.type === 'renthe');

const decorationOptions = ref<DictItem[]>([]);
const houseFacilityOptions = ref<DictItem[]>([]);
const roomFacilityOptions = ref<DictItem[]>([]);
const publicFacilityOptions = ref<DictItem[]>([]);
const highlightOptions = ref<DictItem[]>([]);
const requirementOptions = ref<DictItem[]>([]);

onLoad((options: any) => {
  draftKey.value = String(options?.draftKey || '');
  draft.value = draftKey.value ? uni.getStorageSync(draftKey.value) || {} : {};
  loadDict();
});

onMounted(() => {
  detail.value = draft.value?.detailed || '';
});

async function loadDict() {
  try {
    const res = await queryDictAllList({});
    const result = Array.isArray(res?.result) ? res.result : [];
    decorationOptions.value = findDict(result, '装修情况');
    houseFacilityOptions.value = findDict(result, '房屋配置');
    roomFacilityOptions.value = findDict(result, '房间设施');
    publicFacilityOptions.value = findDict(result, '公共设施');
    highlightOptions.value = findDict(result, '房屋亮点');
    requirementOptions.value = findDict(result, '出租要求');
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '字典加载失败，请稍后重试', icon: 'none' });
  }
}

function findDict(list: any[], name: string): DictItem[] {
  const item = list.find((entry) => entry?.value === name);
  return Array.isArray(item?.childrenMapList) ? item.childrenMapList : [];
}

function toggle(list: typeof decoration, value: string, single = false) {
  if (single) {
    list.value = [value];
    return;
  }
  list.value = list.value.includes(value) ? list.value.filter((item) => item !== value) : [...list.value, value];
}

const toggleDecoration = (value: string) => toggle(decoration, value, true);
const toggleAllocation = (value: string) => toggle(allocation, value);
const toggleHighlights = (value: string) => toggle(highlights, value);
const toggleRequirements = (value: string) => toggle(requirements, value);
const togglePublicFacilities = (value: string) => toggle(publicFacilities, value);

function chooseAnswerTime() {
  uni.showActionSheet({
    itemList: ['00:00-24:00', '08:00-18:00', '09:00-21:00'],
    success: ({ tapIndex }) => {
      answerTime.value = ['00:00-24:00', '08:00-18:00', '09:00-21:00'][tapIndex];
    },
  });
}

const selectpic = (e: any) => {
  console.log('选择文件：', e);
  const tempFilePaths = e.tempFilePaths;
  uploadMultipleFiles([], tempFilePaths, storage.getToken())
    .then((results) => {
      console.log('所有文件上传成功:', results);
      const netimgs: string[] = [];
      results.forEach((item) => {
        netimgs.push(item.data);
      });
      imgvalue.value = netimgs;
    })
    .catch((error) => {
      console.error('文件上传失败:', error);
      uni.showToast({ title: '图片上传失败，请重试', icon: 'none' });
    });
};

function selectSalePic(field: string, e: any) {
  console.log('选择文件：', e);
  const tempFilePaths = e.tempFilePaths;
  uploadMultipleFiles([], tempFilePaths, storage.getToken())
    .then((results) => {
      const netimgs: string[] = [];
      results.forEach((item) => netimgs.push(item.data));
      saleFiles.value[field] = [...saleFiles.value[field], ...netimgs];
    })
    .catch((error) => {
      console.error('文件上传失败:', error);
      uni.showToast({ title: '图片上传失败，请重试', icon: 'none' });
    });
}

function joinValues(values: string[]) {
  return values.length ? `${values.join(',')},` : '';
}

async function submit() {
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并同意《平台委托协议》', icon: 'none' });
    return;
  }
  if (!detail.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  if (isSale.value) {
    if (!saleFiles.value.house.length || saleFiles.value.house.length < 3) {
      uni.showToast({ title: '至少上传3张房屋图片', icon: 'none' });
      return;
    }
    if (!saleFiles.value.certificate.length || !saleFiles.value.idcardPositive.length || !saleFiles.value.idcardNegative.length || !saleFiles.value.idcardHand.length) {
      uni.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
  } else if (!imgvalue.value.length || imgvalue.value.length < 3) {
    uni.showToast({ title: '至少上传3张房屋图片', icon: 'none' });
    return;
  }
  if (!decoration.value.length) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  if (!isSale.value && (!highlights.value.length || !requirements.value.length)) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  if (!isSale.value && !allocation.value.length) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  if (isRenthe.value && (!publicFacilities.value.length || !allocation.value.length)) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  if (isSale.value && !price.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }

  submitting.value = true;
  try {
    const base = {
      releaseType: draft.value.releaseType,
      detailed: detail.value,
      rentalTitle: draft.value.rentalTitle,
      communityName: draft.value.communityName,
      builtArea: draft.value.builtArea,
      houseType: draft.value.houseType,
      houseFloor: draft.value.houseFloor,
      elevator: draft.value.elevator,
      latitude: draft.value.latitude,
      longitude: draft.value.longitude,
      userId: storage.getUserId(),
      userMobile: storage.getPhone(),
      picture: isSale.value ? saleFiles.value.house.join(',') : imgvalue.value.join(','),
      decoration: joinValues(decoration.value),
      highlights: joinValues(highlights.value),
      requirements: joinValues(requirements.value),
      answerTime: answerTime.value,
    };
    if (isSale.value) {
      await addHouseSaleReleaseMessage({
        ...base,
        houseNum: draft.value.buildnum,
        householdType: draft.value.houseType,
        houseType: draft.value.fwlx,
        price: price.value,
        houseCertificatePicture: saleFiles.value.certificate.join(','),
        idcardPicture: [
          ...saleFiles.value.idcardPositive,
          ...saleFiles.value.idcardNegative,
          ...saleFiles.value.idcardHand,
        ].join(','),
        housePicture: saleFiles.value.house.join(','),
      });
    } else {
      await addHouseRentalReleaseMessage({
        ...base,
        rentalType: isRenthe.value ? '2' : '1',
        monthlyRent: draft.value.monthlyRent,
        rentMethod: joinValues(draft.value.rentMethod || []),
        bedroomType: joinValues(draft.value.bedroomType || []),
        allocation: isRenthe.value ? joinValues(allocation.value) : joinValues(allocation.value),
        publicFacilities: isRenthe.value ? joinValues(publicFacilities.value) : '',
      });
    }
    uni.showToast({ title: '提交成功', icon: 'none' });
    uni.$emit('COMMIT_HOUSE');
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

function goBack() {
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background: #f6f7fb; }
.nav-left { display: flex; padding: 0 8px; }
.content { height: calc(100vh - 44px); }
.form-section { margin-top: 10px; padding: 0 15px; background: #fff; }
.field-row { display: flex; align-items: center; min-height: 50px; border-bottom: 1px solid #ededed; }
.field-row.column { display: block; padding: 14px 0; }
.field-heading { display: flex; justify-content: space-between; }
.field-label { color: #333; font-size: 14px; }
.field-input { flex: 1; height: 42px; margin-left: 20px; color: #666; font-size: 14px; }
.field-value { flex: 1; color: #666; font-size: 14px; text-align: right; }
.counter { color: #999; font-size: 12px; }
.detail-input { width: 100%; height: 160px; box-sizing: border-box; margin-top: 10px; padding: 10px; background: #f7f8fa; font-size: 14px; }
.section-title { display: block; padding: 15px 0 10px; color: #333; font-size: 14px; }
.tag-wrap { display: flex; flex-wrap: wrap; gap: 10px; padding-bottom: 15px; }
.upload-section { padding-bottom: 15px; }
.agreement-row { display: flex; align-items: center; padding: 15px; color: #666; font-size: 13px; }
.form-footer { padding: 20px 24px; }
</style>
