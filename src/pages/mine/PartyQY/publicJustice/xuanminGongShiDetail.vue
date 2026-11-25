<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民公示主题</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.title}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民公示内容</view>
		</view>
		<textarea class="textView" :value="dataDict.content" disabled="true" ></textarea>
		<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民公示范围</view>
			<view style="margin-top: 15px;font-size: 15px;width: 200px;">{{dataDict.man_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">公示单位</view>
			<view style="margin-top: 15px;font-size: 15px;width: 200px;">{{dataDict.pub_unit}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">公示日期</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">{{dataDict.pub_date}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">公示名单列表</view>
		</view>
		
		<view >
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;">
				<view style="margin-left: 5%;width: 30%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">选民姓名</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 30%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">选民照片</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 30%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">选民信息</view>
			</view>
			<view style="display: flex;flex-direction: column;">
				<view class="ticketItem" v-for="(item,index) in resultList">
					<view style="margin-left: 5%;width: 30%;border: 1px solid gray;height: 80px;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">{{item.user_name}}</view>
					<view style="width: 0.5px;height: 80px;background-color: lightgray;"></view>
					<view style="width: 30%;height: 80px;border: 0.5px solid gray;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">
						<u-image style="margin-top: 10px;margin-left: 10px;"
						  :src="item.photo_path"
						  width="60px"
						  height="60px"
						></u-image>
					</view>
					<view style="width: 0.5px;height: 80px;background-color: lightgray;"></view>
					<view style="width: 30%;height: 80px;border: 0.5px solid gray;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;" @click="checkXuanMin(item)">查看选民信息</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MinePartyPublicJusticeXuanMinGongShiDetail} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
    
    
	// 背景颜色
    const bgColor = ref("#2A9595");
	const idstring = ref('');
	const dataDict = ref({});
	const suggestList = ref([]);
	const resultList = ref([]);
           
	onLoad((options:any) => {
		
		idstring.value = options.id;
		init();
	});
            
    const init = async() => {
				
		try {
			
			let param = {
				
				id:idstring.value
				
			};
			const res = await MinePartyPublicJusticeXuanMinGongShiDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
				
			resultList.value = res.result.resultList;
			
		}catch (error) {
			console.log(error)
		}
	};
	//查看选民信息
	const checkXuanMin = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/checkXuanminInfo?dataDict=${JSON.stringify(item)}`
		})
	};
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
	 .textView{
	 	margin-top: 10px;
	 	margin-left: 4%;
	 	width: 92%;
	 	height: 100px;
	 	border: lightgray 1px solid;
	 	font-size: 13px;
	 }
	 .ticketItem{
	 		 display: flex;
	 		 flex-direction: row;
	 		 width: 100%;
	 		 
	 }
    }
</style>