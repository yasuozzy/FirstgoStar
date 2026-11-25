<template>
    <view class="main">
        <u-navbar
          title="支付"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
		<template #left>
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
		</template>  
        </u-navbar>
		<!-- <web-view :src="payurl"></web-view> -->
		<div class="webpage-container">
		    
		    <!-- 带加载状态的iframe -->
		    <div class="iframe-wrapper">
		      <div v-if="loading" class="loading-mask">
		        <el-icon class="loading-icon"><Loading /></el-icon>
		        <span>网页加载中...</span>
		      </div>
		      <iframe
		        :src="payurl"
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
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const payurl = ref('');
            
	onLoad((options: any) => {
		if (options && options.url) {
			payurl.value = decodeURIComponent(options.url);
			console.log('[orderPayHtml] payurl:', payurl.value);
		}
	});
    const goBack= () => {
    		
    	uni.navigateBack()
    };
        
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
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