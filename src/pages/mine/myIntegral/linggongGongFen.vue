<template>
  <view class="container" style="background-color: #fafafa; height: 100vh">
    <view class="center">
      <view class="functional_area">
       
		<view style="display: flex;flex-direction: column;">
			<view class="areaTop_title" style="margin-top: 15px; font-size: 15px">总额（分)</view>
			<view style="font-size: 15px;margin-top: 10px;width: 100px;text-align: center;">{{ totalScore }}</view>
		</view>
		<view style="display: flex;flex-direction: column;margin-left: 15px;">
			<view class="areaTop_title" style="margin-top: 15px; font-size: 15px">可用余额（分)</view>
			<view class="areaTop_title" style="margin-top: 10px; font-size: 15px">
			{{ memberScore }}
			</view>
        </view>
		<view
		  style="
		    display: flex;
		    flex-direction: row;
		    height: 25px;
		    line-height: 25px;
			margin-left: 50px;
			margin-top: 60px;
		  "
		>
		  <image
		    src="@/static/mine/chargeQuan.jpg"
		    style="width: 20px; height: 20px;margin-top: 3px;"
		    mode="aspectFill"
		  ></image>
		  <view @click="exchange(1)" class="areaTop_title"> 去兑换 </view>
		</view>
      </view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
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
	    <view class="table-cell">{{ item.create_time }}</view>
	    <view class="table-cell" style="color: #0080ff">{{
	      item.score
	    }}</view>
	    <view class="table-cell">{{ item.type_flag }}</view>
	  </view>
	</view>
    <!-- <view class="table-container">
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
        <view class="table-cell">
          <view  class="table_btn">去兑换</view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { mineGetMyLingGongGF } from "@/api/mine";


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
		page:1,
		size:10,
      };
      const res = await mineGetMyLingGongGF(data);
      console.log(res);
      evenSortItems.value = res.result.scoreList;
      memberScore.value = res.result.memberScore;
      totalScore.value = res.result.totalMemberScore;
      
    };
    const toDetail = () => {
      // uni.navigateTo({
      //   url: "/pages/finance-mine/IntegralWorkPointsPage/myWorkPointList",
      // });
    };
    const exchange = (item:any) => {
      // uni.navigateTo({
      //   url: "/pages/finance-mine/IntegralWorkPointsPage/pointProductListPage?id="+item.id+"&usepoint="+this.memberScore,
      // });
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
  height: 100px;
  box-sizing: border-box;
  width: 90%;
	display: flex;
	flex-direction: row;
  margin-left: 5%;
  margin-top: 50px;
  border-radius: 15px;
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
