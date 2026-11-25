<template>
    <view class="main">
        <u-navbar
          title="我的协议"
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
		<input class="searchlocation" v-model="searchIndex" placeholder="搜索" type="text" />
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="ItemView" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="display: flex;flex-direction: column;width: 85%;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工工种  {{item.work_type}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">签订时间  {{item.create_time}}</view>
					</view>
					<image style="width: 12px;height: 16px;margin-left: 15px;margin-top: 20px;" :src="my_arrow"></image>
				</view>
				<view style="width: 100%;margin-top: 10px;height: 10px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkCompanyUseWorkProtocalList} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const my_arrow = ref('/static/service/my_arrow.png');
	const orderList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const userType = ref('');
	const searchIndex = ref('');
				
           
	onLoad((options:any) => {
		
		userType.value = options.userType;
	});
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
				size:20,
				userType:1,
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkProtocalList(param).then((res) =>{
							
				console.log(res);
				if (page.value === 1) {
											
					orderList.value = res.result;
				}else
				{
					// 正确的数组合并方式
					res.result.forEach(item => {
						orderList.value.push(item)
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
			});
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/myProtocalDetail?id=${item.id}&userType=${userType.value}`
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .searchlocation{
	          margin-left: 4%;
	          width: 92%;
	          height: 35px;
	          margin-top: 10px;
	          border: 1px lightgray solid;
	          border-radius: 5px;
	          font-size: 13px;
	}
	.ItemView{
		display: flex;
		flex-direction: column;
		width: 100%;
	}

}
</style>