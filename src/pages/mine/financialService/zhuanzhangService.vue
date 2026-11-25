<template>
    <view class="main">
        <u-navbar
          title="转账服务"
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
			
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in toolsList"
				  :key="index" @click="financialClick(item.title)"
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
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const toolsList = ref([
		
		{image:'/static/mine/transVollet.jpg',title:'转到钱包'},
		
		{image:'/static/service/voteGSImage.png',title:'转账记录'},
		
		
	]);
    const goBack= () => {
            
        uni.navigateBack()
    };        
        
	const financialClick = (type:any) => {
				
				// if(type === '待付款'){
					
				// 	uni.navigateTo({
				// 		url:'/pages/mine/financialService/kuanxiangJiaoNa'
				// 	})
				// }else 
		if(type === '转到钱包'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/backToVollet'
			})
		}else if(type === '转账记录'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/zhuanzhangNotes'
			})
		}
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