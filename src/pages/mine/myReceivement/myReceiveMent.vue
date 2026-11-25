<template>
    <view class="main">
        <u-navbar
          title="我的揽件"
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
				  v-for="(item, index) in oamanageList"
				  :key="index" @click="jumpTo(item.title)"
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
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const oamanageList = ref([
		{image:'/static/home/homestay.png',title:'我的抢单'},
		{image:'/static/home/homestay.png',title:'我的接单'},
		
	]);
    const goBack= () => {
            
        uni.navigateBack()
    };      
	const jumpTo = (type:any) =>{
		if (type === '我的抢单') {
				   
			uni.navigateTo({
				url:'/pages/mine/myReceivement/myRoberry'
			})
			
		}else if (type === '我的接单'){
				   
			uni.navigateTo({
				url:'/pages/mine/myReceivement/myTakeOrder'
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
	 	  margin-left: 2%;
	 	  width: 96%;
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