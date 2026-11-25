<template>
    <view class="main">
        <u-navbar
          title="我的工单"
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
		<view style="display: flex;flex-direction: row;width: 100%;background-color: white;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 80%;">接单状态</view>
			<switch color="#2A9595" :checked="serviceStatus" style="transform:scale(0.8);align-items: right;margin-top: 10px;" @change="switchChange" />
		</view>
		<view style="width: 100%;height: 10px;background-color: white;"></view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view class="specsView">
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待接订单</view>
				<view v-else style="color: black;font-size: 13px;">待接订单</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">处理中</view>
				<view v-else style="color: black;font-size: 13px;">处理中</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">待结算</view>
				<view v-else style="color: black;font-size: 13px;">待结算</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type == 4" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="type == 4"></view>
			</view>
		</view>
		
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in orderList" @click="detailClick(item)">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;">用工信息</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位：{{item.workCom}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工地点：{{item.location}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;margin-bottom: 10px;">工期：{{item.time}}</view>
				<view v-if="type == 1  || type == 2" style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
				<view v-if="type == 1" class="buttonView">查看详情</view>
				<view @tap.stop v-if="type == 2" class="buttonView" @click="confirmClick(item)">完成确认</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareYuanLaoWuOrderServiceStatus,
	MineJiuYeQunShareYuanLaoWuOrderTransferServiceStatus,
	MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderList,
	MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderConfirm,
	MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderDetail} from "@/api/mine";
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const serviceStatus = ref(false);
	const takeOrder = ref(0);
	const type = ref(1);
	const orderList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
            
	onMounted(() => {
	// 
		init();
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
				user_id:storage.getUserId(),
				page:page.value,
				size:20,
				status:type.value - 1,
											 
			};
			MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderList(param).then((res) =>{
							
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
	const init = async() => {
		
		try {
			
			let param = {
				
				user_id:storage.getUserId()
				
			};
			MineJiuYeQunShareYuanLaoWuOrderServiceStatus(param).then((res) =>{
							
				console.log(res);
				if (res.result.serviceStatus == 1) {
					
					serviceStatus.value = true;
				}else
				{
					serviceStatus.value = false;
				}
				
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const switchChange = async(e:any) => {
		
		console.log(e.detail.value);
		
		if (e.detail.value == false) {
			
			takeOrder.value = 0;
		}else
		{
			takeOrder.value = 1;
		}
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				serviceStatus:takeOrder.value,
				
			};
			MineJiuYeQunShareYuanLaoWuOrderTransferServiceStatus(param).then((res) =>{
							
				console.log(res);
				if (takeOrder.value == 1) {
					
					uni.showToast({
						title:'已开启接单',
						icon:'none'
					})
					
				}else
				{
					uni.showToast({
						title:'已关闭接单',
						icon:'none'
					})
					
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
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
		page.value= 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const detailClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id,
				orderId: item.orderId,
				estId:item.estId,
			};
			MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderDetail(param).then((res) =>{
							
				console.log(res);
				uni.navigateTo({
					url:`/pages/mine/LingGongOrder/SharelaoWu/sheyuanOrderDetail?dataDict=${JSON.stringify(res.result)}&type=${type.value - 1}`
				})
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const confirmClick = async(item:any) => {
		
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				id:item.id,
			};
			MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderConfirm(param).then((res) =>{
							
				console.log(res);
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				loadData();
				
			});
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
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
          .flex{
              display: flex;
          }
           
	 .specsView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .listItem{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 border-radius: 5px;
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 background-color: white;
	 }
	 .buttonView{
	               
		  margin-top: 10px;
		  border-radius: 5px;
		  color: #2A9595;
		  font-size: 14px;
		  margin-left: 70%; 
		  display: flex;
		  justify-content: center; /* 水平居中 */
		  align-items: center;     /* 垂直居中 */
		  height: 25px;           /* 需要设置高度 */
		  width: 30%;             /* 需要设置宽度 */
		  margin-bottom: 10px;
	}

    }
</style>