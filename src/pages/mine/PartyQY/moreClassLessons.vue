<template>
    <view class="main">
        <u-navbar
          :title="title"
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
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in DataList" :key="index" @click="detailClick(item)">
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;">{{item.title}}</view>
				<view style="width: 100%;font-size: 13px;margin-top: 10px;margin-left: 15px;width: 47%;text-align: right;">{{item.releaseTime}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineJoinPartyClassMoreArticleList} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom } from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#FF0000");
	const title = ref('');
	const DataList = ref([]);
	const loading = ref(false);// 是否正在加载
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);    // 是否没有更多数据了
	const page = ref(1);
	const type = ref(1);
           
	onLoad((options:any) => {
		
		title.value = decodeURIComponent(options.title);
		console.log(title.value);
		if (title.value === '党章党规') {
			type.value = 1;
		}else if (title.value === '系列讲话') {
			type.value = 2;
		}else if (title.value === '重要评论') {
			type.value = 3;
		}
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
	
		if ( !hasMore.value) {
			
			return
		}
		page.value += 1;
		loadData();
	});
        
    const loadData = async() => {
           	
		try {
			
			let param = {

				page:page.value,
				size:20,
				type:type.value
			};
			const res = await MineJoinPartyClassMoreArticleList(param);               
			console.log(res);
			if (page.value === 1) {
										
				DataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				DataList.value.push(...res.result);
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
			   uni.stopPullDownRefresh();
			}
    };
	const detailClick = (item:any) => {
	   
	   uni.navigateTo({
		url:`/pages/mine/PartyQY/lessonsDetail?id=${encodeURIComponent(item.id)}&title=${encodeURIComponent(title.value)}`
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
	 .listItem{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 }
    }
</style>