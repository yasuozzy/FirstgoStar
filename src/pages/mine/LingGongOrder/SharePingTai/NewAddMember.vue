<template>
    <view class="main">
        <u-navbar
          title="新增员工信息"
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 12px;margin-left: 15px;font-size: 13px;">单位名称</view>
			<input class="searchlocation" v-model="com_name" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">人员姓名</view>
			<input class="searchlocation" v-model="name" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">性别</view>
			<input class="searchlocation" v-model="sex" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">年龄</view>
			<input class="searchlocation" v-model="age" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<input class="searchlocation" v-model="mobile" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="chooseOrderType()">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">工种</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 250px;">{{gongzhong}}</view>
			<u-image style="margin-top: 13px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" >
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">工作时段</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 250px;">
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="uni-input">{{work_time}}</view>
				</picker>
			</view>
			<u-image style="margin-top: 13px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传企业营业执照</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 12px;margin-left: 5px;font-size: 13px;">营业执照编号</view>
			<input class="searchlocation" v-model="business_no" placeholder="请填写营业执照编号" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">截止日期</view>
			<view @click="show = true" style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 150px;background-color: aliceblue;align-items: center;text-align: center;">
				{{business_time}}
				<u-datetime-picker v-if="longselected == false"
				title="请选择截止日期"
				
							:show="show"
							v-model="value1"
							mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
					></u-datetime-picker>
					
			</view>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="longselected===false" src="/static/login/choose_unselect.png" @click="longtime()"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="longtime()"></image>
			<view style="font-size: 13px;color: dimgray;margin-top: 13px;margin-left: 10px;">长期有效</view>
		</view>
		<view style="width: 100%;height: 200px;margin-top: 20px;">
			<view class="imagechooseView" @click="selectFile">
				<view v-if="yingyetempFilePaths.length == 0" class="yingye-upload-btn">
				  <image :src="yingyelicense" ></image>
				</view>
				<view v-if="yingyetempFilePaths.length > 0" class="ChoseenView">
					<view class="imageItemV" v-for="(item,index) in yingyetempFilePaths" :key="index">
						<image style="width: 150px;height: 180px;" :src="item" ></image>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传在职人员证书</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView">
			<uni-file-picker 
			:value="personimageValue"  
			file-mediatype="image"
			mode="grid"
			file-extname="png,jpg"
			:image-styles="personImageStyles"
			
			@select="personselect" 
			limit="9" >
				<view class="custom-upload-btn">
				  <image :src="selectphoto" ></image>
				</view>
			</uni-file-picker>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传职业技能证书</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView">
			<uni-file-picker 
			:value="skillimageValue"  
			file-mediatype="image"
			mode="grid"
			file-extname="png,jpg"
			:image-styles="personImageStyles"
			@select="skillselect" 
			limit="9" >
				<view class="custom-upload-btn">
				  <image :src="selectphoto" ></image>
				</view>
			</uni-file-picker>
		</view>
		<view class="protocalView">
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
		    <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view class="buttonView" @click="tijiaoClick()">提     交</view>
		<uni-popup ref="popupRef" type="center">
			<view  class="WhiteView">
				<view style="display: flex;flex-direction: column;width: 115px;height: 230px;background-color: aliceblue;overflow-y: auto;">
					<view style="display: flex;flex-direction: column;" v-for="(item,index) in dataList" :key="index">
						<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;height: 30px;" @click="choseChildrenClick(item)">{{item.name}} ></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;width: 115px;height: 230px;overflow-y: auto;">
					<view style="display: flex;flex-direction: column;" v-for="(item,index) in childList" :key="index">
						<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;height: 30px;" @click="normalClick(item)">{{item.name}}</view>
					</view>	
				</view>		
			</view>
		</uni-popup>
		<uni-popup ref="alertdialog" type="center">
			<view v-if="salaryTitle === '薪金'" class="salaryView">
				<view style="display: flex;flex-direction: column;width: 200px;">
					<view style="margin-top: 10px;margin-left: 70px;font-size: 14px;text-align: center;">{{salaryTitle}}</view>
					<input class="searchsalary" v-model="xinjin" placeholder="请输入" type="text" />
					<view style="margin-left: 100px;margin-top: 10px;height: 1px;width: 80px;background-color: black;"></view>
					<view class="sureBtn" @click="sureClick()">确定</view>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in array" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view v-if="salaryTitle === '区间'" class="salaryView">
				<view style="display: flex;flex-direction: column;width: 200px;">
					<view style="margin-top: 10px;margin-left: 70px;font-size: 14px;text-align: center;">{{salaryTitle}}</view>
					<view style="display: flex;flex-direction: row;">
						<input class="startsalary" v-model="startxinjin" placeholder="请输入" type="text" />
						<view style="margin-left: 10px;margin-top: 20px;height: 1px;width: 20px;background-color: black;"></view>
						<input class="endsalary" v-model="endxinjin" placeholder="请输入" type="text" />
					</view>
					<view style="display: flex;flex-direction: row;">
						<view style="margin-left: 30px;margin-top: 10px;height: 1px;width: 60px;background-color: black;"></view>
						<view style="margin-left: 30px;margin-top: 10px;height: 1px;width: 60px;background-color: black;"></view>
					</view>
					<view class="sureBtn" @click="sureClick()">确定</view>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in array" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineJiuYeQunShareUseWorkCompanygetWorkKind,
	MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderAddNewMember,
	MineJiuYeQunShareUseWorkCompanySendWorkDetailInfo} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const myImage = ref('/static/service/myIconImage.png');
	const com_name = ref('');
	const send_num = ref();
	const name = ref('');
	const sex = ref('');
	const age = ref('');
	const mobile = ref('');
	const gongzhong = ref('请选择');
	const downImage = ref('/static/home/downImage.png');
	const salarytypeList = ref( ['薪金','区间','面议']);
	const salaryTitle = ref('');
	const startMoney = ref('');
	const array = ref( ['元/天', '元/月', '元/小时']);
	const visible = ref( true);
	const xinjin = ref('');
	const startxinjin = ref('');
	const endxinjin = ref('');
	const xinjinType = ref('');
	const salary = ref('请选择');
	const selected = ref(false);//协议是否同意
	const agreement_name = ref('');
	const dataList = ref([]);
	const childList = ref([]);
	const firstyType = ref('');
	const secondType = ref('');
	const type_id = ref('');
	const work_kind = ref('');
	const work = ref('');
	const work_time = ref('请选择');//工作时段
	const multiArray = ref( [
		["00:00", "01:00", "02:00", "03:00","04:00", "05:00","06:00", "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"],
		["00:00", "01:00", "02:00", "03:00","04:00", "05:00","06:00", "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"]
	]);
	const multiIndex = ref([0, 0]);
	const business_no = ref('');
	const business_time = ref('请选择截止日期');
	const show = ref( false);
	const value1 = ref( Number(new Date()));
	const longselected = ref(false);
	const yingyelicense = ref('/static/mine/yingyelicense.png');
	const yingyeImageStyles = ref({
		width:150,
		height:180,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const yingyetempFilePaths = ref([]);//营业执照
	const yingyePicUrl = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const personImageStyles = ref({
		width:80,
		height:80,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const persontempFilePaths = ref([]);
	const personPicUrl = ref('');
	const skillimagePaths = ref([]);
	const skillPicUrl = ref('');
	const idstring = ref('');
	const imageValue = ref([]);
	const personimageValue = ref([]);
	const skillimageValue = ref([]);
	const popupRef = ref(null);
	const alertdialog = ref(null);
            
	onLoad((options:any) => {
		
		if (options.id) {
			
			idstring.value = options.id;
			getDetail();
		}
	});
	onMounted(() => {
	   init();
	   getAgreement();
	});
        
	const init = async() => {
		try {
			
			let param = {
				
				type:1
			};
			
			MineJiuYeQunShareUseWorkCompanygetWorkKind(param).then((res) =>{
				
				console.log(res);
				dataList.value = res.result;
				childList.value = res.result[0].childList;
				firstyType.value = dataList[0].name;
			});
		} catch (error) {
			console.log(error)
		}
	};
	//获取协议
	const getAgreement = async() => {
						  
					
		try {
			let param = {
				type:'18',
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
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${18}`
		})
		
	};
			//编辑获取详情
			const getDetail = async() => {
				
				
				try {
					let param = {
						id:idstring.value,
					};
					MineJiuYeQunShareUseWorkCompanySendWorkDetailInfo(param).then((res) =>{
						
						console.log(res);
						// company.value = res.result.company;						
						const str = res.result.send_num;
						const number = str.replace('人', '');  // "34"
						const unit = "人";
						const numValue = parseInt(number);  // 34
						send_num.value = numValue;
						// send_names.value = res.result.send_names;
						mobile.value = res.result.mobile;
						work_kind.value = res.result.work_kind;
						work.value = res.result.work;
						gongzhong.value = work_kind.value + work.value;
						work_time.value = res.result.work_time;
						salary.value = res.result.salary;
						business_no.value = res.result.business_no;
						business_time.value = res.result.business_time;
						
						if (business_time.value === '长期有效') {
							
							longselected.value = true;
						}else
						{
							longselected.value = false;
						}
						yingyePicUrl.value = res.result.business_path;
						yingyelicense.value = res.result.business_path;
						personPicUrl.value = res.result.onjob_paper;
						const onjob_paper = res.result.onjob_paper;
						personimageValue.value = onjob_paper.split(',');
						console.log(personimageValue);
						skillPicUrl.value = res.result.paperwork_path;
						const paper = res.result.paperwork_path;
						skillimageValue.value = paper.split(',');
					});
				} catch (error) {
					console.log(error)
				} 
			};
			const chooseselect = () => {
				selected.value = !selected.value
			};
			const choseChildrenClick = (item:any) => {
				
				console.log(item.name);
				firstyType.value = item.name;
				work_kind.value = item.name;
				childList.value = item.childList;
				
			};
			const chooseOrderType = () => {
				// $refs.popup.open('top');
				console.log('popupRef ref 对象:', popupRef.value);
				popupRef.value?.open();
			};
			const normalClick = (item:any) => {
				
				console.log(item.name);
				secondType.value = item.name;
				// work_type.value = item.name;
				type_id.value = item.id;
				gongzhong.value = firstyType.value + secondType.value;
				popupRef.value?.close();
			};
			const bindChange = (e:any) => {
							
				const val = e.detail.value;
				console.log(val);
				xinjinType.value = array.value[val];
				console.log(xinjinType.value);
			};
			const choseSalary = () => {
				
			
				uni.showActionSheet({
					itemList: salarytypeList.value,
					success: (res:any) => {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
						// console.log(itemList[res.tapIndex])
						const titles = salarytypeList.value[res.tapIndex]
						//需要根据选择，弹出不同输入框以及确定按键
						if (titles === '薪金') {
							
							salaryTitle.value = titles;
							xinjinType.value = array.value[0];
							
							alertdialog.value?.open();
							
							
						}else if (titles === '区间') {
							
							salaryTitle.value = titles;
							xinjinType.value = array.value[0];
							alertdialog.value?.open();
							
						}else if (titles === '面议') {
							
							salary.value = '面议';
						}
						
					},
					fail: (res:any) => {
						console.log(res.errMsg);
					}
				});
			};
			const sureClick = () => {
				
				if (salaryTitle.value === '薪金') {
					
					if (xinjin.value.length == 0) {
						uni.showToast({
							title:'请输入薪金金额',
							icon:'none'
						})
						return;
					}
					salary.value = xinjin.value + xinjinType.value;
					alertdialog.value?.close();
					
				}else if (salaryTitle.value === '区间') {
						
					if (startxinjin.value.length == 0 || endxinjin.value.length == 0) {
						uni.showToast({
							title:'请填写薪金完整区间',
							icon:'none'
						})
						return;
					}
					salary.value = startxinjin.value + '-' + endxinjin.value + xinjinType.value;
					alertdialog.value?.close();
				}
				
				
			};
			
			const goBack= () => {
					
				uni.navigateBack()
			};
			//选择工作时段
			const bindMultiPickerColumnChange = (e:any) => {
				
				const { column, value } = e.detail
				multiIndex.value[column] = value
				// 根据当前选中的索引拼接时间段
				work_time.value = multiArray.value[0][multiIndex.value[0]] + '-' + multiArray.value[1][multiIndex.value[1]]
			};
			//截止时间获取
			const handleConfirm = (e:any) => {
				const date = new Date(e.value);
				business_time.value = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
				show.value = false;
			};
			const longtime = () =>{
				
				longselected.value = !longselected.value
				if (longselected.value == true) {
					
					business_time.value = '长期有效';
					
				}else
				{
					business_time.value = '请选择截止日期';
				}
			};
			
			//选择营业执照
			const selectFile = () => {
					
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						yingyetempFilePaths.value = res.tempFilePaths;
						uploadFileImage();
					}
				});
			};
			
			const uploadFileImage = async() => {
				const result = await uploadMultipleFiles([],yingyetempFilePaths.value,getStorage(storageKeys.token,''));
				console.log(result);
				yingyePicUrl.value = result.map(item => item.data).join(',');
					
			};
			const personselect = (e:any) => {
				console.log('选择文件：',e);
				persontempFilePaths.value = e.tempFilePaths;
				// let tempFilePaths = e.tempFilePaths;
				uploadMultipleFiles([], persontempFilePaths.value, storage.getToken())
				  .then((results) => {
					console.log("所有文件上传成功:", results);
					let netimgs = [];
					results.forEach((item) => {
					  netimgs.push(item.data);
					});
					personPicUrl.value = netimgs.join(',');
				  })
				  .catch((error) => {
					console.error("文件上传失败:", error);
				  });
			};
			const skillselect = (e:any) => {
				
				console.log('选择文件：',e);
				skillimagePaths.value = e.tempFilePaths;
				uploadMultipleFiles([], skillimagePaths.value, storage.getToken())
				  .then((results) => {
					console.log("所有文件上传成功:", results);
					let netimgs = [];
					results.forEach((item) => {
					  netimgs.push(item.data);
					});
					skillPicUrl.value = netimgs.join(',');
				  })
				  .catch((error) => {
					console.error("文件上传失败:", error);
				  });
			};
			//提交
			const tijiaoClick = async() => {
				
				if (com_name.value.length == 0) {
					
					uni.showToast({
						title:'请填写单位名称',
						icon:'none',
					})
					return;
				}
				
				if (name.value.length == 0) {
					
					uni.showToast({
						title:'请填写人员姓名',
						icon:'none',
					})
					return;
				}
				if (sex.value.length == 0) {
					
					uni.showToast({
						title:'请填写性别',
						icon:'none',
					})
					return;
				}
				if (age.value.length == 0) {
					
					uni.showToast({
						title:'请填写年龄',
						icon:'none',
					})
					return;
				}
				if (mobile.value.length == 0) {
					
					uni.showToast({
						title:'请填写联系电话',
						icon:'none',
					})
					return;
				}
				if (work_kind.value.length == 0) {
					
					uni.showToast({
						title:'请选择用工类别',
						icon:'none',
					})
					return;
				}
				if (work.value.length == 0) {
					
					uni.showToast({
						title:'请选择用工工种',
						icon:'none',
					})
					return;
				}
				if (work_time.value.length == 0) {
					
					uni.showToast({
						title:'请填写派工时段',
						icon:'none',
					})
					return;
				}
				
				if (business_no.value.length == 0) {
					
					uni.showToast({
						title:'请填写营业执照编号',
						icon:'none',
					})
					return;
				}
				if (business_time.value === '请选择截止日期') {
					
					uni.showToast({
						title:'请选择截止日期',
						icon:'none',
					})
					return;
				}
				if (yingyetempFilePaths.value.length == 0) {
					
					uni.showToast({
						title:'请选择营业执照',
						icon:'none',
					})
					return;
				}
				if (persontempFilePaths.value.length == 0) {
					
					uni.showToast({
						title:'请选择在职人员证书',
						icon:'none',
					})
					return;
				}
				if (skillimagePaths.value.length == 0) {
					
					uni.showToast({
						title:'请选择职业技能证书',
						icon:'none',
					})
					return;
				}
				if (selected.value == false) {
					
					uni.showToast({
						title:'请同意劳务协议',
						icon:'none',
					})
					return;
				}
				
				try {
					let param = {
						userId:storage.getUserId(),
						com_name:com_name.value,
						names:name.value,
						sex:sex.value,
						age:age.value,
						mobile:mobile.value,
						work_kind:work_kind.value,
						work_type:work.value,
						work_time:work_time.value,
						salary:salary.value,
						business_no:business_no.value,
						business_time:business_time.value,
						business_path:yingyePicUrl.value,
						onjob_paper:personPicUrl.value,
						paperwork_path:skillPicUrl.value
					};
					MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderAddNewMember(param).then((res) =>{
						
						console.log(res);
						uni.navigateBack();
							
					});
				} catch (error) {
					console.log(error)
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
	 .searchlocation{
	          margin-left: 15px;
	          width: 200px;
	          height: 25px;
	          margin-top: 10px;
	          border-radius: 5px;
	          font-size: 13px;
	}
	.protocalView{
	         display: flex;
	         flex-direction: row;
	         width: 100%;
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
		.typeView{
			
			margin-top: 10px;
			margin-left: 15px;
			font-size: 13px;
			background-color: aliceblue;
			width: 40px;
			height: 25px;
			text-align: center;
		}
		.WhiteView{
			 background-color: white;
			 margin-top: calc(var(--status-bar-height) + 95px);
			 margin-left: 140px;
			 margin-right: 5px;
			 width: 230px;
			 height: 230px;
			 display: flex;
			 flex-direction: row;
			 border-radius: 4px;
		}
		.searchsalary{
		         margin-left: 100px;
		         width: 80px;
		         height: 25px;
		         margin-top: 10px;
		         // background-color: #2A9595;
		         border-radius: 5px;
		         font-size: 13px;
		}
		.salaryView{
			
			background-color: white;
			align-items: right;
			margin-left: 30px;
			width: 300px;
			height: 140px;
			display: flex;
			flex-direction: row;
			border-radius: 10px;
		}
		.picker-view {
			width: 120rpx;
			height: 150rpx;
			margin-top: 20rpx;
		}
		.item {
			line-height: 80rpx;
			text-align: center;
			font-size: 13px;
		}
		.sureBtn{
			margin-top: 15px;
			margin-left: 100px;
			width: 80px;
			text-align: center;
			background-color: aliceblue;
			color: black;
			border-radius: 5px;
			height: 30px;
			font-size: 14px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.startsalary{
			margin-left: 30px;
			width: 60px;
			height: 25px;
			margin-top: 10px;
			// background-color: #2A9595;
			border-radius: 5px;
			font-size: 13px;
		}
		.endsalary{
			margin-left: 10px;
			width: 60px;
			height: 25px;
			margin-top: 10px;
			// background-color: #2A9595;
			border-radius: 5px;
			font-size: 13px;
		}
		.imagechooseView{
		        margin-top: 10px;
		        margin-left: 120px;
		        width: 150;
		        height: 180px;
		}
		.yingye-upload-btn {
		             width: 150px;
		             height: 180px;
		             display: flex;
		             align-items: center;
		             justify-content: center;
		    }
		    .yingye-upload-btn image {
		             width: 100%;
		             height: 100%;
		    }
		    .ChoseenView{
		               
		                display: grid;
		                 grid-template-columns: repeat(3, 1fr);
		                 gap: 10px;
		                 max-width: 900px;
		                 margin: 0 auto;
		                 // padding: 20px;
		                 align-items: left;
		    }
		    .imageItemV{
		               
		               
		               width:150px;
		               height: 180px;
		               margin-top: 10px;
		               box-sizing: border-box;
		    }
		.personchooseView{
			margin-top: 10px;
			margin-left: 5%;
			width: 90%;
			height: 100px;
		}
		.custom-upload-btn {
		  width: 80px;
		  height: 80px;
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