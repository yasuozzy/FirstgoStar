<template>
    <view class="main">
       <u-navbar title="群苑云聘"  :safeAreaInsetTop="true" :placeholder="true" :fixed="true"
         :border="false" :bgColor="bgColor" titleStyle="color: #fff;">
         <template #left>
       	  <view class="u-nav-slot" slot="left" @click="mannameClick">
       		<view class="flex">
       		  <text class="location-city-text">{{ manname }}</text>
       		  <u-image style="margin-top: 10px" :src="arrowdownImg" width="25px" height="25px"></u-image>
       		</view>
       	  </view>
         </template>
         <template #right>
			<view class="u-nav-slot" @click="messageClick">
			  <u-icon name="chat" color="#fff" size="24"></u-icon>
			</view>
         </template>
       </u-navbar>
	   <view class="swiper">
	     <u-swiper :list="swiperList" :autoplay="true" height="160"></u-swiper>
	   </view>
	   <view class="topheader">
	      <image style="margin-top: 10px; margin-left: 15px;width: 20px;height: 25px;" :src="hotImage"></image>
	      <view style="
	      margin-top: 10px;
	      margin-left: 10px;
	      font-size: 13px;
	      width: 65%;
	      color: red;
	      flex: 1;
	    ">零工客栈</view>
		<view @click="shouqi" style="
		  margin-left: 10px;
		  margin-top: 10px;
		  font-size: 13px;
		  color: #2a9595;
		">收起</view>
		  <u-image style="margin-top: 10px; margin-left: 5px" :src="downImage" width="25px" height="25px"></u-image>
	    </view>
	    <view class="singleLine"></view>
	    <view class="approval_list">
	      <view class="help_item" v-for="(item, index) in workList" :key="index" @click="workclick(index)">
	        <u-image style="margin-top: 5px; margin-left: 15px" :src="item.icon" width="25px" height="25px"></u-image>
	        <view style="margin-top: 5px; margin-left: 5px; font-size: 13px">{{
	          item.name
	        }}</view>
	      </view>
	    </view>
		<view class="oamanageView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">快速通道</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="quick_item"
				  v-for="(item, index) in quickList"
				  :key="index" @click="quickClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="50px"
				    height="50px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
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
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { MineGetQunYuanMallData,MineGetLearnToStrongContryData} from '@/api/mine';
	import { MainPageBannerList } from '@/api/home';
    import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { queryVersion } from "@/api/home";
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
	
    // 背景颜色
    const bgColor = ref("#2A9595");
	const arrowdownImg = ref('/static/mine/arrowDown.png');
	const manname = ref<string | number>('');
	const hotImage = ref('/static/service/greenLineVertical.png');
	const downImage = ref('/static/service/unfoldImage.png');
	const workList = ref([
	  { icon: "/static/service/lwdj.png", name: "务工登记" },
	  { icon: "/static/service/zjpt.png", name: "人才招聘" },
	  { icon: "/static/service/ygdj.png", name: "用工登记" },
	  { icon: "/static/service/jzwy.png", name: "家政物业" },
	  { icon: "/static/service/gxyg.png", name: "共享用工" },
	  { icon: "/static/service/jzfw.png", name: "家政服务" },
	  { icon: "/static/service/sdzx.png", name: "水电装修" },
	  { icon: "/static/service/jnpx.png", name: "技能培训" },
	  { icon: "/static/service/yjwx.png", name: "设施维修" },
	  { icon: "/static/service/jzlw.png", name: "建筑劳务" },
	  { icon: "/static/service/lwpq.png", name: "劳务派遣" },
	  { icon: "/static/service/gclw.png", name: "工程劳务" },
	  { icon: "/static/service/hwzx.png", name: "货物装卸" },
	  { icon: "/static/service/zczx.png", name: "政策咨询" },
	  { icon: "/static/service/zdjj.png", name: "钟点计件" },
	  { icon: "/static/service/nylw.png", name: "农业劳务" },
	  { icon: "/static/service/flyz.png", name: "法律援助" },
	  { icon: "/static/service/xdny.png", name: "现代农业" },
	]);
	const swiperList = ref([]);
	const quickList = ref<any[]>([]);
	
	
	
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
		app_name: "4"
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
		checkNewVersion();
		// manname.value = getStorage<string>(storageKeys.manname,'暂无房产');
		manname.value = storage.getManname() || "暂无房产";
	});
	onMounted(() => {
		
		getBannerList();
		getmallData();
		getLearnToStongCountry();
		eventBus.on('refresh-data', handleUserUpdate);
		
	});
	onUnmounted(() => {
		// 组件卸载时，务必移除监听！
		eventBus.off('refresh-data', handleUserUpdate);
	});
	
	const messageClick = () => {
	   uni.navigateTo({url: '/pages/home/homeMessage'});
	};
	
	//切换房产
	const mannameClick = () => {
	  uni.navigateTo({
	    url: "/pages/service/changeMainHouse",
	  });
	};
	
	const workclick = (type:any) => {
	  if (type === 0) {
	    uni.navigateTo({
	      url: "/pages/service/work/wugongdengji",
	    });
	  } else if (type === 1) {
	    uni.navigateTo({
	      url: "/pages/service/work/rencaizhaopin",
	    });
	  } else if (type === 2) {
	    uni.navigateTo({
	      url: "/pages/service/work/yonggongdengji",
	    });
	  } else if (type === 3) {
	    uni.navigateTo({
	      url: `/pages/service/work/twotablist?kindname=${encodeURIComponent('家政物业')}&type=${1}`
	    });
	  } else if (type === 4) {
	    uni.navigateTo({
	      url: "/pages/service/work/gongxiangyonggong",
	    });
	  } else if (type === 5) {
	    uni.navigateTo({
	      url: `/pages/service/work/threetablist?kindname=${encodeURIComponent('家政服务')}&type=${0}`
	    });
	  } else if (type === 6) {
	    uni.navigateTo({
	      url: `/pages/service/work/twotablist?kindname=${encodeURIComponent('水电装修')}&type=${1}`
	    });
	  } else if (type === 7) {
	    uni.navigateTo({
	      url: "/pages/service/work/jinengpeixun",
	    });
	
	  } else if (type === 8) {
	    uni.navigateTo({
	      url: `/pages/service/work/threetablist?kindname=${encodeURIComponent('设施维修')}&type=${0}`
	    });
	  } else if (type === 9) {
	    uni.navigateTo({
	      url: `/pages/service/work/twotablist?kindname=${encodeURIComponent('建筑劳务')}&type=${1}`
	    });
	  } else if (type === 10) {
	    uni.navigateTo({
	      url: "/pages/service/work/laowupaiqian",
	    });
	  } else if (type === 11) {
	    uni.navigateTo({
	      url: `/pages/service/work/threetablist?kindname=${encodeURIComponent('工程劳务')}&type=${0}`,
	    });
	  } else if (type === 12) {
	    uni.navigateTo({
	      url: `/pages/service/work/twotablist?kindname=${encodeURIComponent('货物装卸')}&type=${1}`
	    });
	  } else if (type === 13) {
	    uni.navigateTo({
	      url: "/pages/service/work/zhengcezixun",
	    });
	  } else if (type === 14) {
	    uni.navigateTo({
	      url: `/pages/service/work/threetablist?kindname=${encodeURIComponent('钟点计件')}&type=${0}`
	    });
	  } else if (type === 15) {
	    uni.navigateTo({
	      url: `/pages/service/work/twotablist?kindname=${encodeURIComponent('农业劳务')}&type=${1}`
	    });
	  } else if (type === 16) {
	    uni.navigateTo({
	      url: "/pages/service/work/falnyuanzhu",
	    });
	  } else if (type === 17) {
	    uni.navigateTo({
	      url: `/pages/service/work/threetablist?kindname=${encodeURIComponent('现代农业')}&type=${0}`
	    });
	  }
	};
	//头部轮播图，列表获取
	const getBannerList = async() => {
		
		try {
			let param = {
				advertPlaceId:1,
				};
			const res= await MainPageBannerList(param);
				
			console.log(res);
			if (res.success == true) {
				
				// const dict = {image:'/static/mine/shangcheng.png',title:'商城'};
				res.result.advertlist.forEach(item => {
					swiperList.value.push(item.advertCode)
				});
				
			}else
			{
				uni.showToast({
					title:res.message,
					icon:'none'
				})
			}
				
		
		} catch (error) {
			console.log(error)
		}
	};
	//是否返回商城
	const getmallData = async() => {
		
		try {
			let param = {};
			const res= await MineGetQunYuanMallData(param);
				
			console.log(res);
			if (res.success == true) {
				
				const dict = {image:'/static/mine/shangcheng.png',title:'商城'};
				quickList.value.push(dict);
			}
				
		
		} catch (error) {
			console.log(error)
		}
	};
	const getLearnToStongCountry = async() => {
		
		try {
			let param = {
				use_id:getStorage(storageKeys.userId,''),
				loginType:getStorage(storageKeys.loginType,'')
			};
			const res = await MineGetLearnToStrongContryData(param);
				
			console.log(res);
				
			const result = res?.result || [];
			for (const element of result) {
			  if (element.href === 'partyModel') {
			    quickList.value.push({ image: '/static/mine/dangjian.png', title: '党建' });
			  } else if (element.href === 'LearnForCountry') {
			    quickList.value.push({ image: '/static/mine/leaningStrong.png', title: '学习强国' });
			  }
			}	
			
		} catch (error) {
			console.log(error)
		}
	};
	const handleUserUpdate = () => {
		console.log("收到刷新事件:");
		//http://36.138.20.28:9004/app/users/freshToken
		refreshToken();
	};
	
	const refreshToken = async () => {
	  try {
	    // 使用 Promise 包装 uni.request，以支持 async/await
	    const res: any = await new Promise((resolve, reject) => {
	      uni.request({
	        url: BaseURL + "users/freshToken",
	        method: "GET",
	        data: {
	          loginType: getStorage(storageKeys.loginType,''),
	          authorToken: storage.getToken(),
	        },
	        success: (res) => resolve(res),
	        fail: (error) => reject(error),
	      });
	    });
	
	    console.log(res.data);
	    const result = res.data.result;
		uni.setStorageSync("App-Token", result.token)
	    // --- 基础信息存储 ---
	    storage.saveToken(result.token);
	    storage.saveUserId(result.userId);
	    storage.saveRealType(result.realType);
	    storage.savePlatId(result.platId);
	    storage.saveHostNo(result.hostNo);
	    storage.saveCstType(result.cstType);
	    storage.saveAvatar(result.avatar);
	    storage.saveNickName(result.nickName);
	    storage.saveRealName(result.realName);
	    storage.savePhone(result.phone);
	    storage.saveSex(result.sex);
	    storage.saveBirthday(result.birthday);
	    storage.saveFinLoginName(result.finLoginName);
	    storage.saveFinSysSessionId(result.finSysSessionId);
	    storage.saveUsersig(result.usersig);
	    
	    // --- 配送与临时工信息 ---
	    storage.saveDeliveryId(result.deliveryId);
	    storage.saveDeliveryName(result.deliveryName);
	    storage.saveIsWhetherDelivery(result.isWhetherDelivery);
	    storage.saveDeliveryManagerId(result.deliveryManagerId);
	    storage.saveDeliveryTakeOrder(result.deliveryTakeOrder);
	    storage.saveDeliveryAuditStatus(result.deliveryAuditStatus);
	    
	    storage.saveTemporayId(result.temporayId);
	    storage.saveTemporayName(result.temporayName);
	    storage.saveIsWhetherTemporay(result.isWhetherTemporay);
	    storage.saveTemporayManagerId(result.temporayManagerId);
	    storage.saveTemporayTakeOrder(result.temporayTakeOrder);
	    storage.saveTemporayAuditStatus(result.temporayAuditStatus);
	    storage.saveShopOwnerId(result.shopOwnerId);
	
	    // --- 房产信息 (houseMap) ---
	    if (result.houseMap) {
	      const house = result.houseMap;
	      storage.saveAddress(house.address);
	      storage.saveLoginType(house.loginType);
	      storage.saveBldgid(house.bldgid);
	      storage.saveBldgname(house.bldgname);
	      storage.saveHcpid(house.hcpid);
	      storage.saveHseid(house.hseid);
	      storage.saveHsename(house.hsename);
	      storage.saveHsenum(house.hsenum);
	      storage.saveMainhouse(house.mainhouse);
	      storage.saveManid(house.manid);
	      storage.saveManname(house.manname);
	      storage.saveType(house.type);
	    }
	
	    // --- 列表信息 ---
	    // 💡 优化：加上 ?. 可选链，防止后端返回 null/undefined 导致 .length 报错白屏
	    if (result.sendList?.length > 0) {
	      storage.saveSendList(result.sendList);
	    }
	    if (result.identityList?.length > 0) {
	      storage.saveIdentityList(result.identityList);
	    }
	
	    // 3. 更新响应式数据 (替代 this.manname)
	    manname.value = storage.getManname() || "暂无房产";
	
	  } catch (error) {
	    console.log("请求失败:", error);
	  }
	};
	const shouqi = () => {
		
	};
	const quickClick = (title:any) => {
		   
	   if (title === '党建'){
			   
		   uni.navigateTo({
			url:'/pages/mine/PartyQY/PartyFirstPage'
		   })
		
	   }else if (title === '学习强国') {
		
			uni.navigateTo({
				url:'/pages/mine/learnToStrongCountry/learnToStrongCountry'
			})
	   }
	
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
	
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		  .swiper {
		    padding: 10px;
		    box-sizing: border-box;
		  }
		  .topheader {
		    display: flex;
		    flex-direction: row;
		    width: 100%;
		    height: 40px;
		    background-color: white;
		  }
		  
		  .singleLine {
		    background-color: lightgray;
		    width: 100%;
		    height: 1px;
		  }
		  
		  .approval_list {
		    display: flex;
		    background-color: white;
		    width: 100%;
		    flex-wrap: wrap;
		    /* 允许换行 */
		    margin-top: 10px;
		  }
		  
		  .politic_item {
		    display: flex;
		    flex-direction: row;
		    box-sizing: border-box;
		    width: 50%;
		    height: 45px;
		  }
		  .help_item {
		    display: flex;
		    flex-direction: row;
		    box-sizing: border-box;
		    width: 33.33%;
		    height: 45px;
		  }
		  .location-city-text {
		    width: 100px;
		    height: 88upx;
		    line-height: 88upx;
		    font-size: 26upx;
		    color: #fff;
			 overflow: hidden;         /* 隐藏溢出内容 */
			  text-overflow: ellipsis;  /* 显示省略号 */
		  }
		  .oamanageView{
		  	  display: flex;
		  	  
		  	  flex-direction: column;
		  	  margin-left: 4%;
		  	  width: 92%;
		  	  margin-top: 10px;
		  	  background-color: white;
		  	  border-radius: 8px;
		  	  .itemview{
		  	  	display: flex;
		  	  	flex-direction: row;
		  	  	flex-wrap: wrap; /* 允许换行 */
		  	  	margin-bottom: 10px;
		  	  	.situation_item {
		  	  	  width: 25%;
		  	  	  font-size: 12px;
		  	  	  color: #000;
		  	  	  margin-top: 15px;
		  	  	  box-sizing: border-box;
		  	  	  display: flex;
		  	  	  flex-direction: column;
		  	  	  align-items: center;
		  	  	  height: 65upx;
		  	  			margin-bottom: 30px;
		  	  			.item_text{
		  	  				margin-top: 8px;
		  	  			}
		  	  	}
		  	  }
		  }
		  .quick_item{
		  	  width: 33.33%;
		  	  font-size: 12px;
		  	  color: #000;
		  	  margin-top: 15px;
		  	  box-sizing: border-box;
		  	  display: flex;
		  	  flex-direction: column;
		  	  align-items: center;
		  	  height: 85upx;
		  	  margin-bottom: 30px;
		  	  .item_text{
		  	  	margin-top: 8px;
		  		margin-bottom: 10px;
		  	  }
		  	  
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
		  
}
</style>