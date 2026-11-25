<template>
    <view class="main">
        <u-navbar
          title="网格"
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
		<view class="oamanageView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">网格</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in toolsList"
				  :key="index" @click="gotools(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import {MineWanggeEventsGetYnSubmitHouse} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const toolsList = ref([]);
				
           
	onMounted(() => {
		
		if (getStorage(storageKeys.temporayId,'')) {
			
			toolsList.value = [
				{image:'/static/mine/wanggedengji.png',title:'网格登记'},
				{image:'/static/mine/wanggeshijian.png',title:'网格事件'},
				{image:'/static/mine/shijianbanli.png',title:'事件办理'}
				
			];
		}else
		{
			toolsList.value = [
				{image:'/static/mine/wanggedengji.png',title:'网格登记'},
				{image:'/static/mine/wanggeshijian.png',title:'网格事件'}
			];
		}
	});

	const gotools = async(title:any) => {
		
		if (title === '网格登记') {
			
			let param = {
				userId:getStorage(storageKeys.userId,'')
			};
			try {
				
				const res = await MineWanggeEventsGetYnSubmitHouse(param);
				console.log(res);
				const resultData = res.result;
				if(resultData === true){
					
					uni.navigateTo({
						url:'/pages/mine/PartyQY/messageRegistList'
					})
				}else
				{
					uni.navigateTo({
						url:'/pages/mine/PartyQY/AddMessageRegist'
					})
				}
				
			} catch (error) {
				//TODO handle the exception
				console.log(error);
			}
			
			
		}else if (title === '网格事件') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/gridEvent'
			})
			
		}else if (title === '事件办理') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/Eventshandle'
			})
		}
	};
	const goBack = () =>{
		
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
	 .oamanageView{
	 	  display: flex;
	 	  
	 	  flex-direction: column;
	 	  margin-left: 4%;
	 	  width: 92%;
	 	  margin-top: 10px;
	 	  background-color: white;
	 	  border-radius: 8px;
	 	  .itemview{
	 	  	display: flex;
	 	  	flex-direction: row;
	 	  	flex-wrap: wrap; /* 允许换行 */
	 	  	margin-bottom: 10px;
	 	  	.situation_item {
	 	  	  width: 25%;
	 	  	  font-size: 12px;
	 	  	  color: #000;
	 	  	  margin-top: 15px;
	 	  	  box-sizing: border-box;
	 	  	  display: flex;
	 	  	  flex-direction: column;
	 	  	  align-items: center;
	 	  	  height: 65upx;
	 	  			margin-bottom: 30px;
	 	  			.item_text{
	 	  				margin-top: 8px;
	 	  			}
	 	  	}
	 	  }
	 }
    }
</style>