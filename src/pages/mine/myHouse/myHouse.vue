<template>
    <view class="main">
        <u-navbar
          title="我的房产"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
          	<view slot="left" >
          		<view class="flex">
          			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
          		</view>
          	</view>
          </template>
		  <template #right>
			  <view slot="right" @click="addHouseClick">
				  <u-image
					:src="image"
					width="25px"
					height="25px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 12px;">当前房屋</view>
				<view v-else style="color: black;font-size: 12px;">当前房屋</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 12px;">其他房屋</view>
				<view  v-else style="color: black;font-size: 12px;">其他房屋</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			
		</view>
		<view v-if="type === '1'" style="width: 100%;display: flex;flex-direction: column;border-radius: 5px;">
			<view class="house_item" v-for="(item,index) in normalList" :key="index" @click="normaldetailClick(item)">
				<view style="color: white;font-size: 12px;margin-left: 10px;margin-top: 10px;">{{item.bldgname}}</view>
				<view style="color: white;font-size: 12px;margin-left: 10px;margin-top: 10px;">{{item.address}}</view>
				
			</view>
		</view>
		<view v-if="type === '2'" style="width: 100%;display: flex;flex-direction: column;">
			<view class="other_item" v-for="(item,index) in otherList" :key="index" @click="normaldetailClick(item)">
				<view style="display: flex;flex-direction: column;width: 80%;">
					<view style="font-size: 12px;margin-left: 10px;margin-top: 10px;">{{item.bldgname}}</view>
					<view style="font-size: 12px;margin-left: 10px;margin-top: 10px;">{{item.address}}</view>
				</view>
				<u-image style="margin-top: 20px;width: 15%;align-items: right;"
				  :src="arrowimage"
				  width="15px"
				  height="15px"
				></u-image>
				
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted } from 'vue';
	import {MineHouseTreasureNormal} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const image = ref('/static/mine/addItemImage.png');
	const arrowimage = ref('/static/service/my_arrow.png');
	const type = ref('1');
	const normalList = ref([]);
	const otherList = ref([]);
            
	onMounted(() => {
		init();
	});
    const init = async() => {
				
		try {
			
			let param = {
				
				userid:storage.getUserId(),
				mainhouse:"1",
				flag:"2",
				loginType:storage.getLoginType(),
				
			};
			const res = await MineHouseTreasureNormal(param);
							
			console.log(res);
			
			normalList.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const otherHouseData = async() => {
				
		try {
			
			let param = {
				
				userid:storage.getUserId(),
				mainhouse:"1",
				flag:"1",
				hcpid:storage.getHcpid(),
				
			};
			const res = await MineHouseTreasureNormal(param);
							
			console.log(res);
			
			otherList.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
	//切换segment
	const segment1Click = () => {
		
		type.value = "1";
		init();
	};
	const segment2Click = () => {
		
		type.value = "2";
		otherHouseData();
		
	};
	const normaldetailClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/myHouse/houseDetails?item=${JSON.stringify(item)}&kind=${encodeURIComponent(type.value)}`
		})
	};
	const addHouseClick = () => {
		uni.navigateTo({
			url:'/pages/mine/myHouse/addHouse'
		})
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 50px;
	 	
	 }
	 .whiteLine{
	 		 margin-left: 40%;
	 		 margin-top: 5px;
	 		 width: 20%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .house_item{
		 display: flex;
		 flex-direction: column;
		 width: 92%;
		 margin-top: 10px;
		 margin-left: 4%;
		 height: 70px;
		 background-color: #2A9595;
	 }
	 .other_item{
		 display: flex;
		 flex-direction: row;
		 width: 92%;
		 margin-top: 10px;
		 margin-left: 4%;
		 height: 70px;
		 background-color: white;
	 }
    }
</style>