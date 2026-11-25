<template>
	<scroll-view style=" height: 100vh; overflow-y: auto;" scroll-y>
		<view style=" display: flex;flex-direction: column;">
			<u-navbar title="填写援助信息" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
				:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
				<template #left>
<view >
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
</template>
			</u-navbar>
			<u-gap height="10" bgColor="#f5f5f5"></u-gap>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">企业名称</view>
				<u-input placeholder="请输入内容" border="none" v-model="name"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">企业电话</view>
				<u-input placeholder="请输入内容" border="none" v-model="phone"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">企业地址</view>
				<u-input placeholder="请输入内容" border="none" v-model="address"></u-input>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">咨询类型</view>
				<picker @change="bindPickerChange" :value="index" :range="gongZhongArray" range-key="name"
					style="margin-right: 15px;">
					<view class="uni-input">
						{{ index >= 0 ? gongZhongArray[index].name : '请选择咨询类型' }}
					</view>
				</picker>
			</view>

			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view
					style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
				</view>
				<view> 基本事件概述与申请理由</view>
			</view>
			<u-textarea v-model="reason" placeholder="请输入内容" autoHeight
				style="margin-left: 12px;margin-right: 12px;border: 1px solid #d9d9d9; border-radius: 4px;"></u-textarea>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view
					style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
				</view>
				<view> 期望援助结果</view>
			</view>
			<u-textarea v-model="result" placeholder="请输入内容" autoHeight
				style="margin-left: 12px;margin-right: 12px;border: 1px solid #d9d9d9; border-radius: 4px;"></u-textarea>

			<!-- <view class="idcardTitleView">身份证书</view>
			<view class="bottomLine2"></view>
			<view class="certificate-upload-wrap">
				<view class="certificate-upload-card" @tap="chooseClientPic(1)">
					<block v-if="!previewArr1.length">
						<image class="certificate-camera-icon" src="/static/images/camera.png" mode="aspectFit" />
					</block>
					<image v-else class="certificate-preview-img" :src="BaseURL + previewArr1[0]" mode="aspectFill" />
					<view v-if="previewArr1.length" class="pic-item-close" @tap.stop="delReportPic(0)">
						<image src="/static/images/deleteimage.png" mode="aspectFit"></image>
					</view>
				</view>
			</view> -->
			<view class="idcardTitleView">证据材料</view>
			<view class="bottomLine2"></view>
			<view class="certificate-upload-wrap">
				<view class="certificate-upload-card" @tap="chooseClientPic(2)">
					<block v-if="!previewArr2.length">
						<image class="certificate-camera-icon" src="/static/images/camera.png" mode="aspectFit" />
					</block>
					<image v-else class="certificate-preview-img" :src="BaseURL + previewArr2[0]" mode="aspectFill" />
					<view v-if="previewArr2.length" class="pic-item-close" @tap.stop="delReportPic(0)">
						<image src="/static/images/deleteimage.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="idcardTitleView">其他材料</view>
			<view class="bottomLine2"></view>
			<view class="certificate-upload-wrap">
				<view class="certificate-upload-card" @tap="chooseClientPic(3)">
					<block v-if="!previewArr3.length">
						<image class="certificate-camera-icon" src="/static/images/camera.png" mode="aspectFit" />
					</block>
					<image v-else class="certificate-preview-img" :src="previewArr3[0]" mode="aspectFill" />
					<view v-if="previewArr3.length" class="pic-item-close" @tap.stop="delReportPic(0)">
						<image src="/static/images/deleteimage.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view>
				<checkbox value="cb" :checked="true" style="margin-left: 15px;" />阅读并同意<text
					style="color: #2a9598;">《用户协议》</text>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;justify-content: space-around;margin-top: 10px;">
				<view
					style="background-color: #2a9598;color: white;text-align: center;border-radius: 4px;padding: 5px 15px;"
					@click="commit(1)">免费援助申请
				</view>
				<view
					style="background-color: #2a9598;color: white;text-align: center;border-radius: 4px;padding: 5px 15px;"
					@click="commit(0)">委托服务申请
				</view>
			</view>

		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import { getPublicServiceKind, userSubmitAidApply } from '@/api/work';

import { storage, BaseURL } from '@/utils/storage';

import { onMounted, ref } from "vue";

const bgColor = ref('#007AFF');

const name = ref('');

const idCard = ref('');

const phone = ref('');

const address = ref('');

const zixunleixing = ref('');

const zixunleixingId = ref('');

const reason = ref('');

const result = ref('');

const gongZhongArray = ref([]);

const index = ref(-1);

const previewArr1 = ref([]);

const previewArr2 = ref([]);

const previewArr3 = ref([]);

const idcardimagezheng = ref<any>();

const idcardimagezhengserver = ref<any>();

const idcardimagefan = ref<any>();

const idcardimagefanserver = ref<any>();

const idcardimagehand = ref<any>();

const idcardimagehandserver = ref<any>();

const previewArr = ref<any>();

const uploadBackFile = ref<any>();

const imageStr = ref<any>();

const goBackLegacy1 = () => {
  uni.navigateBack();
};

const loadData = () => {
  getPublicServiceKind({}).then(res => {
      console.log(res);
      if (res && res.result && Array.isArray(res.result)) {
        gongZhongArray.value = res.result;
      }
    }).catch(error => {
      console.error('获取工种数据失败:', error);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const bindPickerChange = (e) => {
  const selectedIndex = e.detail.value;
    index.value = selectedIndex;

    // 获取选中的对象
    const selectedItem = gongZhongArray.value[selectedIndex];
    if (selectedItem) {
      zixunleixing.value = selectedItem.name;
      zixunleixingId.value = selectedItem.id;
      console.log('选中类型:', zixunleixing.value, 'ID:', zixunleixingId.value);
    }
};

const chooseClientPic = (type) => {
  chooseAndUploadImage(type);
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
          if (type === 1) {
            previewArr1.value = [uploadUrl];
          } else if (type === 2) {
            previewArr2.value = [uploadUrl];
          } else if (type === 3) {
            previewArr3.value = [uploadUrl];
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

const delReportPic = (index) => {
  previewArr.value.splice(index, 1);
    uploadBackFile.value.splice(index, 1);
    imageStr.value = uploadBackFile.value.join(',');
};

const commit = (isfree) => {
  let params = {
      userId: storage.getUserId(),
      name: name.value,
      // id_card: this.idCard,
      mobile: phone.value,
      address: address.value,
      ask_type: zixunleixing.value,
      // 提交ID
      description: reason.value,
      expect: result.value,
      is_free: isfree,
      type: 2,
      // 1代表个人申请

      // pic_path: this.previewArr1[0] || '',
      card_path: previewArr2.value[0] || ''
      // file_path: this.idcardimagefanserver || '',
      // file_name: this.idcardimagehandserver || '',
    };
    userSubmitAidApply(params).then(res => {
      console.log(res);
      if (res && res.result && Array.isArray(res.result)) {
        gongZhongArray.value = res.result;
      }
    }).catch(error => {
      console.error('获取工种数据失败:', error);
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

/* 身份证上传 */
.idcardTitleView {
	padding: 20rpx 30rpx;
	font-size: 28rpx;
	color: #333;
	background-color: #fff;
}

.bottomLine2 {
	height: 2rpx;
	background-color: #f5f5f5;
	margin: 0 30rpx;
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
</style>