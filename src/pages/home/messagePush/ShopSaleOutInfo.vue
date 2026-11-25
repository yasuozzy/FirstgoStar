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
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">状态</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.statusFlag}}</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房产</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.house_complete_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋编号</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.houser_num}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">标题</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.title}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">商铺位置</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.location_name}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋类型</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.shop_type}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋楼层</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.house_floor}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">建筑面积</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.built_area}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">规格</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.spec}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">经营行业</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.operating_industry}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">经营状态</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.operating_status}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 60px;">是否临街</view>
			<view class="housetypeChoose">
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in streetList"
					
					:key="index"
					shape="circle"
					:checked="selectedValue === item.value"
					 @change="handleChange(item.value)"
					:label="item.name"
					activeColor="#2A9595"
					
					            >
				</u-checkbox>
			</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">售价(万)</view>
			<view style="color: gray;font-size: 14px;margin-top: 10px;margin-left: 30px;">{{dataDict.selling_price}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">配套设施</view>
		</view>
		<view class="situation_contect">
		  <view
		    class="situation_item"
		    v-for="(item, index) in toolsList"
		    :key="index"
		  >
		    <view class="item_text">{{item}}</view>
		  </view>
		</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋亮点</view>
		</view>
		<textarea class="liangdianView" :disabled="liangdian" :value="dataDict.detailed"></textarea>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">上传图片</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">*身份证(正反面，手持)</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<image style="margin-top: 20px;margin-left: 20%;width: 60%;height: 120px;" :src="idcard_positive" ></image>
			<image style="margin-top: 20px;margin-left: 20%;width: 60%;height: 120px;" :src="idcard_negative" ></image>
			<image style="margin-top: 20px;margin-left: 20%;width: 60%;height: 120px;" :src="idcard_hand" ></image>
		</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房产证</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in imageList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 60px;">房屋实景</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in shijingImgList"  @click="open(index)">
				<u-image
				  :src="item"
				  width="60px"
				  height="80px"
				></u-image>
			</view>
		</view>
		<view class="protocalView">
		    <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 15px;">我已阅读并同意</view>
		    <view style="font-size: 12px;color: royalblue;margin-top: 13px;" @click="agreementClick()">《{{agreement_name}}》</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed,onUnmounted  } from 'vue';
	import {MessageListShopSaleOutShenHeInfo,GetAgreemente} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const saleId = ref('');
	const dataDict = ref({});
	const streetList = ref([{
			name: '是',
			value: 'option1'
		},
		{
			name: '否',
			value: 'option2'
		},
				  
	]);
	const selectedValue = ref('option1'); // 当前选中的值
	const linjinStreet = ref(true);
	const toolsList = ref([]);
	const liangdian = ref(true);
	const idcard_positive = ref('');
	const idcard_negative = ref('');
	const idcard_hand = ref('');
	const imageList = ref([]);
	const shijingImgList = ref([]);
	const agreement_name = ref('');
			
	onLoad((options:any) => {
		
		saleId.value = decodeURIComponent(options.saleId);
	});
	onMounted(() => {
	   loadData();
	   getAgreement();
	});
    const loadData = async() => {
            	
		try {
			
			let param = {
				
				saleId:saleId.value,
				
				
			};
			const res = await MessageListShopSaleOutShenHeInfo(param);
							
				console.log(res);
				dataDict.value = res.result;
				
				const is_frontage = dataDict.is_frontage;
				if (is_frontage == 1) {
					
					selectedValue.value = 'option1';
					
				}else
				{
					selectedValue.value = 'option2';
				}
				const allocation = res.result.allocation;
				if (allocation) {
					toolsList.value = allocation.split(',');
				}
				idcard_positive.value = res.result.idcard_positive;
				idcard_negative.value = res.result.idcard_negative;
				idcard_hand.value = res.result.idcard_hand;
				const property_picture = res.result.property_picture;
				imageList.value = property_picture.split(',');
				const picture = res.result.picture;
				shijingImgList.value = picture.split(',');
			
		}catch (error) {
			console.log(error)
		}
	};
	const getAgreement = async() => {
					  
		//我的钱包
		try {
			let param = {
				type:'14',
			};
			const res = await GetAgreemente(param);
				
			console.log(res);
			agreement_name.value = res.result.agreement_name;
			
		} catch (error) {
			console.log(error)
		} 
			  
	};
	const agreementClick = () => {
			                
		uni.navigateTo({
			url:`/pages/service/HouseInformation/ProtocalDetail?type=${14}`
		})
		
	};
	const open = (index:any) => {
				
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
	 .housetypeChoose{
	 	display: grid;
	 	grid-template-columns: repeat(2, 1fr); /* 两列 */
	 	grid-gap: 10px; /* 间距 */
	 	margin-left: 15px;
	 	margin-top: 15px;
	 	
	 }
	 .situation_contect {
	   display: flex;
	   flex-direction: row;
	   flex-wrap: wrap;
	   align-items: center;
	  margin-top: 15px;
	   justify-content: space-evenly;
	   .situation_item {
	     width: 60px;
	     font-size: 12px;
		 margin-left: 10px;
	 	 background-color: aliceblue;
		 border-radius: 4px;
	     color: #000;
	     box-sizing: border-box;
	     display: flex;
		 display: flex;
		 text-align: center;
		 justify-content: center;
	     flex-direction: column;
	     align-items: center;
	     height: 30px;
	 	 margin-bottom: 50upx;
		.item_text{
			margin-top: 4upx;
		}
	   }
	 }
	 .liangdianView{
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
		  align-items: center;
		  text-align: center;
		  display: flex;
	  }
    }
</style>