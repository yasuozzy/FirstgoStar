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
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;">订单编号:{{item.ordernum}}</view>
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
							<view style="font-size: 13px;width: 95%;">{{item.houseName}}</view>
							
						</view>
						<view style="display: flex;flex-direction: row;margin-top: 10px;">
							<view style="font-size: 13px;">数量：{{item.num}}</view>
							
						</view>
						
					</view>
				</view>
				<view style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.goodsnum}}件商品,合计:￥{{item.total}} </view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view class="buttonView">联系售后</view>
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	
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
	 		 height: 200px;
	 		 background-color: white;
	 	}
	  }
	  .buttonView{
	           
	          margin-top: 5px;
	          background-color: white;
	          border-radius: 5px;
			  border: red 1px solid;
	          color: red;
	          font-size: 12px;
	          margin-left: 260px; 
	          display: flex;
	          justify-content: center; /* 水平居中 */
	          align-items: center;     /* 垂直居中 */
	          height: 20px;           /* 需要设置高度 */
	          width: 80px;             /* 需要设置宽度 */
	 }
    }
</style>