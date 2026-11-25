<template>
    <view class="main">
        <u-navbar
          title="平台报修"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
          <template #right>
            <view @click="histotyClick">
                <view class="homestayView">历史记录</view>
            </view>
          </template>
        </u-navbar>
		<view class="formView" @click="choosePublick">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-left: 2px;margin-top: 12px;font-size: 13px;width: 40%;">公共设施</view>
			<view style="margin-top: 5px;width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;width: 80%;">{{publictool}}</view>
				<u-image style="margin-top: 15px;"
				  :src="downimage"
				  width="12px"
				  height="8px"
				></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView" @click="chooseManageMent">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-left: 2px;margin-top: 12px;font-size: 13px;width: 40%;">所在管理处</view>
			<view style="margin-top: 5px;width: 100%;height: 30px;display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;width: 80%;">{{manageMent}}</view>
				<u-image style="margin-top: 15px;"
				  :src="downimage"
				  width="12px"
				  height="8px"
				></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-left: 2px;margin-top: 12px;font-size: 13px;width: 80px;">联系方式</view>
			<input class="searchlocation" placeholder="请输入联系方式" type="text" v-model="mobile" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-left: 2px;margin-top: 12px;font-size: 13px;width: 85px;">上门时间</view>
			<view class="startView" @click="show = true">{{startTime}}
				<u-datetime-picker
				title="请选择上门时间"
			                :show="show"
			                v-model="value1"
			                mode="datetime"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="textAreaView">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-left: 2px;margin-top: 12px;font-size: 13px;width: 80px;">具体描述</view>
			<textarea style="margin-top: 10px;margin-left: 20px;width: 220px;height: 80px;font-size: 13px;" v-model="repairContent" placeholder="请填写描述"></textarea>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 80%;">是否加急</view>
			<switch color="#2A9595" :checked="true" style="transform:scale(0.6);align-items: right;margin-top: 5px;" @change="switchChange" />
		</view>
		<view style="width: 100%;height: 30px;background-color: aliceblue;margin-top: 10px;">
			<view style="margin-left: 15px;font-size: 11px;display: flex;align-items: center;height: 30px;">{{specs}}</view>
		</view>
		<view style="margin-left: 15px;margin-top: 15px;font-size: 13px;width: 80%;">上传图片</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;"></view>
		<view class="imagechooseView">
		            <uni-file-picker 
		            v-model="imageValue"  
		            file-mediatype="image"
		            mode="grid"
		            file-extname="png,jpg"
		            :image-styles="imageStyles"
		            @select="select" 
		            limit="9" ></uni-file-picker>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="margin-left: 15px;margin-top: 15px;font-size: 13px;width: 80%;">语音录入</view>
		<view class="order-button" @click="tijiaoClick">提交</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { serviceGetPingTaiRepairSheShi, serviceGetPingTaiManageMent, serviceGetPingTaiSetUp } from '@/api/service';
import { storage, BaseURL } from '@/utils/storage';

const bgColor = ref("#2A9595");
const downimage = ref('/static/home/downImage.png');
const publicList = ref<any[]>([]);
const itemList = ref<any[]>([]);
const publictool = ref('选择');
const reparirTypeId = ref('');
const manageMent = ref('选择');
const show = ref(false);
const mobile = ref('');
const repairContent = ref('');
const value1 = ref(Number(new Date()));
const startTime = ref("选择");
const manageList = ref<any[]>([]);
const manageTiTleList = ref<any[]>([]);
const managerId = ref('');
const imageStyles = ref({
  width: 64,
  height: 64,
  border: {
	  color: "lightgray",
	  width: 2,
	  style: 'dashed',
	  radius: '2px'
  }
});
const specs = ref('办理加急收费高、效率高');
const imageValue = ref<any[]>([]);
const tempFilePaths = ref<any[]>([]);
const uploadedCount = ref(0);
const finalImgValue = ref('');
const isUrgent = ref('2');

onMounted(() => {
	mobile.value = storage.getPhone();
	init();
	getManageMent();
});

const init = () => {
	try {
		let param = { code: 2 };
		serviceGetPingTaiRepairSheShi(param).then((res: any) => {
			console.log(res);
			publicList.value = res.result;
			itemList.value = res.result.map((item: any) => item.name);
		});
	} catch (error) {
		console.log(error);
	}
};

