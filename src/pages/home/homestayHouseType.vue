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
		<view class="headerView">
			<view style="margin-top: 10px;margin-left: 10px;font-size: 18px;">{{title}}</view>
			<view class="approval_list">
				<view class="politic_item" v-for="(item,index) in specsList" :key="index">
					<u-image style="margin-top: 3px;"
					:src="item.icon"
					width="15px"
					height="15px"
					></u-image>
					<view style="display: flex;flex-direction: column;">
						<view style="margin-top: 2px;margin-left: 5px;font-size: 11px;">{{item.title}}</view>
						<view style="margin-left: 5px;font-size: 9px;color: gray;">{{item.type}}</view>
					</view>
					
				</view>
			</view>
			<view style="margin-top: 10px;margin-left: 5%;width: 90%;height: 40px;border: 1px lightgray solid;border-radius: 5px;display: flex;flex-direction: row;">
				<view style="font-size: 13px;width: 25%;align-items: center;text-align: center;background-color: aliceblue;display: flex;justify-content: center;">卧室</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="font-size: 13px;margin-top: 10px;width: 25%;align-items: center;text-align: center;">大床</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="font-size: 13px;margin-top: 10px;width: 25%;align-items: center;text-align: center;">2x1.8米</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="font-size: 13px;margin-top: 10px;width: 25%;align-items: center;text-align: center;">1张</view>
				
			</view>
		</view>
		<view class="midleView">
			<view style="margin-left: 10px;margin-top: 10px;font-size: 15px;">服务设施</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 100px;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 40px;">服务</view>
				<view class="service_list">
					<view class="service_item" v-for="(item,index) in serviceList" :key="index">
						<u-image style="margin-top: 5px;"
						:src="item.icon"
						width="11px"
						height="11px"
						></u-image>
						<view style="margin-left: 5px;font-size: 11px;color: gray;">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 100px;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 40px;">基础</view>
				<view class="service_list">
					<view class="service_item" v-for="(item,index) in baseList" :key="index">
						<u-image style="margin-top: 5px;"
						:src="item.icon"
						width="11px"
						height="11px"
						></u-image>
						<view style="margin-left: 5px;font-size: 11px;color: gray;">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 30px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 100px;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 40px;">卫浴</view>
				<view class="service_list">
					<view class="service_item" v-for="(item,index) in showerList" :key="index">
						<u-image style="margin-top: 5px;"
						:src="item.icon"
						width="11px"
						height="11px"
						></u-image>
						<view style="margin-left: 5px;font-size: 11px;color: gray;">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 100px;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 40px;">厨房</view>
				<view class="service_list">
					<view class="service_item" v-for="(item,index) in kitchenList" :key="index">
						<u-image style="margin-top: 5px;"
						:src="item.icon"
						width="11px"
						height="11px"
						></u-image>
						<view style="margin-left: 5px;font-size: 11px;color: gray;">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 30px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 100px;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 40px;">休闲</view>
				<view class="service_list">
					<view class="service_item" v-for="(item,index) in xiuxianList" :key="index">
						<u-image style="margin-top: 5px;"
						:src="item.icon"
						width="11px"
						height="11px"
						></u-image>
						<view style="margin-left: 5px;font-size: 11px;color: gray;">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 10px;"></view>
		</view>
		<view class="notesView">
			<view style="margin-left: 10px;margin-top: 10px;font-size: 15px;">预订须知</view>
			<view style="font-size: 9px;color: lightgray;margin-left: 10px;">以下规则由房东制定，请仔细阅读并遵守</view>
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">入离</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: dimgray;">14:00-24:00入住，12：00前退房</view>
			</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">发票</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: dimgray;">发票由民宿经营者（房东）提供</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">确认</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: green;">立即确认</view>
			</view>
			<view style="font-size: 12px;margin-top: 10px;margin-left: 45px;color: gray;">下单即有房，无需等待确认</view>
			<view style="margin-left: 3%;width: 94%;background-color: aliceblue;height: 1px;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">退订</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: green;">02月14日18：00前可免费取消</view>
			</view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 45px;">{{cancelreason}}</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 100px;">
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 40px;">要求</view>
				<view class="service_list">
					<view class="yaoqiu_item" v-for="(item,index) in yaoqiuList" :key="index">
						<u-image style="margin-top: 5px;"
						:src="item.icon"
						width="11px"
						height="11px"
						></u-image>
						<view style="margin-left: 5px;font-size: 11px;color: gray;">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="endView">
			<view style="margin-left: 10px;margin-top: 10px;font-size: 15px;">费用须知</view>
			<view style="font-size: 9px;color: lightgray;margin-left: 10px;">以下规则由房东制定，请仔细阅读并遵守</view>
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;width: 40px;">押金</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: dimgray;width: 300px;">￥20，下单后入住前通过平台支付，离店后原路退还，无纠纷不扣押</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;width: 40px;">加人</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: dimgray;width: 300px;">标准入住2人，不可加人</view>
			</view>
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
	const title = ref('独立单间28㎡独卫');
	const specsList = ref([
		{icon:"/static/home/swiper.png",title:"客栈·10㎡",type:'整套房屋'},
		{icon:"/static/home/swiper.png",title:"1卧室·1卫",type:''},
		{icon:"/static/home/swiper.png",title:"1床·可住2人",type:''},
		{icon:"/static/home/swiper.png",title:"2份早餐",type:''},
		
	]);
	const serviceList = ref([
		{icon:"/static/home/swiper.png",title:"免费停车位"},
		{icon:"/static/home/swiper.png",title:"行李寄存"},
		{icon:"/static/home/swiper.png",title:"前台接待"},
		{icon:"/static/home/swiper.png",title:"床品1客1换"},
		{icon:"/static/home/swiper.png",title:"提供餐饮"},
		{icon:"/static/home/swiper.png",title:"提供早餐"},
		{icon:"/static/home/swiper.png",title:"团建会议"},
	]);
	const baseList = ref([
		{icon:"/static/home/swiper.png",title:"无线网络"},
		{icon:"/static/home/swiper.png",title:"电梯"},
		{icon:"/static/home/swiper.png",title:"窗户"},
		{icon:"/static/home/swiper.png",title:"空调-仅制冷"},
		{icon:"/static/home/swiper.png",title:"暖气"},
		{icon:"/static/home/swiper.png",title:"晾衣架"},
		{icon:"/static/home/swiper.png",title:"电热水壶"},
		{icon:"/static/home/swiper.png",title:"沙发"},
		{icon:"/static/home/swiper.png",title:"电视"},
		{icon:"/static/home/swiper.png",title:"冰箱"},
		{icon:"/static/home/swiper.png",title:"洗衣机"},
		{icon:"/static/home/swiper.png",title:"免费桶装水"},
	]);
	const showerList = ref([
		{icon:"/static/home/swiper.png",title:"热水"},
		{icon:"/static/home/swiper.png",title:"独立卫浴"},
		{icon:"/static/home/swiper.png",title:"电吹风"},
		{icon:"/static/home/swiper.png",title:"洗浴用品"},
		{icon:"/static/home/swiper.png",title:"牙膏"},
		{icon:"/static/home/swiper.png",title:"浴巾"},
		{icon:"/static/home/swiper.png",title:"毛巾"},
	]);
	const kitchenList = ref([
		{icon:"/static/home/swiper.png",title:"微波炉"},
		{icon:"/static/home/swiper.png",title:"餐具"},
		{icon:"/static/home/swiper.png",title:"刀具菜板"},
		{icon:"/static/home/swiper.png",title:"烹饪锅具"},
		{icon:"/static/home/swiper.png",title:"电磁炉"},
		{icon:"/static/home/swiper.png",title:"燃气灶"},
		{icon:"/static/home/swiper.png",title:"洗涤用品"},
		{icon:"/static/home/swiper.png",title:"烤箱"},
		{icon:"/static/home/swiper.png",title:"烧烤器具"},
		{icon:"/static/home/swiper.png",title:"餐桌"},
		
	]);
	const xiuxianList = ref([
		{icon:"/static/home/swiper.png",title:"观景露台"},

	]);
	const cancelreason = ref('过时取消订单将扣除全部房费(订单需等商家确认后生效，订单确认结果以公众号、短信或app通知为准，如订单不确认将全额退款至您的付款账号)');
	const yaoqiuList = ref([
		{icon:"/static/home/swiper.png",title:"接待婴儿"},
		{icon:"/static/home/swiper.png",title:"接待儿童"},
		{icon:"/static/home/swiper.png",title:"接待老人"},
		{icon:"/static/home/swiper.png",title:"接待外宾"},
		{icon:"/static/home/swiper.png",title:"带宠物"},
		{icon:"/static/home/swiper.png",title:"吸烟"},
		{icon:"/static/home/swiper.png",title:"做饭"},
		{icon:"/static/home/swiper.png",title:"聚会"},
		{icon:"/static/home/swiper.png",title:"商业拍摄"},
		
		
	]);
	const chooseHouse = ref('2间1晚');
	const allmoney = ref('288');
            
	const goBack= () => {
			
		uni.navigateBack()
	};
       
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
        width: 100%;
          background: aliceblue;
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
	 .headerView{
		 display: flex;
		 flex-direction: column;
		 width: 92%;
		 margin-left: 4%;
		 background-color: white;
		 border-radius: 6px;
		 height: 180px;
		 margin-top: 10px;
	 }
	 .approval_list{
	 	  display: flex;
	 	  background-color: white;
			margin-left: 7%;
	 	  width: 86%;
	 	  flex-wrap: wrap; /* 允许换行 */
	 	  margin-top: 10px;
	 }
	 .politic_item{
	 	  display: flex;
	 	  flex-direction: row;
	 	  box-sizing: border-box;
	 	  width: 50%;
	 	  height: 20px;
		  margin-top: 10px;
	 	  
	 }
	 .midleView{
		 display: flex;
		 flex-direction: column;
		 width: 92%;
		 margin-left: 4%;
		 background-color: white;
		 border-radius: 6px;
		 height: 540px;
		 margin-top: 10px;
	 }
	 .service_list{
		 display: flex;
		 background-color: white;
		 width: 100%;
		 flex-wrap: wrap; /* 允许换行 */
		 
	 }
	 .service_item{
		 
		 display: flex;
		 flex-direction: row;
		 box-sizing: border-box;
		 width: 30%;
		 height: 20px;
		 margin-top: 10px;
		 margin-left: 5px;
	 }
	 .notesView{
		 display: flex;
		 flex-direction: column;
		 width: 92%;
		 margin-left: 4%;
		 background-color: white;
		 border-radius: 6px;
		 height: 450px;
		 margin-top: 10px;
	 }
	 .yaoqiu_item{
		 display: flex;
		 flex-direction: row;
		 box-sizing: border-box;
		 width: 48%;
		 height: 20px;
		 margin-top: 10px;
		 margin-left: 5px;
	 }
	 .endView{
		 display: flex;
		 flex-direction: column;
		 width: 92%;
		 margin-left: 4%;
		 background-color: white;
		 border-radius: 6px;
		 height: 200px;
		 margin-top: 10px;
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