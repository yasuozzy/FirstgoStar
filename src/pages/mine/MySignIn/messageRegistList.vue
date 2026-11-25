<template>
    <view class="main">
        <u-navbar
          title="信息登记"
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
			  <view slot="right" @click="addClick()">
				  <u-image
					:src="image"
					width="20px"
					height="20px"
				  ></u-image>
			  </view>
			</template>
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="ListItem" v-for="(item,index) in dataList" :key="index">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.street_name}}{{item.community_name}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.house_num}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: gray;">{{item.house_property}}{{item.mobile}}</view>
				<view style="width: 100%;margin-top: 10px;background-color: lightgray;height: 1px;"></view>
				<view v-if="item.ynMain > 0" class="buttonView" @click="AddpersonClick(item)">添加成员</view>
				<view v-if="item.ynMain == 0" class="buttonView" @click="addMainClick(item)">添加户主</view>
				<view class="userItem" v-for="(userItem,userIndex) in item.userList">
					<view style="display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: gray;width: 75%;">{{userItem.name}}{{userItem.mobile}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: gray;">{{userItem.typeFlag}}</view>
					</view>
					<view style="width: 100%;margin-top: 10px;background-color: lightgray;height: 1px;"></view>
					<view  class="buttonView" @click="editClick(item,userItem)">编辑</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import {MinePartyWangGeMessageList} from '@/api/mine';
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onLoad,onPullDownRefresh } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const image = ref("/static/mine/addItemImage.png") ;
	const dataList = ref([]);
	
	const hasMore = ref(true);   // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
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
	
    const loadData = async() => {
            	
		try {
			
			let param = {
				userId:getStorage(storageKeys.userId,''),
			};
			const res = await MinePartyWangGeMessageList(param);
							
				console.log(res);
				if (page.value === 1) {
											
					dataList.value = res.result;
				}else
				{
					// 正确的数组合并方式
					dataList.value.push(...res.result);
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
	//添加
	const addClick = () =>{
		
		uni.navigateTo({
			url:'/pages/mine/MySignIn/messageRegister'
		})
	};
			//添加成员
	const AddpersonClick = (item:any) =>{
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/AddMembers?house_id=${encodeURIComponent(item.id)}`
		})
	};
			//添加户主
	const addMainClick = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/addMainHouseKeeper?house_id=${encodeURIComponent(item.id)}`
		})
	};
			//编辑
	const editClick = (item:any,userItem:any) => {
				
		if (userItem.type == 0) {
			
			//编辑户主
			uni.navigateTo({
				url:`/pages/mine/PartyQY/addMainHouseKeeper?house_id=${encodeURIComponent(userItem.id)}&isedit=${encodeURIComponent(1)}`
			})
			
		}else if (userItem.type == 1) {
			
			//编辑成员
			uni.navigateTo({
				url:`/pages/mine/PartyQY/AddMembers?house_id=${encodeURIComponent(userItem.id)}&isedit=${encodeURIComponent(1)}`
			})
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
	 .ListItem{
		 display: flex;
		 flex-direction: column;
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 background-color: white;
		 border-radius: 6px;
	 }
	 .buttonView{
	          
	        margin-top: 10px;
			background-color:white;
			border-radius: 5px;
			border: #2A9595 1px solid;
			color: #2A9595;
			font-size: 13px;
			margin-left: 250px; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 30px;           /* 需要设置高度 */
			width: 80px;             /* 需要设置宽度 */
			margin-bottom: 15px;
	    }
		.userItem{
			
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			margin-left: 4%;
			width: 92%;
			background-color: white;
			border-radius: 6px;
		}
    }
</style>