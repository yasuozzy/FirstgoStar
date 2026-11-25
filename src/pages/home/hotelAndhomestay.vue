<template>
	
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  <u-navbar
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
	  <template #left>
	    <view slot="left" >
			<view class="flex">
				<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				<view class="hotelView">
					<view class="title" @click="hotelClick">酒店</view>
					<view class="whiteLine" v-if="line1show === true"></view>
				</view>
			</view>
	      
	    </view>
	 </template>
	 <template #right>
		<view slot="right" @click="homestayClick">
			<view class="homestayView">
				<view class="title">民宿</view>
				<view class="whiteLine2" v-if="line2show === true"></view>
			</view>
		</view>
	 </template>
		
	  </u-navbar>
	  <!-- ==============定位，时间，人员选择================= -->
	  <view class="locationView">
		  <u-image style="margin-top: 6px;margin-left: 6px;" :src="locimage"
			  width="20px"
			  height="20px"></u-image>
		  <view style="color: blue;font-size: 13px;margin-top: 6px;margin-left: 10px;">已定位到</view>
		  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">{{locationString}}</view>
	  </view>
	  <view class="leftLocView" @click="mapClick">
		  <view style="margin-top: 10px;margin-left: 15px;width: 80px;">{{currentlocation}}</view>
		  <u-image style="margin-top: 12px;margin-left: 6px;" :src="downimage"
		  			  width="15px"
		  			  height="8px"></u-image>
		  <u-image style="margin-top: 10px;margin-left: 6px;" :src="locimage"
					  			  width="20px"
					  			  height="20px"></u-image>
		  <view style="height: 40px;margin-top: 10px;margin-left: 30px;color: gray;">|</view>
		  <view style="width: 100px;margin-left: 20px;margin-top: 10px;height: 40px;font-size: 14px;color: gray;">位置/品牌/酒店</view>
	  </view>
	  <view class="lineView"></view>
	  <view class="chooseTimeView">
		  
			<view class="startView" @click="show = true">{{startTime}}
				<u-datetime-picker
				title="请选择入住日期"
				
			                :show="show"
			                v-model="value1"
			                mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
			<view style="width: 20px;margin-top: 12px;margin-right: 5px;">--</view>
			<view class="endView" @click="endshow = true">{{endTime}}
				<u-datetime-picker
				title="请选择离店日期"
				
				            :show="endshow"
				            v-model="value1"
				            mode="date"
							@confirm="endConfirm"
							@cancel="endshow = false"
				    ></u-datetime-picker>
			</view>
			<view class="alldayView">共{{totalnights}}晚</view>
				
	  </view>
	  <view class="lineView"></view>
	  <view class="choosepersonView" v-if="type === '1'" @click="choosePerson">
		  <view class="chooseView">{{room}}房间{{adult}}成人{{children}}儿童</view>
		  <u-image style="margin-top: 17px;margin-left: 6px;" :src="downimage"
		  			  width="15px"
		  			  height="8px"></u-image>
		  <view style="height: 40px;margin-top: 15px;margin-left: 10px;color: gray;">|</view>
		  <view style="margin-left: 10px;color: gray;font-size: 14px;margin-top: 15px;">价格/星级</view>
	  </view>
	  <view class="choosepersonView" v-if="type === '2'" @click="choosePerson">
	  		  <view class="chooseView">{{room}}人,{{adult}}床,{{children}}居</view>
	  </view>
	  <!-- <u-button style="margin-top: 10px;margin-left: 5%;width: 90%;" type="primary" color="#4C9393" text="查 询" @click="checkData"></u-button> -->
	  <view class="buttonView">
		  <view style="width: 50%;height: 30px;color: white;text-align: center;font-size: 14px;margin-top: 15px;" @click="checkData">查询</view>
		  <view style="width: 1px;height: 30px;background-color: white;margin-top: 10px;"></view>
		  <view style="width: 50%;height: 30px;color: white;text-align: center;font-size: 14px;margin-top: 15px;" @click="aiClick">AI订房</view>
	  </view>
	  <view class="tuijianview">推荐酒店</view>
	  <view class="approval_list">
	  		<view
	  		  class="jingdianView_item" v-if="type === '1'"
	  		  v-for="(item, index) in viewsList"
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
	  		  class="jingdianView_item"
	  		  v-for="(item, index) in homestayList" v-if="type === '2'"
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
	  <view>
	  		<u-popup :show="kuangshow" @close="close" @open="open">
	              <view style="display: flex;flex-direction: column;">
	                  <view style="margin-top: 10px; color: black;width: 100%;display: flex;flex-direction: row;"> 
						<view style="margin-left: 15px;margin-top: 10px; color: black;font-size: 20px;width: 3%;" @click="doneClick">x</view>
						<view style="width: 93%;font-size: 14px;text-align: center;margin-top: 10px;">选择客房和入住人数</view>
					  </view>
					  <view style="background-color: aliceblue;margin-top: 10px;width: 100%;border-radius: 3px;height: 30px;">
						  <view style="font-size: 12px;margin-top: 7px;margin-left: 15px;">！入住人数较多时，尝试增加间数</view>
					  </view>
					  <view style="display: flex;flex-direction: row;width: 100%;height: 40px;margin-top: 10px;">
						  <view style="color: black;font-size: 14px;width: 220px;margin-top: 10px;margin-left: 15px;">间数</view>
						  <view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;" @click="minushouse">-</view>
						  <view style="margin-top: 12px;color: black;font-size: 14px;margin-left: 10px;width: 40px;text-align: center;">{{housenumber}}</view>
						  <view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;margin-left: 15px;" @click="addhouse">+</view>
					  </view>
					  <view class="lineView"></view>
					  <view style="display: flex;flex-direction: row;width: 100%;height: 40px;margin-top: 10px;">
							<view style="color: black;font-size: 14px;width: 220px;margin-top: 10px;margin-left: 15px;">成人数</view>
					  		<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;" @click="minusadult">-</view>
					  		<view style="margin-top: 12px;color: black;font-size: 14px;margin-left: 10px;width: 40px;text-align: center;">{{adultnumber}}</view>
					  		<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;margin-left: 15px;" @click="addadult">+</view>
					  </view>
					  <view class="lineView"></view>
					  <view style="display: flex;flex-direction: row;width: 100%;height: 40px;margin-top: 10px;">
						  <view style="display: flex;flex-direction: column;">
							  <view style="color: black;font-size: 14px;width: 220px;margin-top: 7px;margin-left: 15px;">儿童数</view>
							  <view style="margin-top: 3px;font-size: 13px;color: dimgray;margin-left: 15px;">0-17岁</view>
						  </view>
					  		
					  		<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;" @click="minuschildren">-</view>
					  		<view style="margin-top: 12px;color: black;font-size: 14px;margin-left: 10px;width: 40px;text-align: center;">{{childrennum}}</view>
					  		<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 10px;text-align: center;margin-top: 10px;margin-left: 15px;" @click="addchildren">+</view>
					  </view>
					  <view class="lineView"></view>
					  <view style="margin-top: 20px;margin-left: 3%;width: 96%;background-color: royalblue;border-radius: 5px;border: blue solid 1px;height: 40px;margin-bottom: 30px;color: white;align-items: center;text-align: center; justify-content: center;display: flex;" @click="doneClick">完成</view>
	              </view>
	  		</u-popup>
	  		
	  	</view>
	 </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage'; // 引入之前转换的 TS storage 工具
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const locimage = ref("/static/home/homestay.png");
	const downimage = ref('/static/home/downImage.png');
	const locationString = ref("湖北铜山，九宫山附近");
	const currentlocation = ref("湖北铜山");
	const detailLocation = ref("九宫山");
	const startTime = ref("入住日期");
	const endTime = ref("离店日期");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const totalnights = ref("2");
	const room = ref("0");
	const adult = ref("0");
	const children = ref("0");
	const line1show = ref(true);
	const line2show = ref(false);
	const viewsList = ref( [
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
		title: "嘉欣民宿",
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
	const kuangshow = ref(false);
	const housenumber = ref(1);
	const adultnumber = ref(1);
	const childrennum = ref(1);
			
	
	const goBack= () => {
			
		uni.navigateBack()
	};
	//酒店点击
	const hotelClick = () => {
				
		line1show.value = true;
		line2show.value = false;
		type.value = '1';
		console.log( type);
	};
	//民宿点击
	const homestayClick = () => {
		
		line1show.value  = false;
		line2show.value = true;
		type.value = '2';
		console.log( type);
	};
	//地图
	const mapClick = () => {
		uni.navigateTo({
			url:'/pages/home/mapLocation'
		})
	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startTime.value = `${date.getMonth()+1}月${date.getDate()}日`;
		show.value = false;
	};
	//离店日期
	const endConfirm = (e:any) => {
		const date = new Date(e.value);
		endTime.value = `${date.getMonth()+1}月${date.getDate()}日`;
		endshow.value = false;
	};
	//选择房间人员
	const choosePerson = () => {
		kuangshow.value = true
	};
	//减少间数
	const minushouse = () => {
		if (housenumber.value === 0) {
			return;
		} else{
			housenumber.value --;
		}
	};
	const addhouse = () => {
		
		housenumber.value ++;
	};
	const minusadult = () => {
		if (adultnumber.value === 0) {
			return;
		} else{
			adultnumber.value --;
		}
	};
	const addadult = () => {
		
		adultnumber.value ++;
	};
	const minuschildren = () => {
		if (childrennum.value === 0) {
			return;
		} else{
			childrennum.value --;
		}
	};
	const addchildren = () => {
		childrennum.value ++;
	};
	//查询
	const checkData = () => {
				
		uni.navigateTo({
			   
			url: `/pages/home/checkHotels?type=${encodeURIComponent(type.value)}`  
		});
		
	};
	//ai订房
	const aiClick = () => {
		uni.navigateTo({
			url:'/pages/home/aiBookHouse'
		})
	};
	const hoteldetailClick = () => {
				
		 uni.navigateTo({
				
			url: `/pages/home/detailhotel?type=${encodeURIComponent(type.value)}`
		 });
	};
	const doneClick = () => {
		kuangshow.value = false
	};
	const open = () => {
			          // console.log('open');
	};
			 
	const close = () =>  {
		kuangshow.value = false
	  // console.log('close');
	};

	
</script>

<style lang="scss" scoped>
	.container {
		  height: 100%;
		  background: #ffffff;
	 }
	 .flex{
	 	display: flex;
	 }
	 .indicator {
	   position: absolute;
	   bottom: 0;
	   left: 0;
	   width: 50%; /* 根据按钮数量调整 */
	   height: 2px;
	   background-color: #007aff;
	   transition: transform 0.3s ease;
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
		 margin-left: 20px;
		 margin-top: 4px;
		 .whiteLine2{
			 background-color: white;
			 width: 30px;
			 height: 1px;
			 margin-top: 2px;
		 }
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
	 .choosepersonView{
		 width: 100%;
		 height: 50px;
		 display: flex;
		 flex-direction: row;
		 
	 }
	 .chooseView{
		 width: 130px;
		 height: 40px;
		 padding: 15px;
		 
	 }
	 .tuijianview{
		 margin-left: 15px;
		 font-size: 14px;
		 color: black;
		 margin-top: 10px;
		 
	 }
	 .approval_list {
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
	.buttonView{
	         
	        margin-top: 10px;
	        background-color: red;
	        border-radius: 8px;
	        color: white;
	        font-size: 12px;
	        margin-left: 5%; 
	        display: flex;
			flex-direction: row;
	        // justify-content: center; /* 水平居中 */
	        // align-items: center;     /* 垂直居中 */
	        height: 50px;           /* 需要设置高度 */
	        width: 90%;             /* 需要设置宽度 */
			background-color: #2A9595;
	      }
	 
</style>
