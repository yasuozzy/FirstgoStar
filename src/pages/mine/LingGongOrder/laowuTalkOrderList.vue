
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
			
			<view @tap.stop  class="bottomview">
				<view v-if="item.status == 1" class="buttonView" @click="signClick(item)">去处理</view>
				
				<view v-if="item.status == 2" style="display: flex;flex-direction: row;width: 100%;">
					<view class="stopView" @click="stopClick(item)">停止</view>
					<view class="pauseView" @click="pauseClick(item)">暂停</view>
					<view class="shenheView" @click="sureclicks(item)">提交审核</view>
					<view class="checkView" @click="checkDaKa(item)">去打卡</view>
					<view class="jiesuanView" @click="jiesuanClick(item)">结算记录</view>
				</view>
				<view v-if="item.status == 3" class="buttonView" @click="checkDaKa(item)">去打卡</view>
				<view v-if="item.status == 4" class="buttonView" @click="checkDaKa(item)">去打卡</view>
				<view v-if="item.status == 5 & item.is_plat == 0" style="display: flex;flex-direction: row;width: 100%;">
					<view class="cuiyicuiView" @click="cuiyicui(item)">催一催</view>
					<view class="tiaojieView" @click="lawyerHelpClick(item)">申请法律援助</view>
				</view>
				<view v-if="item.status == 5" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="cuiyicui(item)">催一催</view>
				</view>
				<view v-if="item.status == 6 & item.is_user_comment != 1 & item.is_refund == 0" style="display: flex;flex-direction: row;width: 100%;">
					<view class="tuikuanView" @click="tuikuanClick(item)">去退款</view>
					<view class="pingjiaView" @click="pingjiaClick(item)">去评价</view>
				</view>
				<view v-if="item.status == 6 & item.is_user_comment != 1" style="display: flex;flex-direction: row;width: 100%;">
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
	<u-modal :show="cancelShow" @confirm="cancelconfirm" confirmText="去退款" :title="canceltitle" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: row;">
			<input class="searchlocation" v-model="amount" placeholder="请输入退款金额" type="text" />
			<view style="margin-left: 10px;margin-top: 15px;font-size: 13px;">元</view>
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
	MineJiuYeQunYuanUseWorkerTalkStopOrder,
	MineJiuYeQunYuanLaoWuOrderRemind,
	MineJiuYeQunYuanUseWorkerClockSettingInfo,
	MineJiuYeQunYuanLaoWuOrderGoToCanCelMoney} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const Chosetype = ref(1);
	const orderList = ref([]);
	const hasMore = ref(true);   // 是否还有更多数据
	const noMore  =ref(false); // 是否没有更多数据了
	const page = ref(1);
	const type = ref('');
	const userType = ref('');
	const show =ref(false);
	const title = ref('');
	const reason = ref('');
	const stoppauseId = ref('');
	const cancelShow =ref(false);
	const canceltitle = ref('退款金额');
	const amount = ref('');
	const cancelID = ref('');
		
	onLoad((options:any) => {
		
		type.value = options.type;
		userType.value = options.userType;
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
			    MineJiuYeQunYuanUseWorkerTalkList(param).then((res) =>{
			                    
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
			noMore.value = false;
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
			    MineJiuYeQunYuanUseWorkerTalkStart(param).then((res) =>{
			                    
			        console.log(res);
					loadData();
					
			    });
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
			    MineJiuYeQunYuanUseWorkerTalkSureOrder(param).then((res) =>{
			                    
			        console.log(res);
					loadData();
					
			    });
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
					    MineJiuYeQunYuanUseWorkerTalkPauseOrder(param).then((res) =>{
					                    
					        console.log(res);
							loadData();
							
					    });
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
					    MineJiuYeQunYuanUseWorkerTalkStopOrder(param).then((res) =>{
					                    
					        console.log(res);
							loadData();
							
					    });
					}catch (error) {
					    console.log(error)
					}
				}
				
				
			}
			
		};
		//结算记录
		const jiesuanClick = (item:any) => {
			
			uni.navigateTo({
				// url:'/pages/mine/LingGongOrder/linggongGoToPay?dataDict=' + JSON.stringify(item)
				url:`/pages/mine/LingGongOrder/laowuJieSuanNoteList?id=${item.id}`
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
		const checkDaKa = async(item:any) => {
			
			try {
			    
				let param = {
					
					order_id:item.id,
					userType:userType.value,
					userId:storage.getUserId(),
					
				};
			    MineJiuYeQunYuanUseWorkerClockSettingInfo(param).then((res) =>{
			                    
			        console.log(res);
					uni.navigateTo({
						// url:'/pages/mine/LingGongOrder/linggongCheckDaKaList?id=' + item.id + '&userType=' + userType
						url:`/pages/mine/LingGongOrder/laowuDaKa?dataDict=${JSON.stringify(res.result)}&order_id=${item.id}`
					})
					
			    });
			}catch (error) {
			    console.log(error)
			}
			
			
		};
		//二次打卡
		const signClick = (item:any) => {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/secondSignOrder?id=${item.id}&userType=${userType.value}`
			})
		};
		//催一催
		const cuiyicui = (item:any) => {
			
			try {
			    
				let param = {
					
					id:item.id,
					userId:storage.getUserId(),
				};
			    MineJiuYeQunYuanLaoWuOrderRemind(param).then((res) =>{
			                    
			        console.log(res);
					loadData();
					
			    });
			}catch (error) {
			    console.log(error)
			}
		};
		//退款
		const tuikuanClick = (item:any) => {
			
			cancelShow.value = true;
			cancelID.value = item.id;
		};
		const cancelconfirm = async() => {
			
			if (amount.value.length == 0) {
				
				uni.showToast({
					title:'请输入退款金额',
					icon:'none'
				});
				return
			}else
			{
				cancelShow.value = false;
				
				try {
				    
					let param = {
						
						userId:storage.getUserId(),
						id:cancelID.value,
						amount:amount.value
					};
				    MineJiuYeQunYuanLaoWuOrderGoToCanCelMoney(param).then((res) =>{
				                    
				        console.log(res);
						amount.value = '';
						uni.navigateTo({
						    url:'/pages/Integral/orderPayHtml?url=' + res.result
						})
						
				    });
				}catch (error) {
				    console.log(error)
				}
			}
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
			width: 60px;
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
			width: 55px;
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
			width: 55px;
			height: 20px;
			margin-left: 10px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.shenheView{
			
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
			margin-left: 10px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.cuiyicuiView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 170px;
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
			width: 100px;
			height: 20px;
			margin-left: 10px;
			margin-top: 10px;
			color: #2A9595;
			font-size: 12px;
			margin-bottom: 15px;
		}
		.tuikuanView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			background-color: #2A9595;
			width: 60px;
			height: 20px;
			margin-left: 210px;
			margin-top: 10px;
			color: white;
			font-size: 12px;
			margin-bottom: 15px;
			
		}
		.pingjiaView{
			
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