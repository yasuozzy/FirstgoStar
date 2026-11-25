<template>
    <view class="main">
        <u-navbar
          title=""
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
		<view style="width: 100%;height: 150px;background-color: #2A9595;"></view>
		<view style="width: 100%;font-size: 20px;color: white;background-color: #2A9595;text-align: center;" v-if="statusString == 1 || statusString == 4 ">审核中......</view>
		<view style="width: 100%;font-size: 20px;color: white;background-color: #2A9595;text-align: center;" v-if="statusString == 2 || statusString == 5 ">审核通过</view>
		<view style="width: 100%;font-size: 20px;color: white;background-color: #2A9595;text-align: center;" v-if="statusString == 3 || statusString == 6 ">审核未通过</view>
		<image :src="newbg" style="width: 100%;height: 150px;"></image>
		<view style="margin-top: 70px;width: 100%;font-size: 14px;text-align: center;" v-if="statusString == 1 || statusString == 4 ">你提交的材料正在审核中,请耐心等待</view>
		<view style="margin-top: 70px;width: 100%;font-size: 14px;text-align: center;" v-if="statusString == 2 || statusString == 5 ">你可以在平台进行兼职配送任务了</view>
		<view style="margin-top: 70px;width: 100%;font-size: 14px;text-align: center;" v-if="statusString == 3 || statusString == 6 ">{{regectedOpinion}}</view>
		<view v-if="statusString == 1 || statusString == 4 " class="buttonView" @click="detailClick">查看详情</view>
		<view v-if="statusString == 2 || statusString == 5 " class="buttonView" @click="detailClick">查看详情</view>
		<view v-if="statusString == 3 || statusString == 6 " class="buttonView" @click="retijiaoClick">重新提交</view>
		<view v-if="statusString == 2 || statusString == 5 " class="carAuthView" @click="cararthClick">车辆授权</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarDeliveryDetailAudit} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const newbg = ref('/static/service/newbg.png');
	const deliveryId = ref('');
	const dataDict = ref({});
	const statusString = ref('');
	const regectedOpinion = ref('');
	
	
	onLoad((options:any) => {
		
		deliveryId.value = options.deliveryId;
		
	});
	onMounted(() => {
		loadData()
	});
	const loadData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				id: deliveryId.value
			};
			ServiceShunFengYueCarDeliveryDetailAudit(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
				statusString.value = res.result.state;
				regectedOpinion.value = res.result.regectedOpinion;
			});
		} catch (error) {
			console.log(error);
		}
	};
	const detailClick = () => {
		
		uni.navigateTo({
		  url: `/pages/service/shunfengCar/shenheDetail?deliveryId=${deliveryId.value}`
		});	
	};
	const retijiaoClick = () => {
		
		
		uni.navigateTo({
		  url: `/pages/service/shunfengCar/editShenheDetail?deliveryId=${deliveryId.value}`
		});	
	};
	//车辆授权
	const cararthClick = () => {
		
		uni.navigateTo({
		  url: `/pages/service/shunfengCar/carAuthPage?deliveryId=${deliveryId.value}`
		});	
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
		   .buttonView{
		                
			   margin-top: 50px;
			   background-color: #2A9595;
			   border-radius: 5px;
			   color: white;
			   font-size: 14px;
			   margin-left: 5%; 
			   display: flex;
			   justify-content: center; /* 水平居中 */
			   align-items: center;     /* 垂直居中 */
			   height: 40px;           /* 需要设置高度 */
			   width: 90%;             /* 需要设置宽度 */
		    }
			.carAuthView{
				margin-top: 30px;
				background-color: #2A9595;
				border-radius: 5px;
				color: white;
				font-size: 14px;
				margin-left: 5%; 
				display: flex;
				justify-content: center; /* 水平居中 */
				align-items: center;     /* 垂直居中 */
				height: 40px;           /* 需要设置高度 */
				width: 90%;             /* 需要设置宽度 */
			}

}
</style>