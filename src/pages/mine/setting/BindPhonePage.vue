<template>
	<view>
		<u-navbar title="绑定手机号" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view slot="left" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>
		<view v-if="step==='first'">
			<view style="font-size: 15px; margin: 20px 20px">已绑定手机号</view>
			<view style="font-size: 30px; margin: 20px 20px">{{userPhone}}</view>
			<view style="text-align: center; padding-top: 50px">
				<image style="width: 80px; height: 80px" src="@/static/mine/userphone.png"></image>
				<view style="
          margin-top: 20px;
          padding: 0px 15px;
          font-size: 14px;
          color: #666;
        ">绑定手机号是您身份的重要凭证，当账号发生异常时，将会通过手机号第一时间通知您，请谨慎操作！</view>
				<view @click="getcode" style="
          width: 90%;
          margin-left: 5%;
          margin-top: 20px;
          background-color: #2A9595;
          text-align: center;
          color: white;
          padding: 10px 0px;
          border-radius: 5px;
        ">更换手机号</view>
			</view>
		</view>

		<view v-if="step==='second'" style="padding-top: 50px">
			<view style="font-size: 18px; margin: 20px 20px">请输入短信验证码</view>
			<view style="font-size: 13px; margin: 10px 20px">我们已将验证码发到：{{userPhone}}</view>
			<u-code-input style="margin-left: 20px" maxlength="4" v-model="phonecode1" mode="line"></u-code-input>

			<view style="
          width: 90%;
          margin-left: 5%;
          margin-top: 20px;
          background-color: #2A9595;
          text-align: center;
          color: white;
          padding: 10px 0px;
          border-radius: 5px;
        ">下一步</view>
		</view>

		<view v-if="step==='third'">
			<view style="margin-bottom: 50px;margin-left: 15px;">更换新手机</view>
			<view>
				<input placeholder="请输入新手机号码" :model="newphone" password="true" style="
			    border-bottom: 1px solid #eee;
			    margin: 20px 20px;
			    padding: 10px 0;
			  " />
			</view>
			<view
				style="display: flex; flex-direction: row;border-bottom: 1px solid #eee; margin: 20px 20px;height: 30px;">
				<input placeholder="请输入验证码" :model="phonecode2" password="true" style="height: 30px; flex: 1;" />
				<view style="height: 30px;font-size: 14px;color: #2a9598;" @click="getcodsecond">获取验证码</view>
			</view>
			<view @click="resetphone" style="
			  width: 90%;
			  margin-left: 5%;
			  margin-top: 20px;
			  background-color: #2A9595;
			  text-align: center;
			  color: white;
			  padding: 10px 0px;
			  border-radius: 5px;
			">完成</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		BindPhonegetCode,
		ChangePhone
	} from "@/api/mine";
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	
		const bgColor = ref("#2A9595");
		const step = ref('first');
		const value2 = ref('');
		const userPhone = ref('');
		const newphone = ref('');
		const phonecode1 = ref('');
		const phonecode2 = ref('');
			
		onMounted(() => {
			
			userPhone.value = getStorage(storageKeys.phone,'');
		});
		
		const goBack = () => {
		  uni.navigateBack();
		};
		const getcode = async() => {
			
			try {
				const res = await BindPhonegetCode({
					type: "4",
					phone: getStorage(storageKeys.phone,''),
				});
				console.log(res);
				step.value = "first";
				
			} catch (error) {
				//TODO handle the exception
				console.log(error);
			}
				
		};
		const getcodsecond = async() => {
			
			try {
				
				const res = await BindPhonegetCode({
					type: "5",
					phone: newphone.value,
				});
				console.log(res);
				step.value = "second"
				
				
			} catch (error) {
				//TODO handle the exception
			}
				
		};
		const resetphone = async() => {
			
			try {
				const res = await BindPhonegetCode({
					newCode: phonecode1.value,
					oldCode: phonecode2.value,
					oldMobile: getStorage(storageKeys.phone,''),
					newMobile: newphone.value,
				});
				console.log(res);
				step.value = "third"
				
			} catch (error) {
				//TODO handle the exception
			}
				
		};
		
</script>

<style></style>