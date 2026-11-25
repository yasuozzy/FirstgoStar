<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view style="margin-top: 10px;width: 100%;font-size: 16px;text-align: center;">{{datadict.title}}</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 4%;width: 92%;">
			<view style="font-size: 12px;color: darkgray;">{{datadict.publisher}}</view>
			<view style="font-size: 12px;color: darkgray;margin-left: 15px;">{{datadict.releaseTime}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;margin-top: 10px;">
			<div v-html="datadict.content"></div>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MinePartyPublicMyStudyDetail} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const datadict = ref({});
	const idstring = ref('');
            
	onLoad((options:any) => {
		
		idstring.value = decodeURIComponent(options.articleId);
	});
	onMounted(() => {
	  init();
	});
        
    const init = async() => {
				
		try {
			
			let param = {
				userId:storage.getUserId(),
				articleId:idstring.value,
			};
			const res = await MinePartyPublicMyStudyDetail(param);
				
			console.log(res);
			datadict.value = res.result;
			console.log(datadict.value);
				
			
		} catch (error) {
			console.log(error)
		}
	};
	const goBack = () => {
		
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
    }
</style>