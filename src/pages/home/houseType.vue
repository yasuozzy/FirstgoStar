<template>
    <view class="main">
        <u-navbar
          title="房型详情"
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
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" height="160"></u-swiper>
		</view>
		<view style="margin-top: 10px;font-size: 15px;margin-left: 15px;">{{house}}</view>
		<view class="specsView">
			<view class="specs_item" v-for="(item,index) in specsList">
				<u-avatar 
				  :src="item.icon"
				  number="30px"
				  
				></u-avatar>
				<view style="font-size: 11px;color: dimgray;width: 100%;text-align: center;margin-top: 5px;">{{item.title}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 13px;margin-left: 5px;">2张单人床1.1米</view>
		</view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 35px;width: 100%;">成人加床：该房型不可加床</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 13px;margin-left: 5px;">无早餐</view>
		</view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 35px;width: 100%;">成人加早餐：中式固定餐￥10每份</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">洗浴用品</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in securityList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">客房布局和家具</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in toolsList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">网络与通讯</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in networkList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">卫浴设施</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in showerList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">室外景观</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in viewsList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">客房设施</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in mainroomList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">媒体科技</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in tecknoligyList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">食品饮品</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in foodList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">便利设施</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in easyList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;margin-top: 20px;background-color: lightgray;"></view>
		<view style="font-size: 16px;margin-top: 10px;margin-left: 15px;width: 100%;">政策与服务</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;color: royalblue;">入住当天18：00前可以取消</view>
		</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">年龄</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">费用</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;">2月14日18：00前</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: royalblue;align-items: center;text-align: center;display: flex; justify-content: center;">免费</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 0 0 6px 0;">2月14日18：00后</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 0 6px 0;">不可取消</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;color: royalblue;">立即确认</view>
		</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">预定此房型后可快速确认订单</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">闪住</view>
			<view style="font-size: 14px;color: royalblue;">·先住后付</view>
		</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">此房型有机会享受先住后付，下单免支付，离店后扣款；到点免押金，离店免查房，是否可使用请以下单填写页为准</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;color: royalblue;">酒店开票(可预约)</view>
		</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">订单页预约|仅普票|前台领取</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;color: royalblue;">在线付</view>
		</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">房费需提前支付，可使用银行卡、支付宝、微信等进行付款</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;color: royalblue;">儿童及加床</view>
		</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">该房型欢迎携带儿童居住</view>
		<view style="font-size: 14px;margin-left: 35px;color: royalblue;">婴儿床及加床政策</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">该房型不提供加床、不提供加婴儿床</view>
		<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">超过入住人数时，可能涉及额外费用，收费规则如下</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">年龄</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center; ">床铺</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">费用</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 0 0 6px 0;">17岁及以下</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center; ">使用现有床铺</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: royalblue;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 0 6px 0;">免费</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-left: 20px;">儿童早餐</view>
		</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">年龄</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">费用</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;">3岁及以下</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: royalblue;align-items: center;text-align: center;display: flex; justify-content: center;">免费</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;">4-12岁</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;align-items: center;text-align: center;display: flex; justify-content: center;">￥5/人</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 0 0 6px 0;">13-17岁</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 0 6px 0;">￥10/人</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 11px;margin-left: 150px;margin-top: 17px;color: black;width: 60px;text-align: right;">{{chooseHouse}}</view>
				<view style="color: blue;font-size: 15px;margin-top: 15px;width: 80px;">￥{{allmoney}}</view>
				<view class="order-button">订购</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	// 轮播图列表
	const swiperList = ref([
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	]);
	const house = ref('阳光双床房');
	const specsList = ref([
		{icon:"/static/home/swiper.png",title:"18㎡"},
		{icon:"/static/home/swiper.png",title:"3-5层"},
		{icon:"/static/home/swiper.png",title:"WiFi免费"},
		{icon:"/static/home/swiper.png",title:"有窗"},
		{icon:"/static/home/swiper.png",title:"可吸烟"},
		
	]);
	const image = ref("/static/home/homestay.png");
	const securityList = ref([
					  {icon:"/static/home/homestay.png",name:"牙刷"},
					  {icon:"/static/home/homestay.png",name:"牙膏"},
					  {icon:"/static/home/homestay.png",name:"沐浴露"},
					  {icon:"/static/home/homestay.png",name:"洗发水"},
					  {icon:"/static/home/homestay.png",name:"香皂"},
					  
					  
	]);
	const toolsList = ref([{icon:"/static/home/homestay.png",name:"书桌"},]);
	const networkList = ref([
		{icon:"/static/home/homestay.png",name:"客房WiFi"},
		{icon:"/static/home/homestay.png",name:"电话"},
	]);
	const showerList = ref([
					  {icon:"/static/home/homestay.png",name:"私人浴室"},
					  {icon:"/static/home/homestay.png",name:"私人卫生间"},
					  {icon:"/static/home/homestay.png",name:"吹风机"},
					  {icon:"/static/home/homestay.png",name:"24小时热水"},
					  {icon:"/static/home/homestay.png",name:"拖鞋"},
					  
					  
	]);
	const viewsList = ref([{icon:"/static/home/homestay.png",name:"山景"},]);
	const mainroomList = ref([
					  {icon:"/static/home/homestay.png",name:"空调"},
					  {icon:"/static/home/homestay.png",name:"暖气"},
					  {icon:"/static/home/homestay.png",name:"手动窗帘"},
					  {icon:"/static/home/homestay.png",name:"遮光窗帘"},
					  {icon:"/static/home/homestay.png",name:"床具：毯子或被子"},
					  {icon:"/static/home/homestay.png",name:"备用床具"},
					  
	]);
	const tecknoligyList = ref([
		{icon:"/static/home/homestay.png",name:"液晶电视机"},
		{icon:"/static/home/homestay.png",name:"有线频道"},
	]);
	const foodList = ref([{icon:"/static/home/homestay.png",name:"电热水壶"},]);
	const easyList = ref([
		{icon:"/static/home/homestay.png",name:"多种规格电源插座"},
		{icon:"/static/home/homestay.png",name:"22V电压插座"},
	]);
	const chooseHouse = ref('2间1晚');
	const allmoney = ref('288');
            
        
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
		 .specsView{
		 	width: 100%;
		 	height: 50px;
		 	display: flex;
		 	margin-top: 20px;
		 	flex-direction: row;
		 	align-items: center;
		 	.specs_item{
		 		align-items: center;
		 		display: flex;
		 		margin-left: 2%;
		 		flex-direction: column;
		 		width: 17.66%;
		 		height: 50px;
		 	}
		 }
		 .approval_list{
		 	  display: flex;
		 	  background-color: white;
		 		  margin-left: 7%;
		 	  width: 86%;
		 	  flex-wrap: wrap; /* 允许换行 */
		 	  margin-top: 5px;
		 }
		 .politic_item{
		 	  display: flex;
		 	  flex-direction: row;
		 	  box-sizing: border-box;
		 	  width: 50%;
		 	  height: 20px;
		 	  
		 }
		 .headerV{
		 		 display: flex;
		 		 flex-direction: row;
		 			 margin-left: 5%;
		 		 width: 90%;
		 		 height: 25px;
		 		 margin-top: 10px;
		 }
		 .contentView{
		 		 display: flex;
		 		 flex-direction: row;
		 		 margin-left: 5%;
		 		 width: 90%;
		 		 height: 25px;
		 		 
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
		 	margin-left: 15px;
		 	margin-top: 10px;
		 }
	  
    }
</style>