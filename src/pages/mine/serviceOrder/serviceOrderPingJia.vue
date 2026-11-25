<template>
    <view class="main">
        <u-navbar
          title="评价"
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
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;font-size: 13px;" v-model="contents" placeholder="聊聊本次服务您的感受"></textarea>
		
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
		
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;width: 60%;">评价</view>
			<view style="margin-top: 15px;margin-left: 15px;">
				<u-rate :count="count" v-model="point" size="22" active-color="#FFFF00" ></u-rate>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;width: 80%;">匿名评价</view>
			<switch color="#2A9595" :checked="is_anonymity" style="transform:scale(0.8);align-items: right;margin-top: 8px;" @change="switchChange" />
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="fabiaopingjia()">发表评价</view>
			</view>
		</view>
		
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineServiceOrderListLifeServiceEvaluate} from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const imageValue = ref();
	const dataItem = ref({});
	const recId = ref('');
	const contents = ref('');
	const point = ref(5);
	const skill_score = ref(5);
	const count = ref(5);
	const eva_picArr = ref([]);
	const selectphoto = ref('/static/mine/selectphoto.png');
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
	const is_anonymity = ref(true);

	onLoad((options:any) => {
		
		dataItem.value = JSON.parse(options.item);
		console.log(dataItem.value);
	});
	   
	        
	const fabiaopingjia = async() => {
		
		if (contents.value.length == 0) {
			
			// 状态错误处理
			uni.showToast({
			  title: '请填写评价',
			  icon: "none",
			});
			return;
			
		}
		else {
				
			if(tempFilePaths.value.length > 0){
				
				console.log(tempFilePaths.value);
				tempFilePaths.value.forEach((filePath,index) =>{
					
					uni.uploadFile({
						url: BaseURL +  'AppWorkOrder/addUploadIms', 
						filePath: filePath,
						name: 'multipartFile',
						formData: {
							type:"jpg",
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
							uploadedCount.value++;
							const responseData = JSON.parse(uploadFileRes.data);
							console.log(responseData);
							appendToImgValue(responseData.data, index);
							// imageValue = responseData.data;
							// uploadAllData();
							// pushData();
							 // 检查是否是最后一张图片
							if (uploadedCount.value = tempFilePaths.value.length) {
								pushData();
							}
						}
					});
					
				});
			
			}else{
				pushData();
			}
			
			
		}
		
	};
	const pushData = async() => {
		
		try {
			
			let param = {
				
				good_id:dataItem.value.goodId,
				img:finalImgValue.value?finalImgValue.value:'',
				point:point.value,
				good_name:dataItem.value.good_name,
				contents:contents.value,
				user_id:storage.getUserId(),
				order_id:dataItem.value.orderId,
				order_no:dataItem.value.orderNo,
				provider_code:dataItem.value.shopCode,
				provider_name:dataItem.value.shopName,
				is_anonymity:is_anonymity.value
			};
			MineServiceOrderListLifeServiceEvaluate(param).then((res) =>{
							
				console.log(res);
				uni.showToast({
				  title: '评价成功',
				  icon: "none",
				});
				uni.navigateBack();
			});
			
		}catch (error) {
			console.log(error)
		}
	};
	// 拼接图片地址到 finalImgValue
	const appendToImgValue = (imageUrl:any, currentIndex:any) => {
		  if (finalImgValue.value === '') {
			// 第一张图片，直接赋值
			finalImgValue.value = imageUrl
		  } else {
			// 后续图片，用逗号拼接
			finalImgValue.value += ',' + imageUrl
		}
	};
	const select = (e:any) =>{
		console.log('选择文件：',e);
		tempFilePaths.value = e.tempFilePaths;
	};
	const switchChange = (e:any) => {
		
		console.log(e);
		is_anonymity.value = e.detail.value;
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
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
}
</style>