<template>
    <view class="main">
        <u-navbar
          :title="agreement_name"
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
		<view class="protocalView">
			<!-- <div style="font-size: 14px;" v-html="agreement_content"></div>  -->
			<!-- <view style="font-size: 14px;" v-html="agreement_content"></view> -->
			<scroll-view 
			      scroll-y 
			      class="agreement-scroll"
			      :style="{ height: scrollHeight + 'px' }"
			    >
			      <view style="font-size: 13px; padding: 20rpx;" v-html="agreement_content"></view>
			</scroll-view>
			
		</view>     
</view>
</template>

<script setup lang="ts">
	import { GetAgreemente } from '@/api/mine';
	import { storage } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const agreement_name = ref('');
	const agreement_content = ref('');
	const scrollHeight = ref(800);
	const type = ref('');

	const getAgreement = () => {
		//我的钱包
		try {
			let param = {
				type: type.value,
			};
			GetAgreemente(param).then((res: any) => {
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
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
		type.value = options.type || '';
		getAgreement();
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
	 .protocalView{
	 	background-color: white;
	 	margin-top: 10px;
	 	margin-left: 4%;
	 	width: 92%;
	 	height: 100%;
	 	display: flex;
	 	flex-direction: column;
	 	border-radius: 4px;
	 }
	 .agreement-scroll {
	  
	 }
    }
</style>