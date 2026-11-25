<template>
    <view class="main">
        <u-navbar
          title="房产详情"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
          	<view slot="left" >
          		<view class="flex">
          			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
          		</view>
          	</view>
          </template>
		  <template #right>
			  <view slot="right" @click="houseMessageClick()">
				  <view class="homestayView">房产信息</view>
			  </view>
		  </template>
        </u-navbar>
		<view  style="margin-top: 20px;margin-left: 15px;font-size: 15px;height: 40px;">{{itemData.address}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view  style="display: flex;width: 100%;flex-direction: column;">
			<view class="normal_item" v-for="(item,index) in normaldata">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;border-radius: 15px;margin-left: 15px;"
					  :src="item.avatar"
					  width="30px"
					  height="30px"
					></u-image>
					<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.hsename}}</view>
					<view v-if="item.type == 0" class="typeView">业主</view>
					<view v-if="item.type == 1" class="typeView">家属</view>
					<view v-if="item.type == 2" class="typeView">租客</view>
					<view v-if="item.owner === '1'" class="authView">解除授权</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{item.mobile}}</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
		
		<view v-if="itemData.type == 0 & itemData.mainhouse == 1 & itemData.loginType == loginType" class="footer-container">
		            
				<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
		            <view class="shouquan-button" @click="addAuthClick(itemData)">添加授权</view>
		            <view class="zushou-button" @click="HouseSellAndRent(itemData)">房产租售</view>
		        </view>
		            
		</view>
		<view v-if="itemData.type == 0 & itemData.mainhouse == 1 & itemData.loginType != loginType" class="footer-container">
		            
				<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
					<view class="change-buttonFix" @click="ChangeHouse(itemData)">切换到此房产</view>
		            <view class="shouquan-button1" @click="addAuthClick(itemData)">添加授权</view>
		            <view class="zushou-button1" @click="HouseSellAndRent(itemData)">房产租售</view>
		        </view>
		            
		</view>
		<view v-if="itemData.type == 1 || itemData.type == 2 & itemData.mainhouse == 1 & itemData.loginType == loginType" class="footer-container">
		            
				<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
		            <view class="change-button" @click="ChangeHouse(itemData)">切换到此房产</view>
		        </view>
		            
		</view>
		<view v-if="itemData.type == 1 || itemData.type == 2 & itemData.mainhouse == 1 & itemData.loginType != loginType" class="footer-container">
		            
				<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
					<view class="change-buttonFix" @click="ChangeHouse(itemData)">切换到此房产</view>
				    <view class="shouquan-button1" @click="addAuthClick(itemData)">添加授权</view>
				    <view class="zushou-button1" @click="HouseSellAndRent(itemData)">房产租售</view>
				</view>
		            
		</view>
		<view v-if="itemData.type == 1 || itemData.type == 2 & itemData.mainhouse == 0 " class="footer-container">
		            
				<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
		            <view class="change-button" @click="ChangeHouse(itemData)">切换到此房产</view>
		        </view>
		            
		</view>
		<view v-if="itemData.type == 1 || itemData.type == 2 & itemData.mainhouse != 0 " class="footer-container">
		            
				<view style="display: flex;flex-direction: row;width: 100%;height: 50px;">
					<view class="change-buttonFix" @click="ChangeHouse(itemData)">切换到此房产</view>
				    <view class="shouquan-button1" @click="addAuthClick(itemData)">添加授权</view>
				    <view class="zushou-button1" @click="HouseSellAndRent(itemData)">房产租售</view>
				</view>
		</view>
		<u-modal :show="show" @confirm="confirm" :title="title" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<input class="searchlocation" v-model="phoneNumber" placeholder="填写绑定人手机号" type="text" />
			</view>
		</u-modal>

