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
      <view v-if="type == 1" class="section-card">
        <!-- 模块标题栏 -->
        <view class="section-header">
          <view class="section-bar"></view>
          <text class="section-title">土地租赁方</text>
        </view>
        <!-- 表单列表 -->
        <view  class="form-list">
          <!-- 1. 租赁人姓名 -->
          <view class="form-item" >
            <text class="item-label">租赁人姓名</text>
            <input
			  v-model="pageData.name"
              class="item-input"
              placeholder="请填写"
              placeholder-style="color: #999999; font-size: 14px;"
              disabled="true"
            />
          </view>
		  <view class="form-item" >
		    <text class="item-label">租赁人身份证号</text>
		    <input
		      v-model="pageData.card"
		      class="item-input"
		      placeholder="请填写"
		      placeholder-style="color: #999999; font-size: 14px;"
		      disabled="true"
		    />
		  </view>
		  <view class="form-item" >
		    <text class="item-label">租赁人联系电话</text>
		    <input
			  v-model="pageData.mobile"
		      class="item-input"
		      placeholder="请填写"
		      placeholder-style="color: #999999; font-size: 14px;"
		      disabled="true"
		    />
		  </view>
		  <view class="form-item" >
		    <text class="item-label">租赁时间</text>
		    <input
			  v-model="pageData.rent_time"
		      class="item-input"
		      placeholder="请填写"
		      placeholder-style="color: #999999; font-size: 14px;"
		      disabled="true"
		    />
		  </view>
		  <view class="form-item" >
		    <text class="item-label">租赁费用</text>
		    <input
			  v-model="pageData.fee"
		      class="item-input"
		      placeholder="请填写"
		      placeholder-style="color: #999999; font-size: 14px;"
		      disabled="true"
		    />
		  </view>
        </view>
      </view>
	  <view v-if="type == 0" class="section-card">
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
				  v-model="pageData.com_name"
				  class="item-input"
				  placeholder="请填写"
				  placeholder-style="color: #999999; font-size: 14px;"
				  disabled="true"
				/>
			  </view>
			  <view class="form-item" >
				<text class="item-label">法人名</text>
				<input
					  v-model="pageData.name"
				  class="item-input"
				  placeholder="请填写"
				  placeholder-style="color: #999999; font-size: 14px;"
				  disabled="true"
				/>
			  </view>
			  <view class="form-item" >
				<text class="item-label">法人身份证号</text>
				<input
				  v-model="pageData.card"
				  class="item-input"
				  placeholder="请填写"
				  placeholder-style="color: #999999; font-size: 14px;"
				  disabled="true"
				/>
			  </view>
	  		  <view class="form-item" >
	  		    <text class="item-label">法人联系电话</text>
	  		    <input
	  			  v-model="pageData.mobile"
	  		      class="item-input"
	  		      placeholder="请填写"
	  		      placeholder-style="color: #999999; font-size: 14px;"
	  		      disabled="true"
	  		    />
	  		  </view>
			  <view class="form-item" >
			    <text class="item-label">营业执照编号</text>
			    <input
			  	  v-model="pageData.com_number"
			      class="item-input"
			      placeholder="请填写"
			      placeholder-style="color: #999999; font-size: 14px;"
			      disabled="true"
			    />
			  </view>
			  <view class="form-item" >
			    <text class="item-label">公司地址</text>
			    <input
			  	  v-model="pageData.com_address"
			      class="item-input"
			      placeholder="请填写"
			      placeholder-style="color: #999999; font-size: 14px;"
			      disabled="true"
			    />
			  </view>
	  		  <view class="form-item" >
	  		    <text class="item-label">租赁时间</text>
	  		    <input
	  			  v-model="pageData.rent_time"
	  		      class="item-input"
	  		      placeholder="请填写"
	  		      placeholder-style="color: #999999; font-size: 14px;"
	  		      disabled="true"
	  		    />
	  		  </view>
	  		  <view class="form-item" >
	  		    <text class="item-label">租赁费用</text>
	  		    <input
	  			  v-model="pageData.fee"
	  		      class="item-input"
	  		      placeholder="请填写"
	  		      placeholder-style="color: #999999; font-size: 14px;"
	  		      disabled="true"
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
            <text class="item-value">{{ pageData.owner_name }}</text>
          </view>

          <!-- 2. 流转人身份证号 -->
          <view class="form-item">
            <text class="item-label">流转人身份证号</text>
            <text class="item-value">{{ pageData.owner_card }}</text>
          </view>

          <!-- 3. 流转人联系电话 -->
          <view class="form-item">
            <text class="item-label">流转人联系电话</text>
            <text class="item-value">{{ pageData.owner_mobile }}</text>
          </view>

          <!-- 4. 土地位置 -->
          <view class="form-item">
            <text class="item-label">土地位置</text>
            <text class="item-value">{{ pageData.location }}</text>
          </view>

          <!-- 5. 土地面积 -->
          <view class="form-item">
            <text class="item-label">土地面积</text>
            <text class="item-value">{{ pageData.area }}</text>
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
            :src="pageData.sign_pic_sponsor" 
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
			  :src="pageData.sign_pic_user" 
			  mode="aspectFit" 
			></image>
		</view>
      </view>

	  <view class="protocalView">
		  <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		  <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		  <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		  <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick">《{{agreement_name}}》</view>
	  </view>

      <!-- ================= 底部提交按钮 ================= -->
      <view class="btn-container" v-if="myOrgetOwner == 0 && pageData.status == 1">
        <view class="submit-btn" @click="payOrder">付    款</view>
      </view>
	  <view class="btn-container" v-if="myOrgetOwner == 1 && pageData.sign_pic_user.length == 0">
	    <view class="submit-btn" @click="signClick">确    认</view>
	  </view>

    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref,onMounted,onUnmounted } from 'vue';
	import {GetAgreemente,
	MineLandrentGetLandWaitListHisOwnerLandRentOrderSign,
	MineLandrentGetLandWaitListHisGetSponsorLandRentOrderInfo,
	MineLandrentGetLandWaitListHisGetOwnerLandRentOrderInfo,
	MineLandrentGetLandWaitListHisLandRentOrderPay} from '@/api/mine';
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
	const myOrgetOwner = ref();
	const order_id = ref();
	const type = ref();
	
	
	onLoad((options: any)=>{
			
		myOrgetOwner.value = options.myOrgetOwner;
		order_id.value = options.order_id;
		type.value = options.type;
		console.log(type.value);
		
	});
	onMounted(() => {
		
		if(myOrgetOwner.value === 0){
			
			loadTransDetail();
			
		}else{
			
			loadRentDetail();
		}
		getAgreement();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
	  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
	const loadTransDetail = async() => {
		
		try {
			
			let param = {
				
				order_id:order_id.value,
				
			};
			const res = await MineLandrentGetLandWaitListHisGetSponsorLandRentOrderInfo(param);
							
			console.log(res);
			pageData.value = res.result;
			// orderDict.value = res.result.orderDetailAry[0];
			
		}catch (error) {
			console.log(error)
		}
		
	};   
	const loadRentDetail = async() => {
		
		try {
			
			let param = {
				
				order_id:order_id.value,
				
			};
			const res = await MineLandrentGetLandWaitListHisGetOwnerLandRentOrderInfo(param);
							
			console.log(res);
			pageData.value = res.result;
			// orderDict.value = res.result.orderDetailAry[0];
			
		}catch (error) {
			console.log(error)
		}
	}; 
	const getAgreement = async() => {
			  
		
		try {
			let param = {
				type:'25',
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
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${25}`
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
	const payOrder = async(item:any) => {
		
		try {
			
			let param = {
				
				order_id:order_id.value,
				osName:'ios'
			};
			const res = await MineLandrentGetLandWaitListHisLandRentOrderPay(param);
							
			console.log(res);
			uni.navigateTo({
			    url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
			
			
		}catch (error) {
			console.log(error)
		}
	};
	//签字
	const signClick = () => {
		
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
		
		if(selected.value === false){
			
			uni.showToast({
				title:'请同意土地流转协议',
				icon:'none'
			})
			return
		}	
		try {
			let param = {
				
				order_id:order_id.value,
				sign_pic_user:rentSign.value,
			};
			MineLandrentGetLandWaitListHisOwnerLandRentOrderSign(param).then((res) =>{
				
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

</style>
