<template>
  <view class="main">
		<view v-if="!isReady" class="loading-mask">
	        <u-loading-icon mode="circle" size="36"></u-loading-icon>
		</view>
	  
	      <!-- 判断完成且已登录，显示真实内容 -->
		<view v-else class="home-content">
    <!-- ============ 头部导航栏 ============ -->
			<u-navbar
			  title="首页"
			  @rightClick="rightClick"
			  :safeAreaInsetTop="true"
			  :placeholder="true"
			  :fixed="true"
			  :border="false"
			  :bgColor="bgColor"
			  titleStyle="color: #fff;"
			>
			  <!-- 【修改1】Vue3 插槽语法：slot="left" 改为 <template #left> -->
			  <template #left>
				<view class="u-nav-slot" @click="mapClick">
				  <view class="flex">
					<u-icon name="map" color="#fff"></u-icon>
					<text class="location-city-text">{{ city }}</text>
				  </view>
				</view>
			  </template>
			  
			  <template #right>
				<view class="u-nav-slot" @click="messageClick">
				  <u-icon name="chat" color="#fff" size="24"></u-icon>
				</view>
			  </template>
			</u-navbar>

			<!-- ============ 区域二 ============ -->
			<scroll-view scroll-y="true" style="flex: 1; height: 100%;">
			  <view>
				<!-- ============ 搜索框 ============ -->
				<view class="searchView">
				  <input class="searchlocation" placeholder="请输入价格" type="text" />
				</view>

				<view class="swiper">
				  <u-swiper :list="swiperList" :autoplay="true" height="160"></u-swiper>
				</view>

				<view class="financial_situation">
				  <view class="situation_contect">
					<view
					  class="situation_item"
					  v-for="(item, index) in financialList"
					  :key="index"
					  @click="jumpTo(item.text)"
					>
					  <!-- 【修改2】uview-plus 标准图片组件为 u-image -->
					  <u-image :src="item.image" width="45px" height="45px"></u-image>
					  <view class="item_text">{{ item.text }}</view>
					</view>
				  </view>
				</view>

				<view class="lineView"></view>
				
				<view class="goodsHeaderView">
				  <view class="fijinview">附近景点</view>
				  <view class="moreview" @click="moreviewClick">更多 ></view>
				</view>

				<view class="approval_list">
				  <view
					class="jingdianView_item"
					v-for="(item, index) in viewsList"
					:key="index"
					@click="viewdetailClick(item.id)"
				  >
					<view class="topView">
					  <u-image :src="item.image" width="80px" height="80px"></u-image>
					  <view class="specsView">
						<view style="font-size: 15px;font-weight: bold;">{{ item.title }}</view>
						<view style="font-size: 13px;">{{ item.feeling }}</view>
						<view style="font-size: 13px;">{{ item.dianping }}</view>
						<view style="font-size: 13px;">{{ item.disdance }}</view>
					  </view>
					  <view class="ticketsView">
						<view style="font-size: 13px;margin-top: 30px;text-decoration: line-through;">{{ item.discount }}</view>
						<view style="display: flex;flex-direction: row;">
						  <view style="font-size: 13px;margin-top: 7px;">门票</view>
						  <view style="font-size: 13px;margin-top: 7px;color: orangered;">￥</view>
						  <view style="font-size: 18px;color: orangered;margin-top: 7px;">{{ item.tickets }}</view>
						  <view style="font-size: 13px;margin-top: 7px;color: orangered;">起</view>
						</view>
					  </view>
					</view>
					<view class="lineV"></view>
				  </view>
				</view>
			  </view>
			</scroll-view>
		</view>
			<view v-if="updateDialogVisible" class="update_mask" catchtouchmove="true" @click="handleMaskClick">
					<view class="update_card" @click.stop>
						<view class="update_title">发现新版本</view>
						<view class="update_version">新版本：{{ updateInfo.version_number }}</view>
						<view class="update_content_row">
							<text class="update_label">更新内容：</text>
							<text class="update_content">{{ updateInfo.message }}</text>
						</view>
						<view v-if="downloadProgressVisible" class="update_progress">
							<view class="update_progress_bar" :style="{ width: downloadProgress + '%' }"></view>
						</view>
						<view class="update_actions">
							<view v-if="!isForceUpdate" class="update_action update_cancel" @click="handleUpdateCancel">取消</view>
							<view class="update_action update_confirm" :class="{ disabled: isUpdating }" @click="handleUpdateConfirm">
								{{ isUpdating ? '下载中...' : (isForceUpdate ? '立即更新' : '确认更新') }}
							</view>
						</view>
					</view>
				</view>
  </view>
