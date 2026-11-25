<template>
    <view class="main">
        <u-navbar
          title="用户评价"
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
				<view v-if="type === 1" style="color: #2A9595;font-size: 15px;">未读</view>
				<view v-else style="color: black;font-size: 15px;">未读</view>
				<view class="whiteLine" v-if="type === 1"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === 2" style="color: #2A9595;font-size: 15px;">已读</view>
				<view  v-else style="color: black;font-size: 15px;">已读</view>
				<view class="whiteLine" v-if="type === 2"></view>
			</view>
		</view>
		<view class="contentView">
			<view  class="order_item" v-for="(item,index) in dataList" :key="index">
				<view v-if="index % 2 == 0">
					<view style="width: 100%;display: flex;flex-direction: row;">
						<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;">{{item.avatar}}</image>
						<view style="display: flex;flex-direction: column;">
							<u-rate :count="count" :v-model="item.point" size="18" active-color="#FFFF00" readonly="true"></u-rate>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.acceptName}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.commenttime}}</view>
							<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">{{item.contents}}</view>
						</view>
					</view>
					<view style="width: 100%;margin-top: 15px;display: flex;flex-direction: row;margin-bottom: 10px;">
					   <view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in item.imgAry">
						   <u-image
							 :src="item"
							 width="60px"
							 height="80px"
						   ></u-image>
					   </view>
					</view>
				</view>
				<view v-if="index % 2 == 1">
					<view v-if="type == 1" style="display: flex;width: 100%;">
						<view class="replyView" @click="replyClick(item)">回复</view>
					</view>
					<view v-if="type == 2" style="display: flex;width: 100%;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 14px;">商家回复</view>
						<view style="margin-top: 10px;margin-left: 4%;width: 92%;font-size: 14px;margin-bottom: 10px;">{{item.replyContents}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<div v-if="imageshow" class="overlay" @click="close">
			 <div 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			 >
			<div class="slides" :style="slideStyle">
			  <img v-for="img in pictrueArr" :key="img" :src="img" class="slide">
			</div>
			 </div>
			 <div class="counter">{{ current + 1 }} / {{ pictrueArr.length }}</div>
	    </div>
		<u-modal :show="shenshow" @confirm="bohuiconfirm" confirmText="提交回复" :title="title" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 100px;border: lightgray 1px solid;font-size: 13px;" v-model="reason" placeholder="请输入回复内容">
						</textarea>
			</view>
		</u-modal>

   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import {MineShangquanManageMentQueryEvaluationManagementForPage,
	MineShangquanManageMentEvaluationManagementEvaluation} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const type = ref(1);
	const dataType = ref('0');
	const dataList = ref([]);
	const keyword = ref('');
	const hasMore = ref(true);   // 是否还有更多数据
	const noMore = ref(false);         // 是否没有更多数据了
	const page = ref(1);
	const count = ref(5);
	const pictrueArr = ref([]);
	const imageshow = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
	const shenshow = ref(false);
	const title = ref('回复评论');
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
				userId:storage.getUserId(),
				contents:type.value - 1,
				page:page.value,
				limit:10,
	
			};
			const res = await MineShangquanManageMentQueryEvaluationManagementForPage(param);
							
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
	const slideStyle = computed(() => {
	      return {
	        transform: `translateX(-${current.value * 100}%)`
	      };
	    });
	
	const open = (index:any) => {
		current.value = index;
		imageshow.value = true;
	};
	const close = () => {
		imageshow.value = false;
	};    
	const touchStart = (e:any) => {
		startX.value = e.touches[0].clientX;
	};
		
	const touchMove = (e:any) => {
		moveX.value = e.touches[0].clientX;
	};
		
	const touchEnd = () => {
		
		const diff = startX.value - moveX.value
		  
		if (Math.abs(diff) > 50) { // 滑动距离阈值
			if (diff > 0 && current.value < pictrueArr.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
			}
		}
	};
	const replyClick = (item:any) => {
		shenshow.value = true;
		replyItem.value = item;
	};
	const cancelClick = () => {
		
		shenshow.value = false;
	};
	const bohuiconfirm = async() =>{
	        
		if (reason.value.length == 0) {
			
			uni.showToast({
				title:'请输入回复内容',
				icon:'none'
			})
			return;
		}
	//网络请求。。。
		
		try {
			
			let param = {
				
				id:replyItem.value.commentId,
				content:reason.value,
				
			};
			const res = await MineShangquanManageMentEvaluationManagementEvaluation(param);
							
			console.log(res);
			
			if(res.success === true){
				
				uni.showToast({
					title:'回复成功',
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
		shenshow.value = false;
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
         min-height: 100vh;
         width: 100%;
         height: auto;
         background-color: aliceblue;
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
		  .order_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
			 height: auto;
			 border-radius: 5px;
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 background-color: white;
		  }
		  .overlay {
			 position: fixed;
			 top: 0;
			 left: 0;
			 width: 100%;
			 height: 100%;
			 background: black;
			 z-index: 9999;
		   }
		   
		   .swipe-container {
			 width: 100%;
			 height: 100%;
			 overflow: hidden;
		   }
		   
		   .slides {
			 display: flex;
			 width: 100%;
			 height: 100%;
			 transition: transform 0.3s ease;
		   }
		   
		   .slide {
			 width: 100%;
			 height: 100%;
			 object-fit: contain;
			 flex-shrink: 0;
		   }
		   
		   .counter {
			 position: absolute;
			 bottom: 50rpx;
			 left: 50%;
			 transform: translateX(-50%);
			 color: white;
		   }
		   .replyView{
			   display: flex;
			   margin-top: 20px;
			   margin-bottom: 20px;
			   width: 80px;
			   height: 30px;
			   margin-left: 200px;
			   background-color: #2A9595;
			   color: white;
			   font-size: 14px;
			   justify-content: center;
			   align-items: center;
			   border-radius: 5px;
		   }
}
</style>