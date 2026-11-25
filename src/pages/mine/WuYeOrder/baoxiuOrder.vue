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
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === 1" style="color: #2A9595;font-size: 15px;">待处理</view>
				<view v-else style="color: black;font-size: 15px;">待处理</view>
				<view class="whiteLine" v-if="type === 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === 2" style="color: #2A9595;font-size: 15px;">已处理</view>
				<view  v-else style="color: black;font-size: 15px;">已处理</view>
				<view class="whiteLine" v-if="type === 2"></view>
			</view>
		</view>
		<view v-if="type === 1 " class="contentView">
			<view class="order_item" v-for="(item,index) in contentList" :key="index" @click="waitingClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.managerName}}</view>
					<view v-if="item.tache == 4" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">{{item.payTypeName}}</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修人电话：{{item.phone}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修时间:{{item.repair_time}}</view>
				<view  class="specsView1">报修项目:{{item.typeName}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view class="payBtn" @click="payClick(item)">付款</view>
			</view>
		</view>
		<view v-if="type === 2 " class="contentView">
			<view class="order_item" v-for="(item,index) in contentList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.repair_industry}}</view>
					<view v-if="item.tache == 1 && item.state == 2" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待处理</view>
					<view v-if="item.tache == 2 && item.state == 1" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已接单</view>
					<view v-if="item.tache == 2 && item.state == 2" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已报价</view>
					<view v-if="item.tache == 2 && item.state == 3" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待支付</view>
					<view v-if="item.tache == 2 && item.state == 4" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">维修中</view>
					<view v-if="item.tache == 2 && item.state == 5" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已暂停</view>
					<view v-if="item.tache == 2 && item.state == 6" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已追价</view>
					<view v-if="item.tache == 2 && item.state == 7" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待支付</view>
					<view v-if="item.tache == 3 && item.state == 1" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待评价</view>
					<view v-if="item.tache == 3 && item.state == 2" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">申诉中</view>
					<view v-if="item.tache == 4 " style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已完成</view>
					<view v-if="item.tache == 5 " style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已取消</view>
					<view v-if="item.tache == 6 " style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">工单失败</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修业主：{{item.repair_people}}{{item.phone}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.repair_time}}</view>
				<view v-if="item.tache == 1 && item.state == 2 && item.maintain_type == 1"  class="specsView1">应急类型:{{item.typeName}}</view>
				<view v-if="item.tache == 1 && item.state == 2 && item.maintain_type == 2"  class="specsView1">报修项目:{{item.typeName}}</view>
				<view v-if="item.tache == 1 && item.state == 2 && item.maintain_type == 3"  class="specsView1">公共设施:{{item.typeName}}</view>
				<view v-if="item.tache == 2 "  class="specsView1">报修价格:{{item.total_money}}</view>
				<view v-if="item.tache == 3 || item.tache == 4"  class="specsView1">业主评价：暂无</view>
				<view v-if="item.tache == 5" class="specsView1">取消原因:暂无</view>
				<view v-if="item.tache == 6" class="specsView1">失败原因:{{item.end_content}}</view>
				
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineWuYeOrderBaoXiuOrderToBePaidList,MineWuYeOrderBaoXiuOrderEstateList,
	MineGetEmergencyEstateOrderDetail,MineWuYeOrderBaoXiuOrderPayTypeOne,
	MineWuYeOrderBaoXiuOrderPayTypeTwo} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
import { ifError } from 'assert';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const type = ref(1);
	const contentList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);  // 是否没有更多数据了
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
		if(type.value === 1)
		{
			loadData();
			
		}else if(type.value === 2){
			loadEsteData();
		}
		
	});
	//上拉刷新
	onReachBottom(() => {
		
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		if(type.value === 1)
		{
			loadData();
			
		}else if(type.value === 2){
			loadEsteData();
		}
		
	});
	  
	const loadData = async() => {
	        	
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:20,
					   
			};
			const res = await MineWuYeOrderBaoXiuOrderToBePaidList(param);
							
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
	const loadEsteData = async() => {
	        	
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:20,
					   
			};
			const res = await MineWuYeOrderBaoXiuOrderEstateList(param);
							
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
	//付款
	const payClick = async(item:any) => {
		
		if(item.payType === 1){
			
			try {
				
				let param = {
					hostNo:storage.getHostNo(),
					cstType:storage.getCstType(),
					userId:storage.getUserId(),
					mobile:item.phone,
					repairList:item.repairList,
					id:item.id
					
				};
				const res = await MineWuYeOrderBaoXiuOrderPayTypeOne(param);
								
				console.log(res);
				uni.navigateTo({
				       url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			}catch (error) {
				console.log(error)
			}
			
		}else if(item.payType === 2){
			
			try {
				
				let param = {
					hostNo:storage.getHostNo(),
					cstType:storage.getCstType(),
					userId:storage.getUserId(),
					mobile:item.phone,
					repairList:item.repairList,
					id:item.id
					
				};
				const res = await MineWuYeOrderBaoXiuOrderPayTypeTwo(param);
								
				console.log(res);
				uni.navigateTo({
				       url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			}catch (error) {
				console.log(error)
			}
			
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
		loadEsteData();
	};
	const waitingClick = async(item:any) => {
		
		try {
			
			let param = {
				
				repairList:item.repairList,
				id:item.id
				
			};
			const res = await MineGetEmergencyEstateOrderDetail(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/mine/WuYeOrder/waitingOrder?dataDict=${JSON.stringify(res.result)}`
			})
			
		}catch (error) {
			console.log(error)
		}
	};
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/WuYeOrder/baoxiuOrderDetail?repair_id=${encodeURIComponent(item.repair_id)}`
		})
		
	};
	
</script>

<style lang="scss" scoped>
.main {
        min-height: 100vh;
        width: 100%;
		height: auto;
        background-color: aliceblue;
    .flex{
		display: flex;
    }
		  .contentView{
			 display: flex;
			 flex-direction: column;
		  }
		  .order_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 border-radius: 5px;
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 background-color: white;
		  }
		  .payBtn{
			  margin-left: 280px;
			  width: 60px;
			  margin-top: 10px;
			  color: #2A9595;
			  border: #2A9595 1px solid;
			  font-size: 13px;
			  border-radius: 5px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  margin-bottom: 10px;
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
		  .specsView1{
			  font-size: 12px;
			  margin-left: 15px;
			  color: gray;
			  margin-top: 5px;
			  margin-bottom: 15px;
		  }
}
</style>