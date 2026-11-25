<template>
    <view class="main">
        <u-navbar
          title="兑换记录"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
        <template #left>
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
        </template>
        </u-navbar>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItemV" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 80%;">{{item.shopName}}></view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;color: red;">{{item.statusFlag}}</view>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<image style="margin-top: 10px;margin-left: 10px;width: 80px;height: 80px;" :src="item.GoodsIcon"></image>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 80%;">
						<view style="display: flex;flex-direction: row;width: 96%;">
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 80%;">{{item.titlename}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">X{{item.num}}</view>
						</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">规格：{{item.specs}}</view>
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">兑换积分：{{item.integral}}</view>
					</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 95%;color: red;text-align: right;">积分合计：{{item.amount}}</view>
				<view style="margin-top: 10px;width: 100%;height: 5px;background-color: lightgray;"></view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataList = ref([
		{shopName:'群员生活中心',statusFlag:'已兑换',GoodsIcon:'/static/mine/Maintenance.png',titlename:'半成品：杭椒肉里一份',specs:'1份',integral:'80.0+7.0积分',amount:'87.00',num:'1'},
		{shopName:'群员生活中心',statusFlag:'已兑换',GoodsIcon:'/static/mine/Maintenance.png',titlename:'半成品：杭椒肉里一份',specs:'1份',integral:'80.0+7.0积分',amount:'87.00',num:'1'},
		{shopName:'群员生活中心',statusFlag:'已兑换',GoodsIcon:'/static/mine/Maintenance.png',titlename:'半成品：杭椒肉里一份',specs:'1份',integral:'80.0+7.0积分',amount:'87.00',num:'1'},
		{shopName:'群员生活中心',statusFlag:'已兑换',GoodsIcon:'/static/mine/Maintenance.png',titlename:'半成品：杭椒肉里一份',specs:'1份',integral:'80.0+7.0积分',amount:'87.00',num:'1'},
		{shopName:'群员生活中心',statusFlag:'已兑换',GoodsIcon:'/static/mine/Maintenance.png',titlename:'半成品：杭椒肉里一份',specs:'1份',integral:'80.0+7.0积分',amount:'87.00',num:'1'},
		
	]);
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		  .listItemV{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
		  }
}
</style>