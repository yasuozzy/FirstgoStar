<template>
    <view class="main">
        <u-navbar
          title="事件跟踪"
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
			
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type == 1" style="color: #2A9595;font-size: 13px;">待处理</view>
				<view v-else style="color: black;font-size: 13px;">待处理</view>
				<view class="whiteLine" v-if="type == 1"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type == 2" style="color: #2A9595;font-size: 13px;">未办结</view>
				<view v-else style="color: black;font-size: 13px;">未办结</view>
				<view class="whiteLine" v-if="type == 2"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type == 3" style="color: #2A9595;font-size: 13px;">已退办</view>
				<view v-else style="color: black;font-size: 13px;">已退办</view>
				<view class="whiteLine" v-if="type == 3"></view>
			</view>
			<view style="width: 25%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment4Click">
				<view v-if="type == 4" style="color: #2A9595;font-size: 13px;">已完成</view>
				<view v-else style="color: black;font-size: 13px;">已完成</view>
				<view class="whiteLine" v-if="type == 4"></view>
			</view>
			
		</view>
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;width: 80%;">{{item.repairIndustry}}</view>
					<view v-if="item.tache == 1" style="font-size: 12px;margin-left: 15px;color: #2A9595;">待处理</view>
					<view v-if="item.tache == 2" style="font-size: 12px;margin-left: 15px;color: #2A9595;">处理中</view>
					<view v-if="item.tache == 3" style="font-size: 12px;margin-left: 15px;color: #2A9595;">已完成</view>
					<view v-if="item.tache == 4" style="font-size: 12px;margin-left: 15px;color: #2A9595;">已完成</view>
					<view v-if="item.tache == 5" style="font-size: 12px;margin-left: 15px;color: #2A9595;">已取消</view>
					<view v-if="item.tache == 6" style="font-size: 12px;margin-left: 15px;color: #2A9595;">已退办</view>
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">事件类型:{{item.reparir_type}}</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">具体描述:{{item.repairContent}}</view>
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="type == 1" class="bottomview">
					<view class="buttonrefuse" @click="liandongClick">联动督办</view>
					<view class="buttonget" >查看详情</view>
				</view>
				<view v-if="type == 2" class="bottomview">
					<view class="buttonrefuse" @click="liandongClick">联动督办</view>
					<view class="buttonget">查看详情</view>
					
				</view>
				<view v-if="type ==3 " class="bottomview">
					<view class="buttonrefuse" @click="deleteClick(item)">删除</view>
					<view class="buttonget">查看详情</view>
				</view>
				<view v-if="type == 4" class="bottomview">
					
					<view  class="buttonView">查看详情</view>
				</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyWangGeEventsGenZong,MinePartyWangGeEventsDeleteEvent} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    import { onPullDownRefresh, onReachBottom, onShow,onLoad } from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const type = ref(1);
	const orderList = ref([]);
	
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false); // 是否没有更多数据了
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
        	
        	if ( !hasMore.value) {
        		
        		return
        	}
        	page.value += 1;
        	loadData();
        });
       
        const loadData = async() => {
            	
            	try {
            	    
            		let param = {
            			repairUId:getStorage(storageKeys.userId,''),
            			page:page.value,
            			size:20,
						status:type.value - 1,
						                         
            		};
            	    const res = await MinePartyWangGeEventsGenZong(param);
            	                    
					console.log(res);
					
					if (page.value === 1) {
															
						orderList.value = res.result;
					}else
					{
						// 正确的数组合并方式
						orderList.value.push(...res.result);
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
            const goBack = () => {
                
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
			const segment4Click = () => {
				
				type.value = 4;
				page.value = 1;
				hasMore.value = true;
				noMore.value = false;
				loadData();
			};
			const liandongClick = () => {
				
				uni.showToast({
					title:'联动督办成功',
					icon:'none'
				});
			};
			const deleteClick = async(item:any) => {
				
				let param = {
					repairList:item.repairList
				};
				try {
					
					const res = await MinePartyWangGeEventsDeleteEvent(param);
					console.log(res);
					uni.showToast({
						title:'删除成功',
						icon:'none'
					});
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadData();
					
				} catch (error) {
					//TODO handle the exception
					console.log(error);
				}
			};
			const detailClick = (item:any) => {
				uni.navigateTo({
					url:`/pages/home/eventsDetail?repairList=${encodeURIComponent(item.repairList)}`
				})
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
	  		 margin-top: 10px;
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
	  		 height: 130px;
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
	  		  margin-left: 210px;
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
	  .buttonlocation{
	  		  
	  		  display: flex;
	  		  justify-content: center;
	  		  align-items: center;
	  		  border-radius: 5px;
	  		  border: #2A9595 1px solid;
	  		  width: 60px;
	  		  height: 20px;
	  		  margin-left: 110px;
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
    }
</style>