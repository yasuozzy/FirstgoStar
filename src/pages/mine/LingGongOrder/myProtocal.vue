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
		<input class="searchlocation" v-model="index" placeholder="搜索" type="text" />
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="display: flex;flex-direction: column;width: 80%;">
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工工种</view>
							<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.work_type}}</view>
						</view>
						<view style="display: flex;flex-direction: row;">
							<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">签订时间</view>
							<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.create_time}}</view>
						</view>
					</view>
					<u-image style="margin-top: 20px;margin-left: 15px;"
					  :src="myArrow"
					  width="20px"
					  height="20px"
					></u-image>
				</view>
				<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunYuanUseWorkerMyProtocalList} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const userType = ref('');
	const orderList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const myArrow = ref('/static/service/my_arrow.png');
	const index = ref('');
				
           
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
				index:index.value,
				userType:userType.value
			};
			MineJiuYeQunYuanUseWorkerMyProtocalList(param).then((res) =>{
							
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
	const detailClick = async(item:any) => {
	   
	   uni.navigateTo({
		url:`/pages/mine/LingGongOrder/myProtocalDetail?id=${item.id}&userType=${userType.value}`
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
           .searchlocation{
				margin-left: 4%;
				width: 92%;
				height: 30px;
				margin-top: 10px;
				border: 1px lightgray solid;
				border-radius: 5px;
				font-size: 13px;
			}
			.listItem{
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 80px;
			}
    }
</style>