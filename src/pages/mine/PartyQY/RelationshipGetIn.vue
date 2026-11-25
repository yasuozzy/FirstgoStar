<template>
    <view class="main">
        <u-navbar
          title="组织关系转入资料填写"
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
		<view style="width: 100%;height: 6px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">姓名</view>
			<input class="searchlocation" v-model="name" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">性别</view>
			<input class="searchlocation" v-model="sex" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">出生日期</view>
			<input class="searchlocation" v-model="birthday" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">民族</view>
			<input class="searchlocation" v-model="nation" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">籍贯</view>
			<input class="searchlocation" v-model="hometown" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">户籍所在地</view>
			<input class="searchlocation" v-model="registeredResidence" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">身份证号</view>
			<input class="searchlocation" v-model="idCard" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">入党时间</view>
			<input class="searchlocation" v-model="joinTime" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 100px;">入党时所在支部</view>
			<input class="searchlocation" v-model="joinOrg" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 100px;">转正时所在支部</view>
			<input class="searchlocation" v-model="regularOrg" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">现居地址</view>
			<input class="searchlocation" v-model="livingPlace" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">原所在支部</view>
			<input class="searchlocation" v-model="oldOrg" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">拟转入党委</view>
			<input class="searchlocation" v-model="transOrg" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">拟转入单位</view>
			<input class="searchlocation" v-model="transUnit" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 180px;">原所在基层党委通讯地址</view>
			<input class="searchlocation" v-model="oldOrgAddress" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 80px;">党费缴纳日期</view>
			<input class="searchlocation" v-model="feePayDate" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 13px;width: 180px;">原所在基层党委联系电话</view>
			<input class="searchlocation" v-model="oldOrgMobile" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 180px;font-size: 13px;color: #2A9595;">转入资料(介绍信等资料)</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;" ></view>
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
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 180px;font-size: 13px;color: #2A9595;">附件</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="imagechooseView">
			<x-native-uploader v-if="fileName.length == 0"
			
			name="multipartFile" 
			fileType="all"
			:header="{}"
			:limit="1"
			:url="loadFileUrl"
			:formData="{ key: 'multipartFile' }"
			
			@success="onUploadSuccess"
			@fail="onUploadFail"></x-native-uploader>
			<view v-if="fileName.length > 0" style="display: flex;flex-direction: row;">
				<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;" src="/src/static/mine/wenjian.png"></image>
				<text style="margin-top: 10px;margin-left: 10px;">{{ fileName }}</text>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 180px;font-size: 13px;color: #2A9595;">上传身份证照片</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="height: 130px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;" @click="zhengselect">
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseZheng"></image>
				
			</view>
			<view style="height: 130px;align-items: center;width: 100%;justify-content: center;display: flex;" @click="fanselect">
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseFan"></image>
				
			</view>
			<view style="height: 130px;align-items: center;width:100%;justify-content: center;display: flex;" @click="handselect">
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseHand"></image>
				
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 60px;">手机号</view>
			<input class="searchmobile" v-model="mobile" placeholder="请输入手机号" type="text" />
			<view class="buttonCodeV" :class="{ disabled: isSending }" :style="{ pointerEvents: isSending ? 'none' : 'auto' }" @click="getCode">{{codetips}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="color: red;margin-left: 15px;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80px;">手机验证码</view>			
			  <input
			    class="codeinput"
			    placeholder="请输入验证码"
			    border="surround"
			    v-model="code"
			  >
			    </input>

		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="buttonView"  @click="gotoRegister()">提交申请</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import {MineJoinPartyShenQingRelationGetIn} from '@/api/mine';
    import {serviceFindActivityGetCode} from '@/api/service';
	import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const name = ref('');
	const sex = ref('');
	const birthday = ref('');
	const nation = ref('');
	const hometown = ref('');
	const registeredResidence = ref('');
	const idCard = ref('');
	const joinTime = ref('');
	const joinOrg = ref('');
	const regularOrg = ref('');
	const livingPlace = ref('');
	const oldOrg = ref('');
	const transOrg = ref('');
	const transUnit = ref('');
	const oldOrgAddress = ref('');
	const feePayDate = ref('');
	const oldOrgMobile = ref('');
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
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan= ref('/static/service/licenseFan.png');
	const licenseHand = ref('/static/service/licenseHand.png');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const zhengimageValue = ref([]);
	const fanimageValue = ref([]);
	const handimageValue = ref([]);
	const mobile = ref('');
	const code = ref('');
	const codetips = ref('获取验证码');
	const countdown = ref(0);         // 倒计时秒数
	const isSending = ref(false);     // 按钮是否处于禁用状态
	let timer = null;                 // 定时器引用
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const ChoseImageStyles = ref({
		width:150,
		height:120,
		 border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			radius:'2px'
		}
	});
	const idcard_positive = ref('');
	const idcard_negative = ref('');
	const idcard_hand = ref('');
	const filePath = ref('');
	const fileName = ref('');
	const loadFileUrl = BaseURL + 'Announce/addUploadIms';
	
				
	//获取验证码
	const getCode = async() => {
				
		if (mobile.value.length === 0) {
			
			uni.showToast({
				title:'请输入手机号',
				icon:'none',
			})
			return;
		}
				
		// 倒计时期间不允许点击
		if (isSending.value) return; 
		isSending.value = true;
		uni.showLoading({ title: "正在获取验证码" });
				
		try {
		  
			let param = {
				phone:mobile.value,
				type:'14',
			};
			const res = await serviceFindActivityGetCode(param);
							  
			console.log(res);
			
			// 模拟接口延迟
			await new Promise(resolve => setTimeout(resolve, 1000)); 
			uni.showToast({ title: '验证码发送成功', icon: 'none' });
				
			// 发送成功后，启动60秒倒计时
			countdown.value = 60;
			timer = setInterval(() => {
				countdown.value--;
				codetips.value = countdown.value + '秒';
				if (countdown.value <= 0) {
					clearInterval(timer);
						timer = null;
						isSending.value = false; // 倒计时结束，恢复可点击状态
						codetips.value = '获取验证码';
					 }
			}, 1000);
			  
		}catch (error) {
		  console.log(error)
		   uni.showToast({ title: '发送失败，请重试', icon: 'none' });
		   // 如果发送失败，允许用户立即重新点击
		   isSending.value = false; 
		}finally {
			uni.hideLoading();
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
	
	const gotoRegister = async() => {

		if (name.value.length === 0) {
			
			uni.showToast({
				title:'请填写姓名',
				icon:'none',
			})
			return;
		}
		if (sex.value.length === 0) {
			
			uni.showToast({
				title:'请填写性别',
				icon:'none',
			})
			return;
		}
		if (birthday.value.length === 0) {
			
			uni.showToast({
				title:'请填写出生日期',
				icon:'none',
			})
			return;
		}
		if (nation.value.length === 0) {
			
			uni.showToast({
				title:'请填写民族',
				icon:'none',
			})
			return;
		}
		if (hometown.value.length === 0) {
			
			uni.showToast({
				title:'请填写籍贯',
				icon:'none',
			})
			return;
		}
		if (registeredResidence.value.length === 0) {
			
			uni.showToast({
				title:'请填写户籍所在地',
				icon:'none',
			})
			return;
		}
		if (idCard.value.length === 0) {
			
			uni.showToast({
				title:'请填写身份证号',
				icon:'none',
			})
			return;
		}
		if (joinTime.value.length === 0) {
			
			uni.showToast({
				title:'请填写入党时间',
				icon:'none',
			})
			return;
		}
		if (joinOrg.value.length === 0) {
			
			uni.showToast({
				title:'请填写入党时所在支部',
				icon:'none',
			})
			return;
		}
		if (regularOrg.value.length === 0) {
			
			uni.showToast({
				title:'请填写转正时所在支部',
				icon:'none',
			})
			return;
		}
		if (livingPlace.value.length === 0) {
			
			uni.showToast({
				title:'请填写现居地址',
				icon:'none',
			})
			return;
		}
		if (oldOrg.value.length === 0) {
			
			uni.showToast({
				title:'请填写原所在支部',
				icon:'none',
			})
			return;
		}
		if (transOrg.value.length === 0) {
			
			uni.showToast({
				title:'请填写拟转入党委',
				icon:'none',
			})
			return;
		}
		if (transUnit.value.length === 0) {
			
			uni.showToast({
				title:'请填写拟转入单位',
				icon:'none',
			})
			return;
		}
		if (oldOrgAddress.value.length === 0) {
			
			uni.showToast({
				title:'请填写原所在基层党委通讯地址',
				icon:'none',
			})
			return;
		}
		if (feePayDate.value.length === 0) {
			
			uni.showToast({
				title:'请填写党费缴纳日期',
				icon:'none',
			})
			return;
		}
		if (oldOrgMobile.value.length === 0) {
			
			uni.showToast({
				title:'请填写原所在基层党委联系电话',
				icon:'none',
			})
			return;
		}
		if (tempFilePaths.value.length == 0) {
			
			uni.showToast({
				title:'请选择转入资料',
				icon:'none',
			})
			return;
		}
		if (licenseZheng.value === '/static/service/licenseZheng.png') {
			
			uni.showToast({
				title:'请选择身份证正面照片',
				icon:'none',
			})
			return;
		}
		if (licenseFan.value === '/static/service/licenseFan.png') {
			
			uni.showToast({
				title:'请选择身份证反面照片',
				icon:'none',
			})
			return;
		}
		if (licenseHand.value === '/static/service/licenseHand.png') {
			
			uni.showToast({
				title:'请选择手持身份证照片',
				icon:'none',
			})
			return;
		}
		uploadFileImage();
		uploadZherngImage();
		uploadFanImage();
		uploadHandImage();
	};
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');

	};
	const tijiaoData = async() => {
		
		try {
			
			let param = {
				
				userId:getStorage(storageKeys.userId,''),
				name:name.value,
				mobile:mobile.value,
				code:code.value,
				sex:sex.value,
				birthday:birthday.value,
				nation:nation.value,
				hometown:hometown.value,
				registeredResidence:registeredResidence.value,
				idCard:idCard.value,
				joinTime:joinTime.value,
				joinOrg:joinOrg.value,
				regularOrg:regularOrg.value,
				livingPlace:livingPlace.value,
				oldOrg:oldOrg.value,
				transOrg:transOrg.value,
				transUnit:transUnit.value,
				oldOrgAddress:oldOrgAddress.value,
				feePayDate:feePayDate.value,
				oldOrgMobile:oldOrgMobile.value,
				cardPositivePic:idcard_positive.value,
				cardNegativePic:idcard_negative.value,
				cardHandPic:idcard_hand.value,
				infoPicPath:finalImgValue.value,
				filePath:filePath.value,
				fileName:fileName.value,
				
			};
			const res = await MineJoinPartyShenQingRelationGetIn(param);
							
			console.log(res);
			uni.showToast({
				title:'提交成功',
				icon:'none'
			});
			uni.navigateTo({
				url:'/pages/mine/PartyQY/RelationShipGetInList'
			})
				
		   
		}catch (error) {
			console.log(error)
		}
		
	};
	const zhengselect = (e:any) => {
		
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
				
				licenseZheng.value = res.tempFilePaths[0];
				
			}
		});
	};
	const uploadZherngImage = async() =>{
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: licenseZheng.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				idcard_positive.value = responseData.data;
				
			},
			
		});
	};
	const fanselect = (e:any) => {
		
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
				
				licenseFan.value = res.tempFilePaths[0];
				// imageUpload();
			}
		});
	};
	const uploadFanImage = async() =>{
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: licenseFan.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				idcard_negative.value = responseData.data;
				
			},
			
		});
	};
	const handselect = (e:any) => {
		
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;

				licenseHand.value = res.tempFilePaths[0];
				// imageUpload();
			}
		});
	};
	const uploadHandImage = async() =>{
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: licenseHand.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				idcard_hand.value = responseData.data;
				
			},
			
		});
	};
	
	const onUploadSuccess = (res:any) => {
	  console.log('上传成功', res);
	  // 假设返回结构为 { data: '文件路径', ... }
	  const response = JSON.parse(res.response);
	  if (response.result == true) {
	    filePath.value = response.data;
		fileName.value = res.file.name;
		console.log(filePath.value,fileName.value);
		uni.showToast({
			title:'文件上传成功',
			icon:'none'
		});

		
	  }
	};
	
	const onUploadFail = (err:any) => {
	  console.error('上传失败', err)
	};
	const goBack = () =>{
		
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
            .formView{
             display: flex;
			 flex-direction: row;
			 width: 100%;
			 height: 40px;
			 background-color: white;
			 margin-top: 10px;
			 
		}
		.searchlocation{
		         margin-left: 15px;
		         width: 230px;
		         height: 30px;
		         margin-top: 10px;
		         font-size: 13px;
		}
		.imagechooseView{
			margin-top: 10px;
			margin-left: 5%;
			width: 90%;
			margin-bottom: 20px;
		}
		.buttonView{
		             
			margin-top: 50px;
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
	   .buttonCodeV{
		   
		   margin-top: 10px;
		   background-color: #2A9595;
		   border-radius: 15px;
		   color: white;
		   font-size: 12px;
		   
		   display: flex;
		   justify-content: center; /* 水平居中 */
		   align-items: center;     /* 垂直居中 */
		   height: 30px;           /* 需要设置高度 */
		   width: 80px;             /* 需要设置宽度 */
		   /* 优化点击体验 */
		   cursor: pointer; 
		   user-select: none; 
	   }
	   /* 倒计时中的禁用样式 */
	   .buttonCodeV.disabled {
	     margin-top: 10px;
	     background-color: gray;
	     border-radius: 5px;
	     color: white;
	     font-size: 12px;
	     
	     display: flex;
	     justify-content: center; /* 水平居中 */
	     align-items: center;     /* 垂直居中 */
	     height: 30px;           /* 需要设置高度 */
	     width: 80px;  
	     cursor: not-allowed;
	   }
	   .searchmobile{
		   
		   margin-left: 15px;
		   width: 180px;
		   height: 30px;
		   margin-top: 10px;
		   font-size: 13px;
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
	   .codeinput{
				   
		   margin-top: 15px;
		   width: 200px;
		   font-size: 14px;
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
    }
</style>