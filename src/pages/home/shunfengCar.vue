<template>
    <view class="main">
       <view class="custom-navbar">
         <view class="navbar-content">
           <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
           <view class="specsView">
           	
           	<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
           		<view v-if="type === '1'" style="color: white;font-size: 13px;">顺风约车</view>
           		<view v-else style="color: white;font-size: 13px;">顺风约车</view>
           		<view class="whiteLine" v-if="type === '1'"></view>
           	</view>
           	<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
           		<view v-if="type === '2'" style="color: white;font-size: 13px;">顺风收发</view>
           		<view v-else style="color: white;font-size: 13px;">顺风收发</view>
           		<view class="whiteLine" v-if="type === '2'"></view>
           	</view>
           	
           </view>
         </view>
       </view>
	   <view style="width: 100%;height: 700px;" v-if="type === '1'">
		   <view class="mapview"></view>
		   <view style="display: flex;flex-direction: row;width: 100%;height: 40px;margin-top: 5px;">
			   <view style="margin-top: 17px;margin-left: 15px;background-color: limegreen;width: 10px;height: 10px;border-radius: 5px;"></view>
			   <view style="color: limegreen;font-size: 15px;margin-top: 10px;margin-left: 5px;">{{location}}</view>
			   <view style="margin-left: 10px;margin-top: 10px;font-size: 15px;">上车 ></view>
		   </view>
		   <view class="searchlocation">{{title}}</view>
	   </view>
	   <view style="width: 100%;" v-if="type === '2'">
		   <view style="width: 100%;height: 40px;background-color: #2A9595;display: flex;flex-direction: row;">
			   <view class="search-container">
			     <u-search 
			       placeholder="输入运单号/电话/姓名查询订单" 
			       v-model="keyword" 
			       :show-action="false"
			       shape="square"
			       bg-color="#f5f5f5"
			     ></u-search>
			   </view>
			   <view style="margin-left: 10px;width: 40px;height: 40px;display: flex;flex-direction: column;margin-top: 5px;">
			   	<u-icon color="#ffffff" name="scan" size="20"></u-icon>
			   	<view style="font-size: 7px;color: white;margin-left: 3px;">扫码</view>
			   </view>
			   
		   </view>
		   <view class="greenHeaderView">
		   	<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="sfsegment1Click">
		   		<view v-if="sftype === '1'" style="color: #2A9595;font-size: 15px;">我的收件</view>
		   		<view v-else style="color: black;font-size: 15px;">我的收件</view>
		   		<view class="whiteLine1" v-if="sftype === '1'"></view>
		   	</view>
		   	<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="sfsegment2Click">
		   		<view  v-if="sftype === '2'" style="color: #2A9595;font-size: 15px;">我的寄件</view>
		   		<view  v-else style="color: black;font-size: 15px;">我的寄件</view>
		   		<view class="whiteLine1" v-if="sftype === '2'"></view>
		   	</view>
		   	
		   </view>
		   <view style="width: 100%;height: 5px;background-color: aliceblue;"></view>
		   <view class="listView" v-if="sftype === '1'">
		   	<view class="list_item" v-for="(item,index) in myreceiveList" :key="index" @click="detailClick">
		   		<view class="headerView">
		   			<view style="width: 50%;">{{item.ordernumber}}</view>
		   			<view style="width: 50%;text-align: right;color: #2A9595;font-size: 13px;">{{item.status}}</view>
		   		</view>
		   		<view class="specsView1">发件：{{item.name}}{{item.phone}}</view>
		   		<view class="specsView1">状态：{{item.detailstatus}}</view>
		   		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		   	</view>
		   	
		   </view>
		   <view class="listView" v-if="sftype === '2'">
		   	<view class="list_item" v-for="(item,index) in myreceiveList" :key="index" @click="detailClick">
		   		<view class="topView">
		   			<u-image style="margin-top: 10px;"
		   			  :src="item.image"
		   			  width="80px"
		   			  height="80px"
		   			></u-image>
		   			<view class="rightView">
		   				<view class="headerView">
		   					<view style="width: 50%;">{{item.ordernumber}}</view>
		   					<view style="width: 50%;text-align: right;color: #2A9595;font-size: 13px;">{{item.status}}</view>
		   				</view>
		   				<view class="specsView1">发件：{{item.name}}{{item.phone}}</view>
		   				<view class="specsView1">状态：{{item.detailstatus}}</view>
		   			</view>
		   		</view>
		   		<view class="specsline"></view>
		   	</view>
		   </view>
		   <view class="floating-ball" @click="fabClick">发件</view>
	   </view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref('1');
	const sftype = ref('1');
	const location = ref('花海贸易广场1号楼附近');
	const title = ref('请选择市内、城际目的地');
	const myreceiveList = ref([
		{image:'/static/home/homestay.png',ordernumber:'2025784575412547',name:'张明',phone:'15689288001',status:'运输中',detailstatus:'快递已到达[济南站]'},
		{image:'/static/home/homestay.png',ordernumber:'2025784575412547',name:'沈鹏',phone:'15689288056',status:'已签收',detailstatus:'快递已签收'},
	]);
    const keyword = ref('');
	   
	const goBack= () => {
			
		uni.navigateBack()
	};
	//切换segment
	const segment1Click = () => {
		
		 type.value = "1";
		
	};
	const segment2Click = () => {
		
		 type.value = "2";
		
	};
	//切换segment
	const sfsegment1Click = () => {
		
		 sftype.value = "1";
		
	};
	const sfsegment2Click = () => {
		
		 sftype.value = "2";
		
	};
	const detailClick = () => {
		uni.navigateTo({
			url:'/pages/service/receiveanddispatch/logisticsinformation'
		})
	};
	//发件
	const fabClick = () => {
		uni.navigateTo({
			url:'/pages/service/receiveanddispatch/postgoods'
		})
	};
        
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .custom-navbar {
             height: calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
             position: relative;
             width: 100%;
             background-color: #2A9595;
           }
           
           .navbar-content {
             display: flex;
             align-items: center;
             height: 100%;
             padding: 0 15px; /* 整体左右边距 */
           }
           
           .back-icon {
             margin-right: 10px; /* 返回键与搜索框间距 */
           }
           
           .specsView{
            		 width: 100%;
            		 height: 40px;
            		 display: flex;
            		 flex-direction: row;
            		 background-color: #2A9595;
					 margin-top: calc(var(--status-bar-height));;
            		 
            }
            .whiteLine{
            		 margin-left: 35%;
            		 margin-top: 8px;
            		 width: 30%;
            		 height: 2px;
            		 background-color: white;
            }
			.mapview{
				display: flex;
				margin-top: 10px;
				margin-left: 4%;
				width: 92%;
				height: 500px;
				border-radius: 6px;
				background-color: aliceblue;
			}
			.searchlocation{
				display: flex;
				margin-top: 5px;
				margin-left: 4%;
				width: 92%;
				border: blue 2px solid;
				border-radius: 6px;
				height: 40px;
				font-size: 15px;
				justify-content: left;
				align-items: center;
			}
			.search-container {
			  flex: 1;
			  margin-left: 30px;
			  width: 75%;
			  
			}
			.greenHeaderView{
				display: flex;
				flex-direction: row;
				background-color: white;
				width: 100%;
				height: 50px;
				
			}
			.whiteLine1{
					 margin-left: 40%;
					 margin-top: 5px;
					 width: 20%;
					 height: 2px;
					 background-color: #2A9595;
			}
			.floating-ball {
			  position: fixed;
			  right: 20px;
			  bottom: 220px;
			  width: 60px;
			  height: 60px;
			  background-color: #2A9595;
			  color: white;
			  border-radius: 50%;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  font-size: 14px;
			  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
			  cursor: pointer;
			  z-index: 999;
			  user-select: none;
			}
			
			.floating-ball:active {
			  transform: scale(0.95);
			  opacity: 0.9;
			}
			.listView{
				display: flex;
				flex-direction: column;
				width: 100%;
				background-color: white;
			}
			.list_item{
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100px;
			}
			.headerView{
				display: flex;
				flex-direction: row;
				margin-left: 4%;
				margin-top: 10px;
				width: 92%;
				height: 30px;
				font-size: 14px;
			}
			.specsView1{
				margin-left: 4%;
				margin-top: 5px;
				width: 92%;
				height: 30px;
				font-size: 13px;
				color: gray;
			}
			.topView{
				display: flex;
				flex-direction: row;
				margin-left: 4%;
				margin-top: 10px;
				width: 92%;
				height:80px;
				font-size: 14px;
				margin-bottom: 10px;
			}
			.rightView{
				display: flex;
				flex-direction: column;
				width: 100%;
			}
			.specsline{
				
				width: 100%;
				height: 1px;
				background-color: aliceblue;
				margin-top: 8px;
			}
    }
</style>