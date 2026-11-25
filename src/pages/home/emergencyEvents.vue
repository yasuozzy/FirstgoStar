<template>
    <view class="main">
        <u-navbar
          title="应急事件"
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
          <view slot="right" @click="eventsClick">
              <view class="homestayView">事件跟踪</view>
          </view>
		 </template>
        </u-navbar>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 80%;">开启定位</view>
			<switch color="#2A9595" checked="true" style="transform:scale(0.6);align-items: right;margin-top: 5px;" @change="switchChange" />
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;">事件类型</view>
			<view style="margin-top: 5px;width: 100%;height: 30px;">
				<uni-data-select 
				  v-model="value1"
				  :localdata="range1"
				  @change="change"
				  placeholder="选择事项类型"
				></uni-data-select>
			</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;">所在网格</view>
			<view style="margin-top: 5px;width: 100%;height: 30px;display: flex;flex-direction: row;">
				<uni-data-select 
				  v-model="value2"
				  :localdata="range2"
				  @change="change"
				  placeholder="选择小区/村居"
				></uni-data-select>
				<uni-data-select
				  v-model="value3"
				  :localdata="range3"
				  @change="change"
				  placeholder="选择网格"
				></uni-data-select>
			</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">联系方式</view>
			<input class="searchlocation" placeholder="必填" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">事件时间</view>
			<view class="startView" @click="show = true">{{startTime}}
				<u-datetime-picker
				title="请选择事件时间"
				
			                :show="show"
			                v-model="value5"
			                mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">具体描述</view>
			<input class="searchlocation" placeholder="必填" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">事件位置</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 85px;">详细地址</view>
			<input class="searchlocation" placeholder="必填" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view class="formView">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 50%;margin-bottom: 10px;">事件处理</view>
			<view style="margin-top: 5px;width: 100%;height: 30px;margin-bottom: 10px;">
				<uni-data-select 
				  v-model="value4"
				  :localdata="range4"
				  @change="change"
				  placeholder="选择事项类型"
				></uni-data-select>
			</view>
			
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;"></view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: aliceblue;"></view>
		<view style="width: 100%;height: 30px;display: flex;flex-direction: row;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 13px;width: 80%;">是否加急</view>
			<switch color="#2A9595" checked="true" style="transform:scale(0.6);align-items: right;margin-top: 5px;" @change="switchChange" />
		</view>
		<view style="margin-left: 15px;margin-top: 15px;font-size: 13px;width: 80%;">上传图片</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;"></view>
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
		<view style="margin-left: 15px;margin-top: 15px;font-size: 13px;width: 80%;">语音录入</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 15px;margin-left: 4%;margin-bottom: 50px;"></view>
		<view class="footer-container">
		    <view style="display: flex;width: 100%;height: 80px;">
		               
		        <view class="order-button" @click="tijiaoClick">提交</view>
		    </view>
		            
		</view>
		
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	const selectphoto = ref('/static/mine/selectphoto.png');
	// 背景颜色
	const bgColor = ref("#2A9595");
	const value1 = ref(100);
	const range1 = ref([
			
			{ value: 0, text: "基础信息采集" },
			{ value: 1, text: "社情民意收集" },
			{ value: 2, text: "重点人员管理" },
			{ value: 3, text: "矛盾排查化解" },
			{ value: 4, text: "安全隐患排查" },
			{ value: 5, text: "政策法规宣传" },
			{ value: 6, text: "民生事项服务" },
			{ value: 7, text: "其他事项" },
	]);
	const value2 = ref(100);
	const range2 = ref([
			
			{ value: 0, text: "棚改区" },
			{ value: 1, text: "通惠家园" },
			{ value: 2, text: "高道村" },
			
	]);
	const value3 = ref(100);
	const range3 = ref([
			
			{ value: 0, text: "第一网格" },
			{ value: 1, text: "第二网格" },
			{ value: 2, text: "第三网格" },
			{ value: 3, text: "第四网格" },
			{ value: 4, text: "第五网格" },
			{ value: 5, text: "第六网格" },
			
	]);
	const startTime = ref("选择");
	const show = ref(false);
	const endshow = ref(false);
	const value5 = ref(Number(new Date()));
	const value4 = ref(100);
	const range4 = ref([
		
		{ value: 0, text: "派出所" },
		{ value: 1, text: "市场监督管理局" },
		{ value: 2, text: "安监所" },
		
		
	]);
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
	const finalImgValue = ref('');

            
	const goBack= () => {
			
		uni.navigateBack()
	};
	const switchChange = () => {
		
	};
	//时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startTime.value = `${date.getMonth()+1}月${date.getDate()}日`;
		show.value = false;
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
	//提交
	const tijiaoClick = () => {
				
	};
	//事件跟踪
	const eventsClick = () => {
		uni.navigateTo({
			url:'/pages/home/eventsTailafter'
		})
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
	 .formView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 30px;
	 }
	 .searchlocation{
		 
		 width: 250px;
		 font-size: 13px;
		 margin-top: 10px;
		 text-align: left;
		
	 }
	 .startView{
		 width: 250px;
		 height: 30px;
		 margin-top: 10px;
		 font-size: 13px;
	 }
	 .imagechooseView{
	         margin-top: 15px;
	         margin-left: 5%;
	         width: 90%;
	         height: 80px;
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
	      height: 60px;
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
	        height: 40px;           /* 需要设置高度 */
	        width: 80%;
	        font-size: 13px;
	        color: white;
	        background-color: #2A9595;
	        border-radius: 6px;
	        margin-left: 10%;
	        margin-top: 20px;
	    }
    }
</style>