<template>
  <view class="main">
    <!-- 顶部导航栏 -->
    <u-navbar
      title="填写公司信息"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff; font-size: 17px; font-weight: 500;"
    >
      <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>

    <!-- 表单主容器 -->
    <view class="content-container">
      
      <!-- ================= 模块一：土地租赁方 ================= -->
      
	  <view class="section-card">
	    <!-- 模块标题栏 -->
	    <view class="section-header">
	      <view class="section-bar"></view>
	      <text class="section-title">租赁公司</text>
	    </view>
	    <!-- 表单列表 -->
	    <view  class="form-list">
			  <view class="form-item" >
				<text class="item-label">公司名称</text>
				<input
				  v-model="com_name"
				  class="item-input"
				  placeholder="请填写"
				  placeholder-style="color: #999999; font-size: 14px;"
				  
				/>
			  </view>
			  <view class="form-item" >
				<text class="item-label">法人名</text>
				<input
					  v-model="name"
				  class="item-input"
				  placeholder="请填写"
				  placeholder-style="color: #999999; font-size: 14px;"
				  
				/>
			  </view>
			  <view class="form-item" >
				<text class="item-label">法人身份证号</text>
				<input
				  v-model="card"
				  class="item-input"
				  placeholder="请填写"
				  placeholder-style="color: #999999; font-size: 14px;"
				  
				/>
			  </view>
	  		  <view class="form-item" >
	  		    <text class="item-label">法人联系电话</text>
	  		    <input
	  			  v-model="mobile"
	  		      class="item-input"
	  		      placeholder="请填写"
	  		      placeholder-style="color: #999999; font-size: 14px;"
	  		      
	  		    />
	  		  </view>
			  <view class="form-item" >
			    <text class="item-label">营业执照编号</text>
			    <input
			  	  v-model="com_number"
			      class="item-input"
			      placeholder="请填写"
			      placeholder-style="color: #999999; font-size: 14px;"
			      
			    />
			  </view>
			  <view class="form-item" >
			    <text class="item-label">公司地址</text>
			    <input
			  	  v-model="com_address"
			      class="item-input"
			      placeholder="请填写"
			      placeholder-style="color: #999999; font-size: 14px;"
			      
			    />
			  </view>
			  <view class="form-item" >
			    <text class="item-label">公司详细地址</text>
			    <input
			  	  v-model="detailaddress"
			      class="item-input"
			      placeholder="请填写"
			      placeholder-style="color: #999999; font-size: 14px;"
			      
			    />
			  </view>
	  		 
	    </view>
	  </view>

      <!-- 区块间隔灰条 -->
      <view class="section-gap"></view>
      
      <!-- ================= 模块三：土地租赁方签名 ================= -->
      <view class="section-card">
        <view class="section-header">
          <view class="section-bar"></view>
          <text class="section-title">上传营业执照</text>
        </view>
       <view style="width: 100%;height: 200px;margin-top: 20px;">
       	<view class="imagechooseView" @click="yingyeselect">
       		<view v-if="yingyetempFilePaths.length == 0" class="yingyecustom-upload-btn">
       		  <image :src="yingyelicense" ></image>
       		</view>
       		<view v-if="yingyetempFilePaths.length > 0" class="ChoseenView">
       			<view class="yingyeimageItemV" v-for="(item,index) in yingyetempFilePaths" :key="index">
       				<image style="width: 150px;height: 180px;" :src="item" ></image>
       			</view>
       		</view>
       	</view>
       </view>
      </view>
      

	  <view class="protocalView">
		  <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		  <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		  <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		  <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick">《{{agreement_name}}》</view>
	  </view>

      <!-- ================= 底部提交按钮 ================= -->
     
	  <view class="btn-container" >
	    <view class="submit-btn" @click="signClick">提交审核</view>
	  </view>

    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref,onMounted,onUnmounted } from 'vue';
	import {GetAgreemente,
	MineLandrentGetLandWaitListSubmitComInfo,
	MineLandrentGetLandWaitListHisGetSponsorLandRentOrderInfo,
	MineLandrentGetLandWaitListHisGetOwnerLandRentOrderInfo,
	MineLandrentGetLandWaitListHisLandRentOrderPay} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseImgURL,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

	// 导航栏背景主题色（#2A9595）
	const bgColor = ref("#2A9595");
	const isAgreed = ref(false);
	const isViewMode = ref(false);
	const pageData = ref({});
	const name = ref();
	const card = ref();
	const mobile = ref();
	const com_name = ref();
	const com_number = ref();
	const com_address = ref();
	const detailaddress = ref();
	const rentImage = ref();
	const rentSign = ref();
	const tranSign = ref();
	const selected = ref(false);
	const agreement_name = ref('');
	const agreement_content = ref('');
	const land_id = ref();
	const myOrgetOwner = ref();
	const order_id = ref();
	const type = ref();
	const yingyelicense = ref('/static/mine/yingyelicense.png');
	const imageValue = ref();
	const yingyeImageStyles = ref({
		width: 150,
		height: 180,
		border: {
			color: "lightgray",
			width: 2,
			style: 'dashed',
			radius: '2px'
		}
	});
	
	const yingyetempFilePaths = ref([]);
	
	const yingyePicUrl = ref('');
	
	onLoad((options: any)=>{
			
		myOrgetOwner.value = options.myOrgetOwner;
		order_id.value = options.order_id;
		type.value = options.type;
		console.log(type.value);
		
	});
	onMounted(() => {
		
		getAgreement();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
	  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
	
	const getAgreement = async() => {
			  
		
		try {
			let param = {
				type:'26',
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
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${26}`
		})
		
	};
	const yingyeselect = () => {
				
				
		 uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				yingyetempFilePaths.value = res.tempFilePaths;
				uploadYingYeFileImage();
			}
		});
	};
	const uploadYingYeFileImage = async() => {
		const result = await uploadMultipleFiles([],yingyetempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		yingyePicUrl.value = result.map(item => item.data).join(',');
	
	};
	// 顶部返回上一页
	const goBack = () => {
	  uni.navigateBack();
	};
	
	//记录用户是否勾选了
	const chooseselect = () => {
		selected.value = !selected.value
	};
	
	//签字
	const signClick = () => {
		
		if(com_name.value.length === 0){
			
			uni.showToast({
				title:'请输入请填写公司名称',
				icon:'none'
			})
			return
		}
		if(name.value.length === 0){
			
			uni.showToast({
				title:'请输入法人姓名',
				icon:'none'
			})
			return
		}
		if(card.value.length === 0){
			
			uni.showToast({
				title:'请输入法人身份证号',
				icon:'none'
			})
			return
		}
		if(mobile.value.length === 0){
			
			uni.showToast({
				title:'请输入法人联系电话',
				icon:'none'
			})
			return
		}
		if(com_number.value.length === 0){
			
			uni.showToast({
				title:'请输入营业执照编号',
				icon:'none'
			})
			return
		}	
		if(com_address.value.length === 0){
			
			uni.showToast({
				title:'请输入公司地址',
				icon:'none'
			})
			return
		}
		if(detailaddress.value.length === 0){
			
			uni.showToast({
				title:'请输入公司详细地址',
				icon:'none'
			})
			return
		}
		if(yingyePicUrl.value.length === 0){
			
			uni.showToast({
				title:'请选择营业执照',
				icon:'none'
			})
			return
		}
		if(selected.value === false){
			
			uni.showToast({
				title:'请同意土地流转协议',
				icon:'none'
			})
			return
		}
		uni.navigateTo({
		  url: "/pages/mine/SignPage/SignPage",
		});	
		
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		  
		rentSign.value = data[0];
		rentImage.value = BaseImgURL + data[0];
		console.log( rentSign.value);
		querenSetUpData()
	  };
	  
	};
	const querenSetUpData = async() => {
		
		
		
		try {
			let param = {
				
				user_id:storage.getUserId(),
				user_mobile:storage.getPhone(),
				com_name:com_name.value,
				name:name.value,
				card:card.value,
				mobile:mobile.value,
				com_number:com_number.value,
				com_address:com_address.value,
				full_address:detailaddress.value,
				number_pic:yingyePicUrl.value,
				sign_pic_com:rentSign.value,
			};
			MineLandrentGetLandWaitListSubmitComInfo(param).then((res) =>{
				
				console.log(res);
				
				if(res.success === true){
					
					uni.showToast({
						title:'提交成功',
						icon:'none'
					})
					uni.navigateBack();
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error)
		} 
		
	};

	
</script>

<style lang="scss" scoped>
/* 整个页面背景 */
.main {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 20px;
}

/* 主内容容器 */
.content-container {
  background-color: #ffffff;
}

/* 区块间隔灰条 */
.section-gap {
  height: 10px;
  background-color: #f7f8fa;
}

/* 各模块大卡片 */
.section-card {
  background-color: #ffffff;
  padding: 0 16px;
}

/* 模块标题栏（竖线 + 标题文字） */
.section-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0 12px 0;

  /* 墨绿色小竖条 */
  .section-bar {
    width: 4px;
    height: 16px;
    background-color: #2A9595;
    margin-right: 10px;
  }

  /* 标题文字 */
  .section-title {
    font-size: 15px;
    font-weight: 500;
    color: #333333;
  }
}

/* 表单列表容器 */
.form-list {
  display: flex;
  flex-direction: column;
}

/* 每一行表单条目 */
.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eeeeee;

  /* 每一行左侧标签文字（固定宽度 120px，保证右侧统一垂直对齐） */
  .item-label {
    width: 120px;
    font-size: 14px;
    color: #333333;
    flex-shrink: 0;
  }

  /* 右侧输入框（占位文字） */
  .item-input {
    flex: 1;
    font-size: 14px;
    color: #333333;
  }

  /* 右侧已填只读数据文字（如身份证号、姓名等） */
  .item-value {
    flex: 1;
    font-size: 14px;
    color: #7d7d7d;
  }
}

/* 签名区域留白容器 */
.signature-box {
  width: 100%;
  height: 110px;
}

/* 协议勾选行 */
.agreement-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 16px 16px 16px;

  /* 方形未勾选框 */
  .checkbox-box {
    width: 15px;
    height: 15px;
    border: 1.5px solid #757575;
    border-radius: 2px;
    margin-right: 8px;
    box-sizing: border-box;
  }

  /* 正常文字 */
  .agreement-text {
    font-size: 13px;
    color: #757575;
  }

  /* 蓝色链接文字 */
  .agreement-link {
    font-size: 13px;
    color: #2979ff;
  }
}

/* 底部操作按钮容器 */
.btn-container {
  padding: 10px 16px 20px 16px;
}

/* 去签字按钮 */
.submit-btn {
  width: 100%;
  height: 46px;
  background-color: #2A9595;
  color: #ffffff;
  font-size: 17px;
  font-weight: 500;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(42, 149, 149, 0.2);

  &:active {
    opacity: 0.9;
  }
}
  /* 方形勾选框 */
  .checkbox-box {
    width: 15px;
    height: 15px;
    border: 1.5px solid #757575;
    border-radius: 2px;
    margin-right: 8px;
    box-sizing: border-box;
    /* 让对勾图标水平和垂直死死居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* checked(选中状态时的样式)：背景变墨绿，边框也变墨绿 */
    &.checked {
      background-color: #2A9595;
      border-color: #2A9595;
    }
  }
  /* 签名区域留白容器 */
.signature-box {
  width: 100%;
  height: 110px;
  /* 下面三行是为了让图片和文字居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 签名图片的样式 */
.sign-img {
  width: 120px;
  height: 60px;
}
/* 提示文字的样式 */
.sign-tip {
  font-size: 14px;
  color: #c0c4cc;
}
 .protocalView{
   display: flex;
   flex-direction: row;
   width: 100%;
  }
  .imagechooseView{
         
          margin-left: 120px;
          width: 120px;
          height: 200px;
  }
  .yingyecustom-upload-btn {
  	margin-top: 20px;
    width: 120px;
    height: 160px;
    // background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .yingyecustom-upload-btn image {
    width: 100%;
    height: 100%;
  }
  .personchooseView{
  	margin-top: 10px;
  	margin-left: 5%;
  	width: 90%;
  	height: 100px;
  }
  .custom-upload-btn {
    width: 80px;
    height: 80px;
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
  .yingyeimageItemV{
  	
  	width:180px;
  	height: 180px;
  	margin-top: 10px;
  	box-sizing: border-box;
  }
  .imageItemV{
  		   
  		   
     width:80px;
     height: 80px;
     margin-top: 10px;
     box-sizing: border-box;
  }

</style>
