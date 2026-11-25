<template>
		 <view class="main">
		        <u-navbar
		          title="我参与"
		          
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
					<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
						<view v-if="kind == 1" style="color: #2A9595;font-size: 14px;">待审核</view>
						<view v-else style="color: black;font-size: 14px;">待审核</view>
						<view class="whiteLine1" v-if="kind == 1"></view>
					</view>
					<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
						<view v-if="kind == 2" style="color: #2A9595;font-size: 14px;">已通过</view>
						<view v-else style="color: black;font-size: 14px;">已通过</view>
						<view class="whiteLine1" v-if="kind ==2"></view>
					</view>
					<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
						<view v-if="kind == 3" style="color: #2A9595;font-size: 14px;">未通过</view>
						<view v-else style="color: black;font-size: 14px;">未通过</view>
						<view class="whiteLine1" v-if="kind ==3"></view>
					</view>
				</view>
				<view  style="display: flex;flex-direction: column;width: 100%;">
					<view class="goods_item" v-for="(item, index) in dataArray" :key="index" @click="detailClick(item)">
					  <view style="display: flex; flex-direction: row">
					    <u-image
					      style="border-radius: 4px; margin-top: 10px; margin-left: 15px"
					      :src="item.picture"
					      width="120px"
					      height="80px"
					    ></u-image>
					    <view style="display: flex; flex-direction: column; width: 60%">
							<view style="display: flex;flex-direction: row;">
								<view class="goods-name">{{ item.title }}</view>
								<view v-if="item.is_good == 1" class="youtitle">优</view>
							</view>
							<view style="text-align: right;font-size: 14px;color: lawngreen;width: 95%;margin-top: 10px;">{{item.statusFlag}}</view>
						    <view style="font-size: 12px; color: gray; margin-top: 10px; margin-left: 5px">
							{{ item.user_name }}{{item.create_time}}
						    </view>
					    </view>
					  </view>
					  <view class="goods-divider"></view>
					</view>
				</view>
		</view>
		
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { PartyBuildMyJoinPartyProject } from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#FF0000");
	const dataArray = ref([]);
	const page = ref<number>(1);
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);   // 是否没有更多数据了
	const project_id = ref('');
	const kind = ref<number>(1);
	
	onMounted(() =>{
		
		getDataList();
	});
	onPullDownRefresh(()=>{
		// 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		
		getDataList();
	});
	onReachBottom(() => {
		if ( !hasMore.value) {
			
			return
		}
		page.value += 1;
		getDataList();
	});
	const getDataList = async() => {
		
		
		try {
			
			let param = {
				size:10,
				page:page.value,
				user_id:getStorage(storageKeys.userId,''),
				status:kind.value - 1
			};
			const res = await PartyBuildMyJoinPartyProject(param);
			console.log(res);
			if (page.value === 1) {
			                            
				dataArray.value = res.result;
			}else
			{
				// 正确的数组合并方式
				dataArray.value.push(...res.result);
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
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}finally{
			
			uni.stopPullDownRefresh();
		}
		
	};

	const myProjectClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/PartyQY/partyProject/OtherPartyActList'
		})
	};
	const kind1Click = () => {
		
		kind.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind2Click = () => {
		
		kind.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	const kind3Click = () => {
		
		kind.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		getDataList();
		
	};
	
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/MyJoinPartyDetail?project_id=${item.project_id}&rec_id=${item.rec_id}`
		})
	};
	
	const goBack = () =>{
		
		uni.navigateBack()
	};
	
</script>

<style>
	 .main {
		  height: 100%;
		  width: 100%;
		  
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
		 .goods_item {
		   display: flex;
		   flex-direction: column;
		   margin-top: 10px;
		   background-color: white;
		   margin-left: 4%;
		   width: 92%;
		   border-radius: 5px;
		   .goods-name {
		     font-size: 14px;
		     margin-top: 10px;
		     margin-left: 5px;
		     white-space: nowrap;
		     text-overflow: ellipsis;
		     overflow: hidden;
		     width: 95%;
		   }
		   .goods-divider {
		     
		     margin-left: 3%;
		     width: 94%;
		     height: 1px;
		     background-color: lightgray;
		   }
		 }
		 .statusTitleV
		 {
			 width: 95%;
			 margin-left: 5px;
			 margin-top: 10px;
			 font-size: 14px;
		 }
		 .specsView{
			 width: 100%;
			 height: 50px;
			 display: flex;
			 flex-direction: row;
			 background-color: white;
		 		 
		 }
		 .whiteLine1{
			 margin-left: 30%;
			 margin-top: 7px;
			 width: 40%;
			 height: 2px;
			 background-color: #2A9595;
		 }
		 .buttonView{
			 
			 display: flex;
			 flex-direction: row;
			 margin-bottom: 15px;
		 }
		 .passBtn{
			 
			width: 60px;
			height: 30px;
			margin-top: 10px;
			margin-left: 200px;
			background-color: red;;
			color: white;
			font-size: 14px;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			text-align: center;
			border-radius: 5px;
		 }
		 .refuseBtn{
		 			 
			width: 60px;
			height: 30px;
			margin-top: 10px;
			margin-left: 15px;
			background-color: red;;
			color: white;
			font-size: 14px;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			text-align: center;
			border-radius: 5px;
		 }
		 .searchlocation{
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  height: 100px;
			  border: lightgray 1px solid;
			  font-size: 13px;
		  }
	    }
		.goods_item {
		  display: flex;
		  flex-direction: column;
		  margin-top: 10px;
		  
		  .goods-name {
		    font-size: 14px;
		    margin-top: 10px;
		    margin-left: 5px;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    width: 80%;
		  }
		  .goods-divider {
		    margin-top: 15px;
		    margin-left: 3%;
		    width: 94%;
		    height: 1px;
		    background-color: lightgray;
		  }
		}
		.youtitle
		{
			 background-color: red;
			 color: white;
			 border-radius: 3px;
			 width: 20px;
			 height: 20px;
			 margin-top: 10px;
			 text-align: center;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 font-size: 12px;
		}
</style>