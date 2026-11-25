<template>
    <view class="main">
        <u-navbar
          title="明细预览"
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
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">姓名</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 14px;width: 80%;text-align: right;">{{name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">电话</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 14px;width: 80%;text-align: right;">{{phone}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">科目</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 14px;width: 80%;text-align: right;">{{subject}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">款项金额</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 14px;width: 73%;text-align: right;">{{money}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const name = ref('王敏');
	const phone = ref('15689288001');
	const subject = ref('土地返祖款');
	const money = ref('6000.00');
				
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