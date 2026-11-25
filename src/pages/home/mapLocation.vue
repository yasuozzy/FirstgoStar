<template>
    <view class="main">
        
		<view class="headerV">
			<input class="searchlocation" placeholder="请输入地点" value="湖北铜山" type="text" />
			     
			<view class="homestayView" @click="goBack">取消</view>
		</view>
		<view class="normalLocation">
			<view style="display: flex;flex-direction: row;">
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">🔍</view>
				<view style="font-size: 13px;margin-top: 10px;color: royalblue;width: 72%;">{{normallocation}}</view>
				<view style="font-size: 13px;text-align: right;width: 60px;margin-top: 10px;">城市</view>
			</view>
			<view style="font-size: 13px;margin-top: 5px;margin-left: 30px;color: dimgray;">{{address}}</view>
		</view>
        <view class="situation_contect">
          <view
            class="situation_item"
            v-for="(item, index) in normalList1"
            :key="index" @click="jumpTo(item.text)"
          >
            <view class="item_text">{{item}}</view>
          </view>
        </view>
		<view class="normalLocation">
			<view class="locationItem" v-for="(item,index) in locationList" :key="index">
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">🔍</view>
					<view style="font-size: 13px;margin-top: 10px;color: royalblue;width: 72%;">{{item.normallocation}}</view>
					<view style="font-size: 13px;text-align: right;width: 60px;margin-top: 10px;">{{item.style}}</view>
				</view>
				<view style="font-size: 13px;margin-top: 5px;margin-left: 30px;color: dimgray;">{{item.address}}</view>
			</view>
			
		</view>
        
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const normallocation = ref('铜山');
	const address = ref('中国-湖北-咸宁');
	const normalList1 = ref(['九宫山','云中胡','隐水洞','铜山县人民医院','大木山森林公园','铜山客运东站']);
	const items = ref([1, 2, 3, 4, 5, 6]);
	const locationList = ref([
		{normallocation:'湖北通山振新国际学校',address:'咸宁市-通山县-迎宾大道(文体中心对面)',style:'地标'},
		{normallocation:'湖北龙隐山星空露营基地',address:'中国-湖北-咸宁-通山/咸宁市通山县008县道龙隐山',style:'地标'},
		{normallocation:'湖北省通山县第一中学',address:'中国-湖北-咸宁-通山/湖北省咸宁市通山县洋都大道',style:'地标'},
		{normallocation:'湖北省老干部九宫山休养院',address:'中国-湖北-咸宁-通山/咸宁市通山县云中湖路13号',style:'地标'},
		{normallocation:'湖北省通山县职业教育中心',address:'中国-湖北-咸宁-通山/湖北省咸宁市通山县工业大道',style:'地标'},
		{normallocation:'湖北省通山县人民法院大畈法庭',address:'中国-湖北-咸宁-通山/011乡道大畈镇中心卫生院西',style:'地标'},
	]);
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
			.headerV{
				display: flex;
				flex-direction: row;
				width: 100%;
				height: calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
			}
			.searchlocation{
	          margin-left: 15px;
	          width: 88%;
	          height: 30px;
	          margin-top: calc(var(--status-bar-height));
	          
	          border-radius: 15px;
	          font-size: 13px;
			  background-color: aliceblue;
	      }
		  .homestayView{
			  width: 50px;
			  margin-top: calc(var(--status-bar-height) + 2px);
			  font-size: 13px;
			  color: black;
			  text-align: center;
		  }
		  .normalLocation{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
			  height: 60px;
		  }
		  
		 .situation_contect {
		   display: flex;
		   flex-direction: row;
		   flex-wrap: wrap;
		   align-items: center;
		   gap: 24upx;
		   margin-top: 10px;
		   justify-content: space-evenly;
		   .situation_item {
		     width: 22%;
			 background-color: aliceblue;
		     font-size: 11px;
		 	margin-right: 24upx;
		     color: #000;
		     box-sizing: border-box;
		     display: flex;
			justify-content: center;
		     align-items: center;
		     height: 30px;
		 	
		 	.item_text{
		 		margin-top: 4upx;
		 	}
		   }
		 }
		.locationItem{
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 60px;
		}
		
    }
</style>