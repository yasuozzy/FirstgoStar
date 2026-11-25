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
		<view style="width: 100%;height: 10px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;">姓名</view>
				<view style="font-size: 13px;color: gray;margin-left: 10px;">{{dataDict.old_name}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;">年龄</view>
				<view style="font-size: 13px;color: gray;margin-left: 10px;">{{dataDict.old_age}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;">家庭住址</view>
				<view style="font-size: 13px;color: gray;margin-left: 10px;">{{dataDict.street_name}}{{dataDict.region_name}}{{dataDict.village_name}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;">详细地址</view>
				<view style="font-size: 13px;color: gray;margin-left: 10px;">{{dataDict.address}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;">联系电话</view>
				<view style="font-size: 13px;color: gray;margin-left: 10px;">{{dataDict.old_mobile}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;">服务时段</view>
				<view style="font-size: 13px;color: gray;margin-left: 10px;">{{dataDict.service_start_time}}-{{dataDict.service_end_time}}</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceSmartFeedGetSignInfo } from '@/api/service';

const bgColor = ref("#2A9595");
const idstring = ref('');
const dataDict = ref<any>({});

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	init();
});

const init = () => {
	try {
		let param = { id: idstring.value };
		serviceSmartFeedGetSignInfo(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

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
		 flex-direction: column;
		 width: 100%;
		 height: 40px;
	 }
    }
</style>