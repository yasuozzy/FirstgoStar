<template>
    <view class="main">
        <u-navbar
          title="网格事件"
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
			  <view slot="right" @click="eventsClick">
				  <view class="homestayView">事件跟踪</view>
			  </view>
		  </template>
        </u-navbar>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 80%;">开启定位</view>
			<switch color="#2A9595" :checked="switchChecked" style="transform:scale(0.6);align-items: right;margin-top: 5px;" @change="locationChange" />
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">事件类型</view>
			<view style="margin-top: 10px;height: 30px;font-size: 13px;text-align: left;" @click="changeType">{{typeName}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">所在网格</view>
			<view style="margin-top: 10px;height: 30px;font-size: 13px;text-align: left;" @click="changeWangge">{{wanggeAddress}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">联系方式</view>
			<input class="searchlocation" v-model="phone" placeholder="必填" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">事件时间</view>
			<view class="startView" @click="show = true">{{startTime}}
				<u-datetime-picker
				title="请选择事件时间"
				
			                :show="show"
			                v-model="value1"
			                mode="datetime"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">具体描述</view>
			<input class="searchlocation" v-model="content" placeholder="请填写描述" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView" >
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">事件位置</view>
			<view style="text-align: right;font-size: 13px;margin-top: 10px;width: 230px;" @click="chooseAddress">{{chooseLocation}}</view>
			<u-image style="margin-top: 15px;margin-left: 10px;" :src="downImage"
						  width="15px"
						  height="10px">
			</u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">具体地址</view>
			<input class="searchlocation" v-model="detailAddress" placeholder="请填写具体地址" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;">事件处理</view>
			<view style="margin-top: 5px;width: 100%;height: 30px;">
				<uni-data-select 
				  v-model="value4"
				  :localdata="range4"
				  @change="changeManagement"
				  placeholder="选择部门"
				></uni-data-select>
			</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 80%;">是否加急</view>
			<switch color="#2A9595" checked="true" style="transform:scale(0.6);align-items: right;margin-top: 5px;" @change="switchChange" />
		</view>
		<view style="margin-left: 15px;margin-top: 15px;font-size: 13px;width: 80%;">上传图片</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;"></view>
		
		<view class="imagechooseView" @click="selectFile">
			<view v-if="tempFilePaths.length == 0" class="custom-upload-btn">
			  <image :src="selectphoto" ></image>
			</view>
			<view v-if="tempFilePaths.length > 0" class="ChoseenView">
				<view class="imageItemV" v-for="(item,index) in tempFilePaths" :key="index">
					<image style="width: 80px;height: 80px;" :src="item" ></image>
				</view>
			</view>
		</view>
		<view style="margin-left: 15px;margin-top: 15px;font-size: 13px;width: 80%;margin-bottom: 70px;">语音录入</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;margin-bottom: 50px;"></view>
		<view class="footer-container">
		    <view style="display: flex;width: 100%;height: 80px;">
		               
		        <view class="order-button" @click="tijiaoClick">提交</view>
		    </view>
		            
		</view>
		
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MinePartyWangGeEvents,
	MinePartyWangGeEventsTypes,
	MinePartyWangGeEventsChooseWangge,
	MinePartyWangGeEventsSetUpEvents} from '@/api/mine';
	import { getStorage, storage, storageKeys,uploadMultipleFiles } from '@/utils/storage';
    import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const selectphoto = ref('/static/mine/selectphoto.png');
	const typeName = ref('请选择');
	const value2 = ref(100);
	const range1 = ref([]);
	const value3= ref(100);
	const range3 = ref([]);
	const startTime = ref("选择");
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const value4 = ref(100);
	const range4 = ref([]);
	const imageStyles = ref({
		width:64,
		height:64,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const switchChecked = ref(false);
	const eventTypeArr = ref([]);
	const wanggeArr = ref([]);
	const manageMentArr = ref([]);
	const phone = ref('');
	const chooseLocation = ref('选择位置');
	const downImage = ref('/static/home/downImage.png');
	const detailAddress = ref('');
	const reparirTypeId = ref('');
	const bldgid = ref('');
	const hsenum = ref('');
	const hseid = ref('');
	const manname = ref('');
	const manid = ref('');
	const dept = ref('');
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const longitude = ref<number>();
	const latitude = ref<number>();
	const isUrgent = ref(2);
	const content = ref('');
	const voice = ref('');
	const voiceDuration = ref('');
	const wanggeAddress = ref('请选择');				
            
	onLoad(() => {
		
		
		uni.getLocation({
			success(res) {
				
				console.log(res);
				latitude.value = res.latitude;
				longitude.value = res.longitude;
			}
		});
	});
	onMounted(() => {
	
	  phone.value = getStorage(storageKeys.phone,'');
	  init();
	  getEventsTypes();
	  chooseWangge();
	  getManageMent();
	});
       
	const init = async() => {
		
		try {
			
			let param = {
				
				userId:getStorage(storageKeys.userId,'')
			};
			const res = await MinePartyWangGeEvents(param);
							
				console.log(res);
				// this.dataDict = res.result;
				if (res.result.locationStatus == 1) {
					
					switchChecked.value = true;
				}else
				{
					switchChecked.value = false;
				}
			
		}catch (error) {
			console.log(error)
		}
	};
	//获取事件类型
	const getEventsTypes =async() => {
		
		try {
			
			let param = {
				
				code:4,
			};
			const res = await MinePartyWangGeEventsTypes(param);
							
				console.log(res);
				eventTypeArr.value = res.result;
				for (var index = 0; index < eventTypeArr.value.length; index++) {
					var element = eventTypeArr.value[index];
					// const newdict = {value: element.id, text:element.name};
					range1.value.push(element.name);
				}
			
		}catch (error) {
			console.log(error)
		}
	};
	//所在网格
	const chooseWangge = async() => {
		
		try {
			
			let param = {
				
				flag:2,
				userid:getStorage(storageKeys.userId,''),
				mainhouse:2,
										  
			};
			const res = await MinePartyWangGeEventsChooseWangge(param);
							
				console.log(res);
				wanggeArr.value = res.result;
				for (var index = 0; index < wanggeArr.value.length; index++) {
					var element = wanggeArr.value[index];
					// const newdict = {value: element.hseid, text:element.address};
					range3.value.push(element.address);
				}
		
		}catch (error) {
			console.log(error)
		}
	};
	//选择部门
	const getManageMent = async() => {
		
		try {
			
			let param = {
				
				code:5,
			};
			const res = await MinePartyWangGeEventsTypes(param);
							
				console.log(res);
				manageMentArr.value = res.result;
				for (var index = 0; index < manageMentArr.value.length; index++) {
					var element = manageMentArr.value[index];
					const newdict = {value: element.id, text:element.name};
					this.range4.push(newdict);
				}
		  
		}catch (error) {
			console.log(error)
		}
		
	};
	const goBack = () => {
		
		uni.navigateBack()
	};
	const switchChange = (e:any) => {
		
		console.log(e);
		if (e.target.value = true) {
			
			isUrgent.value = 2;
			
		}else if(e.target.value = false){
			
			isUrgent.value = 1;
		}
	};
	const changeType = () => {
		
		uni.showActionSheet({
			itemList: range1.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				typeName.value = range1.value[res.tapIndex];
				reparirTypeId.value = eventTypeArr.value[res.tapIndex].id;
				console.log(reparirTypeId.value);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		  });	
		
	};
	const changeWangge = () => {
		
		uni.showActionSheet({
			itemList: range3.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				wanggeAddress.value = range3.value[res.tapIndex];
				bldgid.value = wanggeArr.value[res.tapIndex].bldgid;
				hsenum.value = wanggeArr.value[res.tapIndex].hsenum;
				hseid.value = wanggeArr.value[res.tapIndex].hseid;
				manname.value = wanggeArr.value[res.tapIndex].manname
				manid.value = wanggeArr.value[res.tapIndex].manid;
				console.log(hseid.value);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		  });	
	};
	//时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startTime.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
		show.value = false;
	};
	const locationChange = (e:any) => {
		
		console.log(e);
		
	};
	const changeManagement = (e:any) => {
		
		console.log(e);
		for (var index = 0; index < manageMentArr.value.length; index++) {
			var element = manageMentArr.value[index];
			
			if(e = element.id){
				
				dept.value = element.name;
			}
		}
	};
	const chooseAddress = () => {
		
		uni.chooseLocation({
			
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					chooseLocation.value = res.address;
					latitude.value= res.latitude;
					longitude.value = res.longitude;
					console.log(chooseLocation.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
	};
	//提交
	const tijiaoClick = () => {
		
		if (reparirTypeId.value.length == 0) {
			
			uni.showToast({
				title:'请选择事件类型',
				icon:'none'
			});
			return;
		}
		if (bldgid.value.length == 0) {
			
			uni.showToast({
				title:'请选择所在网格',
				icon:'none'
			});
			return;
		}
		if (phone.value.length == 0) {
			
			uni.showToast({
				title:'请填写联系方式',
				icon:'none'
			});
			return;
		}
		if (startTime.value === '选择') {
			
			uni.showToast({
				title:'请选择事件时间',
				icon:'none'
			});
			return;
		}
		if (chooseLocation.value === '选择位置') {
			
			uni.showToast({
				title:'请选择位置',
				icon:'none'
			});
			return;
		}
		if (dept.value.length == 0) {
			
			uni.showToast({
				title:'请选择部门',
				icon:'none'
			});
			return;
		}
		
		if (tempFilePaths.value.length  == 0) {
			
			uni.showToast({
				title:'请选择图片',
				icon:'none'
			});
			return;
			
		}
		uploadFileImage();
		
		
	};
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');
		//提交数据
		this.updateData();
	};
	const updateData = async() => {
		try {
			
			let param = {
				
			  maintainType:"3",
			  repairUId:storage.getUserId(),
			  repairPeople:storage.getRealName(),
			  repairNo:hsenum.value,
			  buildId:bldgid.value,
			  repairIndustry:manname.value,
			  phone:storage.getPhone(),
			  managerId:manid.value,
			  pic:finalImgValue.value,
			  location:chooseLocation.value,
			  longitude:longitude.value,
			  latitude:latitude.value,
			  visitTime:startTime.value,
			  reparirTypeId:reparirTypeId.value,
			  isUrgent:isUrgent.value,
			  repairContent:content.value,
			  type:"1",
			  dept:dept.value,
			  houseId:hseid.value,
			  orderType:"0",
			  voice:voice.value,
			  voiceDuration:voiceDuration.value,
			  address:detailAddress.value,
			};
			const res = await MinePartyWangGeEventsSetUpEvents(param);
							
			console.log(res);
			uni.showToast({
				title:'提交成功',
				icon:'none'
			});
			uni.navigateBack();
			
		}catch (error) {
			console.log(error)
		}
	};
	
	const selectFile = () => {
		
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = res.tempFilePaths;
				
			}
		});
	};
	//事件跟踪
	const eventsClick = () => {
		uni.navigateTo({
			url:'/pages/home/eventsTailafter'
		})
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
	 .formView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 30px;
	 }
	 .searchlocation{
		 
		 width: 250px;
		 font-size: 13px;
		 margin-top: 10px;
		 text-align: left;
		
	 }
	 .startView{
		 width: 250px;
		 height: 30px;
		 margin-top: 10px;
		 font-size: 13px;
	 }
	 .imagechooseView{
	         margin-top: 15px;
	         margin-left: 5%;
	         width: 90%;
	         margin-bottom: 20px;
	}
	.custom-upload-btn {
			 width: 64px;
			 height: 64px;
			 display: flex;
			 align-items: center;
			 justify-content: center;
	}
	.custom-upload-btn image {
			 width: 100%;
			 height: 100%;
	}
	.ChoseenView{
			   
			    display: grid;
			     grid-template-columns: repeat(3, 1fr);
			     gap: 10px;
			     max-width: 900px;
			     margin: 0 auto;
			     // padding: 20px;
				 align-items: left;
	}
	.imageItemV{
			   
			   
			   width:80px;
			   height: 80px;
			   margin-top: 10px;
			   box-sizing: border-box;
	}
	.footer-container {
	      position: fixed;
	      bottom: 0;
	      left: 0;
	      right: 0;
	      height: 60px;
	      background-color: white;
	      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	      z-index: 100;
	      color: white;
	      display: flex;
	      justify-content: center; /* 水平居中 */
	      align-items: center;     /* 垂直居中 */
	      
	    }
	    .order-button {
	                 
	        display: flex;
	        justify-content: center; /* 水平居中 */
	        align-items: center;     /* 垂直居中 */
	        height: 40px;           /* 需要设置高度 */
	        width: 80%;
	        font-size: 13px;
	        color: white;
	        background-color: #2A9595;
	        border-radius: 6px;
	        margin-left: 10%;
	        margin-top: 20px;
	    }
    }
</style>