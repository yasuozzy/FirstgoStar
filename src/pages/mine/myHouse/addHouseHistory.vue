<template>
    <view class="main">
        <u-navbar
          title="历史记录"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
		  <template #left>
		  	<view slot="left" >
		  		<view class="flex">
		  			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		  		</view>
		  	</view>
		  </template>
        </u-navbar>
		<view  style="display: flex;width: 100%;flex-direction: column;">
			<view class="normal_item" v-for="(item,index) in dataList" @click="detailClick(item)">
				<view style="display: flex;flex-direction: column;width: 100%;">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.name}} {{item.mobile}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: black;">{{item.houseNo}}</view>
					<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
				</view>
				
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted,onUnmounted } from 'vue';
	import {MineHouseInfoAddHouseHistoryList} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([]);
				
            
		
	onMounted(() => {
	  loadData();
	});
            
	const loadData = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
					 
			};
			const res = await MineHouseInfoAddHouseHistoryList(param);
							
				console.log(res);
				  
				dataList.value = res.result;
			
			
		}catch (error) {
			console.log(error)
		}
	};
	const addmessage = () => {
		
	};
	const detailClick  = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/myHouse/addhouseHisDet?id=${encodeURIComponent(item.id)}` 
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
	 .normal_item{
	 		 display: flex;
	 		 flex-direction: column;
	 		 height: 80px;
	 		 width: 100%;
	 }
	 .authView{
	 			 margin-top: 15px;
	 			 margin-left: 10px;
	 			 border-radius: 3px;
	 			 width: 80px;
	 			 height: 30px;
	 			 background-color: #2A9595;
	 			 color: white;
	 			 font-size: 13px;
	 			 display: flex;
	 			 justify-content: center;
	 			 align-items: center;
	 			 margin-left: 20px;
	 }
    }
</style>