<template>
    <view class="main">
        <u-navbar
        title="土地流转"
        :safeAreaInsetTop="true"
        :placeholder="true"
        :fixed="true"
        :border="false"
        bgColor="#2A9595"
        titleStyle="color:#fff;font-weight:500;font-size:17px;"
        >
         <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>
    <!-- ================= 表单内容区域 ================= -->
    <view class="form-container">
      
      <!-- 1. 联系人姓名 -->
      <view class="form-item">
        <text class="item-label">联系人姓名</text>
        <input 
		  v-model="name"
          class="item-input" 
          type="text" 
          placeholder="请填写" 
		 
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- 2. 联系电话 -->
      <view class="form-item">
        <text class="item-label">联系电话</text>
        <input 
		  v-model="mobile"
          class="item-input" 
          type="number" 
          placeholder="请填写" 
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- 3. 身份证号 -->
      <view class="form-item">
        <text class="item-label">身份证号</text>
        <input 
		  v-model="idCard"
          class="item-input" 
          type="idcard" 
          placeholder="请填写" 
		  :disabled="type == 1"
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- 4. 土地位置 -->
      <view class="form-item">
        <text class="item-label">土地位置</text>
        <input 
		  v-model="location"
          class="item-input" 
          type="text" 
          placeholder="请填写" 
		  :disabled="type == 1"
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- 5. 土地面积 -->
      <view class="form-item">
        <text class="item-label">土地面积</text>
        <input 
		  v-model="area"
          class="item-input" 
          type="digit" 
          placeholder="请填写" 
		  :disabled="type == 1"
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- 6. 议价费用 -->
      <view class="form-item">
        <text class="item-label">议价费用</text>
        <input 
		  v-model="rent"
          class="item-input" 
          type="digit" 
          placeholder="请填写" 
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- 7. 备注 -->
      <view class="form-item">
        <text class="item-label">备注</text>
        <input 
		  v-model="remarks"
          class="item-input" 
          type="text" 
          placeholder="请填写" 
		  :disabled="type == 1"
          placeholder-style="color: #999999; font-size: 14px;"
        />
      </view>
      <!-- ================= 8. 证件图片上传区域 ================= -->
      <view class="upload-section">
        <view class="upload-title">证件图片</view>
        <!-- 灰色虚线相机方框 -->
        <!-- <view class="upload-box">
          <u-icon name="camera-fill" size="36" color="#999999"></u-icon>
        </view> -->
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
      <!-- ================= 9. 底部协议勾选 ================= -->
      <view class="protocalView">
		  <image style="margin-left: 10px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		  <image style="margin-left: 10px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		  <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		  <view style="font-size: 12px;color: royalblue;margin-top: 13px;"  @click="agreementClick">《{{agreement_name}}》</view>
      </view>

            <!-- ================= 10. 底部提交按钮 ================= -->      
        <view class="btn-container">              
        <view class="submit-btn" @click="tijiaoClick">提交</view>      
        </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	
	
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineLandrentGetLandWaitListNotesTiJiaoDetail,
	GetAgreemente,
	MineLandrentGetLandWaitListSubmitLandRentOrder,
	MineLandrentGetLandWaitListNotesEditSubmitLandRent} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	
	const agreement_name = ref('');
	const agreement_content = ref('');
	const linkId = ref();
	const dataDict = ref({});
	const type = ref();
	const selectphoto = ref('/static/mine/selectphoto.png');
	const tempFilePaths = ref([]);
	const finalImgValue = ref('');
	const selected = ref(false);
	const name = ref();
	const mobile = ref();
	const idCard = ref();
	const location = ref();
	const area = ref();
	const rent = ref();
	const remarks = ref();
	
	onLoad((options:any) => {
		linkId.value = options.linkId;
	});
	onMounted(() => {
		getAgreement();
		loadRentDetail();
	});
	const getAgreement = async() => {
			  
		
		try {
			let param = {
				type:'12',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const agreementClick = () => {
		
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${12}`
		})
		
	};
	const loadRentDetail = async() => {
		
		try {
			
			let param = {
				
				id:linkId.value?linkId.value:''
				
			};
			const res = await MineLandrentGetLandWaitListNotesTiJiaoDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			name.value = res.result.name;
			mobile.value = res.result.mobile;
			idCard.value = res.result.idCard;
			location.value = res.result.location;
			area.value = res.result.area;
			rent.value = res.result.rent;
			remarks.value = res.result.remarks;
			// pictrueArr.value = res.result.pictures;
			
		}catch (error) {
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
				uploadFileImage();
			}
		});
	};
	
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');

	};
	//记录用户是否勾选了
	const chooseselect = () => {
		selected.value = !selected.value
	};
	const tijiaoClick = async() => {
		
		if(name.value.length === 0){
			
			uni.showToast({
				title:'土地位置不能为空！',
				icon:'none'
			})
			return
		}	
		if(mobile.value.length === 0){
			
			uni.showToast({
				title:'联系电话不能为空！',
				icon:'none'
			})
			return
		}
		if(idCard.value.length === 0){
			
			uni.showToast({
				title:'身份证号不能为空！',
				icon:'none'
			})
			return
		}
		if(location.value.length === 0){
			
			uni.showToast({
				title:'土地位置不能为空！',
				icon:'none'
			})
			return
		}
		if(area.value.length === 0){
			
			uni.showToast({
				title:'土地面积不能为空！',
				icon:'none'
			})
			return
		}
		if(rent.value.length === 0){
			
			uni.showToast({
				title:'议价费用不能为空！',
				icon:'none'
			})
			return
		}
		if(finalImgValue.value.length === 0){
			
			uni.showToast({
				title:'请上传1-9张证件照！',
				icon:'none'
			})
			return
		}
		if(selected.value === false){
			
			uni.showToast({
				title:'请同意协议!',
				icon:'none'
			})
			return
		}
		
		if(type.value == 0){
			
			try {
				let param = {
					
					
					userId:storage.getUserId(),
					id:linkId.value,
					rent:rent.value,
					name:name.value,
					idCard:idCard.value,
					mobile:mobile.value,
					location:location.value,
					area:area.value,
					remarks:remarks.value,
					pictures:finalImgValue.value,
				};
				MineLandrentGetLandWaitListSubmitLandRentOrder(param).then((res) =>{
					
					console.log(res);
					
					if(res.success === false){
						
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}else
					{
						uni.showToast({
							title:'提交审核成功',
							icon:'none'
						})
						uni.navigateBack();
					}
					
				});
			} catch (error) {
				console.log(error)
			} 
		}else if(type.value == 1){
			
			try {
				let param = {
					
					userId:storage.getUserId(),
					id:linkId.value,
					rent:rent.value,
					name:name.value,
					idCard:idCard.value,
					mobile:mobile.value,
					location:location.value,
					area:area.value,
					remarks:remarks.value,
					pictures:finalImgValue.value,
				};
				MineLandrentGetLandWaitListNotesEditSubmitLandRent(param).then((res) =>{
					
					console.log(res);
					
					if(res.success === false){
						
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}else
					{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
						uni.navigateBack();
					}
					
				});
			} catch (error) {
				console.log(error)
			} 
		}
		
	};
	const goBack=()=>{
		uni.navigateBack({delta:1})
	}
</script>


<style scoped lang="scss">
/* 整个页面白色背景 */
.main {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 30px;
}
/* 表单容器 */
.form-container {
  padding: 0 16px;
  background-color: #ffffff;
}
/* 每一行输入条目 */
.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eeeeee;
  /* 左侧文字标签（固定宽度 100px 保证整齐） */
  .item-label {
    width: 100px;
    font-size: 15px;
    color: #333333;
    flex-shrink: 0;
  }
  /* 右侧输入框 */
  .item-input {
    flex: 1;
    font-size: 15px;
    color: #333333;
  }
}
/* 证件图片上传区块 */
.upload-section {
  padding-top: 16px;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 20px;
  .upload-title {
    font-size: 15px;
    color: #333333;
    margin-bottom: 16px;
  }
  /* 虚线相机框 */
  .upload-box {
    width: 84px;
    height: 84px;
    border: 1.5px dashed #cccccc;
    border-radius: 4px;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/* 协议勾选行 */
.agreement-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  /* 方形复选框 */
  .checkbox-box {
    width: 16px;
    height: 16px;
    border: 1.5px solid #666666;
    border-radius: 2px;
    margin-right: 8px;
    box-sizing: border-box;
  }
  .agreement-text {
    font-size: 13px;
    color: #666666;
  }
  .agreement-link {
    font-size: 13px;
    color: #2A9595;
  }
}
/* ================= 底部提交按钮样式 ================= */
.btn-container {  

     padding: 70px 24px 0px 24px; 
}

.submit-btn {  
width: 100%;  
height: 46px;  
background-color: #2A9595; /* 经典的墨绿色主题 */  
color: #ffffff;  
font-size: 17px;  
font-weight: 500;  
border-radius: 6px;    
/* 用 flex 魔法让里面的“提交”两个字完美居中 */  
display: flex;  
justify-content: center;  
align-items: center;
}

/* 按钮按下去的时候稍微变透明一点，增加点击手感 */
.submit-btn:active {  
opacity: 0.8;
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
	.protocalView{
	  display: flex;
	  flex-direction: row;
	  width: 100%;
	 }
</style>