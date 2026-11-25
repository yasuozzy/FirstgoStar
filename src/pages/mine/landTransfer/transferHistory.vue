<template>
 <view class="main">

    <!-- ================= 1. 顶部导航栏 ================= -->
    <u-navbar
    title='流转记录'
    :safeAreaInsetTop="true"
    :placeholder="true"
    :fixed="true"
    :border="false"
    :bgColor="bgColor"
    titleStyle="color: #fff; font-size: 15px; font-weight: 400;"
    >
      <!-- 左侧返回箭头 -->
       <template #left>
         <view class="u-nav-slot" slot="left">
            <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
         </view>
       </template>

        <!-- 右侧加号新增按钮 -->
       <template #right>
        <view class="u-nav-slot" slot="right">
            <u-icon name="plus" size="19" color="#fff" bold @click="toAddTransfer"></u-icon>
        </view>
       </template>
    </u-navbar>

    <!-- ================= 2. 顶部选项卡切换栏 (流转 / 租赁 / 提交) ================= -->
    <view class="tabs-container">
      <view class="tab-item" 
       v-for="(item,index) in tabList" :key="index"
       :class="{'active': currentIndex === index }"
       @click="switchTab(index)"
      >
        <text class="tab-text">{{ item }}</text>
      </view>

      <!-- 动画滑动块：使用 absolute 定位，跟随 currentIndex 平移 -->
      <view class="slider-box" :style="{ transform: `translateX(${currentIndex * 100}%)` }">
        <view class="active-line"></view>
      </view>
    </view>

    <!-- ================= 3. 记录卡片列表区域 ================= -->
    <view class="list-container">
      <template v-for="(item, index) in recordList" :key="item.id">
        <view class="record-card"  @click="goDetail(item)">
          <!-- 卡片头部：左边地块名称，右边状态文字 -->
          <view class="card-header">
            <text class="card-title">{{ item.location }}土地流转</text>
            <!-- status-text(待用户确认等浅灰色状态标签) -->
            <text class="status-text" style="color: #2A9595;">{{ item.statusFlag }}</text>
          </view>
          <!-- 卡片内容信息行 -->
          <view class="card-body">
            <!-- 1. 联系人姓名 --> 
            <view class="info-row">
              <text class="info-label">联系人姓名：</text>
              <text class="info-value">{{ item.name }}</text>
            </view>
            <!-- 2. 联系人电话 -->
            <view class="info-row">
              <text class="info-label">联系人电话：</text>
              <text class="info-value">{{ item.mobile }}</text>
            </view>
            <!-- 3. 土地面积 -->
            <view class="info-row">
              <text class="info-label">土地面积：</text>
              <text class="info-value">{{ item.area }}</text>
            </view>
            <!-- 4. 议价费用 -->
            <view class="info-row">
              <text class="info-label">议价费用：</text>
              <text class="info-value">{{ item.rent }}</text>
            </view>
          </view>
          
		  <view v-if="currentIndex == 0 && item.status == 1" class="card-footer">
		    <view class="sign-btn"  @click.stop="payOrder(item)">付   款</view>
		    <view class="detail-btn" @click.stop="goDetail(item)">查看详情</view>
		  </view>
          <view v-if="currentIndex == 1 && item.status == 0" class="card-footer">
            <view class="sign-btn"  @click.stop="signClick(item)">确   认</view>
            <view class="detail-btn" @click.stop="goDetail(item)">查看详情</view>
          </view>
		  <view v-else class="card-footer">
		    <view class="detail-btn" @click.stop="goDetail(item)">查看详情</view>
		  </view>
        </view>
        
      </template>

      <!-- 底部“没有更多数据”提示文案 -->
      <view class="no-more-text">没有更多数据</view>
    </view>
  </view>
</template>

