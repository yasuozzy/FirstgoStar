<template>
    <view class="main">
        <u-navbar
          title="申请平台介入"
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
		<view class="goodsItem" >
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="itemData.img"
			  width="80px"
			  height="80px"
			></u-image>
			<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
				<view style="font-size: 13px;">{{itemData.name}}</view>
					
				<view style="font-size: 13px;text-align: right;width: 100%;">{{itemData.price}}元</view>
				
				<view style="font-size: 13px;text-align: right;width: 100%;">x{{itemData.nums}}</view>
				
				<view style="font-size: 13px;margin-top: 5px;margin-bottom: 10px;">{{itemData.specs}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 200px;background-color: white;">
			<view style="font-size: 13px;margin-left: 15px;height: 5px;"></view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">问题描述</view>
			<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 80px;font-size: 13px;" v-model="content" placeholder="填写介入原因">
			        </textarea>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">上传凭证</view>
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
		</view>
		<view style="width: 100%;height: 30px;background-color: white;">
			<view style="font-size: 12px;margin-top: 10px;margin-left: 15px">{{cutinTips}}</view>
		</view>
		<view class="buttonView" @click="gotoRegister">立即申请</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import {MineCircleAplyPlatCutInSetUpData} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const listData = ref({});
	const itemData = ref({});
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
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const cutinTips = ref('说明：当与商家协调无果或48小时不予处理可申请平台介入，平台接到您的争议订单后将于24小时内反馈跟踪结果并实时通知到您。');
	const content = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
           
	onLoad((options:any) => {
		listData.value = JSON.parse(options.listData);
		console.log(listData.value);
		itemData.value = listData.orderDetailAry[0];
		
	});
       
	const gotoRegister = () => {
				
					
		if (tempFilePaths.value.length > 0) {
			
			console.log(tempFilePaths.value);
			uploadFileImage();
			
			
		}else
		{
			//提交数据
			pushData();
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
	
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');
	
	};
	const pushData = async() => {
		
		if (content.value === '') {
			
			uni.showToast({
				title:'请输入问题说明',
				icon:'none',
			})
			return;
		}
		if (finalImgValue.value === '') {
			
			uni.showToast({
				title:'请上传图片',
				icon:'none',
			})
			return;
		}
		try {
							
			let param = {
				
				 userId:storage.getUserId(),
				 applyId:listData.applyId,
				 applyNo:listData.applyNo,
				 orderId:listData.orderId,
				 orderNo:listData.orderNo,
				 imgstr:finalImgValue.value,
				 content:content.value,
				
			};
			const res = await MineCircleAplyPlatCutInSetUpData(param);
								
			console.log(res);
			uni.showToast({
				title:res.message,
				icon:'none',
			});
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
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
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
	 .goodsItem{
	 		 display: flex;
	 		 flex-direction: row;
	 		 margin-top: 10px;
	 		 background-color: white;
	 }
	 .buttonView{
	           
	  margin-top: 70px;
	  background-color: #2A9595;
	  border-radius: 8px;
	  color: white;
	  font-size: 14px;
	  margin-left: 10%; 
	  margin-bottom: 20px;
	  display: flex;
	  justify-content: center; /* 水平居中 */
	  align-items: center;     /* 垂直居中 */
	  height: 40px;           /* 需要设置高度 */
	  width: 80%;             /* 需要设置宽度 */
	 }
    }
</style>