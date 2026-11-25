<template>
    <view class="main">
        <u-navbar
          title="征集记录"
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
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待发布</view>
				<view v-else style="color: black;font-size: 13px;">待发布</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">进行中</view>
				<view v-else style="color: black;font-size: 13px;">进行中</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">已结束</view>
				<view v-else style="color: black;font-size: 13px;">已结束</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in opinionList" :key="index">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">{{item.title}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">起止日期：{{item.start_date}}--{{item.end_date}}</view>
				
				<view v-if="type == 1" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="detailClick(item)">查看详情</view>
				</view>
				<view v-if="type == 2" style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="checkDetail(item)">查看详情</view>
				</view>
				<view v-if="type == 3" style="display: flex;flex-direction: row;width: 100%;">
					<view v-if="item.status == 2" style="display: flex;flex-direction: row;width: 100%;">
						
						<view class="checkView" @click="checkDetail(item)">查看结果</view>
						<view class="fabuView" @click="fabuClick(item)">发布公示</view>
					</view>
					<view v-else>
						<view class="buttonView" @click="checkDetail(item)">查看结果</view>
					</view>
				</view>
				
				<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;margin-bottom: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyPublicJusticeHistoryList} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const opinionList = ref([]);
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
          
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
	
	if ( ! hasMore.value) {
		
		return
	}
	 page.value += 1;
	 loadData();
   });
       
    const loadData = async() => {
            	
		try {
			
			let param = {
				user_id:storage.getUserId(),
				page: page.value,
				size:20,
				type: type.value - 1,
									  
			};
			const res = await MinePartyPublicJusticeHistoryList(param);
							
			console.log(res);
			if (page.value === 1) {
													
				opinionList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				opinionList.value.push(...res.result);
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
			wx.stopPullDownRefresh()
		}
	};
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
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/yijianZhengJi?id=${encodeURIComponent(item.id)}`
		})
	};
	const checkDetail = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/yijianZhengjiDetail?id=${encodeURIComponent(item.id)}`
		})
	};
	const fabuClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/yijianGongShi?type=${encodeURIComponent(item.type)}&id=${encodeURIComponent(item.id)}`
		})
	};
	const goBack = () => {
		
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
		  
		  width: 100%;
		  display: flex;
		  flex-direction: column;
	  }
	  .buttonView{
	           
		 margin-top: 14px;
		  background-color:#2A9595;
		  border-radius: 8px;
		  color: white;
		  font-size: 12px;
		  margin-left: 280px; 
		  display: flex;
		  justify-content: center; /* 水平居中 */
		  align-items: center;     /* 垂直居中 */
		  height: 30px;           /* 需要设置高度 */
		  width: 80px;             /* 需要设置宽度 */
	}
	.checkView{
		
		margin-top: 14px;
		 background-color:#2A9595;
		 border-radius: 8px;
		 color: white;
		 font-size: 12px;
		 margin-left: 190px; 
		 display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
		 height: 30px;           /* 需要设置高度 */
		 width: 80px;             /* 需要设置宽度 */
	}
	.fabuView{
		margin-top: 14px;
		 background-color:#2A9595;
		 border-radius: 8px;
		 color: white;
		 font-size: 12px;
		 margin-left: 10px; 
		 display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
		 height: 30px;           /* 需要设置高度 */
		 width: 80px;             /* 需要设置宽度 */
	}
	        
    }
</style>