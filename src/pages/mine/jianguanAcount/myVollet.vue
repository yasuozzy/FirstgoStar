<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="我的钱包"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
			<template #left>
				<view slot="left" >
					<view class="flex">
						<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
					</view>
				</view>
			</template>
			<view slot="right"></view>
		</u-navbar>
		<div class="webpage-container">
		    
		    <!-- 带加载状态的iframe -->
		    <div class="iframe-wrapper">
		      <div v-if="loading" class="loading-mask">
		        <el-icon class="loading-icon"><Loading /></el-icon>
		        <span>网页加载中...</span>
		      </div>
		      <iframe
		        :src="service_url"
		        @load="onIframeLoad"
		        @error="onIframeError"
		        class="web-frame"
		        frameborder="0"
		      ></iframe>
		    </div>
		</div>
	</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted } from 'vue';
	import {mineVollet} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	// 背景颜色
	const bgColor = ref('#2A9595');
	const service_url = ref('');
			
	// onLoad((options) => {
		
	// 	service_url.value = decodeURIComponent(options.url);
	// 	console.log(service_url.value);
	// });
	onMounted(() => {
		loadData();
	});
	const loadData = async() => {
		//我的钱包
		try {
			let param = {
				mobile:getStorage(storageKeys.phone,''),
				hostNo:getStorage(storageKeys.hostNo,''),
				userType:getStorage(storageKeys.cstType,'')
			};
			
			const res = await mineVollet(param);
			console.log(res);
			service_url.value = res.result;
			// uni.navigateTo({
			// 	url:`/pages/mine/jianguanAcount/myVollet?url=${encodeURIComponent(volletUrl.value)}` 
			// })
			
		} catch (error) {
			console.log(error)
		}
	};
	const goBack = () => {
		uni.navigateBack()
	};	
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		
		background: #ffffff;
		.flex{
			display: flex;
		}
		.webpage-container {
		  width: 100%;
		  height: 100vh;
		  
		}
		
		.web-frame {
		  width: 100%;
		  height: 600px;
		  border: 1px solid #dcdfe6;
		  border-radius: 4px;
		}
		
		.iframe-wrapper {
		  position: relative;
		  width: 100%;
		  height: 600px;
		}

	}
</style>