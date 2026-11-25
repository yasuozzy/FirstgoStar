<template>
    <view class="main">
        <u-navbar
          title="投诉建议"
          @rightClick="rightClick"
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
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">已回复</view>
				<view v-else style="color: black;font-size: 13px;">已回复</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in dataArray" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">投诉人:{{item.userName}}{{item.mobile}}</view>
					<view v-if="item.type == 1" style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: #2A9595;">投诉</view>
					<view v-if="item.type == 2" style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: #2A9595;">建议</view>
					<view v-if="item.type == 3" style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: #2A9595;">表彰</view>
				</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">所属管理处:{{item.manName}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;margin-bottom: 15px;">创建时间:{{item.complain_time}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys,uploadMultipleFiles } from '@/utils/storage';
    import { PartyPublicDiscussComplaintAndAdvice } from '@/api/mine';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	
	const dataArray = ref([]);
	const page = ref<number>(1);
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);   // 是否没有更多数据了
	
	onMounted(() =>{
		
		getDataList();
	});
	onPullDownRefresh(()=>{
		// 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		
		getDataList();
	});
	onReachBottom(() => {
		if ( !hasMore.value) {
			
			return
		}
		page.value += 1;
		getDataList();
	});


	const getDataList = async() => {
		
		
		try {
			
			let param = {
				size:10,
				page:page.value,
				user_id:getStorage(storageKeys.userId,''),
				status:type.value
			};
			const res = await PartyPublicDiscussComplaintAndAdvice(param);
			console.log(res);
			if (page.value === 1) {
										
				dataArray.value = res.result;
			}else
			{
				// 正确的数组合并方式
				dataArray.value.push(...res.result);
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
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}finally{
			
			uni.stopPullDownRefresh();
		}
		
	};
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/tousujianyiDetail?id=${encodeURIComponent(item.id)}&state=${encodeURIComponent(item.state)}`
		})
	};	 
	const segment1Click = () => {
		
		type.value = 1;
	};
	const segment2Click = () => {
		
		type.value = 2;
	};
	const goBack = () => {
		
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
          .specsView{
           		 width: 100%;
           		 height: 40px;
           		 display: flex;
           		 flex-direction: row;
           		 
           		 background-color: white;
           		 margin-top: 10px;
           }
           .whiteLine{
           		 margin-left: 35%;
           		 margin-top: 7px;
           		 width: 30%;
           		 height: 2px;
           		 background-color: #2A9595;
           }
		   .listItem{
			   margin-top: 10px;
			   margin-left: 4%;
			   width: 92%;
			   display: flex;
			   flex-direction: column;
			   background-color: white;
			   border-radius: 5px;
		   }
    }
</style>