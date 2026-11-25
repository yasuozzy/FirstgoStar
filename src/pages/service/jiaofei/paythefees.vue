<template>
	<view class="container">
		
		<view class="custom-navbar">
		  <view class="navbar-content">
		    <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		    <view class="segment-container">
		      
			  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" >
			  	<view style="color: white;font-size: 15px;">缴费</view>
			  </view>
			  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="yuchongClick">
			  	<view  style="color: white;font-size: 15px;">预缴</view>
			  </view>
			  <view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="mingxiClick">
			  	<view  style="color: white;font-size: 14px;">明细</view>
			  </view>
		    </view>
		  </view>
		</view>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind === '1'" style="color: #2A9595;font-size: 13px;">欠费</view>
				<view v-else style="color: black;font-size: 13px;">欠费</view>
				<view class="whiteLine1" v-if="kind === '1'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind === '2'" style="color: #2A9595;font-size: 13px;">租金</view>
				<view v-else style="color: black;font-size: 13px;">租金</view>
				<view class="whiteLine1" v-if="kind === '2'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind === '3'" style="color: #2A9595;font-size: 13px;">预充</view>
				<view v-else style="color: black;font-size: 13px;">预充</view>
				<view class="whiteLine1" v-if="kind === '3'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
				<view v-if="kind === '4'" style="color: #2A9595;font-size: 13px;">余量查询</view>
				<view v-else style="color: black;font-size: 13px;">余量查询</view>
				<view class="whiteLine1" v-if="kind === '4'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind5Click">
				<view v-if="kind === '5'" style="color: #2A9595;font-size: 13px;">退款</view>
				<view v-else style="color: black;font-size: 13px;">退款</view>
				<view class="whiteLine1" v-if="kind === '5'"></view>
			</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 5px;background-color: aliceblue;"></view>
		<view v-if="kind === '1'">
			<view class="renthouseView">
				<view class="house_item" v-for="(item,index) in owemoneyList" :key="index" @click="houseDetailClick(item)">
					<view style="display: flex;flex-direction: row;">
						
						        
						<u-checkbox style="margin-top: 13px;margin-left: 15px;width: 45%;"
										:customStyle="{marginBottom: '8px'}"
										:label-size="13"
										shape="circle"
										:label="item.charge_name"
										:name="item.charge_name"
										:checked="item.checked"
										active-color="#2A9595"
										label-color="#000000"
										@change="changeBox(item)"
								>
						</u-checkbox>
						 
						<view style="margin-top: 13px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;color: #2A9595;">{{item.amount_received}}</view>
					</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view class="owemoneyView">
						<view style="margin-left: 15px;width: 45%;font-size: 13px;margin-top: 10px;">单价：{{item.billing_unitprice}}(元)</view>
						<view style="margin-left: 15px;width: 45%;font-size: 13px;margin-top: 10px;">面积：{{item.hse_floor_area}}(㎡)</view>
					</view>
					<view class="owemoneyView">
						<view style="margin-left: 15px;width: 45%;font-size: 13px;margin-top: 10px;">上次止数：{{item.startnum}}(元)</view>
						<view style="margin-left: 15px;width: 45%;font-size: 13px;margin-top: 10px;">本次止数：{{item.endnum}}(元)</view>
					</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;">计费起止日期：{{item.startdate}}-{{item.enddate}}</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;margin-bottom: 10px;">周期用量：{{item.num}}</view>
			</view>
			<view class="bottomView">
				<view class="jiaofeiButtonView" @click="onlineJiaoNa">在线缴纳</view>
			</view>
		</view>
		<view v-if="kind === '2'">
			<view class="renthouseView">
				<view class="house_item" v-for="(item,index) in houseList" :key="index" @click="houseDetailClick(item)">
					<view style="display: flex;flex-direction: row;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 45%;">房屋编号</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 42%;text-align: right;">{{item.houseNum}}</view>
					</view>
					<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;">所属管理处：{{item.manageName}}</view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;">缴费方式：{{item.chargeType}}</view>
					<view v-if="item.chargeType === '月缴'" style="margin-top: 10px;margin-left: 15px;font-size: 12px;margin-bottom: 10px;">房租金额：{{item.rent}}</view>
					<view v-else style="margin-top: 10px;margin-left: 15px;font-size: 12px;margin-bottom: 10px;">总金额：{{item.totalAmount}}</view>
				</view>
				<view class="bottomView">
					<view class="jiaofeiButtonView" @click="rentJiaoNa">在线缴纳</view>
				</view>
			</view>
			
			</view>
			
		</view>
		<view v-if="kind === '3'">
			<view class="formView">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">业主信息</view>
				<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{housekeeper}}</view>
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
			<view class="formView" @click="chooseItemClick">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;width: 60px;">预充项目</view>
				<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;width: 65%;">{{chooseItem}}</view>
				<u-image style="margin-top: 15px;margin-left: 10px;" :src="downImage"
							  width="20px"
							  height="20px"></u-image>
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
			<!-- <view class="formView">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">预充余额</view>
				<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{yjye}}元</view>
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view> -->
			<view class="formView">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">预充金额</view>
				<input class="searchlocation" v-model="minimum_amount" placeholder="填写预缴金额" type="text" />
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
			<view class="formView">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">备注</view>
				<input class="searchlocation" v-model="remark" placeholder="选填" type="text" />
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
			<view class="buttonView" @click="jiaofeiYuChong">预充</view>
			
		</view>
		<view v-if="kind === '4'">
			<view class="buttonsV">
				<view class="buttonView1" @click="getRemainElectAndWater(2)">电量查询</view>
				<view class="buttonView2" @click="getRemainElectAndWater(1)">水量查询</view>
			</view>
			
		</view>
		<view v-if="kind === '5'">
			<view class="formView">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">房号</view>
				<view style="font-size: 14px;margin-top: 15px;margin-left: 10px;">{{houseName}}</view>
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
			<view class="formView">
				<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">退款事由</view>
				
			</view>
			<view style="background-color: aliceblue;width: 100%;height: 1px;margin-top: 10px;"></view>
			<textarea v-model="cancelReason" style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" placeholder="请填写退款事由...">
			</textarea>
			<view style="display: flex;flex-direction: row;margin-top: 10px;">
				<view style="margin-top: 12px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">上传图片</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			<view class="imagechooseView">
			            <uni-file-picker 
			            v-model="imageValue"  
			            file-mediatype="image"
			            mode="grid"
			            file-extname="png,jpg"
			            :image-styles="imageStyles"
			            @progress="progress" 
			            @success="success" 
			            @fail="fail" 
			            @select="select" 
			            limit="9" >
							<view class="custom-upload-btn">
							  <image :src="selectphoto" ></image>
							</view>
						</uni-file-picker>
			        </view>
			<view class="buttonView" @click="cancelMainMoney">提交</view>
		</view>
		<u-modal :show="discountShow" showCancelButton="true" confirm-text="确认" confirm-color="#2A9595"  @confirm="confirmdiscount" cancel-text="取消" @cancel="cancelDiscount" :title="discountTitle" style="display: flex;flex-direction: column;">
		    <view style="width: 92%;display: flex;flex-direction: column;">
		        <view style="font-size: 13px;display: flex;flex-direction: row;" v-for="(item,index) in yushouListArr" :key="index" @click="chooseDisccount(item)">
					<view style="margin-top: 10px;font-size: 13px;width: 85%;">{{item.charge_name}}</view>
					<u-image v-if="titleChoose === item.charge_code" style="margin-top: 15px;margin-left: 10px;" :src="chooseImage"
								  width="15px"
								  height="15px"></u-image>
					<u-image v-if="titleChoose !== item.charge_code" style="margin-top: 15px;margin-left: 10px;" :src="unchooseImage"
							  width="15px"
							  height="15px"></u-image>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import {
	serviceQianFeiList,
	serviceRentMoney,
	serviceYuChongItemList,
	serviceElectricOweMoney,
	serviceInnnerPay,
	serviceRemainElectWater,
	serviceCancelMoneyMain,
	serviceQianFeiJiaoNa
} from '@/api/service';
import { storage, BaseURL } from '@/utils/storage';

