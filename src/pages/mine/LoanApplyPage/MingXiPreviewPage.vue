<template>
  <view class="container" style="background-color: #fafafa; height: 100vh">
    <!-- ============ 区域一 ============ -->
    <u-navbar
      title="历史记录"
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
      :key="index"
      class="item"
      style="background-color: white; margin: 5px 0px; padding: 10px"
    >
      <view class="item-title">姓名:{{ item.name }}</view>
      <view class="item-title">电话:{{ item.mobile }}</view>
      <view class="item-title">科目:{{ item.subject }}</view>
      <view class="item-title">款项金额:{{ item.amount }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { KuaijiShenpiMingXi } from "@/api/mine";

      // 背景颜色
      const bgColor = ref("#0080ff");
      const searchValue = ref("");
      const list = ref([]);
      const id = ref("");
   

	  onLoad((e:any) => {
		id.value = decodeURIComponent(e.id);
		withdralist();
	  });
  
    const withdralist = async() => {
      const res = await KuaijiShenpiMingXi({
        userId: storage.getPlatId(),
        id: id.value,
        page: 1,
        size: 50,
      });
        list.value = res.result;
        console.log(res);
     
    };
	const goBack= () => {
           
           uni.navigateBack()
       };
    const cusSearch = () => {
      console.log("Searching for:", searchValue);
    };

    /* ======================= 辅助方法项 ======================== */
  
</script>
<style lang="scss" scoped>
.item-title {
  width: 100;
  height: 40px;
}
</style>
