<template>
    <view class="main">
        <u-navbar
          title="预定中"
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 18px;">{{title}}</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;background-color: aliceblue;margin-top: 10px;">
			<view style="font-size: 15px;margin-left: 15px;margin-top: 10px;width: 60%;">成人票</view>
			<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;" @click="minushouse">-</view>
			<view style="margin-top: 12px;color: black;font-size: 14px;margin-left: 10px;width: 40px;text-align: center;">{{housenumber}}</view>
			<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;margin-left: 15px;" @click="addhouse">+</view>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;height: 60px;background-color: aliceblue;">
			<view style="font-size: 12px;color: royalblue;margin-top: 10px;margin-left: 15px;">{{adultinfo1}}</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 5px;margin-left: 15px;">{{adultinfo2}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 280px;background-color: aliceblue;">
			
			<view style="font-size: 15px;margin-left: 15px;height: 40px;display: flex;align-items: center;">游客信息</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;color: royalblue;">游客1</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 60px;">游客姓名</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchlocation" placeholder="请输入游客1名字" type="text" />
			</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 60px;">联系电话</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchlocation" placeholder="请输入联系电话" type="text" />
			</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 10px;color: royalblue;">游客2</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 60px;">游客姓名</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchlocation" placeholder="请输入游客2名字" type="text" />
			</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 60px;">联系电话</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchlocation" placeholder="请输入联系电话" type="text" />
			</view>
		</view>
		<view class="protocalView">
		            <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		            <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		            <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">我已阅读并同意</view>
		            <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="protocalClick">《文旅群苑景点门票购买协议》</view>
		            
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 13px;margin-left: 15px;margin-top: 15px;color: black;width: 60px;" >在线支付:</view>
				<view style="color: blue;font-size: 15px;margin-top: 15px;width: 80px;">￥{{allmoney}}</view>
				<view class="order-button" @click="payClick">立即支付</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const title = ref('九宫山石龙峡+往返索道');
	const housenumber = ref(1);
	const adultinfo1  = ref('官方|随买随用|无需取票！');
	const adultinfo2 = ref('年龄59周岁以下，身高1.4米以上，须同时满足以上条件');
	const allmoney = ref('228');
    const selected = ref(false);        
       
    const goBack= () => {
                    
        uni.navigateBack()
    };
	//减少间数
	const minushouse = () => {
		if (housenumber.value === 0) {
			return;
		} else{
			housenumber.value --;
		}
	};
	const addhouse = () =>{
				
		housenumber.value ++;
	};
	//去付钱
	const payClick = () => {
				
		uni.navigateTo({
			url:'/pages/home/payBookingHouse'
		})
		
	};
	//协议
	const protocalClick = () => {
		uni.navigateTo({
			url:'/pages/home/hotelProtocal'
		})
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
	 .inputView{
	 	 display: flex;
	 	 flex-direction: row;
	 	 width: 100%;
	 	 height: 40px;
	  }
	  .searchlocation{
	           margin-left: 20px;
	           width: 260px;
	           height: 25px;
	           margin-top: 10px;
	           border: 1px lightgray solid;
	           border-radius: 5px;
	           font-size: 13px;
	 }
	 .protocalView{
	          display: flex;
	          flex-direction: row;
	          width: 100%;
	 		 height: 50px;
	 }
	 .footer-container {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   right: 0;
	   height: 50px;
	   background-color: white;
	   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	   z-index: 100;
	   color: white;
	   display: flex;
	   justify-content: center; /* 水平居中 */
	   align-items: center;     /* 垂直居中 */
	   
	 }
	 .order-button {
	 			 
	 	display: flex;
	 	justify-content: center; /* 水平居中 */
	 	align-items: center;     /* 垂直居中 */
	 	height: 25px;           /* 需要设置高度 */
	 	width: 80px;
	 	margin-right: 10px;
	 	font-size: 13px;
	 	color: white;
	 	background-color: blue;
	 	border-radius: 6px;
	 	margin-left: 120px;
	 	margin-top: 10px;
	 }
    }
</style>