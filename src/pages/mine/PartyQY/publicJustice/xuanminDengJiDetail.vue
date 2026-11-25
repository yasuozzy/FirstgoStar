<template>
    <view class="main">
        <u-navbar
          title="征集结果"
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
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 16px;">{{dataDict.title}}</view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">{{dataDict.content}}</view>
		<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">选民登记流程 {{dataDict.process_desc}}</view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">选民登记要求 {{dataDict.ask_desc}}</view>
		<view  style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">选民登记来源 {{dataDict.source}}</view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">起止日期 {{dataDict.start_date}}--{{dataDict.end_date}}</view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">附件</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="fileItem" v-for="(item,index) in fileList" :key="index" @click="checkFileClick(item)">
				<image :src="fileImage" style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;"></image>
				<view style="font-size: 14px;margin-top: 10px;margin-left: 10px;">{{item.fileName}}</view>
			</view>
		</view>
		<view style="margin-top: 20px;width: 100%;height: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 15px;">选民登记结果</view>
		
		<view v-if="resultList.length > 0">
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;">
				<view style="margin-left: 5%;width: 30%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">选民姓名</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 30%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">选民照片</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 30%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">选民信息</view>
			</view>
			<view style="display: flex;flex-direction: column;">
				<view class="ticketItem" v-for="(item,index) in resultList">
					<view style="margin-left: 5%;width: 30%;border: 0.5px solid gray;height: 80px;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">{{item.user_name}}</view>
					<view style="width: 0.5px;height: 80px;background-color: lightgray;"></view>
					<view style="width: 30%;height: 80px;border: 0.5px solid gray;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">
						<u-image style="margin-top: 10px;margin-left: 10px;"
						  :src="item.photo_path"
						  width="60px"
						  height="60px"
						></u-image>
					</view>
					<view style="width: 0.5px;height: 80px;background-color: lightgray;"></view>
					<view style="width: 30%;height: 80px;border: 0.5px solid gray;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;" @click="checkXuanMin(item)">查看选民信息</view>
				</view>
			</view>
			
		</view>
		<view v-if="dataDict.status == 2" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="fabuClick()">发布公示</view>
			</view>
		</view>
		
		
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyPublicJusticeXuanMinDengJiInfo,MinePartyPublicJusticeXuanMinDengJiJieGuo} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const fileImage = ref('/static/mine/wenjian.png');
	const idstring = ref('');
	const dataDict = ref({});
	const suggestList = ref([]);
	const resultList = ref([]);
    const fileList = ref([]); 
	const selectedFile = ref(null);
	
	onLoad((options:any) => {
		
		 idstring.value = decodeURIComponent(options.id);
	});
	onMounted(() => {
	   init();
	   getJieGuoData();
	});
    const init = async() => {
				
		try {
			
			let param = {
				
				id: idstring.value
				
			};
			const res = await MinePartyPublicJusticeXuanMinDengJiInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			fileList.value = res.result.fileList;	
			
		}catch (error) {
			console.log(error)
		}
	};
	const getJieGuoData = async() => {
				
		try {
			
			let param = {
				
				id: idstring.value,
				page:1,
				size:10,
				
			};
			const res = await MinePartyPublicJusticeXuanMinDengJiJieGuo(param);
							
				console.log(res);
				
				resultList.value = res.result;
			
		}catch (error) {
			console.log(error)
		}
	};
	//查看选民信息
	const checkXuanMin = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/checkXuanMinDetail?dataDict=${JSON.stringify(item)}`
		})
	};
	//发布公示
	const fabuClick = () =>{
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/xuanminGongShi?id=${encodeURIComponent(idstring.value)}`
		})
	};
	const checkFileClick = (item:any) => {
		
		// selectedFile.value = item.filePath;
		uni.downloadFile({
		  url: item.filePath,
		  success: function (res) {
		    var filePath = res.tempFilePath;
		    uni.openDocument({
		      filePath: filePath,
		      showMenu: true,
		      success: function (res) {
		        console.log('打开文档成功');
		      }
		    });
		  }
		});
	};
	
	const goBack = () => {
			   
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
	 .listItem{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
	 }
	 .ticketItem{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
		 height: 80px;
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
			 .fileItem{
				 display: flex;
				 flex-direction: row;
				 width: 100%;
			 }
			 
    }
</style>