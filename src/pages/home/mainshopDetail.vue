<template>
    <view class="main">
        <view class="custom-navbar">
          <view class="navbar-content">
            <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
			<input class="searchlocation" placeholder="🔍搜索商品" type="text" />
			<u-image style="margin-left: 20px;margin-top: calc(var(--status-bar-height));"
			  :src="image"
			  width="20px"
			  height="20px"
			></u-image>
			<u-image style="margin-left: 20px;margin-top: calc(var(--status-bar-height));"
			  :src="image"
			  width="20px"
			  height="20px"
			></u-image>
          </view>
        </view>
		<view class="shopView">
			<u-image style="margin-left: 20px;margin-top: 10px;"
			  :src="image"
			  width="40px"
			  height="40px"
			></u-image>
			<view class="nameView">
				<view style="font-size: 15px;color: white;">{{shopname}}</view>
				<view style="font-size: 12px;color: yellow;">{{integral}}</view>
			</view>
			<view class="buttonView">
				<view class="button">收藏</view>
				<view class="button">堂食预订</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;background-color: lightgray;width: 100%;height: 40px;">
			<u-image style="margin-left: 20px;margin-top: 10px;"
			  :src="image"
			  width="20px"
			  height="20px"
			></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{attention}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: dimgray;"></view>
		<view class="contentViews">
			<view style="width: 60px;height: 540px;">
				<view style="width: 100%;height: 40px;" v-for="(item,index) in leftList" :key="index">
					<view style="background-color: lightgray;color: black;font-size: 13px;display: flex;align-items: center;justify-content: center;height: 40px;">{{item}}</view>
				</view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;">
				<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
					<view style="width: 33.33%;font-size: 12px;display: flex;align-items: center;justify-content: center;">综合</view>
					<view style="width: 33.33%;font-size: 12px;display: flex;align-items: center;justify-content: center;">价格</view>
					<view style="width: 33.33%;font-size: 12px;display: flex;align-items: center;justify-content: center;">
						<u-image style="margin-top: 10px;"
						  :src="image"
						  width="20px"
						  height="20px"
						></u-image>
					</view>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%;height: 800px;">
					<view class="approval_list">
						<view class="politic_contect">
							<view class="haowu_item" v-for="(item,index) in goodsList" :key="index">
								<image :src="item.image"  style="width: 90%;height: 150px;border-radius: 5px;"></image>
								<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;text-align: left;">{{item.title}}</view>
								<view style="display: flex;flex-direction: row;margin-top: 10px;">
									<view style="margin-left: 15px;text-align: left;color: red;">{{item.price}}</view>
									<image :src="item.shopcart" :mode="scaleToFill" style="width: 15px;height: 15px;margin-top: 5px;margin-left: 40px;"></image>
								</view>
							</view>
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
	const image = ref("/static/home/homestay.png");
	const shopname = ref('都昌群苑美食生态商城');
	const integral = ref('5.0');
	const attention = ref('下单请到店自提');
	const leftList = ref(['半成品','净菜','小食','套餐','其他','面食','快餐','餐具']);
	const goodsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "10人餐(六荤四素一汤)",
		shopcart:'/static/home/homestay.png',	 
			  price:"￥65.00",
			  id: "1111"
	  },
	 {
	   image: "/static/home/homestay.png",
	   title: "9人餐(六荤三素一汤)",
		shopcart:'/static/home/homestay.png',				 
		price:"￥65.00",
		id: "1111"
	 },
	 {
	   image: "/static/home/homestay.png",
	   title: "8人餐(四荤四素一汤)",
		shopcart:'/static/home/homestay.png',					 
							  price:"￥65.00",
							  id: "1111"
	 },
	 {
	   image: "/static/home/homestay.png",
	   title: "8人餐(四荤四素一汤)",
		shopcart:'/static/home/homestay.png',					 
							  price:"￥65.00",
							  id: "1111"
	 },
	 {
	   image: "/static/home/homestay.png",
	   title: "8人餐(四荤四素一汤)",
		shopcart:'/static/home/homestay.png',					 
							  price:"￥65.00",
							  id: "1111"
	 },
	 {
	   image: "/static/home/homestay.png",
	   title: "8人餐(四荤四素一汤)",
		shopcart:'/static/home/homestay.png',					 
							  price:"￥65.00",
							  id: "1111"
	 },
	  
	]);
           
    const goBack= () => {
                    
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
    	height: 100%;
    	
    	background: #ffffff;
    	.flex{
    		display: flex;
    	}
    	.custom-navbar {
    	  height: calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
    	  position: relative;
    	  width: 100%;
    	  background-color: #2A9595;
    	}
    	
    	.navbar-content {
    	  display: flex;
    	  align-items: center;
    	  height: 100%;
    	  padding: 0 15px; /* 整体左右边距 */
    	}
    	
    	.back-icon {
    	  margin-right: 10px; /* 返回键与搜索框间距 */
    	}
    	
    	.searchlocation{
			 margin-left: 20px;
			 width: 70%;
			 height: 25px;
			 margin-top: calc(var(--status-bar-height));
			 background-color: white;
			 border-radius: 5px;
			 font-size: 12px;
    	}
		.shopView{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 60px;
			background-color: #2A9595;
		}
		.nameView{
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			margin-left: 10px;
			width: 50%;
		}
		.buttonView{
			display: flex;
			flex-direction: column;
			margin-left: 20px;
			
		}
		.button{
			
			border: 1px white solid;
			border-radius: 12px;
			width: 80px;
			height: 20px;
			color: white;
			font-size: 12px;
			margin-top: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.contentViews{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 1000px;
		}
		.approval_list{
			 width: 100%;
			   background: #fff;
			   // padding: 15px;
			   margin-top: 10px;
			   box-sizing: border-box;
			   
		}
		.politic_contect{
			
			 display: flex;
			 flex-direction: row;
			 flex-wrap: wrap;
			 align-items: center;
			   // gap: 24upx;
			 justify-content: space-evenly;
			 .politic_item {
			   width: 50%;
			   font-size: 13px;
			 	// margin-right: 24upx;
			   color: #000;
			   box-sizing: border-box;
			   display: flex;
			   flex-direction: column;
			   align-items: center;
			   height: 80px;
			   margin-bottom: 15px;
			 	
			 }
			  
		}
		.horisonView{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 90px;
			margin-top: 20px;
		}
		.hori_item{
			display: flex;
			flex-direction: row;
			width: 25%;
		}
		.haowu_item{
			width: 50%;
			height: 230px;
			font-size: 13px;
			color: #000;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 15px;
		}
    }
</style>