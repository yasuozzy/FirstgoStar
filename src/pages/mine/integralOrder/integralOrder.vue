<template>
    <view class="main">
        <u-navbar
          title="积分订单"
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
		<view class="approval_list">
			<view class="hotel_item" v-for="(item, index) in viewsList"
			:key="index" @click="detailClick(item)">
				<view style="width: 100%;height: 20px;display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-left: 10px;width: 50%;">{{item.shopName}}</view>
					<view style="color: #2A9595;font-size: 12px;width: 45%;text-align: right;">{{item.orderStatus}}</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<u-image
					:src="item.orderDetailAry[0].img"
					width="70px"
					height="70px"
					></u-image>
					<view class="allSpecsView">
			  			<view class="detailsView">
							<view style="display: flex;flex-direction: row;">
								<view style="font-size: 13px;font-weight: bold;width: 50%;">{{item.orderDetailAry[0].name}}</view>
								<view style="font-size: 12px;width: 45%;text-align: right;">x{{item.orderDetailAry[0].nums}}</view>
							</view>
			  				
			  				<view style="font-size: 13px;margin-top: 5px;">{{item.orderDetailAry[0].specs}}</view>
							<view style="display: flex;flex-direction: row;margin-top: 5px;">
								<view v-if="item.goodType == 0 || item.goodType == 1" style="font-size: 13px;">兑换积分:{{item.orderDetailAry[0].integral}}</view>
								<view v-if="item.goodType == 2" style="font-size: 13px;">充值积分+现金:{{item.orderDetailAry[0].integral}}</view>
								<view v-if="item.goodType == 3" style="font-size: 13px;">普通积分+现金:{{item.orderDetailAry[0].integral}}</view>
							</view> 	 
			  			</view>
			  			<view class="ticketsView">
			  				<view v-if="item.goodType == 0 || item.goodType == 1" class="hejiView">积分合计：{{item.realPrice}}</view>
							<view v-if="item.goodType == 2" class="hejiView">充值积分+现金合计：{{item.realPrice}}</view>
							<view v-if="item.goodType == 3" class="hejiView">普通积分+现金合计：{{item.realPrice}}</view>
			  			</view>
						<view class="buttonView">
							<view v-if="item.orderStatus === '待付款'" style="width: 100%;display: flex;flex-direction: row;">
								<view class="firstButton" @click="cancelOrder(item)">取消订单</view>
								<view class="secondButton" @click="payMoneyClick(item)">付款</view>
							</view>
							<view v-if="item.orderStatus === '待发货'" style="width: 100%;display: flex;flex-direction: row;">
								<view class="oneButton" @click="remindClick(item)">提醒发货</view>
							</view>
							<view v-if="item.orderStatus === '已发货'" style="width: 100%;display: flex;flex-direction: row;">
								<view class="oneButton" @click="sureOrderClick(item)">确认收货</view>
							</view>
						</view>
			  		</view>
				</view>
			</view>	
		</view>
		
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineIntegralOrderList,
	MineIntegralOrderRemindSend,
	MineIntegralOrderSureOrder,
	MineIntegralOrderCancelOrder,} from '@/api/mine';
	import {integralGetPayURL} from '@/api/integral';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const viewsList = ref([]);
	
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
           
		   
	onMounted(() => {
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
			
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	});
	//上拉刷新
	onReachBottom(() => {
			
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		loadData();
	});
           
            
    const loadData = async() => {
            	
		try {
			
			let param = {
				userId:storage.getUserId(),
				currentPage:page.value,
				pageSize:10,

			};
			const res = await MineIntegralOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				viewsList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					viewsList.value.push(item)
				});
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
	//付款
	const payMoneyClick = async(item:any) => {
				
		try {
			
			let param = {
				
				orderNos:item.orderNo,
				formExt:"H5",
				payType:"2",
				pageUrl:"",
				userName:storage.getRealName(),
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
				
			};
			const res = await integralGetPayURL(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
		   
		}catch (error) {
			console.log(error)
		}
	};
	const remindClick = async(item:any) => {
				
		try {
			
			let param = {
				
				id:item.id,
				
			};
			const res = await MineIntegralOrderRemindSend(param);
							
			console.log(res);
			loadData();
			
		}catch (error) {
			console.log(error)
		}
	};
			
	const sureOrderClick = async(item:any) => {
				
		try {
			const orderDetailDic = item.orderDetailAry[0];
			let dicts = {
				id:orderDetailDic.id,
				sku:orderDetailDic.sku,
				nums:orderDetailDic.nums,
			};
			const goodsAry = [];
			goodsAry.push(dicts);
			let param = {
				
				orderId:item.orderNo,
				goodsAry:JSON.stringify(goodsAry),
				
			};
			const res = await MineIntegralOrderSureOrder(param);
							
			console.log(res);
			loadData();
			
		}catch (error) {
			console.log(error)
		}
	};
	//取消订单
	const cancelOrder = async(item:any) => {
				
				
		try {
			
			let param = {
				
				orderId:item.id,
				
			};
			const res = await MineIntegralOrderCancelOrder(param);
							
			console.log(res);
			
			loadData();
			
		}catch (error) {
			console.log(error)
		}
	};
	//详情
	const detailClick = (item:any) =>{
				
		uni.navigateTo({
			url:`/pages/mine/integralOrder/integralOrderDetail?orderId=${encodeURIComponent(item.id)}`
		})
	};
    const goBack= () => {
            
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          height: auto;
          background: aliceblue;
          min-height: 100vh;
          width: 100%;
    }
	.approval_list {
	   // background-color: aliceblue;
	   margin-left: 3%;
	   width: 94%;
	   box-sizing: border-box;
	   .hotel_item{
	 	width: 100%;
	 	display: flex;
	 	flex-direction: column;
	 	margin-top: 10px;
	 	background: white;
	 	padding: 10px;
	 	box-sizing: border-box;
	 	margin-bottom: 10px;
	 	border-radius: 10px;
	 	.allSpecsView{
			 display: flex;
			 flex-direction: column;
			 width: 85%;
			 .detailsView{
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
				  margin-left: 3%;
				  width: 94%;
				  .hejiView{
					font-size: 12px;
					text-align: right;
					margin-right: 10px;
					margin-top: 5px;
					color: #2A9595;
				  }	  
			 }
			 .buttonView{
				display: flex;
				width: 100%;
				.firstButton{
					  margin-top: 10px;
					  background-color: white;
					  border-radius: 15px;
					  border: #2A9595 1px solid;
					  color: #2A9595;
					  font-size: 14px;
					  margin-left: 120px; 
					  display: flex;
					  justify-content: center; /* 水平居中 */
					  align-items: center;     /* 垂直居中 */
					  height: 30px;           /* 需要设置高度 */
					  width: 80px;             /* 需要设置宽度 */
				}
				.secondButton{
					margin-top: 10px;
					background-color: white;
					border: #2A9595 1px solid;
					border-radius: 15px;
					color: #2A9595;
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
					 background-color: white;
					 border: #2A9595 1px solid;
					 border-radius: 15px;
					 color: #2A9595;
					 font-size: 14px;
					 margin-left: 200px; 
					 display: flex;
					 justify-content: center; /* 水平居中 */
					 align-items: center;     /* 垂直居中 */
					 height: 30px;           /* 需要设置高度 */
					 width: 80px;             /* 需要设置宽度 */ 
				}
			 }
	 		}
	 	}
	
	}
	
</style>