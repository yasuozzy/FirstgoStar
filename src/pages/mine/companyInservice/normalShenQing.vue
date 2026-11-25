<template>
    <view class="main">
       <view class="custom-navbar">
         <view class="navbar-content">
           <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
           <view class="title-container">
             <u-image style="margin-top: 5px;margin-left: 15px;"
               :src="companyImage?companyImage:normalIcon"
               width="20px"
               height="20px"
             ></u-image>
			 <view class="headerView" @click="chooseTitle">{{companyName}}</view>
			 <u-image style="margin-top: 8px;margin-left: 5px;"
			   :src="downImage"
			   width="20px"
			   height="15px"
			 ></u-image>
			 <view style="font-size: 13px;color: white;margin-top: 5px;margin-left: 5px;width: 60px;" @click="hitory">历史记录</view>
           </view>
         </view>
       </view>
	   <view class="listView" @click="qingkuanClick">
		   <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 85%;">请款</view>
		   <u-image style="margin-top: 12px;margin-left: 15px;"
		     :src="arrowImg"
		     width="8px"
		     height="12px"
		   ></u-image>
	   </view>
	   <view class="listView" @click="backmoneyClick">
	   		   <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 85%;">还款</view>
			   <u-image style="margin-top: 12px;margin-left: 15px;"
			     :src="arrowImg"
			     width="8px"
			     height="12px"
			   ></u-image>
	   </view>
	   <view class="listView" @click="baoxiaoClick">
	   		   <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 85%;">报销</view>
			   <u-image style="margin-top: 12px;margin-left: 15px;"
			     :src="arrowImg"
			     width="8px"
			     height="12px"
			   ></u-image>
	   </view>
	   <view class="listView" @click="shenqing">
	   		   <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 85%;">申请</view>
			   <u-image style="margin-top: 12px;margin-left: 15px;"
			     :src="arrowImg"
			     width="8px"
			     height="12px"
			   ></u-image>
	   </view>
	   <view class="listView" @click="qingjia">
	   		   <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 85%;">请假</view>
			   <u-image style="margin-top: 12px;margin-left: 15px;"
			     :src="arrowImg"
			     width="8px"
			     height="12px"
			   ></u-image>
	   </view>
	   <view class="listView" @click="ribao">
	   		   <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 85%;">日报</view>
			   <u-image style="margin-top: 12px;margin-left: 15px;"
			     :src="arrowImg"
			     width="8px"
			     height="12px"
			   ></u-image>
	   </view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineComInsideNolmalSHGetHouse} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const normalIcon = ref('/static/service/normalIcon.png');
	const companyImage = ref('');
	const companyName = ref('');
	const estId = ref('');
	const downImage = ref('/static/mine/arrowDown.png');
	const arrowImg = ref('/static/service/my_arrow.png');
	const houseList = ref([]);
	const itemList = ref([]);
            
	onMounted(() => {
	  init();
	});
            
    const init = async() => {
			try {
				let param = {
					userId:storage.getUserId(),
				};			
				const res = await MineComInsideNolmalSHGetHouse(param);
								
				console.log(res);						
				houseList.value = res.result;
				if (storage.getCompanyName()) {
					
					companyName.value = storage.getCompanyName();
					companyImage.value = storage.getCompanyImage();
					estId.value = storage.getEstId();
				}else
				{
					companyName.value = res.result[0].companyName;
					companyImage.value = res.result[0].companyImage;
					estId.value = res.result[0].estId;
					storage.saveCompanyName(res.result[0].companyName);
					storage.saveCompanyImage(res.result[0].companyImage);
					storage.saveEstId(res.result[0].estId);
				}
				const result = res.result;
				itemList.value = result.map(item => item.companyName);
				console.log(estId.value);
							  
				
			} catch (error) {
				console.log(error)
			}
    };
	const chooseTitle = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(itemList[res.tapIndex])
				companyName.value = itemList.value[res.tapIndex];
				companyImage.value = houseList.value[res.tapIndex].companyImage;
				estId.value = houseList.value[res.tapIndex].estId;
				storage.saveCompanyName(itemList.value[res.tapIndex]);
				storage.saveCompanyImage(houseList.value[res.tapIndex].companyImage);
				storage.saveEstId(houseList.value[res.tapIndex].estId);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
	//历史记录
	const hitory = () => {
		
		uni.navigateTo({
			url:'/pages/mine/companyInservice/historyList'
		})
	};
	//请款
	const qingkuanClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/QingKuan?estId=${encodeURIComponent(estId.value)}`
		})
	};
	//还款
	const backmoneyClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/BackMoney?estId=${encodeURIComponent(estId.value)}`
		})
	};
	const baoxiaoClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/BaoXiao?estId=${encodeURIComponent(estId.value)}`
		})
	};
	const shenqing = () => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/ShenQing?estId=${encodeURIComponent(estId.value)}`
		})
	};
	const qingjia = () => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/QingJia?estId=${encodeURIComponent(estId.value)}`
		})
	};
	const ribao = () => {
		console.log(estId);
		uni.navigateTo({
			url:`/pages/mine/companyInservice/RiBao?estId=${encodeURIComponent(estId.value)}`
		})
	};
       
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
         .flex{
             display: flex;
			 flex-direction: row;
			 width: 100%;
			 // background-color: red;
         }
	 .custom-navbar {
	   height:calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
	   position: relative;
	   width: 100%;
	   background-color: #2A9595;
	 }
	 .navbar-content {
	   display: flex;
	   align-items: center;
	   height: 100%;
	   padding: 0 15px; /* 整体左右边距 */
	 }
	 
	 .back-icon {
	   margin-right: 10px; /* 返回键与搜索框间距 */
	 }
	 
	 .title-container {
	   display: flex;
	   flex-direction: row;
	   margin-left: 10px;
	   width: 95%;
	   // background-color: red;
	   margin-top: calc(var(--status-bar-height));
	 }
	 .listView{
		 
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
		 margin-top: 10px;
		 background-color: white;
	 }
	 .headerView{
		 font-size: 13px;
		 color: white;
		 margin-top: 5px;
		 margin-left: 10px;
	
		 white-space: nowrap;      /* 禁止换行 */
		overflow: hidden;         /* 隐藏溢出内容 */
		text-overflow: ellipsis;  /* 显示省略号 */
		width: 170px;            /* 设置固定宽度 */
	 }
    
	}
</style>