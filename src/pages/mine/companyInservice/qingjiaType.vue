<template>
    <view class="main">
        <u-navbar
          title="选择类型"
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
		<view style="display: flex;flex-direction: column;width: 100%;" >
			<view class="listItem" v-for="(item,index) in DataList" :key="index" @click="chooseTypeClick(item)">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.name}}</view>
				<view style="margin-left: 4%;width: 92%;margin-top: 10px;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideQingJiaType} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const DataList = ref([]);

            
	onMounted(() => {
	   init();
	});
        
	const init = async() => {
		
		try {
				let param = {
				};			
				const res = await MineComInsideQingJiaType(param);
								
					console.log(res);						
					DataList.value = res.result;
							  
				
			} catch (error) {
				console.log(error)
		}
	};
	const chooseTypeClick = (item:any) => {
		eventBus.emit("chooseType", item);
		uni.navigateBack();
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
	 .listItem{
		 width: 100%;
		 height: 40px;
	 }
    }
</style>