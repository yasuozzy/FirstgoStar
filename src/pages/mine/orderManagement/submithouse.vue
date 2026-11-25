<template>
    <view class="main">
        <u-navbar
          title="提交入住信息"
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
		  <template #right>
			  <view slot="right" @click="addpersonClick">
				  <view class="homestayView">添加入住人</view>
			  </view>
		  </template>
        </u-navbar>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">入住人1</view>
				<input class="searchlocation" placeholder="请填写" type="text" />
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 10px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系电话</view>
				<input class="searchlocation" placeholder="请填写" type="text" />
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 10px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">身份证号</view>
				<input class="searchlocation" placeholder="请填写" type="text" />
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 10px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="addPriceView" @click="changeHouse">提交</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	
    const goBack= () => {
            
		uni.navigateBack()
	};   
	//添加入住信息
	const addpersonClick = () => {
				
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
	 .formView{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
	 		 height: 55px;
	 }
	 .searchlocation{
	          margin-left: 20px;
	          width: 200px;
	          height: 30px;
	          font-size: 13px;
	 }
	 .addPriceView{
	 		 
	 		margin-top: 30px;
	 		background-color: #2A9595;
	 		border-radius: 5px;
	 		color: white;
	 		font-size: 14px;
	 		margin-left: 5%; 
	 		display: flex;
	 		justify-content: center; /* 水平居中 */
	 		align-items: center;     /* 垂直居中 */
	 		height: 40px;           /* 需要设置高度 */
	 		width: 90%;             /* 需要设置宽度 */
	 		margin-bottom: 10px;
	 }
    }
</style>