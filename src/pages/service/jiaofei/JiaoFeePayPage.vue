<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="缴费"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
			<template #left>
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			</template>
			<template #right></template>
		</u-navbar>
		<div class="webpage-container">
		    <!-- 带加载状态的iframe -->
		    <div class="iframe-wrapper">
		      <div v-if="loading" class="loading-mask">
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
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const bgColor = ref("#2A9595");
const service_url = ref('');
const loading = ref(false);

onLoad((options: any) => {
	service_url.value = options.url || '';
	console.log(service_url.value);
});

const goBack = () => {
	uni.navigateBack();
};

const onIframeLoad = () => {
	loading.value = false;
};

const onIframeError = () => {
	loading.value = false;
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