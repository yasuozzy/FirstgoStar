<template>
    <view class="main">
        <u-navbar
          title="我的接单"
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
		<view class="specsView">
			
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">工作中</view>
				<view v-else style="color: black;font-size: 13px;">工作中</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type === '4'" style="color: #2A9595;font-size: 13px;">异常运单</view>
				<view v-else style="color: black;font-size: 13px;">异常运单</view>
				<view class="whiteLine" v-if="type === '4'"></view>
			</view>
			
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;">{{item.name}}</view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;background-color: #2A9595;color: white;border-radius: 5px;width: 15px;align-items: center;justify-content: center;">寄</view>
					<view style="font-size: 13px;margin-left: 5px;margin-top: 10px;">{{item.sendLocation}}</view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;background-color: orangered;color: white;border-radius: 5px;width: 15px;align-items: center;justify-content: center;">收</view>
					<view style="font-size: 12px;margin-left: 5px;margin-top: 10px;">{{item.receiveLocation}}</view>
				</view>
				<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">运单号:{{item.orderNum}}</view>
				<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">物品类型:{{item.type}}</view>
				<view style="font-size: 12px;margin-left: 35px;margin-top: 5px;">发货方式:{{item.status}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="type === '1'" class="bottomview">
					<view class="buttonView">去揽件</view>
				</view>
				<view v-if="type === '2'" class="bottomview">
					<view  class="buttonchaos" @click="unnormalClick">标记异常</view>
					<view  class="buttondown">送检完成</view>
					
				</view>
				<view v-if="type === '3' || type === '4'" class="bottomview">
					<view  class="buttonView" @click="detailClick">查看详情</view>
				</view>
				
			</view>
		</view>
		
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const orderList = ref([
		{name:'花海贸易广场运单',sendLocation:'山东省潍坊市华海大厦',receiveLocation:'山东省昌邑市花海贸易广场北',orderNum:'20250814521470',type:'食品',status:'加急',},
		{name:'花海贸易广场运单',sendLocation:'山东省潍坊市华海大厦',receiveLocation:'山东省昌邑市花海贸易广场北',orderNum:'20250814521470',type:'食品',status:'加急',},
		{name:'花海贸易广场运单',sendLocation:'山东省潍坊市华海大厦',receiveLocation:'山东省昌邑市花海贸易广场北',orderNum:'20250814521470',type:'食品',status:'加急',},
		{name:'花海贸易广场运单',sendLocation:'山东省潍坊市华海大厦',receiveLocation:'山东省昌邑市花海贸易广场北',orderNum:'20250814521470',type:'食品',status:'加急',},
		
	]);
    const goBack= () => {
            
        uni.navigateBack()
    };      
	//切换segment
	const segment1Click = () => {
				
		type.value = "1";
		
	};
	const segment2Click = () => {
		
		type.value = "2";
		
	};
	const segment3Click = () => {
		
		type.value = "3";
		
	};
	const segment4Click = () => {
		
		type.value = "4";
		
	};
	//运单异常
	const unnormalClick = () => {
		uni.navigateTo({
			url:'/pages/mine/mySentOut/unnormalList'
		})
	};
	//详情
	const detailClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/mySentOut/postDetail'
		})
	};
       
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
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
     }.specsView{
	  		 width: 100%;
	  		 height: 40px;
	  		 display: flex;
	  		 flex-direction: row;
	  		 
	  		 background-color: white;
	  		 margin-top: 10px;
	  }
	  .whiteLine{
	  		 margin-left: 20%;
	  		 margin-top: 7px;
	  		 width: 60%;
	  		 height: 2px;
	  		 background-color: #2A9595;
	  }
	  .contentView{
	  		 display: flex;
	  		 flex-direction: column;
	  			 
	  			 
	  }
	  .order_item{
	  		 display: flex;
	  		 flex-direction: column;
	  		 width: 100%;
	  		 height: 200px;
	  			 margin-top: 10px;
	  			 margin-left: 4%;
	  			 width: 92%;
	  			 background-color: white;
	  }
	  .buttonView{
	  		  display: flex;
	  		  justify-content: center;
	  		  align-items: center;
	  		  border-radius: 5px;
	  		  background-color: #2A9595;
	  		  width: 60px;
	  		  height: 20px;
	  		  margin-left: 250px;
	  		  margin-top: 10px;
	  		  color: white;
	  		  font-size: 12px;
	  }
	  .bottomview{
	  		  display: flex;
	  		  flex-direction: row;
	  		  width: 100%;
	  		  height: 40px;
	  }
	  .buttonchaos{
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-radius: 5px;
		  background-color: #2A9595;
		  width: 60px;
		  height: 20px;
		  margin-left: 180px;
		  margin-top: 10px;
		  color: white;
		  font-size: 12px;
	  }
	  .buttondown{
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-radius: 5px;
		  background-color: #2A9595;
		  width: 60px;
		  height: 20px;
		  margin-left: 10px;
		  margin-top: 10px;
		  color: white;
		  font-size: 12px;
	  }
    }
</style>