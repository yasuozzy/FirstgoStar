<template>
    <view class="main">
        <u-navbar
          title="建议汇总"
          
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
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in suggestList" :key="index">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.name}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.content}}</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const suggestList = ref([]);
	onLoad((options:any) => {
		
		suggestList.value = JSON.parse(options.suggestList);
		console.log(suggestList.value);
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
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
		  }
}
</style>