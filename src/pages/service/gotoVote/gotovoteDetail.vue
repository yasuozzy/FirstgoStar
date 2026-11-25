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
		<textarea class="textareaClass" v-model="content" :disabled="contentEnable" placeholder="请填写意见">
		</textarea>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">签名</view>
		<u-image style="margin-left: 5px;margin-top: 10px;"
		  :src="newsignpic"
		  width="370px"
		  height="150px"
		></u-image>
		<view v-if="joinFlag === '0'" class="buttonView" @click="tijiaoClick()">提交</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceGoToVoteDetail, serviceGoToVoteSetUp } from '@/api/service';
import { storage, BaseImgURL } from '@/utils/storage';
import eventBus from "@/utils/eventBus";

const bgColor = ref("#2A9595");
const chooseList = ref<any[]>([]);
const selectedValue = ref<any>(null);
const idstring = ref('');
const dataDict = ref<any>({});
const joinFlag = ref('');
const content = ref('');
const contentEnable = ref(true);
const sign_picArr = ref<any[]>([]);
const newsignpic = ref('');
const option_id = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	loadData();
	eventBus.on("sign_netimg", handleUpdateData);
});

onUnmounted(() => {
	eventBus.off("sign_netimg", handleUpdateData);
});

const loadData = () => {
	try {
		let param = {
			user_id: storage.getUserId(),
			id: idstring.value,
		};
		serviceGoToVoteDetail(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			joinFlag.value = res.result.joinFlag;
			if (joinFlag.value === '0') {
				chooseList.value = res.result.optionList;
			} else {
				chooseList.value.push(res.result.chooseMap);
				contentEnable.value = false;
				content.value = res.result.chooseMap.content;
				sign_picArr.value.push(res.result.chooseMap);
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

const handleChange = (value: any) => {
	selectedValue.value = value;
	option_id.value = value;
};

const tijiaoClick = () => {
	uni.showModal({
		cancelText: '取消',
		confirmText: '去签字',
		confirmColor: '#2A9595',
		title: '提示',
		content: '前往签字',
		success: (e: any) => {
			console.log(e);
			if (e.confirm) {
				signClickData();
			}
		}
	});
};

const signClickData = () => {
	uni.navigateTo({
		url: "/pages/mine/SignPage/SignPage",
	});
};

const handleUpdateData = (data: any) => {
	console.log("接收到回传的数据:", data);
	if (data) {
		newsignpic.value = data[0];
		console.log(newsignpic.value);
		allDataSetUp();
	}
};

const allDataSetUp = () => {
	try {
		let param = {
			user_id: storage.getUserId(),
			collect_id: idstring.value,
			house_id: storage.getHseid(),
			option_id: option_id.value,
			content: content.value,
			sign_pic: newsignpic.value,
		};
		serviceGoToVoteSetUp(param).then((res: any) => {
			console.log(res);
			uni.navigateTo({
				url: '/pages/service/gotoVote/myVote'
			});
		});
	} catch (error) {
		console.log(error);
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