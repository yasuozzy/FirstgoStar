<template>
    <view class="main">
        <u-navbar
          title="投诉建议"
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
          <view slot="right" @click="historyClick()">
              <u-image
                :src="mysuggest"
                width="15px"
                height="15px"
              ></u-image>
          </view>
		</template>
        </u-navbar>
		<view class="specsView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">投诉</view>
				<view v-else style="color: black;font-size: 13px;">投诉</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">建议</view>
				<view v-else style="color: black;font-size: 13px;">建议</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">表彰</view>
				<view v-else style="color: black;font-size: 13px;">表彰</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			
		</view>
		<view v-if="type == 1" style="display: flex;flex-direction: column;width: 100%;">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">投诉人员</view>
				<input class="searchlocation" v-model="complain_name" placeholder="填写" type="text" />
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">投诉内容</view>
				<input class="searchlocation" v-model="complain_content" placeholder="填写" type="text" />
			</view>
			<view style="margin-top: 15px;width: 100%;height: 10px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">上传图片</view>
				<view style="margin-top: 20px;font-size: 13px;color: red;">*</view>
			</view>
			<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
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
			<view class="buttonView" @click="tijiaoClick">提交</view>
		</view>
		<view v-if="type == 2" style="display: flex;flex-direction: column;width: 100%;">
			<textarea v-model="jianyiContent" style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;font-size: 13px;" placeholder="请填写具体建议内容">
			        </textarea>
			<view style="margin-top: 15px;width: 100%;height: 10px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">上传图片</view>
			</view>
			<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			<view class="imagechooseView" @click="selectAdviceFile">
				<view v-if="adVtempFilePaths.length == 0" class="custom-upload-btn">
				  <image :src="selectphoto" ></image>
				</view>
				<view v-if="adVtempFilePaths.length > 0" class="ChoseenView">
					<view class="imageItemV" v-for="(item,index) in adVtempFilePaths" :key="index">
						<image style="width: 80px;height: 80px;" :src="item" ></image>
					</view>
				</view>
			</view>
			<view class="buttonView" @click="tijiaoClick">>提交</view>
		</view>
		<view v-if="type == 3" style="display: flex;flex-direction: column;width: 100%;">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">表彰人员</view>
				<input class="searchlocation" v-model="biaozhangName" placeholder="填写" type="text" />
			</view>
			<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">表彰内容</view>
				<input class="searchlocation" v-model="biaozhangContent" placeholder="填写具体表彰内容" type="text" />
			</view>
			<view style="margin-top: 15px;width: 100%;height: 10px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 18px;margin-left: 15px;font-size: 13px;">上传图片</view>
				<view style="margin-top: 20px;font-size: 13px;color: red;">*</view>
			</view>
			<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			<view class="imagechooseView" @click="selectBiaoFile">
					<view v-if="BiaotempFilePaths.length == 0" class="custom-upload-btn">
					  <image :src="selectphoto" ></image>
					</view>
					<view v-if="BiaotempFilePaths.length > 0" class="ChoseenView">
						<view class="imageItemV" v-for="(item,index) in BiaotempFilePaths" :key="index">
							<image style="width: 80px;height: 80px;" :src="item" ></image>
						</view>
					</view>
				</view>
			<view class="buttonView" @click="tijiaoClick">>提交</view>
		</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys,uploadMultipleFiles } from '@/utils/storage';
	import {MinePartyWangGeSuggestAdvice} from '@/api/mine';
	
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const mysuggest  =ref('/static/mine/mysuggest.png');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const type = ref(1);
	const complain_name = ref('');
	const complain_content = ref('');
	const imageValue = ref([]);
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
	const jianyiContent = ref('');
	const tempFilePaths= ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const biaozhangName = ref('');
	const biaozhangContent = ref('');
	
	const adVtempFilePaths = ref([]);
    const finalAdvImgValue = ref('');  
	
	const BiaotempFilePaths = ref([]);
	const finalBiaoImgValue = ref('');  
        
	const segment1Click = () => {
		
		type.value = 1;
	};
	const segment2Click = () => {
		
		type.value = 2;
	};
	const segment3Click = () => {
		
		type.value = 3;
	};
	//提交
	const tijiaoClick = async() => {
		
		if (type.value == 1) {
			
			if(complain_name.value.length == 0){
				
				uni.showToast({
					title:'请输入投诉人员',
					icon:'none'
				})
				return;
			}
			if(complain_content.value.length == 0){
				
				uni.showToast({
					title:'请输入投诉内容',
					icon:'none'
				})
				return;
			}
			if(finalImgValue.value.length == 0){
				
				uni.showToast({
					title:'请选择图片',
					icon:'none'
				})
				return;
			}
			uploadFileImage(1);
			
			
		}else if(type.value == 2){
			
			if(jianyiContent.value.length == 0){
				
				uni.showToast({
					title:'填写具体建议内容',
					icon:'none'
				})
				return;
			}
			uploadFileImage(2);
			
		}else if(type.value == 3){
			
			if(biaozhangName.value.length == 0){
				
				uni.showToast({
					title:'请输入表彰人员',
					icon:'none'
				})
				return;
			}
			if(biaozhangContent.value.length == 0){
				
				uni.showToast({
					title:'请输入表彰内容',
					icon:'none'
				})
				return;
			}
			if(finalImgValue.value.length == 0){
				
				uni.showToast({
					title:'请选择图片',
					icon:'none'
				})
				return;
			}
			uploadFileImage(3);
			
		}
		
	};
	const uploadFileImage = async(type:any) => {
			const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
			console.log(result);
			if(type == 1){
				
				finalImgValue.value = result.map(item => item.data).join(',');
				
			}else if(type == 2){
				
				finalAdvImgValue.value = result.map(item => item.data).join(',');
				
			}else if(type == 3){
				
				finalBiaoImgValue.value = result.map(item => item.data).join(',');
			}
			
			uploadAllDatas(type);
	};
	
	const uploadAllDatas = async(type:any) => {
		
		if(type == 1){
			
			try {
				
				let param = {
					complain_name:this.complain_name,
					complain_content:this.complain_content,
					img:this.finalImgValue,
					type:type,
					userid:storage.getUserId(),
					manId:storage.getManid(),
				};
				MinePartyWangGeSuggestAdvice(param).then((res) =>{
								
					console.log(res);
					uni.navigateBack();
				});
			} catch (error) {
				console.log(error)
			}
		}else if(type == 2){
			
			try {
				
				let param = {
					
					complain_content:this.jianyiContent,
					img:this.finalAdvImgValue,
					type:type,
					userid:storage.getUserId(),
					manId:storage.getManid(),
				};
				MinePartyWangGeSuggestAdvice(param).then((res) =>{
								
					console.log(res);
					uni.navigateBack();
				});
			} catch (error) {
				console.log(error)
			}
		}else if(type == 3){
			
			try {
				
				let param = {
					complain_name:this.complain_name,
					complain_content:this.complain_content,
					img:this.finalBiaoImgValue,
					type:type,
					userid:storage.getUserId(),
					manId:storage.getManid(),
				};
				MinePartyWangGeSuggestAdvice(param).then((res) =>{
								
					console.log(res);
					uni.navigateBack();
				});
			} catch (error) {
				console.log(error)
			}
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
	
	const selectAdviceFile = () => {
			
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				adVtempFilePaths.value = res.tempFilePaths;
				
			}
		});
	};
	
	const selectBiaoFile = () => {
			
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				BiaotempFilePaths.value = res.tempFilePaths;
				
			}
		});
	};
	//历史记录
	const historyClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/PartyQY/tousujianyiHistory'
		})
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
		.specsView{
		 width: 100%;
		 height: 40px;
		 display: flex;
		 flex-direction: row;
		 
		 background-color: white;
		 margin-top: 10px;
		 }
		 .whiteLine{
			 margin-left: 35%;
			 margin-top: 7px;
			 width: 30%;
			 height: 2px;
			 background-color: #2A9595;
		 }
		 .searchlocation{
		  margin-left: 10px;
		  width: 300px;
		  height: 35px;
		  margin-top: 10px;
		  font-size: 13px;
	  }
	  .imagechooseView{
		  margin-top: 10px;
		  margin-left: 5%;
		  width: 90%;
		  height: 100px;
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