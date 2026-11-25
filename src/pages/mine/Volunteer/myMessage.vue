<template>
    <view class="main">
        <u-navbar
          title="我的留言"
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
			<view class="itemListV" v-for="(item,index) in dataList" :key="index" >
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.act_name}}</view>
				<view style="display: flex;flex-direction: row;width: 100%;margin-bottom: 10px;">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;width: 70%;">留言:{{item.content}}</view>
					<view class="detailButton" @click="checkDetail(item)">查看留言</view>
				</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsVolunteerMyleaveWordList} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const page = ref(1);
	onMounted(() => {
		
		loadData();
	});
	const loadData = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:10,
			
			};
			const res = await MineNeedToolsVolunteerMyleaveWordList(param);
							
			console.log(res);						
			dataList.value = res.result;
			
				
		}catch (error) {
			console.log(error)
		}
		
	};
	const checkDetail = (item:any) => {
		
		uni.navigateTo({
			url: `/pages/service/volunteerQunYuan/leaveMessage?id=${item.act_id}`
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
          .flex{
              display: flex;
          }
		  .itemListV{
			  
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  border-radius: 4px;
			  background-color: white;
		  }
		  .detailButton{
			  margin-top: 10px;
			  width: 70px;
			  height: 25px;
			  font-size: 13px;
			  color: #2A9595;
			  border: 1px solid #2A9595;
			  border-radius: 4px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
		  }
}
</style>