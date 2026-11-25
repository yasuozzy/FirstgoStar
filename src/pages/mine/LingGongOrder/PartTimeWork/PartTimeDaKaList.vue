<template>
    <view class="main">
        <u-navbar
          title="打卡记录"
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
			  <view slot="right" @click="settingClick()">
				  <view class="homestayView">补卡</view>
			  </view>
		  </template>
        </u-navbar>
		<view style="width: 100%;background-color: white;">
			<view style="background-color: white;height: 10px;width: 100%;"></view>
			<input class="searchlocation" v-model="index" placeholder="搜索" type="text" />
			<view style="background-color: white;height: 10px;width: 100%;"></view>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 72%;">{{item.user_name}}{{item.clock_in_date}}</view>
					<view v-if="item.statusFlag === '打卡缺失'" style="font-size: 13px;margin-top: 10px;margin-left: 15px;text-align: right;color: red;">{{item.statusFlag}}</view>
					<view v-else style="font-size: 13px;margin-top: 10px;margin-left: 15px;text-align: right;color: #2A9595;">{{item.statusFlag}}</view>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 10px;margin-left: 15px;display: flex;flex-direction: column;width: 50px;">
						<view style="font-size: 13px;margin-top: 10px;">上午</view>
						<view style="font-size: 13px;margin-top: 20px;">下午</view>
					</view>
					<view class="gridView">
						 <view v-for="(gitem,gindex) in item.recordList">
							 <view v-if="gindex == 0 && gitem.type == 0" class="buttonView">上班</view>
							 <view v-if="gindex == 0 && gitem.type == 1" class="blueView" @click="detailClick(gitem)">上班</view>
							 <view v-if="gindex == 1 && gitem.type == 0" class="buttonView">下班</view>
							 <view v-if="gindex == 1 && gitem.type == 2" class="blueView" @click="detailClick(gitem)">下班</view>
							 <view v-if="gindex == 2 && gitem.type == 0" class="buttonView">上班</view>
							 <view v-if="gindex == 2 && gitem.type == 3" class="blueView" @click="detailClick(gitem)">上班</view>
							 <view v-if="gindex == 3 && gitem.type == 0" class="buttonView">下班</view>
							 <view v-if="gindex == 3 && gitem.type == 4" class="blueView" @click="detailClick(gitem)">下班</view>
						 </view>
					</view>
					
				</view>
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view style="font-size: 13px;">打卡时间：{{clock_in_time}}</view>
				<view style="font-size: 13px;">打卡地点：{{location}}</view>
				<view style="font-size: 13px;">打卡类型：{{typeFlag}}</view>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaList,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaDetail,
	MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaBuKaSetting} from '@/api/mine';
	
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const userType = ref('');
	const orderList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const IDstring = ref('');
	const index = ref('');
	const show = ref(false);
	const title = ref('打卡记录');
	const clock_in_time = ref('');
	const location = ref('');
	const typeFlag = ref('');
           
	onLoad((options:any) => {
		
		IDstring.value = options.id;
		// userType = options.userType;
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
				order_id:IDstring.value,
				page:page.value,
				size:20,
				index:index.value,
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaList(param).then((res) =>{
							
				console.log(res);
				const resultData = res.result;
				
				for (var index = 0; index < resultData.length; index++) {
					var element = resultData[index];
					
					  const completeArray = [
					    { record_id: '', type: 0 },
					    { record_id: '', type: 0 },
					    { record_id: '', type: 0 },
					    { record_id: '', type: 0 }
					  ];
					  
					  // 根据 type 放入对应位置
					  element.recordList.forEach(rec => {
					    if (rec.type === 1) completeArray[0] = rec;
					    else if (rec.type === 2) completeArray[1] = rec;
					    else if (rec.type === 3) completeArray[2] = rec;
					    else if (rec.type === 4) completeArray[3] = rec;
					  });
					  
					  element.recordList = completeArray;
				}
				console.log(resultData)
				if (page.value === 1) {
											
					orderList.value = resultData;
				}else
				{
					// 正确的数组合并方式
					resultData.forEach(item => {
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
	const detailClick = async(gitem:any) => {
		
		try {
			
			let param = {
				
				record_id:gitem.record_id
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaDetail(param).then((res) =>{
							
				console.log(res);
				clock_in_time.value = res.result.clock_in_time;
				location.value = res.result.location;
				typeFlag.value = res.result.typeFlag;
				show.value = true;
			});
		}catch (error) {
			console.log(error)
		}
	};
	const confirm = () => {
		show.value = false;
	};
	//补卡
	const settingClick = async() => {
		
		
		try {
			
			let param = {
				
				order_id:IDstring.value,
				userId:storage.getUserId()
				
			};
			MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaBuKaSetting(param).then((res) =>{
							
				console.log(res);
				
				uni.navigateTo({
					url:`/pages/mine/LingGongOrder/PartTimeWork/PartTimeBuKa?order_id=${IDstring.value}&dataDict=${JSON.stringify(res.result)}` 
				})
			});
		}catch (error) {
			console.log(error)
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
        .homestayView{
            width: 100px;
            height: 30px;
            color: white;
            margin-right: 10px;
            margin-top: 11px;
            text-align: right;
            font-size: 13px;
		}
		.searchlocation{
		         margin-left: 4%;
		         width: 92%;
		         height: 35px;
		         border: 1px lightgray solid;
		         border-radius: 5px;
		         font-size: 13px;
		}
		.listItem{
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			margin-left: 4%;
			width: 92%;
			background-color: white;
			border-radius: 6px;
		}
		.gridView{
			display: flex;
			flex-direction: row;
			background-color: white;
			width: 190px;
			flex-wrap: wrap; /* 允许换行 */
			margin-top: 10px;
			// background-color: red;
			margin-bottom: 15px;
		}
		.buttonView
		{
			display: flex;
			margin-left: 20px;
			margin-top: 10px;
			box-sizing: border-box;
			width: 60px;
			height: 25px;
			border-radius: 5px;
			background-color: gray;
			color: white;
			font-size: 13px;
			justify-content: center;
			align-items: center;
		}
		.jiesuanButton{
			 margin-top: 30px;
			 background-color: white;
			 border-radius: 5px;
			 color: #2A9595;
			 border: #2A9595 1px solid; 
			 font-size: 13px;
			 margin-left: 10px; 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 30px;           /* 需要设置高度 */
			 width: 70px;             /* 需要设置宽度 */
		}
		.blueView{
			
			display: flex;
			margin-left: 20px;
			margin-top: 10px;
			box-sizing: border-box;
			width: 60px;
			height: 25px;
			border-radius: 5px;
			background-color: #2A9595;
			color: white;
			font-size: 13px;
			justify-content: center;
			align-items: center;
		}
    }
</style>