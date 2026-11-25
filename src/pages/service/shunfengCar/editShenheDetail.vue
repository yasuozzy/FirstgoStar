<template>
    <view class="main">
        <u-navbar
          title="申请兼职配送"
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
		<input class="searchlocation" v-model="userName" placeholder="请输入用户名" type="text" />
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<input class="searchlocation" v-model="phone" placeholder="请输入手机号" type="text" />
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 15px;width: 100%;display: flex;flex-direction: row;">
			<input class="codeInput" placeholder="请输入验证码" type="text" />
			<!-- <view style="font-size: 13px;color: #2A9595;margin-left: 15px;align-items: right;margin-top: 5px;">获取验证码</view> -->
			<view class="buttonCodeV" :class="{ disabled: isSending }" :style="{ pointerEvents: isSending ? 'none' : 'auto' }" @click="getCode">{{codetips}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<input class="searchlocation" v-model="idcard" placeholder="请输入身份证号" type="text" />
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<input class="searchlocation" v-model="contactperson" placeholder="请输入紧急联系人" type="text" />
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<input class="searchlocation" v-model="contactmobile" placeholder="请输入紧急联系人电话" type="text" />
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 12px;margin-left: 15px;font-size: 14px;width: 35%;color: #2A9595;">配送用车</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="Writevalue"
			  placement="row"
			  @change="writeChange"
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in WriteOpinion"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<input v-if="is_fill == 1" v-model="carno" class="carIdInput" placeholder="输入车牌号" type="text" />
		<input v-if="is_fill == 1" v-model="driverlicense" class="carIdInput" placeholder="输入驾照编号" type="text" />
		<input v-if="is_fill == 1" v-model="vehiclelicense" class="carIdInput" placeholder="输入行驶证编号" type="text" />
		<input v-if="is_fill == 0" v-model="carno" class="carIdInput" placeholder="输入车辆型号" type="text" />
		<view style="height: 140px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;flex-direction: column;" @click="carphotoselect">
			
			<image style="width: 220px;height: 120px;margin-top: 5px;" :src="carImage"></image>
			<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">点击上传车辆照片</view>
		</view>
		<view v-if="is_fill == 1" style="height: 140px;align-items: center;width: 100%;justify-content: center;display: flex;flex-direction: column;"  @click="diverphotoselect" >
			
			<image style="width: 220px;height: 120px;margin-top: 5px;" :src="DriverImage"></image>
			<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">点击上传驾驶证照片</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;">服务机构</view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: gray;">(以群苑物联网运营中心为中心)</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" @click="chooseEastPoint">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">东服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view v-if="eastTitle.length > 0" style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{eastTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" @click="chooseWestPoint">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">西服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view v-if="westTitle.length > 0" style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{westTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" @click="chooseSouthPoint">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">南服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view v-if="southTitle.length > 0" style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{southTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" @click="chooseNorthPoint">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">北服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view v-if="northTitle.length > 0" style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{northTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;">证件照</view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: gray;">(身份证正反面以及手持身份证各一张)</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="height: 140px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;flex-direction: column;" @click="zhengselect">
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseZheng"></image>
				<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">点击上传身份证正面</view>
			</view>
			<view style="height: 140px;align-items: center;width: 100%;justify-content: center;display: flex;flex-direction: column;"  @click="fanselect" >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseFan"></image>
				<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">点击上传身份证反面</view>
			</view>
			<view style="height: 140px;align-items: center;width:100%;justify-content: center;display: flex;flex-direction: column;" @click="handselect">
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseHand"></image>
				<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">手持身份证正面照</view>
			</view>
		</view>
		<uni-popup ref="popupRef" type="center">
			<view class="popView">
				<view class="scroll-view" >
					<view style="margin-top: 10px;font-size: 18px;text-align: center;width: 100%;">选择服务网点</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view v-if="chooseType == 1" class="itemList" v-for="(item,index) in east">
						<view style="display: flex;flex-direction: row;width: 100%;">
							<view style="margin-left: 15px;margin-top: 20px;">
								<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="chooseselect(item,index)"></image>
								<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect(item,index)"></image>
							</view>
							<view style="display: flex;flex-direction: column;width: 78%;">
								<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.name}}</view>
								<view style="display: flex;flex-direction: row;width: 100%;">
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 60%;color: gray;">{{item.address}}</view>
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 30%;text-align: right;color: gray;">{{item.directionName}}{{item.mileage}}</view>
								</view>
							</view>
						</view>
						<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
					</view>
					<view v-if="chooseType == 2" class="itemList" v-for="(item,index) in west">
						<view style="display: flex;flex-direction: row;width: 100%;">
							<view style="margin-left: 15px;margin-top: 20px;">
								<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="chooseWestselect(item,index)"></image>
								<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseWestselect(item,index)"></image>
							</view>
							<view style="display: flex;flex-direction: column;width: 78%;">
								<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.name}}</view>
								<view style="display: flex;flex-direction: row;width: 100%;">
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 60%;color: gray;">{{item.address}}</view>
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 30%;text-align: right;color: gray;">{{item.directionName}}{{item.mileage}}</view>
								</view>
							</view>
						</view>
						<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
					</view>
					<view v-if="chooseType == 3" class="itemList" v-for="(item,index) in south">
						<view style="display: flex;flex-direction: row;width: 100%;">
							<view style="margin-left: 15px;margin-top: 20px;">
								<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="chooseSouthselect(item,index)"></image>
								<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseSouthselect(item,index)"></image>
							</view>
							<view style="display: flex;flex-direction: column;width: 78%;">
								<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.name}}</view>
								<view style="display: flex;flex-direction: row;width: 100%;">
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 60%;color: gray;">{{item.address}}</view>
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 30%;text-align: right;color: gray;">{{item.directionName}}{{item.mileage}}</view>
								</view>
							</view>
						</view>
						<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
					</view>
					<view v-if="chooseType == 4" class="itemList" v-for="(item,index) in north">
						<view style="display: flex;flex-direction: row;width: 100%;">
							<view style="margin-left: 15px;margin-top: 20px;">
								<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="chooseNorthselect(item,index)"></image>
								<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseNorthselect(item,index)"></image>
							</view>
							<view style="display: flex;flex-direction: column;width: 78%;">
								<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.name}}</view>
								<view style="display: flex;flex-direction: row;width: 100%;">
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 60%;color: gray;">{{item.address}}</view>
									<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 30%;text-align: right;color: gray;">{{item.directionName}}{{item.mileage}}</view>
								</view>
							</view>
						</view>
						<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view class="backButton" style="color: gray;" @click="cancelClick()">取消</view>
					<view style="height: 30px;background-color: darkgray;width: 1px;"></view>
					<view class="backButton" style="color: blue;" @click="sureClick()">确认</view>
				</view>
			</view>   
		</uni-popup>
		<view class="protocalView">
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseprotocal"></image>
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseprotocal"></image>
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《用户协议》</view>
		</view>
		<view class="tijiaobuttonView" @click="tijiaoClick()">重新提交</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarGetQueryOffice,serviceFindActivityGetCode,
	ServiceShunFengYueCarValidateCode,ServiceShunFengYueCardeliveryDetail,
	ServiceShunFengYueCarAgainDeliveryRegister} from '@/api/service';
	import {GetAgreemente} from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const WriteOpinion = ref([
	  {
		name: "机动车",
		disabled: true,
	  },
	  {
		name: "非机动车",
		disabled: false,
	  },
	]);
	const Writevalue = ref("机动车");
	const is_fill = ref(1);
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan= ref('/static/service/licenseFan.png');
	const licenseHand = ref('/static/service/licenseHand.png');
	const zhengimageValue = ref([]);
	const fanimageValue = ref([]);
	const handimageValue = ref([]);
	const carImage = ref('/static/mine/selectphoto.png');
	const DriverImage = ref('/static/mine/selectphoto.png');
	const carphotoValue = ref('');
	const driverPhotoValue = ref('');
	const dataList = ref();
	const east = ref([]);
	const south = ref([]);
	const north = ref([]);
	const west = ref([]);
	const popupRef = ref(null);		
	const chooseType = ref(1);
	const agreement_name = ref('');
	const selected = ref(false);
	const userName = ref('');
	const phone = ref('');
	const code = ref('');
	const codetips = ref('获取验证码');
	const countdown = ref(0);         // 倒计时秒数
	const isSending = ref(false);     // 按钮是否处于禁用状态
	let timer = null;                 // 定时器引用
	const idcard = ref('');
	const contactperson = ref('');
	const contactmobile = ref('');
	const carno = ref('');
	const driverlicense = ref('');
	const vehiclelicense = ref('');
	const eastManagerId = ref('');
	const eastTitle = ref('');
	const westManagerId = ref('');
	const westTitle = ref('');
	const southManagerId = ref('');
	const southTitle = ref('');
	const northManagerId = ref('');
	const northTitle = ref('');
	const deliveryId = ref('');
	const eastList = ref([]);
	const westList = ref([]);
	const southList = ref([]);
	const northList = ref([]);
	const changeIdstring = ref('');
	
	onLoad((options:any) => {
		
		deliveryId.value = options.deliveryId;
		
	});
	onMounted(() => {
		loadData();
		getNetPoints();
		getAgreement();
	});
	const loadData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				id: deliveryId.value
			};
			ServiceShunFengYueCardeliveryDetail(param).then((res: any) => {
				console.log(res);
				changeIdstring.value = res.result.id;
				userName.value = res.result.userName;
				phone.value = res.result.phone;
				idcard.value = res.result.idcard;
				contactperson.value = res.result.contactperson;
				contactmobile.value = res.result.contactmobile;
				
				if(res.result.cartype == 1){
					
					Writevalue.value = '机动车';
					is_fill.value = 1;
					
				}else
				{
					Writevalue.value = '非机动车';
					is_fill.value = 0;
				}
				carImage.value = res.result.carpic;
				carno.value = res.result.carno;
				if(is_fill.value === 1){
					DriverImage.value = res.result.driverpic;
					driverlicense.value = res.result.driverlicense;
					vehiclelicense.value = res.result.vehiclelicense;
				}
				eastList.value = res.result.eastList;
				westList.value = res.result.westList;
				southList.value = res.result.southList;
				northList.value = res.result.northList;
				licenseZheng.value = res.result.idCardPicImgs[0];
				licenseFan.value = res.result.idCardPicImgs[1];
				licenseHand.value = res.result.idCardPicImgs[2];
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getNetPoints = async() => {
		
		try {
			let param = {
			};
			ServiceShunFengYueCarGetQueryOffice(param).then((res: any) => {
				console.log(res);
				dataList.value = res.result;
				east.value = res.result.east.map(item => {
				  return {
					...item,
					checked: false  // 默认值为false
				  }
				});
				let eastArr = [];
				for (var index = 0; index < east.value.length; index++) {
					var element = east.value[index];
					for (var j = 0; j < eastList.value.length; j++) {
						var jelement = eastList.value[j];
						if(jelement === element.manid){
							eastArr.push(element);
						}
					}
				}
				eastTitle.value = eastArr.map(item => `${item.name}：${item.address}`).join('，');
				eastManagerId.value = eastArr.map(item => item.manid).join(',');
				west.value = res.result.west.map(item => {
				  return {
					...item,
					checked: false  // 默认值为false
				  }
				});
				let westArr = [];
				for (var index = 0; index < west.value.length; index++) {
					var element = west.value[index];
					for (var j = 0; j < westList.value.length; j++) {
						var jelement = westList.value[j];
						if(jelement === element.manid){
							westArr.push(element);
						}
					}
				}
				westTitle.value = westArr.map(item => `${item.name}：${item.address}`).join('，');
				westManagerId.value = westArr.map(item => item.manid).join(',');
				south.value = res.result.south.map(item => {
				  return {
					...item,
					checked: false  // 默认值为false
				  }
				});
				let southArr = [];
				for (var index = 0; index < south.value.length; index++) {
					var element = south.value[index];
					for (var j = 0; j < southList.value.length; j++) {
						var jelement = southList.value[j];
						if(jelement === element.manid){
							southArr.push(element);
						}
					}
				}
				southTitle.value = southArr.map(item => `${item.name}：${item.address}`).join('，');
				southManagerId.value = southArr.map(item => item.manid).join(',');
				north.value = res.result.north.map(item => {
				  return {
					...item,
					checked: false  // 默认值为false
				  }
				});
				let northArr = [];
				for (var index = 0; index < north.value.length; index++) {
					var element = north.value[index];
					for (var j = 0; j < northList.value.length; j++) {
						var jelement = northList.value[j];
						if(jelement === element.manid){
							northArr.push(element);
						}
					}
				}
				northTitle.value = northArr.map(item => `${item.name}：${item.address}`).join('，');
				northManagerId.value = northArr.map(item => item.manid).join(',');
			});
		} catch (error) {
			console.log(error);
		}
	};
	//获取协议
	const getAgreement = async() => {
						  
					
		try {
			let param = {
				type:'2',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
	
			});
		} catch (error) {
			console.log(error)
		} 
			  
	};
	
	const agreementClick = () => {
					
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${2}`
		})
		
	};
	//获取验证码
	const getCode = async() => {
				
		if (phone.value.length === 0) {
			
			uni.showToast({
				title:'请输入手机号',
				icon:'none',
			})
			return;
		}
				
		// 倒计时期间不允许点击
		if (isSending.value) return; 
		isSending.value = true;
		uni.showLoading({ title: "正在获取验证码" });
				
		try {
		  
			let param = {
				phone:phone.value,
				type:'6',
			};
			const res = await serviceFindActivityGetCode(param);
							  
			console.log(res);
			
			// 模拟接口延迟
			await new Promise(resolve => setTimeout(resolve, 1000)); 
			uni.showToast({ title: '验证码发送成功', icon: 'none' });
				
			// 发送成功后，启动60秒倒计时
			countdown.value = 60;
			timer = setInterval(() => {
				countdown.value--;
				codetips.value = countdown.value + '秒';
				if (countdown.value <= 0) {
					clearInterval(timer);
						timer = null;
						isSending.value = false; // 倒计时结束，恢复可点击状态
						codetips.value = '获取验证码';
					 }
			}, 1000);
			  
		}catch (error) {
		  console.log(error)
		   uni.showToast({ title: '发送失败，请重试', icon: 'none' });
		   // 如果发送失败，允许用户立即重新点击
		   isSending.value = false; 
		}finally {
			uni.hideLoading();
		}
				  
				
	};
	const chooseprotocal = () => {
		selected.value = !selected.value;
	};
	const writeChange = (e:any) => {
				
		console.log(e);
		if (e === '机动车') {
			
			 is_fill.value = 1;
			
		}else if (e == '非机动车') {
			
			 is_fill.value = 0;
		}
	};
	const carphotoselect = (e:any) => {
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
				
				carImage.value = res.tempFilePaths[0];
				uploadcarphoto()
			}
		});
	};
	const uploadcarphoto = () => {
		
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: carImage.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				carphotoValue.value = responseData.data;
				
			},
			
		});
	};
	const diverphotoselect = (e:any) => {
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
				
				DriverImage.value = res.tempFilePaths[0];
				uploadDriverphoto()
			}
		});
	};
	const uploadDriverphoto = () => {
		
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: DriverImage.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				driverPhotoValue.value = responseData.data;
				
			},
			
		});
	};
	const chooseEastPoint = () => {
		
		chooseType.value = 1;
		popupRef.value?.open();
	};
	const chooseWestPoint = () => {
		
		chooseType.value = 2;
		popupRef.value?.open();
	};
	const chooseSouthPoint = () => {
		
		chooseType.value = 3;
		popupRef.value?.open();
	};
	const chooseNorthPoint = () => {
		
		chooseType.value = 4;
		popupRef.value?.open();
	};
	const cancelClick = () => {
		
		popupRef.value?.close();
		
	};
	const sureClick = () => {
		
		popupRef.value?.close();
		
		
		if(chooseType.value === 1){
			
			let idArr = [];
			for (var index = 0; index < east.value.length; index++) {
				var element = east.value[index];
				if(element.checked == true){
					idArr.push(element);
				}
			}
			if(idArr.length > 0){
				
				eastTitle.value = idArr.map(item => `${item.name}：${item.address}`).join('，');
				eastManagerId.value = idArr.map(item => item.manid).join(',');
				console.log(eastManagerId.value);
			}
			
		}else if(chooseType.value === 2){
			
			let idArr = [];
			for (var index = 0; index < west.value.length; index++) {
				var element = west.value[index];
				if(element.checked == true){
					idArr.push(element);
				}
			}
			if(idArr.length > 0){
				
				westTitle.value = idArr.map(item => `${item.name}：${item.address}`).join('，');
				westManagerId.value = idArr.map(item => item.manid).join(',');
				console.log(westManagerId.value);
			}
			
		}else if(chooseType.value === 3){
			
			let idArr = [];
			for (var index = 0; index < south.value.length; index++) {
				var element = south.value[index];
				if(element.checked == true){
					idArr.push(element);
				}
			}
			if(idArr.length > 0){
				
				southTitle.value = idArr.map(item => `${item.name}：${item.address}`).join('，');
				southManagerId.value = idArr.map(item => item.manid).join(',');
				console.log(southManagerId.value);
			}
			
		}else if(chooseType.value === 4){
			
			let idArr = [];
			for (var index = 0; index < north.value.length; index++) {
				var element = north.value[index];
				if(element.checked == true){
					idArr.push(element);
				}
			}
			if(idArr.length > 0){
				
				northTitle.value = idArr.map(item => `${item.name}：${item.address}`).join('，');
				northManagerId.value = idArr.map(item => item.manid).join(',');
				console.log(northManagerId.value);
			}
		}
		
	};
	const chooseselect = (item:any,index:any) => {
		
		for (var j = 0; j < east.value.length; j++) {
			var laederment = east.value[j];
				
			if (index == j) {
				
				laederment.checked = !laederment.checked;
			}
		
		};
		console.log(east.value);
	};
	const chooseWestselect = (item:any,index:any) => {
		
		for (var j = 0; j < west.value.length; j++) {
			var laederment = west.value[j];
				
			if (index == j) {
				
				laederment.checked = !laederment.checked;
			}
		
		};
		console.log(west.value);
	};
	const chooseSouthselect = (item:any,index:any) => {
		
		for (var j = 0; j < south.value.length; j++) {
			var laederment = south.value[j];
				
			if (index == j) {
				
				laederment.checked = !laederment.checked;
			}
		
		};
		console.log(south.value);
	};
	const chooseNorthselect = (item:any,index:any) => {
		
		for (var j = 0; j < north.value.length; j++) {
			var laederment = north.value[j];
				
			if (index == j) {
				
				laederment.checked = !laederment.checked;
			}
		
		};
		console.log(north.value);
	};
	const zhengselect = (e:any) => {
		
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
				
				licenseZheng.value = res.tempFilePaths[0];
				uploadZherngImage()
			}
		});
	};
	const uploadZherngImage = async() =>{
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: licenseZheng.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				zhengimageValue.value = responseData.data;
				
			},
			
		});
	};
	const fanselect = (e:any) => {
		
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
				
				licenseFan.value = res.tempFilePaths[0];
				uploadFanImage();
			}
		});
	};
	const uploadFanImage = async() =>{
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: licenseFan.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				fanimageValue.value = responseData.data;
				
			},
			
		});
	};
	const handselect = (e:any) => {
		
		console.log('选择文件：',e);
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				// tempFilePaths.value = <any[]>res.tempFilePaths;
	
				licenseHand.value = res.tempFilePaths[0];
				uploadHandImage();
			}
		});
	};
	const uploadHandImage = async() =>{
		uni.uploadFile({
			url: BaseURL +  'Announce/addUploadIms', 
			filePath: licenseHand.value,
			name: 'multipartFile',
			formData: {
				type:"jpg",
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				const responseData = JSON.parse(uploadFileRes.data);
				console.log(responseData.data);
				handimageValue.value = responseData.data;
				
			},
			
		});
	};
	const tijiaoClick = async() => {
		
		if (userName.value.length === 0) {
			
			uni.showToast({
				title:'请输入用户名',
				icon:'none',
			})
			return;
		}
		if (phone.value.length === 0) {
			
			uni.showToast({
				title:'请输入手机号',
				icon:'none',
			})
			return;
		}
		if (code.value.length === 0) {
			
			uni.showToast({
				title:'请输入验证码',
				icon:'none',
			})
			return;
		}
		if (idcard.value.length === 0) {
			
			uni.showToast({
				title:'请输入身份证号',
				icon:'none',
			})
			return;
		}
		if (contactperson.value.length === 0) {
			
			uni.showToast({
				title:'请填写紧急联系人',
				icon:'none',
			})
			return;
		}
		if (contactmobile.value.length === 0) {
			
			uni.showToast({
				title:'请填写紧急联系人联系电话',
				icon:'none',
			})
			return;
		}
		if(is_fill.value == 1){
			
			if (carno.value.length === 0) {
				
				uni.showToast({
					title:'请输入车牌号',
					icon:'none',
				})
				return;
			}
			if (driverlicense.value.length === 0) {
				
				uni.showToast({
					title:'请输入驾照编号',
					icon:'none',
				})
				return;
			}
			if (vehiclelicense.value.length === 0) {
				
				uni.showToast({
					title:'请输入行驶证编号',
					icon:'none',
				})
				return;
			}
			if (carphotoValue.value.length === 0) {
				
				uni.showToast({
					title:'请上传车辆图片',
					icon:'none',
				})
				return;
			}
			if (driverPhotoValue.value.length == 0) {
				
				uni.showToast({
					title:'请上传驾驶证照片',
					icon:'none',
				})
				return;
			}
		}
		if(is_fill.value == 0){
			
			if (carno.value.length === 0) {
				
				uni.showToast({
					title:'请输入车辆型号',
					icon:'none',
				})
				return;
			}
			
			if (carphotoValue.value.length === 0) {
				
				uni.showToast({
					title:'请上传车辆图片',
					icon:'none',
				})
				return;
			}
			
		}
		if (zhengimageValue.value.length === 0) {
			
			uni.showToast({
				title:'请上传身份证正面照',
				icon:'none',
			})
			return;
		}
		if (fanimageValue.value.length === 0) {
			
			uni.showToast({
				title:'请上传身份证反面照',
				icon:'none',
			})
			return;
		}
		if (handimageValue.value.length === 0) {
			
			uni.showToast({
				title:'请上传手持身份证正面照',
				icon:'none',
			})
			return;
		}
		if(selected.value === false){
			
			uni.showToast({
				title:'请同意用户协议',
				icon:'none',
			})
			return;
		}
		validCode();
		try {
			let param1 = {
				id:changeIdstring.value,
				userName:userName.value,
				managerId:storage.getManid(),
				userId:storage.getUserId(),
				phone:phone.value,
				idcard:idcard.value,
				contactperson:contactperson.value,
				contactmobile:contactmobile.value,
				cartype:1,
				carno:carno.value,
				driverlicense:driverlicense.value,
				vehiclelicense:vehiclelicense.value,
				carpic:carImage.value,
				driverpic:driverPhotoValue.value,
				eastManagerId:eastManagerId.value?eastManagerId.value:'',
				westManagerId:westManagerId.value?westManagerId.value:'',
				southManagerId:southManagerId.value?southManagerId.value:'',
				northManagerId:northManagerId.value?northManagerId.value:''
				
			};
			let param2 = {
				id:changeIdstring.value,
				userName:userName.value,
				managerId:storage.getManid(),
				userId:storage.getUserId(),
				phone:phone.value,
				idcard:idcard.value,
				contactperson:contactperson.value,
				contactmobile:contactmobile.value,
				cartype:2,
				carno:carno.value,
				carpic:carImage.value,
				eastManagerId:eastManagerId.value?eastManagerId.value:'',
				westManagerId:westManagerId.value?westManagerId.value:'',
				southManagerId:southManagerId.value?southManagerId.value:'',
				northManagerId:northManagerId.value?northManagerId.value:''
				
			};
			ServiceShunFengYueCarAgainDeliveryRegister(is_fill ? param1 : param2).then((res) =>{
				
				console.log(res);
				if(res.success == true){
					
					uni.showToast({
						title:'重新申请配送提交成功',
						icon:'none',
					})
					uni.navigateBack()
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none',
					})
				}
			
			});
		} catch (error) {
			console.log(error)
		}
		
	};
	const validCode = async() => {
		
		try {
			let param = {
				mobile:phone.value,
				code:code.value
			};
			ServiceShunFengYueCarValidateCode(param).then((res) =>{
				
				console.log(res);
				if(res.success == true){
					
					
					uni.showToast({
						title:'验证码校验成功',
						icon:'none',
					})
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none',
					})
				}
			
			});
		} catch (error) {
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
		  .searchlocation{
			   margin-left: 4%;
			   width: 92%;
			   height: 30px;
			   margin-top: 15px;
			   font-size: 13px;
		   }
		   .codeInput{
			   margin-left: 15px;
			   width: 70%;
			   height: 30px;
			   font-size: 13px;
		   }
		   .carIdInput{
			    margin-left: 4%;
				width: 92%;
				height: 30px;
				margin-top: 10px;
				border: 1px darkgray solid;
				font-size: 13px;
		   }
		   .popView{
		   			 
				width: calc(100vw - 60px);
				max-height: calc(100vh - 200px);
				background-color: #fff;
				border-radius: 16px;
				overflow: hidden;
				margin: 0 50px;
		   			 
		   }
		   .scroll-view {
		   			 
		     width: 100%;
		      max-height: calc(100vh - 230px);
		      overflow-y: auto;  /* 关键：允许垂直滚动 */
		      -webkit-overflow-scrolling: touch;  /* iOS平滑滚动 */
		      padding: 30rpx;
		      box-sizing: border-box;
		   }
		   .backButton{
		   			 
		   			width: 50%;
		   			font-size: 14px;
		   			display: flex;
		   			justify-content: center;
		   			text-align: center;
		   			align-items: center;
		   }
		   .itemList{
			   display: flex;
			   flex-direction: column;
			   
		   }
		   .protocalView{
		            display: flex;
		            flex-direction: row;
		            width: 100%;
		   		 margin-top: 5px;
		        }
		    .tijiaobuttonView{
		   		  
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
		   .buttonCodeV{
		   		   
		   		   
		   		   background-color: #2A9595;
		   		   border-radius: 15px;
		   		   color: white;
		   		   font-size: 12px;
		   		   
		   		   display: flex;
		   		   justify-content: center; /* 水平居中 */
		   		   align-items: center;     /* 垂直居中 */
		   		   height: 30px;           /* 需要设置高度 */
		   		   width: 80px;             /* 需要设置宽度 */
		   		   /* 优化点击体验 */
		   		   cursor: pointer; 
		   		   user-select: none; 
		   }

}
</style>