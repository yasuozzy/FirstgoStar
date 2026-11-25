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
		</u-navbar>
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<view class="goodsHeaderView">
			<view class="fijinview">九宫大饭店(铜山九宫山风景区云中胡店)</view>
			<u-image style="margin-top: 16px;margin-left: 10px;border-radius: 7.5px;"
			  :src="smileIcon"
			  width="15px"
			  height="15px"
			></u-image>
			<u-image style="margin-top: 16px;margin-left: 10px;border-radius: 7.5px;"
			  :src="smileIcon"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view class="goodsHeaderView" >
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 50%;">设施政策</view>
			<view class="moreview" @click="moreClick">查看更多></view>
		</view>
		<view class="specsView" @click="moreClick">
			<view class="specs_item" v-for="(item,index) in specsList">
				<u-avatar 
				  :src="item.icon"
				  number="30px"
				  
				></u-avatar>
				<view style="font-size: 11px;color: dimgray;width: 100%;text-align: center;margin-top: 5px;">{{item.title}}</view>
			</view>
		</view>
		
		<view class="goodsHeaderView">
			<view style="margin-top: 25px;margin-left: 15px;font-size: 14px;width: 50%;">酒店房型</view>
		</view>
		<view class="hoteltypeView">
			<view class="approval_list">
				<view class="hotel_item" v-for="(item, index) in viewsList"
				:key="index" @click="houseTypeClick">
					<u-image
					:src="item.image"
					width="90px"
					height="90px"
					></u-image>
					<view class="allSpecsView">
			  			<view class="detailsView">
			  				<view style="font-size: 15px;font-weight: bold;">{{item.title}}</view>
			  				<view style="font-size: 13px;">{{item.feeling}}</view>
							<view style="display: flex;flex-direction: row;">
								<view style="font-size: 13px;">{{item.dianping}}</view>
								<view style="font-size: 13px;color: blue;margin-left: 5px;">{{item.collection}}</view>
							</view>  	 
			  			</view>
			  			
			  			<view class="ticketsView">
			  				<view style="font-size: 13px;text-decoration: line-through;text-align: right;margin-right: 10px;margin-top: 5px;">{{item.discount}}</view>
			  				<view style="font-size: 13px;text-align: right;margin-right: 10px;margin-top: 5px;">{{item.tickets}}</view>
			  			</view>
			  		</view>
				</view>
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
	const smileIcon = ref("/static/home/swiper.png");
	const specsList = ref([
		{icon:"/static/home/swiper.png",title:"2021年开业"},
		{icon:"/static/home/swiper.png",title:"免费停车"},
		{icon:"/static/home/swiper.png",title:"家庭影院"},
		{icon:"/static/home/swiper.png",title:"茶室"},
		{icon:"/static/home/swiper.png",title:"山景房"},
		{icon:"/static/home/swiper.png",title:"洗衣房"},
	]);
	
	const locimage = ref("/static/home/homestay.png");
	const downimage = ref('/static/home/downImage.png');
	const viewsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "阳光双床放",
			  feeling:"2张1.5米单人床 2人入住 18㎡ 不可吸烟",
			  dianping:"无早餐",
			  collection:"入住当天18：00前可取消",
			  discount:"原价￥70",
			  tickets:"现价￥65起",
			  id:"11111",
	  },
	  {
		image: "/static/home/food.png",
		title: "温馨大床房",
			 feeling:"2张1.5米单人床 2人入住 18㎡ 不可吸烟",
			 dianping:"无早餐",
			 collection:"入住当天18：00前可取消",
			 discount:"原价￥70",
			 tickets:"现价￥65起",
			  id:"22222",
	  },
	  {
		image: "/static/home/admission.png",
		title: "豪华单人床",
			  feeling:"2张1.5米单人床 2人入住 18㎡ 不可吸烟",
			  dianping:"无早餐",
			  collection:"入住当天18：00前可取消",
			  discount:"原价￥70",
			  tickets:"现价￥65起",
			  id:"33333",
	  },
	  
	]);
					
	const goBack= () => {
			
		uni.navigateBack()
	};
	
	//查看更多
	const moreClick = () => {
		uni.navigateTo({
			url:"/pages/home/morepolicy"
		})
	};
			
	//房型介绍
	const houseTypeClick = () => {
				
		uni.navigateTo({
			url:'/pages/home/houseType'
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
			width: 80%;
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
				width: 14.66%;
				height: 50px;
			}
		}
		.chooseTimeView{
				 width: 100%;
				 height: 40px;
				 display: flex;
				 flex-direction: row;
				 margin-top: 20px;
		}
		.startView{
				 margin-left: 15px;
				 margin-top: 15px;
				 width: 70px;
				 font-size: 13px;
		}
		.endView{
				 
				 margin-top: 15px;
				 width: 70px;
				font-size: 13px;
		}
		.alldayView{
				 width: 40px;
				 margin-top: 15px;
				 margin-left: 3px;
				 font-size: 13px;
				 text-align: center;
		}
		.chooseView{
				 width: 120px;
				 height: 40px;
				 font-size: 13px;
				 margin-top: 15px;
				 margin-left: 3px;
				 
		}
		.hoteltypeView{
			display: flex;
			margin-top: 30px;
			width: 100%;
			height: 100%;
			background-color: aliceblue;
			.approval_list {
			  background-color: aliceblue;
			  margin-left: 3%;
			  
			  width: 94%;
			  box-sizing: border-box;
			  .hotel_item{
				width: 100%;
				display: flex;
				flex-direction: row;
				margin-top: 20px;
				// align-items: center;
				// justify-content: space-between;
				background: white;
				padding: 10px;
				box-sizing: border-box;
				margin-bottom: 10px;
				border-radius: 10px;
				.allSpecsView{
							 display: flex;
							 flex-direction: column;
							 width: 100%;
							 .detailsView{
							 	 		  margin-left: 10px;
							 	 		  width: 100%;
							 }
							 .tagsView{
							 			  width: 100%;
							 			  margin-left: 10px;
							 			  display: flex;
							 			  flex-direction: row;
							 			  .roomtag_item{
							 				  
							 				  text-align: center;
							 				  font-size: 12px;
							 			  }
							 }
							 .ticketsView{
							 	 		  margin-left: 10px;
							 	 		  width: 100%;
							 }
							 .buttonView{
								 display: flex;
								 flex-direction: row;
								 margin-top: 10px;
							 }
					}
				}
			}
		}
		.lineView{
				 width: 94%;
				 height: 1px;
				 background-color: gray;
				 margin-left: 3%;
				 margin-top: 15px;
		}
		
	}
</style>