<template>
    <view class="main">
        <u-navbar
          title="我的足迹"
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
		<view style="width: 100%;display: flex;flex-direction: row;" @click="messageClick">
			<view style="margin-top: 10px;margin-left: 15px;width: 90%;font-size: 14px;">我的留言</view>
			<image style="margin-top: 15px;width: 8px;height: 12px;" src="/static/service/my_arrow.png"></image>
		</view>
		<view style="margin-top: 10px;width: 100%;background-color: lightgray;height: 1px;"></view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';

    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");

	const messageClick = () => {
		
		uni.navigateTo({
			url: '/pages/mine/Volunteer/myMessage'
		});
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
}
</style>