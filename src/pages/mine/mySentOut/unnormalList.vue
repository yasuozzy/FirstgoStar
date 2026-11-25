<template>
    <view class="main">
        <u-navbar
          title="异常运单详情"
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="margin-top: 10px;margin-left: 15px;color: darkred;font-size: 13px;">运单状态:异常</view>
		<view style="width: 100%;height: 5px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="width: 100%;height: 120px; display: flex;flex-direction: row;">
			<view style="display: flex;flex-direction: column;width: 20px;height: 100px;">
				<view style="margin-top: 10px;margin-left: 20px;width: 5px;height: 5px;border-radius: 2px;background-color: royalblue;"></view>
				<view style="width: 1px;margin-left: 22px;height: 80px;background-color: dimgray;"></view>
				<view style="margin-left: 20px;width: 5px;height: 5px;border-radius: 2px;background-color: orangered;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 300px;height: 100px;margin-left: 10px;">
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{startLocation}}</view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;width: 80%;">{{startDetail}}</view>
					<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;width: 15%;color: #2A9595;text-align: right;">选择</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
				<view style="margin-top: 10px;margin-left: 10px;font-size: 12px;">{{endLocation}}</view>
				<view style="width: 100%;display: flex;flex-direction: row;">
					<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;width: 80%;">{{endDetail}}</view>
					<view style="margin-top: 5px;margin-left: 10px;font-size: 11px;width: 15%;color: #2A9595;text-align: right;">选择</view>
				</view>
				
			</view>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">物品类型</view>
			<uni-data-select
			  v-model="value"
			  :localdata="range"
			  @change="change"
			  placeholder="文件"
			></uni-data-select>
		</view>
		<view style="width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;margin-left: 4%;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">物品重量</view>
			<input style="margin-top: 10px;font-size: 13px;margin-left: 10px;" type="text" placeholder="填写物品重量(kg)"/>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 15px;background-color: aliceblue;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">发货方式</view>
			<uni-data-select
			  v-model="value1"
			  :localdata="range1"
			  @change="change"
			  placeholder="文件"
			></uni-data-select>
		</view>
		<view style="width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;margin-left: 4%;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">支付方式</view>
			<uni-data-select
			  v-model="value2"
			  :localdata="range2"
			  @change="change"
			  placeholder="文件"
			></uni-data-select>
		</view>
		<view style="width: 92%;height: 1px;margin-top: 10px;background-color: lightgray;margin-left: 4%;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">快递公司</view>
			<uni-data-select
			  v-model="value3"
			  :localdata="range3"
			  @change="change"
			  placeholder="文件"
			></uni-data-select>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">运单号</view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{postNumber}}</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">运费</view>
			<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{postMoney}}元</view>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">填写运单异常原因</view>
		<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" placeholder="请填写异常原因">
		</textarea>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">上传图片</view>
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
		<view class="footer-container">
		    <view style="display: flex;flex-direction: row;width: 100%;height: 50px;">   
				<view class="order-button">上报原因</view>
		    </view>     
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const startLocation = ref('王丽 15689288001');
	const startDetail = ref('北门路南站牌处');
	const endLocation = ref('李宁 15689288056');
	const endDetail = ref('惠贤路依维柯南门');
	const value = ref(0);
	const range = ref([
			  { value: 0, text: "文件" },
			  { value: 1, text: "数码产品" },
			  { value: 2, text: "生活用品" },
			  { value: 3, text: "食品" },
			  { value: 4, text: "其他" },
	]);
	
	const value1 = ref(0);
	const range1 = ref([
			
			{ value: 0, text: "普通" },
			{ value: 1, text: "快速" },
			{ value: 1, text: "加急" },
			{ value: 1, text: "直达" },
	]);
	const value2 = ref(0);
	const range2 = ref([
			
			{ value: 0, text: "现付" },
			{ value: 1, text: "到付" },
			{ value: 1, text: "月付" },
	]);
	const value3 = ref(0);
	const range3 = ref([
			
			{ value: 0, text: "EMS" },
			{ value: 1, text: "邮政国内快运" },
			{ value: 1, text: "邮政快递包裹" },
			{ value: 1, text: "圆通快递" },
			{ value: 1, text: "韵达快递" },
			{ value: 1, text: "其他" },
	]);
	const postNumber = ref('9892874512');
	const postMoney = ref('0.00');
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
	const selectphoto = ref('/static/mine/selectphoto.png');
	const tempFilePaths = ref([]);
	const finalImgValue = ref('');
	
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
	.footer-container {
	      position: fixed;
	      bottom: 0;
	      left: 0;
	      right: 0;
	      height: 50px;
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
	        height: 30px;           /* 需要设置高度 */
	        width: 80%;
	        margin-right: 10px;
	        font-size: 13px;
	        color: white;
	        background-color: #2A9595;
	        border-radius: 6px;
	        margin-left: 10%;
	        margin-top: 10px;
	    }
    }
</style>