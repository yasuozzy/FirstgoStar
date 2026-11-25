<template>
    <view class="main">
        <u-navbar
          title="认证"
          
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
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">用户姓名</view>
			<input class="searchInputView" v-model="personname" placeholder="填写真实姓名" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">身份证号</view>
			<input class="searchInputView" v-model="idnum" placeholder="填写身份证号(非必填)" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 180px;font-size: 13px;">上传身份证照片</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="height: 130px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;" @click="zhengselect">
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseZheng"></image>
			</view>
			<view style="height: 130px;align-items: center;width: 100%;justify-content: center;display: flex;" @click="fanselect">
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseFan"></image>
			</view>
		</view>
		<view class="buttonView" @click="nextClick">下一步</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {PartyPublicDiscussComplaintAndAdviceRealHousing} from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const personname = ref('');
	const idnum = ref('');
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan= ref('/static/service/licenseFan.png');
	const idcard_positive = ref('');
	const idcard_negative = ref('');
	
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
				uploadZherngImage();
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
				idcard_negative.value = responseData.data;
				
			},
			
		});
	};
	const nextClick = async() => {
		
		if(personname.value.length == 0){
			
			uni.showToast({
				title:'houseInformation/realHousing',
				icon:'none'
			})
			
		}else{
			
			try {
				
				let param = {
					
					userid:storage.getUserId(),
					idnum:idnum.value,
					name:personname.value,
					portrait:idcard_positive.value,
					emblem:idcard_negative.value,
					
				};
				const res = await PartyPublicDiscussComplaintAndAdviceRealHousing(param);
								
				console.log(res);
				uni.showToast({
					title:'认证成功',
					icon:'none'
				})
				storage.saveRealType(1);
				storage.saveRealName(personname.value);
				uni.navigateTo({
				  url: "/pages/service/changeMainHouse",
				});
					
				
			}catch (error) {
				console.log(error)
			}
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
		  .searchInputView{
			   margin-left: 15px;
			   width: 230px;
			   height: 30px;
			   margin-top: 10px;
			   font-size: 13px;
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