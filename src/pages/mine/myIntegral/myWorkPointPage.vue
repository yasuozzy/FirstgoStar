<template>
  <view class="container" style="background-color: #fafafa; height: 100vh">
    <view class="center">
      <view class="functional_area">
        <view
          @click="toDetail"
          style="
            display: flex;
            justify-content: flex-end;
            margin: 10px;
            font-size: 14px;
          "
          >账单</view
        >
        <view class="areaTop_title" style="margin-top: -20px; font-size: 14px">
          可用余额<text style="font-size: 10px">（分）</text>
        </view>
        <view class="areaTop_title" style="margin-top: 15px; font-size: 20px">
          {{ memberScore }}
        </view>
        <view class="areaTop_title" style="margin-top: 15px; font-size: 15px">
          总额<text style="font-size: 10px">（分）</text> {{ totalScore }}
        </view>
      </view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view class="table-container">
      <view class="table_header">
        <view class="table-cell bgc">发放时间</view>
        <view class="table-cell bgc"><view>分数</view> </view>
        <view class="table-cell bgc"><view>可用</view> </view>
        <view class="table-cell bgc"><view>操作</view> </view>
      </view>
      <view
        class="table_row"
        v-for="(item, index) in evenSortItems"
        :key="index"
      >
        <view class="table-cell">{{ item.createTime }}</view>
        <view class="table-cell" style="color: #0080ff">{{ item.totalMemberScore }}</view>
        <view class="table-cell" style="color: #0080ff">{{
          item.memberScore
        }}</view>
        <view class="table-cell" @click="exchange(item)">
          <view  class="table_btn">去兑换</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { mineGetMyGongFen } from "@/api/mine";


      // 背景颜色
      const bgColor = ref("#0080ff");
      const memberScore = ref('');
      const totalScore = ref('');
      const evenSortItems = ref([]);
   
	  onMounted(() => {
		init();
	  });
 
    /* ======================= 页面初始化 ======================== */
    const init = async() => {
      let data = {
        userId: getStorage(storageKeys.userId,''),
      };
      const res = await mineGetMyGongFen(data);
        console.log(res);
        evenSortItems.value = res.result.scoreList;
        memberScore.value = res.result.memberScore;
        totalScore.value = res.result.totalMemberScore;
      
    };
    const toDetail = () => {
      uni.navigateTo({
        url: "/pages/mine/myIntegral/myWorkPointList",
      });
    };
    const exchange = (item:any) => {
      uni.navigateTo({
        url: "/pages/mine/myIntegral/pointProductListPage?id="+item.id+"&usepoint="+this.memberScore,
      });
    };
    /* ======================= 页面操作项 ======================== */
    /* ======================= 辅助方法项 ======================== */
  
</script>
<style lang="scss" scoped>
.center {
  height: 180px;
  background-color: #0080ff;
  display: flex;
  flex-direction: row;
}
.functional_area {
  background: #fff;
  height: 130px;
  box-sizing: border-box;
  width: 90%;
  margin-left: 5%;
  margin-top: 50px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.areaTop_title {
  text-align: center;
}
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
.table_btn {
  background-color: #2A9595;
  color: #fff;
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 5px;
}
</style>
