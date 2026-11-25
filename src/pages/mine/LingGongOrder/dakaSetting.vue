<template>
    <view class="main">
        <u-navbar
          title="打卡设置"
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
				  <view class="homestayView">保存</view>
			  </view>
		  </template>
        </u-navbar>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡日期区间</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="chooseTimeView">
			<view class="startView" @click="show = true">{{start_date}}
				<u-datetime-picker
				title="打卡时间"
				
							:show="show"
							v-model="value1"
							mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
					></u-datetime-picker>
			</view>
			<view style="width: 25px;margin-top: 14px;text-align: center;">到</view>
			<view class="endView" @click="endshow = true">{{end_date}}
				<u-datetime-picker
				title="打卡时间"
				
							:show="endshow"
							v-model="value1"
							mode="date"
							@confirm="endConfirm"
							@cancel="endshow = false"
					></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 20px;"></view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡时间</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;color: #2A9595;">上午</view>
		<view style="width: 100%;margin-top: 10px;display: flex;flex-direction: row;">
			<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡时间</view>
			<view class="startTimeView" @click="timeshow = true">{{first_time}}
				<u-datetime-picker
				title="打卡时间"
				
							:show="timeshow"
							v-model="value4"
							mode="time"
							@confirm="startTimeConfirm"
							@cancel="timeshow = false"
					></u-datetime-picker>
			</view>
			<view style="width: 25px;margin-top: 14px;text-align: center;">到</view>
			<view class="endTimeView" @click="endtimeshow = true">{{second_time}}
				<u-datetime-picker
				title="打卡时间"
				
							:show="endtimeshow"
							v-model="value4"
							mode="time"
							@confirm="endTimeConfirm"
							@cancel="endtimeshow = false"
					></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 20px;"></view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;color: #2A9595;">下午</view>
		<view style="width: 100%;margin-top: 10px;display: flex;flex-direction: row;">
			<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡时间</view>
			<view class="startTimeView" @click="threetimeshow = true">{{three_time}}
				<u-datetime-picker
				title="打卡时间"
				
							:show="threetimeshow"
							v-model="value5"
							mode="time"
							@confirm="threeConfirm"
							@cancel="threetimeshow = false"
					></u-datetime-picker>
			</view>
			<view style="width: 25px;margin-top: 14px;text-align: center;">到</view>
			<view class="endTimeView" @click="fourtimeshow = true">{{four_time}}
				<u-datetime-picker
				title="打卡时间"
				
							:show="fourtimeshow"
							v-model="value5"
							mode="time"
							@confirm="fourConfirm"
							@cancel="fourtimeshow = false"
					></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 20px;"></view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡地点设置</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="chooseLocationView" @click="choseLocation()">{{location}}</view>
		<view style="width: 100%;margin-top: 10px;display: flex;flex-direction: row;">
			<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">打卡位置设置</view>
			<view class="disdanceView" @click="choserange()">{{range}}</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {} from '@/api/mine';
     import {} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunYuanUseWorkerClockSettingInfo,
	MineJiuYeQunYuanUseWorkerClockSaveInfo} from '@/api/mine';
	// import { timestampToDate } from '/utiles/common';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const order_id = ref('');
	const userType = ref('');
	const start_date = ref("");
	const end_date = ref("");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const timeshow = ref(false);
	const value4 = ref('08:00');
	const endtimeshow = ref(false);
	const first_time = ref('');
	const second_time = ref('');
	const threetimeshow = ref(false);
	const fourtimeshow = ref(false);
	const value5 = ref('13:30');
	const three_time = ref('');
	const four_time = ref('');
	const location = ref('');
	const latitude = ref();
	const longitude = ref();
	const distance = ref<string|number>('');
	const range = ref('');
	const itemList = ref(['100米以内', '200米以内', '300米以内','400米以内','500米以内']);
            
	onLoad((options:any) => {
		
		order_id.value = options.order_id;
		userType.value = options.userType;
	});
	onMounted(() => {
		init();
	});
        
	const init = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				order_id:order_id.value,
				userType:userType.value,
				
			};
			MineJiuYeQunYuanUseWorkerClockSettingInfo(param).then((res) =>{
							
				console.log(res);
				dataDict.value = res.result;
				start_date.value = dataDict.value.start_date;
				end_date.value = dataDict.value.end_date;
				first_time.value = dataDict.value.first_time;
				second_time.value = dataDict.value.second_time;
				three_time.value = dataDict.value.three_time;
				four_time.value = dataDict.value.four_time;
				location.value = dataDict.value.location;
				latitude.value = dataDict.value.latitude;
				longitude.value= dataDict.value.longitude;
				distance.value = dataDict.value.distance;
				
				if (distance.value == 100) {
					
					range.value = '100米以内';
					
				}else if (distance.value == 200) {
					
					range.value = '200米以内';
				}
				else if (distance.value == 300) {
					
					range.value = '300米以内';
				}
				else if (distance.value == 400) {
					
					range.value= '400米以内';
				}
				else if (distance.value == 500) {
					
					range.value = '500米以内';
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		start_date.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		show.value = false;
	};
	//离店日期
	const endConfirm = (e:any) => {
		const date = new Date(e.value);
		end_date.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		endshow.value = false;
	};
	const startTimeConfirm = (e:any) => {
		
		first_time.value = e.value;
		timeshow.value = false;
	};
	const endTimeConfirm = (e:any) => {
		
		second_time.value = e.value;
		endtimeshow.value = false;
	};
	const threeConfirm = (e:any) => {
		
		three_time.value = e.value;
		threetimeshow.value = false;
	};
	const fourConfirm = (e:any) => {
		
		four_time.value = e.value;
		fourtimeshow.value = false;
	};
	//打卡地点
	const choseLocation = () => {
		
	
		uni.chooseLocation({
			
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					location.value = res.name;
					latitude.value = res.latitude;
					longitude.value = res.longitude;
					console.log(location.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
	};
	//选择位置范围
	const choserange = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				
				range.value = itemList.value[res.tapIndex];
				
				if (res.tapIndex == 0) {
					
					distance.value = '100';
					
				}else if (res.tapIndex == 1) {
					
					distance.value = '200';
				}
				else if (res.tapIndex == 2) {
					
					distance.value = '300';
				}
				else if (res.tapIndex == 3) {
					
					distance.value = '400';
				}
				else if (res.tapIndex == 4) {
					
					distance.value = '500';
				}
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//保存
	const saveClick = async() => {
		
		if (start_date.value.length == 0) {
			
			uni.showToast({
				title:'请选择打卡日期开始时间',
				icon:'none'
			});
			return;
			
		}else if (end_date.value.length == 0) {
			
			uni.showToast({
				title:'请选择打卡日期结束时间',
				icon:'none'
			});
			return;
			
		}else if (first_time.value.length == 0) {
			
			uni.showToast({
				title:'请选择上午打卡时间开始时间',
				icon:'none'
			});
			return;
		}else if (second_time.value.length == 0) {
			
			uni.showToast({
				title:'请选择上午打卡时间结束时间',
				icon:'none'
			});
			return;
		}else if (three_time.value.length == 0) {
			
			uni.showToast({
				title:'请选择下午打卡时间开始时间',
				icon:'none'
			});
			return;
		}else if (four_time.value.length == 0) {
			
			uni.showToast({
				title:'请选择下午打卡时间结束时间',
				icon:'none'
			});
			return;
		}else
		{
		
			try {
				
				let param = {
					
					order_id:order_id.value,
					start_date:start_date.value,
					end_date:end_date.value,
					first_time:first_time.value,
					second_time:second_time.value,
					three_time:three_time.value,
					four_time:four_time.value,
					location:location.value,
					latitude:latitude.value,
					longitude:longitude.value,
					distance:distance.value,
				};
				MineJiuYeQunYuanUseWorkerClockSaveInfo(param).then((res) =>{
								
					console.log(res);
					uni.showToast({
						title:'保存成功',
						icon:'none'
					});
					uni.navigateBack();
					
				});
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .chooseTimeView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 }
	 .startView{
	 		 margin-left: 15px;
	 		 margin-top: 15px;
	 		 width: 160px;
			 height: 25px;
	 		 font-size: 14px;
			 border: 1px gray solid;
			 border-radius: 4px;
			 align-items: center;
	 }
	 .endView{
	 		 
	 		margin-top: 15px;
	 		width: 160px;
			height: 25px;
	 		font-size: 14px;
	 		margin-left: 5px;
			border: 1px gray solid;
			border-radius: 4px;
			align-items: center;
	 }
	 .startTimeView{
	 		margin-left: 15px;
	 		margin-top: 15px;
	 		width: 120px;
	 		height: 25px;
	 		font-size: 14px;
	 		border: 1px gray solid;
	 		border-radius: 4px;
	 		align-items: center;
	 }
	 .endTimeView{
	 		 
	 		margin-top: 15px;
	 		width: 120px;
	 		height: 25px;
	 		font-size: 14px;
	 		margin-left: 5px;
	 		border: 1px gray solid;
	 		border-radius: 4px;
	 		align-items: center;
	 }
	 .chooseLocationView{
		 display: flex;
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 25px;
		 border: 1px gray solid;
		 border-radius: 4px;
		 font-size: 13px;
		 text-align: center;
		 justify-content: center;
		 align-items: center;
	 }
	 .disdanceView{
		 display: flex;
		 margin-top: 10px;
		 margin-left: 15px;
		 border: 1px gray solid;
		 border-radius: 4px;
		 width: 150px;
		 height: 25px;
		 text-align: center;
		 font-size: 13px;
		 justify-content: center;
		 align-items: center;
	 }
    }
</style>