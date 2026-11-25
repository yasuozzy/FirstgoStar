<template>
    <view class="main">
        <u-navbar
          :title="navTitle"
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
		 <template #right>
			  <view slot="right" @click="addNewClick()">
				 <u-image
				   :src="AddImage"
				   width="20px"
				   height="20px"
				 ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="text-align: center;font-size: 13px;margin-top: 5px;">{{item.create_time}}</view>
					<view class="bottomView">
					<view style="width: 100%;display: flex;flex-direction: row;">
						<view v-if="navTitle ==='招聘列表'" style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 75%;">{{item.work_type}}{{item.work_num}}</view>
						<view v-if="navTitle ==='求职列表'" style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 75%;">{{item.work}}</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;color: red;text-align: right;">{{item.salary}}</view>
					</view>
					<view v-if="navTitle ==='招聘列表'" style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.company}}</view>
					<view v-if="navTitle ==='求职列表'" style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.name}}</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view v-if="item.status == 0" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
						
						<view class="editBtn" style="color: #2A9595;" @click="editClick(item)">编辑</view>
						<view class="closeBtn">关闭</view>
						<view class="deleteBtn">删除</view>
					</view>
					<view v-if="item.status == 1 & item.is_open == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
						
						<view class="editBtn">编辑</view>
						<view class="closeBtn" style="color: #2A9595;" @click="turnoffClick(item)">关闭</view>
						<view class="deleteBtn" style="color: #2A9595;" @click="deleteClick(item)">删除</view>
					</view>
				
					<view v-if="item.status == 1 & item.is_open == 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
						
						<view class="editBtn">编辑</view>
						<view class="closeBtn" style="color: #2A9595;" @click="openClick(item)">打开</view>
						<view class="deleteBtn" style="color: #2A9595;" @click="deleteClick(item)">删除</view>
					</view>
					
					<view v-if="item.status == 2 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
						
						<view class="editBtn">编辑</view>
						<view class="closeBtn">关闭</view>
						<view class="deleteBtn" style="color: #2A9595;" @click="deleteClick(item)">删除</view>
					</view>
				</view>
				
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunMediumZhaoPinDataZhiList,
	MineJiuYeQunMediumQiuZhiDataZhiList,
	MineJiuYeQunMediumZhaoPinDataZhiListClose,
	MineJiuYeQunMediumQiuZhiDataZhiListClose,
	MineJiuYeQunMediumZhaoPinDataZhiListOpen,
	MineJiuYeQunMediumQiuZhiDataZhiListOpen,
	MineJiuYeQunMediumZhaoPinDataZhiListDelete,
	MineJiuYeQunMediumQiuZhiDataZhiListDelete,
	} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const AddImage = ref('/static/mine/addItemImage.png');
	const orderList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);    // 是否没有更多数据了
	const page = ref(1);
	const show = ref(false);
	const title = ref('');
	const idstring = ref('');
	const navTitle = ref('');
            
	onLoad((options:any) => {
		
		if (options.title == 0) {
			
			navTitle.value = '招聘列表';
			
		}else
		{
			navTitle.value = '求职列表';
		}
	});
	onShow(() => {
		
		loadData();
	});
	
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		page.value= 1;
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
		
		if (navTitle.value === '招聘列表') {
			
			try {
				
				let param = {
					userId:storage.getUserId(),
					page:page.value,
					size:20,
												 
				};
				MineJiuYeQunMediumZhaoPinDataZhiList(param).then((res) =>{
								
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
		}else
		{
			try {
				
				let param = {
					userId:storage.getUserId(),
					page:page.value,
					size:20,
												 
				};
				MineJiuYeQunMediumQiuZhiDataZhiList(param).then((res) =>{
								
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
		}
		
	};
	//编辑
	const editClick = (item:any) => {
		
		if (navTitle.value === '招聘列表') {
			
			uni.navigateTo({
				url:`/pages/mine/AgentZhaoPin/AddZhaoPin?id=${item.id}`
			})
			
		}else
		{
			uni.navigateTo({
				url:`/pages/mine/AgentZhaoPin/AddQiuZhi?id=${item.id}`
			})
		}
	};
	//关闭
	const turnoffClick = (item:any) => {
		
		show.value = true;
		title.value = '确认关闭';
		idstring.value = item.id;				
	};
	//打开
	const openClick = (item:any) => {
		show.value = true;
		title.value = '确认打开';
		idstring.value = item.id;
	};
	//删除
	const deleteClick = (item:any) => {
		
		show.value = true;
		title.value = '确认删除';
		idstring.value = item.id;
	};
	
	const addNewClick = () => {
		
		if (navTitle.value === '招聘列表') {
			
			uni.navigateTo({
				url:'/pages/mine/AgentZhaoPin/AddZhaoPin'
			})
			
		}else
		{
			uni.navigateTo({
				url:'/pages/mine/AgentZhaoPin/AddQiuZhi'
			})
		}
		
	};
	const confirm = async() => {
		
		if (navTitle.value === '招聘列表') {
			
			if (title.value === '确认关闭') {
				
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunMediumZhaoPinDataZhiListClose(param).then((res) =>{
						
						console.log(res);
						show.value = false;
						loadData();
					});
				} catch (error) {
					console.log(error)
				}
				
			}else if (title.value === '确认打开') {
				
				
				
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunMediumZhaoPinDataZhiListOpen(param).then((res) =>{
						
						console.log(res);
						show.value= false;
						loadData();
					});
				} catch (error) {
					console.log(error)
				}
				
			}else if (title.value === '确认删除') {
				
				
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunMediumZhaoPinDataZhiListDelete(param).then((res) =>{
						
						console.log(res);
						show.value = false;
						loadData();
					});
				} catch (error) {
					console.log(error)
				}
				
			}
			
		}else
		{
			if (title.value === '确认关闭') {
				
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunMediumQiuZhiDataZhiListClose(param).then((res) =>{
						
						console.log(res);
						show.value = false;
						loadData();
					});
				} catch (error) {
					console.log(error)
				}
				
			}else if (title.value === '确认打开') {
				
				
				
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunMediumQiuZhiDataZhiListOpen(param).then((res) =>{
						
						console.log(res);
						show.value = false;
						loadData();
					});
				} catch (error) {
					console.log(error)
				}
				
			}else if (title.value === '确认删除') {
				
				
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunMediumQiuZhiDataZhiListDelete(param).then((res) =>{
						
						console.log(res);
						show.value = false;
						loadData();
					});
				} catch (error) {
					console.log(error)
				}
				
			}
		}
		
	};
	const cancelClick = () => {
		
		show.value = false;
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
			
</script>

<style lang="scss" scoped>
    .main {
         background-color: aliceblue;
         
         min-height: 100vh;
         width: 100%;
         .flex{
         	display: flex;
         }
         .custom-navbar {
           height: calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
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
         
         
         .segment-container{
         	display: flex;
         	flex-direction: row;
         	background-color: #2A9595;
         	margin-left: 4%;
         	width: 92%;
         	height: 40px;
         	margin-top: calc(var(--status-bar-height));
         }
         .whiteLine{
         		 margin-left: 30%;
         		 margin-top: 5px;
         		 width: 40%;
         		 height: 2px;
         		 background-color: white;
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
		 .sendBtn{
			 margin-top: 5px;
			 background-color: white;
			 border: #2A9595 1px solid; 
			 border-radius: 5px;
			 color: black;
			 font-size: 13px;
			 margin-left: 10px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 120px;             /* 需要设置宽度 */ 
		 }
		 .editBtn{
			margin-top: 5px;
			background-color: white;
			border: #2A9595 1px solid; 
			border-radius: 5px;
			color: black;
			font-size: 13px;
			margin-left: 130px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 25px;           /* 需要设置高度 */
			width: 60px;             /* 需要设置宽度 */ 
			 
		 }
		 .closeBtn{
			margin-top: 5px;
			background-color: white;
			border: #2A9595 1px solid; 
			border-radius: 5px;
			color: black;
			font-size: 13px;
			margin-left: 10px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 25px;           /* 需要设置高度 */
			width: 60px;             /* 需要设置宽度 */ 
		 			 
		 }
		 .deleteBtn{
			margin-top: 5px;
			background-color: white;
			border: #2A9595 1px solid; 
			border-radius: 5px;
			color: black;
			font-size: 13px;
			margin-left: 10px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 25px;           /* 需要设置高度 */
			width: 60px;             /* 需要设置宽度 */ 
		 	margin-bottom: 10px;		 
		 }
		 .firstcloseBtn{
			 margin-top: 5px;
			 background-color: white;
			 border: #2A9595 1px solid; 
			 border-radius: 5px;
			 color: black;
			 font-size: 13px;
			 margin-left: 190px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 60px;             /* 需要设置宽度 */ 
		 }
    }
</style>