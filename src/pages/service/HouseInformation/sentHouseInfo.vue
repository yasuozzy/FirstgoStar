<template>
    <view class="main">
        <u-navbar
          title="填写租户信息"
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
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-left: 15px;margin-top: 15px;color: red;">*</view>
			<view style="margin-top: 12px;font-size: 14px;">租户姓名</view>
			<input class="searchlocation" v-model="userName" placeholder="填写租户姓名" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-left: 15px;margin-top: 15px;color: red;">*</view>
			<view style="margin-top: 12px;font-size: 14px;">租户联系电话</view>
			<input class="searchlocation" v-model="userMobile" placeholder="填写租户联系电话" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-left: 15px;margin-top: 15px;color: red;">*</view>
			<view style="margin-top: 12px;font-size: 14px;">验证短信</view>
			<input class="searchcode" v-model="code" placeholder="填写验证码" type="text" />
			<view style="margin-top: 12px;font-size: 14px;color: #2A9595;" @click="getCode()">获取验证码</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-left: 15px;margin-top: 15px;color: red;">*</view>
			<view style="margin-top: 12px;font-size: 14px;">租户身份证号</view>
			<input class="searchlocation" v-model="idCard" placeholder="填写租户身份证号" type="text" />
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-left: 15px;width:8px;height:15px;margin-top: 12px;background-color: #2A9595;"></view>
			<view style="margin-top: 10px;font-size: 14px;margin-left: 5px;">上传身份证照片</view>
			<view style="margin-top: 12px;font-size: 12px;color: dimgray;">(租户)</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="margin-left: 115px;height: 130px;align-items: center;margin-top: 20px;width: 300px;">
				<uni-file-picker style="width: 500px;"
				:value="zhengimageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:image-styles="ChoseImageStyles"
				@select="zhengselect" 
				limit="1" >
					<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseZheng"></image>
				</uni-file-picker>
			</view>
			<view style="margin-left: 115px;height: 130px;align-items: center;width: 300px;">
				<uni-file-picker style="width: 500px;"
				:value="fanimageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:image-styles="ChoseImageStyles"
				@select="fanselect" 
				limit="1" >
					<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseFan"></image>
				</uni-file-picker>
			</view>
			<view style="margin-left: 115px;height: 130px;align-items: center;width: 300px;">
				<uni-file-picker style="width: 500px;"
				:value="handimageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:image-styles="ChoseImageStyles"
				@select="handselect" 
				limit="1" >
					<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseHand"></image>
				</uni-file-picker>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;width:8px;height:15px;margin-top: 12px;background-color: #2A9595;"></view>
			<view style="margin-top: 10px;font-size: 14px;margin-left: 5px;">上传房产证</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view class="imagechooseView">
		            <uni-file-picker 
		            v-model="imageValue"  
		            file-mediatype="image"
		            mode="grid"
		            file-extname="png,jpg"
		            :image-styles="imageStyles"
		            @progress="progress" 
		            @success="success" 
		            @fail="fail" 
		            @select="select" 
		            limit="9" >
						<view class="custom-upload-btn">
						  <image :src="selectphoto" ></image>
						</view>
					</uni-file-picker>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;width:8px;height:15px;margin-top: 12px;background-color: #2A9595;"></view>
			<view style="margin-top: 10px;font-size: 14px;margin-left: 5px;">上传附件</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view class="imagechooseView">
		            <uni-file-picker 
		            v-model="imageValue"  
		            file-mediatype="image"
		            mode="grid"
		            file-extname="png,jpg"
		            :image-styles="imageStyles"
		            @progress="progress" 
		            @success="success" 
		            @fail="fail" 
		            @select="select" 
		            limit="9" >
						
					</uni-file-picker>
		</view>
		<view v-if="signImagValue">
			<view style="margin-top: 10px;font-size: 14px;margin-left: 15px;">签名</view>
			<image style="margin-top: 20px;margin-left: 4%;width: 92%;height: 120px;" :src="signImagValue"></image>
		</view>
		<view class="protocalView">
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
			<view style="font-size: 12px;color: red;margin-top: 13px;" @click="agreementClick">《{{agreement_name}}》</view>
		</view>
		<view v-if="!signImagValue" class="buttonView" @click="signClick">签名确认</view>
		<view v-if="signImagValue.length > 0" class="buttonView" @click="fabuClick">确认发布</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceFindActivityGetCode, ServiceHouseInfoShopDetailGetUserDetail } from '@/api/service';
