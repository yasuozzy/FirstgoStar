<template>
    <view class="main">
        <u-navbar
          title="普通帖子"
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
		<textarea v-model="bbsContent" style="margin-top: 10px;margin-left: 4%;width: 92%;height: 150px;font-size: 13px;" placeholder="来吧，尽情发挥吧...">
		</textarea>
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
import { storage, BaseURL } from '@/utils/storage';
import { serviceRelesenormalTie } from '@/api/service';

const bgColor = ref("#2A9595");
const bbsContent = ref('');
const selectphoto = ref('/static/mine/selectphoto.png');
const imageStyles = ref({
	width: 80,
	height: 80,
	border: {
		color: "lightgray",
		width: 1,
		style: 'dashed',
		radius: '2px'
	}
});
const imageValue = ref<any[]>([]);
const dataParam = ref<any>({
	managementId: '',
	userId: '',
	bbsContentImgs: "",
	bbsContent: '',
	cstType: "",
	hostNo: "",
	mobile: ''
});
const tempFilePaths = ref<any[]>([]);
const uploadedCount = ref(0);
const finalImgValue = ref('');

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
		dataParam.value.bbsContent = bbsContent.value;
		dataParam.value.cstType = storage.getCstType();
		dataParam.value.hostNo = storage.getHostNo();
		dataParam.value.mobile = storage.getPhone();
		serviceRelesenormalTie(dataParam.value).then((res: any) => {
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
	           margin-left: 15%;
	           width: 80%;
	           height: 30px;
	           margin-top: 10px;
	           border-radius: 5px;
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
	 	height: 100px;
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
    }
</style>