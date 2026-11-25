<template>
    <view class="main">
        <u-navbar
          title="党务中心"
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
			<view style="display: flex;flex-direction: row;height: 50px;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">党务中心</view>
			</view>
			<view class="itemview">
				<view
				  class="quick_item"
				  v-for="(item, index) in serviceList"
				  :key="index" @click="dangwuClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="40px"
				    height="40px"
				  ></u-image>
				  <view class="service_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
   import { ref, reactive, onMounted } from 'vue';
    // 背景颜色
    const bgColor = ref("#FF0000");
	const serviceList = ref([
		{image:'/static/mine/dangwuCenter.png',title:'加入组织'},
		{image:'/static/mine/dangwuCenter.png',title:'入党申请'},
		{image:'/static/mine/relationOut.png',title:'关系转入'},
		{image:'/static/mine/relationIn.png',title:'关系转出'},
	]);
            
        
	const dangwuClick = (title:any) => {
				
		if (title === '加入组织') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/JoinTheParty'
			})
		}else if (title === '入党申请') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/JoinDangShenQing'
			})
		}else if (title === '关系转入') {
			
			uni.navigateTo({
				url:'/pages/mine/PartyQY/RelationshipGetIn'
			})
		}else if (title === '关系转出') {
			
			uni.navigateTo({
				url:`/pages/mine/PartyQY/RelationShipOut?type=${encodeURIComponent(23)}`
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
	 	  // border-radius: 8px;
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
	 	  	  height: 70px;
	 	  			margin-bottom: 30px;
	 	  			.item_text{
	 	  				margin-top: 8px;
	 						font-size: 14px;
	 	  			}
	 	  	}
	 	  }
	 }
	 .quick_item{
	 		width: 25%;
	 		font-size: 12px;
	 		color: #000;
	 		margin-top: 15px;
	 		box-sizing: border-box;
	 		display: flex;
	 		flex-direction: column;
	 		align-items: center;
	 		height: 60px;
	 		margin-bottom: 10px; 
	 		.service_text{
	 			margin-top: 5px;
	 			font-size: 14px;
	 		}
	 }
    }
</style>