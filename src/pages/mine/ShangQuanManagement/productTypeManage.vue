<template>
    <view class="main">
        <u-navbar
          title="商品分类管理"
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
              <view slot="right" @click="deleteClick()">
                  <u-image
                    :src="deleteimage"
                    width="20px"
                    height="20px"
                  ></u-image>
              </view>
            </template>
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 15px;margin-left: 15px;color: gray;font-size: 14px;width: 40%;">序号：{{item.SORT_ORDER}}</view>
					<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 43%;text-align: right;">{{item.fName}}</view>
					<image style="width: 8px;height: 12px;margin-left: 10px;margin-top: 18px;" src="/src/static/service/my_arrow.png"></image>
				</view>
				<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="addClick">添加商品分类</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentQuerySelfShopCatListForPage} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const deleteimage = ref('/static/mine/deleteWhite.png');
	const dataList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	
	onShow(() => {
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
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				limit:10,
	
			};
			const res = await MineShangquanManageMentQuerySelfShopCatListForPage(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value.push(item)
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
	const deleteClick = () => {
		
		
		uni.navigateTo({
			url:'/pages/mine/ShangQuanManagement/deleteProductType'
		})
	};
	const addClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/ShangQuanManagement/addProductType'
		})
	};
    const goBack= () => {
        
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
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
		  }
		  .footer-container {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 70px;
			background-color: white;
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
			z-index: 100;
			color: white;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			
		  }
		  .order-button {
					   
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 40px;           /* 需要设置高度 */
			  width: 92%;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 6px;
			  margin-left: 4%;
			  margin-top: 15px;
		  }
}
</style>