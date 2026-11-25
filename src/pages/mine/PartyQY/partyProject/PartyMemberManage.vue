<template>
		 <view class="main">
		        <u-navbar
		          title="成员"
		          
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
				<view style="display: flex;flex-direction: column;width: 100%;">
					<view class="goods_item" v-for="(item, index) in dataArray" :key="index" >
					  <view style="display: flex; flex-direction: row">
					    <image
					      style=" margin-top: 10px; margin-left: 15px;border-radius: 40px;flex-shrink: 0;width:80px;height:80px;"
					      :src="item.head_img ? item.head_img : '/static/mine/greenIcon.png'"
					    ></image>
					    <view style="display: flex; flex-direction: column; width: 80%;margin-left: 10px;">
							<view class="goods-name">{{ item.user_name }}{{item.user_mobile}}</view>
							<view class="statusTitleV">{{item.statusFlag}}</view>
						    <view style="font-size: 13px; color: gray; margin-top: 20px; margin-left: 5px;margin-bottom: 10px;">{{item.apply_time}}</view>
					    </view>
					  </view>
					  <view v-if="item.status == 0" class="buttonView">
						  <view class="passBtn" @click="passClick(item)">通过</view>
						  <view class="refuseBtn" @click="refuseClick(item)">拒绝</view>
					  </view>
					</view>
				</view>
		</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { PartyBuildMemberAuditList,PartyBuildMemberAudiShenHeInfo } from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#FF0000");
	const dataArray = ref([]);
	const page = ref<number>(1);
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);   // 是否没有更多数据了
	const project_id = ref('');
	const kind = ref<number>(1);
	const shenheType = ref<number>(1);
	
	onLoad((options:any) => {
		project_id.value = options.project_id;
		console.log(project_id.value);
	});
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
				project_id:project_id.value,
				user_id:getStorage(storageKeys.userId,''),
				status:kind.value - 1
			};
			const res = await PartyBuildMemberAuditList(param);
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
	const detailClick = (item:any) =>{
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/partyProject/PartyActivityDetail?project_id=${item.project_id}`
		})
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
	const passClick = (item:any) => {
		
		shenheType.value = 1;
		uni.showModal({
		                            
			cancelText:'取消',
			confirmText:'确定',
			confirmColor:'#2A9595',
			title:'确认审核',
			content:'',
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确定');
					sureShenHe(item);
				}else
				{
					console.log('取消')
				}
			}
		});
	};
	const refuseClick = (item:any) => {
		shenheType.value = 2;
		uni.showModal({
		                            
			cancelText:'取消',
			confirmText:'确定',
			confirmColor:'#2A9595',
			title:'确认审核',
			content:'',
			success(e) {
				console.log(e)
				if (e.confirm === true) {
					console.log('确定');
					sureShenHe(item);
				}else
				{
					console.log('取消')
				}
			}
		});
	};
	const sureShenHe = async(item:any) => {
		
		try {
			
			let param = {
				project_id:item.project_id,
				user_id:getStorage(storageKeys.userId,''),
				rec_id:item.rec_id,
				type:shenheType.value
			};
			const res = await PartyBuildMemberAudiShenHeInfo(param);
			console.log(res);
			uni.showToast({
				title:'提交申请成功',
				icon:'none'
			});
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			getDataList();
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
	};
	const goBack = () =>{
		
		uni.navigateBack()
	};
	
</script>

<style>
	 .main {
		  min-height: 100vh;
		  width: 100%;
		  background: aliceblue;
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
		     margin-top: 10px;
		     margin-left: 3%;
		     width: 94%;
		     height: 1px;
		     background-color: lightgray;
		   }
		 }
		 .statusTitleV
		 {
			 
			 color: lawngreen;
			 
			 width: 95%;
			 
			 margin-top: 10px;
			 text-align: right;
			
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
	    }
</style>