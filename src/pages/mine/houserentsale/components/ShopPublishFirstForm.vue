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
        <view class="field-row" @click="selectHouse">
          <text class="field-label">选择房产</text>
          <text class="field-value" :class="{ placeholder: !form.houseId }">
            {{ form.houseCompleteName || '请选择房产' }}
          </text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row">
          <text class="field-label">发布标题</text>
          <input v-model="form.title" class="field-input" placeholder="请填写" />
        </view>
        <view class="field-row">
          <text class="field-label">房屋完整名称</text>
          <input v-model="form.houseCompleteName" class="field-input" placeholder="请填写" />
        </view>
        <view class="field-row">
          <text class="field-label">房屋编号</text>
          <input v-model="form.houserNum" class="field-input" placeholder="请填写" />
        </view>
        <view class="field-row">
          <text class="field-label">所在区域</text>
          <input v-model="form.locationName" class="field-input" placeholder="请填写" />
        </view>
        <view class="field-row" @click="choose('shopType', '商铺类型')">
          <text class="field-label">房屋类型</text>
          <text class="field-value" :class="{ placeholder: !form.shopType }">{{ form.shopType || '请选择' }}</text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row">
          <text class="field-label">房屋楼层</text>
          <input v-model="form.houseFloor" class="field-input" type="digit" placeholder="请填写" />
        </view>
        <view class="field-row">
          <text class="field-label">建筑面积</text>
          <input v-model="form.builtArea" class="field-input" type="digit" placeholder="请填写" />
        </view>
        <view class="field-row">
          <text class="field-label">规格</text>
          <view class="spec-row">
            <input v-model="form.width" class="spec-input" type="digit" placeholder="面宽" />
            <input v-model="form.depth" class="spec-input" type="digit" placeholder="进深" />
            <input v-model="form.height" class="spec-input" type="digit" placeholder="层高" />
          </view>
        </view>
        <view class="field-row" @click="choose('operatingIndustry', '店铺经营行业')">
          <text class="field-label">经营行业</text>
          <text class="field-value" :class="{ placeholder: !form.operatingIndustry }">{{ form.operatingIndustry || '请选择' }}</text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row" @click="choose('operatingStatus', '店铺经营状态')">
          <text class="field-label">经营状态</text>
          <text class="field-value" :class="{ placeholder: !form.operatingStatus }">{{ form.operatingStatus || '请选择' }}</text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
        <view class="field-row">
          <text class="field-label">是否临街</text>
          <view class="choice-row">
            <up-tag text="是" type="primary" :plain="form.isFrontage !== '1'" @click="form.isFrontage = '1'" />
            <up-tag text="否" type="primary" :plain="form.isFrontage !== '0'" @click="form.isFrontage = '0'" />
          </view>
        </view>
        <view v-if="!isSale" class="field-row">
          <text class="field-label">返租方式</text>
          <view class="choice-row">
            <up-tag text="月返" type="primary" :plain="form.rentType !== '0'" @click="form.rentType = '0'" />
            <up-tag text="年返" type="primary" :plain="form.rentType !== '1'" @click="form.rentType = '1'" />
          </view>
        </view>
        <view class="field-row">
          <text class="field-label">{{ isSale ? '售价' : '月租金' }}</text>
          <input v-model="form.amount" class="field-input" type="digit" placeholder="请填写" />
        </view>
        <view v-if="!isSale" class="field-row" @click="choose('leaseTerm', '店铺租期')">
          <text class="field-label">租期</text>
          <text class="field-value" :class="{ placeholder: !form.leaseTerm }">{{ form.leaseTerm || '请选择' }}</text>
          <u-icon name="arrow-right" size="16" color="#999" />
        </view>
      </view>

      <view class="form-section">
        <text class="section-title">配套设施</text>
        <view class="tag-wrap">
          <up-tag
            v-for="item in allocationOptions"
            :key="item.childValue"
            :text="item.childValue"
            type="primary"
            :plain="!form.allocation.includes(item.childValue)"
            @click="toggleAllocation(item.childValue)"
          />
        </view>
        <textarea v-model="form.detailed" class="detail-input" placeholder="请输入房屋亮点" />
      </view>

      <view class="form-footer">
        <u-button text="下一步" type="primary" color="#2A9595" @click="nextStep" />
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
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { GetAgreemente, queryDictAllList } from '@/api/mine';
import eventBus from '@/utils/eventBus';

