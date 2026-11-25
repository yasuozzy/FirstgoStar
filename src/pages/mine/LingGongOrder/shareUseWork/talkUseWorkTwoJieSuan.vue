<template>
    <view class="main">
        <u-navbar
          title="结算"
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
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in userList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 15px;margin-left: 20px;font-size: 13px;">{{item.worker_name}}</view>
					<input class="searchlocation" v-model="item.salary" type="text" />
					<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;">元</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="jiesaunClick()">去结算</view>
			</view>
		</view>

</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareUseWorkCompanyUseWorkToJieSuan} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const userList = ref([]);
	const id = ref('');
	const userArr = ref([]);
           
	onLoad((options:any) => {
		
		id.value = options.id;
		userList.value = JSON.parse(options.userList);
		userList.value.forEach(item => {
		  item.salary = 0
		})
		console.log(userList.value);
	});
       
	const jiesaunClick = async() => {
		
		console.log(userList.value);
		for (var index = 0; index < userList.value.length; index++) {
			var element = userList.value[index];
			const dict = {};
			dict.com_worker_id = element.com_worker_id;
			dict.salary = element.salary;
			userArr.value.push(dict);
		}
		console.log(userArr.value);
		
		try {
			
			let param = {
				
				id:id.value,
				userName:storage.getRealName(),
				mobile:storage.getPhone(),
				osName:"ios",
				hostNo:storage.getHostNo(),
				user_list:JSON.stringify(userArr)
				
			};
			MineJiuYeQunShareUseWorkCompanyUseWorkToJieSuan(param).then((res) =>{
							
				console.log(res);
				uni.navigateTo({
					   url:`/pages/Integral/orderPayHtml?url=${res.result.payUrl}`
				})
				
				
			});
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
        .listItem
		{
			display: flex;
			flex-direction: column;
			width: 100%;
		}
		.searchlocation{
			 margin-left: 40px;
			 width: 100px;
			 height: 35px;
			 margin-top: 10px;
			 background-color: aliceblue;
			 
			 font-size: 13px;
		 }
		 .footer-container {
		           position: fixed;
		           bottom: 0;
		           left: 0;
		           right: 0;
		           height: 70px;
		           background-color: white;
		           box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		           z-index: 100;
		           color: white;
		           display: flex;
		           justify-content: center; /* 水平居中 */
		           align-items: center;     /* 垂直居中 */
		           
		         }
		         .order-button {
		                      
		             display: flex;
		             justify-content: center; /* 水平居中 */
		             align-items: center;     /* 垂直居中 */
		             height: 35px;           /* 需要设置高度 */
		             width: 92%;
		             margin-right: 10px;
		             font-size: 13px;
		             color: white;
		             background-color: #2A9595;
		             border-radius: 6px;
		             margin-left: 4%;
		             margin-top: 15px;
		         }

    }
</style>