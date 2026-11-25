<template>
    <scroll-view style=" height: 100vh; overflow-y: auto;" scroll-y>
        <view style=" display: flex;flex-direction: column;">
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
                <text style="margin-right: 25px;">选择工种</text>
                <view class="worktype-picker-wrap" @tap="chooseWorktype">
                    <text >{{ zhanshiWorkType || '请选择' }}</text>
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
                  <view class="TypeView salary-select-row" :class="{ 'salary-select-row-open': showSalaryTypeMenu }">
            <text style="margin-right: 25px;">期待薪资</text>
            <view class="salary-picker-wrap" @tap.stop="openSalarySelector">
                <view >{{ salarytitle || '请选择薪资' }}</view>
                <image class="salary-arrow" src="/static/images/downImage.png" mode="aspectFit" />
            </view>
            <view v-if="showSalaryTypeMenu" class="salary-type-menu" @tap.stop>
                <view v-for="(item, index) in salaryArr" :key="index" class="salary-type-item"
                    @tap.stop="selectSalaryType(item)">
                    {{ item }}
                </view>
            </view>
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
             <!-- 薪资弹窗 -->
        <view class="modal-mask" @tap="hideModal" v-if="showModal"></view>
        <view class="modal-dialog salary-modal-dialog" v-if="showModal">
            <view class="modal-title">{{ salaryModalTitle }}</view>
            <view class="modal-content">
                <view class="salary-modal-main">
                    <view class="salary-input-area">
                        <view v-if="salaryOrdesperate == '0'" class="salary-single-input-wrap">
                            <view class="salary-input-line">
                                <input @input="salaryChange" class="salary-input salary-input-copy" placeholder="请输入"
                                    placeholder-style="color: #d7d9df;" type="text" :value="salaryAmount" />
                            </view>
                            <input @input="salaryChange" class="salary-input" placeholder="请输入" type="text"
                                :value="salaryAmount" />
                        </view>
                        <view v-else-if="salaryOrdesperate == '1'" class="salary-range-container">
                            <input @input="startChange" class="salary-range-input start" placeholder="请输入" type="text"
                                :value="startSalary" />
                            <text class="range-separator">-</text>
                            <input @input="endChange" class="salary-range-input end" placeholder="请输入" type="text"
                                :value="endSalary" />
                        </view>
                    </view>
                    <view class="salary-unit-wheel">
                        <view class="salary-unit-indicator"></view>
                        <picker-view class="salary-unit-picker" :value="[salaryUnitIndex]"
                            indicator-style="height: 60rpx;" @change="onSalaryUnitChange">
                            <picker-view-column>
                                <view v-for="(item, index) in choosedata" :key="index" class="salary-unit-item">
                                    {{ item.name }}
                                </view>
                            </picker-view-column>
                        </picker-view>
                    </view>
                </view>
            </view>
            <view class="modal-footer modal-footer-single">
                <view class="btn-confirm btn-confirm-single" @tap="onConfirm">确定</view>
            </view>
        </view>
        </view>
    </scroll-view>
</template>

<script setup lang="ts">
import { wugongdengjiworkkind, dayjobcompanySubmitInfo } from '@/api/work';

import { MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo } from '@/api/mine.ts';

import { storage } from '@/utils/storage';

import { getCurrentInstance, onMounted, ref } from "vue";

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

const showModalLegacy1 = ref(false);

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

const salarytitle = ref('请选择');

const salaryArr = ref(['薪金', '区间', '面议']);

const choosedata = ref([
                { name: '元/天' },
                { name: '元/月' },
                { name: '元/时' }
            ]);

const showSalaryTypeMenu = ref(false);

const salaryModalTitle = ref('薪金');

const showModal = ref(false);

const salaryAmount = ref('');

const chooseTitle = ref('元/天');

const salaryUnitIndex = ref(0);

const salaryOrdesperate = ref('0');

const startSalary = ref('');

const endSalary = ref('');

const cityMap = ref<any>();

const rstatus = ref<any>();

const openSalarySelector = () => {
  worktypeOn.value = false;
    showModal.value = false;
    showSalaryTypeMenu.value = !showSalaryTypeMenu.value;
};

const hideSalaryTypeMenu = () => {
  showSalaryTypeMenu.value = false;
};

const selectSalaryType = (currentType) => {
  showSalaryTypeMenu.value = false;
    if (currentType === '面议') {
      salarytitle.value = '面议';
      showModal.value = false;
      salaryAmount.value = '';
      startSalary.value = '';
      endSalary.value = '';
      return;
    }
    salaryModalTitle.value = currentType;
    salaryOrdesperate.value = currentType === '区间' ? '1' : '0';
    if (salaryOrdesperate.value === '0') {
      startSalary.value = '';
      endSalary.value = '';
    } else {
      salaryAmount.value = '';
    }
    const defaultIndex = choosedata.value.findIndex(item => item.name === chooseTitle.value);
    salaryUnitIndex.value = defaultIndex === -1 ? 0 : defaultIndex;
    chooseTitle.value = choosedata.value[salaryUnitIndex.value] ? choosedata.value[salaryUnitIndex.value].name : '元/天';
    showModal.value = true;
};

const salaryChange = (e) => {
  salaryAmount.value = e.detail.value;
};

const startChange = (e) => {
  startSalary.value = e.detail.value;
};

const endChange = (e) => {
  endSalary.value = e.detail.value;
};

