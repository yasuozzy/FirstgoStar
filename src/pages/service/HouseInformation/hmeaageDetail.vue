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
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">状态</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房产</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.house_complete_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋编号</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.houser_num}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">租房人</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">联系方式</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.user_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view v-if="dataDict.style != 1" style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">交房人</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.landlord_name}}</view>
		</view>
		<view v-if="dataDict.style != 1" style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">联系方式</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.landlord_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">建筑面积</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.built_area}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋押金</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.deposit}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">缴费时间</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.deposit_pay_time}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="buttonView">下载打印</view>
		
</view>
</template>

<script setup lang="ts">
	import { serviceBuyShopMineRentHouseDetail } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	
	const applyId = ref('');
	const dataDict = ref<any>({});

	const init = () => {
		try {
			let param = {
				applyId: applyId.value,
			};
			serviceBuyShopMineRentHouseDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
			});
		} catch (error) {
			console.log(error);
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		applyId.value = options.applyId || '';
		init();
	});
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
	 .buttonView{
	               
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
	 }
    }
</style>