<template>
  <view class="page">
    <up-navbar
      :title="isSale ? '出售' : '出租'"
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
        <view class="field-row">
          <text class="field-label">发布标题</text>
          <input v-model="form.rentalTitle" class="field-input" placeholder="请填写" />
        </view>
        <view class="field-row" @click="selectCommunity">
          <text class="field-label">小区名称</text>
          <text class="field-value" :class="{ placeholder: !form.communityName }">
            {{ form.communityName || '选择小区名称' }}
          </text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row">
          <text class="field-label">建筑面积</text>
          <input v-model="form.builtArea" class="field-input" type="digit" placeholder="请填写" />
        </view>
        <view v-if="isSale" class="field-row">
          <text class="field-label">房屋编号</text>
          <input v-model="form.buildnum" class="field-input" placeholder="请填写" />
        </view>
        <view class="field-row" @click="chooseHouseType">
          <text class="field-label">房屋户型</text>
          <text class="field-value" :class="{ placeholder: !form.houseType }">
            {{ form.houseType || '请选择' }}
          </text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row" @click="chooseFloor">
          <text class="field-label">房屋楼层</text>
          <text class="field-value" :class="{ placeholder: !form.houseFloor }">
            {{ form.houseFloor || '请选择' }}
          </text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row">
          <text class="field-label">是否有电梯</text>
          <view class="choice-row">
            <up-tag :text="'是'" type="primary" :plain="form.elevator !== '1'" @click="form.elevator = '1'" />
            <up-tag :text="'否'" type="primary" :plain="form.elevator !== '2'" @click="form.elevator = '2'" />
          </view>
        </view>
        <view v-if="!isSale" class="field-row">
          <text class="field-label">月租金</text>
          <input v-model="form.monthlyRent" class="field-input" type="digit" placeholder="请填写" />
        </view>
        <view v-if="isSale" class="field-row" @click="chooseSaleHouseType">
          <text class="field-label">房屋类型</text>
          <text class="field-value" :class="{ placeholder: !form.fwlx }">{{ form.fwlx || '请选择' }}</text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
      </view>

      <view v-if="!isSale" class="form-section">
        <text class="section-title">租金方式</text>
        <view class="tag-wrap">
          <up-tag
            v-for="item in rentMethodOptions"
            :key="item.childValue"
            :text="item.childValue"
            type="primary"
            :plain="!form.rentMethod.includes(item.childValue)"
            @click="toggleSingle('rentMethod', item.childValue)"
          />
        </view>
      </view>

      <view v-if="isRenthe" class="form-section">
        <text class="section-title">卧室类型</text>
        <view class="tag-wrap">
          <up-tag
            v-for="item in bedroomOptions"
            :key="item.childValue"
            :text="item.childValue"
            type="primary"
            :plain="!form.bedroomType.includes(item.childValue)"
            @click="toggleSingle('bedroomType', item.childValue)"
          />
        </view>
      </view>

      <view class="form-footer">
        <u-button text="下一步" type="primary" color="#2A9595" :loading="submitting" @click="nextStep" />
      </view>
    </scroll-view>

    <up-modal
      :show="agreementVisible"
      :title="agreementName"
      showCancelButton
      cancelText="取消"
      confirmText="同意"
      @cancel="cancelAgreement"
      @confirm="agreementVisible = false"
    >
      <scroll-view scroll-y class="agreement-content">
        <rich-text :nodes="agreementContent" />
      </scroll-view>
    </up-modal>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { GetAgreemente, queryDictAllList } from '@/api/mine';

interface DictItem {
  childValue: string;
}

interface Props {
  pageKind: 'rent' | 'renthe' | 'sale';
}

const props = defineProps<Props>();
const bgColor = ref('#2A9595');
const releaseType = ref('1');
const pageType = ref(props.pageKind);
const submitting = ref(false);
const rentMethodOptions = ref<DictItem[]>([]);
const bedroomOptions = ref<DictItem[]>([]);
const agreementVisible = ref(false);
const agreementName = ref('用户协议');
const agreementContent = ref('');

const form = reactive({
  rentalTitle: '',
  communityName: '',
  builtArea: '',
  houseType: '',
  houseFloor: '',
  elevator: '1',
  monthlyRent: '',
  fwlx: '',
  buildnum: '',
  rentMethod: [] as string[],
  bedroomType: [] as string[],
  longitude: '',
  latitude: '',
});

const isSale = computed(() => pageType.value === 'sale');
const isRenthe = computed(() => pageType.value === 'renthe');

onLoad((options: any) => {
  releaseType.value = String(options?.releaseType || '1');
  loadDict();
  loadAgreement();
});

