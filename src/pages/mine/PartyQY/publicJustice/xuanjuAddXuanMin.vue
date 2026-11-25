<template>
    <view class="main">
        <u-navbar
          title="新增选民"
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
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-left: 15px;margin-top: 15px;font-size: 15px;width: 100px;">参选人姓名</view>
			<input class="searchlocation" v-model="user_name" placeholder="请输入参选人姓名" type="text" />
		</view>		
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;font-size: 15px;width: 300px;margin-left: 15px;">参选人照片(一寸照片)</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
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
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-left: 15px;margin-top: 15px;font-size: 15px;width: 100px;">参选人简介</view>
		</view>
		<textarea class="textView" v-model="introduction" placeholder="输入参选人简介" ></textarea>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="saveClick()">保存</view>
			</view>
		</view>

</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad } from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const selectphoto = ref('/static/mine/selectphoto.png');
	const user_name = ref('');
	const photo_path = ref('');
	const introduction = ref('');
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
            
	onLoad((options:any) => {
		
		if (options.dataDict) {
			
			const newdata = JSON.parse(options.dataDict);
			user_name.value = newdata.user_name;
			photo_path.value = newdata.photo_path;
			introduction.value = newdata.introduction;
		}
	});
       
	const selectFile = () => {
			
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = res.tempFilePaths;
				uploadFileImage();
			}
		});
	};
	
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		photo_path.value = BaseImgURL + result.map(item => item.data).join(',');
	};
	const saveClick = () => {
				
		if ( user_name.value.length == 0) {
		
			uni.showToast({
				title:'请输入参选人姓名',
				icon:'none'
			});
			return;
			
		}else if ( photo_path.value.length == 0) {
			
			uni.showToast({
				title:'请选择参选人照片',
				icon:'none'
			});
			return;
			
		}else if ( introduction.value.length == 0) {
			
			uni.showToast({
				title:'请输入参选人简介',
				icon:'none'
			});
			return;
		
		}else{
			let dict = {user_name: user_name.value,photo_path: photo_path.value,introduction: introduction.value};
			eventBus.emit('refresh-address',dict);
			uni.navigateBack();
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
                    width: 250px;
                    height: 35px;
                    margin-top: 10px;
                    border-radius: 5px;
                    font-size: 13px;
            }
			.imagechooseView{
			            margin-top: 10px;
			            margin-left: 5%;
			            width: 90%;
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
			.textView{
				margin-top: 10px;
				margin-left: 4%;
				width: 92%;
				height: 100px;
				border: lightgray 1px solid;
				font-size: 13px;
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