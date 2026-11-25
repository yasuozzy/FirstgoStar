<template>
    <view class="main">
        <u-navbar
          title="招聘登记"
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
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司名称</view>
			<input class="searchlocation" v-model="com_name" placeholder="请填写公司全名" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司法人姓名</view>
			<input class="searchlocation" v-model="legal_persion" placeholder="请填写公司法人姓名" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司法人手机号</view>
			<input class="searchlocation" v-model="legal_person_mobile" placeholder="请填写公司法人手机号" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司法人身份证号</view>
			<input class="searchlocation" v-model="legal_person_card" placeholder="请填写公司法人身份证号" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">办公地点</view>
			<input class="searchlocation" v-model="office_address" placeholder="请填写办公地点" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">公司简介</view>
		<textarea class="textArea" v-model="introduction" placeholder="请填写公司简介"></textarea>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">招聘意向</view>
		<textarea class="textArea" v-model="intention" placeholder="请填写公司招聘意向"></textarea>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">上传营业执照</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">营业执照编号</view>
			<input class="searchlocation" v-model="business_num" placeholder="请填写营业执照编号" type="text" />
		</view>
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
		            @select="yingyeselect" 
		            limit="1" >
						<view class="custom-upload-btn">
						  <image :src="yingyezhizhao" ></image>
						</view>
					</uni-file-picker>
					<uni-file-picker
					v-model="imageValue"  
					file-mediatype="image"
					mode="grid"
					file-extname="png,jpg"
					:image-styles="imageStyles"
					@progress="progress" 
					@success="success" 
					@fail="fail" 
					@select="otherselect" 
					limit="9" >
						<view class="custom-upload-btn">
						  <image :src="otherZiZhi" ></image>
						</view>
					</uni-file-picker>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">上传公司法人身份证</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="margin-left: 115px;height: 130px;align-items: center;margin-top: 20px;width: 300px;">
				<uni-file-picker style="width: 500px;"
				:value="zhengimageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:image-styles="ChoseImageStyles"
				@select="zhengselect" 
				limit="1" >
					<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseZheng"></image>
				</uni-file-picker>
			</view>
			<view style="margin-left: 115px;height: 130px;align-items: center;width: 300px;">
				<uni-file-picker style="width: 500px;"
				:value="fanimageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:image-styles="ChoseImageStyles"
				@select="fanselect" 
				limit="1" >
					<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseFan"></image>
				</uni-file-picker>
			</view>
			<view style="margin-left: 115px;height: 130px;align-items: center;width: 300px;">
				<uni-file-picker style="width: 500px;"
				:value="handimageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:image-styles="ChoseImageStyles"
				@select="handselect" 
				limit="1" >
					<image style="width: 220px;height: 120px;margin-top: 5px;" :src="licenseHand"></image>
				</uni-file-picker>
			</view>
		</view>
		<view class="protocalView">
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view class="buttonView" @click="tijiaoClick()">提交审核</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {GetAgreemente,MineJiuYeQunYuanLaoWuOrderZhaoPinUpLoad,MineJiuYeQunYuanLaoWuOrderZhaoPinDetail} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const com_name = ref('');
	const legal_persion = ref('');
	const legal_person_mobile = ref('');
	const legal_person_card = ref('');
	const office_address = ref('');
	const introduction = ref('');
	const intention = ref('');
	const business_num = ref('');
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan = ref('/static/service/licenseFan.png');
	const licenseHand = ref('/static/service/licenseHand.png');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const selected = ref(false);
	const agreement_name = ref('');
	const agreement_content = ref('');
	const imageStyles = ref({
		width:80,
		height:100,
		border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			
		}
	});
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const business_pic = ref('');
	const oth_pics = ref('');
	const ChoseImageStyles = ref({
		width:150,
		height:120,
		 border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			
		}
	});
	const idcard_positive = ref('');
	const idcard_negative = ref('');
	const idcard_hand = ref('');
	const isEdit = ref('');
	const yingyezhizhao = ref('/static/mine/yingyezhizhao.png');
	const otherZiZhi = ref('/static/mine/otherZiZhi.png');
				
            
	onLoad((options:any) => {
		
		if (options.isEdit == 1) {
			
			getDetail();
		}
	});
	onMounted(() => {
		getAgreement();
	});
            
	const getDetail = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
			};
			MineJiuYeQunYuanLaoWuOrderZhaoPinDetail(param).then((res) =>{
				
				console.log(res);
				com_name.value = res.result.com_name;
				legal_persion.value = res.result.legal_persion;
				legal_person_mobile.value = res.result.legal_person_mobile;
				legal_person_card.value = res.result.legal_person_card;
				office_address.value = res.result.office_address;
				introduction.value = res.result.introduction;
				intention.value = res.result.intention;
				business_num.value = res.result.business_num;
				idcard_positive.value = res.resul.tidcard_positive;
				idcard_negative.value = res.result.idcard_negative;
				idcard_hand.value = res.result.idcard_hand;
															
			});
		} catch (error) {
			console.log(error)
		} 
	};
	const getAgreement = async() => {
		  
	
		try {
			let param = {
				type:'28',
			};
			GetAgreemente(param).then((res) =>{
				
				console.log(res);
				agreement_name.value = res.result.agreement_name;
				agreement_content.value = res.result.agreement_content;
			});
		} catch (error) {
			console.log(error)
		} 
		  
	};
	const agreementClick = () => {
					  
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${28}`
		})
		
	};
	const chooseselect = () => {
		selected.value = !selected.value
	};
	const yingyeselect = (e:any) => {
		console.log('选择文件：',e);
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			business_pic.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
	};
	const otherselect = (e:any) => {
		
		console.log('选择文件：',e);
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			oth_pics.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
	};
	const tijiaoClick = async() => {
		
		if (com_name.value.length == 0) {
			
			uni.showToast({
				title:'请填写公司名称',
				icon:'none'
			})
			return;
		}
		if (legal_persion.value.length == 0) {
			
			uni.showToast({
				title:'请填写公司法人姓名',
				icon:'none'
			})
			return;
		}
		if (legal_person_mobile.value.length == 0) {
			
			uni.showToast({
				title:'请填写法人手机号',
				icon:'none'
			})
			return;
		}
		if (legal_person_card.value.length == 0) {
			
			uni.showToast({
				title:'请填写法人身份证号',
				icon:'none'
			})
			return;
		}
		if (office_address.value.length == 0) {
			
			uni.showToast({
				title:'请填写办公地点',
				icon:'none'
			})
			return;
		}
		if (introduction.value.length == 0) {
			
			uni.showToast({
				title:'请填写公司简介',
				icon:'none'
			})
			return;
		}
		if (intention.value.length == 0) {
			
			uni.showToast({
				title:'请填写招聘意向',
				icon:'none'
			})
			return;
		}
		if (business_num.value.length == 0) {
			
			uni.showToast({
				title:'请填写营业执照编号',
				icon:'none'
			})
			return;
		}
		if (idcard_positive.value.length == 0) {
			
			uni.showToast({
				title:'请选择身份证正面照片',
				icon:'none'
			})
			return;
		}
		if (idcard_negative.value.length == 0) {
			
			uni.showToast({
				title:'请选择身份证反面照片',
				icon:'none'
			})
			return;
		}
		if (idcard_hand.value.length == 0) {
			
			uni.showToast({
				title:'请选择手持身份证照片',
				icon:'none'
			})
			return;
		}
		if (selected.value == false) {
			
			uni.showToast({
				title:'请同意劳务协议',
				icon:'none'
			})
			return;
		}
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				com_name:com_name.value,
				legal_persion:legal_persion.value,
				legal_person_mobile:legal_person_mobile.value,
				legal_person_card:legal_person_card.value,
				office_address:office_address.value,
				introduction:introduction.value,
				intention:intention.value,
				business_num:business_num.value,
				business_pic:business_pic.value,
				oth_pics:oth_pics.value,
				idcard_positive:idcard_positive.value,
				idcard_negative:idcard_negative.value,
				idcard_hand:idcard_hand.value,
				
			};
			MineJiuYeQunYuanLaoWuOrderZhaoPinUpLoad(param).then((res) =>{
				
				console.log(res);
				
			});
			
		} catch (error) {
			console.log(error)
		} 
	};
	const zhengselect = (e:any) => {
		
		console.log('选择文件：',e);
		
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			idcard_positive.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
	};
	const fanselect = (e:any) => {
		
		console.log('选择文件：',e);
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			idcard_negative.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
	};
	const handselect = (e:any) => {
		
		console.log('选择文件：',e);
		let tempFilePaths = e.tempFilePaths;
		uploadMultipleFiles([], tempFilePaths, storage.getToken())
		  .then((results) => {
			console.log("所有文件上传成功:", results);
			let netimgs = [];
			results.forEach((item) => {
			  netimgs.push(item.data);
			});
			idcard_hand.value = BaseImgURL + netimgs.join(',');
		  })
		  .catch((error) => {
			console.error("文件上传失败:", error);
		  });
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
		   margin-left: 10px;
		   width: 250px;
		   height: 25px;
		   margin-top: 12px;
		   border-radius: 5px;
		   font-size: 13px;
		}
		.textArea{
			margin-top: 10px;
			margin-left: 4%;
			width: 92%;
			height: 100px;
			border: lightgray 1px solid;
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
	.imagechooseView{
	 	margin-top: 20px;
	 	margin-left: 5%;
	 	width: 90%;
	 	height: 100px;
		display: flex;
		flex-direction: row;
	 }
	 .custom-upload-btn {
		  width: 80px;
		  height: 100px;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
		.custom-upload-btn image {
		  width: 100%;
		  height: 100px;
		}
           
    }
</style>