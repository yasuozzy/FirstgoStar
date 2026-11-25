<template>
    <view class="main">
        <u-navbar
          title="意见征集"
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
              <view class="homestayView">征集记录</view>
          </view>
		</template>
        </u-navbar>
		<view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">意见征集主题</view>
			<input class="searchlocation" v-model="title" placeholder="填写意见征集主题" type="text" />
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">意见征集内容</view>
		</view>
		<textarea class="textView" v-model="content" placeholder="填写意见征集内容"></textarea>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 20px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">意见类型</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="radiovalue6"
			  placement="row"
			  @change="groupChange"
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in radiolist6"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		
		<view v-if="radiovalue6 === '选择类'" style="width: 100%;">
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">意见选择</view>
				<view style="display: flex;flex-direction: column;">
					<view class="opinoinView" v-for="(item,index) in tijiaoOpinion" :key="index">
						<view class="AddView" @click="addClick()">+</view>
						<input class="opnionView" v-model="item.opinon" placeholder="填写选择名称，如赞成等" type="text" />
						<view v-if="index > 0" class="AddView" @click="minusClick(index)">-</view>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">填写意见</view>
				<u-radio-group style="margin-top: 10px;"
				  v-model="Writevalue"
				  placement="row"
				  @change="writeChange"
				>
				  <u-radio
				    :customStyle="{ marginRight: '16px' }"
				    v-for="(item, index) in WriteOpinion"
				    :key="index"
				    :label="item.name"
				    :name="item.name"
					active-color="#2A9595"
				  >
				  </u-radio>
				</u-radio-group>
			</view>
			<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;">
				<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
				<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">征集模式</view>
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
			<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;" @click="getFanwei()">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">征集范围</view>
			<view style="width: 190px;font-size: 15px;margin-top: 15px;color: dimgray;text-align: right;">{{fanweiString}}</view>
			<u-image style="margin-top: 15px;margin-left: 10px;"
			:src="downImage"
			width="15px"
			height="8px"
			></u-image>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
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
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;color: red;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 100px;">征集来源</view>
			<input class="searchlocation" v-model="source" placeholder="填写意见征集来源" type="text" />
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
	import {MinePartyPublicJusticeGetFanWei,
	MinePartyPublicJusticeOpinionSave,
	MinePartyPublicJusticeOpinionEdit} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const title = ref('');
	const content = ref('');
	const radiolist6 = ref([
	  {
		name: "选择类",
		disabled: false,
	  },
	  {
		name: "填写类",
		disabled: true,
	  },
	]);
	const radiovalue6 = ref("填写类");
	const choseType = ref(1);
	const fanweiString = ref('选择征集范围');
	const downImage = ref('/static/home/downImage.png');
	const startDate = ref('选择开始日期');
	const endDate = ref('选择结束日期');
	const show = ref(false);
	const endshow = ref(false);
	const value1 = ref(Number(new Date()));
	const fanweiDataList = ref([]);
	const fanweiTitleList = ref([]);
	const opinion = ref('');
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
	const range = ref('');
	const source = ref('');
	const idstring = ref('');
	const tijiaoOpinion = ref([{opinon:''}]);
	const opinionDataArr = ref([]);
          
	onLoad((options:any) => {
		
		if (options.id) {
			
			idstring.value = options.id;
			getDetail();
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
			const result = <[]>res.result;         
			fanweiTitleList.value = result.map(item => item.man_name);
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//编辑详情
	const getDetail = async() => {
				
		try {
			
			let param = {
				
				id:idstring.value,
				
			};
			const res = await MinePartyPublicJusticeOpinionEdit(param);
							
			console.log(res);
			const result = res.result;
			title.value = result.title;
			content.value = result.content;
			choseType.value = result.type;
			if ( choseType.value == 1) {
				
				 radiovalue6.value = "填写类";
				
			}else if ( choseType.value == 0) {
				
				 radiovalue6.value =  "选择类";
			}
			
			const optionList = res.result.optionList;
			
			tijiaoOpinion.value = optionList.map(item => ({ opinon: item }));
			
			 is_fill.value = result.is_fill;
			if ( is_fill.value == 1) {
				
				 Writevalue.value =  "是";
				
			}else if ( is_fill.value == 0) {
				
				 Writevalue.value =  "否";
			}
			 mode.value = result.mode;
			if ( mode.value == 0) {
				
				 modelvalue.value =  "每户一票";
				
			}else if ( mode.value == 1) {
				
				 modelvalue.value =  "每人一票";
			}
			 range.value = result.col_range;
			 startDate.value = result.start_date;
			 endDate.value = result.end_date;
			 source.value = result.source;
				
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const historyClick = () => {
				
		uni.navigateTo({
			url:'/pages/mine/PartyQY/publicJustice/yijianZhengJiNotes'
		})
	};
	const groupChange = (e:any) => {
				
		console.log(e);
		if (e === '选择类') {
			
			 choseType.value = 0;
			
		}else if(e === '填写类'){
			
			 choseType.value = 1;
			
		}
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
		endshow.value= false;
	};
	const getFanwei = () => {
		uni.showActionSheet({
			itemList:  fanweiTitleList.value,
			success: (res) => {
				
				 fanweiString.value =  fanweiTitleList.value[res.tapIndex]
				 range.value =  fanweiDataList.value[res.tapIndex].man_id;
				 console.log( range.value);
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	const writeChange = (e:any) => {
				
		console.log(e);
		if (e === '是') {
			
			 is_fill.value = 1;
			
		}else if (e == '否') {
			
			 is_fill.value = 0;
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
	const saveClick = async() => {
				
		const opnionstring =  opinionDataArr.value.join(',');
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				title: title.value,
				content: content.value,
				type: choseType.value,
				options: opnionstring,
				is_fill: is_fill.value,
				mode: mode.value,
				col_range: range.value,
				start_date: startDate.value,
				end_date: endDate.value,
				source: source.value,
				save_type:0,
				
			};
			const res = await MinePartyPublicJusticeOpinionSave(param);
							
			console.log(res);
			historyClick();
			
		}catch (error) {
			console.log(error)
		}
	};
	const fabuClick = async() => {
				
		const opnionstring =  opinionDataArr.value.join(',');
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				title: title.value,
				content: content.value,
				type: choseType.value,
				options: opnionstring,
				is_fill: is_fill.value,
				mode: mode.value,
				col_range: range.value,
				start_date: startDate.value,
				end_date: endDate.value,
				source: source.value,
				save_type:1,
				
			};
			const res = await MinePartyPublicJusticeOpinionSave(param);
							
				console.log(res);
				historyClick();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//添加意见
	const addClick = () => {
				
		const dict = {opinon:''};
		 tijiaoOpinion.value.push(dict);
		for (var index = 0; index <  tijiaoOpinion.value.length; index++) {
			var element = tijiaoOpinion.value[index];
			 opinionDataArr.value.push(element.opinon);
		}
	};
	//删除意见
	const minusClick = (index:any) => {
				
		tijiaoOpinion.value =  tijiaoOpinion.value.filter((item, i) => i !== index);
		console.log( tijiaoOpinion);
		for (var dindex = 0; dindex <  tijiaoOpinion.value.length; dindex++) {
			var element = tijiaoOpinion.value[dindex];
			 opinionDataArr.value.push(element.opinon);
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
	.AddView{
		margin-left: 10px;
		margin-top: 12px;
		width: 26px;
		height: 26px;
		border-radius: 13px;
		background-color: #2A9595;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}
	.opnionView{
		margin-left: 10px;
		width: 150px;
		height: 35px;
		margin-top: 10px;
		border-radius: 5px;
		font-size: 13px;
		border: 1px black solid;
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
			.opinoinView{
				display: flex;
				flex-direction: row;
			}
    }
</style>