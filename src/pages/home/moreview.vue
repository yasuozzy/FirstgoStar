<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  
	  <u-navbar
	    title="附近景点"
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
	  			<view class="homestayView">当前位置:铜山</view>
	  		</view>
		</template>
		</u-navbar>
		<view class="segmentView">
			<view class="disdance" @click="open('1')">
				<view style="margin-top: 10px;margin-left: 10px;">位置距离</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="10px"></u-image>
			</view>
			<view class="disdance" @click="open('2')">
				<view style="margin-top: 10px;margin-left: 10px;">销量</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="10px"></u-image>
			</view>
			<view class="disdance" @click="open('3')">
				<view style="margin-top: 10px;margin-left: 10px;">价格</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="locimage"
							  width="15px"
							  height="10px"></u-image>
			</view>
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
		<u-popup :show="kuangshow" @close="close" mode="top" bgColor="transparent">
			<view v-if="type === '1'"  style="background-color: white;margin-top: 115px;margin-left: 5px;width: 120px;height: 70px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in locationList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			<view v-if="type === '2'"  style="background-color: white;margin-top: 115px;margin-left: 130px;width: 120px;height: 70px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in sellList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			<view v-if="type === '3'"  style="background-color: white;margin-top: 115px;margin-left: 250px;width: 120px;height: 70px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: column;" v-for="(item,index) in priceList" :key="index">
					<view style="margin-top: 11px;margin-left: 10px;font-size: 12px;" @click="normalClick">{{item}}</view>
				</view>		
			</view>
			
		</u-popup>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const locimage = ref('/static/home/downImage.png');
	const viewsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "九龙山",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您1.0千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },
	  {
		image: "/static/home/food.png",
		title: "黄鹤楼",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您10.0千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },
	  {
		image: "/static/home/admission.png",
		title: "隐水洞",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您0.5千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },{
		image: "/static/home/admission.png",
		title: "隐水洞",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您0.5千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },{
		image: "/static/home/admission.png",
		title: "隐水洞",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  disdance:"距离您0.5千米",
			  discount:"原价￥70",
			  tickets:"65"
	  },
	  
	]);
	const type = ref('1');
	const locationList = ref(['行程距离：近->远','行程距离：远->近']);
	const sellList = ref(['高->低','低->高']);
	const priceList = ref(['高->低','低->高']);
	const kuangshow = ref(false);			
		
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
			
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #f1f4f9;
	 }
	 .flex{
	 	display: flex;
	 }
	 .hotelView{
	 		 
	 		 width: 80px;
	 		 height: 30px;
	 		 color: white;
	 		 margin-left: 50px;
	 		 margin-top: 4px;
	 		 display: flex;
	 		 flex-direction: column;
	 		 .title{
	 			 
	 			 margin-top: 3px;
	 		 }
	 		 .whiteLine{
	 			 background-color: white;
	 			 width: 30px;
	 			 height: 1px;
	 			 margin-top: 2px;
	 			 
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
	}
	 
</style>