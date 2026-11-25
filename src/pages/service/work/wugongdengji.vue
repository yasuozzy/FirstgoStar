<template>
    <view>
        <u-navbar title="务工登记" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
            <template #right>
<view  style="display: flex;flex-direction: row;">
                <text @click="daitian"
                    style="color: #fff;font-size: 12px;border: 1px solid #fff;padding:2px 5px;border-radius: 5px;margin-right: 10px;">代填</text>
                <u-icon name="account" size="22" color="#fff" @click="tolist"></u-icon>
            </view>
</template>
        </u-navbar>

        <view v-if="showSalaryTypeMenu" class="salary-menu-mask" @tap="hideSalaryTypeMenu"></view>
        <view v-if="worktypeOn" class="worktype-menu-mask" @tap="worktypeOn = false"></view>

        <!-- 表单区域 -->
        <view class="zuhunameView">
            <view class="nameView">姓名</view>
            <input @input="changename" placeholder="请输入" type="text" :value="namestring" />
        </view>
        <view class="bottomLine2"></view>

        <view class="zuhunameView">
            <view class="nameView">性别</view>
            <input @input="changesex" placeholder="请输入" type="text" :value="sexstring" />
        </view>
        <view class="bottomLine2"></view>

        <view class="zuhunameView">
            <view class="nameView">联系电话</view>
            <input @input="changephone" placeholder="请输入" type="text" :value="phonestring" />
        </view>
        <view class="bottomLine2"></view>

        <view class="zuhunameView">
            <view class="nameView">家庭住址</view>
            <view class="address-text" @tap="chooseAddress">{{ addressstring || '请选择地址' }}</view>
            <image class="arrow-icon" src="/static/images/downImage.png" mode="aspectFit" />
        </view>
        <view class="bottomLine2"></view>

        <view class="zuhunameView">
            <view class="nameView">详细地址</view>
            <input @input="detailAddress" placeholder="填写详细地址" type="text" :value="detailAddre" />
        </view>
        <view class="bottomLine2"></view>

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
                            class="worktype-right-item" @tap.stop="chooseFinalType(child, gongZhongArray[curIndex])">
                            {{ child.name }}
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="bottomLine2"></view>

        <view class="TypeView salary-select-row" :class="{ 'salary-select-row-open': showSalaryTypeMenu }">
            <text class="type-label">期待薪资</text>
            <view class="salary-picker-wrap" @tap.stop="openSalarySelector">
                <view class="picker">{{ salarytitle || '请选择薪资' }}</view>
                <image class="salary-arrow" src="/static/images/downImage.png" mode="aspectFit" />
            </view>
            <view v-if="showSalaryTypeMenu" class="salary-type-menu" @tap.stop>
                <view v-for="(item, index) in salaryArr" :key="index" class="salary-type-item"
                    @tap.stop="selectSalaryType(item)">
                    {{ item }}
                </view>
            </view>
        </view>
        <view class="bottomLine2"></view>

        <view class="zuhunameView">
            <view class="nameView">期待工作地</view>
            <input @input="hopeworkplace" placeholder="请输入" type="text" :value="workplace" />
        </view>
        <view class="bottomLine2"></view>

        <!-- 有无证书 -->
        <view class="carTypeView">
            <view>有无证书</view>
            <radio-group class="group" @change="radioChange">
                <label class="label-2" v-for="(item, index) in checkboxItems" :key="index">
                    <radio :id="item.name" :value="item.name" :checked="item.checked" />
                    <text class="label-2-text">{{ item.name }}</text>
                </label>
            </radio-group>
        </view>
        <view class="bottomLine2"></view>

        <!-- 上传证书 -->
        <view v-if="havezhengshu" class="idcardTitleView">上传劳务证书</view>
        <view class="bottomLine2" v-if="havezhengshu"></view>
        <view v-if="havezhengshu" class="certificate-upload-wrap">
            <view class="certificate-upload-card" @tap="chooseClientPic">
                <block v-if="!previewArr.length">
                    <image class="certificate-camera-icon" src="/static/images/camera.png" mode="aspectFit" />
                </block>
                <image v-else class="certificate-preview-img" :src="previewArr[0]" mode="aspectFill" />
                <view v-if="previewArr.length" class="pic-item-close" @tap.stop="delReportPic(0)">
                    <image src="/static/images/deleteimage.png" mode="aspectFit"></image>
                </view>
            </view>
        </view>
        <view class="bottomLine2" v-if="havezhengshu"></view>

        <!-- 身份证上传 -->
        <view class="idcardTitleView">上传身份证照片</view>
        <view class="bottomLine2"></view>

        <view class="idcard-upload-list">
            <view @tap="incardZhengClick" class="idcard-upload-card">
                <block v-if="!idcardimagezheng">
                    <image class="camera-icon" src="/static/images/camera.png" mode="aspectFit" />
                    <text class="idcard-tip-text">拍摄/上传身份证正面照</text>
                </block>
                <image v-else class="idcard-preview-img" :src="idcardimagezheng" mode="aspectFill" />
            </view>

            <view @tap="incardFanClick" class="idcard-upload-card">
                <block v-if="!idcardimagefan">
                    <image class="camera-icon" src="/static/images/camera.png" mode="aspectFit" />
                    <text class="idcard-tip-text">拍摄/上传身份证反面照</text>
                </block>
                <image v-else class="idcard-preview-img" :src="idcardimagefan" mode="aspectFill" />
            </view>

            <view @tap="incardHandClick" class="idcard-upload-card">
                <block v-if="!idcardimagehand">
                    <image class="camera-icon" src="/static/images/camera.png" mode="aspectFit" />
                    <text class="idcard-tip-text">拍摄/手持身份证正面照</text>
                </block>
                <image v-else class="idcard-preview-img" :src="idcardimagehand" mode="aspectFill" />
            </view>
        </view>

        <view class="bottomLine2"></view>

        <!-- 协议确认 -->
        <view class="agreement-container">
            <checkbox-group @change="changeBox" class="agreement-group">
                <label class="agreement-item">
                    <checkbox value="1" color="#fe0000" class="radio1" />
                    <text class="agreement-text">已阅读并同意</text>
                    <text class="agreement-link" @tap="getserver">《平台委托发布劳务登记协议》</text>
                </label>
            </checkbox-group>
        </view>

        <view class="whiteView"></view>

        <!-- 提交按钮 -->
        <button type="primary" class="save-btn-top" @tap="uploadAllData">提交</button>

        <view class="whiteView"></view>

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
</template>

