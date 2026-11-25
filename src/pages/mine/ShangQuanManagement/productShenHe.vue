<template>
    <view class="main">
        <u-navbar
          title="商品审核"
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
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 15px;">待审核</view>
				<view v-else style="color: black;font-size: 15px;">待审核</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type == 2" style="color: #2A9595;font-size: 15px;">审核未通过</view>
				<view  v-else style="color: black;font-size: 15px;">审核未通过</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
		</view>
		<view v-if="status == 0" class="contentView">
			<view class="listItem" v-for="(item,index) in dataList">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<image style="width: 40px;height: 40px;margin-top: 10px;margin-left: 15px;" :src="item.img?item.img:headerDefaltImg"></image>
					<view style="margin-top: 10px;margin-left: 10px;display: flex;flex-direction: column;">
						<view style="font-size: 14px;">{{item.name}}</view>
						<view style="font-size: 14px;margin-top: 10px;">分类：{{item.catalogName}}</view>
					</view>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
		<view v-if="status == 4" class="contentView">
			<view class="listItem" v-for="(item,index) in dataList">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<image style="width: 40px;height: 40px;margin-top: 10px;margin-left: 15px;" :src="item.img?item.img:headerDefaltImg"></image>
					<view style="margin-top: 10px;margin-left: 10px;display: flex;flex-direction: column;">
						<view style="font-size: 14px;">{{item.name}}</view>
						<view style="font-size: 14px;margin-top: 10px;">分类：{{item.catalogName}}</view>
					</view>
				</view>
				<view style="margin-top: 10px;width: 100%;display: flex;flex-direction: column;">
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;">未通过原因</view>
					<view style="font-size: 14px;margin-top: 10px;margin-left: 15px;">{{item.appluContent?item.appluContent:'暂未填写审核意见'}}</view>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%;margin-bottom: 10px;">
					<view class="deleteButton" @click="deleteClick(item)">删除</view>
					<view class="reUpButton" @click="reupClick(item)">重新提交</view>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
		<u-modal :show="shenshow" @confirm="deleteconfirm" confirmText="删除" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentQueryGoodsPublicListForPage,
	MineShangquanManageMentQueryGoodsDelGoodsPublic,
	MineShangquanManageMentQueryGoodsUpGoodsPublic} from '@/api/mine';
    import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const type = ref(1);
	const state = ref(0);
	const dataList = ref([]);
	const keyword = ref('');
	const hasMore = ref(true);   // 是否还有更多数据
	const noMore = ref(false);         // 是否没有更多数据了
	const page = ref(1);
	const headerDefaltImg = ref('/static/service/headerDefaltImg.png');
	const title = ref('提示');
	const shenshow = ref(false);
	const reason = ref(''); 
	const replyItem = ref({});
	
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
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				state:state.value,
				page:page.value,
				limit:10,
	
			};
			const res = await MineShangquanManageMentQueryGoodsPublicListForPage(param);
							
			console.log(res);
			const resultData = res.result;
			
			resultData.map(item => ({
				  ...item,
				  img: item.img ? `${BaseImgURL}/${item.img.replace(/^\//, '')}` : '/static/service/headerDefaltImg.png'
			}))
			if (page.value === 1) {
										
				dataList.value = resultData;
			}else
			{
				// 正确的数组合并方式
				resultData.forEach(item => {
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
	//切换segment
	const segment1Click = () => {
				
		type.value = 1;
		state.value = 0;
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		 
		loadData();
		
	};
	const segment2Click = () => {
		
		 type.value = 2;
		 state.value = 4;
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 
		 loadData();
		
	};
	const deleteClick = async(item:any) => {
		shenshow.value = true;
		replyItem.value = item;
	};
	const cancelClick = () => {
		
		shenshow.value = false;
	};
	const deleteconfirm = async() =>{
		
		
		try {
			
			let param = {
				
				publicId:replyItem.value.id,
				delState:1,
				
			};
			const res = await MineShangquanManageMentQueryGoodsDelGoodsPublic(param);
							
			console.log(res);
			
			if(res.success === true){
				
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				loadData();
				
			}
			uni.showToast({
				title:res.message,
				icon:'none'
			})
			
		}catch (error) {
			console.log(error)
		}
		shenshow.value = false;
	};
	const reupClick = async(item:any) => {
		
		//
		try {
			
			let param = {
				
				publicId:item.id,
				state:0,
				
			};
			const res = await MineShangquanManageMentQueryGoodsUpGoodsPublic(param);
							
			console.log(res);
			
			if(res.success === true){
				
				
				uni.showToast({
					title:'已重新提交审核',
					icon:'none'
				})
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				loadData();
				
			}else
			{
				uni.showToast({
					title:res.message,
					icon:'none'
				})
			}
			
			
		}catch (error) {
			console.log(error)
		}
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
		  .greenHeaderView{
		  	display: flex;
		  	flex-direction: row;
		  	background-color: white;
		  	width: 100%;
		  	height: 50px;
		  	
		  }
		  .whiteLine{
		  			 margin-left: 40%;
		  			 margin-top: 5px;
		  			 width: 20%;
		  			 height: 2px;
		  			 background-color: #2A9595;
		  }
		  .contentView{
		  	display: flex;
		  	flex-direction: column;
		  	background-color: aliceblue;
		  	width: 100%;
		  	
		  }
		  .listItem{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 height: auto;
			 margin-top: 10px;
		  			
		  }
		  .deleteButton{
			  color: #2A9595;
			  font-size: 14px;
			  margin-left: 220px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  width: 60px;
			  height: 25px;
			  border-radius: 4px;
			  border: #2A9595 1px solid;
		  }
		  .reUpButton{
			  
			  color: #2A9595;
			  font-size: 14px;
			  margin-left: 15px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  width: 60px;
			  height: 25px;
			  border-radius: 4px;
			  border: #2A9595 1px solid;
		  }
}
</style>