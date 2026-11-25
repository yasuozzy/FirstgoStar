<template>
    <view class="main">
        <u-navbar
          title="网格信息"
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
		<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
			<view style="color: gray;font-size: 14px;margin-top: 15px;margin-left: 15px;">网格编号:</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.gridNo}}</view>
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-left: 4%;margin-top: 10px;"></view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
			<view style="color: gray;font-size: 14px;margin-top: 15px;margin-left: 15px;">所在区域:</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.region}}</view>
		</view>
		<view style="width: 100%;height: 40px;background-color: aliceblue;margin-top: 10px;">
			<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
			<view style="color: gray;font-size: 14px;margin-top: 5px;margin-left: 15px;">网格人员</view>
		</view>

		<view class="approval_list">
			<view class="help_item" v-for="(item,index) in dataDict.userList" :key="index">
				<u-image style="margin-top: 5px;"
				  :src="item.headImg ?item.headImg :defaultIocn"
				  width="25px"
				  height="25px"
				></u-image>
				<view style="margin-top: 5px;margin-left: 5px;font-size: 15px;">{{item.userName}}</view>
				<view style="margin-top: 5px;margin-left: 5px;font-size: 13px;color: gray;">{{item.userMobile}}</view>
				<view style="margin-top: 5px;margin-left: 5px;font-size: 13px;color: gray;">{{item.region}}</view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="GridMaster">网格长推选</view>
			</view>

		 </view>
</view>
</template>

<script setup lang="ts">
	import { serviceWangGeDetail } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const gridNo = ref('');
	const page = ref(1);
	const dataDict = ref<any>({});
	const defaultIocn = ref('/static/service/myIconImage.png');

	const init = () => {
		try {
			let param = {
				gridNo: gridNo.value,
				page: page.value,
				size: 10,
				userId: storage.getUserId(),
			};
			serviceWangGeDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
			});
		} catch (error) {
			console.log(error);
		}
	};

	//网格长推选
	const GridMaster = () => {
		if (dataDict.value.isCanVote === 1) {
			uni.navigateTo({
				url: '/pages/service/associateDetail/gotoVote'
			});
		} else {
			uni.showToast({
				title: '当前没有在进行的投票推选',
				icon: 'none',
			});
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		gridNo.value = options.gridNo;
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
	 .approval_list{
	 	  display: flex;
	 	  background-color: white;
	 	  width: 100%;
	 	  flex-wrap: wrap; /* 允许换行 */
	 	  margin-top: 10px;
	 }
	 .help_item{

	 	  display: flex;
	 	  flex-direction: column;
	 	  box-sizing: border-box;
	 	  width: 105px;
	 	  height: 120px;
		  background-color: aliceblue;
		  margin-left: 15px;
		  margin-top: 10px;
		  border-radius: 5px;
		  text-align: center;
		  justify-content: center;
		  align-items: center;
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
