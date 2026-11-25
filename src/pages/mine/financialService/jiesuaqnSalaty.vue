<template>
    <view class="main">
        <u-navbar
          title="结算支付"
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
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 15px;">待结算</view>
				<view v-else style="color: black;font-size: 15px;">待结算</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type == 2" style="color: #2A9595;font-size: 15px;">已结算</view>
				<view  v-else style="color: black;font-size: 15px;">已结算</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment3Click">
				<view  v-if="type == 3" style="color: #2A9595;font-size: 15px;">已驳回</view>
				<view  v-else style="color: black;font-size: 15px;">已驳回</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
		</view>
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in contentList" :key="index" @click="detailClick(item)">
				<view style="text-align: center;font-size: 13px;margin-top: 5px;">{{item.createtime}}</view>
					<view class="bottomView">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
					<view class="contentView">{{item.content}}</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;">查看详情 ></view>
				</view>
				
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineServicePayJieSuanList} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const contentList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
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
				page:page.value,
				size:20,
				type:type.value-1,
					   
			};
			const res = await MineServicePayJieSuanList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				contentList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					contentList.value.push(item)
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
    const goBack= () => {
                    
        uni.navigateBack()
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
		// loading = false;
		loadData();
	};
	const segment3Click = () => {
		type.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		// loading = false;
		loadData();
	};
	const detailClick = (item:any) => {
		console.log(item.code);
		const extras = JSON.parse(item.extras);
		console.log(item.code,extras);
		if (item.code === 'DAY_JOB_ORDER_PAY_CONFIRM_WITHAUDIT') {              //1
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayDetail?item=${JSON.stringify(item)}`
			})
			
		}else if (item.code === 'DAY_JOB_ORDER_PAY_CONFIRM') {                    //4	
			
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayNoShenDetail?item=${JSON.stringify(item)}`
			})
		}
		else if (item.code === 'DAY_JOB_ORDER_COMPANY_PAY_CONFIRM_WITHAUDIT'  ) {                   //2
			
			uni.navigateTo({
				url:`/pages/mine/financialService/salaryPayPaiDetail?item=${JSON.stringify(item)}`
			})
		}else if (item.code === 'DAY_JOB_ORDER_COMPANY_PAY_CONFIRM') {                    //3
			
			uni.navigateTo({
				// url:'/pages/mine/financialService/salaryPayPaiNoShenDetail?item=' + JSON.stringify(item)
				url:`/pages/mine/financialService/salaryPayPaiDetail?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_PAY_CONFIRM_WITHAUDIT')
		{
			uni.navigateTo({
				url:`/pages/mine/financialService/PartTimeSieSuan?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'PART_TIME_ORD_BATCH_PAY_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/PartTimePiLiangJieSuan?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'DAY_JOB_ORDER_PARTTIME_PAY_CONFIRM')
		{
			uni.navigateTo({
				url:`/pages/mine/financialService/DayJobPartTimeOrder?item=${JSON.stringify(item)}`
			})
			
		}else if(item.code === 'WORK_ORDER_PAY_TO_WORKERS_PAY_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/home/messagePush/PingTaiEmerGencyWorker?item=${JSON.stringify(item)}`
			})
		}else if(item.code === 'WORK_ORD_BATCH_PAY_CONFIRM'){
			
			uni.navigateTo({
				url:`/pages/mine/financialService/wuyeEmergencyPiLiangSH?item=${JSON.stringify(item)}`
			})
		}				
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 50px;
	 	
	 }
	 .whiteLine{
	 		 margin-left: 35%;
	 		 margin-top: 5px;
	 		 width: 30%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .contentListView{
	 	display: flex;
	 	flex-direction:column;
	 	width: 100%;
	 	background-color: aliceblue;
	 }
	 .content_item{
	 	display: flex;
	 	flex-direction: column;
	 	margin-left: 3%;
	 	width: 94%;
	 	
	 	background-color: aliceblue;
	 	margin-top: 10px;
	 }
	 .bottomView{
	 	display: flex;
	 	flex-direction: column;
	 	width: 100%;
	 	margin-top: 5px;
	 	background-color: white;
	 	
	 }
	 .contentView{
	 		 
	 		 margin-top: 10px;
	 		 margin-left: 10px;
	 		 font-size: 12px;
	 		 white-space: nowrap;
	 		 width: 340px;
	 		 overflow: hidden; 
	 		 // background-color: red;
	 		 text-overflow: ellipsis;
	 }
    }
</style>