interface DictItem { childValue: string; }

interface ShopHouseItem {
  hseId?: string;
  house_id?: string;
  houseId?: string;
  id?: string;
  completeName?: string;
  complete_name?: string;
  houseCompleteName?: string;
  bldHseName?: string;
  bld_hse_name?: string;
  houserNum?: string;
  manname?: string;
  location_name?: string;
  locationName?: string;
  longitude?: string;
  latitude?: string;
  title?: string;
  shop_type?: string;
  shopType?: string;
  house_floor?: string;
  houseFloor?: string;
  built_area?: string;
  builtArea?: string;
  operating_status?: string;
  operatingStatus?: string;
  operating_industry?: string;
  operatingIndustry?: string;
  spec?: string;
  is_frontage?: string | number;
  isFrontage?: string | number;
  rent_type?: string | number;
  rentType?: string | number;
  lease_term?: string;
  leaseTerm?: string;
  allocation?: string;
  detailed?: string;
}

const props = defineProps<{ pageKind: 'rent' | 'sale' }>();
const bgColor = ref('#2A9595');
const pageType = ref(props.pageKind);
const dicts = ref<Record<string, DictItem[]>>({});
const agreementVisible = ref(false);
const agreementName = ref('用户协议');
const agreementContent = ref('');
const form = reactive({
  title: '', houseCompleteName: '', houserNum: '', locationName: '', shopType: '', houseFloor: '', builtArea: '',
  width: '', depth: '', height: '', operatingIndustry: '', operatingStatus: '', isFrontage: '', amount: '', leaseTerm: '',
  rentType: '', allocation: [] as string[], detailed: '', houseId: '', longitude: '', latitude: '',
});

const isSale = computed(() => pageType.value === 'sale');
const allocationOptions = computed(() => dicts.value['店铺设施'] || []);

onLoad(() => {
  loadDict();
  loadAgreement();
});

onMounted(() => {
  eventBus.on('SELECT_SHOP_HOUSE', handleHouseSelected);
});
onUnmounted(() => {
  eventBus.off('SELECT_SHOP_HOUSE', handleHouseSelected);
});

async function loadDict() {
  try {
    const res = await queryDictAllList({});
    const result = Array.isArray(res?.result) ? res.result : [];
    const next: Record<string, DictItem[]> = {};
    result.forEach((item: any) => { next[item.value] = Array.isArray(item.childrenMapList) ? item.childrenMapList : []; });
    dicts.value = next;
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '字典加载失败，请稍后重试', icon: 'none' });
  }
}

async function loadAgreement() {
  try {
    const res = await GetAgreemente({ type: '14' });
    agreementName.value = res?.result?.agreement_name || '用户协议';
    agreementContent.value = res?.result?.agreement_content || '';
    agreementVisible.value = true;
  } catch (error) {
    console.log(error);
    uni.showToast({ title: '协议加载失败，请稍后重试', icon: 'none' });
  }
}

function selectHouse() {
  uni.navigateTo({
    url: `/pages/mine/houserentsale/HouseList?type=${encodeURIComponent(pageType.value)}`,
  });
}

