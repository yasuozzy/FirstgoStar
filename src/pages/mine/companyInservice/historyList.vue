<template>
    <view class="main">
        <view class="custom-navbar">
          <view class="navbar-content">
            <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            <view class="search-container">
              <u-search 
                placeholder="搜索" 
                v-model="content" 
                :show-action="false"
                shape="square"
                bg-color="#f5f5f5"
              ></u-search>
			  <view style="color: white;font-size: 13px;margin-top: 5px;margin-left: 10px;">搜索</view>
            </view>
          </view>
        </view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="item-list" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="width: 100%;margin-top: 10px;display: flex;flex-direction: row;">
					<view style="font-size: 13px;width: 80%;margin-left: 15px;">审批类型 {{item.applyTypeName}}</view>
					<view v-if="item.statusName === '已拒绝'" style="color: red;font-size: 13px;">{{item.statusName}}</view>
					<view v-else style="color: #2A9595;font-size: 13px;">{{item.statusName}}</view>
				</view>
				<view v-if="item.applyType != 4" style="font-size: 13px;margin-left: 15px;margin-top: 10px;">审批内容 {{item.content}}</view>
				<view style="font-size: 13px;margin-left: 15px;margin-bottom: 10px;margin-top: 10px;">申请时间 {{item.submissionTime}}</view>
				<view v-if="item.statusName === '已撤销' || item.statusName == '已拒绝' & item.applyType != 4" style="display: flex;flex-direction: row;" >
					<view class="buttondone" @click="deleteDetail(item)">删除</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineComInsideNolmalSHHistory,MineComInsideNolmalSHDelete} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const content = ref('');
	// loading: false,      // 是否正在加载
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
				userId:storage.getUserId(),
				page:page.value,
				size:20,
				content:content.value,
			};
			const res = await MineComInsideNolmalSHHistory(param);
							
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
	//删除
	const deleteDetail = async(item:any) => {
		try {
		   
			let param = {
			
				userId:storage.getUserId(),
				id:item.id,
			
			};
			const res = await MineComInsideNolmalSHDelete(param);
						   
			console.log(res);
			dataList.value = [];
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadData();
		   
		}catch (error) {
		   console.log(error)
		}
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
	const detailClick = (item:any) => {
		
		console.log(item.applyType);
		if (item.applyType == 1) {
			
			//文件申请
			uni.navigateTo({
				url:`/pages/mine/companyInservice/fileShenQingDetail?id=${encodeURIComponent(item.id)}`
			})
			
		}else if (item.applyType == 2 || item.applyType == 3) {
			
			//请款报销
			uni.navigateTo({
				url:`/pages/mine/companyInservice/historySPDetail?id=${encodeURIComponent(item.id)}`
			})
			
		}else if (item.applyType == 4) {
			
			//请假申请
			uni.navigateTo({
				url:`/pages/mine/companyInservice/qingjiaShenQingDetail?id=${encodeURIComponent(item.id)}`
			})
		}
		
	};
        
</script>

<style lang="scss" scoped>
    .main {
       min-height: 100vh;
        width: 100%;
       background-color: aliceblue;
	 .custom-navbar {
	   height:calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
	   position: relative;
	   width: 100%;
	   background-color: #2A9595;
	 }
	 
	 .navbar-content {
	   display: flex;
	   align-items: center;
	   height: 100%;
	   padding: 0 15px; /* 整体左右边距 */
	 }
	 
	 .back-icon {
	   margin-right: 10px; /* 返回键与搜索框间距 */
	 }
	 
	 .search-container {
	   display: flex;
	   flex-direction: row;
	   margin-left: 10px;
	   width: 90%;
	   margin-top: calc(var(--status-bar-height));
	 }
	 .item-list{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 
		 margin-top: 10px;
		 background-color: white;
	 }
	 .buttondone{
	 		 display: flex;
	 		 align-items: center;
	 		 justify-content: center;
	 		 width: 50px;
	 		 height: 25px;
	 		 background-color: #2A9595;
	 		 border-radius: 5px;
	 		 color: white;
	 		 margin-top: 5px;
	 		 margin-left: 310px;
	 		 font-size: 13px;
			 margin-bottom: 10px;
	 }
    }
</style>