import { GetAgreemente } from '@/api/mine';
import { storage, uploadMultipleFiles, BaseImgURL, BaseURL } from '@/utils/storage';
import eventBus from '@/utils/eventBus';

const bgColor = ref("#2A9595");
const mesImage = ref("/static/home/homestay.png");
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
const selected = ref(false);
const licenseZheng = ref('/static/service/licenseZheng.png');
const licenseFan = ref('/static/service/licenseFan.png');
const licenseHand = ref('/static/service/licenseHand.png');
const selectphoto = ref('/static/mine/selectphoto.png');
const agreement_name = ref('');
const userName = ref('');
const userMobile = ref('');
const code = ref('');
const idCard = ref('');
const signImagValue = ref('');
const ChoseImageStyles = ref({
	width: 150,
	height: 120,
	border: {
		color: "lightgray",
		width: 1,
		style: 'dashed',
		radius: '2px'
	}
});
const idcard_positive = ref('');
const idcard_negative = ref('');
const idcard_hand = ref('');
const tempFilePaths = ref<any[]>([]);
const uploadedCount = ref(0);
const finalImgValue = ref('');
const filePaths = ref('');
const fileNames = ref('');
const rentId = ref('');
const zhengimageValue = ref<any[]>([]);
const fanimageValue = ref<any[]>([]);
const handimageValue = ref<any[]>([]);
const imageValue = ref<any[]>([]);

onLoad((options: any) => {
	rentId.value = options.rentId || '';
});

const handleUpdateData = (data: any) => {
	console.log("接收到回传的数据:", data);
	if (data) {
		signImagValue.value = Array.isArray(data) ? data[0] : data;
		console.log(signImagValue.value);
	}
};

onMounted(() => {
	getAgreement();
	eventBus.on("sign_netimg", handleUpdateData);
});

onUnmounted(() => {
	eventBus.off("sign_netimg", handleUpdateData);
});

const getAgreement = () => {
	try {
		let param = { type: '15' };
		GetAgreemente(param).then((res: any) => {
			console.log(res);
			agreement_name.value = res.result.agreement_name;
		});
	} catch (error) {
		console.log(error);
	}
};