const getManageMent = () => {
	try {
		let param = { userId: storage.getUserId() };
		serviceGetPingTaiManageMent(param).then((res: any) => {
			console.log(res);
			manageList.value = res.result;
			manageTiTleList.value = res.result.map((item: any) => item.name);
		});
	} catch (error) {
		console.log(error);
	}
};

const choosePublick = () => {
	uni.showActionSheet({
		itemList: itemList.value,
		success: (res: any) => {
			publictool.value = itemList.value[res.tapIndex];
			reparirTypeId.value = publicList.value[res.tapIndex].id;
			console.log(reparirTypeId.value);
		},
		fail: (res: any) => {
			console.log(res.errMsg);
		}
	});
};

const chooseManageMent = () => {
	uni.showActionSheet({
		itemList: manageTiTleList.value,
		success: (res: any) => {
			manageMent.value = manageTiTleList.value[res.tapIndex];
			managerId.value = manageList.value[res.tapIndex].manid;
			console.log(managerId.value);
		},
		fail: (res: any) => {
			console.log(res.errMsg);
		}
	});
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const switchChange = (e: any) => {
	console.log(e);
	if (e.target.value === false) {
		isUrgent.value = '1';
	} else if (e.target.value === true) {
		isUrgent.value = '2';
	}
};

const handleConfirm = (e: any) => {
	const date = new Date(e.value);
	startTime.value = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分`;
	show.value = false;
};

const histotyClick = () => {
	uni.navigateTo({
		url: '/pages/service/pingtaiCheck/projectOrderList'
	});
};

const appendToImgValue = (imageUrl: string, currentIndex: number) => {
	if (finalImgValue.value === '') {
		finalImgValue.value = imageUrl;
	} else {
		finalImgValue.value += ',' + imageUrl;
	}
};

const pushData = () => {
	try {
		let param = {
			userId: storage.getUserId(),
			managerId: managerId.value,
			reparirTypeId: reparirTypeId.value,
			mobile: mobile.value,
			repairContent: repairContent.value,
			startTime: startTime.value,
			pictures: finalImgValue.value,
			isUrgent: isUrgent.value,
		};
		serviceGetPingTaiSetUp(param).then((res: any) => {
			console.log(res);
			uni.showToast({ title: '提交成功', icon: 'none' });
			uni.navigateTo({
				url: '/pages/service/pingtaiCheck/projectOrderList'
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const tijiaoClick = () => {
	if (publictool.value === '选择') {
		uni.showToast({ title: '请选择公共设施', icon: 'none' });
		return;
	}
	if (manageMent.value === '选择') {
		uni.showToast({ title: '请选择所在管理处', icon: 'none' });
		return;
	}
	if (mobile.value.length === 0) {
		uni.showToast({ title: '请输入联系方式', icon: 'none' });
		return;
	}
	if (startTime.value === '选择') {
		uni.showToast({ title: '请选择上门时间', icon: 'none' });
		return;
	}
	if (repairContent.value.length === 0) {
		uni.showToast({ title: '请填写描述', icon: 'none' });
		return;
	}
	if (tempFilePaths.value.length === 0) {
		pushData();
		return;
	}

	tempFilePaths.value.forEach((filePath, index) => {
		uni.uploadFile({
			url: BaseURL + 'AppWorkOrder/addUploadIms',
			filePath: filePath,
			name: 'multipartFile',
			formData: { type: "jpg" },
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				uploadedCount.value++;
				const responseData = JSON.parse(uploadFileRes.data);
				appendToImgValue(responseData.data, index);
				if (uploadedCount.value === tempFilePaths.value.length) {
					pushData();
				}
			}
		});
	});
};

const select = (e: any) => {
	tempFilePaths.value = e.tempFilePaths;
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
	 .textAreaView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 80px;
	 }
	 .searchlocation{
		 margin-top: 8px;
		 margin-left: 20px;
		 border: lightgray 1px solid;
		 font-size: 13px;
		 width: 220px;
		 height: 20px;
	 }
	 .startView{
		 margin-top: 10px;
		 margin-left: 20px;
		 font-size: 13px;
		 width: 220px;
	 }
	 .imagechooseView{
	 	margin-left: 15px;
	 	margin-top: 10px;
	 }
	 .order-button {
	 	margin-top: 20px;
		margin-left: 5%;
		width: 90%;
	 	background-color: #2A9595;
	 	color: #ffffff;
	 	border: none;
	 	border-radius: 4px;
	 	padding: 8px 16px;
	 	font-size: 13px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		margin-bottom: 20px;
	 }
    }
</style>