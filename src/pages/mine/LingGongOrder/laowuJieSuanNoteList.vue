<template>
    <view class="main">
        <u-navbar
          title="结算记录"
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
			<view class="headerItem" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;font-size: 15px;margin-top: 10px;margin-left: 15px;">{{item.month_data}}</view>
				<view v-for="(peritem,perindex) in item.dayList" :key="perindex" class="personItem">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="font-size: 14px;width: 50px;white-space: pre-line;">{{peritem.pay_time}}</view>
						<image
						  style="width: 20px; height: 20px;margin-left: 10px;margin-top: 3px;"
						  :src="jiesuannoteImage"
						></image>
						<view style="display: flex;flex-direction: column;width: 80px;">
							<view style="margin-left: 10px;font-size: 13px;">{{peritem.amount}}</view>
							<view style="margin-left: 10px;font-size: 13px;">{{peritem.note_flag}}</view>
						</view>
						<view style="margin-left: 10px;font-size: 13px;width: 100px;">{{peritem.status_flag}}</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunYuanLaoWuOrderJieSuanNoteList} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const jiesuannoteImage = ref('/static/mine/jiesuannoteImage.jpg');
	const orderList = ref([]);
	const loading = ref(false);      // 是否正在加载
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const order_id = ref('');
            
	onLoad((options:any) => {
		
		order_id.value = options.id;
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
				order_id:order_id.value,
				page:page.value,
				size:20,
			};
			MineJiuYeQunYuanLaoWuOrderJieSuanNoteList(param).then((res) =>{
							
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
	 .headerItem{
		 
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 
	 }
	 .personItem{
		 display: flex;
		 color: black;
		 width: 100%;
		
		 flex-direction: column;
		 margin-top: 10px;
	 }
    }
</style>