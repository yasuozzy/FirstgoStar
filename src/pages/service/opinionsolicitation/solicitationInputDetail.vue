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
		<view class="specsView">公示单位  {{dataDict.pub_unit}}</view>
		<view class="specsView">公示日期  {{dataDict.pub_date}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">公示结果</view>
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" :value="dataDict.result_content" disabled="true">
		</textarea>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceGongShiDetail } from '@/api/service';

const bgColor = ref("#2A9595");
const title = ref("小区外加装电梯意见征集");
const content = ref("小区外加装电梯意见征集");
const danwei = ref("花园小区、都昌小区");
const time = ref("2025.8.1");
const opinion = ref('意见征集过程中多数人同意加装衣物回收，促进小区衣物循环回收');
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
			id: idstring.value,
		};
		serviceGongShiDetail(param).then((res: any) => {
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
    }
</style>