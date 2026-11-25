<template>
    <view class="main">
        <u-navbar
          title="投票结果"
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
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">征集范围 {{dataDict.man_name}}</view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">征集来源 {{dataDict.source}}</view>
		<view v-if="dataDict.mode == '0'" style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">征集模式 每户一票</view>
		<view v-if="dataDict.mode == '1'" style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">征集模式 每人一票</view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 14px;">起止时间 {{dataDict.start_date}}--{{dataDict.end_date}}</view>
		<view style="margin-top: 20px;width: 100%;height: 10px;background-color: lightgray;"></view>
		<view style="margin-top: 15px;margin-left: 15px;width: 300px;font-size: 15px;">征集结果</view>
		
		<view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;">
				<view style="margin-left: 5%;width: 45%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">投票结果</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 45%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">票数</view>
			</view>
			<view style="display: flex;flex-direction: column;">
				<view class="ticketItem" v-for="(item,index) in resultList">
					<view style="margin-left: 5%;width: 45%;border: 1px solid gray;height: 40px;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">{{item.option_name}}</view>
					<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
					<view style="width: 45%;height: 40px;border: 1px solid gray;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">{{item.num}}票</view>
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
	
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MinePartyPublicJusticeVoteBiaoJueInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const idstring = ref('');
	const dataDict = ref({});
	const suggestList = ref([]);
	const resultList = ref([]);
            
	onLoad((options:any) => {
		
		idstring.value = decodeURIComponent(options.id);
	});
	onMounted(() => {
	    init();
	});
    const init = async() => {
				
		try {
			
			let param = {
				
				id: idstring.value
				
			};
			const res = await MinePartyPublicJusticeVoteBiaoJueInfo(param);
							
			console.log(res);
			dataDict.value = res.result;
			suggestList.value = res.result.suggestList;
			resultList.value = res.result.resultList;
			
		}catch (error) {
			console.log(error)
		}
	};
	//发布公示
	const fabuClick = () => {
				
		uni.navigateTo({
			url:'/pages/mine/PartyQY/publicJustice/voteGongShi?type=' +  dataDict.type + '&id=' +  dataDict.id
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
		 height: 40px;
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
    }
</style>