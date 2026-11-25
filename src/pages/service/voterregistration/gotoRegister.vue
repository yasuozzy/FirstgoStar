<template>
    <view class="main">
        <u-navbar
          title="选民登记"
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
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">姓名</view>
			<input class="searchlocation" v-model="user_name" placeholder="填写姓名" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">性别</view>
			<input class="searchlocation" v-model="sex" placeholder="填写性别" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">身份证号</view>
			<input class="searchlocation" v-model="id_card" placeholder="填写身份证号" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">电话号码</view>
			<input class="searchlocation" v-model="user_mobile" placeholder="填写电话号码" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">住址</view>
			<input class="searchlocation" v-model="home_address" placeholder="填写住址" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">简介</view>
		</view>
		<textarea class="introduceTextArea" v-model="introduction" placeholder="填写简介...">
		</textarea>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80%;font-size: 14px;height: 30px;">上传照片(一寸红底证件照)</view>
		</view>
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
		<view class="buttonView" @click="gotoRegister">确认提交</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceXuanMinVoting } from '@/api/service';
import { storage, BaseURL } from '@/utils/storage';

const bgColor = ref("#2A9595");
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
const user_name = ref('');
const user_mobile = ref('');
const sex = ref('');
const id_card = ref('');
const introduction = ref('');
const home_address = ref('');
const photo_path = ref('');
const tempFilePaths = ref<any[]>([]);
const uploadedCount = ref(0);
const finalImgValue = ref('');
const idstring = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
});

const select = (e: any) => {
	console.log('选择文件：', e);
	tempFilePaths.value = e.tempFilePaths;
};

const tijiaoData = () => {
	try {
		let param = {
			collect_id: idstring.value,
			user_id: storage.getUserId(),
			user_name: user_name.value,
			user_mobile: user_mobile.value,
			sex: sex.value,
			id_card: id_card.value,
			introduction: introduction.value,
			home_address: home_address.value,
			photo_path: imageValue.value,
		};
		serviceXuanMinVoting(param).then((res: any) => {
			console.log(res);
			uni.showToast({ title: '提交成功', icon: "none" });
			uni.navigateTo({
				url: '/pages/service/voterregistration/myvoterregistration'
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const gotoRegister = () => {
	if (user_name.value.length === 0) {
		uni.showToast({ title: '请输入选民姓名', icon: "none" });
		return;
	}
	if (sex.value.length === 0) {
		uni.showToast({ title: '请输入性别', icon: "none" });
		return;
	}
	if (id_card.value.length === 0) {
		uni.showToast({ title: '请输入身份证号', icon: "none" });
		return;
	}
	if (user_mobile.value.length === 0) {
		uni.showToast({ title: '请输入电话号码', icon: "none" });
		return;
	}
	if (home_address.value.length === 0) {
		uni.showToast({ title: '请输入住址', icon: "none" });
		return;
	}
	if (introduction.value.length === 0) {
		uni.showToast({ title: '请输入简介', icon: "none" });
		return;
	}
	if (imageValue.value.length === 0 && tempFilePaths.value.length === 0) {
		uni.showToast({ title: '请选择证件照', icon: "none" });
		return;
	}
	console.log(tempFilePaths.value);
	uni.uploadFile({
		url: BaseURL + 'AppWorkOrder/addUploadIms',
		filePath: tempFilePaths.value[0],
		name: 'multipartFile',
		formData: { type: "jpg" },
		success: (uploadFileRes) => {
			console.log(uploadFileRes.data);
			const responseData = JSON.parse(uploadFileRes.data);
			console.log(responseData);
			imageValue.value = responseData.data;
			tijiaoData();
		}
	});
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
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
	           width: 60%;
	           height: 30px;
	           margin-top: 10px;
	           font-size: 13px;
	 }
	 .introduceTextArea{
		 font-size: 13px;
		 margin-left: 4%;
		 width: 92%;
		 height: 80px;
		 border: 1px lightgray solid;
		 border-radius: 4px;
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