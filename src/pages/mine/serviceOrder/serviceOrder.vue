<template>
    <view class="main">
        <u-navbar
          title="服务订单"
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
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">全部</view>
				<view v-else style="color: black;font-size: 13px;">全部</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">待付款</view>
				<view v-else style="color: black;font-size: 13px;">待付款</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type ==  4" style="color: #2A9595;font-size: 13px;">进行中</view>
				<view v-else style="color: black;font-size: 13px;">进行中</view>
				<view class="whiteLine" v-if="type == 4"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type == 5" style="color: #2A9595;font-size: 13px;">待评价</view>
				<view v-else style="color: black;font-size: 13px;">待评价</view>
				<view class="whiteLine" v-if="type == 5"></view>
			</view>
			<view style="width: 16.66%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment6Click">
				<view v-if="type == 6" style="color: #2A9595;font-size: 13px;">售后</view>
				<view v-else style="color: black;font-size: 13px;">售后</view>
				<view class="whiteLine" v-if="type == 6"></view>
			</view>
			
		</view>
		<view class="approval_list">
			<view class="hotel_item" v-for="(item, index) in viewsList"
			:key="index" @click="detailClick(item)">
				<view style="width: 100%;height: 20px;display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-left: 10px;width: 80%;">{{item.shopName}}</view>
					<view style="color: #2A9595;font-size: 12px;width: 15%;text-align: right;">{{item.orderStatus}}</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<u-image
					:src="item.goodImg.split(',')[0]?item.goodImg.split(',')[0]:'/static/service/placeholder.png'"
					width="70px"
					height="70px"
					></u-image>
					<view class="allSpecsView">
			  			<view class="detailsView">
							<view style="font-size: 13px;font-weight: bold;">{{item.goodName}}</view>
							<view  style="font-size: 13px;color: red;margin-top: 20px;">￥{{item.price}}</view>
			  			</view>
						<view class="buttonView">
							<view v-if="item.orderCode === 0" style="width: 100%;display: flex;flex-direction: row;">
								<view class="firstButton" @click="cancelOrder(item)">取消订单</view>
								<view class="secondButton" @click="cuiyicuiClick(item)">催一催</view>
							</view>
							<view v-if="item.orderCode === 3" style="width: 100%;display: flex;flex-direction: row;">
								<view class="firstButton" @click="cancelOrder(item)">取消订单</view>
								<view class="secondButton" @click="payMoneyClick(item)">付款</view>
							</view>
							<view v-if="item.orderCode === 5 && item.isComment === 0 && item.afterSales === 1" style="width: 100%;display: flex;flex-direction: row;">
								<view class="oneButton" @click="pingjiaOrder(item)">评价</view>
							</view>
							<view v-if="item.orderCode === 5 && item.isComment === 1 " style="width: 100%;display: flex;flex-direction: row;">
								<view class="oneButton" @click="shouhouClick(item)">售后</view>
							</view>
							<view v-if="item.orderCode === 5 && item.afterSales === 0 && item.isComment === 0" style="width: 100%;display: flex;flex-direction: row;">
								<view class="firstButton" style="border-color: #2A9595;color: #2A9595;" @click="pingjiaOrder(item)">评价</view>
								<view class="secondButton" @click="shouhouClick(item)">售后</view>
							</view>
							<view v-if="item.orderCode === 5 && item.applyStatus === 2 && item.isPlat === 0" style="width: 100%;display: flex;flex-direction: row;">
								<view class="firstButton" style="border-color: #2A9595;color: #2A9595;" @click="pingjiaOrder(item)">评价</view>
								<view class="secondButton" @click="jieruClick(item)">平台介入</view>
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
    import {MineServiceOrderList,MineServiceOrderListCancleOrder,
	MineServiceOrderListRemindOrder,MineServiceOrderListOrderPay} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const viewsList = ref([]);
	const type = ref(1);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const status = ref();       
		   
	onShow(() => {
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
	    
		
		if(type.value == 1){
			
			status.value = '';
		}else{
			status.value = type.value -1;
		}
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				queryType:'1',
				statusType:status.value,
				page:page.value,
				size:10,
	
			};
			const res = await MineServiceOrderList(param);
							
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
	//切换segment
	const segment1Click = () => {
				
		type.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment2Click = () => {
		
		type.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment3Click = () => {
		
		type.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment4Click = () => {
		
		type.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment5Click = () => {
		
		type.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment6Click = () => {
		type.value = 6;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const cancelOrder = async(item:any) => {
		
		try {
			let param = {
				orderId:item.orderId
			};
			const res = await MineServiceOrderListCancleOrder(param);
			console.log(res);
			uni.showToast({
				title:'已取消',
				icon:'none'
			})
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadData();
			
		} catch (error) {
			console.log(error)
		}
	};
	const cuiyicuiClick = async(item:any) => {
		
		try {
			let param = {
				orderId:item.orderId,
				orderNo:item.orderNo,
				providerCode:item.shopCode,
				userId:storage.getUserId(),
			};
			const res = await MineServiceOrderListRemindOrder(param);
			console.log(res);
			uni.showToast({
				title:'已提醒',
				icon:'none'
			})
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadData();
			
		} catch (error) {
			console.log(error)
		}
	};
	const payMoneyClick = async(item:any) => {
		
		try {
			let param = {
				orderId:item.orderId,
				userName:storage.getRealName()?storage.getRealName():'',
				mobile:storage.getPhone(),
				osName:'ios',
				hostNo:storage.getHostNo()
			};
			const res = await MineServiceOrderListOrderPay(param);
			console.log(res);
			uni.navigateTo({
			       url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
			
		} catch (error) {
			console.log(error)
		}
	};
	//评价
	const pingjiaOrder = async(item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderPingJia?item=${JSON.stringify(item)}`
		})
	};
	//售后
	const shouhouClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderShouHou?item=${JSON.stringify(item)}`
		})
	};
	const jieruClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderJieRu?item=${JSON.stringify(item)}`
		})
	};
	
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/serviceOrder/serviceOrderDetail?orderId=${item.orderId}&orderno=${item.orderNo}`
		})
		
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
.main {
	 height: auto;
	 background-color: aliceblue;
	 min-height: 100vh;
	 width: 100%;
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
					  border-radius: 5px;
					  border: gray 1px solid;
					  color: gray;
					  font-size: 13px;
					  margin-left: 80px; 
					  display: flex;
					  justify-content: center; /* 水平居中 */
					  align-items: center;     /* 垂直居中 */
					  height: 25px;           /* 需要设置高度 */
					  width: 80px;             /* 需要设置宽度 */
				}
				.secondButton{
					margin-top: 10px;
					background-color: white;
					border: #2A9595 1px solid;
					border-radius: 5px;
					color: #2A9595;
					font-size: 13px;
					margin-left: 20px; 
					display: flex;
					justify-content: center; /* 水平居中 */
					align-items: center;     /* 垂直居中 */
					height: 25px;           /* 需要设置高度 */
					width: 80px;             /* 需要设置宽度 */ 
				}
				.oneButton{
						 
					 margin-top: 10px;
					 background-color: white;
					 border: #2A9595 1px solid;
					 border-radius: 5px;
					 color: #2A9595;
					 font-size: 13px;
					 margin-left: 180px; 
					 display: flex;
					 justify-content: center; /* 水平居中 */
					 align-items: center;     /* 垂直居中 */
					 height: 25px;           /* 需要设置高度 */
					 width: 80px;             /* 需要设置宽度 */ 
				}
			 }
	 		}
	 	}
	
	}
</style>