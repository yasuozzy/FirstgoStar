<template>
    <view class="main">
        <u-navbar
          title="请款报销"
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
				<view v-if="type === 1" style="color: #2A9595;font-size: 13px;">待拨款</view>
				<view v-else style="color: black;font-size: 13px;">待拨款</view>
				<view class="whiteLine" v-if="type === 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === 2" style="color: #2A9595;font-size: 13px;">已拨款</view>
				<view v-else style="color: black;font-size: 13px;">已拨款</view>
				<view class="whiteLine" v-if="type === 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === 3" style="color: #2A9595;font-size: 13px;">抄送我的</view>
				<view v-else style="color: black;font-size: 13px;">抄送我的</view>
				<view class="whiteLine" v-if="type === 3"></view>
			</view>
		</view>
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in contentList" :key="index" @click="detailClick(item)">
				<view style="text-align: center;font-size: 13px;margin-top: 5px;">{{item.createtime}}</view>
					<view class="bottomView">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.title}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.content}}</view>
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
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineServiceQingKuanBaiXiaoList} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const contentList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);    // 是否没有更多数据了
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
					userId:storage.getUserId(),
					page:page.value,
					size:20,
					type:type.value-1,
						   
				};
				const res = await MineServiceQingKuanBaiXiaoList(param);
							
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
		// loading = false;
		loadData();
		
	};
	const segment2Click = () => {
		
		type.value= 2;
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
	//详情
	const detailClick = (item:any) => {
		
		console.log(item.code);
		uni.navigateTo({
			url:`/pages/mine/financialService/qingkuanBXDetail?item=${JSON.stringify(item)}`
		})
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
	 .specsView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 margin-top: 10px;
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
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
    }
</style>