const onSalaryUnitChange = (e) => {
  const currentValue = Array.isArray(e.detail.value) ? Number(e.detail.value[0]) : Number(e.detail.value);
    salaryUnitIndex.value = Number.isNaN(currentValue) ? 0 : currentValue;
    chooseTitle.value = choosedata.value[salaryUnitIndex.value] ? choosedata.value[salaryUnitIndex.value].name : '元/天';
};

const hideModal = () => {
  showModal.value = false;
};

const onCancel = () => {
  hideModal();
};

const onConfirm = () => {
  if (salaryOrdesperate.value === '0') {
      if (!salaryAmount.value) {
        uni.showToast({
          title: '请输入薪金金额',
          icon: 'none'
        });
        return;
      }
      salarytitle.value = `${salaryAmount.value}${chooseTitle.value}`;
    } else if (salaryOrdesperate.value === '1') {
      if (!startSalary.value || !endSalary.value) {
        uni.showToast({
          title: '请填写薪资完整区间',
          icon: 'none'
        });
        return;
      }
      const startNumber = Number(startSalary.value);
      const endNumber = Number(endSalary.value);
      if (!Number.isNaN(startNumber) && !Number.isNaN(endNumber) && startNumber > endNumber) {
        uni.showToast({
          title: '区间起始值不能大于结束值',
          icon: 'none'
        });
        return;
      }
      salarytitle.value = `${startSalary.value}-${endSalary.value}${chooseTitle.value}`;
    }
    showModal.value = false;
};

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
    if (!salarytitle.value) {
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
      type: 0,
      work_num: suoshurenshu.value,
      work_time: suoshushijian.value + timeunit.value,
      salary: salarytitle.value,
      pay_method: jiesuanfangshi.value,
      name: lianxiren.value,
      mobile: dianhua.value,
      work_request: value1.value,
      userId: storage.getUserId()
    };
    dayjobcompanySubmitInfo(param).then(res => {
      console.log(res);
      if (res && res.success) {
        uni.showToast({
          title: '提交成功',
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


.type-label {
    width: 180rpx;
    flex-shrink: 0;
    font-size: 28rpx;
    color: #333;
}

.ChooseText {
    flex: 1;
    color: #666;
    font-size: 28rpx;
    margin-left: 20rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.picker {
    flex: 1;
    color: #666;
    font-size: 28rpx;
    margin-left: 20rpx;
}

.salary-picker-wrap {
    flex: 1;
    display: flex;
    align-items: center;
}

.salary-arrow {
    width: 26rpx;
    height: 20rpx;
}

.salary-menu-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 998;
}

.salary-select-row {
    position: relative;
    z-index: 999;
}

.salary-select-row-open {
    z-index: 1000;
}

.salary-type-menu {
    position: absolute;
    top: 92rpx;
    left: 210rpx;
    width: 170rpx;
    background-color: #fff;
    border-radius: 8rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.16);
    overflow: hidden;
    z-index: 1001;
}

.salary-type-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 2rpx solid #f3f3f3;
}

.salary-type-item:last-child {
    border-bottom: none;
}

/* 弹窗样式 */
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.modal-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 16rpx;
    z-index: 1000;
    width: 560rpx;
}

.modal-title {
    padding: 30rpx 30rpx 10rpx;
    text-align: center;
    font-size: 32rpx;
    color: #333;
    font-weight: 600;
}

.modal-content {
    padding: 20rpx 36rpx 10rpx;
}

.salary-modal-dialog {
    width: 660rpx;
}

.salary-modal-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.salary-input-area {
    flex: 1;
    padding-right: 24rpx;
}

.salary-single-input-wrap {
    padding: 10rpx 0;
}

.salary-input-line {
    width: 100%;
    border-bottom: 2rpx solid #f50000;
}

.salary-single-input-wrap>.salary-input {
    display: none;
}

.salary-input {
    width: 100%;
    height: 72rpx;
    border-bottom: 2rpx solid #dcdcdc;
    text-align: center;
    font-size: 28rpx;
}

.salary-input-copy {
    border-bottom: none;
}

.salary-range-container {
    display: flex;
    align-items: center;
}

.salary-range-input {
    width: 150rpx;
    height: 72rpx;
    border-bottom: 2rpx solid #f30000;
    text-align: center;
    font-size: 28rpx;
}

.range-separator {
    margin: 0 16rpx;
    color: #666;
    font-size: 28rpx;
}

.salary-unit-wheel {
    position: relative;
    width: 170rpx;
    height: 180rpx;
    flex-shrink: 0;
}

.salary-unit-indicator {
    position: absolute;
    left: 0;
    right: 0;
    top: 60rpx;
    height: 60rpx;
    background-color: #f4f4f4;
    border-radius: 18rpx;
    z-index: 0;
}

.salary-unit-picker {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 180rpx;
}

.salary-unit-item {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #666;
    font-size: 30rpx;
}
.btn-confirm {
    min-width: 160rpx;
    height: 68rpx;
    line-height: 68rpx;
    text-align: center;
    border-radius: 8rpx;
    font-size: 28rpx;
    background-color: #2A9598;
    color: #fff;
}

.btn-confirm-single {
    min-width: 220rpx;
}
.modal-footer {
    display: flex;
    justify-content: center;
    padding: 0 30rpx 30rpx;
}

.modal-footer-single {
    padding-top: 10rpx;
}

</style>