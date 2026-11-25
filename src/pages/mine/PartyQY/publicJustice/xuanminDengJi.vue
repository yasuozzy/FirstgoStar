<template>
    <view class="main">
        <u-navbar
          title="选民登记"
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
          <view slot="right" @click="historyClick()">
              <view class="homestayView">登记记录</view>
          </view>
		 </template> 
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民登记主题</view>
			<input class="searchlocation" v-model="title" placeholder="填写选民登记主题" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民登记内容</view>
		</view>
		<textarea class="textView" v-model="content" placeholder="填写选民登记内容"></textarea>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 20px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民登记流程</view>
			<input class="searchlocation" v-model="process_desc" placeholder="填写选民登记流程" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民登记要求</view>
			<input class="searchlocation" v-model="ask_desc" placeholder="填写选民登记要求" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="getFanwei()">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">征集范围</view>
			<view style="width: 190px;font-size: 15px;margin-top: 15px;color: dimgray;text-align: right;">{{fanweiString}}</view>
			<u-image style="margin-top: 20px;margin-left: 10px;"
			:src="downImage"
			width="15px"
			height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">起止日期</view>
			<view class="dateView" @click="show = true">{{startDate}}
				<u-datetime-picker
						title="事件时间"
			
			            :show="show"
			            v-model="value1"
			            mode="date"
						@confirm="handleConfirm"
						@cancel="show = false"
			    ></u-datetime-picker>
			</view>
			<view style="margin-top: 18px;margin-left: 10px;">——</view>
			<view class="dateView" @click="endshow = true">{{endDate}}
				<u-datetime-picker
						title="事件时间"
			
			            :show="endshow"
			            v-model="value1"
			            mode="date"
						@confirm="endConfirm"
						@cancel="endshow = false"
			    ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选民登记要求</view>
			<input class="searchlocation" v-model="source" placeholder="填写选民登记来源" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 15px;font-size: 15px;width: 100px;margin-left: 15px;">上传附件</view>
		<view class="imagechooseView">
			<x-native-uploader v-if="fileName.length == 0"
			
			name="multipartFile" 
			fileType="all"
			:header="{}"
			:limit="1"
			:url="loadFileUrl"
			:formData="{ key: 'multipartFile' }"
			
			@success="onUploadSuccess"
			@fail="onUploadFail"></x-native-uploader>
			<view v-if="fileName.length > 0" style="display: flex;flex-direction: row;">
				<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;" src="/src/static/mine/wenjian.png"></image>
				<text style="margin-top: 10px;margin-left: 10px;">{{ fileName }}</text>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="savebutton" @click="saveClick()">保存</view>
				<view class="fabubutton" @click="fabuClick()">发布</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyPublicJusticeGetFanWei,MinePartyPublicJusticeXuanMinSaveFabu,
	MinePartyPublicJusticeXuanMinDengJiInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseURL } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
	import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const title = ref('');
	const content = ref('');
	const process_desc = ref('');
	const ask_desc = ref('');
	const downImage = ref('/static/home/downImage.png');
	const fanweiString = ref('选择选民登记范围');
	const col_range = ref('');
	const fanweiDataList = ref([]);
	const fanweiTitleList = ref([]);
	const startDate = ref('选择开始日期');
	const endDate = ref('选择结束日期');
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const source = ref('');
	const filePath = ref('');
	const fileName = ref('');
	const loadFileUrl = BaseURL + 'Announce/addUploadIms';
	const idstring = ref('');
            
	onLoad((options:any) => {
		
		if (options.id) {
			idstring.value = decodeURIComponent(options.id);
			getDetailData();
		}
	});
	onMounted(() => {
	   init();
	});
	const init = async() => {
				
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				
			};
			const res = await MinePartyPublicJusticeGetFanWei(param);
							
				console.log(res);
				fanweiDataList.value = res.result;
				const result = res.result;         
				fanweiTitleList.value = result.map(item => item.man_name);
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const getDetailData = async() => {
				
		try {
			
			let param = {
				
				id:idstring.value,
				
			};
			const res = await MinePartyPublicJusticeXuanMinDengJiInfo(param);
							
				console.log(res);
				const result = res.result;
				title.value = result.title;
				content.value = result.content;
				process_desc.value = result.process_desc;
				ask_desc.value = result.ask_desc;
				col_range.value = result.col_range;
				fanweiString.value = result.man_name;
				startDate.value = result.start_date;
				endDate.value = result.end_date;
				source.value = result.source;
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const getFanwei = () => {
		uni.showActionSheet({
			itemList:  fanweiTitleList.value,
			success: (res) => {
				
				 fanweiString.value =  fanweiTitleList.value[res.tapIndex]
				 col_range.value =  fanweiDataList.value[res.tapIndex].man_id;
				console.log( col_range.value);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	
	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startDate.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		show.value = false;
	};
	//离店日期
	const endConfirm = (e:any) => {
		const date = new Date(e.value);
		endDate.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		endshow.value = false;
	};
	const onUploadSuccess = (res:any) => {
	  console.log('上传成功', res);
	  // 假设返回结构为 { data: '文件路径', ... }
	  const response = JSON.parse(res.response);
	  if (response.result == true) {
		filePath.value = response.data;
		fileName.value = res.file.name;
		console.log(filePath.value,fileName.value);
		uni.showToast({
			title:'文件上传成功',
			icon:'none'
		});

		
	  }
	};
	
	const onUploadFail = (err:any) => {
	  console.error('上传失败', err)
	};

	//保存
	const saveClick= async() => {
				
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				title: title.value,
				content: content.value,
				process_desc: process_desc.value,
				ask_desc: ask_desc.value,
				files_path: files_path.value,
				files_name: files_name.value,
				col_range: col_range.value,
				start_date: startDate.value,
				end_date: endDate.value,
				source: source.value,
				save_type:0,
				
			};
			const res = await MinePartyPublicJusticeXuanMinSaveFabu(param);
							
				console.log(res);
				historyClick();
			
		}catch (error) {
			console.log(error)
		}
	};
	//发布
	const fabuClick = async() => {
				
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				title: title.value,
				content: content.value,
				process_desc: process_desc.value,
				ask_desc: ask_desc.value,
				files_path: files_path.value,
				files_name: files_name.value,
				col_range: col_range.value,
				start_date: startDate.value,
				end_date: endDate.value,
				source: source.value,
				save_type:1,
				
			};
			const res = await MinePartyPublicJusticeXuanMinSaveFabu(param);
							
				console.log(res);
				historyClick();
			
		}catch (error) {
			console.log(error)
		}
	};
	const historyClick = () => {
				
		uni.navigateTo({
			url:'/pages/mine/PartyQY/publicJustice/xuanminDengJiNotes'
		})
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
	 .searchlocation{
	 	  margin-left: 10px;
	 	  width: 250px;
	 	  height: 35px;
	 	  margin-top: 10px;
	 	  border-radius: 5px;
	 	  font-size: 13px;
	   }
	 .textView{
	 	margin-top: 10px;
	 	margin-left: 4%;
	 	width: 92%;
	 	height: 100px;
	 	border: lightgray 1px solid;
	 	font-size: 13px;
	 }
	 .dateView{
	 	width: 90px;
	 	margin-left: 10px;
	 	font-size: 14px;
	 	margin-top: 15px;
	 	color: dimgray;
	 	height: 30px;
	 	border: 1px solid black;
	 	text-align: right;
	 	display: flex;
	 	justify-content: center;
	 	align-items: center;
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
	         .savebutton {
	                      
	             display: flex;
	             justify-content: center; /* 水平居中 */
	             align-items: center;     /* 垂直居中 */
	             height: 35px;           /* 需要设置高度 */
	             width: 30%;
	             margin-right: 10px;
	             font-size: 13px;
	             color: white;
	             background-color: #2A9595;
	             border-radius: 6px;
	             margin-left: 10%;
	             margin-top: 15px;
	         }
	 		.fabubutton {
	 		             
	 		    display: flex;
	 		    justify-content: center; /* 水平居中 */
	 		    align-items: center;     /* 垂直居中 */
	 		    height: 35px;           /* 需要设置高度 */
	 		    width: 30%;
	 		    margin-right: 10px;
	 		    font-size: 13px;
	 		    color: white;
	 		    background-color: #2A9595;
	 		    border-radius: 6px;
	 		    margin-left: 20%;
	 		    margin-top: 15px;
	 		}
			.imagechooseView{
			            margin-top: 10px;
			            margin-left: 5%;
			            width: 90%;
			            margin-bottom: 20px;
			        }
    }
</style>