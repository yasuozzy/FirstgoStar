<template>
    <view class="main">
        <u-navbar
          title="房产详情"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
         <template #left>
         	<view slot="left" >
         		<view class="flex">
         			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
         		</view>
         	</view>
         </template>
        </u-navbar>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">省级站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.province_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">市级站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.city_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">县(市)区站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.district_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">镇街站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.street_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">社区物业</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.region_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">村居物业</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.grid_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">区域网格</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" >{{dataDict.area_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">楼宇(小组)</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.build_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">房屋编号</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.house_num}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">网格员</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.grid_man}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">楼长</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.build_manager}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">居住人数</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.house_user_amount}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">房间用途</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.house_application}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">户型</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.house_type}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">房屋产权人</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.house_property}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.mobile}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">建筑面积</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;">{{dataDict.area}}</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">平方米</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		
</view>
</template>

<script setup lang="ts">
	
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted,onUnmounted } from 'vue';
	import {MineHouseInfoAddHouseHistoryDetail} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const idstring = ref('');
	const dataDict = ref({});
            
	onLoad((options:any) => {
		
		idstring.value = decodeURIComponent(options.id);
	});
	onMounted(() => {
	  init();
	});
      
    const init = async() => {
		try {
			
			let param = {
				
				id:idstring.value,
				
			};
			const res = await MineHouseInfoAddHouseHistoryDetail(param);
							
				console.log(res);
				dataDict.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
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
           .searchlocation{
			margin-left: 15px;
			width: 230px;
			height: 30px;
			margin-top: 10px;
			font-size: 13px;
		}
		.formView{
		     display: flex;
			 flex-direction: row;
			 width: 100%;
			 height: 40px;
			 background-color: white;
			 margin-top: 10px;
			 
		}
		.searchInputView{
		         margin-left: 15px;
		         width: 230px;
		         height: 30px;
		         margin-top: 10px;
		         font-size: 13px;
		}
		.AreaInputView{
			
			margin-left: 15px;
			width: 100px;
			height: 30px;
			margin-top: 10px;
			font-size: 13px;
		}
		.buttonView{
		             
			margin-top: 40px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 14px;
			margin-left: 5%; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 40px;           /* 需要设置高度 */
			width: 90%;             /* 需要设置宽度 */
			margin-bottom: 30px;
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
		
    }
</style>