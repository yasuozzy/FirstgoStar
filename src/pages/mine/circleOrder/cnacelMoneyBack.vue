<template>
    <view class="main">
        <u-navbar
          title="申请售后"
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
		<view class="listView">
			<view class="goods_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">订单编号:{{item.orderNo}} ></view>
					<view style="margin-top: 10px;font-size: 12px;width: 42%;text-align: right;">下单时间:{{item.create_time}}</view>
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
				
				<view v-if="type === '1'" class="bottomView">
					<view class="oneButton" @click="backBuySQ(item)">申请售后</view>
				</view>
				<view v-if="type === '2'" class="bottomView">
					<view class="oneButton" @click="cutInClick(item)">申请平台介入</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineCircleDataList,MineCircleAplyNotes,MineCircleAplyBuyBackSQ,MineCircleAplyPlatCutIn} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const orderList = ref([]);
	
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
	const page = ref(1);
	const orderStatus = ref(10);
           
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
	const getNotesList = async() => {
				
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				pageSize:10,
				orderStatus:orderStatus.value,
				userType:"1" 
																	
			};
			const res = await MineCircleAplyNotes(param);
							
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
	const backBuySQ = async(item:any) => {
				
		try {
			
			let param = {
				
				orderNo:item.orderNo,
				sku:item.orderDetailAry[0].sku,
				
			};
			const res = await MineCircleAplyBuyBackSQ(param);
							
			console.log(res);
			//跳转申请售后
			if (res.result.ynApplyAfs == true) {
				
				uni.navigateTo({
					url:`/pages/mine/circleOrder/saleBehindOrder?listData=${JSON.stringify(item)}`
				})
			}else
			{
				uni.showToast({
					title:res.result.message,
					icon:'none',
				})
			}
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const cutInClick = async(item:any) => {
				
		try {
			
			let param = {
				
				applyId:item.orderNo,
				
			};
			const res = await MineCircleAplyPlatCutIn(param);
							
			console.log(res);
			//跳转申请平台介入
			uni.navigateTo({
				url:`/pages/mine/circleOrder/platCutInOrder?listData=${JSON.stringify(item)}`
			})
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const detailClick = (item:any) => {
				
	};
	//切换segment
	const segment1Click = () => {
				
		type.value = "1";
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		orderList.value = [];
		getDataList();
		
	};
	const segment2Click = () => {
		
		type.value = "2";
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		orderList.value = [];
		getNotesList();
		
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
		 		 background-color: white;
		 		 border-radius: 5px;
		 		 color: #2A9595;
		 		 font-size: 14px;
		 		 margin-left: 290px; 
		 		 display: flex;
				 border: #2A9595 1px solid;
		 		 justify-content: center; /* 水平居中 */
		 		 align-items: center;     /* 垂直居中 */
		 		 height: 30px;           /* 需要设置高度 */
		 		 width: 80px;             /* 需要设置宽度 */ 
		 }
    }
</style>