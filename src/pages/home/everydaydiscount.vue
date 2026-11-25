<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  
	  <u-navbar
	    title="每日特价"
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
		<!-- <template #right>
			<view slot="right" @click="homestayClick">
				<view class="homestayView">当前位置:铜山</view>
			</view>
		</template> -->
		</u-navbar>
		<view class="yellowView">
			<view class="hotHeader">
				<u-image style="margin-top: 8px;margin-left: 15px;"
				  :src="hotImage"
				  width="30px"
				  height="30px"
				></u-image>
				<view class="textView">今日必抢</view>
			</view>
			<view class="approval_list">
				<view class="hotel_item" v-for="(item, index) in viewsList"
				:key="index" @click="hoteldetailClick">
				<u-image
			    :src="item.image"
			    width="90px"
			    height="90px"
				></u-image>
					<view class="allSpecsView">
			  			<view class="detailsView">
			  				<view style="font-size: 15px;font-weight: bold;">{{item.title}}</view>
			  				<view style="font-size: 13px;margin-top: 5px;">{{item.feeling}}</view>
							<view style="display: flex;flex-direction: row;margin-top: 5px;">
								<view style="font-size: 13px;">{{item.dianping}}</view>
								<view style="font-size: 13px;color: royalblue;margin-left: 5px;">{{item.collection}}</view>
							</view>
			  				
			  				  	 
			  			</view>
			  			<view class="tagsView">
			  				<view class="roomtag_item"
			  				  	    v-for="(item, index) in tejiatagList"
			  				  	    :key="index"
			  				  	  >
			  				  	<view style="border: 1px solid royalblue;border-radius: 4px;margin-right: 5px;color: royalblue;height: 15px;font-size: 12px;display: flex;justify-content: center;align-items: center;">{{item.title}}</view>
			  				</view>
			  				  	  
			  				  	  
			  			</view>
			  			<view class="ticketsView">
			  				<view style="font-size: 13px;text-decoration: line-through;text-align: right;margin-right: 10px;margin-top: 5px;">{{item.discount}}</view>
							<view style="display: flex;flex-direction: row;text-align: right;margin-left: 45%;width: 55%;">
								<view style="font-size: 11px;margin-top: 5px;margin-left: 45px;">特惠价</view>
								<view style="font-size: 13px;margin-top: 5px;color: orangered;">{{item.tickets}}</view>
							</view>
			  				
			  			</view>
						<view class="buttonView">
							
							<view style="border-radius: 4px;color: white;font-size: 11px;border-width: 1px;text-align: center;margin-left: 80%;width: 40px;height: 20px;background-color: orangered;align-items: center;display: flex;justify-content: center;">订购</view>
						</view>
			  		</view>
				</view>
			</view>	
		</view>
		<view class="greenHeaderView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view style="color: white;font-size: 15px;">特价酒店</view>
				
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  style="color: white;font-size: 15px;">特价门票</view>
				
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment3Click">
				<view  style="color: white;font-size: 15px;">特价美食</view>
				
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
		</view>
		<view v-if="type === '1'">
			<view class="hotels_list">
					<view
					  class="jingdianView_item"
					  v-for="(item, index) in hotelsList"
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
							  	  <view style="font-size: 13px;margin-top: 3px;">{{item.feeling}}</view>
							  	  <view style="font-size: 13px;margin-top: 3px;">{{item.dianping}}</view>
							  	  <view style="font-size: 13px;margin-top: 3px;">{{item.collection}}</view>
							  	  <view style="font-size: 13px;margin-top: 3px;">{{item.disdance}}</view>
							    </view>
							    <view class="tagsView">
							  	  <view
							  	    class="roomtag_item"
							  	    v-for="(item, index) in roomtagList"
							  	    :key="index"
							  	  >
							  		<view style="border: 1px solid royalblue;padding: 2px;border-radius: 4px;margin-right: 5px;color: royalblue;height: 15px;font-size: 12px;display: flex;justify-content: center;align-items: center;">{{item.title}}</view>
							  	  </view>
							  	  
							  	  
							    </view>
							    <view class="ticketsView">
							  	  <view style="font-size: 13px;text-decoration: line-through;margin-right: 15px;margin-left: 180px;">{{item.discount}}</view>
								  <view style="display: flex;flex-direction: row;text-align: right;margin-left: 70px;width: 200px;">
								  	<view style="font-size: 11px;margin-top: 5px;margin-left: 45px;color: orangered;">6折</view>
									<view style="font-size: 11px;margin-top: 5px;margin-left: 5px;color: orangered;">折扣价</view>
								  	<view style="font-size: 13px;color: orangered;margin-top: 3px;">{{item.tickets}}</view>
								  </view>
							  	  
							    </view>
							  </view>
						  </view>
					
					
			</view>
		</view>
		<view v-if="type === '2'">
			<view class="ticketsapproval_list">
				<view
				  class="ticketsView_item"
				  v-for="(item, index) in ticketsList"
				  :key="index" @click="viewdetailClick"
				>
				  <view class="tickettopView">
					  <u-image
					    :src="item.image"
					    width="80px"
					    height="80px"
					  ></u-image>
					  <view class="ticketspecsView">
					  			  <view style="font-size: 15px;font-weight: bold;">{{item.title}}</view>
					  			  <view style="font-size: 13px;margin-top: 3px;">{{item.feeling}}</view>
					  			  <view style="font-size: 13px;margin-top: 3px;">{{item.dianping}}</view>
					  			  <view style="font-size: 13px;margin-top: 3px;">{{item.disdance}}</view>
					  </view>
					  <view class="ticketsView">
					  			  <view style="font-size: 13px;margin-top: 30px;text-decoration: line-through;text-align: right;">{{item.discount}}</view>
					  			  <view style="margin-top: 5px;display: flex;flex-direction: row;text-align: right;">
									  <view style="font-size: 13px;margin-top: 5px;color: orangered;">特价门票￥</view>
									  <view style="font-size: 16px;margin-top: 5px;color: orangered;">{{item.tickets}}</view>
									  <view style="font-size: 13px;margin-top: 5px;color: orangered;">起</view>
								  </view>
					  </view>
				  </view>
				  <view class="lineV"></view>
				</view>
				
				
			</view>
		</view>
		<view v-if="type === '3'">
			<view class="hotels_list">
						<view
						  class="jingdianView_item"
						  v-for="(item, index) in gourmetList"
						  :key="index" @click="shopdetailClick()"
						>
						  <u-image
						    :src="item.image"
						    width="80px"
						    height="160px"
						  ></u-image>
						  <view class="allSpecsView">
								  <view class="specsView">
								  	  <view style="font-size: 15px;font-weight: bold;">{{item.title}}</view>
								  	  <view style="font-size: 13px;margin-top: 3px;">{{item.feeling}}</view>
								  	  <view style="font-size: 13px;margin-top: 3px;">{{item.dianping}}</view>
								  	  <view style="font-size: 13px;margin-top: 3px;">{{item.collection}}</view>
									  <view style="font-size: 13px;margin-top: 3px;">{{item.average}}</view>
								  	  <view style="font-size: 13px;margin-top: 3px;">{{item.disdance}}</view>
									  <view class="buttonView">
									  	
									  	<view style="border-radius: 4px;color: white;font-size: 11px;border-width: 1px;text-align: center;margin-left: 68%;width: 80px;height: 20px;background-color: orangered;align-items: center;margin-right: 5px;margin-top: 20px;display: flex;justify-content: center;">进入店铺主页</view>
									  </view>
								    </view>
								    
								  </view>
							  </view>
						
						
				</view>
			
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
				
	// 背景颜色
	const bgColor = ref("#2A9595");
	const hotImage = ref("/static/home/hotimage.png");
	const viewsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "九龙山国际大酒店",
			  feeling:"2张1.5米单人床 2人入住 18㎡ 不可吸烟",
			  dianping:"无早餐",
			  collection:"入住当天18：00前可取消",
			  discount:"原价￥70",
			  tickets:"￥65起",
			  id:"11111",
	  },
	  {
		image: "/static/home/food.png",
		title: "黄鹤楼大酒店",
			 feeling:"2张1.5米单人床 2人入住 18㎡ 不可吸烟",
			 dianping:"无早餐",
			 collection:"入住当天18：00前可取消",
			 discount:"原价￥70",
			 tickets:"￥65起",
			  id:"22222",
	  },
	  
	]);
	const roomtagList = ref([
		{
			title:"套房"
		},
		{
			title:"洗衣房"
		},
		{
			title:"停车免费"
		},
		
		{
			title:"家庭影院"
		}
	]);
	const tejiatagList = ref([
		{
			title:"在线付"
		},
		{
			title:"立即确认"
		},
		
	]);
	const type = ref("1");
	const hotelsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "九龙山国际大酒店",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  collection:"游客收藏:1500收藏",
			  disdance:"距离区域中心驾车1.0千米 近云水湖",
			  discount:"原价￥70",
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
	  {
		image: "/static/home/admission.png",
		title: "隐水洞大酒店",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  collection:"游客收藏:1500收藏",
			  disdance:"距离区域中心驾车1.0千米 近云水湖",
			  discount:"原价￥70",
			  tickets:"门票￥65起",
			  id:"33333",
	  },
	  
	]);
	const ticketsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "九龙山-特惠成人票",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您1.0千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },
	  {
		image: "/static/home/food.png",
		title: "黄鹤楼-特惠成人票",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您10.0千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },
	  {
		image: "/static/home/admission.png",
		title: "隐水洞-特惠成人票",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您0.5千米",
			  discount:"原价￥70",
			  tickets:"65"
	  }
	  
	]);
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
			
	//返回
	const goBack= () => {
			        
		uni.navigateBack()
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
	const hoteldetailClick = () => {
		
		uni.navigateTo({
			url:`/pages/home/discountHotelDetail?type=${encodeURIComponent(1)}`
		})
	};
	const viewdetailClick = () => {
		
		uni.navigateTo({
			url:'/pages/home/viewsDetail'
		});
	};
	//店铺主页
	const shopdetailClick = () => {
		
		uni.navigateTo({
			url:'/pages/home/mainshopDetail'
		})
		
	};
		
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #f1f4f9;
	 }
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
	 .yellowView{
		 display: flex;
		 flex-direction: column;
		 background-color: beige;
		 width: 100%;
	 }
	 .hotHeader{
	 		  display: flex;
	 		  flex-direction: row;
	 		  width: 100%;
	 		  background-color: beige;
	 		  height: 40px;
	 }
	 .textView{
	 		  margin-left: 8px;
	 		  margin-top: 10px;
	 		  color: black;
			  font-size: 15px;
	 }
	 .approval_list {
	   // background-color: aliceblue;
	   margin-left: 3%;
	   width: 94%;
	   box-sizing: border-box;
	   .hotel_item{
	 	width: 100%;
	 	display: flex;
	 	flex-direction: row;
	 	margin-top: 10px;
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
								  margin-top: 5px;
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
	.greenHeaderView{
		display: flex;
		flex-direction: row;
		background-color: #2A9595;
		width: 100%;
		height: 50px;
	}
	.whiteLine{
			 margin-left: 30%;
			 margin-top: 5px;
			 width: 40%;
			 height: 2px;
			 background-color: white;
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
							  margin-top: 3px;
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
	  
	  .ticketsapproval_list {
	    background: #fff;
	    
	    padding: 20px;
	    width: 100%;
	    box-sizing: border-box;
	    .ticketsView_item {
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
	  	 .tickettopView{
	  	 		  
	  	 		  width: 100%;
	  	 		  display: flex;
	  	 		  flex-direction: row;
	  	 		  .ticketspecsView{
	  	 		  		  margin-left: 10px;
	  	 		  		  width: 50%;
	  	 		  }
	  	 		  .ticketsView{
	  	 		  		  margin-left: 10px;
	  	 		  		  width: 40%;
						  margin-top: 40px;
						  height: 50px;
						 
	  	 		  }
	  	 }
	  	  
	    }
	}
</style>