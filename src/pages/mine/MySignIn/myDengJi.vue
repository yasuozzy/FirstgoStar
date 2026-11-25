<template>
    <view class="main">
        <u-navbar
          title="我的登记"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
        <template #left>
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
        </template>
        </u-navbar>
		<image style="width: 100%;height: 180px;" src="/src/static/mine/mydengjiHeadImage.png"></image>
		<view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;margin-top: 20px;">
			<view class="mineButton" @click="personImageClick">
				<image style="width: 20px;height: 20px;margin-top: 2px;" src="/src/static/service/myIconImage.png"></image>
			</view>
			<view class="mineButton" style="color: white;margin-left: 20px;font-size:13px; " @click="noteListClick">记录</view>
		</view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">体温度数(°C)</view>
			<input class="searchlocation" placeholder="请输入当前体温" v-model="bodyTemperature" type="text" />
		</view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 55%;">咳嗽</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="radiovalue6"
			  placement="row"
			  @change="groupChange"
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in radiolist6"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="signView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 175px;">来访时间</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 13px;color: white;" @click="qiandaoClick()">
				<view v-if="type === '1'" style="background-color: #2A9595;height: 30px;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;color: white;" >上午</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">上午</view>
			</view>
			<view style="margin-left: 20px;margin-top: 10px;font-size: 13px;color: white;" @click="qiantuiClick()">
				<view v-if="type === '2'" style="background-color: #2A9595;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">下午</view>
				<view v-else style="background-color: gray;display: flex;align-items: center;justify-content: center;border-radius: 4px;width: 70px;height: 30px; color: white;">下午</view>
			</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;font-size: 13px;border: gray 1px solid;border-radius: 4px;width: 92%;height: 30px;display: flex;flex-direction: row;">
			<view class="startView" @click="show = true">{{clock_in_date}}</view>
			<image style="margin-top: 10px;margin-left: 15px;width: 13px;height: 10px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;margin-top: 15px;margin-left: 15px;font-size: 13px;">到访地址</view>
		<view style="margin-top: 15px;margin-left: 4%;font-size: 13px;border: gray 1px solid;border-radius: 4px;width: 92%;height: 30px;display: flex;flex-direction: row;">
			<view class="startView" @click="choseLocation()">{{location}}</view>
			<image style="margin-top: 10px;margin-left: 15px;width: 13px;height: 10px;" src="/src/static/home/downImage.png"></image>
		</view>
		
		<input class="detailAddressInput" placeholder="定位差异，请手动填写(非必填)" type="text" v-model="writeComeAddress" />
		<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">姓名</view>
			<input class="searchlocation"  v-model="name"  :disabled="name" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">联系电话</view>
			<input class="searchlocation"  v-model="mobile"  :disabled="mobile" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">身份证号</view>
			<input class="searchlocation"  v-model="userCard"  :disabled="userCard" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">家庭住址</view>
			<input class="searchlocation"  v-model="homeAddress"  :disabled="homeAddress" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">单位名称</view>
			<input class="searchlocation"  v-model="shopName"  :disabled="shopName" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 35%;">单位地址</view>
			<input class="searchlocation"  v-model="shopAddress"  :disabled="shopAddress" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="buttonView" @click="tijiaoClick">提交</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsMySignInGetUserInfo,MineNeedToolsMySignInCheckInOption} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const radiolist6 = ref([
	  {
		name: "否",
		disabled: true,
	  },
	  {
		name: "是",
		disabled: false,
	  },
	]);
	const radiovalue6 = ref("否");
	const coughType = ref(0);
	const type = ref('1');
	const clock_in_date = ref('');//选择补卡日期
	const show = ref(false);
	const value1 = ref(Number(new Date()));
	const location = ref('具体地址');
	const bodyTemperature = ref('');
	const morAfter = ref();
	const writeComeAddress = ref('');
	const name = ref();
	const mobile = ref();
	const userCard = ref();
	const homeAddress = ref();
	const shopName = ref();
	const shopAddress = ref();
	
	onLoad(() => {
		const date = new Date();
		const pad = (n) => String(n).padStart(2, '0');
		clock_in_date.value = 
		        `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
		        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
		getUserInfo();
	});
	const getUserInfo = async() => {
		
		try {
			
			let param = {
				
				
				userId:storage.getUserId()
				
			};
			const res = await MineNeedToolsMySignInGetUserInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			name.value = dataDict.value.name;
			mobile.value = dataDict.value.mobile;
			userCard.value = dataDict.value.userCard;
			homeAddress.value = dataDict.value.homeAddress;
			shopName.value = dataDict.value.shopName;
			shopAddress.value = dataDict.value.shopAddress;
			
			
		}catch (error) {
			console.log(error)
		}
	};
	const personImageClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/MySignIn/personInformation?dataDict=${JSON.stringify(dataDict.value)}`
		})
	};
	const noteListClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/MySignIn/noteList'
		})
	};
	const groupChange = (e:any) => {
				
		console.log(e);
		if (e === '否') {
			
			 coughType.value = 0;
			
		}else if(e === '是'){
			
			 coughType.value = 1;
			
		}
	};
	const qiandaoClick = () => {
		type.value = '1';
		morAfter.value = 2;
	};
	
	const qiantuiClick = () => {
		type.value = '2';
		morAfter.value = 1;
	};
	//打卡地点
	const choseLocation = () => {
		
	
		uni.chooseLocation({
			
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					location.value = res.name;
					console.log(location.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
	};
	const tijiaoClick = async() => {
		
		if(bodyTemperature.value.length === 0){
			uni.showToast({
				title:'请填写当前体温',
				icon:'none',
			})
			return;
		}
		if(location.value === '具体地址'){
			uni.showToast({
				title:'请填写到访地址',
				icon:'none',
			})
			return;
		}
		
		try {
			
			let param = {
				
				
				userId:storage.getUserId(),
				bodyTemperature:bodyTemperature.value,
				coughType:coughType.value,
				morAfter:morAfter.value,
				comeTime:clock_in_date.value,
				comeAddress:location.value,
				writeComeAddress:writeComeAddress.value,
				name:name.value,
				mobile:mobile.value,
				cardNum:userCard.value,
				homeAddress:homeAddress.value,
				shopName:shopName.value,
				shopAddress:shopAddress.value
			};
			const res = await MineNeedToolsMySignInCheckInOption(param);
							
			console.log(res);
			uni.showToast({
				title:'登记成功',
				icon:'none',
			})
			 uni.navigateBack();
			
		}catch (error) {
			console.log(error)
		}
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		  .mineButton{
			  
			  width: 60px;
			  height: 25px;
			  background-color: #2A9595;
			  border-radius: 12px;
			  margin-left: 230px;
			  display: flex;
			  align-items: center;
			  justify-content: center;
		  }
		  .searchlocation{
			   margin-left: 10px;
			   width: 50%;
			   height: 25px;
			   margin-top: 10px;
			   font-size: 13px;
			   text-align: right;
		   }
		   .signView{
		   	display: flex;
		   	flex-direction: row;
		   	width: 100%;
		   	height: 40px;
			margin-top: 10px;
		   }
		   .startView{
		   		 // margin-left: 15px;
		   		 // margin-top: 15px;
				 display: flex;
				 justify-content: left;
				 text-align: left;
				 align-items: center;
		   		 width: 80%;
		   		 font-size: 13px;
				 margin-left: 10px;
		   }
		   .chooseLocationView{
		   		 display: flex;
		   		 margin-top: 10px;
		   		 margin-left: 4%;
		   		 width: 92%;
		   		 height: 30px;
		   		 border: 1px gray solid;
		   		 border-radius: 4px;
		   		 font-size: 13px;
		   		 text-align: left;
		   		 justify-content: left;
		   		 align-items: center;
		   }
		   .detailAddressInput{
			   
			   margin-left: 4%;
				width: 92%;
				height: 35px;
				margin-top: 10px;
				border: 1px gray solid;
				border-radius: 5px;
				font-size: 13px;
		   }
		   .buttonView{
		              
				 margin-top: 30px;
				 background-color: #2A9595;
				 border-radius: 5px;
				 color: white;
				 font-size: 14px;
				 margin-left: 5%; 
				 display: flex;
				 justify-content: center; /* 水平居中 */
				 align-items: center;     /* 垂直居中 */
				 height: 40px;           /* 需要设置高度 */
				 width: 90%;             /* 需要设置宽度 */
		    }
}
</style>