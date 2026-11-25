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
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index" @click="controlItem(item,index)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<image v-if="item.checked === false" style="margin-top: 18px;margin-left: 15px;width: 15px;height: 15px;" src="/src/static/login/choose_unselect.png"></image>
					<image v-if="item.checked === true" style="margin-top: 18px;margin-left: 15px;width: 15px;height: 15px;" src="/src/static/login/choose_select.png"></image>
					<view style="margin-top: 15px;margin-left: 15px;color: gray;font-size: 14px;width: 35%;">序号：{{item.SORT_ORDER}}</view>
					<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{item.fName}}</view>
					<image style="width: 8px;height: 12px;margin-left: 10px;margin-top: 18px;" src="/src/static/service/my_arrow.png"></image>
				</view>
				<view style="margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="deleteClick">删除</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentQuerySelfShopCatListForPage,
	MineShangquanManageMentDelSelfShop} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const IDArray = ref([]);
	
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
			
			dataList.value = dataList.value.map(item => {
			  return {
				...item,
				checked: false  // 默认值为false
			  }
			});
			console.log(dataList.value);
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
	const controlItem = (item:any,index:any) => {
		
		for (var j = 0; j < dataList.value.length; j++) {
			var laederment = dataList.value[j];
				
			if (index == j) {
				
				laederment.checked = !laederment.checked;
			}
		
		};
		console.log(dataList.value);
		
		
	};
	const deleteClick = async() => {
		
		for (var i = 0; i < dataList.value.length; i++) {
			var element = dataList.value[i];
			if(element.checked === true){
				IDArray.value.push(element.ID);
			}
		};
		console.log(IDArray.value);
		if(IDArray.value.length === 0){
			uni.showToast({
				title:'请选择删除分类',
				icon:'none'
			})
			return;
		}
		const idstring = IDArray.value.join('|');
		console.log(idstring);
		try {
			
			let param = {
				
				id:idstring
				
			};
			const res = await MineShangquanManageMentDelSelfShop(param);
							
			console.log(res);
			
			uni.showToast({
				title:'删除分类成功',
				icon:'none'
			});
			uni.navigateBack();
				
			
		}catch (error) {
			console.log(error)
		}
		
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