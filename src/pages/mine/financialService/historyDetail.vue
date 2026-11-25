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
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;height: 30px;font-size: 12px;">款项名称:{{title}}</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;height: 30px;font-size: 12px;">款项金额:{{money}}</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;height: 30px;font-size: 12px;">收款方:{{address}}</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const title = ref('土地租金');
	const address = ref('山东省潍坊市昌邑市都昌街道渔埠');
	const money = ref('5');
     
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