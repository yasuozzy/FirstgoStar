<template>
  <view style="height: 100vh; background-color: #fafafa">
    <u-navbar
      title="待付款"
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
	  <template #right>
		  <view slot="right" @click="tohistory" style="color: white">
			历史记录
		  </view>
	  </template>
    </u-navbar>
    <view
      v-for="(item, index) in list"
      :key="index"
      style="
        margin: 8px 10px;
        padding: 5px 0px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <u-line color="#f5f5f5"></u-line>
      <view style="">
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <view style="display: flex; flex-direction: row">
            <image
              @click="selectContact(index)"
              v-if="!item.select"
              style="width: 20px; height: 20px"
              :src="choose_default"
            ></image>
            <image
              @click="removeContact(index)"
              v-if="item.select"
              style="width: 20px; height: 20px"
              :src="choose_selected"
            ></image>
            <view style="margin-left: 10px">{{ item.remark }}</view>
          </view>
          <view style="margin-left: 10px; color: #2a9598"
            >¥{{ item.amount }}</view
          >
        </view>
        <view style="margin-left: 10px">收款方：{{ item.name }}</view>
      </view>
    </view>
    <view
      style="
        width: 90%;
        margin-left: 5%;
        background-color: #2a9598;
        display: flex;
        justify-content: center;
        color: white;
        padding: 10px 0px;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
      "
      @click="pay"
      >提交</view
    >
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { ToBePayList, UserGoPay } from "@/api/mine";

    const bgColor = ref("#0080ff");
    const list = ref([]);
	const choose_default = ref('/static/login/choose_unselect.png');
	const choose_selected = ref('/static/login/choose_select.png');
    
	onMounted(() => {
		PayList();
	});
  
    const goBack= () => {
            
        uni.navigateBack()
    };

    const selectContact = (index:any) => {
	  list.value[index].select = true;
      console.log(list[index]);
    };
    const removeContact = (index:any) => {
      list.value[index].select = false;
      console.log(list[index]);
    };

    const tohistory = () => {
      uni.navigateTo({
        url: "/pages/mine/MoneyPayPage/MoneyPayHistoryPage",
      });
    };

    const PayList = async() => {
      
	  const res = await ToBePayList({
        userId: storage.getUserId(),
        mobile: storage.getPhone(),
        type: "0",
        page: 1,
        pageSize: 50,
      });
        list.value = res.result;
        list.value = res.result.map((item) => ({
          ...item,
          select: false,
        }));
        console.log(list);
      
    };

    const pay = () => {
      let ords = "";
      list.value.forEach((element) => {
        if (element.select) {
          ords = ords + element.id + ",";
        }
      });
      if (ords.length < 5) {
        uni.showToast({ title: "至少选择一个收费项", icon: "none" });
        return;
      }
      ords = ords.slice(0, -1);
      console.log(ords);
      toPay(ords);
    };
    const toPay = async(ids:any) => {
      
	  const res = await UserGoPay({
        userName: storage.getRealName(),
        mobile: storage.getPhone(),
        hostNo: storage.getHostNo(),
        ids: ids,
      });
        //intent.putExtra("payEnum", PayEnum.FROM_ORDER_PAY_MONEY);
        console.log(res);
        if (res.success) {
          const encodedUrl = encodeURIComponent(res.result.payUrl);
          uni.navigateTo({
            url: `/pages/mine/WebViewPage/WebPayPage?title=款项缴纳&url=${encodedUrl}`,
          });
        }
      
    };
  
</script>

<style></style>