<script setup lang="ts">

	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineLandrentGetLandWaitListHisTransList,
	MineLandrentGetLandWaitListHisRentOrderList,
	MineLandrentGetLandWaitListHisGetMyLandList,
	MineLandrentGetLandWaitListHisLandRentOrderPay,
	MineLandrentGetLandWaitListHisOwnerLandRentOrderSign} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
     
    const bgColor =ref("#2A9595")//导航栏背景主题墨绿色 #2A9595)
	const recordList =ref([]);
	const tabList =ref(['流转', '租赁', '提交']);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const rentSign = ref();  
	const order_id = ref();
		   
	onMounted(() => {
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
			
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		if(currentIndex.value === 0){
			
			loadData();
			
		}else if(currentIndex.value === 1){
			
			loadRentData();
			
		}else if(currentIndex.value === 2){
			
			loadTiJiaoData();
			
		}
		
	});
	//上拉刷新
	onReachBottom(() => {
			
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		if(currentIndex.value === 0){
			
			loadData();
			
		}else if(currentIndex.value === 1){
			
			loadRentData();
			
		}else if(currentIndex.value === 2){
			
			loadTiJiaoData();
			
		}
	});
	       
	        
	const loadData = async() => {
	        	
		try {
			
			let param = {
				user_id:storage.getUserId(),
				page:page.value,
				size:10,
	
			};
			const res = await MineLandrentGetLandWaitListHisTransList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				recordList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					recordList.value.push(item)
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
	const loadRentData = async() => {
	        	
		try {
			
			let param = {
				user_id:storage.getUserId(),
				page:page.value,
				size:10,
	
			};
			const res = await MineLandrentGetLandWaitListHisRentOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				recordList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					recordList.value.push(item)
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
	const loadTiJiaoData = async() => {
	        	
		try {
			
			let param = {
				userId:storage.getUserId(),
				page:page.value,
				size:10,
	
			};
			const res = await MineLandrentGetLandWaitListHisGetMyLandList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				recordList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					recordList.value.push(item)
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
	const payOrder = async(item:any) => {
		
		try {
			
			let param = {
				
				order_id:item.order_id,
				osName:'ios'
			};
			const res = await MineLandrentGetLandWaitListHisLandRentOrderPay(param);
							
			console.log(res);
			uni.navigateTo({
			    url:`/pages/Integral/orderPayHtml?url=${encodeURIComponent(res.result.payUrl)}`
			})
			
			
		}catch (error) {
			console.log(error)
		}
	};
	
	
	
     // 顶部返回上一页
     const goBack =()=>{
        uni.navigateBack({delta:1})
     }

     // 智能跳转到查看详情页面
      const goDetail = (item: any) => {
        
        if (currentIndex.value === 0 || currentIndex.value === 1) {
            // 如果是【提交】Tab，跳去土地流转详情页
            uni.navigateTo({
              url: `/pages/mine/landTransfer/transAndRentDetail?myOrgetOwner=${currentIndex.value}&order_id=${item.order_id}&type=${item.type}`
            });
        } else {
           
		   if(item.status === -1){
			   
			   uni.navigateTo({
			      url: `/pages/mine/landTransfer/addTransfer?type=${1}&linkId=${item.id}`
			   });
			   
		   }else
		   {
			   uni.navigateTo({
			      url: `/pages/mine/landTransfer/MyTiJiaoDetail?linkId=${item.id}`
			   });
		   }
            
        }
      }

      // 跳转到去签字页面
      //签字
      const signClick = (item:any) => {
      	
		order_id.value = item.order_id;
      	uni.navigateTo({
      	  url: "/pages/mine/SignPage/SignPage",
      	});	
      	
      };
      const handleUpdateData = (data:any) => {
        console.log("接收到回传的数据:", data);
        if (data) {
      	  
			rentSign.value = data[0];
			// rentImage.value = BaseImgURL + data[0];
			console.log( rentSign.value);
			querenSetUpData()
        };
        
      };
      const querenSetUpData = async() => {
      	
      	try {
      		let param = {
      			
      			order_id:order_id.value,
      			sign_pic_user:rentSign.value,
      		};
      		MineLandrentGetLandWaitListHisOwnerLandRentOrderSign(param).then((res) =>{
      			
      			console.log(res);
      			
      			if(res.success === true){
      				
      				uni.showToast({
      					title:'提交成功',
      					icon:'none'
      				})
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
      				if(currentIndex.value === 0){
      					
      					loadData();
      					
      				}else if(currentIndex.value === 1){
      					
      					loadRentData();
      					
      				}else if(currentIndex.value === 2){
      					
      					loadTiJiaoData();
      					
      				}
      			}else
      			{
      				uni.showToast({
      					title:res.message,
      					icon:'none'
      				})
      			}
      			
      		});
      	} catch (error) {
      		console.log(error)
      	} 
      	
      };
      
      // 记录当前选中的是哪个 tab？
      const currentIndex=ref(0)

      //点击切换 tab 的方法
      const switchTab =(index:number)=>{
        currentIndex.value=index;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		if(currentIndex.value === 0){
			
			loadData();
			
		}else if(currentIndex.value === 1){
			
			loadRentData();
			
		}else if(currentIndex.value === 2){
			
			loadTiJiaoData();
			
		}
        
      }
      // 点击右上角加号
      const toAddTransfer=()=>{
        uni.navigateTo({
           url: `/pages/mine/landTransfer/addTransfer?type=${0}`
        });
      }
      

</script>

<style lang="scss" scoped>
/* 整个页面背景底色（浅灰底，衬托出白色卡片） */
.main {
  min-height: 100vh;
  background-color: #f7f8fa;
}
/* ================= 顶部选项卡栏 ================= */
.tabs-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  height: 44px;
  position: relative;
  /* 选项卡底部极浅的 1px 分割线 */
  border-bottom: 1px solid #f0f0f0;
}
/* 每一个选项卡条目 */
.tab-item {
  flex: 1; /* 平分宽度，保证动画计算准确 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  /* 未选中的文字样式 */
  .tab-text {
    font-size: 15px;
    color: #333333;
    transition: all 0.2s ease;
  }
  /* 选中的选项卡样式 */
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
  width: 33.333%; /* 3个tab，占三分之一宽度 */
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease; /* 核心平滑动画 */
}

/* 真正的绿线本体 */
.active-line {
  width: 32px;
  height: 2px;
  background-color: #2A9595;
  border-radius: 2px;
}
/* ================= 列表容器 ================= */
.list-container {
  padding: 12px 14px;
}
/* 记录白色大卡片 */
.record-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px 14px 12px 14px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.03);
  margin-bottom: 12px;
}
/* 卡片头部（标题 + 状态文字） */
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  /* 地块名称 */
  .card-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }
  /* 右上角状态文字 */
  .status-text {
    font-size: 12px;
    color: #999999;
  }
}
/* 卡片中间信息内容列表 */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
/* 单行信息条目 */
.info-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .info-label {
    margin-right: 8px;
    font-size: 13px;
    color: #333333;
    flex-shrink: 0;
  }
  /* 冒号后面的具体数值 */
  .info-value {
    font-size: 13px;
    color: #7D7D7D;
    flex: 1;
  }
}
/* 卡片底部操作按钮区域 */
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid #f2f2f2;
}
/* 查看详情墨绿色按钮 */
.detail-btn {
    height: 30px;
  padding: 0 14px;
  background-color: white;
  color: #2A9595;
  border: 1px solid #2A9595;
  font-size: 13px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    opacity: 0.85;
  }
}
/* 底部“没有更多数据”文案 */
.no-more-text {
  text-align: center;
  font-size: 13px;
  color: #999999;
  margin-top: 20px;
  padding-bottom: 20px;
}

