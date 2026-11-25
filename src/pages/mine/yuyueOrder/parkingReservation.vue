<template>
    <view class="main">
        <u-navbar
          title="预约停车"
          
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
		<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 5px;"></view>
		<view class="listView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="font-size: 18px;margin-top: 10px;margin-left: 15px;width: 50%;">停车位置:{{item.location}}</view>
					<view style="font-size: 18px;margin-top: 10px;width: 40%;text-align: right;color: #2A9595;">{{item.status}}</view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 100px;">预约人姓名:</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;color: gray;">{{item.name}}</view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 100px;">预约人电话:</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;color: gray;">{{item.phone}}</view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 100px;">车牌号:</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;color: gray;">{{item.card}}</view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 100px;">到达时间:</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;color: gray;">{{item.arrTime}}</view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 100px;">离开时间:</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;color: gray;">{{item.leaTime}}</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const orderList = ref([
		{location:'九宫山大饭店',status:'预约成功',name:'张三',phone:'15689288001',card:'鲁G88888',arrTime:'上午8：00到11：30',leaTime:'下午13：00到16：00'},
		{location:'九宫山大饭店',status:'等待确认',name:'张三',phone:'15689288001',card:'鲁G88888',arrTime:'上午8：00到11：30',leaTime:'下午13：00到16：00'},
		{location:'九宫山大饭店',status:'已取消',name:'张三',phone:'15689288001',card:'鲁G88888',arrTime:'上午8：00到11：30',leaTime:'下午13：00到16：00'},
	]);
            
        
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .listView{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
			 .order_item{
				 display: flex;
				 flex-direction: column;
				 width: 100%;
				 height: 200px;
			 }
	}
}
</style>