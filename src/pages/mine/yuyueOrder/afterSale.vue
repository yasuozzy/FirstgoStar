<template>
    <view class="main">
        <u-navbar
          title="售后"
          
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
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">售后申请</view>
				<view v-else style="color: black;font-size: 15px;">售后申请</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">申请记录</view>
				<view  v-else style="color: black;font-size: 15px;">申请记录</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view class="listView">
			<view class="goods_item" v-for="(item,index) in orderList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;">订单编号{{item.ordernum}}</view>
					<view style="margin-top: 10px;font-size: 13px;width: 45%;text-align: right;">{{item.ordertime}}</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;background-color: aliceblue;">
					<u-image style="margin-top: 10px;margin-left: 15px;"
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
				<view  class="buttonView">申请售后</view>
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
		{ordernum:'2025154789546',status:'商家已确认',icon:'/static/home/homestay.png',houseName:'阳光大床房',price:'114.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'2房间1成人0儿童',goodsnum:'2',total:'228.00',ordertime:'2025-02025 8:25:22'},
		{ordernum:'2025154789546',status:'商家已确认',icon:'/static/home/homestay.png',houseName:'阳光大床房',price:'114.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'2房间1成人0儿童',goodsnum:'2',total:'228.00',ordertime:'2025-02025 8:25:22'},
		{ordernum:'2025154789546',status:'商家已确认',icon:'/static/home/homestay.png',houseName:'阳光大床房',price:'114.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'2房间1成人0儿童',goodsnum:'2',total:'228.00',ordertime:'2025-02025 8:25:22'},
		
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
		margin-top: 10px;
	 	height: 50px;
	 	
	 }
	 .whiteLine{
	 		 margin-left: 40%;
	 		 margin-top: 5px;
	 		 width: 20%;
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