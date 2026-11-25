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
		<view class="formView">
			<view style="color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 5px;font-size: 14px;">上传房屋租赁合同</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
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
	
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseImgURL,uploadMultipleFiles } from '@/utils/storage';
	import {MineHouseInformationSubmitHseContract} from '@/api/mine';
	import eventBus from '@/utils/eventBus';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const selectphoto = ref('/static/mine/selectphoto.png');
	const imageStyles = ref({
		width:80,
		height:80,
		border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			radius:'2px'
		}
	});
	const imageValue = ref([]);
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const house_id = ref('');
	const house_name = ref('');
	const buttonTitle = ref('签名');
	const sign_pic = ref('');
	const SignPic = ref('');
           
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
           
	const tijiaoClick = async() => {
				
		if (tempFilePaths.value.length == 0) {
			
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
	const gotoRegister = () => {
						
		console.log(tempFilePaths);
		
		uploadFileImage();					
		
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
	
	const uploadFileImage = async() => {
			const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
			console.log(result);
			finalImgValue.value = result.map(item => item.data).join(',');
			pushData();
	};

	const pushData = async() => {
				
		let param = {
			
			user_id:storage.getUserId(),
			user_name:storage.getRealName(),
			house_name:house_name.value,
			house_id:house_id.value,
			user_mobile:storage.getPhone(),
			type:storage.getLoginType(),
			pic:finalImgValue.value,
			sign_pic:sign_pic.value,
		};
		try {
							
			
			const res = await MineHouseInformationSubmitHseContract(param);
								
				console.log(res);
				uni.navigateBack();
			
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
          .formView{
            display: flex;
          	 flex-direction: row;
          	 width: 100%;
          	 height: 40px;
          	 background-color: white;
          	 margin-top: 10px;
          	 
          }
		 .footer-container {
		   position: fixed;
		   bottom: 0;
		   left: 0;
		   right: 0;
		   height: 70px;
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
		  .imagechooseView{
		  	margin-top: 20px;
		  	margin-left: 5%;
		  	width: 90%;
		  	height: 100px;
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
    }
</style>