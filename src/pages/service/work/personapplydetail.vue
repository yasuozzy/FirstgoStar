<template>
	<scroll-view style=" height: 100vh; overflow-y: auto;" scroll-y>
		<view style=" display: flex;flex-direction: column;">
			<u-navbar title="申请详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
				:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
				<template #left>
<view >
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
</template>
			</u-navbar>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view
					style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
				</view>
				<view> 律师事务所</view>
			</view>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">名称</view>
				<view>{{ detail.office_name }}</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">地址</view>
				<view>{{ detail.office_address }}</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>

			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">联系电话</view>
				<view>{{ detail.office_mobile }}</view>
			</view>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view
					style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
				</view>
				<view> 申请人/企业信息</view>
			</view>
			<u-gap height="10" bgColor="#f5f5f5"></u-gap>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">申请人/企业名称：</view>
				<view>{{ detail.apply_name }}</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">申请人/企业地址：</view>
				<view>{{ detail.apply_address }}</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>

			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">申请人/企业电话：</view>
				<view>{{ detail.apply_mobile }}</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view style="margin-left: 12px;margin-right: 25px;">咨询类型：</view>
				<view>{{ detail.ask_type }}</view>
			</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view
					style="margin-left: 1px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
				</view>
				<view> 服务事项</view>
			</view>
			<view style="width: 90%;margin-left: 10px;height: 100px;border:  1px solid #d9d9d9; border-radius: 5px;">
					{{ detail.description }}
				</view>
			<u-line color="#d9d9d9" height="1"></u-line>
			<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
				<view> 处理结果</view>
			</view>
			<view style="width: 90%;margin-left: 10px;height: 100px;border:  1px solid #d9d9d9; border-radius: 5px;">
				{{ detail.result }}</view>

			<view >律所签字</view>
			<view class="bottomLine2"></view>
			<image v-if="detail.sign_pic" :src="detail.sign_pic" mode="widthFix"
				style="width: 200px; height: auto; margin: 20px;"></image>
			<view>
				阅读并同意<text @click="todetail" style="color: #2a9598;">《平台委托申请法律援助协议》</text>
			</view>

		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import { getLegalApplyInfo } from '@/api/work';

import { storage, BaseURL } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#007AFF');

const id = ref('');

const detail = ref({});

const type = ref<any>();

const isUser = ref<any>();

const index = ref<any>();

const gongZhongArray = ref<any>();

const zixunleixing = ref<any>();

const zixunleixingId = ref<any>();

const previewArr1 = ref<any>();

const previewArr2 = ref<any>();

const previewArr3 = ref<any>();

const idcardimagezheng = ref<any>();

const idcardimagezhengserver = ref<any>();

const idcardimagefan = ref<any>();

const idcardimagefanserver = ref<any>();

const idcardimagehand = ref<any>();

const idcardimagehandserver = ref<any>();

const previewArr = ref<any>();

const uploadBackFile = ref<any>();

const imageStr = ref<any>();

const name = ref<any>();

const idCard = ref<any>();

const phone = ref<any>();

const address = ref<any>();

const reason = ref<any>();

const result = ref<any>();

const todetail = () => {
  uni.navigateTo({
      url: '/pages/service/HouseInformation/ProtocalDetail?type=' + '21'
    });
};

const goBackLegacy1 = () => {
  uni.navigateBack();
};

const loadData = () => {
  getLegalApplyInfo({
      id: id.value
    }).then(res => {
      console.log(res);
      detail.value = res.result;
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
      id_card: idCard.value,
      mobile: phone.value,
      address: address.value,
      ask_type: zixunleixing.value,
      // 提交ID
      description: reason.value,
      expect: result.value,
      is_free: isfree,
      type: 1,
      // 1代表个人申请

      pic_path: previewArr1.value[0] || '',
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

});

onLoad((options) => {
  id.value = options.id;
    type.value = options.type;
    isUser.value = options.isUser === 'true';
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