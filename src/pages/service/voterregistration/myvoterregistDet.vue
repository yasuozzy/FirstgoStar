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
		<view style="display: flex;width: 100%;">
			<view class="fileItem" v-for="(item,index) in fileList" :key="index" @click="loadTextFile(item)">
				<u-image style="margin-top: 10px;margin-left: 15px;"
				  :src="imageValue"
				  width="20px"
				  height="20px"
				></u-image>
				<view style="display: flex;font-size: 13px;margin-left: 10px;margin-top: 10px;">{{item.fileName}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-top: 18px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">姓名</view>
			<view style="margin-top: 10px;font-size: 14px;height: 25px;">{{fillMap.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">性别</view>
			<view style="margin-top: 15px;font-size: 14px;height: 30px;">{{fillMap.sex}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">身份证号</view>
			<view style="margin-top: 15px;font-size: 14px;height: 30px;">{{fillMap.id_card}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">电话号码</view>
			<view style="margin-top: 15px;font-size: 14px;height: 30px;">{{fillMap.user_mobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">住址</view>
			<view style="margin-top: 15px;font-size: 14px;height: 30px;">{{fillMap.home_address}}</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80px;font-size: 14px;height: 30px;">简介</view>
		</view>
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" v-model="fillMap.introduction" disabled="true">
		</textarea>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-top: 20px;margin-left: 15px;width: 10px;height: 10px;color: red;">*</view>
			<view style="margin-top: 15px;width: 80%;font-size: 14px;height: 30px;">上传照片(一寸红底证件照)</view>
		</view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList" :key="index" @click="open(index)">
				<u-image 
				  :src="item"
				  width="80px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view v-if="show" class="overlay" @click="close">
		  <view 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		  >
			<view class="slides" :style="slideStyle">
			  <image v-for="img in imageList" :key="img" :src="img" class="slide" />
			</view>
		  </view>
		  <view class="counter">{{ current + 1 }} / {{ imageList.length }}</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceMyXuanMinDetail } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const imageValue = ref('/static/service/wenjianImg.png');
const idstring = ref('');
const dataDict = ref<any>({});
const fillMap = ref<any>({});
const imageList = ref<any[]>([]);
const show = ref(false);
const current = ref(0);
const startX = ref(0);
const moveX = ref(0);
const fileList = ref<any[]>([]);

const slideStyle = computed(() => {
	return {
		transform: `translateX(-${current.value * 100}%)`
	};
});

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
		serviceMyXuanMinDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			fillMap.value = res.result.fillMap;
			fileList.value = res.result.fileList;
			if (res.result.fillMap && res.result.fillMap.photo_path) {
				imageList.value.push(res.result.fillMap.photo_path);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const loadTextFile = (item: any) => {
	console.log(item.filePath);
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const open = (index: number) => {
	current.value = index;
	show.value = true;
};

const close = () => {
	show.value = false;
};

const touchStart = (e: any) => {
	startX.value = e.touches[0].clientX;
};

const touchMove = (e: any) => {
	moveX.value = e.touches[0].clientX;
};

const touchEnd = () => {
	const diff = startX.value - moveX.value;
	if (Math.abs(diff) > 50) {
		if (diff > 0 && current.value < imageList.value.length - 1) {
			current.value++;
		} else if (diff < 0 && current.value > 0) {
			current.value--;
		}
	}
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
	 }
	.formView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 40px;
	}
}
</style>