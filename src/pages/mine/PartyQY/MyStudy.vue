<template>
    <view class="main">
        <u-navbar
          title="我的学习"
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
			<view class="listItem" v-for="(item,index) in orderList" @click="detailClick(item)">
				<view style="margin-top: 15px;margin-left: 4%;font-size: 15px;width: 92%;">{{item.title}}</view>
				<view style="margin-top: 10px;margin-left: 4%;font-size: 15px;text-align: right;width: 92%;">{{item.releaseTime}}</view>
				<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MinePartyPublicMyStudyList} from '@/api/mine';
    import { onLoad,onPullDownRefresh,onReachBottom} from '@dcloudio/uni-app';
    // 背景颜色
    const bgColor = ref("#FF0000");
				
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const orderList = ref([]);
           
	onMounted(() => {
			   
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		 page.value = 1;
		 hasMore.value = true;
		 noMore .value= false;
		 loadData();
		
	});
	//上拉刷新
	onReachBottom(() => {
		
		if ( ! hasMore.value) {
			
			return
		}
		 page.value += 1;
		
		 loadData();
		
	});
    const loadData = async() => {
	try {
		
		let param = {
			userId:storage.getUserId(),
			page: page.value,
			size:20,
									  
		};
		const res = await MinePartyPublicMyStudyList(param);
						
		console.log(res);
		if (page.value === 1) {
												
			orderList.value = res.result;
		}else
		{
			// 正确的数组合并方式
			orderList.value.push(...res.result);
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
		   wx.stopPullDownRefresh()
	   }
   };
	const detailClick = (item:any) => {
			   
	   uni.navigateTo({
		url:`/pages/mine/PartyQY/MyStudyDetail?articleId=${encodeURIComponent(item.articleId)}` 
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
        .listItem{
			display: flex;
			flex-direction: column;
			width: 100%;
		}
    }
</style>