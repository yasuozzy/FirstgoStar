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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">我的建议</view>
		<view class="inputView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 50px;">建议人</view>
			<input class="searchlocation" placeholder="请填写建议人" v-model="user_name" :disabled="disabled" type="text" />
			<view class="checkView">
				<u-checkbox-group
				            v-model="checkboxValue1"
				            placement="column"
				            @change="checkboxChange"
				        >
					<u-checkbox
				                :customStyle="{marginBottom: '8px'}"
				                v-for="(item, index) in hidename"
				                :key="index"
								shape="circle"
				                :label="item.name"
				                :name="item.name"
				                :disabled="item.disabled"
								activeColor="#2A9595"
				            >
				    </u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">提出意见</view>
		<textarea class="textareaClass" v-model="content"  placeholder="请填写意见">
		</textarea>
		<view class="buttonView" @click="tijiaoClick">提交</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceOpinionCollectDetail, serviceOpinionFillUp } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const hidename = ref([{ name: '匿名', disabled: false }]);
const checkboxValue1 = ref<any[]>([]);
const idstring = ref('');
const dataDict = ref<any>({});
const disabled = ref(false);
const user_name = ref('');
const content = ref('');

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
		});
	} catch (error) {
		console.log(error);
	}
};

const checkboxChange = (n: any) => {
	console.log(n);
	if (n.length > 0) {
		disabled.value = true;
		user_name.value = '匿名';
	} else {
		disabled.value = false;
	}
};

const tijiaoClick = () => {
	if (user_name.value.length === 0) {
		uni.showToast({ title: '建议人不能为空', icon: 'none' });
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
			user_name: user_name.value,
			content: content.value,
		};
		serviceOpinionFillUp(param).then((res: any) => {
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