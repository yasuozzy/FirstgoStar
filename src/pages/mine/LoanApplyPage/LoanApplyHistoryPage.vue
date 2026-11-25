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
          <view class="item-title"> 审批内容:</view>
          <view class="item-title" style="flex: 1"> {{ item.content }}</view>
          <view class="item-title" style="color: red">
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
	import { LoanShenpiHistory } from "@/api/mine";

      // 背景颜色
      const bgColor = ref("#0080ff");
      const searchValue = ref("");
      const list = ref([]);
      const refreshing = ref(false);
    
	  onLoad((e:any) => {
		withdralist(searchValue);
	  });

  
		const onRefresh = () => {
		  refreshing.value = true;
		  withdralist(searchValue.value);
		};
    const withdralist = async(searindex:any) => {
      
      let param = {
        userId: storage.getUserId(),
        content: searindex,
        page: 1,
        size: 50,
      };
      console.log(param);
      const res = await LoanShenpiHistory(param);
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
      withdralist(searchValue);
    };
    const toDetail = (item:any) => {
      uni.navigateTo({
        url:
          `/pages/mine/LoanApplyPage/LoanApplyDetailPage?id=${encodeURIComponent(item.id)}`
      });
    };
   
   
</script>
<style lang="scss" scoped></style>
