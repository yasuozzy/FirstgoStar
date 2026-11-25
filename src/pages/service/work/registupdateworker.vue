<template>
	<scroll-view style=" height: 100vh; overflow-y: auto;" scroll-y>
		<view style=" display: flex;flex-direction: column;">
			 <u-navbar title="用工登记" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>
			<u-gap height="10" bgColor="#f5f5f5"></u-gap>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">用 工 方</view>
				<u-input placeholder="请输入内容" border="none" v-model="yonggongfang"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">用工地点</view>
				<u-input placeholder="请输入内容" border="none" v-model="yonggongdidian"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<!-- <view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">选择工种</view>
				<picker mode="multiSelector" :range="multiArray" :value="multiIndex" @columnchange="handleColumnChange"
					@change="handlePickerChange">
					<view>{{ selectedText || '请选择地区' }}</view>
				</picker>
			</view> -->

			<view class="TypeView worktype-select-row" :class="{ 'worktype-select-row-open': worktypeOn }">
				<text class="type-label">选择工种</text>
				<view class="worktype-picker-wrap" @tap="chooseWorktype">
					<text class="ChooseText">{{ zhanshiWorkType || '请选择' }}</text>
					<image class="worktype-arrow" src="/static/images/downImage.png" mode="aspectFit" />
				</view>
				<view v-if="worktypeOn" class="worktype-dropdown" @tap.stop>
					<scroll-view scroll-y class="worktype-drop-left">
						<view v-for="(item, index) in gongZhongArray" :key="index" class="worktype-left-item"
							:class="{ 'worktype-left-active': curIndex === index }" @tap.stop="currentTabs(index)">
							<text class="worktype-left-text">{{ item.name }}</text>
							<text class="worktype-left-arrow">></text>
						</view>
					</scroll-view>
					<scroll-view scroll-y class="worktype-drop-right">
						<view v-if="gongZhongArray[curIndex] && gongZhongArray[curIndex].childList">
							<view v-for="(child, childIndex) in gongZhongArray[curIndex].childList" :key="childIndex"
								class="worktype-right-item"
								@tap.stop="chooseFinalType(child, gongZhongArray[curIndex])">
								{{ child.name }}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">所需人数</view>
				<u-input placeholder="请输入内容" border="none" v-model="suoshurenshu"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">所需时间</view>
				<u-input placeholder="请输入内容" border="none" v-model="suoshushijian" style="width: 200px;"></u-input>
				<picker @change="bindPickerChange" :value="index" :range="array" style="margin-right: 15px;">
					<view class="uni-input">{{ array[index] }}</view>
				</picker>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">薪资情况</view>
				<u-input placeholder="请输入内容" border="none" v-model="xinziqingkuang"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">结算方式</view>
				<u-input placeholder="请输入内容" border="none" v-model="jiesuanfangshi"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">联 系 人</view>
				<u-input placeholder="请输入内容" border="none" v-model="lianxiren"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">联系电话</view>
				<u-input placeholder="请输入内容" border="none" v-model="dianhua"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view
					style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
				</view>
				<view> 岗位要求</view>
			</view>
			<u-textarea v-model="value1" placeholder="请输入内容" autoHeight
				style="margin-left: 12px;margin-right: 12px;border: 1px solid #d9d9d9; border-radius: 4px;"></u-textarea>
			<view>
				<checkbox value="cb" :checked="true" style="margin-left: 15px;" />阅读并同意<text
					style="color: #2a9598;">《用户协议》</text>
			</view>
			<view
				style="margin: 15px;background-color: #2a9598;color: white;text-align: center;border-radius: 4px;padding-top: 4px;padding-bottom: 4px;"
				@click="commit()">提交
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import { wugongdengjiworkkind, dayjobcompanyUpdateInfo, getMyCompanyDayJobInfo } from '@/api/work';

import { MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo } from '@/api/mine.ts';

import { storage } from '@/utils/storage';

