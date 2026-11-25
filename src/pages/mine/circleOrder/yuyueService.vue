<template>
    <view class="main">
        <u-navbar
          title="预约服务"
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
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind === 1" style="color: #2A9595;font-size: 13px;">待确认</view>
				<view v-else style="color: black;font-size: 13px;">待确认</view>
				<view class="whiteLine1" v-if="kind === 1"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === 2" style="color: #2A9595;font-size: 13px;">已确认</view>
				<view v-else style="color: black;font-size: 13px;">已确认</view>
				<view class="whiteLine1" v-if="kind === 2"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind === 3" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine1" v-if="kind === 3"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
				<view v-if="kind === 4" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine1" v-if="kind === 4"></view>
			</view>
			
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" >
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 15px;margin-left: 15px;width: 70%;">{{item.userName}}{{item.mobile}}</view>
					<view v-if="item.statusName === '已取消'" style="font-size: 13px;color: red;text-align: right;width: 20%;">{{item.statusName}}</view>
					<view v-else style="font-size: 13px;color: #2A9595;text-align: right;width: 20%;">{{item.statusName}}</view>
				</view>
				<view style="font-size: 13px;margin-left: 15px;margin-top: 5px;">{{item.address}}</view>
				<view style="width: 100%;height:1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">订单编号:{{item.orderNo}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">下单时间:{{item.createTime}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">预约时间:{{item.pre_time}}</view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;" v-if="kind == 1">
					<view class="button1" @click="checkDetail(item)">查看详情</view>
					<view class="button2" @click="passClick(item)">确认订单</view>
					<view class="button3" @click="refuseClick(item)">取消订单</view>
				</view>
				<view v-if="kind === 2 || kind === 3 || kind === 4" style="display: flex;flex-direction: row;margin-top: 10px;" >
					<view class="buttondone" @click="checkDetail(item)">查看详情</view>
				</view>
				
				<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" @cancel="cancelClick" show-cancel-button="true" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="searchlocation" v-model="reason" placeholder="请填写取消原因"></textarea>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineOrderManageCircleYuFuOrder,
	MineOrderManageCircleYuYueOrderCinfirm,
	MineOrderManageCircleYuYueOrderCancel} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const kind = ref(1);
	const orderList = ref([]);
	const hasMore = ref( true);      // 是否还有更多数据
	const noMore = ref( false);     // 是否没有更多数据了
	const page = ref(1);
	const index = ref('');
	const show = ref(false);
	const title = ref('取消原因');
	const phoneNumber = ref('');
	const reason = ref('');
	const orderId = ref('');
            
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
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				page:page.value,
				size:10,
				index:index.value,
				order_type:1,
				status:kind.value - 1,
			};
			MineOrderManageCircleYuFuOrder(param).then((res) =>{
							
				console.log(res);
				if (page.value === 1) {
											
					orderList.value = res.result;
				}else
				{
					// 正确的数组合并方式
					res.result.forEach(item => {
						orderList.value.push(item)
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
			});
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	//确认订单
	const passClick = async(item:any) => {
		try {
			
			let param = {
				
				user_id:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				order_id:item.order_id,
				
			};
			MineOrderManageCircleYuYueOrderCinfirm(param).then((res) =>{
							
				console.log(res);
				orderList.value = [];
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//取消订单
	const refuseClick = (item:any) => {
		show.value = true;
		orderId.value = item.orderId;
	};
	const confirm = async() => {
		
		if (reason.value.length == 0) {
			
			uni.showToast({
				title:'请输入取消原因',
				icon:'none',
			})
			return;
		}else
		{
			show.value = false;
			try {
				
				let param = {
					
					user_id:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
					order_id:order_id.value,
					backnote:reason.value,
				};
				MineOrderManageCircleYuYueOrderCancel(param).then((res) =>{
								
					console.log(res);
					orderList.value = [];
					loadData();
					
				});
			}catch (error) {
				console.log(error)
			}
		}
		
	};
	const cancelClick = () => {
		show.value = false;
	};
	const goBack = () => {
	        
		uni.navigateBack()
	};
	const kind1Click = () => {
		
		kind.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const kind2Click = () => {
		
		kind.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const kind3Click = () => {
		
		kind.value = 3;
		page.value= 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const kind4Click = () => {
		
		kind.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	//详情
	const checkDetail = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/circleOrder/yuyueServiceDetail?orderId=${item.orderId}`
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
	 .contentView{
	 		 display: flex;
	 		 flex-direction: column;
	 }
	 .order_item{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
	 		 
	 }
	 .button1{
	 		 display: flex;
	 		 align-items: center;
	 		 justify-content: center;
	 		 width: 80px;
	 		 height: 25px;
	 		 background-color: white;
	 		 border-radius: 5px;
	 		 border: #2A9595 solid 1px; 
	 		 color: #2A9595;
	 		 margin-top: 5px;
	 		 margin-left: 100px;
	 		 font-size: 13px;
	 }
	 .button2{
	 		 display: flex;
	 		 align-items: center;
	 		 justify-content: center;
	 		 width: 80px;
	 		 height: 25px;
	 		 background-color: white;
	 		 border-radius: 5px;
	 		 border: #2A9595 solid 1px; 
	 		 color: #2A9595;
	 		 margin-top: 5px;
	 		 margin-left: 10px;
	 		 font-size: 13px;
	 }
	 .button3{
	 		 display: flex;
	 		 align-items: center;
	 		 justify-content: center;
	 		 width: 80px;
	 		 height: 25px;
	 		 background-color: white;
	 		 border-radius: 5px;
	 		 border: #2A9595 solid 1px; 
	 		 color: #2A9595;
	 		 margin-top: 5px;
	 		 margin-left: 10px;
	 		 font-size: 13px;
	 }
	 .buttondone{
	 		 display: flex;
	 		 align-items: center;
	 		 justify-content: center;
	 		 width: 80px;
	 		 height: 25px;
	 		 background-color: white;
	 		 border-radius: 5px;
	 		 border: #2A9595 solid 1px; 
	 		 color: #2A9595;
	 		 margin-top: 5px;
	 		 margin-left: 280px;
	 		 font-size: 13px;
	 }
	 .searchlocation{
	          margin-top: 10px;
	 			  margin-left: 4%;
	 			  width: 92%;
	 			  height: 100px;
	 			  border: lightgray 1px solid;
	 			  font-size: 13px;
	      }
    }
</style>