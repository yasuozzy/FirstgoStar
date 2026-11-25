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
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<view class="locationView" @click="mapClick">
				  <u-image style="margin-top: 6px;margin-left: 6px;" :src="locimage"
					  width="20px"
					  height="20px"></u-image>
				  <view style="color: blue;font-size: 13px;margin-top: 6px;margin-left: 10px;">已定位到</view>
				  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">{{locationString}}</view>
		</view>		
				
		<view class="leftLocView">
				  <view style="margin-top: 10px;margin-left: 15px;width: 80px;">{{currentlocation}}</view>
				  <u-image style="margin-top: 10px;margin-left: 6px;" :src="locimage"
				  			  width="20px"
				  			  height="20px"></u-image>
				  <u-image style="margin-top: 10px;margin-left: 6px;" :src="locimage"
							  			  width="20px"
							  			  height="20px"></u-image>
				  <view style="height: 40px;margin-top: 10px;margin-left: 30px;">|</view>
				  <view style="width: 100px;margin-left: 20px;margin-top: 10px;height: 40px;font-size: 14px;">{{detailLocation}}</view>
		</view>
		<view class="lineView"></view>
		<view class="yudingView">
			<view class="orderView">
				<view style="display: flex;flex-direction: row;font-size: 13px;">
					<view style="margin-top: 10px;">预订人数:</view>
					<view style="border: 1px lightgray solid;border-radius: 3px;margin-top: 10px;font-size: 12px;margin-left: 20px;width: 60%;height: 20px;text-align: center;" @click="choosePersonClick">{{eatNumber}}</view>
				</view>
				<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
				<view style="display: flex;flex-direction: row;font-size: 14px;">
					<view style="margin-top: 10px;">预订时间:</view>
					<view style="border: 1px lightgray solid;border-radius: 3px;margin-top: 10px;font-size: 12px;margin-left: 20px;width: 60%;height: 20px;text-align: center;" @click="chooseEatTimeClick">{{eattime}}</view>
				</view>
			</view>
			<view class="buttonView" @click="checkShopsClick">查询</view>
		</view>
		<view class="greenHeaderView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view style="color: white;font-size: 15px;">景区商圈</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  style="color: white;font-size: 15px;">预付商圈</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment3Click">
				<view  style="color: white;font-size: 15px;">特产商城</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
		</view>
		<view v-if="type === '1'">
			<view class="specsView">
				<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
					<view v-if="kind === '1'" style="color: #2A9595;font-size: 13px;">全部</view>
					<view v-else style="color: black;font-size: 13px;">全部</view>
					<view class="whiteLine1" v-if="kind === '1'"></view>
				</view>
				<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
					<view v-if="kind === '2'" style="color: #2A9595;font-size: 13px;">五金土产</view>
					<view v-else style="color: black;font-size: 13px;">五金土产</view>
					<view class="whiteLine1" v-if="kind === '2'"></view>
				</view>
				<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
					<view v-if="kind === '3'" style="color: #2A9595;font-size: 13px;">健康医疗</view>
					<view v-else style="color: black;font-size: 13px;">健康医疗</view>
					<view class="whiteLine1" v-if="kind === '3'"></view>
				</view>
				<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
					<view v-if="kind === '4'" style="color: #2A9595;font-size: 13px;">商超百货</view>
					<view v-else style="color: black;font-size: 13px;">商超百货</view>
					<view class="whiteLine1" v-if="kind === '4'"></view>
				</view>
				<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind5Click">
					<view v-if="kind === '5'" style="color: #2A9595;font-size: 13px;">喜糖</view>
					<view v-else style="color: black;font-size: 13px;">喜糖</view>
					<view class="whiteLine1" v-if="kind === '5'"></view>
				</view>
			</view>
			<view style="background-color: lightgray;width: 100%;height: 1px;"></view>
			<view class="zongheView">
				<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="zonghe1Click">
					<view v-if="zonghe === '1'" style="color: #2A9595;font-size: 13px;">综合</view>
					<view v-else style="color: black;font-size: 13px;">综合</view>
				</view>
				<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="zonghe2Click">
					<view v-if="zonghe === '2'" style="color: #2A9595;font-size: 13px;">销量</view>
					<view v-else style="color: black;font-size: 13px;">销量</view>
				</view>
				<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="zonghe3Click">
					<view v-if="zonghe === '3'" style="color: #2A9595;font-size: 13px;">距离</view>
					<view v-else style="color: black;font-size: 13px;">距离</view>
					
				</view>
				<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="zonghe4Click">
					<view v-if="zonghe === '4'" style="color: #2A9595;font-size: 13px;">评价</view>
					<view v-else style="color: black;font-size: 13px;">评价</view>
				</view>
			</view>
			<view style="background-color: lightgray;width: 100%;height: 1px;margin-top: 10px;"></view>
			<view class="goodsView">
				<view class="goods_item" v-for="(item,index) in goodsList">
					<u-image style="border-radius: 4px;margin-top: 10px;margin-left: 15px;"
					  :src="item.image"
					  width="80px"
					  height="70px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 75%;">
						<view style="font-size: 14px;margin-top: 10px;margin-left: 5px;">{{item.title}}</view>
						<view style="font-size: 12px;color: yellow;margin-top: 5px;margin-left: 5px;">{{item.integral}}</view>
						<view style="font-size: 12px;color: red;margin-top: 5px;margin-left: 5px;color: #2A9595;">暂无优惠券</view>
					</view>
					<view style="font-size: 12px;color: gray;margin-top: 30px;width: 50px;">{{item.distance}}</view>
				</view>
			</view>
		</view>
		<view v-if="type === '2'">
			<view class="zongheView">
				<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="zonghe1Click">
					<view v-if="zonghe === '1'" style="color: #2A9595;font-size: 13px;">综合</view>
					<view v-else style="color: black;font-size: 13px;">综合</view>
				</view>
				<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="zonghe2Click">
					<view v-if="zonghe === '2'" style="color: #2A9595;font-size: 13px;">距离</view>
					<view v-else style="color: black;font-size: 13px;">距离</view>
				</view>
			</view>
			<view style="background-color: lightgray;width: 100%;height: 1px;margin-top: 10px;"></view>
			<view class="goodsView">
				<view class="goods_item" v-for="(item,index) in yufuList">
					<u-image style="border-radius: 4px;margin-top: 10px;margin-left: 15px;"
					  :src="item.image"
					  width="80px"
					  height="70px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 75%;">
						<view style="font-size: 14px;margin-top: 10px;margin-left: 5px;">{{item.title}}</view>
						<view style="font-size: 12px;color: yellow;margin-top: 5px;margin-left: 5px;height: 15px;"></view>
						<view style="font-size: 12px;color: red;margin-top: 5px;margin-left: 5px;color: #2A9595;">{{item.kind}}</view>
					</view>
					<view style="font-size: 12px;color: gray;margin-top: 30px;width: 50px;">{{item.distance}}</view>
				</view>
			</view>
		</view>
		<view v-if="type === '3'">
			<view class="swiper">
			  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
			</view>
			<view class="scrollActive">
				<view class="locationView">
						  <u-image style="margin-top: 6px;margin-left: 6px;" :src="locimage"
							  width="50px"
							  height="20px"></u-image>
						  <u-image style="margin-top: 9px;margin-left: 65%;" :src="locimage"
						  							  width="8px"
						  							  height="12px"></u-image>
						  <view style="color: black;font-size: 13px;margin-top: 6px;margin-left: 10px;">more</view>
				</view>		
			</view>
			<view class="financial_situation">
			
			  <view class="situation_contect">
			    <view
			      class="situation_item"
			      v-for="(item, index) in financialList"
			      :key="index" @click="jumpTo(item.text)"
			    >
				  <u-image
				    :src="item.image"
				    width="70px"
				    height="60px"
				  ></u-image>
			      <view class="item_text">{{ item.text }}</view>
			    </view>
			  </view>
			  
			</view>
			<view class="scrollActive">
				  <view style="color: hotpink;font-size: 20px;margin-top: 8px;text-align: center;width: 100%;">”  好店推荐  “</view>
			</view>
			<view class="approval_list">
				<view class="politic_contect">
					<view class="politic_item" v-for="(item,index) in goodShopList" :key="index">
						<image :src="item" :mode="scaleToFill" style="width: 95%;height: 70px;"></image>
					</view>
				</view>
			</view>
			
			<view class="financial_situation">
			
			  <view class="situation_contect">
			    <view
			      class="situation_item"
			      v-for="(item, index) in goodShopList"
			      :key="index" @click="goodsClick()"
			    >
				  <image :src="item" :mode="scaleToFill" style="height: 70px;width: 80px;"></image>
			    </view>
			  </view>
			  
			</view>
			<view class="scrollActive">
				  <view style="color: cyan;font-size: 20px;margin-top: 8px;text-align: center;width: 100%;">”  好物推荐  “</view>
			</view>
			<view class="approval_list">
				<view class="politic_contect">
					<view class="haowu_item" v-for="(item,index) in haowuList" :key="index">
						<image :src="item.image"  style="width: 90%;height: 200px;border-radius: 5px;"></image>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;text-align: left;">{{item.name}}</view>
						<view style="display: flex;flex-direction: row;margin-top: 10px;">
							<view style="margin-left: 15px;text-align: left;color: red;">{{item.price}}</view>
							<image :src="item.shopcart" :mode="scaleToFill" style="width: 15px;height: 15px;margin-top: 5px;margin-left: 40px;"></image>
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
	// 轮播图列表
	const swiperList = ref([
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	  "/static/home/swiper.png",
	]);
	const locimage = ref("/static/home/homestay.png");
	const locationString = ref("湖北铜山，九宫山附近");
	const currentlocation = ref("湖北铜山");
	const detailLocation = ref("九宫山");
	const eatNumber = ref('请选择就餐人数');
	const eattime = ref('请选择就餐时间');
	const type = ref("1");
	const kind = ref("1");
	const zonghe = ref("1");
	const goodsList = ref([
				{image:"/static/home/swiper.png",title:"华康医院",integral:"5.0",distance:"<20米"},
				{image:"/static/home/swiper.png",title:"群苑生活中心",integral:"5.0",distance:"<174米"},
				{image:"/static/home/swiper.png",title:"潍坊银行助农点活动专区",integral:"5.0",distance:"<96米"},
				{image:"/static/home/swiper.png",title:"群苑服务中心",integral:"5.0",distance:"<150米"},
	]);
	const yufuList = ref([
				{image:"/static/home/swiper.png",title:"福楼美食",kind:"快餐便当",distance:"<20米"},
				{image:"/static/home/swiper.png",title:"多福美食",kind:"快餐便当",distance:"<174米"},
				{image:"/static/home/swiper.png",title:"快餐便当",kind:"快餐便当",distance:"<96米"},
				{image:"/static/home/swiper.png",title:"群苑服务中心",kind:"快餐便当",distance:"<150米"},
	]);
	const financialList = ref([
	  {
		image: "/static/home/homestay.png",
		text: "海鲜农贸",
	  },
	  {
		image: "/static/home/food.png",
		text: "三农中心",
	  },
	  {
		image: "/static/home/admission.png",
		text: "华海专营",
	  },
	  {
		image: "/static/home/emergency.png",
		text: "积分商城",
	  },
	  {
		image: "/static/home/ride.png",
		text: "百货数码",
	  },
	  {
		image: "/static/home/offer.png",
		text: "建材家居",
	  },
	  {
		image: "/static/home/ride.png",
		text: "五金机电",
	  },
	  {
		image: "/static/home/offer.png",
		text: "婚庆用品",
	  },
	]);
	const goodShopList = ref([
		"/static/home/swiper.png",
		"/static/home/swiper.png",
		"/static/home/swiper.png",
		"/static/home/swiper.png",
	]);
	const haowuList = ref([
		{image:"/static/home/swiper.png",name:"农家手工老面馒头",price:"￥5.88",shopcart:"/static/home/swiper.png"},
		{image:"/static/home/swiper.png",name:"农家手工老面馒头",price:"￥5.88",shopcart:"/static/home/swiper.png"},
	]);
	const itemList = ref(['1至5人', '5至10人', '10人以上']);
	const timeList = ref(['上午11：00到13：30','下午18：00到19：00']);
			
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
	const kind1Click = () => {
				
		kind.value = "1";
		
	};
	const kind2Click = () => {
				
		kind.value = "2";
		
	};
	const kind3Click = () => {
				
		kind.value = "3";
		
	};
	const kind4Click = () => {
				
		kind.value = "4";
		
	};
	const kind5Click = () => {
				
		kind.value = "5";
		
	};
	const zonghe1Click = () => {
				
		zonghe.value = "1";
	};
	const zonghe2Click = () => {
				
		zonghe.value = "2";
	};
	const zonghe3Click = () => {
				
		zonghe.value = "3";
	};
	const zonghe4Click = () => {
				
		zonghe.value = "4";
	};
	//选择就餐人数
	const choosePersonClick = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				eatNumber.value = itemList.value[res.tapIndex]
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const chooseEatTimeClick = () => {
		uni.showActionSheet({
			itemList: timeList.value,
			success: (res) => {
				
				eattime.value = timeList.value[res.tapIndex]
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//查询
	const checkShopsClick = () => {
		uni.navigateTo({
			url:"/pages/home/checkShops"
		})
	};
	const jumpTo = () => {
				
	};
	//地图
	const mapClick = () => {
		uni.navigateTo({
			url:'/pages/home/mapLocation'
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
		.yudingView{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 100px;
			
		}
		.orderView{
			display: flex;
			flex-direction: column;
			margin-left: 3%;
			width: 60%;
			margin-top: 10px;
		}
		.buttonView
		{
			 display: flex;
			 margin-top: 10px;
			background-color: royalblue;
			border-radius: 8px;
			color: white;
			font-size: 12px;
			margin-left: 4%;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 80px;           /* 需要设置高度 */
			width: 30%;             /* 需要设置宽度 */
			margin-top: 10px;
		}
		.greenHeaderView{
			display: flex;
			flex-direction: row;
			background-color: #2A9595;
			width: 100%;
			height: 50px;
			margin-top: 20px;
		}
		.whiteLine{
				 margin-left: 30%;
				 margin-top: 5px;
				 width: 40%;
				 height: 2px;
				 background-color: white;
		}
		.specsView{
				 width: 100%;
				 height: 50px;
				 display: flex;
				 flex-direction: row;
				 
				 background-color: aliceblue;
				 
		}
		.whiteLine1{
				 margin-left: 20%;
				 margin-top: 7px;
				 width: 60%;
				 height: 2px;
				 background-color: #2A9595;
		}
		.zongheView{
			width: 100%;
			height: 40px;
			display: flex;
			flex-direction: row;
			
			background-color: white;
		}
		.goodsView{
				  display: flex;
				  flex-direction: column;
				  width: 100%;
				  
		}
		.goods_item{
				  display: flex;
				  flex-direction: row;
				  margin-top: 10px;
		}
		.scrollActive{
			background-color: aliceblue;
			width: 100%;
			height: 50px;
			display: flex;
		}
		.financial_situation {
		  width: 100%;
		  background: #fff;
		  // padding: 15px;
		  margin-top: 10px;
		  box-sizing: border-box;
		  .situation_top {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    justify-content: space-between;
		    .situation_title {
		      color: #333;
		    }
		    .situation_date {
		      ::v-deep .uni-select {
		        border-bottom: 1px solid #ccc;
		      }
		    }
		}
	}
		  .situation_contect {
		    display: flex;
		    flex-direction: row;
		    flex-wrap: wrap;
		    align-items: center;
			  // gap: 24upx;
		    justify-content: space-evenly;
		    .situation_item {
		      width: 25%;
		      font-size: 13px;
				// margin-right: 24upx;
		      color: #000;
		      box-sizing: border-box;
		      display: flex;
		      flex-direction: column;
		      align-items: center;
		      height: 130upx;
				margin-bottom: 64upx;
				.item_text{
					margin-top: 6upx;
				}
		    }
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