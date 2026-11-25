<template>
    <view class="main">
        <u-navbar
          title="转账"
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
		<view style="width: 100%;font-size: 18px;text-align: center;margin-top: 50px;">{{resultDict.realName}}</view>
		<view style="width: 100%;font-size: 18px;text-align: center;margin-top: 20px;">{{resultDict.userMobile}}</view>
		<view style="width: 50%;font-size: 13px;margin-left: 15px ;margin-top: 50px;">金额</view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">￥</view>
			<input class="searchlocation" v-model="amount"  type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: black;">{{explain}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: #2A9595;" @click="addExplain()">添加转账说明</view>
		</view>
		
		<view class="order-button" @click="nextClick()">转账</view>
		<u-modal :show="show" @confirm="confirm" :title="title" cancel-text="取消" show-cancel-button="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="explainlocation" v-model="explain" placeholder="首付款双方可见，最多60个字"  type="text" />
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineFinancialTransferServiceTransferMoney} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const name = ref('刘震西');
	const phoneNumber = ref('');
	const amount = ref('');
	const resultDict = ref({});
	const show = ref(false);
	const title = ref('转账说明');
	const explain = ref('');
	const rec_user_id = ref('');
	const rec_name = ref('');
	const rec_hostno = ref('');
          
		onLoad((options:any) => {
			
			resultDict.value = JSON.parse(options.resultDict);
			console.log(resultDict.value);
			phoneNumber.value = resultDict.value.userMobile;
			rec_user_id.value = resultDict.value.id;
			rec_name.value = resultDict.value.realName;
			rec_hostno.value = resultDict.value.clientCode;
		});
        
	const addExplain = () => {
		show.value = true;
	};
	const confirm = () => {
		show.value = false;
	};
	const cancelClick = () => {
		show.value = false;
	};
	const nextClick = async() => {
		
		if (amount.value.length == 0) {
			
			uni.showToast({
				title:'请填写转账金额',
				icon:'none'
			});
			return;
		}
		if (explain.value.length == 0) {
			
			uni.showToast({
				title:'请填写转账说明',
				icon:'none'
			});
			return;
		}
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				userName:storage.getRealName(),
				mobile:storage.getPhone(),
				osName:"ios",
				hostNo:storage.getHostNo(),
				rec_mobile:phoneNumber.value,
				rec_user_id:rec_user_id.value,
				rec_name:rec_name.value,
				rec_hostno:rec_hostno.value,
				amount:amount.value,
				explain:explain.value
				
			};
			const res = await MineFinancialTransferServiceTransferMoney(param);
							
			console.log(res);
			uni.navigateTo({
				   url:'/pages/Integral/orderPayHtml?url=' + res.result.payUrl
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
	 .searchlocation{
	           margin-left: 15px;
	           width: 200px;
	           height: 20px;
	           font-size: 13px;
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
	 .explainlocation{
		margin-left: 15px;
		width: 250px;
		height: 30px;
		font-size: 13px;
		margin-top: 11px;
		background-color: aliceblue;
		border-radius: 5px;
	 }
    }
</style>