<template>
  <view>
    <u-navbar
      title=""
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
    <view
      v-if="addressChose === false"
      @click="selectAddress"
      style="
        height: 70px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      "
    >
		<view>
			<u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
		</view>
		<view style="display: flex; flex-direction: row; align-items: center">
			请选择位置
		</view>
	</view>
    <view
      v-else
      style="
        height: 70px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
      "
		>
		<view>
			<u-icon name="map-fill" color="#2a9598" size="28"></u-icon>
		</view>
		<view style="flex: 1; margin-left: 15px">
			<view>{{address.acceptName}}{{address.mobile}}</view>
			<view style="margin-top: 8px">{{address.address}}</view>
		</view>
		<view>
			<u-icon name="arrow-right" size="28"></u-icon>
		</view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view style="padding: 10px">{{ shopname }} ></view>
    <view v-for="(item, index) in list" :key="index" style="padding: 1px 10px">
      <view
        style="
          height: 100px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: beige;
        "
      >
        <image :src="item.img" style="width: 80px; height: 80px"></image>
        <view style="flex: 1; padding: 0px 10px">
          <view style="font-size: 14px; text-align: left">{{ item.name }}</view>
          <view style="font-size: 14px; text-align: right"
            >{{ item.score }}分<text v-if="item.cash && item.cash > 0"
              >+¥ {{ item.cash }}</text
            ></view
          >
          <view style="font-size: 14px; text-align: right"
            >x{{ item.quantity }}</view
          >
          <view style="font-size: 14px; text-align: left">{{
            item.specs
          }}</view>
        </view>
      </view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view style="display: flex; flex-direction: row; padding: 10px">
      <view style="font-size: 14px; text-align: left;margin-left: 5px;">备注：</view>
      <input
        style="flex: 1; text-align: left"
        placeholder="请输入"
        placeholder-style="color: #999"
      />
    </view>
	<u-gap height="1" bgColor="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        width: 100%;
        padding: 0 15px;
        flex-direction: row;
        justify-content: space-between;
        font-size: 14px;
		margin-top: 10px;
      "
    >
      <view>配送方式</view>
      <u-radio-group
        style="margin-left: 100px"
        v-model="radiovalue1"
        placement="row"
        @change="groupChange"
      >
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          v-for="(item, index) in radiolist1"
          :key="index"
		  :activeColor="bgColor"
          :label="item.name"
          :name="item.name"
        >
        </u-radio>
      </u-radio-group>
    </view>

    <view v-if="showdeleiveryfee" style="font-size: 14px; text-align: right;height: 30px;"
      >运费：<text style="color: red; padding-right: 15px">{{
        deliveryfee
      }}</text></view
    >
    <u-gap height="10" bgColor="#f5f5f5" style="margin-bottom: 50px"></u-gap>

    <view
      style="
        position: fixed;
        display: flex;
        flex-direction: row;
        bottom: 0;
        left: 0;
        justify-content: end;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #f5f5f5;
        width: 100%;
      "
    >
      <view style="font-size: 14px; flex: 1;margin-left: 15px;"
        >合计：{{ allscore }}分<text v-if="cash && cash > 0"
          >+ {{ cash }}元</text
        ></view
      >
      <view
        style="
          background-color: #2a9598;
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          margin-right: 10px;
          font-size: 13px;
        "
        >提交订单</view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {
	  GongFenOrderDeliveryFee,
	  // GongFenOrderSubmit,
	  // GongFenOrderPay,
	} from "@/api/mine";
	import { onLoad } from '@dcloudio/uni-app';
	import eventBus from '@/utils/eventBus';

      const bgColor = ref("#0080ff");
      const list =  ref([]);
      const usepoint = ref('');
      const shopCode = ref('');
      const shopname = ref('');
      const address =  ref({});
	  const addressChose = ref(false);
      const allscore = ref(0);
      const cash = ref(0);
      const manid = ref('');
      const deliveryfee = ref(0);
      const showdeleiveryfee = ref(false);
      const radiolist1 = ref( [
        {
          name: "自提",
          disabled: false,
        },
        {
          name: "配送",
          disabled: false,
        },
      ]);
      const radiovalue1 = ref("自提");
    
	  onLoad((o:any) => {
		usepoint.value = decodeURIComponent(o.usepoint);
		shopCode.value = decodeURIComponent(o.shopCode);
		shopname.value = decodeURIComponent(o.shopname);
		manid.value = decodeURIComponent(o.manid);
		list.value = uni.getStorageSync("selectedPointProducts");
		getscoreAndprice();
	  });
	 onMounted(() => {
			// this.loadData()
		// 监听刷新事件
		eventBus.on('refresh-address', handleRefresh);
	 });
	 onUnmounted(() => {
	 	// 组件卸载时，务必移除监听！
	 	eventBus.off('refresh-address', handleRefresh);
	 });
    const goBack = () => {
      uni.navigateBack();
    };
     const selectAddress = () => {
      uni.navigateTo({
        url:
          `/pages/mine/myIntegral/selectWorkPointAddress?manid=${encodeURIComponent(manid.value)}`
      });
    };

     const getscoreAndprice = () => {
      allscore.value = 0;
      cash.value = 0;
      const selectedItems = list.value.filter((item) => item.checked);
      selectedItems.forEach((childitem) => {
        allscore.value += (childitem.score || 0) * childitem.quantity;
        cash.value += (childitem.cash || 0) * childitem.quantity;
      });
    };
     const groupChange = (n:any) => {
      console.log("groupChange", n);
      if (n === "配送") {
        let skus = "";
        list.value.forEach((childitem) => {
          skus += childitem.sku + ",";
        });
        showdeleiveryfee.value = true;
        getdeliveryfee(skus);
      } else {
        showdeleiveryfee .value= false;
      }
    };

     const getdeliveryfee = async(sku:any) => {
      let data = {
        skus: sku,
      };
      const res = await GongFenOrderDeliveryFee(data);
        console.log(res);
        deliveryfee.value = res.result;
        cash.value = cash.value + deliveryfee.value;
      
    };
	const handleRefresh = (data:{}) => {
		
	      console.log('收到刷新事件:', data)
	      // this.loadData()
		  address.value = data;
		  addressChose.value = true;
		  console.log(address.value);
		  
	};
  
</script>

<style></style>
