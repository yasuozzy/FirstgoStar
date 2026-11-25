<template>
    <view class="main">
        <u-navbar
          title="洽谈用工"
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
					<view v-if="userType == 0" style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">工期：{{item.working_time}}</view>
					<view v-if="userType == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">工期：{{item.work_time}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">薪资：{{item.salary}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 16px;width: 75%;">派工信息</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">派工单位：{{item.com_name}}</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view v-if="userType == 0">
						<view v-if="item.status == 0" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" >去处理</view>
						</view>
						<view @tap.stop v-if="item.status == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="chatClick(item)">去处理</view>
						</view>
						<view @tap.stop v-if="item.status == 2 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 20px;" @click="stopClick(item)">停止</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="pauseClick(item)">暂停</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="pingjiaClick(item)">评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="shenheClick(item)">提交审核</view>
						</view>
						<view @tap.stop v-if="item.status == 3 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 180px;" @click="pingjiaClick(item)">评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="openClick(item)">开启</view>
						</view>
						<view @tap.stop v-if="item.status == 4 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 180px;" @click="pingjiaClick(item)">评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="shenheClick(item)">确认完成</view>
						</view>
						<view @tap.stop v-if="item.status == 5 && item.is_plat == 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 100px;" @click="pingjiaClick(item)">评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="jiesuanClick(item)">去结算</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="tiaojieClick(item)">纠纷调解</view>
						</view>
						<view @tap.stop v-if="item.status == 5 && item.is_plat > 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 180px;" @click="pingjiaClick(item)">评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="jiesuanClick(item)">去结算</view>
						</view>
						<view @tap.stop v-if="item.status == 6 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 180px;" @click="pingjiaClick(item)">评价</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="detailClick(item)">查看</view>
						</view>
						<view @tap.stop v-if="item.status == 8" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="pingjiaClick(item)">评价</view>
						</view>
					</view>
					<view v-if="userType == 1">
						<view @tap.stop v-if="item.status == 1" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="oneBtn" style="color: #2A9595;margin-left: 270px;" @click="detailClick(item)">去处理</view>
						</view>
						<view @tap.stop v-if="item.status == 2" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 70px;display: flex;flex-direction: column;">
							<view style="display: flex;flex-direction: row;">
								<view class="oneBtn" style="color: #2A9595;margin-left: 100px;" @click="shenheClick(item)">提交审核</view>
								<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="pauseClick(item)">暂停</view>
								<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="stopClick(item)">停止</view>
							</view>
							<view class="checkBtn" style="color: #2A9595;margin-left: 150px;margin-top: 10px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
						</view>
						<view @tap.stop v-if="item.status == 3" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="checkBtn" style="color: #2A9595;margin-left: 70px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="detailClick(item)">查看</view>
						</view>
						<view @tap.stop v-if="item.status == 4" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="checkBtn" style="color: #2A9595;margin-left: 70px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="detailClick(item)">查看</view>
						</view>
						<view @tap.stop v-if="item.status == 5 && item.is_plat == 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="checkBtn" style="color: #2A9595;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="cuiyicuiClick(item)">催一催</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="tiaojieClick(item)">法律援助</view>
						</view>
						<view @tap.stop v-if="item.status == 5 && item.is_plat > 0 " style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="checkBtn" style="color: #2A9595;margin-left: 70px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="cuiyicuiClick(item)">催一催</view>
						</view>
						<view @tap.stop v-if="item.status == 6" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="checkBtn" style="color: #2A9595;margin-left: 70px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
							<view class="oneBtn" style="color: #2A9595;margin-left: 10px;" @click="paijiesuanClick(item)">去结算</view>
						</view>
						<view @tap.stop v-if="item.status == 8" style="margin-top: 10px;margin-left: 10px;font-size: 12px;margin-bottom: 10px;height: 30px;display: flex;flex-direction: row;">
							<view class="checkBtn" style="color: #2A9595;margin-left: 150px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
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
	import {MineJiuYeQunShareUseWorkCompanyUseWorkTalkList,
	MineJiuYeQunShareUseWorkCompanyUseWorkPauseOrder,
	MineJiuYeQunShareUseWorkCompanyUseWorkStopOrder,
	MineJiuYeQunShareUseWorkCompanyUseWorkOpenOrder,
	MineJiuYeQunShareUseWorkCompanyUseWorkShenHeSure,
	MineJiuYeQunShareUseWorkCompanyUseWorkPayToWayOne,
	MineJiuYeQunShareUseWorkCompanyUseWorkCuiYiCui} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const titletype = ref(1);
	const orderList = ref([]);
	const loading = ref(false);    // 是否正在加载
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const userType = ref('');
	const type = ref('');
	const show = ref(false);
	const title = ref('');
	const reason = ref('');
	const stoppauseId = ref('');
            
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
				status:titletype.value - 1,
				type:type.value,
				userType:userType.value                           
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkTalkList(param).then((res) =>{
							
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
		page.value= 1;
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
			url:`/pages/mine/LingGongOrder/shareUseWork/UseSendWorkDetail?id=${item.id}&userType=${userType.value}`
		})
	};
	//去处理，聊天界面
	const chatClick = (item:any) => {
		
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
					MineJiuYeQunShareUseWorkCompanyUseWorkPauseOrder(param).then((res) =>{
									
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
					MineJiuYeQunShareUseWorkCompanyUseWorkStopOrder(param).then((res) =>{
									
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
	const openClick = async(item:any) => {
		try {
			
			let param = {
				
				id:item.id
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkOpenOrder(param).then((res) =>{
							
				console.log(res);
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//评价
	const pingjiaClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/JiXiaoPingJiaList?id=${item.id}`
		})
	};
	//提交审核，确认完成
	const shenheClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id,
				userType:userTypeitem.id
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkShenHeSure(param).then((res) =>{
							
				console.log(res);
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//去结算
	const jiesuanClick = async(item:any) => {
		
		//为0，app/dayjobCompany/salaryPay
		if (item.pay_to_way == 0) {
			
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/shareUseWork/talkUseWorkJieSuan?id=${item.id}&userType=${userType.value}` 
			})
		
		}else
		{
			try {
				
				let param = {
					
					id:item.id,
					userType:userType
					
				};
				MineJiuYeQunShareUseWorkCompanyUseWorkPayToWayOne(param).then((res) =>{
								
					console.log(res);
					//为1，app/dayjobCompany/salaryComPayWorker
					uni.navigateTo({
						url:`/pages/mine/LingGongOrder/shareUseWork/talkUseWorkTwoJieSuan?id=${item.id}&userList=${JSON.stringify(res.result)}`
					})
					
				});
			}catch (error) {
				console.log(error)
			}
			
			
		}
		
	};
	const paijiesuanClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id,
				userType:userType.value
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkPayToWayOne(param).then((res) =>{
							
				console.log(res);
				//为1，app/dayjobCompany/salaryComPayWorker
				uni.navigateTo({
					url:`/pages/mine/LingGongOrder/shareUseWork/talkUseWorkTwoJieSuan?id=%{item.id}&userList=${JSON.stringify(res.result)}`
				})
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//调解，法律援助
	const tiaojieClick = (item:any) => {
		
		uni.navigateTo({
		  url: "/pages/service/work/falnyuanzhu",
		});
	};
	//催一催
	const cuiyicuiClick = async(item:any) => {
		
		
		try {
			
			let param = {
				
				id:item.id,
				userId:storage.getUserId(),
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkCuiYiCui(param).then((res) =>{
							
				console.log(res);
				loadData();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//绩效通知书
	const jixiaoClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/JiXiaoUserList?id=${item.id}`
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