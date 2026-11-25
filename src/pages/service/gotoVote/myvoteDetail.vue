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
		<view class="specsView">投票范围  {{dataDict.man_name}}</view>
		<view class="specsView">投票来源  {{dataDict.source}}</view>
		<view v-if="dataDict.mode === '0'" class="specsView">投票模式  每户一票</view>
		<view v-if="dataDict.mode === '1'" class="specsView">投票模式  每人一票</view>
		<view class="specsView">投票日期  {{dataDict.start_date}}-{{dataDict.end_date}}</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		
		<view  style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的选择  {{chooseMap.option_name}}</view>
		
		<view style="width: 100%;height: 5px;margin-top: 20px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的意见</view>
		
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" v-model="chooseMap.content" disabled="true">
		</textarea>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">签名</view>
		<u-image style="margin-left: 5px;margin-top: 10px;"
		  :src="newsignpic"
		  width="370px"
		  height="150px"
		></u-image>
		
</view>
</template>

<script setup lang="ts">
	import { serviceGoToVoteMyDetail } from '@/api/service';
	import { storage, BaseImgURL } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const idstring = ref('');
	const dataDict = ref<any>({});
	const chooseMap = ref<any>({});
	const sign_picArr = ref<any[]>([]);
	const newsignpic = ref('');

	const loadData = () => {
		try {
			let param = {
				user_id: storage.getUserId(),
				id: idstring.value,
			};
			serviceGoToVoteMyDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
				// 直接处理并赋值
				chooseMap.value = res.result.chooseMap || {};
				if (res.result.chooseMap) {
					sign_picArr.value.push(chooseMap.value);
					sign_picArr.value = sign_picArr.value.map((item: any) => ({
						...item,
						sign_pic: item.sign_pic ? `${BaseImgURL}/${item.sign_pic.replace(/^\//, '')}` : '/default.jpg'
					}));
					newsignpic.value = sign_picArr.value[0].sign_pic;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		idstring.value = options.id || '';
		loadData();
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
	 .specsView{
	 		 
	 		 display: flex;
	 		 margin-left: 15px;
	 		 font-size: 12px;
	 		 margin-top: 5px;
	 		 
	 }
    }
</style>