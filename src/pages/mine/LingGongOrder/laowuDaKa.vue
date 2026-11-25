<template>
    <view class="main">
        <u-navbar
          title="打卡"
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
			  <view slot="right" @click="historyClick()">
				  <view class="homestayView">打卡记录</view>
			  </view>
		  </template>
        </u-navbar>
		<view style="width: 100%;height: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡时间</view>
		<view class="signView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 175px;"></view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="qiandaoClick()">
				<view v-if="type === '1'" style="background-color: #2A9595;height: 30px;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;color: white;" >上午</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">上午</view>
			</view>
			<view style="margin-left: 20px;margin-top: 10px;font-size: 13px;color: white;" @click="qiantuiClick()">
				<view v-if="type === '2'" style="background-color: #2A9595;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">下午</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">下午</view>
			</view>
		</view>
		<view class="timeView">{{clock_in_time}}</view>
		<view class="signView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 175px;">打卡类型</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="shangbanClick()">
				<view v-if="dakaType === '1'" style="background-color: #2A9595;height: 30px;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;color: white;" >上班卡</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">上班卡</view>
			</view>
			<view style="margin-left: 20px;margin-top: 10px;font-size: 13px;color: white;" @click="xiabanClick()">
				<view v-if="dakaType === '2'" style="background-color: #2A9595;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">下班卡</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">下班卡</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡地点</view>
		<view class="timeView">{{location}}</view>
		<view style="display: flex;width: 100%;height: 200px;align-items: center;justify-content: center;">
			<view v-if="canDaka == 0" class="dakaButton" style="background-color: darkgray;">打卡</view>
			<view v-if="canDaka == 1" class="dakaButton" style="background-color: #2A9595;" @click="gotoDaKa()">打卡</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view v-if="canDaka == 1" style="display: flex;flex-direction: row;">
				<u-image style="margin-top: 13px;margin-left: 15px;"
				  :src="choose_select"
				  mode="aspectFill"
				  width="15px"
				  height="15px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">已进入打卡范围:{{location}}</view>
			</view>
			<view v-if="canDaka == 0" style="display: flex;flex-direction: row;">
				<u-image style="margin-top: 13px;margin-left: 15px;"
				  :src="del_red"
				  mode="aspectFill"
				  width="15px"
				  height="15px"
				></u-image>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;width: 60%;white-space: nowrap;">未进入打卡范围:{{location}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: #2A9595;" @click="relocation()">去重新定位</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { calculateDistance,formatDistance } from '@/utils/distance';
	import { isDateInRange } from '@/utils/dateUtils';
	import {MineJiuYeQunYuanLaoWuOrderGoToDaKa} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const clock_in_time = ref('');
	const dakaType = ref('1');
	const location = ref('');
	const longitude = ref();
	const latitude = ref();
	const canDaka = ref(0);
	const choose_select = ref('/static/login/choose_select.png');
	const del_red = ref('/static/login/del_red.png');
	const dataDict = ref({});
	const order_id = ref('');
	const meters = ref();
	const currentPosition = ref({
		longitude: null,
		latitude: null
	});
	const targetPosition = ref({
		longitude: null, 
		latitude: null
	});
	const realType = ref('');
					  
			   
	const formattedDistance = computed(() => {
	  if (meters.value === null) return '未知'
	  return formatDistance(meters.value)
	});
			  
	onLoad((options:any) => {
				
		dataDict.value = JSON.parse(options.dataDict);
		order_id.value = options.order_id;
		console.log(dataDict.value);
		targetPosition.value = {
		  longitude: dataDict.value.longitude,
		  latitude: dataDict.value.latitude
		}
	});
	onMounted(() => {
	  getCurrentDateTime();
	  choseLocation();
	});
			
			
	const getCurrentDateTime = () => {
	  const now = new Date()
	  
	  // 简单获取
	  // currentDateTime = now.toString()
	  
	  // 格式化日期时间
	  clock_in_time.value = formatDateTime(now)
	};
				
	const formatDateTime = (date:any) => {
	  const year = date.getFullYear()
	  const month = String(date.getMonth() + 1).padStart(2, '0')
	  const day = String(date.getDate()).padStart(2, '0')
	  const hours = String(date.getHours()).padStart(2, '0')
	  const minutes = String(date.getMinutes()).padStart(2, '0')
	  const seconds = String(date.getSeconds()).padStart(2, '0')
	  
	  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	};
	const historyClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/laowuDaKaList?id=${order_id.value}` 
		})
	};
	const qiandaoClick = () => {
		type.value = '1';
	};
	const qiantuiClick = () => {
		type.value = '2';
	};
	const shangbanClick = () => {
		dakaType.value = '1';
	};
	const xiabanClick = () => {
		dakaType.value = '2';
	};
	const choseLocation = () => {
		
		
		uni.getLocation({
			type:'gcj02',
			geocode:true,
			success(res) {
				
				console.log(res);
				latitude.value = res.latitude;
				longitude.value = res.longitude;
				location.value = res.address;
				currentPosition.value = {
					longitude: longitude.value,
					latitude: latitude.value
				}
				nengfouQianDao();
			}
		});
	};
	//重新定位
	const relocation = () => {
		
		uni.navigateTo({
			url:`/pages/mine/LingGongOrder/reLocation?order_id=${order_id}&dataDict=${JSON.stringify(dataDict)}&realType=${realType.value}`
		})
	};
	//判断能否签到
	const nengfouQianDao = () =>{
		
		if (!currentPosition.value.longitude || !currentPosition.value.latitude) {
			return
		}
		  
		meters.value = calculateDistance(
			currentPosition.value,
			targetPosition.value
		)
		console.log(meters.value);
		const result = isDateInRange(dataDict.value.start_date, dataDict.value.end_date);
		console.log(result);
		if (meters.value <= dataDict.value.distance && result.isInRange == true) {
			
			canDaka.value = 1;
		}else
		{
			canDaka.value = 0;
		}
	};
	const gotoDaKa = () => {
		
		if (type.value === '1' && dakaType.value === '1') {
			
			realType.value = '1';
			
		}else if (type.value === '1' && dakaType.value === '2') {
			
			realType.value = '2';
			
		}else if (type.value === '2' && dakaType.value === '1') {
			
			realType.value = '3';
			
		}else if (type.value === '2' && dakaType.value === '2') {
			
			realType.value = '4';
			
		}
		
		let param = {
			
			order_id:order_id.value,
			clock_in_time:clock_in_time.value,
			type:realType.value,
			location:location.value,
			longitude:longitude.value,
			latitude:latitude.value
			
		};
		MineJiuYeQunYuanLaoWuOrderGoToDaKa(param).then((res) =>{
						
			console.log(res);
			
			if(res.success === true){
				
				uni.navigateTo({
					url:`/pages/mine/LingGongOrder/laowuDaKaList?id=${order_id.value}` 
				})
			}
			uni.showToast({
				title:res.message,
				icon:'none'
			})
			
			
		});
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
	 .afternoonView{
		 display: flex;
		 color: white;
		 width: 70px;
		 background-color: lightgray;
		 border-radius: 4px;
		 justify-content: center;
		 align-items: center;
		 margin-left: 175px;
	 }
	 .signView{
	 	display: flex;
	 	flex-direction: row;
	 	width: 100%;
	 	height: 40px;
	 }
	 .timeView{
		 margin-top: 15px;
		 margin-left: 4%;
		 width: 92%;
		 border: 1px lightgray solid;
		 height: 1px;
		 font-size: 13px;
		 height: 30px;
		 border-radius: 4px;
		 display: flex;
		 align-items: center;
	 }
	 .dakaButton{
		 margin-top: 30px;
		 width: 130px;
		 height: 130px;
		 border-radius: 75px;
		 color: white;
		 font-size: 20px;
		 text-align: center;
		 display: flex;
		 justify-content: center;
		 align-items: center;
	 }
    }
</style>