<template>
    <view class="main">
        <u-navbar
          title="举报"
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
		<view  style="width: 100%;display: flex;flex-direction: column;margin-top: 10px;">
			<view class="list-item">
				<u-image v-if="type == 0 || type == 2" style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
				  :src="dataDict.picture"
				  width="110px"
				  height="90px"
				></u-image>
				<u-image v-if="type == 1" style="margin-left: 10px;margin-top: 10px;border-radius: 5px;"
				  :src="dataDict.housePicture"
				  width="110px"
				  height="90px"
				></u-image>
				<view style="width: 70%;height: 100px;display: flex;flex-direction: column;">
					<view v-if="type == 0" style="width: 100%;
			 			  margin-left: 10px;
			 			  display: flex;
			 			  flex-direction: row;
						  margin-top: 3px;margin-top: 10px;">
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{dataDict.releaseType}}</view>
						<view  style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{dataDict.rentalType}}</view>
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{dataDict.decoration}}</view>
					</view>
					<view v-if="type == 1" style="width: 100%;
						  margin-left: 10px;
						  display: flex;
						  flex-direction: row;
						  margin-top: 3px;margin-top: 10px;">
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{dataDict.releaseType}}</view>
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{dataDict.decoration}}</view>
					</view>
					<view v-if="type == 2" style="width: 100%;
						  margin-left: 10px;
						  display: flex;
						  flex-direction: row;
						  margin-top: 3px;margin-top: 10px;">
						<view style="border: 1px solid blue;padding: 2px;border-radius: 4px;margin-right: 5px;color: blue;font-size: 12px;height: 20px;">{{dataDict.shop_type}}</view>
					</view>
					<view v-if="type == 0 || type == 1" style="display: flex;flex-direction: column;">
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{dataDict.rentalTitle}}</view>
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{dataDict.communityName}}</view>
					</view>
					<view v-if="type == 2" style="display: flex;flex-direction: column;">
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{dataDict.title}}</view>
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{dataDict.location_name}}</view>
					</view>
					
					<view v-if="type == 0" style="font-size: 14px;margin-top: 5px;margin-left: 10px;color: red;">{{dataDict.monthlyRent}}</view>
					<view v-if="type == 1" style="display: flex;flex-direction: row;">
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;color: red;">{{dataDict.price}}</view>
						<view style="font-size: 14px;margin-top: 5px;margin-left: 10px;">{{dataDict.builtArea}}</view>
					</view>
					<view v-if="type == 2" style="font-size: 14px;margin-top: 5px;margin-left: 10px;color: red;">{{dataDict.selling_price}}万</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 40px;background-color: aliceblue;display: flex;align-items: center;">
			<label style="font-size: 13px;margin-left: 15px;">举报原因(必选)</label>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="jubaoView" v-for="(item,index) in jubaoList" :key="index" @click="jubaoClick(index)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-left: 15px;font-size: 13px;margin-top: 10px;width: 85%;">{{item.childValue}}</view>
					<u-image v-if="item.selected === true" style="margin-top: 7px;"
					  :src="image"
					  width="20px"
					  height="20px"
					></u-image>
				</view>
				
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
		<view class="footer-container">
		        <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
		                 <view class="order-button" @click="tijiaoClick">提交</view>
		         </view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceHouseInfoHouseJuBaoReason, serviceHouseInfoHouseSetUpJuBao } from '@/api/service';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref<any>({});
	const jubaoList = ref<any[]>([]);
	const image = ref('/static/mine/choosecompany.png');
	const reason = ref('');
	const type = ref<any>(0);

	const init = () => {
		try {
			let param = {
				parent_id: 'a0f56633097f4d84afdc1980b36d155c',
			};
			serviceHouseInfoHouseJuBaoReason(param).then((res: any) => {
				console.log(res);
				jubaoList.value = res.result;
				jubaoList.value = jubaoList.value.map((item: any) => {
					return {
						...item,
						selected: false
					};
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	const jubaoClick = (index: number) => {
		// 先将所有项设为未选中
		jubaoList.value.forEach((item: any) => {
			item.selected = false;
		});
		jubaoList.value[index].selected = true;
		// this.showmodel();
		reason.value = jubaoList.value[index].childValue;
		console.log(reason.value);
	};

	const tijiaoClick = () => {
		if (!reason.value) {
			uni.showToast({
				title: '请选择原因！',
				icon: 'none',
			});
			return;
		}

		try {
			let param: any = {};
			if (type.value == 2) {
				param = {
					userId: storage.getUserId(),
					saleId: dataDict.value.saleId,
					reasons: reason.value,
				};
			} else {
				param = {
					userId: storage.getUserId(),
					rentalId: dataDict.value.id,
					saleId: dataDict.value.id,
					reasons: reason.value,
				};
			}

			serviceHouseInfoHouseSetUpJuBao(param).then((res: any) => {
				console.log(res);
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
				uni.navigateBack();
			});
		} catch (error) {
			console.log(error);
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		if (options.dataDict) {
			dataDict.value = JSON.parse(options.dataDict);
		}
		type.value = options.type;
		console.log(dataDict.value);
		console.log(type.value);
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
	 .list-item{
	 	display: flex;
	 	flex-direction: row;
	 	margin-left: 4%;
	 	width: 92%;
	 	height: 120px;
	 	border-radius: 5px;
	 	background-color: white;
	 	margin-top: 10px;
	 }
	 .jubaoView{
		 width: 100%;
		 height: 40px;
		 display: flex;
		 flex-direction: column;
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