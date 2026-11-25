<template>
	<view>
		<u-navbar title="协议管理" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;">
			<template #left>
<view class="u-nav-slot" >
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			</view>
</template>
		</u-navbar>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 律师事务所</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">名称</view>
			<view>{{ detail.office_name }}</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">地址</view>
			<view>{{ detail.office_address }}</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">联系电话</view>
			<view>{{ detail.office_mobile }}</view>
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 申请人/企业信息</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业名称</view>
			<view>{{ detail.apply_name }}</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业地址</view>
			<view>{{ detail.apply_address }}</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业联系电话</view>
			<view>{{ detail.apply_mobile }}</view>
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 服务事项及费用</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业名称</view>
			<view>{{ detail.service_type }}</view>
		</view>
		<view v-if="detail.service_fee" class="zuhunameView">
			<view class="nameView">服务费用</view>
			<view>{{ detail.service_fee }}</view>
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 用工单位签名</view>
		</view>
		<image style="width: 180rpx;height: 180rpx;border-radius: 8rpx;margin-left: 15px;" :src="detail.office_sign_pic"
			mode="aspectFill" />
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 用工单位签名</view>
		</view>
		<image style="width: 180rpx;height: 180rpx;border-radius: 8rpx;margin-left: 15px;" :src="detail.user_sign_pic"
			mode="aspectFill" />
		<view class="agreement-container">
			<checkbox-group @change="changeBox" class="agreement-group">
				<label class="agreement-item">
					<!-- <checkbox value="1" color="#fe0000" class="radio1" /> -->
					<text class="agreement-text">已阅读并同意</text>
					<text class="agreement-link" @tap="getserver">《平台委托发布劳务登记协议》</text>
				</label>
			</checkbox-group>
		</view>

		<view class="whiteView"></view>
		<view v-if="type == 1">
			<button type="primary" v-if="!detail.user_sign_pic" class="save-btn-top" @tap="uploadAllData">签字</button>
		</view>

	</view>
</template>

<script setup lang="ts">
import { getLegalAgreementInfo, paidAgreementUserSign, freeAgreementUserSign } from '@/api/work';

import { storage, BaseURL, BaseImgURL as baseImgURLValue } from '@/utils/storage';

import { eventBus } from "@/utiles/eventBus.js";

import { onBeforeUnmount, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const detail = ref({});

const ispay = ref(0);

const sign = ref(false);

const signPic = ref("");

const type = ref("");

const BaseImgURL = ref(baseImgURLValue);

const id = ref("");

const handleUpdateData = (data) => {
  console.log("接收到回传的数据:", data);
    if (data) {
      sign.value = true;
      signPic.value = data[0];
      console.log(signPic.value);
      uploadAllData();
      // this.detail.user_sign_pic = BaseImgURL+this.signPic;
    }
    ;
};

const getData = (id, isPay, type) => {
  getLegalAgreementInfo({
      id: id
    }).then(res => {
      console.log("获取协议详情成功", res);
      detail.value = res.result;
    }).catch(err => {
      console.log("获取协议详情失败", err);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const getserver = () => {
  uni.navigateTo({
      url: '/pages/service/HouseInformation/ProtocalDetail?type=' + '22'
    });
};

const uploadAllData = () => {
  if (!sign.value) {
      uni.navigateTo({
        url: "/pages/mine/SignPage/SignPage"
      });
      return;
    }
    if (ispay.value === 0) {
      paidAgreementUserSign({
        id: id.value,
        user_sign_pic: signPic.value,
        userName: storage.getUserName(),
        mobile: storage.getPhone(),
        osName: "android",
        hostNo: storage.getHostNo()
      }).then(res => {
        console.log("获取协议详情成功", res);
        getData(id.value, ispay.value, type.value);
      }).catch(err => {
        console.log("获取协议详情失败", err);
      });
    } else {
      freeAgreementUserSign({
        id: id.value,
        user_sign_pic: signPic.value
      }).then(res => {
        console.log("获取协议详情成功", res);
        getData(id.value, ispay.value, type.value);
      }).catch(err => {
        console.log("获取协议详情失败", err);
      });
    }
};

onMounted(() => {
  eventBus.$on("sign_netimg", handleUpdateData);
});

onBeforeUnmount(() => {
  eventBus.$off("sign_netimg", handleUpdateData);
});

onLoad((e) => {
  ispay.value = e.isPay;
    type.value = e.type;
    id.value = e.id;
    getData(e.id, e.isPay, e.type);
});
</script>

<style lang="scss" scoped>
.zuhunameView {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #fff;
}

.nameView {
	margin-right: 15px;
}

input {
	flex: 1;
	height: 80rpx;
	font-size: 28rpx;
}

.save-btn-top {
	margin: 30rpx;
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
</style>
