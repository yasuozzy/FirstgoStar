<template>
    <view class="main">
        <u-navbar
          title="委托出租"
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
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">出售房产</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{saleHouse}}</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">面积</view>
			<input style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 100px;" v-model="area" placeholder="填写" />
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">㎡</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">联系人</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{relationPerson}}</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">联系电话</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{mobile}}</view>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">房产图片</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
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
		<view class="protocalView">
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick">《{{agreement_name}}》</view>
		</view>
		<view class="buttonView" @click="tijiaoClick">提交</view>
		<uni-popup ref="popup" >
			<view class="protocalView1">
				<scroll-view 
				      scroll-y 
				      class="agreement-scroll"
				      :style="{ height: scrollHeight + 'px' }"
				    >
				      <view style="font-size: 13px; padding: 20rpx;" v-html="agreement_content"></view>
				</scroll-view>
				<view class="buttonView1" @click="knowClick">本人已阅读并知悉相关内容</view>
			</view>     
		</uni-popup>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {GetAgreemente,MineHouseInfomationWeiTuoRentOut} from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const area = ref('');
	const dataDict = ref({});
	const saleHouse = ref();
	const relationPerson = ref();
	const mobile = ref();
	const selectphoto = ref('/static/mine/selectphoto.png');
	const tempFilePaths = ref([]);
	const finalImgValue = ref('');
	const selected = ref(false);
	const agreement_name = ref('');
	const agreement_content = ref('');
	const scrollHeight = ref(600);
	const popup = ref();
	
	onLoad((options:any) => {
		
		dataDict.value = JSON.parse(options.dataDict);
		if(dataDict.value.floorarea){
			area.value = dataDict.value.floorarea;
		};
		saleHouse.value = storage.getAddress();
		relationPerson.value = storage.getRealName();
		mobile.value = storage.getPhone();
	});
	onMounted(() => {
		
	   getAgreement();   
		
	});
	const getAgreement = async() => {
					  
				
		try {
			let param = {
				type:'6',
			};
			const res = await GetAgreemente(param);
				
			console.log(res);
			agreement_name.value = res.result.agreement_name;
			agreement_content.value = res.result.agreement_content;
			popup.value.open('top');
			
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const agreementClick = () => {
			                
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${6}`
		})
		
	};
	const knowClick = () => {
		popup.value.close();
	};
	const selectFile = () => {
	        
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = res.tempFilePaths;
				uploadFileImage();
			}
		});
	};
	
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');

	};
	//提交
	const tijiaoClick = async() => {
		
		//
		if(area.value.length === 0){
			uni.showToast({
				title:'请填写面积',
				icon:'none',
			})
			return
		}
		if(finalImgValue.value.length === 0){
			uni.showToast({
				title:'请选择房产图片',
				icon:'none',
			})
			return
		}
		
		if(selected.value === false){
			uni.showToast({
				title:'请仔细阅读用户协议',
				icon:'none',
			})
			return
		}
		
		try {
			
			let param = {
				
				mobile:storage.getPhone(),
				userid:storage.getUserId(),
				houseType:3,
				floorarea:area.value,
				price:'',
				fitType:0,
				rem:'',
				image:finalImgValue.value,
				bathroom:'',
				hall:'',
				room:'',
				houseid:dataDict.hseid
			};
			const res = await MineHouseInfomationWeiTuoRentOut(param);
							
			console.log(res);
			
			if(res.success === true){
				
				uni.showToast({
					title:'提交成功',
					icon:'none',
				})
				uni.navigateBack()
				
			}else
			{
				uni.showToast({
					title:res.massage,
					icon:'none',
				})
				
			}
			
		  
		}catch (error) {
			console.log(error)
		}
	};
	const chooseselect = () => {
		selected.value = selected.value
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
		  .protocalView1{
		  	background-color: white;
		  	margin-top: 95px;
		  	margin-left: 4%;
		  	width: 92%;
		  	height: 670px;
		  	display: flex;
		  	flex-direction: column;
		  	border-radius: 4px;
		  }
		  .agreement-scroll {
		    /* 设置合适的高度，可以动态计算 */
		    padding: 5px;
		  }
		  .buttonView1{
		  	
		  	margin-top: 10px;
		  	background-color: #2A9595;
		  	border-radius: 5px;
		  	color: white;
		  	font-size: 14px;
		  	margin-left: 20%; 
		  	display: flex;
		  	justify-content: center; /* 水平居中 */
		  	align-items: center;     /* 垂直居中 */
		  	height: 35px;           /* 需要设置高度 */
		  	width: 60%;             /* 需要设置宽度 */
		  	
		  }

}
</style>