</template>

<script setup lang="ts">
// 【修改3】引入 Vue3 的 ref 和 UniApp 的页面生命周期 onLoad
import { ref } from 'vue';
import { onLoad,onShow } from '@dcloudio/uni-app'; 
import { getToken } from '@/utils/storage'; // 引入你封装的 storage 方法
import { queryVersion } from "@/api/home";
// 响应式数据定义 (替代 data)
const bgColor = ref("#2A9595");
const city = ref("北京");
const LOCAL_VERSION_FALLBACK = "1.0.0";
const swiperList = ref([
  "/static/home/swiper.png", "/static/home/swiper.png", "/static/home/swiper.png",
  "/static/home/swiper.png", "/static/home/swiper.png",
]);
const updateDialogVisible = ref(false);
const downloadProgressVisible = ref(false);
const downloadProgress = ref(0);
const isUpdating = ref(false);
const isForceUpdate = ref(false);
const updateInfo = reactive({
  version_number: "",
  type: "",
  link_address: "",
  message: "",
});

let hasCheckedVersion = false;
let downloadTask = null;

const financialList = ref([
  { image: "/static/home/homestay.png", text: "酒店民宿" },
  { image: "/static/home/food.png", text: "美食商圈" },
  { image: "/static/home/admission.png", text: "景点门票" },
  { image: "/static/home/emergency.png", text: "应急事件" },
  { image: "/static/home/ride.png", text: "顺风约车" },
  { image: "/static/home/offer.png", text: "每日特价" },
]);

const viewsList = ref([
  { image: "/static/home/homestay.png", title: "九龙山", feeling: "满意度:5.0分", dianping: "游客点评:666条点评", disdance: "距离您1.0千米", discount: "原价￥70", tickets: "65", id: "1111" },
  { image: "/static/home/food.png", title: "黄鹤楼", feeling: "满意度:5.0分", dianping: "游客点评:666条点评", disdance: "距离您10.0千米", discount: "原价￥70", tickets: "65", id: "2222" },
  { image: "/static/home/admission.png", title: "隐水洞", feeling: "满意度:5.0分", dianping: "游客点评:666条点评", disdance: "距离您0.5千米", discount: "原价￥70", tickets: "65", id: "3333" },
]);

// 方法定义 (替代 methods，无需 this)
const rightClick = () => {};

const mapClick = () => {
  uni.navigateTo({ url: '/pages/home/mapLocation' });
};

const messageClick = () => {
  uni.navigateTo({ url: '/pages/home/homeMessage' });
};

const jumpTo = (type:any) => {
  // 优化：使用对象映射替代冗长的 if-else
  const routes = {
    "酒店民宿": "/pages/home/hotelAndhomestay",
    "美食商圈": "/pages/home/gourmetCircle",
    "景点门票": "/pages/home/viewstickets",
    "应急事件": "/pages/home/emergencyEvents",
    "顺风约车": "/pages/home/shunfengCar",
    "每日特价": "/pages/home/everydaydiscount",
  };
  if (routes[type]) {
    uni.navigateTo({ url: routes[type] });
  }
};

const moreviewClick = () => {
  uni.navigateTo({ url: "/pages/home/moreview" });
};

const viewdetailClick = (id) => {
  // 建议将 id 传递给详情页
  uni.navigateTo({ url: `/pages/home/viewsDetail?id=${id}` });
};

// 【修改4】UniApp Vue3 页面生命周期必须显式调用
onLoad(() => {
  // const amapPlugin = new amap.AMapWX({
  //   key: '6c8c0d881bcfb9127c675ea6489031b3' // 请替换为自己的KEY
  // });
  
  // amapPlugin.getRegeo({
  //   success: data => {
  //     // 修改 ref 的值需要使用 .value
  //     city.value = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); 
  //   },
  //   fail: error => {
  //     console.log(error);
  //   }
  // });
  
              uni.getLocation({
                  type:'gcj02',
                  geocode:true,
                  success(res) {
                      
                      console.log(res);
                      // that.latitude = res.latitude;
                      // that.longitude = res.longitude;
					  console.log(res);
                      city.value = res.address.city;
                  }
              });
          
});

function getPlatformType() {
  const platform = uni.getSystemInfoSync().platform;
  return platform === "ios" ? "2" : "1";
}

function normalizeVersionResponse(data) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }
  return data || {};
}

