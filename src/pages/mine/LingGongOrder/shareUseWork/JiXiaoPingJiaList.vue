<template>
    <view class="main">
        <u-navbar
          title="派遣人员"
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
			<view class="listItem" v-for="(item,index) in OrderList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<image style="margin-top: 15px;margin-left: 15px;width: 15px;height: 15px;" src="/static/mine/squreselect.png"></image>
					<view style="margin-top: 12px;margin-left: 5px;font-size: 13px;width: 60%;">{{item.worker_name}}</view>
					<view v-if="item.is_eva == 0" class="buttonView" @click="gopingjia(item)">去评价</view>
					<view v-if="item.is_eva == 1" class="buttonView" @click="checkpingjia(item)">查看评价</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoPingJiaList} from '@/api/mine';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const OrderList = ref([]);
	const idstring = ref('');
            
	onLoad((options:any) => {
		
		idstring.value = options.id;
	});
	onMounted(() => {
		
	  init();
	  
	});
        
	const init = async() => {
		
		try {
			
			let param = {
				
				id:idstring.value
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoPingJiaList(param).then((res) =>{
							
				console.log(res);
				OrderList.value = res.result;
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//去评价
	const gopingjia = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/JiXiaoGoToPingJia?recId=${item.recId}`
		})
	};
	//查看评价
	const checkpingjia = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/shareUseWork/JiXiaoCheckPingJia?recId=${item.recId}`
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
	 .buttonView{
		  margin-top: 10px;
		  background-color: #2A9595;
		  border-radius: 5px;
		  color: white;
		  font-size: 13px;
		  margin-left: 15px; 
		  display: flex;
		  justify-content: center; /* 水平居中 */
		  align-items: center;     /* 垂直居中 */
		  height: 25px;           /* 需要设置高度 */
		  width: 80px;             /* 需要设置宽度 */
	 }
    }
</style>