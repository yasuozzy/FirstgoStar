<template>
    <view class="main">
        <u-navbar
          title="更换房产"
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
		<view style="display: flex;flex-direction: row;background-color: aliceblue;width: 100%;height: 50px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 80%;">社区</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in shequList" :key="index" @click="changeHouse(item)">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: gray;">{{item.address}}</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;background-color: aliceblue;width: 100%;height: 50px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80%;">写字楼</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in xiezilouList" :key="index" @click="changeHouse(item)">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: gray;">{{item.address}}</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;background-color: aliceblue;width: 100%;height: 50px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80%;">市场</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in marketList" :key="index" @click="changeHouse(item)">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: gray;">{{item.address}}</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import {serviceChangeHouseType,serviceGoToChange} from '@/api/service';
	import { getStorage, storage, storageKeys } from '@/utils/storage'; // 引入之前转换的 TS storage 工具
	import eventBus from '@/utils/eventBus';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const downImage = ref('/static/home/downImage.png');
	const shequList = ref<any[]>([]);
	const xiezilouList = ref<any[]>([]);
	const marketList = ref<any[]>([]);
	const dataParam = reactive({
		userid:'',
		mainhouse:2,
		flag:2,
	});
	const changeParam = reactive({
		userid:'',
		hcpid:"",
		loginType:"",
	});
           
	onMounted(() => {
	  init();
	});
       
	   //政务
	   const init = async() => {
		   
			try {
					
				dataParam.userid = getStorage(storageKeys.userId,'');	   
				const res = await serviceChangeHouseType(dataParam);
							   
				console.log(res);
				const responseData = res.result;
				for (var index = 0; index < responseData.length; index++) {
				
					var element = responseData[index];
					
					if (element.loginType === '1') {
						
						shequList.value.push(element);
						
					}else if (element.loginType === '2') {
						
						xiezilouList.value.push(element);
						
					}else if (element.loginType === '3')
					{
						marketList.value.push(element);
					}
					
				}
							   
			  
		   } catch (error) {
			   console.log(error)
		   }
	   };
		//切换房产
	   const changeHouse = async(item:any) => {
		   
		   try {
					
				changeParam.userid = getStorage(storageKeys.userId,'');
				changeParam.hcpid = item.hcpid;
				changeParam.loginType = item.loginType;
				const res = await serviceGoToChange(changeParam);
							   
				console.log(res);
				if (res.success === true) {
				
					uni.showToast({
						title:'切换主房屋成功',
						icon:'none',
					});
					// storage.saveLoginType(item.loginType);
					// storage.saveManid(item.manid);
					storage.saveAddress(item.address);
					storage.saveLoginType(item.loginType);
					storage.saveBldgid(item.bldgid);
					storage.saveBldgname(item.bldgname);
					storage.saveHcpid(item.hcpid);
					storage.saveHseid(item.hseid);
					storage.saveHsename(item.hsename);
					storage.saveHsenum(item.hsenum);
					storage.saveMainhouse(item.mainhouse);
					storage.saveManid(item.manid);
					storage.saveManname(item.manname);
					storage.saveType(item.type);
					
					uni.navigateBack();
				
				
			   }else
			   {
				   uni.showToast({
						title:'切换主房屋失败',
						icon:'none',
				   });
			   }
			   
							   
		   } catch (error) {
			   console.log(error)
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
	 .listItem{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 50px;
		 background-color: white;
	 }
    }
</style>