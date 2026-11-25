<template>
    <view class="main">
        <u-navbar
          title="我的订单"
          
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
		<view class="listView">
			<view class="list-item" v-for="(item,index) in orderList" :key="index" @click="detailClick">
				<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 50%;">{{item.type}}</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 35%;color: #2A9595;text-align: right;">{{item.status}}></view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-left: 15px;margin-top: 10px;"
					  :src="item.timeicon"
					  width="15px"
					  height="15px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.time}}</view>
					
				</view>
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-left: 15px;margin-top: 10px;"
					  :src="item.personicon"
					  width="15px"
					  height="15px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 5px;font-size: 12px;">{{item.personNum}}人</view>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="display: flex;flex-direction: column;width: 20px;height: 100px;">
						<view style="margin-top: 10px;margin-left: 20px;width: 5px;height: 5px;border-radius: 2px;background-color: royalblue;"></view>
						<view style="width: 1px;margin-left: 22px;height: 80px;background-color: dimgray;"></view>
						<view style="margin-left: 20px;width: 5px;height: 5px;border-radius: 2px;background-color: orangered;"></view>
					</view>
					<view style="display: flex;flex-direction: column;width: 300px;height: 100px;margin-left: 10px;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.startLocation}}</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;color: #2A9595;">{{item.startDetail}}</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.endLocation}}</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;color: #2A9595;">{{item.endDetail}}</view>
					</view>
				</view>
				<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
		
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const orderList = ref([
		{type:'拼车',status:'待接单',timeicon:'/static/home/homestay.png',time:'3月20日 12:00-14:00',personicon:'/static/home/homestay.png',personNum:'2',startLocation:'昌邑 花海贸易广场',startDetail:'北门路南站牌处',endLocation:'潍坊 华海大厦',endDetail:'惠贤路依维柯南门',},
		{type:'拼车',status:'待接单',timeicon:'/static/home/homestay.png',time:'3月20日 12:00-14:00',personicon:'/static/home/homestay.png',personNum:'2',startLocation:'昌邑 花海贸易广场',startDetail:'北门路南站牌处',endLocation:'潍坊 华海大厦',endDetail:'惠贤路依维柯南门',},
		{type:'拼车',status:'待接单',timeicon:'/static/home/homestay.png',time:'3月20日 12:00-14:00',personicon:'/static/home/homestay.png',personNum:'2',startLocation:'昌邑 花海贸易广场',startDetail:'北门路南站牌处',endLocation:'潍坊 华海大厦',endDetail:'惠贤路依维柯南门',},
	]);
	const icon = ref('/static/home/homestay.png');
            
    const goBack= () => {
            
		uni.navigateBack()
	};   
	const detailClick = () => {
		uni.navigateTo({
			url:'/pages/mine/myOutWay/wayoutDetail'
		})
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
	 }
	 .list-item{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 220px;
	 }
    }
</style>