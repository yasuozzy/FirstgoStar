<template>
  <view>
    <u-navbar
      title="详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
		<view class="u-nav-slot" slot="left">
		  <view class="flex">
			  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		  </view>
		</view>
	  </template>
    </u-navbar>
    <view class="info">款项名称：{{ detail.remark }}</view>
    <view class="info">款项金额：{{ detail.amount }}</view>
    <view class="info">收款方：{{ detail.name }}</view>
    <view class="info" v-if="!(detail.status === '0')"
      >付款时间：{{ detail.payTime }}</view
    >
    <view
      v-if="detail.status === '0'"
      @click="topay"
      style="
        position: fixed;
        bottom: 15px;
        width: 90%;
        margin-left: 5%;
        text-align: center;
        color: white;
        background-color: #2a9598;
        padding: 8px 0px;
      "
      >去支付</view
    >
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { ToPayDetail } from "@/api/mine";

    const bgColor = ref("#0080ff");
    const id = ref('');
    const detail = ref('');
    
	onLoad((e:any) => {
		id.value = e.id;
		getGoodsDetail();
	});
  
    const goBack= () => {
            
		uni.navigateBack()
	};
    const getGoodsDetail = async() => {
      let data = {
        id: id.value,
      };
      const res = await ToPayDetail(data);
        console.log(res);
        detail.value = res.result;
      
    };
   
</script>

<style>
.info {
  margin: 15px;
}
</style>
