<template>
    <view class="main">
        <u-navbar
                  title="还款"
                  
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
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;" @click="chooseTitle">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">还款公司</view>
			<view class="companyView">{{companyName}}</view>
			<u-image style="margin-top: 10px;margin-left: 5px;"
				  :src="downImage"
				  width="14px"
				  height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">还款内容</view>
			<input class="searchlocation" v-model="content" placeholder="填写还款内容" type="text" />
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">还款总额</view>
			<input class="searchlocation" v-model="total" placeholder="填写还款总额" type="text" />
			<view style="font-size: 13px;margin-top: 10px;">元</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;width: 80%;">还款科目</view>
			<view style="font-size: 14px;margin-top: 10px;margin-left: 10px;color: #2A9595;" @click="showpop">新增</view>
		</view>
		<view v-for="(item, index) in subjectlist" :key="index">
		  <view
		    style="
		      margin: 10px 15px;
			  margin-left: 25px;
		      display: flex;
		      flex-direction: row;
			  font-size: 13px;
		      justify-content: space-between;
		    "
		  >
		    {{ item.subject }}
		    <view style="display: flex; flex-direction: row">
		      {{ item.amount }}
			  <u-image style="margin-top: 2px;margin-left: 5px;" @click="deletesub(index)"
			    :src="deleteImage"
			    width="15px"
			    height="15px"
			  ></u-image>
			  </view
		    ></view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">图片</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view class="imagechooseView" @click="selectFile">
			<view v-if="tempFilePaths.length == 0" class="custom-upload-btn">
			  <image :src="selectphoto" ></image>
			</view>
			<view v-if="tempFilePaths.length > 0" class="ChoseenView">
				<view class="imageItemV" v-for="(item,index) in tempFilePaths" :key="index">
					<image style="width: 80px;height: 80px;" :src="item" ></image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">附件</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view class="imagechooseView">
			<x-native-uploader v-if="enclosureName.length == 0"
			
			name="multipartFile" 
			fileType="all"
			:header="{}"
			:limit="1"
			:url="loadFileUrl"
			:formData="{ key: 'multipartFile' }"
			
			@success="onUploadSuccess"
			@fail="onUploadFail"></x-native-uploader>
			<view v-if="enclosureName.length > 0" style="display: flex;flex-direction: row;">
				<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;" src="/src/static/mine/wenjian.png"></image>
				<text style="margin-top: 10px;margin-left: 10px;">{{ enclosureName }}</text>
			</view>
		</view>
		<view class="footer-container">
		    <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
		        <view class="order-button" @click="gotoRegister">提交</view>
		    </view>
		</view>
		<u-popup :show="show" @close="close" @open="open" :round="10" mode="center">
		  <view>
		    <view style="text-align: center; margin: 8px 0px">新增还款科目</view>
		    <view
		      style="margin: 6px 20px; border: 1px solid #999; border-radius: 5px"
		    >
		      <u-input
		        placeholder="请输入还款名称"
		        border="surround"
		        v-model="subname"
		      ></u-input>
		    </view>
		    <view
		      style="margin: 6px 20px; border: 1px solid #999; border-radius: 5px"
		    >
		      <u-input
		        placeholder="请输入还款数额"
		        border="surround"
		        v-model="subamount"
				type="number"
		      ></u-input>
		    </view>
		    <u-line color="#999"></u-line>
		    <view
		      style="color: #2a9598; text-align: center; margin: 5px 0px"
		      @click="saveSubject()"
		      >确认</view
		    >
		  </view>
		</u-popup>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideNolmalSHGetHouse,MineComInsideHuanKuanSetUp,MineComInsideHuanKuanGoPay} from '@/api/mine';
	import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const downImage = ref('/static/home/downImage.png');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const companyImage = ref("");
	const companyName = ref('');
	const estId = ref('');
	const houseList = ref([]);
	const itemList = ref([]);
	const content = ref('');
	const total = ref('');
	const subjectlist = ref([]);
	const show = ref(false);
	const subname = ref('');
	const subamount = ref('');
	const deleteImage = ref('/static/mine/delete.png');
	const enclosureList = ref([]);
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const signpic = ref("");
	const accessoryPath = ref('');
	const enclosureName = ref('');
	const loadFileUrl = BaseURL + 'Announce/addUploadIms';
            
	onMounted(() => {
	  init();
	  eventBus.on("sign_netimg", handleUpdateData);
	});
    onUnmounted(() => {
      
      eventBus.off("sign_netimg", handleUpdateData);
    });   
	const init = async() => {
		
		try {
				let param = {
					userId:storage.getUserId(),
				};			
				const res = await MineComInsideNolmalSHGetHouse(param);
								
				console.log(res);						
				houseList.value = res.result;
				if (storage.getCompanyName()) {
					
					companyName.value = storage.getCompanyName();
					companyImage.value = storage.getCompanyImage();
					estId.value = storage.getEstId();
				}else
				{
					companyName.value = res.result[0].companyName;
					companyImage.value = res.result[0].companyImage;
					estId.value = res.result[0].estId;
					storage.saveCompanyName(res.result[0].companyName);
					storage.saveCompanyImage(res.result[0].companyImage);
					storage.saveEstId(res.result[0].estId);
				}
				const result = res.result;
				itemList.value = result.map(item => item.companyName);
							  
				
			} catch (error) {
				console.log(error)
		}
	};
	const chooseTitle = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(itemList[res.tapIndex])
				companyName.value = itemList.value[res.tapIndex];
				companyImage.value = houseList.value[res.tapIndex].companyImage;
				estId.value = houseList.value[res.tapIndex].estId;
				storage.saveCompanyName(itemList.value[res.tapIndex]);
				storage.saveCompanyImage(houseList.value[res.tapIndex].companyImage);
				storage.saveEstId(houseList.value[res.tapIndex].estId);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const close = () => {
	  show.value = false;
	};
	const showpop = () => {
	  show.value = true;
	};
	const open = () => {
	  show.value = true;
	};
	const saveSubject = () => {
	  if (subname.value === "" || subamount.value === "") {
		uni.showToast({ title: "请填写完整信息", icon: "none" });
		return;
	  } else {
		let subinfo = {};
		subinfo.subject = subname;
		subinfo.amount = subamount;
		subjectlist.push(subinfo);
		console.log(subjectlist);
		show.value = false;
	  }
	};
	const deletesub = (index:any) => {
	  subjectlist.value.splice(index, 1);
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signpic.value = data[0];
		// sign = true;
		// console.log(sign + ":::" + signpic);
	  }
	};
	const gotoRegister = () => {
		
		if (content.value.length == 0) {
			
			
			uni.showToast({
			  title: '还款内容为空',
			  icon: "none",
			});
			
			
		}else if (total.value.length == 0) {
			uni.showToast({
			  title: '请款总额为空',
			  icon: "none",
			});
		}else if (subjectlist.value.length == 0) {
			
			uni.showToast({
			  title: '还款科目为空',
			  icon: "none",
			});
		}else if (tempFilePaths.value.length == 0) {
			uni.showToast({
			  title: '图片为空',
			  icon: "none",
			});
		}else if (!signpic.value || signpic.value.length < 1) {
			uni.showToast({
			  title: "请先签名",
			  icon: "none",
			});
			uni.navigateTo({
			  url: "/pages/mine/SignPage/SignPage",
			});
			return;
		}
		else {
				
			console.log(tempFilePaths.value);
			if (tempFilePaths.value.length == 0) {
				pushData();
			}else
			{
				uploadFileImage();
			}
			
		}
		
	};
	const selectFile = () => {
			
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = res.tempFilePaths;
				
			}
		});
	};
	
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');
		pushData();
	};
	
	const pushData = async() => {
		
		try {
			
			let param = {
				
				
				estId:estId.value,
				applyUserId:storage.getUserId(),
				applyUserName:storage.getRealName(),
				content:content.value,
				totle:total.value,
				signaturepic:signpic.value,
				subject: JSON.stringify(subjectlist),
				enclosure:JSON.stringify(enclosureList),
				image:finalImgValue.value,
				receiverList:[],
			};			
			
			const res = await MineComInsideHuanKuanSetUp(param);
								
			console.log(res);
			uni.showToast({
				title:'提交成功',
				icon:'none'
			});
			paymoneydetai(res.result);
		   
		} catch (error) {
			console.log(error)
		}
	};
	const paymoneydetai = async(approvalID:any) => {
		
		try {
			
			let param = {
				mobile: storage.getPhone(),
				id: approvalID,
				hostNo:storage.getHostNo(),
				osName:"ios",
				
			};			
			
			const res = await MineComInsideHuanKuanGoPay(param);
								
				console.log(res);
				uni.navigateTo({
					url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
			
		} catch (error) {
			console.log(error)
		}
		
	};
	const onUploadSuccess = (res:any) => {
	  console.log('上传成功', res);
	  // 假设返回结构为 { data: '文件路径', ... }
	  const response = JSON.parse(res.response);
	  if (response.result == true) {
		accessoryPath.value = response.data;
		enclosureName.value = res.file.name;
		console.log(accessoryPath.value,enclosureName.value);
		var dict = {};
		dict.accessoryPath = accessoryPath.value;
		dict.enclosureName = enclosureName.value;
		enclosureList.value.push(dict);
		console.log(enclosureList.value);
		uni.showToast({
			title:'文件上传成功',
			icon:'none'
		});
		
	  }
	};
	
	const onUploadFail = (err:any) => {
	  console.error('上传失败', err)
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
	 .custom-navbar {
	   height: 44px; /* 标准导航栏高度 */
	   position: relative;
	   width: 100%;
	   background-color: #2A9595;
	 }
	 .navbar-content {
	   display: flex;
	   align-items: center;
	   height: 100%;
	   padding: 0 15px; /* 整体左右边距 */
	 }
	 
	 .back-icon {
	   margin-right: 10px; /* 返回键与搜索框间距 */
	 }
	 
	 .title-container {
	   display: flex;
	   flex-direction: row;
	   margin-left: 10px;
	   width: 90%;
	   
	 }
	 .searchlocation{
	            margin-left: 15px;
	            width: 200px;
	            height: 20px;
	            font-size: 13px;
	  		  margin-top: 10px;
	  }
	  .radioView{
	 	 display: flex;
	 	 flex-direction: row;
	 	 font-size: 13px;
	 	 width: 100px;
	 	 margin-left: 30px;
	 	 
	 	 margin-top: 10px;
	  }
	  .imagechooseView{
	          margin-top: 10px;
	          margin-left: 5%;
	          width: 90%;
	          height: 100px;
			  margin-bottom: 20px;
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
	                
	                
			width:80px;
			height: 80px;
			margin-top: 10px;
			box-sizing: border-box;
	     }
	 .footer-container {
	       position: fixed;
	       bottom: 0;
	       left: 0;
	       right: 0;
	       height: 70px;
	       background-color: white;
	       box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	       z-index: 100;
	       color: white;
	       display: flex;
	       justify-content: center; /* 水平居中 */
	       align-items: center;     /* 垂直居中 */
	       
	     }
	     .order-button {
	                  
	         display: flex;
	         justify-content: center; /* 水平居中 */
	         align-items: center;     /* 垂直居中 */
	         height: 35px;           /* 需要设置高度 */
	         width: 92%;
	         margin-right: 10px;
	         font-size: 13px;
	         color: white;
	         background-color: #2A9595;
	         border-radius: 6px;
	         margin-left: 4%;
	         margin-top: 15px;
	     }
		 .companyView{
			font-size: 13px;
			margin-top: 10px;
			margin-left: 15px;
			width: 250px;
			white-space: nowrap;      /* 禁止换行 */
			overflow: hidden;         /* 隐藏溢出内容 */
			text-overflow: ellipsis;  /* 显示省略号 */
			   
		 }
    }
</style>