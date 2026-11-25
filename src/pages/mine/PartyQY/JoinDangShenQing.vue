<template>
    <view class="main">
        <u-navbar
          title="入党申请"
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
		<view style="display: flex;flex-direction: row;width: 92%;height: 50px;background-color: white;margin-top: 30px;margin-left: 4%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80px;">姓名|</view>
			<input class="searchlocation" v-model="name" placeholder="请输入姓名" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 92%;height: 50px;background-color: white;margin-top: 15px;margin-left: 4%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80px;">身份证号|</view>
			<input class="searchlocation" v-model="id_card" placeholder="请输入身份证号" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 92%;height: 50px;background-color: white;margin-top: 15px;margin-left: 4%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80px;">户口所在地|</view>
			<input class="searchlocation" v-model="account_location" placeholder="请输入户口所在地" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 92%;height: 50px;background-color: white;margin-top: 15px;margin-left: 4%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 100px;">工作单位地址|</view>
			<input class="searchlocation" v-model="work_location" placeholder="请输入工作单位地址" type="text" />
		</view>
		<view style="margin-top: 20px;margin-left: 20px;font-size: 14px;width: 100px;">入党申请书</view>
		<view class="imagechooseView">
			<x-native-uploader v-if="application.length == 0"
			name="multipartFile" 
			fileType="all"
			:header="{}"
			:limit="1"
			:url="loadFileUrl"
			:formData="{ key: 'multipartFile' }"
			@success="onUploadSuccess"
			@fail="onUploadFail"></x-native-uploader>
			<view v-if="application.length > 0" style="display: flex;flex-direction: row;width: 100%;background-color: white;">
				<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;" src="/src/static/mine/wenjian.png"></image>
				<text style="margin-top: 10px;margin-left: 10px;margin-bottom: 15px;">{{ fileName }}</text>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 92%;height: 50px;background-color: white;margin-top: 15px;margin-left: 4%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 60px;">手机号|</view>
			<input class="phoneInput" v-model="mobile" placeholder="请输入手机号" type="text" />
		</view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 60px;">验证码|</view>			
			<input
			  class="codeinput"
			  placeholder="请输入验证码"
			  border="surround"
			  v-model="code"
			>
			  </input>
			  <view class="buttonCodeV" :class="{ disabled: isSending }" :style="{ pointerEvents: isSending ? 'none' : 'auto' }"  @click="getCode">{{codetips}}</view>
		</view>
		<view class="buttonView"  @click="tijiaoData">提交</view>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted, type Ref } from 'vue';
	import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
	import {MineJoinPartyShenQingJoinDang} from '@/api/mine';
	import {serviceFindActivityGetCode} from '@/api/service';
	import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';
	// 背景颜色
	const bgColor = ref("#FF0000");
	const name = ref('');
	const id_card = ref('');
	const account_location = ref('');
	const work_location = ref('');
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
	const application = ref('');//文件地址
	const mobile = ref('');//
	const code = ref('');//
	const codetips = ref('获取验证码');
	const countdown = ref(0);         // 倒计时秒数
	const isSending = ref(false);     // 按钮是否处于禁用状态
	let timer = null;                 // 定时器引用
    const loadFileUrl = BaseURL + 'Announce/addUploadIms';
	const fileName = ref('');
	//获取验证码
	const getCode = async() => {
		
		if (mobile.value.length === 0) {
			
			uni.showToast({
				title:'请输入手机号',
				icon:'none',
			})
			return;
		}
		  // 倒计时期间不允许点击 
		  if (isSending.value) return; 
		  isSending.value = true;
		  uni.showLoading({ title: "正在获取验证码" });
		  try {
			  
			let param = {
				phone:mobile.value,
				type:'11',
			};
			const res = await  serviceFindActivityGetCode(param);
							  
			 // 模拟接口延迟
			await new Promise(resolve => setTimeout(resolve, 1000)); 
			uni.showToast({ title: '验证码发送成功', icon: 'none' });
			    
			// 发送成功后，启动60秒倒计时
			countdown.value = 60;
			timer = setInterval(() => {
			countdown.value--;
			codetips.value = countdown.value + '秒';
			if (countdown.value <= 0) {
				clearInterval(timer);
			        timer = null;
			        isSending.value = false; // 倒计时结束，恢复可点击状态
					codetips.value = '获取验证码';
			     }
		    }, 1000);
			  
		  }catch (error) {
			  console.log(error)
			   uni.showToast({ title: '发送失败，请重试', icon: 'none' });
			   // 如果发送失败，允许用户立即重新点击
			   isSending.value = false; 
		  }finally {
			uni.hideLoading();
		  }
		
	};
	const tijiaoData = async() => {
		
		if (name.value.length === 0) {
			
			uni.showToast({
				title:'请输入真实姓名',
				icon:'none',
			})
			return;
		}
		if (mobile.value.length === 0) {
			
			uni.showToast({
				title:'请输入手机号',
				icon:'none',
			})
			return;
		}
		if (code.value.length === 0) {
			
			uni.showToast({
				title:'请输入验证码',
				icon:'none',
			})
			return;
		}
		if (id_card.value.length === 0) {
			
			uni.showToast({
				title:'请输入身份证号',
				icon:'none',
			})
			return;
		}
		if (account_location.value.length === 0) {
			
			uni.showToast({
				title:'请输入户口所在地',
				icon:'none',
			})
			return;
		}
		if (work_location.value.length === 0) {
			
			uni.showToast({
				title:'请输入工作单位地址',
				icon:'none',
			})
			return;
		}
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				name:name.value,
				mobile:mobile.value,
				id_card:id_card.value,
				application:application.value,
				code:code.value,
				account_location:account_location.value,
				work_location:work_location.value,
				
				
			};
			const res = await MineJoinPartyShenQingJoinDang(param);
							
			console.log(res);
			uni.showToast({
				title:'申请成功',
				icon:'none'
			});
			uni.navigateBack();
			
		}catch (error) {
			console.log(error)
		}
		
		
	};
	const onUploadSuccess = (res:any) => {
	  console.log('上传成功', res);
	  // 假设返回结构为 { data: '文件路径', ... }
	  const response = JSON.parse(res.response);
	  if (response.result == true) {
	    application.value = response.data;
		fileName.value = res.file.name;
		console.log(application.value,fileName.value);
		uni.showToast({
			title:'文件上传成功',
			icon:'none'
		});
	
		
	  }
	};
	
	const onUploadFail = (err:any) => {
	  console.error('上传失败', err)
	};
	const goBack = () =>{
		
		uni.navigateBack()
	};
