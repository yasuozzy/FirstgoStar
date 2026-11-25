<template>
    <view class="main">
        <u-navbar
          title="填写申请"
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
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">基础信息</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">店铺名称</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="shop_name" placeholder="填写店铺名称"/>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">营业执照编号</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="business_no" placeholder="填写营业执照编号"/>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="chooseGroupClick">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">关联集团</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;color: gray;">{{group_name}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">联系人</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="user_name" placeholder="填写联系人姓名"/>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">联系人电话</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="user_mobile" placeholder="填写联系人电话"/>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">法人</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="legal_person" placeholder="填写法人姓名"/>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">法人身份证号</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="legal_card" placeholder="填写法人身份证号"/>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="chooseLeiMuClick">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">经营类目</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;color: gray;">{{shop_class_name}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">营业时间</view>
			<!-- <view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;color: gray;">{{opening_hours}}</view> -->
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;color: gray;">
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="uni-input">{{opening_hours}}</view>
				</picker>
			</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="chooseAddress">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">详细地址</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;color: gray;">{{address}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">经营描述</view>
			<input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="business_description" placeholder="填写经营描述"/>
		</view>
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">资质证件</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;height: 200px;margin-top: 20px;">
			<view class="imagechooseView" @click="yingyeselect">
				<view v-if="yingyetempFilePaths.length == 0" class="yingyecustom-upload-btn">
				  <image :src="yingyelicense" ></image>
				</view>
				<view v-if="yingyetempFilePaths.length > 0" class="ChoseenView">
					<view class="yingyeimageItemV" v-for="(item,index) in yingyetempFilePaths" :key="index">
						<image style="width: 150px;height: 180px;" :src="item" ></image>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">身份认证</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
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
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">店铺照片</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="shopimagechooseView">
		            <uni-file-picker 
		            v-model="imageValue"  
		            file-mediatype="image"
		            mode="grid"
		            file-extname="png,jpg"
		            :image-styles="imageStyles"
		           
		            @select="shopselect" 
		            limit="1" >
						<view class="shopcustom-upload-btn">
						  <image :src="shopCoverImage" ></image>
						</view>
					</uni-file-picker>
					<uni-file-picker
					v-model="imageValue"  
					file-mediatype="image"
					mode="grid"
					file-extname="png,jpg"
					:image-styles="imageStyles"
					
					@select="otherselect" 
					limit="9" >
						<view class="shopcustom-upload-btn">
						  <image :src="shopOtherImage" ></image>
						</view>
					</uni-file-picker>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 55%;color: #2A9595;">是否成为政府预付店铺</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="Writevalue"
			  placement="row"
			  @change="writeChange"
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in WriteOpinion"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view v-if="signPic.length > 0" style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="signPic"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view class="protocalView">
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view v-if="is_fill == 1" class="protocalView">
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="governselected===false" src="/static/login/choose_unselect.png" @click="govervchooseselect"></image>
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="govervchooseselect"></image>
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="GoveragreementClick()">《{{governmentAgreement_name}}》</view>
		</view>
		<view class="buttonView" @click="tijiaoClick()">提交申请</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {GetAgreemente,MineShangquanManageMentYufuStoreGetGroupList,
	MineShangquanManageMentYufuStoreGetCategary,
	MineShangquanManageMentYufuStoreApplyShop} from '@/api/mine';
    import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const shop_name = ref();
	const business_no = ref();
	const opening_hours = ref('请选择');
	const multiArray = ref( [
		["00:00", "01:00", "02:00", "03:00","04:00", "05:00","06:00", "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"],
		["00:00", "01:00", "02:00", "03:00","04:00", "05:00","06:00", "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"]
	]);
	const multiIndex = ref( [0, 0]);
	const address = ref('选择店铺地址');
	const yingyetempFilePaths= ref([]);//营业执照
	const yingyePicUrl = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const yingyelicense = ref('/static/mine/yingyelicense.png');
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan= ref('/static/service/licenseFan.png');
	const licenseHand = ref('/static/service/licenseHand.png');
	const zhengimageValue = ref([]);
	const fanimageValue = ref([]);
	const handimageValue = ref([]);
	const shopCoverImage = ref('/static/mine/shopCoverImage.png');
	const shopOtherImage = ref('/static/mine/shopOtherImage.png');
	const cover_img = ref();
	const oth_pics = ref();
	const imageStyles = ref({
		width:80,
		height:100,
		border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			
		}
	});
	const WriteOpinion = ref([
	  {
		name: "是",
		disabled: false,
	  },
	  {
		name: "否",
		disabled: true,
	  },
	]);
	const Writevalue = ref("否");
	const is_fill = ref(0);
	const agreement_name = ref('');
	const governmentAgreement_name = ref('');
	const groupList = ref([]);
	const groupTitleList = ref([]);
	const group_id = ref();
	const group_name = ref('请选择关联集团');
	const shopclassList = ref([]);
	const shopclassTitleList = ref([]);
	const shop_class_name = ref('请选择经营类目');
	const shop_class_id = ref();
	const latitude = ref();
	const longitude = ref();
	const user_name = ref();
	const user_mobile = ref();
	const legal_person = ref();
	const legal_card = ref();
	const business_description = ref();
	const signPic = ref('');
	const selected = ref(false);
	const governselected = ref(false);
	
	
	
	
	onMounted(() => {
		
		getAgreement();
		getGovernmentAgreement();
		loadGroupData();
		loadLeiMuData();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
	  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
	//获取关联集团
	const loadGroupData = async() => {
		
		try {
			let param = {
			};
			MineShangquanManageMentYufuStoreGetGroupList(param).then((res) =>{
				
				console.log(res);
				groupList.value = res.result;
				groupTitleList.value = res.result.map(item => item.group_name);
			});
		} catch (error) {
			console.log(error)
		} 
	};
	//获取类目
	const loadLeiMuData = async() => {
		
		try {
			let param = {
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId()
			};
			MineShangquanManageMentYufuStoreGetCategary(param).then((res) =>{
				
				console.log(res);
				shopclassList.value = res.result.shopClass;
				shopclassTitleList.value = res.result.shopClass.map(item => item.CLASS_NAME);
			});
		} catch (error) {
			console.log(error)
		} 
	};
	const chooseGroupClick = () => {
		uni.showActionSheet({
			itemList: groupTitleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				group_name.value = groupTitleList.value[res.tapIndex];
				group_id.value = groupList.value[res.tapIndex].group_id;
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	const chooseLeiMuClick = () => {
		uni.showActionSheet({
			itemList: shopclassTitleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				shop_class_name.value = shopclassTitleList.value[res.tapIndex];
				shop_class_id.value = shopclassList.value[res.tapIndex].ID;
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//选择工作时段
	const bindMultiPickerColumnChange = (e:any) => {
		
		const { column, value } = e.detail
		multiIndex.value[column] = value
		// 根据当前选中的索引拼接时间段
		opening_hours.value = multiArray.value[0][multiIndex.value[0]] + '-' + multiArray.value[1][multiIndex.value[1]]
	};
	//选择详细地址
	const chooseAddress = () => {
		
		uni.chooseLocation({
		                    
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					address.value = res.address;
					latitude.value = res.latitude;
					longitude.value = res.longitude;
					console.log(address.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
	};
	const yingyeselect = () => {
				
				
		 uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				yingyetempFilePaths.value = res.tempFilePaths;
				uploadYingYeFileImage();
			}
		});
	};
	const uploadYingYeFileImage = async() => {
		const result = await uploadMultipleFiles([],yingyetempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		yingyePicUrl.value = result.map(item => item.data).join(',');
	
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
				uploadZherngImage()
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
				zhengimageValue.value = responseData.data;
				
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
				uploadFanImage();
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
				fanimageValue.value = responseData.data;
				
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
				uploadHandImage();
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
				handimageValue.value = responseData.data;
				
			},
			
		});
	};
	
	const shopselect = (e:any) => {
		console.log('选择文件：',e);
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			cover_img.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
	};
	const otherselect = (e:any) => {
		
		console.log('选择文件：',e);
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			oth_pics.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
	};
	const writeChange = (e:any) => {
				
		console.log(e);
		if (e === '是') {
			
			 is_fill.value = 1;
			
		}else if (e == '否') {
			
			 is_fill.value = 0;
		}
	};
	//获取协议
	const getAgreement = async() => {
						  
					
		try {
			let param = {
				type:'27',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
	
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	
	const agreementClick = () => {
					
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${27}`
		})
		
	};
	const getGovernmentAgreement = async() => {
		
		try {
			let param = {
				type:'29',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				governmentAgreement_name.value = res.result.agreement_name;
			
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const chooseselect = () => {
		selected.value = !selected.value;
	};
	const governchooseselect = () => {
		governselected.value = !governselected.value;
	};
	const GoveragreementClick = () => {
		
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${29}`
		})
	};
	const tijiaoClick = () => {
		
		if(shop_name.value.length === 0){
			
			uni.showToast({
				title:'请填写店铺名称',
				icon:'none'
			})
			return
		}
		if(business_no.value.length === 0){
			
			uni.showToast({
				title:'请填写营业执照编号',
				icon:'none'
			})
			return
		}
		
		if(group_name.value === '请选择关联集团'){
			
			uni.showToast({
				title:'请选择关联集团',
				icon:'none'
			})
			return
		}
		if(user_name.value.length === 0){
			
			uni.showToast({
				title:'请填写联系人姓名',
				icon:'none'
			})
			return
		}
		if(user_mobile.value.length === 0){
			
			uni.showToast({
				title:'请填写联系电话',
				icon:'none'
			})
			return
		}
		if(legal_person.value.length === 0){
			
			uni.showToast({
				title:'请填写法人姓名',
				icon:'none'
			})
			return
		}
		if(legal_card.value.length === 0){
			
			uni.showToast({
				title:'请填写法人身份证号',
				icon:'none'
			})
			return
		}
		if(shop_class_name.value === '请选择经营类目'){
			
			uni.showToast({
				title:'请选择经营类目',
				icon:'none'
			})
			return
		}
		if(opening_hours.value === '请选择'){
			
			uni.showToast({
				title:'请选择营业时间',
				icon:'none'
			})
			return
		}
		if(address.value === '选择店铺地址'){
			
			uni.showToast({
				title:'请选择店铺地址',
				icon:'none'
			})
			return
		}
		if(business_description.value.length === 0){
			
			uni.showToast({
				title:'请填写经营描述',
				icon:'none'
			})
			return
		}
		
		if(yingyePicUrl.value.length === 0){
			
			uni.showToast({
				title:'请上传营业执照',
				icon:'none'
			})
			return
		}
		if(zhengimageValue.value.length === 0){
			
			uni.showToast({
				title:'请上传身份证正面照',
				icon:'none'
			})
			return
		}
		if(fanimageValue.value.length === 0){
			
			uni.showToast({
				title:'请上传身份证反面照',
				icon:'none'
			})
			return
		}
		if(handimageValue.value.length === 0){
			
			uni.showToast({
				title:'请上传手持身份证正面照',
				icon:'none'
			})
			return
		}
		if(cover_img.value.length === 0 || oth_pics.value.length === 0){
			
			uni.showToast({
				title:'请上传店铺照片',
				icon:'none'
			})
			return
		}
		if(selected.value === false){
			
			uni.showToast({
				title:'未同意预付店铺协议',
				icon:'none'
			})
			return
		}
		
		if(signPic.value.length > 0){
			
			gototijiaoData();
			
		}else
		{
			uni.navigateTo({
			  url: "/pages/mine/SignPage/SignPage",
			});
		}
		
		
		
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signPic.value = data[0];
		console.log( signPic.value);
	  };
	  
	};
	const gototijiaoData = async() => {
		
		try {
			let param = {
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				business_description:business_description.value,
				is_gov_dis:is_fill.value,
				isSelected:selected.value,
				latitude:latitude.value,
				longitude:longitude.value,
				card_hand_img:handimageValue.value,
				card_negative_img:fanimageValue.value,
				card_positive_img:zhengimageValue.value,
				papers:yingyePicUrl.value,
				cover_img:cover_img.value,
				show_img:oth_pics.value,
				shop_name:shop_name.value,
				business_no:business_no.value,
				group_name:group_name.value,
				group_id:group_id.value,
				user_name:user_name.value,
				user_mobile:user_mobile.value,
				legal_person:legal_person.value,
				legal_card:legal_card.value,
				shop_class_id:shop_class_id.value,
				shop_class_name:shop_class_name.value,
				opening_hours:opening_hours.value,
				address:address.value,
				
				
			};
			MineShangquanManageMentYufuStoreApplyShop(param).then((res) =>{
				
				console.log(res);
				if(res.success === true){
					
					//
					
				}
				uni.showToast({
					title:res.message,
					icon:'none'
				})
			
			});
		} catch (error) {
			console.log(error)
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
		  .imagechooseView{
		         
		          margin-left: 15px;
		          width: 120px;
		          height: 200px;
		  }
		  .yingyecustom-upload-btn {
		  	margin-top: 20px;
		    width: 120px;
		    height: 160px;
		    // background-color: red;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    
		  }
		  .yingyecustom-upload-btn image {
		    width: 100%;
		    height: 100%;
		  }
		  .personchooseView{
		  	margin-top: 10px;
		  	margin-left: 5%;
		  	width: 90%;
		  	height: 100px;
		  }
		  .custom-upload-btn {
		    width: 80px;
		    height: 80px;
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
		  .yingyeimageItemV{
		  	
		  	width:180px;
		  	height: 180px;
		  	margin-top: 10px;
		  	box-sizing: border-box;
		  }
		  .imageItemV{
		  		   
		  		   
		     width:80px;
		     height: 80px;
		     margin-top: 10px;
		     box-sizing: border-box;
		  }
		  .shopimagechooseView{
		   	margin-top: 20px;
		   	margin-left: 5%;
		   	width: 90%;
		   	height: 100px;
		  	display: flex;
		  	flex-direction: row;
		   }
		   .shopcustom-upload-btn {
		   		  width: 80px;
		   		  height: 100px;
		   		  display: flex;
		   		  align-items: center;
		   		  justify-content: center;
		   		}
		   		.shopcustom-upload-btn image {
		   		  width: 80px;
		   		  height: 100px;
		   		}
				.protocalView{
				         display: flex;
				         flex-direction: row;
				         width: 100%;
						 margin-top: 5px;
				     }
				 .buttonView{
						  
						 margin-top: 30px;
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
		         
		  
}
</style>