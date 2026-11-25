<template>
  <view class="main">
    <!-- 顶部导航栏 -->
    <u-navbar
      title="填写土地流转协议"
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
      				  v-model="companyData.com_name"
      				  class="item-input"
      				  placeholder="请填写"
      				  placeholder-style="color: #999999; font-size: 14px;"
      				  disabled="true"
      				/>
      			  </view>
      			  <view class="form-item" >
      				<text class="item-label">法人名</text>
      				<input
      					  v-model="companyData.name"
      				  class="item-input"
      				  placeholder="请填写"
      				  placeholder-style="color: #999999; font-size: 14px;"
      				  disabled="true"
      				/>
      			  </view>
      			  <view class="form-item" >
      				<text class="item-label">法人身份证号</text>
      				<input
      				  v-model="companyData.card"
      				  class="item-input"
      				  placeholder="请填写"
      				  placeholder-style="color: #999999; font-size: 14px;"
      				  disabled="true"
      				/>
      			  </view>
      		  <view class="form-item" >
      		    <text class="item-label">法人联系电话</text>
      		    <input
      			  v-model="companyData.mobile"
      		      class="item-input"
      		      placeholder="请填写"
      		      placeholder-style="color: #999999; font-size: 14px;"
      		      disabled="true"
      		    />
      		  </view>
      			  <view class="form-item" >
      			    <text class="item-label">营业执照编号</text>
      			    <input
      			  	  v-model="companyData.com_number"
      			      class="item-input"
      			      placeholder="请填写"
      			      placeholder-style="color: #999999; font-size: 14px;"
      			      disabled="true"
      			    />
      			  </view>
      			  <view class="form-item" >
      			    <text class="item-label">公司地址</text>
      			    <input
      			  	  v-model="companyData.com_address"
      			      class="item-input"
      			      placeholder="请填写"
      			      placeholder-style="color: #999999; font-size: 14px;"
      			      disabled="true"
      			    />
      			  </view>
      		  <view class="form-item" >
      		    <text class="item-label">租赁时间</text>
      		    <input
      			  v-model="rent_time"
      		      class="item-input"
      		      placeholder="请填写"
      		      placeholder-style="color: #999999; font-size: 14px;"
      		      
      		    />
      		  </view>
      		  <view class="form-item" >
      		    <text class="item-label">租赁费用</text>
      		    <input
      			  v-model="fee"
      		      class="item-input"
      		      placeholder="请填写"
      		      placeholder-style="color: #999999; font-size: 14px;"
      		      
      		    />
      		  </view>
        </view>
      </view>

      <!-- 区块间隔灰条 -->
      <view class="section-gap"></view>

      <!-- ================= 模块二：土地流转方 ================= -->
      <view class="section-card">
        <!-- 模块标题栏 -->
        <view class="section-header">
          <view class="section-bar"></view>
          <text class="section-title">土地流转方</text>
        </view>

        <!-- 表单列表 -->
        <view class="form-list">
          <!-- 1. 流转人姓名 -->
          <view class="form-item">
            <text class="item-label">流转人姓名</text>
            <text class="item-value">{{ landrentData.name }}</text>
          </view>

          <!-- 2. 流转人身份证号 -->
          <view class="form-item">
            <text class="item-label">流转人身份证号</text>
            <text class="item-value">{{ landrentData.idCard }}</text>
          </view>

          <!-- 3. 流转人联系电话 -->
          <view class="form-item">
            <text class="item-label">流转人联系电话</text>
            <text class="item-value">{{ landrentData.mobile }}</text>
          </view>

          <!-- 4. 土地位置 -->
          <view class="form-item">
            <text class="item-label">土地位置</text>
            <text class="item-value">{{ landrentData.location }}</text>
          </view>

          <!-- 5. 土地面积 -->
          <view class="form-item">
            <text class="item-label">土地面积</text>
            <text class="item-value">{{ landrentData.area }}</text>
          </view>
        </view>
      </view>

      <!-- ================= 模块三：土地租赁方签名 ================= -->
      <view class="section-card">
        <view class="section-header">
          <view class="section-bar"></view>
          <text class="section-title">土地租赁方签名</text>
        </view>
        <!-- 签名区域留白容器 -->
        <view class="signature-box">
          <image
            class="sign-img" 
            :src="rentImage" 
            mode="aspectFit" 
          ></image>
          <!-- <text v-if="!isViewMode" class="sign-tip">点击此处进行手写签名</text> -->
        </view>
      </view>

      <!-- ================= 模块四：土地流转方签名 ================= -->
      <view class="section-card">
        <view class="section-header">
          <view class="section-bar"></view>
          <text class="section-title">土地流转方签名</text>
        </view>
        <!-- 签名区域留白容器 -->
        <view class="signature-box">
			<image
			  class="sign-img" 
			  :src="tranSign" 
			  mode="aspectFit" 
			></image>
		</view>
      </view>

	  <view class="protocalView">
		  <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		  <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		  <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		  <view style="font-size: 12px;color: royalblue;margin-top: 13px;"  @click="agreementClick">《{{agreement_name}}》</view>
	  </view>

      <!-- ================= 底部提交按钮 ================= -->
      <view class="btn-container" v-if="!isViewMode || pageData.needSign">
        <view class="submit-btn" @click="signClick">去签字</view>
      </view>

    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref,onMounted,onUnmounted } from 'vue';
	import {GetAgreemente,
	MineLandrentGetLandWaitListSubmitLandRentOrder,
	MineLandrentGetLandWaitListgetSubmitComInfo,
	MineLandrentGetLandWaitListGetLandRentInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
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
	const rent_time = ref();
	const fee = ref();
	const rentImage = ref();
	const rentSign = ref();
	const tranSign = ref();
	const selected = ref(false);
	const agreement_name = ref('');
	const agreement_content = ref('');
	const land_id = ref();
	const companyData = ref();
	const landrentData = ref();
	
	onLoad((options: any)=>{
		
		if(options && options.info) {
			
			land_id.value = options.land_id;
			console.log(land_id.value);
		}
	});
	onMounted(() => {
		
		getAgreement();
		getCompanyInformation();
		getLandRentInformation();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
	  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
	
	const getCompanyInformation = async() => {
		
		try {
			
			let param = {
				
				land_id:land_id.value,
				user_id:storage.getUserId()
				
			};
			const res = await MineLandrentGetLandWaitListgetSubmitComInfo(param);
							
			console.log(res);
			companyData.value = res.result;
			// orderDict.value = res.result.orderDetailAry[0];
			
		}catch (error) {
			console.log(error)
		}
		
	};
	const getLandRentInformation = async() => {
		
		try {
			
			let param = {
				
				land_id:land_id.value
				
			};
			const res = await MineLandrentGetLandWaitListGetLandRentInfo(param);
							
			console.log(res);
			landrentData.value = res.result;
			// orderDict.value = res.result.orderDetailAry[0];
			
		}catch (error) {
			console.log(error)
		}
	};
	       
	const getAgreement = async() => {
			  
		
		try {
			let param = {
				type:'24',
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
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${24}`
		})
		
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
		
		
		if(rent_time.value.length === 0){
			
			uni.showToast({
				title:'请输入租赁时间',
				icon:'none'
			})
			return
		}	
		if(fee.value.length === 0){
			
			uni.showToast({
				title:'请输入租赁费用',
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
				
				type:0,
				sponsor_id:storage.getUserId(),
				land_user_id:landrentData.value.land_user_id,
				land_id:land_id.value,
				com_name:companyData.value.com_name,
				name:landrentData.value.name,
				card:landrentData.value.card,
				mobile:landrentData.value.mobile,
				com_number:companyData.value.com_number,
				com_address:companyData.value.com_address,
				rent_time:rent_time.value,
				fee:fee.value,
				sign_pic_sponsor:rentSign.value,
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

</style>
