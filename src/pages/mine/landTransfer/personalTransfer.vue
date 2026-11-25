<template>
  <view class="main">
    <!-- 顶部导航栏 -->
    <u-navbar
      title="详情"
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

    <!-- 土地流转信息表单列表区域 -->
    <view class="form-container">
   
      <!-- 1. 联系人姓名 -->
      <view class="form-item" >
        <text class="item-label">联系人姓名</text>
        <text class="item-value">{{ dataDict.name }}</text>
      </view>
	  <view class="form-item" >
	    <text class="item-label">联系电话</text>
	    <text class="item-value">{{ dataDict.mobile }}</text>
	  </view>
	  <view class="form-item" >
	    <text class="item-label">身份证号</text>
	    <text class="item-value">{{ dataDict.idCard }}</text>
	  </view>
	  <view class="form-item" >
	    <text class="item-label">土地位置</text>
	    <text class="item-value">{{ dataDict.location }}</text>
	  </view>
	  <view class="form-item" >
	    <text class="item-label">土地面积</text>
	    <text class="item-value">{{ dataDict.area }}</text>
	  </view>
	  <view class="form-item" >
	    <text class="item-label">议价费用</text>
	    <text class="item-value">{{ dataDict.rent }}</text>
	  </view>
	  <view class="form-item" >
	    <text class="item-label">备注</text>
	    <text class="item-value">{{ dataDict.remarks }}</text>
	  </view>

    
    <!-- 底部操作按钮区域 -->
    <view class="btn-container" >
      <view class="submit-btn" @click="toSignAgreement">签订租赁协议</view>
    </view>
  </view>
  </view>
</template>

<script setup lang="ts">
	
	import { ref,onMounted } from 'vue';
	import {MineLandrentGetLandWaitListGetLandRentInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

	const bgColor = ref("#2A9595");
	const land_id = ref();
	const dataDict = ref({});
	
	
	onLoad((options:any) => {
		land_id.value = options.land_id;
	});
	onMounted(() => {
	  init();
	});
	   
	const init = async() => {
				
		try {
			
			let param = {
				
				land_id:land_id.value,
				
			};
			const res = await MineLandrentGetLandWaitListGetLandRentInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			// orderDict.value = res.result.orderDetailAry[0];
			
		}catch (error) {
			console.log(error)
		}
	};
	
	// 顶部返回上一页
	const goBack = () => {
	  uni.navigateBack();
	};

	const toSignAgreement = () => {
	  uni.navigateTo({
		url: `/pages/mine/landTransfer/leaseAgreement?info=${JSON.stringify(dataDict.value)}&land_id=${land_id.value}`
	  })
	};

	
</script>

<style lang="scss" scoped>
/* 整个页面背景容器 */
.main {
  min-height: 100vh;
  background-color: #ffffff;
}

/* 表单信息内容区域 */
.form-container {
  padding: 0 16px;
  background-color: #ffffff;
}

/* 每一行信息条目 */
.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eeeeee;

  /* 标签文字（如：联系人姓名、联系电话） */
  .item-label {
    width: 96px;
    font-size: 14px;
    color: #4d4d4d;
    flex-shrink: 0;
  }

  /* 详情数据内容 */
  .item-value {
    font-size: 14px;
    color: #7d7d7d;
    flex: 1;
  }
}

/* 底部操作按钮外层容器 */
.btn-container {
  padding: 40px 16px 30px 16px;
}

/* 签订租赁协议按钮 */
.submit-btn {
  width: 100%;
  height: 44px;
  background-color: #2A9595;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    opacity: 0.9;
  }
}
</style>
