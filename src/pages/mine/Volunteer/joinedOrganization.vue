<template>
    <view class="main">
        <u-navbar
          title="加入的组织"
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
		<view class="contentView">
			<view class="order_item" v-for="(item,index) in dataList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<view style="font-size: 14px;margin-left: 15px;">{{item.name}}</view>
					<!-- <view style="font-size: 13px;margin-left: 15px;color: #2A9595;text-align: right;">{{item.statusFlag}}</view> -->
				</view>
				<view style="font-size: 12px;margin-left: 15px;color: gray;margin-top: 5px;">{{item.join_time}}</view>
				
				<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
				<view v-if="item.status === 0 " style="display: flex;">
					<view  class="payBtn" @click="shenheClick(item)">待审核</view>
				</view>
				<view v-if="item.status === 1" style="display: flex;flex-direction: row;">
					<view  class="payBtn" @click="cancelClick(item)">退出组织</view>
				</view>
			</view>
		</view>
		<u-modal :show="modelshow" @confirm="confirmClick" :title="title" confirm-text="确认" showCancelButton="true" @cancel="cancel"  style="display: flex;flex-direction: column;">
		</u-modal>
		<u-modal :show="entershow" @confirm="enterClick" :title="entertitle" confirm-text="确认"   style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">再次申请需要审核
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineNeedToolsVolunteerMyOrganizationList,
	MineNeedToolsVolunteerMyOrganizationExit} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const dataList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const modelshow = ref(false);
	const title = ref('确认退出该组织？');
	const org_id = ref('');
	const entershow = ref(false);
	const entertitle = ref('已退出');
	
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
				size:10,
	
			};
			const res = await MineNeedToolsVolunteerMyOrganizationList(param);
							
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
	const shenheClick = async(item:any) => {
		
		uni.navigateTo({
			url: `/pages/service/volunteerQunYuan/findOrgDetail?id=${item.org_id}` 
		});
	};
	const cancelClick = async(item:any) => {
		
		modelshow.value = true;
		org_id.value = item.org_id;
	};
	const confirmClick = async() => {
		
		try {
			
			let param = {
				
				org_id:org_id.value,
				userId:storage.getUserId()
			};
			const res = await MineNeedToolsVolunteerMyOrganizationExit(param);
							
			console.log(res);
			modelshow.value = false;
			entershow.value = true;
			
			
		}catch (error) {
			console.log(error)
		}
	};
	const cancel = () => {
		modelshow.value = false;
	};
	const enterClick = async() => {
		
		entershow.value = false;	
		
	};
	//详情
	const detailClick = (item:any) => {
		
		uni.navigateTo({
			url: `/pages/service/volunteerQunYuan/findOrgDetail?id=${item.org_id}` 
		});
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
          .payBtn{
			  margin-left: 280px;
			  width: 60px;
			  margin-top: 10px;
			  color: #2A9595;
			  border: #2A9595 1px solid;
			  font-size: 13px;
			  border-radius: 5px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  margin-bottom: 10px;
          }
}
</style>