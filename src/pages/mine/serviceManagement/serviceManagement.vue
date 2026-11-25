<template>
  <view class="main">
    <!-- ================= 1. 顶部导航栏 ================= -->
    <u-navbar
      title="生活服务管理"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #fff; font-size: 16px; font-weight: 500;"
    >
      <!-- 左侧返回箭头 -->
      <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goback"></u-icon>
        </view>
      </template>
      <!-- 右侧加号按钮 (用于发布新服务) -->
      <template #right>
        <view class="u-nav-slot" slot="right" @click="goPublish">
          <u-icon name="plus" size="20" color="#fff" bold></u-icon>
        </view>
      </template>
    </u-navbar>
    
    <!-- ================= 2. 顶部 4 个选项卡切换栏 ================= -->
    <view class="tabs-container">
      <view class="tab-item"
      v-for="(item,index) in tabList" :key="index"
      :class="{active:currentTab === index}"
      @click="switchTab(index)"
      >
        <text class="tab-text">{{ item }}</text>
      </view>

      <!-- 动画滑动块：使用 absolute 定位，跟随 currentTab 平移 -->
      <view class="slider-box" :style="{ transform: `translateX(${currentTab * 100}%)` }">
        <view class="active-line"></view>
      </view>
    </view>


    
    <!-- ================= 3. 服务卡片列表区域 ================= -->
    <view class="list-container">
      <!-- 单张服务白色大卡片 -->
      <template v-for="(item, index) in shenheDataList" :key="index">
      <view class="service-card"  v-if="currentTab !== 3 ">
        <!-- 卡片主体：左边封面图 + 右边信息 -->
        <view class="card-main">
          <!-- 左侧服务封面图 -->
          <image 
            class="card-img" 
            :src="item.imgurl.split(',')[0]" 
            mode="aspectFill"
          ></image>
          
          <!-- 右侧详细信息 -->
          <view class="card-info">
            <!-- 标题 -->
            <view class="card-title">{{item.servicename}}</view>
            <!-- 描述 -->
            <view class="card-desc">描述：{{item.description1}}</view>
            <!-- 底部行：左边时间 + 右边醒目价格 -->
            <view class="card-bottom-row">
              <text class="card-time">时间:{{item.goodtime}}</text>
              <text class="card-price">¥{{item.price}}</text>
            </view>
          </view>
        </view>
        <!-- 卡片中间分割线 -->
        <view class="card-divider"></view>
        <!-- 卡片底部操作按钮（靠右排列） -->
        <view class="card-actions">
          <template v-if="currentTab == 0">
			  <view class="action-btn" @click="deleteClick(item)">删除</view>
			  <view class="action-btn" @click.stop="goEdit(item)">编辑</view>
          </template>
          
          <template v-if="currentTab == 1">
			<view class="action-btn" @click="UpDownOrder(item,0)">下架</view>
          </template>

          <template v-if="currentTab == 2">            
			  <view class="action-btn">删除</view>            
			  <view class="action-btn" @click.stop="goEdit(item)">编辑</view>            
			  <view class="action-btn" @click="UpDownOrder(item,1)">上架</view>
          </template>
        </view>
      </view>
      </template>


       <!-- 【频道 3 专属】：我的订单卡片 -->
       <view class="order-card" v-if="currentTab == 3"
       v-for="(item,index) in dataList" :key="index"
       @click="goOrderDetail(item)"
       >
        <!-- 头部：买家用户名 + 状态 -->
        <view class="order-header">
          <text class="buyer-name">{{ item.userName }}</text>
          <text class="order-status"
           :class="(item.orderStatus == '进行中' || item.orderStatus == '待付款')
           ? 'text-green':'text-red'"
          > {{ item.orderStatus }}</text>
        </view>
        
        <!-- 顶部全宽横线 -->
        <view class="order-divider"></view>

        <!-- 主体：左图右文 -->
        <view class="order-main">
          <image class="order-img" :src="item.goodImg.split(',')[0]" mode="aspectFill"></image>
          <view class="order-info">
            <view class="order-title">{{item.goodName}}</view>
            <view class="order-price">{{item.price}}</view>
          </view>
        </view>

        <!-- 图片下方的全宽下划线 不是已取消 且不是已完成 才显示 -->
        <view class="order-divider"></view>

        <!-- 底部：操作按钮 -->
          <template v-if="item.orderCode == '0'">
             <view class="action-btn" @click="jiedanClick(item)">接单</view>
          </template>
		  <template v-if="item.orderCode == '2'">
		     <view class="action-btn" @click="baojiaClick(item)">报价</view>
		  </template>
		  <template v-if="item.orderCode =='4' && item.isRefund != '2'">
			  <view class="action-btn" @click="tuikuanClick(item)">退款</view>
			  <view class="action-btn" @click="sureClick(item)">确认完成</view>
		  </template>
		  <template v-if="item.orderCode =='5' && item.afterSales == '1' && item.applyStatus == '0'">
			  <view class="action-btn" @click="refuseClick(item)">拒绝</view>
			  <view class="action-btn" @click="agreeClick(item)">同意</view>
		  </template>
      </view>


      <!-- 底部 - End - 提示 -->
      <view class="list-end">- End -</view>
    </view>
	<u-modal :show="modelshow" @confirm="confirmClick" :title="title" confirm-text="重新报价" showCancelButton="true" @cancel="cancelReBaoJia" cancel-text="不用"  style="display: flex;flex-direction: column;">
		<view style="margin-top: 20px;width: 100%;text-align: center;font-size: 13px;">是否需要重新报价</view>
	</u-modal>
	<u-modal :show="rebaojiashow" @confirm="handleReason" :title="title" confirm-text="提交" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 10px;margin-left: 30px;">￥</view>
			<input class="searchlocation" v-model="rebaojiacontent" placeholder="请输入报价" type="text" />
		</view>
	</u-modal>
	<u-modal :show="backmoneyshow" @confirm="handleBackMoneyReason" title="退款" confirm-text="提交" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: column;">
			<textarea class="textAreaView" v-model="backmoneycontent" placeholder="填写退款原因"></textarea>
		</view>
	</u-modal>
	<u-modal :show="refuseshow" @confirm="handleRefuseReason" title="请输入拒绝原因" confirm-text="提交" style="display: flex;flex-direction: column;">
		<view style="width: 100%;display: flex;flex-direction: column;">
			<textarea class="textAreaView" v-model="redfuseReason" placeholder="填写拒绝原因"></textarea>
		</view>
	</u-modal>
  </view>
