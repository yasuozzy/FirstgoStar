<template>
    <view class="main">
        <u-navbar
          title="审核"
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
		<view style="display: flex;width: 100%;height: 70px;justify-content: center;align-items: center;">
			<image style="width: 50px;height: 50px;margin-top: 10px;" :src="timeClock"></image>
		</view>
		<view style="margin-top: 20px;width: 100%;display: flex;justify-content: center;align-items: center;text-align: center;font-size: 14px;">公司资料审核中</view>
		<view style="margin-top: 20px;width: 100%;display: flex;justify-content: center;align-items: center;text-align: center;font-size: 14px;">请耐心等待并关注审核情况</view>
		<view class="sureButton" @click="sureClick">确定</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const timeClock = ref('/static/mine/timeClock.png');
	
	const sureClick = () => {
		
		uni.navigateBack()
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
		  .sureButton{
			  margin-top: 40px;
			  margin-left: 4%;
			  width: 92%;
			  height: 35px;
			  background-color: #2A9595;
			  border-radius: 5px;
			  color: white;
			  font-size: 14px;
			  justify-content: center;
			  align-items: center;
		  }
}
</style>