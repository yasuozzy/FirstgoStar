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
    <u-search
      style="margin: 10px 10px"
      v-model="searchValue"
      @custom="cusSearch"
    ></u-search>
    <scroll-view
      style="height: calc(100vh - 44px)"
      enable-back-to-top
      scroll-y
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view
        v-for="(item, index) in list"
        :key="index"
        class="item"
        style="background-color: white; margin: 5px 0px; padding: 10px"
        @click="toDetail(item)"
      >
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <view class="item-title"> 审批事由:</view>
          <view class="item-title" style="flex: 1"> {{ item.content }}</view>
          <view class="item-title" style="color: #2a9595">
            {{ item.statusName }}</view
          >
        </view>
        <view class="item-date" style="margin-top: 10px"
          >审批时间：{{ item.submissionTime }}</view
        >
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { KuaijiShenpiHistory } from "@/api/mine";

      // 背景颜色
      const bgColor = ref("#0080ff");
      const searchValue = ref('');
      const list = ref([]);
      const refreshing = ref(false);
    
	  onMounted(() => {
		withdralist(postid, "");
	  });
	  const onRefresh = () => {
		refreshing.value = true;
		withdralist(postid, "");
	  };
 
    const withdralist = async(oedertype:any, searindex:any) => {
      
	  const res = await KuaijiShenpiHistory({
        userId: storage.getPlatId(),
        content: searindex,
        page: 1,
        size: 50,
      });
        console.log(res);
        if (res.success && res.resultCode == 200) {
          list.value = res.result;
          console.log(res);
          refreshing.value = false;
        } else {
         refreshing.value = false;
          uni.showToast({
            title: res.message,
            icon: "error",
          });
        }
      
    };
	const goBack= () => {
           
        uni.navigateBack()
    };
    const cusSearch = () => {
      console.log("Searching for:", searchValue);
    };
    const toDetail = (item:any) => {
      uni.navigateTo({
        url:
          `/pages/mine/LoanApplyPage/KuaijiApplyDetailPage?id=${encodeURIComponent(item.id)}`
      });
    };
    /* ======================= 辅助方法项 ======================== */
  
</script>
<style lang="scss" scoped></style>
