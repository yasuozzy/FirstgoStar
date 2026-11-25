<template>
    <view class="main">
        <u-navbar
          title="日报"
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
			  <view slot="right" @click="addClick">
				  <u-image style="margin-left: 10px;"
					:src="image"
					width="20px"
					height="20px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view class="specsView">
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind === 1" style="color: #2A9595;font-size: 13px;">我提交的</view>
				<view v-else style="color: black;font-size: 13px;">我提交的</view>
				<view class="whiteLine1" v-if="kind === 1"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === 2" style="color: #2A9595;font-size: 13px;">提交我的</view>
				<view v-else style="color: black;font-size: 13px;">提交我的</view>
				<view class="whiteLine1" v-if="kind === 2"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind === 3" style="color: #2A9595;font-size: 13px;">我的转发</view>
				<view v-else style="color: black;font-size: 13px;">我的转发</view>
				<view class="whiteLine1" v-if="kind === 3"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
				<view v-if="kind === 4" style="color: #2A9595;font-size: 13px;">转发我的</view>
				<view v-else style="color: black;font-size: 13px;">转发我的</view>
				<view class="whiteLine1" v-if="kind === 4"></view>
			</view>
			
		</view>
		<view v-if="kind == 1" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="mysetClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImg"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="display: flex;flex-direction: column;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.userName}}的日报</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{item.createTime}}</view>
					</view>
					
				</view>
				<view class="DetailView">今日工作:{{item.todayWork}}</view>
				<view class="protocalView">
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="item.readNum == item.allNum" src="/static/login/choose_select.png"></image>
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_unselect.png"></image>
				    <view v-if="item.readNum == item.allNum" style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">全部已读</view>
					<view v-else style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">{{item.readNum}}人已读</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 2" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="mysetClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImg"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="display: flex;flex-direction: column;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.userName}}的日报</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{item.createTime}}</view>
					</view>
					
				</view>
				<view class="DetailView">今日工作:{{item.todayWork}}</view>
				<view class="protocalView">
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="item.status == 1" src="/static/login/choose_select.png"></image>
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_unselect.png"></image>
				    <view v-if="item.status == 1" style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已读</view>
					<view v-else style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">未读</view>
				</view>
				<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
				<view @tap.stop>
					<view class="transferButton" @click="transferClick(item)">转发</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 3" class="contentView">
			
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="mytransferClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;color: black;margin-top: 15px;margin-left: 15px;width: 50%;">接收人</view>
					<view style="margin-top: 15px;margin-left: 10px;font-size: 12px;width: 40%;text-align: right;color: darkgray;">{{item.forwardTime}}</view>
				</view>
				
				<scroll-view scroll-x = 'true' class="tab-scroll">
					<view style="display: flex;flex-direction: row;">
						<view v-for="(perItem,perIndex) in item.userList" :key="perIndex" style="display: flex;flex-direction: column;height: 75px;width: 35px;margin-left: 15px;">
							<u-image style="margin-top: 10px;border-radius: 12px;"
							  :src="perItem.headImg?perItem.headImg:normalIcon"
							  width="35px"
							  height="35px"
							></u-image>
							<view style="margin-top: 5px;font-size: 11px;width: 35px;display: flex;text-align: center;">{{perItem.userName}}</view>
						</view>
					</view>
				</scroll-view>
				
				<view class="protocalView">
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="item.readNum == item.allNum" src="/static/login/choose_select.png"></image>
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_unselect.png"></image>
				    <view v-if="item.readNum == item.allNum" style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">全部已读</view>
				    <view v-else style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">{{item.readNum}}人已读</view>
				</view>
				<view style="font-size: 13px;color: dimgray;margin-top: 13px;margin-left: 15px;">{{item.userName}}的日报</view>
				<view class="DetailView">今日工作:{{item.todayWork}}</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 4" class="contentView">
			
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="transferMeClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.forwardHeadImg"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.forwardName}}的转发</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 11px;width: 40%;color: darkgray;text-align: right;">{{item.forwardTime}}</view>
						</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">转发内容:{{item.forwardContent}}</view>
					</view>
					
				</view>
				<view style="margin-top: 5px;margin-left: 15px;font-size: 12px;">{{item.userName}}的日报</view>
				<view class="DetailView">今日工作:{{item.todayWork}}</view>
				<view class="protocalView">
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="item.status == 1" src="/static/login/choose_select.png"></image>
				    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_unselect.png"></image>
				    <view v-if="item.status == 1" style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已读</view>
					<view v-else style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">未读</view>
				</view>
				<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
				<view @tap.stop>
					<view class="transferButton" @click="answerClick(item)" >回复</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<u-modal :show="modelshow" @confirm="confirm" showCancelButton="true" @cancel="cancel" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="content" placeholder="请输入回复内容"></textarea>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideDailyReportMySetUp,
			MineComInsideDailyReportMyTransfer,
			MineComInsideDailyReportTransferMe,
			MineComInsideDailyReportTransferMeAnswer} from '@/api/mine';
	
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const image = ref("/static/mine/addItemImage.png");
	const kind = ref(1);
	const dataList = ref([
	]);
	const selected = ref(false);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
	const page = ref(1);
	const normalIcon = ref('/static/service/normalIcon.png');
	const forwardId = ref('');
	const modelshow = ref(false);
	const title = ref('请回复');
	const content = ref('');
	const estId = ref('');
           
	onLoad((options:any) => {
		estId.value = decodeURIComponent(options.estId);
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
		
		if (kind.value == 1) {
			
			loadData();
			
		}else if (kind.value == 2) {
			
			loadForMeData();
			
		}else if (kind.value == 3) {
			
			loadTransferData();
			
		}else if (kind.value == 4) {
			
			loadTransferMeData();
		}
		
	});
	//上拉刷新
	onReachBottom(() => {
		
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		if (kind.value == 1) {
			
			loadData();
			
		}else if (kind.value == 2) {
			
			loadForMeData();
			
		}else if (kind.value == 3) {
			
			loadTransferData();
			
		}else if (kind.value == 4) {
			
			loadTransferMeData();
		}
	});
       
	const loadData = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:10,
				type:kind.value,
						   
			};
			const res = await MineComInsideDailyReportMySetUp(param);
							
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
	const loadForMeData = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:10,
				type:kind.value,
				onlyRead:0,     
			};
			const res = await MineComInsideDailyReportMySetUp(param);
							
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
	const loadTransferData = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:10, 
			};
			const res = await MineComInsideDailyReportMyTransfer(param);
							
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
	const loadTransferMeData = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:10, 
			};
			const res = await MineComInsideDailyReportTransferMe(param);
							
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
	const goBack= () => {
			
		uni.navigateBack()
	};
	const kind1Click = () => {
		
		kind.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadData();
	
	};
	const kind2Click = () => {
		
		kind.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadForMeData();
	};
	const kind3Click = () => {
		
		kind.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadTransferData();
	};
	const kind4Click = () => {
		
		kind.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadTransferMeData();
	};
	//转发
	const transferClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/transferMation?reportId=${encodeURIComponent(item.reportId)}&type=${encodeURIComponent(kind.value)}`
		})
	};
	
	//添加日报
	const addClick = () => {
		console.log(estId);
		uni.navigateTo({
			url:`/pages/mine/companyInservice/AddRiBao?estId=${encodeURIComponent(estId.value)}`
		})
		
	};
	//我提交的，提交我的,详情
	const mysetClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/RiBaiMySetDetail?reportId=${encodeURIComponent(item.reportId)}&type=${encodeURIComponent(kind.value)}`
		})
	};
	const mytransferClick = (item:any) =>{
		
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/RiBaoMyTransferDetail?reportId=${encodeURIComponent(item.reportId)}&forwardId=${encodeURIComponent(item.forwardId)}`
		})
	};
	const transferMeClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/RiBaoTransferMeDetail?reportId=${encodeURIComponent(item.reportId)}&forwardId=${encodeURIComponent(item.forwardId)}`
		})
	};
	//点击回复
	const answerClick = (item:any) => {
		modelshow.value = true;
		forwardId.value = item.forwardId;
	};
	const confirm = async() =>{
		
	   if (content.value.length == 0) {
			
			uni.showToast({
				title:'请输入回复内容',
				icon:'none'
			})
			return;
	   }
	   modelshow.value = false;
	   try {
		   
		let param = {
			
			forwardId:forwardId.value,
			userId: storage.getUserId(),
			replyContent:content.value,
			
		};
		const res = await MineComInsideDailyReportTransferMeAnswer(param);
						   
		console.log(res);
		uni.showToast({
			title:'回复成功'
		});
		loadData();
		content.value = '';
			
		}catch (error) {
			console.log(error)
		}
	};
	const cancel = () => {
		modelshow.value = false;
	};

    
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
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
	 		 height: 50px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 
	 }
	 .whiteLine1{
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
	 		 width: 100%;
	 		 
	 }
	 .protocalView{
	          display: flex;
	          flex-direction: row;
	          width: 100%;
		}
		.DetailView{
			margin-left: 15px;
			margin-top: 10px;
			margin-bottom: 10px;
			width: 92%;
			font-size: 13px;
			color: gray;
			white-space: nowrap;      /* 禁止换行 */
			  overflow: hidden;         /* 隐藏溢出内容 */
			  text-overflow: ellipsis;  /* 显示省略号 */
			  // width: 200px;            /* 设置固定宽度 */
		}
		.tab-scroll{
			display: flex;
			flex-direction: row;
			height: 75px;
			margin-top: 10px;
		}
		.transferButton{
			
			margin-top: 14px;
			background-color:#2A9595;
			border-radius: 8px;
			color: white;
			font-size: 13px;
			margin-left: 280px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 30px;           /* 需要设置高度 */
			width: 80px;             /* 需要设置宽度 */
			margin-top: 10px;
		}
		.textAreaView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 height: 100px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		}
    }
</style>