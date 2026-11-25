<template>
    <view class="main">
        <u-navbar
          title="房产信息"
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
		  <template #right>
			  <view slot="right" @click="addmessage()">
				<view class="homestayView">添加信息</view>
			  </view>
		  </template>
        </u-navbar>
		<view  style="display: flex;width: 100%;flex-direction: column;">
			<view class="normal_item" v-for="(item,index) in dataList" >
				<view style="display: flex;flex-direction: row;">
					<view style="display: flex;flex-direction: column;width: 70%;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.house_name}}</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: darkgray;">{{item.create_time}}</view>
					</view>
					<view  class="authView" @click="detailClick(item)">查看详情</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.mobile}}</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { onLoad,onPullDownRefresh,onReachBottom } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted } from 'vue';
	import {MineHouseTreasureHouseMessage} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
	const hseid = ref('');
	const address = ref('');
           
	onLoad((options:any) => {
		hseid.value = decodeURIComponent(options.hseid);
		address.value = decodeURIComponent(options.address);
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
        	
		if (!hasMore) {
			
			return
		}
		page.value += 1;
		loadData();
	});
        
    const loadData = async() => {
            	
		try {
			
			let param = {
				user_id:storage.getUserId(),
				page:page.value,
				size:20,
				house_id:hseid.value,
					 
			};
			const res = await MineHouseTreasureHouseMessage(param);
							
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
	const addmessage = () => {
		
		if (storage.getLoginType() != 1) {
			
			uni.navigateTo({
				url:`/pages/mine/myHouse/AddHouseInfo?house_id=${encodeURIComponent(hseid.value)}&house_name=${address.value}`
			})
			
		}else
		{
			uni.navigateTo({
				url:`/pages/mine/myHouse/AddHouseInfoSecond?house_id=${encodeURIComponent(hseid.value)}&house_name=${address.value}`
			})
		}
		
		
	};
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/myHouse/houseHistoryDet?hseid=${encodeURIComponent(item.id)}&type=${encodeURIComponent(item.type)}`
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