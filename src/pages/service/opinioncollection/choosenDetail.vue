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
		<view class="specsView">征集范围  {{dataDict.man_name}}</view>
		<view class="specsView">征集来源  {{dataDict.source}}</view>
		<view v-if="dataDict.mode === '0'" class="specsView">征集模式  每户一票</view>
		<view v-if="dataDict.mode === '1'" class="specsView">征集模式  每人一票</view>
		<view class="specsView">起止日期  {{dataDict.start_date}}-{{dataDict.end_date}}</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的选择</view>
		<view class="checkView">
			<u-checkbox
			                :customStyle="{marginBottom: '8px'}"
			                v-for="(item, index) in chooseList"
			                :key="index"
			                :label="item.option_name"
			                shape="circle"
			                :checked="selectedValue === item.option_id"
			                 @change="handleChange(item.option_id)"
			            >
			</u-checkbox>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 20px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">填写意见</view>
		<textarea class="textareaClass" v-model="content" :disabled="contentEnable"  placeholder="请填写意见">
		</textarea>
		<view v-if="joinFlag === '0'" class="buttonView" @click="tijiaoClick">提交</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceOpinionCollectDetail, serviceOpinionChoosen } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const chooseList = ref<any[]>([]);
const selectedValue = ref<any>(null);
const idstring = ref('');
const dataDict = ref<any>({});
const joinFlag = ref('');
const content = ref('');
const contentEnable = ref(true);

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
		serviceOpinionCollectDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			joinFlag.value = res.result.joinFlag;
			if (joinFlag.value === '0') {
				chooseList.value = res.result.optionList;
			} else {
				chooseList.value.push(res.result.chooseMap);
				contentEnable.value = false;
				content.value = res.result.chooseMap ? res.result.chooseMap.content : '';
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const handleChange = (option_id: any) => {
	selectedValue.value = option_id;
};

const tijiaoClick = () => {
	if (!selectedValue.value) {
		uni.showToast({ title: '请选择意见项', icon: 'none' });
		return;
	}
	if (content.value.length === 0) {
		uni.showToast({ title: '请填写提出的意见', icon: 'none' });
		return;
	}
	try {
		let param = {
			user_id: storage.getUserId(),
			collect_id: idstring.value,
			house_id: storage.getHseid(),
			option_id: selectedValue.value,
			content: content.value,
		};
		serviceOpinionChoosen(param).then((res: any) => {
			console.log(res);
			uni.navigateTo({
				url: '/pages/service/opinioncollection/myOpinioncollection'
			});
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
 .checkView{
	 margin-left: 15px;
	 margin-top: 15px;
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
.textareaClass{
	margin-top: 10px;
	margin-left: 4%;
	width: 92%;
	height: 100px;
	border: lightgray 1px solid;
	font-size: 13px;
}
}
</style>