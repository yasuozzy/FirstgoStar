<template>
    <view class="main">
        <u-navbar
          title="平台供应"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<image style="width: 100%;height: 150px;" :src="dataDict.img"></image>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="font-size: 13px;width: 250px;margin-top: 10px;margin-left: 15px;">{{dataDict.vendor_name}}</view>
			<view class="starView" v-for="n in dataDict.point" :key="n">
				<u-image style="margin-top: 10px;margin-left: 5px;"
				  :src="starimage"
				  width="12px"
				  height="12px"
				></u-image>
			</view>
		</view>
		<view style="font-size: 12px;margin-left: 15px;margin-top: 10px;">营业时间:{{dataDict.business_start}}-{{dataDict.business_end}}</view>
		<view style="font-size: 12px;margin-left: 15px;margin-top: 10px;">{{dataDict.address}}</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;" @click="phoneCall(dataDict.mobile)">
			<view style="font-size: 12px;margin-left: 15px;margin-top: 10px;width: 85%;">联系电话:{{dataDict.mobile}}</view>
			<u-image style="margin-top: 10px;margin-left: 5px;"
			  :src="phoneImage"
			  width="20px"
			  height="20px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="font-size: 12px;margin-left: 15px;margin-top: 10px;">本店在售</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="item-list" v-for="(item,index) in dataList" :key="index">
				<view style="width: 100%;height: 99px;display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;"
					  :src="item.imgurl"
					  width="80px"
					  height="80px"
					></u-image>
					<view style="width: 170px;height: 90px;display: flex;flex-direction: column;margin-left: 10px;">
						<view style="margin-top: 10px;font-size: 13px;width: 200px;">{{item.servicename}}</view>
						<view style="margin-top: 10px;font-size: 12px;color: red;width: 200px;">￥{{item.price}}</view>
					</view>
					<view style="width: 100%;height: 90px;align-items: right;">
						<view class="buttonView" @click="buyClick(item)">购买</view>
					</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceSmartFeedOlderMedicalDet, serviceSmartFeedOlderMedicalGoodsList } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const title = ref("疫情供应");
const starlist = ref([1, 2, 3, 4, 5]);
const starimage = ref("/static/service/starselected.png");
const location = ref("山东省潍坊市昌邑市都昌街道马家社区");
const time = ref('00:00-23:50');
const phone = ref('0536-2345758');
const dataList = ref<any[]>([]);
const idstring = ref('');
const vendorsCode = ref('');
const dataDict = ref<any>({});
const phoneImage = ref('/static/service/callImg.png');
const userId = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
	vendorsCode.value = options.vendorsCode || '';
	console.log(idstring.value);
});

onMounted(() => {
	init();
	getGoodsList();
});

const init = () => {
	try {
		let param = { id: idstring.value };
		serviceSmartFeedOlderMedicalDet(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			userId.value = res.result.userid;
		});
	} catch (error) {
		console.log(error);
	}
};

const getGoodsList = () => {
	try {
		let param = {
			userId: vendorsCode.value,
			listType: "1",
			page: "1",
			size: "50"
		};
		serviceSmartFeedOlderMedicalGoodsList(param).then((res: any) => {
			console.log(res);
			dataList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const phoneCall = (phoneNumber: string) => {
	uni.makePhoneCall({
		phoneNumber: phoneNumber,
		success: () => {
			console.log('拨打电话成功');
		},
		fail: (error: any) => {
			console.error('拨打电话失败:', error);
			uni.showToast({ title: '拨打电话失败，请重试', icon: 'none' });
		}
	});
};

const buyClick = (item: any) => {
	if (storage.getUserId() === userId.value) {
		uni.showToast({ title: '自己不能购买自己的服务', icon: 'none' });
		return;
	}
	uni.navigateTo({
		url: '/pages/service/smartFeedOlder/buyService?id=' + item.id
	});
};
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
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
	 .starView{
	 		display: flex;
	 		flex-direction: row;
	 		width: 60px;
	 		height: 20px;
	 }
	 .item-list{
		 width: 100%;
		 height: 100px;
		 display: flex;
		 flex-direction: column;
	 }
	 .buttonView{
		 width: 60px;
		 margin-top: 30px;
		 height: 25px;
		 border: 1px #2A9595 solid;
		 border-radius: 4px;
		 background-color: white;
		 color: #2A9595;
		 font-size: 12px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 margin-left: 10px;
	 }
    }
</style>