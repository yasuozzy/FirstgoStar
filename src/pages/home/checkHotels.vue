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
							  height="8px"></u-image>
				
			</view>
			<view class="disdance" @click="open('2')">
				<view style="margin-top: 10px;margin-left: 10px;">销量</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="8px"></u-image>
					
			</view>
			<view class="disdance" @click="open('3')">
				<view style="margin-top: 10px;margin-left: 10px;">价格</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="8px"></u-image>
							 
			</view>
		</view>
		<view class="hotels_list">
				<view
				  class="jingdianView_item" v-if="hoteltype === '1'"
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
						  		<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;">{{item.title}}</view>
						  	  </view>
						    </view>
						    <view class="ticketsView">
						  	  <view style="font-size: 13px;text-decoration: line-through;text-align: right;">{{item.discount}}</view>
						  	  <view style="font-size: 13px;text-align: right;">{{item.tickets}}</view>
						    </view>
						  </view>
					  </view>
				<view
				  class="jingdianView_item" v-if="hoteltype === '2'"
				  v-for="(item, index) in homestayList"
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
						  		<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;">{{item.title}}</view>
						  	  </view>
						    </view>
						    <view class="ticketsView">
						  	  <view style="font-size: 13px;text-decoration: line-through;text-align: right;">{{item.discount}}</view>
						  	  <view style="font-size: 13px;text-align: right;">{{item.tickets}}</view>
						    </view>
						  </view>
					  </view>
				
		</view>
		<!-- <uni-popup ref="popup" > -->
		<u-popup :show="kuangshow" @close="close" mode="top" bgColor="transparent">
			<view v-if="type === '1'"  style="background-color: white;margin-top: 115px;margin-left: 5px;width: 120px;height: 130px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in locationList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			<view v-if="type == '2'"  style="background-color: white;margin-top: 115px;margin-left: 130px;width: 120px;height: 70px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in sellList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			<view v-if="type == '3'"  style="background-color: white;margin-top: 115px;margin-left: 250px;width: 120px;height: 70px;display: flex;flex-direction: column;border-radius: 4px;">
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
	const type = ref('1');
	const keyword = ref('');
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
	const homestayList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "听竹轩民宿",
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
		title: "嘉兴民宿",
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
		title: "隐水洞民宿",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  collection:"游客收藏:1500收藏",
			  disdance:"距离区域中心驾车1.0千米 近云水湖",
			  discount:"原价￥70",
			  tickets:"门票￥65起",
			  id:"33333",
	  },
	  
	]);
	const locationList = ref(['低价优先','高价优先','行程距离：近->远','行程距离：远->近']);
	const sellList = ref(['行程距离：近->远','行程距离：远->近']);
	const priceList = ref(['高->低','低->高']);
	const hoteltype = ref('1');
	const value = ref(3);
	const range = ref( [
			  { value: 0, text: "15分钟内办理入住" },
			  { value: 1, text: "次日6：00前办理入住" },
			  
			]);
	const kuangshow = ref(false);

	onLoad((options:any) => {
	
		console.log(options.type); // '123'
		hoteltype.value = options.type;
	});
		
	const goBack = () => {
				
		uni.navigateBack()
	};
	const open = (t:any) => {
		 type.value = t;
		 console.log(type.value)
		 // $refs.popup.open('top')
		 // popup.value?.open('top');
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
	const hoteldetailClick = () =>{
		uni.navigateTo({
			url:`/pages/home/detailhotel?type=${encodeURIComponent(hoteltype.value)}` 
		});
		
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
				 }
			  
			 } 
		  }
	}
</style>