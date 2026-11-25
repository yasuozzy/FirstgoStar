<template>
	<view class="main">
		<u-navbar
		  title="积分商城"
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
		<!-- ============ 搜索框 ============ -->
		<view class="searchView">
			<input class="searchFeild" placeholder="输入关键词搜索更多商品" type="text" />
		</view>
		<!-- ============ 滑动广告表头 ============ -->
		<view class="swiper">
		  <u-swiper :list="bannerList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<!-- ============ 爆款排名 ============ -->
		<view class="hotHeader">
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="hotImage"
			  width="30px"
			  height="30px"
			></u-image>
			<view class="textView">爆款排名</view>
		</view>
		<view class="hotView">
			<view class="hotview_item" v-for="(item,index) in hotList" :key="index">
				<u-image style="border-radius: 4px;"
				  :src="item.img"
				  width="80px"
				  height="80px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;text-align: center;white-space: nowrap;text-overflow: ellipsis;margin-left: 6%;width: 88%;">{{item.name}}</view>
				<view style="font-size: 13px;margin-top: 10px;color: dimgray;text-align: center;">已有{{item.sales}}人兑换</view>
				<view style="justify-content: center;margin-top: 10px;background-color: red;border-radius: 8px;color: white;font-size: 12px;width: 60%;height: 20px;text-align: center;" @click="exchangeClick(item)">立即兑换</view>
			</view>
		</view>
		<view style="background-color: lightgray;width: 100%;height: 5px;margin-top: 10px;"></view>	
		<scroll-view scroll-x = 'true' class="tab-scroll">
			<div class="tab-list">
				<div 
				    v-for="tab in tabs" 
				    :key="tab.categoryCode"
				    :class="['tab', activeTab === tab.categoryCode ? 'active' : '']"
				    @click="handleTabClick(tab)"
				>
					{{ tab.categoryName }}
					<div class="line" v-if="activeTab === tab.categoryCode"></div>
				</div>
			</div>
		</scroll-view>
		<view class="goodsView">
			<view class="goods_item" v-for="(item,index) in goodsList">
				<view style="display: flex;flex-direction: row;">
					<u-image style="border-radius: 4px;margin-top: 10px;margin-left: 15px;"
					  :src="item.img"
					  width="100px"
					  height="90px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 60%;">
						<view style="font-size: 14px;margin-top: 10px;margin-left: 5px;white-space: nowrap;text-overflow: ellipsis;width: 80%;">{{item.name}}</view>
						<view style="font-size: 12px;color: red;margin-top: 5px;margin-left: 5px;">积分{{item.integral}}</view>
						<view class="buttonView" @click="exchangeClick(item)">立即兑换</view>
					</view>
				</view>
				<view style="margin-top: 15px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	// import amap from '@/common/SDK/amap-wx.js';
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {integralGetHot,integralGetBanner,integralFirstLevel,integralGoodsList} from '@/api/integral';
	import { onLoad } from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const hotImage = ref("/static/home/hotimage.png");
	const hotList = ref([]);
	const goodsList = ref([]);
	const type = ref('1');
	const firstParam = ref({});
	const gridParam = ref({levels:'1'});
	const bannerList = ref([]);
	const activeTab = ref(1);
	const tabs = ref([]);
	const goodsParam = ref({
		currentPage:1,
		pageSize:10,
		code:"00",
		Searchcontent:"",
		scoreType:'',//0充值积分，1普通积分
	});
			
	onLoad((options:any) => {
		goodsParam.value.scoreType = decodeURIComponent(options.type);
	});
	onMounted(() => {
		getHotData();
		getBannerData();
		getGridLabel();
	});
	
	//爆款商品
	const getHotData = async() =>{
				
		try {
							
				const res = await integralGetHot(firstParam.value);
								
				 console.log(res);
				 const result = res.result;
				 hotList.value = result.slice(0,3);
								
				
			} catch (error) {
				console.log(error)
		}
		
	};
	//轮播图
	const getBannerData = async() => {
				
		try {
							
				const res = await integralGetBanner(firstParam.value);
								
				 console.log(res);
				 const result = res.result;
				
				bannerList.value = result.map(item => item.imgUrl);            
				
			} catch (error) {
				console.log(error)
		}
		
	};
	//分类标签
	const getGridLabel = async() => {
				
		try {
							
				const res = await integralFirstLevel(gridParam.value);
								
				 console.log(res);						
				tabs.value = res.result;
				//默认点击第一个
				activeTab.value = res.result[0].categoryCode;
				getGoodsList(activeTab.value);
				
				
			} catch (error) {
				console.log(error)
		}
		
	};
	//分类标签下的商品列表
	const getGoodsList = async(categoryCode:any) =>{
				
		try {
					
				goodsParam.value.Searchcontent = categoryCode;		
				const res = await integralGoodsList(goodsParam.value);
								
				console.log(res);						
				goodsList.value = res.result;
				
			} catch (error) {
				console.log(error)
		}
		
	};
	const handleTabClick = (tab:any) =>{
				
		console.log(tab)
		activeTab.value = tab.categoryCode;
		getGoodsList(activeTab.value);
		
	};
	
	//立即兑换
	const exchangeClick = (item:any) => {
		uni.navigateTo({
			url:`/pages/Integral/confirmOrder?sku=${encodeURIComponent(item.sku)}`
		})
	};
	const goBack = () =>{
			    
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
	  .searchView{
		  width: 100%;
		  height: 45px;
		  background-color: #2A9595;
	  }
	  .searchFeild{
		  margin-left: 3%;
		  width: 94%;
		  height: 35px;
		  
		  background-color: #f1f4f9;
		  border-radius: 5px;
		  font-size: 13px;
	  }
	  
	  .hotHeader{
		  display: flex;
		  flex-direction: row;
		  width: 100%;
		  background-color: white;
		  height: 50px;
	  }
	  .textView{
		  margin-left: 10px;
		  margin-top: 10px;
		  color: firebrick;
	  }
	  .hotView{
		  margin-top: 10px;
		  display: flex;
		  flex-direction: row;
		  width: 100%;
		  .hotview_item{
			  display: flex;
			  flex-direction: column;
			  width: 33.33%;
			  align-items: center;
		  }
	  }
	  
	  .goodsView{
		  display: flex;
		  flex-direction: column;
		  width: 100%;
		  margin-top: 10px;
	  }
	  .goods_item{
		  display: flex;
		  flex-direction: column;
		  margin-top: 10px;
	  }
	  .buttonView{
		 
		margin-top: 10px;
		background-color: red;
		border-radius: 8px;
		color: white;
		font-size: 12px;
		margin-left: 5px; 
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center;     /* 垂直居中 */
		height: 30px;           /* 需要设置高度 */
		width: 80%;             /* 需要设置宽度 */
	  }
	  .tab-list {
	    display: inline-flex;
	    padding: 20rpx;
	  }
	  
	  .tab {
	    position: relative;
	    padding: 20rpx 40rpx;
	    color: #333;
	    font-size: 16px;
	    flex-shrink: 0;
	    cursor: pointer;
	  }
	  
	  .tab.active {
	    color: #2A9595;
	    font-weight: bold;
	  }
	  
	  .line {
	    position: absolute;
	    bottom: -20rpx;
	    left: 50%;
	    transform: translateX(-50%);
	    width: 50rpx;
	    height: 4rpx;
	    background: #2A9595;
	    border-radius: 2rpx;
	  }
 }


</style>