const getCode = () => {
	if (userMobile.value.length === 0) {
		uni.showToast({ title: '请填写租户电话', icon: 'none' });
		return;
	}
	try {
		let param = {
			phone: userMobile.value,
			type: 10,
		};
		serviceFindActivityGetCode(param).then((res: any) => {
			console.log(res);
			uni.showToast({ title: '验证码发送成功', icon: 'none' });
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const chooseselect = () => {
	selected.value = !selected.value;
};

const agreementClick = () => {
	uni.navigateTo({
		url: '/pages/service/HouseInformation/ProtocalDetail?type=15'
	});
};

const signClick = () => {
	uni.navigateTo({
		url: "/pages/mine/SignPage/SignPage",
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
			rentId: rentId.value,
			userName: userName.value,
			userMobile: userMobile.value,
			code: code.value,
			idCard: idCard.value,
			idcardPositive: idcard_positive.value,
			idcardNegative: idcard_negative.value,
			idcardHand: idcard_hand.value,
			signPic: signImagValue.value,
			filePaths: filePaths.value,
			fileNames: fileNames.value,
			picture: finalImgValue.value,
		};
		ServiceHouseInfoShopDetailGetUserDetail(param).then((res: any) => {
			console.log(res);
			uni.showToast({ title: '提交成功', icon: 'none' });
			uni.navigateTo({
				url: '/pages/service/HouseInformation/housedetailMessage'
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const fabuClick = () => {
	if (userName.value.length === 0) {
		uni.showToast({ title: '请填写租户姓名', icon: 'none' });
		return;
	}
	if (userMobile.value.length === 0) {
		uni.showToast({ title: '请填写租户电话', icon: 'none' });
		return;
	}
	if (code.value.length === 0) {
		uni.showToast({ title: '请填写短信验证码', icon: 'none' });
		return;
	}
	if (idCard.value.length === 0) {
		uni.showToast({ title: '请填写租户身份证号', icon: 'none' });
		return;
	}
	if (idcard_positive.value.length === 0) {
		uni.showToast({ title: '请选择身份证正面照片', icon: 'none' });
		return;
	}
	if (idcard_negative.value.length === 0) {
		uni.showToast({ title: '请选择身份证反面照片', icon: 'none' });
		return;
	}
	if (idcard_hand.value.length === 0) {
		uni.showToast({ title: '请选择手持身份证正面照片', icon: 'none' });
		return;
	}
	if (tempFilePaths.value.length === 0) {
		uni.showToast({ title: '请上传房产证照片', icon: 'none' });
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
				console.log(responseData);
				appendToImgValue(responseData.data, index);
				if (uploadedCount.value === tempFilePaths.value.length) {
					pushData();
				}
			}
		});
	});
};

const zhengselect = (e: any) => {
	console.log('选择文件：', e);
	let tempPaths = e.tempFilePaths;
	uploadMultipleFiles("", tempPaths, storage.getToken())
		.then((results: any) => {
			console.log("所有文件上传成功:", results);
			let netimgs: any[] = [];
			results.forEach((item: any) => {
				netimgs.push(item.data);
			});
			idcard_positive.value = BaseImgURL + netimgs.join(',');
		})
		.catch((error: any) => {
			console.error("文件上传失败:", error);
		});
};

const fanselect = (e: any) => {
	console.log('选择文件：', e);
	let tempPaths = e.tempFilePaths;
	uploadMultipleFiles("", tempPaths, storage.getToken())
		.then((results: any) => {
			console.log("所有文件上传成功:", results);
			let netimgs: any[] = [];
			results.forEach((item: any) => {
				netimgs.push(item.data);
			});
			idcard_negative.value = BaseImgURL + netimgs.join(',');
		})
		.catch((error: any) => {
			console.error("文件上传失败:", error);
		});
};

const handselect = (e: any) => {
	console.log('选择文件：', e);
	let tempPaths = e.tempFilePaths;
	uploadMultipleFiles("", tempPaths, storage.getToken())
		.then((results: any) => {
			console.log("所有文件上传成功:", results);
			let netimgs: any[] = [];
			results.forEach((item: any) => {
				netimgs.push(item.data);
			});
			idcard_hand.value = BaseImgURL + netimgs.join(',');
		})
		.catch((error: any) => {
			console.error("文件上传失败:", error);
		});
};

const select = (e: any) => {
	console.log('选择文件：', e);
	tempFilePaths.value = e.tempFilePaths;
};

const progress = (e: any) => {};
const success = (e: any) => {};
const fail = (e: any) => {};
</script>

<style lang="scss" scoped>
.main {
	height: 100%;
	background: white;
	.flex{
		display: flex;
	}
	.searchlocation{
		margin-top: 10px;
		margin-left: 20px;
		font-size: 14px;
		width: 60%;
	}
	.searchcode{
		margin-top: 10px;
		margin-left: 35px;
		font-size: 14px;
		width: 40%;
	}
	.imagechooseView{
		margin-left: 15px;
		margin-top: 10px;
	}
	.protocalView{
		display: flex;
		flex-direction: row;
	}
	.buttonView{
		margin-top: 30px;
		background-color: #2A9595;
		border-radius: 5px;
		color: white;
		font-size: 14px;
		margin-left: 5%; 
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 90%;
		margin-bottom: 20px;
	}
}
</style>