function compareVersion(localVersion, remoteVersion) {
  const localParts = String(localVersion || "").split(".").map((item) => Number(item) || 0);
  const remoteParts = String(remoteVersion || "").split(".").map((item) => Number(item) || 0);
  const length = Math.max(localParts.length, remoteParts.length);

  for (let i = 0; i < length; i += 1) {
    const localItem = localParts[i] || 0;
    const remoteItem = remoteParts[i] || 0;
    if (remoteItem > localItem) return true;
    if (remoteItem < localItem) return false;
  }

  return false;
}

function getCurrentVersion() {
  return new Promise((resolve) => {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
      resolve(widgetInfo.version || LOCAL_VERSION_FALLBACK);
    });
    // #endif

    // #ifndef APP-PLUS
    resolve(LOCAL_VERSION_FALLBACK);
    // #endif
  });
}

function showUpdateDialog(info) {
  updateInfo.version_number = info.version_number;
  updateInfo.type = info.type;
  updateInfo.link_address = info.link_address;
  updateInfo.message = info.message;
  isForceUpdate.value = info.type === "1";
  downloadProgress.value = 0;
  downloadProgressVisible.value = false;
  isUpdating.value = false;
  updateDialogVisible.value = true;
}

async function checkNewVersion() {
  if (hasCheckedVersion) return;
  hasCheckedVersion = true;

  // #ifdef APP-PLUS
  const currentVersion = await getCurrentVersion();
  
  queryVersion({
    eqp_type: "1",
	app_name: "2"
  }).then((res) => {
	console.log(res);
    const body = normalizeVersionResponse(res);
    const info = body.result || {};
    const hasUpdateInfo = body.resultCode === 200
      && info.version_number
      && info.type
      && info.link_address
      && info.message;

    if (hasUpdateInfo && compareVersion(currentVersion, info.version_number)) {
      showUpdateDialog(info);
    }
  }).catch((error) => {
    console.log("版本检查失败:", error);
  });
  // #endif
}

function buildAndroidApkUrl(linkAddress, versionNumber) {
  if (/\.apk$/i.test(linkAddress)) {
    return linkAddress;
  }
  const lastSlashIndex = linkAddress.lastIndexOf("/");
  if (lastSlashIndex === -1) return linkAddress;
  return linkAddress.substring(0, lastSlashIndex + 1) + "qywy-" + versionNumber + ".apk";
}

function resetDownloadState() {
  downloadProgressVisible.value = false;
  downloadProgress.value = 0;
  isUpdating.value = false;
  downloadTask = null;
}

function handleMaskClick() {
  if (!isForceUpdate.value) {
    handleUpdateCancel();
  }
}

function handleUpdateCancel() {
  if (downloadTask && isUpdating.value) {
    downloadTask.abort();
  }
  updateDialogVisible.value = false;
  resetDownloadState();
}

function handleUpdateConfirm() {
  if (isUpdating.value) return;

  if (!updateInfo.link_address) {
    uni.showToast({
      title: "更新地址为空",
      icon: "none",
    });
    return;
  }

  // #ifdef APP-PLUS
  if (uni.getSystemInfoSync().platform === "ios") {
    plus.runtime.openURL(updateInfo.link_address);
    if (!isForceUpdate.value) {
      updateDialogVisible.value = false;
    }
    return;
  }

  downloadAndInstallApk(buildAndroidApkUrl(updateInfo.link_address, updateInfo.version_number));
  // #endif
}

function downloadAndInstallApk(apkUrl) {
  // #ifdef APP-PLUS
  downloadProgress.value = 0;
  downloadProgressVisible.value = true;
  isUpdating.value = true;

  downloadTask = plus.downloader.createDownload(
    apkUrl,
    {
      filename: "_downloads/qywy-" + updateInfo.version_number + ".apk",
    },
    (download, status) => {
      isUpdating.value = false;
      if (status === 200) {
        downloadProgress.value = 100;
        installApk(download.filename);
      } else {
        uni.showToast({
          title: "下载失败",
          icon: "none",
        });
        resetDownloadState();
      }
    }
  );

  downloadTask.addEventListener("statechanged", (task) => {
    if (task.totalSize > 0) {
      downloadProgress.value = Math.min(100, Math.floor((task.downloadedSize / task.totalSize) * 100));
    }
  });

  downloadTask.start();
  // #endif
}

function installApk(filePath) {
  // #ifdef APP-PLUS
  plus.runtime.install(
    filePath,
    {},
    () => {
      resetDownloadState();
      updateDialogVisible.value = false;
    },
    (error) => {
      console.log("安装失败:", error);
      uni.showToast({
        title: "安装失败，请检查安装权限",
        icon: "none",
      });
      resetDownloadState();
    }
  );
  // #endif
}

// 控制页面是否渲染真实内容
const isReady = ref(false);

onShow(() => {
  // checkLoginStatus();
    checkNewVersion();
});