<script setup lang="ts">
import {
  wugongdengjiworkkind,
  wugongdengjiSubmitInfo,
  getMyWorkerDayJobInfo,
  updateMyWorkerDayJobInfo
} from '@/api/work';

import { storage, BaseURL } from '@/utils/storage';
import { onLoad } from '@dcloudio/uni-app';

import { onMounted, ref } from "vue";

const type = ref('1');

const bgColor = ref('#2A9598');

const defaultData = ref({
                title: '零工登记',
                image: '/images/myRight.png'
            });

const homeAddress = ref('请选择');

const checkboxItems = ref([
                { name: '是', value: '是' },
                { name: '否', value: '否', checked: true }
            ]);

const havezhengshu = ref(false);

const is_paperwork = ref('0');

const previewArr = ref([]);

const uploadBackFile = ref([]);

const imageStr = ref('');

const choosestatus = ref('1');

const idcardzheng = ref('/images/zhengimage.png');

const idcardimagezheng = ref('');

const idcardimagezhengserver = ref('');

const idcardfan = ref('/images/fanimage.png');

const idcardimagefan = ref('');

const idcardimagefanserver = ref('');

const idcardhand = ref('/images/handonImage.png');

const idcardimagehand = ref('');

const idcardimagehandserver = ref('');

const is_agree = ref(false);

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

const namestring = ref('');