const kind = ref("1");
const downImage = ref('/static/service/unfoldImage.png');
const selectphoto = ref('/static/mine/selectphoto.png');
const chooseItem = ref('选择');
const yjye = ref(0);
const minimum_amount = ref('');
const maxPayNum = ref('');
const isqian = ref(false);
const ispay = ref(false);
const charge_code = ref('');
const remark = ref('');
const houseList = ref<any[]>([
	{ code: 'QY部门-20室', guanlichu: '花海一广场', type: '年缴', money: '3000.00' },
	{ code: 'QY部门-20室', guanlichu: '花海一广场', type: '年缴', money: '3000.00' },
	{ code: 'QY部门-20室', guanlichu: '花海一广场', type: '年缴', money: '3000.00' }
]);

const owemoneyList = ref<any[]>([]);
const DataParam = ref({
	house_id: '',
	page: 1,
	size: 10,
});
const rentParam = ref({
	mobile: '',
	page: 1,
	size: 10,
});
const housekeeper = ref('');
const yuchongParam = ref({
	manageId: "",
	userId: "",
	houseId: ""
});
const yuchongItemList = ref<any[]>([]);
const itemTitleList = ref<any[]>([]);
const errorMessage = ref('');
const oweMoneParam = ref({
	house_id: ''
});
const electDataDict = ref<any>({});
const innerPayParam = ref({
	use_id: '',
	chargeCode: '',
	amount: '',
	houseId: '',
	remark: '',
	hostNo: '',
	cstType: '8',
	mobile: '',
	flag: '1'
});

