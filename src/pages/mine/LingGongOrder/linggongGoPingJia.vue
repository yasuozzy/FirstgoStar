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
		<textarea class="textContentView" v-model="content" placeholder="评价内容"></textarea>
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
		<view style="display: flex;width: 100%;height: 10px;background-color: aliceblue;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">综合评价</view>
			<view style="margin-top: 15px;margin-left: 15px;">
				<u-rate :count="count" v-model="starvalue" size="22" active-color="#2A9595"></u-rate>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="gotoRegister()">发表评价</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunYuanUseWorkerCommentOrder} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const content = ref('');
	const idstring = ref('');
	const userType = ref('');
	const imageValue = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const count = ref(5);
	const starvalue = ref(5);
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
            
	onLoad((options:any) => {
		
		idstring.value = options.id;
		userType.value = options.userType;
	});
            
	const gotoRegister = async() => {
		
		if (content.value.length == 0) {
			
			// 状态错误处理
			uni.showToast({
			  title: '请填写评价',
			  icon: "none",
			});
			return;
			
		}else if(tempFilePaths.value.length == 0){
			
			uni.showToast({
			  title: '请选择图片',
			  icon: "none",
			});
			return;
		}
		else {
			
			console.log(tempFilePaths);
			uploadFileImage();
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
			fabiaoClick();
	};
	const fabiaoClick = async() => {
		
		try {
			let param = {
				id:idstring.value,
				pic:finalImgValue.value,
				score:starvalue.value,
				content:content.value,
				userType:userType.value,
			};
			MineJiuYeQunYuanUseWorkerCommentOrder(param).then((res) =>{
				
				console.log(res);
				uni.navigateBack();
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
          
	 .textContentView{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 200px;
		 
		 font-size: 13px;
	 }
	 .imagechooseView{
		margin-top: 10px;
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