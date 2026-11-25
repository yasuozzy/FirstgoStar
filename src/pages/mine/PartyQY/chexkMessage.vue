<template>
    <view class="main">
        <u-navbar
          title="查询信息"
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
			<view class="listItemView" v-for="(item,index) in dataList" :key="index" @click="itemClick(item)">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.province_name}}{{item.city_Name}}{{item.district_name}}{{item.street_name}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;color: gray;margin-bottom: 10px;">{{item.region_name}}{{item.grid_name}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MinePartyWangGeMessageCheckWanggeList} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
    import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const checkString = ref('');
	const dataList = ref([]);
           
	onLoad((options:any) => {
			
		checkString.value = decodeURIComponent(options.checkString);
	});
	onMounted(() => {
	  loadData();
	});
       
    const loadData = async() => {
           	
		try {
			
			let param = {
				
				index:checkString.value,
				
			};
			const res = await MinePartyWangGeMessageCheckWanggeList(param);
							
			console.log(res);
			dataList.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const itemClick = (item:any) => {
	   
		eventBus.emit('refresh-address',item);
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
            .listItemView{
              width: 92%;
              margin-left: 4%;
              background-color: white;
              border-radius: 6px;
              margin-top: 15px;
              
             
     }
    }
</style>