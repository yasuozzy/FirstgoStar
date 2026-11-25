<template>
    <view class="main">
        <u-navbar
          title="志愿者申请"
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
		<view class="formView">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 60px;">真实姓名</view>
			<input style="font-size: 14px;border: 1px white solid;background-color: white;width: 250px;margin-top: 30px;margin-left: 30px;" v-model="name" type="text" placeholder="姓名" />
		</view>
		<view class="formView">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 60px;">手机号</view>
			<input style="font-size: 14px;border: 1px white solid;background-color: white;width: 250px;margin-top: 30px;margin-left: 30px;" v-model="phone" type="text" placeholder="手机号" />
		</view>
		<view class="formView">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 60px;">验证码</view>
			<input style="font-size: 14px;border: 1px white solid;background-color: white;width: 170px;margin-top: 30px;margin-left: 30px;" v-model="code" type="text" placeholder="验证码" />
			<u-input
			  class="lineRight"
			  placeholder="请输入验证码"
			  border="surround"
			  v-model="userName"
			>
			  <template #suffix>
			    <u-code
			      ref="uCode"
			      @change="codeChange"
			      seconds="60"
			      changeText="X秒重新获取"
			    ></u-code>
			    <u-button
			      @tap="getCode"
			      :text="tips"
			      type="success"
			      size="mini"
				  color="#2A9595"
			    ></u-button>
			  </template>
			</u-input>
		</view>
		<view class="formView" @click="chooseIDCard">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 60px;">证件类型</view>
			<view style="font-size: 14px;border: 1px white solid;background-color: white;width: 250px;margin-top: 30px;margin-left: 30px;display: flex;flex-direction: row;">
				<view style="font-size: 13px;">{{type}}</view>
				<u-image style="margin-top: 4px;margin-left: 200px;" :src="hotImage"
							  width="12px"
							  height="7px"></u-image>
			</view>
		</view>
		<view class="formView" @click="chooseStreet">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 60px;">所属街道</view>
			<view style="font-size: 14px;border: 1px white solid;background-color: white;width: 250px;margin-top: 30px;margin-left: 30px;display: flex;flex-direction: row;">
				<view style="font-size: 13px;">{{street_name}}</view>
				<u-image style="margin-top: 4px;margin-left: 200px;" :src="hotImage"
							  width="12px"
							  height="7px"></u-image>
			</view>
		</view>
		<view class="formView">
			<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;width: 60px;">证件号码</view>
			<input style="font-size: 14px;border: 1px white solid;background-color: white;width: 250px;margin-top: 30px;margin-left: 30px;" v-model="idnumber" type="text" placeholder="证件号码" />
		</view>
		<view class="buttonView" @click="tijiaoData">提交</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { serviceFindActivitygetStreetList, serviceFindActivityTiJiaoData, serviceFindActivityGetCode } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const hotImage = ref("/static/home/downImage.png");
const name = ref('');
const phone = ref('');
const code = ref('');
const userName = ref('');
const tips = ref('');
const type = ref('身份证');
const payTypeList = ref(['身份证', '护照']);
const car_type = ref(1);
const idnumber = ref('');
const streetArray = ref<any[]>([]);
const titleArr = ref<any[]>([]);
const street_name = ref('');
const street_id = ref('');
const uCode = ref<any>(null);

onMounted(() => {
	init();
});

const init = () => {
	try {
		let param = {};
		serviceFindActivitygetStreetList(param).then((res: any) => {
			console.log(res);
			streetArray.value = res.result;
			titleArr.value = res.result.map((item: any) => item.street_name);
		});
	} catch (error) {
		console.log(error);
	}
};

const codeChange = (text: string) => {
	tips.value = text;
};

const getCode = () => {
	if (phone.value.length === 0) {
		uni.showToast({ title: '请输入手机号', icon: 'none' });
		return;
	}
	if (uCode.value && uCode.value.canGetCode) {
		uni.showLoading({ title: "正在获取验证码" });
		try {
			let param = {
				phone: phone.value,
				type: '13',
			};
			serviceFindActivityGetCode(param).then((res: any) => {
				console.log(res);
				uni.showToast({ title: '验证码发送成功', icon: 'none' });
			});
		} catch (error) {
			console.log(error);
		}
		setTimeout(() => {
			uni.hideLoading();
			if (uCode.value) {
				uCode.value.start();
			}
		}, 1000);
	} else {
		uni.showToast({ title: "倒计时结束后再发送", icon: "none" });
	}
};

const chooseIDCard = () => {
	uni.showActionSheet({
		itemList: payTypeList.value,
		success: (res: any) => {
			type.value = payTypeList.value[res.tapIndex];
			car_type.value = res.tapIndex + 1;
		},
		fail: (res: any) => {
			console.log(res.errMsg);
		}
	});
};

const chooseStreet = () => {
	uni.showActionSheet({
		itemList: titleArr.value,
		success: (res: any) => {
			street_name.value = titleArr.value[res.tapIndex];
			street_id.value = streetArray.value[res.tapIndex].street_id;
		},
		fail: (res: any) => {
			console.log(res.errMsg);
		}
	});
};

const tijiaoData = () => {
	if (name.value.length === 0) {
		uni.showToast({ title: '请输入真实姓名', icon: 'none' });
		return;
	}
	if (phone.value.length === 0) {
		uni.showToast({ title: '请输入手机号', icon: 'none' });
		return;
	}
	if (code.value.length === 0) {
		uni.showToast({ title: '请输入验证码', icon: 'none' });
		return;
	}
	if (idnumber.value.length === 0) {
		uni.showToast({ title: '请输入证件号码', icon: 'none' });
		return;
	}
	if (street_id.value.length === 0) {
		uni.showToast({ title: '请选择街道', icon: 'none' });
		return;
	}

	try {
		let param = {
			userId: storage.getUserId(),
			name: name.value,
			mobile: phone.value,
			code: code.value,
			card_type: car_type.value,
			card_num: idnumber.value,
			street_id: street_id.value,
			street_name: street_name.value,
		};
		serviceFindActivityTiJiaoData(param).then((res: any) => {
			console.log(res);
			uni.navigateTo({
				url: '/pages/service/volunteerQunYuan/shenheStatus'
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
	 .formView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 60px;
		 border-bottom: 1px lightgray solid;
	 }
	 .buttonView{
	           margin-top: 50px;
	           background-color: #2A9595;
	           border-radius: 8px;
	           color: white;
	           font-size: 14px;
	           margin-left: 10%; 
	 		   margin-bottom: 20px;
	           display: flex;
	           justify-content: center;
	           align-items: center;
	           height: 40px;
	           width: 80%;
	  }
	  .lineRight {
	    width: 60%;
	    font-size: 14px;
	  }
    }
</style>