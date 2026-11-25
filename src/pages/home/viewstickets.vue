<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
		<u-navbar
		title="景点门票"
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
			</u-navbar>
			<!-- ============ 滑动广告表头 ============ -->
			<view class="swiper">
			  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
			</view>
			<view class="locationView">
					  <u-image style="margin-top: 6px;margin-left: 6px;" :src="locimage"
						  width="20px"
						  height="20px"></u-image>
					  <view style="color: blue;font-size: 13px;margin-top: 6px;margin-left: 10px;">已定位到</view>
					  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">{{locationString}}</view>
			</view>
			<view class="leftLocView">
					  <view style="margin-top: 10px;margin-left: 15px;width: 80px;">{{currentlocation}}</view>
					  <u-image style="margin-top: 10px;margin-left: 6px;" :src="locimage"
					  			  width="20px"
					  			  height="20px"></u-image>
					  <u-image style="margin-top: 10px;margin-left: 6px;" :src="locimage"
								  			  width="20px"
								  			  height="20px"></u-image>
					  <view style="height: 40px;margin-top: 10px;margin-left: 30px;">|</view>
					  <!-- <view style="width: 100px;margin-left: 20px;margin-top: 10px;height: 40px;font-size: 14px;">{{detailLocation}}</view> -->
					  <input class="searchlocation" placeholder="输入关键词搜索景点" type="text" />
			</view>
			<view class="lineView"></view>
			<u-button style="margin-top: 10px;margin-left: 5%;width: 90%;" type="primary" color="#4C9393" text="查 询" @click="checkData"></u-button>
			<view class="goodsHeaderView">
				<view class="fijinview">推荐景点</view>
				<!-- <view class="moreview" @click="moreviewClick">更多 ></view> -->
			</view>
			<view class="approval_list">
				<view
				  class="jingdianView_item"
				  v-for="(item, index) in viewsList"
				  :key="index" @click="viewdetailClick(item.id)" 
				>
				  <view class="topView">
					  <u-image
					    :src="item.image"
					    width="80px"
					    height="80px"
					  ></u-image>
					  <view class="specsView">
					  			  <view style="font-size: 15px;font-weight: bold;">{{item.title}}</view>
					  			  <view style="font-size: 13px;">{{item.feeling}}</view>
					  			  <view style="font-size: 13px;">{{item.dianping}}</view>
					  			  <view style="font-size: 13px;">{{item.disdance}}</view>
					  </view>
					  <view class="ticketsView">
					  			  <view style="font-size: 13px;margin-top: 30px;text-decoration: line-through;">{{item.discount}}</view>
								  <view style="display: flex;flex-direction: row;">
									  <view style="font-size: 13px;margin-top: 7px;">门票</view>
									  <view style="font-size: 13px;margin-top: 7px;color: orangered;">￥</view>
									  <view style="font-size: 18px;margin-top: 6px;color: orangered;">{{item.tickets}}</view>
									  <view style="font-size: 13px;margin-top: 7px;color: orangered;">起</view>
								  </view>
					  			  
					  </view>
				  </view>
				  <view class="lineV"></view>
				</view>
				
				
			</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const locimage = ref("/static/home/homestay.png");
	// 轮播图列表
	const swiperList = ref([
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	]);
	const locationString = ref("湖北铜山，九宫山附近");
	const currentlocation = ref("湖北铜山");
	const detailLocation = ref("九宫山");
	const viewsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "九龙山",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您1.0千米",
			  discount:"原价￥70",
			  tickets:"65",
			  id: "1111"
	  },
	  {
		image: "/static/home/food.png",
		title: "黄鹤楼",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您10.0千米",
			  discount:"原价￥70",
			  tickets:"65",
			  id: "2222"
	  },
	  {
		image: "/static/home/admission.png",
		title: "隐水洞",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您0.5千米",
			  discount:"原价￥70",
			  tickets:"65",
			  id: "3333"
	  },
	  
	]);

	//返回
	const goBack= () => {
			
		uni.navigateBack()
	};
	const viewdetailClick = (id:any) => {
		console.log(id)
		
		uni.navigateTo({
			url:`/pages/home/viewsDetail?id=${encodeURIComponent(id)}`
		});
	};
	const checkData = () => {
		uni.navigateTo({
			url:"/pages/home/moreview"
		});
	};
		
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background:white;
	 }
	 .flex{
	 	display: flex;
	 }
	 .locationView{
	 		 margin-left: 6%;
	 		 margin-top: 10px;
	 		 width: 88%;
	 		 height: 30px;
	 		 background-color: lightblue;
	 		 border-radius: 5px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 }
	 .leftLocView{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 height: 40px;
	 		 margin-top: 10px;
	 		 
	 }
	 .lineView{
	 		 width: 94%;
	 		 height: 1px;
	 		 background-color: gray;
	 		 margin-left: 3%;
	 		 margin-top: 15px;
	 }
	 .searchlocation{
		 margin-left: 3%;
		 width: 40%;
		 height: 35px;
		 
		 border: 1px darkgray solid;
		 border-radius: 5px;
		 font-size: 13px;
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
	 	margin-left: 30rpx;
	 	font-size: 30rpx;
	 	margin-top: 25rpx;
	 	color: #000;
	 }
	 .moreview{
	 	width: 50%;
	 	margin-left: 30rpx;
	 	font-size: 30rpx;
	 	margin-top: 25rpx;
	 	margin-left: 10px;
	 	color: #000;
	 	text-align: right;
	 }
	   .approval_list {
	     background: #fff;
	     
	     padding: 20px;
	     width: 100%;
	     box-sizing: border-box;
	     .jingdianView_item {
	 		
	       width: 100%;
	       display: flex;
	       flex-direction: column;
	       align-items: center;
	       justify-content: space-between;
	       background: white;
	       // padding: 10px;
	       box-sizing: border-box;
	       margin-bottom: 16px;
	       border-radius: 10px;
	 	  .lineV{
	 		  background-color: #f1f4f9;
	 		  width: 100%;
	 		  height: 1px;
	 		  margin-top: 20px;
	 	  }
	 	  .topView{
	 		  
	 		  width: 100%;
	 		  display: flex;
	 		  flex-direction: row;
	 		  .specsView{
	 		  		  margin-left: 10px;
	 		  		  width: 50%;
	 		  }
	 		  .ticketsView{
	 		  		  margin-left: 10px;
	 		  		  width: 40%;
	 		  }
	 	  }
	 	  
	 	  
	     }
	     
	     ::v-deep .u-icon__icon {
	       margin-right: 5px;
	     }
	   }
	 
</style>