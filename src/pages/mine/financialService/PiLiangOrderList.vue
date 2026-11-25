<template>
    <view class="main">
        <u-navbar
          title="工单列表"
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
			<view class="listItem" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="background-color: white;margin-top: 10px;margin-left: 4%;width: 92%;border-radius: 5px;">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-left: 10px;display: flex;flex-direction: column;width: 70%;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.company}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.working_time}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;margin-bottom: 10px;">{{item.user_mobile}}{{item.user_name}}</view>
						</view>
						<view style="margin-top: 40px;margin-left: 10px;font-size: 13px;width: 20%;text-align: right;">￥{{item.amount}}</view>
					</view>
					
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineFinancialServicePartTimeOrderPiLiangListByUser} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const orderList = ref([]);
	const main_id = ref('');
	const user_id = ref('');
           
	onLoad((options:any) => {
		
		main_id.value = decodeURIComponent(options.main_id);
		user_id.value = decodeURIComponent(options.user_id);
	});
	onMounted(() => {
	  init();
	});
       
    const init = async() => {
				
		try {
			let param = {
				user_id:user_id.value,
				main_id:main_id.value,
			};
			const res = await MineFinancialServicePartTimeOrderPiLiangListByUser(param);
				
			console.log(res);
			
			orderList.value = res.result;
				
			
		} catch (error) {
			console.log(error)
		} 
	};
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/financialService/PiLiangOrderDetail?order_id=${encodeURIComponent(item.order_id)}&userType=${encodeURIComponent(0)}`
		})
	};
	const goBack = () => {
			
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
           .listItem
           {
           	display: flex;
           	width: 100%;
           	// background-color: aliceblue;
           }
    }
</style>