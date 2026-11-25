<template>
  <view class="container">
    <!-- ============ 区域一 ============ -->
    <u-navbar
      title=""
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
	  <template #right>
		  <view slot="right" @click="toHistory" style="color: white">
			历史记录
		  </view>
	  </template>
    </u-navbar>

    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        @clickItem="onClickItem"
      />
    </view>
    <view class="content">
      <view v-if="current === 0"><kuanxiang /></view>
      <view v-if="current === 1"><kuaiji /></view>
    </view>

    <!-- ============ 区域二 ============ -->
  </view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive } from 'vue';
	import kuanxiang from "./kuanXiangShenQing.vue";
	import kuaiji from "./kuaiJiShenPi.vue";

  
    // 背景颜色
    const bgColor = ref("#2A9595");
    const show = ref(false);
    const items = ref(["款项申请", "会计审批"]);
    const styleType = ref("text");
    const current = ref(0);
	const goBack= () => {
		  
		uni.navigateBack()
	};
    
    const toHistory = () => {
      if (current.value == 0) {
        uni.navigateTo({
          url: "/pages/mine/LoanApplyPage/LoanApplyHistoryPage",
        });
      } else {
        uni.navigateTo({
          url: "/pages/mine/LoanApplyPage/KuaijiApplyHistoryPage",
        });
      }
    };
    const onClickItem = (e:any) => {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
      }
    };

    /* ======================= 辅助方法项 ======================== */
  
</script>
<style lang="scss" scoped></style>
