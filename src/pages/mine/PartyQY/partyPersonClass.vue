<template>
    <view class="main">
        <u-navbar
          title="党员课堂"
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
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" height="160" @click="swiperClick()"></u-swiper>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view class="headerTitle">党章党规</view>
			<view style="width: 200px;margin-top: 40px;height: 1px;background-color: red;"></view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 30px;color: red;" @click="moreClick('党章党规')">更多 >></view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in rulesleList" :key="index">
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;">{{item.title}}</view>
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;text-align: right;">{{item.releaseTime}}</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view class="headerTitle">系列讲话</view>
			<view style="width: 200px;margin-top: 40px;height: 1px;background-color: red;"></view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 30px;color: red;" @click="moreClick('系列讲话')">更多 >></view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in seriesList" :key="index">
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;">{{item.title}}</view>
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;text-align: right;">{{item.releaseTime}}</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view class="headerTitle">重要评论</view>
			<view style="width: 200px;margin-top: 40px;height: 1px;background-color: red;"></view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 30px;color: red;" @click="moreClick('重要评论')">更多 >></view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in commentList" :key="index">
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;">{{item.title}}</view>
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;text-align: right;">{{item.releaseTime}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineJoinPartyClassAdvList,MineJoinPartyClassArticleList} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#FF0000");
	// 轮播图列表
	const swiperList = ref([]);
	const longitude = ref('');
	const latitude = ref('');
	const address = ref('');
	const rulesleList = ref([]);
	const seriesList = ref([]);
	const commentList = ref([]);
				
          
	onLoad((options:any) => {
		
		address.value = decodeURIComponent(options.address);
		longitude.value = decodeURIComponent(options.longitude);
		latitude.value = decodeURIComponent(options.latitude);
	});
	onMounted(() => {
	  init();
	  loadDataList();
	});
   
	const init = async() => {
			
		try {
			
			let param = {
				
				page:1,
				size:20,
				longitude:longitude.value,
				latitude:latitude.value
			};
			const res = await MineJoinPartyClassAdvList(param);
							
			console.log(res);
			swiperList.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const loadDataList = async() => {
		
		try {
			
			let param = {};
			const res = await MineJoinPartyClassArticleList(param);
							
			console.log(res);
			rulesleList.value = res.result.rulesleList;
			seriesList.value = res.result.seriesList;
			commentList.value = res.result.commentList;
			
		}catch (error) {
			console.log(error)
		}
	};
	//轮播图点击
	const swiperClick = () => {
		
	};
	//更多
	const moreClick = (title:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/moreClassLessons?title=${encodeURIComponent(title)}`
		})
		
	};
	const goBack = () => {
		
		uni.navigateBack()
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
	 .swiper {
	   padding: 10px;
	   box-sizing: border-box;
	 }
	 .headerTitle{
		 
		 background-color: red;
		 width: 80px;
		 height: 40px;
		 color: white;
		 font-size: 15px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 text-align: center;
	 }
	 .listItem{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
	 }
    }
</style>