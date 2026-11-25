<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">结算审核</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核状态</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核金额</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.amount}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">审核意见</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.reason}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">审核签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">单位名称</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.company}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工时间</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_time}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工地点</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_location}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工工种</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_type}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">用工人数</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.work_num}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">工资薪酬</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.salary}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">结算方式</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.pay_method}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.mobile}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">劳务人员</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">姓名</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">性别</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_sex}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.user_mobile}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">中介公司</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">公司名称</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.corname}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">办公地点</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.coraddress}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;color: gray;font-size: 13px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 20px;color: gray;font-size: 13px;">{{dataDict.hsr_mobile}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">中介签字或盖章</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic_hsr"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工单位签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic_com"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">劳务人员签字</view>
		<view style="width: 92%;margin-top: 10px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic_user"
			  mode="scaleToFill"
			  width="340px"
			  height="80px"
			></u-image>
		</view>
		<view class="protocalView">
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
		<view style="width: 100%;height: 50px;background-color: white;margin-top: 20px;"></view>
		<view v-if="dataDict.statusFlag === '待审核'" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="pass-button" @click="tongguoClick()">通过</view>
				<view class="cancel-button" @click="jujueClick()">拒绝</view>
			 </view>
		</view>
		<u-modal :show="show" @confirm="bohuiconfirm" confirmText="确认" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="reason" placeholder="请输入审核意见" type="text" />
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineServiceJieSuanLingDetail,GetAgreemente,
	MineFinancialServiceLingGongOrderAuditShenHe} from '@/api/mine';
	
	import eventBus from '@/utils/eventBus';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const ItemData = ref({});
	const extras = ref({});
	const dataDict = ref({});
	const agreement_name = ref('');
	const agreement_content = ref('');
	const show = ref(false);
	const title = ref('审核操作');
	const reason = ref('');
	const signPic = ref('');
	const type = ref(1);
            
	onLoad((options:any) => {
		ItemData.value = JSON.parse(options.item);
		extras.value = JSON.parse(ItemData.value.extras);
		console.log(ItemData.value);
		console.log(extras.value);
		
	});
	onMounted(() => {
		loadData();
		getAgreement();
		eventBus.on("sign_netimg", handleUpdateData);
	});
	onUnmounted(() => {
			  
	  eventBus.off("sign_netimg", handleUpdateData);
	});
        
    const loadData = async() => {
           	
		try {
			
			let param = {
				
				push_id:extras.value.push_id,
				
			};
			const res = await MineServiceJieSuanLingDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
				
				
		}catch (error) {
			console.log(error)
		}
   };
    const getAgreement = async() => {
           		  
		//我的钱包
		try {
			let param = {
				type:'18',
			};
			const res = await GetAgreemente(param);
				
			console.log(res);
			agreement_name.value = res.result.agreement_name;
			agreement_content.value = res.result.agreement_content;
			
		} catch (error) {
			console.log(error)
		} 
		  
	};
	const agreementClick = () => {
				   
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${18}`
		})
	
	};
	//通过
	const tongguoClick = () => {
	
		type.value = 1;
		uni.navigateTo({
		  url: "/pages/mine/SignPage/SignPage"
		});
	};
	//拒绝
	const jujueClick = () => {
	
		type.value = 2;
		uni.navigateTo({
		  url: "/pages/mine/SignPage/SignPage"
		});
	};
	const cancelClick = () => {
	
		show.value = false;
	};
	const bohuiconfirm = async() => {
	
		if (reason.value.length == 0) {
			
			uni.showToast({
				title:'请输入审核意见',
				icon:'none'
			})
			return;
		}
	
		try {
			let param = {
				
				push_id:extras.value.push_id,
				type:type.value,
				reason:reason.value,
				sign_pic:signPic.value,
			};
			const res = await MineFinancialServiceLingGongOrderAuditShenHe(param);
				
			console.log(res);
			loadData();
			show.value = false;
		
		} catch (error) {
			console.log(error)
		} 
	};
	const handleUpdateData = (data:any) => {
		 console.log("接收到回传的数据:", data);
		 if (data) {
			signPic.value = data[0];
			dataDict.value.sign_pic = BaseImgURL + signPic.value;
			console.log( signPic);
		 };
		 show.value = true;
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
	 .protocalView{
		  display: flex;
		  flex-direction: row;
		  width: 100%;
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
				.pass-button{
					
					display: flex;
					justify-content: center; /* 水平居中 */
					align-items: center;     /* 垂直居中 */
					height: 35px;           /* 需要设置高度 */
					width: 35%;
					
					font-size: 13px;
					color: white;
					background-color: #2A9595;
					border-radius: 6px;
					margin-left: 10%;
					margin-top: 15px;
				}
		        .cancel-button {
		                     
		            display: flex;
		            justify-content: center; /* 水平居中 */
		            align-items: center;     /* 垂直居中 */
		            height: 35px;           /* 需要设置高度 */
		            width: 35%;
		            
		            font-size: 13px;
		            color: white;
		            background-color: #2A9595;
		            border-radius: 6px;
		            margin-left: 10%;
		            margin-top: 15px;
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