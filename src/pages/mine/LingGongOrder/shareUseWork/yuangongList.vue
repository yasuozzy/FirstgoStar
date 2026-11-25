<template>
    <view class="main">
        <u-navbar
          title="员工"
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
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in userListArr" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<image style="margin-top: 18px;margin-left: 15px;width: 15px;height: 15px;" :src="choose_select"></image>
					<view style="width: 85%;margin-left: 5px;margin-top: 15px;font-size: 13px;">{{item.worker_name}}{{item.work_mobile}}</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const userListArr = ref([]);
	const choose_select = ref('/static/login/choose_select.png');
            
	onLoad((options:any) => {
		userListArr.value = JSON.parse(options.userListArr);
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