<template>
    <view class="main">
        <u-navbar
          title="第三方兼职"
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
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">姓名</view>
			<input class="searchlocation" :value="username" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 20%;">技能标签</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;display: flex;flex-wrap: wrap;">
				<view 
				  class="labelView" 
				  v-for="(item,index) in dataArr" 
				  :key="index"
				  @click="labelClick(index)"
				  :style="{
				    backgroundColor: item.checked ? '#2A9595' : 'white',
				    color: item.checked ? 'white' : '#2A9595'
				  }"
				>
				  {{item.tallyName}}
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">技能描述</view>
			<textarea style="margin-top: 15px;margin-left: 4%;width: 70%;height: 100px;font-size: 13px;" v-model="skillsDescribe" placeholder="填写详细描述">
			        </textarea>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="choseNetClick()">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">服务网点</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 250px;">{{managerName}}</view>
			<image style="margin-top: 15px;margin-left: 15px;height: 10px;width: 15px;" :src="downImage"></image>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">证件照(身份证正反面以及本人手持身份证各一张)</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView" @click="selectFile">
			<view v-if="tempFilePaths.length == 0" class="custom-upload-btn">
			  <image :src="selectphoto" ></image>
			</view>
			<view v-if="tempFilePaths.length > 0" class="ChoseenView">
				<view class="imageItemV" v-for="(item,index) in tempFilePaths" :key="index">
					<image style="width: 80px;height: 80px;" :src="item" ></image>
				</view>
			</view>      
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">资质证书</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="personchooseView" @click="selectZiZhiFile">
			<view v-if="zizhiFilePaths.length == 0" class="custom-upload-btn">
			  <image :src="selectphoto" ></image>
			</view>
			<view v-if="zizhiFilePaths.length > 0" class="ChoseenView">
				<view class="imageItemV" v-for="(item,index) in zizhiFilePaths" :key="index">
					<image style="width: 80px;height: 80px;" :src="item" ></image>
				</view>
			</view> 
		</view>
		<view class="protocalView">
			<view >
				<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
				<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			</view>
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">我已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view class="buttonView" @click="tijiaoClick()">提交</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	
	import {MineJiuYeQunShareYuanLaoWuOrderThirdDetail,
	MineJiuYeQunShareYuanLaoWuOrderSkilllabels,
	GetAgreemente,
	MineShareLaoWuOrderManagementOfficeInformation,
	MineShareLaoWuOrderAppTemporayRegister} from '@/api/mine'
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const dataDict = ref({});
	const username = ref('');
	const managerName = ref('请选择');
	const downImage = ref('/static/home/downImage.png');
	const selected = ref(false);
	const agreement_name = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const personImageStyles = ref({
		width:80,
		height:80,
		border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			radius:'2px'
		}
	});
	const personPicUrl = ref('');
	const zizhiPicUrl = ref('');
	const serviceData = ref([]);
	const serviceTieleArr = ref([]);
	const managerId = ref('');
	const dataArr = ref([]);
	const skillChoseList = ref([]);
	const skillsLabel = ref('');
	const skillsDescribe = ref('');
    const tempFilePaths = ref([]); 
	const zizhiFilePaths = ref([]);    
	onMounted(() => {
		
		username.value = storage.getRealName();
		init();
		getskilllabel();
		getAgreement();
		getServiceNetWork();
	});
		
    const init = async() => {
				
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				Id:storage.getTemporayId(),
				
			};
			const res = await MineJiuYeQunShareYuanLaoWuOrderThirdDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			// imageList.value = res.result.idCardPicImgs;
			// zizhiList.value = res.result.certificatePicImgs;
			
		}catch (error) {
			console.log(error)
		}
	};
	const getskilllabel = async() => {
				
		try {
			
			let param = {};
			const res = await MineJiuYeQunShareYuanLaoWuOrderSkilllabels(param);
							
			console.log(res);
			const datalist = res.result;
			dataArr.value = datalist.map(item => ({
			  ...item,
			  checked: false
			}));
				
		}catch (error) {
			console.log(error)
		}
	};
	const getAgreement = async() => {
					  
				
		try {
			let param = {
				type:'2',
			};
			const res = await GetAgreemente(param);
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				// agreement_content.value = res.result.agreement_content;
			
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const agreementClick = () => {
			                
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${2}`
		})
		
	};
	const getServiceNetWork = async() => {
				
		try {
			let param = {
				
			};
			const res = await MineShareLaoWuOrderManagementOfficeInformation(param);
				
			console.log(res);
			serviceData.value = res.result;
			for (var index = 0; index < serviceData.value.length; index++) {
				var element = serviceData.value[index];
				const titlenames = element.name + element.address;
				serviceTieleArr.value.push(titlenames);
				
			}
				
		} catch (error) {
			console.log(error)
		} 
	};
	//选择服务网点
	const choseNetClick = () => {
				
		uni.showActionSheet({
			
			itemList: serviceTieleArr.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(itemList[res.tapIndex])
				managerName.value= serviceTieleArr[res.tapIndex];
				managerId.value = serviceData[res.tapIndex].manid;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	const chooseselect = () => {
		selected.value = !selected.value
	};
	const selectFile = () => {
	        
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = res.tempFilePaths;
				uploadPersonImage();
			}
		});
	};
	
	const uploadPersonImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		personPicUrl.value = result.map(item => item.data).join(',');

	};
	const selectZiZhiFile = () => {
	        
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				zizhiFilePaths.value = res.tempFilePaths;
				uploadZiZhiImage();
			}
		});
	};
	
	const uploadZiZhiImage = async() => {
		const result = await uploadMultipleFiles([],zizhiFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		zizhiPicUrl.value = result.map(item => item.data).join(',');
	
	};
	//选择标签
	const labelClick = (i:any) => {
		const currentItem = dataArr.value[i];
		if (!currentItem) {
			return;
		}
		dataArr.value[i].checked = !currentItem.checked;
		skillChoseList.value = dataArr.value.filter(item => item.checked);
		
		
	};
	const tijiaoClick = async() => {
				
		try {
			let param = {
				managerId:managerId.value,
				userId:storage.getUserId(),
				userName:username.value,
				phone:storage.getPhone(),
				skillsLabel:skillsLabel.value,
				idCardPic:personPicUrl.value,
				certificatePic:zizhiPicUrl.value,
				id:dataDict.value.id,
				skillsDescribe:skillsDescribe.value,
			};
			const res = await MineShareLaoWuOrderAppTemporayRegister(param);
				
			console.log(res);
			
			uni.showToast({
				title:'提交成功，请等待审核',
				icon:'none'
			});
			uni.navigateBack();
				
			
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .labelView{
		 border: 1px solid #2A9595;
		 border-radius: 3px;
		 font-size: 12px;
		 margin-top: 10px;
		 margin-left: 10px;
	 }
	 .searchlocation{
	          margin-left: 15px;
	          width: 250px;
	          height: 25px;
	          margin-top: 10px;
	         
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

