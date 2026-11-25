<template>
    <view class="main">
        <u-navbar
          title="打卡定位"
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
		<view class="page-section page-section-gap">
			<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">我的位置</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: red;">{{location}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;height: 25px;width: 50px;color: white;background-color: lawngreen;display: flex;justify-content: center;text-align: center;border-radius: 4px;">正常</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.location}}</view>
		</view>
		<view class="buttonView" @click="dakaClick()">打    卡</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
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
		realType.value = options.realType;
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
	const choseLocation = () => {
		
		
		uni.getLocation({
			type:'gcj02',
			geocode:true,
			success(res:any) {
				
				console.log(res);
				latitude.value = res.latitude;
				longitude.value = res.longitude;
				location.value = res.address.poiName;
				currentPosition.value = {
					longitude:  longitude.value,
					latitude: latitude.value
				}
				nengfouQianDao();
			}
		});
	};
	const nengfouQianDao = () => {
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
	const dakaClick = () => {
		
		if (canDaka.value == 1) {
			
			gotoDaKa();
			
		}else{
			
			uni.showToast({
				title:'不在打卡范围内，请重新定位',
				icon:'none'
			})
		}
	};
	const gotoDaKa = () => {
		
		
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
			uni.navigateBack();
			
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
	  .buttonView{
	               
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