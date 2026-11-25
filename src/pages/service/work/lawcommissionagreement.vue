<template>
	<view>
		<u-navbar title="协议管理" :safeAreaInsetTop="true" :placeholder="true" :fixed="true"
			:border="false" :bgColor="bgColor" titleStyle="color: #fff;">
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
		<view class="zuhunameView">
			<view class="nameView">申请人/企业名称</view>
			<view style="flex: 1;height: 80rpx;font-size: 28rpx;">{{ selecttype || 请选择 }}</view>
			<view>▼</view>
		</view>
		<view class="zuhunameView">
			<view class="nameView">服务费用</view>
			<input placeholder="请输入" type="text" v-model="money" />
		</view>
		<view style="display: flex;flex-direction: row;padding-top: 4px;padding-bottom: 4px;">
			<view
				style="margin-left: 12px;margin-right: 5px; width: 6px;height: 13px;background-color: #2a9598;margin-top: 5px;">
			</view>
			<view> 用工单位签名</view>
		</view>
		<image style="width: 180rpx;height: 180rpx;border-radius: 8rpx;" :src="previewArr[0]" mode="aspectFill" />
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

		<button type="primary" class="save-btn-top" @tap="uploadAllData">提交</button> 
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bgColor = ref("#2A9595");

const selecttype = ref('');

const signpic = ref('');

const lawname = ref('');

const lawlocation = ref('');

const lawphone = ref('');

const personname = ref('');

const personlocation = ref('');

const personphone = ref('');

const money = ref('');

const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.zuhunameView {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #fff;
}

.nameView {
	width: 210rpx;
	font-size: 28rpx;
	color: #333;
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