const remainParam = ref({
	hseId: '',
	type: ''
});
const houseName = ref('');
const cancelReason = ref('');
const imageStyles = ref({
	width: 64,
	height: 64,
	border: {
		color: "lightgray",
		width: 2,
		style: 'dashed',
		radius: '2px'
	}
});

const cancelParam = ref({
	userId: '',
	picture: '',
	house_id: '',
	remarks: '',
});
const uploadedCount = ref(0);
const tempFilePaths = ref<any[]>([]);
const finalImgValue = ref('');
const discountShow = ref(false);
const discountTitle = ref('预充项目');
const yushouListArr = ref<any[]>([]);
const chooseImage = ref('/static/service/choosen.png');
const unchooseImage = ref('/static/service/unchoosen.png');
const titleChoose = ref('');
const imageValue = ref<any[]>([]);

onMounted(() => {
	housekeeper.value = storage.getRealName();
	houseName.value = storage.getAddress();
	initQianFeiData();
});

onPullDownRefresh(() => {
	initQianFeiData();
});

const initQianFeiData = () => {
	try {
		DataParam.value.house_id = storage.getHseid();
		serviceQianFeiList(DataParam.value).then((res: any) => {
			console.log(res);
			owemoneyList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	} finally {
		uni.stopPullDownRefresh();
	}
};

const getRentMoneyData = () => {
	try {
		rentParam.value.mobile = storage.getPhone();
		serviceRentMoney(rentParam.value).then((res: any) => {
			console.log(res);
			houseList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const getYuChongItemList = () => {
	try {
		yuchongParam.value.houseId = storage.getHseid();
		yuchongParam.value.userId = storage.getUserId();
		yuchongParam.value.manageId = storage.getManid();
		serviceYuChongItemList(yuchongParam.value).then((res: any) => {
			console.log(res);
			yushouListArr.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const yuchongClick = () => {
	uni.navigateTo({
		url: '/pages/service/jiaofei/yuchong'
	});
};

const mingxiClick = () => {
	uni.navigateTo({
		url: '/pages/service/jiaofei/feeDetails'
	});
};

const kind1Click = () => {
	kind.value = "1";
	initQianFeiData();
};

const kind2Click = () => {
	kind.value = "2";
	getRentMoneyData();
};

const kind3Click = () => {
	kind.value = "3";
	getYuChongItemList();
};

const kind4Click = () => {
	kind.value = "4";
};

const kind5Click = () => {
	kind.value = "5";
};

const houseDetailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/jiaofei/houseMoneyDetail?id=' + item.id
	});
};

const rentJiaoNa = () => {};

const onlineJiaoNa = () => {
	const selectedItems = owemoneyList.value.filter((i: any) => i.checked);
	if (selectedItems.length === 0) {
		uni.showToast({ title: '请选择缴费模块', icon: 'none' });
		return;
	}
	const ids = selectedItems.map((i: any) => i.id).join(',');
	const chargeCodes = selectedItems.map((i: any) => i.charge_code).join(',');
	try {
		let param = {
			house_id: storage.getHseid(),
			id: ids,
			chargeCode: chargeCodes
		};
		serviceQianFeiJiaoNa(param).then((res: any) => {
			console.log(res);
			uni.navigateTo({
				url: '/pages/service/jiaofei/confirmQianFei?id=' + ids + '&chargeCode=' + chargeCodes
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const changeBox = (item: any) => {
	item.checked = !item.checked;
};

const chooseItemClick = () => {
	
	if(yushouListArr.value.length == 0){
		
		uni.showToast({ title: '预充项目返回为空', icon: 'none' });
		
	}else{
		
		discountShow.value = true;
	}
	
};

const chooseDisccount = (item: any) => {
	titleChoose.value = item.charge_code;
	chooseItem.value = item.charge_name;
	// yjye.value = item.amount;
	charge_code.value = item.charge_code;
};

const confirmdiscount = () => {
	discountShow.value = false;
};

const cancelDiscount = () => {
	discountShow.value = false;
};

const jiaofeiYuChong = () => {
	if (chooseItem.value === '选择') {
		uni.showToast({ title: '请选择预充项目', icon: 'none' });
		return;
	}
	if (minimum_amount.value.length === 0) {
		uni.showToast({ title: '请填写预缴金额', icon: 'none' });
		return;
	}
	try {
		let param = {
			payAccName: storage.getRealName(),
			use_id: storage.getUserId(),
			receive:minimum_amount.value,
			hostNo: storage.getHostNo(),
			cstType: "P",
			mobile: storage.getPhone(),
			flag: "1",
			house_id:storage.getHseid(),
			charge_code:charge_code.value,
			remark:remark.value
		};
		serviceInnnerPay(param).then((res: any) => {
			console.log(res);
			if (res.result.payUrl) {
				uni.navigateTo({
					url: '/pages/Integral/orderPayHtml?url=' + encodeURIComponent(res.result.payUrl)
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const getRemainElectAndWater = (type: number) => {
	try {
		let param = {
			house_id:storage.getHseid(),
			eqpType:type,
			mobile:storage.getPhone()
		};
		serviceRemainElectWater(param).then((res: any) => {
			console.log(res);
			if(res.success == true){
				
				uni.showModal({
					title: '查询结果',
					content: '剩余用量：' + res.result,
					showCancel: false
				});
			}else
			{
				uni.showToast({ title: res.message, icon: 'none' });
			}
			
		});
	} catch (error) {
		console.log(error);
	}
};

const appendToImgValue = (imageUrl: string, currentIndex: number) => {
	if (finalImgValue.value === '') {
		finalImgValue.value = imageUrl;
	} else {
		finalImgValue.value += ',' + imageUrl;
	}
};

const pushCancelData = () => {
	try {
		cancelParam.value.userId = storage.getUserId();
		cancelParam.value.house_id = storage.getHseid();
		cancelParam.value.picture = finalImgValue.value;
		cancelParam.value.remarks = cancelReason.value;
		serviceCancelMoneyMain(cancelParam.value).then((res: any) => {
			console.log(res);
			if(res.success == true){
				
				uni.showToast({ title: '提交成功', icon: 'none' });
				uni.navigateTo({
					url: '/pages/service/jiaofei/feeDetails'
				});
				
			}else{
				uni.showToast({ title: res.message, icon: 'none' });
			}
			
			// uni.navigateBack();
		});
	} catch (error) {
		console.log(error);
	}
};

const cancelMainMoney = () => {
	
	
	if (houseName.value.length === 0) {
		uni.showToast({ title: '请请选择房产', icon: 'none' });
		return;
	}
	if (cancelReason.value.length === 0) {
		uni.showToast({ title: '请填写退款事由', icon: 'none' });
		return;
	}
	if (tempFilePaths.value.length === 0) {
		uni.showToast({ title: '请上传图片', icon: 'none' });
		return;
	}
	tempFilePaths.value.forEach((filePath, index) => {
		uni.uploadFile({
			url: BaseURL + 'AppWorkOrder/addUploadIms',
			filePath: filePath,
			name: 'multipartFile',
			formData: { type: "jpg" },
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				uploadedCount.value++;
				const responseData = JSON.parse(uploadFileRes.data);
				appendToImgValue(responseData.data, index);
				if (uploadedCount.value === tempFilePaths.value.length) {
					pushCancelData();
				}
			}
		});
	});
};

const select = (e: any) => {
	tempFilePaths.value = e.tempFilePaths;
};

const progress = (e: any) => {};
const success = (e: any) => {};
const fail = (e: any) => {};
</script>

<style lang="scss" scoped>
	.container {
		background-color: aliceblue;
		min-height: 100vh;
		width: 100%;
		.flex{
			display: flex;
		}
		.custom-navbar {
		  height: calc(var(--status-bar-height) + 44px);
		  position: relative;
		  width: 100%;
		  background-color: #2A9595;
		}
		
		.navbar-content {
		  display: flex;
		  align-items: center;
		  height: 100%;
		  padding: 0 15px;
		}
		
		.segment-container{
			display: flex;
			flex-direction: row;
			background-color: #2A9595;
			margin-left: 4%;
			width: 92%;
			height: 40px;
			margin-top: calc(var(--status-bar-height));
		}
		.specsView{
			display: flex;
			flex-direction: row;
			background-color: white;
			width: 100%;
			height: 40px;
		}
		.whiteLine1{
			 margin-left: 20%;
			 margin-top: 5px;
			 width: 60%;
			 height: 2px;
			 background-color: #2A9595;
		}
		.renthouseView{
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-bottom: 60px;
		}
		.house_item{
			display: flex;
			flex-direction: column;
			width: 100%;
			background-color: white;
			margin-top: 10px;
		}
		.bottomView{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 60px;
			background-color: #fff;
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
			z-index: 100;
		}
		.jiaofeiButtonView{
			margin-top: 10px;
			margin-left: 5%;
			width: 90%;
			height: 40px;
			background-color: #2A9595;
			border-radius: 4px;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
		}
		.formView{
			display: flex;
			flex-direction: row;
			background-color: white;
			width: 100%;
			height: 50px;
		}
		.searchlocation{
			margin-top: 15px;
			margin-left: 20px;
			font-size: 14px;
			width: 60%;
		}
		.buttonView{
			margin-top: 50px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 14px;
			margin-left: 5%; 
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			width: 90%;
			margin-bottom: 20px;
		}
		.buttonsV{
			display: flex;
			flex-direction: column;
			width: 100%;
		}
		.buttonView1{
			margin-top: 50px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 14px;
			margin-left: 5%; 
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			width: 90%;
		}
		.buttonView2{
			margin-top: 20px;
			background-color: #2A9595;
			border-radius: 5px;
			color: white;
			font-size: 14px;
			margin-left: 5%; 
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			width: 90%;
		}
		.imagechooseView{
			margin-left: 15px;
			margin-top: 10px;
		}
		.owemoneyView{
			display: flex;
			flex-direction: row;
		}
		.custom-upload-btn {
			 width: 64px;
			 height: 64px;
			 display: flex;
			 align-items: center;
			 justify-content: center;
		}
		.custom-upload-btn image {
			 width: 100%;
			 height: 100%;
		}
	}
</style>