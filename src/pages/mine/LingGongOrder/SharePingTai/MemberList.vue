<template>
    <view class="main">
        <u-navbar
          title="员工管理"
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
			<view class="content_item" v-for="(item,index) in orderList" :key="index" >
				<image style="margin-top: 10px;margin-left: 10px;width: 80px;height: 80px;background-color: #2A9595;border-radius: 40px;" :src="myImage"></image>
				<view class="bottomView">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.name}}·{{item.sex}}·{{item.age}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">工种：{{item.work}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">工作时段：{{item.work_time}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10px;margin-bottom: 10px;display: flex;flex-direction: column;">
					<view class="detailBtn" @click="detailClick(item)">查看详情</view>
					<view v-if="item.accept_status == 1" class="StopBtn" @click="stopClick(item)">停止接单</view>
					<view v-if="item.accept_status != 1" class="StopBtn" >停止接单</view>
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
	import {MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberList,
	MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberStopOrder,
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
	const myImage = ref('/static/service/myIconImage.png');
           
	onShow(() => {
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
            			                             
            		};
            	    MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberList(param).then((res) =>{
            	                    
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
			//详情
			const detailClick = (item:any) => {
				
				uni.navigateTo({
					url:`/pages/mine/LingGongOrder/SharePingTai/pingtaiMemberDetail?id=${item.id}`
				})
			};
			//关闭
			const stopClick = (item:any) => {
				
				show.value = true;
				title.value = '确认停止';
				idstring.value = item.id;				
			};
			
			const addNewClick = () => {
				
				uni.navigateTo({
					url:'/pages/mine/LingGongOrder/SharePingTai/NewAddMember'
				})
			};
			const confirm = () => {
				
				
					
				try {
					
					let param = {
						
						id:idstring.value
					};
					
					MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberStopOrder(param).then((res) =>{
						
						console.log(res);
						show.value = false;
						loadData();
					});
				} catch (error) {
					console.log(error)
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
         	flex-direction: row;
         	margin-left: 3%;
         	width: 94%;
         	
         	background-color: white;
         	margin-top: 10px;
         }
         .bottomView{
         	display: flex;
         	flex-direction: column;
         	width: 45%;
         	margin-top: 5px;
         	background-color: white;
         	
         }
		 
		 .detailBtn{
			margin-top: 5px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 13px;
			margin-left: 10px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 40px;           /* 需要设置高度 */
			width: 80px;             /* 需要设置宽度 */ 
			 
		 }
		 .StopBtn{
			margin-top: 10px;
			background-color: red;
			
			border-radius: 5px;
			color: white;
			font-size: 13px;
			margin-left: 10px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 40px;           /* 需要设置高度 */
			width: 80px;             /* 需要设置宽度 */ 
		 			 
		 }
		
		
    }
</style>