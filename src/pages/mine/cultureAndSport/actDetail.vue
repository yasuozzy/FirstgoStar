<template>
    <view class="main">
        <u-navbar
          title="选择项目"
          
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
              <view slot="right" @click="notesClick()">
					<view style="color: white;font-size: 13px;">预约记录</view>
              </view>
        </template>
        </u-navbar>
		<view class="specsView">
		        <!-- 简约的 v-for 循环渲染 -->
			<view
				v-for="(item,index) in tabList"
				:key="index"
				class="tab-item"
				@click="handleTabClick(item,index)"
			>
				<view
					:style="{
						color: type === index+1 ? '#2A9595' : 'black',
						fontSize: '14px'
					}"
				>
					{{ item.goods_name }}
				</view>
				<view class="whiteLine" v-if="type === index+1"></view>
			</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 5px;background-color: aliceblue;"></view>
		<view v-if="tabList.length > 0" style="display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">选择预约日期:</view>
			<view style="border: 1px solid black;width: 200px;height: 25px;align-items: center;margin-top: 10px;margin-left: 10px;justify-content: center;display: flex;">
				<view style="font-size: 13px;" @click="show = true">{{startTime}}
					<u-datetime-picker
					title="请选择日期"
					
				                :show="show"
				                v-model="value1"
				                mode="date"
								@confirm="handleConfirm"
								@cancel="show = false"
				        ></u-datetime-picker>
				</view>
			</view>
		</view>
		<view v-if="tabList.length > 0" style="margin-top: 10px;margin-left: 15px;font-size: 13px;margin-bottom: 15px;">选择预约时段:</view>
		<view  style="width: 100%;height: auto;display: flex;flex-direction: column;background-color: aliceblue;min-height: 100vh;">
			
			<view v-if="mornList.length > 0" style="margin-left: 4%;width: 92%;background-color: white;margin-top: 10px;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">上午</view>
				<view style="display: flex;flex-direction: row;" v-for="(item,index) in mornList" :key="index">
					<view style="width: 70%;margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.start_hour}}---{{item.end_hour}}</view>
					<view v-if="item.can_pre === 1" class="yuyueButton" @click="yuyueClick(item)">可预约</view>
					<view v-else class="yuyueButton" style="background-color: dimgray;">预约已满</view>
				</view>
			</view>
			<view v-if="aftnHList.length > 0" style="margin-left: 4%;width: 92%;background-color: white;margin-top: 10px;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">下午</view>
				<view style="display: flex;flex-direction: row;" v-for="(item,index) in aftnHList" :key="index">
					<view style="width: 70%;margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.start_hour}}---{{item.end_hour}}</view>
					<view v-if="item.can_pre === 1" class="yuyueButton" @click="yuyueClick(item)">可预约</view>
					<view v-else class="yuyueButton" style="background-color: dimgray;">预约已满</view>
				</view>
			</view>
			<view v-if="evenHList.length > 0" style="margin-left: 4%;width: 92%;background-color: white;margin-top: 10px;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 10px;">晚上</view>
				<view style="display: flex;flex-direction: row;" v-for="(item,index) in evenHList" :key="index">
					<view style="width: 70%;margin-top: 10px;margin-left: 10px;font-size: 13px;">{{item.start_hour}}---{{item.end_hour}}</view>
					<view v-if="item.can_pre === 1" class="yuyueButton" @click="yuyueClick(item)">可预约</view>
					<view v-else class="yuyueButton" style="background-color: dimgray;">预约已满</view>
				</view>
			</view>
		</view>
		<u-modal :show="modelshow" @confirm="yuyueconfirm" :title="title" confirm-text="确认预约" :show-cancel-button="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">选择预约方式:</view>
					<view style="border: 1px solid black;width: 150px;height: 25px;align-items: center;margin-top: 10px;margin-left: 10px;justify-content: center;display: flex;font-size: 13px;" @click="choseChargeType">{{changetitle}}
					</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">兑换金额:</view>
					<view style="width: 150px;height: 25px;align-items: center;margin-top: 10px;margin-left: 10px;justify-content: center;display: flex;color: #2A9595;font-size: 13px;">{{chargeMoney}}
					</view>
				</view>
			</view>
		</u-modal>
		<u-modal :show="yueshow" @confirm="chongzhifirm" confirmText="确认" :title="yuetitle" :showCancelButton="true" @cancel="chongzhicancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				是否充值？
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsCultureAndSportsDetail,
	MineNeedToolsCultureAndSportsGetHours,
	MineNeedToolsCultureAndSportsYuYue} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const act_id = ref('');
	const dataDict = ref({});
	const type = ref(1);
	const tabList = ref([]);
	const startTime = ref('请选择日期');
	const show = ref(false);
	const value1 = ref(Number(new Date()));
	const goodsList = ref([]);
	const itemDict = ref({});
	const mornList = ref([]);
	const aftnHList = ref([]);
	const evenHList = ref([]);
	const modelshow = ref(false);
	const title = ref('请选择');
	const is_free = ref();
	const changetitle = ref('请选择');
	const chargeMoney = ref();
	const yuyueItem = ref({});
	const goods_name = ref('');
	const cash_pay = ref('');
	const main_id = ref('');
	const sku_id = ref('');
	const shop_id = ref('');
	const goods_sku = ref('');
	const adv_pay = ref('');
	const score_pay = ref('');
	const amount = ref();
	const exc_way = ref();
	const itemList = ref(['积分兑换', '现金兑换', '预付兑换']);
	const yueshow = ref(false);
	const yuetitle = ref('预付余额不足');
	
	onLoad((options:any) => {
		
		act_id.value = options.act_id;
	});
	onMounted(() => {
		
		loadData();
	});
	const loadData = async() => {
		
		try {
			
			let param = {
				
				id:act_id.value
				
			};
			const res = await MineNeedToolsCultureAndSportsDetail(param);
							
			console.log(res);
			// dataDict.value = res.result;
			tabList.value = res.result;
			itemDict.value = tabList.value[0];
					   
		}catch (error) {
			console.log(error)
		}
	};
	const handleTabClick = (item:any,index:any) => {
		type.value = index+1;
		// 可在此处触发父组件事件或业务逻辑
		// this.$emit('tabChange', type);
		console.log('切换到标签：', type.value);
		mornList.value = [];
		aftnHList.value = [];
		evenHList.value = [];
		startTime.value = '请选择日期';
		itemDict.value = item;
		
    };
	//开始时间获取
	const handleConfirm = (e:any) => {
		
		const date = new Date(e.value);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		startTime.value = `${year}-${month}-${day}`;
		show.value = false;
		//通过item数据请求预约时间段
		gettimecut(itemDict.value);
	};
	const gettimecut = async(item:any) => {
		
		try {
			
			let param = {
				
				sku_id:item.sku_id,
				main_id:item.main_id,
				user_id:storage.getUserId(),
				cho_date:startTime.value
				
			};
			const res = await MineNeedToolsCultureAndSportsGetHours(param);
							
			console.log(res);
			const resultData = res.result;
			mornList.value = resultData.mornList;
			aftnHList.value = resultData.aftnHList;
			evenHList.value = resultData.evenHList;
			is_free.value = resultData.is_free;
			goods_name.value = resultData.goods_name; 	
			cash_pay.value = resultData.cash_pay;
		    main_id.value = resultData.main_id;
		    sku_id.value = resultData.sku_id;
		    shop_id.value = resultData.shop_id;
		    goods_sku.value = resultData.goods_sku;
		    adv_pay.value = resultData.adv_pay;
		    score_pay.value = resultData.score_pay;
				   
			
		}catch (error) {
			console.log(error)
		}
	};
	const choseChargeType = () => {
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				changetitle.value = itemList.value[res.tapIndex];
				exc_way.value = res.tapIndex+1;
				if(res.tapIndex === 0){
					
					chargeMoney.value = score_pay.value;
					
				}else if(res.tapIndex === 1){
					
					chargeMoney.value = cash_pay.value;
					
				}else if(res.tapIndex === 2){
					
					chargeMoney.value = adv_pay.value;
				}
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const yuyueClick = (item:any) => {
		
		yuyueItem.value = item;
		if(is_free.value === 1){
			
			exc_way.value = 0;
			amount.value = 0;
			yuyueconfirm();
		}else
		{
			modelshow.value = true;
			
		}
	};
	const cancelClick = () => {
		modelshow.value = false;
	};
	const yuyueconfirm = async() => {
		
		try {
			
			let param = {
				
				sku_id:sku_id.value,
				main_id:main_id.value,
				user_id:storage.getUserId(),
				pre_date:startTime.value,
				hour_id:yuyueItem.value.hour_id,
				start_hour:yuyueItem.value.start_hour,
				end_hour:yuyueItem.value.end_hour,
				amount:amount.value,
				goods_sku:goods_sku.value,
				goods_name:goods_name.value,
				shop_id:shop_id.value,
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
				exc_way:exc_way.value
				
			};
			const res = await MineNeedToolsCultureAndSportsYuYue(param);
							
			console.log(res);
			
			if(res.success === 1){
				
				if(exc_way.value === 1 || exc_way.value === 2){
					
					uni.navigateTo({
					    url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
					})
				
				}else{
					
					//预约记录
					uni.navigateTo({
						url:'/pages/mine/cultureAndSport/yuyueOrderList'
					})
				}
			}else
			{
				if(res.message === '预付余额不足'){
					
					yueshow.value = true;
				}
			}
			
					   
		}catch (error) {
			console.log(error);
			
		}
	};
	
	//预付余额不足，去充值
	const chongzhifirm = () => {
		uni.navigateTo({
		    url: "/pages/mine/PrepaidWalletPage/prepayRechargePage"
		  });
	};
	//取消充值
	const chongzhicancelClick = () => {
		yueshow.value = false;
	};
	const notesClick = () => {
		//预约记录
		uni.navigateTo({
			url:'/pages/mine/cultureAndSport/yuyueOrderList'
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
		  .specsView{
		  	 width: 100%;
		  	 height: 40px;
		  	 display: flex;
		  	 flex-direction: row;
		  	 
		  	 background-color: white;
		  	 margin-top: 10px;
		  	}
		  .tab-item {
			  flex: 1;
			  /* 替代原来的 width: 16.66% */
			  display: flex;
			  flex-direction: column;
			  text-align: center;
			  margin-top: 10px;
			  cursor: pointer;
			  /* 提升交互体验 */
		  }
		  
		  .whiteLine {
			  height: 2px;
			  background-color: #2a9595;
			  width: 60%;
			  margin: 4px auto 0;
			  margin-top: 8px;
			  /* 居中并留出间距 */
			  border-radius: 2px;
		  }
		  
		  .timeView{
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  background-color: white;
			  border-radius: 4px;
		  }
		  .yuyueButton{
			  background-color: #2A9595;
			  color: white;
			  font-size: 13px;
			  border-radius: 4px;
			  width: 80px;
			  height: 25px;
			  margin-top: 10px;
			  display: flex;
			  text-align: center;
			  align-items: center;
			  justify-content: center;
			  margin-bottom: 15px;
		  }
}
</style>