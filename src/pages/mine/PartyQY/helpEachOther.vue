<template>
    <view class="main">
        <u-navbar
          title="互联互助"
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
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in DataList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 15px;width: 70%;">{{item.second_type}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 25%;text-align: right;">{{item.statusFlag}}</view>
				</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">需求时间:{{item.create_time}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">需求类型:{{item.first_type}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">需求描述:{{item.content}}</view>
				<view v-if="item.status == 0 & item.is_claim == 1" class="buttonView" @click="renlingClick(item)">认领</view>
				<view v-if="item.status == 1 " class="buttonView" @click="handleClick(item)">去处理</view>
				<view v-if="item.status == 2 " class="buttonView" @click="doneClick(item)">提交完成</view>
				<view v-if="item.status == 4 & item.is_evaluate == 0" class="buttonView" @click="cuiyicui(item)">催一催</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyWangGeEventsHelpEachOther,
	MinePartyWangGeEventsHelpEachOtherRenLing,
	MinePartyWangGeEventsHelpEachOtherHandle,
	MinePartyWangGeEventsHelpEachOtherComplete,
	MinePartyWangGeEventsHelpEachOtherUrgeUser} from '@/api/mine';
	import { getStorage, storage, storageKeys,uploadMultipleFiles } from '@/utils/storage';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const DataList = ref([]);
				
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);        // 是否没有更多数据了
	const page = ref(1);
           
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
				status:"0",
									   
			};
			const res = await MinePartyWangGeEventsHelpEachOther(param);
							
			console.log(res);
			if (page.value === 1) {
														
				DataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				DataList.value.push(...res.result);
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
	//认领
	const renlingClick = async(item:any) => {
				
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				id:item.id,
				
			};
			const res = await MinePartyWangGeEventsHelpEachOtherRenLing(param);
							
			console.log(res);
			uni.showToast({
				title:'操作成功',
				icon:'none'
			});
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			
			loadData();
				
			
			
		}catch (error) {
			console.log(error)
		}
		
	};
	//去处理
	const handleClick = async(item:any) => {
				
		try {
			
			let param = {
				
				id:item.id,
				
			};
			const res = await MinePartyWangGeEventsHelpEachOtherHandle(param);
							
			console.log(res);
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadData();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//提交完成
	const doneClick = async(item:any) => {
				
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				id:item.id,
				
			};
			const res = await MinePartyWangGeEventsHelpEachOtherComplete(param);
							
				console.log(res);
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				
				loadData();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//催一催
	const cuiyicui = async(item:any) => {
				
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				id:item.id,
				
			};
			const res = await MinePartyWangGeEventsHelpEachOtherUrgeUser(param);
							
			console.log(res);
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadData();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//详情
	const detailClick = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/helpEachOtherDetail?id=${encodeURIComponent(item.id)}`
		})
	};
    const goBack = () => {
                
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
	 .listItem{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 background-color: white;
		 border-radius: 6px;
	 }
	  .buttonView{
	               
	              margin-top: 15px;
	              background-color: #2A9595;
	              border-radius: 5px;
	              color: white;
	              font-size: 14px;
	              margin-left: 270px; 
	              display: flex;
	              justify-content: center; /* 水平居中 */
	              align-items: center;     /* 垂直居中 */
	              height: 30px;           /* 需要设置高度 */
	              width: 60px;             /* 需要设置宽度 */
				  margin-bottom: 15px;
	     }
    }
</style>