function handleHouseSelected(item: Record<string, any>) {
  const house = item as ShopHouseItem;
  const specValues = String(house.spec || '')
    .split(',')
    .map((value) => value.replace(/米/g, '').replace(/面宽|进深:|层高/g, '').trim());

  form.houseId = String(house.hseId || house.house_id || house.houseId || house.id || '');
  form.houseCompleteName = String(house.completeName || house.complete_name || house.houseCompleteName || '');
  form.houserNum = String(house.bldHseName || house.bld_hse_name || house.houserNum || '');
  form.locationName = String(house.manname || house.location_name || house.locationName || '');
  form.longitude = String(house.longitude || '');
  form.latitude = String(house.latitude || '');
  form.title = String(house.title || form.title || '');
  form.shopType = String(house.shop_type || house.shopType || '');
  form.houseFloor = String(house.house_floor || house.houseFloor || '');
  form.builtArea = String(house.built_area || house.builtArea || '');
  form.operatingStatus = String(house.operating_status || house.operatingStatus || '');
  form.operatingIndustry = String(house.operating_industry || house.operatingIndustry || '');
  form.width = specValues[0] || '';
  form.depth = specValues[1] || '';
  form.height = specValues[2] || '';
  form.isFrontage = String(house.is_frontage ?? house.isFrontage ?? '');
  form.rentType = String(house.rent_type ?? house.rentType ?? '');
  form.leaseTerm = String(house.lease_term || house.leaseTerm || '');
  form.allocation = splitValues(house.allocation);
  form.detailed = String(house.detailed || '');
}

function splitValues(value?: string) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function choose(field: keyof typeof form, title: string) {
  const list = dicts.value[title] || [];
  if (!list.length) {
    uni.showToast({ title: '暂无可选数据', icon: 'none' });
    return;
  }
  uni.showActionSheet({
    itemList: list.map((item) => item.childValue),
    success: ({ tapIndex }) => { form[field] = list[tapIndex].childValue as never; },
  });
}

function toggleAllocation(value: string) {
  form.allocation = form.allocation.includes(value)
    ? form.allocation.filter((item) => item !== value)
    : [...form.allocation, value];
}

function nextStep() {
  const missing = !form.houseId ? '请选择房产'
    : !form.title ? '请输入发布标题'
      : !form.houseCompleteName ? '请输入房屋完整名称'
        : !form.houserNum ? '请输入房屋编号'
          : !form.locationName ? '请输入所在区域'
            : !form.shopType ? '请输入商铺类型'
              : !form.houseFloor ? '请输入楼层'
                : !form.builtArea ? '请输入建筑面积'
                  : !form.operatingStatus ? '请输入经营状态'
                    : !form.operatingIndustry ? '请输入经营行业'
                      : !form.width || !form.depth || !form.height ? '请输入完整规格'
                        : !form.amount ? (isSale.value ? '请输入售价' : '请输入月租金')
                          : !form.isFrontage ? '请选择是否临街'
                            : !isSale.value && !form.rentType ? '请选择返租方式'
                              : !form.allocation.length ? '请选择配套设施' : '';
  if (missing) {
    uni.showToast({ title: missing, icon: 'none' });
    return;
  }
  const key = `shop-publish-draft-${Date.now()}`;
  uni.setStorageSync(key, { ...form, type: pageType.value });
  uni.navigateTo({
    url: `/pages/mine/houserentsale/${isSale.value ? 'SendSaleBussinessHouseSecond' : 'SendRentBussinessHouseSecond'}?draftKey=${encodeURIComponent(key)}`,
  });
}

function goBack() { uni.navigateBack(); }
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
.field-label { width: 92px; flex-shrink: 0; color: #333; font-size: 14px; }
.field-input, .field-value { flex: 1; min-width: 0; color: #666; font-size: 14px; }
.field-input { height: 42px; }
.field-value { text-align: right; }
.placeholder { color: #999; }
.choice-row, .tag-wrap { display: flex; flex-wrap: wrap; gap: 10px; padding: 8px 0; }
.spec-row { display: flex; flex: 1; gap: 6px; }
.spec-input { width: 30%; height: 42px; font-size: 13px; }
.section-title { display: block; padding: 15px 0 10px; color: #333; font-size: 14px; }
.detail-input { width: 100%; height: 100px; box-sizing: border-box; margin-bottom: 15px; padding: 10px; background: #f7f8fa; font-size: 14px; }
.form-footer { padding: 28px 24px 20px; }
.agreement-content { max-height: 360px; color: #666; font-size: 13px; line-height: 20px; }
</style>
