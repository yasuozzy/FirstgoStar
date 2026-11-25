<template>
	<view>
		<u-navbar title="修改密码" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view slot="left" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>
		<view v-if="step==='first'" class="container">
			<view style="font-size: 20px; margin: 20px 20px">验证原密码</view>

			<input placeholder="请输入原密码" password="true" :model="oldpsd" style="
          border-bottom: 1px solid #eee;
          margin: 20px 20px;
          padding: 10px 0;
        " />
			<view @click="vertifypsd" style="
          width: 90%;
          margin-left: 5%;
          background-color: #2A9595;
          text-align: center;
          color: white;
          padding: 10px 0px;
          border-radius: 5px;
        ">下一步</view>
		</view>
		<view v-if="step==='second'" class="container">
			<view style="font-size: 20px; margin: 20px 20px">更换新密码</view>
			<input placeholder="请输入新密码" :model="newpsd" password="true" style="
          border-bottom: 1px solid #eee;
          margin: 20px 20px;
          padding: 10px 0;
        " />
			<input placeholder="再次输入新密码" :model="newpsdagain" password="true" style="
          border-bottom: 1px solid #eee;
          margin: 20px 20px;
          padding: 10px 0;
        " />
			<view @click="resetpsd" style="
          width: 90%;
          margin-left: 5%;
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
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {
		vertifyPwd,
		resetPwd
	} from "@/api/mine";


	
	
	const bgColor = ref("#2A9595");
	
	const password = ref('');
	const newpsdagain= ref('');
	const newpsd= ref('');
	const oldpsd= ref('');
	const step = ref<string | number>('first');
			
	const goBack = () => {
		uni.navigateBack();
	};
	const vertifypsd = async() => {
		
		try{
			let param = {
				oldpassword: oldpsd.value,
			};
			const res = await vertifyPwd(param)
			console.log(res);
			step.value = "second";
			
		}catch(error){
			
			console.log(error);
		}
		
	};
	const resetpsd = async() => {
		try{
			let param = {
				newpassword: newpsd.value,
				oldpassword: oldpsd.value
			};
			const res = await resetPwd(param);
			console.log(res);
			step.value = "second";
			
		}catch(error){
			
			console.log(error);
		}
	};
		
</script>

<style></style>