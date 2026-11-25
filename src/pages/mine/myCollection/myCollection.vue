<template>
    <view class="main">
        <u-navbar
          title="我的收藏"
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
        </u-navbar>
		<view class="searchView">
			<input class="searchlocation" placeholder="搜索" type="text" />
		</view>
		<view class="specsView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">酒店</view>
				<view v-else style="color: black;font-size: 13px;">酒店</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">景点</view>
				<view v-else style="color: black;font-size: 13px;">景点</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">饭店</view>
				<view v-else style="color: black;font-size: 13px;">饭店</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view v-if="type === '1'" class="list-item" v-for="(item,index) in hotelList" :key="index" @click="hotelClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 80px;">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="item.icon"
					  width="80px"
					  height="60px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;">
						<view style="margin-left: 10px;font-size: 13px;">{{item.title}}</view>
						<view style="margin-left: 10px;font-size: 12px;">地址:{{item.address}}</view>
					</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
			<view v-if="type === '2'" class="list-item" v-for="(item,index) in viewsList" :key="index" @click="viewsClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 80px;">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="item.icon"
					  width="80px"
					  height="60px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;">
						<view style="margin-left: 10px;font-size: 13px;">{{item.title}}</view>
						<view style="margin-left: 10px;font-size: 12px;">地址:{{item.address}}</view>
					</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
			<view v-if="type === '3'" class="list-item" v-for="(item,index) in mallList" :key="index" @click="mallClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 80px;">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="item.icon"
					  width="80px"
					  height="60px"
					></u-image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;">
						<view style="margin-left: 10px;font-size: 13px;">{{item.title}}</view>
						<view style="margin-left: 10px;font-size: 12px;">地址:{{item.address}}</view>
					</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive } from 'vue';
	// 背景颜色
	const bgColor = ref('#2A9595');
	const type = ref('1');
	const hotelList = ref([
		{icon:'/static/home/homestay.png',title:'九宫山国际大酒店',address:'九宫山风景区内云中湖路10号'},
		{icon:'/static/home/homestay.png',title:'黄鹤楼国际大酒店',address:'九宫山风景区内云中湖路10号'},
		{icon:'/static/home/homestay.png',title:'隐水洞国际大酒店',address:'九宫山风景区内云中湖路10号'},
	]);
	const viewsList = ref([
		{icon:'/static/home/homestay.png',title:'九宫山',address:'九宫山风景区内云中湖路10号'},
		{icon:'/static/home/homestay.png',title:'黄鹤楼',address:'九宫山风景区内云中湖路10号'},
		{icon:'/static/home/homestay.png',title:'隐水洞',address:'九宫山风景区内云中湖路10号'},
	]);
	const mallList = ref([
		{icon:'/static/home/homestay.png',title:'福楼美食',address:'九宫山风景区内云中湖路10号'},
		{icon:'/static/home/homestay.png',title:'多福美食',address:'九宫山风景区内云中湖路10号'},
		{icon:'/static/home/homestay.png',title:'温馨美食',address:'九宫山风景区内云中湖路10号'},
	]);
            
       
	const goBack= () => {
		   
		uni.navigateBack()
	};
	//切换segment
	const segment1Click = () => {
		
		type.value = "1";
		
	};
	const segment2Click = () => {
		
		type.value = "2";
		
	};
	const segment3Click = () => {
		
		type.value = "3";
		
	};
	//酒店详情
	const hotelClick = () => {
		
		uni.navigateTo({
			url:'/pages/home/detailhotel'
		})
	};
	//景点详情
	const viewsClick = () => {
		uni.navigateTo({
			url:'/pages/home/viewsDetail'
		});
	};
	//饭店详情
	const mallClick = () => {
		uni.navigateTo({
			url:'/pages/home/mainshopDetail'
		})
	};
        
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
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
	 .searchView{
	 		 width: 100%;
	 		 height: 40px;
	 		 background-color: aliceblue;
	 		 
	 }
	 .searchlocation{
	          margin-left: 4%;
	          width: 92%;
	          height: 40px;
	          margin-top: 10px;
	          background-color: white;
	          border-radius: 5px;
	          font-size: 13px;
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
	.list-item{
		width: 100%;
		height: 90px;
		display: flex;
		flex-direction: column;
		background-color: white;
	}
    }
</style>