<template>
    <view class="main">
        <u-navbar
          title="预购订单"
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
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind == 1" style="color: #2A9595;font-size: 13px;">待确认</view>
				<view v-else style="color: black;font-size: 13px;">待确认</view>
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
				<view v-if="kind == 4" style="color: #2A9595;font-size: 13px;">已使用</view>
				<view v-else style="color: black;font-size: 13px;">已使用</view>
				<view class="whiteLine1" v-if="kind == 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind5Click">
				<view v-if="kind === 5" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine1" v-if="kind === 5"></view>
			</view>
		</view>
		<view class="listView">
			<view class="goods_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 67%;">{{item.shopName}} ></view>
					<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;color: #2A9595;width: 20%;text-align: right;">{{item.statusName}}</view>
				</view>
				<view class="goodsItem" v-for="(goodItem,goodIndex) in item.goodsList" :key="goodIndex">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="goodItem.img"
					  width="80px"
					  height="80px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
						<view style="font-size: 13px;">{{goodItem.name}}</view>
							
						<view style="font-size: 13px;text-align: right;width: 100%;">￥{{goodItem.price}}</view>
						
						<view style="font-size: 13px;text-align: right;width: 100%;">x{{goodItem.nums}}</view>
						
						<view style="font-size: 13px;margin-top: 5px;margin-bottom: 10px;">规格：{{goodItem.specs}}</view>
					</view>
				</view>
				<view  style="font-size: 13px;margin-top: 10px;width: 96%;text-align: right;">共{{item.totalNums}}件商品,合计:￥{{item.orderPrice}} </view>
				
				<view v-if="item.status == -1" class="bottomView">
					<view class="oneButton" @click="cancelOrder(item)">取消</view>
				</view>
				<view v-if="item.status == 2" class="bottomView">
					<view class="firstButton" @click="cancelOrder(item)">取消</view>
					<view class="secondButton" @click="payClick(item)">去付款</view>
				</view>
				<view v-if="item.status == 3" class="bottomView">
					<view class="oneButton" @click="useClick(item)">使用</view>
				</view>
				
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
			
		</view>
		
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineCircleOrderYuGouOrderList,
	MineCircleOrderYuGouOrderCancelOrder,
	MineCircleOrderPayOrderImmeditly,
	MineCircleOrderYuGouOrderUseOrder} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const kind = ref(1);
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const orderStatus = ref(0);
	const orderList = ref([]);
            
	onMounted(() => {
	    getDataList();
	});
	onPullDownRefresh(()=>{
		// 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		
		getDataList();
	});
	onReachBottom(() => {
		if ( !hasMore.value) {
			
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
				status:orderStatus.value,
				
										 
			};
			const res = await MineCircleOrderYuGouOrderList(param);
							
			console.log(res);
			 if (page.value === 1) {
													
				orderList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				orderList.value.push(...res.result);
			}
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
	const detailClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/circleOrder/circleYuGouOrderDetail?orderId=${encodeURIComponent(item.orderId)}&index=${encodeURIComponent(orderStatus.value)}`
		})
	};
	const kind1Click = () => {
				
		kind.value = 1;
		orderStatus.value = 0;
		page.value = 1;
		hasMore.value = true;
		noMore.value= false;
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
	const kind3Click = () => {
				
		kind.value = 3;
		orderStatus.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind4Click = () => {
				
		kind.value = 4;
		orderStatus.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind5Click = () => {
				
		kind.value = 5;
		orderStatus.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	//取消订单
	const cancelOrder = async(item:any) => {
				
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				order_id:item.orderId,
				
				
			};
			const res = await MineCircleOrderYuGouOrderCancelOrder(param);
							
			console.log(res);
			orderList.value = [];
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//立即支付
	const payClick = async(item:any) => {
				
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
	//使用
	const useClick = async(item:any) => {
				
		try {
			
			let param = {
				
				
				orderId:item.orderId,
				
				
			};
			const res = await MineCircleOrderYuGouOrderUseOrder(param);
							
			console.log(res);
			orderList.value = [];
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
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