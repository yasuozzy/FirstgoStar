<template>
  <view>
    <u-navbar
      title="详情明细"
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
    <view class="table-container">
      <view class="table_header">
        <view class="table-cell bgc" style="flex: 2">订单编号</view>
        <view class="table-cell bgc"><view>分数</view> </view>
        <view class="table-cell bgc"><view>时间</view> </view>
      </view>
      <view
        class="table_row"
        v-for="(item, index) in evenSortItems"
        :key="index"
        @click="toOrderDetail(item)"
      >
        <view class="table-cell" style="flex: 2">{{ item.orderNo }}</view>
        <view class="table-cell" style="color: #0080ff">{{
          item.score
        }}</view>
        <view class="table-cell">{{ item.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { mineGetMyGongFenPill } from "@/api/mine";

      const bgColor = ref("#0080ff");
      const evenSortItems = ref([]);
    
	  onMounted(() => {
		init();
	  });
  
	  const init = async() => {
		  let data = {
			userId: storage.getUserId(),
			id:'',
		  };
	      const res = await mineGetMyGongFenPill(data);
		  evenSortItems.value = res.result;
		  console.log(res);
	  
	};
    const goBack = () => {
      uni.navigateBack();
    };
    const toOrderDetail = (item:any) => {
      uni.navigateTo({
        url:
          "/pages/finance-mine/IntegralWorkPointsPage/PointOrderDetail?orderId=" +
          item.orderId,
      });
    };
  
</script>

<style scoped lang="scss">
.table_row {
  display: flex;
  font-size: 14px;
  margin: 0 3px;
  height: 40px;
  border-bottom: 1px solid #e0e0e0;
  .table-cell {
    flex: 1;
    text-align: center;
    border-right: none;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
.table_header {
  display: flex;
  font-size: 14px;
  margin: 0 3px;
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
  .table-cell {
    flex: 1;
    text-align: center;
    border-right: none;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .bgc {
    color: #333;
  }
  .table-cell1 {
    border: 1px solid #e0e0e0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
