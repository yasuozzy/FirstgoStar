<template>
    <view class="main">
        <u-navbar
          title="预约订单"
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
		  <template #right>
			  <view slot="right" @click="parkingClick">
				  <view class="homestayView">预约停车</view>
			  </view>
		  </template>
        </u-navbar>
		<view class="searchView">
			<input class="searchlocation" placeholder="搜索" type="text" />
		</view>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">全部</view>
				<view v-else style="color: black;font-size: 13px;">全部</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">待付款</view>
				<view v-else style="color: black;font-size: 13px;">待付款</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">待使用</view>
				<view v-else style="color: black;font-size: 13px;">待使用</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type === '4'" style="color: #2A9595;font-size: 13px;">待评价</view>
				<view v-else style="color: black;font-size: 13px;">待评价</view>
				<view class="whiteLine" v-if="type === '4'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type === '5'" style="color: #2A9595;font-size: 13px;">退款/售后</view>
				<view v-else style="color: black;font-size: 13px;">退款/售后</view>
				<view class="whiteLine" v-if="type === '5'"></view>
			</view>
			
		</view>
		<view class="listView">
			<view class="goods_item" v-for="(item,index) in orderList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 70%;">{{item.hoteName}}</view>
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;color: #2A9595;width: 20%;text-align: right;">{{item.status}}</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;background-color: aliceblue;">
					<u-image style="margin-top: 10px;margin-left: 15px;margin-bottom: 10px;"
					  :src="item.icon"
					  width="80px"
					  height="80px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;">
						<view style="display: flex;flex-direction: row;">
							<view style="font-size: 13px;width: 70%;">{{item.houseName}}</view>
							<view style="font-size: 13px;text-align: right;width: 25%;margin-left: 30px;">￥{{item.price}}</view>
						</view>
						<view style="display: flex;flex-direction: row;margin-top: 10px;">
							<view style="font-size: 13px;">{{item.deadline}}</view>
							<view style="font-size: 13px;margin-left: 100px;">x{{item.num}}</view>
						</view>
						<view style="font-size: 13px;margin-top: 10px;">{{item.specs}}</view>
					</view>
				</view>
				<view v-if="type === '1' || type === '3' || type === '4'" style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.goodsnum}}件商品,合计:￥{{item.total}} </view>
				<view v-if="type === '2'" class="buttonView">去付款</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 5px;"></view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const orderList = ref([
		{hoteName:'九宫山国际大酒店',status:'商家已确认',icon:'/static/home/homestay.png',houseName:'阳光大床房',price:'114.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'2房间1成人0儿童',goodsnum:'2',total:'228.00'},
		{hoteName:'九宫山国际大酒店',status:'商家已确认',icon:'/static/home/homestay.png',houseName:'阳光大床房',price:'114.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'2房间1成人0儿童',goodsnum:'2',total:'228.00'},
		{hoteName:'九宫山国际大酒店',status:'商家已确认',icon:'/static/home/homestay.png',houseName:'阳光大床房',price:'114.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'2房间1成人0儿童',goodsnum:'2',total:'228.00'},
		
	]);
           
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
	const segment4Click = () => {
		
		type.value = "4";
		
	};
	const segment5Click = () => {
		
		type.value = "5";
		uni.navigateTo({
			url:'/pages/mine/yuyueOrder/afterSale'
		})
		
	};
	//详情
	const detailClick = () => {
		uni.navigateTo({
			url:'/pages/home/messageDetail'
		})
	};
	const parkingClick = () => {
		uni.navigateTo({
			url:'/pages/mine/yuyueOrder/parkingReservation'
		})
	};
       
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: aliceblue;
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
	 .searchView{
	 		 width: 100%;
	 		 height: 40px;
	 		 background-color: aliceblue;
	 		 
	 }
	 .searchlocation{
	          margin-left: 4%;
	          width: 92%;
	          height: 40px;
	          margin-top: 10px;
	          background-color: white;
	          border-radius: 5px;
	          font-size: 13px;
	      }
	 .specsView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 margin-top: 10px;
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .listView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 .goods_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 height: 170px;
			 background-color: white;
		}
	 }
	 .buttonView{
              
             margin-top: 5px;
             background-color: #2A9595;
             border-radius: 5px;
             color: white;
             font-size: 12px;
             margin-left: 260px; 
             display: flex;
             justify-content: center; /* 水平居中 */
             align-items: center;     /* 垂直居中 */
             height: 20px;           /* 需要设置高度 */
             width: 100px;             /* 需要设置宽度 */
    }

    }
</style>