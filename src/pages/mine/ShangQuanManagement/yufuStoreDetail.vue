<template>
    <view class="main">
        <u-navbar
          title="填写申请"
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
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">基础信息</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">店铺名称</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.shop_name}}</view>
			<!-- <input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="shop_name" placeholder="填写店铺名称"/> -->
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">营业执照编号</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.business_no}}</view>
			<!-- <input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="business_no" placeholder="填写营业执照编号"/> -->
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" >
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">关联集团</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;">{{dataDict.group_name}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">联系人</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.user_name}}</view>
			<!-- <input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="user_name" placeholder="填写联系人姓名"/> -->
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">联系人电话</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.user_mobile}}</view>
			<!-- <input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="user_mobile" placeholder="填写联系人电话"/> -->
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">法人</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.legal_person}}</view>
			<!-- <input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="legal_person" placeholder="填写法人姓名"/> -->
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">法人身份证号</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.legal_card}}</view>
			<!-- <input style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;" v-model="legal_card" placeholder="填写法人身份证号"/> -->
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" >
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">经营类目</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;">{{dataDict.shop_class_name}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">营业时间</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;">{{dataDict.opening_hours}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" >
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">详细地址</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;">{{dataDict.address}}</view>
			<image style="margin-top: 15px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">经营描述</view>
			<view style="width: 200px;font-size: 14px;margin-top: 15px;margin-left: 10px;">{{dataDict.business_description}}</view>
		</view>
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">资质证件</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;height: 200px;margin-top: 20px;">
			<view class="yingyecustom-upload-btn">
			  <image :src="dataDict.papers" ></image>
			</view>
		</view>
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">身份认证</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="height: 130px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;" >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="dataDict.card_positive_img"></image>
				
			</view>
			<view style="height: 130px;align-items: center;width: 100%;justify-content: center;display: flex;" >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="dataDict.card_negative_img"></image>
				
			</view>
			<view style="height: 130px;align-items: center;width:100%;justify-content: center;display: flex;" >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="dataDict.card_hand_img"></image>
				
			</view>
		</view>
		<view style="display: flex;width: 100%;height: 5px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="background-color: #2A9595;width: 5px;height: 15px;margin-top: 18px;margin-left: 15px;"></view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: #2A9595;">店铺照片</view>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="shopimagechooseView">
		    <view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
				<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in pictrueArr">
					<u-image
					  :src="item"
					  width="60px"
					  height="80px"
					></u-image>
				</view>
			</view>       
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 55%;color: #2A9595;">是否成为政府预付店铺</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="Writevalue"
			  placement="row"
			 
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in WriteOpinion"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				:disabled="true"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="display: flex;width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 70%;">政府预付店铺折扣保密协议</view>
			<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;width: 15%;text-align: right;color: #2A9595;" @click="GoveragreementClick">查看</view>
		</view>
		<view  style="width: 92%;margin-top: 15px;margin-left: 4%;height: 100px;">
			<u-image
			  :src="dataDict.sign_pic"
			  mode="scaleToFill"
			  width="340px"
			  height="100px"
			></u-image>
		</view>
		
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {GetAgreemente,MineShangquanManageMentYufuStoreGetGroupList,
	MineShangquanManageMentYufuStoreGetCategary,
	MineShangquanManageMentYufuStoreApplyShop,
	MineShangquanManageMentYufuStoreShopGetApplyInfo} from '@/api/mine';
    import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL,BaseURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const shop_name = ref();
	const business_no = ref();
	const opening_hours = ref('请选择');
	const address = ref('选择店铺地址');
	const yingyetempFilePaths= ref([]);//营业执照
	const yingyePicUrl = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const yingyelicense = ref('/static/mine/yingyelicense.png');
	const licenseZheng = ref('/static/service/licenseZheng.png');
	const licenseFan= ref('/static/service/licenseFan.png');
	const licenseHand = ref('/static/service/licenseHand.png');
	const zhengimageValue = ref([]);
	const fanimageValue = ref([]);
	const handimageValue = ref([]);
	const shopCoverImage = ref('/static/mine/shopCoverImage.png');
	const shopOtherImage = ref('/static/mine/shopOtherImage.png');
	const cover_img = ref();
	const oth_pics = ref();
	const imageStyles = ref({
		width:80,
		height:100,
		border:{
			color:"lightgray",
			width:1,
			style:'dashed',
			
		}
	});
	const WriteOpinion = ref([
	  {
		name: "是",
		disabled: true,
	  },
	  {
		name: "否",
		disabled: false,
	  },
	]);
	const Writevalue = ref("是");
	const is_fill = ref(1);
	const agreement_name = ref('');
	const governmentAgreement_name = ref('');
	const groupList = ref([]);
	const groupTitleList = ref([]);
	const group_id = ref();
	const group_name = ref('请选择关联集团');
	const shopclassList = ref([]);
	const shopclassTitleList = ref([]);
	const shop_class_name = ref('请选择经营类目');
	const shop_class_id = ref();
	const latitude = ref();
	const longitude = ref();
	const user_name = ref();
	const user_mobile = ref();
	const legal_person = ref();
	const legal_card = ref();
	const business_description = ref();
	const signPic = ref('');
	const selected = ref(false);
	const governselected = ref(false);
	const dataDict = ref({});
	const pictrueArr = ref([]);
	
	
	onMounted(() => {
		
		loadDetailInfo();
	});
	
	const loadDetailInfo = async() => {
		
		try {
			let param = {
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId()
			};
			MineShangquanManageMentYufuStoreShopGetApplyInfo(param).then((res) =>{
				
				console.log(res);
				dataDict.value = res.result;
				pictrueArr.value.push(res.result.cover_img);
				const show_img = res.result.show_img.split(',');
				for (var index = 0; index < show_img.length; index++) {
					var element = show_img[index];
					pictrueArr.value.push(element);
				}
				
			});
		} catch (error) {
			console.log(error)
		} 
	};
	
	const chooseselect = () => {
		selected.value = !selected.value;
	};
	const governchooseselect = () => {
		governselected.value = !governselected.value;
	};
	const GoveragreementClick = () => {
		
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${29}`
		})
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
		         
		          margin-left: 15px;
		          width: 120px;
		          height: 200px;
		  }
		  .yingyecustom-upload-btn {
				margin-left: 15px;
				margin-top: 20px;
				width: 120px;
				height: 160px;
		    // background-color: red;
				display: flex;
				align-items: center;
				justify-content: center;
		    
		  }
		  .yingyecustom-upload-btn image {
		    width: 100%;
		    height: 100%;
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
		  .ChoseenView{
		                 
		  	display: grid;
		  	 grid-template-columns: repeat(3, 1fr);
		  	 gap: 10px;
		  	 max-width: 900px;
		  	 margin: 0 auto;
		  	 // padding: 20px;
		  	 align-items: left;
		  }
		  .yingyeimageItemV{
		  	
		  	width:180px;
		  	height: 180px;
		  	margin-top: 10px;
		  	box-sizing: border-box;
		  }
		  .imageItemV{
		  		   
		  		   
		     width:80px;
		     height: 80px;
		     margin-top: 10px;
		     box-sizing: border-box;
		  }
		  .shopimagechooseView{
		   	margin-top: 20px;
		   	margin-left: 5%;
		   	width: 90%;
		   	height: 100px;
		  	display: flex;
		  	flex-direction: row;
		   }
		   .shopcustom-upload-btn {
		   		  width: 80px;
		   		  height: 100px;
		   		  display: flex;
		   		  align-items: center;
		   		  justify-content: center;
		   		}
		   		.shopcustom-upload-btn image {
		   		  width: 80px;
		   		  height: 100px;
		   		}
				.protocalView{
				         display: flex;
				         flex-direction: row;
				         width: 100%;
						 margin-top: 5px;
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
		         
		  
}
</style>