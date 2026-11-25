<template>
    <view class="main">
        <u-navbar
          title="捐赠推荐"
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
		<view class="contentListView">
			<view class="content_item" v-for="(item,index) in donationList" :key="index" @click="donateClick">
				<view style="margin-left: 3%;width: 94%;align-items: center;display: flex;flex-direction: row;background-color: white;height: 80px;align-items: center;">
					<u-image style="margin-left: 30px;border-radius: 4px;"
					  :src="item.head_img"
					  width="30px"
					  height="30px"
					></u-image>
					<view style="margin-left: 5px;font-size: 14px;">{{item.donated_name}}</view>
				</view>
				
			</view>
		</view>
		
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MinePartyPublicLoveBankGetMember} from '@/api/mine';
	 import { onLoad,onPullDownRefresh,onReachBottom} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const donationList = ref([]);
	const hasMore = ref(true);  // 是否还有更多数据
	const noMore = ref(false);   // 是否没有更多数据了
	const page = ref(1);
           
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
	onMounted(() => {
	  loadData();
	});
       
    const loadData = async() => {
           	
	try {
		
		let param = {};
		const res = await MinePartyPublicLoveBankGetMember(param);
			
		console.log(res);
		 if (page.value === 1) {
												
			donationList.value = res.result;
		}else
		{
			// 正确的数组合并方式
			donationList.value.push(...res.result);
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
   const goBack = () =>{
	
	uni.navigateBack()
   };
	//点击去捐赠积分
	const donateClick = () => {
		uni.navigateTo({
			url:'/pages/service/volunteerQunYuan/gotoDonate'
		})
	};
       
</script>

<style lang="scss" scoped>
    .main {
         background-color: aliceblue;
         
         min-height: 100vh;
         width: 100%;
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
	 .contentListView{
		 width: 100%;
		 display: flex;
		 flex-wrap: wrap; /* 允许换行 */
		 .content_item{
			 border-radius: 5px;
			 box-sizing: border-box;
			 width: 50%;
			 height: 80px;
			 margin-top: 10px;
		 }
	 }
    }
</style>