</template>

<script setup lang="ts">
	import { ref,onMounted } from 'vue'
	import {MineLifeServiceManageMentShenheList,
	MineLifeServiceManageMentMyOrderList,
	MineLifeServiceManageMentShenHeListDelete,
	MineLifeServiceManageMentShenHeListUpAndDownGood,
	MineLifeServiceManageMentMyOrderListAcceptOrder,
	MineLifeServiceManageMentMyOrderListBargainPrice,
	MineLifeServiceManageMentMyOrderListRefundMoney,
	MineLifeServiceManageMentMyOrderListCompleteOrder,
	MineLifeServiceManageMentMyOrderListApplyExamine} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	const shenheDataList = ref([]);
	const dataList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
    const title = ref('提示');
	const modelshow = ref(false);
	const myOrderItem = ref({});
	const rebaojiashow = ref(false);
	const rebaojiacontent = ref();	
	const backmoneyshow = ref(false);
	const backmoneycontent = ref();
	const backMoneyItem = ref({});
	const refuseshow = ref(false);
	const refuseItem = ref({});
	const refuseReason = ref();
		
	onMounted(() => {
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
			
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		if(currentTab.value === 0 || currentTab.value === 1 || currentTab.value === 2){
			loadData();
		}else
		{
			myOrder();
		}
		
	});
	//上拉刷新
	onReachBottom(() => {
			
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		if(currentTab.value === 0 || currentTab.value === 1 || currentTab.value === 2){
			loadData();
		}else
		{
			myOrder();
		}
	});
	       
	//待审核0，已上架1，已下架2     
	const loadData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				listType:currentTab.value,
				page:page.value,
				size:10,
	
			};
			const res = await MineLifeServiceManageMentShenheList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				shenheDataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					shenheDataList.value.push(item)
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
   const myOrder = async() => {
	   
	   try {
	   	
	   	let param = {
	   		userId:storage.getUserId(),
	   		queryType:0,
			statusType:'',
	   		page:page.value,
	   		size:10,
	   	
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderList(param);
	   					
	   	console.log(res);
	   	if (page.value === 1) {
	   								
	   		dataList.value = res.result;
	   	}else
	   	{
	   		// 正确的数组合并方式
	   		res.result.forEach(item => {
	   			dataList.value.push(item)
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
   //删除
   const deleteClick = async(item:any) => {
	   
	   try {
	   	
	   	let param = {
	   		
	   		goodId:item.id
	   	};
	   	const res = await MineLifeServiceManageMentShenHeListDelete(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'已删除',
	   		icon:'none'
	   	})
	   	loadData();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   const UpDownOrder = async(item:any,doType:any) => {
	   
	   try {
	   	
	   	let param = {
	   		
	   		goodId:item.id,
			doType:doType
	   	};
	   	const res = await MineLifeServiceManageMentShenHeListUpAndDownGood(param);
	   					
	   	console.log(res);
		if(doType === 1){
			uni.showToast({
				title:'上架成功',
				icon:'none'
			})
		}else
		{
			uni.showToast({
				title:'下架成功',
				icon:'none'
			})
		}
	   
	   	loadData();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   const jiedanClick = async(item:any) => {
	   
	   try {
	   	
	   	let param = {
	   		
	   		orderId:item.orderId
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListAcceptOrder(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'已接单',
	   		icon:'none'
	   	})
	   	myOrder();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   //报价
   const baojiaClick = (item:any) => {
	   
	   modelshow.value = true;
	   myOrderItem.value = item;
   };
   //确认重新报价
   const confirmClick = () => {
	   
	   modelshow.value = false;
	   rebaojiashow.value = true;
	   
   };
   const handleReason = async() => {
	   
	   if(rebaojiacontent.value.length == 0){
		   
		   uni.showToast({
		   	title:'请输入金额',
		   	icon:'none'
		   })
		   return
	   }
	   try {
	   	
	   	let param = {
	   		
	   		orderId:myOrderItem.value.orderId,
	   		barginPrice:rebaojiacontent.value,
	   		barginFlag:2,
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListBargainPrice(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'已报价',
	   		icon:'none'
	   	})
	   	myOrder();
		rebaojiashow.value = false;
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   //不用重新报价，直接报价
   const cancelReBaoJia = async() => {
	   
	   try {
	   	
	   	let param = {
	   		
	   		orderId:myOrderItem.value.orderId,
			barginPrice:myOrderItem.value.price,
			barginFlag:1,
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListBargainPrice(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'已报价',
	   		icon:'none'
	   	})
	   	myOrder();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   const tuikuanClick = (item:any) => {
	   backmoneyshow.value = true;
	   backMoneyItem.value = item;
   };
   const handleBackMoneyReason = async() => {
	   
	   if(backmoneycontent.value.length == 0){
	   		   
		   uni.showToast({
			title:'请填写退款原因',
			icon:'none'
		   })
		   return
	   }
	   try {
	   	
	   	let param = {
	   		
	   		orderNo:backMoneyItem.value.orderNo,
			hostNo:storage.getHostNo(),
	   			mobile:storage.getPhone(),
	   			reason:backmoneycontent.value
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListRefundMoney(param);
	   					
	   	console.log(res);
	   	uni.navigateTo({
	   	    url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result)}`
	   	})
		
	   	
	   }catch (error) {
	   	console.log(error)
	   }
	   backmoneyshow.value = false
   };
   //确认完成
   const sureClick = async(item:any) => {
	   
	   try {
	   	
	   	let param = {
	   		
	   		orderId:item.orderId
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListCompleteOrder(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'已完成订单',
	   		icon:'none'
	   	})
	   	myOrder();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   const refuseClick = async(item:any) => {
	   refuseshow.value = true;
	   refuseItem.value = item;
   };
   const handleRefuseReason = async() => {
	   
	   if(refuseReason.value.length == 0){
	   		   
	   		   uni.showToast({
	   			title:'请输入原因',
	   			icon:'none'
	   		   })
	   		   return
	   }
	   try {
	   	
	   	let param = {
	   		
	   		order_no:refuseItem.orderNo,
	   			type:2,
	   			no_pass_reason:refuseReason,
	   			apply_user_id:storage.getUserId()
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListApplyExamine(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'退款已拒绝',
	   		icon:'none'
	   	})
	   	myOrder();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   const agreeClick = async(item:any) => {
	   
	   try {
	   	
	   	let param = {
	   		
	   		order_no:item.orderNo,
			type:1,
			no_pass_reason:'',
			apply_user_id:storage.getUserId()
	   	};
	   	const res = await MineLifeServiceManageMentMyOrderListApplyExamine(param);
	   					
	   	console.log(res);
	   	uni.showToast({
	   		title:'已同意退款',
	   		icon:'none'
	   	})
	   	myOrder();
	   	
	   }catch (error) {
	   	console.log(error)
	   }
   };
   const goback=()=>{
     uni.navigateBack({delta:1})
   }

   // 点击顶部加号，跳转到发布页
   const goPublish = () => {
     uni.navigateTo({
       url: '/pages/mine/serviceManagement/publishService'
     })
   }

   // 点击卡片，跳转到详情页
   const  goDetail =(item:any)=>{
    uni.navigateTo({
         url: `/pages/mine/serviceManagement/serviceDetail?title=${item.title}&price=${item.price}&desc=${item.desc}`
    })
   }
  // 点击编辑 跳转编辑页面
  const goEdit=(item: any)=>{
    uni.navigateTo({
       url: `/pages/mine/serviceManagement/publishService?title=${item.title}&price=${item.price}&desc=${item.desc}`
    })
  }
  //点击订单卡片，跳转到订单详情页
  const goOrderDetail =(item:any)=>{
    uni.navigateTo({
        url: `/pages/mine/serviceManagement/orderDetail?orderid=${item.orderid}&orderno=${item.orderno}`
    })
  }
  //tab
  const tabList = ref(['待审核', '已上架', '已下架', '我的订单'])
  const currentTab = ref(0)

  //切换tab
  const switchTab = (index:number) =>{
		currentTab.value = index;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		if(currentTab.value === 0 || currentTab.value === 1 || currentTab.value === 2){
			loadData();
		}else
		{
			myOrder();
		}
  }

  
  
</script>

<style scoped lang="scss">
/* 页面最外层容器背景 */
 .main{
    min-height: 100vh;
    background-color: #f4f7f8;
 }

 /* ================= 2. 选项卡样式（复用 landTransfer 风格） ================= **/
 .tabs-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  height: 48px; /* 增加 tab 栏高度 */
  position: relative; /* 为 slider-box 提供定位基准 */

  .tab-item {
    flex: 1; /* 平分整个宽度 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    .tab-text {
      font-size: 15px; /* 调大 tab 文字 */
      color: #333333;
      transition: all 0.2s ease;
    }
    /* 激活选中的样式 */
    &.active {
      .tab-text {
        color: #2A9595;
        font-weight: 500;
      }
    }
  }

  /* 滑动轨道盒子 */
  .slider-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 25%; /* 4个tab，所以是四分之一宽度 */
    display: flex;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  /* 底部墨绿色小横条指示器 */
  .active-line {
    width: 40px; 
    height: 3px;
    background-color: #2A9595;
    border-radius: 2px;
  }
}
/* ================= 3. 列表及卡片样式 ================= */
.list-container {
  padding: 12px 10px;
  box-sizing: border-box;
}
/* 服务白色卡片 */
.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px 14px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.03);
  margin-bottom: 12px;
  /* 卡片上半部分：左图右文 */
  .card-main {
    display: flex;
    flex-direction: row;
    /* 左侧圆角封面图 */
    .card-img {
      width: 80px; /* 放大图片尺寸 */
      height: 80px;
      border-radius: 6px;
      background-color: #eee;
      flex-shrink: 0;
    }
    /* 右侧文字信息容器 */
    .card-info {
      flex: 1;
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .card-title {
        font-size: 15px;
        font-weight: 500;
        color: #353535;
      }
      .card-desc {
        font-size: 13px;
        color: #666666;
        margin-top: 2px;
      }
      .card-bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .card-time {
          font-size: 12px;
          color: #666666;
        }
        .card-price {
          font-size: 13px;
          font-weight: 400;
          color: #e54d42; /* 醒目的红色价格 */
        }
      }
    }
  }
  /* 中间淡灰色细分割线 */
  .card-divider {
    height: 1px;
    background-color: #f2f2f2;
    margin: 12px 0 10px 0;
  }
  /* 底部按钮行（右对齐） */
  .card-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* 墨绿色线框按钮（删除/编辑） */
    .action-btn {
      padding: 4px 16px;
      font-size: 11px;
      border-radius: 4px;
      border: 1px solid #2A9595;
      color: #2A9595;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      &:active {
        opacity: 0.7;
      }
    }
  }
}
/* 底部 - End - 提示 */
.list-end {
  text-align: center;
  font-size: 12px;
  color: #999999;
  margin-top: 20px;
  padding-bottom: 20px;
}

/* ================= 订单专属卡片 ================= */
.order-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.03);
  margin-bottom: 12px;
  overflow: hidden;

  /* 头部区域（带左右内边距） */
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;

    .buyer-name {
      font-size: 13px;
      font-weight: 400;
      color: #4d4d4d;
    }

    .order-status {
      font-size: 11px;
      font-weight: 400;
      &.text-green { color: #2A9595; }
      &.text-gray { color: #999999; }
    }
  }

  /* 全宽横贯分割线 */
  .order-divider {
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
  }

  /* 主体图文区域 */
  .order-main {
    display: flex;
    flex-direction: row;
    padding: 12px 14px;

    .order-img {
      width: 70px;
      height: 70px;
      border-radius: 6px;
      background-color: #f5f5f5;
      flex-shrink: 0;
    }

    .order-info {
      flex: 1;
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .order-title {
        font-size: 13px;
        font-weight: 400;
        color: #333333;
        line-height: 1.35;
      }


      .order-price {
        font-size: 13px;
        color: #333333;
      }
    }
  }

  /* 底部按钮： */
  .order-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 14px;

    .action-btn {
      width: 72px;
      height: 30px; /* 垂直高度调低 */
      font-size: 12px;
      border-radius: 5px;
      border: 1px solid #2A9595;
      color: #2A9595;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      &:active {
        opacity: 0.7;
      }
    }
  }
}
.searchlocation{
         margin-left: 10px;
         width: 200px;
         height: 30px;
         margin-top: 10px;
         font-size: 13px;
     }
.textAreaView{
	 margin-top: 10px;
	 margin-left: 4%;
	 width: 92%;
	 height: 60px;
	 border: lightgray 1px solid;
	 font-size: 13px;
 }

</style>