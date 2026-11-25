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
		<view class="specsView">选举范围  {{dataDict.man_name}}</view>
		<view class="specsView">选举来源  {{dataDict.source}}</view>
		<view v-if="dataDict.mode === '0'" class="specsView">选举模式  每户一票</view>
		<view v-if="dataDict.mode === '1'" class="specsView">选举模式  每人一票</view>
		<view class="specsView">起止日期  {{dataDict.start_date}}--{{dataDict.end_date}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">选举结果</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 22.5%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center;">参选人姓名</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 22.5%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">参选人照片</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 22.5%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">参选人信息</view>
			<view style="width: 1px;height: 40px;background-color: lightgray"></view>
			<view style="width: 22.5%;height: 40px;background-color: red;font-size: 13px;color: white;align-items: center;text-align: center;display: flex; justify-content: center; ">操作</view>
		</view>
		<view class="contentView">
			<view class="content_item" v-for="(item,index) in solicList" :key="index">
				<view style="margin-left: 5%;width: 22.5%;height: 80px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">{{item.user_name}}</view>
				<view style="width: 22.5%;height: 80px;border: 0.5px solid #ccc;font-size: 13px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">
					<u-image
					  :src="item.photo_path"
					  width="60px"
					  height="60px"
					></u-image>
				</view>
				<view style="margin-left: -1px; width:22.5%;height: 80px;border: 0.5px solid #ccc;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;" @click="checkDetails(item)">查看选民详情</view>
				<view v-if="item.vote === 'true'" style="margin-left: -1px; width:22.5%;height: 80px;border: 0.5px solid #ccc;font-size: 13px;color: red;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">已投票</view>
				<view v-if="item.vote === 'false'" style="margin-left: -1px; width:22.5%;height: 80px;border: 0.5px solid #ccc;font-size: 13px;color: gray;align-items: center;text-align: center;display: flex; justify-content: center;background-color: white;">投票</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { serviceMyGoToElectDetail } from '@/api/service';
	import { storage, BaseImgURL } from '@/utils/storage';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const title = ref("物管会组织选举");
	const content = ref("小区外加装电梯意见征集，小区外加装电梯意见征集小区外加装电梯意见征集小区外加装电梯意见征集小区外加装电梯意见征集");
	const fanwei = ref("花园小区");
	const resource = ref('物管会');
	const model = ref('每人一票');
	const time = ref("2025.8.1--2025.8.31");
	const solicList = ref<any[]>([]);
	const idstring = ref('');
	const dataDict = ref<any>({});

	const loadData = () => {
		try {
			let param = {
				user_id: storage.getUserId(),
				id: idstring.value,
			};
			serviceMyGoToElectDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
				solicList.value = res.result.fillMap.map((item: any) => ({
					...item,
					photo_path: item.photo_path ? `${BaseImgURL}/${item.photo_path.replace(/^\//, '')}` : '/default.jpg'
				}));
			});
		} catch (error) {
			console.log(error);
		}
	};

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	const checkDetails = (item: any) => {
		uni.navigateTo({
			url: '/pages/service/voterdisclosure/voterDetails?user_name=' + item.user_name + '&introduction=' + item.introduction + '&photo_path=' + item.photo_path
		});
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
			 height: 80px;
		 }
	 }
    }
</style>