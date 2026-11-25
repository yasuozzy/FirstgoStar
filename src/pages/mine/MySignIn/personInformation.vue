<template>
    <view class="main">
        <u-navbar
          title="人员信息"
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
		<template #right>
		  <view slot="right" @click="addClick()">
			  <u-image
				:src="addItemImage"
				width="20px"
				height="20px"
			  ></u-image>
		  </view>
		</template>
        </u-navbar>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
					<view style="font-size: 13px;margin-left: 15px;width: 85%;">{{item.name}}{{item.mobile}}</view>
					<image style="width: 20px;height: 20px;margin-left: 10px;margin-top: 10px;" src="/src/static/mine/deleteImage.png"></image>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
				<view style="font-size: 13px;margin-left: 15px;width: 85%;margin-top: 10px;margin-bottom: 10px;color: gray;">{{item.homeAddress}}</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsMySignInGetOtherUserList} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);  // 是否没有更多数据了
	const page = ref(1);
	const addItemImage = ref('/static/mine/addItemImage.png');       
	const dataDict = ref({});
		
		
	onLoad((options:any) => {
		dataDict.value = JSON.parse(options.dataDict);
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
				page:page.value,
				pageSize:20,
					   
			};
			const res = await MineNeedToolsMySignInGetOtherUserList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value = res.result.push(item)
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

	
	const addClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/MySignIn/addNewPerson?dataDict=${JSON.stringify(dataDict.value)}`
		})
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
          .flex{
              display: flex;
          }
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
			  background-color: white;
			  margin-top: 10px;
		  }
}
</style>