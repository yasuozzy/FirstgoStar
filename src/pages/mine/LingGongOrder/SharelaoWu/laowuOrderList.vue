<template>
    <view class="main">
        <u-navbar
          title="我的工单"
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
			  <view slot="right" @click="personalClick()">
				  <u-image
					:src="myImage"
					width="20px"
					height="20px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;background-color: white;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 80%;">接单状态</view>
			<switch color="#2A9595" :checked="jiedanStatus" style="transform:scale(0.8);align-items: right;margin-top: 10px;" @change="switchChange" />
		</view>
		<view style="width: 100%;height: 10px;background-color: white;"></view>
		<view style="width: 100%;height: 1px;background-color: lightgray;"></view>
		<view class="specsView">
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">待接单</view>
				<view v-else style="color: black;font-size: 13px;">待接单</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">工作中</view>
				<view v-else style="color: black;font-size: 13px;">工作中</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type === '4'" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="type === '4'"></view>
			</view>
			<view style="width: 20%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment5Click">
				<view v-if="type === '5'" style="color: #2A9595;font-size: 13px;">已停止</view>
				<view v-else style="color: black;font-size: 13px;">已停止</view>
				<view class="whiteLine" v-if="type === '5'"></view>
			</view>
			
		</view>
		<view v-if="type === '1'" class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="grabDetail(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.repair_industry}}</view>
					<view style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待处理</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修业主：{{item.repair_people}}{{item.phone}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.repair_time}}</view>
				<view v-if="item.tache == 1 & item.state == 1 & item.maintain_type == 1" class="specsView1">应急类型:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 1 & item.maintain_type == 2" class="specsView1">报修项目:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 1 & item.maintain_type == 3 || item.maintain_type == 4" class="specsView1">公共设施:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 2 & item.maintain_type == 1" class="specsView1">应急类型:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 2 & item.maintain_type == 2" class="specsView1">报修项目:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 2 & item.maintain_type == 3 || item.maintain_type == 4" class="specsView1">公共设施:{{item.typeName}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view  class="bottomview">
					<view class="buttonView" @click="grabOrder(item)">抢 单</view>
				</view>
				
			</view>
		</view>
		<view v-if="type === '2'" class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.repair_industry}}</view>
					<view style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待处理</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修业主：{{item.repair_people}}{{item.phone}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.repair_time}}</view>
				<view v-if="item.tache == 1 & item.state == 1 & item.maintain_type == 1" class="specsView1">应急类型:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 1 & item.maintain_type == 2" class="specsView1">报修项目:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 1 & item.maintain_type == 3 || item.maintain_type == 4" class="specsView1">公共设施:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 2 & item.maintain_type == 1" class="specsView1">应急类型:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 2 & item.maintain_type == 2" class="specsView1">报修项目:{{item.typeName}}</view>
				<view v-if="item.tache == 1 & item.state == 2 & item.maintain_type == 3 || item.maintain_type == 4" class="specsView1">公共设施:{{item.typeName}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				
				<view class="bottomview">
					<view  class="buttonrefuse">拒绝</view>
					<view  class="buttonget">认领</view>
				</view>
			</view>
		</view>
		<view v-if="type === '3'" class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.repair_industry}}</view>
					<view v-if="item.state == 1" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已接单</view>
					<view v-if="item.state == 2" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已报价</view>
					<view v-if="item.state == 3" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待支付</view>
					<view v-if="item.state == 4" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">维修中</view>
					<view v-if="item.state == 5" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已暂停</view>
					<view v-if="item.state == 6" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已追价</view>
					<view v-if="item.state == 7" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">待支付</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修业主：{{item.repair_people}}{{item.phone}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.repair_time}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修价格:{{item.total_money}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="item.tache == 2 & item.state == 4 & item.backhander_count == 0 & item.maintain_type != 3" class="bottomview">
					<view  class="buttonAdd">追加</view>
					<view  class="buttonstop" @click="stopClick(item)">停止</view>
					<view v-if="item.pause_count == 0" class="buttonszanting" @click="pauseClick(item)">暂停</view>
					<view v-if="item.pause_count >= 1" class="buttonsNozanting">暂停</view>
					<view  class="buttonget" @click="doneClick(item)">完成</view>
				</view>
				<view v-if="item.tache == 2 & item.state == 1 " class="bottomview">
					
					<view  class="buttonOneStop" @click="stopClick(item)">停止</view>
					<view  class="buttonszanting" @click="pauseClick(item)">暂停</view>
					<view  class="buttonget" @click="baojiaClick(item)">报价</view>
				</view>
				<view v-if="item.tache == 2 & item.state == 4 & item.maintain_type == 3" class="bottomview">
					
					<view  class="buttonOneStop" @click="stopClick(item)">停止</view>
					<view v-if="item.pause_count == 0" class="buttonszanting" @click="pauseClick(item)">暂停</view>
					<view v-if="item.pause_count >= 1" class="buttonsNozanting">暂停</view>
					<view  class="buttonget" @click="doneClick(item)">>完成</view>
				</view>
			</view>
		</view>
		<view v-if="type === '4' || type === '5'" class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 76%;">{{item.repair_industry}}</view>
					<view v-if="item.tache == 4" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已完成</view>
					<view v-if="item.tache == 5" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">已取消</view>
					<view v-if="item.tache == 6" style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">工单失败</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">报修业主：{{item.repair_people}}{{item.phone}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">创建时间:{{item.repair_time}}</view>
				<view v-if="item.tache == 4" class="specsView1">业主评价:{{item.score}}</view>
				<view v-if="item.tache == 5" class="specsView1">取消原因:暂无</view>
				<view v-if="item.tache == 6" class="specsView1">失败原因:{{item.end_content}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineJiuYeQunShareYuanLaoWuOrderChangeSwitch,
	MineGetEmergencyGrabOrderList,
	MineGetEmergencyOrderList,
	MineGetEmergencyGoGrabOrder,
	MineGetEmergencyEndWorkOrder,
	MineGetEmergencyPauseWorkOrder,
	MineGetEmergencyPassWorkOrder} from '@/api/mine';
	
    // 背景颜色
	const bgColor = ref("#2A9595");
	const myImage = ref('/static/service/myIconImage.png');
	const jiedanStatus = ref(false);
	const takeOrder = ref('');
	const type = ref('1');
	const orderList = ref([]);
	const hasMore = ref(true);    // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const stateStr = ref(0);
           
	onMounted(() => {
	
		jiedanStatus.value = storage.getTemporayTakeOrder();
		loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	});
	//上拉刷新
	onReachBottom(() => {
		
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		loadData();
	});
        
	const loadData = async() => {
		
		if (stateStr.value == 0) {
			
			//抢单订单
			try {
				
				let param = {
					userId:storage.getUserId(),
					page:page.value,
					size:20,
					id:storage.getTemporayId(),
					
				};
				MineGetEmergencyGrabOrderList(param).then((res) =>{
								
					console.log(res);
					if (page.value === 1) {
												
						orderList.value = res.result;
					}else
					{
						// 正确的数组合并方式
						res.result.forEach(item => {
							orderList.value.push(item)
						});
					}
					
					
					if (res.result.length === 0) {
						// 没有更多数据了
						hasMore.value = false
						noMore.value = true
						uni.showToast({
							title:'没有更多数据',
							icon:'none'
						})
						return
					}
					 // 如果返回的数据少于每页数量，说明是最后一页
					if (res.result.length < 10) {
						hasMore.value = false
						noMore.value = true
					}
				});
			}catch (error) {
				console.log(error)
			}finally {
				uni.stopPullDownRefresh()
			}
		
		}else{
			
			//其他订单
			try {
				
				let param = {
					userId:storage.getTemporayId(),
					page:page.value,
					size:20,
					repairState:stateStr.value,
					
				};
				MineGetEmergencyOrderList(param).then((res) =>{
								
					console.log(res);
					if (page.value === 1) {
												
						orderList.value = res.result;
					}else
					{
						// 正确的数组合并方式
						res.result.forEach(item => {
							orderList.value.push(item)
						});
					}
					
					
					if (res.result.length === 0) {
						// 没有更多数据了
						hasMore.value = false
						noMore.value = true
						uni.showToast({
							title:'没有更多数据',
							icon:'none'
						})
						return
					}
					 // 如果返回的数据少于每页数量，说明是最后一页
					if (res.result.length < 10) {
						hasMore.value = false
						noMore.value = true
					}
				});
			}catch (error) {
				console.log(error)
			}finally {
				wx.stopPullDownRefresh()
			}
		}
		
	};
	const personalClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/LingGongOrder/SharelaoWu/thirdJianZhiMessage'
		})
	};
	const switchChange = async(e:any) =>{
		
		console.log(e.detail.value);
		
		if (e.detail.value == false) {
			
			takeOrder.value = 2;
		}else
		{
			takeOrder.value = 1;
		}
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				takeOrder:takeOrder.value,
				id:storage.getTemporayId()
			};
			MineJiuYeQunShareYuanLaoWuOrderChangeSwitch(param).then((res) =>{
							
				console.log(res);
				if (takeOrder.value == 1) {
					
					uni.showToast({
						title:'已开启接单',
						icon:'none'
					})
					storage.saveTemporayTakeOrder(true);
				}else
				{
					uni.showToast({
						title:'已关闭接单',
						icon:'none'
					})
					storage.saveTemporayTakeOrder(false);
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const segment1Click = () => {
		
		type.value = "1";
		stateStr.value = 0;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment2Click = () => {
		
		type.value = "2";
		stateStr.value = 1;
		page.value = 1;
		hasMore.value= true;
		noMore.value = false;
		loadData();
	};
	const segment3Click = () => {
		
		type.value = "3";
		stateStr.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment4Click = () => {
		
		type.value = "4";
		stateStr.value = 4;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	const segment5Click = () => {
		
		type.value = "5";
		stateStr.value = 5;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	};
	//抢单
	const grabOrder = async(item:any) => {
		
		try {
			
			let param = {
				
			
				id:storage.getTemporayId(),
				userId:storage.getUserId(),
				repairUserId:item.repairUserId,
				userName:storage.getTemporayName(),
				phone:storage.getPhone(),
				repairList:item.repairList
				
			};
			MineGetEmergencyGoGrabOrder(param).then((res) =>{
							
				console.log(res);
				uni.showToast({
					title:'抢单成功',
					icon:'none'
				});
				segment1Click();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//停止
	const stopClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairList:item.repair_id.value,
				endContent:endContent.value,
				id:item.id,                
				
			};
			MineGetEmergencyEndWorkOrder(param).then((res) =>{
							
				console.log(res);
				uni.showToast({
					title:'停止成功',
					icon:'none'
				});
				segment3Click();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//暂停
	const pauseClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairList:item.repair_id,
				pauseContent:pauseContent.value
				
			};
			MineGetEmergencyPauseWorkOrder(param).then((res) =>{
							
				console.log(res);
				uni.showToast({
					title:'暂停成功',
					icon:'none'
				});
				segment3Click();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//完成
	const doneClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getTemporayId(),
				userName:storage.getTemporayName(),
				repairList:item.repair_id,
				id:item.id,
				
			};
			MineGetEmergencyPassWorkOrder(param).then((res) =>{
							
				console.log(res);
				uni.showToast({
					title:'工单已完成',
					icon:'none'
				});
				segment3Click();
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//报价
	const baojiaClick = (item:any) => {
		
	};
	const grabDetail = (item:any) => {
		uni.navigateTo({
			url:`/pages/mine/emergencyOrder/emergencyGrabDetail?repair_id=${item.repair_id}`
		})
	};
	const detailClick = (item:any) => {
		
		console.log(item);
		uni.navigateTo({
			url:`/pages/mine/emergencyOrder/emergencyOrderDetail?repair_id=${item.repair_id}`
		})
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
	
</script>

<style lang="scss" scoped>
    .main {
         min-height: 100vh;
         width: 100%;
         background-color: aliceblue;
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
	 .specsView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .contentView{
	 		 display: flex;
	 		 flex-direction: column;
	 			 
	 			 
	 }
	 .order_item{
	 		 display: flex;
	 		 flex-direction: column;
	 		 width: 100%;
	 		 border-radius: 5px;
	 			 margin-top: 10px;
	 			 margin-left: 4%;
	 			 width: 92%;
	 			 background-color: white;
	 }
	 .buttonView{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 280px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .bottomview{
	 		  display: flex;
	 		  flex-direction: row;
	 		  width: 100%;
	 		  height: 40px;
	 }
	 .buttonrefuse{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 180px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .buttonget{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 10px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .buttonAdd{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 60px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .buttonstop{
	 		  
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 10px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .buttonszanting{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 10px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .buttonsNozanting{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: gray 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 10px;
	 		  margin-top: 10px;
	 		  color: gray;
	 		  font-size: 12px;
	 }
	 .buttonOneStop{
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  border-radius: 5px;
	 		  border: #2A9595 1px solid;
	 		  width: 60px;
	 		  height: 20px;
	 		  margin-left: 130px;
	 		  margin-top: 10px;
	 		  color: #2A9595;
	 		  font-size: 12px;
	 }
	 .specsView1{
	 		  font-size: 12px;
	 		  margin-left: 15px;
	 		  color: gray;
	 		  margin-top: 5px;
	 }
    }
</style>