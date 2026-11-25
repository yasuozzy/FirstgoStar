<template>
    <view class="main">
        <u-navbar
          title="查看优惠券"
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
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">优惠券名称</view>
			<view style="margin-top: 10px;width: 60%;font-size: 14px;text-align: right;">{{couponName}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用范围</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用范围</view>
			<view style="text-align: right;width: 57%;font-size: 14px;margin-top: 10px;">{{couponUseType}}</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">面额</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;text-align: right;width: 53%;">{{couponDenomination}}</view>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(元)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">订单最低金额</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;text-align: right;width: 53%;">{{couponOrderAmountLowest}}</view>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(元)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用开始时间</view>
			<view style="margin-top: 10px;width: 57%;font-size: 14px;text-align: right;">{{couponUseBegintime}}</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用结束时间</view>
			<view style="margin-top: 10px;width: 57%;font-size: 14px;text-align: right;">{{couponUseEndtime}}</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">发放开始时间</view>
			<view style="margin-top: 10px;width: 57%;font-size: 14px;text-align: right;">{{couponOfferBegintime}}</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">发放结束时间</view>
			<view style="margin-top: 10px;width: 57%;font-size: 14px;text-align: right;">{{couponOfferEndtime}}</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">总数量</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;text-align: right;width: 53%;">{{couponTotal}}</view>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(张)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">每天可抢的券量</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;text-align: right;width: 53%;">{{couponOfferDaily}}</view>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(元)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">优惠券使用说明</view>
		</view>
		<view class="TextView">{{coupouDesc}}</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentQueryShopCouponListSaveCoupon,
	MineShangquanManageMentQueryShopCouponListUpCoupon} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const couponName = ref();
	const couponUseType = ref('请选择');
	const couponList = ref(['店铺通用', '指定商品']);
	const couponUseBegintime = ref("请选择");
	const couponUseEndtime = ref("请选择");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const fafangStartshow = ref(false);
	const fafangEndshow = ref(false);
	const couponOfferBegintime = ref("请选择");
	const couponOfferEndtime = ref("请选择");
	const couponDenomination = ref();
	const couponOrderAmountLowest = ref();
	const couponTotal = ref();
	const couponOfferDaily = ref();
	const coupouDesc = ref();
	const couponProviderType = ref(1);
	const orderNum = ref(1);
	const usefanewei = ref();
	const listItem = ref({});//编辑信息
	const idstring = ref();
	
	onLoad((options:any) => {
		
			
		listItem.value = options.listItem;
		idstring.value = listItem.value.id;
		couponName.value = listItem.value.couponName;
		usefanewei.value = listItem.value.couponUseType;
		if(usefanewei.value === 2){
			
			couponUseType.value = '店铺通用';
			
		}else if(usefanewei.value === 5){
			
			couponUseType.value = '指定商品';
		}
		couponDenomination.value = listItem.value.couponDenomination;
		couponOrderAmountLowest.value = listItem.value.couponOrderAmountLowest;
		couponUseBegintime.value = listItem.value.couponUseBegintime;
		couponUseEndtime.value = listItem.value.couponUseEndtime;
		couponOfferBegintime.value = listItem.value.couponOfferBegintime;
		couponOfferEndtime.value = listItem.value.couponOfferEndtime;
		couponTotal.value = listItem.value.couponTotal;
		couponOfferDaily.value = listItem.value.couponOfferDaily;
		coupouDesc.value = listItem.value.coupouDesc;
		orderNum.value = listItem.value.orderNum;
		couponProviderType.value = listItem.value.couponProviderType;
		
		
	});
	
	
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
		  .TextView
		  {
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  height: 80px;
			  border: lightgray 1px solid;
			  font-size: 13px;
		  }
		  .startView{
		  		
		  		margin-top: 10px;
		  		width: 57%;
		  		font-size: 14px;
				text-align: right;
		  }
		  .endView{
		  		 
		  		margin-top: 10px;
		  		width: 57%;
		  		font-size: 14px;
		  		text-align: right;
		  }
}
</style>