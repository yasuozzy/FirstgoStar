<template>
    <view class="main">
        <u-navbar
          title="添加商品分类"
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
              <view slot="right" @click="saveClick()">
                 <view style="font-size: 14px;color: white;">保存</view>
              </view>
            </template>
        </u-navbar>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">分类名称</view>
			<input class="searchlocation" v-model="name" placeholder="请输入分类名称" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-left: 4%;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">序列号</view>
			<input class="searchlocation" v-model="sortOrder" placeholder="请输入序列号" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-left: 4%;margin-top: 15px;"></view>
		<view style="margin-top: 3px;margin-left: 15px;font-size: 11px;color: gray;">注：序列号数值越大，分类排序越靠前</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentInsertSelfShopCat} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const sortOrder = ref('');
	const name = ref('');
	

	const saveClick = async() => {
		
		if(name.value.length === 0){
			uni.showToast({
				title:'请填写分类名称',
				icon:'none'
			})
			return;
		}
		if(sortOrder.value.length === 0){
			uni.showToast({
				title:'请填写序列号',
				icon:'none'
			})
			return;
		}
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				name:name.value,
				sortOrder:sortOrder.value
				
			};
			const res = await MineShangquanManageMentInsertSelfShopCat(param);
							
			console.log(res);
			uni.showToast({
				title:'分类添加成功',
				icon:'none'
			})
			uni.navigateBack();
				
			
		}catch (error) {
			console.log(error)
		}
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
		  .searchlocation{
			   margin-left: 10px;
			   width: 250px;
			   height: 30px;
			   margin-top: 10px;
			   
			   font-size: 14px;
		   }
}
</style>