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
			<view class="fijinview" v-if="type === '1'">九宫大饭店(铜山九宫山风景区云中胡店)</view>
			<view class="fijinview" v-if="type === '2'">听竹轩民宿</view>
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
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 45%;">设施政策</view>
			<view class="moreview" @click="moreClick">查看更多></view>
		</view>
		<view class="specsView">
			<view class="specs_item" v-for="(item,index) in specsList">
				<u-avatar 
				  :src="item.icon"
				  number="30px"
				  
				></u-avatar>
				<view style="font-size: 11px;color: dimgray;width: 100%;text-align: center;margin-top: 5px;">{{item.title}}</view>
			</view>
		</view>
		<view class="goodsHeaderView">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 50%;">预定选择</view>
		</view>
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
					<view style="width: 20px;margin-top: 5px;display: flex;justify-content: center;align-items: center;">--</view>
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
					<view style="height: 40px;margin-top: 15px;margin-left: 10px;">|</view>
					<view class="chooseView" @click="choosePerson">{{room}}房间{{adult}}成人{{children}}儿童</view>
					<u-image style="margin-top: 21px;" :src="downimage"
								  width="12px"
								  height="6px">
					</u-image>
						
		</view>
		<view class="goodsHeaderView">
			<view style="margin-top: 20px;margin-left: 15px;font-size: 14px;width: 50%;">酒店房型</view>
		</view>
		<view class="hoteltypeView">
			<view class="approval_list">
				<view class="hotel_item" v-for="(item, index) in viewsList"
				:key="index">
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
								<view style="font-size: 13px;color: blue;margin-left: 5px;">{{item.collection}}</view>
							</view>
			  				  	 
			  			</view>
			  			<view class="tagsView">
			  				<view class="roomtag_item"
			  				  	    v-for="(item, index) in roomtagList"
			  				  	    :key="index"
			  				  	  >
			  				  	<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;">{{item.title}}</view>
			  				</view>
			  				  	  
			  				  	  
			  			</view>
			  			<view class="ticketsView">
			  				<view style="font-size: 13px;text-decoration: line-through;text-align: right;margin-right: 10px;margin-top: 5px;">{{item.discount}}</view>
			  				<view style="font-size: 13px;text-align: right;margin-right: 10px;margin-top: 5px;">{{item.tickets}}</view>
			  			</view>
						<view class="buttonView" v-if="type === '1'">
							<view class="roomView" @click="chooseHouseNumClick">
								<view style="margin-left: 3px;">{{choosehousenum}}间</view>
								<image style="margin-left: 4px;width: 10px;height: 4px;":src="downimage"></image>
							</view>
							<view style="border-radius: 4px;border-color: blue;color: white;font-size: 11px;border-width: 1px;text-align: center;margin-left: 10px;width: 40px;height: 20px;background-color: blue;align-items: center;display: flex;justify-content: center;" @click="orderClick">订购</view>
						</view>
						<view class="buttonView" v-if="type === '2'">
							<view style="border-radius: 4px;border-color: blue;color: white;font-size: 11px;border-width: 1px;text-align: center;margin-left: 80%;width: 40px;height: 20px;background-color: blue;align-items: center;display: flex;justify-content: center;" @click="orderClick">订购</view>
						</view>
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
							  <view style="margin-top: 20px;margin-left: 3%;width: 96%;background-color: blue;border-radius: 5px;border: blue solid 1px;height: 40px;margin-bottom: 30px;color: white;align-items: center;text-align: center; justify-content: center;display: flex;" @click="doneClick">完成</view>
						</view>
			</u-popup>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	
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
	const startTime = ref("入住日期");
	const endTime = ref("离店日期");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const totalnights = ref("2");
	const room = ref("0");
	const adult = ref("0");
	const children = ref("0");
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
	const choosehousenum = ref(1);
	const itemList = ref(['1', '2', '3']);
	const type = ref('');
			
		
		
	onLoad((options:any) => {
		
		console.log(options.type); // '123'
		type.value = options.type;
	});
		
	const goBack= () => {
			
		uni.navigateBack()
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
	//查看更多
	const moreClick = () => {
		if ( type.value === '1') {
			
			//酒店政策详情
			uni.navigateTo({
				url:"/pages/home/morepolicy"
			})
			
		} else{
			
			//民宿政策详情
			uni.navigateTo({
				url:"/pages/home/homestayPolicy"
			})
		}
		
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
	const hoteldetailClick = () => {
		uni.navigateTo({
			url:"/pages/home/detailhotel"
		});
	};
	const doneClick = () => {
		kuangshow.value = false
	};
	const open = () => {
			  // console.log('open');
	};
			 
	const close = () => {
		kuangshow.value = false
	  // console.log('close');
	};
	//选择房间数
	const chooseHouseNumClick = () => {
		uni.showActionSheet({
			itemList:  itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log( itemList[res.tapIndex])
				choosehousenum.value =  itemList.value[res.tapIndex]
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//订购
	const orderClick = () => {
				
		uni.navigateTo({
			url:`/pages/home/bookingHouse?type=${encodeURIComponent(type.value)}`
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
			width: 45%;
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
				margin-left: 5px;
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
		.roomView
		{
			margin-left: 60%;
			color: black;
			align-items: center;
			font-size: 12px;
			border: 1px solid black;
			display: flex;
			border-radius: 4px;
			flex-direction: row;
			width: 50px;
			height: 20px;
			
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