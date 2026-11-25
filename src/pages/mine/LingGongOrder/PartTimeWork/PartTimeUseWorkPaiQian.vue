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
        </u-navbar>
		<view style="width: 100%;height: 50px;background-color: white;">
			<view style="width: 100%;height: 1px;"></view>
			<input class="searchlocation" v-model="searchIndex" placeholder="搜索" type="text" />
		</view>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="titletype == 1" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="titletype == 1"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="titletype == 2" style="color: #2A9595;font-size: 13px;">工作中</view>
				<view v-else style="color: black;font-size: 13px;">工作中</view>
				<view class="whiteLine" v-if="titletype == 2"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="titletype == 3" style="color: #2A9595;font-size: 13px;">待结算</view>
				<view v-else style="color: black;font-size: 13px;">待结算</view>
				<view class="whiteLine" v-if="titletype == 3"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="titletype == 4" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="titletype == 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="titletype == 5" style="color: #2A9595;font-size: 13px;">已停止</view>
				<view v-else style="color: black;font-size: 13px;">已停止</view>
				<view class="whiteLine" v-if="titletype == 5"></view>
			</view>
			
		</view>
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				
				<view class="bottomView">
					<view style="width: 100%;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 16px;width: 50%;">用工信息</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: red;text-align: right;width: 40%;">{{item.statusFlag}}</view>
					</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">用工单位{{item.company}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">用工地点：{{item.work_location}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">用工工种：{{item.work_type}}</view>
					<view  style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">工期：{{item.work_time}}</view>
					<view  style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">用工时间：{{item.working_time}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">薪资：{{item.salary}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 16px;width: 75%;">个人信息</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">姓名：{{item.user_name}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">电话：{{item.user_mobile}}</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view >
						<view @tap.stop v-if="type == 0 & item.status == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="handleClick(item)">去处理</view>
						</view>
						<view @tap.stop v-if="type == 1 & item.status == 0" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="signClick(item)">去处理</view>
						</view>
						<view @tap.stop v-if="type == 1 & item.status == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="handleClick(item)">去处理</view>
						</view>
						<view @tap.stop v-if="item.status == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="handleClick(item)">去处理</view>
						</view>
						<view @tap.stop v-if="item.status == 2 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 20px;" @click="stopClick(item)">停止</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="pauseClick(item)">暂停</view>
							<view v-if="item.is_eva == 0" class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="gopingjiaClick(item)">去评价</view>
							<view v-if="item.is_eva == 1" class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="checkpingjiaClick(item)">查看评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;width: 100px;" @click="checkDaKaClick(item)">查看打卡记录</view>
						</view>
						<view @tap.stop v-if="item.status == 3 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view v-if="item.is_eva == 0" class="oneBtn" style="color: #2A9595;margin-left: 70px;" @click="gopingjiaClick(item)">去评价</view>
							<view v-if="item.is_eva == 1" class="oneBtn" style="color: #2A9595;margin-left: 70px;" @click="checkpingjiaClick(item)">查看评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="startClick(item)">开启</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;width: 100px;" @click="checkDaKaClick(item)">查看打卡记录</view>
						</view>
						<view @tap.stop v-if="item.status == 4 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view v-if="item.is_eva == 0" class="oneBtn" style="color: #2A9595;margin-left: 70px;" @click="gopingjiaClick(item)">去评价</view>
							<view v-if="item.is_eva == 1" class="oneBtn" style="color: #2A9595;margin-left: 70px;" @click="checkpingjiaClick(item)">查看评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="shenheClick(item)">确认完成</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;width: 100px;" @click="checkDaKaClick(item)">查看打卡记录</view>
						</view>
						<view @tap.stop v-if="item.status == 5 && item.is_plat == 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view v-if="item.is_eva == 0" class="oneBtn" style="color: #2A9595;margin-left: 100px;" @click="gopingjiaClick(item)">去评价</view>
							<view v-if="item.is_eva == 1" class="oneBtn" style="color: #2A9595;margin-left: 100px;" @click="checkpingjiaClick(item)">查看评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="jiesuanClick(item)">去结算</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="tiaojieClick(item)">纠纷调解</view>
						</view>
						<view @tap.stop v-if="item.status == 5 && item.is_plat != 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view v-if="item.is_eva == 0" class="oneBtn" style="color: #2A9595;margin-left: 180px;" @click="gopingjiaClick(item)">去评价</view>
							<view v-if="item.is_eva == 1" class="oneBtn" style="color: #2A9595;margin-left: 180px;" @click="checkpingjiaClick(item)">查看评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="jiesuanClick(item)">去结算</view>
						</view>
						<view @tap.stop v-if="item.status == 6 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view v-if="item.is_eva == 0" class="oneBtn" style="color: #2A9595;margin-left: 100px;" @click="gopingjiaClick(item)">去评价</view>
							<view v-if="item.is_eva == 1" class="oneBtn" style="color: #2A9595;margin-left: 100px;" @click="checkpingjiaClick(item)">查看评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="lianxuClick(item)">连续用工</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="detailClick(item)">查看</view>
						</view>
						
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
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkList,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkRestartOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkPauseOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkStopOrder,
	MineJiuYeQunShareUseWorkCompanyUseWorkPayToWayOne,
	MineJiuYeQunShareUseWorkPartTimeContinueOrder} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const titletype = ref(1);
	const orderList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const userType = ref('');
	const type = ref();
	const show = ref(false);
	const title = ref('');
	const reason = ref('');
	const stoppauseId = ref('');
	const searchIndex = ref('');
	const navTitle = ref('');
	
            
	onLoad((options:any) => {
		type.value = options.type;
		userType.value = options.userType;
		if (type.value == 0) {
			
			navTitle.value = "恰谈工单";
			
		}else
		{
			navTitle.value = "派遣工单";
		}
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
				status:titletype.value - 1,
				type:type.value,
				userType:userType.value,
				index:searchIndex.value
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkList(param).then((res) =>{
							
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
		
		titletype.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment2Click = () => {
		
		titletype.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment3Click = () => {
		
		titletype.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment4Click = () => {
		
		titletype.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment5Click = () => {
		
		titletype.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	//详情
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/UseWorkProtocalDetail?id=${item.id}&userType=${userType.value}&type=${type.value}`
		})
	};
	//去处理，我的会话
	const handleClick = (item:any) => {
		
		uni.navigateTo({
			url:'/pages/mine/LingGongOrder/MyConversation'
		})
	};
	//停止
	const stopClick = (item:any) => {
		
		title.value = "停止";
		show.value = true;
		stoppauseId.value = item.id;
	};
	//暂停
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
					MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkPauseOrder(param).then((res) =>{
									
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
					MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkStopOrder(param).then((res) =>{
									
						console.log(res);
						loadData();
						
					});
				}catch (error) {
					console.log(error)
				}
			}
			
			
		}
		
	};
	//打开
	const startClick = async(item:any) => {
		try {
			
			let param = {
				
				id:item.id
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkRestartOrder(param).then((res) =>{
							
				console.log(res);
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//去评价
	const gopingjiaClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeGoPingJia?id=${item.id}`
		})
	};
	//查看评价
	const checkpingjiaClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeCheckPingJia?id=${item.id}`
		})
	};
	//提交审核，确认完成
	const shenheClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id,
				userType:userType.value
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder(param).then((res) =>{
							
				console.log(res);
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//去结算
	const jiesuanClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/linggongGoToPay?dataDict=${JSON.stringify(item)}`
		})
		
	};
	
	//调解，法律援助
	const tiaojieClick = (item:any) => {
		
		uni.navigateTo({
		  url: "/pages/service/work/falnyuanzhu",
		});
	};
	//连续用工
	const lianxuClick = async(item:any) => {
		
		
		try {
			
			let param = {
				
				id:item.id,
				
			};
			MineJiuYeQunShareUseWorkPartTimeContinueOrder(param).then((res) =>{
							
				console.log(res);
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//查看打卡记录
	const checkDaKaClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeDaKaList?id=${item.order_id}`
		})
	};
	//绩效通知书
	const jixiaoClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/JiXiaoUserList?id=${item.id}`
		})
	};
	//二次签字
	const signClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/UseWorkProtocalDetail?id=${item.id}&userType=${userType.value}&type=${type.value}` 
		})
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
				border-radius: 5px;
		   }
		   .oneBtn{
				 margin-top: 5px;
				 background-color: white;
				 border: #2A9595 1px solid; 
				 border-radius: 5px;
				 color: black;
				 font-size: 13px;
				 
				 display: flex;
				 justify-content: center; /* 水平居中 */
				 align-items: center;     /* 垂直居中 */
				 height: 25px;           /* 需要设置高度 */
				 width: 70px;             /* 需要设置宽度 */ 
		   }
		   .checkBtn{
			   margin-top: 5px;
			   background-color: white;
			   border: #2A9595 1px solid; 
			   border-radius: 5px;
			   color: black;
			   font-size: 13px;
			   display: flex;
			   justify-content: center; /* 水平居中 */
			   align-items: center;     /* 垂直居中 */
			   height: 25px;           /* 需要设置高度 */
			   width: 180px;             /* 需要设置宽度 */ 
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