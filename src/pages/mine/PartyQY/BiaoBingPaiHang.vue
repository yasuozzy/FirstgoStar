<template>
    <view class="main">
        <u-navbar
          title="标兵排行"
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
		<view class="greenHeaderView">
			<view style="margin-left: 3%; width: 44%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" >
				<view  style="color: white;font-size: 15px;background-color: red;height: 40px;">党员标兵排行榜</view>
				<view class="headerV">
					<view style="margin-left: 5%;width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">名次</view>
					<view style="width: 1px;height: 40px;background-color: lightgray"></view>
					<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">姓名</view>
					<view style="width: 1px;height: 40px;background-color: lightgray"></view>
					<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">完成次数</view>
				</view>
				<view class="contentView">
					<view class="content_item" v-for="(item,index) in personnalList">
						<view style="margin-left: 5%;width: 29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;align-items: center;">
							<view v-if="index ===0 ||index === 1 || index === 2" style="height: 20px;width: 20px;background-color: red;border-radius: 10px;align-items: center;display: flex; justify-content: center;color: white;">{{index+1}}</view>
							<view v-else style="height: 20px;width: 20px;align-items: center;display: flex; justify-content: center;">{{index+1}}</view>
						</view>
						<view class="nameView">{{item.name}}</view>
						<view class="numView">{{item.num}}</view>
					</view>
				</view>
			</view>
			<view style="margin-left: 6%; width: 44%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;">
				<view   style="color: white;font-size: 15px;background-color: red;height: 40px;">网络标兵排行榜</view>
				<view class="headerV">
					<view style="margin-left: 5%;width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">名次</view>
					<view style="width: 1px;height: 40px;background-color: lightgray"></view>
					<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">姓名</view>
					<view style="width: 1px;height: 40px;background-color: lightgray"></view>
					<view style="width: 30%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">完成次数</view>
				</view>
				
				<view  class="contentView">
					<view class="content_item" v-for="(item,index) in orgnizationList">
						<view style="margin-left: 5%;width: 29.9%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;align-items: center;">
							<view v-if="index ===0 ||index === 1 || index === 2" style="height: 20px;width: 20px;background-color: red;border-radius: 10px;align-items: center;display: flex; justify-content: center;color: white;">{{index+1}}</view>
							<view v-else style="height: 20px;width: 20px;align-items: center;display: flex; justify-content: center;">{{index+1}}</view>
						</view>
						<view class="nameView">{{item.name}}</view>
						<view class="numView">{{item.num}}</view>
					</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyPublicBiaoBingPaiHangList} from '@/api/mine';
  
	// 背景颜色
	const bgColor = ref("#FF0000");
	const type = ref("1");
	const personnalList = ref([]);
	const orgnizationList = ref([]);
				
            

	onMounted(() => {
	  loadData();
	});
        
    const loadData = async() => {
				
		try {
			let param = {};
			const res = await MinePartyPublicBiaoBingPaiHangList(param);
				
			console.log(res);
			
			personnalList.value = res.result.partyMember;
			orgnizationList.value = res.result.gridMember;
				
			
		}catch (error) {
			console.log(error)
		}finally {
			wx.stopPullDownRefresh()
		}
	};
    const goBack = () => {
	   
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 50px;
	 	
	 }
	
	 .headerV{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 height: 40px;
	 		 margin-top: 20px;
			 background-color: red;
	 }
	 .contentView
	 {
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
	 		 
	 		 .content_item{
	 			 display: flex;
	 			 flex-direction: row;
	 			 width: 100%;
	 			 height: 40px;
	 		 }
	 }
	 .nameView{
		 width: 29.9%;
		 height: 40px;
		 border: 0.5px solid #ccc;
		 font-size: 13px;
		 color: black;
		 align-items: center;
		 text-align: center;
		 display: flex; 
		 justify-content: center;
		 background-color: white;
		 white-space: nowrap; 
		 overflow: hidden; 
		 text-overflow: ellipsis;
	 }
	 .numView{
	 		 width: 29.9%;
	 		 height: 40px;
	 		 border: 0.5px solid #ccc;
	 		 font-size: 13px;
	 		 color: red;
	 		 align-items: center;
	 		 text-align: center;
	 		 display: flex; 
	 		 justify-content: center;
	 		 background-color: white;
	 		 white-space: nowrap; 
	 		 overflow: hidden; 
	 		 text-overflow: ellipsis;
	 }
    }
</style>