<template>
    <view class="main">
        <u-navbar
          title="出价订房页"
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
		<view class="locationView" @click="mapClick">
				  <u-image style="margin-top: 6px;margin-left: 6px;" :src="locimage"
					  width="20px"
					  height="20px"></u-image>
				  <view style="color: blue;font-size: 13px;margin-top: 6px;margin-left: 10px;">目的地</view>
				  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">{{locationString}}</view>
		</view>
		<view class="chooseTimeView">
				  
					<view class="startView" @click="show = true">{{startTime}}
						
					</view>
					<view style="width: 20px;margin-top: 12px;margin-right: 5px;">--</view>
					<view class="endView" @click="endshow = true">{{endTime}}
						
					</view>
					<view class="alldayView">共{{totalnights}}晚</view>
						
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="titleView">
			<view class="title_item" v-for="(item,index) in titleList" :key="index">
				<view style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;display: flex;justify-content: center;align-items: center;">{{item}}</view>
			</view>
		</view>
		<view class="titleView">
			<view class="title_item" v-for="(item,index) in contentList" :key="index">
				<view style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;display: flex;justify-content: center;align-items: center;">{{item}}</view>
			</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;color: royalblue;font-size: 13px;">{{saveMoney}}</view>
		<view class="segmentView">
			<view class="disdance" @click="open('1')">
				<!-- <view style="margin-top: 10px;margin-left: 10px;">智能排序</view>
				<u-image style="margin-top: 17px;margin-left: 10px;" :src="downimage"
							  width="15px"
							  height="9px"></u-image> -->
							  <uni-data-select
							    v-model="value"
							    :localdata="range"
							    @change="change"
								placeholder="智能排序"
								
							  ></uni-data-select>
			</view>
			<view class="disdance" @click="open('2')">
				<!-- <view style="margin-top: 10px;margin-left: 10px;">位置距离</view>
				<u-image style="margin-top: 17px;margin-left: 10px;" :src="downimage"
							  width="15px"
							  height="9px"></u-image> -->
							  <uni-data-select
							    v-model="value1"
							    :localdata="range1"
							    @change="change"
							  	placeholder="位置距离"
							  ></uni-data-select>
			</view>
			<view class="disdance" @click="open('3')">
				<!-- <view style="margin-top: 10px;margin-left: 10px;">价格</view>
				<u-image style="margin-top: 17px;margin-left: 10px;" :src="downimage"
							  width="15px"
							  height="9px"></u-image> -->
							  <uni-data-select
							    v-model="value2"
							    :localdata="range2"
							    @change="change"
							  	placeholder="价格"
							  ></uni-data-select>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">以下是满足您需求的酒店,</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: red;">优选的酒店将提前收到您的订单</view>
		</view>
		<view class="approval_list">
				<view
				  class="jingdianView_item"
				  v-for="(item, index) in viewsList"
				  :key="index" @click="hoteldetailClick()"
				>
				 <view style="display: flex;flex-direction: row;">
					<u-image
						:src="item.image"
						width="80px"
						height="160px"
					></u-image>
					<view class="allSpecsView">
						  <view class="specsView">
							  <view style="display: flex;flex-direction: row;width: 100%;height: 25px;">
								  <view style="font-size: 15px;font-weight: bold;width: 80%;">{{item.title}}</view>
								  <switch checked="true" style="transform:scale(0.6);align-items: right;margin-left: 50px;" @change="switchChange" />
							  </view>
						  	  <view style="display: flex;flex-direction: row;">
								 <view style="font-size: 13px;margin-top: 3px;">{{item.feeling}}</view>
								  <view style="color: royalblue;font-size: 12px;margin-left: 130px;">优选</view>
							  </view>
						  	  
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
						  	  <view style="font-size: 14px;">{{item.discount}}</view>
						  	  <view style="font-size: 12px;background-color: red;border-radius: 4px;width: 80px;height: 20px;color: white;margin-left: 20px;display: flex;justify-content: center;align-items: center;">优惠:￥{{item.tickets}}</view>
						    </view>
						  </view>
					</view>
					<view class="titleView">
						<view class="title_item" v-for="(item,index) in houseList" :key="index">
							<view v-if="index === 4" style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;display: flex;justify-content: center;align-items: center;color: red;">{{item}}</view>
							<view v-else style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;display: flex;justify-content: center;align-items: center;color: royalblue;">{{item}}</view>
						</view>
					</view>
					<view class="titleView">
						<view class="title_item" v-for="(item,index) in priceList" :key="index">
							<view v-if="index === 4" style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;display: flex;justify-content: center;align-items: center;color: red;">{{item}}</view>
							<view v-else style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;display: flex;justify-content: center;align-items: center;color: black;">{{item}}</view>
						</view>
					</view>
					<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
				</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="display: flex;flex-direction: column;width: 60%;">
					<view style="font-size: 13px;margin-left: 15px;margin-top: 5px;display: flex;flex-direction: row;">
						<view style="font-size: 12px;color: black;">共</view>
						<view style="font-size: 12px;color: royalblue;">{{night}}</view>
						<view style="font-size: 12px;color: black;">晚,</view>
						<view style="font-size: 12px;color: black;">含</view>
						<view style="font-size: 12px;color: royalblue;">{{housetype}}</view>
						<view style="font-size: 12px;color: black;">种房型,</view>
						<view style="font-size: 12px;color: royalblue;">{{housenum}}</view>
						<view style="font-size: 12px;color: black;">间房</view>
					</view>
					<view style="color: royalblue;font-size: 14px;width: 200px;margin-left: 15px;">合计需出价:￥{{allmoney}}</view>
				</view>
				
				<view class="order-button" @click="bookingClick">立即订房</view>
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
	const downimage = ref('/static/home/downImage.png');
	const locationString = ref("湖北铜山，九宫山附近");
	const currentlocation = ref("湖北铜山");
	const detailLocation = ref("九宫山");
	const startTime = ref("1月19日");
	const endTime = ref("1月20日");
	const totalnights = ref("1");
	const titleList = ref(['房型','酒店市场价格','出价(元)','数量(间)','早餐']);
	const contentList = ref(['大床房','100-150','85','1','有']);
	const saveMoney = ref('本单预计为您节省53元');
	const value = ref(5);
	const range = ref([
	  { value: 0, text: "低价优先" },
	  { value: 1, text: "高价优先" },
	  { value: 2, text: "行程距离->近" },
	  { value: 3, text: "行程距离->远" },
	]);
	const value1 = ref(2);
	const range1 = ref([
			
			{ value: 0, text: "行程距离->近" },
			{ value: 1, text: "行程距离->远" },
	]);
	const value2 = ref(2);
	const range2 = ref([
			
			{ value: 0, text: "高->低" },
			{ value: 1, text: "低->高" },
	]);
	const viewsList = ref([
		{
		  image: "/static/home/homestay.png",
		  title: "九龙山国际大酒店",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  collection:"游客收藏:1500收藏",
			  disdance:"距离区域中心驾车1.0千米 近云水湖",
			  discount:"原价￥138",
			  tickets:"53",
			  id:"11111",
		},
		{
		  image: "/static/home/food.png",
		  title: "黄鹤楼大酒店",
			  feeling:"满意度:5.0分",
			  dianping:"游客点评:666条点评",
			  collection:"游客收藏:1500收藏",
			  disdance:"距离区域中心驾车1.0千米 近云水湖",
			  discount:"原价￥138",
			  tickets:"53",
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
	const houseList = ref(['房型','单价','数量','总价','总出价']);
	const priceList = ref(['大床房','￥138','1','￥138','￥85']);
	const allmoney = ref('85');
	const night = ref('1');
	const housetype = ref('1');
	const housenum = ref('1');
				  
           
        
	const goBack= () => {
			
		uni.navigateBack()
	};
	const switchChange = () => {
		
	};
	const hoteldetailClick = () => {
		
	};
	const bookingClick = () => {
		uni.navigateTo({
			url:'/pages/home/bookingOrder'
		})
	};
	//地图
	const mapClick = () => {
		uni.navigateTo({
			url:'/pages/home/mapLocation'
		})
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
	 .chooseTimeView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 }
	 .startView{
	 		 margin-left: 15px;
	 		 margin-top: 15px;
	 		 width: 70px;
	 		 font-size: 14px;
	 }
	 .endView{
	 		 
	 		 margin-top: 15px;
	 		 width: 70px;
	 		font-size: 14px;
			margin-left: 5px;
	 }
	 .alldayView{
	 		 width: 100px;
	 		 margin-top: 15px;
	 		 margin-right: 15px;
	 		 margin-left: 60px;
	 		 font-size: 14px;
	 		 text-align: right;
			 
	 }
	 .titleView{
		 margin-left: 4%;
		 width: 92%;
		 display: flex;
		 height: 40px;
		 margin-top: 10px;
		 .title_item{
			 display: flex;
			 flex-direction: row;
			 width: 22%;
		 }
	 }
	 .segmentView{
	 		 width: 100%;
	 		 height: 50px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 background-color: aliceblue;
			 margin-top: 10px;
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
	    
	    padding: 10px;
	    width: 100%;
	    box-sizing: border-box;
	    .jingdianView_item {
	      width: 100%;
		  height: 300px;
	      display: flex;
	      flex-direction: column;
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
				 margin-top: 10px;
				display: flex;
				flex-direction: row;
	 		 	margin-left: 10px;
	 		 	width: 100%;
	 		 }
	 	 }
	  	  
	  	  
		}
	}
	.footer-container {
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  height: 60px;
	  background-color: aliceblue;
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
		height: 30px;           /* 需要设置高度 */
		width: 80px;
		margin-right: 10px;
		font-size: 13px;
		color: white;
		background-color: royalblue;
		border-radius: 4px;
		margin-left: 50px;
		margin-top: 10px;
	}
}
</style>