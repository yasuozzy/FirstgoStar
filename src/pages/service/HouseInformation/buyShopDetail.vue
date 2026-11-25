<template>
    <view class="main">
        <u-navbar
          title="详情"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
          
        </u-navbar>
		<view class="swiper">
		  <u-swiper :list="swiperList" :autoplay="true" :radius="0" height="160"></u-swiper>
		</view>
		<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;">{{dataDict.title}}</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="width: 33.33%;" v-for="(item,index) in dataList" :key="index">
				<view style="font-size: 14px;text-align: center;">{{item}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 5px;">
			<view style="width: 33.33%;" v-for="(item,index) in infoList" :key="index">
				<view style="font-size: 12px;text-align: center;color: gray;">{{item}}</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;margin-top: 10px;" @click="locationClick">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">位置</view>
			<view style="font-size: 13px;margin-left: 20px;width: 72%;">{{dataDict.location_name}}</view>
			<u-image style="margin-left: 10px;margin-top: 5px;"
			  :src="locationImg"
			  width="12px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">房号</view>
			<view style="font-size: 13px;margin-left: 20px;">{{dataDict.houser_num}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">类型</view>
			<view style="font-size: 13px;margin-left: 20px;">{{dataDict.shop_type}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">楼层</view>
			<view style="font-size: 13px;margin-left: 20px;">{{dataDict.house_floor}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">行业</view>
			<view style="font-size: 13px;margin-left: 20px;">{{dataDict.operating_industry}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">状态</view>
			<view style="font-size: 13px;margin-left: 20px;">{{dataDict.operating_status}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;height: 30px;">
			<view style="margin-left: 15px;font-size: 13px;color: gray;">规格</view>
			<view style="font-size: 13px;margin-left: 20px;">{{dataDict.spec}}</view>
		</view>
		
		<view style="width: 100%;
			  margin-left: 15px;
			  display: flex;
			  flex-direction: row;">
			<view style="text-align: center;
			  font-size: 12px;" v-for="(tagitem,index) in tagList" :key="index">
				<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;">{{tagitem}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;font-size: 13px;color: gray;margin-top: 10px;">配套设施</view>
		<view class="financial_situation">
		
		  <view class="situation_contect">
		    <view
		      class="situation_item"
		      v-for="(item, index) in toolsList"
		      :key="index"
		    >
		      <view class="item_text">√{{item}}</view>
		    </view>
		  </view>
		  
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;font-size: 13px;color: gray;margin-top: 10px;">房屋亮点</view>
		<view style="margin-left: 15px;font-size: 12px;color: gray;margin-top: 10px;">{{dataDict.detailed}}</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="footer-container">
		    <view style="display: flex;flex-direction: row;">
				<view style="display: flex;flex-direction: column;margin-top: 2px;margin-left: 15px;width: 30px;height: 30px;" @click="collectClick(dataDict.collectionId)">
					
					<u-image v-if="dataDict.collectionId"
					  :src="starCollected"
					  width="25px"
					  height="25px"
					></u-image>
					<u-image v-if="!dataDict.collectionId"
					  :src="starCollectdefault"
					  width="25px"
					  height="25px"
					></u-image>
					<view style="font-size: 10px;width: 20px;height: 15px;color: black;margin-left: 2px;">收藏</view>
				</view>
				<view style="display: flex;flex-direction: column;margin-top: 2px;margin-left: 20px;width: 30px;height: 30px;" @click="jubaoClick">
					<u-image 
					  :src="reportImg"
					  width="25px"
					  height="25px"
					></u-image>
					<view style="font-size: 10px;width: 20px;height: 15px;color: black;margin-left: 2px;">举报</view>
				</view>
		        <view class="talk-button" @click="chatClick">在线聊</view>
		        <view class="order-button" @click="phoneCall">打电话</view>
		    </view>
		            
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceHouseInfoBuyShopDetail, serviceHouseInfoBuyShopAddColletion } from '@/api/service';
	import { GetAgreemente } from '@/api/mine';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	// 轮播图列表
	const swiperList = ref<any[]>([]);
	const title = ref('旺铺花海贸易广场3-12号');
	const dataList = ref<any[]>([]);
	const infoList = ref(['售价','面积']);
	const locationImg = ref('/static/integral/locationAddress.png');
	const tagList = ref<any[]>([]);
	
	const toolsList = ref<any[]>([]);
	
	const saleId = ref('');
	const dataDict = ref<any>({});
	const longitude = ref('');
	const latitude = ref('');
	const agreement_name = ref('');
	const agreement_content = ref('');
	const scrollHeight = ref(600);
	const starCollected = ref('/static/service/collect_selected.png');
	const starCollectdefault = ref('/static/service/collect_default.png');
	const reportImg = ref('/static/service/report.png');

	const init = () => {
		try {
			let param = {
				saleId: saleId.value,
				userId: storage.getUserId(),
			};
			serviceHouseInfoBuyShopDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
				swiperList.value = res.result.picture ? res.result.picture.split(',') : [];
				
				dataList.value = [];
				const price = res.result.selling_price + '万';
				dataList.value.push(price);
				const newarea = res.result.built_area + 'm²';
				dataList.value.push(newarea);
				
				latitude.value = res.result.latitude;
				longitude.value = res.result.longitude;
				
				const allocation = res.result.allocation;
				if (allocation) {
					toolsList.value = allocation.split(',');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getAgreement = () => {
		//我的钱包
		try {
			let param = {
				type: '15',
			};
			GetAgreemente(param).then((res: any) => {
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error);
		}
	};

	//房产位置地图
	const locationClick = () => {
		uni.navigateTo({
			url: '/pages/service/HouseInformation/rentHouseLocation?longitude=' + longitude.value + '&latitude=' + latitude.value
		});
	};

	//在线聊
	const chatClick = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
	};

	//打电话
	const phoneCall = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		uni.makePhoneCall({
			phoneNumber: dataDict.value.userMobile || '',
			success: () => {
				console.log('拨打电话成功');
			},
			fail: (error: any) => {
				console.error('拨打电话失败:', error);
				uni.showToast({
					title: '拨打电话失败，请重试',
					icon: 'none'
				});
			}
		});
	};

	const collectClick = (collectionId: any) => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		if (collectionId) {
			uni.showModal({
				cancelText: '否',
				confirmText: '是',
				confirmColor: '#2A9595',
				title: '提示',
				content: '是否取消收藏？',
				success: (e) => {
					console.log(e);
					if (e.confirm === true) {
						console.log('是');
						//取消收藏
						cancelCollet();
					} else {
						console.log('否');
					}
				}
			});
		} else {
			//收藏
			try {
				let param = {
					rentalId: saleId.value,
					userId: storage.getUserId(),
					saleId: saleId.value,
					operateType: "1"
				};
				serviceHouseInfoBuyShopAddColletion(param).then((res: any) => {
					console.log(res);
					init();
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const cancelCollet = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		try {
			let param = {
				rentalId: saleId.value,
				userId: storage.getUserId(),
				saleId: saleId.value,
				operateType: "0"
			};
			serviceHouseInfoBuyShopAddColletion(param).then((res: any) => {
				console.log(res);
				init();
			});
		} catch (error) {
			console.log(error);
		}
	};

	//举报
	const jubaoClick = () => {
		if (dataDict.value.userId === storage.getUserId()) {
			uni.showToast({
				title: '这是你发布的~',
				icon: 'none',
			});
			return;
		}
		uni.navigateTo({
			url: '/pages/service/HouseInformation/jubaoHouse?dataDict=' + JSON.stringify(dataDict.value) + '&type=' + 2
		});
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		saleId.value = options.saleId || '';
		init();
		getAgreement();
	});
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
	 .financial_situation {
	     width: 100%;
	     background: #fff;
	     
	     margin-top: 10px;
	     box-sizing: border-box;
	     .situation_top {
	       display: flex;
	       flex-direction: row;
	       align-items: center;
	       justify-content: space-between;
	       .situation_title {
	         color: #333;
	       }
	       .situation_date {
	         ::v-deep .uni-select {
	           border-bottom: 1px solid #ccc;
	         }
	       }
	     }
	     .situation_contect {
	       display: flex;
	       flex-direction: row;
	       flex-wrap: wrap;
	       align-items: center;
	 	  
	       justify-content: space-evenly;
	       .situation_item {
	         width: 20%;
	         font-size: 12px;
	 		
	         color: #000;
	         box-sizing: border-box;
	         display: flex;
	         flex-direction: column;
	         align-items: center;
	         height: 65upx;
	 		margin-bottom: 50upx;
	 		.item_text{
	 			margin-top: 4upx;
	 		}
	       }
	     }
	   }
	    .buttonView{
	                 
	        margin-top: 30px;
	        background-color: #2A9595;
	        border-radius: 5px;
	        color: white;
	        font-size: 14px;
	        margin-left: 5%; 
	        display: flex;
	        justify-content: center; /* 水平居中 */
	        align-items: center;     /* 垂直居中 */
	        height: 40px;           /* 需要设置高度 */
	        width: 90%;             /* 需要设置宽度 */
			margin-bottom: 20px;
	    }
		.protocalView{
			background-color: white;
			margin-top: 95px;
			margin-left: 4%;
			width: 92%;
			height: 670px;
			display: flex;
			flex-direction: column;
			border-radius: 4px;
		}
		.agreement-scroll {
		  /* 设置合适的高度，可以动态计算 */
		  padding: 5px;
		}
		.buttonView1{
			
			margin-top: 10px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 14px;
			margin-left: 20%; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 35px;           /* 需要设置高度 */
			width: 60%;             /* 需要设置宽度 */
			
		}
		.footer-container {
		      position: fixed;
		      bottom: 0;
		      left: 0;
		      right: 0;
		      height: 50px;
		      background-color: white;
		      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		      z-index: 100;
		      color: white;
		      display: flex;
		      justify-content: center; /* 水平居中 */
		      align-items: center;     /* 垂直居中 */
		      
		    }
				 .talk-button{
				 			 
				 			 display: flex;
				 			 justify-content: center; /* 水平居中 */
				 			 align-items: center;     /* 垂直居中 */
				 			 height: 35px;           /* 需要设置高度 */
				 			 width: 80px;
				 			 margin-right: 10px;
				 			 font-size: 13px;
				 			 color: white;
				 			 background-color: #2A9595;
				 			 border-radius: 5px;
				 			 margin-left: 80px;
				 			 margin-top: 5px;
				 }
				 .order-button {
				              
				     display: flex;
				     justify-content: center; /* 水平居中 */
				     align-items: center;     /* 垂直居中 */
				     height: 35px;           /* 需要设置高度 */
				     width: 80px;
				     margin-right: 10px;
				     font-size: 13px;
				     color: white;
				     background-color: #2A9595;
				     border-radius: 5px;
				     margin-left: 10px;
				     margin-top: 5px;
				 }
    }
</style>