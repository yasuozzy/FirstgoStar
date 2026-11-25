<template>
  <view>
    <u-navbar
      title="积分明细"
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
        <view class="table-cell bgc">日期</view>
        <view class="table-cell bgc"><view>积分</view> </view>
        <view class="table-cell bgc"><view>明细</view> </view>
      </view>
      <view
        class="table_row"
        v-for="(item, index) in evenSortItems"
        :key="index"
      >
        <view class="table-cell">{{item.detailTime}}</view>
        <view class="table-cell" style="color: #0080ff">{{item.detailScore}}</view>
        <view class="table-cell">{{item.bsnId}}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { mineGetMyIntegralDetail } from "@/api/mine";
	

    const bgColor = ref("#2A9595");
    const evenSortItems =  ref([]);
    
	onMounted(() => {
		init();
	});
 
    const init = async() => {
      
	  let data = {
		mobile: storage.getPhone(),
		hostNo: storage.getHostNo(),
		size: 50,
		page: 1,
	  };
	  const res = await mineGetMyIntegralDetail(data);
	  console.log(res);
	  evenSortItems.value = res.result;
      
    };
    const goBack = () => {
      uni.navigateBack();
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
