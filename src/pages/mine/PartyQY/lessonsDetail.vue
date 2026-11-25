<template>
    <view class="main">
        <u-navbar
          :title="title"
          
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
		<view style="margin-top: 10px;width: 100%;font-size: 16px;text-align: center;">{{dataDict.title}}</view>
		<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 4%;width: 92%;">
			<view style="font-size: 12px;color: darkgray;">{{dataDict.publisher}}</view>
			<view style="font-size: 12px;color: darkgray;margin-left: 15px;">{{dataDict.releaseTime}}</view>
		</view>
		<view style="margin-left: 4%;width: 92%;margin-top: 10px;">
			<div v-html="dataDict.content"></div>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineJoinPartyClassMoreArticleDetail} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const title = ref('');
	const articleId = ref('');
	const dataDict  = ref({});
          
	onLoad((options:any) => {
		
		title.value = options.title;
		articleId.value = options.id;
	});
	onMounted(() => {
	  loadData();
	});
    
    const loadData =async() => {
            	
		try {
			
			let param = {
				
				articleId:articleId.value,
				userId:getStorage(storageKeys.userId,''),
			};
			const res = await MineJoinPartyClassMoreArticleDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
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
    }
</style>