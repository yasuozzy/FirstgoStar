<template>
    <view class="main">
        <u-navbar
          title="用工登记"
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
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位</view>
			<input class="searchlocation" v-model="company" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工地点</view>
			<input class="searchlocation" v-model="work_location" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="chooseOrderType">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工工种</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 250px;">{{gongzhong}}</view>
			<u-image style="margin-top: 13px;"
			  :src="downImage"
			  width="15px"
			  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">所需人数</view>
			<input class="searchlocation" v-model="work_num" placeholder="请填写" type="text" />
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">人</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">所需时间</view>
			<input class="typelocation" v-model="work_time" placeholder="请填写" type="text" />
			<view class="typeView" @click="changeTYpe()">{{timetype}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">薪资情况</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 200px;" @click="choseSalary()">{{salary}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系人</view>
			<input class="searchlocation" v-model="name" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<input class="searchlocation" v-model="mobile" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;width: 6px;height: 20px;background-color: #2A9595;"></view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">岗位要求</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<textarea v-model="work_request" class="textAreaView" ></textarea>
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
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineJiuYeQunShareUseWorkCompanygetWorkKind,
	MineJiuYeQunShareUseWorkCompanySubmitInfo,
	MineJiuYeQunShareUseWorkCompanyUseWorkMessageDetail} from '@/api/mine';
	
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
	const work_type = ref('');
	const work_num = ref();
	const work_time = ref();
	const salarytypeList = ref(['薪金','区间','面议']);
	const name = ref('');
	const mobile = ref('');
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
	const popupRef = ref(null);
	const alertdialog = ref(null);
            
	onLoad((options:any) => {
		
		if (options.id) {
			
			loadDetail(options.id);
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
	//编辑功能请求详情
	const loadDetail = async(idsting:any) => {
		
		try {
			
			let param = {
				
				id:idsting
			};
			
			MineJiuYeQunShareUseWorkCompanyUseWorkMessageDetail(param).then((res) =>{
				
				console.log(res);
				const result = res.result;
				company.value = result.company;
				work_location.value = result.work_location;
				
				work_kind.value = result.work_kind;
				work_type.value = result.work_type;
				gongzhong.value = work_kind.value + work_type.value;
				const str = result.work_num;
				const number = str.replace('人', '');  // "34"
				const unit = "人";
				const numValue = parseInt(number);  // 34
				work_num.value = numValue;
				salary.value = result.salary;
				name.value = result.name;
				mobile.value = result.mobile;
				work_request.value = result.work_request;
				const worktime  = result.work_time;
				if (worktime === '面议' || worktime === '长期') {
					
					work_time.value = worktime;
					timetype.value = worktime;
				}else
				{
					const timestr = worktime;
					const match = timestr.match(/(\d+)([一-龟]+)/);  // 匹配数字和汉字
					if (match) {
					  const worknumber = match[1];  // "3"
					  const workunit = match[2];    // "月"
					  console.log(worknumber, workunit);
					  work_time.value = worknumber;
					  timetype.value = workunit;
					}
				}
				
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
					
					work_time.value = timetype;
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
	const tijiaoClick = () => {
		
		if (company.value.length == 0) {
			
			uni.showToast({
				title:'请填写用工单位',
				icon:'none'
			})
			return;
		}
		if (work_location.value.length == 0) {
			
			uni.showToast({
				title:'请输入用工地点',
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
		if (work_type.value.length == 0) {
			
			uni.showToast({
				title:'请选择用工工种',
				icon:'none'
			})
			return;
		}
		if (work_num.value.length == 0) {
			
			uni.showToast({
				title:'请填写所需人数',
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
		if (salary.value.length == 0) {
			
			uni.showToast({
				title:'请填写薪资',
				icon:'none'
			})
			return;
		}
		if (name.value.length == 0) {
			
			uni.showToast({
				title:'请填写联系人姓名',
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
		if (work_request.value.length == 0) {
			
			uni.showToast({
				title:'请填写岗位要求',
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
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				company:company.value,
				work_location:work_location.value,
				work_kind:work_kind.value,
				work_type:work_type.value,
				work_num:work_num.value + '人',
				work_time:work_time.value,
				salary:salary.value,
				name:name.value,
				mobile:mobile.value,
				work_request:work_request.value,
				
			};
			
			MineJiuYeQunShareUseWorkCompanySubmitInfo(param).then((res) =>{
				
				console.log(res);
				uni.navigateBack();
				
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
		work_type.value = item.name;
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