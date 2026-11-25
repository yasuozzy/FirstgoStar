<template>
  <view>
    <u-navbar
      title="关于APP"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
		<template #left>
		  <view slot="left" @click="goBack">
			<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
		  </view>
		</template>
    </u-navbar>
    <view style="text-align: center; padding-top: 50px">
      <image style="width: 80px; height: 80px" src="@/static/logo.png"></image>
      <view style="margin-top: 20px">文旅群苑</view>
      <view style="margin-top: 10px">V0.0.1</view>
    </view>
    <u-line color="#f5f5f5" style="margin-top: 20px"></u-line>
    <u-cell title="官方微信" value="文旅群苑" :isLink="true"></u-cell>
    <u-cell title="客服电话" value="0536-7182999" :isLink="true" @click="phoneCall"></u-cell>
    <!-- <u-cell title="检查更新" :isLink="true"></u-cell> -->
    <u-cell
      title="用户协议"
      :isLink="true"
      url="/pages/mine/setting/WebAgreementPage"
    ></u-cell>
    <!-- <u-cell
      title="隐私政策"
      :isLink="true"
      url="/pages/finance-mine/WebAgreementPage/WebAgreementPage"
    ></u-cell> -->
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
    const bgColor = ref("#2A9595");
  
    const goBack = () => {
      uni.navigateBack();
    };
	const phoneCall = () => {
		
		uni.makePhoneCall({
			phoneNumber:'0536-7182999',
			success: () => {
				console.log('拨打电话成功')
			},
			fail: (error) => {
				console.error('拨打电话失败:', error)
				uni.showToast({
					title:'拨打电话失败，请重试',
					icon:'none'
				})
			}
		})
	};
  
</script>

<style></style>
