<template>
    <view class="main">
        <u-navbar
          title="个人资料"
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
          <template #right>
            <view @click="sureClick()">
                <view class="homestayView">保存</view>
            </view>
          </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 80%;">头像</view>
			<uni-file-picker style="margin-top: 10px;"  v-model="imageValue"
			            limit="1" :del-icon="false" disable-preview :imageStyles="imageStyles"
			            					file-mediatype="image" @select="select"  >
						<u-image style="display: flex;align-items: center;"
						  :src="iconapp"
						  width="35px"
						  height="35px"
						></u-image>
			</uni-file-picker>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;" @click="changeDataClick(1)">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >昵称</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{nick_name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;" @click="changeDataClick(2)">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >公益宣言</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{declaration}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;" >
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >姓名</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{dataDict.name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;" @click="gentleChange()">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >性别</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{sex}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >证件类型</view>
			<view v-if="dataDict.card_type === '1'" style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">身份证</view>
			<view v-if="dataDict.card_type === '2'" style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">护照</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >证件号码</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{dataDict.card_num}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >手机号码</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{dataDict.mobile}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;" @click="changeDataClick(3)">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;" >QQ号码</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 40%;text-align: right;">{{qq_num}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;" :src="icon"
					  width="8px"
					  height="12px"></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { serviceFindActivityOrgDetailPersonal, serviceFindActivityOrgDetailSetUp } from '@/api/service';
import { storage, BaseURL } from '@/utils/storage';
import eventBus from '@/utils/eventBus';

const bgColor = ref("#2A9595");
const normalImg = ref('/static/home/homestay.png');
const icon = ref('/static/service/my_arrow.png');
const imageValue = ref<any>('');
const imageStyles = ref({
	width: 40,
	height: 40,
	border: {
		radius: "50%",
		color: '#fff'
	},
});
const tempFilePaths = ref<any[]>([]);
const dataDict = ref<any>({});
const sex = ref('');
const gentleList = ref(['男', '女']);
const declaration = ref('暂无');
const nick_name = ref('暂无');
const qq_num = ref('暂无');
const iconapp = ref('/static/service/iconapp.png');
const type = ref<any>('');

const handleRefresh = (data: any) => {
	if (type.value === 1 || type.value === '1') {
		nick_name.value = data;
	} else if (type.value === 2 || type.value === '2') {
		declaration.value = data;
	} else if (type.value === 3 || type.value === '3') {
		qq_num.value = data;
	}
};

onMounted(() => {
	init();
	eventBus.on('refresh-Actdata', handleRefresh);
});

onUnmounted(() => {
	eventBus.off('refresh-Actdata', handleRefresh);
});

const init = () => {
	try {
		let param = {
			userId: storage.getUserId(),
		};
		serviceFindActivityOrgDetailPersonal(param).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
			imageValue.value = res.result.head_img;
			sex.value = res.result.sex ? res.result.sex : '';
			nick_name.value = res.result.nick_name;
			declaration.value = res.result.declaration;
			qq_num.value = res.result.qq_num;
		});
	} catch (error) {
		console.log(error);
	}
};

const select = (e: any) => {
	console.log('选择文件：', e);
	tempFilePaths.value = e.tempFilePaths;
};

const gentleChange = () => {
	console.log(sex.value);
	if (sex.value !== '') {
		uni.showToast({
			title: '性别不可修改',
			icon: 'none',
			duration: 1500,
		});
	} else {
		uni.showActionSheet({
			itemList: gentleList.value,
			success: (res: any) => {
				sex.value = gentleList.value[res.tapIndex];
			},
			fail: (res: any) => {
				console.log(res.errMsg);
			}
		});
	}
};

const saveClick = () => {
	try {
		let param = {
			id: dataDict.value.id,
			head_img: imageValue.value,
			nick_name: nick_name.value,
			sex: sex.value,
			declaration: declaration.value,
			qq_num: qq_num.value,
		};
		serviceFindActivityOrgDetailSetUp(param).then((res: any) => {
			console.log(res);
			uni.navigateBack();
		});
	} catch (error) {
		console.log(error);
	}
};

const sureClick = () => {
	if (tempFilePaths.value.length > 0) {
		console.log(tempFilePaths.value);
		uni.uploadFile({
			url: BaseURL + 'AppWorkOrder/addUploadIms',
			filePath: tempFilePaths.value[0],
			name: 'multipartFile',
			formData: { type: "jpg" },
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				imageValue.value = responseData.data;
				saveClick();
			}
		});
	} else {
		saveClick();
	}
};

const changeDataClick = (typeNum: number) => {
	type.value = typeNum;
	uni.navigateTo({
		url: '/pages/service/volunteerQunYuan/changeDataValue?type=' + typeNum
	});
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
    }
</style>