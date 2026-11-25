<template>
    <view class="main">
        <u-navbar
          title="预付订单"
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
				<view v-if="kind === 1" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine1" v-if="kind === 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === 2" style="color: #2A9595;font-size: 13px;">已处理</view>
				<view v-else style="color: black;font-size: 13px;">已处理</view>
				<view class="whiteLine1" v-if="kind === 2"></view>
			</view>
		</view>
		<view class="searchView">
			<u-search style="margin-left: 10px;margin-right: 10px;margin-top: 10px;border: 1px #2A9595 solid;border-radius: 5px;"
			  placeholder="搜索" 
			  v-model="index" 
			  :show-action="false"
			  shape="square"
			  bg-color="#f5f5f5"
			></u-search>
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 15px;margin-left: 15px;">{{item.userName}}</view>
					<view style="font-size: 15px;color: #2A9595;margin-left: 15px;">{{item.mobile}}</view>
				</view>
				<view style="font-size: 13px;margin-left: 15px;margin-top: 5px;">{{item.address}}</view>
				<view style="width: 100%;height:1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">订单编号:{{item.orderNo}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">下单时间:{{item.createTime}}</view>
				<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import {MineOrderManageCircleYuFuOrder} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const orderList = ref([]);
	const kind = ref(1);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
	const page = ref(1);
	const index = ref('');
	const is_deal = ref(0);
            
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
				order_type:0,
				is_deal:is_deal.value
			};
			const res = await MineOrderManageCircleYuFuOrder(param);
							
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
		
		}catch (error) {
			console.log(error)
		}finally {
			   uni.stopPullDownRefresh()
		}
    };
	const kind1Click = () => {
		
		kind.value = 1;
		page.value = 1;
		is_deal.value = 0;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const kind2Click = () => {
		
		kind.value = 2;
		page.value = 1;
		is_deal.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const detailClick = (item:any) => {
			   
	   uni.navigateTo({
		url:`/pages/mine/circleOrder/yufuOrderDetail?orderId=${item.orderId}`
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
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .searchView{
	 		  width: 100%;
	 		  height: 45px;
	 		  background-color: white;
	 }
	 .contentView{
		 display: flex;
		 flex-direction: column;
	 }
	 .order_item{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 130px;
	 }
	 
    }
</style>