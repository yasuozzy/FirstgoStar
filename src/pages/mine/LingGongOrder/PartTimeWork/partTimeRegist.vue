<template>
    <view class="main">
        <u-navbar
          title="兼职登记"
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
		  <template v-if="!idstring" #right>
			  <view  slot="right" @click="messageClick()">
				  <u-image
					:src="myImage"
					width="20px"
					height="20px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">姓名</view>
			<input class="searchlocation" v-model="name" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">性别</view>
			<input class="searchlocation" v-model="sex" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<input class="searchlocation" v-model="mobile" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">家庭住址</view>
			<input class="searchlocation" v-model="address" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">详细地址</view>
			<input class="searchlocation" v-model="region_address" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="chooseOrderType">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">选择工种</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 250px;">{{gongzhong}}</view>
			<u-image style="margin-top: 13px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">期待薪资</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 200px;" @click="choseSalary()">{{salary}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">期待工作地</view>
			<input class="searchlocation" v-model="place" placeholder="请填写" type="text" />
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
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
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
		<uni-popup ref="alertDialog" type="center">
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
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineJiuYeQunShareUseWorkCompanygetWorkKind,
	MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiRegist,
	MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiDetailInfo,
	MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiUpdateData} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const myImage = ref('/static/service/myIconImage.png');
	const gongzhong = ref('请选择');
	const downImage = ref('/static/home/downImage.png');
	const timetype = ref('天');
	const salary = ref('请选择');
	const agreement_name = ref('');
	const selected = ref(false);
	const company = ref('');
	const work_location = ref('');
	const typeList = ref(['年', '月', '天', '小时', '长期', '面议']);
	const dataList = ref([]);
	const childList = ref([]);
	const firstyType = ref('');
	const secondType = ref('');
	const type_id = ref('');
	const work_kind = ref('');
	const work = ref('');
	const work_num = ref('');
	// const work_time = ref('',
	const salarytypeList = ref(['薪金','区间','面议']);
	const name = ref('');
	const sex = ref('');
	const mobile = ref('');
	const address = ref('');
	const region_address = ref('');
	const place = ref('');
	const work_request = ref('');
	const msgType = ref('success');
	const salaryTitle = ref('');
	const startMoney = ref('');
	const array = ref(['元/天', '元/月', '元/小时']);
	const visible = ref(true);
	const xinjin = ref('');
	const startxinjin = ref('');
	const endxinjin = ref('');
	const xinjinType = ref('');
	const work_time = ref('请选择');//工作时段
	const multiArray = ref([
		["00:00", "01:00", "02:00", "03:00","04:00", "05:00","06:00", "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"],
		["00:00", "01:00", "02:00", "03:00","04:00", "05:00","06:00", "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"]
	]);
	const multiIndex = ref([0, 0]);
	const idstring = ref('');
	const popupRef = ref(null);
	const alertDialog = ref(null);
            
	onLoad((options:any) => {
		
		if (options.id) {
			
			idstring.value = options.id;
			loadDetail();
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
				firstyType.value = dataList.value[0].name;
			});
		} catch (error) {
			console.log(error)
		}
	};
	//编辑功能请求详情
	const loadDetail = async() => {
		
		try {
			
			let param = {
				
				id:idstring.value
			};
			
			MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiDetailInfo(param).then((res) =>{
				
				console.log(res);
				const result = res.result;
				name.value = result.name;
				sex.value = result.sex;
				mobile.value = result.mobile;
				address.value = result.address;
				region_address.value = result.region_address;
				work_kind.value = result.work_kind;
				work.value = result.work;
				gongzhong.value = work_kind.value+ work.value;
				salary.value = result.salary;
				place.value = result.place;
				work_time.value  = result.work_time;
				
				
			});
		} catch (error) {
			console.log(error)
		}
	};
	//获取协议
	const getAgreement = async() => {
						  
					
		try {
			let param = {
				type:'17',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;

			});
		} catch (error) {
			console.log(error)
		} 
			  
	};

	const changeTYpe = () => {
		
		uni.showActionSheet({
			itemList: typeList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(itemList[res.tapIndex])
				timetype.value = typeList.value[res.tapIndex]
				if (timetype.value === '长期' || timetype.value === '面议') {
					
					work_time.value = timetype.value;
				}
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
		 
	};
	const agreementClick = () => {
					
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${17}`
		})
		
	};
	const tijiaoClick = async() => {
		
		if (name.value.length == 0) {
			
			uni.showToast({
				title:'请填写姓名',
				icon:'none'
			})
			return;
		}
		if (sex.value.length == 0) {
			
			uni.showToast({
				title:'请填写性别',
				icon:'none'
			})
			return;
		}
		if (mobile.value.length == 0) {
			
			uni.showToast({
				title:'请填写联系电话',
				icon:'none'
			})
			return;
		}
		if (address.value.length == 0) {
			
			uni.showToast({
				title:'请填写家庭住址',
				icon:'none'
			})
			return;
		}
		if (region_address.value.length == 0) {
			
			uni.showToast({
				title:'请填写详细地址',
				icon:'none'
			})
			return;
		}
		if (work_kind.value.length == 0) {
			
			uni.showToast({
				title:'请选择用工类别',
				icon:'none'
			})
			return;
		}
		if (work.value.length == 0) {
			
			uni.showToast({
				title:'请选择用工工种',
				icon:'none'
			})
			return;
		}
		if (salary.value.length == 0) {
			
			uni.showToast({
				title:'请填写薪资',
				icon:'none'
			})
			return;
		}
		if (place.value.length == 0) {
			
			uni.showToast({
				title:'请填写期待工作地',
				icon:'none'
			})
			return;
		}
		if (work_time.value.length == 0) {
			
			uni.showToast({
				title:'请填写所需时间',
				icon:'none'
			})
			return;
		}
		
		if (selected.value = false) {
			
			uni.showToast({
				title:'请同意平台委托发布签订协议',
				icon:'none'
			})
			return;
		}
		
		if (idstring.value) {
			
			editData();
		}else
		{
			setUpData();
		}
	};
	const setUpData = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				name:name.value,
				sex:sex.value,
				mobile:mobile.value,
				address:address.value,
				region_address:region_address.value,
				work_kind:work_kind.value,
				work:work.value,
				place:place.value,
				work_time:work_time.value,
				salary:salary.value,
				
			};
			
			MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiRegist(param).then((res) =>{
				
				console.log(res);
				uni.navigateTo({
					url:'/pages/mine/LingGongOrder/PartTimeWork/partTimeLaoWuList'
				})
			});
		} catch (error) {
			console.log(error)
		}
	};
	const editData = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				id:idstring.value,
				name:name.value,
				sex:sex.value,
				mobile:mobile.value,
				address:address.value,
				region_address:region_address.value,
				work_kind:work_kind.value,
				work:work.value,
				place:place.value,
				work_time:work_time.value,
				salary:salary.value,
				
			};
			
			MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiUpdateData(param).then((res) =>{
				
				console.log(res);
				uni.navigateTo({
					url:'/pages/mine/LingGongOrder/PartTimeWork/partTimeLaoWuList'
				})
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
		 popupRef.value?.open();
	};
	const normalClick = (item:any) => {
		
		console.log(item.name);
		secondType.value = item.name;
		// work_type.value = item.name;
		type_id.value = item.id;
		gongzhong.value = firstyType.value + secondType.value;
		// $refs.popup.close();
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
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(itemList[res.tapIndex])
				const titles = salarytypeList.value[res.tapIndex]
				//需要根据选择，弹出不同输入框以及确定按键
				if (titles === '薪金') {
					
					salaryTitle.value = titles;
					xinjinType.value = array[0];
					// $refs.alertDialog.open();
					alertDialog.value?.open();
					
				}else if (titles === '区间') {
					
					salaryTitle.value = titles;
					xinjinType.value = array[0];
					// $refs.alertDialog.open();
					alertDialog.value?.open();
					
				}else if (titles === '面议') {
					
					salary.value = '面议';
				}
				
			},
			fail: (res) => {
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
			// $refs.alertDialog.close();
			alertDialog.value?.close();
			
		}else if (salaryTitle.value === '区间') {
				
			if (startxinjin.value.length == 0 || endxinjin.value.length == 0) {
				uni.showToast({
					title:'请填写薪金完整区间',
					icon:'none'
				})
				return;
			}
			salary.value = startxinjin.value + '-' + endxinjin.value + xinjinType.value;
			// $refs.alertDialog.close();	
			alertDialog.value?.close();
		}
		
		
	};

	//选择工作时段
	const bindMultiPickerColumnChange = (e:any) => {
		
		const { column, value } = e.detail
		multiIndex.value[column] = value
		// 根据当前选中的索引拼接时间段
		work_time.value = multiArray.value[0][multiIndex.value[0]] + '-' + multiArray.value[1][multiIndex.value[1]]
	};
	const messageClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/LingGongOrder/PartTimeWork/partTimeLaoWuList'
		})
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
	         width: 230px;
	         height: 25px;
	         margin-top: 7px;
	         
	         border-radius: 5px;
	         font-size: 13px;
	}
	.typelocation{
		margin-left: 15px;
		width: 230px;
		height: 25px;
		margin-top: 7px;
		
		border-radius: 5px;
		font-size: 13px;
	}
	.textAreaView{
		margin-top: 10px;
		margin-left: 4%;
		width: 92%;
		height: 150px;
		border: lightgray 1px solid;
		font-size: 13px;
		border-radius: 4px;
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
    }
</style>