<template>
    <view class="main">
        <u-navbar
          title="选择工作"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index" @click="choseClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 75%;">{{item.work_type}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: red;text-align: right;">{{item.salary}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: dimgray;">{{item.company}}{{item.work_time}}{{item.work_num}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineJiuYeQunYuanUseWorkerChoseWorkList} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '../../../utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const page = ref(1);
				
           
	onMounted(() => {
	  init();
	});
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		page.value = 1;
		init();
	});
        
	const init = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				page:page.value,
				size:10,
			};
			MineJiuYeQunYuanUseWorkerChoseWorkList(param).then((res) =>{
							
				console.log(res);
				dataList.value = res.result;
				
				
			});
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	const choseClick = (item:any) =>{
		
		eventBus.emit('chosework-data', item);
		uni.navigateBack();
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
          .flex{
              display: flex;
          }
		  .listItem{
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  height: 80px;
			  border-radius: 5px;
			  background-color: white;
			  display: flex;
			  flex-direction: column;
		  }
           
    }
</style>