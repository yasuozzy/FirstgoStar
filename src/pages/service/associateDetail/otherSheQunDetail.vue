<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<u-image
		  :src="dataDict.chatgroup_avater?dataDict.chatgroup_avater:headerDefaltImg"
		  width="375px"
		  height="150px"
		></u-image>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">本群创建于:{{dataDict.createTime}}</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{dataDict.chatgroup_description}}</view>
		<view style="width: 100%;height: 6px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 10px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;font-size: 13px;width: 85%;">成员概况</view>
			<view style="margin-left: 10px;font-size: 13px;">{{dataDict.num}}人</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<!-- 需要饼状图 -->
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="addClick">加入组群</view>
			</view>

		 </view>
</view>
</template>

<script setup lang="ts">
	import { serviceSgeQunOtherDetail, serviceAddAttention } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const groupId = ref('');
	const tencent_groupid = ref('');
	const headerDefaltImg = ref('/static/service/headerDefaltImg.png');
	const dataDict = ref<any>({});

	const init = () => {
		try {
			let param = {
				groupId: groupId.value,
				userId: storage.getUserId(),
			};
			serviceSgeQunOtherDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
			});
		} catch (error) {
			console.log(error);
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	//加关注
	const addClick = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				groupId: groupId.value,
				tencentGpId: tencent_groupid.value,
			};
			serviceAddAttention(param).then((res: any) => {
				console.log(res);
				uni.showToast({
					title: '关注成功',
					icon: 'none',
				});
				//群聊关注列表刷新通知 KNotificationNameGroupChatFollowLoad
			});
		} catch (error) {
			console.log(error);
		}
	};

	onLoad((options: any) => {
		groupId.value = options.groupId;
		tencent_groupid.value = options.tencent_groupid;
		init();
	});
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
	 .footer-container {
	           position: fixed;
	           bottom: 0;
	           left: 0;
	           right: 0;
	           height: 70px;
	           background-color: white;
	           box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	           z-index: 100;
	           color: white;
	           display: flex;
	           justify-content: center; /* 水平居中 */
	           align-items: center;     /* 垂直居中 */

	         }
	         .order-button {

	             display: flex;
	             justify-content: center; /* 水平居中 */
	             align-items: center;     /* 垂直居中 */
	             height: 35px;           /* 需要设置高度 */
	             width: 92%;
	             margin-right: 10px;
	             font-size: 13px;
	             color: white;
	             background-color: #2A9595;
	             border-radius: 6px;
	             margin-left: 4%;
	             margin-top: 15px;
	         }
    }
</style>
