<template>
    <view class="main">
        <u-navbar
          title="AI订房"
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
				  <view style="color: blue;font-size: 13px;margin-top: 6px;margin-left: 10px;">已定位到</view>
				  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">{{locationString}}</view>
		</view>
		<view class="leftLocView" @click="mapClick">
				  <view style="margin-top: 10px;margin-left: 15px;width: 80px;">{{currentlocation}}</view>
				  <u-image style="margin-top: 18px;margin-left: 6px;" :src="downimage"
				  			  width="13px"
				  			  height="6px"></u-image>
				  <u-image style="margin-top: 10px;margin-left: 6px;" :src="locimage"
							  			  width="20px"
							  			  height="20px"></u-image>
				  <view style="height: 40px;margin-top: 10px;margin-left: 30px;">|</view>
				  <view style="width: 100px;margin-left: 20px;margin-top: 10px;height: 40px;font-size: 14px;">{{detailLocation}}</view>
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
		<view class="housetypeView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 30%;">房型</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;color: dimgray;width: 58%;text-align: right;" @click="chooseClick">请选择 ></view>
		</view>
		<view class="lineView"></view>
		<view class="housetypeView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 30%;">酒店市场价格</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;color: dimgray;width: 58%;text-align: right;" @click="chooseClick">请选择 ></view>
		</view>
		<view class="lineView"></view>
		<view class="housetypeView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 30%;color: royalblue;">我出价</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;color: dimgray;width: 58%;text-align: right;" @click="chooseClick">请输入 ></view>
		</view>
		<view class="selectView">
			<u-checkbox :checked="breakfast" :active-color="bgColor" labelColor="#000000" :customStyle="{marginBottom: '8px'}" label="含早餐">
			</u-checkbox>
		</view>
		<view v-if="zhuijia === 1" class="zhuijiabutton" @click="chooseClick">追加房型</view>
		<view class="buttonView" @click="aiClick">AI为您筛选满意酒店</view>
		<view class="tuijianview">推荐酒店</view>
		<view class="approval_list">
				<view
				  class="jingdianView_item"
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
				
				
		</view>
		<view>
				<u-popup :show="kuangshow" @close="close" @open="open">
		            <view style="display: flex;flex-direction: column;">
		                <view style="margin-top: 10px; color: black;width: 100%;display: flex;flex-direction: row;"> 
								
							<view style="width: 93%;font-size: 14px;text-align: center;margin-top: 10px;">房型/价格/我出价</view>
							<view style="margin-top: 10px; color: black;font-size: 20px;width: 3%;" @click="doneClick">x</view>
						</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">房型(单选)</view>
						<view class="housetypeChoose">
							
							<u-checkbox
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, index) in housetypeList"
								:key="index"
								shape="circle"
								:checked="selectedValue === item.value"
								 @change="handleChange(item.value)"
								:label="item.name"
								            >
							</u-checkbox>
							
						</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">酒店市场价格(单选)</view>
						<view class="housepriceChoose">
							
							<u-checkbox
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, index) in housepriceList"
								:key="index"
								shape="circle"
								:checked="priceValue === item.value"
								 @change="handlepriceChange(item.value)"
								:label="item.name"
								            >
							</u-checkbox>
							
						</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">请出价(AI建议75-85元)</view>
						<input class="searchlocation" placeholder="请输入价格" type="text" />
						<view class="houseBumberView">
							<view style="color: black;font-size: 14px;width: 220px;margin-top: 10px;margin-left: 15px;">房间数量</view>
							<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 3px;text-align: center;margin-top: 10px;" @click="minushouse">-</view>
							<view style="margin-top: 12px;color: black;font-size: 14px;margin-left: 10px;width: 40px;text-align: center;">{{housenumber}}</view>
							<view style="width: 20px;height: 20px;border: blue solid 1px;color: blue;border-radius: 3px;text-align: center;margin-top: 10px;margin-left: 15px;" @click="addhouse">+</view>
						</view>
						<view style="margin-top: 20px;margin-left: 3%;width: 96%;background-color: royalblue;border-radius: 5px;border: blue solid 1px;height: 40px;margin-bottom: 30px;color: white;align-items: center;text-align: center; justify-content: center;display: flex;" @click="doneClick">完成</view>
		            </view>
				</u-popup>
				
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
	const startTime = ref("入住日期");
	const endTime = ref("离店日期");
	const totalnights = ref("2");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref( Number(new Date()));
	const viewsList = ref([
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
	const roomtagList =ref([
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
	// 酒店类型
	const housetypeList = ref([{
						name: '大床房',
						value: 'option1'
					},
					{
						name: '双床房',
						value: 'option2'
					},
					{
						name: '套房',
						value: 'option3' 
					},
					{
						name: '多床房',
						value: 'option4'
					}
	 ]);
	const selectedValue = ref('option2'); // 当前选中的值
	  // 酒店类型
	const housepriceList = ref([
					  {
						  name: '100-150',
						  value: 'option1'
					  },
					  {
						  name: '130-200',
						  value: 'option2'
					  },
					  {
						  name: '160-260',
						  value: 'option3' 
					  },
					  {
						  name: '200-300',
						  value: 'option4'
					  },
					  {
						  name: '250-380',
						  value: 'option5'
					  },
					  {
						  name: '300-450',
						  value: 'option6'
					  },
					  {
						  name: '400-600',
						  value: 'option7' 
					  },
					  {
						  name: '500-800',
						  value: 'option8'
					  },
					  {
						  name: '700-1000',
						  value: 'option9'
					  }
	   ]);
	const priceValue = ref('option2'); // 当前选中的值
	const breakfast = ref(true);
	const housenumber = ref(1);
	const zhuijia = ref(1);
					
      
    const goBack= () => {
                   
        uni.navigateBack()
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
	//底部弹出框
	const chooseClick = () => {
		kuangshow.value = true
	};
	const handleChange = (value:any) => {
		selectedValue.value = value;
	};
	const handlepriceChange = (value:any) => {
		priceValue.value = value;
	};
	const hoteldetailClick = () => {
		uni.navigateTo({
			url:'/pages/home/aihotelDetail'
		})
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
	//ai 筛选酒店
	const aiClick = () => {
		uni.navigateTo({
			url:'/pages/home/priceOrderHouse'
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
		.housetypeView{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 40px;
		}
		.selectView{
			margin-top: 5px;
			margin-left: 15px;
		}
		.buttonView{
		          
		    margin-top: 20px;
		    background-color: royalblue;
		    border-radius: 5px;
		    color: white;
		    font-size: 15px;
		    margin-left: 5%; 
		    display: flex;
		    justify-content: center; /* 水平居中 */
		    align-items: center;     /* 垂直居中 */
		    height: 50px;           /* 需要设置高度 */
		    width: 90%;             /* 需要设置宽度 */
		}
		.tuijianview{
			 padding: 15px;
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
		.housetypeChoose{
			display: grid;
			grid-template-columns: repeat(2, 1fr); /* 两列 */
			grid-gap: 10px; /* 间距 */
			margin-left: 15px;
			margin-top: 15px;
			
		}
		.housepriceChoose{
			display: grid;
			grid-template-columns: repeat(3, 1fr); /* 两列 */
			grid-gap: 10px; /* 间距 */
			margin-left: 15px;
			margin-top: 15px;
		}
		.searchlocation{
		 margin-left: 4%;
		 width: 92%;
		 height: 35px;
		 margin-top: 10px;
		 border: 1px royalblue solid;
		 border-radius: 5px;
		 font-size: 13px;
	 }
	 .houseBumberView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
		 margin-top: 5px;
	 }
	 .zhuijiabutton{
		 margin-top: 20px;
		 background-color: white;
		 border-radius: 5px;
		 color: royalblue;
		 font-size: 15px;
		 margin-left: 5%; 
		 display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
		 height: 50px;           /* 需要设置高度 */
		 width: 90%;             /* 需要设置宽度 */
		 border: 1px royalblue solid;
	 }
    }
</style>