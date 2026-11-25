<template>
    <view class="main">
        <u-navbar
          title="新增优惠券"
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
        <template #right>
              <view slot="right" @click="saveClick()">
                  <view style="font-size: 13px;color: white;">保存</view>
              </view>
            </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">优惠券名称</view>
			<input v-model="couponName" style="text-align: right;width: 60%;font-size: 14px;margin-top: 10px;" placeholder="限15字以内"/>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用范围</view>
			<view style="text-align: right;width: 57%;font-size: 14px;margin-top: 10px;" @click="chooseCouponType">{{couponUseType}}</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">面额</view>
			<input v-model="couponDenomination" style="text-align: right;width: 53%;font-size: 14px;margin-top: 12px;" placeholder="请输入优惠券面额"/>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(元)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">订单最低金额</view>
			<input v-model="couponOrderAmountLowest" style="text-align: right;width: 53%;font-size: 14px;margin-top: 12px;" placeholder="订单消费达到金额"/>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(元)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用开始时间</view>
			<view class="startView" @click="show = true">{{couponUseBegintime}}
				<u-datetime-picker
				title="请选择开始时间"
			                :show="show"
			                v-model="value1"
			                mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">使用结束时间</view>
			<view class="endView" @click="endshow = true">{{couponUseEndtime}}
				<u-datetime-picker
				title="请选择结束时间"
				            :show="endshow"
				            v-model="value1"
				            mode="date"
							@confirm="endConfirm"
							@cancel="endshow = false"
				    ></u-datetime-picker>
			</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">发放开始时间</view>
			<view class="startView" @click="fafangStartshow = true">{{couponOfferBegintime}}
				<u-datetime-picker
				title="请选择开始时间"
			                :show="fafangStartshow"
			                v-model="value1"
			                mode="date"
							@confirm="fafanghandleConfirm"
							@cancel="fafangStartshow = false"
			        ></u-datetime-picker>
			</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">发放结束时间</view>
			<view class="endView" @click="fafangEndshow = true">{{couponOfferEndtime}}
				<u-datetime-picker
				title="请选择结束时间"
				            :show="fafangEndshow"
				            v-model="value1"
				            mode="date"
							@confirm="fafangendConfirm"
							@cancel="fafangEndshow = false"
				    ></u-datetime-picker>
			</view>
			<image style="width: 8px;height: 12px;margin-left: 5px;margin-top: 15px;" src="/src/static/service/my_arrow.png"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">总数量</view>
			<input v-model="couponTotal" style="text-align: right;width: 53%;font-size: 14px;margin-top: 12px;" placeholder="请输入总数量"/>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(张)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">每天可抢的券量</view>
			<input v-model="couponOfferDaily" style="text-align: right;width: 53%;font-size: 14px;margin-top: 12px;" placeholder="请输入每天可抢的券量"/>
			<view style="margin-top: 10px;font-size: 14px;color: lightgray;width: 25px;">(元)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 12px;">
			<view style="margin-top: 14px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 10px;width: 30%;font-size: 14px;">优惠券使用说明</view>
		</view>
		<textarea v-model="coupouDesc" class="TextView" placeholder="请输入优惠券使用说明"></textarea>
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
		
		if(options.listItem){
			
			listItem.value = options.listItem;
			idstring.value = listItem.value.id;
			couponName.value = listItem.value.couponName;
			usefanewei.value = listItem.value.couponUseType;
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
		}
		
	});
	
	const chooseCouponType = () => {
		
		uni.showActionSheet({
			itemList: couponList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				couponUseType.value = couponList.value[res.tapIndex]
				if(res.tapIndex === 0){
					
					usefanewei.value = 2;
					
				}else if(res.tapIndex === 1){
					
					usefanewei.value = 5;
				}
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		const pad = (n) => String(n).padStart(2, '0');
		couponUseBegintime.value = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
		show.value = false;
	};
	//离店日期
	const endConfirm = (e:any) => {
		const date = new Date(e.value);
		const pad = (n) => String(n).padStart(2, '0');
		couponUseEndtime.value = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
		endshow.value = false;
	};
	
	//开始时间获取
	const fafanghandleConfirm = (e:any) => {
		const date = new Date(e.value);
		const pad = (n) => String(n).padStart(2, '0');
		couponOfferBegintime.value = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
		fafangStartshow.value = false;
	};
	//离店日期
	const fafangendConfirm = (e:any) => {
		const date = new Date(e.value);
		const pad = (n) => String(n).padStart(2, '0');
		couponOfferEndtime.value = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
		fafangEndshow.value = false;
	};
	const saveClick = async() => {
		
		if(couponName.value.length === 0){
			uni.showToast({
				title:'优惠券名称不能为空',
				icon:'none'
			})
			return
		}
		if(couponUseType.value == '请选择'){
			uni.showToast({
				title:'使用范围不能为空',
				icon:'none'
			})
			return
		}
		if(couponDenomination.value.length === 0){
			uni.showToast({
				title:'面额不能为空',
				icon:'none'
			})
			return
		}
		if(couponOrderAmountLowest.value.length === 0){
			uni.showToast({
				title:'订单最低金额不能为空',
				icon:'none'
			})
			return
		}
		if(couponUseBegintime.value == '请选择'){
			uni.showToast({
				title:'使用开始时间不能为空',
				icon:'none'
			})
			return
		}
		if(couponUseEndtime.value == '请选择'){
			uni.showToast({
				title:'使用结束时间不能为空',
				icon:'none'
			})
			return
		}
		if(couponOfferBegintime.value == '请选择'){
			uni.showToast({
				title:'发放开始时间不能为空',
				icon:'none'
			})
			return
		}
		if(couponOfferEndtime.value == '请选择'){
			uni.showToast({
				title:'发放结束时间不能为空',
				icon:'none'
			})
			return
		}
		if(couponTotal.value.length === 0){
			uni.showToast({
				title:'总数量不能为空',
				icon:'none'
			})
			return
		}
		if(couponOfferDaily.value.length === 0){
			uni.showToast({
				title:'每天可抢的券量不能为空',
				icon:'none'
			})
			return
		}
		if(couponOfferDaily.value.length > couponTotal.value.length){
			uni.showToast({
				title:'每天可抢的券量不能高于总数量',
				icon:'none'
			})
			return
		}
		if(coupouDesc.value.length === 0){
			uni.showToast({
				title:'优惠券使用说明不能为空',
				icon:'none'
			})
			return
		}
		
		if(listItem.value.id){
			
			try {
				
				let param = {
					
					couponProviderType:couponProviderType.value,
					orderNum:orderNum.value,
					userId:storage.getUserId(),
					couponName:couponName.value,
					couponUseType:usefanewei.value,
					couponDenomination:couponDenomination.value,
					couponOrderAmountLowest:couponOrderAmountLowest.value,
					couponUseBegintime:couponUseBegintime.value,
					couponUseEndtime:couponUseEndtime.value,
					couponOfferBegintime:couponOfferBegintime.value,
					couponOfferEndtime:couponOfferEndtime.value,
					couponTotal:couponTotal.value,
					couponOfferDaily:couponOfferDaily.value,
					coupouDesc:coupouDesc.value,
					id:listItem.value.id
				};
				const res = await MineShangquanManageMentQueryShopCouponListUpCoupon(param);
								
				console.log(res);
				if(res.success === true){
					
					uni.navigateBack()
				}
				uni.showToast({
					title:res.message,
					icon:'none'
				})
				
					
				
			}catch (error) {
				console.log(error)
			}
			
		}else
		{
		
			try {
				
				let param = {
					
					couponProviderType:couponProviderType.value,
					orderNum:orderNum.value,
					userId:storage.getUserId(),
					couponName:couponName.value,
					couponUseType:usefanewei.value,
					couponDenomination:couponDenomination.value,
					couponOrderAmountLowest:couponOrderAmountLowest.value,
					couponUseBegintime:couponUseBegintime.value,
					couponUseEndtime:couponUseEndtime.value,
					couponOfferBegintime:couponOfferBegintime.value,
					couponOfferEndtime:couponOfferEndtime.value,
					couponTotal:couponTotal.value,
					couponOfferDaily:couponOfferDaily.value,
					coupouDesc:coupouDesc.value
					
				};
				const res = await MineShangquanManageMentQueryShopCouponListSaveCoupon(param);
								
				console.log(res);
				if(res.success === true){
					
					uni.navigateBack()
				}
				uni.showToast({
					title:res.message,
					icon:'none'
				})
				
					
				
			}catch (error) {
				console.log(error)
			}
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