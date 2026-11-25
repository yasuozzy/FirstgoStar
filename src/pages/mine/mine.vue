<template>
  <view class="main">
    <!-- ============ 头部区域 ============ -->
	 <scroll-view scroll-y="true" style="flex: 1; height: 100%;">
		  <view>
			<view class="top">
			  <view class="use_info">		
				<view style="margin-left: 10px;border-radius: 17.5px;width: 35px;height: 35px;" @click="myinfoClick">
					<image style="width: 50px;height: 50px;border-radius: 25px;" :src="avatar"></image>
				</view>
				
				<view class="use_info_text">
				  <view class="use_name">{{userName}}</view>
				  <view class="use_company">{{address}}</view>
				</view>
			  </view>
			  <u-icon style="margin-top: 25px;margin-right: 20px;" name="setting" color="#fff" size="28" @click="settingClick"></u-icon>
			  <view class="functional_area">
				<view class="areaTop" >
				   <view class="areaTop_item" @click="scan">
					 <view class="areaTop_icon">
					   <u-icon name="scan" size="28"></u-icon>
					 </view>
					 <view class="areaTop_title"> 扫一扫 </view>
				   </view>
				   <view class="areaTop_item" @click="jianguanClick">
					 <view class="areaTop_icon"> {{loanBlance}} </view>
					 <view class="areaTop_title"> 监管账户 </view>
				   </view>
				   <view class="areaTop_item" @click="shoufukuanClick">
					 <view class="areaTop_icon">
					   <u-image 
						 :src="getRecieveMoney"
						 width="25px"
						 height="25px"
					   ></u-image>
					 </view>
					 <view class="areaTop_title"> 收付款 </view>
				   </view>
				</view>
				<view class="areaBottom">
				  <view class="areaBottom_item" @click="myvollet">
					<view class="areaTop_icon"> {{balance}} </view>
					<view class="areaTop_title"> 我的钱包 </view>
				  </view>
				  <view class="areaBottom_item" @click="myIntegralClick">
					<view class="areaTop_icon"> 0 </view>
					<view class="areaTop_title"> 我的积分 </view>
				  </view>
				  <view class="areaBottom_item" @click="yufuVolletClick()">
					<u-image
					  :src="yufuVolletImage"
					  width="20px"
					  height="20px"
					></u-image>
					<view class="areaTop_title"> 预付钱包 </view>
				  </view>
				</view>
			  </view>
			</view>
			<!-- <button @click="ReturnGo()">退出</button> -->
			<!-- ============ 头部功能区域 ============ -->
			<view class="associationView">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">订单管理</view>
				<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(item, index) in electionList"
					  :key="index" @click="orderClick(item.name)"
					>
					  <u-image
						:src="item.icon"
						width="30px"
						height="30px"
					  ></u-image>
					  <view class="item_text">{{ item.name }}</view>
					</view>
				</view>
				
			</view>
			<view class="oamanageView">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">OA治理</view>
				<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(item, index) in oamanageList"
					  :key="index" @click="financialClick(item.name)"
					>
					  <u-image
						:src="item.icon"
						width="30px"
						height="30px"
					  ></u-image>
					  <view class="item_text">{{ item.name }}</view>
					</view>
				</view>
				
			</view>
			<view class="oamanageView">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">就业群苑</view>
				<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(item, index) in jiuyeList"
					  :key="index" @click="linggongClick(item.name)"
					>
					  <u-image
						:src="item.icon"
						width="30px"
						height="30px"
					  ></u-image>
					  <view class="item_text">{{ item.name }}</view>
					</view>
				</view>
				
			</view>
			<view class="oamanageView">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">必备工具</view>
				<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(item, index) in toolsList"
					  :key="index" @click="gotools(item.href, item.name)"
					>
					  <u-image
						:src="item.icon"
						width="30px"
						height="30px"
					  ></u-image>
					  <view class="item_text">{{ item.name }}</view>
					</view>
				</view>
				
			</view>
		
		</view>
    </scroll-view>

  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage'; // 引入之前转换的 TS storage 工具
	import { mineJianGuanAcount,
	mineVollet,
	MineGetEmergencyOrderIsWOrker,
	 MineGetJianGuanAcountMoney,
	 MineGetMyVolletAndIntegral,
	 MineGetQunYuanMallData,
	 MineGetLearnToStrongContryData,
	 MineJiuYeQunYuanAuthrity,
	 MineOrderManageMentAndOaDataList} from '@/api/mine';
	import {serviceGetPingTaiServiceRole} from '@/api/service';
	 interface UserInfo {
	   balance: string;
	   totalScore: string;
	   memberScore: string;
	}
	
	const userName = ref<string | number>('');
	const address = ref<string | number>('');
	const avatar = ref<string | number>('');		
	const placeImg = ref('/static/service/myIconImage.png');		
	const yufuVolletImage = ref('/static/mine/yufuVollet.jpg');		
	const getRecieveMoney = ref('/static/mine/getRecieveMoney.png');		
	const electionList = ref([]);	
	const oamanageList = ref([]);
	const jiuyeList = ref<any[]>([]);		
	const toolsList = ref([]);
	const quickList = ref<any[]>([]);		
	const jianguanParam = reactive({
		mobile:'',
		hostNo:'',
	});		
	const walletUrl = ref<string | number>('');	
	const volletParam = reactive({
		userType:'',
		mobile:'',
		formExt:"H5",
		hostNo:''
	});		
	const volletUrl = ref<string | number>('');
	const loanBlance = ref<string | number>(0.00);
	const balance = ref<string | number>(0.00);
	const totalScore = ref<string | number>(0.00);
	const linggongList = ref<any[]>([]);
	const hezuosheList = ref<any[]>([]);
	const shareList = ref<any[]>([]);
	const lawList = ref<any[]>([]);
	const mediumList = ref<any[]>([]);
	onShow(()=>{
		
		userName.value = getStorage<string>(storageKeys.realName,'未知用户');
		address.value = getStorage<string>(storageKeys.address,'');
		avatar.value = getStorage(storageKeys.avatar,'/static/service/myIconImage.png');
	});
	onMounted(()=>{
		
		getOrderAndOAOrderList();
		getNeedToolsData();
		getJianGuanAcount();
		getMyVolletIntegral();
		getmallData();
		getLearnToStongCountry();
		getJiuYeAuthority();
	});
	
	const getOrderAndOAOrderList = async() => {
		try {
			let param = {
				use_id:getStorage(storageKeys.userId,''),
				page_name:'page_name：oddJobInn',
				loginType:getStorage(storageKeys.loginType,'')
			};
			const res = await MineOrderManageMentAndOaDataList(param);
			console.log(res);
			electionList.value = res.result.AllOrderList;
			oamanageList.value = res.result.OAList;
			
		} catch (error) {
			console.log(error)
		}
	};
	const getNeedToolsData = async() => {
		//
		try {
			let param = {
				use_id:getStorage(storageKeys.userId,''),
				page_name:'PersonalCenter',
				loginType:getStorage(storageKeys.loginType,'')
			};
			const res = await serviceGetPingTaiServiceRole(param);
			console.log(res);
			toolsList.value = res.result;
			
			
		} catch (error) {
			console.log(error)
		}
	};
   //监管账户
    const jianguanClick = async() =>{
		
		//监管账户
			try {
				jianguanParam.mobile = getStorage(storageKeys.phone,'');
				jianguanParam.hostNo = getStorage(storageKeys.hostNo,'');
				const res = await mineJianGuanAcount(jianguanParam);
				console.log(res);
				walletUrl.value = res?.result?.walletUrl??'';
				uni.navigateTo({
					url:`/pages/mine/jianguanAcount/jianguanAcount?url=${encodeURIComponent(walletUrl.value)}`
				})
				
			} catch (error) {
				console.error('获取监管账户失败:',error);
			}
		
	};
	const getJianGuanAcount = async() => {
		try {
			let param = {
				hostNo:getStorage(storageKeys.hostNo,''),
			};
			const res = await MineGetJianGuanAcountMoney(param);
			console.log(res);
			loanBlance.value = res?.result?.loanBlance ?? 0.00;
			
			
		} catch (error) {
			console.log(error)
		}
				
	};
	const getMyVolletIntegral = async() => {
		try {
			let param = {
				hostCstNo:getStorage(storageKeys.hostNo,''),
				mobileNo:getStorage(storageKeys.phone,''),
				userType:getStorage(storageKeys.cstType,'')
			};
			const res = await  MineGetMyVolletAndIntegral(param);
			console.log(res);
			
			storage.saveBalance(res?.result?.balance??0.00);
			storage.saveTotalScore(res?.result?.totalScore??0.00);
			storage.saveMemberScore(res?.result?.memberScore??0.00);
			
			balance.value = getStorage(storageKeys.balance,'');
			totalScore.value = getStorage(storageKeys.totalScore,'');
			
		} catch (error) {
			console.log(error)
		}
				
	};
	//获取就业群苑权限
	const getJiuYeAuthority = async() => {
		
		try {
			let param = {
				use_id:getStorage(storageKeys.userId,''),
				page_name:"page_name：oddJobInn",
				loginType:getStorage(storageKeys.loginType,''),
			};
			const res = await MineJiuYeQunYuanAuthrity(param);
			console.log(res);
			jiuyeList.value = res.result;
			 for (const element of jiuyeList.value) {
			    switch (element.href) {
			      case 'dayJob':
			        linggongList.value = element.childList || [];
			        break;
			      case 'LaborTeamwork':
			        hezuosheList.value = element.childList || [];
			        break;
			      case 'SharedService':
			        shareList.value = element.childList || [];
			        break;
			      case 'LegalService':
			        lawList.value = element.childList || [];
			        break;
			      case 'Medium':
			        mediumList.value = element.childList || [];
			        break;
			    }
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
	//个人信息
	const myinfoClick = () =>{
		
		uni.navigateTo({
			url:'/pages/mine/myInformation/myInfo'
		})
	};
	const myvollet = async() => {
		
		uni.navigateTo({
			url:'/pages/mine/jianguanAcount/myVollet'
		})
		
	};
    
	//设置
	const settingClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/setting/SettingPage'
		})
	};
	//扫一扫
	const scan = () => {
		
	  uni.scanCode({
	    onlyFromCamera: true,
	    success: (res) => {
	      console.log("扫码结果:", res);
	      uni.showToast({
	        title: "扫码成功",
	        icon: "success",
	      });
	    },
	    fail: (err) => {
	      console.error("扫码失败:", err);
	      uni.showToast({
	        title: "扫码失败",
	        icon: "none",
	      });
	    },
	  });
	};
	//收付款
	const shoufukuanClick = () => {
		
		
		uni.navigateTo({
			url:'/pages/mine/jianguanAcount/erWeiMa'
		})
	};
	
	//我的积分
	const myIntegralClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/myIntegral/IntegralWorkPointsPage'
		})
	};
	//预付钱包
	const yufuVolletClick = () => {
		uni.navigateTo({
		  url: "/pages/mine/PrepaidWalletPage/PrepaidWalletPage",
		});
	};
	//订单管理
   const orderClick = (type:any) => {
	   
	   // if (type === '预约订单') {
		   
		  //  uni.navigateTo({
		  //  	url:'/pages/mine/yuyueOrder/orderList'
		  //  })
	   	
	   // }else 
	   if (type === '商圈订单'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/circleOrder/circleOrder'
		   })
	   	
	   }else if (type === '商城订单'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/cityOrder/cityOrder'
		   })
	   	
	   }else if (type === '积分订单'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/integralOrder/integralOrder'
		   })
	   	
	   }else if (type === '应急订单'){
		   
		   yingjiOrder();
		  
	   	
	   }else if (type === 'AI订单'){
	   	
		uni.navigateTo({
			url:'/pages/mine/orderManagement/aiOrder'
		})
	   }else if(type === '服务订单'){
		   
		   uni.navigateTo({
		   	 url:'/pages/mine/serviceOrder/serviceOrder'
		   })
		   
	   }else if(type === '物业工单'){
		   
		   uni.navigateTo({
		   	 url:'/pages/mine/WuYeOrder/wuyeOrder'
		   })
		   
	   }else if(type === '志愿工单'){
		   
		   uni.navigateTo({
		   	 url:'/pages/mine/volunteerOrder/volunteerOrder'
		   })
	   }else if(type === '应急工单'){
		   
		   uni.navigateTo({
		   	 url:'/pages/mine/yingjihistory/emergencyHistoryList'
		   })
	   }else if(type === '工程工单'){
		   
		   uni.navigateTo({
		   	 url:'/pages/mine/gongchenggongdan/repairHistoryList'
		   })
	   }
	   
   };
   const yingjiOrder = async() =>{
	   
	   try {
	       
			let param = {
				
				userId:getStorage(storageKeys.userId,''),
				
			};
	        const res = await MineGetEmergencyOrderIsWOrker(param);         
			console.log(res);
			const dataDict = res.result;
			storage.saveTemporayId(dataDict.temporayId);
			storage.saveTemporayName(dataDict.temporayName);
			storage.saveTemporayManagerId(dataDict.managerId);
			storage.saveTemporayTakeOrder(dataDict.temporayTakeOrder);
			const isTemporay = dataDict.isTemporay;
			if (isTemporay == 0) {
				
				//去认证
				uni.navigateTo({
					url:'/pages/mine/emergencyOrder/ThirdPartTimeInput'
				})
				
			}else if (isTemporay == 1) {
				
				//
				uni.navigateTo({
					url:'/pages/mine/emergencyOrder/emergencyOrder'
				})
				
			}else if (isTemporay == 2)
			{
				uni.showToast({
					title:'维修工权限已被禁用，请联系客服',
					icon:'none',
				});
			}		
	   		
	   }catch (error) {
	       console.log(error)
	   };
   };
   const financialClick = (type:any) => {
	   
	   if (type === '财务服务') {
	   	
			uni.navigateTo({
				url:'/pages/mine/financialService/financialList'
			})
	   }else if(type === '企业内务'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/companyInservice/companyInservice'
		   })
	   }else if(type === '公共事务'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/PublicEvents/publicEvents'
		   })
	   }
   };
   
   const linggongClick = (name:any) => {
	   
	   if (name === '零工工单') {
	   	
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/linggongOrder?linggongList=${JSON.stringify(linggongList.value)}`
			})
	   }else if (name === '共享劳务') {
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/SharelaoWu/shareLaoWu?sharelaowulist=${JSON.stringify(hezuosheList.value)}`
			})
	   }else if (name === '共享用工') {
	   	
			uni.navigateTo({
				url:`/pages/mine/LingGongOrder/shareUseWork/shareUseWork?shareUseWorklist=${JSON.stringify(shareList.value)}`
			})
		
	   }else if (name === '法务服务') {
			
			uni.navigateTo({
				url:`/pages/service/work/minelaw?minelaw=${JSON.stringify(lawList.value)}`
			})
	   }else if (name === '中介招聘') {
			
			uni.navigateTo({
				url:`/pages/mine/AgentZhaoPin/AgentZhaoPin?mediumList=${JSON.stringify(mediumList.value)}`
			})
	   }
   };
    const gotools = (type: any, name?: any) => {
	   console.log('gotools 点击参数:', { type, name });
	   if (type === 'Houseproperty') {
	   		   
			   const realtype = getStorage<string>(storageKeys.realType,'');
			   if(realtype === '0'){
				   //认证房产
				   
				   uni.navigateTo({
				   	url:'/pages/mine/myHouse/IdentifyHouse'
				   })
			   }else
			   {
				   uni.navigateTo({
				   	url:'/pages/mine/myHouse/myHouse'
				   })
			   }
	   		   
	   	
	   }else if (type === 'Address'){
	   		   
	   		   uni.navigateTo({
	   		   	url:'/pages/mine/addressManagement/addressManageMent'
	   		   })
	   	
	   }else if (type === 'Share'){
	   		   
	   		   uni.navigateTo({
	   		   	url:'/pages/mine/myshare/myShare'
	   		   })
	   	
	   }else if (type === 'HouseRentSale'){
	   		   
	   		   uni.navigateTo({
	   		   	url:'/pages/mine/houserentsale/SendSaleHistory'
	   		   })
	   	
	   }
	   
	   
	   // else if (type === '我的出行'){
	   		   
	   // 		   uni.navigateTo({
	   // 		   	url:'/pages/mine/myOutWay/myOutWay'
	   // 		   })
	   	
	   // }
	   else if (type === 'MyPie'){
	   		   
	   		   uni.navigateTo({
	   		   	url:'/pages/mine/mySentOut/mySentOutList'
	   		   })
	   	
	   }else if (type === 'MyPickUp'){
	   		   
	   		   uni.navigateTo({
	   		   	url:'/pages/mine/myReceivement/myReceiveMent'
	   		   })
	   	
	   }
	   // else if (type === '我的收藏'){
	   		   
	   // 		   uni.navigateTo({
	   // 		   	url:'/pages/mine/myCollection/myCollection'
	   // 		   })
	   	
	   // }
	   else if(type === 'public_result'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/PartyQY/publicDiscuss'
		   })
		   
	   }else if(type === 'CulSpoCenter'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/cultureAndSport/cultureAndSportCenter'
		   })
	   }else if(type === 'landRent' || type === 'LandTransfer' || type === 'landTransfer' || type === '土地流转' || name === '土地流转'){
			uni.navigateTo({
		   	url:'/pages/mine/landTransfer/landTransfer'
		   })
	   }else if(type === 'ServiceManage' || type === 'ServiceManagement' || type === 'serviceManagement' || type === '服务管理' || name === '服务管理'){
		  uni.navigateTo({
			url:'/pages/mine/serviceManagement/serviceManagement'
		  })
	   }else if(type === 'Volunteers'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/Volunteer/volunteerMainPage'
		   })
	   }else if(type === 'SignIn'){
		   
		   
		   uni.navigateTo({
		   	url:'/pages/mine/MySignIn/MySignIn'
		   })
	   }else if(type === 'Management'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/ShangQuanManagement/shangquanFirstPage'
		   })
		   
	   }else if(type === 'MyBusiness'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/circleOrder/myBusinessCircle'
		   })
		   
	   }else if(type === 'HouseRentSale'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/HouseRentSale/HouseRentSale'
		   })
	   }else if(type === 'ComWorkOrder'){
		   
		   uni.navigateTo({
		   	url:'/pages/mine/wuyeBaoXiu/wuyeBaoXiu'
		   })
	   }
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
   
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  background: aliceblue;
  min-height: 100vh;
  width: 100%;
}
.top {
  height: 200px;
  background: #3AB7B8;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  padding-top: calc(var(--status-bar-height) + 16upx);
  .use_info {
	  padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .use_info_text {
      margin-left: 30px;
      .use_name {
        color: white;
        font-size: 16px;
      }
      .use_company {
        color: white;
        font-size: 12px;
		margin-top: 5px;
      }
    }
  }
  .functional_area {
    position: absolute;
    background: #fff;
    height: 150px;
    box-sizing: border-box;
    width: 92%;
    top: 110px;
	margin-top:calc(var(--status-bar-height)) ;
    // left: calc(50% - 175px);
	margin-left: 4%;
    border-radius: 8px;
    .areaTop {
      border-bottom: 1px solid #ccc;
      height: 50%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .areaTop_item {
        width: 30%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 80%;
        .areaTop_icon {
          height: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .areaTop_title {
          height: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
      }
    }
    .areaBottom {
      height: 50%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .areaBottom_item {
        width: 30%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 80%;
        .areaTop_icon {
          height: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .areaTop_title {
          height: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
      }
    }
  }
  
}
.associationView{
  	display: flex;
	
  	flex-direction: column;
  	margin-left: 4%;
  	width: 92%;
  	margin-top: calc(var(--status-bar-height) + 70px) ;
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
</style>
