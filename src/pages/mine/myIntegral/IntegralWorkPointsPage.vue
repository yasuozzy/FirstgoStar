<template>
    <view class="main">
        <u-navbar
          title="积分/工分"
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
		<view style="background-color: white">
		  <uni-segmented-control
		    :current="current"
		    :values="items"
		    :style-type="styleType"
		    :activeColor="activeColor"
		    :inActiveColor="inActiveColor"
		    @clickItem="onClickItem"
		  />
		</view>
		<view style="margin-top: 5px;" class="content">
		  <view v-if="current === 0"><myIntegralPage /></view>
		  <view v-if="current === 1"><myWorkPointPage /></view>
		  <view v-if="current === 2"><linggongGongFen /></view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import myIntegralPage from "./myIntegralPage.vue";
	import myWorkPointPage from "./myWorkPointPage.vue";
	import linggongGongFen from "./linggongGongFen.vue";
    import { ref, reactive } from 'vue';
	// 响应式数据（原 data 中的属性）
	const bgColor = ref('#2A9595');
	const current = ref(0);
	const show = ref(false);
	const items = ref(['我的积分', '我的工分', '零工工分']);
	const styleType = ref('text');
	const activeColor = ref('#2A9595');
	const inActiveColor = ref('');
   
  
	const goBack = () => {
		
		uni.navigateBack()
	};
	const onClickItem = (e:any) =>  {
	  if (this.current !== e.currentIndex) {
		this.current = e.currentIndex;
	  }
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