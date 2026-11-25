<template>
    <view class="main">
        <u-navbar
          title="公益活动"
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
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">已报名</view>
				<view v-else style="color: black;font-size: 13px;">已报名</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">未开始</view>
				<view v-else style="color: black;font-size: 13px;">未开始</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">进行中</view>
				<view v-else style="color: black;font-size: 13px;">进行中</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type ==  4" style="color: #2A9595;font-size: 13px;">已结束</view>
				<view v-else style="color: black;font-size: 13px;">已结束</view>
				<view class="whiteLine" v-if="type == 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type == 5" style="color: #2A9595;font-size: 13px;">报名失败</view>
				<view v-else style="color: black;font-size: 13px;">报名失败</view>
				<view class="whiteLine" v-if="type == 5"></view>
			</view>
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.title}}</view>
					<view style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">{{item.statusFlag}}</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">{{item.actTime}}</view>
				
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="type === 1 || type === 2 || type === 4" style="display: flex;">
					<view  class="payBtn" @click="detailClick(item)">查看详情</view>
				</view>
				<view v-if="type === 3 && item.is_sign === 0" style="display: flex;flex-direction: row;">
					<view  class="firstButton" @click="detailClick(item)">查看详情</view>
					<view  class="secondButton" @click="qiandaoClick(item)">去签到</view>
				</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsVolunteerMyActivityList} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const type = ref(1);
	const dataList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const modelshow = ref(false);
	
	const longitude = ref<any>('');
	const latitude = ref<any>('');
	
	onLoad(() => {
		uni.getLocation({
			success: (res: any) => {
				console.log(res);
				latitude.value = res.latitude;
				longitude.value = res.longitude;
			}
		});
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
				type:type.value - 1,
				page:page.value,
				size:10,
	
			};
			const res = await MineNeedToolsVolunteerMyActivityList(param);
							
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
	//切换segment
	const segment1Click = () => {
				
		type.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment2Click = () => {
		
		type.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment3Click = () => {
		
		type.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment4Click = () => {
		
		type.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment5Click = () => {
		
		type.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	//详情
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url: `/pages/service/volunteerQunYuan/activityDetail?id=${item.act_id}&longitude=${longitude.value}&latitude=${latitude.value}`
		});
	};
	//去签到
	const qiandaoClick = (item:any) => {
		
		uni.navigateTo({
		  url: `/pages/service/volunteerQunYuan/activitySign?act_id=${item.act_id}`
		});
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
          .specsView{
          	 width: 100%;
          	 height: 40px;
          	 display: flex;
          	 flex-direction: row;
          	 
          	 background-color: white;
          	 margin-top: 10px;
          	}
          	 .whiteLine{
          		 margin-left: 20%;
          		 margin-top: 7px;
          		 width: 60%;
          		 height: 2px;
          		 background-color: #2A9595;
          	 }
          			 .contentView{
          				 display: flex;
          				 flex-direction: column;
          			 }
          			 .order_item{
          				 display: flex;
          				 flex-direction: column;
          				 width: 100%;
          				 border-radius: 5px;
          				 margin-top: 10px;
          				 margin-left: 4%;
          				 width: 92%;
          				 background-color: white;
          			 }
          			 .payBtn{
          				  margin-left: 280px;
          				  width: 60px;
          				  margin-top: 10px;
          				  color: #2A9595;
          				  border: #2A9595 1px solid;
          				  font-size: 13px;
          				  border-radius: 5px;
          				  display: flex;
          				  justify-content: center;
          				  align-items: center;
          				  margin-bottom: 10px;
          			 }
					 .firstButton{
						 margin-left: 20px;
						 width: 60px;
						 margin-top: 10px;
						 color: #2A9595;
						 border: #2A9595 1px solid;
						 font-size: 13px;
						 border-radius: 5px;
						 display: flex;
						 justify-content: center;
						 align-items: center;
						 margin-bottom: 10px;
						 
					 }
					 .secondButton{
						 margin-left: 200px;
						 width: 60px;
						 margin-top: 10px;
						 color: #2A9595;
						 border: #2A9595 1px solid;
						 font-size: 13px;
						 border-radius: 5px;
						 display: flex;
						 justify-content: center;
						 align-items: center;
						 margin-bottom: 10px;
					 						 
					 }
          			 
}
</style>