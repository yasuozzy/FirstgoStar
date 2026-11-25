<template>
    <view class="main">
        <u-navbar
          title="企业内务"
          @rightClick="rightClick"
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
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">企业内务</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in oamanageList"
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
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const oamanageList = ref([
		{image:'/static/mine/tongyongShenQing.png',title:'通用申请'},
		{image:'/static/mine/tongyongShenPi.png',title:'通用审批'},
		
	]);
            
       
	const goBack= () => {
			
		uni.navigateBack()
	};
	const financialClick = (title:any) => {
		
		if (title === '通用申请') {
			
			uni.navigateTo({
				url:'/pages/mine/companyInservice/normalShenQing'
			})
		}else if(title === '通用审批'){
			
			uni.navigateTo({
				url:'/pages/mine/companyInservice/normalShenPi'
			})
		}
	};
        
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: aliceblue;
          min-height: 100vh;
          width: 100%;
          
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