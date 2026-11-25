<template>
    <view class="main">
        <u-navbar
          title="退房信息"
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
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px;">订单编号：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: dimgray;">{{orderNumber}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">入住时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: dimgray;">{{intime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">离开时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: dimgray;">{{outtime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">房型：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: dimgray;">{{housetype}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">房号：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: dimgray;">{{housenumber}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
					<view style="font-size: 13px;margin-top: 10px;width: 80px">已交房款：</view>
					<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: dimgray;">{{money}}</view>
				</view>
				
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-left: 15px;margin-top: 10px;">
				<view style="font-size: 13px;margin-top: 7px;width: 100px">填写退房原因：</view>
				<input class="searchlocation" placeholder="请填写退房原因" type="text" />
			</view>
			
		</view>
		<view style="margin-left: 3%;width: 94%;margin-top: 10px;background-color: lightgray;height: 1px;"></view>
		<view class="addPriceView" @click="tongzhiClick">通知商家退房</view>
		<u-modal :show="show" @confirm="confirm" :title="title" >
			<view style="width: 100%;font-size: 14px;text-align: center;">{{content}}</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const orderNumber = ref('202578954125632');
	const status = ref('已取消');
	const paystatus = ref('未支付');
	const intime = ref('2025-07-26');
	const outtime = ref('2025-07-30');
	const housetype = ref('大床房');
	const housenumber = ref('0010');
	const money = ref('85');
	const show = ref(false);
	const title = ref('提示');
	const content = ref('通知商家成功');
           
    const goBack= () => {
            
		uni.navigateBack()
	};    
	const tongzhiClick = () => {
		show.value = true;
	};
	const confirm = () => {
		show.value = false;
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
			  border: lightgray 1px solid;
	 }
	 .addPriceView{
	 		 
	 		margin-top: 20px;
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