async function loadDict() {
  try {
    const res = await queryDictAllList({});
    const result = Array.isArray(res?.result) ? res.result : [];
    rentMethodOptions.value = findDict(result, '租金方式');
    bedroomOptions.value = findDict(result, '卧室类型');
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '字典加载失败，请稍后重试', icon: 'none' });
  }
}

async function loadAgreement() {
  try {
    const res = await GetAgreemente({ type: '11' });
    agreementName.value = res?.result?.agreement_name || '用户协议';
    agreementContent.value = res?.result?.agreement_content || '';
    agreementVisible.value = true;
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '协议加载失败，请稍后重试', icon: 'none' });
  }
}

function findDict(list: any[], name: string): DictItem[] {
  const item = list.find((entry) => entry?.value === name);
  return Array.isArray(item?.childrenMapList) ? item.childrenMapList : [];
}

function toggleSingle(field: 'rentMethod' | 'bedroomType', value: string) {
  form[field] = [value];
}

function selectCommunity() {
  uni.chooseLocation({
  			success: function (res) {
  					console.log('位置名称：' + res.name);
  					console.log('详细地址：' + res.address);
  					console.log('纬度：' + res.latitude);
  					console.log('经度：' + res.longitude);
  					// addressstring.value = res.address;
  					communityName .value=res.name
  					// latitude.value= res.latitude;
  					// longitude.value = res.longitude;
  					// console.log(chooseLocation.value);
  			},
  			fail() {
  				uni.showToast({
  					title:'获取位置信息失败',
  					icon:'none',
  				})
  			}
  		})
}

function chooseHouseType() {
  uni.showActionSheet({
    itemList: ['1室1厅1卫', '2室1厅1卫', '3室2厅2卫', '4室2厅2卫'],
    success: ({ tapIndex }) => {
      form.houseType = ['1室1厅1卫', '2室1厅1卫', '3室2厅2卫', '4室2厅2卫'][tapIndex];
    },
  });
}

function chooseFloor() {
  uni.showActionSheet({
    itemList: ['1层/共6层', '2层/共6层', '3层/共18层', '中层/共33层'],
    success: ({ tapIndex }) => {
      form.houseFloor = ['1层/共6层', '2层/共6层', '3层/共18层', '中层/共33层'][tapIndex];
    },
  });
}

function chooseSaleHouseType() {
  uni.showActionSheet({
    itemList: ['公寓', '普通住宅', '别墅', '平房', '商住楼', '其他'],
    success: ({ tapIndex }) => {
      form.fwlx = ['公寓', '普通住宅', '别墅', '平房', '商住楼', '其他'][tapIndex];
    },
  });
}

function nextStep() {
  const missing = getMissingField();
  if (missing) {
    uni.showToast({ title: missing, icon: 'none' });
    return;
  }

  const draft = {
    ...form,
    type: pageType.value,
    releaseType: releaseType.value,
  };
  const key = `house-publish-draft-${Date.now()}`;
  uni.setStorageSync(key, draft);
  uni.navigateTo({
    url: `/pages/mine/houserentsale/${isSale.value ? 'SendSaleSecond' : 'SendRentSecond'}?draftKey=${encodeURIComponent(key)}`,
  });
}

function getMissingField() {
  if (!form.builtArea || !form.rentalTitle || !form.communityName || !form.houseType || !form.houseFloor) {
    return '请填写完整信息';
  }
  if (!isSale.value && (!form.monthlyRent || !form.rentMethod.length)) {
    return '请填写完整信息';
  }
  if (isRenthe.value && !form.bedroomType.length) {
    return '请填写完整信息';
  }
  if (isSale.value && (!form.fwlx || !form.buildnum)) {
    return '请填写完整信息';
  }
  return '';
}

function goBack() {
  uni.navigateBack();
}

function cancelAgreement() {
  agreementVisible.value = false;
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background: #f6f7fb; }
.nav-left { display: flex; padding: 0 8px; }
.content { height: calc(100vh - 44px); }
.form-section { margin-top: 10px; padding: 0 15px; background: #fff; }
.field-row { display: flex; align-items: center; min-height: 50px; border-bottom: 1px solid #ededed; }
.field-label { width: 88px; flex-shrink: 0; color: #333; font-size: 14px; }
.field-input, .field-value { flex: 1; min-width: 0; color: #666; font-size: 14px; }
.field-input { height: 42px; }
.field-value.placeholder { color: #999; }
.choice-row, .tag-wrap { display: flex; flex-wrap: wrap; gap: 10px; padding: 10px 0; }
.section-title { display: block; padding-top: 16px; color: #333; font-size: 14px; }
.form-footer { padding: 28px 24px 20px; }
.agreement-content { max-height: 360px; color: #666; font-size: 13px; line-height: 20px; }
</style>
