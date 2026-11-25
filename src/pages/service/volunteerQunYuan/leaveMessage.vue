<template>
    <view class="main">
        <u-navbar
          title="留言咨询"
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
		<view style="display: flex;width: 100%;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;flex-direction: row;">
					<u-avatar style="margin-left: 15px;margin-top: 10px;" :src="item.user_head_img" ></u-avatar>
					<view v-if="item.is_reply === 0" style="margin-top: 15px;margin-left: 15px;font-size: 14px;">留言</view>
					<view v-if="item.is_reply === 1" style="margin-top: 15px;margin-left: 15px;font-size: 14px;">回复</view>
				</view>
				<view style="margin-top: 10px;margin-left: 14%;width: 82%;font-size: 13px;">{{item.content}}</view>
				<view v-if="item.is_reply === 0" style="color: #2A9595;font-size: 13px;margin-left: 55px;margin-top: 10px;">{{item.leave_time}}</view>
				<view v-if="item.is_reply === 1" style="color: #2A9595;font-size: 13px;margin-left: 55px;margin-top: 10px;">{{item.reply_time}}</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<input class="searchlocation" v-model="message" placeholder="输入留言内容..." type="text" />
				<view class="setupButton" @click="leaveMessageClick">留言</view>
			 </view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceFindActivityLeaveMessage, serviceFindActivitySetUpMessage } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const act_id = ref('');
const dataList = ref<any[]>([]);
const message = ref('');

onLoad((options: any) => {
	act_id.value = options.id || '';
});

onMounted(() => {
	loadData();
});

const loadData = () => {
	try {
		let param = {
			userId: storage.getUserId(),
			act_id: act_id.value,
		};
		serviceFindActivityLeaveMessage(param).then((res: any) => {
			console.log(res);
			dataList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const leaveMessageClick = () => {
	if (message.value.length === 0) {
		uni.showToast({ title: '请输入留言内容', icon: 'none' });
		return;
	}
	try {
		let param = {
			userId: storage.getUserId(),
			act_id: act_id.value,
			content: message.value,
		};
		serviceFindActivitySetUpMessage(param).then((res: any) => {
			console.log(res);
			dataList.value = [];
			loadData();
			message.value = '';
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
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
	 .listItem{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
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
	           color: black;
	           display: flex;
	           justify-content: center;
	           align-items: center;
	}
	.searchlocation{
	         margin-left: 4%;
	         width: 70%;
	         height: 35px;
	         margin-top: 10px;
	         border: 1px aliceblue solid;
	         border-radius: 5px;
	         font-size: 14px;
			 color: black;
			 background-color: aliceblue;
	     }
		 .setupButton{
			 margin-top: 10px;
			 margin-left: 10px;
			 width: 70px;
			 height: 35px;
			 background-color: #2A9595;
			 color: white;
			 font-size: 14px;
			 border-radius: 17px;
			 display: flex;
			align-items: center;
			justify-content: center;		
		}
    }
</style>