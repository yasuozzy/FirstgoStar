<template>
    <view class="main">
        <u-navbar
          title="订单管理"
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
				<view v-if="kind === 1" style="color: #2A9595;font-size: 13px;">新订单</view>
				<view v-else style="color: black;font-size: 13px;">新订单</view>
				<view class="whiteLine1" v-if="kind === 1"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === 2" style="color: #2A9595;font-size: 13px;">进行中</view>
				<view v-else style="color: black;font-size: 13px;">进行中</view>
				<view class="whiteLine1" v-if="kind === 2"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind === 3" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine1" v-if="kind === 3"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
				<view v-if="kind === 4" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine1" v-if="kind === 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind5Click">
				<view v-if="kind === 5" style="color: #2A9595;font-size: 13px;">退款/售后</view>
				<view v-else style="color: black;font-size: 13px;">退款/售后</view>
				<view class="whiteLine1" v-if="kind === 5"></view>
			</view>
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view v-if="kind === 1 || kind === 2 ||  kind === 3 || kind === 4 " style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="width: 70%;display: flex;flex-direction: row;">
						<view style="font-size: 15px;margin-left: 15px;">{{item.userName}}</view>
						<view style="font-size: 15px;color: #2A9595;margin-left: 15px;">{{item.mobile}}</view>
					</view>
					<view style="font-size: 14px;color: #2A9595;width: 25%;text-align: right;">{{item.statusName}}</view>
				</view>
				<view v-if="kind === 5 " style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="width: 70%;display: flex;flex-direction: row;">
						<view style="font-size: 15px;margin-left: 15px;">{{item.applyUserName}}</view>
						<view style="font-size: 15px;color: #2A9595;margin-left: 15px;">{{item.customerMobile}}</view>
					</view>
					<view style="font-size: 15px;color: #2A9595;width: 25%;text-align: right;">{{item.serviceType}}</view>
				</view>
				<view style="font-size: 13px;margin-left: 15px;margin-top: 5px;">{{item.address}}</view>
				<view style="width: 100%;height:1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="kind === 1 || kind === 2 ||  kind === 3 || kind === 4 " style="display: flex;flex-direction: column;width: 100%;">
					<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">订单编号:{{item.orderNo}}</view>
					<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">下单时间:{{item.createTime}}</view>
				</view>
				<view v-if="kind === 5" style="display: flex;flex-direction: column;width: 100%;">
					<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">售后服务单号:{{item.applyNo}}</view>
					<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">申请时间:{{item.applyTime}}</view>
				</view>
				<view  @tap.stop v-if="kind === 1" class="bottomView">
					<view class="firstButton" @click="cancelOrder(item)">取消订单</view>
					<view class="secondButton" @click="sureClick(item)">确认订单</view>
				</view>
				<view  @tap.stop v-if="kind === 2 && item.isPrint === 1 && item.status === 3" class="bottomView">
					<view class="firstButton" @click="getGoodsClick(item)">确认提货</view>
					<view class="secondButton" @click="reprintClick(item)">再次打印</view>
				</view>
				<view  @tap.stop v-if="kind === 2 && item.isPrint !== 1 && item.status === 3" class="bottomView">
					<view class="firstButton" @click="getGoodsClick(item)">确认提货</view>
					<view class="secondButton" @click="printClick(item)">打印</view>
				</view>
				<view  @tap.stop v-if="kind === 2 && item.isPrint === 1 && item.status !== 3" class="bottomView">
					<view class="oneButton" @click="reprintClick(item)">再次打印</view>
				</view>
				<view  @tap.stop v-if="kind === 2 && item.isPrint !== 1 && item.status !== 3" class="bottomView">
					<view class="oneButton" @click="printClick(item)">打印</view>
				</view>
				<view  @tap.stop v-if="kind === 3 || kind === 4" class="bottomView">
					<view class="oneButton" @click="detailClick(item)">查看详情</view>
				</view>
				<view v-if="kind === 5 " class="bottomView">
					<view style="margin-left: 15px;font-size: 15px;color: #2A9595;margin-top: 15px;width: 165px;">{{item.applyStatus}}</view>
					<view  @tap.stop v-if="item.applyStatusValue === 0" style="display: flex;flex-direction: row;">
						<view style="margin-left: 10px;" class="firstButton" @click="digreeOrder(item)">同意</view>
						<view class="secondButton" @click="disdigreepayClick(item)">拒绝</view>
					</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;margin-bottom: 10px;"></view>
			</view>
		</view>
		<u-modal :show="modelshow" @confirm="handleReason" :title="title" confirm-text="确定" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="content" placeholder="请填写拒绝原因"></textarea>
			</view>
		</u-modal>
		<u-modal :show="aftershow" @confirm="afterhandleReason" :title="title" confirm-text="确定" showCancelButton="true" @cancel="aftercancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="aftercontent" placeholder="请填写拒绝原因"></textarea>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineCircleHeaderData,
	MineCircleDataList,
	MineCircleAplyNotes,
	MineCircleOrderCancelOrders,
	MineCircleOrderDaiFuUrgent,
	MineCircleOrderPayOrderImmeditly,
	MineCircleOrderNormalUrgent,
	MineCircleOrderConfirmOrderDone,
	MineShangquanManageMentSubmitAudit,
	MineShangquanManageMentInitiatingUse,
	MineShangquanManageMentMerchantRefund} from '@/api/mine';
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
	const orderStatus = ref(6);
    const index = ref();
	const modelshow = ref(false);
	const title = ref('拒绝原因');
	const content = ref('');
	const normalItem = ref({});
	const aftershow = ref(false);
	const aftercontent = ref('');
	const afterItem = ref({});
	// onLoad((options:any) => {
		
	// 	index.value = options.index;
	// 	kind.value = index.value;
	// 	console.log(kind.value);
	// });
	onMounted(() => {
	  // 监听事件
	  eventBus.on('refresh-data', handleUserUpdate);
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
		if(kind.value === 5){
			getBackSaleOrder();
		}else
		{
			getDataList();
		}
		
	});
	//上拉刷新
	onReachBottom(() => {
		
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		if(kind.value === 5){
			
			getBackSaleOrder();
			
		}else
		{
			getDataList();
		}
	});
	
	const getDataList = async() => {
				
		try {
			
			let param = {
				pCode:storage.getUserId(),
				page:page.value,
				pageSize:10,
				orderStatus:orderStatus.value,
				userType:2
										 
			};
			const res = await MineCircleDataList(param);
							
			console.log(res);
			const allData = res.result;
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
	//退款售后
	const getBackSaleOrder = async() => {
		
		try {
			
			let param = {
				pCode:storage.getUserId(),
				page:page.value,
				pageSize:10,
				userType:2
										 
			};
			const res = await MineCircleAplyNotes(param);
							
			console.log(res);
			const allData = res.result;	
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
	
	const goBack = () => {
			
		uni.navigateBack()
	};
	const kind1Click = () => {
		
		kind.value = 1;
		orderStatus.value = 6;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind2Click = () => {
		
		kind.value = 2;
		orderStatus.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind3Click = () => {
		
		kind.value = 3;
		orderStatus.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind4Click = () => {
		
		kind.value = 4;
		orderStatus.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind5Click = () => {
		
		kind.value = 5;
		orderStatus.value = 10;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getBackSaleOrder();
		
	};
	//确认订单
	const sureClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				sellerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				mobile:storage.getPhone(),
				sellerName:storage.getRealName(),
				orderStatus:3,
				orderId:item.orderId,
				orderNo:item.orderNo,
				approveAdvice:'',
				
			};
			const res = await MineShangquanManageMentSubmitAudit(param);
							
			console.log(res);
			uni.showToast({
				title:res.result.message,
				icon:'none'
			})
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//取消订单
	const cancelOrder = async(item:any) => {
		
		modelshow.value = true;
		normalItem.value = item;
		
	};
	const handleReason = async() => {
		
		if(content.value.length === 0){
			uni.showToast({
				title:'请输入拒绝原因',
				icon:'none'
			})
			return;
		}
		
		modelshow.value = false;
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				sellerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				mobile:storage.getPhone(),
				sellerName:storage.getRealName(),
				orderStatus:1,
				orderId:normalItem.orderId,
				orderNo:normalItem.orderNo,
				approveAdvice:content.value
			};
			const res = await MineShangquanManageMentSubmitAudit(param);
							
			console.log(res);
			uni.navigateTo({
				   url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
			
			
		}catch (error) {
			console.log(error)
		}
	};
	const cancelClick = () => {
		modelshow.value = false;
	};
	//详情
	const detailClick = (item:any) => {
		
		if(kind.value === 1 || kind.value === 2 || kind.value === 3 || kind.value === 4){
			
			//普通订单详情
			uni.navigateTo({
				url:`/pages/mine/ShangQuanManagement/OrderManageMentDetail?orderId=${item.orderId}&kind=${kind.value}`
			})
			
		}else
		{
			//退款售后详情
			
			uni.navigateTo({
				url:`/pages/mine/ShangQuanManagement/saleAfterOrderDetail?applyId=${item.applyId}`
			})
			
		}
		
	};
	const handleUserUpdate = (data:any) => {
		  console.log('收到刷新事件:', data)
		  getDataList()
	};
	
	//确认提货/使用
	const getGoodsClick = async(item:any) => {
		
		try {
			
			let param = {
				
				orderId:item.orderId
				
			};
			const res = await MineShangquanManageMentInitiatingUse(param);
							
			console.log(res);
			
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//打印
	const printClick = (item:any) => {
		
	};
	//再次打印
	const reprintClick = (item:any) => {
		
	};
	//同意
	const digreeOrder = async(item:any) => {
		
		try {
			
			let param = {
				
				status:2,
				applyId:item.applyId,
				orderNo:item.orderNo,
				advice:'',
				
			};
			const res = await MineShangquanManageMentMerchantRefund(param);
							
			console.log(res);
			uni.navigateTo({
				   url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
				
			
		}catch (error) {
			console.log(error)
		}
	};
	
	//拒绝
	const disdigreepayClick = async(item:any) => {
		
		aftershow.value = true;
		afterItem.value = item;
	};
	const afterhandleReason = async() => {
		
		if(aftercontent.value.length === 0){
			uni.showToast({
				title:'请输入拒绝原因',
				icon:'none'
			})
			return;
		}
		
		aftershow.value = false;
		try {
			
			let param = {
				
				status:3,
				applyId:afterItem.applyId,
				orderNo:afterItem.orderNo,
				advice:aftercontent.value,
				
			};
			const res = await MineShangquanManageMentMerchantRefund(param);
							
			console.log(res);
			uni.showToast({
				title:res.result.message,
				icon:'none'
			})
			getDataList();
				
			
		}catch (error) {
			console.log(error)
		}
	};
     const aftercancelClick = () => {
		 aftershow.value = false;
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
		 margin-bottom: 10px;
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
	 .contentView{
	 		 display: flex;
	 		 flex-direction: column;
	 }
	 .order_item{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
	 		
	 }
	 .textAreaView{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 60px;
		 border: lightgray 1px solid;
		 font-size: 13px;
	 }
    }
</style>