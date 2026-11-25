<template>
    <view class="main">
        <u-navbar
          title="售后申请单"
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
		<view class="goodsItem" >
			<u-image style="margin-top: 10px;margin-left: 15px;"
			  :src="itemData.img"
			  width="80px"
			  height="80px"
			></u-image>
			<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;width: 65%;">
				<view style="font-size: 13px;">{{itemData.name}}</view>
					
				<view style="font-size: 13px;text-align: right;width: 100%;">{{itemData.price}}元</view>
				
				<view style="font-size: 13px;text-align: right;width: 100%;">x{{itemData.nums}}</view>
				
				<view style="font-size: 13px;margin-top: 5px;margin-bottom: 10px;">{{itemData.specs}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 100px;background-color: white;">
			<view style="font-size: 13px;margin-left: 15px;height: 5px;"></view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">服务类型</view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view v-for="(item,index) in typeList" :key="index" @click="changeClick(index)">
					<view v-if="item.select == true" style="border: 1px #2A9595 solid;color: #2A9595;" class="changeButton">{{item.title}}</view>
					<view v-if="item.select == false" style="border: 1px lightgray solid;color: gray;" class="changeButton">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 120px;background-color: white;">
			<view style="font-size: 13px;margin-left: 15px;height: 5px;"></view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">服务方式</view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="border: 1px #2A9595 solid;color: #2A9595;" class="changeButton">退款</view>
			</view>
			<view style="margin-top: 10px;width: 100%;font-size: 12px;margin-left: 15px;">{{style}}</view>
		</view>
		<view style="margin-top: 10px;width: 100%;height: 150px;background-color: white;">
			<view style="font-size: 13px;margin-left: 15px;height: 5px;"></view>
			<input class="searchlocation" v-model="questionDesc" placeholder="问题描述" type="text" />
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
		</view>
		
		<view class="buttonView" @click="gotoRegister">提交</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import {MineCircleAplyPlatBackMoneySetUpData} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const listData = ref({});
	const itemData = ref({});
	const typeList = ref([{title:'退货',select:true,},{title:'换货',select:false,},{title:'维修',select:false,}]);
	const customerExpect = ref(10);
	const style = ref('注：支付仅支持原路返回，白条支付返还白条额度');
	const imageStyles = ref({
		width:64,
		height:64,
		border:{
			color:"lightgray",
			width:2,
			style:'dashed',
			radius:'2px'
		}
	});
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const questionDesc = ref('');
	const sumPrice = ref(0);
	const selectphoto = ref('/static/mine/selectphoto.png');
            
	onLoad((options:any) => {
		listData.value = JSON.parse(options.listData);
		console.log(listData.value);
		itemData.value = listData.value.orderDetailAry[0];
		const nums = listData.value.orderDetailAry[0].nums;
		const price = listData.value.orderDetailAry[0].price;
		sumPrice.value = nums * price;
	});
        
	const changeClick = (index:any) => {
				
		// 先将所有项设为未选中
		typeList.value.forEach(item => {
			item.select = false
		})
		typeList.value[index].select = true;
		for (var dindex = 0; dindex < typeList.value.length; dindex++) {
			var element = typeList.value[dindex];
			if (element.select == true) {
				console.log(element.title);
				if (element.title === '退货') {
					
					customerExpect.value = 10;
					
				}else if (element.title === '换货') {
					
					customerExpect.value = 20;
					
				}else if (element.title === '维修') {
					
					customerExpect.value = 30;
				}
			}
		}
		
	};
	const gotoRegister = () => {
				
					
		if (tempFilePaths.value.length > 0) {
			
			console.log(tempFilePaths);
			uploadFileImage();
			
		}else
		{
			//提交数据
			pushData();
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

	};
	const pushData = async() => {
		if (questionDesc.value === '') {
			
			uni.showToast({
				title:'请输入问题说明',
				icon:'none',
			})
			return;
		}
		if (finalImgValue.value === '') {
			
			uni.showToast({
				title:'请上传图片',
				icon:'none',
			})
			return;
		}
		try {
							
			let param = {
				
				 userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				 userName:listData.userName,
				 mobile:listData.mobile,
				 pCode:listData.shopCode,
				 orderNo:listData.orderNo,
				 customerExpect:customerExpect.value,
				 questionPic:finalImgValue.value,
				 returnNum:itemData.nums,
				 price:itemData.price,
				 sumPrice:sumPrice.value,
				 orderId:listData.orderId,
				 orderChildId:itemData.childId,
				 questionDesc:questionDesc.value,
				
			};
			const res = await MineCircleAplyPlatBackMoneySetUpData(param);
								
			console.log(res);
			uni.showToast({
				title:res.message,
				icon:'none',
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
          min-height: 100vh;
                  width: 100%;
          background-color: aliceblue;
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
	 .goodsItem{
	 		 display: flex;
	 		 flex-direction: row;
	 		 margin-top: 10px;
	 		 background-color: white;
	 }
	 .changeButton{
		 margin-left: 15px;
		 margin-top: 5px;
		 width: 60px;
		 height: 25px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 font-size: 13px;
		 border-radius: 4px;
	 }
	 .imagechooseView{
	             margin-top: 10px;
	             margin-left: 5%;
	             width: 90%;
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
	 .buttonView{
	           
	  margin-top: 70px;
	  background-color: #2A9595;
	  border-radius: 8px;
	  color: white;
	  font-size: 14px;
	  margin-left: 10%; 
	  margin-bottom: 20px;
	  display: flex;
	  justify-content: center; /* 水平居中 */
	  align-items: center;     /* 垂直居中 */
	  height: 40px;           /* 需要设置高度 */
	  width: 80%;             /* 需要设置宽度 */
	 }
	 .searchlocation{
	          margin-left: 4%;
	          width: 92%;
	          height: 30px;
	          margin-top: 10px;
	          font-size: 13px;
	      }
    }
</style>