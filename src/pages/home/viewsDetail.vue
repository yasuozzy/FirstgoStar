<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    title="详情"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
			<template #left>
			  <view class="u-nav-slot" slot="left">
			    <view class="flex">
			        <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
			    </view>
			  </view>
			</template>
			<template #right>
				<view slot="right" @click="homestayClick">
						<view class="homestayView" @click="weatherClick()">景区天气</view>
				</view>
			</template>
		</u-navbar>
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<view class="goodsHeaderView">
			<view class="fijinview">九宫阿山</view>
			<view class="moreview" @click="moreviewClick">简介/攻略</view>
		</view>
		<view class="specsView">
			<view style="font-size: 13px;width: 33.33%;text-align: left;margin-left: 15px;">满意度:5.0分</view>
			<view style="font-size: 13px;width: 33.33%;text-align: center;">游客点评:666条点评</view>
			<view style="font-size: 13px;width: 33%;text-align: center;">距离您1.0千米</view>
		</view>
		<view class="opentime">
			<view style="font-size: 13px;color: blue;width: 12%;margin-left: 15px;">开园中</view>
			<view style="font-size: 13px;color: black;width: 68%;">8:30---17:30开放</view>
			<view style="font-size: 13px;color: blue;width: 20%;" @click="makePhoneCall">咨询购票</view>
		</view>
		<view class="locationV">
			<view style="font-size: 13px;color: black;width: 80%;margin-left: 15px;">景点位置:咸宁市通山县笔架山路80号</view>
			<view style="font-size: 13px;color: blue;width: 20%;" @click="openSmartNavigation">景点导航</view>
		</view>
		<view style="background-color: aliceblue;width: 100%;height: 10px;"></view>
		<view class="specsView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;" @click="segment1Click">
				<view v-if="type === '1'" style="color: blue;font-size: 15px;">预定门票</view>
				<view v-else style="color: black;font-size: 15px;">预定门票</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;" @click="segment2Click">
				<view v-if="type === '2'" style="color: blue;font-size: 15px;">查看点评</view>
				<view v-else style="color: black;font-size: 15px;">查看点评</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;" @click="segment3Click">
				<view v-if="type === '3'" style="color: blue;font-size: 15px;">交通指南</view>
				<view v-else style="color: black;font-size: 15px;">交通指南</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
		</view>
		<view v-if="type === '1'">
			<view style="padding: 15px;width: 100%;height: 30px;background-color: aliceblue;font-size: 14px;">门票</view>
			<view class="normalticketView">
				<view style="margin-left: 3%;width: 94%;background-color: white;border-radius: 5px;">
					<view style="font-size: 14px;color: black;padding: 10px;width: 50%;">九宫山门票</view>
					<view style="font-size: 13px;color: black;padding: 10px;width: 50%;">累计销量2000+</view>
					<view style="width: 100%;margin-top: 10px;text-align: center;">······························································</view>
					<view class="ticketList">
						<view class="normal-item" v-for="(item, index) in normalList" :key="index">
							<view style="color: black;margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
							<view style="color: blue;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.specs}}</view>
							<view style="color: blue;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.limit}}</view>
							<view style="color: black;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.used}}</view>
							<view style="display: flex;flex-direction: row;margin-left: 10px;margin-top: 10px;text-align: right;width: 100%;">
								<view style="color: orangered;width: 75%;;font-size: 14px;text-align: right;">{{item.price}}</view>
								<view style="margin-left: 10px;width: 50px;background-color: orangered;color: white;border-radius: 5px;text-align: center;font-size: 12px;" @click="yudingClick">预定</view>
							</view>
							<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
						
						<view style="width: 75%;font-size: 14px;margin-top: 10px;margin-left: 10px;">儿童票(1.2米以下)</view>
						<view style="margin-left: 10px;width: 50px;background-color: orangered;color: white;border-radius: 5px;text-align: center;font-size: 12px;height: 20px;margin-top: 10px;">免费</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 5px;"></view>
					<view style="display: flex;flex-direction: row;width: 100%;height: 50px;margin-top: 5px;">
						
						<view style="width: 75%;font-size: 14px;margin-top: 10px;margin-left: 10px;">成人票(70周岁(含)以上)</view>
						<view style="margin-left: 10px;width: 50px;background-color: orangered;color: white;border-radius: 5px;text-align: center;font-size: 12px;height: 20px;margin-top: 10px;">免费</view>
					</view>
				</view>
				
			</view>
			<view style="padding: 15px;width: 100%;height: 30px;background-color: aliceblue;font-size: 14px;">景点套票</view>
				<view class="normalticketView">
					<view style="margin-left: 3%;width: 94%;background-color: white;border-radius: 5px;">
						<view style="font-size: 14px;color: black;padding: 10px;width: 95%;">园内项目+交通套票(不含大门票)</view>
						<view style="font-size: 13px;color: black;padding: 10px;width: 50%;">累计销量2000+</view>
						<view style="width: 100%;margin-top: 10px;text-align: center;">······························································</view>
						<view class="ticketList">
							<view class="normal-item" v-for="(item, index) in viewsList" :key="index">
								<view style="color: black;margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
								<view style="color: blue;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.specs}}</view>
								<view style="color: black;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.used}}</view>
								<view style="display: flex;flex-direction: row;margin-left: 10px;margin-top: 10px;text-align: right;width: 100%;">
									<view style="color: orangered;width: 75%;;font-size: 14px;text-align: right;">{{item.price}}</view>
									<view style="margin-left: 10px;width: 50px;background-color: orangered;color: white;border-radius: 5px;text-align: center;font-size: 12px;">预定</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
			<view style="padding: 15px;width: 100%;height: 30px;background-color: aliceblue;font-size: 14px;">特价票</view>
			<view class="normalticketView">
				<view style="margin-left: 3%;width: 94%;background-color: white;border-radius: 5px;">
					<view style="font-size: 14px;color: black;padding: 10px;width: 95%;">园内项目(不含大门票)</view>
					<view style="font-size: 13px;color: black;padding: 10px;width: 50%;">累计销量2000+</view>
					<view style="width: 100%;margin-top: 10px;text-align: center;">······························································</view>
					<view class="ticketList">
						<view class="normal-item" v-for="(item, index) in discountList" :key="index">
							<view style="color: black;margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
							<view style="color: blue;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.specs}}</view>
							<view style="color: black;margin-left: 10px;font-size: 12px;margin-top: 10px;">{{item.used}}</view>
							<view style="display: flex;flex-direction: row;margin-left: 10px;margin-top: 10px;text-align: right;width: 100%;">
								<view style="color: orangered;width: 75%;;font-size: 14px;text-align: right;">{{item.price}}</view>
								<view style="margin-left: 10px;width: 50px;background-color: orangered;color: white;border-radius: 5px;text-align: center;font-size: 12px;">预定</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="type === '2'">
			<view style="margin-left: 15px;margin-top: 10px;width: 100%;height: 30px;background-color: white;color: black;font-size: 14px;">用户点评(9999+)</view>
			<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 20px;color: red;">5.0</view>
				<view style="margin: 10px 10px 10px 0px;color: black;font-size: 14px;">/总5.0分</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			<view class="normalticketView">
				<view class="normal-item" v-for="(item, index) in discussList" :key="index">
					<view class="iconView">
						<view class="u-avatar-item">
							<u-avatar :src="item.icon" width="30px" height="30px" ></u-avatar>
						</view>
						<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;">{{item.name}}</view>
						<u-image style="margin-top: 16px;margin-left: 10px;border-radius: 7.5px;"
						  :src="item.smileIcon"
						  width="15px"
						  height="15px"
						></u-image>
						<view style="margin-top: 16px;margin-left: 3px;font-size: 13px;">{{item.score}}</view>
					</view>
					<view style="margin-left: 3%;margin-top: 20px;width: 94%;color: dimgray;font-size: 13px;">{{item.discusion}}</view>
					<view class="pictrueView" >
						<view class="pictrue-item" v-for="(pic, index) in item.pictureList" :key="index">
							<u-image :src="pic" style="margin-top: 10px;margin-left: 20px;"
						  width="80px"
						  height="80px"></u-image>
						</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
				</view>
			</view>
		</view>
		<view v-if="type === '3'">
			<view style="padding: 15px;width: 100%;height: 30px;background-color: white;color: black;font-size: 14px;">自驾路线</view>
			<view style="margin-left: 3%;width: 94%;height: 40px;background-color: white;color: gray;font-size: 14px;">{{driveline}}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const id = ref('');
	// 轮播图列表
	const swiperList = ref([
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	]);
	const type = ref("1");
	const normalList = ref([
		{title:"成人票",specs:"官方|随买随用|无需取票!",limit:"年龄59岁以下，身高1.4米以上，须同时满足以上条件",used:"已售500+",price:"￥20"},
		{title:"成人票",specs:"官方|随买随用|无需取票!",limit:"年龄59岁以下，身高1.4米以上，须同时满足以上条件",used:"已售500+",price:"￥20"},
		{title:"成人票",specs:"官方|随买随用|无需取票!",limit:"年龄59岁以下，身高1.4米以上，须同时满足以上条件",used:"已售500+",price:"￥20"},
	]);
	const viewsList = ref([
		{title:"九龙山石门峡+往返索道(成人票)",specs:"官方|可订明天|需要取票!",limit:"年龄59岁以下，身高1.4米以上，须同时满足以上条件",used:"已售500+",price:"￥20"},
	]);
	const discountList = ref([
		{title:"九龙山石门峡(成人票)",specs:"官方|可订明天|需要取票!",limit:"年龄59岁以下，身高1.4米以上，须同时满足以上条件",used:"已售500+",price:"￥20"},
	]);
	const discussList = ref([
		{icon:"/static/home/swiper.png",name:"张安",smileIcon:"/static/home/swiper.png",score:"5分",discusion:"九宫山夏凉冬雪，气候宜人，是周末度假的好地方，让人心情舒畅，推荐大家带家人一起来游玩！",pictureList:["/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  ]},
	  {icon:"/static/home/swiper.png",name:"张安",smileIcon:"/static/home/swiper.png",score:"5分",discusion:"九宫山夏凉冬雪，气候宜人，是周末度假的好地方，让人心情舒畅，推荐大家带家人一起来游玩！",pictureList:["/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  ]},
	  {icon:"/static/home/swiper.png",name:"张安",smileIcon:"/static/home/swiper.png",score:"5分",discusion:"九宫山夏凉冬雪，气候宜人，是周末度假的好地方，让人心情舒畅，推荐大家带家人一起来游玩！",pictureList:["/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  ]},
	  {icon:"/static/home/swiper.png",name:"张安",smileIcon:"/static/home/swiper.png",score:"5分",discusion:"九宫山夏凉冬雪，气候宜人，是周末度假的好地方，让人心情舒畅，推荐大家带家人一起来游玩！",pictureList:["/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  ]},
	]);
	const driveline = ref("1.武汉市一京珠高速一咸宁方向一咸通高速(桂花出口)一通山方向一通山绕城路一终点;2.咸宁市一咸通高速公路-G106-沙桐一终点.3.黄石市一太广高速公路-G106-沙桐一终点.");
	    
	  
	onLoad((options:any) => {
		// 从URL参数中获取id
		id.value = decodeURIComponent(options.id); 
		console.log('接收到的ID:',  id.value);
	
		// 根据ID获取详情数据
		fetchDetailData(id.value);
	});
	 
	const fetchDetailData = (id:any) => {
	  // 这里调用API获取详情数据
	  console.log('获取详情数据，ID:', id)
	};
	const goBack= () => {
		        
		uni.navigateBack()
	};
	//景区天气
	const homestayClick = () => {
			
	};
	//切换segment
	const segment1Click = () => {
			
		type.value = "1";
			
	};
	const segment2Click = () => {
			
		type.value = "2";
			
	};
	const segment3Click = () => {
		
		type.value = "3";
		
	};
	const weatherClick = () => {
		uni.navigateTo({
			url:"/pages/home/weather"
		});
	};
	//简介攻略
	const moreviewClick = () => {
		uni.navigateTo({
			url:'/pages/home/IntroductionGuide'
		})
	};
	//咨询购票
	const makePhoneCall = () => {
		uni.makePhoneCall({
		  phoneNumber: '15689288001' // 需要拨打的电话号码
		})
	};
	//景点导航
	const openSmartNavigation = () => {
		const lat = 39.9042
		const lng = 116.4074
		const name = "天安门"
		
		uni.openLocation({
		    latitude: lat,
		    longitude: lng,
		    name: name,
		    address: "北京市东城区",  // 可选
		    success: () => {
		      console.log('打开地图成功');
		    },
		    fail: (err) => {
		      console.error('打开地图失败', err);
		      // 如果失败，可以尝试其他备用方案
		      // 比如提示用户手动搜索
		      uni.showToast({
		        title: '请手动打开地图搜索',
		        icon: 'none'
		      });
		    }
		  });
	};
	//预定
	const yudingClick = () => {
		uni.navigateTo({
			url:'/pages/home/bookingHomestay'
		})
	};
	  
</script>

<style lang="scss" scoped>
	
	.container {
		height: 100%;
		
		background: #ffffff;
		.flex{
			display: flex;
		}
		.swiper {
		  
		}
		.goodsHeaderView{
			  display: flex;
			  flex-direction: row;
			  width: 100%;
			  height: 60rpx;
			  background-color: white;
			  
		  }
		.fijinview{
			width: 40%;
			margin-left: 15px;
			font-size: 16px;
			margin-top: 13px;
			color: #000;
		}
		.moreview{
			width: 50%;
			margin-left: 15px;
			font-size: 14px;
			margin-top: 13px;
			margin-left: 10px;
			color: #000;
			text-align: right;
		}
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
		 height: 30px;
		 display: flex;
		 flex-direction: row;
		 
		 background-color: white;
		 margin-top: 10px;
	 }
	 .opentime{
		 width: 100%;
		 height: 30px;
		 display: flex;
		 flex-direction: row;
		 
		 background-color: white;
	 }
	 .locationV{
		 width: 100%;
		 height: 40px;
		 display: flex;
		 flex-direction: row;
		 
		 background-color: white;
	 }
	 .whiteLine{
		 margin-left: 30%;
		 margin-top: 3px;
		 width: 40%;
		 height: 2px;
		 background-color: blue;
	 }
	 .normalticketView{
		 
		 width: 100%;
		 background-color: aliceblue;
		 border-radius: 5px;
	 }
	 .ticketList{
		 display: flex;
		 flex-direction: column;
		 margin-top: 10px;
		 .normal-item{
			 width: 100%;
			 display: flex;
			 flex-direction: column;
			 
			 justify-content: space-between;
			 background: white;
			 // padding: 10px;
			 box-sizing: border-box;
			 margin-bottom: 16px;
		 }
	 }
	 .iconView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
	 }
	 .u-avatar-item {
	     margin-left: 15px;
		 margin-top: 15px;
	   }
	   .pictrueView{
		   
		   width: 100%;
		   height: 100px;
		   display: flex;
		   flex-direction: row;
	   }
	   .pictrue-item{
		   margin-top: 10px;
		   
	   }
	   
</style>