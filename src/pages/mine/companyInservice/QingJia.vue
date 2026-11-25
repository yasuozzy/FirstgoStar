<template>
    <view class="main">
        <view class="custom-navbar">
          <view class="navbar-content">
            <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            <view class="title-container">
        			 <view style="font-size: 13px;color: white;margin-top: 5px;margin-left: 10px;width: 53%;">{{deptName}}</view>
        			 <u-image style="margin-top: 8px;margin-left: 15px;"
        			   :src="downImage"
        			   width="20px"
        			   height="15px"
        			 ></u-image>
        			 <!-- <view style="font-size: 14px;color: white;margin-top: 5px;margin-left: 10px;" @click="hitory">历史记录</view> -->
            </view>
          </view>
        </view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;" @click="chooseType()">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">请假类型</view>
			<view style="margin-top: 10px;font-size: 14px;width: 60%;margin-left: 15px;">{{type}}</view>
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="arrowImg"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;" @click="chooseStart">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">开始时间</view>
			<view class="startView" @click="show = true">{{startTime}}
				<u-datetime-picker
				title="请选择开始时间"
				
			                :show="show"
			                v-model="value1"
			                mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="arrowImg"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;" @click="chooseEnd">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">结束时间</view>
			<view class="endView" @click="endshow = true">{{endTime}}
				<u-datetime-picker
				title="请选择结束时间"
				
				            :show="endshow"
				            v-model="value1"
				            mode="date"
							@confirm="endConfirm"
							@cancel="endshow = false"
				    ></u-datetime-picker>
			</view>
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="arrowImg"
			  width="15px"
			  height="15px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">请假天数</view>
			<input class="searchlocation" v-model="dayNum" placeholder="填写请假天数" type="text" />
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">请假事由</view>
			
		</view>
		<textarea class="textAreaView" v-model="details" placeholder="请填写请假事由">
		        </textarea>
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
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">审批流程</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view
		  style="
		    display: flex;
		    flex-direction: row;
		    justify-content: space-between;
		    margin: 10px 15px;
		  "
		>
		  <view style="display: flex; flex-direction: row">
		    <view style="font-size: 18px; color: #999">·</view>
		    <view>审批人</view>
		  </view>
		  <view
		    style="
		      border: 1px dashed #999;
		      border-radius: 90px;
		      width: 20px;
		      height: 20px;
		      text-align: center;
		      line-height: 20px;
		    "
		    @click="selectShenPiPerson()"
		  >
		    +
		  </view>
		</view>
		<view style="display: flex; flex-wrap: wrap; margin-left: 30px">
		  <view v-for="(item, index) in leaderList" :key="index">
		    <view
		      style="
		        display: flex;
		        flex-direction: column;
		        justify-content: center;
		        margin-left: 10px;
		        margin-right: 10px;
		      "
		    >
		      <image
		        :src="item.headImage"
		        style="width: 30px; height: 30px;border-radius: 15px;"
		      ></image>
		      <view style="font-size: 9px;margin-top: 3px;">{{ item.username }}</view>
		    </view>
		  </view>
		</view>
		<view
		  style="
		    display: flex;
		    flex-direction: row;
		    justify-content: space-between;
		    margin: 10px 15px;
		  "
		>
		  <view style="display: flex; flex-direction: row">
		    <view style="font-size: 18px; color: #999">·</view>
		    <view>抄送人</view>
		  </view>
		  <view
		    style="
		      border: 1px dashed #999;
		      border-radius: 90px;
		      width: 20px;
		      height: 20px;
		      text-align: center;
		      line-height: 20px;
		    "
		    @click="selectChaoSong()"
		  >
		    +
		  </view>
		</view>
		<view style="display: flex; flex-wrap: wrap; margin-left: 30px">
		  <view v-for="(item, index) in chaoSongContact" :key="index">
		    <view
		      style="
		        display: flex;
		        flex-direction: column;
		        justify-content: center;
		        margin-left: 10px;
		        margin-right: 10px;
		      "
		    >
		      <image
		        :src="item.headImage"
		        style="width: 30px; height: 30px;border-radius: 15px;"
		      ></image>
		      <view style="font-size: 9px;margin-top: 3px;">{{ item.username }}</view>
		    </view>
		  </view>
		</view>
		<view>
		  <view v-if="signpic">
		    <view class="infocell" style="margin-left: 10px">签名</view>
		    <image class="signimg" :src="BaseImgURL + signpic"></image>
		  </view>
		</view>
		<view style="width: 100%;height: 80px;background-color: white;"></view>
		<view class="footer-container">
		    <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
		        <view class="order-button" @click="gotoRegister()">提交</view>
		    </view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideQingKuanHeader,MineComInsideQingKuanSetUpData} from '@/api/mine';
	
	
	// 背景颜色
	const bgColor = ref("#2A9595");
				
	const image = ref("/static/home/homestay.png");
	const downImage = ref('/static/mine/arrowDown.png');
	const arrowImg = ref('/static/service/my_arrow.png');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const type = ref('');
	const leaveType = ref('');//请假类型
	const startTime = ref('');
	const endTime = ref('');
	const estId = ref('');
	const deptId = ref('');
	const deptName = ref('');
	const deptList = ref([]);
	const itemList = ref([]);
	const enclosureList = ref([]);
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const signpic = ref("");
	const leaderList = ref([]);
	const approveContact = ref([]);
	const chaoSongContact = ref([]);
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref( Number(new Date()));
	const dayNum = ref('');
	const details = ref('');
            
	onLoad((options:any) => {
		estId.value = decodeURIComponent(options.estId);	
	});
	onMounted(() => {
		init();
		eventBus.on("chooseType", handleTypeData);
		eventBus.on("person1", handleUpdateData1);
		eventBus.on("person2", handleUpdateData2);
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
		eventBus.off("chooseType", handleTypeData);
		eventBus.off("person1", handleUpdateData1);
		eventBus.off("person2", handleUpdateData2);
		eventBus.off("sign_netimg", handleUpdateData);
	});
            
	const init = async() => {
		
		try {
				let param = {
					estId:estId.value,
					userId:storage.getUserId(),
				};			
				const res = await MineComInsideQingKuanHeader(param);
								
				console.log(res);						
				deptList.value = res.result;
				if (storage.getDeptName()) {
					
					
					deptName.value = storage.getDeptName();
					deptId.value = storage.getDeptId();
				}else
				{
					deptName.value = res.result[0].deptName;
					deptId.value = res.result[0].deptId;
					storage.saveDeptName(res.result[0].deptName);
					storage.saveDeptId(res.result[0].deptId);
				}
				const result = res.result;
				itemList.value = result.map(item => item.deptName);
							  
				
			} catch (error) {
				console.log(error)
		}
	};
           
	const chooseType = () => {
		
		uni.navigateTo({
			url:'/pages/mine/companyInservice/qingjiaType'
		})
	};
			
	const gotoRegister = () => {
		
		if (type.value.length == 0) {
			
			
			uni.showToast({
			  title: '请假类型为空',
			  icon: "none",
			});
			
			
		}else if (startTime.value.length == 0) {
			
			
			uni.showToast({
			  title: '开始时间为空',
			  icon: "none",
			});
			
			
		}else if (endTime.value.length == 0) {
			
			
			uni.showToast({
			  title: '结束时间为空',
			  icon: "none",
			});
			
			
		}
		else if (details.value.length == 0) {
			uni.showToast({
			  title: '请假事由为空',
			  icon: "none",
			});
		}else if (tempFilePaths.value.length == 0) {
			uni.showToast({
			  title: '图片为空',
			  icon: "none",
			});
		}else if (leaderList.value.length == 0) {
			
			uni.showToast({
			  title: '审批人为空',
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
				
			uploadFileImage();
			
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
				submitFlag:'1',
				applyType:'4',
				estId:estId.value,
				deptId:deptId.value,
				applyUserId:storage.getUserId(),
				applyUserName:storage.getRealName(),
				leaveType:leaveType.value,
				startTime:startTime.value,
				endTime:endTime.value,
				details:details.value,
				signaturepic:signpic.value,
				leader: JSON.stringify(approveContact),
				sender: JSON.stringify(chaoSongContact),
				enclosure:JSON.stringify(enclosureList),
				image:finalImgValue.value,
				receiverList:[],
			};			
			
			const res = await MineComInsideQingKuanSetUpData(param);
								
			console.log(res);
			uni.navigateTo({
				url:'/pages/mine/companyInservice/historyList'
			})
			
		} catch (error) {
			console.log(error)
		}
	};
	//选择审批人
	const selectShenPiPerson = () => {
		console.log(deptId);
		uni.navigateTo({
			url:`/pages/mine/companyInservice/chooseShenPiPerson?deptId=${encodeURIComponent(deptId.value)}`
		})
	};
	//选择抄送人
	const selectChaoSong = () => {
	  uni.navigateTo({
		url:
		  `/pages/mine/companyInservice/chooseCHaoSongPerson?eastId=${encodeURIComponent(estId.value)}`
	  });
	};
	//返回请假类型
	const handleTypeData = (data:any) => {
		console.log("接收到回传的数据:", data);
		const typeData = data;
		type.value = data.name;
		leaveType.value = data.id;
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signpic.value = data[0];
		// sign = true;
		// console.log(sign + ":::" + signpic);
	  }
	};
	const handleUpdateData1 = (data:any) => {
		  console.log("接收到回传的数据:", data);
		  leaderList.value = data;//leaderList是用来展示的，approveContact用来提交数据
		  const personList = [];
		  for (var index = 0; index < data.length; index++) {
			var element = data[index];
			var newDict = {
				bindId:element.bindId,
				leaderUserId:element.leaderUserId
			};
			personList.push(newDict);
		  }
		  approveContact.value = personList;
	};
	const handleUpdateData2 = (data:any) => {
		  console.log("接收到回传的数据:", data);
		  const personList = [];
		  for (var index = 0; index < data.length; index++) {
			var element = data[index];
			var userDict = {
					username:element.username,
					leaderUserId:element.leaderUserId,
					headImage:element.headImage
				};
				personList.push(userDict);
		  }
		  chaoSongContact.value = personList;
	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startTime.value = `${date.getMonth()+1}月${date.getDate()}日`;
		show.value = false;
	};
	//离店日期
	const endConfirm = (e:any) => {
		const date = new Date(e.value);
		endTime.value = `${date.getMonth()+1}月${date.getDate()}日`;
		endshow.value = false;
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
	   height:calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
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
	   margin-top: calc(var(--status-bar-height));
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
		 .startView{
		 		margin-left: 15px;
		 		margin-top: 10px;
		 		width: 60%;
		 		font-size: 14px;
		 }
		 .endView{
		 		 
		 		margin-top: 10px;
		 		width: 60%;
		 		font-size: 14px;
		 		margin-left: 15px;
		 }
		 .textAreaView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 height: 100px;
			 font-size: 13px;
		 }
    }
</style>