<template>
    <view class="main">
        <u-navbar
          title="新增商品规格"
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
		<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">规格名称</view>
		<input class="searchlocation" v-model="mySpecName" placeholder="请输入" type="text" />
		<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;">规格值</view>
		<view style="width: 100%;" v-for="(item,index) in descGroupList" :key="index">
			<input class="searchlocation" v-model="descGroupList[index]" placeholder="请输入" type="text" />
		</view>
		<view style="width: 92%;margin-top: 15px;margin-left: 4%;text-align: right;color: #2A9595;font-size: 14px;" @click="addClick">+继续添加</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentProductDescAddSpec} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const descGroupList = ref(['']);
	const firstDesc = ref();
	const mySpecName = ref('');
	
	
	const addClick = () => {
		const list = descGroupList.value;
		const lastIndex = list.length - 1;
		
		if (list[0].length === 0) {
		  // 处理空数组的情况（比如默认至少有一个输入框，可忽略）
		  uni.showToast({
		    title: '最后一行未输入',
		    icon: 'none'
		  });
		  return;
		}
		
		if (list[lastIndex].length === 0) {
		  uni.showToast({
		    title: '最后一行未输入',
		    icon: 'none'
		  });
		  return;
		}
		descGroupList.value.push('');
	};
	const saveClick = async() => {
		
		if(mySpecName.value.length == 0){
			
			uni.showToast({
			  title: '请输入规格名称',
			  icon: 'none'
			});
			return;
		}
		const list = descGroupList.value;
		const lastIndex = list.length - 1;
		
		if (list[0].length === 0 || list[lastIndex].length === 0) {
		  uni.showToast({
		    title: '请输入规格',
		    icon: 'none'
		  });
		  return;
		}
		console.log(descGroupList.value);
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				userid:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				name:mySpecName.value,
				note:'',
				sort:'',
				
			};
			// 1. 添加 detailCount
			param.detailCount = descGroupList.value.length;
			
			// 2. 动态生成 detail_value1, detail_value2, ...
			descGroupList.value.forEach((item, index) => {
			  param[`detail_value${index + 1}`] = item;
			});
			console.log(param);
			const res = await MineShangquanManageMentProductDescAddSpec(param);
							
			console.log(res);
			uni.showToast({
				title:res.message,
				icon:'none'
			})
			if(res.success == true){
				
				uni.navigateBack();
				
			}
			
				
			
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
			   margin-left: 4%;
			   width: 92%;
			   height: 30px;
			   margin-top: 10px;
			   border: 1px lightgray solid;
			   border-radius: 5px;
			   font-size: 13px;
		   }

}
</style>