/* 租赁模式下的去签字按钮 */
.sign-btn {
  height: 30px;
  padding: 0 14px;
  background-color: white;
  color: #2A9595;
  border: 1px solid #2A9595;
  font-size: 13px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  
  &:active {
    opacity: 0.85;
  }
}
/* 提交卡片*/
.status-green {
  font-size: 13px; 
  color: #2A9595; 
  flex-shrink: 0; // 防止文字被挤压变形
}
.info-name {
  font-size: 13px;
  color: #7D7D7D;
  margin-right: 40px; 
}


/* 联系人同一行右侧的电话号码 */
.info-phone {
  font-size: 13px; 
    color: #7D7D7D;
  // margin-left: 30px; 
}
/* 提交卡片底部的镂空边框'查看'按钮 */
.outline-btn {
  height: 30px; 
  padding: 0 16px; 
  background-color: #ffffff; 
  color: #2A9595; 
  border: 1px solid #2A9595; 
  font-size: 14px; 
  border-radius: 4px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  // 点击时的按压半透明反馈
  &:active {
    opacity: 0.7;
  }
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
            height: 30px;           /* 需要设置高度 */
            width: 70px;
            margin-right: 10px;
            font-size: 13px;
            color: white;
            background-color: #2A9595;
            border-radius: 6px;
            margin-left: 230px;
            margin-top: 15px;
        }


</style>