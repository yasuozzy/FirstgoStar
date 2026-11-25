<template>
    <view class="main">
        <u-navbar
          title="法务服务"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
<view class="u-nav-slot" >
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
</template>
        </u-navbar>
		<view class="oamanageView">
			<view style="display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: royalblue;"></view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">法务服务</view>
			</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in minelaw"
				  :key="index" @click="financialClick(item.href)"
				>
				  <u-image
				    :src="item.icon"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.name }}</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
import { MineGetEmergencyOrderIsWOrker } from '@/api/mine.ts';

import { storage } from '@/utils/storage';

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const minelaw = ref([
				]);

const message = ref('/static/service/message.png');

const init = () => {

};

const financialClick = (href) => {
  if (href === 'FreeAssistance') {
      uni.navigateTo({
        url: '/pages/service/work/lawserviceorder?type=free'
      });
    } else if (href === 'DelegatedService') {
      uni.navigateTo({
        url: '/pages/service/work/lawserviceorder?type=pay'
      });
    } else if (href === 'LegalAgreement') {
      uni.navigateTo({
        url: '/pages/service/work/lawagreementmanage'
      });
    } else if (href === 'LegalAsk') {
      uni.navigateTo({
        url: '/pages/service/work/lawmyzixun?type=0'
      });
    } else if (href === 'LegalMessage') {
      uni.navigateTo({
        url: '/pages/service/work/lawmyliuyan?type=1'
      });
    }
};

const isworker = (number) => {
  try {
      let param = {
        userId: storage.getUserId()
      };
      MineGetEmergencyOrderIsWOrker(param).then(res => {
        console.log(res);
        const temporayId = res.result.temporayId;
        const managerId = res.result.managerId;
        const temporayName = res.result.temporayName;
        const temporayTakeOrder = res.result.temporayTakeOrder;
        if (res.result.isTemporay == 0) {

          //认证
        } else if (res.result.isTemporay == 1) {
          if (number == 1) {

            //认证结果
          } else {
            if (temporayId.length > 0) {
              storage.saveTemporayId(temporayId);
            }
            if (managerId.length > 0) {
              storage.saveTemporayManagerId(managerId);
            }
            if (temporayName.length > 0) {
              storage.saveTemporayName(temporayName);
            }
            if (temporayTakeOrder.length > 0) {
              storage.saveTemporayTakeOrder(temporayTakeOrder);
            }
            console.log(storage.getTemporayTakeOrder());
            uni.navigateTo({
              url: '/pages/mine/LingGongOrder/SharelaoWu/laowuOrderList'
            });
          }
        } else if (res.result.isTemporay == 2) {
          uni.showToast({
            title: '维修工权限已被禁用，请联系客服',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
};

const mesasgeClick = () => {
  uni.navigateTo({
      url: '/pages/mine/LingGongOrder/linggongMessage'
    });
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((options) => {
  minelaw.value = JSON.parse(options.minelaw);
    console.log(minelaw.value);
});

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .oamanageView{
	 	  display: flex;
	 	  
	 	  flex-direction: column;
	 	  margin-left: 4%;
	 	  width: 92%;
	 	  margin-top: 10px;
	 	  background-color: white;
	 	  border-radius: 8px;
	 	  .itemview{
	 	  	display: flex;
	 	  	flex-direction: row;
	 	  	flex-wrap: wrap; /* 允许换行 */
	 	  	margin-bottom: 10px;
	 	  	.situation_item {
	 	  	  width: 25%;
	 	  	  font-size: 12px;
	 	  	  color: #000;
	 	  	  margin-top: 15px;
	 	  	  box-sizing: border-box;
	 	  	  display: flex;
	 	  	  flex-direction: column;
	 	  	  align-items: center;
	 	  	  height: 65upx;
	 	  			margin-bottom: 30px;
	 	  			.item_text{
	 	  				margin-top: 8px;
	 	  			}
	 	  	}
	 	  }
	 }
    }
</style>