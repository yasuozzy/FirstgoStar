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
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">名称</view>
			<input placeholder="请输入" type="text" v-model="office_name" />
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">地址</view>
			<input placeholder="请输入" type="text" v-model="office_address" />
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">联系电话</view>
			<input placeholder="请输入" type="text" v-model="office_mobile" />
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 申请人/企业信息</view>
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业名称</view>
			<input placeholder="请输入" type="text" v-model="apply_name" />
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业地址</view>
			<input placeholder="请输入" type="text" v-model="apply_address" />
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业联系电话</view>
			<input placeholder="请输入" type="text" v-model="apply_mobile" />
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view class="zuhunameView">
			<view class="nameView">咨询类型</view>
			<view>{{ atype }}</view>
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 服务事项</view>
		</view>
		<u-textarea v-model="value1" placeholder="请输入内容"
			style="border: 1px solid #f5f5f5 ; border-radius: 5px;height: 80px;margin-left: 15px;margin-right: 15px;"></u-textarea>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 处理结果</view>
		</view>
		<u-line color="#d9d9d9" height="1"></u-line>
		<u-textarea v-model="value2" placeholder="请输入内容"
			style="border: 1px solid #f5f5f5 ; border-radius: 5px;height: 80px;margin-left: 15px;margin-right: 15px;"></u-textarea>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 律师事务所签名</view>
		</view>
		<image style="width: 180rpx;height: 180rpx;border-radius: 8rpx;margin-left: 15px;"
			:src="detail.office_sign_pic || BaseImgURL + signPic" mode="aspectFill" />

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

		<button type="primary" class="save-btn-top" @tap="uploadAllData" :disabled="!agreed"
			:style="{ backgroundColor: agreed ? '#2a9598' : '#ccc' }">
			{{ sign && signPic ? '提交反馈' : '去签字' }}
		</button>
	</view>
</template>

<script setup lang="ts">
import { finishApply } from '@/api/work';

import { storage, BaseURL, BaseImgURL as baseImgURLValue } from '@/utils/storage';

import { eventBus } from "@/utiles/eventBus.js";

import { onBeforeUnmount, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const detail = ref({});

const id = ref("");

const ispay = ref(0);

const sign = ref(false);

const signPic = ref("");

const office_name = ref("");

const office_address = ref("");

const office_mobile = ref("");

const apply_name = ref("");

const apply_address = ref("");

const apply_mobile = ref("");

const atype = ref("");

const value1 = ref("");

const value2 = ref("");

const BaseImgURL = ref(baseImgURLValue);

const agreed = ref(false);

const type = ref<any>();

const changeBox = (e) => {
  // e.detail.value 是一个数组，如果包含 '1' 则表示选中
    agreed.value = e.detail.value.length > 0;
};

const handleUpdateData = (data) => {
  console.log("接收到回传的数据:", data);
    if (data) {
      signPic.value = data[0];
      sign.value = true;
      console.log(signPic.value);
      // this.detail.user_sign_pic = BaseImgURL+this.signPic;
    }
    ;
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
    }
    finishApply({
      id: id.value,
      office_name: office_name.value,
      office_address: office_address.value,
      office_mobile: office_mobile.value,
      apply_name: apply_name.value,
      apply_address: apply_address.value,
      apply_mobile: apply_mobile.value,
      service_content: value1.value,
      result: value2.value,
      sign_pic: signPic.value
    }).then(res => {
      uni.navigateBack();
      console.log("获取协议详情成功", res);
      detail.value = res.result;
    }).catch(err => {
      console.log("获取协议详情失败", err);
    });
};

onLoad((e) => {
  id.value = e.id;
    type.value = e.type;
});

onMounted(() => {
  eventBus.$on("sign_netimg", handleUpdateData);
});

onBeforeUnmount(() => {
  eventBus.$off("sign_netimg", handleUpdateData);
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
