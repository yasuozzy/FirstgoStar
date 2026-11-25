<template>
    <view class="main">
       <view class="top">
			 <view class="flex">
			   <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
			 </view>
			 <view class="use_info">		
					<view style="margin-left: 10px;border-radius: 17.5px;width: 35px;height: 35px;" @click="myinfoClick">
						<image style="width: 50px;height: 50px;border-radius: 25px;" :src="avatar"></image>
					</view>
			
					<view class="use_info_text">
						<view style="display: flex;flex-direction: row;">
							<view class="use_name">{{name}}</view>
							<view class="yingyeButton">{{buttonTitle}}</view>
						</view>
					  <view class="use_company">{{address}}</view>
					</view>
			 </view>
		</view> 
		<view class="OrdermanageView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">订单管理</view>
			<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			<view class="orderlistView">
				<view class="itemList" v-for="(item,index) in orderManList" :key="index" @click="orderManClick(index)">
					<image style="width: 30px;height: 30px;" :src="item.icon"></image>
					<view style="font-size: 10px;margin-top: 5px;">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="OrdermanageView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">预付订单管理</view>
			<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			<view class="orderlistView" style="margin-bottom: 10px;">
				<view class="yufuButton" @click="yufuCheck">查看预付订单</view>
				<view class="shouhouButton" @click="shouhouClick">预付售后</view>
				<view class="yuyueButton" @click="yuyueClick">预约服务</view>
			</view>
		</view>
		<view class="OrdermanageView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">门店运营</view>
			<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			<view class="orderlistView" style="margin-bottom: 10px;">
				<view class="mendianList" v-for="(item,index) in mendianOrder" @click="shopBuild(index)">
					<image style="width: 30px;height: 30px;" :src="item.icon"></image>
					<view style="font-size: 10px;margin-top: 5px;">{{item.title}}</view>
				</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentGetSelfShopInfo,
	MineShangquanManageMentGetApplyYn} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const avatar = ref('');
	const dataDict = ref({});
	const name = ref('');
	const address = ref('');
	const buttonTitle = ref('');
	const orderManList = ref([{icon:'/static/mine/newOrder.png',title:'新订单'},
							{icon:'/static/mine/ongoing.png',title:'更新中'},
							{icon:'/static/mine/completed.png',title:'已完成'},
							{icon:'/static/mine/cancelled.png',title:'已取消'},
							{icon:'/static/mine/aftersale.png',title:'退款/售后'},
	]);
	const mendianOrder = ref([]);
	const shenqingStatus = ref();
	
	onMounted(() => {
		
		getHeaderInfo();
		getApplyCount();
	});
	const getHeaderInfo = async() => {
		
		try {
			
			let param = {
				
				providerId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId()
			};
			const res = await MineShangquanManageMentGetSelfShopInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			avatar.value = dataDict.value.cover_img;
			name.value = dataDict.value.name;
			address.value = dataDict.value.address;
			if(dataDict.value.open_status === 1){
				
				buttonTitle.value = '歇业中';
				
			}else{
				
				buttonTitle.value = '营业中';
			}
			
		}catch (error) {
			console.log(error)
		}
	};
	const getApplyCount = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId()
			};
			const res = await MineShangquanManageMentGetApplyYn(param);
							
			console.log(res);
			const resultData = res.result;
			shenqingStatus.value = resultData;
			if(resultData === '-1'){
				
				mendianOrder.value = [{icon:'/static/mine/goodsAdministration.png',title:'商品管理'},
										{icon:'/static/mine/couponAdmin.png',title:'优惠券管理'},
										{icon:'/static/mine/userEvaluation.png',title:'用户评价'},
										{icon:'/static/mine/getfiles.png',title:'财务对账'},
										{icon:'/static/mine/goodsSl.png',title:'商品分类管理'},
										{icon:'/static/mine/storeInfo.png',title:'门店信息'},
										{icon:'/static/mine/goodsSpecifications.png',title:'商品规格管理'},
										{icon:'/static/mine/goodsExamine.png',title:'商品审核'},
										{icon:'/static/mine/yufuStoreShenQing.jpg',title:'预付店铺申请'},
				];
				
			}else
			{
				mendianOrder.value = [{icon:'/static/mine/goodsAdministration.png',title:'商品管理'},
										{icon:'/static/mine/couponAdmin.png',title:'优惠券管理'},
										{icon:'/static/mine/userEvaluation.png',title:'用户评价'},
										{icon:'/static/mine/getfiles.png',title:'财务对账'},
										{icon:'/static/mine/goodsSl.png',title:'商品分类管理'},
										{icon:'/static/mine/storeInfo.png',title:'门店信息'},
										{icon:'/static/mine/goodsSpecifications.png',title:'商品规格管理'},
										{icon:'/static/mine/goodsExamine.png',title:'商品审核'},
										{icon:'/static/mine/yufuStoreShenQing.jpg',title:'预付店铺申请'},
										{icon:'/static/mine/yufuGoodsManage.jpg',title:'预付商品管理'}
				];
			}
			
		}catch (error) {
			console.log(error)
		}
	};
	const orderManClick = async(index:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/OrderManageMent?index=${index+1}`
		})
	};
	//查看预付订单
	const yufuCheck = () => {
				   
		uni.navigateTo({
			url:'/pages/mine/circleOrder/yufuOrderList'
		})
		
	};
	const shouhouClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/circleOrder/yufuSalebehind'
		})
	};
	const yuyueClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/circleOrder/yuyueService'
		})
	};
	//门店运营
	const shopBuild = (index:any) => {
		
		if(index === 0){
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/ProductManagePage'
			})
		}else if(index === 1){
			
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/youhuiquanList'
			})
			
		}else if(index === 2){
			
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/customerDisscuss'
			})
			
		}else if(index === 3){
			
			uni.navigateTo({
				url:'/pages/mine/jianguanAcount/myVollet'
			})
			
		}else if(index === 4){
			
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/productTypeManage'
			})
			
		}else if(index === 5){
			
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/StoreInformation'
			})
			
		}else if(index === 6){
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/productDescManagement'
			})
			
		}else if(index === 7){
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/productShenHe'
			})
			
		}else if(index === 8){
			
			if (shenqingStatus.value === '-1') {
				
				
				//预付店铺申请
				uni.navigateTo({
					url:'/pages/mine/ShangQuanManagement/yufuStoreProtocal'
				})
			}else
			{
				//已申请，查看状态
				uni.navigateTo({
					url:`/pages/mine/ShangQuanManagement/shopRenZheng?ifyishenqing=${shenqingStatus.value}`
				})
			}
			
		}else if(index === 9){
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/PreProductManagePage'
			})
		}
		
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
   .main {
     height: auto;
     background: aliceblue;
     min-height: 100vh;
     width: 100%;
   }
   .flex{
	   margin-top: 20px;
	   margin-left: 20px;
   }
   .top {
     height: 170px;
     background: #3AB7B8;
     box-sizing: border-box;
     display: flex;
     flex-direction: column;
     position: relative;
     padding-top: calc(var(--status-bar-height) + 16upx);
     .use_info {
		margin-top: 15px;
		margin-left: 15px;
		display: flex;
		flex-direction: row;
       
       .use_info_text {
		margin-left: 30px;
         .use_name {
			color: white;
			font-size: 16px;
			width: 70%;
         }
         .use_company {
			color: white;
			font-size: 12px;
			margin-top: 5px;
			 white-space: nowrap;      /* 禁止换行 */
			  overflow: hidden;         /* 隐藏溢出内容 */
			  text-overflow: ellipsis;  /* 显示省略号 */
			  width: 90%;
			  
         }
       }
     }
	}
	.yingyeButton{
		
		width: 60px;
		height: 25px;
		color: white;
		font-size: 14px;
		border: 1px white solid;
		border-radius: 4px;
		margin-left: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.OrdermanageView{
		margin-top: 20px;
		margin-left: 4%;
		width: 92%;
		background-color: white;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
	}
	.orderlistView{
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 10px;
		flex-wrap: wrap; /* 允许换行 */
	}
	.itemList{
		display: flex;
		flex-direction: column;
		width: 20%;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
	}
	.yufuButton
	{
		margin-top: 10px;
		margin-left: 4%;
		width: 25.33%;
		height: 40px;
		background-color: #2A9595;
		font-size: 13px;
		border-radius: 4px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.shouhouButton{
		margin-top: 10px;
		margin-left: 8%;
		width: 25.33%;
		height: 40px;
		background-color: darkblue;
		font-size: 13px;
		border-radius: 4px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.yuyueButton{
		
		margin-top: 10px;
		margin-left: 8%;
		width: 25.33%;
		height: 40px;
		background-color: orange;
		font-size: 13px;
		border-radius: 4px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.mendianList{
		display: flex;
		flex-direction: column;
		width: 32.9%;
		align-items: center;
		justify-content: center;
		border: 1px aliceblue solid;
		height: 80px;
	}
</style>