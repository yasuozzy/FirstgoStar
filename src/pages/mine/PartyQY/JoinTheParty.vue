<template>
    <view class="main">
        <view class="custom-navbar">
          <view class="navbar-content">
            <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            <view class="title-container">
				<view class="headerView">{{address}}</view>
            </view>
          </view>
        </view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index">
				<image :src="item.head_img" style="border-radius: 25px;width: 50px;height: 50px;margin-top: 30px;margin-left: 20px;"></image>
				<view style="display: flex;flex-direction: column;margin-left: 15px;margin-top: 10px;width: 50%;">
					<view style="font-size: 15px;">{{item.name}}</view>
					<view class="addressView">{{item.province}}{{item.city}}{{item.county}}{{item.streetName}}</view>
					<view style="display: flex;flex-direction: row;">
						<view style="font-size: 14px;margin-top: 10px;">组织人数:</view>
						<view style="font-size: 14px;margin-top: 10px;color: red;margin-left: 10px;">{{item.orgNum}}</view>
					</view>
					
				</view>
				<view v-if="org_id.length == 0" class="joinButton" @click="joinClick(item)">申请加入</view>
				<view style="background-color: darkgray;" v-if="org_id.length > 0 & item.joinStatus ==  0" class="joinButton">审核中</view>
				<view style="background-color: darkgray;" v-if="org_id.length > 0 & item.joinStatus !=  0 & item.id == org_id" class="joinButton">已加入</view>
				<view style="background-color: darkgray;" v-if="org_id.length > 0 & item.joinStatus !=  0 & item.id != org_id" class="joinButton">申请加入</view>
			</view>
		</view>
	</view>
	
</template>

<script setup lang="ts">
	import {PartyQYGetNowLocation,MineJoinPartyInfo,MineJoinPartyList,MineJoinPartyShenQingJoin} from '@/api/mine';
	import { ref, reactive, onMounted, type Ref } from 'vue';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const address = ref('');
	const latitude = ref('');
	const longitude = ref('');
	const id = ref('');
	const org_id = ref('');
	const dataList = ref([]);
	
	const hasMore= ref(true);
	const noMore= ref(false);
	const page = ref(1);
           
		//下拉刷新
		onPullDownRefresh(()=>{
			
			 // 重置状态
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			
			getListData();
		});
		//上拉刷新
		onReachBottom(() => {
			
			if (!hasMore.value) {
				
				return
			}
			page.value += 1;
			getListData();
		});
        onMounted(() =>{
          loadLocation();
		  JoinPartyInfo();
		  
        });
       
			//请求现居地址
		const loadLocation = async() => {
				
				try {
				    
					let param = {
						userId:getStorage(storageKeys.userId,''),
					};
				    const res = await PartyQYGetNowLocation(param)
				                    
				    console.log(res);
					const resultDict = res.result;
						
					address.value = resultDict.address;
					latitude.value = resultDict.latitude;
					longitude.value = resultDict.longitude;
					id.value = resultDict.id;
					getListData();
				    
				}catch (error) {
				    console.log(error)
				}
			};
			const JoinPartyInfo = async() => {
				
				try {
				    
					let param = {
						userId:getStorage(storageKeys.userId,''),
					};
				    const res = await MineJoinPartyInfo(param);
				                    
					console.log(res);
					const resultDict = res.result;
					
					org_id.value = resultDict.org_id;
						
				
				}catch (error) {
				    console.log(error)
				}
			};
			const getListData = async() => {
				
				try {
				    
					let param = {
						userId:getStorage(storageKeys.userId,''),
						page:page.value,
						size:20,
						latitude:latitude.value,
						longitude:longitude.value,
					};
				    const res = await MineJoinPartyList(param);
				                    
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
				}finally{
			
					uni.stopPullDownRefresh();
				}
				
			};
			const joinClick = async(item:any) => {
				
				try {
				    
					let param = {
						userId:getStorage(storageKeys.userId,''),
						userName:getStorage(storageKeys.realName,''),
						mobile:getStorage(storageKeys.phone,''),
						orgId:item.id,
					};
				    const res = await MineJoinPartyShenQingJoin(param);
				                    
					console.log(res);
					uni.showToast({
						title:'加入组织成功',
						icon:'none'
					});
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					getListData();
				    
				}catch (error) {
				    console.log(error)
				}
			};
            const goBack = () =>{
            	
            	uni.navigateBack()
            };
        
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
         
	 .custom-navbar {
	   height:calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
	   position: relative;
	   width: 100%;
	   background-color: #2A9595;
	 }
	 .navbar-content {
	   display: flex;
	   align-items: center;
	   height: 100%;
	   padding: 0 15px; /* 整体左右边距 */
	 }
	 
	 .back-icon {
	   margin-right: 10px; /* 返回键与搜索框间距 */
	 }
	 
	 .title-container {
	   display: flex;
	   flex-direction: row;
	   margin-left: 10px;
	   width: 95%;
	   // background-color: red;
	   margin-top: calc(var(--status-bar-height));
	 }
	 .headerView{
	 		 font-size: 13px;
	 		 color: white;
	 		 margin-top: 7px;
	 		 margin-left: 10px;
			// background-color: red;
	 		 white-space: nowrap;      /* 禁止换行 */
	 		overflow: hidden;         /* 隐藏溢出内容 */
	 		text-overflow: ellipsis;  /* 显示省略号 */
	 		width: 250px;            /* 设置固定宽度 */
			height: 30px;
	 }
	 .listItem{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 background-color: white;
		 height: 110px;
		 border-radius: 5px;
		 display: flex;
		 flex-direction: row;
	 }
	 .joinButton{
		 margin-top: 40px;
		 margin-left: 10px;
		 width: 70px;
		 height: 30px;
		 border-radius: 4px;
		 background-color: red;
		 color: white;
		 font-size: 13px;
		  display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
	 }
	 .addressView{
		 font-size: 14px;
		 color: dimgray;
		 margin-top: 10px;
		 white-space: nowrap;      /* 禁止换行 */
		   overflow: hidden;         /* 隐藏溢出内容 */
		   text-overflow: ellipsis;  /* 显示省略号 */
	 }
    }
</style>