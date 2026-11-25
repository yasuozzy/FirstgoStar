<template>
    <view class="main">
        <u-navbar
          title="实名认证"
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
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: dimgray;">姓名</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">张明</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: dimgray;">证件类型</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60%;font-size: 14px;">{{choosetitle}}</view>
			<u-image style="margin-left: 20px;margin-top: 12px;"
			  :src="downimage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: dimgray;">证件号码</view>
			<input class="searchlocation" placeholder="填写证件号" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="buttonView" @click="sentClick">提交</view>
</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const choosetitle = ref('选择');
	const downimage = ref('/static/home/downImage.png');

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	//提交
	const sentClick = () => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/sentHouseInfo'
		});
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
	 .searchlocation{
	          margin-left: 15px;
	          width: 200px;
	          height: 20px;
	          font-size: 14px;
			  margin-top: 10px;
	}
	.buttonView{
	             
	    margin-top: 400px;
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
		margin-bottom: 20px;
	}
	
    }
</style>