import { getCurrentInstance, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const proxy = getCurrentInstance()?.proxy as any;

const forceUpdate = () => proxy?.$forceUpdate?.();

const bgColor = ref('#007AFF');

const registerList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const multiArray = ref([['广东省', '江西省'], ['广州市', '深圳市']]);

const multiIndex = ref([0, 0]);

const selectedText = ref('');

const array = ref(['年', '月', '天', '小时', '长期', '面议']);

const yonggongfang = ref('');

const yonggongdidian = ref('');

const suoshurenshu = ref('');

const suoshushijian = ref('');

const xinziqingkuang = ref('');

const jiesuanfangshi = ref('');

const lianxiren = ref('');

const dianhua = ref('');

const value1 = ref('');

const showModal = ref(false);

const worktypeOn = ref(false);

const typeString = ref('');

const gongzhongString = ref('');

const curIndex = ref(0);

const index = ref(0);

const zhanshiWorkType = ref('请选择');

const gongZhongArray = ref([]);

const selecttype = ref('');

const gongZhonmgArray = ref([]);

const timeunit = ref("");

const id = ref<any>();

const cityMap = ref<any>();

const rstatus = ref<any>();

const loadData = () => {
  wugongdengjiworkkind({
      type: 0
    }).then(res => {
      console.log(res);
      if (res && res.result) {
        gongZhongArray.value = res.result;
      }
    }).catch(error => {
      console.error('获取工种数据失败:', error);
    });
};

const getInfo = () => {
  getMyCompanyDayJobInfo({
      id: id.value
    }).then(res => {
      console.log(res);
      if (res && res.result) {
        // 		company: this.yonggongfang,
        // work_location: this.yonggongdidian,
        // work_kind: this.typeString,
        // work_type: this.zhanshiWorkType,
        // type: 1,
        // work_num: this.suoshurenshu,
        // work_time: this.suoshushijian + this.timeunit,
        // salary: this.xinziqingkuang,
        // pay_method: this.jiesuanfangshi,
        // name: this.lianxiren,
        // mobile: this.dianhua,
        // work_request: this.value1,

        yonggongfang.value = res.result.company;
        yonggongdidian.value = res.result.work_location;
        typeString.value = res.result.work_kind;
        zhanshiWorkType.value = res.result.work_type;
        suoshurenshu.value = res.result.work_num.match(/\d+/)[0];
        suoshushijian.value = res.result.work_time.match(/\d+/)[0];
        xinziqingkuang.value = res.result.salary;
        jiesuanfangshi.value = res.result.pay_method;
        lianxiren.value = res.result.name;
        dianhua.value = res.result.mobile;
        value1.value = res.result.work_request;
      }
    });
};

const goBack = () => {
  uni.navigateBack();
};

const handleColumnChange = (e) => {
  const column = e.detail.column;
    const value = e.detail.value;
    if (column === 0) {
      // 第一列改变
      multiIndex.value[0] = value;
      // 根据所选省份更新第二列城市数据（需准备城市映射表）
      multiArray.value[1] = cityMap.value[value];
      forceUpdate();
    }
};

const handlePickerChange = (e) => {
  const province = multiArray.value[0][multiIndex.value[0]];
    const city = multiArray.value[1][multiIndex.value[1]];
    selectedText.value = province + '-' + city;
};

const bindPickerChange = (e) => {
  console.log('picker发送选择改变，携带值为', e.detail.value);
    index.value = e.detail.value;
    timeunit.value = array.value[index.value];
};

const chooseWorktype = () => {
  showModal.value = false;
    if (!gongZhongArray.value.length) {
      uni.showToast({
        title: '工种数据暂未加载',
        icon: 'none'
      });
      return;
    }
    worktypeOn.value = !worktypeOn.value;
};

const currentTabs = (index) => {
  curIndex.value = index;
};

const chooseFinalType = (child, parent) => {
  const parentName = parent && parent.name ? parent.name : '';
    typeString.value = parentName;
    gongzhongString.value = child && child.name ? child.name : '';
    zhanshiWorkType.value = parentName && gongzhongString.value ? `${parentName} ${gongzhongString.value}` : gongzhongString.value || '请选择';
    worktypeOn.value = false;
};

const getcomregiststatus = () => {
  let param = {
      userId: storage.getUserId()
    };
    MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo(param).then(res => {
      console.log(res);
      rstatus.value = res.result;
      if (res.result === '1') {
        selecttype.value = '10';
      } else if (res.result === '-1') {
        selecttype.value = '1';
      } else if (res.result === '0') {
        selecttype.value = '1';
      } else if (res.result === '2') {
        selecttype.value = '1';
      }
    });
};

const commit = () => {
  if (!yonggongfang.value) {
      uni.showToast({
        title: '请填写公司名称',
        icon: 'none'
      });
      return;
    }
    if (!yonggongdidian.value) {
      uni.showToast({
        title: '请填写工作地点',
        icon: 'none'
      });
      return;
    }
    if (!typeString.value) {
      uni.showToast({
        title: '请填写工种',
        icon: 'none'
      });
      return;
    }
    if (!zhanshiWorkType.value) {
      uni.showToast({
        title: '请填写工种',
        icon: 'none'
      });
      return;
    }
    if (!suoshurenshu.value) {
      uni.showToast({
        title: '请填写人数',
        icon: 'none'
      });
      return;
    }
    if (!suoshushijian.value) {
      uni.showToast({
        title: '请填写时间',
        icon: 'none'
      });
      return;
    }
    if (!xinziqingkuang.value) {
      uni.showToast({
        title: '请填写薪资情况',
        icon: 'none'
      });
      return;
    }
    if (!jiesuanfangshi.value) {
      uni.showToast({
        title: '请填写结算方式',
        icon: 'none'
      });
      return;
    }
    let param = {
      company: yonggongfang.value,
      work_location: yonggongdidian.value,
      work_kind: typeString.value,
      work_type: zhanshiWorkType.value,
      type: 1,
      work_num: suoshurenshu.value,
      work_time: suoshushijian.value + timeunit.value,
      salary: xinziqingkuang.value,
      pay_method: jiesuanfangshi.value,
      name: lianxiren.value,
      mobile: dianhua.value,
      work_request: value1.value,
      id: id.value
    };
    dayjobcompanyUpdateInfo(param).then(res => {
      console.log(res);
      if (res && res.success) {
        uni.showToast({
          title: '更新成功',
          icon: 'success'
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } else {
        uni.showToast({
          title: res.message || '提交失败',
          icon: 'none'
        });
      }
    }).catch(error => {
      console.error('提交信息失败:', error);
      uni.showToast({
        title: '提交失败，请稍后再试',
        icon: 'none'
      });
    });
};

onMounted(() => {
  loadData();
});

onLoad((e) => {
  id.value = e.id || '';
    if (id.value) {
      getInfo();
    }
});
</script>

<style>
/* 类型选择 */
.TypeView {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #fff;
}

.worktype-menu-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: transparent;
	z-index: 998;
}

.worktype-select-row {
	position: relative;
	z-index: 999;
}

.worktype-select-row-open {
	z-index: 1000;
}

.worktype-picker-wrap {
	flex: 1;
	display: flex;
	align-items: center;
	margin-left: 25px;
}

.worktype-arrow {
	width: 26rpx;
	height: 20rpx;
}

.worktype-dropdown {
	position: absolute;
	top: 0;
	left: 210rpx;
	width: 550rpx;
	display: flex;
	background-color: #fff;
	border-radius: 8rpx;
	box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.15);
	border: 1rpx solid #e0e0e0;
	z-index: 1001;
	overflow: hidden;
}

.worktype-drop-left {
	width: 250rpx;
	max-height: 440rpx;
	border-right: 2rpx solid #f0f0f0;
	flex-shrink: 0;
	background-color: #f5f5f5;
}

.worktype-drop-right {
	flex: 1;
	max-height: 440rpx;
}

.worktype-left-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 26rpx 24rpx;
	font-size: 28rpx;
}

.worktype-left-text {
	color: #333;
}

.worktype-left-active {
	background-color: #fff;
	box-shadow: 2rpx 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 6rpx;
}

.worktype-left-active .worktype-left-text {
	color: #2A9598;
	font-weight: 600;
}

.worktype-left-arrow {
	color: #2A9598;
	font-size: 28rpx;
	margin-left: 10rpx;
}

.worktype-right-item {
	padding: 26rpx 24rpx;
	font-size: 28rpx;
	color: #333;
	text-align: center;
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>