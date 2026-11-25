<template>
    <view class="main">
        <u-navbar
          title="商品规格管理"
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
			<template #right >
				<view class="u-nav-slot" slot="left" @click="deleteClick()">
				  <u-image
					:src="deleteWhite"
					width="20px"
					height="20px"
				  ></u-image>
				</view>
			</template>
        </u-navbar>
		<view class="contentView">
			<view  class="order_item" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view v-if="deleteStatus == true" style="margin-left: 15px;margin-top: 13px;">
						<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="chooseselect(item,index)"></image>
						<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect(item,index)"></image>
					</view>
					<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 78%;">规格名称：{{item.name}}</view>
					<view v-if="deleteStatus == false" style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 15%;color: #2A9595;" @click="editClick(item)">编辑</view>
				</view>
				<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;width: 75%;">规格分类：</view>
				<view class="itemview">
					<view
					  class="situation_item"
					  v-for="(secitem, secindex) in item.valueList"
					  :key="secindex"
					>
					  {{ secitem.value}}
					</view>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 5px;background-color: lightgray;"></view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="buttonClick">{{buttonTitle}}</view>
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" :title="title" >
			<view style="width: 100%;text-align: center;">
				<view style="font-size: 14px;">{{content}}</view>
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentProductDescManagementList,
	MineShangquanManageMentProductDescDelSpec} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const deleteWhite = ref('/static/mine/deleteWhite.png');
	const dataList = ref([]);
	const keyword = ref('');
	const hasMore = ref(true);   // 是否还有更多数据
	const noMore = ref(false);         // 是否没有更多数据了
	const page = ref(1);
	const buttonTitle = ref('添加商品规格');
	const deleteStatus = ref(false);
	const sidArr = ref([]);
	const title = ref('提示');
	const content = ref('确定要删除吗？');
	const show = ref(false);
	const sidString = ref('');
	
	onShow(() => {
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
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				name:'',
				page:page.value,
				limit:10,
	
			};
			const res = await MineShangquanManageMentProductDescManagementList(param);
							
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
			dataList.value = dataList.value.map(item => {
			  return {
				...item,
				checked: false  // 默认值为false
			  }
			});
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
	const buttonClick = () => {
		
		if (buttonTitle.value === '删除') {
			
			
			
			for (var i = 0; i < dataList.value.length; i++) {
				var element = dataList.value[i];
				if(element.checked === true){
					sidArr.value.push(element.sid);
				}
			};
			console.log(sidArr.value);
			if(sidArr.value.length === 0){
				uni.showToast({
					title:'请选择要删除的规格',
					icon:'none'
				})
				return;
			}
			const idstring = sidArr.value.join('|');
			sidString.value = idstring;
			console.log(idstring);
			show.value = true;
			
			
		}else if(buttonTitle.value === '添加商品规格'){
			
			uni.navigateTo({
				url:'/pages/mine/ShangQuanManagement/addProductDesc'
			})
		}
		
	};
	const confirm = async() => {
		
		show.value = false;
		//
		try {
			
			let param = {
				
				id:sidString.value
				
			};
			
			const res = await MineShangquanManageMentProductDescDelSpec(param);
							
			console.log(res);
			uni.showToast({
				title:res.message,
				icon:'none'
			})
			if(res.success == true){
				
				deleteStatus.value = false;
				buttonTitle.value = '添加商品规格';
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				loadData();
				
			}
			
				
			
		}catch (error) {
			console.log(error)
		}
	};
	const deleteClick = () => {
		deleteStatus.value = !deleteStatus.value;
		if (deleteStatus.value == false) {
			
			buttonTitle.value = '添加商品规格';
			
		}else if(deleteStatus.value == true){
			
			buttonTitle.value = '删除';
		}
		console.log(buttonTitle.value);
	};
	const chooseselect = (item:any,index:any) => {
		
		for (var j = 0; j < dataList.value.length; j++) {
			var laederment = dataList.value[j];
				
			if (index == j) {
				
				laederment.checked = !laederment.checked;
			}
		
		};
		console.log(dataList.value);
	};
	const editClick = (item:any) => {
		
		
		uni.navigateTo({
			url:`/pages/mine/ShangQuanManagement/editProductPage?specs=${JSON.stringify(item)}`
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
		  .contentView{
		  	display: flex;
		  	flex-direction: column;
		  	width: 100%;
			padding-bottom: 80px;
		  	
		  }
		  
		  .itemview{
		  	display: flex;
		  	flex-direction: row;
		  	flex-wrap: wrap; /* 允许换行 */
		  	
		  	.situation_item {
		  	  background-color: lightgray;
		  	  font-size: 12px;
		  	  color: black;
		  	  margin-top: 15px;
		  	  box-sizing: border-box;
		  	  display: flex;
		  	  flex-direction: column;
		  	  align-items: center;
		  	  height: 25px;
				margin-bottom: 10px;
				margin-left: 15px;
				justify-content: center;
				border-radius: 3px;
				padding: 0 10px;
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
		              height: 40px;           /* 需要设置高度 */
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