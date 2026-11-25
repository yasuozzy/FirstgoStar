<template>
    <view class="main">
        <u-navbar
          title="个人资料"
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
          <view slot="right" @click="sureClick">
              <view class="homestayView">确定</view>
          </view>
		</template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 80%;">头像</view>
			<view style="width: 40px;height: 40px;margin-top: 10px;display: flex;align-items: center;" @click="select">
				
				 <!-- <uni-file-picker  v-model="imageValue" -->
				            <!-- :limit="1" :del-icon="false" disable-preview :imageStyles="imageStyles"
				            					file-mediatype="image"@select="select"  > -->
							<u-image style="display: flex;align-items: center;margin-left: 10px;"
							  :src="avatarSrc"
							  width="35px"
							  height="35px"
							></u-image>
				<!-- </uni-file-picker> -->
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">昵称</view>
			<!-- <view style="font-size: 14px;width: 40%;text-align: right;margin-top: 20px;">{{nickname}}</view> -->
			<input class="searchlocation" v-model="nickname"  placeholder="请输入昵称" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="gentleChange">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">性别</view>
			<view style="font-size: 14px;width: 40%;text-align: right;margin-top: 20px;">{{gentle}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">手机</view>
			<view style="font-size: 14px;width: 40%;text-align: right;margin-top: 20px;">{{phone}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">生日</view>
			<!-- <view style="font-size: 14px;width: 40%;text-align: right;margin-top: 20px;">{{birthday}}</view> -->
			<view class="endView" @click="endshow = true">{{birthday}}
				<u-datetime-picker style="text-align: right;margin-top: 5px;"
				title="生日"
				
				            :show="endshow"
				            v-model="value1"
				            mode="date"
							@confirm="endConfirm"
							@cancel="endshow = false"
				    ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
	import { GetPersonalMessage } from "@/api/mine";
	
	
	// 背景颜色
	const bgColor = ref('#2A9595');
	const avatarSrc = ref<string>('');
	const imageValue = ref(undefined);
	const nickname = ref<string>('');
	const gentle = ref<string>('');
	const phone = ref<string>('');
	const birthday = ref<string>('');
	const gentleList = ref(['男', '女', ]);
	const endshow = ref(false);
	const value1 = ref<Number>(new Date());
	const imageStyles = ref({
		width:40,
		height:40,
		border:{
			radius:"50%" ,
			color:'#fff'
		},
	});
	const tempFilePaths = ref<any[]>([]);
           
	onMounted(() => {
	  init();
	});

	const init = () => {
			
		avatarSrc.value = getStorage(storageKeys.avatar,'');
		nickname.value = getStorage(storageKeys.nickName,'');
		gentle.value = getStorage(storageKeys.sex,'');
		phone.value = getStorage(storageKeys.phone,'');
		birthday.value = getStorage(storageKeys.birthday,'');
			
	};
	const goBack = () => {
				
		uni.navigateBack()
	};
	//确定
	const sureClick = () => {
			
		if (tempFilePaths.value.length > 0) {
			
			console.log(tempFilePaths.value);
			uni.uploadFile({
				url: BaseURL +  'AppWorkOrder/addUploadIms', 
				filePath: tempFilePaths.value[0],
				name: 'multipartFile',
				formData: {
					type:"jpg",
				},
				success: (uploadFileRes) => {
					console.log(uploadFileRes.data);
					const responseData = JSON.parse(uploadFileRes.data);
					console.log(responseData);
					imageValue.value = responseData.data;
					uploadAllData();
				},
				
			});
			
		}else
		{
			uploadAllData()
		}
	
	
	};
	const uploadAllData = async() => {
		
		try {
			
			let data1 = {
			  userId: getStorage(storageKeys.userId,''),
			  avatar:imageValue.value,
			  birthday:birthday.value,
			  nickName:nickname.value,
			  sex:gentle.value
			};
			const res = await GetPersonalMessage(data1);
			  console.log(res);
			  storage.saveAvatar(res.result.avatar);
			  avatarSrc.value = getStorage(storageKeys.avatar,'');
			  goBack();
			
			
		} catch (error) {
			console.log(error)
		}
	};
	//性别
	const gentleChange = () => {
		
		console.log(storage.getRealType());
		const realType = getStorage<string>(storageKeys.realType,'');//(0未实名1已经实名)
		if (realType === '0') {
			
			uni.showActionSheet({
				itemList: gentleList.value,
				success: (res) => {
					
					gentle.value = gentleList.value[res.tapIndex]
					
				},
				fail: (res) => {
					console.log(res.errMsg);
				}
			});
			
		}else
		{
			uni.showToast({
				title:'性别不可修改',
				icon:'none',
				duration:1500,
			})
		}
	};
	//选择生日
	const endConfirm = (e) => {
		const date = new Date(e.value);
		birthday.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
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
				
			}
		});
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
	          
	          width: 40%;
	          height: 35px;
	          margin-top: 8px;
	          font-size: 14px;
			  text-align: right;
	}
	.endView{
			 
			 margin-top: 18px;
			 width: 40%;
			 height: 35px;
			font-size: 14px;
			
			align-items: right;
			text-align: right;
	}
    }
</style>