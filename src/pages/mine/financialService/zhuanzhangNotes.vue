<template>
    <view class="main">
        <u-navbar
          title="转账记录"
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
		<view class="specsView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待支付</view>
				<view v-else style="color: black;font-size: 13px;">待支付</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">已支付</view>
				<view v-else style="color: black;font-size: 13px;">已支付</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">已取消</view>
				<view v-else style="color: black;font-size: 13px;">已取消</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="item-List" v-for="(item,index) in opinionList" @click="detailClick(item)">
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;display: flex;flex-direction: row;">
					<view style="font-size: 15px;width: 50%;">转账 {{item.rec_mobile}}</view>
					<view style="font-size: 15px;width: 50%;text-align: right;color: #2A9595;">￥{{item.amount}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;font-size: 13px;color: dimgray;">转账说明:{{item.remark}}</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;font-size: 13px;color: dimgray;">{{item.pay_time}}</view>
				<view v-if="type == 1" style="display: flex;flex-direction: row;width: 100%;height: 40px;">
					<view class="cancelView" @click="cancelClick(item)">取消转账</view>
					<view class="surelView" @click="sureClick(item)">确认转账</view>
				</view>
				<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MineFinancialTransferServiceList,
	MineFinancialTransferServiceListCancelTransfer,
	MineFinancialTransferServiceListSureTransfer} from '@/api/mine';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	 
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const dataList = ref([
		{phone:'15689288001',money:'1',content:'转账测试',time:'2025-08-29 07:14:25',},
		{phone:'15689288001',money:'1',content:'转账测试',time:'2025-08-29 07:14:25',},
		{phone:'15689288001',money:'1',content:'转账测试',time:'2025-08-29 07:14:25',},
	]);
	const opinionList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
           
	onMounted(() => {
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
           	
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:20,
				status:type.value - 1,
										
			};
			const res = await MineFinancialTransferServiceList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				opinionList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					opinionList.value.push(item)
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
			
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
    };
    const goBack= () => {
                    
        uni.navigateBack()
    };
	//切换segment
	const segment1Click = () => {
		
		type.value = 1;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment2Click = () => {
		
		type.value = 2;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const segment3Click = () => {
		
		type.value = 3;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
		
	};
	const cancelClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id,
				
			};
			const res = await MineFinancialTransferServiceListCancelTransfer(param);
							
			console.log(res);
			loadData();
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const sureClick = async(item:any) => {
		
		try {
			
			let param = {
				
				id:item.id,
				
			};
			const res = await MineFinancialTransferServiceListSureTransfer(param);
							
				console.log(res);
				uni.navigateTo({
					   url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
				})
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//详情
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/financialService/zhuanzhangNotesDet?id=${encodeURIComponent(item.id)}&status=${encodeURIComponent(type.value)}`
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
	 .specsView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 margin-top: 10px;
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .item-List{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 
	 }
	 .cancelView{
		  display: flex;
		             justify-content: center; /* 水平居中 */
		             align-items: center;     /* 垂直居中 */
		             height: 30px;           /* 需要设置高度 */
		             width: 90px;
		             margin-right: 10px;
		             font-size: 13px;
		             color: white;
		             background-color: #2A9595;
		             border-radius: 6px;
		             margin-left: 140px;
		             margin-top: 10px;
	 }
	 .surelView{
		 display: flex;
		            justify-content: center; /* 水平居中 */
		            align-items: center;     /* 垂直居中 */
		            height: 30px;           /* 需要设置高度 */
		            width: 90px;
		            margin-right: 10px;
		            font-size: 13px;
		            color: white;
		            background-color: #2A9595;
		            border-radius: 6px;
		            margin-left: 20px;
		            margin-top: 10px;
	 }
    }
</style>