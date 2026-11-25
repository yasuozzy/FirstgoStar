<template>
    <view class="main">
        <u-navbar
          title="爱心银行"
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
		<view style="display: flex;flex-direction: row;width: 100%;background-color: #2A9595;height: 100px;">
			<view style="margin-left: 20px;border-radius: 17.5px;width: 35px;height: 35px;background-color: lightgray;margin-top: 20px;">
				<image style="width: 50px;height: 50px;border-radius: 25px;" :src="avatar"></image>
			</view>
			
			<view class="use_info_text">
			  <view class="use_name">{{userName}}</view>
			  <view class="use_company">{{address}}</view>
			</view>
			<view style="font-size: 14px;color: white;margin-top: 20px;" @click="mingxiClick()">积分明细</view>
		</view>
		<view style="background-color: white;display: flex;flex-direction: row;width: 100%;">
			<u-image style="margin-top: 20px;margin-left: 15px;"
			  :src="myjifenIcon"
			  width="30px"
			  height="30px"
			></u-image>
			<view style="margin-top: 20px;margin-left: 10px;font-size: 13px;">我的积分</view>
			<view style="margin-top: 23px;margin-left: 40px;font-size: 13px;width: 40%;">{{jifen}}</view>
			<view style="display: flex;flex-direction: column;margin-left: 20px;margin-top: 20px;">
				<view style="font-size: 13px;" @click="exchange(1)">去兑换</view>
				<view style="font-size: 13px;margin-top: 10px;" @click="juanzengClick()">去捐赠</view>
			</view>
		</view>
		<view style="width: 100%;margin-top: 20px;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 15px;color: white;background-color: darkred;">公益捐赠</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onLoad,onPullDownRefresh } from '@dcloudio/uni-app';
	import {MinePartyPublicLoveBankMyJiFen,mineIntegralJuanZeng} from '@/api/mine';
	
   
	// 背景颜色
	const bgColor = ref("#FF0000");
	const avatar = ref('');
	const userName = ref('');
	const address = ref('');
	const myjifenIcon = ref('/static/mine/myjifenIcon.png');
	const jifen = ref(0);
	const juanzengList = ref([]);
          
	onLoad(() => {
		avatar.value = storage.getAvatar();
		userName.value = storage.getRealName();
		address.value = storage.getPhone();
	});
	onMounted(() => {
	  init();
	  getJuanZengList();
	});
     
    const init = async() => {
				
		try {
			
			let param = {
				
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
			};
			const res = await MinePartyPublicLoveBankMyJiFen(param);
							
				console.log(res);
				jifen.value = res.result.valScore;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//捐赠列表
	const getJuanZengList = async() => {
				
		try {
			
			let data1 = {
			  
			};
			const res = await mineIntegralJuanZeng(data1);
				
			console.log(res);
			this.juanzengList = res.result;
			
			
		} catch (error) {
			console.log(error)
		}
		
	};
	//积分明细
	const mingxiClick = () => {
		uni.navigateTo({
		  url: "/pages/mine/myIntegral/InInvoiceListPage",
		});
	};
	const exchange = (type:any) => {
	  uni.navigateTo({
		url:`/pages/mine/myIntegral/IntegralCity?type=${encodeURIComponent(type)}`   
	  });
	};
	//去捐赠
	const juanzengClick = () => {
		uni.navigateTo({
			url:'/pages/mine/PartyQY/juanZengTuiJian'
		})
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
	 .use_info_text {
	   margin-left: 30px;
	   margin-bottom: 30px;
	   width: 55%;
	   .use_name {
	     color: white;
	     font-size: 16px;
		 margin-top: 20px;
	   }
	   .use_company {
	     color: white;
	     font-size: 12px;
	 	margin-top: 5px;
	   }
	 }
    }
</style>