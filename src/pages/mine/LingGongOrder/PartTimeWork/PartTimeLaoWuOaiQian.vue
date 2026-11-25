
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
					<view style="font-size: 14px;margin-left: 15px;width: 70%;">{{item.work_location}}</view>
					<view style="font-size: 13px;margin-left: 15px;color: red;text-align: right;">{{item.statusFlag}}</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.create_time}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">用工时间:{{item.working_time}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">{{item.work_type}}{{item.work_num}}{{item.work_time}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">{{item.salary}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view @tap.stop  class="bottomview">
					
					<view v-if="type == 0 & item.status == 1" class="buttonView" @click="handleClick(item)">去处理</view>
					<view v-if="type == 1 & item.status == 1" class="buttonView" @click="signClick(item)">去处理</view>
					<view v-if=" type == 1 & item.status == 0" class="buttonView" @click="handleClick(item)">去处理</view>
					<view v-if="item.status == 2" style="display: flex;flex-direction: column;width: 100%;">
						<view style="display: flex;flex-direction: row;width: 100%;">
							<view class="shenheView" @click="sureclicks(item)">提交审核</view>
							<view class="stopView" @click="stopClick(item)">停止</view>
							<view class="pauseView" @click="pauseClick(item)">暂停</view>
							<view class="checkView" @click="checkDaKa(item)">去打卡</view>
						</view>
						<view v-if="item.is_eva == 1" class="checkBtn" style="color: #2A9595;margin-left: 150px;margin-top: 10px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
					</view>
					<view v-if="item.status == 3" style="display: flex;flex-direction: row;width: 100%;">
						<view v-if="item.is_eva == 1" class="checkBtn" style="color: #2A9595;margin-left: 10px;margin-top: 10px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
						<view v-if="item.is_eva == 0" style="margin-left: 210px;" class="OpenView" @click="startClick(item)">开启</view>
						<view v-if="item.is_eva == 1" style="margin-left: 10px;" class="OpenView" @click="startClick(item)">开启</view>
						<view class="checkView" @click="checkDaKa(item)">去打卡</view>
					</view>
					<view v-if="item.status == 4" style="display: flex;flex-direction: row;width: 100%;">
						<view v-if="item.is_eva == 1" class="checkBtn" style="color: #2A9595;margin-left: 90px;margin-top: 10px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
						<view v-if="item.is_eva == 1" style="margin-left: 10px;" class="checkView" @click="checkDaKa(item)">去打卡</view>
						<view v-if="item.is_eva == 0" style="margin-left: 280px;" class="checkView" @click="checkDaKa(item)">去打卡</view>
					</view>
					<view v-if="item.status == 5 & item.is_plat == 0" style="display: flex;flex-direction: row;width: 100%;">
						<view v-if="item.is_eva == 1" class="checkBtn" style="color: #2A9595;margin-left: 90px;margin-top: 10px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
						<view v-if="item.is_eva == 1" style="margin-left: 10px;" class="tiaojieView" @click="lawyerHelpClick()">纠纷调解</view>
						<view v-if="item.is_eva == 0" style="margin-left: 280px;" class="tiaojieView" @click="lawyerHelpClick()">纠纷调解</view>
					</view>
					
					<view v-if="item.status == 6" style="display: flex;flex-direction: row;width: 100%;">
						<view v-if="item.is_eva == 1" class="checkBtn" style="color: #2A9595;margin-left: 90px;margin-top: 10px;" @click="jixiaoClick(item)">查看《绩效考核结果通知书》</view>
						<view v-if="item.is_eva == 1" style="margin-left: 10px;" class="buttonView" @click="detailClick(item)">查看</view>
						<view v-if="item.is_eva == 0" style="margin-left: 280px;" class="buttonView" @click="detailClick(item)">查看</view>
					</view>
				</view>
				
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" confirmText="提交" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="reason" placeholder="填写暂停/停止原因" type="text" />
			</view>
		</u-modal>
		<uni-popup ref="popupRef" type="center">
			<view class="popView">
				<view style="margin-top: 10px;width: 100%;color: blue;font-size: 18px;text-align: center;" @click="jixiaoShowClick()">《绩效考核结果通知书》</view>
				<view class="scroll-view" v-if="viewhidden == 1" >
					
					<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;color: black;font-size: 13px;">派遣人员:</view>
						<view style="margin-top: 10px;margin-left: 20px;color: black;font-size: 13px;">{{user_name}}</view>
					</view>
					<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 90px;border: black solid 1px;font-size: 13px; ">{{eva_content}}</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">图片描述</view>
					<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
						<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in eva_picArr"  @click="open(index)">
							<u-image
							  :src="item"
							  width="60px"
							  height="80px"
							></u-image>
						</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">满意程度</view>
						<view style="margin-top: 15px;margin-left: 15px;">
							<u-rate :count="count" v-model="satisfy_score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">技术水平</view>
						<view style="margin-top: 15px;margin-left: 15px;">
							<u-rate :count="count" v-model="skill_score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
						</view>
					</view>
					<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
					<view v-if="salary_pay" style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="color: red;margin-left: 15px;margin-top: 13px;">*</view>
						<view style="margin-top: 10px;color: black;font-size: 13px;margin-left: 3px;">已结算金额:</view>
						<view style="margin-top: 10px;margin-left: 20px;color: black;font-size: 13px;">{{salary_pay}}元</view>
					</view>
					<view v-if="cut_amt" style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="color: red;margin-left: 15px;margin-top: 13px;">*</view>
						<view style="margin-top: 10px;color: black;font-size: 13px;margin-left: 3px;">扣款金额:</view>
						<view style="margin-top: 10px;margin-left: 20px;color: black;font-size: 13px;">{{cut_amt}}元</view>
					</view>
					<view v-if="cut_content" style="width: 100%;height: 30px;display: flex;flex-direction: row;">
						<view style="color: red;margin-left: 15px;margin-top: 13px;">*</view>
						<view style="margin-top: 10px;color: black;font-size: 13px;margin-left: 3px;">扣款说明:</view>
						<view style="margin-top: 10px;margin-left: 20px;color: black;font-size: 13px;">{{cut_content}}</view>
					</view>
				</view>
				<view class="backButton" @click="backClick()">返回</view>
			</view>   
		</uni-popup>
		<!-- 查看器 -->
		<div v-if="picshow" class="overlay" @click="close">
		  <div 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		  >
			<div class="slides" :style="slideStyle">
			  <img v-for="img in eva_picArr" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ eva_picArr.length }}</div>
		</div>
	</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkList,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkRestartOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkPauseOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkStopOrder,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKa,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCheckJiXiaoBook} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const navTitle = ref('');
	const Chosetype = ref(1);
	const orderList = ref([]);
	const loading = ref(false);      // 是否正在加载
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const type = ref();
	const userType = ref('');
	const show = ref(false);
	const title = ref('');
	const reason = ref('');
	const stoppauseId = ref('');
	const searchIndex = ref('');
	const viewhidden = ref(0);
	const user_name = ref('');
	const eva_content = ref('');
	const satisfy_score = ref('');
	const skill_score = ref('');
	const salary_pay = ref('');
	const cut_amt = ref('');
	const cut_content = ref('');
	const eva_picArr = ref([]);
	const picshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const popupRef = ref(null);
		
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
				status:Chosetype.value - 1,
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
		
		Chosetype.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment2Click = () => {
		
		Chosetype.value = 2;
		page.value= 1;
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
	//去处理，我的会话
	const handleClick = (item:any) => {
		
		uni.navigateTo({
			url:'/pages/mine/LingGongOrder/MyConversation'
		})
	};
	//详情
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/UseWorkProtocalDetail?id=${item.id}&userType=${userType.value}&type=${type.value}` 
		})
	};
	//开启
	const startClick = (item:any) => {
		
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
	//确认完成
	const sureclicks = (item:any) => {
		
		
		try {
			
			let param = {
				
				id:item.id,
				userType:userType.value,
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder(param).then((res) =>{
							
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
	//暂停/停止
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
	//去打卡
	const checkDaKa = (item:any) => {
		
		
		try {
			
			let param = {
				
				order_id:item.id,
				userType:userType.value,
				userId:storage.getUserId(),
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKa(param).then((res) =>{
							
				console.log(res);
				uni.navigateTo({
					
					url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeDaka?dataDict=${JSON.stringify(res.result)}&order_id=${item.id}`
				})
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//二次签字
	const signClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/PartTimeWork/UseWorkProtocalDetail?id=${item.id}&userType=${userType.value}&type=${type.value}`
		})
	};
	const jixiaoClick = (item:any) => {
		
		user_name.value = item.user_name;
		try {
			
			let param = {
				
				id:item.id,
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCheckJiXiaoBook(param).then((res) =>{
							
				console.log(res);
				eva_content.value = res.result.eva_content;
				satisfy_score.value = res.result.satisfy_score;
				skill_score.value = res.result.skill_score;
				salary_pay.value = res.result.salary_pay;
				cut_amt.value = res.result.cut_amt;
				cut_content.value = res.result.cut_content;
				const pics = res.result.eva_pic;
				eva_picArr.value = pics.split(',');
				// $refs.popup.open('center');
				popupRef.value?.open();
				
			});
		}catch (error) {
			console.log(error)
		}
		
		
	};
	const jixiaoShowClick = () => {
		
		viewhidden.value = 1;
	};
	const backClick = () => {
		
		// $refs.popup.close();
		popupRef.value?.close();
		viewhidden.value = 0;
	};
	const slideStyle = computed(() => {
		  return {
			transform: `translateX(-${current.value * 100}%)`
		  };
		});
	
	const open = (index:any) => {
		current.value = index;
		picshow.value = true;
	};
	const close = () => {
		picshow.value = false;
	};    
	const touchStart = (e:any) => {
		startX.value = e.touches[0].clientX;
	};
		
	const touchMove = (e:any) => {
		moveX.value = e.touches[0].clientX;
	};
		
	const touchEnd = () => {
		
		const diff = startX.value - moveX.value
		  
		if (Math.abs(diff) > 50) { // 滑动距离阈值
			if (diff > 0 && current.value < eva_picArr.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
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
		.checkBtn{
		   margin-top: 5px;
		   background-color: white;
		   border: #2A9595 1px solid; 
		   border-radius: 5px;
		   color: black;
		   font-size: 12px;
		   display: flex;
		   justify-content: center; /* 水平居中 */
		   align-items: center;     /* 垂直居中 */
		   height: 20px;           /* 需要设置高度 */
		   width: 180px;             /* 需要设置宽度 */ 
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
		.shenheView{
			
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: #2A9595 1px solid;
			width: 60px;
			height: 20px;
			margin-left: 25px;
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
		 .popView{
		 			 
			width: calc(100vw - 60px);
			max-height: calc(100vh - 200px);
			background-color: #fff;
			border-radius: 16px;
			overflow: hidden;
			margin: 0 30px;
		 			 
		 }
		 .scroll-view {
		 			 
		   width: 100%;
		    max-height: calc(100vh - 230px);
		    overflow-y: auto;  /* 关键：允许垂直滚动 */
		    -webkit-overflow-scrolling: touch;  /* iOS平滑滚动 */
		    padding: 30rpx;
		    box-sizing: border-box;
		 }
		 .backButton{
		 			 
			margin-left: 6%;
			margin-bottom: 10px;
			margin-top: 10px;
			width: 88%;
			height: 30px;
			color: blue;
			font-size: 18px;
			border: blue solid 1px;
			border-radius: 5px;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
		 }
		 .overlay {
		        position: fixed;
		        top: 0;
		        left: 0;
		        width: 100%;
		        height: 100%;
		        background: black;
		        z-index: 9999;
		      }
		      
		      .swipe-container {
		        width: 100%;
		        height: 100%;
		        overflow: hidden;
		      }
		      
		      .slides {
		        display: flex;
		        width: 100%;
		        height: 100%;
		        transition: transform 0.3s ease;
		      }
		      
		      .slide {
		        width: 100%;
		        height: 100%;
		        object-fit: contain;
		        flex-shrink: 0;
		      }
		      
		      .counter {
		        position: absolute;
		        bottom: 50rpx;
		        left: 50%;
		        transform: translateX(-50%);
		        color: white;
		      }

	}
</style>