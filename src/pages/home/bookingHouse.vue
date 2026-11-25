<template>
    <view class="main">
        <u-navbar
          title="预定中"
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
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="font-size: 15px;margin-top: 10px;margin-left: 15px;" v-if="type === '1'">{{hotel}}</view>
			<view style="font-size: 15px;margin-top: 10px;margin-left: 15px;" v-if="type === '2'">{{homestay}}</view>
			<u-image style="margin-left: 3px;margin-top: 12px;"
			  :src="image"
			  width="15px"
			  height="15px"
			></u-image>
			<u-image style="margin-left: 3px;margin-top: 12px;"
			  :src="image"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view style="display: flex; width: 100%;height: 20px;background-color: aliceblue;margin-top: 10px;padding: 5px;">
			<view style="font-size: 15px;margin-left: 14px;background-color: aliceblue;">已选房型</view>
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
			  				<view style="font-size: 14px;font-weight: bold;">{{item.title}}</view>
			  				<view style="font-size: 13px;">{{item.feeling}}</view>
							<view style="display: flex;flex-direction: row;">
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
			  		</view>
				</view>
			</view>	
		</view>
		<view style="padding: 10px;font-size: 12px;background-color: aliceblue;color: red;">{{yaoqiu}}</view>
		<view class="specsView">
			<view style="display: flex; width: 100%;height: 20px;background-color: aliceblue;margin-top: 10px;padding: 5px;">
				<view style="font-size: 15px;margin-left: 14px;background-color: aliceblue;">预定选择</view>
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
						<view style="width: 20px;margin-top: 15px;margin-right: 5px;">---</view>
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
						<view style="height: 40px;margin-top: 15px;margin-left: 30px;">|</view>
						<view class="chooseView" @click="choosePerson">{{room}}房间{{adult}}成人{{children}}儿童</view>
						<u-image style="margin-top: 21px;" :src="downimage"
									  width="12px"
									  height="6px"></u-image>
							
			</view>
			
			<view style="display: flex;flex-direction: row; width: 100%;height: 20px;background-color: aliceblue;margin-top: 10px;padding: 5px;">
				<view style="font-size: 15px;margin-left: 14px;background-color: aliceblue;width: 80px;">订房信息</view>
				<view style="font-size: 13px;margin-left: 190px;background-color: aliceblue;color: blue;width: 80px;">房间数量：2</view>
			</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 40px;">房间1</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchlocation" placeholder="请输入房间1住客名字" type="text" />
			</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 40px;">房间2</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchlocation" placeholder="请输入房间2住客名字" type="text" />
			</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 55px;">联系电话</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				<input class="searchphone" placeholder="请输入联系电话" type="text" />
			</view>
			<view class="inputView">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 55px;">预计到店</view>
				<view style="font-size: 13px;margin-top: 12px;color: red;">*</view>
				
				      <uni-data-select
				        v-model="value"
				        :localdata="range"
				        @change="change"
				      ></uni-data-select>
				
			</view>
		</view>
		<view style="display: flex; width: 100%;height: 20px;background-color: aliceblue;margin-top: 10px;padding: 5px;">
			<view style="font-size: 15px;margin-left: 14px;background-color: aliceblue;">发票</view>
		</view>
		<view style="width: 100%;height: 20px;font-size: 12px;background-color: aliceblue;padding: 15px;">{{fapiao}}</view>
		<view class="protocalView">
		            <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		            <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		            <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">我已阅读并同意</view>
		            <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="protocalClick">《文旅群苑酒店民宿入住协议》</view>
		            
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 30px;"></view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="font-size: 13px;margin-left: 15px;margin-top: 15px;color: black;width: 60px;">在线支付:</view>
				<view style="color: blue;font-size: 15px;margin-top: 15px;width: 80px;">￥{{allmoney}}</view>
				<view class="order-button" @click="payClick">立即支付</view>
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
	import { ref, reactive, onMounted } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const hotel = ref('九宫山大饭店(铜山九宫山风景区云中胡店)');
	const homestay = ref('听竹轩民宿');
	const image = ref("/static/home/homestay.png");
	const viewsList = ref([
	  {
		image: "/static/home/homestay.png",
		title: "阳光双床房",
			  feeling:"2张1.5米单人床 2人入住 18㎡ 不可吸烟",
			  dianping:"无早餐",
			  collection:"入住当天18：00前可取消",
			  discount:"原价￥70",
			  tickets:"现价￥65起",
			  id:"11111",
	  }
	]);
	const roomtagList = ref([
		{
			title:"在线付"
		},
		{
			title:"立即确认"
		},
		
	]);
	const yaoqiu = ref('景区要求：酒店位于景区内，进入酒店需购买景区门票，请提前联系酒店，确认景区营业时间及门票购买事宜');
	const startTime = ref("入住日期");
	const endTime = ref("离店日期");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const totalnights = ref("2");
	const room = ref("0");
	const adult = ref("0");
	const children = ref("0");
	const downimage = ref('/static/home/downImage.png');
	const kuangshow = ref(false);
	const housenumber = ref(1);
	const adultnumber = ref(1);
	const childrennum = ref(1);
	const chooseDaoDianTime = ref('请选择');
	const fapiao = ref('酒店开票(仅普票，请前往前台领取)');
	const selected = ref(false);
	const allmoney = ref('228');
	const value = ref(0);
	const range = ref([
			  { value: 0, text: "15分钟内办理入住" },
			  { value: 1, text: "次日6：00前办理入住" },
			  
			]);
	const type = ref('1');
	
	onLoad((options:any) => {
		
		console.log(options.type);
		type.value = decodeURIComponent(options.type);
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
	//选择房间人员
	const choosePerson = () => {
		 kuangshow.value = true
	};
	//减少间数
	const minushouse = () => {
		if ( housenumber.value === 0) {
			return;
		} else{
			 housenumber.value --;
		}
	};
	const addhouse = () => {
		
		 housenumber.value ++;
	};
	const minusadult = () => {
		if ( adultnumber.value === 0) {
			return;
		} else{
			 adultnumber.value --;
		}
	};
	const addadult = () => {
		
		 adultnumber.value ++;
	};
	const minuschildren = () => {
		if ( childrennum.value === 0) {
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
	const open = () =>  {
			  // console.log('open');
	 };
	 
	const close = () =>  {
		  kuangshow.value = false
	  // console.log('close');
	};
	const change = (e) => {
			console.log("e:", e);
	};
	const chooseselect = () => {
		 selected.value = ! selected;
	};
	//房型介绍
	const houseTypeClick = () => {
		
		if ( type.value === '1') {
			
			uni.navigateTo({
				url:'/pages/home/houseType'
			})
			
		} else{
			
			uni.navigateTo({
				url:'/pages/home/homestayHouseType'
			})
		}
		
	};
	//去付钱
	const payClick = () => {
		
		uni.navigateTo({
			url:'/pages/home/payBookingHouse'
		})
		
	};
	//协议
	const protocalClick = () => {
		uni.navigateTo({
			url:'/pages/home/hotelProtocal'
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
	 .hoteltypeView{
	 	display: flex;
	 	
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
	 		margin-top: 10px;
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
	 .specsView{
		 width: 100%;
		 height: 290px;
		 background-color: aliceblue;
		 margin-top: 10px;
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
	 .inputView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
	 }
	 .searchlocation{
	          margin-left: 20px;
	          width: 290px;
	          height: 25px;
	          margin-top: 10px;
	          border: 1px lightgray solid;
	          border-radius: 5px;
	          font-size: 13px;
	}
	.searchphone{
		margin-left: 20px;
		width: 270px;
		height: 25px;
		margin-top: 10px;
		border: 1px lightgray solid;
		border-radius: 5px;
		font-size: 13px;
		display: flex;
		flex-direction: row;
	}
	.protocalView{
	         display: flex;
	         flex-direction: row;
	         width: 100%;
			 height: 50px;
	}
	.footer-container {
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  height: 50px;
	  background-color: white;
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
		height: 25px;           /* 需要设置高度 */
		width: 80px;
		margin-right: 10px;
		font-size: 13px;
		color: white;
		background-color: royalblue;
		border-radius: 6px;
		margin-left: 120px;
		margin-top: 10px;
	}
}
</style>