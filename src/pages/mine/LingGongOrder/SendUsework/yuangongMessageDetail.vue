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
			<input class="searchlocation" v-model="dataDict.com_name" disabled="true" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">人员姓名</view>
			<input class="searchlocation" v-model="dataDict.name" disabled="true" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">性别</view>
			<input class="searchlocation" v-model="dataDict.sex" disabled="true" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">年龄</view>
			<input class="searchlocation" v-model="dataDict.age" disabled="true" type="text" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<input class="searchlocation" v-model="dataDict.mobile" disabled="true" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" >
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
				
					<view class="uni-input">{{dataDict.work_time}}</view>
				
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
			<input class="searchlocation" v-model="dataDict.business_no" disabled="true" type="text" />
		</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">截止日期</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 150px;background-color: aliceblue;align-items: center;text-align: center;">
				{{dataDict.business_time}}
			</view>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="longselected===false" src="/static/login/choose_unselect.png" ></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png"></image>
			<view style="font-size: 13px;color: dimgray;margin-top: 13px;margin-left: 10px;">长期有效</view>
		</view>
		<view style="width: 100%;height: 200px;margin-top: 20px;">
			<view class="imagechooseView">
			            
				<image style="width: 150px;height: 180px;" :src="dataDict.business_path"></image>
							
			</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传在职人员证书</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView">
			<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in personimageValue" >
				   <u-image
					 :src="item.url"
					 width="60px"
					 height="80px"
				   ></u-image>
			   </view>
		    </view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="font-size: 13px;color: red;margin-top: 15px;margin-left: 15px;">*</view>
			<view style="margin-top: 10px;margin-left: 5px;font-size: 13px;">上传职业技能证书</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView">
			<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in skillimageValue">
				   <u-image
					 :src="item.url"
					 width="60px"
					 height="80px"
				   ></u-image>
			   </view>
			</view>
		</view>
		<view class="protocalView">
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<!-- <div v-if="imageshow" class="overlay" @click="close">
			 <div 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			 >
			<div class="slides" :style="slideStyle">
			  <img v-for="img in personimageValue" :key="img" :src="img" class="slide">
			</div>
			 </div>
			 <div class="counter">{{ current + 1 }} / {{ pictrueArr.length }}</div>
	   </div> -->
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,
	MineJiuYeQunShareUseWorkCompanySendWorkWorkerDetail} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const gongzhong = ref('请选择');
	const downImage = ref('/static/home/downImage.png');
	const agreement_name = ref('');
	const business_no = ref('');
	const business_time = ref('请选择截止日期');
	const longselected = ref(false);
	const yingyelicense = ref('/static/mine/yingyelicense.png');
	const yingyePicUrl = ref('');
	const personPicUrl = ref('');
	const skillPicUrl = ref('');
	const idstring = ref('');
	const personimageValue = ref([]);
	const skillimageValue = ref([]);
	const dataDict = ref({});
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
            
	onLoad((options:any) => {
		
		if (options.id) {
			
			idstring.value = options.id;
			getDetail();
		}
	});
	onMounted(() => {
	  
	  getAgreement();
	});
       
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
			MineJiuYeQunShareUseWorkCompanySendWorkWorkerDetail(param).then((res) =>{
				
				console.log(res);
				dataDict.value = res.result;
				gongzhong.value = dataDict.value.work_kind + dataDict.value.work,
				business_no.value = res.result.business_no;
				business_time.value = res.result.business_time;
				
				if (business_time.value === '长期有效') {
					
					longselected.value = true;
				}else
				{
					longselected.value= false;
				}
				yingyePicUrl.value = res.result.business_path;
				yingyelicense.value = res.result.business_path;
				personPicUrl.value = res.result.onjob_paper;
				const onjob_paper = res.result.onjob_paper;
				const onjobList = onjob_paper.split(',');
				for (var index = 0; index < onjobList.length; index++) {
					var element = onjobList[index];
					const dict =  {"name":"image",
								"extname":"png/jpg",
								"url":element,};
					personimageValue.value.push(dict);
				}
				console.log(personimageValue.value);
				skillPicUrl.value = res.result.paperwork_path;
				const paper = res.result.paperwork_path;
				const paperworkList = paper.split(',');
				for (var index = 0; index < paperworkList.length; index++) {
					var element = paperworkList[index];
					const dict =  {"name":"image",
								"extname":"png/jpg",
								"url":element,};
					skillimageValue.value.push(dict);
				}
				
				
			});
		} catch (error) {
			console.log(error)
		} 
	};
	
	const slideStyle = computed(() => {
	      return {
	        transform: `translateX(-${current.value * 100}%)`
	      };
	    });
	
	const open = (index:any) => {
		current.value = index;
		imageshow.value = true;
	};
	const close = () => {
		imageshow.value = false;
	};    
	const touchStart = (e:any) => {
		startX.value = e.touches[0].clientX;
	};
		
	const touchMove = (e:any) => {
		moveX.value = e.touches[0].clientX;
	};
		
	const touchEnd = () => {
		
		const diff = startX.value - moveX.value
		  
		if (Math.abs(diff) > 50) { // 滑动距离阈值
			if (diff > 0 && current.value < personimageValue.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
			}
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
		.personchooseView{
			margin-top: 10px;
			margin-left: 5%;
			width: 90%;
			height: 100px;
			margin-bottom: 20px;
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