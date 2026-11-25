<template>
    <view class="main">
        <u-navbar
          title="订单信息"
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
              <view slot="right" @click="navigationClick(dataDict)">
                 <view style="font-size: 14px;color: white;">导航</view>
              </view>
            </template>
        </u-navbar>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 15px;">
			<view style="margin-left: 15px;font-size: 14px;">{{dataDict.taxitypeName}}</view>
			<view style="font-size: 14px;color: #2A9595;width: 70%;">({{dataDict.ridingtypeName}})</view>
			<view style="font-size: 14px;color: #2A9595;text-align: right;">{{dataDict.statusName}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 15px;">
			<image style="margin-top: 15px;margin-left: 15px;width: 30px;height: 30px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="dataDict.clientImage?dataDict.clientImage:my_default"></image>
			<view style="display: flex;flex-direction: column;width: 75%;margin-top: 15px;">
				<view style="margin-left: 15px;font-size: 14px;">{{dataDict.mobile.slice(-4)}}</view>
				<view style="margin-left: 15px;font-size: 12px;margin-top: 10px;color: gray;">尾号</view>
			</view>
			<u-image style="margin-top: 15px;"
				:src="phone"
				width="25px"
				height="25px"
				@click="callClick(dataDict.mobile)"
			></u-image>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<image style="margin-top: 15px;margin-left: 15px;width: 20px;height: 20px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="sfch_shijian"></image>
			<view style="font-size: 13px;color: gray;margin-top: 15px;margin-left: 10px;">{{dataDict.appointmentStart}}-{{dataDict.appointmentEnd}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<image style="margin-top: 15px;margin-left: 15px;width: 20px;height: 20px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="changeIconImg"></image>
			<view style="font-size: 13px;color: gray;margin-top: 15px;margin-left: 10px;">{{dataDict.passengers}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 15px;width: 20px;height: 50px;display: flex;flex-direction: column;">
				<view style="width: 10px;height: 10px;background-color: blue;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
				<view style="margin-left: 8.5px;width: 1px;height: 50px;background-color: gray;"></view>
				<view style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 73%;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{dataDict.departure}}</view>
				<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{dataDict.departureRemark}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{dataDict.destination}}</view>
				<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{dataDict.destinationRemark}}</view>
			</view>
		</view>
		<view v-if="dataDict.status == 0">
			<view class="buttonView" @click="rabClick(dataDict)">抢单</view>
		</view>
		<view v-if="dataDict.status == 1 && dataDict.taxiUserId !== userId">
			<view class="buttonView" @click="runningShunFengSureClick(dataDict)">确认完成</view>
		</view>
		<view v-if="dataDict.status == 1 && dataDict.taxiUserId == userId">
			<view class="buttonView" @click="runningShunFengSureClick(dataDict)">确认完成</view>
			<view class="cancelView" @click="runningShunFengCancelClick(dataDict)">取消订单</view>
		</view>
		<u-modal :show="runningSFCarshow" @confirm="runningSFCarhandleReason" title="提示" confirm-text="确认" showCancelButton="true" @cancel="runningSFCarcancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="reason" placeholder="请填写取消原因"></textarea>
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarGetOrderDetail,
	ServiceShunFengYueCarApplyTaxiOrder,
	ServiceShunFengYueCarDriverCancelOrder,
	ServiceShunFengYueCarCompleteTaxiIOrder} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const phone = ref('/static/service/phone.png');
	const my_default = ref('/static/service/my_default.png');
	const itemList = ref(['苹果地图','高德地图','腾讯地图']);
	const orderNo = ref('');
	const deliveryId = ref('');
	const dataDict = ref([]);
	const sfch_shijian = ref('/static/service/sfch_shijian.png');
	const changeIconImg = ref('/static/mine/changeIconImg.png');
	const userId = ref('');
	const runningSFCarshow = ref(false);
	const runningSFCarItem = ref({});
	const reason = ref('');
	
	onLoad((options:any) => {
		
		orderNo.value = options.orderNo;
		deliveryId.value = options.deliveryId;
		userId.value = storage.getUserId();
		
	});
	onMounted(() => {
		
		loadData();
	});
	const loadData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: orderNo.value
			};
			ServiceShunFengYueCarGetOrderDetail(param).then((res: any) => {
				
				console.log(res);
				dataDict.value = res.result;
				
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	//导航
	const navigateClick = (item:any) => {
		
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				const mapname = itemList.value[res.tapIndex]
				
				uni.openLocation({
				  latitude: Number(item.destinationlat),
				  longitude: Number(item.destinationlong),
				  name: item.destination,
				  address: item.destination,
				  scale: 18,
				  coordinateType: 'gcj02', // 建议显式指定，见下方说明
				  success: () => console.log('打开地图成功'),
				  fail: (err) => console.error('打开地图失败', err)
				});
				
				if(mapname === '苹果地图'){
					
				}else if(mapname === '高德地图'){
					
				}else if(mapname === '腾讯地图'){
				}
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//抢单
	const rabClick = (item:any) => {
		
		if(storage.getCarid().length === 0){
			
			uni.showToast({
				title:'您还没有车辆,无法抢单！',
				icon:'none'
			})
			return
		}
		//
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderNos:item.orderNos,
				deliveryId:deliveryId.value,
				carNo:storage.getCarid()
			};
			ServiceShunFengYueCarApplyTaxiOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					uni.showToast({
						title:'抢单成功!',
						icon:'none'
					})
					loadData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
		
	};
	//进行中，顺丰约车，取消订单
	const runningShunFengCancelClick = (item:any) => {
		
		runningSFCarshow.value = true;
		runningSFCarItem.value = item;
	};
	const runningSFCarhandleReason = () => {
		
		if(reason.value.length == 0){
			
			uni.showToast({
				title:'请填写取消原因！',
				icon:'none'
			})
			return
		}
		runningSFCarshow.value = true;
		//
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: runningSFCarItem.value.orderNo,
				reason:reason.value
			};
			ServiceShunFengYueCarDriverCancelOrder(param).then((res: any) => {
				
				console.log(res);
				
				if(res.success == true){
					
					
					uni.showToast({
						title:'订单已取消！',
						icon:'none'
					})
					loadData();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	
	const runningSFCarcancelClick = () => {
		
		runningSFCarshow.value = false;
	};
	
	const runningShunFengSureClick = async(item:any) => {
		//
		try {
			let param = {
				userId: storage.getUserId(),
				deliveryId: deliveryId.value,
				orderNos:item.orderNo,
				mobile:storage.getPhone()
			};
			ServiceShunFengYueCarCompleteTaxiIOrder(param).then((res: any) => {
				console.log(res);
				// dataDict.value = res.result;
				
				if(res.success == true){
					
					uni.showToast({
						title:'订单完成!',
						icon:'none'
					})
					loadData();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
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
		  .buttonView{
		                
			   margin-top: 50px;
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
		}
		.cancelView{
			
			margin-top: 30px;
			background-color: white;
			border-radius: 5px;
			color: gray;
			border: gray 1px solid;
			font-size: 14px;
			margin-left: 5%; 
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			height: 40px;           /* 需要设置高度 */
			width: 90%;             /* 需要设置宽度 */
		}
		.textAreaView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;height: 100px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		}

}
</style>