<template>
    <view class="main">
        <u-navbar
          title="仅退款"
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
        <template #right>
              <view style="color: white;font-size: 14px;" slot="right" @click="tijiaoClick()">提交</view>
            </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
			<u-image
			:src="dataItem.goodImg.split(',')[0]?dataItem.goodImg.split(',')[0]:'/static/service/placeholder.png'"
			width="70px"
			height="70px"
			></u-image>
			<view class="allSpecsView">
				<view class="detailsView">
					<view style="font-size: 13px;font-weight: bold;margin-left: 15px;">{{dataItem.goodName}}</view>
					<view  style="font-size: 13px;color: black;margin-top: 20px;margin-left: 15px;">￥{{dataItem.price}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">退款说明</view>
			<input class="searchlocation" v-model="refund_reason" placeholder="请输入退款原因" type="text" />
		</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">退款金额</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;color: red;">￥{{dataItem.price}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">上传凭证</view>
		<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
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
   </view>
</template>

<script setup lang="ts">
	
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { MineServiceOrderListApplyAfterSale } from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow } from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const imageValue = ref();
	const dataItem = ref({});
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
	const refund_reason = ref('');

	onLoad((options:any) => {
		
		dataItem.value = JSON.parse(options.item);
		console.log(dataItem.value);
	});
	const fabiaopingjia = async() => {
		
		if (refund_reason.value.length == 0) {
			
			// 状态错误处理
			uni.showToast({
			  title: '请填写退款原因',
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
								tijiaoClick();
							}
						}
					});
					
				});
			
			}else{
				tijiaoClick();
			}
			
			
		}
		
	};
	const tijiaoClick = async() => {
		
		try {
			
			let param = {
				
				
				refund_img:finalImgValue.value?finalImgValue.value:'',
				refund_reason:contents.value,
				apply_user_id:storage.getUserId(),
				order_id:dataItem.value.orderId,
				order_no:dataItem.value.orderNo,
				provider_code:dataItem.value.shopCode,
				provider_name:dataItem.value.shopName,
				apply_user_name:storage.getRealName()?storage.getRealName():storage.getNickName,
			};
			MineServiceOrderListApplyAfterSale(param).then((res) =>{
							
				console.log(res);
				uni.showToast({
				  title: '申请提交成功',
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
			   width: 230px;
			   height: 25px;
			   margin-top: 10px;
			   border-radius: 5px;
			   font-size: 13px;
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