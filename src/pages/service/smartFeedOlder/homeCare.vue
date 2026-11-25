<template>
    <view class="main">
        <u-navbar
          title="居家照料"
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
		<view class="associationView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: red;">居家照料</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in opinionList"
				  :key="index" @click="careClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { serviceSmartFeedGoToSign, serviceSmartFeedGetSignInfo } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const opinionList = ref([
	{ image: '/static/service/gotogotoSignUp.jpg', title: '去签到' },
	{ image: '/static/service/serviceOrders.jpg', title: '服务工单' },
]);

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const careClick = (type: string) => {
	if (type === '去签到') {
		try {
			let param = { service_user_id: storage.getUserId() };
			serviceSmartFeedGoToSign(param).then((res: any) => {
				console.log(res);
				if (res.result && res.result.order_id) {
					getSignInfo(res.result.order_id);
				} else {
					uni.showToast({ title: '暂无打卡设置信息', icon: 'none' });
				}
			});
		} catch (error) {
			console.log(error);
		}
	} else {
		uni.navigateTo({
			url: '/pages/service/smartFeedOlder/serviceOrderList'
		});
	}
};

const getSignInfo = (idstring: string) => {
	try {
		let param = { id: idstring };
		serviceSmartFeedGetSignInfo(param).then((res: any) => {
			console.log(res);
			uni.navigateTo({
				url: '/pages/service/smartFeedOlder/gotoSign?result=' + JSON.stringify(res.result) + '&order_id=' + idstring
			});
		});
	} catch (error) {
		console.log(error);
	}
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
	 .associationView{
	 	display: flex;
	 	flex-direction: column;
	 	margin-left: 4%;
	 	width: 92%;
	 	margin-top: 10px;
	 	background-color: white;
	 	border-radius: 5px;
	 	.itemview{
	 		display: flex;
	 		flex-direction: row;
	 		.situation_item {
	 		  width: 25%;
	 		  font-size: 12px;
	 		  color: #000;
	 		  margin-top: 20px;
	 		  box-sizing: border-box;
	 		  display: flex;
	 		  flex-direction: column;
	 		  align-items: center;
	 		  height: 65upx;
	 				margin-bottom: 64upx;
	 				.item_text{
	 					margin-top: 8upx;
	 				}
	 		}
	 	}
	 }
    }
</style>