<template>
    <view class="main">
        <u-navbar
          title="群众点单"
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
            <view @click="historyClick">
                <view class="homestayView">历史记录</view>
            </view>
          </template>
        </u-navbar>
		<view class="specsView" @click="chooseOrderType">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">点单类型</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;width: 65%;">{{style}}</view>
			<u-image style="margin-left: 15px;margin-top: 18px;"
			:src="icon"
			width="12px"
			height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">姓名</view>
			<input style="font-size: 13px;margin-top: 15px;margin-left: 15px;" v-model="name" type='text' placeholder="请输入姓名"/>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">手机号</view>
			<input style="font-size: 13px;margin-top: 15px;margin-left: 15px;" v-model="phone" type='text' placeholder="请输入手机号"/>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView" @click="chooseAddress">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">联系地址</view>
			<view style="font-size: 13px;margin-left: 15px;width: 65%;height: 40px;color: black;display: flex;align-items: center;margin-top: 5px;">{{address}}</view>
			<u-image style="margin-left: 15px;margin-top: 18px;"
			:src="icon"
			width="12px"
			height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">点单描述</view>
		</view>
		<textarea class="textAreaView" v-model="introduce" placeholder="输入点单描述内容...">
		</textarea>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">上传图片</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="imagechooseView">
			<uni-file-picker 
			v-model="imageValue"  
			file-mediatype="image"
			mode="grid"
			file-extname="png,jpg"
			:image-styles="imageStyles"
			@select="select" 
			limit="9" >
				<view class="custom-upload-btn">
				  <image :src="selectphoto" ></image>
				</view>
			</uni-file-picker>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">语音录入</view>
		</view>
		<view class="buttonView" @click="gotoRegister">提交</view>
		<uni-popup ref="popup" >
			<view  class="WhiteView">
				<view style="display: flex;flex-direction: column;width: 115px;height: 230px;background-color: aliceblue;">
					<view style="display: flex;flex-direction: column;" v-for="(item,index) in dataList" :key="index">
						<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;height: 30px;" @click="choseChildrenClick(item)">{{item.name}} &gt;</view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;width: 115px;height: 230px;">
					<view style="display: flex;flex-direction: column;" v-for="(item,index) in childList" :key="index">
						<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;height: 30px;" @click="normalClick(item)">{{item.name}}</view>
					</view>	
				</view>
			</view>
		</uni-popup>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { serviceSheChaungOrder, serviceSheChaungOrderSetUp } from '@/api/service';
import { storage, BaseURL } from '@/utils/storage';

const bgColor = ref("#2A9595");
const style = ref('请选择点单类型');
const icon = ref('/static/home/downImage.png');
const imageValue = ref<any[]>([]);
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
const address = ref('选择地址');
const latitude = ref<any>('');
const longitude = ref<any>('');
const name = ref('');
const phone = ref('');
const introduce = ref('');
const dataList = ref<any[]>([]);
const childList = ref<any[]>([]);
const firstyType = ref('');
const secondType = ref('');
const type_id = ref('');
const tempFilePaths = ref<any[]>([]);
const uploadedCount = ref(0);
const finalImgValue = ref('');
const selectphoto = ref('/static/mine/selectphoto.png');
const popup = ref<any>(null);

onMounted(() => {
	init();
});

const init = () => {
	try {
		serviceSheChaungOrder({}).then((res: any) => {
			console.log(res);
			dataList.value = res.result;
			if (res.result && res.result.length > 0) {
				childList.value = res.result[0].childList;
				firstyType.value = dataList.value[0].name;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const choseChildrenClick = (item: any) => {
	console.log(item.name);
	firstyType.value = item.name;
	childList.value = item.childList;
};

const chooseOrderType = () => {
	if (popup.value) popup.value.open('top');
};

const normalClick = (item: any) => {
	console.log(item.name);
	secondType.value = item.name;
	type_id.value = item.id;
	style.value = firstyType.value + secondType.value;
	if (popup.value) popup.value.close();
};

const chooseAddress = () => {
	uni.chooseLocation({
		success: (res: any) => {
			console.log('位置名称：' + res.name);
			console.log('详细地址：' + res.address);
			address.value = res.address;
			latitude.value = res.latitude;
			longitude.value = res.longitude;
		},
		fail: () => {
			uni.showToast({ title: '获取位置信息失败', icon: 'none' });
		}
	});
};

const select = (e: any) => {
	console.log('选择文件：', e);
	tempFilePaths.value = e.tempFilePaths;
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
			user_id: storage.getUserId(),
			type_id: type_id.value,
			name: name.value,
			mobile: phone.value,
			address: address.value,
			imgs: finalImgValue.value,
			description: introduce.value,
			latitude: latitude.value,
			longitude: longitude.value,
		};
		serviceSheChaungOrderSetUp(param).then((res: any) => {
			console.log(res);
			uni.navigateBack();
		});
	} catch (error) {
		console.log(error);
	}
};

const gotoRegister = () => {
	if (style.value === '请选择点单类型') {
		uni.showToast({ title: '请选择点单类型', icon: "none" });
		return;
	}
	if (name.value.length === 0) {
		uni.showToast({ title: '请输入姓名', icon: "none" });
		return;
	}
	if (phone.value.length === 0) {
		uni.showToast({ title: '请输入手机号', icon: "none" });
		return;
	}
	if (address.value === '选择地址') {
		uni.showToast({ title: '请选择地址', icon: "none" });
		return;
	}
	if (introduce.value.length === 0) {
		uni.showToast({ title: '请输入点单描述', icon: "none" });
		return;
	}

	if (tempFilePaths.value.length > 0) {
		console.log(tempFilePaths.value);
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
					console.log(responseData);
					appendToImgValue(responseData.data, index);
					if (uploadedCount.value === tempFilePaths.value.length) {
						pushData();
					}
				}
			});
		});
	} else {
		pushData();
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const historyClick = () => {
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/volenteerHisList'
	});
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
	 .specsView{
		 width: 100%;
		 height: 40px;
		 display: flex;
		 flex-direction: row;
	 }
	 .textAreaView{
		 width: 92%;
		 height: 100px;
		 border-radius: 4px;
		 border: 1px lightgray solid;
		 margin-left: 4%;
		 font-size: 13px;
	 }
	 .imagechooseView{
	 	margin-top: 20px;
	 	margin-left: 5%;
	 	width: 90%;
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
	 .buttonView{
	 	      margin-top: 50px;
	 	      background-color: #2A9595;
	 	      border-radius: 8px;
	 	      color: white;
	 	      font-size: 14px;
	 	      margin-left: 10%; 
	 		  margin-bottom: 20px;
	 	      display: flex;
	 	      justify-content: center;
	 	      align-items: center;
	 	      height: 40px;
	 	      width: 80%;
	 }
	 .WhiteView{
		 display: flex;
		 flex-direction: row;
		 background-color: white;
		 border-radius: 4px;
		 margin-top: 90px;
		 margin-left: 120px;
		 width: 230px;
		 height: 230px;
	 }
    }
</style>