<template>
    <view class="main">
        <u-navbar
          title="发布需求"
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
		<input class="searchlocation" v-model="title" placeholder="请输入需求标题" type="text" />
		<view class="chooseTimeView">
			<view style="margin-top: 10px;width: 100%;">
				<view class="startView" @click="show = true">{{startTime}}
					<u-datetime-picker
					title="请选择需求时间"
					
				                :show="show"
				                v-model="value1"
				                mode="datetime"
								@confirm="handleConfirm"
								@cancel="show = false"
				        ></u-datetime-picker>
				</view>
			</view>
		</view>
		<view class="formView">
			
			<view style="margin-top: 15px;width: 80%;font-size: 14px;height: 30px;margin-left: 15px;">请上传需求图片</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
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
		<textarea class="TextView" v-model="content" placeholder="请输入需求简介">
		        </textarea>
		<view class="buttonView" @click="gotoRegister">确认发布</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import { MineJoinPartyFaBuNeeds} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#FF0000");
	const selectphoto = ref('/static/mine/selectphoto.png');
	const title = ref('');
	const startTime = ref("请选择需求时间");
	const show = ref(false);
	const value1 = ref(Number(new Date()));
	const imageStyles = ref({
		width:80,
		height:80,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const imageValue = ref([]);
	const tempFilePaths = ref([]);
	const uploadedCoun = ref(0);
	const finalImgValue = ref('');
	const content = ref('');
            
       
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startTime.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
		show.value = false;
	};
	const gotoRegister = () => {
				
		if (title.value.length == 0) {
			
			// 状态错误处理
			uni.showToast({
			  title: '请输入发布内容',
			  icon: "none",
			});
			return;
			
		}else if (startTime.value === '请选择需求时间') {
			
			uni.showToast({
			  title: '请选择需求时间',
			  icon: "none",
			});
			return;
			
		}else if (finalImgValue.value.length == 0) {
			
			uni.showToast({
			  title: '请上传需求图片',
			  icon: "none",
			});
			return;
		}else if (content.value.length == 0) {
			
			uni.showToast({
			  title: '请填写需求简介',
			  icon: "none",
			});
			return;
		}
		else {
				
			console.log(this.tempFilePaths);
			uploadFileImage();
			
		}
		
	};
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');
		pushData();
	};
	
	const selectFile = () => {
		
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = <[]>res.tempFilePaths;
				
			}
		});
	};
	const pushData = async() => {
		
		try {
							
			let param = {
				userId:getStorage(storageKeys.userId,''),
				userName:getStorage(storageKeys.realName,''),
				title:title.value,
				time:startTime.value,
				pic:finalImgValue.value,
				summary:content.value,
			};
			const res = await MineJoinPartyFaBuNeeds(param);
								
			console.log(res);
			
			uni.showToast({
			  title: '提交成功',
			  icon: "none",
			});
			uni.navigateBack();
			
		} catch (error) {
			console.log(error)
		}
	};
	const goBack = () => {
		
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
	 .searchlocation{
		  margin-left: 4%;
		  width: 92%;
		  height: 35px;
		  margin-top: 15px;
		  border: 1px lightgray solid;
		  border-radius: 5px;
		  font-size: 13px;
	}
	.chooseTimeView{
		margin-left: 4%;
		width: 92%;
		height: 35px;
		margin-top: 15px;
		border: 1px lightgray solid;
		border-radius: 5px;
		font-size: 13px;
	}.TextView{
		margin-top: 10px;
		margin-left: 4%;
		width: 92%;
		height: 100px;
		border: lightgray 1px solid;
		font-size: 13px;
	}
	.startView{
			
		 margin-top: 10px;
		 width: 100%;
		 font-size: 13px;
	}
	.formView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
	 }
	 .imagechooseView{
	 	margin-top: 20px;
	 	margin-left: 5%;
	 	width: 90%;
	 	height: 100px;
	 }
	 .buttonView{
	           
		  margin-top: 50px;
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
	 .codeinput{
	 				   
	   margin-top: 15px;
	   width: 200px;
	   font-size: 14px;
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