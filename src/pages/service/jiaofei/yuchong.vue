<template>
    <view class="main">
        <u-navbar
          title="预缴"
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
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">余额充值</view>
				<view v-else style="color: black;font-size: 15px;">余额充值</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">用量查询</view>
				<view  v-else style="color: black;font-size: 15px;">用量查询</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			
		</view>
		<view v-if="type === '1'" class="chooseView">
			<view class="choosehouse">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">选择房屋</view>
				<view style="margin-top: 10px;margin-left: 100px;width: 190px;border: 1px gray solid;text-align: center;height: 30px;justify-content: center; align-items: center;display: flex;flex-direction: row;" @click="chooseHouseClick">
					<view style="width: 150px;font-size: 14px;text-align: center;justify-content: center; align-items: center;white-space: nowrap;overflow: hidden;">{{housename}}</view>
					<u-image style="margin-top: 4px;margin-left: 10px;" :src="downimage"
								  width="15px"
								  height="8px"></u-image>
				</view>
				
			</view>
			<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
			<view class="allbuttonView" @click="checkYueClick">查询余额</view>
		</view>
		<view v-if="type === '2'" class="chooseView">
			<view class="choosehouse">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">选择房屋</view>
				<view style="margin-top: 10px;margin-left: 50px;width: 230px;border: 1px gray solid;text-align: center;height: 25px;justify-content: center; align-items: center;display: flex;flex-direction: row;" @click="secondchooseHouseClick">
					<view style="width: 200px;font-size: 14px;text-align: center;justify-content: center; align-items: center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{secondhousename}}</view>
					<u-image style="margin-top: 4px;" :src="downimage"
								  width="15px"
								  height="8px"></u-image>
				</view>
				
			</view>
			<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
			
			<view  style="display: flex;flex-direction: row;width: 100%;flex-wrap: wrap;margin-top: 20px">
				<view class="buttonView" v-for="(item,index) in buttonArr" @click="checkYuliang(item)">
					<view style="font-size: 13px;color: white;" v-if="item.type == '01'">电量查询</view>
					<view style="font-size: 13px;color: white;" v-if="item.type == '02'">水量查询</view>
					<view style="font-size: 13px;color: white;" v-if="item.type == '03'">燃气查询</view>
					<view style="font-size: 13px;color: white;" v-if="item.type == '04'">净水查询</view>
				</view>
			</view>
			<view v-if="dataArray.length > 0" style="display: flex;flex-direction: column;width: 100%;margin-top: 10px;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '01'">电表当前用量</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '02'">水表当前用量</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '03'">燃气当前用量</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '04'">净水当前用量</view>
				<view class="yongliangItem" v-for="(item,index) in dataArray">
					<view style="font-size: 15px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '01'">电表--00{{index+1}}</view>
					<view style="font-size: 15px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '02'">水表--00{{index+1}}</view>
					<view style="font-size: 15px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '03'">燃气表--00{{index+1}}</view>
					<view style="font-size: 15px;margin-top: 10px;margin-left: 15px;" v-if="selectType == '04'">净水表--00{{index+1}}</view>
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;" >房屋表号：{{item.meter_no}}</view>
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;" >起用量：{{item.start}}</view>
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;" >截止用量：{{item.end}}</view>
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;" >昨日用量：{{item.used}}</view>
					<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { storage } from '@/utils/storage';
	import { serviceChangeHouseType, serviceYuJiaoYueChongZhi,
	 YuJiaoCheckYongLiangGetHseMeterButtonType,YuJiaoCheckYongLiangGetHseMeterUsedByButton} from '@/api/service';

	const bgColor = ref("#2A9595");
	const type = ref('1');
	const housename = ref('请选择房屋');
	const secondhousename = ref('请选择房屋');
	const downimage = ref('/static/home/downImage.png');
	const clocknumber = ref('请选择表号');
	const DataParam = ref({
		userid: '',
		mainhouse: "2",
		flag: "2"
	});
	const dataList = ref<any[]>([]);
	const dataTitleList = ref<any[]>([]);
	const hseid = ref('');
	const secondhseid = ref('');
	const buttonArr = ref([]);
	const selectType = ref();
	const dataArray = ref([]);

	onMounted(() => {
		hseid.value = storage.getHseid();
		housename.value = storage.getAddress() || '请选择房屋';
		secondhousename.value = storage.getAddress() || '请选择房屋';
		init();
		
	});

	const init = () => {
		try {
			DataParam.value.userid = storage.getUserId();
			serviceChangeHouseType(DataParam.value).then((res: any) => {
				console.log(res);
				dataList.value = res.result;
				dataTitleList.value = dataList.value.map((item: any) => item.address);
				console.log(dataTitleList.value);
			});
		} catch (error) {
			console.log(error);
		}
	};
	//ButtonType
	const getButtonType = async() => {
		
		try {
			let param = {
				hseId:secondhseid.value
			};
			YuJiaoCheckYongLiangGetHseMeterButtonType(param).then((res: any) => {
				console.log(res);
				buttonArr.value = res.result;
				
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const chooseHouseClick = () => {
		uni.showActionSheet({
			itemList: dataTitleList.value,
			success: (res: any) => {
				console.log(res);
				housename.value = dataTitleList.value[res.tapIndex];
				hseid.value = dataList.value[res.tapIndex].hseid;
			},
			fail: (res: any) => {
				console.log(res.errMsg);
			}
		});
	};
	const secondchooseHouseClick = () => {
		uni.showActionSheet({
			itemList: dataTitleList.value,
			success: (res: any) => {
				console.log(res);
				secondhousename.value = dataTitleList.value[res.tapIndex];
				secondhseid.value = dataList.value[res.tapIndex].hseid;
				getButtonType();
			},
			fail: (res: any) => {
				console.log(res.errMsg);
			}
		});
	};
	const checkYuliang = (item:any) => {
		
		selectType.value = item.type;
		//
		try {
			let param = {
				hseId:secondhseid.value,
				type:item.type
			};
			YuJiaoCheckYongLiangGetHseMeterUsedByButton(param).then((res: any) => {
			console.log(res);
			if (res.success == true) {
				
				dataArray.value = res.result;	
			}else
			{
				uni.showToast({ title: res.message, icon: 'none' });
			}
			
				
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const checkYueClick = () => {
		if(hseid.value.length == 0){
			
			uni.showToast({ title: '请选择房屋', icon: 'none' });
			return
		}
		try {
			let dataparam = {
				hseId: hseid.value,
				hseCompleteName: housename.value,
			};
			serviceYuJiaoYueChongZhi(dataparam).then((res: any) => {
				console.log(res);
				const info = res.result && res.result[0] ? res.result[0] : {};
				uni.showModal({
					cancelText: '关闭',
					confirmText: '去充值',
					confirmColor: '#2A9595',
					title: '余额',
					content: '所在房屋:' + housename.value ,
					success(e: any) {
						if (e.confirm === true) {
							console.log('去充值');
						} else {
							console.log('关闭');
						}
					}
				});
			});
		} catch (error) {
			console.log(error);
		}
	};
	const gotoPay = async() => {
		
		uni.navigateTo({
		  url: "/pages/service/jiaofei/paythefees",
		});
	};

	const goBack = () => {
		uni.navigateBack();
	};

	const rightClick = () => {};

	const segment1Click = () => {
		type.value = "1";
	};

	const segment2Click = () => {
		type.value = "2";
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
		.greenHeaderView{
			display: flex;
			flex-direction: row;
			background-color: white;
			width: 100%;
			height: 50px;
		}
		.whiteLine{
				 margin-left: 40%;
				 margin-top: 5px;
				 width: 20%;
				 height: 2px;
				 background-color: #2A9595;
		}
		.chooseView{
			display: flex;
			flex-direction: column;
		}
		.choosehouse{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 40px;
		}
		.allbuttonView{
			
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
		.buttonView{
		        margin-top: 15px;
		        background-color: #2A9595;
		        border-radius: 8px;
		        color: white;
		        font-size: 12px;
		        margin-left: 15px; 
		        display: flex;
		        justify-content: center;
		        align-items: center;
		        height: 40px;
		        width: 165px;
		}
		.yongliangItem{
			
			display: flex;
			flex-direction: column;
			width:100%;
			
		}
    }
</style>