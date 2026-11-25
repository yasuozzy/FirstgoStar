<template>
	<view>
		<u-navbar
		  title="设置"
		  :safeAreaInsetTop="true"
		  :placeholder="true"
		  :fixed="true"
		  :border="false"
		  :bgColor="bgColor"
		  titleStyle="color: #fff;"
		  leftIconColor="#fff">
		  <template #left>
			  <view slot="left" @click="goBack">
				<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
			  </view>
		  </template>
		</u-navbar>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;
		  "@click="changeCompany">
		  <u-image 
			:src="changeIdentify"
			width="25px"
			height="25px"
		  ></u-image>
		  <text style="flex: 1; margin-left: 10px">切换身份</text>
		  <text style="margin-right: 10px;">{{company}}</text>
		  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;"@click="changePassword">
			  <u-image 
				:src="changeIconImg"
				width="25px"
				height="25px"
			  ></u-image>
			  <text style="flex: 1; margin-left: 10px">修改密码</text>
			  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;"@click="bindPhone">
			  <u-image 
				:src="lockedImg"
				width="25px"
				height="25px"
			  ></u-image>
			  <text style="flex: 1; margin-left: 10px">手机绑定</text>
			  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;"@click="shebeiClick">
			  <u-image 
				:src="appshebei"
				width="25px"
				height="25px"
			  ></u-image>
			  <text style="flex: 1; margin-left: 10px">我的设备</text>
			  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;"@click="kefuClick">
			  <u-image 
				:src="mykefu"
				width="25px"
				height="25px"
			  ></u-image>
			  <text style="flex: 1; margin-left: 10px">我的客服</text>
			  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;"@click="cleanCache">
			  <u-image 
				:src="cleancache"
				width="25px"
				height="25px"
			  ></u-image>
			  <text style="flex: 1; margin-left: 10px">清除缓存</text>
			  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view
		  style="
			display: flex;
			flex-direction: row;
			padding: 10px 15px;
			border-bottom: 1px solid #e0e0e0;"@click="aboutApp">
			  <u-image 
				:src="mobilephone"
				width="25px"
				height="25px"
			  ></u-image>
			  <text style="flex: 1; margin-left: 10px">关于App</text>
			  <u-icon name="arrow-right" size="20"></u-icon>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="logOut">退出</view>
			</view>
		</view>                  
     </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';

    const bgColor = ref("#2A9595");
	const changeIdentify = ref('/static/mine/changeIdentify.png');
	const changeIconImg = ref('/static/mine/changeIconImg.png');
	const lockedImg = ref('/static/mine/lockedImg.png');
	const cleancache = ref('/static/mine/cleancache.png');
	const mobilephone = ref('/static/mine/mobilephone.png');
	const appshebei = ref('/static/mine/appshebei.png');
	const mykefu = ref('/static/mine/mykefu.png');
	const company = ref<string>('');
	// 使用 ref 创建响应式变量来存储缓存大小
	const cacheSize = ref('0B');
	const modelshow = ref(false);
    
	onMounted(() => {
		
		const loginType = getStorage<string | number>(storageKeys.type,'');
		
		if (loginType === 1) {
			
			company.value = '社区';
			
		}else if (loginType === 2) {
			
			company.value = '写字楼';
		}else
		{
			company.value = '市场';
		};
		getCacheSize();
	});
  
    const goBack = () => {
      uni.navigateBack();
    };

    const changeCompany = () => {
      uni.navigateTo({
        url: `/pages/mine/setting/SelectComPanyAndBookPage?company=${encodeURIComponent(company.value)}`
      });
    };
    const changePassword = () => {
      uni.navigateTo({
        url: `/pages/mine/setting/ChangePasswordPage`
      });
    };
    const bindPhone = () => {
      uni.navigateTo({
        url: `/pages/mine/setting/BindPhonePage`
      });
    };
	const shebeiClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/setting/myEquipment`
		})
	};
	const kefuClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/setting/MyKeFuService`
		})
		
	};
    
	const getCacheSize = () => {
	 
	  if (window.plus) {
	      calculateCache();
	    } else {
	      document.addEventListener('plusready', calculateCache, false);
	    }
	  console.log(cacheSize);
	};
	const calculateCache = () => {
		  plus.cache.calculate((size) => {
			// size 的单位是字节 (byte)
			if (size < 1024) {
			  cacheSize.value = size + 'B';
			} else if (size < 1024 * 1024) {
			  cacheSize.value = (size / 1024).toFixed(2) + 'KB';
			} else {
			  cacheSize.value = (size / 1024 / 1024).toFixed(2) + 'M';
			}
		  });
	 };
	const cleanCache = () => {
		
		  // 这是官方推荐的，支持 iOS 和 Android[reference:5]
		  plus.cache.clear(() => {
		    console.log('应用缓存已清除');
		    // 清除成功后，将显示的缓存大小重置为 0B
		    cacheSize.value = '0B';
		    uni.showToast({
		      title: '缓存已清除',
		      icon: 'success'
		    });
		  });

	};
    const aboutApp = () => {
      uni.navigateTo({
        url: `/pages/mine/setting/AboutAppPage`
      });
    };
	const logOut = () => {
		
		clearUserData();
		redirectToLogin();
	};
	// 清除用户数据
	 const clearUserData = async() => {
	      
		  try {
	        
	        storage.removeToken()
	        storage.removeLoginType()
	        storage.removeUserId()
	        storage.removeRealType()
	        storage.removePlatId()
	        storage.removeHostNo()
			storage.removeCstType()
			storage.removeAvatar()
			storage.removeNickName()
			storage.removeRealName()
			storage.removePhone()
			storage.removeSex()
			storage.removeBirthday()
			storage.removeFinLoginName()
			storage.removeFinSysSessionId()
			storage.removeBookId()
			storage.removeFinancialCompanyName()
			storage.removeUsersig()
			storage.removeDeliveryId()
			storage.removeDeliveryName()
			storage.removeIsWhetherDelivery()
			storage.removeDeliveryManagerId()
			storage.removeDeliveryTakeOrder()
			storage.removeDeliveryAuditStatus()
			storage.removeTemporayId()
			storage.removeTemporayName()
			storage.removeIsWhetherTemporay()
			storage.removeTemporayManagerId()
			storage.removeTemporayTakeOrder()
			storage.removeTemporayAuditStatus()
			storage.removeShopOwnerId()
			storage.removeAddress()
			storage.removeBldgid()
			storage.removeBldgname()
			storage.removeHcpid()
			storage.removeHseid()
			storage.removeHsename()
			storage.removeHsenum()
			storage.removeMainhouse()
			storage.removeManid()
			storage.removeManname()
			storage.removeType()
			storage.removeSendList()
			storage.removeIdentityList()
	        storage.removeCompanyImage()
			storage.removeCompanyName()
			storage.removeEstId()
			storage.removeDeptId()
			storage.removeDeptName()
	        console.log('用户数据已清除')
			
	      } catch (error) {
	        console.error('清除用户数据失败:', error)
	      }
	    };
		// 跳转到登录页
		 const redirectToLogin = () => {
		      // 微信小程序
		      if (typeof wx !== 'undefined' && wx.reLaunch) {
		        wx.reLaunch({
		          url: '/pages/login/index'
		        })
		      }
		      // UniApp
		      else if (typeof uni !== 'undefined' && uni.reLaunch) {
		        uni.reLaunch({
		          url: '/pages/login/index'
		        })
		      }
		      // Web 环境
		      // else if (typeof window !== 'undefined') {
		      //   window.location.href = '/login.html'
		      // }
		};
  
</script>

<style>
.ellipsis1 {
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
  white-space: nowrap; /* 禁止换行 */
  display: block; /* 块级元素 */
}

.ellipsis2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 控制显示行数 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all; /* 长单词换行处理 */

  /* 兼容写法 */
  line-height: 1.5; /* 行高需要配合行数 */
  max-height: 3em; /* 行高*行数 (1.5x2=3) */
}
.footer-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background-color: white;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          z-index: 100;
          color: white;
          display: flex;
          justify-content: center; /* 水平居中 */
          align-items: center;     /* 垂直居中 */
          
        }
        .order-button {
                     
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center;     /* 垂直居中 */
            height: 35px;           /* 需要设置高度 */
            width: 92%;
            margin-right: 10px;
            font-size: 13px;
            color: white;
            background-color: #2A9595;
            border-radius: 6px;
            margin-left: 4%;
            margin-top: 15px;
        }
</style>
