<template>
	<view class="container">
		
		<view class="custom-navbar">
		  <view class="navbar-content">
		    <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		    <view class="search-container">
		      <u-search 
		        placeholder="输入关键词搜索附近美食，进行堂食预订" 
		        v-model="keyword" 
		        :show-action="false"
		        shape="square"
		        bg-color="#f5f5f5"
		      ></u-search>
		    </view>
		  </view>
		</view>
		<view class="segmentView">
			<view class="disdance" @click="open('1')">
				<view style="margin-top: 10px;margin-left: 10px;">位置距离</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="10px"></u-image>
			</view>
			<view class="disdance" @click="open('2')">
				<view style="margin-top: 10px;margin-left: 10px;">就餐人数</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="10px"></u-image>
			</view>
			<view class="disdance" @click="open('3')">
				<view style="margin-top: 10px;margin-left: 10px;">就餐时间</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="10px"></u-image>
			</view>
		</view>
		<view class="hotels_list">
					<view
					  class="jingdianView_item"
					  v-for="(item, index) in gourmetList"
					  :key="index" @click="hoteldetailClick()"
					>
					  <u-image
					    :src="item.image"
					    width="80px"
					    height="160px"
					  ></u-image>
					  <view class="allSpecsView">
							  <view class="specsView">
							  	  <view style="font-size: 15px;font-weight: bold;">{{item.title}}</view>
							  	  <view style="font-size: 13px;">{{item.feeling}}</view>
							  	  <view style="font-size: 13px;">{{item.dianping}}</view>
							  	  <view style="font-size: 13px;">{{item.collection}}</view>
								  <view style="font-size: 13px;">{{item.average}}</view>
							  	  <view style="font-size: 13px;">{{item.disdance}}</view>
								  <view class="buttonView">
								  	
								  	<view style="border-radius: 4px;color: white;font-size: 11px;margin-left: 68%;width: 80px;height: 25px;background-color: royalblue;display: flex;justify-content: center;align-items: center;margin-right: 5px;margin-top: 20px;" @click="shopdetail">进入店铺主页</view>
								  </view>
							    </view>
							    
							</view>
						</view>
					
					
			</view>
		<!-- <uni-popup ref="popup" > -->
		<u-popup :show="kuangshow" @close="close" mode="top" bgColor="transparent">
			<view v-if="type === '1'"  style="background-color: white;margin-top: 115px;margin-left: 5px;width: 120px;height: 180px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in locationList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			<view v-if="type === '2'"  style="background-color: white;margin-top: 115px;margin-left: 130px;width: 120px;height: 100px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in sellList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			<view v-if="type === '3'"  style="background-color: white;margin-top: 115px;margin-left: 250px;width: 120px;height: 70px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in priceList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
		<!-- </uni-popup> -->
		</u-popup>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
				
	const locimage = ref('/static/home/downImage.png');
	const gourmetList = ref([
		{
		  image: "/static/home/homestay.png",
		  title: "生态美食商城-10餐1份",
								  feeling:"满意度:5.0分",
								  dianping:"游客点评:666条点评",
								  collection:"游客收藏:1500收藏",
								  disdance:"距离区域中心驾车1.0千米 近云水湖",
								  average:"消费均价68元1人",
								  tickets:"门票￥65起",
								  id:"11111",
		},
		{
		  image: "/static/home/food.png",
		  title: "黄鹤楼大酒店",
								  feeling:"满意度:5.0分",
								  dianping:"游客点评:666条点评",
								  collection:"游客收藏:1500收藏",
								  disdance:"距离区域中心驾车1.0千米 近云水湖",
								  discount:"原价￥70",
								  tickets:"门票￥65起",
								  id:"22222",
		},
	]);
	const type = ref('1');
	const locationList = ref(['500米以内','1公里以内','2公里以内','3公里以内','4公里以内','5公里以内']);
	const sellList = ref(['1-5人','5-10人','10人以上']);
	const priceList = ref(['上午11：00-13：30','下午18：00-19：00']);
	const kuangshow = ref(false);	
	const goBack= () => {
			        
		uni.navigateBack()
	};
	const open = (t:any) => {
		type.value = t;
		kuangshow.value = true;
	};
	const normalClick = () => {
		 // $refs.popup.close()
		  // popup.value?.close();
		  kuangshow.value = false;
	};
	const close = () =>  {
		kuangshow.value = false
	  // console.log('close');
	};
	const hoteldetailClick = () => {
		
	};
	const shopdetail = () =>{
		uni.navigateTo({
			url:'/pages/home/mainshopDetail'
		})
	};
		
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		
		background: #f1f4f9;
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
		
		.search-container {
		  flex: 1;
		  margin-left: 10px;
		  margin-top: calc(var(--status-bar-height));
		  
		}
		.segmentView{
				 width: 100%;
				 height: 50px;
				 display: flex;
				 flex-direction: row;
				 
				 .disdance{
				 		 width: 29.3%;
						 height: 40px;
				 		 margin-left: 3%;
						 display: flex;
						 flex-direction: row;
						 font-size: 14px;
						 background-color: white;
						 margin-top: 5px;
						 border-radius: 5px;
				 }
		}
		.hotels_list {
		  background: #fff;
		  
		  padding: 10px;
		  width: 100%;
		  box-sizing: border-box;
		  .jingdianView_item {
		    width: 100%;
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    justify-content: space-between;
		    background: white;
		    padding: 10px;
		    box-sizing: border-box;
		    margin-bottom: 10px;
		    border-radius: 10px;
				 .allSpecsView{
					 display: flex;
					 flex-direction: column;
					 width: 100%;
					 .specsView{
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
				 }
			  
			 } 
		  }
		  
	}
</style>