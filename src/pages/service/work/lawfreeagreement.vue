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
			<input placeholder="请输入" type="text" v-model="lawname" />
		</view>
		<view class="zuhunameView">
			<view class="nameView">地址</view>
			<input placeholder="请输入" type="text" v-model="lawlocation" />
		</view>
		<view class="zuhunameView">
			<view class="nameView">联系电话</view>
			<input placeholder="请输入" type="text" v-model="lawphone" />
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 申请人/企业信息</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业名称</view>
			<input placeholder="请输入" type="text" v-model="personname" />
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业地址</view>
			<input placeholder="请输入" type="text" v-model="personlocation" />
		</view>
		<view class="zuhunameView">
			<view class="nameView">申请人/企业联系电话</view>
			<input placeholder="请输入" type="text" v-model="personphone" />
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 服务事项及费用</view>
		</view>
		<view class="zuhunameView" @click="showServiceTypePicker">
			<view class="nameView">申请人/企业名称</view>
			<view style="flex: 1;height: 80rpx;font-size: 28rpx; line-height: 80rpx;">{{ selecttype || '请选择' }}</view>
			<u-icon name="arrow-right" size="14" color="#999"></u-icon>

		</view>
		<u-picker :show="showPicker" :columns="serviceTypeOptions" key-name="name" @confirm="onServiceTypeConfirm"
			@cancel="showPicker = false" @close="showPicker = false"></u-picker>
		<view class="zuhunameView" v-if="is_free == 0">
			<view class="nameView">服务费用</view>
			<input placeholder="请输入" type="text" v-model="money" />
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 用工单位签名</view>
		</view>
		<image style="width: 180rpx;height: 180rpx;border-radius: 8rpx;"
			:src="signpic ? (BaseImgURL + signpic) : '/static/mine/selectphoto.png'" mode="aspectFill"
			@click="chooseSignPic" />
		<view class="agreement-container">
			<checkbox-group @change="changeBox" class="agreement-group">
				<label class="agreement-item">
					<checkbox value="1" color="#fe0000" class="radio1" />
					<text class="agreement-text">已阅读并同意</text>
					<text class="agreement-link" @click="getserver">《平台委托发布劳务登记协议》</text>
				</label>
			</checkbox-group>
		</view>

		<view class="whiteView"></view>
		<button type="primary" class="save-btn-top" @tap="uploadAllData">提交</button>
	</view>
</template>

<script setup lang="ts">
import { getAgreementServiceKind, sendAgreement } from '@/api/work.ts';

import { storage, BaseImgURL as baseImgURLValue } from '@/utils/storage';

import { eventBus } from "@/utiles/eventBus.js";

import { onBeforeUnmount, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#2A9595');

const selecttypeLegacy1 = ref('');

const signpic = ref('');

const lawname = ref('');

const lawlocation = ref('');

const lawphone = ref('');

const personname = ref('');

const personlocation = ref('');

const personphone = ref('');

const money = ref('');

const is_agree = ref(false);

const serviceTypeOptions = ref([
				{ name: '法律咨询', value: '1' },
				{ name: '文书代写', value: '2' },
				{ name: '诉讼代理', value: '3' },
				{ name: '合同审查', value: '4' },
				{ name: '劳动仲裁', value: '5' },
				{ name: '其他服务', value: '6' }
			]);

const selecttype = ref('');

const selectTypeId = ref('');

const showPicker = ref(false);

const is_free = ref(0);

const BaseImgURL = ref(baseImgURLValue);

const sign = ref<any>();

const getdata = () => {
  let param = {
      userId: storage.getUserId()
    };
    getAgreementServiceKind(param).then(res => {
      if (res.resultCode === 200 && res.success) {
        console.log(res);
        serviceTypeOptions.value = res.data;
      }
    });
};

const showServiceTypePicker = () => {
  showPicker.value = true;
};

const onServiceTypeConfirm = (e) => {
  const selected = e.value[0];
    selecttype.value = selected.name;
    selectTypeId.value = selected.value;
    showPicker.value = false;
};

const goBack = () => {
  uni.navigateBack();
};

const changeBox = (e) => {
  is_agree.value = Array.isArray(e.detail.value) && e.detail.value.includes('1');
};

const getserver = () => {
  uni.navigateTo({
      url: '/pages/service/HouseInformation/ProtocalDetail?type=' + '22'
    });
};

const chooseSignPic = () => {
  uni.navigateTo({
      url: "/pages/mine/SignPage/SignPage"
    });
};

const handleUpdateData = (data) => {
  console.log("接收到回传的数据:", data);
    if (data) {
      signpic.value = data[0];
      sign.value = true;
      console.log(sign.value + ":::" + signpic.value);
    }
};

const uploadAllData = () => {
  if (!is_agree.value) {
      uni.showToast({
        title: '请先阅读并同意协议',
        icon: 'none'
      });
      return;
    }
    if (!signpic.value) {
      uni.showToast({
        title: '请先签名',
        icon: 'none'
      });
      uni.navigateTo({
        url: "/pages/mine/SignPage/SignPage"
      });
      return;
    }
    if (!lawname.value || !lawlocation.value || !lawphone.value || !personname.value || !personlocation.value || !personphone.value) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    if (is_free.value == 0 && !money.value) {
      uni.showToast({
        title: '请填写服务费用',
        icon: 'none'
      });
      return;
    }
    let param = {
      userId: storage.getUserId(),
      office_name: lawname.value,
      office_address: lawlocation.value,
      office_mobile: lawphone.value,
      apply_name: personname.value,
      apply_address: personlocation.value,
      apply_mobile: personphone.value,
      service_type: selectTypeId.value,
      service_fee: money.value,
      is_free: is_free.value,
      office_sign_pic: signpic.value
    };
    sendAgreement(param).then(res => {
      console.log(res);
      if (res.success) {
        uni.showToast({
          title: '提交成功',
          icon: 'none'
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      }
    });
};

onLoad((e) => {
  is_free.value = e.isfree;
    console.log(is_free.value);
    getdata();
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
	padding: 1rpx 30rpx;
	background-color: #fff;
}

.nameView {
	margin-right: 20px;
	font-size: 28rpx;
	color: black;
}

input {
	flex: 1;
	height: 60rpx;
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
