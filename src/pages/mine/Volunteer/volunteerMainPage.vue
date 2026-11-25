<template>
    <view class="main">
        <u-navbar
          title="志愿者"
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
		<view style="background-color: #2A9595;width: 100%;height: 180px;display: flex;flex-direction: column;">
			<view style="margin-top: 20px;width: 100%;height: 60px;display: flex;flex-direction: row;">
				<image :src="dataDict.head_img" style="width: 60px;height: 60px;border-radius: 30px;margin-left: 42%"></image>
				<u-icon style="margin-top: 25px;margin-left: 90px;" name="setting" color="#fff" size="28" @click="settingClick"></u-icon>
			</view>
			<view style="margin-top: 20px;width: 100%;text-align: center;font-size: 15px;color: white;">{{dataDict.name}}</view>
			<view style="margin-top: 15px;width: 100%;text-align: center;font-size: 13px;color: white;">{{dataDict.declaration  ? dataDict.declaration : '此人很懒，还没有个性签名！' }}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;">
			<view style="display: flex;flex-direction: column;width: 33.33%;" @click="numClick()">
				<view style="text-align: center;font-size: 12px;">{{dataDict.act_times ? dataDict.act_times : 0}}</view>
				<view style="text-align: center;font-size: 12px;margin-top: 10px;">公益次数</view>
			</view>
			<view style="display: flex;flex-direction: column;width: 33.33%;" @click="gongyiClick()">
				<view style="text-align: center;font-size: 12px;">{{dataDict.donate_score ? dataDict.donate_score : 0}}</view>
				<view style="text-align: center;font-size: 12px;margin-top: 10px;">公益积分</view>
			</view>
			<view style="display: flex;flex-direction: column;width: 33.33%;" @click="paimingClick()">
				<view style="text-align: center;font-size: 12px;">{{dataDict.rank ? dataDict.rank : 0}}</view>
				<view style="text-align: center;font-size: 12px;margin-top: 10px;">个人排名</view>
			</view>
		</view>
		<view style="margin-top: 10px;font-size: 13px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="itemlist" v-for="(item,index) in itemList" :key="index" @click="volClick(index)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-left: 15px;margin-top: 15px;font-size: 14px;width: 85%;">{{item.title}}</view>
					<image style="margin-top: 15px;margin-left: 15px;width: 8px;height: 12px;" :src="item.icon"></image>
				</view>
				<view style="margin-top: 15px;font-size: 13px;width: 100%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsVolunteerGetPersonalInfo} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const itemList = ref([{title:'志愿认领',icon:'/static/service/my_arrow.png'},
						{title:'我的积分',icon:'/static/service/my_arrow.png'},
						{title:'我的活动',icon:'/static/service/my_arrow.png'},
						{title:'加入的组织',icon:'/static/service/my_arrow.png'},
						{title:'我的足迹',icon:'/static/service/my_arrow.png'},
						{title:'兑换记录',icon:'/static/service/my_arrow.png'}
	]);
	
	onShow(() => {
		loadData();
	});
	const loadData = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId()
			};
			const res = await MineNeedToolsVolunteerGetPersonalInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			
			
		}catch (error) {
			console.log(error)
		}
	};
	const settingClick = () => {
		
		uni.navigateTo({
		  url: "/pages/mine/Volunteer/volunteerSetting",
		});
	};
	const numClick = () => {
		
		uni.navigateTo({
		  url: "/pages/service/volunteerQunYuan/loveList",
		});
	};
	const gongyiClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/Volunteer/gongyiIntegral'
		})
	};
	const paimingClick = () => {
		
		uni.navigateTo({
		  url: "/pages/service/volunteerQunYuan/loveList",
		});
	};
	const volClick = (index:any) => {
		
		if(index === 0){
			
			uni.navigateTo({
				url:'/pages/mine/Volunteer/volunteerRenLing'
			})
		}else if(index === 1){
			
			uni.navigateTo({
				url:'/pages/mine/Volunteer/gongyiIntegral'
			})
			
		}else if(index === 2){
			
			uni.navigateTo({
				url:'/pages/mine/Volunteer/gongyiActivity'
			})
			
			
		}else if(index === 3){
			
			uni.navigateTo({
				url:'/pages/mine/Volunteer/joinedOrganization'
			})
			
		}else if(index === 4){
			
			uni.navigateTo({
				url:'/pages/mine/Volunteer/myFootStep'
			})
			
		}else if(index === 5){
			
			uni.navigateTo({
				url:'/pages/mine/Volunteer/rechargeNotes'
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
		  .itemlist{
			  display: flex;
			  flex-direction: column;
		  }
}
</style>