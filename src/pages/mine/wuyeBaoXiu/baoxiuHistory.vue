<template>
    <view class="main">
        <u-navbar
          title="报修工单"
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
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataList" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="display: flex;flex-direction: column;width: 75%;margin-top: 10px;margin-left: 15px;">
						<view style="display: flex;flex-direction: row;">
							<view style="font-size: 14px;" v-if="item.maintainType == 1">应急</view>
							<view style="font-size: 14px;" v-if="item.maintainType == 2">室内报修</view>
							<view style="font-size: 14px;" v-if="item.maintainType == 3">公共设施</view>
							<view style="font-size: 14px;" v-if="item.maintainType == 4">平台报修</view>
							<view style="font-size: 14px;" v-if="item.maintainType == 5">物业报修</view>
							<view v-if="item.isUrgent === 2" class="jiejiLabel">加急</view>
						</view>
						<view style="font-size: 13px;color: gray;margin-top: 10px;">{{item.repairTime}}</view>
					</view>
					<view  v-if="item.tache === 1 && item.state === 1" style="font-size: 14px;text-align: right;margin-top: 20px;">待处理</view>
					<view v-if="item.tache === 1 && item.state === 2" style="font-size: 14px;text-align: right;margin-top: 20px;">已分派</view>
					<view v-if="item.tache === 2 && item.state === 1" style="font-size: 14px;text-align: right;margin-top: 20px;">已接单</view>
					<view v-if="item.tache === 2 && item.state === 2 || item.state === 6" style="font-size: 14px;text-align: right;margin-top: 20px;">已报价</view>
					<view v-if="item.tache === 2 && item.state === 3 || item.state === 7" style="font-size: 14px;text-align: right;margin-top: 20px;">待支付</view>
					<view v-if="item.tache === 2 && item.state === 4" style="font-size: 14px;text-align: right;margin-top: 20px;">维修中</view>
					<view v-if="item.tache === 2 && item.state === 5" style="font-size: 14px;text-align: right;margin-top: 20px;">已暂停</view>
					<view v-if="item.tache === 3 && item.state === 1 && item.finishedSign === ''" style="font-size: 14px;text-align: right;margin-top: 20px;">待确认完成</view>
					<view v-if="item.tache === 3 && item.state === 1 && item.finishedSign ==='0'" style="font-size: 14px;text-align: right;margin-top: 20px;">未完成</view>
					<view v-if="item.tache === 3 && item.state === 1 && item.finishedSign === '1'" style="font-size: 14px;text-align: right;margin-top: 20px;">待评价</view>
					<view v-if="item.tache === 3 && item.state === 2" style="font-size: 14px;text-align: right;margin-top: 20px;">申诉中</view>
					<view v-if="item.tache === 4 " style="font-size: 14px;text-align: right;margin-top: 20px;">已完成</view>
					<view v-if="item.tache === 5 " style="font-size: 14px;text-align: right;margin-top: 20px;">已取消</view>
					<view v-if="item.tache === 6 " style="font-size: 14px;text-align: right;margin-top: 20px;">工单失败</view>
					<image style="width: 8px;height: 12px;margin-top: 25px;margin-left: 10px;" src="/src/static/service/my_arrow.png"></image>
				</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineWuYeBaoXiuHistoryAppComWorkOraderForForPage,
	MineGetEmergencyOrderDetail} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { useRepairHistoryActions } from '@/pages/mine/gongchenggongdan/composables/useRepairHistoryActions';
    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const dataList = ref([]);
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
				repairUId:storage.getUserId(),
				page:page.value,
				size:10,
	
			};
			const res = await MineWuYeBaoXiuHistoryAppComWorkOraderForForPage(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value.push(item)
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
	const detailClick = async(item:any) => {
		
		// useRepairHistoryActions();
		try {
					   
			let param = {
				
				repairList: item.repairList
				
			};
			const res = await MineGetEmergencyOrderDetail(param);
							   
			console.log(res);
			const workOrder = res.result.workOrder;
			if (workOrder.tache === 1 || workOrder.tache === 5 ||workOrder.tache === 6) {
				
				uni.navigateTo({
					url:`/pages/mine/gongchenggongdan/repairPendingDetail?repairList=${res.result.workOrder.repairList}`
				})
				
			}else if(workOrder.tache === 2 || workOrder.tache === 3){
				
				uni.navigateTo({
					url:`/pages/mine/gongchenggongdan/repairProcessingDetail?repairList=${res.result.workOrder.repairList}`
				})
				
			}else if(workOrder.tache === 4){
				
				uni.navigateTo({
					url:`/pages/mine/gongchenggongdan/repairCompleteDetail?repairList=${res.result.workOrder.repairList}`
				})
			}
						
					  
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
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
		  }
		  .jiejiLabel{
			  display: flex;
			  font-size: 11px;
			  margin-top: 3px;
			  margin-left: 10px;
			  width: 30px;
			  height: 15px;
			  justify-content: center;
			  align-items: center;
			  text-align: center;
			  color: #2A9595;
			  border: #2A9595 1px solid;
			  border-radius: 3px;
		  }
}
</style>