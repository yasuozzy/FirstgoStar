<template>
    <view class="main">
        <u-navbar
          title="外派订单"
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
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待接订单</view>
				<view v-else style="color: black;font-size: 13px;">待接订单</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">处理中</view>
				<view v-else style="color: black;font-size: 13px;">处理中</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">待结算</view>
				<view v-else style="color: black;font-size: 13px;">待结算</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in orderList" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 75%;">{{item.repair_industry}}</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 20%;color: #2A9595;">￥{{item.quote_amount}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">工单单号：{{item.repairList}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">分派时间 ：{{item.send_time}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;margin-bottom: 10px;">报修项目：{{item.repair_type}}</view>
				<view v-if="item.status == 0  || item.status == 1" style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
				<view @tap.stop v-if="item.status == 0" class="buttonView" @click="baojiaClick(item)">报价</view>
				<view @tap.stop v-if="item.status == 1" class="buttonView" @click="gaijiaClick(item)">改价</view>
			</view>
		</view>
		<u-modal :show="modelshow" @confirm="handleReason" :title="title" confirm-text="提交" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 30px;">￥</view>
				<input class="searchlocation" v-model="content" placeholder="请输入价格" type="text" />
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareYuanLaoWuOrderSendOutOrder,
	MineWorkQunYuanShareLaowuSendOutAddPrice} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const orderList = ref([]);
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
    const modelshow = ref(false);
    const title = ref('报价');
    const content = ref('');
	const baojiatype = ref(0);
	const baojiaIDstring = ref();
	
		   
	onMounted(() => {
	   loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value= false;
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
				workerId:storage.getTemporayId(),
				page:page.value,
				size:20,
				status:type.value - 1,
				
											 
			};
			MineJiuYeQunShareYuanLaoWuOrderSendOutOrder(param).then((res) =>{
							
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
	const segment1Click = () => {
		
		type.value = 1;
		page.value = 1;
		hasMore.value= true;
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
	const segment3Click = () =>{
		
		type.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const baojiaClick = (item:any) => {
		
		modelshow.value = true;
		title.value = '报价';
		baojiatype.value = 0;
		baojiaIDstring.value = item.id;
	};
	const gaijiaClick = (item:any) => {
		modelshow.value = true;
		title.value = '改价';
		baojiatype.value = 1;
		baojiaIDstring.value = item.id;
	};
	const handleReason = async() => {
		
		if(content.value.length === 0){
			
			uni.showToast({
				title:'请输入金额',
				icon:'none'
			})
			return;
		}
		
		try {
			let param = {
				id:baojiaIDstring.value,
				type:baojiatype.value,
				amount:content.value
			};
			MineWorkQunYuanShareLaowuSendOutAddPrice(param).then((res) =>{
				
				console.log(res);
				if(baojiatype.value === 0){
					
					uni.showToast({
						title:'提交报价成功',
						icon:'none'
					})
					
				}else if(baojiatype.value === 1){
					
					uni.showToast({
						title:'提交改价成功',
						icon:'none'
					})
					
				}
				loadData();
				
			});
		} catch (error) {
			console.log(error)
		} 
		modelshow.value = false;
	};
	const detailClick = (item:any) => {
		
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/SharelaoWu/waipaiOrderDetail?repairList=${item.repairList}`
		})
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
		.searchlocation{
         margin-left: 10px;
         width: 200px;
         height: 30px;
         margin-top: 10px;
         font-size: 13px;
     }

    }
</style>