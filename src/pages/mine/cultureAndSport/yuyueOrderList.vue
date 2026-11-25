<template>
    <view class="main">
        <u-navbar
          title="预约记录"
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
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind === 1" style="color: #2A9595;font-size: 13px;">已预约</view>
				<view v-else style="color: black;font-size: 13px;">已预约</view>
				<view class="whiteLine1" v-if="kind === 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === 2" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine1" v-if="kind === 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind === 3" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine1" v-if="kind === 3"></view>
			</view>
		</view>
		<view class="listView">
			<view class="list_item" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="font-size: 15px;color: black;margin-top: 5px;width: 70%;margin-left: 10px;">{{item.act_name}}</view>
					<view v-if="kind === 1" class="buttonView" @click="cancelYuYue(item)">取消预约</view>
				</view>
				<view v-if="item.exc_way === 0" style="font-size: 13px;color: black;margin-top: 10px;margin-left: 10px;">兑换方式：免费</view>
				<view v-if="item.exc_way === 1" style="font-size: 13px;color: black;margin-top: 10px;margin-left: 10px;">兑换方式：积分兑换</view>
				<view v-if="item.exc_way === 2" style="font-size: 13px;color: black;margin-top: 10px;margin-left: 10px;">兑换方式：现金兑换</view>
				<view v-if="item.exc_way === 3" style="font-size: 13px;color: black;margin-top: 10px;margin-left: 10px;">兑换方式：预付兑换</view>
				<view  style="font-size: 13px;color: black;margin-top: 10px;margin-left: 10px;">兑换金额：{{item.amount}}</view>
				<view  style="font-size: 13px;color: black;margin-top: 10px;margin-left: 10px;">活动地点：{{item.act_location}}</view>
				<view  style="font-size: 13px;color: black;margin-top: 10px;margin-bottom: 10px;margin-left: 10px;">预约时间：{{item.amount}}{{item.start_hour}}{{item.end_hour}}</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsCultureAndSportsYuYueNotes,
	MineNeedToolsCultureAndSportsYuYueCancelOrder} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const kind = ref(1);
	const orderList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
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
		// loading = false;
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
				type:kind.value,
				page:page.value,
				size:20
				
			};
			const res = await MineNeedToolsCultureAndSportsYuYueNotes(param);
							
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
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const cancelYuYue = async(item:any) => {
		
		try {
			
			let param = {
				
				rec_id:item.rec_id
				
			};
			const res = await MineNeedToolsCultureAndSportsYuYueCancelOrder(param);
							
			console.log(res);
			loadData();
					   
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
          .specsView{
          	display: flex;
          	flex-direction: row;
          	background-color: white;
          	width: 100%;
          	height: 40px;
          }
          .whiteLine1{
          	 margin-left: 20%;
          	 margin-top: 5px;
          	 width: 60%;
          	 height: 2px;
          	 background-color: #2A9595;
          }
          .listView{
          		 display: flex;
          		 flex-direction: column;
          		 width: 100%;
          }
          .list_item{
          		 border: 1px lightgray solid;
          		 margin-left: 4%;
          		 width: 92%;
          		 border-radius: 5px;
          		 margin-top: 10px;
          		 display: flex;
          		 flex-direction: column;
          }
		  .buttonView{
			  margin-top: 10px;
			  // background-color:#2A9595;
			  border-radius: 4px;
			  color: #2A9595;
			  font-size: 13px;
			  margin-left: 10px; 
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 80px;             /* 需要设置宽度 */
		  }
		  
}
</style>