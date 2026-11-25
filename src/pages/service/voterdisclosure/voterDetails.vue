<template>
    <view class="main">
        <u-navbar
          title="详情"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<view class="formView">
			<view style="margin-left: 15px; margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">姓名</view>
			<view style="margin-top: 15px;font-size: 14px;height: 30px;">{{user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 15px;width: 80%;font-size: 14px;height: 30px;">选民照片(一寸照片)</view>
		</view>
		<view class="imagechooseView">
			<u-image
			:src="photo_path"
			width="80px"
			height="80px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">选民简介</view>
		</view>
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" v-model="introduction" disabled="true">
		</textarea>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const bgColor = ref("#2A9595");
const user_name = ref('');
const photo_path = ref('');
const introduction = ref('');

onLoad((options: any) => {
	user_name.value = options.user_name || '';
	introduction.value = options.introduction || '';
	photo_path.value = options.photo_path || '';
});

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
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
	 	 flex-direction: row;
	 	 width: 100%;
	 	 height: 40px;
	  }
	  .imagechooseView{
	  	margin-top: 10px;
	  	margin-left: 5%;
	  	width: 90%;
	  	height: 100px;
	  }
    }
</style>