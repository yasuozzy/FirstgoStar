<template>
    <view class="main">
        <u-navbar
          title="审批"
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
		  <template #right>
			  <view slot="right" @click="addClick">
				  <u-image style="margin-left: 10px;"
					:src="image"
					width="25px"
					height="25px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind1Click">
				<view v-if="kind == 1" style="color: #2A9595;font-size: 13px;">待我审批({{pendingCount}})</view>
				<view v-else style="color: black;font-size: 13px;">待我审批({{pendingCount}})</view>
				<view class="whiteLine1" v-if="kind == 1"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind2Click">
				<view v-if="kind == 2" style="color: #2A9595;font-size: 13px;">我已审批({{completeCount}})</view>
				<view v-else style="color: black;font-size: 13px;">我已审批({{completeCount}})</view>
				<view class="whiteLine1" v-if="kind == 2"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind3Click">
				<view v-if="kind == 3" style="color: #2A9595;font-size: 13px;">抄送我的({{willreadCount}})</view>
				<view v-else style="color: black;font-size: 13px;">抄送我的({{willreadCount}})</view>
				<view class="whiteLine1" v-if="kind == 3"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind4Click">
				<view v-if="kind == 4" style="color: #2A9595;font-size: 13px;">我的转发({{forwardCount}})</view>
				<view v-else style="color: black;font-size: 13px;">我的转发({{forwardCount}})</view>
				<view class="whiteLine1" v-if="kind == 4"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="kind5Click">
				<view v-if="kind == 5" style="color: #2A9595;font-size: 13px;">转发我的({{receiveCount}})</view>
				<view v-else style="color: black;font-size: 13px;">转发我的({{receiveCount}})</view>
				<view class="whiteLine1" v-if="kind == 5"></view>
			</view>
			
		</view>
		<view v-if="kind == 1" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImage"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.applyUserName}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;text-align: right;">{{item.submissionTime}}</view>
				</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">审批类型：{{item.applyTypeName}}</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">审批内容：{{item.content}}</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: #2A9595;">{{item.statusName}}</view>
				<view @tap.stop v-if="item.buttonFlag == 1 && item.forward  == 0" class="protocalView">
				    <view class="zhuanfaBtn" @click="transferData(item)">转发</view>
					<view class="sureBtn" @click="signClick()">同意</view>
					<view class="jujueBtn" @click="RefuseClick()">拒绝</view>
				</view>
				<view @tap.stop v-if="item.buttonFlag == 1 && item.forward  == 1" class="protocalView">
					<view class="sureBtn1" @click="signClick()">同意</view>
					<view class="jujueBtn" @click="RefuseClick()">拒绝</view>
				</view>
				<view @tap.stop v-if="item.buttonFlag == 2 " class="protocalView">
					
					<view class="bokuanBtn" @click="sureBoKuan(item)">确认拨款</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 2" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImage"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.applyUserName}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;text-align: right;">{{item.submissionTime}}</view>
				</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">审批类型：{{item.applyTypeName}}</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">申请内容：{{item.content}}</view>
				<view v-if="item.status == 0" style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: #2A9595;">审核中</view>
				<view v-if="item.status == 1" style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: #2A9595;">已完成</view>
				<view v-if="item.status == 2" style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: #2A9595;">已拒绝</view>
				<view @tap.stop class="protocalView">
					<view class="bokuanBtn" @click="transferData(item)">转发</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 3" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImage"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.applyUserName}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;text-align: right;">{{item.submissionTime}}</view>
				</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">审批类型：{{item.applyTypeName}}</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">申请内容：{{item.content}}</view>
				<view v-if="item.readflag == 0" style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: #2A9595;">未读</view>
				<view v-if="item.readflag == 1" style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: #2A9595;">已读</view>
				<view @tap.stop v-if="item.forward != 1" class="protocalView">
					<view class="bokuanBtn" @click="transferData(item)">转发</view>
				</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 4" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="myTransferClick(item)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 60%;">接收人</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;text-align: right;">{{item.forwardTime}}</view>
				</view>
				<view class="senderItem" v-for="(senderitem,senderindex) in item.senderList" :key="senderindex">
					<u-image
						:src="senderitem.headImage"
						width="20px"
						height="20px"
					></u-image>
					<view class="item_text">{{ senderitem.username }}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;color: gray;">申请人:{{item.applyUserName?item.applyUserName:realName}}</view>
				<view style="margin-left: 10px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">申请内容：{{item.content}}</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<view v-if="kind == 5" class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="tansferMeDetail(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
					  :src="item.headImage"
					  width="35px"
					  height="35px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">转发人:{{item.username}}</view>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;text-align: right;">{{item.approvalTime}}</view>
				</view>
				<view style="margin-left: 55px;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">转发内容：{{item.problem}}</view>
				<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
			</view>
		</view>
		<u-modal :show="shenshow" @confirm="bohuiconfirm" confirmText="确认" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" placeholder="请输入拒绝原因">
				        </textarea>
			</view>
		</u-modal>
		<u-modal :show="show" @confirm="bokuanconfirm" confirmText="确认拨款" :title="bokuantitle" showCancelButton="true" @cancel="bokuancancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineOAManageComNormalShenPiNum,
	MineOAManageComNormalShenPiNormalList,
	MineOAManageComNormalShenPiMyTransList,
	MineOAManageComNormalShenPiTransMeList,CompanyInserviceNormalShenPiAgreeRefuseData,
	CompanyInserviceNormalShenPiMobileVerification,CompanyInserviceNormalShenPiAppropriation,
	BindPhonegetCode} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const image = ref("/static/mine/searchImage.png");
	const kind = ref(1);
	const dataList = ref([]);
	const selected = ref(false);
	const sumCount = ref(0);
	const pendingCount = ref(0);
	const willreadCount = ref(0);
	const receiveCount = ref(0);
	const completeCount = ref(0);
	const forwardCount = ref(0);
	const sendCount = ref(0);
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
    const signPic = ref('');  
	const shenshow = ref(false);
	const title = ref('确认拒绝');
	const reason = ref('');		
	const show = ref(false);
	const bokuantitle = ref('确认拨款吗？');
	const bokuanDict = ref({});
	const realName = ref('');
	
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadNormalList();
	});
	//上拉刷新
	onReachBottom(() => {
		
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		loadNormalList();
	});
	onMounted(() => {
	  realName.value = storage.getRealName();
	  init();
	  loadNormalList();
	  eventBus.on("sign_netimg", handleUpdateData);
	});
	
    onUnmounted(() => {
      
      eventBus.off("sign_netimg", handleUpdateData);
    });    
	//标签数量
    const init = async() => {
		try {
			
			let param = {
				userId:storage.getUserId(),
			};
			const res = await MineOAManageComNormalShenPiNum(param);
				
			console.log(res);
			// dataList = res.result;
			pendingCount.value = res.result.pendingCount;
			willreadCount.value = res.result.willreadCount;
			receiveCount.value = res.result.receiveCount;
			completeCount.value = res.result.completeCount;
			forwardCount.value = res.result.forwardCount;
				
			
		} catch (error) {
			console.log(error)
		}
	};
	//待我审批的，我已审批的，抄送我的，数据
	const loadNormalList = async() => {
				
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:20,
				status:kind.value - 1,
				content: "",
						   
			};
			const res = await MineOAManageComNormalShenPiNormalList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value.push(item)
				});
			}
			
			
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
			
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
		
	};
	//我的转发
	const loadMyTransList = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:20,
				content: "",
						   
			};
			const res = await MineOAManageComNormalShenPiMyTransList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value.push(item)
				});
			}
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
		
	};
	//转发我的
	const loadTransMeList = async() => {
		
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:20,
				content: "",
						   
			};
			const res = await MineOAManageComNormalShenPiTransMeList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value.push(item)
				});
			}
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
		
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
	const kind1Click = () => {
		
		kind.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadNormalList();
	};
	const kind2Click = () => {
		
		kind.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadNormalList();
	};
	const kind3Click = () => {
		
		kind.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadNormalList();
		
	};
	const kind4Click = () => {
		
		kind.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadMyTransList();
	}
	const kind5Click = () => {
		
		kind.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		dataList.value = [];
		loadTransMeList();
	};
	const chooseselect = () => {
		selected.value = !selected.value
	};
	//待我审批，我已审批，抄送我的，详情
	const detailClick = (item:any) =>{
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/normalShenPiDetail?id=${item.id}&recordId=${item.recordId}`
		})
		
	};
	//转发我的，详情
	const tansferMeDetail = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/shenpiTransferMeDet?id=${item.id}&applyType=${item.applyType}`
		})
	};
	//转发操作
	const transferData = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/shenpiTransferDetail?id=${item.id}&recordId=${item.recordId}`
		})
	};
	//我的转发，详情
	const myTransferClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/companyInservice/shenpiMyTransferDetail?id=${item.id}&applyType=${item.applyType}`
		})
	};
	//同意
	const signClick = async() => {
		
		uni.showModal({
			title: '前往签字',
			content: '',
			cancelText: '取消',
			confirmText: '去签字',
			success: (res: any) => {
				if (res.confirm) {
					uni.navigateTo({
					  url: "/pages/mine/SignPage/SignPage",
					});	
				}
			}
		});	
		
	};
	const handleUpdateData = (data:any) => {
	  console.log("接收到回传的数据:", data);
	  if (data) {
		signPic.value = data[0];
		console.log( signPic.value);
		
		 agreeOrRefuseData(1,signPic.value,'');
	  };
	  
	};
	//拒绝
	const RefuseClick = () => {
		shenshow.value = true;
	};
	const cancelClick = () => {
		
		shenshow.value = false;
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
			uni.showToast({
				title:'已审批',
				icon:'none'
			});
			if(kind.value == 1 || kind.value == 2 || kind.value == 3){
				
				loadNormalList();
				
			}else if(kind.value == 4){
				
				loadMyTransList();
				
			}else{
				
				loadTransMeList();
			}
		   
		}catch (error) {
			console.log(error)
		}
		
	};
	const sureBoKuan = (item:any) => {
		show.value = true;
		bokuanDict.value = item;
		
	};
	const bokuancancelClick = () => {
		show.value = false;
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
			if(resultDict.estateMobile != null){
				
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
			//刷新列表
			if(kind.value == 1 || kind.value == 2 || kind.value == 3){
				
				loadNormalList();
				
			}else if(kind.value == 4){
				
				loadMyTransList();
				
			}else{
				
				loadTransMeList();
			}
		   
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
			//请求成功，弹出输入验证码框
			
		   
		}catch (error) {
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
	 .specsView{
	 		 width: 100%;
	 		 height: 50px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 
	 }
	 .whiteLine1{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .contentView{
	 		 display: flex;
	 		 flex-direction: column;
	 }
	 .order_item{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
	 		 
	 }
	 .protocalView{
	          display: flex;
	          flex-direction: row;
	          width: 100%;
	      }
		  .zhuanfaBtn{
			  font-size: 12px;
			  color: #2A9595;
			  margin-top: 13px;
			  margin-left: 195px;
			  border: #2A9595 1px solid;
			  border-radius: 5px;
			  width: 50px;
			  height: 20px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
		  }
		  .sureBtn{
		  			  font-size: 12px;
		  			  color: #2A9595;
		  			  margin-top: 13px;
		  			  margin-left: 10px;
		  			  border: #2A9595 1px solid;
		  			  border-radius: 5px;
		  			  width: 50px;
		  			  height: 20px;
		  			  display: flex;
		  			  justify-content: center;
		  			  align-items: center;
		  }
		  .jujueBtn{
		  			  font-size: 12px;
		  			  color: #2A9595;
		  			  margin-top: 13px;
		  			  margin-left: 10px;
		  			  border: #2A9595 1px solid;
		  			  border-radius: 5px;
		  			  width: 50px;
		  			  height: 20px;
		  			  display: flex;
		  			  justify-content: center;
		  			  align-items: center;
		  }
		  .sureBtn1{
			  
			  font-size: 12px;
			  color: #2A9595;
			  margin-top: 13px;
			  margin-left: 255px;
			  border: #2A9595 1px solid;
			  border-radius: 5px;
			  width: 50px;
			  height: 20px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
		  }
		  .bokuanBtn{
			  
			  font-size: 12px;
			  color: #2A9595;
			  margin-top: 13px;
			  margin-left: 315px;
			  border: #2A9595 1px solid;
			  border-radius: 5px;
			  width: 50px;
			  height: 20px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
		  }
		  .senderItem{
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
		  .searchlocation{
		  	 margin-left: 4%;
		  	 width: 92%;
		  	 height: 35px;
		  	 margin-top: 10px;
		  	 border: 1px lightgray solid;
		  	 border-radius: 5px;
		  	 font-size: 13px;
		   }
    }
</style>