<template>
  <view class="main">
    <!-- ================= 1. 顶部导航栏 ================= -->
    <u-navbar
      title="发布"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #fff; font-size: 16px; font-weight: 500;"
    >
      <!-- 左侧返回箭头 -->
      <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>

    <!-- ================= 2. 商品基础信息表单 ================= -->
    <view class="form-card">
      <!-- 1. 商品名称 -->
      <view class="form-item">
        <text class="item-label">商品名称</text>
        <input 
          class="item-input" 
          type="text" 
          placeholder="请填写" 
          placeholder-style="color: #999999; font-size: 15px;"
          v-model="serviceName"
        />
      </view>

      <!-- 2. 商品价格 -->
      <view class="form-item">
        <text class="item-label">商品价格</text>
        <input 
          class="item-input" 
          type="number" 
          placeholder="请填写" 
          placeholder-style="color: #999999; font-size: 15px;"
          v-model="price"
        />
      </view>

      <!-- 3. 商品描述 -->
      <view class="form-item no-border">
        <text class="item-label">商品描述</text>
        <input 
          class="item-input" 
          type="text" 
          placeholder="请填写" 
          placeholder-style="color: #999999; font-size: 15px;"
          v-model="description"
        />
      </view>
    </view>

    <!-- 中间灰色隔离带 -->
    <view class="section-gap"></view>

    <!-- ================= 3. 图片上传区域 ================= -->
    <view class="upload-card">
      <!-- 标题 -->
      <view class="upload-title">上传图片</view>
      
      <!-- 贯穿细分割线（已重新加回） -->
      <view class="divider"></view>
      
      <!-- 虚线相机上传框主体 -->
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

    <!-- ================= 4. 底部发布大按钮 ================= -->
    <view class="btn-container">
      <view class="submit-btn" @click="fabuClick">发布</view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	import {MineLifeServiceManageMentMyOrderListAddLsGood} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	const selectphoto = ref('/static/mine/selectphoto.png');
	const tempFilePaths = ref([]);
	const finalImgValue = ref('');
	const serviceName = ref();
	const price = ref();
	const description = ref();
	
	
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
	const fabuClick = async() => {
		
		if(serviceName.value.length === 0){
				   
		   uni.showToast({
			title:'请输入商品名称',
			icon:'none'
		   })
		   return
		}
		if(price.value.length === 0){
				   
		   uni.showToast({
			title:'请输入商品价格',
			icon:'none'
		   })
		   return
		}
		if(description.value.length === 0){
				   
		   uni.showToast({
			title:'请输入商品描述',
			icon:'none'
		   })
		   return
		}
		try {
			
			let param = {
				
				serviceName:serviceName.value,
				price:price.value,
				description:description.value,
				userId:storage.getUserId(),
				imgUrl:finalImgValue.value ? finalImgValue.value :''
			};
			const res = await MineLifeServiceManageMentMyOrderListAddLsGood(param);
							
			console.log(res);
			uni.showToast({
				title:'提交成功',
				icon:'none'
			})
			uni.navigateBack()
			
			
		}catch (error) {
			console.log(error)
		}
		
	};
	const goBack = () => {
	   uni.navigateBack()
	};
	

</script>

<style scoped lang="scss">
/* 页面整体浅灰背景 */
.main {
  min-height: 100vh;
  background-color: #f4f7f8;
}

/* 上半部分表单卡片 */
.form-card {
  background-color: #ffffff;
  padding: 0 16px;

  .form-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 78px; /* 上下边距加大 20px（从 58px 到 78px） */
    border-bottom: 1px solid #eeeeee;

    /* 最后一项去掉下边框 */
    &.no-border {
      border-bottom: none;
    }

    /* 左侧标签宽度加大到 110px，让“商品名称”和右侧“测试”拉开更宽的边距 */
    .item-label {
      width: 110px;
      font-size: 15px;
      color: #333333;
      flex-shrink: 0;
    }

    .item-input {
      flex: 1;
      font-size: 15px;
      color: #333333;
    }
  }
}

/* 中间灰色隔离缝隙 */
.section-gap {
  height: 12px;
  background-color: #f4f7f8;
}

/* 下半部分图片上传卡片 */
.upload-card {
  background-color: #ffffff;

  .upload-title {
    padding: 16px 16px;
    font-size: 15px;
    color: #333333;
  }

  /* 贯穿分割线 */
  .divider {
    height: 1px;
    background-color: #eeeeee;
  }

  .upload-body {
    padding: 36px 16px; /* 上下边距加大 20px（从 16px 到 36px） */

    /* 灰色虚线相机框（尺寸放大到 86x86px） */
    .camera-box {
      width: 86px;
      height: 86px;
      border: 1.5px dashed #cccccc;
      border-radius: 4px;
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

/* 底部发布按钮区域 */
.btn-container {
  padding: 36px 16px 30px 16px;

  .submit-btn {
    width: 100%;
    height: 48px;
    background-color: #2A9595; /* 经典墨绿 */
    color: #ffffff;
    font-size: 17px;
    font-weight: 500;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:active {
      opacity: 0.85;
    }
  }
}
.imagechooseView{
            margin-top: 10px;
            margin-left: 5%;
            width: 90%;
            margin-bottom: 40px;
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
</style>
