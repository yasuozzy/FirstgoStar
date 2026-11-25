<template>
    <view class="main">
        <u-navbar
          title="我的商圈"
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
		<view class="headerView">
			<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
				<view style="width: 25%;margin-top: 10px;" v-for="(item,index) in moneyList" :key="index">
					<view style="font-size: 20px;color: white;align-items: center;justify-content: center;display: flex;">{{item}}</view>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
				<view style="width: 25%;margin-top: 10px;" v-for="(item,index) in titltList" :key="index">
					<view style="font-size: 13px;color: white;align-items: center;justify-content: center;display: flex;">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind == 1" style="color: #2A9595;font-size: 13px;">全部</view>
				<view v-else style="color: black;font-size: 13px;">全部</view>
				<view class="whiteLine1" v-if="kind == 1"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind == 2" style="color: #2A9595;font-size: 13px;">待付款</view>
				<view v-else style="color: black;font-size: 13px;">待付款</view>
				<view class="whiteLine1" v-if="kind ==2"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind == 3" style="color: #2A9595;font-size: 13px;">待使用</view>
				<view v-else style="color: black;font-size: 13px;">待使用</view>
				<view class="whiteLine1" v-if="kind == 3"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
				<view v-if="kind == 4" style="color: #2A9595;font-size: 13px;">待评价</view>
				<view v-else style="color: black;font-size: 13px;">待评价</view>
				<view class="whiteLine1" v-if="kind == 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind5Click">
				<view v-if="kind === '5'" style="color: #2A9595;font-size: 13px;">退款/售后</view>
				<view v-else style="color: black;font-size: 13px;">退款/售后</view>
				<view class="whiteLine1" v-if="kind === '5'"></view>
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
				<view v-if="item.discountAmount > 0 && item.deliveryFee == 0" style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.total}}件商品,已优惠:{{item.discountAmount}},合计:￥{{item.orderPrice + item.deliveryFee - item.discountAmount}} </view>
				<view v-if="item.discountAmount == 0 && item.deliveryFee > 0" style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.total}}件商品,配送费:{{item.deliveryFee}}合计:￥{{item.orderPrice + item.deliveryFee - item.discountAmount}} </view>
				<view v-if="item.discountAmount > 0 && item.deliveryFee > 0" style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.total}}件商品,已优惠:{{item.discountAmount}},配送费:{{item.deliveryFee}},合计:￥{{item.orderPrice + item.deliveryFee - item.discountAmount}} </view>
				<view v-if="item.discountAmount == 0 && item.deliveryFee == 0" style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.total}}件商品,合计:￥{{item.orderPrice + item.deliveryFee - item.discountAmount}} </view>
				<view v-if="item.status == 2 && item.behalf_type == 1 || item.behalf_type == 2" class="bottomView">
					<view class="firstButton" @click="cancelOrder(item)">取消订单</view>
					<view class="secondButton" @click="daiFucuiyicuiClick(item)">催一催</view>
				</view>
				<view v-if="item.status == 2 && item.behalf_type == 0" class="bottomView">
					<view class="firstButton" @click="cancelOrder(item)">取消订单</view>
					<view class="secondButton" @click="payClick(item)">立即支付</view>
				</view>
				<view v-if="item.status == 4" class="bottomView">
					<view class="oneButton" @click="confirmOrderDone(item)">确认完成</view>
				</view>
				<view v-if="item.status == 6" class="bottomView">
					<view class="oneButton" @click="normalCuiyicuiClick(item)">催一催</view>
				</view>
				<view v-if="item.statusName === '待评价' && item.overtimeStatus == 0" class="bottomView">
					<view class="oneButton" @click="pingjiaClick(item)">评价</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineCircleHeaderData,
	MineCircleDataList,
	MineCircleOrderCancelOrders,
	MineCircleOrderDaiFuUrgent,
	MineCircleOrderPayOrderImmeditly,
	MineCircleOrderNormalUrgent,
	MineCircleOrderConfirmOrderDone} from '@/api/mine';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
    // 背景颜色
    const bgColor = ref("#2A9595");
	const kind = ref(1);
	const orderList = ref([]);
	const moneyList = ref([]);
	const titltList = ref(['我的优惠券','折扣优惠券','我的收藏','评价']);
	
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const orderStatus = ref(9);
            
	onMounted(() => {
	  // 监听事件
	  eventBus.on('refresh-data', handleUserUpdate);
	  init();
	  getDataList();
	});
	
	onUnmounted(() => {
	  // 组件卸载时，务必移除监听！
	  eventBus.off('refresh-data', handleUserUpdate);
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
            
    const init = async() => {
				
		try {
			let param = {
				userId:storage.getUserId(),
			};
			const res = await MineCircleHeaderData(param);
				
			console.log(res);
			moneyList.value.push(res.result.couponNum);
			moneyList.value.push(res.result.deductionCouponNum);
			moneyList.value.push(res.result.collectionNum);
			moneyList.value.push(res.result.evaluationNum);
			
		} catch (error) {
			console.log(error)
		}
	};
	
	const getDataList = async() => {
				
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				pageSize:10,
				orderStatus:orderStatus.value,
				userType:"1"
										 
			};
			const res = await MineCircleDataList(param);
							
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
			console.log(orderList.value);
			
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
	const getCategoryTotal = (category:any) => {
	  return category.orderDetailAry.reduce((sum, goods) => {
		return sum + (goods.nums || 0)
	  }, 0)
	};
	const goBack = () => {
			
		uni.navigateBack()
	};
	const kind1Click = () => {
		
		kind.value = 1;
		orderStatus.value = 9;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind2Click = () => {
		
		kind.value = 2;
		orderStatus.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind3Click = () => {
		
		kind.value = 3;
		orderStatus.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind4Click = () => {
		
		kind.value = 4;
		orderStatus.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind5Click = () => {
		
		kind.value = 5;
		uni.navigateTo({
			url:'/pages/mine/circleOrder/cnacelMoneyBack'
		})
	};
	//详情
	const detailClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/circleOrder/circleOrderDetail?orderId=${encodeURIComponent(item.orderId)}`
		})
	};
	const handleUserUpdate = (data:any) => {
		  console.log('收到刷新事件:', data)
		  getDataList()
	};
	//取消订单
	const cancelOrder = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				orderId:item.orderId,
				userName:item.userName,
				
			};
			const res = await MineCircleOrderCancelOrders(param);
							
			console.log(res);
			orderList.value= [];
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//代付催一催
	const daiFucuiyicuiClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderId:item.orderId,
				
				
			};
			const res = await MineCircleOrderDaiFuUrgent(param);
							
			console.log(res);
			orderList.value = [];
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//立即支付
	const payClick = async(item) => {
		
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				orderId:item.orderId,
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
	//普通订单催一催
	const normalCuiyicuiClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				orderId:item.orderId,
				
				
			};
			const res = await MineCircleOrderNormalUrgent(param);
							
			console.log(res);
			orderList.value = [];
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//确认完成
	const confirmOrderDone = async(item:any) => {
		
		try {
			
			const orderDetailAry = item.orderDetailAry;
	
			let param = {
				
				goodsAry:JSON.stringify(orderDetailAry),
				orderId:item.orderId,
				
				
			};
			const res = await MineCircleOrderConfirmOrderDone(param);
							
			console.log(res);
			orderList.value = [];
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//评价
	const pingjiaClick = (item:any) => {
		
		uni.navigateTo({
			url:'/pages/mine/circleOrder/OrderPingJia'
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
	 .headerView{
		 width: 100%;
		 height: 80px;
		 background-color: #2A9595;
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
    }
</style>