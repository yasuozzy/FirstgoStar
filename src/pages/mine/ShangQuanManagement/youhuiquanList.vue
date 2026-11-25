<template>
    <view class="main">
        <u-navbar
          title="我的优惠券"
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
                    :src="addimage"
                    width="20px"
                    height="20px"
                  ></u-image>
              </view>
            </template>
        </u-navbar>
		<view class="greenHeaderView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 15px;">进行中</view>
				<view v-else style="color: black;font-size: 15px;">进行中</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type == 2" style="color: #2A9595;font-size: 15px;">未开始</view>
				<view  v-else style="color: black;font-size: 15px;">未开始</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment3Click">
				<view  v-if="type == 3" style="color: #2A9595;font-size: 15px;">已结束</view>
				<view  v-else style="color: black;font-size: 15px;">已结束</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
		</view>
		<view class="contentListView">
			<view class="listItem" v-for="(item,index) in contentList">
				<view class="contentView">
					<view style="width: 100px;display: flex;flex-direction: column;background-color: #2A9595;align-items: center;">
						<view style="display: flex;flex-direction: row;margin-top: 35px;width: 100%;align-items: center;justify-content: center;">
							<view style="font-size: 12px;color: white;">￥</view>
							<view style="font-size: 20px;color: white;">{{item.couponDenomination}}</view>
						</view>
						<view style="font-size: 12px;color: white;margin-top: 10px;">【满{{item.couponOrderAmountLowest}}可用】</view>
					</view>
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="color: #2A9595;font-size: 13px;margin-left: 10px;margin-top: 10px;">{{item.couponName}}</view>
						<view style="font-size: 13px;margin-left: 10px;margin-top: 10px;">有效期至：{{item.couponUseEndtime}}</view>
						<view style="color: #2A9595;margin-top: 10px;">-----------------------------------------------------------</view>
						<view style="font-size: 12px;color: gray;margin-top: 10px;margin-left: 10px;margin-bottom: 10px;">{{item.coupouDesc}}</view>
					</view>
				</view>
				<view v-if="type == 1" class="buttonView">
					<view class="checkButton" @click="checkClick(item)">查看</view>
				</view>
				<view v-if="type == 2" class="buttonView">
					<view class="deleteButton" @click="deleteClick(item)">删除</view>
					<view class="editButton" @click="editClick(item)">编辑</view>
				</view>
				<view v-if="type == 3" class="buttonView">
					<view class="checkButton" @click="deleteClick(item)">删除</view>
				</view>
			</view>
		</view>
		<u-modal :show="modelshow" @confirm="confirmClick" :title="title" confirm-text="确定" showCancelButton="true" @cancel="cancelReBaoJia"  style="display: flex;flex-direction: column;">
			<view style="margin-top: 20px;width: 100%;text-align: center;font-size: 13px;">确认将这个优惠券删除吗？</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentQueryShopCouponListForPage,
	MineShangquanManageMentQueryShopCouponListDeleteCouponById} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const addimage = ref('/static/mine/addItemImage.png');
	const type = ref(1);
	const contentList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
	const page = ref(1);
	const status = ref();
	const title = ref('提示');
	const modelshow = ref(false);
	const deleteItem = ref({});
	        
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
	//上拉刷新
	onReachBottom(() => {
		
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		loadData();
	});
	   
	const loadData = async() => {
	    
		
		if(type.value === 1){
			
			status.value = 1;
			
		}else if(type.value === 2){
			
			status.value = 0;
			
		}else if(type.value === 3){
			
			status.value = 2;
			
		}
		try {
			
			let param = {
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				page:page.value,
				limit:20,
				status:status.value,
					   
			};
			const res = await MineShangquanManageMentQueryShopCouponListForPage(param);
							
			console.log(res);
			if (page.value === 1) {
										
				contentList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					contentList.value.push(item)
				});
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
	
	//切换segment
	const segment1Click = () => {
				
		type.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment2Click = () => {
		
		type.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		// loading = false;
		loadData();
	};
	const segment3Click = () => {
		type.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		// loading = false;
		loadData();
	};
	//删除
	const deleteClick = (item:any) => {
		modelshow.value = true;
		deleteItem.value = item;
	};
	const confirmClick = async() => {
		
		try {
			
			let param = {
				
				id:deleteItem.value.id,
				
			};
			const res = await MineShangquanManageMentQueryShopCouponListDeleteCouponById(param);
							
			console.log(res);
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadData();
			
		}catch (error) {
			console.log(error)
		}
		modelshow.value = false;
	};
	const cancelReBaoJia = () => {
		modelshow.value = false;
	};
	//查看
	const checkClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/youhuiquanDetail?listItem=${item}`
		})
	};
	//编辑
	const editClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/addYouHuiQuan?listItem=${item}`
		})
	};
	//添加
	const addClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/ShangQuanManagement/addYouHuiQuan'
		})
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
		  height: auto;
          .flex{
              display: flex;
          }
		  .greenHeaderView{
		  	display: flex;
		  	flex-direction: row;
		  	background-color: white;
		  	width: 100%;
		  	height: 50px;
		  	
		  }
		  .whiteLine{
		  		 margin-left: 35%;
		  		 margin-top: 5px;
		  		 width: 30%;
		  		 height: 2px;
		  		 background-color: #2A9595;
		  }
		  .contentListView{
		  	display: flex;
		  	flex-direction:column;
		  	width: 100%;
		  	background-color: white;
		  }
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
			  
		  }
		  .contentView{
			  display: flex;
			  flex-direction: row;
			  border: 1px solid #2A9595;
			  border-radius: 5px;
			  margin-left: 4%;
			  width: 92%;
			  margin-top: 10px;
		  }
		  .buttonView{
			  display: flex;
			  flex-direction: row;
			  width: 100%;
		  }
		  .checkButton
		  {
			   margin-top: 10px;
			   background-color: #2A9595;
			   border-radius: 5px;
			   color: white;
			   font-size: 13px;
			   margin-left: 290px; 
			   display: flex;
			   justify-content: center; /* 水平居中 */
			   align-items: center;     /* 垂直居中 */
			   height: 30px;           /* 需要设置高度 */
			   width: 70px;             /* 需要设置宽度 */
		  }
		  .deleteButton{
			  margin-top: 10px;
			  background-color: #2A9595;
			  border-radius: 5px;
			  color: white;
			  font-size: 13px;
			  margin-left: 210px; 
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 70px;             /* 需要设置宽度 */
		  }
		  .editButton{
			  margin-top: 10px;
			  background-color: #2A9595;
			  border-radius: 5px;
			  color: white;
			  font-size: 13px;
			  margin-left: 10px; 
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 70px;             /* 需要设置宽度 */
		  }
}
</style>