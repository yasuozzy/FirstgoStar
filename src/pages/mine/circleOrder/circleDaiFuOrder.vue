<template>
    <view class="main">
        <u-navbar
          title="代付订单"
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
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind == 1" style="color: #2A9595;font-size: 13px;">待付款</view>
				<view v-else style="color: black;font-size: 13px;">待付款</view>
				<view class="whiteLine1" v-if="kind == 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind == 2" style="color: #2A9595;font-size: 13px;">已付款</view>
				<view v-else style="color: black;font-size: 13px;">已付款</view>
				<view class="whiteLine1" v-if="kind ==2"></view>
			</view>
			
		</view>
		<view class="listView">
			<view class="goods_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 67%;">{{item.shopName}} ></view>
					<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;color: #2A9595;width: 20%;text-align: right;">{{item.statusName}}</view>
				</view>
				<view class="goodsItem" v-for="(goodItem,goodIndex) in item.orderDetailAry" :key="goodIndex">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="goodItem.img"
					  width="80px"
					  height="80px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
						<view style="font-size: 13px;">{{goodItem.name}}</view>
							
						<view style="font-size: 13px;text-align: right;width: 100%;">{{goodItem.price}}元</view>
						
						<view style="font-size: 13px;text-align: right;width: 100%;">x{{goodItem.nums}}</view>
						
						<view style="font-size: 13px;margin-top: 5px;margin-bottom: 10px;">{{goodItem.specs}}</view>
					</view>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 10px;margin-left: 15px;width: 45%;font-size: 12px;">下单人:{{item.order_user_name}}{{item.order_user_mobile}}</view>
					<view v-if="item.orderType == 1 || item.orderType == 3 & item.realPrice > 0" class="hejiView">共{{item.total}}件商品,合计:{{item.score}}分 + {{item.orderPrice + item.deliveryFee - item.discountAmount}}元 </view>
					<view v-if="item.orderType == 1 || item.orderType == 3 & item.realPrice == 0" class="hejiView">共{{item.total}}件商品,合计:{{item.score}}分 </view>
					<view v-if="item.orderType == 1 || item.orderType == 3 & item.score == 0" class="hejiView">共{{item.total}}件商品,合计:{{item.orderPrice + item.deliveryFee}}元 </view>
					<view v-if="item.orderType == 0" class="hejiView">共{{item.total}}件商品,合计:{{item.orderPrice + item.deliveryFee - item.discountAmount}}元 </view>
				</view>
				<view v-if="orderStatus == 0"  class="bottomView">
					<view class="oneButton" @click="payClick(item)">去付款</view>
				</view>
				
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineCircleOrderDaiFuOrderList,MineCircleOrderPayOrderImmeditly} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const kind = ref(1);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
	const page = ref(1);
	const orderList = ref([]);
	const orderStatus = ref(0);
            
	onMounted(() => {
	  getDataList();
	});
	//下拉刷新
	onPullDownRefresh(() => {
			
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
	});
	//上拉刷新
	onReachBottom(() => {
			
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		getDataList();
	});
       
    const getDataList = async() => {
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				pageSize:10,
				orderStatus:orderStatus.value,
				behalf_type:"1",
										 
			};
			const res = await MineCircleOrderDaiFuOrderList(param);
							
			console.log(res);
			const allData = res.result.map(item => {
			const total = item.orderDetailAry.reduce((sum, detail) => {
				  return sum + (detail.nums || 0)
				}, 0)
				
				return {
				  ...item,
				  total
				}
			});
				if (page.value === 1) {
											
					orderList.value = allData;
				}else
				{
					// 正确的数组合并方式
					allData.forEach(item => {
						orderList.value.push(item)
					});
				};
				console.log(orderList);
				
				if (res.result.length === 0) {
					// 没有更多数据了
					hasMore.value = false
					noMore.value = true
					uni.showToast({
						title:'没有更多数据',
						icon:'none'
					})
					return
				}
				 // 如果返回的数据少于每页数量，说明是最后一页
				if (res.result.length < 10) {
					hasMore.value = false
					noMore.value = true
				}
				
		}catch (error) {
			console.log(error)
		}finally {
			   uni.stopPullDownRefresh()
		}
	};
			
	//立即支付
	const payClick = async(item:any) => {
				
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				orderId:item.orderId,
				orderNo:item.orderNo,
				hostNo:storage.getHostNo(),
				mobile:storage.getPhone(),
				userName:storage.getNickName(),
				osName:'ios',
				
			};
			const res = await MineCircleOrderPayOrderImmeditly(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	const kind1Click = () => {
				
		kind.value = 1;
		orderStatus.value = 0;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind2Click = () => {
				
		kind.value = 2;
		orderStatus.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
			
	const detailClick = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/circleOrder/circleDaiFuOrderDetail?orderId=${encodeURIComponent(item.orderId)}`
		})
	};
    const goBack= () => {
                    
        uni.navigateBack()
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
	 		 height: 50px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 
	 }
	 .whiteLine1{
	 		 margin-left: 40%;
	 		 margin-top: 7px;
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
	 			 
	 			 background-color: white;
	 		}
	 }
	 .goodsItem{
	 		 display: flex;
	 		 flex-direction: row;
	 		 margin-top: 10px;
	 		 background-color: aliceblue;
	 }
	 .bottomView{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 margin-top: 10px;
	 }
	 .firstButton{
	 		  margin-top: 10px;
	 		  background-color: #2A9595;
	 		  border-radius: 5px;
	 		  color: white;
	 		  font-size: 14px;
	 		  margin-left: 190px; 
	 		  display: flex;
	 		  justify-content: center; /* 水平居中 */
	 		  align-items: center;     /* 垂直居中 */
	 		  height: 30px;           /* 需要设置高度 */
	 		  width: 80px;             /* 需要设置宽度 */
	 }
	 .secondButton{
	 		margin-top: 10px;
	 		background-color: #2A9595;
	 		border-radius: 5px;
	 		color: white;
	 		font-size: 14px;
	 		margin-left: 20px; 
	 		display: flex;
	 		justify-content: center; /* 水平居中 */
	 		align-items: center;     /* 垂直居中 */
	 		height: 30px;           /* 需要设置高度 */
	 		width: 80px;             /* 需要设置宽度 */ 
	 }
	 .oneButton{
	 		 
	 		 margin-top: 10px;
	 		 background-color: #2A9595;
	 		 border-radius: 5px;
	 		 color: white;
	 		 font-size: 14px;
	 		 margin-left: 290px; 
	 		 display: flex;
	 		 justify-content: center; /* 水平居中 */
	 		 align-items: center;     /* 垂直居中 */
	 		 height: 30px;           /* 需要设置高度 */
	 		 width: 80px;             /* 需要设置宽度 */ 
	 }
	 .hejiView{
		 font-size: 13px;
		 margin-top: 10px;
		 width: 96%;
		 text-align: right;
		 width: 45%;
	 }
    }
</style>