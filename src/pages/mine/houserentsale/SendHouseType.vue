<template>
  <view class="page">
    <up-navbar
      title="选择发布类型"
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

    <view class="tip-bar">
      <u-image src="/static/zs_lingdang.png" width="25px" height="25px" />
      <text class="tip-text">温馨提示：请正确选择发布信息的分类,分类错误会导致信息违规下架</text>
    </view>

    <view v-for="group in visibleGroups" :key="group.title" class="type-group">
      <view class="group-title">{{ group.title }}</view>
      <view
        v-for="item in group.items"
        :key="item.key"
        class="type-item"
        @click="handleSelect(item)"
      >
        <view class="type-main">
          <view class="type-icon-wrap">
            <u-image :src="item.icon" width="30px" height="30px" />
          </view>
          <view class="type-copy">
            <view class="type-name-row">
              <text class="type-name">{{ item.name }}</text>
              <up-tag :text="item.tag" type="primary" plain size="mini" />
            </view>
            <text class="type-description">{{ item.description }}</text>
          </view>
        </view>
        <u-icon name="arrow-right" size="18" color="#999" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

type ReleaseMode = 'rent' | 'sale';

interface TypeItem {
  key: 'sale1' | 'sale2' | 'sale3' | 'sale4' | 'rent1' | 'rent2' | 'rent3' | 'rent4' | 'rent5';
  name: string;
  description: string;
  tag: string;
  icon: string;
}

interface TypeGroup {
  title: string;
  items: TypeItem[];
}

const bgColor = ref('#2A9595');
const mode = ref<ReleaseMode>('sale');

const saleItems: TypeItem[] = [
  { key: 'sale1', name: '业主卖房', description: '个人业主直接发布房源', tag: '住宅', icon: '/static/yzmf.png' },
  { key: 'sale2', name: '商铺', description: '市场,卖场,底商,摊位,柜台等', tag: '商铺', icon: '/static/shangpu.png' },
  { key: 'sale3', name: '写字楼', description: '写字楼,商务中心,商住公寓等', tag: '建设中', icon: '/static/xiezilou.png' },
  { key: 'sale4', name: '厂房', description: '厂房,车位,土地,仓库等', tag: '建设中', icon: '/static/changfang.png' },
];

const rentItems: TypeItem[] = [
  { key: 'rent1', name: '整租', description: '一整套房子,也包括开间', tag: '住宅', icon: '/static/zhengzu.png' },
  { key: 'rent5', name: '合租', description: '一个房间', tag: '住宅', icon: '/static/hezu.png' },
  { key: 'rent2', name: '商铺', description: '市场,卖场,底商,摊位,柜台等', tag: '商铺', icon: '/static/shangpu.png' },
  { key: 'rent3', name: '写字楼', description: '写字楼,商务中心,商住公寓等', tag: '建设中', icon: '/static/xiezilou.png' },
  { key: 'rent4', name: '厂房', description: '厂房,车位,土地,仓库等', tag: '建设中', icon: '/static/changfang.png' },
];

const visibleGroups = computed<TypeGroup[]>(() => {
  const items = mode.value === 'rent' ? rentItems : saleItems;
  return [
    { title: mode.value === 'rent' ? '居民住宅' : '出售居民住宅', items: items.slice(0, mode.value === 'rent' ? 2 : 1) },
    { title: '商业用地', items: items.slice(mode.value === 'rent' ? 2 : 1) },
  ];
});

onLoad((options: any) => {
  mode.value = options?.type === 'rent' ? 'rent' : 'sale';
});

function handleSelect(item: TypeItem) {
  const routeMap: Record<TypeItem['key'], { path?: string; releaseType?: string; type?: string }> = {
    sale1: { path: 'SendHouseFirst', releaseType: '1', type: 'sale' },
    sale2: { path: 'SendSaleBussinessHouseFirst', releaseType: '2', type: 'sale' },
    sale3: {},
    sale4: {},
    rent1: { path: 'SendRentFirst', releaseType: '1', type: 'rent' },
    rent5: { path: 'SendRentHeFirst', releaseType: '1', type: 'renthe' },
    rent2: { path: 'SendRentBussinessHouseFirst', releaseType: '2', type: 'sale' },
    rent3: {},
    rent4: {},
  };

  const target = routeMap[item.key];
  if (!target.path) {
    uni.showToast({ title: '努力建设中,请稍后再试', icon: 'none' });
    return;
  }

  uni.navigateTo({
    url: `/pages/mine/houserentsale/${target.path}?releaseType=${target.releaseType}&type=${target.type}`,
  });
}

function goBack() {
  uni.navigateBack();
}

</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.nav-left {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.tip-bar {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background: #fdfbec;
}

.tip-text {
  margin-left: 10px;
  color: #e77a43;
  font-size: 13px;
  line-height: 20px;
}

.type-group {
  padding-top: 8px;
}

.group-title {
  padding: 10px 15px;
  color: #999;
  font-size: 13px;
  background: #f6f7f8;
}

.type-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 10px 15px;
  border-bottom: 1px solid #ededed;
}

.type-main {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
}

.type-icon-wrap {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: 20px;
  background: rgba(42, 149, 149, 0.1);
}

.type-copy {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
}

.type-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-name {
  color: #333;
  font-size: 15px;
}

.type-description {
  margin-top: 5px;
  color: #999;
  font-size: 12px;
  line-height: 18px;
}
</style>
