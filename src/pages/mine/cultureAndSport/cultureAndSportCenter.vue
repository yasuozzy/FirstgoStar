<template>
    <view class="main">
        <u-navbar
          title="文体活动"
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
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<image style="margin-top: 10px;margin-left: 10px;width: 80px;height: 80px;margin-bottom: 10px;" :src="item.act_pic"></image>
				<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;">
					<view style="font-size: 12px;color: black;margin-top: 5px;">{{item.act_name}}</view>
					<view style="font-size: 12px;color: black;margin-top: 10px;">活动日期:{{item.act_start_time}}-{{item.act_end_time}}</view>
					<view style="font-size: 12px;color: black;margin-top: 10px;">活动地点:{{item.act_location}}</view>
				</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsCultureAndSportsList} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	
	onMounted(() => {
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
	    	
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		// loading = false;
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
				
				page:page.value,
				size:20
				
			};
			const res = await MineNeedToolsCultureAndSportsList(param);
							
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
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/cultureAndSport/actDetail?act_id=${item.act_id}`
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
		  background-color: aliceblue;
	}
	.contentView{
		 display: flex;
		 flex-direction: column;
	 }
	 .order_item{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 border-radius: 5px;
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 background-color: white;
	}

</style>