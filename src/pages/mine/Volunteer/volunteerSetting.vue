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
		  <view slot="right" @click="saveClick">
		      <view class="homestayView">保存</view>
		  </view>
		</template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 75%;">头像</view>
			<view style="width: 40px;height: 40px;margin-top: 10px;display: flex;align-items: center;" @click="select">
				<image style="display: flex;align-items: center;margin-left: 10px;width: 35px;height: 35px;border-radius: 17.5px;"
				  :src="avatarSrc"
				></image>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="changeNickName">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">昵称</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{nickname}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="changeDeclaration">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">公益宣言</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{declaration}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">姓名</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{dataDict.name}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="gentleChange">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">性别</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{gentle}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view v-if="dataDict.card_type === '1'" style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">证件类型</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">身份证</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view v-else style="width: 100%;height: 50px;display: flex;flex-direction: row;" >
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">证件类型</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">护照</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">证件号码</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{dataDict.card_num}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">手机</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{phone}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;" @click="changeQQnumber">
			<view style="font-size: 14px;margin-top: 20px;margin-left: 15px;width: 50%;">QQ号码</view>
			<view style="font-size: 14px;width: 35%;text-align: right;margin-top: 20px;">{{qq_num ?qq_num : '暂无'}}</view>
			<image style="margin-top: 22px;margin-left: 15px;width: 8px;height: 12px;" :src="myarrow"></image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<u-modal :show="modelshow" @confirm="handleReason" title="昵称" confirm-text="提交" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="nickname" placeholder="请输入内容"></textarea>
			</view>
		</u-modal>
		<u-modal :show="declashow" @confirm="changedeclaration" title="公益宣言" confirm-text="提交" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="declaration" placeholder="请输入内容"></textarea>
			</view>
		</u-modal>
		<u-modal :show="QQshow" @confirm="changedeQQNum" title="QQ号码" confirm-text="提交" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="qq_num" placeholder="请输入内容"></textarea>
			</view>
		</u-modal>
		
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsVolunteerGetPersonalInfo,
	MineNeedToolsVolunteerUpdatePersonalInfo} from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const idstring = ref();
	const dataDict = ref({});
	const avatarSrc = ref<string>('');
	const imageValue = ref(undefined);
	const nickname = ref();
	const declaration = ref();
	const gentle = ref<string>('');
	const phone = ref<string>('');
	const birthday = ref<string>('');
	const gentleList = ref(['男', '女', ]);
	const qq_num = ref();
	const declashow = ref(false);
	const QQshow = ref(false);
	const imageStyles = ref({
		width:40,
		height:40,
		border:{
			radius:"50%" ,
			color:'#fff'
		},
	});
	const tempFilePaths = ref<any[]>([]);
	const myarrow = ref('/static/service/my_arrow.png');
	const modelshow = ref(false);
	const title = ref('');
	const content = ref();
	const changeType = ref();
	       
	onMounted(() => {
	  loadData();
	});
	
	const loadData = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId()
			};
			const res = await MineNeedToolsVolunteerGetPersonalInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			idstring.value = dataDict.value.id;
			avatarSrc.value = dataDict.value.head_img;
			nickname.value = dataDict.value.nick_name;
			declaration.value = dataDict.value.declaration;
			gentle.value = dataDict.value.sex;
			phone.value = dataDict.value.mobile;
			birthday.value = dataDict.value.birthday;
			qq_num.value = dataDict.value.qq_num;
			
		}catch (error) {
			console.log(error)
		}
	};
	const goBack = () => {
				
		uni.navigateBack();
	};
	//确定
	const saveClick = () => {
			
		if (tempFilePaths.value.length > 0) {
			
			console.log(tempFilePaths.value);
			uni.uploadFile({
				url: BaseURL +  'AppWorkOrder/addUploadIms', 
				filePath: tempFilePaths.value[0],
				name: 'multipartFile',
				formData: {
					type:"jpg",
				},
				success: (uploadFileRes:any) => {
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
			  id: idstring.value,
			  head_img:imageValue.value,
			  declaration:declaration.value,
			  nick_name:nickname.value,
			  sex:gentle.value,
			  qq_num:qq_num.value
			};
			const res = await MineNeedToolsVolunteerUpdatePersonalInfo(data1);
			  console.log(res);
			 uni.showToast({
			 	title:'保存成功',
			 	icon:'none'
			 });
			 uni.navigateBack();
			
		} catch (error) {
			console.log(error)
		}
	};
	//性别
	const gentleChange = () => {
		
		console.log(storage.getRealType());
		// const realType = getStorage<string>(storageKeys.realType,'');//(0未实名1已经实名)
		if (gentle.value === null) {
			
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
	const changeNickName = () => {
		
		modelshow.value = true;
	};
	const changeDeclaration = () => {
		
		declashow.value = true;
	};
	const changeQQnumber = () => {
		
		
		QQshow.value = true;
	};
	const handleReason = () => {
		
		modelshow.value = false;
		
	};
	const changedeclaration = () => {
		
		declashow.value = false;
	};
	const changedeQQNum = () => {
		QQshow.value = false;
	};
   
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
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
			 margin-left: 4%;
			 width: 92%;
			 height: 60px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		  }
}
</style>