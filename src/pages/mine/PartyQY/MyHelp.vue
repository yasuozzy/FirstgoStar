<template>
    <view class="main">
        <u-navbar
          title="我的帮扶"
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
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">工作中</view>
				<view v-else style="color: black;font-size: 13px;">工作中</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type == 4" style="color: #2A9595;font-size: 13px;">待评价</view>
				<view v-else style="color: black;font-size: 13px;">待评价</view>
				<view class="whiteLine" v-if="type == 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type == 5" style="color: #2A9595;font-size: 13px;">已评价</view>
				<view v-else style="color: black;font-size: 13px;">已评价</view>
				<view class="whiteLine" v-if="type == 5"></view>
			</view>
			
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.second_type}}</view>
					<view style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">{{item.statusFlag}}</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">需求时间：{{item.create_time}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">需求类型:{{item.first_type}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">需求描述:{{item.content}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="item.status == 0 & item.is_claim == 1"  class="bottomview" @tap.stop>
					<view class="buttonView" @click="renlingClick(item)">认领</view>
				</view>
				<view v-if="item.status == 1"  class="bottomview" @tap.stop>
					<view class="buttonView" @click="handleClick(item)">去处理</view>
				</view>
				<view v-if="item.status == 2"  class="bottomview" @tap.stop>
					<view class="buttonView" @click="doneClick(item)">提交完成</view>
				</view>
				<view v-if="item.status == 4 & item.is_evaluate == 0"  class="bottomview" @tap.stop>
					<view class="buttonView" @click="cuiyicuiClick(item)">催一催</view>
				</view>
			</view>
		</view>
		
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MinePartyPublicMyHelpDataList,
	MinePartyPublicMyHelpRenLing,
	MinePartyWangGeEventsHelpEachOtherHandle,
	MinePartyWangGeEventsHelpEachOtherUrgeUser,
	MinePartyWangGeEventsHelpEachOtherComplete} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const type = ref(1);
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const orderList = ref([]);
           
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
		
		if ( ! hasMore.value) {
			
			return
		}
		 page.value += 1;
		
		 loadData();
		
	});
	const loadData = async() => {
		try {
			
			let param = {
				userId:storage.getUserId(),
				page: page.value,
				size:20,
				status: type.value,
										  
			};
			const res = await MinePartyPublicMyHelpDataList(param);
							
			console.log(res);
			if (page.value === 1) {
													
				orderList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				orderList.value.push(...res.result);
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
	//切换segment
	const segment1Click = () => {
				
		 type.value = 1;
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
	};
	const segment2Click = () => {
				
		 type.value = 2;
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
	};
	const segment3Click = () => {
		
		 type.value = 3;
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
	};
	const segment4Click = () => {
		
		 type.value = 4;
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
	};
	
	const segment5Click = () => {
		
		 type.value = 5;
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
	};
	//认领
	const renlingClick = async(item:any) => {
				
		try {
							
			let param = {
				userId:storage.getUserId(),
				id:item.id,
			};
			const res = await MinePartyPublicMyHelpRenLing(param);
								
			console.log(res);
			
			uni.showToast({
			  title: '操作成功',
			  icon: "none",
			});
			loadData();
			
		} catch (error) {
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
			loadData();
				
			
		} catch (error) {
			console.log(error)
		}
	};
	//催一催
	const cuiyicuiClick = async(item:any) => {
				
		try {
							
			let param = {
				id:item.id,
				userId:storage.getUserId(),
			};
			const res = await MinePartyWangGeEventsHelpEachOtherUrgeUser(param);
								
				console.log(res);
				uni.showToast({
				  title: '操作成功',
				  icon: "none",
				});
				 loadData();
				
			
		} catch (error) {
			console.log(error)
		}
	};
	//提交完成
	const doneClick = async(item:any) => {
				
		try {
							
			let param = {
				id:item.id,
				userId:storage.getUserId(),
			};
			const res = await MinePartyWangGeEventsHelpEachOtherComplete(param);
								
			console.log(res);
			loadData();
				
			
		} catch (error) {
			console.log(error)
		}
	};
	const detailClick = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/MyHelpDetail?id=${encodeURIComponent(item.id)}`
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
            .specsView{
             		 width: 100%;
             		 height: 40px;
             		 display: flex;
             		 flex-direction: row;
             		 
             		 background-color: white;
             		 margin-top: 10px;
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
			 		 width: 100%;
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
			 }
    }
</style>