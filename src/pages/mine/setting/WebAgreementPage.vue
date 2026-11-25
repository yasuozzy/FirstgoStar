<template>
  <view>
    <u-navbar
      :title="title"
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
    <!-- <web-view
      style="margin-top: 45px; background-color: aqua"
      :webview-styles="webviewStyles"
      src="webUrl"
    ></web-view> -->
	<view style="margin-left: 4%;width: 92%;margin-top: 10px;">
		<div v-html="agreement_content"></div>
	</view>
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import{GetAgreemente}from '@/api/mine';
	  const title = ref('');
	  const bgColor = ref("#2A9595");
	  
	  const agreement_content = ref('');
  
 
	  onMounted(() => {
		
		getAgreement();
	  });
  
	  
	const getAgreement = async() => {
		  
		 //我的钱包
		 	try {
				
				let param = {
					type:1
				};
		 		const res = await GetAgreemente(param);
		 			
				console.log(res);
				title.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
		 			
		 		
		 	} catch (error) {
		 		console.log(error)
		 	} 
		  
	  };
      const goBack = () => {
		uni.navigateBack();
	  };
 
</script>

<style></style>
