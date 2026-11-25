<template>
  <view style="height: 100vh; background-color: #fafafa">
    <u-navbar
      title="待付款"
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
    <view
      v-for="(item, index) in list"
      @click="todetail(item)"
      :key="index"
      style="
        margin: 8px 10px;
        padding: 5px 0px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <view
        style="
          display: flex;
          flex-direction: row;
          margin: 5px 10px;
          justify-content: space-between;
        "
      >
        <view> {{ item.remark }}</view>
        <view style="color: #289497">¥{{ item.amount }} </view>
      </view>
      <view style="margin: 5px 10px">收款方：{{ item.name }} </view>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {} from '@/api/mine';
     import {} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { ToBePayList } from "@/api/mine";

    const bgColor = ref("#0080ff");
    const list = ref([]);
    
	onLoad(() => {
		getdata();
	});
 
    const goBack = () => {
      uni.navigateBack();
    };
    const getdata = async() => {
      
	  let data = {
        type: "1",
        userId: storage.getUserId(),
        mobile: storage.getPhone(),
        page: 1,
        pageSize: 50,
      };
      const res = await ToBePayList(data);
	  console.log(res);
	  list.value = res.result;
      
    };
	const todetail = (item:any) => {
		 uni.navigateTo({
			 url:
            `/pages/mine/MoneyPayPage/MoneyPayDetailPage?id=${encodeURIComponent(item.id)}`
		 })
	};
  
</script>

<style></style>
