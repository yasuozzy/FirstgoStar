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
		<view style="width: 100%;font-size: 16px;text-align: center;margin-top: 30px;">{{dataDict.rec_name}}</view>
		<view style="width: 100%;font-size: 16px;text-align: center;margin-top: 20px;">{{dataDict.rec_mobile}}</view>
		<view style="width: 100%;font-size: 16px;text-align: center;margin-top: 20px;">￥{{dataDict.amount}}</view>
		<view style="width: 100%;font-size: 15px;text-align: center;margin-top: 20px;color: #2A9595;margin-bottom: 40px;">{{dataDict.statusFlag}}</view>
		<view style="width: 100%;height: 180px;background-color: aliceblue;">
			<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
			<view style="width: 100%;font-size: 15px;margin-top: 10px;margin-left: 15px;color: darkgray;">创建时间：{{dataDict.pay_time}}</view>
			<view style="width: 100%;font-size: 15px;margin-top: 10px;margin-left: 15px;color: darkgray;">转账方式：我的钱包转账</view>
			<view style="width: 100%;font-size: 15px;margin-top: 10px;margin-left: 15px;color: darkgray;">转账说明：{{dataDict.remark}}</view>
			<view style="width: 100%;font-size: 15px;margin-top: 10px;margin-left: 15px;color: darkgray;">收款账户：{{dataDict.rec_name}}{{dataDict.rec_mobile}}</view>
			<view style="width: 100%;font-size: 15px;margin-top: 10px;margin-left: 15px;color: darkgray;">订单号：{{dataDict.id}}</view>
		</view>
		
		<view v-if="status == 0" class="footer-container">
		    <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
		        <view class="cancelView" @click="cancelClick()">取消转账</view>
		        <view class="surelView" @click="sureClick()">确认转账</view>
		    </view>
		                        
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineFinancialTransferServiceDetail,
	MineFinancialTransferServiceListCancelTransfer,
	MineFinancialTransferServiceListSureTransfer} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const idstring = ref('');
	const status = ref(0);
            
	onLoad((options:any) => {
		
		idstring.value = decodeURIComponent(options.id);
		
		init();
	});
            
    const init = async() => {
				
		try {
			
			let param = {
				
				id:idstring.value,
				
			};
			const res = await MineFinancialTransferServiceDetail(param);
							
				console.log(res);
				dataDict.value = res.result;
				status.value = res.result.status;
		
		}catch (error) {
			console.log(error)
		}
	};
	const cancelClick = async() => {
				
		try {
			
			let param = {
				
				id:idstring.value,
				
			};
			const res = await MineFinancialTransferServiceListCancelTransfer(param);
							
			console.log(res);
			init();
			uni.navigateBack();
				
		   
		}catch (error) {
			console.log(error)
		}
	};
	const sureClick = async() => {
				
		try {
			
			let param = {
				
				id:idstring.value,
				
			};
			const res = await MineFinancialTransferServiceListSureTransfer(param);
							
			console.log(res);
			uni.navigateTo({
				   url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
				
			
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
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
	  .cancelView{
	  		  display: flex;
	  		             justify-content: center; /* 水平居中 */
	  		             align-items: center;     /* 垂直居中 */
	  		             height: 30px;           /* 需要设置高度 */
	  		             width: 90px;
	  		             margin-right: 10px;
	  		             font-size: 13px;
	  		             color: white;
	  		             background-color: #2A9595;
	  		             border-radius: 6px;
	  		             margin-left: 75px;
	  		             margin-top: 20px;
	  }
	  .surelView{
	  		 display: flex;
	  		            justify-content: center; /* 水平居中 */
	  		            align-items: center;     /* 垂直居中 */
	  		            height: 30px;           /* 需要设置高度 */
	  		            width: 90px;
	  		            margin-right: 10px;
	  		            font-size: 13px;
	  		            color: white;
	  		            background-color: #2A9595;
	  		            border-radius: 6px;
	  		            margin-left: 45px;
	  		            margin-top: 20px;
	  }
    }
</style>