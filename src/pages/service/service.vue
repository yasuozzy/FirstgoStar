<template>
  <view class="main">
    <u-navbar title="服务" @rightClick="rightClick" :safeAreaInsetTop="true" :placeholder="true" :fixed="true"
      :border="false" :bgColor="bgColor" titleStyle="color: #fff;">
	  <template #left>
		  <view class="u-nav-slot" slot="left" @click="mannameClick">
			<view class="flex">
			</view>
		  </view>
	  </template>
	  <template #right>
		  <view slot="right" @click="searchClick">
			<u-image :src="searchimage" width="20px" height="20px"></u-image>
		  </view>
	  </template>
    </u-navbar>
    <scroll-view scroll-y="true" style="flex: 1; height: 100%;">
      <view>
        <view class="financial_situation">
          <view class="situation_contect">
            <view class="situation_item" v-for="(item, index) in financialList" :key="index" @click="jumpTo(item.text)">
              <u-image :src="item.image" width="30px" height="30px"></u-image>
              <view class="item_text">{{ item.text }}</view>
            </view>
          </view>
        </view>
        <!-- <view style="background-color: aliceblue; width: 100%; height: 5px"></view> -->
		<view style="background-color: aliceblue;width: 100%;height: 40px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px; margin-left: 15px; font-size: 13px;width: 80%; ">商圈排行榜</view>
			<view @click="toshangquan" style="
			  margin-left: 10px;
			  margin-top: 10px;
			  font-size: 13px;
			  margin-left: 10px;
			">更多 ></view>
		</view>
		<view class="haowu_list" style="background-color: aliceblue;">
			<view class="politic_contect">
				<view class="haowu_item" v-for="(item,index) in shangquanlist" @click="toshop(item)" :key="index">
					<image style="width: 95%;border-radius: 5px;" :src="item.coverImg" ></image>
				</view>
			</view>
		</view>
        <view class="topheader">
          <u-image style="margin-top: 10px; margin-left: 15px" :src="hotImage" width="15px" height="25px"></u-image>
          <view style="margin-top: 10px; margin-left: 10px; font-size: 15px; width: 70%">政务服务</view>
          <view style="
          margin-left: 10px;
          margin-top: 10px;
          font-size: 13px;
          color: #2a9595;
        ">收起</view>
          <u-image style="margin-top: 10px; margin-left: 5px" :src="downImage" width="25px" height="25px"></u-image>
        </view>
        <view class="singleLine"></view>
        <view class="approval_list">
          <view class="politic_item" v-for="(item, index) in politicList" :key="index" @click="policyClick(item)">
            <u-image style="margin-top: 5px; margin-left: 15px" :src="item.service_icon" width="25px"
              height="25px"></u-image>
            <view style="margin-top: 5px; margin-left: 5px; font-size: 15px">{{
              item.service_name
            }}</view>
          </view>
        </view>
        <view style="background-color: aliceblue; width: 100%; height: 5px"></view>
        <view class="topheader">
          <u-image style="margin-top: 10px; margin-left: 15px" :src="hotImage" width="15px" height="25px"></u-image>
          <view style="
          margin-top: 10px;
          margin-left: 10px;
          font-size: 15px;
          width: 70%;
          color: black;
        ">智慧社创</view>
        </view>
        <view class="singleLine"></view>
        <view class="approval_list">
          <view class="help_item" v-for="(item, index) in helpList" :key="index" @click="helpClick(index)">
            <u-image style="margin-top: 5px; margin-left: 15px" :src="item.icon" width="25px" height="25px"></u-image>
            <view style="margin-top: 5px; margin-left: 5px; font-size: 15px">{{
              item.name
            }}</view>
          </view>
        </view>
        <view style="background-color: aliceblue; width: 100%; height: 5px"></view>
        <view class="topheader">
          <u-image style="margin-top: 10px; margin-left: 15px" :src="hotImage" width="15px" height="25px"></u-image>
          <view style="margin-top: 10px; margin-left: 10px; font-size: 15px; width: 70%">智慧养老</view>
        </view>
        <view class="singleLine"></view>
        <view class="approval_list">
          <view class="help_item" v-for="(item, index) in olderList" :key="index" @click="careClick(item)">
            <u-image style="margin-top: 5px; margin-left: 15px" :src="item.kind_icon" width="25px"
              height="25px"></u-image>
            <view style="margin-top: 5px; margin-left: 5px; font-size: 15px">{{
              item.kind_name
            }}</view>
          </view>
        </view>
        <view style="background-color: aliceblue; width: 100%; height: 5px"></view>
		<view class="topheader">
		  <u-image style="margin-top: 10px; margin-left: 15px" :src="hotImage" width="15px" height="25px"></u-image>
		  <view style="margin-top: 10px; margin-left: 10px; font-size: 15px; width: 70%">智慧流通</view>
		</view>
		<view class="singleLine"></view>
		<view class="approval_list">
		  <view class="help_item" v-for="(item, index) in yueCarList" :key="index" @click="yuecarClick(item)">
		    <u-image style="margin-top: 5px; margin-left: 15px" :src="item.icon" width="25px" height="25px"></u-image>
		    <view style="margin-top: 5px; margin-left: 5px; font-size: 15px">{{
		      item.name
		    }}</view>
		  </view>
		</view>
		<view style="background-color: aliceblue; width: 100%; height: 5px"></view>
        <view class="topheader">
          <u-image style="margin-top: 10px; margin-left: 15px" :src="hotImage" width="15px" height="25px"></u-image>
          <view style="margin-top: 10px; margin-left: 10px; font-size: 15px; width: 70%">平台服务</view>
        </view>
        <view class="singleLine"></view>
        <view class="approval_list">
          <view class="help_item" v-for="(item, index) in pingtaiList" :key="index" @click="houseClick(item)">
            <u-image style="margin-top: 5px; margin-left: 15px" :src="item.icon" width="25px" height="25px"></u-image>
            <view style="margin-top: 5px; margin-left: 5px; font-size: 15px">{{
              item.name
            }}</view>
          </view>
        </view>
        <view style="background-color: aliceblue; width: 100%; height: 5px"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
	import {
	  serviceZhengWu,
	  serviceSmart,
	  serviceRefreshToken,
	  serviceActivityUserStatus,
	  serviceGetPingTaiServiceRole,
	  ServiceShangQuanPaiHangBangList,
	  ServiceShunFengYueCarIsUserDelivery
	} from "@/api/service";
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	// import amap from "@/common/SDK/amap-wx.js";
	import { getStorage, storage, storageKeys } from '@/utils/storage'; // 引入之前转换的 TS storage 工具
	import eventBus from '@/utils/eventBus';


      // 背景颜色
	  const bgColor = ref("#2A9595");
	  const hotImage = ref('/static/service/greenLineVertical.png');
	  const downImage = ref('/static/service/unfoldImage.png');
	  const arrowdownImg = ref('/static/mine/arrowDown.png');
	  const searchimage = ref('/static/mine/searchImage.png');
      const shangquanlist = ref([]);
	  const financialList = ref([
        {
          image: "/static/service/tongzhiImage.png",
          text: "通知",
        },
        {
          image: "/static/service/jiaofeiImage.png",
          text: "缴费",
        },
        {
          image: "/static/service/yingjiservice.png",
          text: "应急",
        },
        {
          image: "/static/service/societyImage.png",
          text: "社群",
        },
        {
          image: "/static/service/fabuImage.png",
          text: "发布",
        },
        {
          image: "/static/service/xianzhiImage.png",
          text: "闲置",
        },
        {
          image: "/static/service/shoufaImage.png",
          text: "收发",
        },
        {
          image: "/static/service/shangquan.png",
          text: "商圈",
        }
      ]);
	  const politicList = ref<any[]>([]);
      
	  const helpList = ref([
        { icon: "/static/service/volenteerOrderImage.png", name: "群众点单" },
        { icon: "/static/service/lovebangImage.png", name: "爱心榜" },
        { icon: "/static/service/integralShopImage.png", name: "积分商城" },
        { icon: "/static/service/findActivityImage.png", name: "找活动" },
        { icon: "/static/service/findOrganizationImage.png", name: "找组织" },
        { icon: "/static/service/avtivitySign.png", name: "活动签到" },
        { icon: "/static/service/volenteerImage.png", name: "志愿者" },
      ]);
      
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
      
	  const olderList = ref<any[]>([]);
      const yueCarList = ref([]);
	  const pingtaiList = ref<any[]>([]);
      
      const manname = ref<string | number>('');
  
	  onShow(() => {
		manname.value = getStorage<string>(storageKeys.manname,'暂无房产');
	  });
	  onMounted(() => {
		paihangbangData();
		init();
		smartget();
		getPingTaiService();
		eventBus.on('refresh-data', handleUserUpdate);
	  });
	  onUnmounted(() => {
		// 组件卸载时，务必移除监听！
		eventBus.off('refresh-data', handleUserUpdate);
	  });
	const rightClick = () => {};
    const shouqi = () => {

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
	const paihangbangData = async() => {
		
		try {
			
			let param = {
				categaryId:'',
				page:1,
				manageId:getStorage(storageKeys.manid,'') ? getStorage(storageKeys.manid,'') : '',
				size:3,
				turnByType:0,
				useLocation:1
			};	  
			const res = await ServiceShangQuanPaiHangBangList(param);
			console.log(res);
			const resultData = res.result;
			if(resultData.length > 2){
				
				shangquanlist.value = resultData.slice(0,2);
			}else
			{
				shangquanlist.value = resultData;
			}
			
					
		} catch (error) {
			console.log(error);
		}
		
	};
    //政务
    const init = async() =>{
		
		  let DataParam = {};
		  try {
			  
				const res = await serviceZhengWu(DataParam);
				console.log(res);
				politicList.value = res.result;
			
		  } catch (error) {
				console.log(error);
		  }
    };
    //智慧养老
    const smartget = async() => {
		
		let DataParam = {};
		try {
			const res = await serviceSmart(DataParam);
			console.log(res);
			olderList.value = res.result;
        
      } catch (error) {
			console.log(error);
      }
    };
    //平台服务
    const getPingTaiService = async() => {
      
	  try {
        let param = {
          use_id: getStorage(storageKeys.userId,''),
          page_name: "Service",
          loginType: getStorage(storageKeys.loginType,''),
        };
        const res = await serviceGetPingTaiServiceRole(param);
          console.log(res);
          const dataList = res.result;
		  for(const element of dataList){
			  
			  switch (element.href){
			  	case "HOUSESOURCE":
					pingtaiList.value.push(element);
			  		break;
				case "PLATPROSERVICE":
					pingtaiList.value.push(element);
					break;
				case "PlatformRepairer":
					pingtaiList.value.push(element);
					break;
				case 'deliveryWork':
					yueCarList.value.push(element);
					break;
				case 'MYDelivery':
					yueCarList.value.push(element);
					break;	
				case 'TakeTaxi':
					yueCarList.value.push(element);
			  	default:
			  		break;
			  }
		  }
      } catch (error) {
        console.log(error);
      }
    };
	
	function toshop(item){
		uni.navigateTo({
		  url:"/pages/service/BussinessCircle/BussinessShopHomePage?shopId="+item.shopId 
		});
	}
	
	function toshangquan(){
		uni.navigateTo({
		  url: "/pages/service/BussinessCircle/BusinessCustomerHome",
		});
	}
	
    const jumpTo = (type:any) => {
      console.log(type);
      if (type === "通知") {
        uni.navigateTo({
          url: "/pages/service/notice",
        });
      } else if (type === "缴费") {
        uni.navigateTo({
          url: "/pages/service/jiaofei/paythefees",
        });
      }else if (type === "应急") {
        uni.navigateTo({
          url: "/pages/service/emergency/emergency",
        });
      } else if (type === "社群") {
        uni.navigateTo({
          url: "/pages/service/association",
        });
      } else if (type === "发布") {
        uni.navigateTo({
          url: "/pages/service/release/release",
        });
      } else if (type === "闲置") {
        uni.navigateTo({
          url: "/pages/service/unused/unusedhome",
        });
      } else if (type === "收发") {
        uni.navigateTo({
          url: "/pages/service/receiveanddispatch/receiveanddispatch",
        });
      }else if (type === "商圈") {
        uni.navigateTo({
          url: "/pages/service/BussinessCircle/BusinessCustomerHome",
        });
      }
    };
    //政务服务
    const policyClick = (item:any) => {
		
      console.log(item.service_url);
      uni.navigateTo({
        url: `/pages/service/policyDetail?url=${encodeURIComponent(item.service_url)}`
      });
    };
    const helpClick = (type:any) => {
      if (type === 0) {
        uni.navigateTo({
          url: "/pages/service/volunteerQunYuan/volunteerOrder",
        });
      } else if (type === 1) {
        uni.navigateTo({
          url: "/pages/service/volunteerQunYuan/loveList",
        });
      } else if (type === 2) {
        // uni.navigateTo({
        // 	url:'/pages/service/volunteerQunYuan/integralMall'
        // })
        uni.navigateTo({
          url: `/pages/mine/myIntegral/IntegralCity?type=${1}`
        });
      } else if (type === 3) {
        uni.navigateTo({
          url: "/pages/service/volunteerQunYuan/findActivity"
        });
      } else if (type === 4) {
        uni.navigateTo({
          url: "/pages/service/volunteerQunYuan/findOganization"
        });
      } else if (type === 5) {
        uni.navigateTo({
          url: "/pages/service/volunteerQunYuan/activitySign"
        });
      } else if (type === 6) {
			
			getServiceStatus();
      }
    };
	const getServiceStatus = async() => {
		try {
		  let param = {
		    userId: getStorage(storageKeys.userId,''),
		  };
		
		  const res = await serviceActivityUserStatus(param);
		    console.log(res);
		    const datas = res.result;
		    if (datas.status === "-1") {
		      //-1去申请
		      uni.navigateTo({
		        url: "/pages/service/volunteerQunYuan/applyVolunteer",
		      });
		    } else {
		      //0和1，已申请，查看状态
		      uni.navigateTo({
		        url:
		          `/pages/service/volunteerQunYuan/shenheStatus?status=${encodeURIComponent(datas.status)}`
		      });
		    }
		  
		} catch (error) {
		  console.log(error);
		}
	};
    const careClick = (item:any) => {
      if (item.kind_name === "居家照料") {
        uni.navigateTo({
          url: "/pages/service/smartFeedOlder/homeCare",
        });
      } else if (item.kind_name === "医疗卫生") {
        uni.navigateTo({
          url:
            `/pages/service/smartFeedOlder/medicalTreatment?id=${encodeURIComponent(item.id)}&kind_name=${encodeURIComponent(item.kind_name)}`
        });
      }
    };
	const yuecarClick = async(item:any) => {
		
		if (item.href === "deliveryWork") {
			
			try {
				
				let param = {
					userId:storage.getUserId()
					
				};	  
				const res = await ServiceShunFengYueCarIsUserDelivery(param);
				console.log(res);
				const resultData = res.result;
				if(resultData.isDelivery === 0){
								
					uni.navigateTo({
					  url: "/pages/service/shunfengCar/shunfengShouFa"
					});		
					
				}else if(resultData.isDelivery === 1){
					//已提交审核信息
					uni.navigateTo({
					  url: `/pages/service/shunfengCar/alreadyShenHe?deliveryId=${resultData.deliveryId}`
					});
				}else if(resultData.isDelivery === 2){
					
					uni.showToast({
						title:'配送权限被禁用，请联系客服',
						icon:'none',
					})
				}
				
						
			} catch (error) {
				console.log(error);
			}
			//ServiceShunFengYueCarIsUserDelivery
			
		} else if (item.href === "MYDelivery") {
		  try {
		  	
		  	let param = {
		  		userId:storage.getUserId()
		  		
		  	};	  
		  	const res = await ServiceShunFengYueCarIsUserDelivery(param);
		  	console.log(res);
		  	const resultData = res.result;
		  	if(resultData.isDelivery === 0){
		  					
		  		uni.navigateTo({
		  		  url: "/pages/service/shunfengCar/shunfengShouFa"
		  		});		
		  		
		  	}else if(resultData.isDelivery === 1){
		  		//已提交审核信息,我的运单列表
		  		uni.navigateTo({
		  		  url: `/pages/service/shunfengCar/myTexiOrderList?deliveryId=${resultData.deliveryId}`
		  		});
		  	}else if(resultData.isDelivery === 2){
		  		
		  		uni.showToast({
		  			title:'配送权限被禁用，请联系客服',
		  			icon:'none',
		  		})
		  	}
		  	
		  			
		  } catch (error) {
		  	console.log(error);
		  }
		} else if (item.href === "TakeTaxi") {
		  uni.navigateTo({
		    url: "/pages/service/shunfengCar/goyueCar"
		  });
		}
	};
    const houseClick = (item:any) => {
		
      if (item.href === "HOUSESOURCE") {
        uni.navigateTo({
          url: "/pages/service/HouseInformation/houseInformation"
        });
      } else if (item.href === "PLATPROSERVICE") {
        uni.navigateTo({
          url: `/pages/service/pingtaiService/pingtaiService?code=${encodeURIComponent(item.code)}`
        });
      } else if (item.href === "PlatformRepairer") {
        uni.navigateTo({
          url: "/pages/service/pingtaiCheck/pingtaiCheck"
        });
      }
    };
    //搜索
    const searchClick = () => { };
    //切换房产
    const mannameClick = () => {
      uni.navigateTo({
        url: "/pages/service/changeMainHouse",
      });
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
	        url: "http://36.138.20.28:9004/app/users/freshToken",
	        method: "GET",
	        data: {
	          loginType: getStorage(storageKeys.loginType,''),
	          authorToken: getStorage(storageKeys.token,''),
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

    
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
}

.flex {
  display: flex;
}

.financial_situation {
  width: 100%;
  background: #fff;
  padding: 15px;
  margin-top: 10px;
  box-sizing: border-box;

  .situation_top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .situation_title {
      color: #333;
    }

    .situation_date {
      ::v-deep .uni-select {
        border-bottom: 1px solid #ccc;
      }
    }
  }

  .situation_contect {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // align-items: center;
    // gap: 24upx;
    // justify-content: space-evenly;

    .situation_item {
      width: 25%;
      font-size: 12px;
      // margin-right: 24upx;
      color: #000;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 65upx;
      margin-bottom: 64upx;

      .item_text {
        margin-top: 4upx;
      }
    }
  }
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
.haowu_list{
	display: flex;
	background-color: white;
	width: 100%;
	flex-wrap: wrap;
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
}
.politic_contect{
	
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	   // gap: 24upx;
	
	background-color: aliceblue; 
	 
	justify-content: flex-start;  /* 关键：让子元素从左边开始排列 */
}
.haowu_item{
		width: 50%;
		height: 120px;
		font-size: 13px;
		color: #000;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		margin-bottom: 15px;
} 



</style>
