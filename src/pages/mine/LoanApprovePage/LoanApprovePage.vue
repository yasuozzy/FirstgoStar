<template>
  <view class="content">
    <!-- uView Tabs 组件 -->
    <u-navbar
      title="款项审批"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
		<view class="u-nav-slot" slot="left">
		  <view class="flex">
			  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		  </view>
		</view>
	  </template>
	</u-navbar>
    <view style="">
      <u-tabs
        style="
          position: fixed;
          top: 64px;
          z-index: 1000;
          height: 40px;
          width: 100%;
        "
        :list="tabList"
        :current="currentTab"
        @click="clickTab"
        :scrollable="false"
        active-color="#007aff"
        inactive-color="#606266"
      ></u-tabs>
    </view>
    <swiper
      style="margin-top: 40px;"
      :current="currentTab"
      @change="onSwiperChange"
       :style="{ height: swiperHeight + 'px' }"
    >
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <FragPage
          :message="parentData"
          :postid="index"
          @message="receiveMessage"
        ></FragPage>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import FragPage from "@/pages/mine/LoanApprovePage/fragpage.vue";


      const bgColor = ref("#007AFF");
      const parentData = ref("Hello from Parent");
      const id = ref("11111111");
      const tabList = ref([{ name: "待我审批" }, { name: "我已审批" }, { name: "抄送我的" }]); // u-tabs 需要数组对象
      const currentTab = ref(0);
      const swiperHeight = ref(500);
    
	  onLoad(() => {
			uni.getSystemInfo({
			  success: (res) => {
				swiperHeight.value = res.windowHeight - 104; // 减去 Tabs 高度
				console.log("height", swiperHeight);
			  },
			});
		});
  
  
    const changeTab = (index:any) => {
      currentTab.value = index;
    };
    const clickTab = (item:any) => {
      console.log("item", item);
      currentTab.value = item.index;
    };
    const onSwiperChange = (e:any) => {
      currentTab.value = e.detail.current;
    };
    const receiveMessage = (message:any) => {
      console.log("Received message:", message);
      parentData.value = message;
    };
    const goBack= () => {
            
		uni.navigateBack()
	};
</script>

<style scoped></style>
