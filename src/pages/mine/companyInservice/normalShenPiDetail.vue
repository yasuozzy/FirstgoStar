<template>
    <view class="main">
        <u-navbar
          title="审批详情"
          
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
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
			  :src="dataDict.headImage"
			  width="35px"
			  height="35px"
			></u-image>
			<view style="display: flex;flex-direction: column;">
				<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{dataDict.applyUserName}}</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;color: #2A9595;">{{dataDict.statusName}}</view>
			</view>
			
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属公司</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;;">{{dataDict.eastName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属部门</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.deptName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批类型</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;">{{dataDict.applyTypeName}}</view>
		</view>
		<view v-if="dataDict.applyType == 4 || dataDict.applyType === '4'">
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假类型</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 63%;">{{dataDict.leaveTypeName}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">开始时间</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.startTime}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">结束时间</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.endTime}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假天数</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.dayNum}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假事由</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.content}}</view>
			</view>
		</view>
		<view v-else>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批内容</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 63%;">{{dataDict.content}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批详情</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.details}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 35px;font-size: 12px;color: dimgray;">图片</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 70%;display: flex;flex-direction: row;">
				<view class="picViewItem" v-for="(item,index) in picImgs" :key="index">
					<u-image style="margin-top: 10px;"
					  :src="item"
					  width="40px"
					  height="40px"
					></u-image>
				</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 35px;font-size: 12px;color: dimgray;">附件</view>
			<view style="display: flex;flex-direction: column;width: 100%;">
				<view class="fileItem" v-for="(item,index) in dataDict.enclosureList" :key="index" @click="checkFileClick(item)">
					<image :src="fileImage" style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;"></image>
					<view style="font-size: 14px;margin-top: 10px;margin-left: 10px;">{{item.fileName}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="width: 100%;height: 120px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u-image style="margin-top: 10px;margin-left: 13px;"
				  :src="dataDict.headImage"
				  width="20px"
				  height="20px"
				></u-image>
				<view style="margin-left: 22px;width: 1px;height: 100px;background-color: lightgray;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 40%;">发起申请</view>
					<view style="margin-left: 30px;margin-top: 5px;font-size: 13px;text-align: right;width: 55%;color: darkgray;">{{dataDict.submissionTime}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{faqiName}}</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-top: 10px;margin-left: 10px;">签名:</view>
						<u-image style="margin-top: 5px;margin-left: 10px;"
						  :src="dataDict.signaturepic"
						  mode="scaleToFill"
						  width="150px"
						  height="50px"
						></u-image>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in leaderList" :key="index" style="width: 100%;height: 120px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u-image style="margin-left: 13px;"
				  :src="item.headImage"
				  width="20px"
				  height="20px"
				></u-image>
				<view style="margin-left: 22px;width: 1px;height: 100px;background-color: lightgray;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view v-if="Number(item.status) === 0" style="font-size: 12px;margin-left: 10px;font-size: 12px;width: 40%;">{{ item.leaderUserId == userIds ? '我' : item.username}}(待审核)</view>
					<view v-if="Number(item.status) === 1" style="font-size: 12px;margin-left: 10px;font-size: 12px;width: 40%;">{{ item.leaderUserId == userIds ? '我' : item.username}}(同意)</view>
					<view v-if="Number(item.status) === 2" style="font-size: 12px;margin-left: 10px;font-size: 12px;width: 40%;">{{ item.leaderUserId == userIds ? '我' : item.username}}(拒绝)</view>
					<view style="margin-left: 30px;font-size: 13px;text-align: right;width: 50%;">{{item.approvalTime}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{item.reasons}}</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-top: 10px;margin-left: 10px;">签名</view>
					<u-image v-if="item.signaturepic" style="margin-top: 5px;margin-left: 10px;"
					  :src="item.signaturepic"
					  mode="scaleToFill"
					  width="150px"
					  height="50px"
					></u-image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				
				<u-image style="margin-left: 15px;"
				  :src="tongzhiImage"
				  mode="scaleToFill"
				  width="15px"
				  height="15px"
				></u-image>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;">
					<view v-if="senderList.length > 0" style="font-size: 12px;margin-left: 10px;font-size: 12px;width: 60%;">已抄送{{senderList.length}}人</view>
					<view v-if="senderList.length == 0" style="font-size: 12px;margin-left: 10px;font-size: 12px;width: 60%;">未抄送</view>
				</view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(item, index) in senderList"
					  :key="index"
					>
					  <u-image
						:src="item.headImage"
						width="20px"
						height="20px"
					  ></u-image>
					  <view class="item_text">{{ item.username }}</view>
					</view>
				</view>
				
			</view>
		</view>
		<view @tap.stop v-if=" kind==2" class="protocalView">
		    <view style="
			  padding-top: 10px;
			  padding-bottom: 10px;
			  margin-bottom: 25px;
			  background-color: #2a9598;
			  color: white;
			  text-align: center;
			  width: 80%;
			  margin-top: 50px;
			  border-radius: 5px;
			  margin-left: 10%;
			" @click="transferData(dataDict)">转发</view>
		</view>
		<view @tap.stop v-if="dataDict.buttonFlag == 1 && dataDict.forward  == 0 && kind==1" class="protocalView">
		    <view class="zhuanfaBtn" @click="transferData(dataDict)">转发</view>
			<view class="sureBtn" @click="signClick()">同意</view>
			<view class="jujueBtn" @click="RefuseClick()">拒绝</view>
		</view>
		<view @tap.stop v-if="dataDict.buttonFlag == 1 && dataDict.forward  == 1 && kind==1" class="protocalView">
			<view class="sureBtn1" @click="signClick()">同意</view>
			<view class="jujueBtn" @click="RefuseClick()">拒绝</view>
		</view>
<!-- 		<view @tap.stop v-if="dataDict.buttonFlag == 2 " class="protocalView"> -->
			
			<view v-if="dataDict.buttonFlag == 2 && kind==1" @click="sureBoKuan(dataDict)" style="
			  padding-top: 10px;
			  padding-bottom: 10px;
			  margin-bottom: 25px;
			  background-color: #2a9598;
			  color: white;
			  text-align: center;
			  width: 80%;
			  margin-top: 50px;
			  border-radius: 5px;
			  margin-left: 10%;
			">
			  确认拨款
			</view>
		<!-- </view> -->
		<u-modal :show="shenshow" @confirm="bohuiconfirm" confirmText="确认" title="确认拒绝" :showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" v-model="reason" placeholder="请输入拒绝原因">
				        </textarea>
			</view>
		</u-modal>
		<u-modal :show="show" @confirm="bokuanconfirm" confirmText="确认拨款" title="确认拨款吗" :showCancelButton="true" @cancel="bokuancancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
			</view>
		</u-modal>
		<u-modal :show="addcode" @confirm="codeconfirm" confirmText="确认" title="验证码" :showCancelButton="false" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<!-- <textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" v-model="inputcode" placeholder="请输入验证码">
				        </textarea> -->
						<input v-model="inputcode" style="margin-left: 10px" placeholder="请输入验证码" placeholder-style="color: #999" />
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {WorkQunYuanCompanyInserviceShenPiNormalDetail} from '@/api/mine';
	import {MineOAManageComNormalShenPiNum,CheckPhonegetCode,
	CompanyInserviceNormalShenPiAgreeRefuseData,
	CompanyInserviceNormalShenPiMobileVerification,CompanyInserviceNormalShenPiAppropriation,
	BindPhonegetCode} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	const addcode=ref(false);
	const inputcode=ref("");
    // 背景颜色
    const bgColor = ref("#2A9595");
	const icon = ref('/static/home/homestay.png');
	const subjectValue = ref('');
	const picImgs = ref([]);
	const image = ref('/static/home/homestay.png');
	const ItemData = ref({});
	const extras = ref({});
	const dataDict = ref({});
	const faqiName = ref('');
	const leaderList = ref([]);
	const auditMap = ref({});
	const recheckMap = ref({});
	const tongzhiImage = ref('/static/mine/tongzhiImage.png');
	const fileImage = ref('/static/mine/wenjian.png');
	const senderList = ref([]);
	const idstring = ref('');
	const recordId = ref('');
	const userIds = ref('');
	const shenshow = ref(false);
	const show = ref(false);
	const reason = ref('');	
	const bokuanDict = ref({});
	const resultDict = ref({});
	const signPic = ref('');
	const kind=ref(0);
	const waitingSign = ref(false);
	
	onLoad((options:any) => {
		userIds.value = storage.getUserId();
		idstring.value = options.id;
		recordId.value = options.recordId;
		kind.value=Number(options.kind || 1);
		console.log(options)
		loadDetailData();			
	
	});
	        
	const loadDetailData = async() => {
		try {
			let param = {
				id:idstring.value,
				userId:storage.getUserId(),
				recordId:recordId.value
			};
			const res = await WorkQunYuanCompanyInserviceShenPiNormalDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			const fullName = dataDict.value.applyUserName|| '';
			faqiName.value = fullName.replace(/提交的审批$/, '').trim();
			const subjectList = res.result.subjectList|| [];
			
			for (var index = 0; index < subjectList.length; index++) {
				var element = subjectList[index];
				const amount = element.amount + '元';
				subjectValue.value = subjectValue.value + element.subject + amount;
			}
			picImgs.value = res.result.picImgs;
			leaderList.value = res.result.leaderList;
			auditMap.value = res.result.auditMap;
			recheckMap.value = res.result.recheckMap;
			senderList.value = res.result.senderList;
		   
		}catch (error) {
			console.log(error)
		}
	};
	const checkFileClick = (item: any) => {
	    if (!item?.filePath) {
	        uni.showToast({
	            title: '文件地址无效',
	            icon: 'none'
	        });
	        return;
	    }
	
	    uni.showLoading({
	        title: '正在打开'
	    });
	
	    uni.downloadFile({
	        url: item.filePath,
	        success: (res) => {
	            if (res.statusCode !== 200) {
	                uni.showToast({
	                    title: '文件下载失败',
	                    icon: 'none'
	                });
	                return;
	            }
	            uni.openDocument({
	                filePath: res.tempFilePath,
	                showMenu: true,
	                success: () => {
	                    console.log('打开文档成功');
	                },
	                fail: () => {
	                    uni.showToast({
	                        title: '暂不支持打开此文件',
	                        icon: 'none'
	                    });
	                }
	            });
	        },
	        fail: () => {
	            uni.showToast({
	                title: '文件下载失败',
	                icon: 'none'
	            });
	        },
	        complete: () => {
	            uni.hideLoading();
	        }
	    });
	};
    const goBack= () => {
        uni.navigateBack()
    };
	const detailClick = (item:any) =>{
		uni.navigateTo({
			url:`/pages/mine/companyInservice/normalShenPiDetail?id=${item.id}&recordId=${item.recordId}`
		})
	};

	const bokuanconfirm = async() => {
		//拨款判断是否需要验证码
		try {
			let param = {
				userId:storage.getUserId(),
				estId:bokuanDict.value.estId
			};
			const res = await CompanyInserviceNormalShenPiMobileVerification(param);
							
			console.log(res);
			const resultDict = res.result;
			if(resultDict.estateMobile){
				
				//请求验证码
				getcodeData(resultDict.estateMobile);
				
			}else{
				
				//不需要验证码，拨款
				bukuanUpdate();
			}
		   
		}catch (error) {
			console.log(error)
		}
	};
	
	const bukuanUpdate = async() => {
		try {
			let param = {
				userId:storage.getUserId(),
				estId:bokuanDict.value.estId,
				id:bokuanDict.value.id,
				deptId:bokuanDict.value.deptId
			};
			const res = await CompanyInserviceNormalShenPiAppropriation(param);
			console.log(res);
			const encodedUrl = encodeURIComponent(res.result.payUrl);
			uni.navigateTo({
			  url: `/pages/mine/WebViewPage/WebPayPage?title=拨款&url=${encodedUrl}`
			});
		   
		}catch (error) {
			console.log(error)
		}
	};
	
	const getcodeData = async(phone:any) => {
		try {
			let param = {
				phone:phone,
				type:'8',
			};
			const res = await BindPhonegetCode(param);		
			console.log(res);
			addcode.value=true;
			//请求成功，弹出输入验证码框
		}catch (error) {
			console.log(error)
		}
	};
	const codeconfirm= async() =>{
		if (inputcode.value.length == 0) {
			uni.showToast({
				title:'未输入验证码',
				icon:'none'
			})
			return;
		}
		let param = {
			estateMobile:resultDict.value.estateMobile,
			code:inputcode.value,
		};
		const res = await CheckPhonegetCode(param);
		if(res.success){
			bukuanUpdate();	
		}
		console.log(res);
		addcode.value=false;
	};
	
	const bohuiconfirm = async() =>{
		if (reason.value.length == 0) {
			uni.showToast({
				title:'未输入拒绝原因',
				icon:'none'
			})
			return;
		}
		agreeOrRefuseData(2,'',reason.value);
		reason.value = '';
		shenshow.value = false;
	};
	
	const agreeOrRefuseData = async(statu:any,signaturepic:any,reason:any) => {
		try {
			let param = {
				id:idstring.value,
				userId:storage.getUserId(),
				recordId:recordId.value,
				status:statu,
				signaturepic:signaturepic,
				reason:reason
			};
			const res = await CompanyInserviceNormalShenPiAgreeRefuseData(param);		
			console.log(res);
			if (!res.success) {
			            uni.showToast({
			                title: res.message || '审批失败',
			                icon: 'none'
			            });
			            return false;
			        }
			loadDetailData();
		}catch (error) {
			console.log(error)
		}
	};
	
	const sureBoKuan = (item:any) => {
		show.value = true;
		bokuanDict.value = item;
	};
	
	const signClick = async() => {
		uni.showModal({
			title: '前往签字',
			content: '请完成签字后提交审批',
			cancelText: '取消',
			confirmText: '去签字',
			success: (res: any) => {
				if (res.confirm) {
					 waitingSign.value = true;
					uni.navigateTo({
					  url: "/pages/mine/SignPage/SignPage",
					});	
				}
			}
		});	
		
	};
	const RefuseClick = () => {
		shenshow.value = true;
	};
	const cancelClick = () => {
		
		shenshow.value = false;
	};
	const bokuancancelClick = () => {
		show.value = false;
	};
	
	const handleUserUpdate = (data:any) => {
		 console.log("接收到回传的数据:", data);
		  if (!waitingSign.value) {
		         return;
		     }
			 if (!data || !data[0]) {
			         uni.showToast({
			             title: '签字图片无效',
			             icon: 'none'
			         });
			         return;
			     }
		
			signPic.value = data[0];
		    console.log(signPic.value);
		 
		  agreeOrRefuseData(1,signPic.value,'');
	};
	
	const transferData = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/companyInservice/shenpiTransferDetail?id=${dataDict.value.id}&recordId=${dataDict.value.recordId}`
		})
	};
	
	onMounted(() => {
	  eventBus.on('sign_netimg', handleUserUpdate);
	});
	onUnmounted(() => {
	  	  eventBus.off('sign_netimg', handleUserUpdate);
	});
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          background: white;
		  box-sizing: border-box;
		      padding-bottom: 30px;
          .flex{
              display: flex;
          }
		  .picViewItem{
		  		 display: flex;
		  		 flex-direction: row;
		  }
		  .itemview{
		  	display: flex;
		  	flex-direction: row;
		  	flex-wrap: wrap; /* 允许换行 */
		  	margin-bottom: 10px;
		  	.situation_item {
		  	  width: 25%;
		  	  font-size: 12px;
		  	  color: #000;
		  	  margin-top: 15px;
		  	  box-sizing: border-box;
		  	  display: flex;
		  	  flex-direction: column;
		  	  align-items: center;
		  	  height: 65upx;
		  			margin-bottom: 30px;
		  			.item_text{
		  				margin-top: 8px;
		  					font-size: 11px;
		  					color: gray;
		  			}
		  	}
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
}
.protocalView {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    box-sizing: border-box;
    gap: 10px;
}
.zhuanfaBtn,
.sureBtn,
.jujueBtn,
.sureBtn1,
.bokuanBtn {
    flex: 1;
    min-width: 0;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2A9595;
    border-radius: 5px;
    font-size: 12px;
    color: #2A9595;
    margin: 0;
    box-sizing: border-box;
}
</style>
