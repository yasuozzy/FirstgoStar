<template>
    <view class="main">
        <u-navbar
          title="发起选举"
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
				  <view class="homestayView">选举记录</view>
			  </view>
		  </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选举主题</view>
			<input class="searchlocation" v-model="title" placeholder="填写选民登记主题" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选举内容</view>
		</view>
		<textarea class="textView" v-model="content" placeholder="填写选举内容"></textarea>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 20px;"></view>
		
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选举模式</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="modelvalue"
			  placement="row"
			  @change="modelChange"
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in modellist"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="getFanwei()">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">征集范围</view>
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
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">起止日期</view>
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
			<view style="margin-top: 15px;font-size: 15px;width: 100px;">选举来源</view>
			<input class="searchlocation" v-model="source" placeholder="填写选举来源" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view >
			<view style="display: flex;flex-direction: row;width: 100%;">
				
				<view style="margin-top: 15px;font-size: 15px;width: 250px;margin-left: 15px;">公示名单列表</view>
				<view class="addButton" @click="addPerson()">新增参选人</view>
			</view>
			<view v-if="resultList.length > 0" style="display: flex;flex-direction: row;width: 100%;margin-top: 20px;">
				<view style="margin-left: 4%;width: 23%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">参选人姓名</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 23%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">参选人照片</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 23%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">参选人信息</view>
				<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
				<view style="width: 23%;background-color: red;height: 40px;color: white;font-size: 15px;display: flex;justify-content: center;align-items: center;">操作</view>
			</view>
			<view v-if="resultList.length > 0" style="display: flex;flex-direction: column;">
				<view class="ticketItem" v-for="(item,index) in resultList">
					<view style="margin-left: 4%;width: 23%;border: 0.5px solid gray;height: 80px;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">{{item.user_name}}</view>
					<view style="width: 23%;height: 80px;border: 0.5px solid gray;color: black;font-size: 15px;display: flex;justify-content: center;align-items: center;">
						<u-image
						:src="item.photo_path"
						width="60px"
						height="60px"
						></u-image>
					</view>
					<view style="width: 23%;height: 80px;border: 0.5px solid gray;color: black;font-size: 13px;display: flex;justify-content: center;align-items: center;" @click="checkingXuanmin(item)">查看选民信息</view>
					<view style="width: 23%;height: 80px;border: 0.5px solid gray;color: black;font-size: 15px;display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<view style="font-size: 13px;color: #2A9595;" @click="editClick(index)">修改</view>
						<view style="font-size: 13px;color: #2A9595;margin-left: 8px;" @click="deleteClick(index)">删除</view>
					</view>
				</view>
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
	
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
     import { onLoad } from '@dcloudio/uni-app';
	import {MinePartyPublicJusticeFaQiXuanJuFanWei,MinePartyPublicJusticeFaBuSaveXuanJu,
	MinePartyPublicJusticeXuanMinDengJiInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
   
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
	const files_path = ref('');
	const files_name = ref('');
	const idstring = ref('');
	const modellist = ref([
	  {
		name: "每户一票",
		disabled: true,
	  },
	  {
		name: "每人一票",
		disabled: false,
	  },
	]);
	const modelvalue = ref("每户一票");
	const mode = ref(0);
	const resultList = ref([]);
				
          
	onMounted(() => {
		
		init();
	  // 监听事件
	  eventBus.on('refresh-address', handleRefresh);
	});
	onUnmounted(() => {
	  // 组件卸载时，务必移除监听！
	  eventBus.off('refresh-address', handleRefresh);
	});	
	onLoad((options:any) => {
			
		if (options.id) {
			idstring.value = decodeURIComponent(options.id);
			getDetailData();
		}
	});
    const init = async() => {
				
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				
			};
			const res = await MinePartyPublicJusticeFaQiXuanJuFanWei(param);
							
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
			
			resultList.value = result.electionList.map(item => ({
				...item,
				photo_path: item.photo_path ? `${BaseImgURL}/${item.photo_path.replace(/^\//, '')}` : '/default.jpg'
			}));
		   
		}catch (error) {
			console.log(error)
		}
	};
	const modelChange = (e:any) => {
				
		console.log(e);
		if (e === '每户一票') {
			
			 mode.value = 0;
			
		}else if (e == '每人一票') {
			
			 mode.value = 1;
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
		endDate.value= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		endshow.value= false;
	};
	//添加选民
	const addPerson = () => {
		uni.navigateTo({
			url:'/pages/mine/PartyQY/publicJustice/xuanjuAddXuanMin'
		})
	};
	const handleRefresh = (data:{}) => {
		console.log('收到刷新事件:', data)
		resultList.value.push(data);
	};
	//保存
	const saveClick = async() => {
				
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				title: title.value,
				content: content.value,
				mode: mode.value,
				col_range: col_range.value,
				start_date: startDate.value,
				end_date: endDate.value,
				source: source.value,
				status:0,
				electionList:JSON.stringify( resultList),
				
			};
			const res = await MinePartyPublicJusticeFaBuSaveXuanJu(param);
							
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
				mode: mode.value,
				col_range: col_range.value,
				start_date: startDate.value,
				end_date: endDate.value,
				source: source.value,
				status:1,
				electionList:JSON.stringify( resultList),
				
			};
			const res = await MinePartyPublicJusticeFaBuSaveXuanJu(param);
							
			console.log(res);
			historyClick();
			
		}catch (error) {
			console.log(error)
		}
	};
	//查看选民信息
	const checkingXuanmin = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/checkXuanminInfo?dataDict=${JSON.stringify(item)}`
		})
	};
	const historyClick = () => {
				
		uni.navigateTo({
			url:'/pages/mine/PartyQY/publicJustice/xuanjuNotes'
		})
	};
	//修改
	const editClick = (index:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/xuanjuAddXuanMin?dataDict=${JSON.stringify(resultList.value[index])}`
		})
	};
	//删除
	const deleteClick = (index:any) => {
		 resultList.value.splice(index, 1);
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
			.addButton{
				margin-top: 15px;
				margin-left: 15px;
				color: white;
				background-color: #2A9595;
				height: 30px;
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 80px;
				border-radius: 5px;
			}
			.ticketItem{
				 display: flex;
				 flex-direction: row;
				 width: 100%;
				 height: 40px;
			}
    }
</style>