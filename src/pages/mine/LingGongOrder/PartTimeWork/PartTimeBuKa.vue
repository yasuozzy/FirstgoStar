<template>
    <view class="main">
        <u-navbar
          title="补卡"
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
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">补卡范围</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{dataDict.start_date}}到{{dataDict.end_date}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">补卡日期</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;border: gray 1px solid;border-radius: 4px;width: 280px;height: 25px;">
				<view class="startView" @click="show = true">{{clock_in_date}}
					<u-datetime-picker
					title="打卡时间"
					:show="show"
					v-model="value1"
					mode="date"
					@confirm="handleConfirm"
					@cancel="show = false"
					></u-datetime-picker>
				</view>
			</view>
		</view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">补卡类型</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view v-if="amonType == false" class="amOnBan" @click="amonClick()">上午上班</view>
			<view v-if="amonType == true" style="background-color: #2A9595;" class="amOnBan" @click="amonClick()">上午上班</view>
			<view v-if="amoffType == false" class="amOffBan" @click="amoffClick()">上午下班</view>
			<view v-if="amoffType == true" style="background-color: #2A9595;" class="amOffBan" @click="amoffClick()">上午下班</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view v-if="pmonType == false" class="amOnBan" @click="pmonClick()">下午上班</view>
			<view v-if="pmonType == true" style="background-color: #2A9595;" class="amOnBan" @click="pmonClick()">下午上班</view>
			<view v-if="pmoffType == false" class="amOffBan" @click="pmoffClick()">下午下班</view>
			<view v-if="pmoffType == true" style="background-color: #2A9595;" class="amOffBan" @click="pmoffClick()">下午下班</view>
		</view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">补卡地点</view>
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
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">未进入打卡范围:{{location}}</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;color: #2A9595;" @click="relocation()">去重新定位</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { calculateDistance,formatDistance } from '@/utils/distance';
	import { isDateInRange } from '@/utils/dateUtils';
	import {MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaBuKaGoDaKa} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const order_id = ref('');
	const dataDict = ref({});
	const clock_in_date = ref('');//选择补卡日期
	const show = ref(false);
	const value1 = ref(Number(new Date()));
	const amonType = ref(false);
	const amoffType = ref(false);
	const pmonType = ref(false);
	const pmoffType = ref(false);
	const location = ref('');
	const longitude = ref();
	const latitude = ref();
	const canDaka = ref(0);
	const choose_select = ref('/static/login/choose_select.png');
	const del_red = ref('/static/login/del_red.png');
	const typeNumberArr = ref([]);
	const typeTitleArr = ref([]);
	const meters = ref();
	const currentPosition = ref({
		longitude: null,
		latitude: null
	});
	const targetPosition = ref({
		longitude: null, 
		latitude: null
	});
	const typeString = ref('');
	const typeNames = ref('');
            
	onLoad((options:any) => {
		
		order_id.value = options.order_id;
		dataDict.value = JSON.parse(options.dataDict);
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
	   // 格式化日期时间
	   clock_in_date.value = formatDateTime(now)
	 };
				
	 const formatDateTime = (date:any) => {
	   const year = date.getFullYear()
	   const month = String(date.getMonth() + 1).padStart(2, '0')
	   const day = String(date.getDate()).padStart(2, '0')
	   const hours = String(date.getHours()).padStart(2, '0')
	   const minutes = String(date.getMinutes()).padStart(2, '0')
	   const seconds = String(date.getSeconds()).padStart(2, '0')
	   
	   return `${year}-${month}-${day}`
	 };
			//补卡日期
			const handleConfirm = (e:any) => {
				const date = new Date(e.value);
				clock_in_date.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
				show.value = false;
			};
			const amonClick = () => {
				
				amonType.value = !amonType.value;
				if (amonType.value == true) {
					
					typeNumberArr.value.push(1);
				}else
				{
					if (typeNumberArr.value.includes(1)) {
						// 直接修改原数组（使用filter后重新赋值）
						typeNumberArr.value = typeNumberArr.value.filter(item => item !== 1);
					}
				}
				console.log(typeNumberArr.value);
			};
			const amoffClick = () => {
				
				amoffType.value = !amoffType.value;
				if (amoffType.value == true) {
					
					typeNumberArr.value.push(2);
				}else
				{
					if (typeNumberArr.value.includes(2)) {
						// 直接修改原数组（使用filter后重新赋值）
						typeNumberArr.value = typeNumberArr.value.filter(item => item !== 2);
					}
				}
				console.log(typeNumberArr.value);
			};
			const pmonClick = () => {
				
				pmonType.value = !pmonType.value;
				if (pmonType.value == true) {
					
					typeNumberArr.value.push(3);
				}else
				{
					if (typeNumberArr.value.includes(3)) {
						// 直接修改原数组（使用filter后重新赋值）
						typeNumberArr.value = typeNumberArr.value.filter(item => item !== 3);
					}
				}
				console.log(typeNumberArr.value);
			};
			const pmoffClick = () => {
				pmoffType.value = !pmoffType.value;
				if (pmoffType.value== true) {
					
					typeNumberArr.value.push(4);
				}else
				{
					if (typeNumberArr.value.includes(4)) {
						// 直接修改原数组（使用filter后重新赋值）
						typeNumberArr.value = typeNumberArr.value.filter(item => item !== 4);
					}
				}
				console.log(typeNumberArr.value);
			};
			const choseLocation = () => {
				
				
				uni.getLocation({
					type:'gcj02',
					geocode:true,
					success(res) {
						
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
			//重新定位
			const relocation = () => {
				
				uni.navigateTo({
					url:`/pages/mine/LingGongOrder/reLocation?order_id=${order_id}&dataDict=${JSON.stringify(dataDict)}&realType=${realType.value}` 
				})
			};
			//判断能否签到
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
				if (meters.value <= dataDict.value.distance & result.isInRange == true) {
					
					canDaka.value = 1;
				}else
				{
					canDaka.value = 0;
				}
			};
			const gotoDaKa = () => {
				
				typeString.value = typeNumberArr.value.join(',');
				typeNames.value = typeTitleArr.value.join(',');
				let param = {
					
					userId:storage.getUserId(),
					order_id:order_id.value,
					clock_in_date:clock_in_date.value,
					types:typeString.value,
					typeNames:typeNames.value,
					location:location.value,
					longitude:longitude.value,
					latitude:latitude.value,      
					       
					
				};
				MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaBuKaGoDaKa(param).then((res) =>{
				                
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
          .startView{
          		 // margin-left: 15px;
          		 // margin-top: 15px;
				 display: flex;
				 justify-content: center;
				 text-align: center;
				 align-items: center;
          		 width: 100%;
          		 font-size: 13px;
          }
		  .amOnBan{
			  margin-left: 4%;
			  width: 42%;
			  height: 25px;
			  margin-top: 10px;
			  border: 1px gray solid;
			  border-radius: 4px;
			  display: flex;
			  justify-content: center;
			  text-align: center;
			  align-items: center;
			  font-size: 13px;
		  }
		  .amOffBan{
			  margin-left: 8%;
			  width: 42%;
			  height: 25px;
			  margin-top: 10px;
			  border: 1px gray solid;
			  border-radius: 4px;
			  display: flex;
			  justify-content: center;
			  text-align: center;
			  align-items: center;
			  font-size: 13px;
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