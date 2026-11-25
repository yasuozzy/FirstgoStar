<template>
    <view class="main">
        <u-navbar
          title="党建群苑"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
		 <template #left>
			  <view class="u-nav-slot" slot="left">
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			  </view>
		  </template>
        </u-navbar>
		<view style="width: 100%;height: 200px;background-color: aliceblue;">
			<u-image style="margin-top: 5px;margin-left: 10px;"
			  :src="advertCode"
			  width="360px"
			  height="190px"
			></u-image>
		</view>
		<view class="oamanageView">
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in toolsList"
				  :key="index" @click="gotools(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="60px"
				    height="60px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
		<view class="oamanageView">
			<view style="display: flex;flex-direction: row;height: 50px;">
				<view style="background-color: red;margin-top: 20px;width: 30px;height: 10px;"></view>
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">党建服务</view>
			</view>
			<view class="itemview">
				<view
				  class="quick_item"
				  v-for="(item, index) in serviceList"
				  :key="index" @click="quickClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="40px"
				    height="40px"
				  ></u-image>
				  <view class="service_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	
	import {PartyQYHeader,PartyQYGetNowLocation} from '@/api/mine';
	import { ref, reactive, onMounted } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
		// 背景颜色
		const bgColor = ref("#FF0000");
		const advertCode = ref('');
		const toolsList = ref([
			{image:'/static/mine/PartyImage/dangwuzhongxin.jpg',title:'党务中心'},
			{image:'/static/mine/PartyImage/dangyhuanxuqiu.png',title:'党员需求'},
			{image:'/static/mine/PartyImage/dangyuanketang.png',title:'党员课堂'},
			{image:'/static/mine/PartyImage/wanggeshijian.png',title:'网格事件'},
			{image:'/static/mine/PartyImage/dangqunhuodong.png',title:'党员项目'},
			{image:'/static/mine/PartyImage/hulianhuzhu.png',title:'互联互助'},
			{image:'/static/mine/PartyImage/gonggongjueyi.png',title:'公共决议'},
			{image:'/static/mine/PartyImage/lovebanks.png',title:'爱心银行'},
		]);
		const serviceList = ([
			{image:'/static/mine/PartyImage/myhelp.png',title:'我的帮扶'},
			{image:'/static/mine/PartyImage/mysign.png',title:'我的签到'},
			{image:'/static/mine/PartyImage/mystudy.png',title:'我的学习'},
			{image:'/static/mine/PartyImage/biaobing.png',title:'标兵排行'},
			{image:'/static/mine/PartyImage/integral.png',title:'积分排行'},
			{image:'/static/mine/PartyImage/juanzeng.png',title:'捐赠排行'},
			
		]);
		const address = ref('');
		const latitude = ref('');
		const longitude  = ref('');
		const id  = ref('');
            
        onMounted(() => {
          loadData();
		  loadLocation();
        });
       
            
        const loadData = async() => {
            	
            	try {
            	    
            		let param = {};
            	    const res = await PartyQYHeader(param);
            	                    
            	    console.log(res);
					advertCode.value = res.result[0].advertCode;
            			
            	    
            	}catch (error) {
            	    console.log(error)
            	}
            };
		//请求现居地址
		const loadLocation = async() => {
			
			try {
				
				let param = {
					userId:getStorage(storageKeys.userId,''),
				};
				const res = await PartyQYGetNowLocation(param);
								
				console.log(res);
				const resultDict = res.result;
				if (isEmptyObject(resultDict)) {
						
						uni.showModal({
													
							cancelText:'取消',
							confirmText:'去设置',
							confirmColor:'#2A9595',
							title:'提示',
							content:'请设置你的党员常住地' + '\n' + '设置后为您按定位展示当地党组织',
							success(e) {
								console.log(e)
								if (e.confirm === true) {
									console.log('去设置');
									getNewLocation();
								}else
								{
									console.log('取消')
								}
							}
						});
						
					}else{
						
						address.value = res.result.address;
						latitude.value = res.result.latitude;
						longitude.value = res.result.longitude;
						id.value = res.result.id;
					}
					
				
			}catch (error) {
				console.log(error)
			}
		};
		const gotools = (title:any) => { 
			
			if (title === '党务中心') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/DangWuCenter'
				})
			}else if (title === '党员需求') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/partyPersonNeed'
				})
			}else if (title === '党员课堂') {
				
				uni.navigateTo({
					url:`/pages/mine/PartyQY/partyPersonClass?latitude=${encodeURIComponent(latitude.value)}&longitude=${encodeURIComponent(longitude.value)}&address=${encodeURIComponent(address.value)}` 
				})
			}else if (title === '网格事件') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/WangGe'
				})
			}else if (title === '党员项目') {
				
				uni.navigateTo({
					// url:'/pages/mine/PartyQY/paytyActivity'
					url:'/pages/mine/PartyQY/partyProject/PartyActivityList'
				})
			}else if (title === '互联互助') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/helpEachOther'
				})
			}else if (title === '公共决议') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/publicDiscuss'
				})
			}else if (title === '爱心银行') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/LoveBank'
				})
				
			}
		};
		const quickClick = (title:any) => {
			
			if (title === '我的帮扶') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/MyHelp'
				})
				
			}else if (title === '我的签到') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/MySignPage'
				})
			}else if (title === '我的学习') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/MyStudy'
				})
			}else if (title === '标兵排行') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/BiaoBingPaiHang'
				})
			}else if (title === '积分排行') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/integralPaiHang'
				})
			}else if (title === '捐赠排行') {
				
				uni.navigateTo({
					url:'/pages/mine/PartyQY/jaunzengPaiHang'
				})
			}
		};
		
		const getNewLocation = () =>{
			
		};
		const isEmptyObject = (obj:any) => {
			return Object.keys(obj).length === 0;
		};
		const goBack = () =>{
			
			uni.navigateBack()
		};
       
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .oamanageView{
	 	  display: flex;
	 	  
	 	  flex-direction: column;
	 	  margin-left: 4%;
	 	  width: 92%;
	 	  margin-top: 10px;
	 	  background-color: white;
	 	  // border-radius: 8px;
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
	 	  	  height: 70px;
	 	  			margin-bottom: 30px;
	 	  			.item_text{
	 	  				margin-top: 8px;
						font-size: 14px;
	 	  			}
	 	  	}
	 	  }
	 }
	 .quick_item{
		width: 25%;
		font-size: 12px;
		color: #000;
		margin-top: 15px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 60px;
		margin-bottom: 10px; 
		.service_text{
			margin-top: 5px;
			font-size: 14px;
		}
	 }
    }
</style>