const sexstring = ref('');

const phonestring = ref('');

const addressstring = ref('请选择');

const addressstitle = ref('请选择');

const detailAddre = ref('');

const workstring = ref('');

const workplace = ref('');

const gongZhongArray = ref([]);

const gongZhonmgArray = ref([]);

const curIndex = ref(0);

const worktypeOn = ref(false);

const typeString = ref('');

const gongzhongString = ref('');

const currentGongZhongArr = ref([]);

const zhanshiWorkType = ref('请选择');

const centerData = ref('');

const detailIDString = ref('');

const id = ref('');

const daitian = () => {
  uni.redirectTo({
      url: '/pages/service/work/wugongdengjidaitian'
    });
};

const tolist = () => {
  uni.navigateTo({
      url: '/pages/service/work/wugongdengjilist'
    });
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

const changename = (e) => {
  namestring.value = e.detail.value;
};

const changesex = (e) => {
  sexstring.value = e.detail.value;
};

const changephone = (e) => {
  phonestring.value = e.detail.value;
};

const detailAddress = (e) => {
  detailAddre.value = e.detail.value;
};

const hopeworkplace = (e) => {
  workplace.value = e.detail.value;
};

const chooseAddress = () => {
  // uni.navigateTo({
  //     url: '/pages/service/work/selectAddress'
  //   });
  uni.chooseLocation({
  			success: function (res) {
  					console.log('位置名称：' + res.name);
  					console.log('详细地址：' + res.address);
  					console.log('纬度：' + res.latitude);
  					console.log('经度：' + res.longitude);
  					addressstring.value = res.address;
  					addressstitle.value=res.name
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
};

const chooseWorktype = () => {
  hideSalaryTypeMenu();
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

const changeBox = (e) => {
  is_agree.value = Array.isArray(e.detail.value) && e.detail.value.includes('1');
};

const getserver = () => {
  uni.navigateTo({
      url: '/pages/service/HouseInformation/ProtocalDetail?type=' + '16'
    });
};

const radioChange = (evt) => {
  const currentValue = evt.detail.value;
    checkboxItems.value = checkboxItems.value.map(item => ({
      ...item,
      checked: item.value === currentValue
    }));
    havezhengshu.value = currentValue === '是';
    is_paperwork.value = havezhengshu.value ? '1' : '0';
    if (!havezhengshu.value) {
      previewArr.value = [];
      uploadBackFile.value = [];
      imageStr.value = '';
    }
};

const chooseClientPic = () => {
  chooseAndUploadImage('certificate');
};

const delReportPic = (index) => {
  previewArr.value.splice(index, 1);
    uploadBackFile.value.splice(index, 1);
    imageStr.value = uploadBackFile.value.join(',');
};

const incardZhengClick = () => {
  choosestatus.value = '1';
    chooseAndUploadImage('1');
};

const incardFanClick = () => {
  choosestatus.value = '2';
    chooseAndUploadImage('2');
};

const incardHandClick = () => {
  choosestatus.value = '3';
    chooseAndUploadImage('3');
};

const chooseAndUploadImage = (type) => {
  uni.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePath = res.tempFilePaths[0];
        uploadImage(tempFilePath, type);
      }
    });
};

const uploadImage = (tempFilePath, type) => {
  const token = storage.getToken();
    uni.showLoading({
      title: '上传中',
      mask: true
    });
    uni.uploadFile({
      url: BaseURL + 'AppWorkOrder/addUploadIms',
      filePath: tempFilePath,
      name: 'multipartFile',
      formData: {
        type: 'jpg'
      },
      header: token ? {
        Authorization: token
      } : {},
      success: uploadRes => {
        let result = {};
        try {
          result = JSON.parse(uploadRes.data || '{}');
        } catch (error) {
          uni.showToast({
            title: '上传返回异常',
            icon: 'none'
          });
          return;
        }
        const uploadUrl = result.data || result.url || '';
        if (uploadRes.statusCode === 200 && uploadUrl) {
          if (type === 'certificate') {
            previewArr.value = [tempFilePath];
            uploadBackFile.value = [uploadUrl];
            imageStr.value = uploadUrl;
          } else {
            setIdCardImage(type, tempFilePath, uploadUrl);
          }
          uni.showToast({
            title: '上传成功',
            icon: 'success'
          });
        } else {
          uni.showToast({
            title: result.msg || result.message || '上传失败',
            icon: 'none'
          });
        }
      },
      fail: error => {
        uni.showToast({
          title: error && error.errMsg ? error.errMsg : '上传失败',
          icon: 'none'
        });
      },
      complete: () => {
        uni.hideLoading();
      }
    });
};

const setIdCardImage = (type, previewUrl, uploadUrl) => {
  if (type === '1') {
      idcardimagezheng.value = previewUrl;
      idcardimagezhengserver.value = uploadUrl;
    } else if (type === '2') {
      idcardimagefan.value = previewUrl;
      idcardimagefanserver.value = uploadUrl;
    } else if (type === '3') {
      idcardimagehand.value = previewUrl;
      idcardimagehandserver.value = uploadUrl;
    }
};

const uploadAllData = () => {
  if (!namestring.value || !phonestring.value || !sexstring.value || !addressstring.value || !detailAddre.value || !salarytitle.value || !typeString.value || !zhanshiWorkType.value || !workplace.value || !idcardimagezhengserver.value || !idcardimagefanserver.value || !idcardimagehandserver.value) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 协议确认检查
    if (!is_agree.value) {
      uni.showToast({
        title: '请同意协议',
        icon: 'none'
      });
      return;
    }

    if (is_paperwork.value === '1' && !imageStr.value) {
      uni.showToast({
        title: '请上传劳务证书',
        icon: 'none'
      });
      return;
    }

    const data: Record<string, any> = {
      userId: storage.getUserId(),
      name: namestring.value,
      sex: sexstring.value,
      mobile: phonestring.value,
      address: addressstring.value,
      region_address: detailAddre.value,
      salary: salarytitle.value,
      work_kind: typeString.value,
      work: zhanshiWorkType.value,
      place: workplace.value,
      is_paperwork: is_paperwork.value,
      paperwork_path: imageStr.value,
      idcard_positive: idcardimagezhengserver.value,
      idcard_negative: idcardimagefanserver.value,
      idcard_hand: idcardimagehandserver.value,
      type: "1"
    };
    console.log(data);

    if (id.value) {
      data.id = id.value;
    }

    const submitRequest = id.value ? updateMyWorkerDayJobInfo : wugongdengjiSubmitInfo;
    submitRequest(data).then(res => {
      console.log(res);
      if (res.success) {
        uni.redirectTo({
          url: '/pages/service/work/wugongdengjilist'
        });
      } else {
        uni.showToast({
          title: res.msg || res.message || '提交失败',
          icon: 'none'
        });
      }
    }).catch(error => {
      console.error(id.value ? '更新零工登记失败:' : '提交零工登记失败:', error);
      uni.showToast({
        title: id.value ? '更新失败' : '提交失败',
        icon: 'none'
      });
    });

   
};

onLoad((e) => { 
  id.value = e.id;
  if (id.value) {
    getMyWorkerDayJobInfo({ id: id.value }).then(res => {
        console.log(res);
      if (res && res.result) {
        const data = res.result;
        namestring.value = data.name || '';
        sexstring.value = data.sex || '';
        phonestring.value = data.mobile || '';
        addressstring.value = data.address || '';
        detailAddre.value = data.region_address || '';
        salarytitle.value = data.salary || '';
        typeString.value = data.work_kind || '';
        zhanshiWorkType.value = data.work || '';
        workplace.value = data.place || '';
        is_paperwork.value = data.is_paperwork === '1' ? '1' : '0';
        havezhengshu.value = data.is_paperwork === '1';
        if(data.is_paperwork === '1'){
            checkboxItems.value[0].checked = true;
        }else{
            checkboxItems.value[1].checked = true;
        };
        imageStr.value = data.paperwork_path || '';
        previewArr.value = havezhengshu.value && imageStr.value ? [imageStr.value] : [];
        idcardimagezhengserver.value = data.idcard_positive || '';
              idcardimagezheng.value = data.idcard_positive || '';
        idcardimagefanserver.value = data.idcard_negative || '';
          idcardimagefan.value = data.idcard_negative || '';
        idcardimagehandserver.value = data.idcard_hand || '';
        idcardimagehand.value = data.idcard_hand || '';
      }
    });
  }
});

onMounted(() => {
  loadData();
});
</script>

<style>
/* 基础样式 */
.zuhunameView {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background-color: #fff;
}

.nameView {
    width: 180rpx;
    font-size: 28rpx;
    color: #333;
}

input {
    flex: 1;
    height: 80rpx;
    font-size: 28rpx;
}

.bottomLine2 {
    height: 2rpx;
    background-color: #f5f5f5;
    margin: 0 30rpx;
}

/* 地址选择 */
.address-text {
    flex: 1;
    color: #666;
    font-size: 28rpx;
}

.arrow-icon {
    width: 26rpx;
    height: 20rpx;
    margin-left: 20rpx;
}

/* 类型选择 */
.TypeView {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background-color: #fff;
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

.carTypeView {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background-color: #fff;
}

.carTypeView>view:first-child {
    width: 180rpx;
    font-size: 28rpx;
    color: #333;
}

.group {
    display: flex;
    align-items: center;
    margin-left: 20rpx;
}

.label-2 {
    display: flex;
    align-items: center;
}

.label-2+.label-2 {
    margin-left: 30rpx;
}

.label-2-text {
    margin-left: 10rpx;
    font-size: 26rpx;
    color: #666;
}

.certificate-upload-wrap {
    padding: 24rpx 30rpx;
    background-color: #fff;
}

.certificate-upload-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180rpx;
    height: 180rpx;
    border: 2rpx dashed #d8d8d8;
    border-radius: 8rpx;
    background-color: #fff;
}

.certificate-camera-icon {
    width: 68rpx;
    height: 52rpx;
    opacity: 0.45;
}

.certificate-preview-img {
    width: 180rpx;
    height: 180rpx;
    border-radius: 8rpx;
}

.pic-item-close {
    position: absolute;
    top: -16rpx;
    right: -16rpx;
    width: 36rpx;
    height: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
}

.pic-item-close image {
    width: 36rpx;
    height: 36rpx;
}

/* 身份证上传 */
.idcardTitleView {
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: #333;
    background-color: #fff;
}

.idcard-upload-list {
    padding: 20rpx 30rpx;
    background-color: #fff;
}

.idcard-upload-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200rpx;
    border: 2rpx dashed #ccc;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    background-color: #fafafa;
    box-sizing: border-box;
}

.camera-icon {
    width: 80rpx;
    height: 60rpx;
    opacity: 0.4;
}

.idcard-tip-text {
    font-size: 24rpx;
    color: #999;
    margin-top: 16rpx;
}

.idcard-preview-img {
    width: 100%;
    height: 200rpx;
    border-radius: 8rpx;
}

/* 协议 */
.agreement-container {
    padding: 30rpx;
    background-color: #fff;
}

.agreement-item {
    display: flex;
    align-items: center;
}

.agreement-text {
    font-size: 26rpx;
    color: #333;
}

.agreement-link {
    color: #2A9595;
    font-size: 26rpx;
}

.whiteView {
    height: 20rpx;
    background-color: #f7f7f7;
}

/* 按钮 */
.save-btn-top {
    margin: 30rpx;
    border-radius: 8rpx;
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

.modal-footer {
    display: flex;
    justify-content: center;
    padding: 0 30rpx 30rpx;
}

.modal-footer-single {
    padding-top: 10rpx;
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
