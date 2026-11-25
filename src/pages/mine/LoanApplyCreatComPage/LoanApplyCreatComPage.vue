<template>
  <view>
    <u-navbar
      title="审批内容"
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
		  <view slot="right" @click="save">
			<text color="#fff">保存</text>
		  </view>
	  </template>
    </u-navbar>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1.2">姓名/公司名称</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="userComName"
        style="flex: 2"
      ></u-input>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1.2">注册手机号</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="registMobile"
        style="flex: 3"
      ></u-input>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1.2">银行卡号</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="bankCard"
        style="flex: 3"
      ></u-input>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1.2">开户行</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="bankName"
        style="flex: 3"
      ></u-input>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
    const bgColor = ref("#0080ff");
    const userComName = ref('');
    const registMobile = ref('');
    const bankCard = ref('');
    const bankName = ref('');
   

	onLoad((e:any) => {
		let info = e.LoanCom;
		console.log(info);
		let Loancom = JSON.parse(info);
		userComName.value = Loancom.userComName;
		registMobile.value = Loancom.registMobile;
		bankCard.value = Loancom.bankCard;
		bankName.value = Loancom.bankName;
	});
	const goBack= () => {
          
		uni.navigateBack()
	};
    const save = () => {
      if (
        userComName.value === "" ||
        registMobile.value === "" ||
        bankCard.value === "" ||
        bankName.value === ""
      ) {
        uni.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      } else {
		  
        let data = {
          registMobile: registMobile.value,
          userComName: userComName.value,
          bankCard: bankCard.value,
          bankName: bankName.value,
        };
        console.log(data);
        eventBus.emit("LoanCom", data);

        // 返回前一页
        uni.navigateBack({
          delta: 1,
        });
      }
    };
  
</script>

<style></style>
