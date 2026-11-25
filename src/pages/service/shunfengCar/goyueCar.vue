<template>
    <view class="main">
        <u-navbar
          title="我要约车"
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
              <view slot="right" @click="orderListClick()">
                  <view style="font-size: 14px;color: white;">我的订单</view>
              </view>
            </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 15px;">
			<view v-if="selectedtype == 1" style="background-color: #2A9595;color: white;" class="nowButton" @click="selectNow">现在</view>
			<view v-if="selectedtype == 2" style="background-color: white;color: black;" class="nowButton" @click="selectNow">现在</view>
			<view v-if="selectedtype == 1" style="background-color: white;color: black;" class="nowButton" @click="selectyuyue">预约</view>
			<view v-if="selectedtype == 2" style="background-color: #2A9595;color: white;" class="nowButton" @click="selectyuyue">预约</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 30px;">
			<view style="margin-top: 15px;margin-left: 15px;width: 20px;height: 100px;display: flex;flex-direction: column;">
				<view style="width: 10px;height: 10px;background-color: blue;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
				<view style="margin-left: 9px;width: 1px;height: 100px;background-color: gray;"></view>
				<view style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 90%;">
				<view v-if="startAddress !== '从哪儿出发'" style="font-size: 13px;color: gray;margin-top: 10px;margin-left: 15px;">起点</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;" @click="chooseStartLocation">{{startAddress}}</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
				<input class="searchlocation" v-model="departure" placeholder="手动输入详细地址" type="text" />
				<view v-if="endAddress !== '要去哪儿'" style="font-size: 13px;color: gray;margin-top: 10px;margin-left: 15px;">终点</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;" @click="chooseEndLocation">{{endAddress}}</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
				<input class="searchlocation" v-model="destination" placeholder="手动输入详细地址" type="text" />
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="choosePersonNum">
			<image style="margin-top: 15px;margin-left: 15px;width: 20px;height: 20px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="changeIconImg"></image>
			<view style="font-size: 13px;color: gray;margin-top: 15px;margin-left: 10px;">{{passengers}}</view>
		</view>
		<view style="margin-top: 10px;margin-left: 10%;width: 84%;height: 1px;background-color: lightgray;"></view>
		<view v-if="selectedtype == 2" style="width: 100%;display: flex;flex-direction: row;" @click="chooseyuyueTime">
			<image style="margin-top: 15px;margin-left: 15px;width: 20px;height: 20px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="sfch_shijian"></image>
			<view style="font-size: 13px;color: gray;margin-top: 15px;margin-left: 10px;">{{yuyuetime}}</view>
		</view>
		<view v-if="selectedtype == 2" style="margin-top: 10px;margin-left: 10%;width: 84%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="chooseWaingtime">
			<image style="margin-top: 15px;margin-left: 15px;width: 20px;height: 20px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="sfch_shijian"></image>
			<view style="font-size: 13px;color: gray;margin-top: 15px;margin-left: 10px;">{{waitingtime}}</view>
		</view>
		<view style="margin-top: 10px;margin-left: 10%;width: 84%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="chooseWaingtime">
			<image style="margin-top: 15px;margin-left: 15px;width: 20px;height: 20px;border-radius: 50%;flex-shrink: 0;align-self: center;" :src="unused_call_me"></image>
			<input class="lianxirenInput" v-model="mobile" placeholder="输入联系人手机号" type="text" />
		</view>
		<view style="margin-top: 10px;margin-left: 10%;width: 84%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<u-radio-group style="margin-left: 20px;"
			  v-model="Writevalue"
			  placement="row"
			  @change="writeChange"
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in WriteOpinion"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view v-if="selectedtype == 1" class="tijiaobuttonView" @click="callCarClick()">马上叫车</view>
		<view v-if="selectedtype == 2" class="tijiaobuttonView" @click="callCarClick()">立即预约</view>
		<u-modal :show="show" @confirm="yuecarconfirm" confirmText="确定" title="确认发起约车？" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarTakeTaxi} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const selectedtype = ref(1);
	const sfch_shijian = ref('/static/service/sfch_shijian.png');
	const changeIconImg = ref('/static/mine/changeIconImg.png');
	const unused_call_me = ref('/static/service/unused_call_me.png');
	const passengers = ref('选择乘坐人数');
	const passengerList = ref(['1人','2人','3人','4人','5人']);
	const waitingtime = ref('选择等待时间');
	const waitingTimeList = ref(['3分钟','5分钟','10分钟','20分钟','30分钟']);
	const strtime = ref();
	const mobile = ref('');
	const WriteOpinion = ref([
	  {
		name: "拼车",
		disabled: true,
	  },
	  {
		name: "包车",
		disabled: false,
	  },
	]);
	const Writevalue = ref("拼车");
	const is_fill = ref(1);
	const yuyuetime = ref('选择预约时间段');
	const startAddress = ref('从哪儿出发');
	const startLatitude = ref();
	const startLongitude = ref();
	const endAddress = ref('要去哪儿');
	const endLatitude = ref();
	const endLongitude = ref();
	const show = ref(false);
	const departure = ref('');
	const destination = ref('');
	const taxitype = ref(2);
	const appointmentStart = ref('');
	const appointmentEnd = ref('');
	
	
	onLoad(() => {
		mobile.value = storage.getPhone();
	});
	const orderListClick = () => {
		
	};
	const selectNow = () => {
		
		selectedtype.value = 1;
	};
	const selectyuyue = () => {
		selectedtype.value = 2;
	};
	const chooseStartLocation = () => {
		
		 
		               
		uni.chooseLocation({
			
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					startAddress.value = res.address;
					startLatitude.value = res.latitude;
					startLongitude.value = res.longitude;
					console.log(startAddress.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
		
	};
	const chooseEndLocation = () => {
		
		uni.chooseLocation({
			
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					endAddress.value = res.address;
					endLatitude.value = res.latitude;
					endLongitude.value = res.longitude;
					console.log(endAddress.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
		
	};
	const choosePersonNum = () => {
		
		uni.showActionSheet({
			itemList: passengerList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				passengers.value = passengerList.value[res.tapIndex]
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const chooseWaingtime = () => {
		
		uni.showActionSheet({
			itemList: waitingTimeList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				waitingtime.value = waitingTimeList.value[res.tapIndex];
				if(res.tapIndex == 0){
					
					strtime.value = 3;
					
				}else if(res.tapIndex == 1){
					
					strtime.value = 5;
				}else if(res.tapIndex == 2){
					
					strtime.value = 10;
				}else if(res.tapIndex == 3){
					
					strtime.value = 20;
				}else if(res.tapIndex == 4){
					
					strtime.value = 30;
				}
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//选择预约时间段
	const chooseyuyueTime = () => {
		
	};
	const writeChange = (e:any) => {
				
		console.log(e);
		if (e === '拼车') {
			
			 is_fill.value = 1;
			 taxitype.value = 2;
			
		}else if (e == '包车') {
			
			 is_fill.value = 0;
			 taxitype.value = 1;
		}
	};
	const callCarClick = async() => {
		
		if (startLatitude.value.length === 0 || startLongitude.value.length === 0) {
			
			uni.showToast({
				title:'起点不能为空！',
				icon:'none',
			})
			return;
		}
		if (endLatitude.value.length === 0 || endLongitude.value.length === 0) {
			
			uni.showToast({
				title:'终点不能为空！',
				icon:'none',
			})
			return;
		}
		
		if (passengers.value.length === 0 ) {
			
			uni.showToast({
				title:'请选择乘坐人数！',
				icon:'none',
			})
			return;
		}
		if (waitingtime.value.length === 0 ) {
			
			uni.showToast({
				title:'请选择等待时间！',
				icon:'none',
			})
			return;
		}
		if (mobile.value.length === 0 ) {
			
			uni.showToast({
				title:'联系人电话不能为空！',
				icon:'none',
			})
			return;
		}
		if(selectedtype.value === 2){
			
			if (yuyuetime.value.length === 0 ) {
				
				uni.showToast({
					title:'预约时间段不能为空！',
					icon:'none',
				})
				return;
			}
		}
		show.value = true;
		
	};
	const cancelClick = () => {
		show.value = false;
	};
	const yuecarconfirm = () => {
		show.value = false;
		//
		try {
			let param = {
				acceptName:storage.getNickName(),
				mobile:mobile.value,
				departure:startAddress.value,
				destination:endAddress.value,
				passengers:passengers.value,
				waitingtime:waitingtime.value,
				taxitype:taxitype.value,
				menu:selectedtype.value,
				userId:storage.getUserId(),
				appointmentStart:appointmentStart.value,
				appointmentEnd:appointmentEnd.value,
				departure_longitude:startLongitude.value,
				departure_latitude:startLatitude.value,
				destination_longitude:endLongitude.value,
				destination_latitude:endLatitude.value,
				departureRemark:departure.value,
				destinationRemark:destination.value
				
			};
			
			ServiceShunFengYueCarTakeTaxi(param).then((res) =>{
				
				console.log(res);
				if(res.success == true){
					
					//跳转
					uni.navigateTo({
					  url: `/pages/service/shunfengCar/carStatusPage?strtime=${strtime.value}&orderNo=${res.result.orderNo}`
					});
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none',
					})
				}
			
			});
		} catch (error) {
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
		  .nowButton{
			  
			  width: 80px;
			  height: 30px;
			  font-size: 14px;
			  border-radius: 12.5px;
			  margin-left: 80px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  text-align: center;
		  }
		  .searchlocation{
		   margin-left: 4%;
		   width: 92%;
		   height: 35px;
		   margin-top: 10px;
		   border: 1px lightgray solid;
		   border-radius: 5px;
		   font-size: 13px;
	   }
	   .lianxirenInput{
		   
		   margin-left: 15px;
		   width: 90%;
		   height: 35px;
		   margin-top: 10px;
		   border-radius: 5px;
		   font-size: 13px;
	   }
	   .tijiaobuttonView{
	   		  
	   		 margin-top: 30px;
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
}
</style>