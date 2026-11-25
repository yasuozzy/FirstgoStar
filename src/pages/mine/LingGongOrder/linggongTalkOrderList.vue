
<template>
	<view class="main">
	<u-navbar
	  title="恰谈工单"
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
		<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
			<view v-if="Chosetype == 1" style="color: #2A9595;font-size: 13px;">待处理</view>
			<view v-else style="color: black;font-size: 13px;">待处理</view>
			<view class="whiteLine" v-if="Chosetype == 1"></view>
		</view>
		<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
			<view v-if="Chosetype == 2" style="color: #2A9595;font-size: 13px;">工作中</view>
			<view v-else style="color: black;font-size: 13px;">工作中</view>
			<view class="whiteLine" v-if="Chosetype == 2"></view>
		</view>
		<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
			<view v-if="Chosetype == 3" style="color: #2A9595;font-size: 13px;">待结算</view>
			<view v-else style="color: black;font-size: 13px;">待结算</view>
			<view class="whiteLine" v-if="Chosetype == 3"></view>
		</view>
		<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
			<view v-if="Chosetype == 4" style="color: #2A9595;font-size: 13px;">已完成</view>
			<view v-else style="color: black;font-size: 13px;">已完成</view>
			<view class="whiteLine" v-if="Chosetype == 4"></view>
		</view>
		<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
			<view v-if="Chosetype == 5" style="color: #2A9595;font-size: 13px;">已停止</view>
			<view v-else style="color: black;font-size: 13px;">已停止</view>
			<view class="whiteLine" v-if="Chosetype == 5"></view>
		</view>
		
	</view>
	<view  class="contentView">
		<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
			<view style="display: flex;flex-direction: row;margin-top: 10px;">
				<view style="font-size: 14px;margin-left: 15px;width: 70%;">{{item.company}}</view>
				<view style="font-size: 13px;margin-left: 15px;color: red;text-align: right;">{{item.statusFlag}}</view>
			</view>
			<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.create_time}}</view>
			<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">{{item.work_type}}{{item.work_num}}{{item.work_time}}</view>
			<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">{{item.salary}}</view>
			<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
			<view @tap.stop v-if="type == 0"  class="bottomview">
				<view v-if="item.status == 0" class="buttonView" @click="detailClick(item)">去处理</view>
				<view v-if="item.status == 1" class="buttonView" @click="handleClick(item)">去处理</view>
				<view v-if="item.status == 2" style="display: flex;flex-direction: row;width: 100%;">
					<view class="stopView" @click="stopClick(item)">停止</view>
					<view class="pauseView" @click="pauseClick(item)">暂停</view>
					<view class="checkView" @click="checkDaKa(item)">查看打卡记录</view>
				</view>
				<view v-if="item.status == 3" style="display: flex;flex-direction: row;width: 100%;">
					<view class="OpenView" @click="startClick(item)">开启</view>
					<view class="checkView" @click="checkDaKa(item)">查看打卡记录</view>
				</view>
				<view v-if="item.status == 4" style="display: flex;flex-direction: row;width: 100%;">
					<view class="OpenView" @click="sureclicks(item)">确认完成</view>
					<view class="checkView" @click="checkDaKa(item)">查看打卡记录</view>
				</view>
				<view v-if="item.status == 5 & item.is_plat == 0" style="display: flex;flex-direction: row;width: 100%;">
					<view class="jiesuanView" @click="jiesuanClick(item)">去结算</view>
					<view class="tiaojieView" @click="lawyerHelpClick()">纠纷调解</view>
				</view>
				<view v-if="item.status == 5" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="jiesuanClick(item)">去结算</view>
				</view>
				<view v-if="item.status == 6 & item.is_company_comment != 1" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="pingjiaClick(item)">去评价</view>
				</view>
			</view>
			<view @tap.stop v-if="type == 1"  class="bottomview">
				<view v-if="item.status == 0" class="buttonView" @click="signClick(item)">去处理</view>
				<view v-if="item.status == 1" class="buttonView" @click="handleClick(item)">去处理</view>
				<view v-if="item.status == 2" style="display: flex;flex-direction: row;width: 100%;">
					<view class="stopView" @click="stopClick(item)">停止</view>
					<view class="pauseView" @click="pauseClick(item)">暂停</view>
					<view class="checkView" @click="checkDaKa(item)">查看打卡记录</view>
				</view>
				<view v-if="item.status == 3" style="display: flex;flex-direction: row;width: 100%;">
					<view class="OpenView" @click="startClick(item)">开启</view>
					<view class="checkView" @click="checkDaKa(item)">查看打卡记录</view>
				</view>
				<view v-if="item.status == 4" style="display: flex;flex-direction: row;width: 100%;">
					<view class="OpenView" @click="sureclicks(item)">确认完成</view>
					<view class="checkView" @click="checkDaKa(item)">查看打卡记录</view>
				</view>
				<view v-if="item.status == 5 & item.is_plat == 0" style="display: flex;flex-direction: row;width: 100%;">
					<view class="jiesuanView" @click="jiesuanClick(item)">去结算</view>
					<view class="tiaojieView" @click="lawyerHelpClick()">纠纷调解</view>
				</view>
				<view v-if="item.status == 5" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="jiesuanClick(item)">去结算</view>
				</view>
				<view v-if="item.status == 6 & item.is_company_comment != 1" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="pingjiaClick(item)">去评价</view>
				</view>
			</view>
		</view>
	</view>
	<u-modal :show="show" @confirm="confirm" confirmText="提交" :title="title" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: column;">
			<input class="searchlocation" v-model="reason" placeholder="填写暂停/停止原因" type="text" />
		</view>
		
	</u-modal>
	</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunYuanUseWorkerTalkList,
	MineJiuYeQunYuanUseWorkerTalkStart,
	MineJiuYeQunYuanUseWorkerTalkSureOrder,
	MineJiuYeQunYuanUseWorkerTalkPauseOrder,
	MineJiuYeQunYuanUseWorkerTalkStopOrder} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const Chosetype = ref(1);
	const orderList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const type = ref('');
	const userType = ref('');
	const show = ref(false);
	const title = ref('');
	const reason = ref('');
	const stoppauseId = ref('');
		
	onLoad((options:any) => {
		
		type.value = options.type;
		userType.value = options.userType;
		console.log(type.value,userType.value);
	});
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
				status:Chosetype.value - 1,
				type:type.value,
				userType:userType.value
			};
			const res = await MineJiuYeQunYuanUseWorkerTalkList(param);
							
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
			wx.stopPullDownRefresh()
		}
	};
	const segment1Click = () => {
		
		Chosetype.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment2Click = () => {
		
		Chosetype.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment3Click = () => {
		
		Chosetype.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value= false;
		loadData();
	};
	const segment4Click = () => {
		
		Chosetype.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment5Click = () => {
		
		Chosetype.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	//去处理，我的会话
	const handleClick = (item:any) => {
		
		uni.navigateTo({
			url:'/pages/mine/LingGongOrder/MyConversation'
		})
	};
	//详情
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/linggongTalkOrderDetail?id=${item.id}&userType=${userType.value}`
		})
	};
	//开启
	const startClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id
				
			};
			const res = await MineJiuYeQunYuanUseWorkerTalkStart(param);
							
			console.log(res);
			loadData();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//确认完成
	const sureclicks = async(item:any) => {
		
		
		try {
			
			let param = {
				
				id:item.id,
				userType:userType.value,
			};
			const res = await MineJiuYeQunYuanUseWorkerTalkSureOrder(param);
							
			console.log(res);
			loadData();
				
		}catch (error) {
			console.log(error)
		}
	};
	//停止
	const stopClick = (item:any) => {
		
		title.value = "停止";
		show.value = true;
		stoppauseId.value = item.id;
	};
	const pauseClick = (item:any) => {
		
		title.value = "暂停";
		show.value = true;
		stoppauseId.value = item.id;
	};
	//确认提交，暂停/停止
	const confirm = async() => {
		
		if (reason.value.length == 0) {
			
			uni.showToast({
				title:'请填写暂停/停止原因',
				icon:'none'
			});
			return
		}else
		{
			show.value = false;
			if (title.value === '暂停') {
				
				try {
					
					let param = {
						
						id:stoppauseId.value,
						reason:reason.value,
						userType:userType.value,
					};
					const res = await MineJiuYeQunYuanUseWorkerTalkPauseOrder(param);
									
					console.log(res);
					loadData();
						
					
				}catch (error) {
					console.log(error)
				}
				
			}else if (title.value === '停止') {
				
				try {
					
					let param = {
						
						id:stoppauseId.value,
						reason:reason.value,
						userType:userType.value,
					};
					const res = await MineJiuYeQunYuanUseWorkerTalkStopOrder(param);
									
						console.log(res);
						loadData();
						
					
				}catch (error) {
					console.log(error)
				}
			}
			
			
		}
		
	};
	//去结算
	const jiesuanClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/linggongGoToPay?dataDict=${JSON.stringify(item)}`
		})
	};
	//跳转法律援助，在服务-智慧就业-法律援助
	const lawyerHelpClick = () => {
		
		uni.navigateTo({
		  url: "/pages/service/work/falnyuanzhu",
		});
	};
	//去评价
	const pingjiaClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/linggongGoPingJia?id=${item.id}&userType=${userType.value}`
		})
	};
	const checkDaKa = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/linggongCheckDaKaList?id=${item.id}&userType=${userType.value}` 
		})
	};
	//二次打卡
	const signClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/secondSignOrder?id=${item.id}&userType=${userType.value}`
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
		.contentView{
			 display: flex;
			 flex-direction: column;	
					 
		}
		.order_item{
			display: flex;
			flex-direction: column;
			 
			border-radius: 5px;
			margin-top: 10px;
			margin-left: 4%;
			width: 92%;
			background-color: white;
		}
		.bottomview{
				  display: flex;
				  flex-direction: row;
				  width: 100%;
				  height: 40px;
		}
		.buttonView{
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-radius: 5px;
		  border: #2A9595 1px solid;
		  width: 60px;
		  height: 20px;
		  margin-left: 280px;
		  margin-top: 10px;
		  color: #2A9595;
		  font-size: 12px;
		  margin-bottom: 15px;
		}
		.checkView{
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 100px;
			height: 20px;
			margin-left: 10px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.pauseView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 10px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.stopView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 95px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.OpenView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 165px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.jiesuanView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 205px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.tiaojieView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 10px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.searchlocation{
		         margin-left: 4%;
		         width: 92%;
		         height: 35px;
		         margin-top: 10px;
		         border: 1px lightgray solid;
		         border-radius: 5px;
		         font-size: 13px;
		     }

	}
</style>