<template>
    <view class="main">
        <u-navbar
          title="上传房产信息"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
          	<view slot="left" >
          		<view class="flex">
          			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
          		</view>
          	</view>
          </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传企业营业执照</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 12px;margin-left: 5px;font-size: 13px;">营业执照编号</view>
			<input class="searchlocation" v-model="business_no" placeholder="请填写营业执照编号" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">截止日期</view>
			<view @click="show = true" style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 150px;background-color: aliceblue;align-items: center;text-align: center;">
				{{business_time}}
				<u-datetime-picker v-if="longselected == false"
				title="请选择截止日期"
				
							:show="show"
							v-model="value1"
							mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
					></u-datetime-picker>
					
			</view>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="longselected===false" src="/static/login/choose_unselect.png" @click="longtime()"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="longtime()"></image>
			<view style="font-size: 13px;color: dimgray;margin-top: 13px;margin-left: 10px;">长期有效</view>
		</view>
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传房屋租赁合同</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView" @click="personselect">
			
				<view v-if="rentTempFilePaths.length == 0" class="custom-upload-btn">
				  <image :src="selectphoto" ></image>
				</view>
				<view v-if="rentTempFilePaths.length > 0" class="custom-upload-btn">
					<view class="imageItemV" v-for="(item,index) in rentTempFilePaths" :key="index">
						<image style="width: 80px;height: 80px;" :src="item" ></image>
					</view>
				</view>
			
		</view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">签字</view>
		</view>
		<view style="display: flex;width: 100%;height: 150px;">
			<image style="width: 92%;height: 140px;margin-top: 10px;margin-left: 4%;" :src="SignPic"></image>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="tijiaoClick()">{{buttonTitle}}</view>
			</view>
		</view>
		
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive,onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import {MineHouseInformationSubmitHseContract} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
    
    // 背景颜色
    const bgColor = ref("#2A9595");
	const house_id = ref('');
	const house_name = ref('');
	const buttonTitle = ref('签名');
	const sign_pic = ref('');
	const SignPic = ref('');
	const business_no = ref('');
	const business_time = ref('请选择截止日期');
	const show = ref(false);
	const value1 = ref(Number(new Date()));
	const longselected = ref(false);
	const yingyelicense = ref('/static/mine/yingyelicense.png');
	const yingyeImageStyles= ref({
		width:150,
		height:180,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const yingyetempFilePaths= ref([]);//营业执照
	const yingyePicUrl = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const personImageStyles = ref({
		width:80,
		height:80,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const rentTempFilePaths= ref([]);//房屋租赁合同
	const personPicUrl = ref('');
	
				
           
	onLoad((options:any) => {
		
		house_id.value = decodeURIComponent(options.house_id);
		house_name.value = decodeURIComponent(options.house_name);
	});
	onMounted(() => {
	  
	   eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
			  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
       
	const longtime = () => {
				
		longselected.value = !longselected.value
		if (longselected.value == true) {
			
			business_time.value = '长期有效';
			
		}else
		{
			business_time.value = '请选择截止日期';
		}
	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		business_time.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		show.value = false;
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
	const personselect = () => {
		
		  uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				rentTempFilePaths.value = res.tempFilePaths;
				uploadRentFileImage();
			}
		  });
	};
	const uploadRentFileImage = async() => {
		const result = await uploadMultipleFiles([],rentTempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		personPicUrl.value = result.map(item => item.data).join(',');
	
	};
	const tijiaoClick = () => {
				
		if (rentTempFilePaths.value.length == 0) {
			
			// 状态错误处理
			uni.showToast({
			  title: '请上传房屋租赁合同图片',
			  icon: "none",
			});
			
			return;
		}
		if (buttonTitle.value === '签名') {
			
			uni.navigateTo({
			  url: "/pages/mine/SignPage/SignPage",
			});
			
		}else
		{
			gotoRegister();
		}
	};
			
	const handleUpdateData = (data:any) => {
		console.log("接收到回传的数据:", data);
		 if (data) {
			 
			sign_pic.value = data[0];
			buttonTitle.value = '确认';
			SignPic.value = BaseImgURL + data[0];
			console.log( SignPic.value);
		 }
	 
	};
	const gotoRegister = async() => {
						
		let param = {
			
			user_id:storage.getUserId(),
			user_name:storage.getRealName(),
			house_name:house_name.value,
			house_id:house_id.value,
			user_mobile:storage.getPhone(),
			type:storage.getLoginType(),
			pic:personPicUrl.value,
			sign_pic:sign_pic.value,
			business_no:business_no.value,
			deadline:business_time.value,
			business_pic:yingyePicUrl.value,
		};
		try {
							
			
			const res = await MineHouseInformationSubmitHseContract(param);
								
			console.log(res);
			uni.showToast({
			  title: res.message,
			  icon: "none",
			});
			if(res.success === true){
				
				uni.navigateBack();
				
			}
			
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
		  .searchlocation{
		            margin-left: 15px;
		            width: 200px;
		            height: 25px;
		            margin-top: 10px;
		            border-radius: 5px;
		            font-size: 13px;
		  }
            .imagechooseView{
                   
                    margin-left: 120px;
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
			.order-button {
								  
						 display: flex;
						 justify-content: center; /* 水平居中 */
						 align-items: center;     /* 垂直居中 */
						 height: 35px;           /* 需要设置高度 */
						 width: 92%;
						 margin-right: 10px;
						 font-size: 13px;
						 color: white;
						 background-color: #2A9595;
						 border-radius: 6px;
						 margin-left: 4%;
						 margin-top: 15px;
			}
    }
</style>