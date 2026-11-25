<template>
    <view class="main">
        <u-navbar
          title="其他帖子"
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
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">发布标题</view>
			<input class="searchlocation" v-model="bbsTitle" placeholder="填写标题" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">物品价格</view>
			<input class="searchlocation" v-model="bbsPrice" placeholder="填写物品价格(元)/填写物品单位" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">物品描述</view>
			<input class="searchlocation" v-model="bbsContent" placeholder="填写物品描述" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;width: 80%;font-size: 14px;height: 30px;margin-left: 15px;">上传图片</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
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
		<view class="buttonView" @click="gotoRegister">确定发布</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { serviceReleseotherTie } from '@/api/service';
import { storage, BaseURL } from '@/utils/storage';

const bgColor = ref("#2A9595");
const selectphoto = ref('/static/mine/selectphoto.png');
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
const bbsTitle = ref('');
const bbsPrice = ref('');
const bbsContent = ref('');
const dataParam = ref<any>({
	managementId: '',
	userId: '',
	bbsContentImgs: "",
	cstType: "",
	hostNo: "",
	mobile: '',
	bbsTitle: '',
	bbsPrice: '',
	bbsContent: '',
});
const tempFilePaths = ref<any[]>([]);
const uploadedCount = ref(0);
const finalImgValue = ref('');
const imageValue = ref<any[]>([]);

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const appendToImgValue = (imageUrl: string, currentIndex: number) => {
	if (finalImgValue.value === '') {
		finalImgValue.value = imageUrl;
	} else {
		finalImgValue.value += ',' + imageUrl;
	}
};

const select = (e: any) => {
	console.log('选择文件：', e);
	tempFilePaths.value = e.tempFilePaths;
};

const pushData = () => {
	try {
		dataParam.value.managementId = storage.getManid();
		dataParam.value.userId = storage.getUserId();
		dataParam.value.bbsContentImgs = finalImgValue.value;
		dataParam.value.cstType = storage.getCstType();
		dataParam.value.hostNo = storage.getHostNo();
		dataParam.value.mobile = storage.getPhone();
		dataParam.value.bbsContent = bbsContent.value;
		dataParam.value.bbsTitle = bbsTitle.value;
		dataParam.value.bbsPrice = bbsPrice.value;
		serviceReleseotherTie(dataParam.value).then((res: any) => {
			console.log(res);
			uni.navigateBack();
		});
	} catch (error) {
		console.log(error);
	}
};

const gotoRegister = () => {
	if (bbsContent.value.length === 0) {
		uni.showToast({ title: '请输入发布内容', icon: "none" });
	} else {
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
	}
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
	 	height: 40px;
	 }
	 .searchlocation{
	 	margin-left: 10%;
	 	width: 70%;
	 	height: 28px;
	 	margin-top: 10px;
	 	font-size: 13px;
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
	 .imagechooseView{
	 	margin-top: 20px;
	 	margin-left: 5%;
	 	width: 90%;
	 }
    }
</style>