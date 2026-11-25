<template>
    <view class="main">
        <u-navbar
          title="AI订单"
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
		<view class="searchView">
			<input class="searchlocation" placeholder="搜索" type="text" />
		</view>
		<view class="specsView">
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">全部</view>
				<view v-else style="color: black;font-size: 13px;">全部</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">待接单</view>
				<view v-else style="color: black;font-size: 13px;">待接单</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">待支付</view>
				<view v-else style="color: black;font-size: 13px;">待支付</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type === '4'" style="color: #2A9595;font-size: 13px;">待入驻</view>
				<view v-else style="color: black;font-size: 13px;">待入住</view>
				<view class="whiteLine" v-if="type === '4'"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type === '5'" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="type === '5'"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment6Click">
				<view v-if="type === '6'" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine" v-if="type === '6'"></view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view class="orderlistView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;margin-left: 10px;">
					<view style="width: 75%;font-size: 15px;margin-top: 10px;">订单编号：{{item.orderNumber}}</view>
					<view style="font-size: 14px;color: #2A9595;margin-left: 20px;margin-top: 10px;">{{item.status}}</view>
				</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 5px;">支付状态：{{item.paystatus}}</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 5px;">入住时间：{{item.intime}}</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 5px;">离开时间：{{item.outtime}}</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 5px;">房型：{{item.housetype}}</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 5px;">数量：{{item.num}}</view>
				<view style="font-size: 13px;margin-left: 10px;margin-top: 5px;">出价：￥{{item.price}}</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
				<view v-if="type === '1'" style="width: 100%;">
					<view  class="buttonView" @click="detailClick">查看详情</view>
				</view>
				<view v-if="type === '2'" style="width: 100%;display: flex;flex-direction: row;">
					<view class="addprice" @click="addpriceClick">加价</view>
					<view class="changehouse" @click="changehouseClick">换房</view>
				</view>
				<view v-if="type === '3'" style="width: 100%;">
					<view  class="buttonView" @click="payClick">去支付</view>
				</view>
				<view v-if="type === '4'" style="width: 100%;">
					<view  class="buttonView" @click="tijiaoClick">提交入住信息</view>
				</view>
				<view v-if="type === '5'" style="width: 100%;display: flex;flex-direction: row;">
					<view class="xuhouse" @click="xuhouseClick">续房</view>
					<view class="cancelehouse" @click="cancelhouseClick">退房</view>
					<view class="detail" @click="detailClick">查看详情</view>
				</view>
				<view v-if="type === '6'" style="width: 100%;">
					<view  class="buttonView" @click="detailClick">查看详情</view>
				</view>
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
		{orderNumber:'202578954125632',status:'已取消',paystatus:'未支付',intime:'2025-07-26',outtime:'2025-07-30',housetype:'大床房',num:'1',price:'85'},
		{orderNumber:'202578954125632',status:'已取消',paystatus:'未支付',intime:'2025-07-26',outtime:'2025-07-30',housetype:'大床房',num:'1',price:'85'},
		{orderNumber:'202578954125632',status:'已取消',paystatus:'未支付',intime:'2025-07-26',outtime:'2025-07-30',housetype:'大床房',num:'1',price:'85'},
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
		
	};
	const segment6Click = () => {
		
		type.value = "6";
		
	};
	//查看详情
	const detailClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/orderManagement/aiOrderDetail'
		})
	};
	//加价
	const addpriceClick = () => {
		uni.navigateTo({
			url:'/pages/mine/orderManagement/orderAddPrice'
		})
	};
	//换房
	const changehouseClick = () => {
		uni.navigateTo({
			url:'/pages/mine/orderManagement/orderChangeHouse'
		})
	};
	//去支付
	const payClick = () => {
		
	};
	//提交入住信息
	const tijiaoClick = () => {
		uni.navigateTo({
			url:'/pages/mine/orderManagement/submithouse'
		})
	};
	
	//续房
	const xuhouseClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/orderManagement/continueHouse'
		})
	};
	//退房
	const cancelhouseClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/orderManagement/cancelHouse'
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
	 .orderlistView{
		 display: flex;
		 flex-direction: column;
		 background-color: white;
		 width: 100%;
		 .order_item{
			 display: flex;
			 flex-direction: column;
			 margin-left: 3%;
			 width: 94%;
			 height: 230px;
			 background-color: aliceblue;
			 border-radius: 5px;
			 margin-top: 10px;
		 }
	 }
	 .buttonView{
	               
	              margin-top: 10px;
	              background-color: aliceblue;
	              border-radius: 5px;
				  border: 1px #2A9595 solid;
	              color: #2A9595;
	              font-size: 13px;
	              margin-left: 72%; 
	              display: flex;
	              justify-content: center; /* 水平居中 */
	              align-items: center;     /* 垂直居中 */
	              height: 25px;           /* 需要设置高度 */
	              width: 80px;             /* 需要设置宽度 */
	     }
		 .changehouse{
			 margin-top: 10px;
			 background-color: aliceblue;
			 border-radius: 5px;
			 border: 1px #2A9595 solid;
			 color: #2A9595;
			 font-size: 13px;
			 margin-left: 10px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 70px;             /* 需要设置宽度 */
		 }
		 .addprice{
			 margin-top: 10px;
			 background-color: aliceblue;
			 border-radius: 5px;
			 border: 1px #2A9595 solid;
			 color: #2A9595;
			 font-size: 13px;
			 margin-left: 170px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 70px;  
		 }
		 .xuhouse{
			 
			 margin-top: 10px;
			 background-color: aliceblue;
			 border-radius: 5px;
			 border: 1px #2A9595 solid;
			 color: #2A9595;
			 font-size: 13px;
			 margin-left: 90px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 70px; 
		 }
		 .cancelehouse{
			 
			 margin-top: 10px;
			 background-color: aliceblue;
			 border-radius: 5px;
			 border: 1px #2A9595 solid;
			 color: #2A9595;
			 font-size: 13px;
			 margin-left: 10px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 70px;  
		 }
		 .detail{
			 
			 margin-top: 10px;
			 background-color: aliceblue;
			 border-radius: 5px;
			 border: 1px #2A9595 solid;
			 color: #2A9595;
			 font-size: 13px;
			 margin-left: 10px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 70px;  
		 }
	
    }
</style>