<template>
  <view>
    <u-navbar
      title="选择收货信息"
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
    <view style="padding-bottom: 60px" @click="selectAddress">
      <view
        style="
          display: flex;
          flex-direction: row;
          border-bottom: 1px solid #e0e0e0;
          padding: 8px 10px;
        "
        v-for="(item, index) in list"
        :key="index" @click="confirmSelection(item)"
      >
        <view style="flex: 1">
          <view>{{ item.acceptName }} {{ item.mobile }}</view>
          <view style="margin-top: 5px;"> {{ item.address }}</view>
        </view>
      </view>
    </view>

    <view
      @click="addAddress"
      style="
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        background-color: #2a9598;
        color: white;
        text-align: center;
        position: fixed;
        width: 80%;
        bottom: 0;
        border-radius: 5px;
        margin-left: 10%;
      "
    >
      新建收货信息
    </view>
  </view>
</template>

<script setup lang="ts">
	
	import { GongFenSelectAddress } from "@/api/mine";
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad } from '@dcloudio/uni-app';

      const manid = ref('');
      const bgColor = ref("#0080ff");
      const list = ref([]);
   

	  onLoad((options:any) => {
		manid.value = decodeURIComponent(options.manid);
		console.log(manid.value);
	   init();
	  });
  
	  const init =async() => {
		  let data = {
			userId: getStorage(storageKeys.userId,''),
			manId: manid.value,
		  };
		  
		  const res = await GongFenSelectAddress(data);
			this.list = res.result;
			console.log(res);
		  
		};
		const goBack = () => {
		  uni.navigateBack();
		};
 
	    const confirmSelection = (item:any)  => {
	
		// EventBus.$emit('refresh-data', {
	 //        type: 'refresh',
	 //        timestamp: new Date(),
		// 	data:item,
	 //    });
		eventBus.emit('refresh-address',item);
		uni.navigateBack()
	};
     const addAddress = () => {
      uni.navigateTo({
        url: "/pages/mine/myIntegral/WorkPointAddAddress",
      });
    };
  
</script>

<style></style>