</script>

<style lang="scss" scoped>
    .main {
         min-height: 100vh;
         width: 100%;
         background-color: aliceblue;
		 .flex{
		   display: flex;
		}
		.searchlocation{
			 margin-left: 15px;
			 width: 230px;
			 height: 30px;
			 margin-top: 10px;
			 font-size: 14px;
		}
		.imagechooseView{
			margin-top: 20px;
			margin-left: 5%;
			width: 90%;
			height: 100px;
		}
		.formView{
			 display: flex;
			 flex-direction: row;
			 width: 92%;
			 height: 50px;
			 background-color: white;
			 margin-top: 15px;
			 margin-left: 4%;
		}
		.buttonView{
		             
			margin-top: 50px;
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
		   .buttonCodeV{
			   
			   margin-top: 10px;
			   background-color: #2A9595;
			   border-radius: 5px;
			   color: white;
			   font-size: 12px;
			   margin-left: 10px; 
			   display: flex;
			   justify-content: center; /* 水平居中 */
			   align-items: center;     /* 垂直居中 */
			   height: 30px;           /* 需要设置高度 */
			   width: 80px;             /* 需要设置宽度 */
			   /* 优化点击体验 */
			   cursor: pointer; 
			   user-select: none; 
		   }
		   /* 倒计时中的禁用样式 */
		   .buttonCodeV.disabled {
		     margin-top: 10px;
		     background-color: gray;
		     border-radius: 5px;
		     color: white;
		     font-size: 12px;
		     margin-left: 10px; 
		     display: flex;
		     justify-content: center; /* 水平居中 */
		     align-items: center;     /* 垂直居中 */
		     height: 30px;           /* 需要设置高度 */
		     width: 80px;  
		     cursor: not-allowed;
		   }
		   .phoneInput{
			   margin-top: 15px;
			   width: 200px;
			   font-size: 14px;
		   }
		   .codeinput{
			   
			   margin-top: 15px;
			   width: 200px;
			   font-size: 14px;
		   }
    }
</style>