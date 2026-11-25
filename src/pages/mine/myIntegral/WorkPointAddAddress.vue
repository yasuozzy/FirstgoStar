<template>
  <view>
    <u-navbar
      title="新建收货信息"
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
	<template #right>
      <view slot="right" @click="deleteAdd">
        <u-icon name="trash" size="20" color="#fff"></u-icon>
      </view>
	</template>
    </u-navbar>
    <view
      style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      "
    >
      收货人员
      <input
        v-model="name"
        style="margin-left: 10px"
        placeholder="请输入收货人姓名"
        placeholder-style="color: #999"
      />
    </view>
    <view
      style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      "
    >
      手机号码
      <input
        style="margin-left: 10px"
        v-model="phone"
        placeholder="请输入手机号"
        placeholder-style="color: #999"
      />
    </view>

    <u-gap bgColor="#f5f5f5" height="10"></u-gap>
    <view
      @click="AddAddress"
      style="
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        background-color: #2a9598;
        color: white;
        text-align: center;
        width: 80%;
        margin-top: 100px;
        border-radius: 5px;
        margin-left: 10%;
      "
    >
      保存
    </view>
  </view>
</template>

<script setup lang="ts">
	import { GongFenAddAddress } from "@/api/mine";
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';

    const bgColor = ref("#0080ff");
    const value = ref(true);
    const name = ref('');
    const phone = ref('');
   
  
    const AddAddress = async() => {
      if (name.value === "" || phone.value === "") {
        uni.showToast({
          title: "请填写完整信息",
          icon: "none",
        });
        return;
      }

      let data = {
        userId: getStorage(storageKeys.userId,''),
        mobile: phone.value,
        name: name.value,
        isDefault: "false",
      };
      const res = await GongFenAddAddress(data);
        console.log(res);
     
    };
    const goBack = () => {
      uni.navigateBack();
    };
    const change = (e:any) => {
      console.log("change", e);
    };
    const deleteAdd = () => {
      uni.showModal({
        title: "提示",
        content: "确定要删除吗？",
        success: function (res) {
          if (res.confirm) {
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
          }
        },
      });
    };
  
</script>

<style></style>
