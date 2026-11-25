<template>
    <view class="main">
        <u-navbar
          title="已付款"
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
			<view class="itemlist" v-for="(item,index) in dataList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
					<view style="font-size: 12px;margin-top: 10px;width: 87%;margin-left: 15px;">{{item.title}}</view>
					<view style="font-size: 12px;margin-top: 10px;color: #2A9595;">￥{{item.money}}</view>
				</view>
				<view style="font-size: 12px;margin-top: 10px;width: 100%;height: 20px;margin-left: 15px;">收款方:{{item.address}}</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataList = ref([
		{title:'土地租金',address:'山东省潍坊市昌邑市都昌街道渔埠',money:'5'},
		{title:'土地租金',address:'山东省潍坊市昌邑市都昌街道渔埠',money:'5'},
		{title:'土地租金',address:'山东省潍坊市昌邑市都昌街道渔埠',money:'5'},
	]);
           
          
	const detailClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/financialService/historyDetail'
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
     }
	 .itemlist{
	 		 margin-top: 10px;
	 		 margin-left: 4%;
	 		 width: 92%;
	 		 height: 70px;
	 		 display: flex;
	 		 flex-direction: column;
	 		 border-radius: 5px;
	 		 background-color: white;
	 }
    }
</style>