<template>
    <view class="main">
        <u-navbar
          title="商城订单"
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
		<view class="specsView">
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">全部</view>
				<view v-else style="color: black;font-size: 13px;">全部</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">待付款</view>
				<view v-else style="color: black;font-size: 13px;">待付款</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">待发货</view>
				<view v-else style="color: black;font-size: 13px;">待发货</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type === '4'" style="color: #2A9595;font-size: 13px;">待收货</view>
				<view v-else style="color: black;font-size: 13px;">待收货</view>
				<view class="whiteLine" v-if="type === '4'"></view>
			</view>
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type === '5'" style="color: #2A9595;font-size: 13px;">待评价</view>
				<view v-else style="color: black;font-size: 13px;">待评价</view>
				<view class="whiteLine" v-if="type === '5'"></view>
			</view>
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment6Click">
				<view v-if="type === '6'" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine" v-if="type === '6'"></view>
			</view>
			<view style="width: 14.28%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment7Click">
				<view v-if="type === '7'" style="color: #2A9595;font-size: 13px;">退款/售后</view>
				<view v-else style="color: black;font-size: 13px;">退款/售后</view>
				<view class="whiteLine" v-if="type === '7'"></view>
			</view>
			
		</view>
		<view class="listView">
			<view class="goods_item" v-for="(item,index) in orderList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 70%;">{{item.hoteName}}</view>
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;color: red;width: 20%;text-align: right;">{{item.status}}</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;background-color: aliceblue;">
					<u-image style="margin-top: 10px;margin-left: 15px;margin-bottom: 15px;"
					  :src="item.icon"
					  width="80px"
					  height="80px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;">
						<view style="display: flex;flex-direction: row;">
							<view style="font-size: 13px;width: 70%;">{{item.houseName}}</view>
							<view style="font-size: 13px;text-align: right;width: 25%;">￥{{item.price}}</view>
						</view>
						<view style="font-size: 13px;margin-left: 10px;width: 90%;text-align: right;text-decoration: line-through;color: gray;">￥{{item.discount}}</view>
						<view style="display: flex;flex-direction: row;margin-top: 10px;">
							<view style="font-size: 13px;">{{item.specs}}</view>
							<view style="font-size: 13px;margin-left: 100px;text-align: right;width: 100px;">x{{item.num}}</view>
						</view>
						
					</view>
				</view>
				<view style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.goodsnum}}件商品,合计:￥{{item.total}} </view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view class="buttonView">去付款</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 5px;"></view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const orderList = ref([
		{hoteName:'刘霞活鱼',status:'已取消',icon:'/static/home/homestay.png',houseName:'创意结婚礼物浪漫新婚礼品个性情侣摆件',price:'32.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'30x20cm',goodsnum:'2',total:'36.00',discount:'36.00'},
		{hoteName:'刘霞活鱼',status:'已取消',icon:'/static/home/homestay.png',houseName:'创意结婚礼物浪漫新婚礼品个性情侣摆件',price:'32.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'30x20cm',goodsnum:'2',total:'36.00',discount:'36.00'},
		{hoteName:'刘霞活鱼',status:'已取消',icon:'/static/home/homestay.png',houseName:'创意结婚礼物浪漫新婚礼品个性情侣摆件',price:'32.00',deadline:'2025.01.19-2025.01.20',num:'2',specs:'30x20cm',goodsnum:'2',total:'36.00',discount:'36.00'},
		
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
	const segment7Click = () => {
		
		type.value = "7";
		uni.navigateTo({
			url:'/pages/mine/cityOrder/cityAfterSale'
		})
		
	};
	//详情
	const detailClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/cityOrder/cityOrderDetail'
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
	 		 height: 200px;
	 		 background-color: white;
	 	}
	  }
	  .buttonView{
	           
	          margin-top: 5px;
	          background-color: red;
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