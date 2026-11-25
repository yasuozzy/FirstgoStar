<template>
    <view class="main">
        <u-navbar
          title="授权列表"
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
		 <template #right>
		  <view slot="right" @click="addClick()">
			  <u-image
				:src="addimage"
				width="20px"
				height="20px"
			  ></u-image>
		  </view>
		</template>
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in dataList">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.name}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 50%;">{{item.phone}}</view>
				<view style="margin-top: 10px;margin-left: 15px;" @click="deleteClick(item)">
				  <u-image
					:src="deleteImage"
					width="20px"
					height="20px"
				  ></u-image>
				</view>
			</view>
		</view>
		<u-modal :show="shenshow" @confirm="bohuiconfirm" confirmText="确定" title="确定取消该授权？" showCancelButton="true" @cancel="cancelClick" style="display: flex;flex-direction: column;">
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCareEpowerDeliveryList,
	ServiceShunFengYueCareCancelEmpowerDelivery} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const deleteImage = ref('/static/mine/deleteImage.png');
	const deliveryId = ref('');
	const dataList = ref([]);
	const shenshow = ref(false);
	const deleteItem = ref({});
	
	
	onMounted(() => {
	  loadData();
	});
	const loadData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				deliveryId:deliveryId.value
				
	
			};
			const res = await ServiceShunFengYueCareEpowerDeliveryList(param);
							
			console.log(res);						
			dataList.value = res.result;
				
		}catch (error) {
			console.log(error)
		}
	};
	const addClick = () => {
		
		uni.navigateTo({
		  url: `/pages/service/shunfengCar/addNewAuth?deliveryId=${deliveryId.value}`
		});		
		
	};
	const deleteClick = (item:any) => {
		shenshow.value = true;
		deleteItem.value = item;
	};
	const bohuiconfirm = async() => {
		
		shenshow.value = false;
		try {
			
			let param = {
				
				id:deleteItem.value.id
				
			
			};
			const res = await ServiceShunFengYueCareCancelEmpowerDelivery(param);
							
			console.log(res);	
			if(res.success == true){
				
				uni.showToast({
					title:'授权已取消！',
					icon:'none',
				})
				loadData();
			}else
			{
				uni.showToast({
					title:res.message,
					icon:'none',
				})
			}
			
				
		}catch (error) {
			console.log(error)
		}
		
	};
	const cancelClick = () => {
		
		shenshow.value = false;
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
		  .listItem{
			  display: flex;
			  flex-direction: row;
			  background-color: white;
			  margin-top: 10px;
			  margin-left: 4%;
			  width: 92%;
			  height: 40px;
		  }
}
</style>