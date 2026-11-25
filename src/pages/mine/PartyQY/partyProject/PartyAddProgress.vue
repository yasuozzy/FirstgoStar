<template>
	<view class="main">
	        <u-navbar
	          title="添加进展"
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
			<input class="searchlocation" v-model="title" placeholder="请输入进展标题" type="text" />
			<view style="margin-top: 15px;font-size: 14px;margin-left: 15px;">请选择上传附件(图片)</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
			<view class="imagechooseView" @click="select">
				<view class="custom-upload-btn">
				  <image :src="selectphoto" ></image>
				</view>
			</view>
			<textarea class="jinduTextView" v-model="summary" placeholder="请输入进度介绍"></textarea>
			<input class="searchlocation" v-model="address" placeholder="请输入地址" type="text" />
			<view class="endView">
				<view style="width: 85%;margin-top: 8px;" @click="endshow = true">{{done_date}}
					<u-datetime-picker style="margin-top: 5px;margin-left: 10px;background-color: red;"
					title="请选择完成日期"
					
								:show="endshow"
								v-model="value1"
								mode="date"
								@confirm="endConfirm"
								@cancel="endshow = false"
						></u-datetime-picker>
				</view>
				<image style="margin-left: 10px;margin-top: 14px;width: 15px;height: 8px;" :src="downImage" ></image>
			</view>
			<view class="buttonView" @click="finalClick">确认发布</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseURL } from '@/utils/storage';
	import { PartyBuildMyProjectAddProgress} from '@/api/mine';

	// 背景颜色
	const bgColor = ref("#FF0000");
	const title = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const imageValue = ref([]);
	const tempFilePaths = ref([]);
	const project_id = ref('');
	const picture = ref('');
	const summary = ref('');
	const address = ref('');
	const done_date = ref<string>('请选择完成日期');
	const gentleList = ref(['男', '女', ]);
	const endshow = ref(false);
	const value1 = ref<Number>(new Date());
	const downImage = ref('/static/home/downImage.png');
	
	onLoad((options:any) => {
		project_id.value = options.project_id;
		console.log(project_id.value);
	});
	//选择生日
	const endConfirm = (e:any) => {
		const date = new Date(e.value);
		done_date.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		endshow.value = false;
	};
	const select = (e:any) => {
		// console.log('选择文件：',e);
		// tempFilePaths.value = e.tempFilePaths;
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = <any[]>res.tempFilePaths;
				selectphoto.value = tempFilePaths.value[0];
				imageUpload();
			}
		});
	};
	//确定
	const imageUpload = () => {
			
		if (tempFilePaths.value.length > 0) {
			
			console.log(tempFilePaths.value);
			uni.uploadFile({
				url: BaseURL +  'Announce/addUploadIms', 
				filePath: tempFilePaths.value[0],
				name: 'multipartFile',
				formData: {
					type:"jpg",
				},
				success: (uploadFileRes) => {
					console.log(uploadFileRes.data);
					const responseData = JSON.parse(uploadFileRes.data);
					console.log(responseData);
					picture.value = responseData.data;
				},
				
			});
			
		}
		
		
	};
	const finalClick = async() => {
		
		if (title.value.length == 0) {
			
			uni.showToast({
				title:'请输入进展标题',
				icon:'none'
			})
		}else if (summary.value.length == 0) {
			
			uni.showToast({
				title:'请输入进度介绍',
				icon:'none'
			})
		}else if (address.value.length == 0) {
			
			uni.showToast({
				title:'请输入地址',
				icon:'none'
			})
		}else if (done_date.value === '请选择完成日期') {
			
			uni.showToast({
				title:'请选择完成日期',
				icon:'none'
			})
		}else if(picture.value.length == 0) 
		{
			
			uni.showToast({
				title:'请选择上传附件/图片',
				icon:'none'
			})
			
		}else
		{
			if (getStorage<string>(storageKeys.userId,'').length == 0) {
				
				uni.showToast({
					title:'请先实名',
					icon:'none'
				})
				return;
			}else
			{
				uni.showModal({
				                            
					cancelText:'取消',
					confirmText:'确定',
					confirmColor:'#2A9595',
					title:'确认发布',
					content:'',
					success(e) {
						console.log(e)
						if (e.confirm === true) {
							console.log('确定');
							uploadAllData();
						}else
						{
							console.log('取消')
						}
					}
				});
				
			}
			
		}
	};
	const uploadAllData = async() => {
		
		try {
			let param = {
				user_id:getStorage(storageKeys.userId,''),
				project_id:project_id.value,
				title:title.value,
				done_date:done_date.value,
				address:address.value,
				summary:summary.value,
				real_name:getStorage(storageKeys.realName,'')
			};
			const res = await PartyBuildMyProjectAddProgress(param);
			console.log(res);
			uni.showToast({
				title:'发布成功',
				icon:'none'
			});
			uni.navigateBack();
			
		} catch (error) {
			//TODO handle the exception
			console.log(error);
		}
		
	};
	const goBack = () =>{
		
		uni.navigateBack()
	};
	
</script>

<style>
	.main {
		
		 height: 100%;
		 background: white;
		 
	}
	.searchlocation{
		 margin-left: 4%;
		 width: 92%;
		 height: 35px;
		 margin-top: 20px;
		 border: 1px lightgray solid;
		 border-radius: 5px;
		 font-size: 14px;
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
	 .jinduTextView{
		 
		 margin-left: 4%;
		 width: 92%;height: 100px;
		 border: lightgray 1px solid;
		 font-size: 13px;
	 }
	 .endView{
	 		 
		margin-top: 15px;
		margin-left: 4%;
		width: 92%;
		height: 35px;
		font-size: 14px;
	 	border: lightgray 1px solid;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		text-align: left;
		align-items: left;
	}
	 .buttonView{
	              
		 margin-top: 30px;
		 background-color: red;
		 border-radius: 5px;
		 color: white;
		 font-size: 14px;
		 margin-left: 33.33%; 
		 display: flex;
		 justify-content: center; /* 水平居中 */
		 align-items: center;     /* 垂直居中 */
		 height: 40px;           /* 需要设置高度 */
		 width: 33.33%;             /* 需要设置宽度 */
	}


</style>