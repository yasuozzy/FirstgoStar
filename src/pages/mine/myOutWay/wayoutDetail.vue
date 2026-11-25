<template>
    <view class="main">
        <u-navbar
          title="订单信息"
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
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 50%;">{{type}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 40%;color: #2A9595;text-align: right;">{{status}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;font-size: 20px;height: 50px;display: flex;flex-direction: row;">
			<u-avatar style="margin-top: 10px;margin-left: 15px;"
			  :src="image"
			  number="30px"
			  
			></u-avatar>
			<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 70%;">
				<view style="font-size: 11px;background-color: yellow;color: black;width: 60px;height: 20px;border-radius: 5px;display: flex;align-items: center;justify-content: center;">{{name}}</view>
				<view style="font-size: 11px;color: gray;">{{address}}</view>
			</view>
			<u-image style="margin-left: 20px;margin-top: 20px;"
			  :src="image"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-left: 15px;margin-top: 10px;"
			  :src="timeicon"
			  width="15px"
			  height="15px"
			></u-image>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{time}}</view>
			
		</view>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-left: 15px;margin-top: 10px;"
			  :src="personicon"
			  width="15px"
			  height="15px"
			></u-image>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{personNum}}人</view>
		</view>
		<view style="width: 100%;height: 200px; display: flex;flex-direction: row;">
			<view style="display: flex;flex-direction: column;width: 20px;height: 100px;">
				<view style="margin-top: 10px;margin-left: 20px;width: 5px;height: 5px;border-radius: 2px;background-color: royalblue;"></view>
				<view style="width: 1px;margin-left: 22px;height: 80px;background-color: dimgray;"></view>
				<view style="margin-left: 20px;width: 5px;height: 5px;border-radius: 2px;background-color: orangered;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 300px;height: 100px;margin-left: 10px;">
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{startLocation}}</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;color: #2A9595;">{{startDetail}}</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{endLocation}}</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;color: #2A9595;">{{endDetail}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('拼车');
	const status = ref('待接单');
	const image = ref("/static/home/homestay.png");
	const name = ref('鲁G T9430');
	const address = ref('王师傅');
	const timeicon = ref('/static/home/homestay.png');
	const time = ref('3月20日 12:00-14:00');
	const personicon = ref('/static/home/homestay.png');
	const personNum = ref('2');
	const startLocation = ref('昌邑 花海贸易广场');
	const startDetail = ref('北门路南站牌处');
	const endLocation = ref('潍坊 华海大厦');
	const endDetail = ref('惠贤路依维柯南门');
            
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