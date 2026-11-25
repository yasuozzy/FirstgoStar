<template>
    <view class="main">
        <u-navbar
          title="意见公示"
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
          <view slot="right" @click="historyClick">
              <view class="homestayView">公示记录</view>
          </view>
		</template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;" >
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选择意见公示</view>
			<view class="choosetitleView" @click="choseGongShi()">
				<view style="width: 80%;font-size: 15px;text-align: left;">{{chosetitle}}</view>
				<u-image style="margin-left: 10px;"
				:src="downImage"
				width="15px"
				height="8px"
				></u-image>
			</view>
			
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">意见征集主题</view>
			<input class="searchlocation" v-model="title" placeholder="填写意见征集主题" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">意见征集内容</view>
		</view>
		<textarea class="textView" v-model="content" placeholder="填写意见征集内容"></textarea>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">公示对象</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 200px;">{{man_name}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">公示单位</view>
			<input class="searchlocation" v-model="pub_unit" placeholder="填写公示单位" type="text" />
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">公示日期</view>
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
		</view>
		<view v-if="type == 1">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 15px;font-size: 15px;width: 240px;">公示结果</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: #2A9595;text-align: right;" @click="huizongClick">查看建议汇总</view>
			</view>
			<textarea class="textView" v-model="result_content" placeholder="请填写意见公示结果"></textarea>
			
		</view>
		<view v-if="type == 0">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 15px;font-size: 15px;width: 240px;">公示结果</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;">
				<view style="margin-left: 5%;width: 45%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">意见选择</view>
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
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="fabuClick()">发布</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyPublicJusticeGongShilWaitRelList,
	MinePartyPublicJusticeOpinionEdit,
	MinePartyPublicJusticeGongShilFaBuGongShi} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const chosetitle = ref('选择意见公示');
	const downImage = ref('/static/home/downImage.png');
	const title = ref('');
	const content = ref('');
	const man_name = ref('');
	const pub_unit = ref('');
	const pub_date = ref('');
	const col_range = ref('');
	const readList = ref([]);
	const titleList = ref([]);
	const idstring = ref('');
	const startDate = ref('选择公示日期');
	const show = ref(false);
	const value1 = ref(Number(new Date()));
	const type = ref(2);
	const resultList = ref([]);
	const result_content = ref('');
	const suggestList = ref([]);
            
	onLoad((options:any)  => {
		
		if (options.id) {
			
			type.value = options.type;
			getDetailData(options.id);
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
			const res = await MinePartyPublicJusticeGongShilWaitRelList(param);
							
			console.log(res);
			readList.value = res.result;
			titleList.value = res.result.map(item => item.title);
			
		}catch (error) {
			console.log(error)
		}
	};
	const choseGongShi = () => {
		uni.showActionSheet({
			itemList:  titleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log( itemList[res.tapIndex])
				chosetitle.value =  titleList.value[res.tapIndex];
				const id =  readList.value[res.tapIndex].id;
				getDetailData(id);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	const getDetailData = async(id:any) => {
				
		try {
			
			let param = {
				
				id:id,
				
			};
			const res = await MinePartyPublicJusticeOpinionEdit(param);
							
				console.log(res);
				chosetitle.value = res.result.title;
				title.value = res.result.title;
				content.value = res.result.content;
				man_name.value = res.result.man_name;
				type.value = res.result.type;
				col_range.value = res.result.col_range;
				resultList.value = res.result.resultList;
				suggestList.value = res.result.suggestList;
				
		}catch (error) {
			console.log(error)
		}
	};
	//开始时间获取
	const handleConfirm = (e:any) => {
		const date = new Date(e.value);
		startDate.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		show.value = false;
	};
	const fabuClick = async() => {
		
		if ( title.value.length == 0) {
			
			uni.showToast({
				title:'请选择意见公示'
			});
			return;
		}
		if ( content.value.length == 0) {
			
			uni.showToast({
				title:'请填写意见公示内容'
			});
			return;
		}
		if ( pub_unit.value.length == 0) {
			
			uni.showToast({
				title:'请填写公示单位'
			});
			return;
		}
		if ( type.value == 1) {
			
			if ( result_content.value.length == 0) {
				
				uni.showToast({
					title:'请填写意见公示结果'
				});
				return;
			}
			
		}
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				collect_id: idstring.value,
				type: type.value,
				title: title.value,
				content: content.value,
				col_range: col_range.value,
				pub_unit: pub_unit.value,
				pub_date: pub_date.value,
				result_content: result_content.value,
				
			};
			const res = await MinePartyPublicJusticeGongShilFaBuGongShi(param);
							
			console.log(res);
			historyClick();
			
		}catch (error) {
			console.log(error)
		}
	};
	const historyClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/PartyQY/publicJustice/yijianGongShiList'
		})
	};
	//汇总
	const huizongClick = () => {
		
		if (suggestList.value.length > 0) {
			
			uni.navigateTo({
				url:`/pages/mine/PartyQY/publicJustice/yijianHuiZong?suggestList=${encodeURIComponent(JSON.stringify(suggestList.value))}`
			})
		}
		
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
	 .choosetitleView{
		 width: 220px;
		 font-size: 15px;
		 margin-top: 15px;
		 color: dimgray;
		 text-align: right;
		 border: 1px solid dimgray;
		 height: 30px;
		 display: flex;
		 flex-direction: row;
		 margin-left: 15px;
		 align-items: center;
		 display: flex;
		 
	 }
	 .dateView{
	 	width: 180px;
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
	 .textView{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 100px;
		 border: lightgray 1px solid;
		 font-size: 13px;
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