</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted } from 'vue';
	import {MineHouseTreasureNormalDetail,MineHouseTreasureHouseAddAcount} from '@/api/mine';
	import {serviceGoToChange} from '@/api/service';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const kind = ref('1');
	const normaldata = ref([]);
	const page = ref(1);
	const type = ref(0);
	const itemData = ref({});
	const loginType = ref('');
	const show = ref(false);
	const title = ref('绑定账号');
	const phoneNumber = ref('');
	const itemList = ref(['委托出租','出售']);		 
            
	onLoad((options:any)  => {
		itemData.value = JSON.parse(options.item);
		console.log(itemData.value);
		type.value = itemData.type;
		kind.value = options.kind;
		loginType.value = storage.getLoginType();
	});
	onMounted(() => {
	  
	   init();
	});
            
    const init = async() => {
				
		try {
			
			let param = {
				
				userid:storage.getUserId(),
				houseid:storage.getHseid(),
				type:type.value,
				page:page.value,
				limit:20,
				
			};
			const res = await MineHouseTreasureNormalDetail(param);
							
			console.log(res);
			
			normaldata.value = res.result;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const houseMessageClick = () => {
		
		uni.navigateTo({
			url:`/pages/mine/myHouse/houseHistory?hseid=${encodeURIComponent(itemData.value.hseid)}&address=${encodeURIComponent(itemData.value.address)}`
		})
	};
	//添加授权
	const addAuthClick = () => {
				
		show.value = true;
	};
	const confirm = async() => {
		show.value = false;
		if (phoneNumber.value === '') {
			
			uni.showToast({
				title:'请输入正确手机号',
				icon:'none',
			})
			return;
		};
		if (phoneNumber.value == storage.getPhone()) {
			
			uni.showToast({
				title:'请勿将房产授权给自己!',
				icon:'none',
			})
			return;
		};
		console.log(phoneNumber.value);
		try {
			
			let param = {
				
				userid:storage.getUserId(),
				mobile:phoneNumber.value,
				
			};
			const res = await MineHouseTreasureHouseAddAcount(param);
							
			console.log(res);
			//进入授权页面
			const usertype = res.result.usertype;
			const dataDict = {
				username:res.result.username,
				realname:res.result.realname,
				phone:phoneNumber.value,
				houseid:itemData.value.hseid,
			};
			const newDataDict = {
				phone:phoneNumber.value,
				houseid:itemData.value.hseid,
			};
			if(usertype === '1'){
				
				//已有账号，授权
				uni.navigateTo({
					url:`/pages/mine/myHouse/doneuserAddAuth?dataDict=${JSON.stringify(dataDict)}`
				})
			}else if(usertype === '0'){
				
				//未申请账号，授权
				uni.navigateTo({
					url:`/pages/mine/myHouse/addSecondAuthAcount?dataDict=${JSON.stringify(newDataDict)}`
				})
			}
		  
		}catch (error) {
			console.log(error)
		}
	};
	//房产租售
	const HouseSellAndRent = () => {
				
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				console.log(itemList.value[res.tapIndex])
				
				if (res.tapIndex == 0) {
					
					//跳转委托出租
					uni.navigateTo({
						url:`/pages/mine/myHouse/weituoRent?dataDict=${JSON.stringify(itemData.value)}`
					})
					
				}else if (res.tapIndex == 1) {
					
					//跳转出售
					uni.navigateTo({
						url:`/pages/mine/myHouse/weituoSaleOut?dataDict=${JSON.stringify(itemData.value)}`
					})
				}
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	const ChangeHouse = async(item:any) => {
				
		try {
			
			let param = {
				
				userid:storage.getUserId(),
				hcpid:storage.getHcpid(),
				loginType:item.loginType?item.loginType:'',
				
			};
			const res = await serviceGoToChange(param);
							
			console.log(res);
			if (res.success === true) {
				
				uni.showToast({
					title:'切换主房屋成功',
					icon:'none',
				});
				storage.saveLoginType(itemData.value.loginType);
				storage.saveManid(itemData.value.manid);
				eventBus.emit('refresh-data',item);
				uni.redirectTo({
					url:'/pages/service/service'
				});
			}else
			{
			   uni.showToast({
					title:'切换主房屋失败',
					icon:'none',
			   });
			}
				
			
		}catch (error) {
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
	 .normal_item{
		 display: flex;
		 flex-direction: column;
		 height: 80px;
		 width: 100%;
	 }
	 .footer-container {
	       position: fixed;
	       bottom: 0;
	       left: 0;
	       right: 0;
	       height: 80px;
	       background-color: white;
	       box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	       z-index: 100;
	       color: white;
	       display: flex;
		   flex-direction: row;
	       // justify-content: center; /* 水平居中 */
	       // align-items: center;     /* 垂直居中 */
	       
	     }
	     .shouquan-button {
	                  
	         display: flex;
	         justify-content: center; /* 水平居中 */
	         align-items: center;     /* 垂直居中 */
	         height: 40px;           /* 需要设置高度 */
	         width: 44%;
	         
	         font-size: 13px;
	         color: white;
	         background-color: #2A9595;
	         border-radius: 6px;
	         margin-left: 4%;
	         margin-top: 20px;
	     }
		 .zushou-button{
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 40px;           /* 需要设置高度 */
			 width: 44%;
			 
			 font-size: 13px;
			 color: white;
			 background-color: #2A9595;
			 border-radius: 6px;
			 margin-left: 4%;
			 margin-top: 20px;
		 }
		 .change-button{
			 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 40px;           /* 需要设置高度 */
			 width: 92%;
			 
			 font-size: 13px;
			 color: white;
			 background-color: #2A9595;
			 border-radius: 6px;
			 margin-left: 4%;
			 margin-top: 20px;
		 }
		 .change-buttonFix{
		 			 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 40px;           /* 需要设置高度 */
			 width: 28%;
			 
			 font-size: 13px;
			 color: white;
			 background-color: #2A9595;
			 border-radius: 6px;
			 margin-left: 4%;
			 margin-top: 20px;
		 }
		 .shouquan-button1 {
		              
		     display: flex;
		     justify-content: center; /* 水平居中 */
		     align-items: center;     /* 垂直居中 */
		     height: 40px;           /* 需要设置高度 */
		     width: 28%;
		     
		     font-size: 13px;
		     color: white;
		     background-color: #2A9595;
		     border-radius: 6px;
		     margin-left: 4%;
		     margin-top: 20px;
		 }
		 .zushou-button1{
		 			 display: flex;
		 			 justify-content: center; /* 水平居中 */
		 			 align-items: center;     /* 垂直居中 */
		 			 height: 40px;           /* 需要设置高度 */
		 			 width: 28%;
		 			 
		 			 font-size: 13px;
		 			 color: white;
		 			 background-color: #2A9595;
		 			 border-radius: 6px;
		 			 margin-left: 4%;
		 			 margin-top: 20px;
		 }
		 .typeView{
			 margin-top: 10px;
			 margin-left: 10px;
			 border: 1px #2A9595 solid;
			 border-radius: 3px;
			 width: 30px;
			 height: 15px;
			 background-color: white;
			 color: #2A9595;
			 font-size: 10px;
			 display: flex;
			 justify-content: center;
			 align-items: center;
		 }
		 .authView{
			 margin-top: 15px;
			 margin-left: 10px;
			 border: 1px #2A9595 solid;
			 border-radius: 3px;
			 width: 50px;
			 height: 20px;
			 background-color: white;
			 color: #2A9595;
			 font-size: 10px;
			 display: flex;
			 justify-content: center;
			 align-items: center;
			 margin-left: 180px;
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