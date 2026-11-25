<template>
    <view class="main">
        <u-navbar
          title="详情"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;font-weight: 700;">{{dataDict.title}}</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;margin-right: 15px;">{{dataDict.content}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="specsView">选民登记流程  {{dataDict.process_desc}}</view>
		<view class="specsView">选民登记要求  {{dataDict.ask_desc}}</view>
		<view class="specsView">选民登记来源  {{dataDict.source}}</view>
		<view class="specsView">起止日期  {{dataDict.start_date}}--{{dataDict.end_date}}</view>
		<view class="specsView">附件</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="buttonView" @click="gotoRegister">去登记</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceXuanMinDetail } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const idstring = ref('');
const dataDict = ref<any>({});

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	loadData();
});

const loadData = () => {
	try {
		let param = {
			user_id: storage.getUserId(),
			id: idstring.value,
		};
		serviceXuanMinDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const gotoRegister = () => {
	uni.navigateTo({
		url: '/pages/service/voterregistration/gotoRegister?id=' + idstring.value
	});
};
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
	 .specsView{
	 		 display: flex;
	 		 margin-left: 15px;
	 		 font-size: 12px;
	 		 margin-top: 5px;
	 }
	 .inputView{
		 display: flex;
		 flex-direction: row;
	 }
	 .searchlocation{
		 margin-top: 10px;
		 margin-left: 40px;
		 border: lightgray 1px solid;
		 font-size: 13px;
		 width: 100px;
		 height: 20px;
	 }
	 .checkView{
	 		 margin-left: 15px;
	 		 margin-top: 12px;
	 }
	 .buttonView{
	         margin-top: 50px;
	         background-color: #2A9595;
	         border-radius: 8px;
	         color: white;
	         font-size: 14px;
	         margin-left: 10%; 
	         display: flex;
	         justify-content: center;
	         align-items: center;
	         height: 40px;
	         width: 80%;
	}
 }
</style>