const checkLoginStatus = () => {
  const token = getToken();
  
  if (!token) {
    // 【关键】没有 Token，跳转到登录页
    // 使用 redirectTo 或 navigateTo 均可，这里用 navigateTo 保留首页在栈底
    uni.navigateTo({
      url: '/pages/login/index',
      fail: () => {
        // 如果跳转失败（比如已经在登录页），则尝试 reLaunch
        uni.reLaunch({ url: '/pages/login/index' });
      }
    });
  } else {
    // 有 Token，允许渲染页面，并加载首页数据
    isReady.value = true;
    // loadHomeData();
  }
};
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  background: #f1f4f9;
  .loading-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  /* 【修改5】Vue3 深度选择器：::v-deep .class 改为 :deep(.class) */
  :deep(.uni-select) {
    height: 28px;
    width: 120px;
    background: #fff;
    border: 1px solid #fff;
  }

  .searchView {
    width: 100%;
    height: 45px;
    background-color: #2A9595;
  }

  .searchlocation {
    margin-left: 4%;
    width: 92%;
    height: 35px;
    background-color: white;
    border: 1px white solid;
    border-radius: 5px;
    font-size: 13px;
  }

  .swiper {
    padding: 10px;
    box-sizing: border-box;
  }

  .financial_situation {
    width: 100%;
    background: #fff;
    padding: 15px;
    margin-top: 10px;
    box-sizing: border-box;

    .situation_contect {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      /* 【修改6】upx 已废弃，全部替换为 rpx */
      gap: 24rpx; 
      justify-content: space-evenly;
      
      .situation_item {
        width: 22%;
        font-size: 12px;
        margin-right: 24rpx;
        color: #000;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 65rpx;
        margin-bottom: 64rpx;
        
        .item_text {
          margin-top: 4rpx;
        }
      }
    }
  }

  .lineView {
    background-color: #f1f4f9;
    width: 100%;
    height: 10rpx;
    margin-top: 20rpx;
  }

  .goodsHeaderView {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60rpx;
    background-color: white;
  }

  .fijinview {
    width: 40%;
    margin-left: 30rpx;
    font-size: 30rpx;
    margin-top: 25rpx;
    color: #000;
  }

  .moreview {
    width: 50%;
    font-size: 30rpx;
    margin-top: 25rpx;
    margin-left: 10px;
    color: #000;
    text-align: right;
  }

  .approval_list {
    background: #fff;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    
    .jingdianView_item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: white;
      box-sizing: border-box;
      margin-bottom: 16px;
      border-radius: 10px;
      
      .lineV {
        background-color: #f1f4f9;
        width: 100%;
        height: 1px;
        margin-top: 20px;
      }
      
      .topView {
        width: 100%;
        display: flex;
        flex-direction: row;
        
        .specsView {
          margin-left: 10px;
          width: 50%;
        }
        .ticketsView {
          margin-left: 10px;
          width: 40%;
        }
      }
    }

    :deep(.u-icon__icon) {
      margin-right: 5px;
    }
  }
}

.location-city-text {
  width: 60px;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 26rpx;
  color: #fff;
}

.flex {
  display: flex;
}


		.update_mask {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 9999;
			background: rgba(0, 0, 0, 0.55);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 40rpx;
			box-sizing: border-box;
		}

		.update_card {
			width: 100%;
			max-width: 620rpx;
			background: #fff;
			border-radius: 16rpx;
			padding: 32rpx 28rpx 24rpx;
			box-sizing: border-box;
		}

		.update_title {
			font-size: 34rpx;
			font-weight: 600;
			color: #222;
			text-align: center;
		}

		.update_version {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #333;
		}

		.update_content_row {
			display: flex;
			margin-top: 16rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 1.6;
		}

		.update_label {
			flex-shrink: 0;
		}

		.update_content {
			flex: 1;
			word-break: break-all;
		}

		.update_progress {
			margin-top: 24rpx;
			height: 14rpx;
			background: #eef2f6;
			border-radius: 999rpx;
			overflow: hidden;
		}

		.update_progress_bar {
			height: 100%;
			background: linear-gradient(90deg, #2a9598, #0080ff);
			border-radius: 999rpx;
		}

		.update_actions {
			display: flex;
			margin-top: 28rpx;
			gap: 16rpx;
		}

		.update_action {
			flex: 1;
			height: 88rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
		}

		.update_cancel {
			background: #f2f4f7;
			color: #666;
		}

		.update_confirm {
			background: #2a9598;
			color: #fff;
		}

		.update_confirm.disabled {
			opacity: 0.7;
		}
</style>
