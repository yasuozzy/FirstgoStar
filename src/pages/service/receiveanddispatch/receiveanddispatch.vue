<template>
    <view class="container">
    	
    	<view class="custom-navbar">
    	  <view class="navbar-content">
    	    <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
    	    <view class="search-container">
    	      <u-search 
    	        placeholder="输入运单号/电话/姓名查询订单" 
    	        v-model="keyword" 
    	        :show-action="false"
    	        shape="square"
    	        bg-color="#f5f5f5"
    	      ></u-search>
    	    </view>
			<view style="margin-top: calc(var(--status-bar-height));margin-left: 10px;display: flex;flex-direction: column;" @click="scanClick">
				 <image style="margin-left: 1px;width: 20px;height: 20px;" :src="scanwhite"></image>
				<view style="font-size: 7px;color: white;margin-left: 3px;">扫码</view>
			</view>
    	  </view>
    	</view>
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 15px;">我的收件</view>
				<view v-else style="color: black;font-size: 15px;">我的收件</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type == 2" style="color: #2A9595;font-size: 15px;">我的寄件</view>
				<view  v-else style="color: black;font-size: 15px;">我的寄件</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			
		</view>
		<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view class="listView" v-if="type == 1">
			<view class="list_item" v-for="(item,index) in myreceiveList" :key="index" @click="detailClick">
				<view class="headerView">
					<view style="width: 50%;">{{item.order_no}}</view>
					<view class="statusView" style="color: black;" v-if="item.kdState === 0">无轨迹</view>
					<view class="statusView" v-if="item.kdState === 1">已揽收</view>
					<view class="statusView" v-if="item.kdState === 2">在途中</view>
					<view class="statusView" style="color: black;" v-if="item.kdState === 3">已签收</view>
					<view class="statusView" style="color: black;" v-if="item.kdState === 4">问题件</view>
				</view>
				<view class="specsView">发件：{{item.sender_name}}{{item.sender_tel}}</view>
				<view class="specsView">状态：{{item.detailstatus}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
			
		</view>
		<view class="listView" v-if="type == 2">
			<view class="list_item" v-for="(item,index) in myreceiveList" :key="index" @click="detailClick(item)">
				<view class="rightView">
					<view class="headerView">
						<view v-if="item.waybill_no" style="width: 80%;">{{item.waybill_no}}</view>
						<view v-if="!item.waybill_no" style="width: 80%;" >点击上传物流编号</view>
						<view class="statusView" style="color: black;" v-if="item.kdState === 0">无轨迹</view>
						<view class="statusView" v-if="item.kdState === 1">已揽收</view>
						<view class="statusView" v-if="item.kdState === 2">在途中</view>
						<view class="statusView" style="color: black;" v-if="item.kdState === 3">已签收</view>
						<view class="statusView" style="color: black;" v-if="item.kdState === 4">问题件</view>
					</view>
					<view class="specsView">寄件：{{item.receiver_name}}{{item.receiver_tel}}</view>
					<view class="specsView">状态：{{item.lastTraces.AcceptStation ? item.lastTraces.AcceptStation : '暂无'}}</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
				</view>
				<view class="specsline"></view>
			</view>
		</view>
		<view class="floating-ball" @click="fabClick">发件</view>
		<u-modal :show="show" @confirm="codeConfirm" confirmText="确定" title="请输入物流编号" showCancelButton="true" @cancel="codeCancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="LogisticCode" placeholder="请输入物流编号" type="text" />
			</view>
		</u-modal>
    </view>
</template>


<script setup lang="ts">
	import {serviceReceiveMyGetIn,
	SendAndReceivementUpdateWaybillInfo} from '@/api/service';
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const horizontal = ref('right');
	const myreceiveList = ref([
	]);
	const loading = ref(false);     // 是否正在加载
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);    // 是否没有更多数据了
	const page = ref(1);
	const lastTraces = ref([]);
	const scanwhite = ref('/static/service/scanwhite.png');
	const show = ref(false);
	const LogisticCode = ref('');
	const orderItem = ref({});

	onMounted(() => {
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loading.value = false;
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
				size:10,
				serverType:type.value,
										  
			};
			serviceReceiveMyGetIn(param).then((res) =>{
							
				console.log(res);
				if (page.value === 1) {
											
					myreceiveList.value = res.result;
					
				}else
				{
					// 正确的数组合并方式
					res.result.forEach(item => {
						myreceiveList.value.push(item)
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
	const goBack= () => {
		   
	   uni.navigateBack()
   };
	//切换segment
	const segment1Click = () => {
		
		type.value = 1;
		loadData();
	};
	const segment2Click = () => {
		
		type.value = 2;
		loadData();
	};
	const codeConfirm = () => {
		
		if(LogisticCode.value.length == 0){
			
			uni.showToast({
				title:'请输入物流编号',
				icon:'none'
			})
			return
		}
		show.value = false;
		try {
			let param = {
				orderNo: orderItem.value.order_no,
				LogisticCode: LogisticCode.value,
				orderType:1
			};
			SendAndReceivementUpdateWaybillInfo(param).then((res: any) => {
				console.log(res);
				if(res.success == true){
					
					loadData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
		
	};
	const detailClick = (item:any) => {
		
		if(item.waybill_no){
			
			uni.navigateTo({
				url:`/pages/service/receiveanddispatch/logisticsinformation?order_no=${item.order_no}&waybill_no=${item.waybill_no}&shipperCode=${item.shipperCode}`
			})
		}else
		{
			show.value = true;
			orderItem.value = item;
		}
		
	};
	const codeCancelClick = () => {
		
		show.value = false;
	};
	//发件
	const fabClick = () => {
		uni.navigateTo({
			url:'/pages/service/receiveanddispatch/postgoods'
		})
	};
	const scanClick = () =>{
		uni.scanCode({
		  onlyFromCamera: true,
		  success: (res) => {
			console.log("扫码结果:", res);
			uni.showToast({
			  title: "扫码成功",
			  icon: "success",
			});
		  },
		  fail: (err) => {
			console.error("扫码失败:", err);
			uni.showToast({
			  title: "扫码失败",
			  icon: "none",
			});
		  },
		});
	};
       
</script>

<style lang="scss" scoped>
    .container {
    	height: 100%;
    	
    	background: white;
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
    	
    	.search-container {
    	  flex: 1;
    	  margin-left: 10px;
    	  margin-top: calc(var(--status-bar-height));
    	  
    	}
		.greenHeaderView{
			display: flex;
			flex-direction: row;
			background-color: white;
			width: 100%;
			height: 50px;
			
		}
		.whiteLine{
				 margin-left: 40%;
				 margin-top: 5px;
				 width: 20%;
				 height: 2px;
				 background-color: #2A9595;
		}
		.floating-ball {
		  position: fixed;
		  right: 20px;
		  bottom: 220px;
		  width: 60px;
		  height: 60px;
		  background-color: #2A9595;
		  color: white;
		  border-radius: 50%;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  font-size: 14px;
		  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		  cursor: pointer;
		  z-index: 999;
		  user-select: none;
		}
		
		.floating-ball:active {
		  transform: scale(0.95);
		  opacity: 0.9;
		}
		.listView{
			display: flex;
			flex-direction: column;
			width: 100%;
			background-color: white;
		}
		.list_item{
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100px;
		}
		.headerView{
			display: flex;
			flex-direction: row;
			margin-left: 4%;
			margin-top: 10px;
			width: 92%;
			height: 30px;
			font-size: 14px;
		}
		.specsView{
			margin-left: 4%;
			margin-top: 5px;
			width: 92%;
			height: 30px;
			font-size: 13px;
			color: gray;
		}
		.topView{
			display: flex;
			flex-direction: row;
			margin-left: 4%;
			margin-top: 10px;
			width: 92%;
			height:80px;
			font-size: 14px;
			margin-bottom: 10px;
		}
		.rightView{
			display: flex;
			flex-direction: column;
			width: 100%;
		}
		.specsline{
			
			width: 100%;
			height: 1px;
			background-color: aliceblue;
			margin-top: 8px;
		}
		.statusView{
			width: 50%;
			text-align: right;
			color: #2A9595;
			font-size: 13px;
		}
		.searchlocation{
			 margin-left: 4%;
			 width: 92%;
			 height: 35px;
			 margin-top: 15px;
			 border: 1px lightgray solid;
			 border-radius: 5px;
			 font-size: 13px;
		 }
    }
</style>