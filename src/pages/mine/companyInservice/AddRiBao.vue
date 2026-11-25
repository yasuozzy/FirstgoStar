<template>
    <view class="main">
        <u-navbar
          title="写日报"
          
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-top: 13px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">今日完成情况</view>
			</view>
			<textarea class="textAreaView" v-model="todayWork" placeholder="输入今日完成情况"></textarea>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">今日未完成情况</view>
			</view>
			<textarea class="textAreaView" v-model="todayWorkNfinish" placeholder="输入今日未完成情况"></textarea>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">明日工作计划</view>
			</view>
			<textarea class="textAreaView" v-model="tomorrowWork" placeholder="输入明日工作计划"></textarea>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">需协调工作</view>
			</view>
			<textarea class="textAreaView" v-model="needCoordinateWork" placeholder="输入需协调工作"></textarea>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;">备注</view>
			</view>
			<textarea class="textAreaView" v-model="remarks" placeholder="输入备注"></textarea>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">图片</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
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
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">附件</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view class="imagechooseView">
			<x-native-uploader v-if="filesName.length == 0"
			name="multipartFile" 
			fileType="all"
			:header="{}"
			:limit="1"
			:url="loadFileUrl"
			:formData="{ key: 'multipartFile' }"
			@success="onUploadSuccess"
			@fail="onUploadFail"></x-native-uploader>
			<view v-if="filesName.length > 0" style="display: flex;flex-direction: row;">
				<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;" src="/src/static/mine/wenjian.png"></image>
				<text style="margin-top: 10px;margin-left: 10px;">{{ filesName }}</text>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">发送到</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view
		  style="
		    display: flex;
		    flex-direction: row;
		    justify-content: space-between;
		    margin: 10px 15px;
		  "
		>
		  <view style="display: flex; flex-direction: row">
		    <view style="font-size: 18px; color: #999">·</view>
		    <view>接收人</view>
		  </view>
		  <view
		    style="
		      border: 1px dashed #999;
		      border-radius: 90px;
		      width: 20px;
		      height: 20px;
		      text-align: center;
		      line-height: 20px;
		    "
		    @click="chooseReceiver()"
		  >
		    +
		  </view>
		</view>
		<view style="display: flex; flex-wrap: wrap; margin-left: 30px">
		  <view v-for="(item, index) in chaoSongContact" :key="index">
		    <view
		      style="
		        display: flex;
		        flex-direction: column;
		        justify-content: center;
		        margin-left: 10px;
		        margin-right: 10px;
		      "
		    >
		      <image
		        :src="item.headImage"
		        style="width: 30px; height: 30px;border-radius: 15px;"
		      ></image>
		      <view style="font-size: 9px;margin-top: 3px;">{{ item.username }}</view>
		    </view>
		  </view>
		</view>
		<view style="width: 100%;height: 70px;margin-top: 10px;background-color: white;"></view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="gotoRegister()">提交</view>
			 </view>
		</view>

</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideDailyReportWriteReport} from '@/api/mine';
	import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const estId = ref('');
	const todayWork = ref('');
	const todayWorkNfinish = ref('');
	const tomorrowWork = ref('');
	const needCoordinateWork = ref('');
	const remarks = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const selectList = ref([]);
	const filesPath = ref('');
	const filesName = ref('');
	const loadFileUrl = BaseURL + 'Announce/addUploadIms';
	const chaoSongContact = ref([]);
	const receivers = ref('');
           
	onMounted(() => {
	  eventBus.on("selecPerson", getPersonList);
	  
	});
	onUnmounted(() => {
	  eventBus.off("selecPerson", getPersonList);
	 
	});
	onLoad((options:any) => {
		estId.value = options.estId;
	});
    const onUploadSuccess = (res:any) => {
	  console.log('上传成功', res);
	  // 假设返回结构为 { data: '文件路径', ... }
	  const response = JSON.parse(res.response);
	  if (response.result == true) {
		filesPath.value = response.data;
		filesName.value = res.file.name;
		console.log(filesPath.value,filesName.value);
		uni.showToast({
			title:'文件上传成功',
			icon:'none'
		});

		
	  }
	};
	
	const onUploadFail = (err:any) => {
	  console.error('上传失败', err)
	};
        
	const gotoRegister = () => {
		
		if (todayWork.value.length == 0) {
			
			
			uni.showToast({
			  title: '请输入今日完成情况',
			  icon: "none",
			});
			
			return;
		}else if (selectList.value.length == 0) {
			
			uni.showToast({
			  title: '请选择接收人',
			  icon: "none",
			});
			
			return;
		}
		else {
			
			if (tempFilePaths.value.length == 0) {
				
				pushData();
				
			}else{
				
				console.log(tempFilePaths);
				uploadFileImage();
				
			}
			
			
		}
		
	};
	
	const pushData = async() => {
		
		try {
			
			let param = {
				
				createUserId:estId.value,
				todayWork:todayWork.value,
				userId:storage.getUserId(),
				todayWorkNfinish:todayWorkNfinish.value,
				tomorrowWork:tomorrowWork.value,
				needCoordinateWork:needCoordinateWork.value,
				remarks:remarks.value,
				filesPath:filesPath.value,
				pictursPath:finalImgValue.value,
				filesName:filesName.value,
				receivers:receivers.value,
			};			
			
			const res = await MineComInsideDailyReportWriteReport(param);
								
			console.log(res);
			uni.navigateBack();
			
		} catch (error) {
			console.log(error)
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

	//选择接收人
	const chooseReceiver = () => {
		uni.navigateTo({
			url:`/pages/mine/companyInservice/chooseJieShouPeople?estId=${encodeURIComponent(estId.value)}`
		})
	};
	const getPersonList = (data:any) => {
		console.log("接收到回传的数据:", data);
		const personList = [];
		for (var index = 0; index < data.length; index++) {
			var element = data[index];
			var newDict = {
				username:element.username,
				leaderUserId:element.leaderUserId,
				headImage:element.headImage
			};
			personList.push(newDict);
		}
		const userIdList = [];
		for (var i = 0; i < data.length; i++) {
			var element = data[i];
			userIdList.push(element.leaderUserId);
		}
		receivers.value = userIdList.join(',');
		console.log(receivers);
		chaoSongContact.value = personList;
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .textAreaView{
		 margin-top: 10px;
		 margin-left: 6%;
		 width: 88%;
		 
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