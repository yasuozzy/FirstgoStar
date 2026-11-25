<template>
    <view class="main">
        <u-navbar
          title="转到钱包"
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
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;margin-top: 10px;background-color: white;">
			<view style="margin-left: 15px;margin-top: 12px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">收款人手机号</view>
			<input class="searchlocation" v-model="mobile" placeholder="请输入收款人手机号" type="text" />
		</view>
		<view style="font-size: 12px;margin-left: 15px;margin-top: 5px;">{{content}}</view>
		<view class="order-button" @click="nextClick">下一步</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import {MineFinancialTransferServiceGetpayUserInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const mobile = ref('');
	const content = ref('资金实时到账，请确认再转账');
           
       
            
	const goBack= () => {
		   
		uni.navigateBack()
	};
	const nextClick = async() => {
				
		if (this.mobile.length == 0) {
			
			uni.showToast({
				title:'请输入正确手机号',
				icon:'none'
			});
			return;
		}
		try {
			
			let param = {
				
				mobile:mobile.value,
				
			};
			const res = await MineFinancialTransferServiceGetpayUserInfo(param);
							
			console.log(res);
			uni.navigateTo({
				url:`/pages/mine/financialService/volletZhaungZhang?resultDict=${JSON.stringify(res.result) }`
			})
			
		}catch (error) {
			console.log(error)
		}
		
	};
        
    
</script>

<style lang="scss" scoped>
    .main {
         min-height: 100vh;
        width: 100%;
         background-color: aliceblue;
            .searchlocation{
                      margin-left: 15px;
                      width: 200px;
                      height: 20px;
                      font-size: 14px;
            		  margin-top: 11px;
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
			            margin-top: 50px;
			        }
    }
</style>