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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">征集结果</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 45%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;">意见选择</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 45%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">票数</view>
		</view>
		<view class="contentView">
			<view class="content_item" v-for="(item,index) in solicList" :key="index">
				<view style="margin-left: 5%;width: 45%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">{{item.option_name}}</view>
				<view style="margin-left: -1px; width: 45%;height: 40px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white; ">{{item.num}}票</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceGongShiDetail } from '@/api/service';

const bgColor = ref("#2A9595");
const solicList = ref<any[]>([]);
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
			solicList.value = res.result.resultList;
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
	 .headerV{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
		 margin-top: 20px;
	 }
	 .contentView
	 {
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 50px;
		 .content_item{
			 display: flex;
			 flex-direction: row;
			 width: 100%;
			 height: 40px;
		 }
	 }
    }
</style>